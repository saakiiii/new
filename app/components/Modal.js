
export default function Modal({contents, title, closeModal}) {
  return (
    <div className="flex justify-center items-center w-[100%] h-screen fixed top-0 left-0 bg-[#000000cc] z-30">
            <div className="w-[30%] pt-3 pb-3 bg-white flex justify-center flex-col items-center rounded-md overflow-hidden">
                <div className="flex self-end pr-2 cursor-pointer" onClick={closeModal}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2997/2997911.png" className="w-[1rem]"/>
                </div>
                <p className="pt-2 pb-4 text-xl font-bold">{title}</p>
                <div className="w-[90%] pb-5">
                    <div id="alerts" className="mb-4 text-sm text-center text-red-700 animate-[pulse_3s_ease-in-out_infinite]"></div>
                    {contents}
                </div> 
            </div>
    </div>
  )
}
