import runGoldenMaster from "jest-golden-master";
import { Game } from ".";

test("one roll", async () => {
  await runGoldenMaster("one roll", async () => {
    const game = new Game();

    game.add("Chet");
    game.start();

    game.roll(1);
  });
});

test("correct answers", async () => {
  await runGoldenMaster("correct answers", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

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

test("one wrong answer", async () => {
  await runGoldenMaster("one wrong answer", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

    game.roll(1);

    game.wrongAnswer();

    game.roll(2);

    game.wasCorrectlyAnswered();

    game.roll(2);

    game.wasCorrectlyAnswered();
  });
});

test("moving out of penalty box", async () => {
  await runGoldenMaster("moving out of penalty box", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

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

test("in penalty box 2 turns", async () => {
  await runGoldenMaster("in penalty box 2 turns", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

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

test("one board complete turn", async () => {
  await runGoldenMaster("one board complete turn", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

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

test("one board complete turn from penalty box", async () => {
  await runGoldenMaster("one board complete turn from penalty box", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

    // Chet turn
    game.roll(4);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(6);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(6);
    game.wrongAnswer();

    // Pat turn
    game.roll(6);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(5);
    game.wasCorrectlyAnswered();
  });
});

test("get to place 8", async () => {
  await runGoldenMaster("get to place 8", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

    // Chet turn
    game.roll(6);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(6);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(2);
    game.wasCorrectlyAnswered();
  });
});

test("get to place 5", async () => {
  await runGoldenMaster("get to place 5", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

    // Chet turn
    game.roll(5);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(6);
    game.wasCorrectlyAnswered();
  });
});

test("get to place 9", async () => {
  await runGoldenMaster("get to place 9", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

    // Chet turn
    game.roll(5);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(6);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(4);
    game.wasCorrectlyAnswered();
  });
});

test("last player in penalty box", async () => {
  await runGoldenMaster("last player in penalty box", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

    // Chet turn
    game.roll(5);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(6);
    game.wrongAnswer();
  });
});

test("last player out of penalty box", async () => {
  await runGoldenMaster("last player out of penalty box", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

    // Chet turn
    game.roll(5);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(6);
    game.wrongAnswer();

    // Chet turn
    game.roll(5);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(5);
    game.wasCorrectlyAnswered();
  });
});

test("last player in penalty box with good answer", async () => {
  await runGoldenMaster("last player in penalty box with good answer", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

    // Chet turn
    game.roll(5);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(6);
    game.wrongAnswer();

    // Chet turn
    game.roll(5);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(6);
    game.wasCorrectlyAnswered();
  });
});

test("one player win", async () => {
  await runGoldenMaster("one player win", async () => {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.start();

    // Chet turn
    game.roll(1);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(1);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(1);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(1);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(1);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(1);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(1);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(1);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(1);
    game.wasCorrectlyAnswered();

    // Pat turn
    game.roll(1);
    game.wasCorrectlyAnswered();

    // Chet turn
    game.roll(1);
    game.wasCorrectlyAnswered();
  });
});

test("should not add player after start", () => {
  // GIVEN
  const game = new Game();

  // WHEN
  game.add("Chet");
  game.start();

  // THEN
  expect(() => game.add("Pat")).toThrow();
});
