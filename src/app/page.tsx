'use client'
import RobotController from './controller'
import React, { useEffect } from "react";
import { Button } from '@mui/material';

export default function Home() {

  new RobotController().controlRobot()

  const log = (key: any) => {console.log(key)}
  
  useEffect(() => {
    document.addEventListener('keydown', log);
    return () => {
      document.removeEventListener('keydown', log);
    };
  });
  
  return (
    <div>

      <Button variant="contained">W</Button>

    </div>
  )
}
