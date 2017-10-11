export const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = {};
  action.type = type;
  argNames.forEach((item, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};