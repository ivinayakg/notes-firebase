export const increaseHeightTextarea = (e, maxHeight) => {
  let value = e.target.value;
  let lineBreaks = (value.match(/\n/g) || []).length;
  let heightOfTextarea = e.target.offsetHeight;
  let widthOfTextarea = e.target.offsetWidth;
  let styles = window.getComputedStyle(e.target, null);
  let fontSize = parseFloat(styles.fontSize); //will remove px from the value
  let numberOfLines = Math.ceil(
    value.length / (widthOfTextarea / (fontSize / 2))
  );
  let newHeight =
    parseFloat(styles.fontSize) * (numberOfLines + lineBreaks + 1) + 24;

  if (maxHeight) {
    if (heightOfTextarea < newHeight) e.target.style.height = `${newHeight}px`;
  } else e.target.style.height = `${newHeight}px`;
};
