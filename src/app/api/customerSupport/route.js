import { connect } from "@/helpers/dbConfig";
import { Support } from "@/models/supportModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connect();
    const req = await request.json();
    // console.log(req);
    const support = await Support.create(req)
    // console.log(support)
    return NextResponse.json(
      {
        data : support,
        success: true,
        message: "Message Sent Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Message not sent",
      },
      { status: 401 }
    );
  }
}
