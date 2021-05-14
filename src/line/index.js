import React, { useState } from "react";
import LineChartContext from "./context";

import Labels from "./labels";
import Rulers from "./rulers";
import LineGroup from "./lines";
import InfoHover from "./hoverInfo";

export default function LineChart({ size, datasets, labels, colors }) {
  const [hoverInfo, setHoverInfo] = useState(null);

  const getHighestValue = () => {
    const allSets = [];

    datasets.map((set) => allSets.push(...set));

    return Math.max(...allSets);
  };

  const leftBorderDistance = size * 0.1;
  const topBorderDistance = size * 0.9;

  const dataNumberLength = getHighestValue().toString().length;
  const baseNumber = Math.pow(10, dataNumberLength - 1);
  const topLimit = Math.ceil(getHighestValue() / baseNumber) * baseNumber;

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
    datasets,
    colors,
    hoverInfo,
    setHoverInfo,
  };

  return (
    <LineChartContext.Provider value={context}>
      <svg
        style={{ border: "1px solid black" }}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <Rulers />
        <Labels />
        <LineGroup />
        {hoverInfo && <InfoHover />}
      </svg>
    </LineChartContext.Provider>
  );
}
