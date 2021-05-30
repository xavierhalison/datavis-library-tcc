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

  const dotXBase = xAxisSize / (labels.length - 1);

  return (
    <g transform={`translate(${leftBorderDistance}, ${size})`}>
      {labels.map((label, key) => {
        const currentX = dotXBase * key;

        return (
          <>
            <path
              d={`M${currentX} ${0} L${currentX} -${size - topBorderDistance}`}
              id={`${key}_dot`}
            />
            <text
              style={fontStyle}
              x={15}
              y={0}
              textAnchor="start"
              key={`label_${key}`}
            >
              <textPath xlinkHref={`#${key}_dot`}>{label}</textPath>
            </text>
          </>
        );
      })}
    </g>
  );
};

export default Labels;
