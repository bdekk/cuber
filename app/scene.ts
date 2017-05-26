import GameObject from './object';
import * as THREE from 'three';

class Scene {

    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;

    constructor(private objects: Array<GameObject> = [], private properties: any = {background: "#1E1D23"}) {
        this.objects = objects;
        this.properties = properties;

        // three.js view
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer()
        this.init();
    }

    add(object: GameObject) {
        this.objects.push(object);
    }

    create() {
        this.render();
    }

    update() {
        this.render();
    }

    destroy() {
        this.objects = [];
    }

    init() {
         // set size
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // add canvas to dom
        document.body.appendChild(this.renderer.domElement);

        // add axis to the scene
        let axis = new THREE.AxisHelper(10);

        this.scene.add(axis);

        // add lights
        let light = new THREE.DirectionalLight(0xffffff, 1.0);

        light.position.set(100, 100, 100);

        this.scene.add(light);

        let light2 = new THREE.DirectionalLight(0xffffff, 1.0);

        light2.position.set(-100, 100, -100);

        this.scene.add(light2);

        this.scene.background = new THREE.Color( this.properties.background );
    }

    render() {
        this.objects.forEach(obj => obj.render(this.scene));
        this.animate();
    } 

    animate() {
        requestAnimationFrame(()=>this.animate());
        this.renderer.render(this.scene, this.camera);
    }
}

export default Scene;
