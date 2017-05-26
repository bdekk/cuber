import GameObject from './object';
import * as THREE from 'three';

class Cube extends GameObject {

    constructor(protected x: number, protected y: number, protected width: number, protected height: number, private color: string = "0xFFFFFF") {
        super(x,y, width, height);
        this.color = color;
    }

    render(scene: THREE.Scene) {

        let material = new THREE.MeshBasicMaterial({
            color: this.color
        })

        var geometry = new THREE.BoxBufferGeometry( this.width, this.height, 1 );
        var cube = new THREE.Mesh( geometry, material );

        cube.position.setZ(-300);
        cube.position.setX(this.x);
        cube.position.setY(this.y);

        scene.add(cube);
    }

}

export default Cube;