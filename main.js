const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field, currentLoc) {
    this.field = field;
    this.currentLoc = currentLoc;
  }
  move(userInput) {
    let direction = userInput.toString().trim();
    switch(direction) {
      case 'r':
        let nextIndR = [this.currentLoc[0], this.currentLoc[1]+1];
        let nextCharR = this.field[nextIndR[0]][nextIndR[1]];
        if (this.currentLoc[1] === 6) {
          console.log('You exited the field! Please try again')
        } else if (nextCharR === hole) {
          console.log('You fell in a hole! Please play again');
        } else if (nextCharR == hat) {
          console.log("You've won! Congrats!")
        } else {
          this.currentLoc = nextIndR;
          this.playGame();
        }
        break;
      case 'l':
        let nextIndL = [this.currentLoc[0], this.currentLoc[1]-1]
        let nextCharL = this.field[nextIndL[0]][nextIndL[1]];
        if (this.currentLoc[1] === 6) {
          console.log('You exited the field! Please try again')
        } else if (nextCharL === hole) {
          console.log('You fell in a hole! Please play again');
        } else if (nextCharL == hat) {
          console.log("You've won! Congrats!")
        } else {
          this.currentLoc = nextIndL;
          this.playGame();
        }
        break;
      case 'u':
        let nextIndU = [this.currentLoc[0]-1, this.currentLoc[1]]
        let nextCharU = this.field[nextIndU[0]][nextIndU[1]];
        if (this.currentLoc[1] === 6) {
          console.log('You exited the field! Please try again')
        } else if (nextCharU === hole) {
          console.log('You fell in a hole! Please play again');
        } else if (nextCharU == hat) {
          console.log("You've won! Congrats!")
        } else {
          this.currentLoc = nextIndU;
          this.playGame();
        }
        break;
      case 'd':
        let nextIndD = [this.currentLoc[0]+1, this.currentLoc[1]]
        let nextCharD = this.field[nextIndD[0]][nextIndD[1]];
        if (this.currentLoc[1] === 6) {
          console.log('You exited the field! Please try again')
        } else if (nextCharD === hole) {
          console.log('You fell in a hole! Please play again');
        } else if (nextCharD == hat) {
          console.log("You've won! Congrats!")
        } else {
          this.currentLoc = nextIndD;
          this.playGame();
        }
        break;
      default:
        console.log('That is not a valid direction! Please try again. (r, l, u, d)');
        this.playGame();
    }
  }
  playGame() {
    console.log(this.currentLoc);
    for (let rowInd in this.field) {
      console.log(this.field[rowInd].join(" "));
    }
    process.stdout.write("Which direction would you like to go?\n(Write r, l, u, or d.)\n\nI would like to go ... ");
    process.stdin.on('data', this.move);
  }
}

function getRandomInd() {
  const row = Math.floor(Math.random() * 6);
  const col = Math.floor(Math.random() * 7);
  return [row, col]
}

const startingLoc = getRandomInd();

const generateField = (startingInd = startingLoc) => {
  let field = [];
  let newRow = [];
  for (let i = 0; i < 6; i++) {
    for (let i = 0; i < 7; i++) {
      const randomNumForChar = Math.floor(Math.random()*4)
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
    let hatLoc = getRandomInd;
  }
  field[hatLoc[0]][hatLoc[1]] = hat;
  field[startingLoc[0]][startingLoc[1]] = pathCharacter;
  return field
}

const myField = new Field(generateField(), startingLoc);

myField.playGame()
