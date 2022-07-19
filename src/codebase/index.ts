import Board from "./Board";
import Player from "./Player";
import Questions from "./Questions";
import { capitalizeFirstLetter } from "./utils";

/* eslint-disable */
export class Game {
  private players: Array<Player> = [];
  private currentPlayerIndex: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private questions = new Questions(50);
  private board = new Board();

  private getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  private switchToNextPlayer(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }

  public add(name: string): boolean {
    this.players.push(new Player(name));

    console.log(name + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  }

  public roll(roll: number) {
    console.log(this.getCurrentPlayer().log() + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.getCurrentPlayer().getIsInPenaltyBox()) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(this.getCurrentPlayer().log() + " is getting out of the penalty box");
        this.getCurrentPlayer().move(this.board)(roll);

        console.log(this.getCurrentPlayer().log() + "'s new location is " + this.getCurrentPlayer().getCurrentPlace());
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
      } else {
        console.log(this.getCurrentPlayer().log() + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.getCurrentPlayer().move(this.board)(roll);

      console.log(this.getCurrentPlayer().log() + "'s new location is " + this.getCurrentPlayer().getCurrentPlace());
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
    return capitalizeFirstLetter(this.board.getCurrentCategory(this.getCurrentPlayer().getCurrentPlace()));
  }

  private didPlayerWin(): boolean {
    console.log(`Player ${this.currentPlayerIndex} won the game`);
    return !(this.getCurrentPlayer().getScore() == 6);
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(this.getCurrentPlayer().log() + " was sent to the penalty box");
    this.getCurrentPlayer().provideWrongAnswer();

    this.switchToNextPlayer();

    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.getCurrentPlayer().getIsInPenaltyBox()) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!");
        this.getCurrentPlayer().provideGoodAnswer();
        console.log(this.getCurrentPlayer().log() + " now has " + this.getCurrentPlayer().getScore() + " Gold Coins.");

        var winner = this.didPlayerWin();
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this.players.length) this.currentPlayerIndex = 0;

        console.log(`Player ${this.currentPlayerIndex} won the game`);

        return winner;
      } else {
        console.log("Answer was correct but still in penalty box, moving to next player");

        this.switchToNextPlayer();

        return true;
      }
    } else {
      console.log("Answer was correct!!!!");

      this.getCurrentPlayer().provideGoodAnswer();
      console.log(this.getCurrentPlayer().log() + " now has " + this.getCurrentPlayer().getScore() + " Gold Coins.");

      var winner = this.didPlayerWin();

      this.switchToNextPlayer();

      console.log(`Player ${this.currentPlayerIndex} won the game`);

      return winner;
    }
  }
}
