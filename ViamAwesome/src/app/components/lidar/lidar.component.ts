import { Component, OnInit, ViewChild } from '@angular/core';
import { ViamService } from 'src/app/services/viam-service.service';
import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';

@Component({
  selector: 'app-lidar',
  templateUrl: './lidar.component.html',
  styleUrls: ['./lidar.component.css'],
})
export class LidarComponent implements OnInit {
  private scene?: THREE.Scene;

  /**
   *
   */
  constructor(private viamService: ViamService) {
    
  }
  ngOnInit(): void {
    this.scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


  }

  public async getLidar() {
    const lidar = await this.viamService.getLidar();

    if (lidar)
    {
        const loader = new PCDLoader();
        const obj = loader.parse(lidar);

        this.scene?.add(obj);

    }
    console.log(lidar);
  }
}
