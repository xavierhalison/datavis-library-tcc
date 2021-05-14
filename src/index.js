import BarChart from "./bars/index";
import LineChart from "./line/index";

const returnLibrary = () => {
  return {
    BarChart: BarChart,
    LineChart: LineChart,
  };
};

export default returnLibrary();
