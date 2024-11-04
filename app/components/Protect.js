import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default async function Protect() {
    const router = useRouter();
    // useEffect(()=>{
        await fetch("/api/user/get").then(x=>x.json()).then(x=>{
            console.log(x)
            console.log(x);
            if(x.user == "none"){
                router.push("/asdf");
            }
        })
    //   })
  return ;
}
