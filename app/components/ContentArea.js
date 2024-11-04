import React from 'react'
import Spinner from './Spinner'

export default function ContentArea({contents}) {
  return (
    <div className='flex flex-1 h-screen pt-20 pl-60 ' id="contentarea">
        <div className='bg-[rgb(248,248,248)] w-[100%] h-[100%] p-3 overflow-scroll'>
            {contents}
            
        </div>
    </div>
  )
}
