import MiniOptions from "./MiniOptions";
import Option from "./Options";
import SearchBar from "./SearchBar";

export default function Navbar({bg, onmenuicon}) {
  return (
    <div className="h-20 w-[100%] bg-white fixed flex justify-between items-center pl-4 pr-4 z-10">
        <div className="flex items-center">
            <div className="cursor-pointer" id="menu-icon" onClick={onmenuicon}>
                <img src="https://cdn-icons-png.flaticon.com/128/11480/11480608.png" className="w-[2rem]"/>
            </div>
            <div className="pl-3">
                <h3 className="text-[1.6rem] font-bold">Hello world!</h3>
            </div>
        </div>
        <SearchBar/>
        <div className="flex space-x-3">
            <MiniOptions src=" https://cdn-icons-png.flaticon.com/512/875/875068.png " href={"/main/"+bg} add={'t'}/>
            <MiniOptions src=" https://cdn-icons-png.flaticon.com/512/747/747376.png " href={"/main/profile"} bi/>
        </div>
    </div>
  )
}
