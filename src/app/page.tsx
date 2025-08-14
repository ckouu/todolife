'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {

  const [index, setIndex] = useState(0);
  const chapters =['fitness', 'academics', 'nutrition'];

  return (
    <div className='home'>
      <div className='head-container'>
        todoLIFE
        <div className='line'>
          <Image fill src='/line.svg' alt='Line' style={{ objectFit: 'contain' }}/>
        </div>
      </div>

      <Link href='/fitness'>fitness</Link>
      <Link href='/academics'>academics</Link>
    </div>
  )
}