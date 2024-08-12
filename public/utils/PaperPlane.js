import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class PaperPlane {
    constructor(scene) {
        this.scene = scene;
        this.mesh = null;
        this.speed = 50;
        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load('utils/models/plane2.glb', (gltf) => {
            this.mesh = gltf.scene;
            this.mesh.scale.set(1, 1, 1);  // Increased scale for better visibility
            this.mesh.position.set(0, 10, 0);  // Start higher above the water
            this.mesh.rotation.y = Math.PI;  // Rotate to face the correct direction
            this.scene.add(this.mesh);
            console.log('Paper plane loaded and added to scene');  // Debug log
        }, undefined, (error) => {
            console.error('An error occurred while loading the paper plane:', error);
        });
    }

    update(deltaTime) {
        if (this.mesh) {
            // Implement a hovering effect
            this.mesh.position.y = 10 + Math.sin(Date.now() * 0.001) * 0.5;  // Hover between 9.5 and 10.5 units high
            
            // Slow down the forward movement
            this.mesh.position.z -= this.speed * deltaTime * 0.1;
            
            // Reset position when it goes too far
            if (this.mesh.position.z < -100) {
                this.mesh.position.z = 100;
            }
        }
    }
}
