import { Snake } from "../domain/snake";

export const drawSnake = (snake: Snake) => {
  const snakeboard = document.getElementById("game-canvas") as HTMLCanvasElement;
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
  context.setTransform(1,0,0,-1,0,snakeboard.width - 1)

  context.clearRect(0, 0, snakeboard.width, snakeboard.height);

  context.fillStyle = 'lightblue';  
  context.strokeStyle = 'darkblue';

  for (const [point1, point2] of snake.getStraightParts()) {
    const width = point2.x - point1.x;
    const height = point2.y - point1.y;

    context.fillRect(point1.x, point1.y, width, height);
    context.strokeRect(point1.x, point1.y, width, height);
  }
};
