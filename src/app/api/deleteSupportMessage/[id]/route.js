import { connect } from "@/helpers/dbConfig";
import { Support } from "@/models/supportModel";
import {NextRequest, NextResponse } from "next/server";


export async function DELETE(request, { params }){
    try {
        await connect()
        const id = params.id
        const response = await Support.findOneAndDelete({_id : id})
        // console.log(response)
        return NextResponse.json(
            {
              success: true,
              message: "Support Message Deleted Successfully",
            },
            { status: 200 }
          );
    } catch (error) {
        return NextResponse.json(
            {
              success: false,
              message: "Support Message not deleted",
            },
            { status: 401 }
          );
    }
}