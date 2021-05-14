import React, { useContext } from "react";
import LineChartContext from "./context";

export default function InfoHover() {
  const {
    hoverInfo,
    fontStyle,
    leftBorderDistance,
    topBorderDistance,
  } = useContext(LineChartContext);

  const { x, y, value } = hoverInfo;

  return (
    <g transform={`translate(${leftBorderDistance}, ${topBorderDistance})`}>
      <rect
        x={x - 20}
        y={-y - 25}
        width={40}
        height={20}
        fill="white"
        stroke="black"
      ></rect>
      <text style={fontStyle} x={x} y={-y - 10} textAnchor="middle">
        {value}
      </text>
      <line
        x1={x}
        y1={-y}
        x2={0}
        y2={-y}
        stroke={"black"}
        strokeDasharray="2, 3"
      />
      <line
        x1={x}
        y1={-y}
        x2={x}
        y2={0}
        stroke={"black"}
        strokeDasharray="2, 3"
      />
    </g>
  );
}
