"use client"
import Card from "@/app/components/Card";
import Dashboard from "@/app/components/Dashboard";
import GridLayout from "@/app/components/GridLayout";
import { useEffect, useState } from "react";

export default function page() {
  const [trash, setTrash] = useState(null);
  function getTrash(){
    fetch("/api/main/gettrash").then(x=>x.json()).then(x=>{console.log(x);setTrash(x.msg)});
  }
  useEffect(()=>{
    getTrash();
    
  },[])
  function recoverBase(baseid){
    fetch("/api/main/recover", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({baseid:baseid})
    }).then(()=>{getTrash();});

  }
  return (
    <Dashboard contents={
      <>
        <GridLayout
          items={ 
          
           trash
            
          } 
          route={"trash"}
          recoverbase={recoverBase}
        />
         
      </>
     } bg={"trash"}
     /> 
  )
}
