import GameObject from './object';
import * as THREE from 'three';

class Cube extends GameObject {

    render(scene: THREE.Scene) {

        let material = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF
        })

        // Set up the sphere vars
        const RADIUS = 50;
        const SEGMENTS = 16;
        const RINGS = 16;

        // Create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!
        const sphere = new THREE.Mesh(

        new THREE.SphereGeometry(
            RADIUS,
            SEGMENTS,
            RINGS),
        material);

        sphere.position.setZ(-300);
        sphere.position.setX(this.x);
        sphere.position.setY(this.y);

        scene.add(sphere);
    }

}

export default Cube;