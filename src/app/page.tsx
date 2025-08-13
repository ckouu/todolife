import Link from 'next/link'
import Image from 'next/image'

export default function Home() {

  return (
    <div className='home'>
      <div className='head-container'>
        todoLIFE
        <div className='line'>
          <Image fill src='/line.svg' alt='Line' objectFit='contain'/>
        </div>
      </div>
      <Link href='/fitness'>fitness</Link>
      <Link href='/academics'>academics</Link>
    </div>
  )
}