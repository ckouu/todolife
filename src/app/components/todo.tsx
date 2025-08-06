'use client';

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
    onDohAction: () => void;
}

export default function Todo({ goal, onDohAction }: TodoProps) {
  
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getUpdates(goal).then(setList);
  }, [goal]);

  function handleSave() {
    setList([...list, input]);
    post([...list, input], goal);
    setInput("");
    onDohAction;
  };

  function handleComplete(index: number) {
    const newList = [...list];  
    newList.splice(index, 1);
    setList(newList);
    post(newList, goal);
    onDohAction;
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
    </div>
  );

}