import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getDocumentsT } from "../../FireStore";

export async function GET(request){
    const username = cookies().get("name")["value"];
    const documents = await getDocumentsT("baseworks", username);
    var res = [];
    if (documents){
        for (const doc of documents){
            console.log("doc test 003", doc.data());
            var x = doc.data();
            res.push(x);
        }
    }
    if (res == []){
        res = "notok";
    }
    return NextResponse.json({msg:res}, {status:200});
}