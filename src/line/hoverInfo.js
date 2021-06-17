import React, { useContext } from "react";
import LineChartContext from "./context";

export default function InfoHover() {
  const {
    hoverInfo,
    fontStyle,
    leftBorderDistance,
    topBorderDistance,
    negative,
    longestLabelHeight,
  } = useContext(LineChartContext);

  const { x, y, value } = hoverInfo;

  return (
    <g transform={`translate(${leftBorderDistance}, ${topBorderDistance})`}>
      <rect
        x={x - leftBorderDistance}
        y={-y - longestLabelHeight * 2}
        width={leftBorderDistance}
        height={longestLabelHeight * 1.5}
        fill={negative ? "black" : "white"}
        stroke={negative ? "white" : "black"}
      ></rect>
      <text
        style={fontStyle}
        x={x - leftBorderDistance / 1.2}
        y={-y - longestLabelHeight}
        textAnchor="start"
      >
        {value.toLocaleString()}
      </text>
      <line
        x1={x}
        y1={-y}
        x2={0}
        y2={-y}
        stroke={negative ? "white" : "black"}
        strokeDasharray="2, 3"
      />
      <line
        x1={x}
        y1={-y}
        x2={x}
        y2={10}
        stroke={negative ? "white" : "black"}
        strokeDasharray="2, 3"
      />
    </g>
  );
}
