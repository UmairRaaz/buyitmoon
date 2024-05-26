import { connect } from "@/helpers/dbConfig";
import { Customer } from "@/models/customerModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import * as jose from 'jose';
connect()
export async function POST(NextRequest) {
    try {
        const body = await NextRequest.json()
        // console.log(body)
        const { email, password } = body
        // console.log("email, password", email, password)
        const user = await Customer.findOne({ email })
        // console.log("user", user)
        if (!user) {
            return NextResponse.json({ message: "email not found", success: false }, { status: 400 })
        }

        //compare pass with bcryptjs
        const checkPass = await bcryptjs.compare(password, user.password)

        if (!checkPass) {
            return NextResponse.json({ message: "incorrect password", success: false }, { status: 400 })
        }
        const tokenData = {
            id: user._id,
            name: user.customerName,
            email: user.email,
            isAdmin : user.isAdmin,
        }

        //generate jwt token
        // const token = await  jwt.sign( tokenData, process.env.SECRET_KEY, {expiresIn : "1d"})
        const jwtToken = await new jose.SignJWT(tokenData)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(new TextEncoder().encode(`secret-key-phrase`));
        // console.log("jose token", jwtToken)
        const response = NextResponse.json({ message: "user login successfully", success: true })

        // send with response in cookies
        response.cookies.set("token", jwtToken)
        return response

    } catch (error) {
        return NextResponse.json({ message: error.message, success: false, status: 500 })
    }
}