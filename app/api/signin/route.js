import { NextResponse } from 'next/server';
import fireBaseApp from '../Firebase';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { cookies } from "next/headers";
import { getUsernameByEmail } from '../FireStore';

export async function POST(request){
    const {email, password} = await request.json();
    const auth = getAuth(fireBaseApp);
    // const cookieStore = cookies()
    // const theme = cookieStore.get('name')
    // console.log("cookie", theme);  
    // await sleep(1000000000);
    try{
        const result = await signInWithEmailAndPassword(auth, email, password);
        // console.log(result);
        const usern = await  getUsernameByEmail("users", email);
        console.log("check email", usern);
        cookies().set("name", usern);

        return NextResponse.json({msg:"ok"}, {status:200});
    }catch(e){
        // console.log(e);
        // console.log("error", e.code);
        var errormsg = "";
        if(e.code == "auth/invalid-email"){
            errormsg += '<p>Invalid email or password</p>'
        }else if(e.code == "auth/invalid-credential"){
            errormsg += '<p>Invalid email or password</p>'
        }
        return NextResponse.json({msg:errormsg}, {status:200})
    }
}