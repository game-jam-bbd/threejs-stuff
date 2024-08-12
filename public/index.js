// Remove this line as we're now using the global THREE object
import * as THREE from 'three';
import { PaperPlane } from './utils/PaperPlane.js';
import { Environment } from './utils/Environment.js';
import { Controls } from './utils/Controls.js';

let scene, camera, renderer, environment, paperPlane, controls;

function init() {
    // Set up the scene, camera, and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Create the environment and the paper plane
    environment = new Environment(scene, renderer);
    paperPlane = new PaperPlane(scene);

    // Set up controls
    controls = new Controls(paperPlane);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
    requestAnimationFrame(animate);
    try {
        environment.update(time);
        controls.update();
        renderer.render(scene, camera);
    } catch (error) {
        console.error("An error occurred during animation:", error);
    }
}

init();
animate();
