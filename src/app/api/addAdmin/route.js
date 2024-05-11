import { connect } from "@/helpers/dbConfig";
import { Customer } from "@/models/customerModel";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(NextRequest){
    try {
        const {email} = await NextRequest.json()
        // console.log(email)

        const user = await Customer.findOne({email})
        if(!user){
            return NextResponse.json({message : "user not found", success: false},{status : 400})
        }
        user.isAdmin = true
        await user.save()
        // console.log(user)
        return NextResponse.json({message : "admin added successfully", success: true}, {status: 200})
    } catch (error) {
        return NextResponse.json({error : error.message, success: false},{status : 400})
    }
}