import { Grid } from "../Grid";

export class Chess {
  gridDimension = 8;
  constructor(public divId: string) {}

  startGame(): void {
    let chessGrid = new Grid();
    chessGrid.AddChessGrid(this.divId);

    this.resetChessPieces();
  }

  resetChessPieces(): void {
    let gridItems = Array.from(
      document.getElementsByClassName(
        "grid-item-chess"
      ) as HTMLCollectionOf<HTMLElement>
    );

    let indexs = [
      this.getIndexOfItemUsingCoord([1, 2]),
      this.getIndexOfItemUsingCoord([2, 2]),
      this.getIndexOfItemUsingCoord([3, 2]),
      this.getIndexOfItemUsingCoord([4, 2]),
      this.getIndexOfItemUsingCoord([5, 2]),
      this.getIndexOfItemUsingCoord([6, 2]),
      this.getIndexOfItemUsingCoord([7, 2]),
      this.getIndexOfItemUsingCoord([8, 2]),
    ];

    let indexsBlack = [
      this.getIndexOfItemUsingCoord([1, 7]),
      this.getIndexOfItemUsingCoord([2, 7]),
      this.getIndexOfItemUsingCoord([3, 7]),
      this.getIndexOfItemUsingCoord([4, 7]),
      this.getIndexOfItemUsingCoord([5, 7]),
      this.getIndexOfItemUsingCoord([6, 7]),
      this.getIndexOfItemUsingCoord([7, 7]),
      this.getIndexOfItemUsingCoord([8, 7]),
    ];

    gridItems[this.getIndexOfItemUsingCoord([])].innerHTML = "";
    gridItems[this.getIndexOfItemUsingCoord([])].innerHTML = "";
    gridItems[this.getIndexOfItemUsingCoord([])].innerHTML = "";
    gridItems[this.getIndexOfItemUsingCoord([])].innerHTML = "";
    gridItems[this.getIndexOfItemUsingCoord([])].innerHTML = "";
    gridItems[this.getIndexOfItemUsingCoord([])].innerHTML = "";

    indexsBlack.forEach((black) => {
      gridItems[black].innerHTML = "bP";
    });

    indexs.forEach((index) => {
      gridItems[index].innerHTML = "wP";
    });
  }

  getIndexOfItemUsingCoord = (coord: number[]): number =>
    coord[0] + this.gridDimension * (this.gridDimension - coord[1]) - 1;
}
