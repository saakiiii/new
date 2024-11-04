import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request){
    cookies().delete('name')
    return NextResponse.json({msg:"ok"}, {status:200});
}