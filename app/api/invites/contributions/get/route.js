import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getInvites, getDocument } from "@/app/api/FireStore";

export async function GET(request){
    const username = cookies().get("name")["value"]
    console.log(username);
    const invites = await getInvites("invites", username);    
    var res = [];
    if (invites){
        const invitesonly = invites.data()["contributions"];
        for (const invite of invitesonly){
            const basework = await getDocument("baseworks", invite);
            console.log("basework", basework);
            if (basework != []){
                console.log('h', basework);
                res.push(basework);
            }
        }
    }
    console.log("contribs",res);
    if(res == [[]]){
        res = "notok";
    }
    return NextResponse.json({msg:res}, {status:200});
}