import React, { useContext } from "react";
import LineChartContext from "./context";

export default function InfoHover() {
  const { hoverInfo, fontStyle, paddingLeft, size, paddingTop, negative } =
    useContext(LineChartContext);

  const { x, y, value } = hoverInfo;

  return (
    <g transform={`translate(${paddingLeft}, ${size - paddingTop})`}>
      <rect
        x={x - paddingLeft / 2}
        y={-y - 25}
        width={paddingLeft}
        height={20}
        fill={negative ? "black" : "white"}
        stroke={negative ? "white" : "black"}
      ></rect>
      <text style={fontStyle} x={x} y={-y - 10} textAnchor="middle">
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
