import { connect } from "@/helpers/dbConfig";
import { Support } from "@/models/supportModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function GET(NextRequest){
    try {
        const supports = await Support.find({})
        // console.log(data)
        if(!supports){
             return NextResponse.json({message: "supports doesnot found",orders : [], success : false, status : 400})
        }
        return NextResponse.json({message: "products fetched successfully", supports : supports, success : true, status : 200})
    } catch (error) {
        return NextResponse.json({error: error.message, success : false, status : 400})
    }
}