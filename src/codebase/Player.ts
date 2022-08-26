import Board from "./Board";

class Player {
  private place: number = 0;
  private score: number = 0;
  private isInPenaltyBox: boolean = false;

  constructor(private name: string) {}

  private scorePoint = (): void => {
    this.score += 1;
  };

  move =
    (board: Board) =>
    (roll: number): void => {
      if (roll % 2 !== 0) {
        this.isInPenaltyBox = false;
      }

      this.place = board.moveToNextPosition(this.place, roll);
    };

  getCurrentPlace = (): number => {
    return this.place;
  };

  provideGoodAnswer = (): void => {
    this.scorePoint();
  };

  provideWrongAnswer = (): void => {
    this.isInPenaltyBox = true;
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
