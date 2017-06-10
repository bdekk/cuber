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

        let mesh = this._createCube(this.color);
        mesh.name = this.getId();
        mesh.position.setZ(-300);
        mesh.position.setX(this.x);
        mesh.position.setY(this.y);

        // let text = this._createText(this.amount.toString());
        // text.position.setZ(-300);
        // text.position.setX(this.x);
        // text.position.setY(this.y);
        
        scene.remove(mesh);
        scene.add(mesh);

        // scene.remove(text);
        // scene.add(text);
    }

    _createCube(color: string): THREE.Mesh {
        let material = new THREE.MeshBasicMaterial({
            color: color
        })

        var geometry = new THREE.BoxBufferGeometry( this.width, this.height, 1 );
        return new THREE.Mesh( geometry, material );
    }

    _createText(text: string): THREE.Mesh {
        let textGeometry = new THREE.TextGeometry( text, {

            font: this.font,

            size: 50,
            height: 10,
            curveSegments: 12,

            bevelThickness: 1,
            bevelSize: 1,
            bevelEnabled: true

        });

        let textMaterial = new THREE.MeshPhongMaterial( 
            { color: 0xffffff, specular: 0xff0000 }
        );

        let textMesh = new THREE.Mesh(textGeometry, textMaterial)
        textMesh.position.x = -textGeometry.boundingBox.max.x/2;
        textMesh.castShadow = true;
        return textMesh;
    }

    setColor(color: string): void {
        this.color = color;
    }

    getColor(): string {
        return this.color;
    }

    setAmount(amount: number): void {
        this.amount = amount;
    }

    getAmount(): number {
        return this.amount;
    }

}

export default Cube;