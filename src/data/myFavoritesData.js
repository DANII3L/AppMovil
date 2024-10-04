import {productsData} from './productsData';

const selectedIndices = [0, 2, 3, 10, 11, 12, 4, 5, 6, 7, 8];
export const myFavoritesData = productsData.filter((_, index) =>
  selectedIndices.includes(index),
);
