import * as THREE from 'three';
import { Water } from 'three/addons/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { Obstacle } from './Obstacle.js';

export class Environment {
    constructor(scene, renderer, camera) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.water = null;
        this.sky = null;
        this.sun = new THREE.Vector3();

        this.isMouseDown = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.targetRotationXOnMouseDown = 0;
        this.targetRotationYOnMouseDown = 0;

        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.createWater();
        this.createSky();
        this.updateSun();

        document.addEventListener('mousedown', (event) => this.onMouseDown(event), false);
        document.addEventListener('mousemove', (event) => this.onMouseMove(event), false);
        document.addEventListener('mouseup', () => this.onMouseUp(), false);
    }

    onMouseDown(event) {
        this.isMouseDown = true;
        this.mouseX = event.clientX - this.windowHalfX;
        this.mouseY = event.clientY - this.windowHalfY;
        this.targetRotationXOnMouseDown = this.targetRotationX;
        this.targetRotationYOnMouseDown = this.targetRotationY;
    }

    onMouseMove(event) {
        if (this.isMouseDown) {
            this.mouseX = event.clientX - this.windowHalfX;
            this.mouseY = event.clientY - this.windowHalfY;

            this.targetRotationX = this.targetRotationXOnMouseDown + (this.mouseX - this.targetRotationXOnMouseDown) * 0.0005;
            this.targetRotationY = this.targetRotationYOnMouseDown + (this.mouseY - this.targetRotationYOnMouseDown) * 0.0005;
        }
    }

    onMouseUp() {
        this.isMouseDown = false;
    }

    createObstacles() {
        const obstacleData = [
            { model: 'utils/models/palm_tree.glb', scale: { x: 0.1, y: 0.1, z: 0.1 }, positions: [
                { x: 10, y: 0, z: -50 },
                { x: -15, y: 0, z: -150 },
                { x: 5, y: 0, z: -250 }
            ]},
            { model: 'utils/models/lighthouse.glb', scale: { x: 0.05, y: 0.05, z: 0.05 }, positions: [
                { x: -20, y: 0, z: -100 },
                { x: 25, y: 0, z: -300 }
            ]},
            { model: 'utils/models/wind_turbine.glb', scale: { x: 0.1, y: 0.1, z: 0.1 }, positions: [
                { x: 0, y: 0, z: -200 },
                { x: -30, y: 0, z: -350 }
            ]}
        ];

        obstacleData.forEach(data => {
            data.positions.forEach(position => {
                this.obstacles.push(new Obstacle(this.scene, data.model, data.scale, position));
            });
        });
    }

    createWater() {
        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
        this.water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load('utils/textures/waternormals.jpg', function(texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                }),
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: this.scene.fog !== undefined
            }
        );
        this.water.rotation.x = -Math.PI / 2;
        this.scene.add(this.water);
    }

    createSky() {
        this.sky = new Sky();
        this.sky.scale.setScalar(10000);
        this.scene.add(this.sky);

        const skyUniforms = this.sky.material.uniforms;
        skyUniforms['turbidity'].value = 10;
        skyUniforms['rayleigh'].value = 2;
        skyUniforms['mieCoefficient'].value = 0.005;
        skyUniforms['mieDirectionalG'].value = 0.8;
    }

    updateSun() {
        const parameters = {
            elevation: 2,
            azimuth: 180
        };

        const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
        const theta = THREE.MathUtils.degToRad(parameters.azimuth);

        this.sun.setFromSphericalCoords(1, phi, theta);

        this.sky.material.uniforms['sunPosition'].value.copy(this.sun);
        this.water.material.uniforms['sunDirection'].value.copy(this.sun).normalize();

        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        const sceneEnv = new THREE.Scene();
        sceneEnv.background = this.sky;
        const renderTarget = pmremGenerator.fromScene(sceneEnv);
        this.scene.environment = renderTarget.texture;
    }

    update() {
        this.camera.position.x = Math.sin(this.targetRotationX) * 100;
        this.camera.position.z = Math.cos(this.targetRotationX) * 100;
        this.camera.position.y = Math.sin(this.targetRotationY) * 100;
        this.camera.lookAt(this.scene.position);

        this.water.material.uniforms['time'].value += 1.0 / 60.0;
    }
}
