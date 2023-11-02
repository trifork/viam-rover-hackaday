import { Component, OnInit } from '@angular/core';
import { ViamService } from './services/viam-service.service';
import { GamepadService } from './services/gamepad.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ViamAwesome';
  private subs: Subscription = new Subscription();

  private isMovingForward = false;
  private  isTurningLeft = false;
  private isTurningright = false;

  constructor(private viamService: ViamService, private gamepadService: GamepadService) {
   
  }
  async ngOnInit(): Promise<void> {
    await this.viamService.initViam();
    await this.gamepadService.registerListeners(1);
    this.subs.add(this.gamepadService.breake$.subscribe( async (isBreak) => {
        // Reverse
        await this.viamService.brake();
      }
    ));
    this.subs.add(this.gamepadService.throttle$.pipe(tap(isThrottle => isThrottle != this.isMovingForward)).subscribe(async newState => {
      if(newState == true) {
        await this.viamService.leftMotorForward();
        await this.viamService.rightMotorForward();
      } else {
        await this.viamService.brake();
      }
    }));
    this.subs.add(this.gamepadService.turningLeft$.pipe(tap(turningLeft => this.isTurningLeft != turningLeft)).subscribe( async (newState) => {
        if(newState === true) {
          await this.viamService.turnLeft();
        }
      }
    ));

    this.subs.add(this.gamepadService.turningRight$.pipe(tap(turningRight => this.isTurningright != turningRight)).subscribe( async (newState) => {
      // turnRight
      if(newState === true) {
        await this.viamService.turnRight();
      }
    }
    ));

    await this.viamService.getAvailableResources();
  }


}
