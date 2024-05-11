import { NextRequest, NextResponse } from "next/server";


export async function GET(NextRequest){
    try {
        const response = NextResponse.json({
            message  : "Logout Successfully",
            success: true
        })
        response.cookies.set("token", "", {httpOnly: true, expires : new Date(0)})

        return response
    } catch (error) {
        return NextResponse.json({error : error.message, success : false, status: 400})
    }
}