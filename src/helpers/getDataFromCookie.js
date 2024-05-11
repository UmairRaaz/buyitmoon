import jwt from "jsonwebtoken"
import * as jose from 'jose';
export async function getDataFromCookie(NextRequest) {
    try {
        const jwttoken = await NextRequest.cookies.get("token").value || ""; 
        const token  = await jose.jwtVerify(
            jwttoken, new TextEncoder().encode(`secret-key-phrase`)
        );
        
        if (!token) {
            throw new Error("Token not found in cookies.");
        }
        return token.payload;
    } catch (error) {
        console.log(error.message);
    }
}
