'use client';
import { useState } from 'react';
import Todo from '../components/todo';
import '../guy.css';

export default function Page() {
  
  const [animation, setAnimation] = useState("idle");


  function Guy({animation='idle'}) {
    return(<div className={`guy ${animation}`}/>);
  }

  return (
    <div>
        <Todo animation={animation} onSetAnimation={setAnimation} goal="fitness"></Todo>
        <div className="guy">
            <Guy animation={animation}></Guy>
        </div>
    </div>
  );

}