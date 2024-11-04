import Link from "next/link"

export default function Card({baseid, basename, langname, created_by, created_at, deletebase, type, accesstype, recoverbase, openinvite, acceptinvite, rejectinvite}) {
  console.log("baseid", baseid);
  console.log("accesstype", accesstype);
  function copylink(link){
    navigator.clipboard.writeText(link);
  }
  return (
      <div className="border cursor-pointer relative hover:scale-105 duration-200">
      {/* <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('/img/card-left.jpg')" title="Woman holding a mug">
      </div> */}
        <div className="border rounded-lg border-gray-400 lg:border-t lg:border-gray-400 bg-white hover:bg-gray-200 duration-100 flex flex-col justify-between leading-normal p-4">
          <div className="mb-3">
            <p className="text-sm w-fit p-1 rounded text-black flex items-center bg-[#C1F2B0]">
              {/* <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg> */}
              {accesstype == "Private"?"Private":<></>}
              {accesstype=="Anyone with link"?"Public":<></>}
              {accesstype=="Invite only"?"Shareable":<></>}
            </p>
            <Link href={type=="bases" || type=="contribs"?"/basework/"+baseid:""} >
              <div className={"text-gray-900 font-bold text-[1.50rem] mt-2 hover:underline"}>{basename}</div>
           </Link>
            
            <p className="text-md text-gray-700 bg-[#ffe9c4] w-fit pr-1 pl-1 rounded-md">{langname}</p>
          </div>
          <div className="flex items-center">
            {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"/> */}
            <div className="flex justify-between w-[100%]">
              <div className="text-sm">
                <p className="text-gray-900 leading-none">{created_by}</p>
                <p className="text-gray-600">{created_at}</p>
              </div>
              {type == "bases"?
              <div className="flex pt-1 pb-1 space-x-1">
              {accesstype=="Invite only"?
                <div onClick={()=>{openinvite(baseid)}}>
                  <img src="https://cdn-icons-png.flaticon.com/128/2550/2550209.png" className="w-[1.5rem] h-[1.5rem]" title="Invite"/>
                </div>
               :<></>}
                  
                  {accesstype=="Anyone with link"?
                <div onClick={()=>{copylink("http://localhost:3000/"+"/basework/"+baseid)}} title="Copy link">
                  <img src="https://cdn-icons-png.flaticon.com/512/88/88026.png " className="w-[1.5rem] h-[1.5rem]" title="Copy link"/>
                </div>
               :<></>}
                <div onClick={()=>{deletebase(baseid, basename)}}>
                  <img src="https://cdn-icons-png.flaticon.com/128/2907/2907762.png" className="w-[1.5rem] h-[1.5rem]" title="Delete"/>
                </div>
              </div>
            :type=='trash'?<>
            <div className="flex pt-1 pb-1 space-x-1">
                <div onClick={()=>{recoverbase(baseid)}}>
                  <img src="https://cdn-icons-png.flaticon.com/128/9448/9448304.png" className="w-[1.5rem] h-[1.5rem]" title="Recover"/>
                </div>
              </div>
            </>:type=='invites'?<>
            <>
            <div className="flex pt-1 pb-1 space-x-3">
                <div onClick={()=>{rejectinvite(baseid)}}>
                  <img src="https://cdn.iconscout.com/icon/free/png-256/free-cross-3352288-2791224.png?f=webp&w=128" className="w-[1.3rem] h-[1.3rem]" title="Reject"/>
                </div>
              
                <div onClick={()=>{acceptinvite(baseid)}}>
                  <img src="https://cdn-icons-png.flaticon.com/128/1055/1055183.png" className="w-[1.5rem] h-[1.5rem]" title="Accept"/>
                </div>
              </div>
            </>
            </>:<>
            <div className="flex pt-1 pb-1 space-x-1">
                {/* <div onClick={()=>{rejectinvite(baseid)}}>
                  <img src="https://cdn.iconscout.com/icon/free/png-256/free-cross-3352288-2791224.png?f=webp&w=128" className="w-[1.3rem] h-[1.3rem]" title="Reject"/>
                </div>
              
                <div onClick={()=>{acceptinvite(baseid)}}>
                  <img src="https://cdn-icons-png.flaticon.com/128/1055/1055183.png" className="w-[1.5rem] h-[1.5rem]" title="Accept"/>
                </div> */}
              </div>

            </>}
            </div>
          </div>
        </div>
        
      </div>
  )
}