import Game from './game';
import Stage from './stage';

class Main {

    stages: Array<Stage>;

    constructor() {
        this.stages = [new Stage("menu", null), new Stage("game", new Game()), new Stage("end", null)];
        this.stages[1].start();
    }

}

new Main();
