import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getDocumentsT, sendInvites } from "../../FireStore";
import UserNameExist from "../../UserNameExist";

export async function POST(request){
    const data = await request.json();
    const unames = data["usernames"];
    const currentuser = cookies().get("name")["value"]
    console.log("baseid check", data["baseid"]);
    var notvaliduns = false;
    for (var i = 0; i<unames.length; i++){
        var un = unames[i].trim();
        if(currentuser == un){
            if(notvaliduns == false){
                notvaliduns = "";
            }
            notvaliduns += `<p>${un} cannot invite own</p>`;
        }
        else if(await UserNameExist(un) == true){
            console.log("hello");
            sendInvites("invites", un, data["baseid"])
        }else{
            if(notvaliduns == false){
                notvaliduns = "";
            }
            notvaliduns += `<p>${un} not valid</p>`;
        }
       
    }
    if(notvaliduns != false){
        notvaliduns += "<p>other invites if any have been sent</p>";
    }
        // console.log("docs", documents);
    return NextResponse.json({msg:"ok","notvaliduns":notvaliduns}, {status:200});
}