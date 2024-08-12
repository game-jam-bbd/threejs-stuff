import * as THREE from 'three';
import { Environment } from './utils/Environment.js';
import { PaperPlane } from './utils/PaperPlane.js';
import { Controls } from './utils/Controls.js';

let container, scene, camera, renderer, environment, paperPlane, controls;
let clock;

function init() {
    container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.set(0, 20, 50);  // Adjusted camera position for better view
    camera.lookAt(0, 10, 0);  // Look at the area where the plane will be

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);  // Increased intensity
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);  // Increased intensity
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    environment = new Environment(scene, renderer, camera);
    paperPlane = new PaperPlane(scene);
    controls = new Controls(paperPlane, environment);

    clock = new THREE.Clock();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    const deltaTime = clock.getDelta();
    environment.update();
    paperPlane.update(deltaTime);
    controls.update(deltaTime);
    paperPlane.update(deltaTime);
    renderer.render(scene, camera);
}

init();
animate();
