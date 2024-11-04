// "use server"
import { NextResponse } from "next/server";
// import { redirect } from "next/navigation"
// import { useRouter } from 'next/navigation';

export async function POST(request){
    // const router = useRouter();
    // console.log(request);
    // redirect("/auth/signin");
    // router.push("/mn");
    // res.redirect(301, '/new-page');
    return NextResponse.json({msg:"Email validation"}, {status:200})
}