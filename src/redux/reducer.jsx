export const reducer = (state = 0, action) => {
  console.log(action);
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    case "DECREASE":
      return state - 1;
    default:
      return state;
  }
};
