import { Category } from "./Questions";

const CATEGORY_BY_PLACE: Record<0 | 1 | 2 | 3, Category> = {
  0: "pop",
  1: "science",
  2: "sports",
  3: "rock",
};

export const getCurrentCategory = (place: number) => {
  return CATEGORY_BY_PLACE[place % 4];
};
