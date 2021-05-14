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
  } = useContext(LineChartContext);

  return (
    <g transform={`translate(${leftBorderDistance}, ${topBorderDistance})`}>
      <path d={`M0 0 L0 -${yAxisSize} Z`} stroke="black" />
      <path d={`M0 0 L${xAxisSize} 0 Z`} stroke="black" />
      <Marks yAxisSize={yAxisSize} topLimit={topLimit} />
    </g>
  );
};

export default Rulers;
