import React, { useContext } from "react";
import LineChartContext from "./context";

const Marks = () => {
  const { yAxisSize, fontStyle, topLimit, negative } =
    useContext(LineChartContext);

  let marks = [];

  let counter = 0;

  for (let index = 0; index <= yAxisSize; index += Math.round(yAxisSize / 10)) {
    marks.push(
      <React.Fragment key={`mark_${counter}`}>
        <path
          d={`M-5 -${index} L5 -${index} Z`}
          stroke={negative ? "white" : "black"}
        />
        <text style={fontStyle} x="-10" y={-index + 3} textAnchor="end">
          {((topLimit / 10) * counter).toLocaleString()}
        </text>
      </React.Fragment>
    );

    counter++;
  }

  return <g>{marks}</g>;
};

export default Marks;
