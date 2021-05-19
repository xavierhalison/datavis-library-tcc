import React, { useContext } from "react";

import LineChartContext from "./context";
import Marks from "./marks";

const Rulers = () => {
  const {
    leftBorderDistance,
    topBorderDistance,
    xAxisSize,
    yAxisSize,
    topLimit,
    negative,
  } = useContext(LineChartContext);

  return (
    <g transform={`translate(${leftBorderDistance}, ${topBorderDistance})`}>
      <path
        d={`M0 0 L0 -${yAxisSize} Z`}
        stroke={negative ? "white" : "black"}
      />
      <path
        d={`M0 0 L${xAxisSize + 10} 0 Z`}
        stroke={negative ? "white" : "black"}
      />
      <Marks yAxisSize={yAxisSize} topLimit={topLimit} />
    </g>
  );
};

export default Rulers;
