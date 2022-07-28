const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field, currentLoc) {
    this._field = field;
    this._currentLoc = currentLoc;
  }
  move(direction) {
    switch (direction) {
      case "r":
        let nextIndR = [this._currentLoc[0], this._currentLoc[1] + 1];
        let nextCharR =
          this._currentLoc[1] === 6
            ? null
            : this._field[nextIndR[0]][nextIndR[1]];
        if (this._currentLoc[1] === 6) {
          console.log("You exited the field! Please try again");
          process.exit();
        } else if (nextCharR === hole) {
          console.log("You fell in a hole! Please play again");
          process.exit();
        } else if (nextCharR === hat) {
          console.log("You've won! Congrats!");
          process.exit();
        } else {
          this._field[nextIndR[0]][nextIndR[1]] = pathCharacter;
          this._currentLoc = nextIndR;
          this.playGame();
        }
        break;
      case "l":
        let nextIndL = [this._currentLoc[0], this._currentLoc[1] - 1];
        let nextCharL =
          this._currentLoc[1] === 0
            ? null
            : this._field[nextIndL[0]][nextIndL[1]];
        if (this._currentLoc[1] === 0) {
          console.log("You exited the field! Please try again");
          process.exit();
        } else if (nextCharL === hole) {
          console.log("You fell in a hole! Please play again");
          process.exit();
        } else if (nextCharL === hat) {
          console.log("You've won! Congrats!");
          process.exit();
        } else {
          this._field[nextIndL[0]][nextIndL[1]] = pathCharacter;
          this._currentLoc = nextIndL;
          this.playGame();
        }
        break;
      case "u":
        let nextIndU = [this._currentLoc[0] - 1, this._currentLoc[1]];
        let nextCharU =
          this._currentLoc[0] === 0
            ? null
            : this._field[nextIndU[0]][nextIndU[1]];
        if (this._currentLoc[0] === 0) {
          console.log("You exited the field! Please try again");
          process.exit();
        } else if (nextCharU === hole) {
          console.log("You fell in a hole! Please play again");
          process.exit();
        } else if (nextCharU === hat) {
          console.log("You've won! Congrats!");
          process.exit();
        } else {
          this._field[nextIndU[0]][nextIndU[1]] = pathCharacter;
          this._currentLoc = nextIndU;
          this.playGame();
        }
        break;
      case "d":
        let nextIndD = [this._currentLoc[0] + 1, this._currentLoc[1]];
        let nextCharD =
          this._currentLoc[0] === 5
            ? null
            : this._field[nextIndD[0]][nextIndD[1]];
        if (this._currentLoc[0] === 5) {
          console.log("You exited the field! Please try again");
          process.exit();
        } else if (nextCharD === hole) {
          console.log("You fell in a hole! Please play again");
          process.exit();
        } else if (nextCharD === hat) {
          console.log("You've won! Congrats!");
          process.exit();
        } else {
          this._field[nextIndD[0]][nextIndD[1]] = pathCharacter;
          this._currentLoc = nextIndD;
          this.playGame();
        }
        break;
      case "exit":
        console.log("See you later!");
        process.exit();
        break;
      default:
        console.log(
          "That is not a valid direction! Please try again. (r, l, u, d)"
        );
        this.playGame();
    }
  }
  playGame() {
    for (let rowInd in this._field) {
      console.log(this._field[rowInd].join(" "));
    }
    process.stdout.write(
      "Which direction would you like to go?\n(Write r, l, u, or d.)\n\nI would like to go ... "
    );
    process.stdin.once("data", handleInput);
  }
}

function getRandomInd() {
  const row = Math.floor(Math.random() * 6);
  const col = Math.floor(Math.random() * 7);
  return [row, col];
}

const startingLoc = getRandomInd();

const generateField = (startingInd = startingLoc) => {
  let field = [];
  let newRow = [];
  for (let i = 0; i < 6; i++) {
    for (let i = 0; i < 7; i++) {
      const randomNumForChar = Math.floor(Math.random() * 4);
      if (randomNumForChar > 2) {
        newRow.push(hole);
      } else {
        newRow.push(fieldCharacter);
      }
    }
    field.push(newRow);
    newRow = [];
  }
  let hatLoc = getRandomInd();
  while (hatLoc === startingInd) {
    hatLoc = getRandomInd();
  }
  field[hatLoc[0]][hatLoc[1]] = hat;
  field[startingLoc[0]][startingLoc[1]] = pathCharacter;
  return field;
};

const myField = new Field(generateField(), startingLoc);

const handleInput = (userInput) => {
  let direction = userInput.toString().trim();
  myField.move(direction);
};

myField.playGame();
