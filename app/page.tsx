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
    <><div>
      <header>TODOLIFE!!!!</header>
      <p>coolest most awesome project EVER evan candra alice best team EVER let's go</p>
      <Link href="/test">test link</Link>
      <p>List:</p>

      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div>
        <p>Add new item: </p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} />
        <button type="button" onClick={handleSave}>Save</button>
      </div>
   </div>
   <img src={lilGuy.src} alt="Image"></img>
   </>
  );
}