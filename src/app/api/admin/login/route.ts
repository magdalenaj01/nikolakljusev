import {NextResponse} from 'next/server';
import {timingSafeEqual} from 'node:crypto';
import {createSession} from '@/lib/auth';
export const runtime='nodejs';
function match(a:string,b:string){const x=Buffer.from(a);const y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y)}
export async function POST(req:Request){
 try{const {email,password}=await req.json();const targetEmail=process.env.ADMIN_EMAIL?.trim().toLowerCase();const targetPassword=process.env.ADMIN_PASSWORD;
 if(!targetEmail||!targetPassword||targetPassword.length<12||!process.env.SESSION_SECRET||process.env.SESSION_SECRET.length<32)return NextResponse.json({error:'Configure ADMIN_EMAIL, ADMIN_PASSWORD and SESSION_SECRET in .env'},{status:503});
 if(typeof email!=='string'||typeof password!=='string'||!match(email.trim().toLowerCase(),targetEmail)||!match(password,targetPassword))return NextResponse.json({error:'Невалидна е-пошта или лозинка'},{status:401});
 await createSession(targetEmail);return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:'Login failed'},{status:500})}
}
