import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { XBOX360_BUTTONS } from '../models/buttons';

@Injectable({
  providedIn: 'root'
})
export class GamepadService {
  private throttledEvent: Subject<boolean> = new Subject();
  private leftEvent: Subject<boolean> = new Subject();
  private rightEvent: Subject<boolean> = new Subject();
  private brakeEvent: Subject<boolean> = new Subject();
  private gamepadSubject: Subject<Gamepad> = new Subject();
  public throttle$: Observable<boolean> = this.throttledEvent.asObservable();
  public turningLeft$: Observable<boolean> = this.leftEvent.asObservable();
  public turningRight$: Observable<boolean> = this.rightEvent.asObservable();
  public breake$: Observable<boolean> = this.brakeEvent.asObservable();
  public gamerPad$: Observable<Gamepad> = this.gamepadSubject.asObservable();


  public async registerListeners(interval: number) {
    window.addEventListener("gamepadconnected", (e) => {
        console.log(
          "Gamepad connected at index %d: %s. %d buttons, %d axes.",
          e.gamepad.index,
          e.gamepad.id,
          e.gamepad.buttons.length,
          e.gamepad.axes.length,
        );
        setInterval(() => {
            var allButtons = navigator.getGamepads()[0]?.buttons;
            if (allButtons) {
                this.throttledEvent.next(allButtons[XBOX360_BUTTONS.A].pressed);
                this.brakeEvent.next(allButtons[XBOX360_BUTTONS.B].pressed);
                this.leftEvent.next(allButtons[XBOX360_BUTTONS.DPAD_LEFT].pressed);
                this.rightEvent.next(allButtons[XBOX360_BUTTONS.DPAD_RIGHT].pressed);
            }
        }, interval);
      });

}
}
