import React, { useState } from "react";
import LineChartContext from "./context";

import Labels from "./labels";
import Rulers from "./rulers";
import Bars from "./bars";
import HoverInfo from "./hoverInfo";

import { getLongestLabel, calcTextSize } from "../helpers/index";

export default function BarChart({ size, data, labels, color }) {
  const longestLabel = getLongestLabel(labels);
  const highestValue = Math.max(...data);
  const dataNumberLength = highestValue.toString().length;
  const baseNumber = Math.pow(10, dataNumberLength - 1);

  const topLimit = Math.ceil(highestValue / baseNumber) * baseNumber;

  const paddingLeft =
    calcTextSize(topLimit.toString(), "monospace", 10).width + 20;
  const paddingTop = calcTextSize(longestLabel, "monospace", 10).width + 20;

  const yAxisSize = size - paddingTop - 20;
  const xAxisSize = size - paddingLeft - 20;

  const fontStyle = {
    fontFamily: "monospace",
    fontSize: "10px",
  };

  const [chartData] = useState({
    paddingLeft,
    paddingTop,
    topLimit,
    yAxisSize,
    xAxisSize,
    data,
    labels,
    size,
    fontStyle,
    color,
  });

  const [hoverInfo, setHoverInfo] = useState(null);

  return (
    <LineChartContext.Provider
      value={{ ...chartData, hoverInfo, setHoverInfo }}
    >
      <svg
        style={{ border: "1px solid black" }}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <Rulers />
        <Labels />
        <Bars />
        {hoverInfo && <HoverInfo />}
      </svg>
    </LineChartContext.Provider>
  );
}
