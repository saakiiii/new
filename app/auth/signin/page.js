"use client"
import Authbox from "@/app/components/Authbox";
import Button from "@/app/components/Button";
import InputFields from "@/app/components/InputFields";
import Link from "next/link";
import { useState } from "react"; 
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";

export default function SignIn(){
    const [isSubmit, setisSubmit] = useState(false);
    const router = useRouter();
    async function signSubmit(){
        setisSubmit(true);
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        if(email && password){
            const req = await fetch("/api/signin", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({"email":email, "password":password})
            }).then(x=>x.json()).then(
                (x)=>{
                if (x.msg == "ok"){
                    console.log("emailok");
                    router.push("/main/bases");
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
        <Authbox title="Hello World!" 
            inpFields={
                <>
                    <InputFields id={"email"} type={"email"} name={"email"} placeholder={"Enter email"}/>
                    <InputFields id={"password"} type={"password"} name={"password"} placeholder={"Enter password"}/>
                    <p className="text-sm text-blue-500">Forgot password?</p>
                </>
            }
            submit={
                <>
                    {/* <Button btname={"Sign in"}/> */}
                    <Button btname={isSubmit ? <Spinner w={"4"} h={"4"} /> : "Sign in"} onclick={signSubmit} />
                </>
            }
            btarea={
                <>
                    <p className="pt-1">Don't have an account?<span className="text-blue-500"><Link href="/auth/signup">Sign up!</Link></span></p>
                </>
            }
        >    
        </Authbox>
    );
}