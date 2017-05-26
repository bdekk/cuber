class Point {

    constructor(private x: number, private y: number) {
        this.x = x;
        this.y = y; 
    }

    public getX(): number {
        return this.x;
    }
    
    public getY(): number {
        return this.y;
    }

    public setXY(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public equals(other: Point): boolean {
        return this.x == other.x && this.y == other.y; 
    }
}

export default Point;