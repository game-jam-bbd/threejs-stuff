import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class PaperPlane {
    constructor(scene) {
        this.scene = scene;
        this.mesh = null;
        this.speed = 10;
        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load('utils/models/plane2.glb', (gltf) => {
            this.mesh = gltf.scene;
            this.mesh.scale.set(0.1, 0.1, 0.1);  // Adjust scale as needed
            this.mesh.position.set(0, 5, 0);  // Start above the water
            this.scene.add(this.mesh);
        });
    }

    update(deltaTime) {
        if (this.mesh) {
            this.mesh.position.z -= this.speed * deltaTime;
            
            // Reset position when it goes too far
            if (this.mesh.position.z < -1000) {
                this.mesh.position.z = 1000;
            }
        }
    }
}
