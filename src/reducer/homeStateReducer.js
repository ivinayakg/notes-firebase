export const homeStateReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_NOTES":
      return { ...state, notesType: payload };
    case "TOGGLE_SEARCH":
      return { ...state, search: !state.search };
    case "SEARCH_QUERY":
      return { ...state, searchQuery: payload };
    default:
      return state;
  }
};
