// Remove this line as we're now using the global THREE object

import { Water } from 'https://unpkg.com/three@0.152.2/examples/jsm/objects/Water.js';
import { Sky } from 'https://unpkg.com/three@0.152.2/examples/jsm/objects/Sky.js';

export class Environment {
    constructor(scene, renderer) {
        this.scene = scene;
        this.renderer = renderer;
        this.water = null;
        this.sky = null;
        this.sun = new THREE.Vector3();

        this.createWater();
        this.createSky();
        this.updateSun();
    }

    createWater() {
        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
        this.water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load('../textures/waternormals.jpg', function(texture) {
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

    update(time) {
        this.water.material.uniforms['time'].value += 1.0 / 60.0;
    }
}
