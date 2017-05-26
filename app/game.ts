import World from './world';
import Cube from './cube';

class Game {
    
    world: World;
    
    constructor() {
        this.world = new World();
        let cube = new Cube(1,1, 20, 20);
        this.world.add(cube);
        this.world.render();
        // cube.down();
        // cube.left();
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