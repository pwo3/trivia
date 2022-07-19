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
