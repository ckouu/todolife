'use client';
import { useState } from 'react';
import './globals.css';

export default function Page() {
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSave = () => {
    setList([...list, input]);
    setInput("");
  };

  return (
    <div>
      <header>TODOLIFE!!!!</header>
      <p>coolest most awesome project EVER evan candra alice best team EVER let's go</p>
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
          onChange={(e) => setInput(e.target.value)} 
        />
        <button type="button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}