import { NextResponse } from "next/server";
import { addDocument, getDocuments } from "../../FireStore";
import generateRandomString from "../../RandomString";
import { cookies } from "next/headers";

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function basenameValid(basename){
    const regex = /^[a-zA-Z0-9_]+$/;

    if (regex.test(basename)) {
        console.log(0);
       return true;
    } else {
        console.log("Input contains invalid characters or is empty.");
        return false;
    }
}

const validLangs = ["python", "java", "javascript", "c", "go"];
const validAccessTypes = ["Invite only", "Anyone with link", "Private"];
export async function POST(request){
    const data = await request.json();
    // console.log(data);
    // await sleep(100000000);
    console.log(data["accesstype"]);
    if(basenameValid(data["basename"])){
        if(validLangs.includes(data["language"])){
            if(validAccessTypes.includes(data["accesstype"])){
                const randomId = generateRandomString(4);
                data["baseid"] = randomId;
                console.log(cookies().get("name"));
                data["created_by"] = cookies().get("name")["value"];
                data["created_at"] = new Date();
                data["type"] = "base";
                data["invites"] = [];
                addDocument("baseworks", data);
                // getDocuments("baseworks", "");
                return NextResponse.json({msg:"ok"}, {status:200}); 
            }else{
                return NextResponse.json({msg:"<p>Invalid access type</p>"}, {status:200}); 
            }       
        }   
        else{
            return NextResponse.json({msg:"<p>Invalid language</p>"}, {status:200});
        }
    }
    else{
        return NextResponse.json({msg:"<p>Invalid basename, min 1, character, underscore, numbers</p>"}, {status:200});
    }
}

// export async function GET(request){
//     const data = await request.json();
//     console.log(data);
//     return NextResponse.json({msg:"ok"}, {status:200});
// }