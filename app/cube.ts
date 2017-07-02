import GameObject from './object';
import * as THREE from 'three';

class Cube extends GameObject {

    private amount: number;
    private selected: boolean;

    constructor(protected x: number, protected y: number, protected width: number, protected height: number, private color: string = "0xFFFFFF") {
        super(x,y, width, height);
        this.color = color;
        this.amount = 1;
        this.selected = false;
    }

    render(scene: THREE.Scene) {

        var geometry = new THREE.BoxBufferGeometry( this.width, this.height, 1 );

        let cubeMesh = this._createCube(this.color, geometry);
        cubeMesh.name = this.getId();
        cubeMesh.position.setZ(-300);
        cubeMesh.position.setX(this.x);
        cubeMesh.position.setY(this.y);


        let outlineMesh = this._createOutline(this.color, geometry);
        outlineMesh.name = this.getId() + '-outline';
        if(this.selected) {
            outlineMesh.position = cubeMesh.position;
            outlineMesh.scale.multiplyScalar(1.05);
            scene.remove(outlineMesh);
            scene.add(outlineMesh);
        } else {
            scene.remove(outlineMesh);
        }

        // let text = this._createText(this.amount.toString());
        // text.position.setZ(-300);
        // text.position.setX(this.x);
        // text.position.setY(this.y);
        
        scene.remove(cubeMesh);
        scene.add(cubeMesh);

        // scene.remove(text);
        // scene.add(text);
    }

    _createOutline(color: string, geometry: THREE.BoxBufferGeometry): THREE.Mesh {
        let outlineMaterial = new THREE.MeshBasicMaterial( { color: color, side: THREE.BackSide } );
        var outlineMesh = new THREE.Mesh( geometry, outlineMaterial );
        return outlineMesh;
    }

    _createCube(color: string, geometry: THREE.BoxBufferGeometry): THREE.Mesh {
        let material = new THREE.MeshBasicMaterial({
            color: color
        })
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

    setSelected(selected: boolean): void {
        this.selected = selected;
    }

    getSelected(): boolean {
        return this.selected;
    }

    setAmount(amount: number): void {
        this.amount = amount;
    }

    getAmount(): number {
        return this.amount;
    }

}

export default Cube;