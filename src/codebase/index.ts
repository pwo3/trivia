import Board from "./Board";
import Player from "./Player";
import Questions from "./Questions";
import { capitalizeFirstLetter } from "./utils";

/* eslint-disable */
export class Game {
  private players: Array<Player> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private questions = new Questions(50);
  private board = new Board();

  public add(name: string): boolean {
    this.players.push(new Player(name));

    console.log(name + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  public roll(roll: number) {
    console.log(this.players[this.currentPlayer].log() + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.players[this.currentPlayer].getIsInPenaltyBox()) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(this.players[this.currentPlayer].log() + " is getting out of the penalty box");
        this.players[this.currentPlayer].move(this.board)(roll);

        console.log(
          this.players[this.currentPlayer].log() +
            "'s new location is " +
            this.players[this.currentPlayer].getCurrentPlace()
        );
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
      } else {
        console.log(this.players[this.currentPlayer].log() + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.players[this.currentPlayer].move(this.board)(roll);

      console.log(
        this.players[this.currentPlayer].log() +
          "'s new location is " +
          this.players[this.currentPlayer].getCurrentPlace()
      );
      console.log("The category is " + this.currentCategory());
      this.askQuestion();
    }
  }

  private askQuestion(): void {
    // @ts-ignore
    const question = this.questions.popQuestion(this.currentCategory().toLowerCase());

    console.log(question);
  }

  private currentCategory(): string {
    return capitalizeFirstLetter(this.board.getCurrentCategory(this.players[this.currentPlayer].getCurrentPlace()));
  }

  private didPlayerWin(): boolean {
    console.log(`Player ${this.currentPlayer} won the game`);
    return !(this.players[this.currentPlayer].getScore() == 6);
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(this.players[this.currentPlayer].log() + " was sent to the penalty box");
    this.players[this.currentPlayer].provideWrongAnswer();

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.players[this.currentPlayer].getIsInPenaltyBox()) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!");
        this.players[this.currentPlayer].provideGoodAnswer();
        console.log(
          this.players[this.currentPlayer].log() +
            " now has " +
            this.players[this.currentPlayer].getScore() +
            " Gold Coins."
        );

        var winner = this.didPlayerWin();
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

        console.log(`Player ${this.currentPlayer} won the game`);

        return winner;
      } else {
        console.log("Answer was correct but still in penalty box, moving to next player");
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        return true;
      }
    } else {
      console.log("Answer was correct!!!!");

      this.players[this.currentPlayer].provideGoodAnswer();
      console.log(
        this.players[this.currentPlayer].log() +
          " now has " +
          this.players[this.currentPlayer].getScore() +
          " Gold Coins."
      );

      var winner = this.didPlayerWin();

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

      console.log(`Player ${this.currentPlayer} won the game`);

      return winner;
    }
  }
}
