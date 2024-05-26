import { connect } from "@/helpers/dbConfig";
import { Customer } from "@/models/customerModel";
import {NextRequest, NextResponse } from "next/server";


export async function DELETE(request, { params }){
    try {
        await connect()
        const id = params.id
        const response = await Customer.findOneAndDelete({_id : id})
        // console.log(response)
        return NextResponse.json(
            {
              success: true,
              message: "User Deleted Successfully",
            },
            { status: 200 }
          );
    } catch (error) {
        return NextResponse.json(
            {
              success: false,
              message: "user not Deleted",
            },
            { status: 401 }
          );
    }
}