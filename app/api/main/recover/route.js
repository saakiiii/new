import { NextRequest, NextResponse } from "next/server";
import { recoverBase } from "../../FireStore";

export async function POST(request){
    const data = await request.json();
    const res = await recoverBase("baseworks", data['baseid']);
    console.log(res);
    return NextResponse.json({}, {})
}