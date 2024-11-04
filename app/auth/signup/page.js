"use client"
import Authbox from "@/app/components/Authbox";
import Button from "@/app/components/Button";
import InputFields from "@/app/components/InputFields";
import Spinner from "@/app/components/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup(){
    const router = useRouter();
    const [isSubmit, setisSubmit] = useState(false);
    async function emailvalid(){
        // let email = document.getElementById("email");
        // const req = await fetch("/api/emailvalid", {
        //     method:"POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //       },
        //     body: JSON.stringify({"email":email.value})
        // }).then(x=>x.json()).then((x)=>{
        //     if (x.msg == "ok"){
        //         console.log("emailok");
        //     }else{
        //         console.log("emailnotok");
        //     }
        // })
    }
    async function signSubmit(){
        setisSubmit(true);
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var cpassword = document.getElementById("cpassword").value;
        if(username && email && password && cpassword){
            const req = await fetch("/api/signup", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({"username":username, "email":email, "password":password, "cpassword":cpassword})
            }).then(x=>x.json()).then(
                (x)=>{
                if (x.msg == "ok"){
                    console.log("emailok");
                    router.push("/auth/signin");
                }else{
                    document.getElementById("alerts").innerHTML = x.msg;
                    console.log("emailnotok");
                }
            })
        }else{
            alert("all not valid");
        }
        setisSubmit(false);
    }
    return (
        <Authbox title="Start coding!" 
            inpFields={
                <>
                    <InputFields id={"username"} type={"text"} name={"username"} placeholder={"Enter username"}/>
                    <InputFields id={"email"} type={"email"} name={"email"} placeholder={"Enter email"} onchange={emailvalid}/>
                    <InputFields id={"password"} type={"password"} name={"password"} placeholder={"Enter password"}/>
                    <InputFields id={"cpassword"} type={"password"} name={"cpassword"} placeholder={"Confirm password"}/>
                </>
            }
            submit={
                <>
                    <Button btname={isSubmit ? <Spinner w={4} h={4} /> : "Sign up"} onclick={signSubmit} />
                    {/* <Button btname={
                            <Spinner/>

                 } /> */}
                </>
            }
            btarea={
                <>
                    <p className="pt-1">Already have account?<span className="text-blue-500"><Link href="/auth/signin">Sign in!</Link></span></p>
                </>
            }
        >    
        </Authbox>
    );
}