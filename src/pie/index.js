import React, { useRef, useState } from "react";

import { getLongestLabel, calcTextSize } from "../helpers/index";

export default function PieChart({
  size,
  data,
  colors,
  labels,
  negative,
  font = { fontFamily: "monospace", fontSize: "10px", fill: "black" },
}) {
  const longestLabel = getLongestLabel(labels);
  const highestValue = Math.max(...data);

  const labelBox = calcTextSize(
    `${longestLabel}: ${highestValue}`,
    font.fontFamily,
    font.fontSize
  );

  const fontStyle = { ...font, fill: negative ? "white" : "black" };

  const total = data.reduce((a, b) => a + b);
  const rad = size / 2;
  const svgRef = useRef(null);

  const [hoverInfo, setHoverInfo] = useState(null);

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `M${start.x} ${start.y} A${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} L ${radius} ${radius}`;
  }

  function Slices() {
    const SliceList = [];
    let startAngle = 0;

    for (const [key, iterator] of data.entries()) {
      const currentSliceAngle = (360 * iterator) / total;

      SliceList.push(
        <path
          key={`slice_value_${key}`}
          onMouseMove={(e) => {
            const matrix = handleMouseMove(e);
            const color = colors[key];

            setHoverInfo({
              SVGPoint: matrix,
              currentSlice: {
                value: iterator,
                label: labels[key],
                color: color,
              },
            });
          }}
          d={describeArc(
            rad,
            rad,
            rad,
            startAngle,
            startAngle + currentSliceAngle
          )}
          stroke="none"
          fill={colors[key]}
        />
      );

      startAngle += currentSliceAngle;
    }

    return SliceList;
  }

  function cursorPoint(evt) {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();

    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  const handleMouseMove = (e) => {
    const matrix = cursorPoint(e);
    return matrix;
  };

  const HoverInfo = () => {
    const x =
      hoverInfo.SVGPoint.x > size / 2
        ? hoverInfo.SVGPoint.x - 100
        : hoverInfo.SVGPoint.x;

    return (
      <>
        <rect
          width={labelBox.width + 30}
          height={labelBox.height + 10}
          x={x}
          y={hoverInfo.SVGPoint.y}
          fill={negative ? "black" : "white"}
        />
        <rect
          width={10}
          height={labelBox.height}
          x={x + 5}
          y={hoverInfo.SVGPoint.y + 5}
          fill={hoverInfo.currentSlice.color}
        />
        <text
          x={x + 20}
          y={hoverInfo.SVGPoint.y + 15}
          textAnchor="start"
          style={fontStyle}
        >
          {hoverInfo.currentSlice.label}: {hoverInfo.currentSlice.value}
        </text>
      </>
    );
  };

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      onMouseLeave={() => setHoverInfo(null)}
    >
      <Slices />
      {hoverInfo && <HoverInfo />}
    </svg>
  );
}
