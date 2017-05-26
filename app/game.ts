import World from './world';
import Cube from './cube';

class Game {
    
    world: World;
    
    constructor() {
        this.world = new World();
        this.world.add(new Cube(1,1));
        this.world.render();
    }

    create() {    
        
    }

    destroy() {

    }
}
 
export default Game;