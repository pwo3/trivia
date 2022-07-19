import { Category } from "./types";
import { capitalizeFirstLetter } from "./utils";

export const createQuestions = (type: Category, numberOfQuestions: number) => {
  return [...Array(numberOfQuestions)].map((_, i) => capitalizeFirstLetter(`${type} Question ${i}`));
};

class Questions {
  private questions: Record<Category, Array<string>> = {
    pop: [],
    science: [],
    sports: [],
    rock: [],
  };

  // What if there is no question left in the category?

  constructor(numberOfQuestions: number = 50) {
    this.questions = {
      pop: createQuestions("pop", numberOfQuestions),
      science: createQuestions("science", numberOfQuestions),
      sports: createQuestions("sports", numberOfQuestions),
      rock: createQuestions("rock", numberOfQuestions),
    };
  }

  popQuestion = (category: Category): string => {
    const question = this.questions[category][0];

    this.questions[category] = this.questions[category].slice(1);

    return question;
  };
}

export default Questions;
