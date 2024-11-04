"use client"
import { useSearchParams } from "next/navigation";
import ContentArea from "./ContentArea";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AddModal from "./AddModal";

export default function({contents, bg, addbase, isSubmit}) {

  const searchParams = useSearchParams();
  const addq = searchParams.get("add");
  console.log("addq", addq);
  // console.log(searchParams.get("h"));
  function sideBar(){
    var menuicon = document.getElementById("menu-icon");
    var sidebar = document.getElementById("sidebar");
    var contentarea = document.getElementById("contentarea");
    sidebar.classList.toggle("moveleft");
    contentarea.classList.toggle("moveleft-c");
  }
  
  return (
    <>
    {addq?<>
      <AddModal bg={bg} addbase={addbase} isSubmit={isSubmit} />
    </>:<></>}

    <Navbar bg={bg} onmenuicon={sideBar}/>
    <Sidebar bg={bg} />
    <ContentArea contents={contents}/>
    </>
  )
}
