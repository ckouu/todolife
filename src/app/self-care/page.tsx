'use client';

import Todo from '../components/todo';
import { useState, useEffect } from 'react';

export default function Page() {

  const [animation, setAnimation] = useState('idle');
  const [completed, setCompleted] = useState(0);
  let progress = Math.min((completed / 15 * 100), 100);
  let level = Math.min(1 + (Math.floor(completed / 5)), 3);

  // useEffect(() => {
  //   let timeoutID: NodeJS.Timeout;
  //   if (animation === 'idle') {
  //       const rand = Math.random() * 6000 + 2000;
  //       timeoutID = setTimeout(() => {
  //       setAnimation('blink');
  //       setTimeout(() => setAnimation('idle'), 200);
  //       }, rand);
  //   }
  //   return () => clearTimeout(timeoutID);
  // }, [animation]);

  const dohAction = () => {
    setAnimation('idle');
    setAnimation('happy');
    setTimeout(() => setAnimation('idle'), 2000);
  }

  return (
          
    <div className='page' style={{backgroundImage: `url(/self-care.svg)`}}>
        <Todo goal='self-care' onDohAction={dohAction} onSetCompleted={setCompleted}/>

        <div className='doh-container'>
          <div className={`doh self-care${level} ${animation}`} />
        </div>

        <div className="progress-container">
          <div className="progress-fill" style={{height: `${progress}%`}}></div>
        </div>
        
      <audio autoPlay loop>
        <source src="/Fluffing a Duck.mp3" type="audio/mpeg"/>
      </audio>
    </div>
  );
}