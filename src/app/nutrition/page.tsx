'use client';

import Todo from '../components/todo';
import { useState, useEffect } from 'react';

export default function Page() {

  const [animation, setAnimation] = useState('idle');
  const [completed, setCompleted] = useState(0);
  let progress = Math.min((completed / 10 * 100), 100);

  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    if (animation === 'idle') {
        const rand = Math.random() * 6000 + 2000;
        timeoutID = setTimeout(() => {
        setAnimation('blink');
        setTimeout(() => setAnimation('idle'), 200);
        }, rand);
    }
    return () => clearTimeout(timeoutID);
  }, [animation]);

  const dohAction = () => {
    setAnimation('smileUp');
    setTimeout(() => setAnimation('smileDown'), 1000);
    setTimeout(() => setAnimation('idle'), 1300);
  }

  return (
          
    <div className='page' style={{backgroundImage: `url(/nutrition.svg)`}}>
        <Todo goal='nutrition' onDohAction={dohAction} onSetCompleted={setCompleted}/>

        <div className='doh-container'>
          <div className={`doh ${animation}`} />
        </div>

        <div className="progress-container">
          <div className="progress-fill" style={{height: `${progress}%`}}></div>
        </div>
    </div>
  );
}