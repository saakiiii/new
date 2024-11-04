import Link from "next/link"

export default function MiniOptions({src, href, add}) {
  return (
    <Link href={add=='t'?href+"?add=t":href}>
      <div className="cursor-pointer">
          <img className="w-8 h-8" src={src}/>
      </div>
    </Link>
  )
}
