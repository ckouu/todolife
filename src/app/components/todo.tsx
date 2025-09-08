'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const getUpdates = async (goal: string): Promise<[string[], number, boolean]> => {
  const res = await fetch('/api', {
    cache: 'no-cache',
  })
  const data = await res.json();
  return [data.todos[goal], data.totalCompleted[goal], data.muted];
}

const post = async (list: string[], goal: string, completed: number) => {
  const res = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newList: list, goal: goal, completed: completed }),
  });
}

interface TodoProps {
    goal: string;
    onDohAction: () => void;
    onSetCompleted: (totalCompleted: number) => void;
}

export default function Todo({ goal, onDohAction, onSetCompleted}: TodoProps) {
  
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [todosCompleted, setTodosCompleted] = useState(0);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    getUpdates(goal).then(([todos, totalCompleted, savedMuted]) => {
      setList(todos);
      setTodosCompleted(totalCompleted);
      onSetCompleted(totalCompleted);
      setMuted(savedMuted)
      if (audioRef.current) {
        audioRef.current.muted = savedMuted;
      }
    });
  }, [goal, onSetCompleted]);

  const handleSave = () => {
    setList([...list, input]);
    post([...list, input], goal, 0);
    setInput('');
  };

  const handleComplete = (index: number) => {
    const newList = [...list];  
    newList.splice(index, 1);
    setList(newList);
    post(newList, goal, 1);
    setTodosCompleted(todosCompleted + 1);
    onSetCompleted(todosCompleted + 1);
    onDohAction();
  };

  return (
    <div className='todo'>
      <div className='head-container'>
        <header>TODO:</header>
        <Link href='/' className='arrow-left'></Link>
      </div>

      <div className='list'>
      
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <button className='check' onClick={() => handleComplete(index)}></button> {item} 
            </li>
          ))}
        </ul>
      </div>
      <div className='add'>
        <input 
          type='text' 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && input != '') handleSave(); }}
          placeholder='Add your todo list item here!' 
        />
        <button id='saveButton' className='save-button' type='button' onClick={handleSave} disabled={input === ''}>save</button>
      </div>
      <audio autoPlay loop ref={audioRef}>
        <source src="/Monkeys Spinning Monkeys.mp3" type="audio/mpeg"/>
      </audio>
    </div>
  );
}