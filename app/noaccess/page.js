"use client"
import Message from "../components/Message";
import Link from "next/link";

export default function NoAccess() {
  return (
      <>
        <Message  title={"No access"} content={
        <>
          <span>page has no public access, </span>
          <Link href="/main/bases">
            Go back
          </Link>
        </>
      } />
      </>
    )
}