import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.scss']
})
export class TatetiComponent implements OnInit {

  PLAYER_COMPUTER = { name: 'CPU', symbol: 'O' };
  PLAYER_HUMAN = { name: 'Vos', symbol: 'X' };
  DRAW = { name: 'Draw' };

  scoreHuman = 0;
  scoreComputer = 0;

  board: any[];
  currentPlayer = this.PLAYER_HUMAN;
  lastWinner: any;
  gameOver: boolean;
  boardLocked: boolean;

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.newGame();
  }

  square_click(square) {
    if (square.value === '' && !this.gameOver) {
      square.value = this.PLAYER_HUMAN.symbol;
      this.completeMove(this.PLAYER_HUMAN);
    }
  }

  computerMove(firstMove: boolean = false) {
    this.boardLocked = true;

    setTimeout(() => {
      let square = firstMove ? this.board[4] : this.getRandomAvailableSquare();
      square.value = this.PLAYER_COMPUTER.symbol;
      this.completeMove(this.PLAYER_COMPUTER);
      this.boardLocked = false;
    }, 600);
  }

  completeMove(player) {
    if (this.isWinner(player.symbol))
      this.showGameOver(player);
    else if (!this.availableSquaresExist())
      this.showGameOver(this.DRAW);
    else {
      this.currentPlayer = (this.currentPlayer == this.PLAYER_COMPUTER ? this.PLAYER_HUMAN : this.PLAYER_COMPUTER);

      if (this.currentPlayer == this.PLAYER_COMPUTER)
        this.computerMove();
    }
  }

  availableSquaresExist(): boolean {
    return this.board.filter(s => s.value == '').length > 0;
  }

  getRandomAvailableSquare(): any {
    let availableSquares = this.board.filter(s => s.value === '');
    var squareIndex = this.getRndInteger(0, availableSquares.length - 1);

    return availableSquares[squareIndex];
  }

  showGameOver(winner) {
    this.gameOver = true;
    this.lastWinner = winner;

    if (winner !== this.DRAW)
      this.currentPlayer = winner;

    this.addScore(winner);
  }

  get winningIndexes(): any[] {
    return [
      [0, 1, 2],  //top row
      [3, 4, 5],  //middle row
      [6, 7, 8],  //bottom row
      [0, 3, 6],  //first col
      [1, 4, 7],  //second col
      [2, 5, 8],  //third col
      [0, 4, 8],  //first diagonal
      [2, 4, 6]   //second diagonal
    ];
  }

  isWinner(symbol): boolean {
    for (let pattern of this.winningIndexes) {
      const foundWinner = this.board[pattern[0]].value == symbol
        && this.board[pattern[1]].value == symbol
        && this.board[pattern[2]].value == symbol;

      if (foundWinner) {
        for (let index of pattern) {
          this.board[index].winner = true;
        }

        return true;
      }
    }

    return false;
  }

  newGame() {
    this.board = [
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' }
    ];

    this.gameOver = false;
    this.boardLocked = false;

    if (this.currentPlayer == this.PLAYER_COMPUTER) {
      this.boardLocked = true;
      this.computerMove(true);
    }
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  addScore(winner) {
    if (winner === this.PLAYER_COMPUTER) {
      this.scoreComputer++;
    }
    if (winner === this.PLAYER_HUMAN) {
      this.scoreHuman++;
    }
  }

  loadResult() {
    this.firebaseService.addResult('TaTeTi', this.scoreHuman, (this.lastWinner === this.PLAYER_HUMAN))
      .then(result => {
        console.log("insert result");
      });
  }
}