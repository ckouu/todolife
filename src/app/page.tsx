import Link from "next/link"

export default function Home() {

  return (
    <div>
    <div>
      <Link href="/fitness">fitness</Link>
    </div>
    <div>
      <Link href="/academics">academics</Link>
    </div>
    </div>
  )
}