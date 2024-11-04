import Link from 'next/link'
import React from 'react'

export default function Option({text, img, link, bg}) {
  return (
    <Link href={"/main/"+link}>
        <div className='m-1 rounded-md'>
            <div className={bg + ' flex space-x-1 justify-between items-center pt-3 pb-3 hover:bg-[#f4f4f4] cursor-pointer  duration-200'}>
                <div className='w-[30%] flex justify-center'>
                    <img src={img} className='w-[1.2rem] h-[1.2rem]'/>
                </div>
                <div className='w-[70%] flex justify-start'>
                    <p className=' text-l'>{text}</p>
                </div>
            </div>
        </div>
    </Link>
  )
}
