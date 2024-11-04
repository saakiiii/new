export default function Participants({connid, username, foraudio, ismain}) {
    return (
        <div className='flex items-center justify-center pt-2 pb-2' id={connid}>
        <div className='w-[80%] text-white text-lg pl-4'><span className={ismain?'font-bold text-[20px]':''}>{username}</span></div>
        {/* {foraudio?<audio autoplay controls style={{display:"none"}} id={"a_"+connid}></audio>:<></>} */}
        <button id="onoffaudio" className='w-[20%] text-center'>
          <span id="mic-toggle" class="material-icons w-[100%] text-white" style={{lineHeight:"inherit"}}>{ismain?"mic_off":'volume_up'}</span>
        </button>
      </div>
    );
}
  