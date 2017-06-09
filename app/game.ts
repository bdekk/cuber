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
                this.world.onClick(cube, function() {
                    console.log('amount' + cube.getAmount());
                });
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
}
 
export default Game;