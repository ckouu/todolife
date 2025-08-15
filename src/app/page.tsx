'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {

  const [index, setIndex] = useState(0);
  const chapters = ['fitness', 'academics', 'nutrition'];

  const leftIndex = (index - 1 + chapters.length) % chapters.length;
  const rightIndex = (index + 1) % chapters.length;

  const goNext = () => {
    setIndex((prev) => (prev + 1) % chapters.length);
  }

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + chapters.length) % chapters.length);
  }

  return (
    <div className='home-page'>
      <div className='head-container'>
        todoLIFE
        <div className='line'>
          <Image fill src='/line.svg' alt='Line' style={{ objectFit: 'contain' }}/>
        </div>
      </div>

      <p className='intro'>select your chapter:</p>
      <div className='chapter-container'>
        <button onClick={goPrev} className='arrow-left'/>
        <div className='unselected'>{chapters[leftIndex]}</div>
        <div className='selected'>{chapters[index]}</div>
        <div className='unselected'>{chapters[rightIndex]}</div>
        <button onClick={goNext} className='arrow-right'/>
      </div>
      <Link className='select-button' href={`/${chapters[index]}`}>enter!</Link>

    </div>
  )
}