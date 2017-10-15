export const rootSelector = rootName => state => {
  return state[rootName];
};