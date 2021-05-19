import React, { useContext } from "react";
import LineChartContext from "./context";

export default function InfoHover() {
  const {
    hoverInfo,
    fontStyle,
    leftBorderDistance,
    topBorderDistance,
    negative,
  } = useContext(LineChartContext);

  const { x, y, value } = hoverInfo;

  return (
    <g transform={`translate(${leftBorderDistance}, ${topBorderDistance})`}>
      <rect
        x={x - leftBorderDistance}
        y={-y - 30}
        width={leftBorderDistance}
        height={30}
        fill={negative ? "black" : "white"}
        stroke={negative ? "white" : "black"}
      ></rect>
      <text
        style={fontStyle}
        x={x - leftBorderDistance + 10}
        y={-y - 10}
        textAnchor="start"
      >
        {value}
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
        y2={0}
        stroke={negative ? "white" : "black"}
        strokeDasharray="2, 3"
      />
    </g>
  );
}
