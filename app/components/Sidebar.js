import { useRouter } from "next/navigation";
import Option from "./Options";

export default function Sidebar({bg}) {
  const router = useRouter();
  function onLogout(){
    fetch("/api/logout", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify()
    }).then(x=>x.json()).then(x=>{
      router.push('/auth/signin');
    })
  }
  return (
    <div className=" w-60 h-screen pt-20 fixed top-0 z-0 border bg-white" id="sidebar">
        <Option text={"Bases"} link={"bases"} bg={bg==="bases"?"bg-[#f4f4f4]":""} img={"https://cdn-icons-png.flaticon.com/128/711/711284.png"}/>
        <Option text={"Contributions"} link={"contributions"} bg={bg==="contributions"?"bg-[#f4f4f4]":""} img={"   https://cdn-icons-png.flaticon.com/512/1342/1342651.png "}/>
        <Option text={"Invites"} link={"invites"} bg={bg==="invites"?"bg-[#f4f4f4]":""} img={"https://cdn-icons-png.flaticon.com/512/748/748137.png"}/>
        <Option text={"Trash"} link={"trash"} bg={bg==="trash"?"bg-[#f4f4f4]":""} img={"https://cdn-icons-png.flaticon.com/512/3096/3096673.png"}/>
        
          <div className="absolute bottom-0 w-[100%] h-[60px] text-center flex items-center justify-center space-x-3 hover:bg-red-100 duration-100 cursor-pointer" onClick={onLogout}>
            <div>
              <img src="https://cdn-icons-png.flaticon.com/512/126/126467.png" className='w-[1.2rem] h-[1.2rem]' />
            </div>  
            <div>
              <h1>Logout</h1>
            </div>
          </div>
    </div>
  )
}
