'use client';
import { useState } from 'react';
import './globals.css';
import Link from 'next/link';
import React from "react";
import lilGuy from "../assets/lilguy.png";

export default function Page() {
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSave = () => {
    setList([...list, input]);
    setInput("");
  };

  return (
    <div className="todo">
      <header>TODOLIFE!!!! (best team best project)</header>
      <Link href="/test">test link</Link>

      <p>TODO:</p>
      <div className="list">
      
        <ul>
          {list.map((item) => (
            <li key={item}>{item}</li>
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
        <button type="button" onClick={handleSave}>Save</button>
      </div>
      <div className="guy">
        <img src={lilGuy.src} alt="Image"></img>
      </div>
    </div>
  );

}
