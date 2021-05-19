import React, { useContext } from "react";
import LineChartContext from "./context";

const Labels = () => {
  const {
    labels,
    xAxisSize,
    leftBorderDistance,
    size,
    fontStyle,
    topBorderDistance,
  } = useContext(LineChartContext);

  const xBase = xAxisSize / (labels.length - 1);

  return (
    <g transform={`translate(${leftBorderDistance}, ${topBorderDistance})`}>
      {labels.map((label, key) => (
        <text
          style={fontStyle}
          x={xBase * key}
          y={size - topBorderDistance - 10}
          textAnchor="middle"
          key={`label_${key}`}
        >
          {label}
        </text>
      ))}
    </g>
  );
};

export default Labels;
