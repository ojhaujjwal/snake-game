import { Point } from "./point";
import { Direction, oppositeDirection } from "./types";
import { SquareWindow } from "./window";

export class Turn {
  constructor(
    readonly point: Point,
    readonly directionTo: Direction
  ) {}
}

export class StraightPart {
  constructor(
    readonly from: Point,
    readonly to: Point,
    readonly direction: Direction,
  ) {}
}

export class Snake {
  private turns: ReadonlyArray<Turn>

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
      this.turns = [...this.turns, new Turn(oldHead, this.direction)];
      this.direction = actualDirection;
    }

    this.head = this.adjustWithinWindow(window, this.head);

    if (ateFruit) {
      return;
    }

    this.tail = this.adjustWithinWindow(window, this.moveTail());

    if (this.turns.length > 0 && this.turns[0].point.isEqual(this.tail)) {
      this.turns = this.turns.slice(1);
    }
  }

  getStraightParts(): ReadonlyArray<StraightPart> {
    if (!this.turns.length) {
      return [new StraightPart(this.tail, this.head, this.direction)];
    }

    const parts: Array<StraightPart> = [
      new StraightPart(this.tail, this.turns[0].point, this.turns[0].directionTo)
    ];

    for (let i = 1; i < this.turns.length; i++) {
      parts.push(new StraightPart(this.turns[i - 1].point, this.turns[i].point, this.turns[i].directionTo));
    }

    parts.push(new StraightPart(this.turns[this.turns.length - 1].point, this.head, this.direction));

    return parts;
  }

  private moveTail(): Point {
    if (!this.turns.length) {
      return this.tail.move(this.direction);
    }

    return this.tail.move(this.turns[0].directionTo);
  }

  private adjustWithinWindow(window: SquareWindow, p: Point): Point
  {
    if (!window.isPointOutside(p)) {
      return p;
    }

    if (this.direction === Direction.RIGHT) {
      return p.withX(1);
    }

    if (this.direction === Direction.LEFT) {
      return p.withX(window.length - 1);
    }

    if (this.direction === Direction.UP) {
      return p.withY(1);
    }

    if (this.direction === Direction.DOWN) {
      return p.withY(window.length - 1);
    }

    return p;
  }
}
