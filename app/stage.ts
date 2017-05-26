import Scene from './scene';

class Stage {
    constructor(private name: String, private stageObject: any) {
        this.name = name;
        this.stageObject = stageObject;
    }

    start() {
        this.stageObject.create();
    }


    stop() {
        this.stageObject.destroy();
    }
}

export default Stage;