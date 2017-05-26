import * as THREE from 'three';

class GameObject {

    constructor(protected x: number, protected y: number) {
        this.x = x;
        this.y = y;    
    }

    render(scene: THREE.Scene) {    
    }

    up() {
        this.y = this.y+1;
    }

    down() {
        this.y = this.y+1;
    }


    left() {
        this.x = this.x-1;
    }


    right() {
        this.x = this.x+1;
    }
}

export default GameObject;