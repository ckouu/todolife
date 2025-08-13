'use client';

import Todo from '../components/todo';
import { useState, useEffect } from 'react';

export default function Page() {

  const [animation, setAnimation] = useState("idle");

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

  function dohAction() {
    setAnimation('smileUp');
    setTimeout(() => setAnimation('smileDown'), 1000);
    setTimeout(() => setAnimation('idle'), 1300);
  }

  return (
    <div className='page'>
        <Todo goal="academics" onDohAction={dohAction} />
        <div className="doh-container">
          <div className="progress">
            <header>Complete 1 Academic Goal!</header>
          </div>
          <div className={`doh ${animation}`} />
        </div>
    </div>
  );
}