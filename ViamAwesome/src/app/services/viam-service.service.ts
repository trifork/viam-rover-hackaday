import { Injectable } from '@angular/core';
import {createRobotClient, BoardClient, MotorClient, BaseClient, CameraClient, DataManagerClient, EncoderClient, MovementSensorClient, RobotClient} from '@viamrobotics/sdk';

@Injectable({
  providedIn: 'root'
})
export class ViamService {

  private localBoardClient?: BoardClient;
  private rightMotorClient?: MotorClient;
  private leftMotorClient?: MotorClient;
  private baseClient?: BaseClient;
  private cameraClient?: CameraClient;
  private rencEncoderClient?: EncoderClient;
  private accelerometerMovementClient?: MovementSensorClient;
  private dataManagementClient?: DataManagerClient;
  private robotClient?: RobotClient;

  constructor() { }

  public async initViam() {
    const host = 'iamrobot-main.nm13vq5v0p.viam.cloud';
      
    try {

       const host = 'iamrobot-main.nm13vq5v0p.viam.cloud';

      this.robotClient = await createRobotClient({
        host,
        credential: {
          type: 'robot-location-secret',
          payload: 'x8ml9izy7z6p5esu1eufr4zs30hv9s60sb12fyu45ppx1j7f',
        },
        authEntity: host,
        signalingAddress: 'https://app.viam.com:443',
      });
      
    
    // Note that the pin supplied is a placeholder. Please change this to a valid pin you are using.
    // local
    this.localBoardClient = new BoardClient(this.robotClient, 'local');
  
    // right
    this.rightMotorClient = new MotorClient(this.robotClient, 'right');
  
    // left
    this.leftMotorClient = new MotorClient(this.robotClient, 'left');
  
    // viam_base
    this.baseClient = new BaseClient(this.robotClient, 'viam_base');
  
    // cam
    this.cameraClient = new CameraClient(this.robotClient, 'cam');
  
    // Renc
    this.rencEncoderClient = new EncoderClient(this.robotClient, 'Renc');
  
    // Lenc
    this.rencEncoderClient = new EncoderClient(this.robotClient, 'Lenc');
  
    // accelerometer
    this.accelerometerMovementClient = new MovementSensorClient(this.robotClient, 'accelerometer');
  
    // my_lidar
    this.cameraClient = new CameraClient(this.robotClient, 'my_lidar');
  
    // Data-Management-Service
    this.dataManagementClient = new DataManagerClient(this.robotClient, 'Data-Management-Service');
  
    console.log('Resources:'); 

    } catch (error) {
        console.log("Error connecting", error);
    }
  }

  public async getAvailableResources() {
    if(!this.robotClient) return;
    console.log(await this.robotClient.resourceNames());
  }

  public leftMotorForward() {
    this.leftMotorClient?.setPower(1);
  }

  public leftMotorReverse() {
  }

  public rightMotorForward() {
    this.rightMotorClient?.setPower(1);
  }

  public rightMotorReverse() {

  }

  public brake() {
    this.rightMotorClient?.stop();
    this.leftMotorClient?.stop();
  }

  public turnLeft() {
    this.leftMotorClient?.setPower(1);
    this.rightMotorClient?.setPower(-1)
  }
  public turnRight() {
    this.leftMotorClient?.setPower(-1);
    this.rightMotorClient?.setPower(1)
  }
}
