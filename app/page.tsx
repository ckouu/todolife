'use client';
import { useState } from 'react';
import './globals.css';
import Link from 'next/link';
import React from "react";
import lilGuy from "../assets/guy.png";
import lilGuyHappyKeyframe from "../assets/guy_happy_keyframe1.png";
import lilGuySmile from "../assets/guy_happy.png";

export default function Page() {
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [guy, setGuy] = useState(lilGuy.src);
  const handleSave = () => {
    setGuy(lilGuyHappyKeyframe.src);
    setTimeout(() => setGuy(lilGuySmile.src), 1000);
    setTimeout(() => setGuy(lilGuyHappyKeyframe.src), 1000);
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
    setGuy(lilGuyHappyKeyframe.src);
    setTimeout(() => setGuy(lilGuySmile.src), 1000)    
    setTimeout(() => setGuy(lilGuyHappyKeyframe.src), 1000);
    setTimeout(() => setGuy(lilGuy.src), 1000);
    setList(newList);
  };

  return (
    <div className="todo">
      <header>TODOLIFE!!!! (best team best project)</header>
      <Link href="/test">test link</Link>

      <p>TODO:</p>
      <div className="list">
      
        <ul>
          {list.map((item) => (
            <li key={item}>{item} <button onClick={() => handleComplete(item)}>Complete</button></li>
          ))}
        </ul>
      </div>

      <div className="add">
        <p>Add new item: </p>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
        />
        <button type="button" onClick={handleSave} disabled={input === ""}>Save</button>
      </div>
      <div className="guy">
        <img src={guy} width={400} height={400} alt="Image"></img>
      </div>
    </div>
  );

}
