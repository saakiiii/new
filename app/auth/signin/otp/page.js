import Authbox from "@/app/components/Authbox";
import Button from "@/app/components/Button";
import InputFields from "@/app/components/InputFields";
import Link from "next/link";
export default function Signup(){
    return (
        <Authbox title="Hello World!" 
            inpFields={
                <>
                    <InputFields id={"email"} type={"email"} name={"email"} placeholder={"Enter email"}/>
                </>
            }
            submit={
                <>
                    <Button btname={"Verify"}/>
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