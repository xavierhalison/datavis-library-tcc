import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import React, { useContext, useRef, useState, useEffect } from 'react';

var LineChartContext = /*#__PURE__*/React.createContext(null);

var Labels = function Labels() {
  var _useContext = useContext(LineChartContext),
      labels = _useContext.labels,
      xAxisSize = _useContext.xAxisSize,
      leftBorderDistance = _useContext.leftBorderDistance,
      size = _useContext.size,
      fontStyle = _useContext.fontStyle,
      data = _useContext.data;

  var labelsRef = useRef(null);
  var barWidth = xAxisSize / (data.length * 2 + 1);

  var calcTextSize = function calcTextSize(text) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var a = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var body = document.querySelector("body");
    a.textContent = "fevereiro";
    a.style.fontFamily = "monospace";
    a.style.fontSize = "10";
    a.classList = ["calc-bbox"];
    svg.classList = ["calc-bbox"];
    svg.appendChild(a);
    body.appendChild(svg);
    var bbox = a.getBBox();
    var bboxes = document.querySelectorAll(".calc-bbox");
    bboxes.forEach(function (b) {
      return b.parentNode.removeChild(b);
    });
    return bbox;
  };

  return /*#__PURE__*/React.createElement("g", {
    transform: "translate(".concat(leftBorderDistance + 8, ", ").concat(size - 10, ")"),
    ref: labelsRef
  }, labels.map(function (label, key) {
    var currentX = (2 * key + 1) * barWidth;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M".concat(currentX + 5, " ", 0, " L").concat(currentX + 5, " -").concat(calcTextSize().width),
      id: "".concat(key, "_bar")
    }), /*#__PURE__*/React.createElement("text", {
      style: fontStyle,
      x: calcTextSize().width,
      y: "0",
      textAnchor: "end",
      className: "bar-chart-label"
    }, /*#__PURE__*/React.createElement("textPath", {
      xlinkHref: "#".concat(key, "_bar"),
      key: "".concat(key, "_label")
    }, label)));
  }));
};

var Marks = function Marks() {
  var _useContext = useContext(LineChartContext),
      yAxisSize = _useContext.yAxisSize,
      fontStyle = _useContext.fontStyle,
      topLimit = _useContext.topLimit;

  var marks = [];
  var counter = 0;

  for (var index = 0; index <= yAxisSize; index += yAxisSize / 10) {
    marks.push( /*#__PURE__*/React.createElement(React.Fragment, {
      key: "mark_".concat(counter)
    }, /*#__PURE__*/React.createElement("path", {
      d: "M-5 -".concat(index, " L5 -").concat(index, " Z"),
      stroke: "black"
    }), /*#__PURE__*/React.createElement("text", {
      style: fontStyle,
      x: "-10",
      y: -index + 3,
      textAnchor: "end"
    }, topLimit / 10 * counter)));
    counter++;
  }

  return /*#__PURE__*/React.createElement("g", null, marks);
};

var Rulers = function Rulers() {
  var _useContext = useContext(LineChartContext),
      leftBorderDistance = _useContext.leftBorderDistance,
      topBorderDistance = _useContext.topBorderDistance,
      xAxisSize = _useContext.xAxisSize,
      yAxisSize = _useContext.yAxisSize,
      topLimit = _useContext.topLimit;

  return /*#__PURE__*/React.createElement("g", {
    transform: "translate(".concat(leftBorderDistance, ", ").concat(topBorderDistance, ")")
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0 L0 -".concat(yAxisSize, " Z"),
    stroke: "black"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0 L".concat(xAxisSize, " 0 Z"),
    stroke: "black"
  }), /*#__PURE__*/React.createElement(Marks, {
    yAxisSize: yAxisSize,
    topLimit: topLimit
  }));
};

var Bars = function Bars() {
  var _useContext = useContext(LineChartContext),
      leftBorderDistance = _useContext.leftBorderDistance,
      topBorderDistance = _useContext.topBorderDistance,
      xAxisSize = _useContext.xAxisSize,
      yAxisSize = _useContext.yAxisSize,
      topLimit = _useContext.topLimit,
      data = _useContext.data;

  var barWidth = xAxisSize / (data.length * 2 + 1);
  return /*#__PURE__*/React.createElement("g", {
    transform: "translate(".concat(leftBorderDistance, ", ").concat(topBorderDistance, ")")
  }, data.map(function (bar, key) {
    var currentX = (2 * key + 1) * barWidth;
    var currentY = bar * yAxisSize / topLimit;
    return /*#__PURE__*/React.createElement("rect", {
      width: barWidth,
      height: currentY,
      x: currentX,
      y: -currentY,
      fill: "black"
    });
  }));
};

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function BarChart(_ref) {
  var size = _ref.size,
      data = _ref.data,
      labels = _ref.labels,
      colors = _ref.colors;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      hoverInfo = _useState2[0],
      setHoverInfo = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      longestBBox = _useState4[0],
      setLongestBBox = _useState4[1];

  var graphRef = useRef(null);
  useEffect(function () {
    var labels = graphRef.current.querySelectorAll("text.bar-chart-label");

    var _iterator = _createForOfIteratorHelper(labels),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var label = _step.value;

        var _label$getBBox = label.getBBox(),
            height = _label$getBBox.height;

        if (height > longestBBox) setLongestBBox(height);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }, [graphRef, longestBBox]);
  var highestValue = Math.max.apply(Math, _toConsumableArray(data));
  var leftBorderDistance = size * 0.1;
  var topBorderDistance = size - (longestBBox + 20);
  var dataNumberLength = highestValue.toString().length;
  var baseNumber = Math.pow(10, dataNumberLength - 1);
  var topLimit = Math.ceil(highestValue / baseNumber) * baseNumber;
  var yAxisSize = topBorderDistance - size * 0.05;
  var xAxisSize = size - leftBorderDistance - size * 0.05;
  var fontStyle = {
    fontFamily: "monospace",
    fontSize: "10px"
  };
  var context = {
    labels: labels,
    xAxisSize: xAxisSize,
    yAxisSize: yAxisSize,
    leftBorderDistance: leftBorderDistance,
    topBorderDistance: topBorderDistance,
    size: size,
    fontStyle: fontStyle,
    topLimit: topLimit,
    data: data,
    colors: colors,
    hoverInfo: hoverInfo,
    setHoverInfo: setHoverInfo,
    highestValue: highestValue,
    baseNumber: baseNumber,
    longestBBox: longestBBox
  };
  return /*#__PURE__*/React.createElement(LineChartContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      border: "1px solid black"
    },
    width: size,
    height: size,
    viewBox: "0 0 ".concat(size, " ").concat(size),
    ref: graphRef
  }, /*#__PURE__*/React.createElement(Rulers, null), /*#__PURE__*/React.createElement(Labels, null), /*#__PURE__*/React.createElement(Bars, null)));
}

var returnLibrary = function returnLibrary() {
  return {
    BarChart: BarChart
  };
};

var index = returnLibrary();

export default index;
