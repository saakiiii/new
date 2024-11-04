import { useSearchParams } from "next/navigation";
import Authbox from "./Authbox";
import Button from "./Button";
import InputFields from "./InputFields";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "./Modal";

export default function AddModal({bg, addbase, isSubmit}) {
//   const searchParams = useSearchParams();
  const router = useRouter();
  function closeModal(){
    // searchParams.set("add");
    // console.log(window.location);
    router.push("/main/"+bg);
  }
  console.log("issubmit", isSubmit);
  return (
    // <div className="flex justify-center items-center w-[100%] h-screen fixed top-0 left-0 bg-[#000000cc] z-30">
    //         <div className="w-[30%] pt-3 pb-3 bg-white flex justify-center flex-col items-center rounded-md overflow-hidden">
    //             <div className="flex self-end pr-2 cursor-pointer" onClick={closeModal}>
    //                 <img src="https://cdn-icons-png.flaticon.com/128/2997/2997911.png" className="w-[1rem]"/>
    //             </div>
    //             <p className="pt-2 pb-4 text-xl font-bold">Create new codebase</p>
    //             <div className="w-[90%] pb-5">
    <Modal
      closeModal={closeModal}
      title = {"Create new codebase"}
      contents = {
        <>
                    <InputFields id="basename" type={"text"} placeholder={"Enter base name"}/>
                    <select
                            id="languageSelect"
                            className="w-[100%] h-[35px] p-1 mb-1 bg-[#f5f5f5] text-sm outline-gray-300 border"
                            // value={selectedLanguage}
                            // onChange={handleLanguageChange}
                            
                            >
                            <option value="">Select Language</option>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="c">C</option>
                            <option value="go">Go</option>
                            {/* Add more programming languages as needed */}
                    </select>
                    <select
                            id="accesstype"
                            className="w-[100%] h-[35px] p-1 mb-1 bg-[#f5f5f5] text-sm outline-gray-300 border"
                            // value={selectedLanguage}
                            // onChange={handleLanguageChange}
                            
                            >
                            <option value="">Access Type</option>
                            <option value="Private">Private</option>
                            <option value="Invite only">Invite only</option>
                            <option value="Anyone with link">Anyone with link</option>
                            {/* Add more programming languages as needed */}
                    </select>

                    {/* <Button btname={"Create"} onclick={addbase}/> */}
                    <Button onclick={addbase} btname={isSubmit ? <Spinner w={4} h={4} /> : "Create"}  />

            </>
              }

            />
    //             </div>
    //         </div>
                
    // </div>
  )
}
