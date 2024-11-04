"use client"

import { Provider } from "react-redux"
import storeDefault from "./stores/store"

export default function Providers({children}){
   return( <Provider store={storeDefault}>
        {children}
    </Provider>)
}