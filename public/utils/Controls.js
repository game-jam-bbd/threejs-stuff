export class Controls {
    constructor(paperPlane) {
        this.paperPlane = paperPlane;
        this.speed = 0.02;
        this.rotationSpeed = 0.02;

        window.addEventListener('keydown', (event) => this.onKeyDown(event));
    }

    onKeyDown(event) {
        switch (event.code) {
            case 'ArrowUp':
                this.paperPlane.mesh.rotation.x -= this.rotationSpeed;
                break;
            case 'ArrowDown':
                this.paperPlane.mesh.rotation.x += this.rotationSpeed;
                break;
            case 'ArrowLeft':
                this.paperPlane.mesh.rotation.y += this.rotationSpeed;
                break;
            case 'ArrowRight':
                this.paperPlane.mesh.rotation.y -= this.rotationSpeed;
                break;
        }
    }

    update() {
        const deltaTime = 0.016;  // Simulating 60fps
        this.paperPlane.update(deltaTime);
    }
}
