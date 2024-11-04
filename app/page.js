"use client"
import Image from 'next/image'
import { useEffect } from 'react';
import Protect from './components/Protect';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(()=>{
    fetch("/api/user/get").then(x=>x.json()).then(x=>{console.log("user", x.user)
      if(x.user == "none"){
        router.push('/auth/signin');
      }else{
        router.push('/main/bases')
      }
    })
  })
  // <Protect/>
  return ;
}
