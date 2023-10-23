export class Grid {
  AddGrid(elementId: string): void {
    const element = document.getElementById(elementId);

    if (element) {
      let gridItems = ``;
      for (let i = 0; i < 361; i++) {
        gridItems += `<div class="grid-item"></div>`;
      }
      element.innerHTML = `<p class="gameScore">Score: <span id="mainGameScore">0</span></p><div class="grid-container">${gridItems}</div>`;
    }
  }

  AddChessGrid(elementId: string): void {
    const element = document.getElementById(elementId);

    if (element) {
      let gridItems = ``;
      for (let i = 0; i < 64; i++) {
        gridItems += `<div class="grid-item-chess"></div>`;
      }
      element.innerHTML = `<div class="grid-container-chess">${gridItems}</div>`;
    }
  }
}
