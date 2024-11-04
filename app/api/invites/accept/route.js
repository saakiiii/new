import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { acceptInvite, getDocumentsT, movetoContributions, sendInvites } from "../../FireStore";

export async function POST(request){
    const data = await request.json();
    const baseid = data["baseid"];
    const username = cookies().get('name')['value']
    console.log("accept",baseid);
    const res = await acceptInvite("baseworks", baseid, username);
    const res1 = await movetoContributions("invites", username, baseid); 
    return NextResponse.json({msg:"ok"}, {status:200});
}