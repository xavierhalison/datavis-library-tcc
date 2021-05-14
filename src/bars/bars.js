import React, { useContext } from "react";
import LineChartContext from "./context";

const Bars = () => {
  const {
    leftBorderDistance,
    topBorderDistance,
    xAxisSize,
    yAxisSize,
    topLimit,
    data,
  } = useContext(LineChartContext);

  const barWidth = xAxisSize / (data.length * 2 + 1);

  return (
    <g transform={`translate(${leftBorderDistance}, ${topBorderDistance})`}>
      {data.map((bar, key) => {
        const currentX = (2 * key + 1) * barWidth;

        const currentY = (bar * yAxisSize) / topLimit;

        return (
          <rect
            width={barWidth}
            height={currentY}
            x={currentX}
            y={-currentY}
            fill="black"
          />
        );
      })}
    </g>
  );
};

export default Bars;
