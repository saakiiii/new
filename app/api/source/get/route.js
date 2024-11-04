import { NextResponse } from "next/server";
import { getCode } from "../../FireStore";

export async function POST(request){
    const data = await request.json();
    const code = await getCode("sourcecodes", data["baseid"]);
    console.log("code now", code);
    return NextResponse.json({code:code}, {status:200})
}