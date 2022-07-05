import { Game } from ".";
import runGoldenMaster from "../refactoring-utils";

test("Scenario #0", () => {
  runGoldenMaster(0, () => {
    const game = new Game();

    game.add("Chet");

    game.roll(1);
  });
});

test("Scenario #1", () => {
  runGoldenMaster(1, () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");

    game.roll(1);

    game.wasCorrectlyAnswered();

    game.roll(4);

    game.wasCorrectlyAnswered();

    game.roll(5);

    game.wasCorrectlyAnswered();

    game.roll(2);

    game.wasCorrectlyAnswered();
  });
});

test("Scenario #2", () => {
  runGoldenMaster(2, () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");

    game.roll(1);

    game.wrongAnswer();

    game.roll(2);

    game.wasCorrectlyAnswered();

    game.roll(2);

    game.wasCorrectlyAnswered();
  });
});

test("Scenario #3", () => {
  runGoldenMaster(3, () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");

    // Chet turn
    game.roll(1);
    game.wrongAnswer();
    // Chet moving to penalty box

    // Pat turn
    game.roll(2);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(2);
    game.wasCorrectlyAnswered();
    // Nothing appends

    // Pat turn
    game.roll(4);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(3);
    // Moving out of penalty box
    game.wasCorrectlyAnswered();
  });
});

test("Scenario #4", () => {
  runGoldenMaster(4, () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");

    // Chet turn
    game.roll(1);
    game.wrongAnswer();
    // Chet moving to penalty box

    // Pat turn
    game.roll(2);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(2);
    game.wrongAnswer();
    // Chet moving to penalty box even if still in it

    // Pat turn
    game.roll(4);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(3);
    // Moving out of penalty box
    game.wasCorrectlyAnswered();
  });
});

test("Scenario #4", () => {
  runGoldenMaster(5, () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");

    // Chet turn
    game.roll(6);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(6);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(6);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(6);
    game.wasCorrectlyAnswered();
  });
});

// Write test to handle place > 11 from penalty box

// Write test to check if the game is ended
