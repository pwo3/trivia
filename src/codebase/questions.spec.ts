import Questions, { createQuestions } from "./Questions";
import { Category } from "./types";

test("create questions by type", () => {
  // GIVEN
  const numberOfQuestions: number = 5;
  const category: Category = "pop";

  // WHEN
  const questions = createQuestions(category, numberOfQuestions);

  // THEN
  expect(questions).toEqual(["Pop Question 0", "Pop Question 1", "Pop Question 2", "Pop Question 3", "Pop Question 4"]);
});

test("pop question", () => {
  // GIVEN
  const questions = new Questions(50);

  // WHEN
  const question = questions.popQuestion("pop");

  // THEN
  expect(question).toEqual("Pop Question 0");
});

test("pop 2 questions (control)", () => {
  // GIVEN
  const questions = new Questions(50);
  questions.popQuestion("pop");

  // WHEN
  const question2 = questions.popQuestion("pop");

  // THEN
  expect(question2).toEqual("Pop Question 1");
});
