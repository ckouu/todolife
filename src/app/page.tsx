'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import './globals.css';
import './guy.css';
import Link from 'next/link';

async function getTest() {
  const response = await fetch("/api/test", {
    cache: "no-cache",
  })
  const data = await response.json();
  console.log(data);
}

async function postTest() {
  const res = await fetch('/api/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ test: 'one entry' }),
  });
  const data = await res.json();
  console.log(data);
}

export default function Page() {
  
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState("");
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

  function Guy({animation='idle'}) {
    return(<div className={`guy ${animation}`}/>);
  }

  const handleSave = () => {
    setList([...list, input]);
    setInput("");
    setAnimation('smileUp');
    setTimeout(() => setAnimation('smileDown'), 1000);
    setTimeout(() => setAnimation('idle'), 1300);
  };

  const handleComplete = (index: number) => {
    const newList = [...list];  
    newList.splice(index, 1);
    setGuy(lilGuySmile.src);
    setTimeout(() => setGuy(lilGuy.src), 1000);
    setList(newList);
    setAnimation('smileUp');
    setTimeout(() => setAnimation('smileDown'), 1000);
    setTimeout(() => setAnimation('idle'), 1300);
  };

  return (
    <div className="todo">
      <header>TODOLIFE!!!! (best team best project!!!)</header>

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
      <button id="testGet" type="button" onClick={getTest}>test API get</button>
      <button id="testPost" type="button" onClick={postTest}>test API post</button>
    </div>
  );

}