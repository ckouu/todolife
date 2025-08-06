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
    console.log('test');
  }

  return (
    <div>
        <Todo goal="fitness" onDohAction={dohAction} />

        <div className="guy">
          <div className={`guy ${animation}`} />
        </div>
    </div>
  );

}