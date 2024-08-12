import * as THREE from 'three';
import { PaperPlane } from './utils/PaperPlane.js';
import { Environment } from './utils/Environment.js';
import { Controls } from './utils/Controls.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Create the environment and the paper plane
const environment = new Environment(scene);
const paperPlane = new PaperPlane(scene);

// Set up controls
const controls = new Controls(paperPlane);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    try {
        controls.update();
        renderer.render(scene, camera);
    } catch (error) {
        console.error("An error occurred during animation:", error);
    }
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
