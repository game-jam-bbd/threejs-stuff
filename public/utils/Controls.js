export class Controls {
    constructor(paperPlane) {
        this.paperPlane = paperPlane;
        this.speed = 0.2;
        this.rotationSpeed = 0.05;

        window.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('keyup', (event) => this.onKeyUp(event));
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
        }
    }

    onKeyUp(event) {
        // Reset rotation when key is released
        if (!this.paperPlane.mesh) return;
        this.paperPlane.mesh.rotation.set(0, 0, 0);
    }

    update(deltaTime) {
        if (this.paperPlane.mesh) {
            // Clamp the plane's position to keep it within view
            this.paperPlane.mesh.position.y = Math.max(1, Math.min(10, this.paperPlane.mesh.position.y));
            this.paperPlane.mesh.position.x = Math.max(-20, Math.min(20, this.paperPlane.mesh.position.x));
        }
    }
}
