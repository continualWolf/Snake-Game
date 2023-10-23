import { Chess } from "./Chess";
import { Game } from "./Game";

export class Home {
  constructor(public divId: string) {}

  open(): void {
    let div = document.getElementById(this.divId) as HTMLElement;
    div.innerHTML = `
        <div class="mainMenu">
            <h1>Games</h1>
            <ul>
                <li id="openSnakeGame">Play Snake</li>
                <li id="openChessGame">Play Chess</li>
            </ul>
        </div>
    `;
    this.#addEventListeners();
  }

  #addEventListeners() {
    const divId = this.divId;
    const snakeGameBtn = document.getElementById("openSnakeGame");
    snakeGameBtn?.addEventListener("click", function handleClick(event) {
      let game = new Game(divId);
      game.start();
    });

    const chessGameBtn = document.getElementById("openChessGame");
    chessGameBtn?.addEventListener("click", function handleClick(event) {
      let chess = new Chess(divId);
      chess.startGame();
    });
  }
}
