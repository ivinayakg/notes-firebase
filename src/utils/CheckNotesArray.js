export const CheckNotesArray = (state, pathname) => {
  return pathname === "/home/trash"
    ? state.notesTrash
    : pathname === "/home/star"
    ? state.notes.filter((entry) => entry.star && !entry.draft)
    : pathname === "/home/draft"
    ? state.notes.filter((entry) => entry.draft)
    : state.notes.filter((entry) => !entry.draft);
};
