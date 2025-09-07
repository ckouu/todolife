'use client';

import Todo from '../components/todo';
import { useState, useEffect, useRef } from 'react';

export default function Page() {

  const [animation, setAnimation] = useState<'idle' | 'happy' | 'blink'>('idle');
  const [completed, setCompleted] = useState(0);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  let progress = Math.min((completed / 15 * 100), 100);
  let level = Math.min(1 + (Math.floor(completed / 5)), 3);

  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    if (animation === 'idle') {
        const rand = Math.random() * 6000 + 2000;
        timeoutID = setTimeout(() => dohBlink(), rand);
    }
    return () => clearTimeout(timeoutID);
  }, [animation]);
  
  const dohHappy = () => {
    setAnimation('happy');
  }

  const dohBlink = () => {
    setAnimation('blink');
    setTimeout(() => setAnimation('idle'), 300);
  }

  return (
          
    <div className='page' style={{backgroundImage: `url(/fitness.svg)`}}>
        <Todo goal='fitness' onDohAction={dohHappy} onSetCompleted={setCompleted}/>
        
        <div className='doh-container'>
          <div className={`doh fitness${level} ${animation}`} onAnimationEnd={() => setAnimation('idle')}/>
        </div>

        <div className="progress-container">
          <div className="progress-fill" style={{height: `${progress}%`}}></div>
        </div>
                
      <audio autoPlay loop>
        <source src="/Monkeys Spinning Monkeys.mp3" type="audio/mpeg"/>
      </audio>
    </div>
  );
}