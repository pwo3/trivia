import AllPlayers from "./AllPlayers";
import Board from "./Board";
import Questions from "./Questions";
import { RollGame } from "./RollGame";

export class AnswerQuestionGame {
  constructor(private questions: Questions, private board: Board, private players: AllPlayers) {}

  didPlayerWin(): boolean {
    return !(this.players.getCurrentPlayer().getScore() == 6);
  }

  goodAnswer = () => {
    if (this.players.getCurrentPlayer().getIsInPenaltyBox()) {
      console.log("Answer was correct but still in penalty box, moving to next player");

      this.players.switchToNextPlayer();

      return new RollGame(this.questions, this.board, this.players);
    }

    console.log("Answer was correct!!!!");

    this.players.getCurrentPlayer().scorePoint();

    console.log(`Player ${this.players.getCurrentPlayerIndex()} won the game`);

    this.players.switchToNextPlayer();

    console.log(`Player ${this.players.getCurrentPlayerIndex()} won the game`);

    return new RollGame(this.questions, this.board, this.players);
  };

  wrongAnswer = () => {
    console.log("Question was incorrectly answered");

    this.players.getCurrentPlayer().moveToPenaltyBox();

    console.log(this.players.getCurrentPlayer().log() + " was sent to the penalty box");

    this.players.switchToNextPlayer();

    return new RollGame(this.questions, this.board, this.players);
  };
}
