import { useState, useEffect } from 'react'
import React from 'react'
import c from './../Login/Login.module.scss'

export function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval( () => tick(), 1000 );

    return function cleanup() {
        clearInterval(timerID);
    }
  })

   function tick() {
     setDate(new Date());
   }

   return (
      <>
         <span className={c.time}>{date.toString().split('G')[0]}</span>
      </>
    )
}