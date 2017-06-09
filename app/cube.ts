import GameObject from './object';
import * as THREE from 'three';

class Cube extends GameObject {

    private amount: number;

    constructor(protected x: number, protected y: number, protected width: number, protected height: number, private color: string = "0xFFFFFF") {
        super(x,y, width, height);
        this.color = color;
        this.amount = 1;
    }

    render(scene: THREE.Scene) {

        let material = new THREE.MeshBasicMaterial({
            color: this.color
        })

        var geometry = new THREE.BoxBufferGeometry( this.width, this.height, 1 );
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.name = this.getId();
        this.mesh.position.setZ(-300);
        this.mesh.position.setX(this.x);
        this.mesh.position.setY(this.y);
        scene.add(this.mesh);
    }

    setColor(color: string): void {
        this.color = color;
    }

    setAmount(amount: number): void {
        this.amount = amount;
    }

    getAmount(): number {
        return this.amount;
    }

}

export default Cube;