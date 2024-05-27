import { connect } from "@/helpers/dbConfig";
import { Customer } from "@/models/customerModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req, {params}) {
    try {
        const id = params.id;
        const user = await Customer.findById(id);
        if (!user) {
            return NextResponse.json({ message: "user not found",  success: false }, { status: 400 });
        }
        return NextResponse.json({ message: "user found successfully", user : user, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 400 });
    }
}
