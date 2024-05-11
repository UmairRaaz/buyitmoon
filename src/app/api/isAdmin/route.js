import { connect } from "@/helpers/dbConfig";
import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function GET(NextRequest){
    try {
        const data = await getDataFromCookie(NextRequest)
        return NextResponse.json({message : "user info fetchd successfully", data:data, success: true}, {status: 200})
    } catch (error) {
        return NextResponse.json({error : error.message, success: false},{status : 400})
    }
}