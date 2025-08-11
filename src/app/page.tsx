import Link from 'next/link'

export default function Home() {

  return (
    <div>
      <Link href='/fitness'>fitness</Link>
      <Link href='/academics'>academics</Link>
    </div>
  )
}