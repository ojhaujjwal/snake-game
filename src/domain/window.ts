import { Point } from "./point";
import { Direction } from "./types";

export class SquareWindow {
  constructor(
    public readonly length: number,
  ) {}

  isPointOutside(p: Point): boolean {
    return p.x <= 0 || p.y <= 0 || p.x >= this.length || p.y >= this.length;
  }
}
