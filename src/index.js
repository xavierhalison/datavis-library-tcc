import BarChart from "./bars/index";
import LineChart from "./line/index";
import PieChart from "./pie/index";

const returnLibrary = () => {
  return {
    BarChart: BarChart,
    LineChart: LineChart,
    PieChart: PieChart,
  };
};

export default returnLibrary();
