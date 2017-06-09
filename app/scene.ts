import GameObject from './object';
import * as THREE from 'three';

class Scene {

    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;

    private clickObjects: Map<GameObject, Function>;

    constructor(private objects: Array<GameObject> = [], private properties: any = {background: "#1E1D23"}) {
        this.objects = objects;
        this.properties = properties;
        this.clickObjects = new Map<GameObject, Function>();

        // document.addEventListener('mousedown', this._onMouseDown, false);
        document.addEventListener('click', evt => this._onMouseDown(evt));

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


        this.camera.position.set(0, 0, 0 );
        // this.camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

        // add axis to the scene
        // let axis = new THREE.AxisHelper(10);

        // this.scene.add(axis);

        // add lights
        // let light = new THREE.DirectionalLight(0xffffff, 1.0);

        // light.position.set(100, 100, 100);

        // this.scene.add(light);

        // let light2 = new THREE.DirectionalLight(0xffffff, 1.0);

        // light2.position.set(-100, 100, -100);

        // this.scene.add(light2);

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

    remove(object: GameObject): boolean {
        let selectedObject = this.scene.getObjectByName(object.getId());
        if(selectedObject) {
            this.scene.remove( selectedObject );
            this.animate();
            return true;
        }
        return false;
    }


    _onMouseDown(e: any): void {
        var vectorMouse = new THREE.Vector3( //vector from camera to mouse
            -(window.innerWidth/2-e.clientX)*2/window.innerWidth,
            (window.innerHeight/2-e.clientY)*2/window.innerHeight,
            -1/Math.tan(22.5*Math.PI/180)); //22.5 is half of camera frustum angle 45 degree
        vectorMouse.applyQuaternion(this.camera.quaternion);
        vectorMouse.normalize();        

        let camX = this.camera.position.x;
        let camY = this.camera.position.y;
        let camZ = this.camera.position.z;

        this.clickObjects.forEach((callback: Function, gameObject: GameObject) => {
            let vectorObject = new THREE.Vector3(); //vector from camera to object
            vectorObject.set(gameObject.getX() - camX, gameObject.getY() - camY, gameObject.getZ() - camZ);
            vectorObject.normalize();
            
            if (vectorMouse.angleTo(vectorObject)*180/Math.PI < 1) {
                //mouse's position is near object's position
                callback.call(this);
            }
        });
    }

    onClick(object: GameObject, callback: Function): void {
        this.clickObjects.set(object, callback);
    }
}

export default Scene;
