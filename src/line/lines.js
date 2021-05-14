import React, { useContext } from "react";
import LineChartContext from "./context";

const Line = ({ line, color }) => {
  const {
    xAxisSize,
    labels,
    leftBorderDistance,
    topBorderDistance,
    yAxisSize,
    topLimit,
    setHoverInfo,
    fontStyle,
  } = useContext(LineChartContext);

  const dotXBase = xAxisSize / (labels.length - 1);

  return (
    <g transform={`translate(${leftBorderDistance}, ${topBorderDistance})`}>
      {line.map((l, key) => {
        const getY = (lValue) => {
          return (lValue * yAxisSize) / topLimit;
        };
        const getX = (keyValue) => {
          return keyValue * dotXBase;
        };

        const l2 = line[key + 1];

        return (
          <React.Fragment key={`lineFrag_${key}`}>
            {l2 && (
              <line
                x1={getX(key)}
                y1={-getY(l)}
                x2={getX(key + 1)}
                y2={-getY(l2)}
                stroke={color}
              />
            )}
            <circle
              cx={getX(key)}
              cy={-getY(l)}
              r="5"
              fill={color}
              onMouseOver={() =>
                setHoverInfo({
                  x: getX(key),
                  y: getY(l),
                  fontStyle: fontStyle,
                  value: l,
                })
              }
              onMouseOut={() => setHoverInfo(null)}
            >
              {l}
            </circle>
          </React.Fragment>
        );
      })}
    </g>
  );
};

const LineGroup = () => {
  const { datasets, colors } = useContext(LineChartContext);

  return (
    <g transform={`translate(${0}, ${0})`}>
      {datasets.map((line, key) => (
        <Line line={line} color={colors[key]} key={`line_${key}`} />
      ))}
    </g>
  );
};

export default LineGroup;
