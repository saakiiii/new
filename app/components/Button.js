export default function Button({btname, id, type, onclick}) {
  return (
    <button className="w-[100%] pt-2 pb-2 bg-[#65B741] text-white rounded-md hover:bg-[#488b2c] duration-300" id={id} type={type} onClick={onclick}>{btname}</button>
  )
}
