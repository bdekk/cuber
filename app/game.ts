import World from './world';
import Cube from './cube';

/**
 * Instructions:
 * - number shows up on screen
 * - tap that amount of the same color cubes  (game mode: plus / multiply)
 * - cubes are removed, new cubes appear
 */
class Game {
    
    world: World;
    
    constructor() {
        this.world = new World();
        this.init();
        // let cube = new Cube(0,0, 20, 20);
        // this.world.add(cube);
        // this.world.render();
        // this.world.remove(cube);
        // cube.down();
        // cube.left();
        // cube.setColor("#ff3737");
        this.world.render();
    }

    create() {    
        
    }

    destroy() {

    }

    init() {
        let H_TILES = 8;
        let W_TILES = 8;
        let CUBE_WIDTH = 20;
        let CUBE_HEIGHT = 20;
        let SPACE = 2;

        for(let i = 0; i < H_TILES; i++) {
            for(let j = 0; j < W_TILES; j++) {
                let x:number = i*CUBE_WIDTH + i*SPACE;
                let y:number  = j*CUBE_HEIGHT + j*SPACE;
                let amount: number = Math.floor(Math.random() * 6) + 1
                let color = this.getColor(amount);
                
                let cube: Cube = new Cube(x, y, CUBE_WIDTH, CUBE_HEIGHT, color);
                cube.setAmount(amount);
                this.world.add(cube);
                this.world.onEvent('move', cube, function() {
                    let color = this.shadeBlend(-0.33, cube.getColor());
                    cube.setColor(color);
                    this.world.render(cube);
                    // this.world.remove(cube);
                    // this.world.render();
                }.bind(this));
            }    
        }
    }

    getColor(amount: number): string {
        let color: string = "0xffffff";
        if(amount <= 1) {
            color = "#ff3737"
        } else if(amount <= 10) {
            color = "#eb9909"
        } else if(amount <= 20) {
            color = "#0a4d6d";
        }
        return color;
    }

    shadeBlend(p: number,c0: string, c1: string): string {
        var n=p<0?p*-1:p,u=Math.round,w=parseInt;
        let f: any;
        let t: any;
        let R: any;
        let G: any;
        let B: any;
        let R1: any;
        let B1: any;
        let G1: any;
        if(c0.length>7){
            f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
            return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
        }else{
            f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
            return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
        }
    }
}
 
export default Game;