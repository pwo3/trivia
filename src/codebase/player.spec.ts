import Board from "./Board";
import Player from "./Player";

describe("Player", () => {
  it("move in penalty box if provides wrong answer", () => {
    // GIVEN
    const player = new Player("Pat");

    // WHEN
    player.moveToPenaltyBox();

    // THEN
    expect(player.getIsInPenaltyBox()).toBeTruthy();
  });

  it("should get out of penalty box if roll is odd", () => {
    // GIVEN
    const board = new Board();
    const player = new Player("Pat");
    player.moveToPenaltyBox();

    // WHEN
    player.move(board)(3);

    // THEN
    expect(player.getIsInPenaltyBox()).toBeFalsy();
  });

  it("should stay in penalty box if roll is even", () => {
    // GIVEN
    const board = new Board();
    const player = new Player("Pat");
    player.moveToPenaltyBox();

    // WHEN
    player.move(board)(4);

    // THEN
    expect(player.getIsInPenaltyBox()).toBeTruthy();
  });

  it("should stay in penalty box if roll is even", () => {
    // GIVEN
    const board = new Board();
    const player = new Player("Pat");
    player.moveToPenaltyBox();

    // WHEN
    player.move(board)(6);

    // THEN
    expect(player.getIsInPenaltyBox()).toBeTruthy();
  });
});
