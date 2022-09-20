import { UnsetGame } from "./UnsetGame";

test("should not add player after start", () => {
  // GIVEN
  const game = new UnsetGame();

  // WHEN
  const nextGame = game.add("Chet").start();

  // THEN
  expect(() => nextGame.add("Pat")).toThrow();
});
