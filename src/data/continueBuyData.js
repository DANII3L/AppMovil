import { productsData } from "./productsData";

const selectedIndices = [0, 2, 3];
export const continueBuyData = productsData.filter((_, index) =>
  selectedIndices.includes(index)
);
  