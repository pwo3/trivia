import Board from "./Board";

test("get current category", () => {
  // GIVEN
  const board = new Board();
  const place: number = 1;

  // WHEN
  const category = board.getCurrentCategory(place);

  // THEN
  expect(category).toEqual("science");
});

test("get current category", () => {
  // GIVEN
  const board = new Board();
  const place: number = 2;

  // WHEN
  const category = board.getCurrentCategory(place);

  // THEN
  expect(category).toEqual("sports");
});

test("get current category", () => {
  // GIVEN
  const board = new Board();
  const place: number = 5;

  // WHEN
  const category = board.getCurrentCategory(place);

  // THEN
  expect(category).toEqual("science");
});

test("move to next position", () => {
  // GIVEN
  const board = new Board();
  const place: number = 1;

  // WHEN
  const newPlace = board.moveToNextPosition(place, 5);

  // THEN
  expect(newPlace).toEqual(6);
});

test("move to next position beyond 12", () => {
  // GIVEN
  const board = new Board();
  const place: number = 10;

  // WHEN
  const newPlace = board.moveToNextPosition(place, 4);

  // THEN
  expect(newPlace).toEqual(2);
});

test("move to next position beyond 12 (control)", () => {
  // GIVEN
  const board = new Board();
  const place: number = 11;

  // WHEN
  const newPlace = board.moveToNextPosition(place, 4);

  // THEN
  expect(newPlace).toEqual(3);
});
