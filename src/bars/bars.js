import React, { useContext } from "react";
import LineChartContext from "./context";

const Bars = () => {
  const {
    paddingLeft,
    paddingTop,
    xAxisSize,
    yAxisSize,
    topLimit,
    data,
    size,
    color,
    setHoverInfo,
    fontStyle,
    negative,
  } = useContext(LineChartContext);

  const barWidth = xAxisSize / (data.length * 2 + 1);

  return (
    <g transform={`translate(${paddingLeft}, ${size - paddingTop})`}>
      {data.map((bar, key) => {
        const currentX = (2 * key + 1) * barWidth;

        const currentY = (bar * yAxisSize) / topLimit;

        return (
          <rect
            width={barWidth}
            height={currentY}
            x={currentX}
            y={-currentY}
            fill={color || "black"}
            key={`bar_${key}`}
            onMouseOver={() =>
              setHoverInfo({
                x: currentX,
                y: currentY,
                fontStyle: fontStyle,
                value: bar,
              })
            }
            onMouseOut={() => setHoverInfo(null)}
            stroke={negative ? "white" : "black"}
            stroke-width={1}
          />
        );
      })}
    </g>
  );
};

export default Bars;
