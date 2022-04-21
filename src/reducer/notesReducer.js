const branchMapper = {
  notes: "notes",
  trash: "notesTrash",
};

export const notesReducer = (state, action) => {
  const { type, payload, branch } = action;
  let currentBranch = state[branchMapper[branch]];
  switch (type) {
    case "ADD":
      return { ...state, [branchMapper[branch]]: [...currentBranch, payload] };
    case "REMOVE":
      return {
        ...state,
        [branchMapper[branch]]: currentBranch.filter(
          (entry) => entry._id !== payload._id
        ),
      };
    case "UPDATE":
      return {
        ...state,
        [branchMapper[branch]]: currentBranch.map((entry) =>
          entry._id === payload._id ? payload : entry
        ),
      };
    default:
      return state;
  }
};
