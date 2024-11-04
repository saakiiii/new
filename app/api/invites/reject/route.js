import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getDocumentsT, rejectInvite, sendInvites } from "../../FireStore";

export async function POST(request){
    const data = await request.json();
    const baseid = data["baseid"];
    console.log("reject",baseid);
    const username = cookies().get('name')['value']
    const res = await rejectInvite("invites", username, baseid);
    return NextResponse.json({msg:"ok"}, {status:200});
}