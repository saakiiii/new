import { NextResponse } from "next/server";
import { setCode } from "../../FireStore"

export async function POST(request){
    const data = await request.json();
    console.log(data);
    const res = await setCode("sourcecodes", data["baseid"], data["code"]);
    console.log(res);
    return NextResponse.json({msg:"ok"}, {status:200});
}