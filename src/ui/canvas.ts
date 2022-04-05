import { Snake } from "../domain/snake";

export const drawSnake = (snake: Snake) => {
  const snakeboard = document.getElementById("game-canvas") as HTMLCanvasElement;
  const context = snakeboard.getContext("2d");

  if (!context) {
    throw new Error();
  }

  context.clearRect(0, 0, snakeboard.width, snakeboard.height);

  context.fillStyle = 'lightblue';  
  context.strokeStyle = 'darkblue';

  console.log(snake.getStraightParts());

  for (const [point1, point2] of snake.getStraightParts()) {
    context.fillRect(point1.x, point1.y, point2.x, point2.y);
    context.strokeRect(point1.x, point1.y, point2.x, point2.y);
  }
};
