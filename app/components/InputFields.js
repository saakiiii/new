export default function InputFields({id, type, name, placeholder, onchange, value, disabled}) {
  return (
    <input className="w-[100%] h-[35px] p-1 mb-1 bg-[#f5f5f5] text-sm outline-gray-300 border" id={id} type={type} name={name} placeholder={placeholder} onChange={onchange} value={value} disabled={disabled}/>
  )
}
