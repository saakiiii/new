
import { Inter } from 'next/font/google'
import './globals.css'
// import { useEffect } from 'react'
import storeDefault from './redux/stores/store'
import Providers from './redux/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hello World!',
  description: 'Collaborative codebase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <style>
      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap')
      </style> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <div className=' font-sans'>
          
          <Providers store={storeDefault} children={children}/>
            {/* {children} */}
          {/* </Providers> */}
        </div>
      </body>
    </html>
  )
}
