import AllPlayers from "./AllPlayers";
import Board from "./Board";
import Player from "./Player";
import Questions from "./Questions";

/* eslint-disable */
export class Game {
  private questions = new Questions(50);
  private board = new Board();
  private players = new AllPlayers();

  public add(name: string): boolean {
    this.players.add(new Player(name));

    return true;
  }

  public roll(roll: number) {
    console.log(this.players.getCurrentPlayer().log() + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.players.getCurrentPlayer().getIsInPenaltyBox()) {
      if (roll % 2 != 0) {
        console.log(this.players.getCurrentPlayer().log() + " is getting out of the penalty box");

        this.players.getCurrentPlayer().moveOutOfPenaltyBox();

        this.players.getCurrentPlayer().move(this.board)(roll);

        this.players.getCurrentPlayer().askQuestion({ board: this.board, questions: this.questions });
      } else {
        console.log(this.players.getCurrentPlayer().log() + " is not getting out of the penalty box");
      }
    } else {
      this.players.getCurrentPlayer().move(this.board)(roll);

      this.players.getCurrentPlayer().askQuestion({ board: this.board, questions: this.questions });
    }
  }

  private didPlayerWin(): boolean {
    console.log(`Player ${this.players.getCurrentPlayerIndex()} won the game`);

    return !(this.players.getCurrentPlayer().getScore() == 6);
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");

    this.players.getCurrentPlayer().moveToPenaltyBox();

    console.log(this.players.getCurrentPlayer().log() + " was sent to the penalty box");

    this.players.switchToNextPlayer();

    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.players.getCurrentPlayer().getIsInPenaltyBox()) {
      console.log("Answer was correct but still in penalty box, moving to next player");

      this.players.switchToNextPlayer();

      return true;
    } else {
      console.log("Answer was correct!!!!");

      this.players.getCurrentPlayer().scorePoint();

      var winner = this.didPlayerWin();

      this.players.switchToNextPlayer();

      console.log(`Player ${this.players.getCurrentPlayerIndex()} won the game`);

      return winner;
    }
  }
}
