import AllPlayers from "./AllPlayers";
import Player from "./Player";

test("should be on first player", () => {
  // GIVEN
  const players = new AllPlayers();
  players.add(new Player("Chet"));

  // WHEN

  // THEN
  expect(players.getCurrentPlayer().log()).toEqual("Chet");
});

test("should switch to second player", () => {
  // GIVEN
  const players = new AllPlayers();
  players.add(new Player("Chet"));
  players.add(new Player("Pat"));

  // WHEN
  players.switchToNextPlayer();

  // THEN
  expect(players.getCurrentPlayer().log()).toEqual("Pat");
});

test("should switch to first player if on last one", () => {
  // GIVEN
  const players = new AllPlayers();
  players.add(new Player("Chet"));
  players.add(new Player("Pat"));
  players.switchToNextPlayer();

  // WHEN
  players.switchToNextPlayer();

  // THEN
  expect(players.getCurrentPlayer().log()).toEqual("Chet");
});
