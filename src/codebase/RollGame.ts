import AllPlayers from "./AllPlayers";
import { AnswerQuestionGame } from "./AnswerQuestionGame";
import Board from "./Board";
import Questions from "./Questions";

export class RollGame {
  constructor(private questions: Questions, private board: Board, private players: AllPlayers) {}

  roll = (roll: number) => {
    console.log(this.players.getCurrentPlayer().log() + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.players.getCurrentPlayer().getIsInPenaltyBox() && roll % 2 === 0) {
      console.log(this.players.getCurrentPlayer().log() + " is not getting out of the penalty box");

      return new AnswerQuestionGame(this.questions, this.board, this.players);
    }

    if (this.players.getCurrentPlayer().getIsInPenaltyBox() && roll % 2 != 0) {
      console.log(this.players.getCurrentPlayer().log() + " is getting out of the penalty box");

      this.players.getCurrentPlayer().moveOutOfPenaltyBox();
    }

    this.players.getCurrentPlayer().move(this.board)(roll);

    this.players.getCurrentPlayer().askQuestion({ board: this.board, questions: this.questions });

    return new AnswerQuestionGame(this.questions, this.board, this.players);
  };
}
