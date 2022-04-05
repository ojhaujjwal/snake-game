import { Point } from "./point";

export class SquareWindow {
  constructor(
    private length: number,
  ) {}

  adjustInsideWindow(p: Point): Point {
    if (p.x < 0) {
      return p.withX(this.length);
    }

    if (p.y < 0) {
      return p.withY(this.length);
    }

    if (p.x > this.length) {
      return p.withX(0);
    }

    if (p.y > this.length) {
      return p.withY(0);
    }

    return p;
  }
}
