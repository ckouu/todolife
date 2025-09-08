'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRef } from 'react'
import {useEffect } from 'react'

const getUpdates = async (): Promise<boolean> => {
  const res = await fetch('/api', {
    cache: 'no-cache',
  })
  const data = await res.json();
  return data.muted;
}

const post = async (muted: boolean) => {
  const res = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({muted}),
  });
}
export default function Home() {

  const [index, setIndex] = useState(0);
  const chapters = ['fitness', 'academics', 'self-care'];
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const leftIndex = (index - 1 + chapters.length) % chapters.length;
  const rightIndex = (index + 1) % chapters.length;

  useEffect(() => {
    getUpdates().then((savedMuted) => {
      setMuted(savedMuted)
      if (audioRef.current) {
        audioRef.current.muted = savedMuted;
      }
    })
  }, []);

  const goNext = () => {
    setIndex((prev) => (prev + 1) % chapters.length);
  }

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + chapters.length) % chapters.length);
  }

  const toggleMute = () => {
    setMuted((prev) => {
      const newMuted = !prev
      if (audioRef.current) {
        audioRef.current.muted = newMuted
      }
      post(newMuted);
      return newMuted;
    })
  }

  return (
    <div className='home-page'>
      <div className='mute-button'>
        <button onClick={toggleMute}>{muted ? "Unmute" : "Mute"}</button>
      </div>
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
      <audio autoPlay loop ref={audioRef}>
        <source src="/Radio Martini.mp3" type="audio/mpeg"/>
      </audio>
    </div>
  )
}