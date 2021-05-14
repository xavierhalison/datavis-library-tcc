import React, { useState, useRef, useEffect } from "react";
import LineChartContext from "./context";

import Labels from "./labels";
import Rulers from "./rulers";
import Bars from "./bars";

import { getLongestLabel, calcTextSize } from "../helpers";

export default function BarChart({ size, data, labels, colors }) {
  const [hoverInfo, setHoverInfo] = useState(null);
  const graphRef = useRef(null);

  const highestValue = Math.max(...data);

  const longestLabel = getLongestLabel(labels);
  const textSize = calcTextSize(longestLabel, "monospace", 10);
  const dataNumberLength = highestValue.toString().length;

  const baseNumber = Math.pow(10, dataNumberLength - 1);

  const topLimit = Math.ceil(highestValue / baseNumber) * baseNumber;

  const leftBorderDistance =
    calcTextSize(topLimit.toString(), "monospace", 10).width + 20;
  const topBorderDistance = size - textSize.width - 20;

  const yAxisSize = topBorderDistance - size * 0.05;
  const xAxisSize = size - leftBorderDistance - size * 0.05;

  const fontStyle = {
    fontFamily: "monospace",
    fontSize: "10px",
  };

  const context = {
    labels,
    xAxisSize,
    yAxisSize,
    leftBorderDistance,
    topBorderDistance,
    size,
    fontStyle,
    topLimit,
    data,
    colors,
    hoverInfo,
    setHoverInfo,
    highestValue,
    baseNumber,
  };

  return (
    <LineChartContext.Provider value={context}>
      <svg
        style={{ border: "1px solid black" }}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        ref={graphRef}
      >
        <Rulers />
        <Labels />
        <Bars />
      </svg>
    </LineChartContext.Provider>
  );
}
