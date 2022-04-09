import { Point } from "./domain/point";
import { Snake } from "./domain/snake";
import { Direction } from "./domain/types";
import { SquareWindow } from "./domain/window";
import { drawSnake, drawWindow, getCanvasContext } from "./canvas";

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
    new Point(80, 20),
    new Point(60, 20),
    direction,
  );

  const canvasContext = getCanvasContext();
  const window = new SquareWindow(canvasContext.canvas.width);

  drawWindow(canvasContext, window);
  drawSnake(canvasContext, window, snake);

  document.addEventListener('keydown', (event) => {
    direction = isArrowKey(event.code) ? keyToDirectionMap[event.code] : direction;
    console.log(`Received input for changing direction to ${direction}`)
  });
  
  setInterval(() => {
    snake.move(direction, window, false);
    drawSnake(canvasContext, window, snake);
  }, 500)
})();
