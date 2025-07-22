'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import './globals.css';
import './guy.css';
import Link from 'next/link';

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

  const handleComplete = (completedItem: string) => {
    const newList: string[] = [];
    for (const item of list) {
      if (item !== completedItem) {
        newList.push(item);
      }
    }
    setList(newList);
    setAnimation('smileUp');
    setTimeout(() => setAnimation('smileDown'), 1000);
    setTimeout(() => setAnimation('idle'), 1300);
  };

  return (
    <div className="todo">
      <header>TODOLIFE!!!! (best team best project)</header>

      <p>TODO:</p>
      <div className="list">
      
        <ul>
          {list.map((item) => (
            <li key={item}>
              <button className="check" onClick={() => handleComplete(item)}></button> {item} 
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