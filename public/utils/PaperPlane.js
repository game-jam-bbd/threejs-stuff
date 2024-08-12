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
            this.mesh.scale.set(30, 50, 30);  // Doubled the scale for even better visibility
            this.mesh.position.set(0, 20, -50);  // Moved slightly further back
            this.mesh.rotation.y = Math.PI;  // Rotate to face the correct direction
            this.scene.add(this.mesh);
            console.log('Paper plane loaded and added to scene');
            console.log('Plane position:', this.mesh.position);
            console.log('Plane scale:', this.mesh.scale);
        }, undefined, (error) => {
            console.error('An error occurred while loading the paper plane:', error);
        });
    }

    update(deltaTime) {
        if (this.mesh) {
            // Implement a hovering effect
            this.mesh.position.y = 20 + Math.sin(Date.now() * 0.001) * 1;  // Hover between 19 and 21 units high
        }
    }
}
