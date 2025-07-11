'use client';
import { useEffect, useState } from 'react';
import './globals.css';
import Link from 'next/link';
import React from "react";
import lilGuy from "../assets/lilguy.png";
import lilGuySmile from "../assets/lilguysmile.png";

export default function Page() {
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [guy, setGuy] = useState(lilGuy.src);

  useEffect(() => {
    const inputEl = document.querySelector("input") as HTMLInputElement | null;
    const btnEl = document.querySelector("#saveButton") as HTMLButtonElement | null;

    inputEl?.addEventListener("keypress", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        btnEl?.click();
      }
    });
  })

  const handleSave = () => {
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
      <Link href="/test">test link</Link>

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
          placeholder="Add your todo list item here!" 
        />
        <button id="saveButton" type="button" onClick={handleSave} disabled={input === ""}>Save</button>
      </div>
      <div className="guy">
        <img src={guy} alt="Image"></img>
      </div>
    </div>
  );

}
