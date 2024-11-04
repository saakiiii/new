"use client"
import Card from "@/app/components/Card";
import Dashboard from "@/app/components/Dashboard";
import GridLayout from "@/app/components/GridLayout";
import InputFields from "@/app/components/InputFields";
import Modal from "@/app/components/Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import Spinner from "@/app/components/Spinner";
import { user } from "@/app/components/User";
// import { cookie } from "@/app/api/Cookie";

export default function page() {
  const router = useRouter();
  // const res = user();
  // const res = cookie();
  // console.log("s", res);
  // const isauth = fetch("/api/user/get").then(x=>x.json()).then(x=>{

  //   if(x.user == "none"){
  //     console.log(x)
  //     console.log(x);
  //       return false;
  //   }else{
  //     return true;
  //   }
  // })
  // if (isauth){
  //   console.log('had');
  //   // router.push('/hhe');
  // }else{
    
  // }
  // useEffect(()=>{
  //   async function auth(){
  //     const isauth = await fetch("/api/user/get").then(x=>x.json()).then(x=>{

  //         if(x.user == "none"){
  //           console.log(x)
  //           console.log(x);
  //             return false;
  //         }else{
  //           return true;
  //         }
  //       })
  //       return isauth;
  //     }
  //     if(auth() == false){
  //       console.log("this is false");
  //       // router.push();
  //     }else{
  //       console.log("=this is tur");
  //     }
  // })
  const [baseworks, setBaseworks] = useState(null);
  const [isSubmit, setisSubmit] = useState(false);
  const [inviteBool, setinviteBool ] = useState(false);
  const [baseworkdata, setbaseworkdata] = useState(null);
  const [isInvite, setisInvite] = useState(false);
  // const router = useRouter();
  console.log(baseworks);
  useEffect(()=>{
    getBases();
  }, [])
  function addUnames(){
    setisInvite(true);
    const inp = document.getElementById("unames");
    const alerts = document.getElementById("alerts");
    const names = inp.value.split(",");
    inp.value = "";
    fetch("/api/invites/send", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({usernames:names, baseid:baseworkdata})
    }).then(x=>x.json()).then(x=>{
      if(x.notvaliduns){
        alerts.innerHTML = x.notvaliduns;
      }else{
        closeModal();
      }
    })
    setisInvite(false);
  }
  
  function getBases(){
    fetch("/api/main/getbases").then(x=>x.json()).then(x=>{console.log("res",x);setBaseworks(x.msg)});

  }

  function addBase(){
    setisSubmit(true);
    console.log(0);
    var basename = document.getElementById("basename");
    var languageSelect = document.getElementById("languageSelect");
    var alerts = document.getElementById("alerts");
    var accesstype = document.getElementById("accesstype");
    fetch("/api/main/activity", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({basename:basename.value,language:languageSelect.value,accesstype:accesstype.value})
    }).then(x=>x.json()).then(x=>{
        
        if(x.msg=="ok"){  
          getBases();
          router.push("/main/bases");
        }else{
          alerts.innerHTML = x.msg;
        }
      });
      setisSubmit(false);
}
  
  function deleteBase(baseid, filename){
    if (confirm("Are you sure to delete "+ filename +" ?")){
    fetch("/api/main/delete", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({baseid:baseid})
    }).then(()=>{getBases();});
  }
  }

  function openInvite(baseworkdata){
    setinviteBool(true);
    setbaseworkdata(baseworkdata);
  }

  function closeModal(){
    setinviteBool(false);
  }
  return (
   <Dashboard contents={
    <>
      <GridLayout
        items={ 
              baseworks
          // [<Card basename="project name" langname="Python"/>]
          
        }
        route={"bases"}
        deletebase={deleteBase}
        openinvite={openInvite}
      />
      {inviteBool?<Modal closeModal={closeModal} title={"Send invites"} contents={
        <>
            <InputFields type={"text"} id={"unames"} placeholder={"Username1, Username2 ..."}/>
          <Button onclick={()=>{addUnames()}} btname={isInvite ? <Spinner w={4} h={4} /> : "Invite"}  />

        </>
      }/>:<></>} 
      
    </>
   } bg={"bases"} addbase={addBase} isSubmit={isSubmit} 
   /> 
  );
}
