import Player from "./Player";

class AllPlayers {
  private players: Array<Player> = [];
  private currentPlayerIndex: number = 0;

  add(player: Player) {
    this.players = [...this.players, player];

    console.log(player.log() + " was added");
    console.log("They are player number " + this.players.length);
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  getCurrentPlayerIndex(): number {
    return this.currentPlayerIndex;
  }

  switchToNextPlayer(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }
}

export default AllPlayers;
