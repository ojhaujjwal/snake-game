import { Direction } from "./types";

export class Point {
  constructor(
    private readonly _x: number,
    private readonly _y: number,
  ) { }

  move(direction: Direction): Point {
    if (direction == Direction.RIGHT) {
      return new Point(this._x + 1, this._y)
    }

    if (direction == Direction.LEFT) {
      return new Point(this._x - 1, this._y)
    }

    if (direction == Direction.UP) {
      return new Point(this._x , this._y + 1)
    }

    if (direction == Direction.DOWN) {
      return new Point(this._x , this._y - 1)
    }

    return this;
  }

  isEqual(p: Point) {
    return p._x == this._x && p._y == this._y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  withX(x: number) {
    return new Point(x, this._y);
  }

  withY(y: number) {
    return new Point(this._x, y);
  }

  isRightOf(p: Point): boolean {
    return this.x > p.x;
  }

  isLeftOf(p: Point): boolean {
    return this.x < p.x;
  }

  isAboveOf(p: Point): boolean {
    return this.y > p.y;
  }

  isBelowTo(p: Point): boolean {
    return this.y < p.y;
  }
}
