'use client'
import { RobotController, Control } from './controller'
import React, { useEffect } from "react";
import { Button } from '@mui/material';
import GamepadListener from './gamepadListener';

export default function Home() {

  const robotController = new RobotController();
  
  useEffect(() => {
    robotController.init()
    const gamepadListener = new GamepadListener()

    gamepadListener.registerListeners(10);

    gamepadListener.breake$.subscribe((isPressed: Boolean) => {
      
    })

/*    gamepadListener.throttle$.subscribe((isPressed: Boolean) => {
      robotController.forward(new Control(
        isPressed
      ))
    })

    gamepadListener.turningLeft$.subscribe((isPressed: Boolean) => {
      robotController.left(new Control(
        isPressed
      ))
    })

    gamepadListener.turningRight$.subscribe((isPressed: Boolean) => {
      robotController.right(new Control(
        isPressed
      ))
    })

    gamepadListener.breake$.subscribe((isPressed: Boolean) => {
      robotController.backwards(new Control(
        isPressed
      ))
    })

*/

    //document.addEventListener('keydown', (event: KeyboardEvent) => {captureEvent(event, false)});
    //document.addEventListener('keyup', (event: KeyboardEvent) => {captureEvent(event, true)});
    
    return () => {
      //document.removeEventListener('keydown', (event: KeyboardEvent) => {captureEvent(event, false)});
      //document.removeEventListener('keyup', (event: KeyboardEvent) => {captureEvent(event, true)});
    };
  });
  
  return (
    <div>

      <Button variant="contained">W</Button>

    </div>
  )
}
