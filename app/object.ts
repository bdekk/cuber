import * as THREE from 'three';
import Point from './point';

class GameObject {

    constructor(protected x: number, protected y: number, protected width: number, protected height: number) {
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;   
    }

    render(scene: THREE.Scene) {    
    }

    up(): Point {
        this.y = this.y-1;
        return new Point(this.x, this.y);;
    }

    down(): Point {
        this.y = this.y+1;
        return new Point(this.x, this.y);
    }


    left(): Point {
        this.x = this.x-1;    
        return new Point(this.x, this.y);
    }


    right(): Point {
        this.x = this.x+1;
        return new Point(this.x, this.y);
    }
}

export default GameObject;