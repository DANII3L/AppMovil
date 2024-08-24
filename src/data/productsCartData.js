import { productsData } from "./productsData";

const selectedIndices = [0, 2, 3];
export const productsCartData = productsData.filter((_, index) =>
  selectedIndices.includes(index)
);