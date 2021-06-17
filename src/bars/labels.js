import React, { useContext } from "react";
import LineChartContext from "./context";
import { generateUID } from "../helpers/index.js";

const Labels = () => {
  const { labels, xAxisSize, paddingLeft, paddingTop, size, fontStyle, data } =
    useContext(LineChartContext);

  const barWidth = xAxisSize / (data.length * 2 + 1);
  const uid = generateUID();

  return (
    <g transform={`translate(${paddingLeft + 8}, ${size - 10})`}>
      {labels.map((label, key) => {
        const currentX = (2 * key + 1) * barWidth;
        console.log(currentX);
        return (
          <React.Fragment key={`${key}_label`}>
            <path
              d={`M${currentX} ${0} L${currentX} -${paddingTop}`}
              id={`${key}-${uid}_bar`}
            />
            <text style={fontStyle} x={paddingTop - 20} y="0" textAnchor="end">
              <textPath xlinkHref={`#${key}-${uid}_bar`}>{label}</textPath>
            </text>
          </React.Fragment>
        );
      })}
    </g>
  );
};

export default Labels;
