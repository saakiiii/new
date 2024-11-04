"use client"
import Card from "@/app/components/Card";
import Dashboard from "@/app/components/Dashboard";
import GridLayout from "@/app/components/GridLayout";
import { useState, useEffect } from "react";

export default function page() {
  const [invites, setInvites] = useState(null);
  useEffect(()=>{
    getInvites();
  }, [])
  function getInvites(){
    fetch("/api/invites/get").then(x=>x.json()).then(x=>{
      console.log("res",x.msg);
      setInvites(x.msg)
    });

  }
  function acceptInvite(baseid){
    fetch("/api/invites/accept", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({baseid:baseid})
    }).then(()=>{
      getInvites();
    })
  }
  function rejectInvite(baseid){
    fetch("/api/invites/reject", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({baseid:baseid})
    }).then(()=>{
      getInvites();
    })
  }
  return (
    <Dashboard contents={
      <>
        <GridLayout
          items={ 
          
           invites
            
          }
          route={"invites"}
          acceptinvite={acceptInvite}
          rejectinvite={rejectInvite}
        />
         
      </>
     } bg={"invites"} 
     /> 
  )
}
