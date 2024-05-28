import { NextResponse, NextRequest } from 'next/server'
import { getDataFromCookie } from './helpers/getDataFromCookie'
 

export async function middleware(NextRequest) {
    const path = NextRequest.nextUrl.pathname;
    const tokenId = await getDataFromCookie(NextRequest)
    // console.log(tokenId)
    const isPublicPath = path === "/login" || path === "/signup" ;
    if(isPublicPath && tokenId){
        return NextResponse.redirect(new URL('/', NextRequest.nextUrl))
    }
    if(!isPublicPath && !tokenId){
        return NextResponse.redirect(new URL('/login', NextRequest.nextUrl))
    }
    
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/checkout","/order-details", "/login", "/signup", "/admin"],
}