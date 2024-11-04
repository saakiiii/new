import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getDocumentsT, getInvites, sendInvites } from "../../FireStore";
import { getDocument } from "../../FireStore";

export async function GET(request){
    const username = cookies().get("name")["value"]
    console.log(username);
    const invites = await getInvites("invites", username);    
    // console.log("docs", documents);

    var res = [];
    if (invites){
        console.log("invites ", invites.data());
        const invitesonly = invites.data()["invites"];
        for (const invite of invitesonly){
            const basework = await getDocument("baseworks", invite);
            console.log("basework", basework);
            res.push(basework);
        }
    }
    if (res == []){
        res = "notok";
    }
    return NextResponse.json({msg:res}, {status:200});
}