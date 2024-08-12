// Remove this line as we're now using the global THREE object
import * as THREE from 'three';
import { Environment } from './utils/Environment.js';

let container, scene, camera, renderer, environment;

function init() {
    // Set up the scene, camera, and renderer
    container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    container.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.set( 30, 30, 100 );

    // Add lighting
    //const ambientLight = new THREE.AmbientLight(0x404040);
    //scene.add(ambientLight);

    //const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    //directionalLight.position.set(1, 1, 1).normalize();
    //scene.add(directionalLight);

    // Create the environment
    environment = new Environment(scene, renderer, camera);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    //requestAnimationFrame(animate);
    environment.update();
    renderer.render(scene, camera);
}

init();
animate();
