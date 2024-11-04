import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserdata } from "../../FireStore";

export async function GET(request){
    const username = cookies().get('name')['value'];
    const data = await getUserdata("users", username);
    console.log("userdata ",data);
    return NextResponse.json({msg:data}, {status:200});
}