import GameObject from './object';
import * as THREE from 'three';

class Scene {

    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private raycaster: THREE.Raycaster;
    // private font: THREE.Font;

    private clickObjects: Map<GameObject, Function>;
    private moveObjects: Map<GameObject, Function>;


    constructor(private objects: Array<GameObject> = [], private properties: any = {background: "#1E1D23"}) {
        this.objects = objects;
        this.properties = properties;
        this.clickObjects = new Map<GameObject, Function>();
        this.moveObjects = new Map<GameObject, Function>();

        // document.addEventListener('mousedown', this._onMouseDown, false);
        document.addEventListener('mousedown', evt => this._onMouseDown(evt));
        document.addEventListener('mousemove', evt => this._onMouseMove(evt));

        // three.js view
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer();
        this.raycaster = new THREE.Raycaster();
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

    render(obj: GameObject = null) {
        if(obj) {
            obj.render(this.scene);
        } else {
            this.objects.forEach(obj => obj.render(this.scene));
        }
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

    _findIntersects(e: any): Array<THREE.Intersection> {
        e.preventDefault();

        let mouseVector = new THREE.Vector3();
        mouseVector.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        mouseVector.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

         // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera( mouseVector, this.camera );

        // calculate objects intersecting the picking ray
        let intersects = this.raycaster.intersectObjects(this.scene.children);
        return intersects;
    }

    _onMouseDown( e: any ): void {
        let intersects: Array<THREE.Intersection> = this._findIntersects(e);

        for ( let i = 0; i < intersects.length; i++ ) {
            this.clickObjects.forEach((callback: Function, obj: GameObject) => {
                if(intersects[ i ].object.name == obj.getId()) {
                    callback.call(this, obj, e);
                }
            });
        }
    }

    _onMouseMove( e: any ): void {
        let intersects: Array<THREE.Intersection> = this._findIntersects(e);

        for ( let i = 0; i < intersects.length; i++ ) {
            this.moveObjects.forEach((callback: Function, obj: GameObject) => {
                if(intersects[ i ].object.name == obj.getId()) {
                    callback.call(this, obj, e);
                }
            });
        }
    }

    /*
        params: event: 'move' or 'click', object: 'target object', callback: 'Callback function on event'
     */
    onEvent(event: string, object: GameObject, callback: Function): void {
        if(event == 'click') {
            this.clickObjects.set(object, callback);
        } else if(event == 'move') {
            this.moveObjects.set(object, callback);
        }
        
    }

    // function onMouseMove( event ) {

    //     // calculate mouse position in normalized device coordinates
    //     // (-1 to +1) for both components

    //     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    //     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // }

    // function render() {

    //     // update the picking ray with the camera and mouse position
    //     raycaster.setFromCamera( mouse, camera );

    //     // calculate objects intersecting the picking ray
    //     var intersects = raycaster.intersectObjects( scene.children );

    //     for ( var i = 0; i < intersects.length; i++ ) {

    //         intersects[ i ].object.material.color.set( 0xff0000 );

    //     }

    //     renderer.render( scene, camera );

    // }

    // window.addEventListener( 'mousemove', onMouseMove, false );

    // window.requestAnimationFrame(render);
}

export default Scene;
