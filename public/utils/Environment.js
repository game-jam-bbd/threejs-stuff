// Remove this line as we're now using the global THREE object

export class Environment {
    constructor(scene) {
        // Simple ground plane
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb, side: THREE.DoubleSide });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1;
        scene.add(ground);

        // Simple skybox-like background color
        scene.background = new THREE.Color(0xb0e0e6);
    }
}
