import React, { useState } from "react";
import LineChartContext from "./context";

import Labels from "./labels";
import Rulers from "./rulers";
import LineGroup from "./lines";
import InfoHover from "./hoverInfo";

import { getLongestLabel, calcTextSize } from "../helpers/index";

export default function LineChart({
  size,
  datasets,
  labels,
  colors,
  negative = false,
  font = { fontFamily: "monospace", fontSize: "10px", fill: "black" },
}) {
  const [hoverInfo, setHoverInfo] = useState(null);

  const getHighestValue = () => {
    const allSets = [];

    datasets.map((set) => allSets.push(...set));

    return Math.max(...allSets);
  };

  const dataNumberLength = getHighestValue().toString().length;
  const baseNumber = Math.pow(10, dataNumberLength - 1);
  const topLimit = Math.ceil(getHighestValue() / baseNumber) * baseNumber;

  const leftBorderDistance =
    calcTextSize(topLimit.toLocaleString(), font.fontFamily, font.fontSize)
      .width + 20;

  const longestLabel = getLongestLabel(labels);

  const longestLabelBbox = calcTextSize(
    longestLabel,
    font.fontFamily,
    font.fontSize
  );

  const topBorderDistance = size - longestLabelBbox.width - 20;

  const longestLabelHeight = longestLabelBbox.height;

  const yAxisSize = topBorderDistance - size * 0.05;
  const xAxisSize = size - leftBorderDistance - size * 0.05;

  const fontStyle = { ...font, fill: negative ? "white" : "black" };

  const context = {
    labels,
    xAxisSize,
    yAxisSize,
    leftBorderDistance,
    topBorderDistance,
    size,
    fontStyle,
    topLimit,
    datasets,
    colors,
    hoverInfo,
    setHoverInfo,
    negative,
    longestLabelHeight,
  };

  return (
    <LineChartContext.Provider value={context}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Rulers />
        <Labels />
        <LineGroup />
        {hoverInfo && <InfoHover />}
      </svg>
    </LineChartContext.Provider>
  );
}
