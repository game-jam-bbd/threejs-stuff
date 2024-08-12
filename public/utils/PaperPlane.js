import * as THREE from 'three';

export class PaperPlane {
    constructor(scene) {
        const planeGeometry = new THREE.ConeGeometry(0.2, 1, 3);
        const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffa07a });
        this.mesh = new THREE.Mesh(planeGeometry, planeMaterial);
        this.mesh.rotation.x = Math.PI / 2;  // Pointing forward

        this.mesh.position.set(0, 0, 0);  // Start at the origin
        scene.add(this.mesh);
    }

    // Example method for updating plane position
    update(deltaTime) {
        // Add simple forward movement
        this.mesh.position.z -= deltaTime * 0.5;  // Move forward over time
    }
}
