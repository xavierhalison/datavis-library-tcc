import React, { useContext } from "react";
import LineChartContext from "./context";

const Labels = () => {
  const { labels, xAxisSize, paddingLeft, paddingTop, size, fontStyle, data } =
    useContext(LineChartContext);

  const barWidth = xAxisSize / (data.length * 2 + 1);

  return (
    <g transform={`translate(${paddingLeft + 8}, ${size - 10})`}>
      {labels.map((label, key) => {
        const currentX = (2 * key + 1) * barWidth;
        return (
          <React.Fragment key={`${key}_label`}>
            <path
              d={`M${currentX + 5} ${0} L${currentX + 5} -${paddingTop}`}
              id={`${key}_bar`}
            />
            <text style={fontStyle} x={paddingTop - 20} y="0" textAnchor="end">
              <textPath xlinkHref={`#${key}_bar`}>{label}</textPath>
            </text>
          </React.Fragment>
        );
      })}
    </g>
  );
};

export default Labels;
