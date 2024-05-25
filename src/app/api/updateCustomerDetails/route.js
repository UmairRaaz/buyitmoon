import { NextResponse } from 'next/server';
import { connect } from "@/helpers/dbConfig";
import { Customer } from '@/models/customerModel';

export async function PUT(req) {
  try {
    await connect();
    const {id, customerName, customerEmail, isAdmin} = await req.json(); 
    const user = await Customer.findById(id)
    user.customerName = customerName;
    user.email = customerEmail;
    user.isAdmin = isAdmin;
    await user.save();
    return NextResponse.json({ message: "User updated successfully", success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 400 });
  }
}
