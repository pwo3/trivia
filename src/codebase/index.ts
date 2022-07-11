import { getCurrentCategory } from "./Board";
import { capitalizeFirstLetter, Questions } from "./Questions";

/* eslint-disable */
export class Game {
  private players: Array<string> = [];
  private places: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private questions = new Questions(50);

  public add(name: string): boolean {
    this.players.push(name);
    this.places[this.howManyPlayers() - 1] = 0;
    this.purses[this.howManyPlayers() - 1] = 0;
    this.inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(name + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  public roll(roll: number) {
    console.log(this.players[this.currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(this.players[this.currentPlayer] + " is getting out of the penalty box");
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 11) {
          this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }

        console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
      } else {
        console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
      if (this.places[this.currentPlayer] > 11) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
      }

      console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
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
    return capitalizeFirstLetter(getCurrentCategory(this.places[this.currentPlayer]));
  }

  private didPlayerWin(): boolean {
    console.log(`Player ${this.currentPlayer} won the game`);
    return !(this.purses[this.currentPlayer] == 6);
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!");
        this.purses[this.currentPlayer] += 1;
        console.log(this.players[this.currentPlayer] + " now has " + this.purses[this.currentPlayer] + " Gold Coins.");

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

      this.purses[this.currentPlayer] += 1;
      console.log(this.players[this.currentPlayer] + " now has " + this.purses[this.currentPlayer] + " Gold Coins.");

      var winner = this.didPlayerWin();

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

      console.log(`Player ${this.currentPlayer} won the game`);

      return winner;
    }
  }
}
