"use client"
import Card from "@/app/components/Card";
import Dashboard from "@/app/components/Dashboard";
import GridLayout from "@/app/components/GridLayout";
import InputFields from "@/app/components/InputFields";
import { useEffect, useState } from "react";

export default function page() {
  const [trash, setTrash] = useState(null);
  const [userdata, setUserdata] = useState({username:"", email:"", userId:""});
//   function getTrash(){
//     fetch("/api/main/gettrash").then(x=>x.json()).then(x=>{console.log(x);setTrash(x.msg)});
//   }
//   useEffect(()=>{
//     getTrash();
    
//   },[])
//   function recoverBase(baseid){
//     fetch("/api/user/data", {
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body:JSON.stringify({baseid:baseid})
//     }).then(()=>{getTrash();});

//   }
  useEffect(()=>{
    console.log("");
    fetch('/api/user/data').then(x=>x.json()).then(x=>{setUserdata(x.msg)});
  }, [])

  function reqDelete(){
    alert("Request Sent");
  }

  return (
    <Dashboard contents={
      <>
        <div className="w-[100%] pt-10 flex flex-col justify-center items-center space-y-3">
            <div className="w-[60%] border rounded pl-7 pr-7 pb-5">
                <div className="pt-5 pb-5 border-b-2 mb-5">
                    <div className=" font-bold">Profile</div>
                    <div className=" text-xs">Settings for your personal profile</div>
                </div>
                
                <div className="text-s">Username</div>
                <InputFields value={userdata.username} disabled={'disabled'}/>
                <br/>
                <div className="text-s">Email</div>
                <InputFields value={userdata.email} disabled={'disabled'}/>
                <br/>
                <div className="mt-2">User id</div>
                <InputFields value={userdata.userId} disabled={'disabled'}/>
            </div>
            <div className="w-[60%] border rounded pt-3 pl-7 pr-7 pb-3">
                <div className="pb-2 pt-2 border-b-2 font-bold">Danger zone</div>
                <div className="pt-2 pb-2">
                    <p>By deleting your account you will lose all your data</p>
                    <div className="h-2 w-2"></div>
                    <button className="bg-red-500 p-2 text-white rounded" onClick={reqDelete}>Request deletion</button>
                </div>

            </div>
        </div>
      </>
     } bg={"trash"}
     /> 
  )
}
