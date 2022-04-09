import { Point } from "./point";
import { StraightPart } from "./snake";
import { Direction, oppositeDirection } from "./types";

export class SquareWindow {
  constructor(
    public readonly length: number,
  ) {}

  isPointOutside(p: Point): boolean {
    return p.x <= 0 || p.y <= 0 || p.x >= this.length || p.y >= this.length;
  }

  splitPartToFitInside(part: StraightPart) {
    const direction = part.direction;
    const opposite = oppositeDirection[part.direction];

    if (direction === Direction.RIGHT && part.to.isLeftOf(part.from)) {
      return [
        new StraightPart(part.from, new Point(this.length - 1, part.from.y), part.direction),
        new StraightPart(new Point(1, part.from.y), part.to, opposite)
      ];
    }

    if (direction === Direction.LEFT && part.to.isRightOf(part.from)) {
      return [
        new StraightPart(part.from, new Point(1, part.from.y), part.direction),
        new StraightPart(new Point(this.length - 1, part.from.y), part.to, opposite)
      ];
    }

    if (direction === Direction.UP && part.to.isBelowTo(part.from)) {
      return [
        new StraightPart(part.from, new Point(part.from.x, this.length - 1), part.direction),
        new StraightPart(new Point(part.from.x, 1), part.to, opposite)
      ];
    }

    if (direction === Direction.DOWN && part.to.isAboveOf(part.from)) {
      return [
        new StraightPart(part.from, new Point(part.from.x, 1), part.direction),
        new StraightPart(new Point(part.from.x, this.length - 1), part.to, opposite)
      ];
    }

    return [part]
  }
}
