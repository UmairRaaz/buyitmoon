import { connect } from "@/helpers/dbConfig";
import { Support } from "@/models/supportModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(req){
    try {
        const {params} = await req.json(); 
        const { startDate, endDate } = params; 
        const supports = await Support.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate) 
                    }
                }
            }
        ]);
        console.log(supports)
        if(!supports){
             return NextResponse.json({message: "supports doesnot found",orders : [], success : false, status : 400})
        }
        return NextResponse.json({message: "products fetched successfully", supports : supports, success : true, status : 200})
    } catch (error) {
        return NextResponse.json({error: error.message, success : false, status : 400})
    }
}