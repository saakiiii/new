import Message from "../components/Message"
import Link from "next/link"

export default function NoSignin() {
  return (
        <Message  title={"No signin"} content={<p>page needs authentication, <span><Link href='/auth/signin'>Sign in</Link></span></p>} />
    )
}