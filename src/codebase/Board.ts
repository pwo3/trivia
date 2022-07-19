import { Category } from "./types";

class Board {
  private CATEGORY_BY_PLACE: Record<0 | 1 | 2 | 3, Category> = {
    0: "pop",
    1: "science",
    2: "sports",
    3: "rock",
  };

  getCurrentCategory = (place: number): Category => {
    return this.CATEGORY_BY_PLACE[place % 4];
  };
}

export default Board;
