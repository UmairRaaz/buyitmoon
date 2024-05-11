import { connect } from "@/helpers/dbConfig"
import { Customer } from "@/models/customerModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect();

export async function POST(NextRequest) {
    try {
        const body = await NextRequest.json();
        const { name, email, password } = body;

        const user = await Customer.find({ email: email });

        if (user.length > 0) {
            return NextResponse.json({ message: "User already registered", success: false }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newCustomer = await Customer.create({ customerName: name, email: email, password: hashedPassword });
        await newCustomer.save();
        // console.log(newCustomer);

        return NextResponse.json({ message: "User registered successfully", success: true, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false, status: 500 });
    }
}
