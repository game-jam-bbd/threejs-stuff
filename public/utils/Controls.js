import * as THREE from 'three';

export class Controls {
    constructor(paperPlane, environment, camera) {
        this.paperPlane = paperPlane;
        this.environment = environment;
        this.camera = camera;
        this.speed = 0.2;
        this.rotationSpeed = 0.05;
        this.brightnessStep = 1;
        this.zoomSpeed = 0.1;
        this.minZoom = 10;
        this.maxZoom = 100;

        window.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('keyup', (event) => this.onKeyUp(event));
        window.addEventListener('wheel', (event) => this.onWheel(event));
    }

    onKeyDown(event) {
        if (!this.paperPlane.mesh) return;

        switch (event.code) {
            case 'ArrowUp':
                this.paperPlane.mesh.position.y += this.speed;
                break;
            case 'ArrowDown':
                this.paperPlane.mesh.position.y -= this.speed;
                break;
            case 'ArrowLeft':
                this.paperPlane.mesh.position.x -= this.speed;
                break;
            case 'ArrowRight':
                this.paperPlane.mesh.position.x += this.speed;
                break;
            case 'KeyE':
                this.environment.adjustSunElevation(this.brightnessStep);
                break;
            case 'KeyQ':
                this.environment.adjustSunElevation(-this.brightnessStep);
                break;
        }
    }

    onKeyUp(event) {
        // Reset rotation when key is released
        if (!this.paperPlane.mesh) return;
        this.paperPlane.mesh.rotation.set(0, 0, 0);
    }

    onWheel(event) {
        event.preventDefault();
        const zoomAmount = event.deltaY * this.zoomSpeed;
        
        // Calculate the new camera position
        const cameraDirection = new THREE.Vector3();
        this.camera.getWorldDirection(cameraDirection);
        const newPosition = this.camera.position.clone().add(cameraDirection.multiplyScalar(zoomAmount));
        
        // Calculate the distance from the new position to the target (assumed to be at 0,0,0)
        const distance = newPosition.length();
        
        // Check if the new position is within the allowed zoom range
        if (distance > this.minZoom && distance < this.maxZoom) {
            this.camera.position.copy(newPosition);
        }
    }

    update(deltaTime) {
        if (this.paperPlane.mesh) {
            // Clamp the plane's position to keep it within view
            this.paperPlane.mesh.position.y = Math.max(1, Math.min(10, this.paperPlane.mesh.position.y));
            this.paperPlane.mesh.position.x = Math.max(-20, Math.min(20, this.paperPlane.mesh.position.x));
        }
    }
}
