export enum Direction {
  RIGHT = 'right',
  LEFT = 'left',
  DOWN = 'down',
  UP = 'up',
};

export const oppositeDirection = {
  [Direction.RIGHT]: Direction.LEFT,
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.UP]: Direction.DOWN,
  [Direction.DOWN]: Direction.UP,
};
