export const notesReducer = (state, action) => {
  const { type, payload, branch } = action;
  switch (type) {
    case "UPDATE_STATE_SNAPSHOT":
      return { ...state, [branch]: payload };
    default:
      return state;
  }
};
