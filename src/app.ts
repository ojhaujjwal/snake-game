import { Point } from "./domain/point";
import { Snake } from "./domain/snake";
import { Direction } from "./domain/types";
import { SquareWindow } from "./domain/window";
import { drawSnake } from "./ui/canvas";

(() => {
  const keyToDirectionMap = {
    'ArrowUp': Direction.UP,
    'ArrowRight': Direction.RIGHT,
    'ArrowDown': Direction.DOWN,
    'ArrowLeft': Direction.LEFT,
  } as const;

  const isArrowKey = (code: string): code is keyof typeof keyToDirectionMap => code in keyToDirectionMap;

  let direction = Direction.RIGHT;

  const snake = new Snake(
    new Point(20, 20),
    new Point(1, 20),
    direction,
  );

  const window = new SquareWindow(50);

  drawSnake(snake);

  document.addEventListener('keydown', (event) => {
    direction = isArrowKey(event.code) ? keyToDirectionMap[event.code] : direction;
    console.log(`Received input for changing direction to ${direction}`)
  });
  
  setInterval(() => {
    snake.move(direction, window, false);
    drawSnake(snake);
  }, 500)
})();
