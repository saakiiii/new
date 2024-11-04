import { useDispatch } from "react-redux"
import { searchterm } from "../redux/reducers/searchReducer";
import { useState } from "react";

export default function SearchBar() {
  const [searchv, setsearchv] = useState(null);
  const dispatch = useDispatch();
  return (
    <div className="border-2 w-[24rem] h-[3rem] relative rounded-md overflow-hidden">
        <div className="w-[12%] h-[100%] absolute top-0 right-0 cursor-pointer z-10 flex items-center justify-center">
            <img src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/magnifier-64.png" className="w-[2rem]" />
        </div>
        <input className="w-[100%] h-[100%] pr-[12%] left-0 top-0 pl-2" placeholder="Search files" onChange={(e)=>{console.log(e.target.value);
          dispatch(searchterm(e.target.value))
        }
          }/>
    </div>
  )
}
