import AllPlayers from "./AllPlayers";
import { RollGame } from "./RollGame";
import Player from "./Player";
import Board from "./Board";
import Questions from "./Questions";

export class UnsetGame {
  private players = new AllPlayers();

  add = (name: string): UnsetGame => {
    this.players.add(new Player(name));

    return this;
  };

  start = (): RollGame => {
    return new RollGame(new Questions(), new Board(), this.players);
  };
}
