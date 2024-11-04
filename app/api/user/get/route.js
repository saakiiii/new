import { NextResponse } from 'next/server';
// import fireBaseApp from '../Firebase';
import { cookies } from "next/headers";

export async function GET(request){
    if(cookies().has("name")){
        const currentuser = cookies().get("name")["value"]
        return NextResponse.json({user:currentuser}, {status:200})
    }else{
        return NextResponse.json({user:"none"}, {status:200})
        // return NextResponse.redirect('http://localhost:3000/nosignin');

    }
}