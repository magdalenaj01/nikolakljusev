import {SignJWT,jwtVerify} from 'jose';import {cookies} from 'next/headers';
const cookieName='nk_admin';function key(){const secret=process.env.SESSION_SECRET;if(!secret||secret.length<32)throw Error('SESSION_SECRET must be at least 32 characters');return new TextEncoder().encode(secret)}
export async function createSession(id:string){const token=await new SignJWT({role:'admin'}).setProtectedHeader({alg:'HS256'}).setSubject(id).setIssuedAt().setExpirationTime('8h').sign(key());(await cookies()).set(cookieName,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:28800});}
export async function getAdmin(){try{const token=(await cookies()).get(cookieName)?.value;if(!token)return null;const {payload}=await jwtVerify(token,key());return payload.role==='admin'&&typeof payload.sub==='string'?payload.sub:null}catch{return null}}
export async function clearSession(){(await cookies()).delete(cookieName)}
