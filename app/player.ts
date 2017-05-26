import GameObject from './object';

class Player {

    constructor(private name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
}

export default Player;