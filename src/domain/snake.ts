import { Point } from "./point";
import { Direction } from "./types";
import { SquareWindow } from "./window";

const oppositeDirection = {
  [Direction.RIGHT]: Direction.LEFT,
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.UP]: Direction.DOWN,
  [Direction.DOWN]: Direction.UP,
};

export class Snake {
  private turns: Array<Point>

  constructor(
    private head: Point,
    private tail: Point,
    public direction: Direction = Direction.RIGHT,
  ) {
    this.turns = [];
  }

  move(requestedDirection: Direction, window: SquareWindow, ateFruit = false) {
    if (oppositeDirection[this.direction] == requestedDirection) {
      return;
    }

    const actualDirection = oppositeDirection[this.direction] == requestedDirection ? this.direction : requestedDirection;

    const oldHead = this.head;

    this.head = this.head.move(actualDirection);

    if (this.direction !== actualDirection) {
      this.turns.push(oldHead);
    }

    this.direction = actualDirection;

    this.adjustWithinWindow(window);

    if (ateFruit) {
      return;
    }

    this.tail = this.moveTail();

    if (this.turns.length > 0 && this.turns[0].isEqual(this.tail)) {
      this.turns = this.turns.slice(1);
    }
  }

  getStraightParts(): ReadonlyArray<[Point, Point]> {
    const points = [this.tail, ...this.turns, this.head];

    const parts: Array<[Point, Point]> = [];

    for (let i = 0; i < points.length - 1; i++) {
      parts.push([points[i], points[i + 1]]);
    }

    return parts;
  }

  private moveTail(): Point {
    if (!this.turns.length) {
      return this.tail.move(this.direction);
    }

    const lastTurn = this.turns[0];

    if (lastTurn.isRightOf(this.tail)) {
      return this.tail.move(Direction.RIGHT);
    }

    if (lastTurn.isLeftOf(this.tail)) {
      return this.tail.move(Direction.LEFT);
    }

    if (lastTurn.isAboveOf(this.tail)) {
      return this.tail.move(Direction.UP);
    }

    if (lastTurn.isBelowTo(this.tail)) {
      return this.tail.move(Direction.DOWN);
    }

    return this.tail;
  }

  private adjustWithinWindow(window: SquareWindow)
  {
    if (!window.isPointOutside(this.head)) {
      return;
    }

    if (this.direction === Direction.RIGHT) {
      this.head = this.head.withX(1);
      return;
    }

    if (this.direction === Direction.LEFT) {
      this.head = this.head.withX(window.length - 1);
    }
  }
}
