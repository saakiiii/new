export default function Authbox({title, inpFields, submit, btarea, alerts}) {
  return (
    <div className="relative flex h-[100vh] justify-center items-center">
        <div className='w-[27%]'>
            <div className="border">
                <div className="w-[100%] pt-5 pb-5 text-center">
                    <h1 className="font-bold text-xl">{title}</h1>
                </div>
                <div className="w-[100%] pb-5 pl-10 pr-10">
                    <div id="alerts" className="mb-4 text-sm text-center text-red-700 animate-[pulse_3s_ease-in-out_infinite]">
                    {alerts}
                    </div>
                    {inpFields}                    
                    <div className="mt-4">
                    {submit}
                    </div>
                    {btarea}
                </div>

            </div>
        </div>
    </div>
  )
}
