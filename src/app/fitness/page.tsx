'use client';

import Todo from '../components/todo';
import { useState, useEffect } from 'react';

export default function Page() {

  const [animation, setAnimation] = useState("idle");
  const [todosCompleted, setTodosCompleted] = useState(0);
  var goal = 10;
  var fitnessProgress = Math.min((todosCompleted / goal * 100), 100);

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
  
  const dohAction = (type: 'save' | 'complete') => {
    if (type === 'complete') {
      setTodosCompleted(prev => prev + 1);
    }
    setAnimation('smileUp');
    setTimeout(() => setAnimation('smileDown'), 1000);
    setTimeout(() => setAnimation('idle'), 1300);
  }
  return (
    <div className='page'>
        <Todo goal="fitness" onDohAction={dohAction}/>
        <div className="doh-container">
          <div className="progress-container">
            <header>Complete {goal} Fitness Goals!</header>
            <div className="progress-fill" style={{width: `${fitnessProgress}%`}}></div>
          </div>
          <div className={`doh ${animation}`} />
        </div>
    </div>
  );
}