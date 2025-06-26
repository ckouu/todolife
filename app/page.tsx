'use client';
import { useState } from 'react';
import './globals.css';
import Link from 'next/link';
import React from "react";
import lilGuy from "../assets/lilguy.png";
import lilGuySmile from "../assets/lilguysmile.png";

export default function Page() {
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [guy, setGuy] = useState(lilGuy.src);
  const handleSave = () => {
    setGuy(lilGuySmile.src);
    setTimeout(() => setGuy(lilGuy.src), 1000);
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
        <img src={guy} alt="Image"></img>
      </div>
    </div>
  );

}
