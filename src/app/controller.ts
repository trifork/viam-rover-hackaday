
import * as VIAM from '@viamrobotics/sdk';

class Control {
  isPressed: Boolean;

  constructor(isPressed: Boolean) {
    this.isPressed = isPressed;
  }
}

class RobotController {
    leftClient!: VIAM.MotorClient;
    rightClient!: VIAM.MotorClient;
    camClient!: VIAM.CameraClient;

    motorClientStop : Number = 0

    backwards(control: Control) {
        const power = control.isPressed ? -1 : 0;
        this.leftMotorClient(power)
        this.rightMotorClient(power)
    }

    forward(control: Control) {
        const power = control.isPressed ? 1 : 0;
        this.leftMotorClient(power)
        this.rightMotorClient(power)
    }

    left(control: Control) {
        const power = control.isPressed ? 1 : 0;
        this.leftMotorClient(power)
        this.rightMotorClient(0)
    }

    right(control: Control) {
      const power = control.isPressed ? 1 : 0;
      this.rightMotorClient(power)
      this.leftMotorClient(0) 
    }

    stop() {
        this.leftMotorClient(0)
        this.rightMotorClient(0)
    }

    private leftMotorClient(power: number) {
        this.motorClient(power, this.leftClient)
    }

    private rightMotorClient(power: number) {
        this.motorClient(power, this.rightClient)
    }

    private motorClient(power: number, client: VIAM.MotorClient) {
        if(power == this.motorClientStop) {
          client.stop()
          return
        }
        
        client.setPower(power)
    }

    public async init() {
        const host = 'iamrobot-main.nm13vq5v0p.viam.cloud';
      
        const robot = await VIAM.createRobotClient({
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
        const localClient = new VIAM.BoardClient(robot, 'local');
        const localReturnValue = await localClient.getGPIO('16');
        console.log('local getGPIO return value:', localReturnValue);
      
        // right
        this.rightClient = new VIAM.MotorClient(robot, 'right');
        const rightReturnValue = await this.rightClient.isMoving();
        console.log('right isMoving return value:', rightReturnValue);
      
        // left
        this.leftClient = new VIAM.MotorClient(robot, 'left');
        const leftReturnValue = await this.leftClient.isMoving();
        console.log('left isMoving return value:', leftReturnValue);
      
        // viam_base
        const viamBaseClient = new VIAM.BaseClient(robot, 'viam_base');
        const viamBaseReturnValue = await viamBaseClient.isMoving();
        console.log('viam_base isMoving return value:', viamBaseReturnValue);
      
        // cam
        this.camClient = new VIAM.CameraClient(robot, 'cam');
        const camReturnValue = await this.camClient.getImage();
        console.log('cam getImage return value:', camReturnValue);
      
        // Renc
        const rencClient = new VIAM.EncoderClient(robot, 'Renc');
        const rencReturnValue = await rencClient.getProperties();
        console.log('Renc getProperties return value:', rencReturnValue);
      
        // Lenc
        const lencClient = new VIAM.EncoderClient(robot, 'Lenc');
        const lencReturnValue = await lencClient.getProperties();
        console.log('Lenc getProperties return value:', lencReturnValue);
      
        // accelerometer
        const accelerometerClient = new VIAM.MovementSensorClient(robot, 'accelerometer');
        const accelerometerReturnValue = await accelerometerClient.getLinearAcceleration();
        console.log('accelerometer getLinearAcceleration return value:', accelerometerReturnValue);
      
        // my_lidar
        //const myLidarClient = new VIAM.CameraClient(robot, 'my_lidar');
        //const myLidarReturnValue = await myLidarClient.getImage();
        //console.log('my_lidar getImage return value:', myLidarReturnValue);
      
        // Data-Management-Service
        const dataManagementServiceClient = new VIAM.DataManagerClient(robot, 'Data-Management-Service');
        const dataManagementServiceReturnValue = await dataManagementServiceClient.sync();
        console.log('Data-Management-Service sync return value:', dataManagementServiceReturnValue);
      
        console.log('Resources:');
        console.log(await robot.resourceNames());
      }
      
      //main().catch((error) => {
      //  console.error('encountered an error:', error)
      //});
}


export { RobotController, Control}