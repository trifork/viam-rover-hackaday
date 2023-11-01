
import * as VIAM from '@viamrobotics/sdk';

class RobotController {
    
    public async controlRobot() {
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
        const rightClient = new VIAM.MotorClient(robot, 'right');
        const rightReturnValue = await rightClient.isMoving();
        console.log('right isMoving return value:', rightReturnValue);

        //rightClient.setPower(-0.5)
        rightClient.stop()
      
        // left
        const leftClient = new VIAM.MotorClient(robot, 'left');
        const leftReturnValue = await leftClient.isMoving();
        console.log('left isMoving return value:', leftReturnValue);
      
        // viam_base
        const viamBaseClient = new VIAM.BaseClient(robot, 'viam_base');
        const viamBaseReturnValue = await viamBaseClient.isMoving();
        console.log('viam_base isMoving return value:', viamBaseReturnValue);
      
        // cam
        const camClient = new VIAM.CameraClient(robot, 'cam');
        const camReturnValue = await camClient.getImage();
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
        const myLidarClient = new VIAM.CameraClient(robot, 'my_lidar');
        const myLidarReturnValue = await myLidarClient.getImage();
        console.log('my_lidar getImage return value:', myLidarReturnValue);
      
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




export default RobotController