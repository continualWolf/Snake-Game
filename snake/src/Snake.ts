import { Keys } from "./Constants/Keys";

// equation to find coordinate in css grid/ m = width
// n = height
// i = index of grid item in array
// - 1 to account for index
// i = (x + m * (n - y) - 1)

export class Snake {
  coords: number[][] = [];
  gridDimension = 19;
  score = 0;

  clearSnakeFromGrid(): void {
    let gridItems = Array.from(
      document.getElementsByClassName(
        "grid-item"
      ) as HTMLCollectionOf<HTMLElement>
    );
    let i = 0;
    gridItems.forEach((element) => {
      element.style.background =
        element.style.background == "darkmagenta"
          ? i % 2 != 0
            ? "#39a0cc"
            : "#48cfd9"
          : element.style.background;
      i++;
    });
  }

  addAppleToGrid(coord: number[]): void {
    try {
      document
        .getElementsByClassName("grid-item")
        [this.getIndexOfItemUsingCoord(coord)].setAttribute(
          "style",
          "background:red"
        );
    } catch (err) {
      console.log(`coordinate : [${coord[0]},${coord[1]}] caused the error`);
      console.error(err);
    }
  }

  // loop through provided inital snake coordinates
  addSnakeToGrid(coords: number[][]): void {
    this.clearSnakeFromGrid();
    for (let i = 0; i < coords.length; i++) {
      this.coords = coords;
      let gridItem =
        document.getElementsByClassName("grid-item")[
          this.getIndexOfItemUsingCoord(coords[i])
        ];

      if (gridItem) {
        gridItem.setAttribute("style", "background:darkmagenta");
      }
    }
  }

  getIndexOfItemUsingCoord = (coord: number[]): number =>
    coord[0] + this.gridDimension * (this.gridDimension - coord[1]) - 1;

  moveSnakeForward(direction: Keys): boolean {
    let length = this.coords.length;

    let tempValue: number[] = [];
    let appleEaten = false;
    for (let i = length - 1; i > -1; i--) {
      if (i == length - 1) {
        tempValue = [this.coords[i][0], this.coords[i][1]];
        this.coords[i] = this.GetNewCoordBasedOnDirection(
          this.coords[i],
          direction
        );
        let isNextSquareGreen = this.IsNextCoordOccupied(this.coords[i]);
        if (isNextSquareGreen) {
          return true;
        }
        let IsNextCoordApple = this.IsNextCoordApple(this.coords[i]);
        if (IsNextCoordApple) {
          appleEaten = true;
        }
      } else {
        let temp = [this.coords[i][0], this.coords[i][1]];
        this.coords[i] = tempValue;
        tempValue = temp;
      }
    }

    if (appleEaten) {
      let newCoords = this.GetNewCoordBasedOnDirection(
        this.coords[0],
        direction
      );
      this.coords.unshift(newCoords);
    }

    this.addSnakeToGrid(this.coords);

    if (appleEaten) {
      this.addAppleToGrid(this.generateNewAppleLocation(1, this.gridDimension));
      this.score += 1;
      let gameScore = document.getElementById("mainGameScore") as HTMLElement;
      gameScore.innerHTML = `${this.score}`;
    }
    return false;
  }

  GetNewCoordBasedOnDirection(coord: number[], direction: Keys): number[] {
    if (direction == Keys.D) {
      coord[0] += 1;
    } else if (direction == Keys.W) {
      coord[1] += 1;
    } else if (direction == Keys.S) {
      coord[1] -= 1;
    } else if (direction == Keys.A) {
      coord[0] -= 1;
    }

    return coord;
  }

  IsNextCoordOccupied(coord: number[]): boolean {
    const coordSquare = document.getElementsByClassName("grid-item")[
      this.getIndexOfItemUsingCoord(coord)
    ] as HTMLElement;
    let outOfBounds =
      coord[0] < 1 ||
      coord[0] > this.gridDimension ||
      coord[1] < 1 ||
      coord[1] > this.gridDimension
        ? true
        : false;

    if (!coordSquare) return true;
    return coordSquare.style.background == "darkmagenta" || outOfBounds;
  }

  IsNextCoordApple(coord: number[]): boolean {
    const coordSquare = document.getElementsByClassName("grid-item")[
      this.getIndexOfItemUsingCoord(coord)
    ] as HTMLElement;

    if (!coordSquare) return false;

    return coordSquare.style.background == "red";
  }

  generateNewAppleLocation(min: number, max: number): number[] {
    let randomX = Math.floor(Math.random() * (max - min + 1) + min);
    let randomY = Math.floor(Math.random() * (max - min + 1) + min);
    let randCoord = [randomX, randomY];

    let isInArray = this.#isArrayInArray(randCoord);

    while (isInArray) {
      let newRandomX = Math.floor(Math.random() * (max - min + 1) + min);
      let newRandomY = Math.floor(Math.random() * (max - min + 1) + min);
      let newRandCoord = [newRandomX, newRandomY];

      isInArray = this.#isArrayInArray(newRandCoord);
    }

    return randCoord;
  }

  #isArrayInArray(item: number[]) {
    var item_as_string = JSON.stringify(item);

    var contains = this.coords.some(function (ele) {
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }
}
