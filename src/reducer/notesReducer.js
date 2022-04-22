export const notesReducer = (state, action) => {
  const { type, payload, branch } = action;
  switch (type) {
    case "UPDATE_STATE_SNAPSHOT":
      return { ...state, [branch]: payload };
    case "AUTH":
      return { ...state, isAuth: payload };
    default:
      return state;
  }
};
