import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import type {z} from 'zod';
import {postSchema} from './postValidation';

export type PostInput=z.infer<typeof postSchema>;
export type Post=Omit<PostInput,'imageUrl'>&{id:string;imageUrl:string|null;createdAt:Date;updatedAt:Date};
type StoredPost=Omit<Post,'createdAt'|'updatedAt'>&{createdAt:string;updatedAt:string};
const file=path.join(process.cwd(),'data','posts.json');
const sampleFile=path.join(process.cwd(),'data','sample-posts.json');
function hydrate(p:StoredPost):Post{return {...p,createdAt:new Date(p.createdAt),updatedAt:new Date(p.updatedAt)}}
async function readPosts():Promise<StoredPost[]>{
  try{return JSON.parse(await readFile(file,'utf8')) as StoredPost[]}
  catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')throw e;return JSON.parse(await readFile(sampleFile,'utf8')) as StoredPost[]}
}
async function savePosts(posts:StoredPost[]){await mkdir(path.dirname(file),{recursive:true});const tmp=file+'.'+randomUUID()+'.tmp';await writeFile(tmp,JSON.stringify(posts,null,2),'utf8');await rename(tmp,file)}
// Serialized write queue avoids concurrent writes overwriting one another in a single server process.
let queue:Promise<unknown>=Promise.resolve();
function writeSerialized<T>(fn:()=>Promise<T>):Promise<T>{const task=queue.then(fn,fn);queue=task.then(()=>{},()=>{});return task}
function filterPosts(posts:Post[],where?:{published?:boolean;category?:string}){return posts.filter(p=>(where?.published===undefined||p.published===where.published)&&(!where?.category||p.category===where.category))}
export const db={post:{
 async findMany(options?:{where?:{published?:boolean;category?:string};orderBy?:{createdAt:'desc'|'asc'};take?:number}){
  let posts=filterPosts((await readPosts()).map(hydrate),options?.where);
  if(options?.orderBy)posts.sort((a,b)=>options.orderBy?.createdAt==='asc'?a.createdAt.getTime()-b.createdAt.getTime():b.createdAt.getTime()-a.createdAt.getTime());
  return options?.take===undefined?posts:posts.slice(0,options.take);
 },
 async findUnique({where}:{where:{id?:string;slug?:string}}){return (await readPosts()).map(hydrate).find(p=>where.id?p.id===where.id:p.slug===where.slug)??null},
 async create({data}:{data:PostInput}){return writeSerialized(async()=>{const posts=await readPosts();if(posts.some(p=>p.slug===data.slug))throw new Error('DUPLICATE_SLUG');const now=new Date().toISOString();const post:StoredPost={...data,imageUrl:data.imageUrl||null,id:randomUUID(),createdAt:now,updatedAt:now};await savePosts([post,...posts]);return hydrate(post)})},
 async update({where,data}:{where:{id:string};data:PostInput}){return writeSerialized(async()=>{const posts=await readPosts();const i=posts.findIndex(p=>p.id===where.id);if(i<0)throw new Error('NOT_FOUND');if(posts.some(p=>p.slug===data.slug&&p.id!==where.id))throw new Error('DUPLICATE_SLUG');posts[i]={...posts[i],...data,imageUrl:data.imageUrl||null,updatedAt:new Date().toISOString()};await savePosts(posts);return hydrate(posts[i])})},
 async delete({where}:{where:{id:string}}){return writeSerialized(async()=>{const posts=await readPosts();const i=posts.findIndex(p=>p.id===where.id);if(i<0)throw new Error('NOT_FOUND');const [deleted]=posts.splice(i,1);await savePosts(posts);return hydrate(deleted)})}
}};
