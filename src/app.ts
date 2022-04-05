import { Point } from "./domain/point";
import { Snake } from "./domain/snake";
import { Direction } from "./domain/types";
import { SquareWindow } from "./domain/window";
import { drawSnake } from "./ui/canvas";

const snake = new Snake(
  new Point(1, 1),
  new Point(1, 5),
  Direction.RIGHT,
);

const window = new SquareWindow(50);

drawSnake(snake);
//console.log('drawSnake start');

setInterval(() => {
  snake.move(snake.direction, window, false);
  drawSnake(snake);
  //console.log('drawSnake interval');
}, 500)
