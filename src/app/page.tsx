'use client';
import { useEffect, useState } from 'react';
import './globals.css';
import Link from 'next/link';
import React from "react";
import lilGuy from "../../public/guy.png";
import lilGuyHappyKeyframe from "../../public/guy_happy_keyframe1.png";
import lilGuySmile from "../../public/guy_happy.png";

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
  const [guy, setGuy] = useState(lilGuy.src);

  const handleSave = (): void => {
    setGuy(lilGuySmile.src);
    setTimeout(() => setGuy(lilGuy.src), 1000);
    setList([...list, input]);
    setInput("");
  };

  const handleComplete = (completedItem: string) => {
    const newList: string[] = [];
    for (const item of list) {
      if (item !== completedItem) {
        newList.push(item);
      }
    }
    setGuy(lilGuySmile.src);
    setTimeout(() => setGuy(lilGuy.src), 1000);
    setList(newList);
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
        <img src={guy} width={400} height={400} alt="Image"></img>
      </div>
      <button id="testGet" type="button" onClick={getTest}>test API get</button>
      <button id="testPost" type="button" onClick={postTest}>test API post</button>
    </div>
  );

}