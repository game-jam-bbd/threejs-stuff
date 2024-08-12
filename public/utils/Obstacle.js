import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Obstacle {
    constructor(scene, modelPath, scale, position) {
        this.scene = scene;
        this.mesh = null;
        this.modelPath = modelPath;
        this.scale = scale;
        this.position = position;
        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load(this.modelPath, (gltf) => {
            this.mesh = gltf.scene;
            this.mesh.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.mesh.position.set(this.position.x, this.position.y, this.position.z);
            this.scene.add(this.mesh);
        });
    }
}
