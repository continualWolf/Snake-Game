import { Keys } from "../Constants/Keys";
import { Grid } from "../Grid";
import { Snake } from "../Snake";
import { Home } from "./Home";

export class Game {
  constructor(public divId: string) {}

  start(): void {
    let grid = new Grid();
    grid.AddGrid(this.divId);

    let snake = new Snake();

    // add the start postion and size of the snake
    snake.addSnakeToGrid([
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
    ]);

    // add starting apple to grid
    snake.addAppleToGrid([8, 8]);

    // the direction the snake starts in
    let snakeDirection = Keys.D;

    // every half second move snake forward
    let myInterval = setInterval(() => {
      let move = snake.moveSnakeForward(snakeDirection);
      if (move) {
        this.gameOver();
        clearInterval(myInterval);
      }
    }, 500);
    window.addEventListener("keydown", onKeyDown, false);

    const keys = {
      68: Keys.D,
      83: Keys.S,
      65: Keys.A,
      87: Keys.W,
    } as const;

    function onKeyDown(event): void {
      var keyCode = event.keyCode;
      if (keys[keyCode]) {
        let move = snake.moveSnakeForward(keys[keyCode]);
        snakeDirection = keys[keyCode];
        if (move) {
          this.gameOver();
          clearInterval(myInterval);
        }
      }
    }
  }

  #attachGameOverEventListeners(): void {
    const divId = this.divId;

    const restart = document.getElementById("restartSnakeGame");
    restart?.addEventListener("click", function handleClick(event) {
      let game = new Game(divId);
      game.start();
    });

    const exit = document.getElementById("exitSnakeGame");
    exit?.addEventListener("click", function handleClick(event) {
      let home = new Home(divId);
      home.open();
    });
  }

  gameOver(): void {
    let div = document.getElementById(this.divId) as HTMLElement;
    div.innerHTML += `
      <div class="snakeGameOver__PopUp">
        <div class="snakeGameOver__Content">
          <h1>Game Over</h1>
          <h2>Score: ${document.getElementById("mainGameScore")?.innerHTML}</h4>
          <ul>
            <li id="restartSnakeGame">Restart</li>
            <li id="exitSnakeGame">Exit Game</li>
          </ul>
        </div>
      </div>
    `;

    this.#attachGameOverEventListeners();
  }
}
