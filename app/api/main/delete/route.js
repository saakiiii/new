import { NextRequest, NextResponse } from "next/server";
import { deleteBase } from "../../FireStore";

export async function POST(request){
    const data = await request.json();
    const res = await deleteBase("baseworks", data['baseid']);
    console.log(res);
    return NextResponse.json({}, {})
}