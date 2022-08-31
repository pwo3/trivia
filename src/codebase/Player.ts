import Board from "./Board";
import Questions from "./Questions";
import { capitalizeFirstLetter } from "./utils";

class Player {
  private place: number = 0;
  private score: number = 0;
  private isInPenaltyBox: boolean = false;

  constructor(private name: string) {}

  askQuestion = ({ board, questions }: { board: Board; questions: Questions }): void => {
    const currentCategory = board.getCurrentCategory(this.place);

    console.log("The category is " + capitalizeFirstLetter(currentCategory));

    const question = questions.popQuestion(currentCategory);

    console.log(question);
  };

  scorePoint = (): void => {
    this.score += 1;

    console.log(this.name + " now has " + this.score + " Gold Coins.");
  };

  move =
    (board: Board) =>
    (roll: number): void => {
      if (roll % 2 !== 0) {
        this.isInPenaltyBox = false;
      }

      this.place = board.moveToNextPosition(this.place, roll);

      console.log(this.name + "'s new location is " + this.place);
    };

  getCurrentPlace = (): number => {
    return this.place;
  };

  moveToPenaltyBox = (): void => {
    this.isInPenaltyBox = true;
  };

  moveOutOfPenaltyBox = (): void => {
    this.isInPenaltyBox = false;
  };

  getScore = () => {
    return this.score;
  };

  getIsInPenaltyBox = () => {
    return this.isInPenaltyBox;
  };

  log = (): string => {
    return this.name;
  };
}

export default Player;
