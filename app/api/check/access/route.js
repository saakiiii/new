// "use server"
import { NextResponse } from "next/server";
import { getDocument } from "../../FireStore";
import { cookies } from "next/headers";

export async function POST(request){
    const data = await request.json();
    const res = await getDocument("baseworks", data["baseid"]);
    if(res["accesstype"] == "Private"){
        if (cookies().has("name")){
            res["usernamevalid"] = cookies().get("name")["value"] == res["created_by"]
        }else{
            res["usernamevalid"] = false;
        }
    }else if(res["accesstype"] == "Invite only"){
        if (cookies().has("name")){
            if(res["invites"].includes(cookies().get("name")["value"])){
                res["usernamevalid"] = true;
            }else if(cookies().get("name")["value"] == res["created_by"]){
                res["usernamevalid"] = true;
            }
            else{
                res["usernamevalid"] = false;
            }
        }
    console.log(res["usernamevalid"]);
}
    res['currentusername'] = cookies().get("name")["value"];
    console.log("rtest 04", res);
    return NextResponse.json({msg:res}, {status:200})

}