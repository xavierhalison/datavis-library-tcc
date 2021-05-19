import React, { useContext } from "react";

import LineChartContext from "./context";
import Marks from "./marks";

const Rulers = () => {
  const { paddingLeft, paddingTop, size, negative } =
    useContext(LineChartContext);

  const yAxisSize = size - paddingTop - 20;
  const xAxisSize = size - paddingLeft - 20;

  return (
    <g transform={`translate(${paddingLeft}, ${size - paddingTop})`}>
      <path
        d={`M0 0 L0 -${yAxisSize} Z`}
        stroke={negative ? "white" : "black"}
      />
      <path
        d={`M0 0 L${xAxisSize} 0 Z`}
        stroke={negative ? "white" : "black"}
      />
      <Marks />
    </g>
  );
};

export default Rulers;
