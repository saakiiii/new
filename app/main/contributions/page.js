"use client"
import Card from "@/app/components/Card";
import Dashboard from "@/app/components/Dashboard";
import GridLayout from "@/app/components/GridLayout";
import { useState, useEffect } from "react";

export default function page() {
  const [contribs, setContribs] = useState(null);
  useEffect(()=>{
    getContribs();
  }, [])
  function getContribs(){
    fetch("/api/invites/contributions/get").then(
      x=>{
          console.log("finding error 01", x);
          return x.json();
      }
      )
      .then(x=>{console.log("res",x.msg);setContribs(x.msg)});

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
          
           contribs
            
          }
          route={"contribs"}
        //   acceptinvite={acceptInvite}
        //   rejectinvite={rejectInvite}
        />
         
      </>
     } bg={"contributions"} 
     /> 
  )
}
