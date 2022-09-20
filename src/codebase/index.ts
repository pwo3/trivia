import { UnsetGame } from "./UnsetGame";

export class Game {
  private game: any = new UnsetGame();

  public add(name: string): boolean {
    this.game.add(name);

    return true;
  }

  public start() {
    this.game = this.game.start();
  }

  public roll(roll: number) {
    this.game = this.game.roll(roll);
  }

  public wrongAnswer(): boolean {
    this.game = this.game.wrongAnswer();

    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    const nextGame = this.game.goodAnswer();

    const didPlayerWin = this.game.didPlayerWin();

    this.game = nextGame;

    return didPlayerWin;
  }
}
