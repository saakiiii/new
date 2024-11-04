import { NextResponse } from "next/server";

// export async function POST(request){
//     const data = await request.json();
//     console.log(data);
//     return NextResponse.json({msg:"ok"}, {status:200});
// }

export async function GET(request){
    // const data = await request.json();
    // console.log(data);
    return NextResponse.json({msg:"ok"}, {status:200});
}