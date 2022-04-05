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

    this.head = window.adjustInsideWindow(this.head);

    if (ateFruit) {
      return;
    }

    this.tail = this.tail.move(actualDirection);

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
}
