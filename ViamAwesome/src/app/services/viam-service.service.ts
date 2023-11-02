import { Injectable } from '@angular/core';
import {createRobotClient, BoardClient, MotorClient, BaseClient, CameraClient, DataManagerClient, EncoderClient, MovementSensorClient, RobotClient} from '@viamrobotics/sdk';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';

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
  private lidarClient?: CameraClient;

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
    this.lidarClient = new CameraClient(this.robotClient, 'my_lidar');
  
    // Data-Management-Service
    this.dataManagementClient = new DataManagerClient(this.robotClient, 'Data-Management-Service');
  
    console.log('Resources:'); 

    } catch (error) {
        console.log("Error connecting", error);
    }
  }

  public async getLidar() {
   return await this.lidarClient?.getPointCloud();
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

  public async brake() {
    try {
      await this.rightMotorClient?.stop();
      await this.leftMotorClient?.stop();
    } catch (error) {
      
    }
  }

  public async turnLeft() {
   try {
    await this.leftMotorClient?.setPower(-1);
    await this.rightMotorClient?.setPower(1)
   } catch (error) {
    
   }
  }
  public async turnRight() {
    try {
      await this.leftMotorClient?.setPower(1);
      await this.rightMotorClient?.setPower(-1)
    } catch (error) {
      
    }
  }

  /* private createPCDFile(uint8Array: Uint8Array): Uint8Array {
    // PCD file header
    const header = `# .PCD v.7 - Point Cloud Data file format\nFIELDS x y z\nSIZE 4 4 4\nTYPE F F F\nDATA ascii`;
  
    // Convert the header and data to Uint8Array
    const headerUint8Array = new TextEncoder().encode(header + '\n');
    const newlineUint8Array = new TextEncoder().encode('\n');
    
    // Combine the header and data into a single Uint8Array
    const combinedUint8Array = new Uint8Array(
      headerUint8Array.byteLength + newlineUint8Array.byteLength + uint8Array.byteLength
    );
    combinedUint8Array.set(headerUint8Array, 0);
    combinedUint8Array.set(newlineUint8Array, headerUint8Array.byteLength);
    combinedUint8Array.set(uint8Array, headerUint8Array.byteLength + newlineUint8Array.byteLength);
  
    fs.writeFile('yourPointCloud.pcd', combinedUint8Array, (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return;
      }
      console.log('PCD file created successfully');
    });
    return combinedUint8Array;
  } */

  // Function to create and download the .pcd file
/*  downloadPCDFile(uint8Array: Uint8Array) {
  const pcdData = new Blob([uint8Array], { type: 'octet/stream' });

  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(pcdData);

  // Create an <a> element
  const link = document.createElement('a');
  link.href = url;
  link.download = 'yourPointCloud.pcd'; // Set the filename

  // Append the <a> element to the DOM
  document.body.appendChild(link);

  // Simulate a click on the <a> element to trigger the download
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
} */

  
}
