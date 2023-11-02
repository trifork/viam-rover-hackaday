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
      }
    ));
    this.subs.add(this.gamepadService.turningLeft$.subscribe( (turningLeft) => {
      // turnLeft
      }
    ));

    this.subs.add(this.gamepadService.turningRight$.subscribe( (turningRight) => {
      // turnRight
      }
    ));
  }
}
