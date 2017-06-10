import * as THREE from 'three';
import Point from './point';
// import myrad from './assets/fonts/myrad.json';

class GameObject {

    private id: string;
    protected font: THREE.Font;

    constructor(protected x: number, protected y: number, protected width: number, protected height: number) {
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
        this.id = Math.random().toString();

        let loader = new THREE.FontLoader();
        // loader.load( './assets/fonts/myrad.json', function ( font: any ) {
        //     this.font = font;
        // });
    }

    render(scene: THREE.Scene) {    
    }

    up(): Point {
        this.y = this.y+10;
        return new Point(this.x, this.y);;
    }

    down(): Point {
        this.y = this.y-10;
        return new Point(this.x, this.y);
    }


    left(): Point {
        this.x = this.x-10;    
        return new Point(this.x, this.y);
    }


    right(): Point {
        this.x = this.x+10;
        return new Point(this.x, this.y);
    }

    getId(): string {
        return this.id;
    }

    getX(): number {
        return this.x;
    }
    
    getY(): number {
        return this.y;
    }

    getZ(): number {
        return -400;
    }
}

export default GameObject;