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
        let cube = new Cube(0,0, 20, 20);
        this.world.add(cube);
        this.world.render();
        cube.down();
        cube.left();
        this.world.render();
    }

    create() {    
        
    }

    destroy() {

    }

    init() {

    }
}
 
export default Game;