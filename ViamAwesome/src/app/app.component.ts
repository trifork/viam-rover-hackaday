import { Component, OnInit } from '@angular/core';
import { ViamService } from './services/viam-service.service';
import { GamepadService } from './services/gamepad.service';
import { Subscription } from 'rxjs';

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
    this.subs.add(this.gamepadService.breake$.subscribe( (isBreak) => {
        // Reverse
        this.viamService.brake();
      }
    ));
    this.subs.add(this.gamepadService.throttle$.subscribe( (isThrottle) => {
      // Forward
        if(this.isMovingForward != isThrottle) {
          this.isMovingForward = isThrottle;
          if(isThrottle) {
            // drive
            console.log('DRIVING')
            this.viamService.leftMotorForward();
            this.viamService.rightMotorForward();
          } else {
            // stop
            this.viamService.brake();
          }
        }

      }
    ));
    this.subs.add(this.gamepadService.turningLeft$.subscribe( (turningLeft) => {
        if(this.isTurningLeft != turningLeft) {
        // turnLeft
        
        }
      }
    ));

    this.subs.add(this.gamepadService.turningRight$.subscribe( (turningRight) => {
      // turnRight
      if(this.isTurningright != turningRight) {
        // turnLeft
        
        }
      }
    ));

    await this.viamService.getAvailableResources();
  }
}
