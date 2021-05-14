export const calcTextSize = (text, font, size) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const a = document.createElementNS("http://www.w3.org/2000/svg", "text");
  const body = document.querySelector("body");

  a.textContent = text;
  a.style.fontFamily = font;
  a.style.fontSize = size;
  a.classList = ["calc-bbox"];

  svg.classList = ["calc-bbox"];
  svg.appendChild(a);

  body.appendChild(svg);

  const bbox = a.getBBox();

  const bboxes = document.querySelectorAll(".calc-bbox");
  bboxes.forEach((b) => b.parentNode.removeChild(b));

  return bbox;
};

export const getLongestLabel = (labelList) => {
  let longestLabel = "";

  for (const iterator of labelList) {
    if (iterator.length > longestLabel.length) longestLabel = iterator;
  }

  return longestLabel;
};
