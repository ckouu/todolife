'use client';

import Todo from '../components/todo';
import { useState, useEffect } from 'react';

export default function Page() {

  const [animation, setAnimation] = useState('idle');
  const [completed, setCompleted] = useState(0);
  let progress = Math.min((completed / 15 * 100), 100);
  let level = Math.min(1 + (Math.floor(completed / 5)), 3);
  
  const dohAction = () => {
    setAnimation('idle');
    setAnimation('happy');
    setTimeout(() => setAnimation('idle'), 2000);
  }
  
  return (
    
    <div className='page' style={{backgroundImage: `url(/academics.svg)`}}>
        <Todo goal='academics' onDohAction={dohAction} onSetCompleted={setCompleted}/>

        <div className='doh-container'>
          <div className={`doh academics${level} ${animation}`} />
        </div>

        <div className="progress-container">
          <div className="progress-fill" style={{height: `${progress}%`}}></div>
        </div>
    </div>
  );
}