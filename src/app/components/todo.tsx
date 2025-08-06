'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

async function getUpdates(goal: string): Promise<string[]> {
  const res = await fetch("/api", {
    cache: "no-cache",
  })
  const data = await res.json();
  return data.todos[goal];
}

async function post(list: string[], goal: string) {
  const res = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newList: list, goal: goal }),
  });
  const data = await res.json();
  console.log(data);
}

interface TodoProps {
    goal: string;
}

export default function Todo({ goal }: TodoProps) {
  
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [animation, setAnimation] = useState("idle");

  function Guy({animation='idle'}) {
    return(<div className={`guy ${animation}`}/>);
  }

  useEffect(() => {
    getUpdates(goal).then(setList);
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

  async function handleSave() {
    setList([...list, input]);
    post([...list, input], goal);
    setInput("");
    setAnimation('smileUp');
    setTimeout(() => setAnimation('smileDown'), 1000);
    setTimeout(() => setAnimation('idle'), 1300);
  };

  const handleComplete = (index: number) => {
    const newList = [...list];  
    newList.splice(index, 1);
    setList(newList);
    post(newList, goal);
    setAnimation('smileUp');
    setTimeout(() => setAnimation('smileDown'), 1000);
    setTimeout(() => setAnimation('idle'), 1300);
  };

  return (
    <div className='todo'>
      <header>TODOLIFE!!!! (best team best project!!!)</header>
      <Link href="/">back</Link>

      <p>TODO:</p>
      <div className="list">
      
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <button className="check" onClick={() => handleComplete(index)}></button> {item} 
            </li>
          ))}
        </ul>
      </div>

      <div className="add">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && input != "") handleSave(); }}
          placeholder="Add your todo list item here!" 
        />
        <button id="saveButton" type="button" onClick={handleSave} disabled={input === ""}>Save</button>
      </div>

      <div className="guy">
            <Guy animation={animation}></Guy>
        </div>
    </div>
  );

}