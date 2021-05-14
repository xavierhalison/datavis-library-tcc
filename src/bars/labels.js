import React, { useContext } from "react";
import LineChartContext from "./context";

import { calcTextSize, getLongestLabel } from "../helpers/index";

const Labels = () => {
  const { labels, xAxisSize, leftBorderDistance, size, fontStyle, data } =
    useContext(LineChartContext);

  const barWidth = xAxisSize / (data.length * 2 + 1);

  const longestLabel = getLongestLabel(labels);
  const textSize = calcTextSize(longestLabel, "monospace", 10);

  return (
    <g transform={`translate(${leftBorderDistance + 8}, ${size - 10})`}>
      {labels.map((label, key) => {
        const currentX = (2 * key + 1) * barWidth;
        return (
          <React.Fragment key={`${key}_label`}>
            <path
              d={`M${currentX + 5} ${0} L${currentX + 5} -${textSize.width}`}
              id={`${key}_bar`}
            />
            <text style={fontStyle} x={textSize.width} y="0" textAnchor="end">
              <textPath xlinkHref={`#${key}_bar`}>{label}</textPath>
            </text>
          </React.Fragment>
        );
      })}
    </g>
  );
};

export default Labels;
