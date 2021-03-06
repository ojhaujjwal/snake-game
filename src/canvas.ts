import { Point } from "./domain/point";
import { Snake, StraightPart } from "./domain/snake";
import { Direction } from "./domain/types";
import { SquareWindow } from "./domain/window";

export const getCanvasContext = (): CanvasRenderingContext2D => {
  const snakeboard = document.getElementById("game-canvas") as HTMLCanvasElement;

  snakeboard.style.width = '200px';
  snakeboard.style.height = '200px';

  const context = snakeboard.getContext("2d");

  if (!context) {
    throw new Error();
  }

  // By default adopted standard for computer graphics is the origin in the top left corner
  // with the X axis across the top from left to right and the y axis down the screen from top to bottom.
  //
  // This changes this system to change the way it works.
  // Y axis to go from bottom left up and the x axis to go from the bottom left across right
  // Copied from https://stackoverflow.com/a/35470695/2508053
  context.setTransform(1, 0, 0, -1, 0, context.canvas.width);

  return context;
};

export const drawWindow = (context: CanvasRenderingContext2D, window: SquareWindow) => {
  context.fillStyle = 'lightgreen';
  context.strokeStyle = 'darkgreen';
  drawLine(context, new Point(0, 0), new Point(0, window.length));
  drawLine(context, new Point(0, 0), new Point(window.length, 0));
  drawLine(context, new Point(0, window.length), new Point(window.length, window.length));
  drawLine(context, new Point(window.length, 0), new Point(window.length, window.length));
}

export const drawSnake = (context: CanvasRenderingContext2D, window: SquareWindow, snake: Snake) => {
  context.clearRect(1, 1, context.canvas.width - 2, context.canvas.height - 2);

  context.fillStyle = 'lightblue';  
  context.strokeStyle = 'darkblue';

  for (const part of snake.getStraightParts()) {
    for (const p of window.splitPartToFitInside(part)) {
      drawSnakeStraightPart(context, p);
    }
  }
};

const drawSnakeStraightPart = (context: CanvasRenderingContext2D, part: StraightPart): void => {
  // if (part.direction === Direction.RIGHT && p2.isLeftOf(p1)) {
  //   drawLine(context, p1, new Point(context.canvas.width - 1, p1.y));
  //   drawLine(context, new Point(1, p1.y), p2);
  //   return;
  // }

  // if (part.direction === Direction.LEFT && p2.isRightOf(p1)) {
  //   drawLine(context, p1, new Point(1, p1.y));
  //   drawLine(context, new Point(context.canvas.width - 1, p1.y), p2);
  //   return;
  // }

  // if (
  //   (snake.direction === Direction.RIGHT && p2.isLeftOf(p1))
  //   || (snake.direction === Direction.LEFT && p2.isRightOf(p1))
  //   || (snake.direction === Direction.UP && p2.isBelowTo(p1))
  //   || (snake.direction === Direction.DOWN && p2.isAboveOf(p1))
  // ) {
  //   // TODO: draw two lines
  //   return;
  // }

  drawLine(context, part.from, part.to);
};

const drawLine = (context: CanvasRenderingContext2D, p1: Point, p2: Point) => {
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.stroke();
}
