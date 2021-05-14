# TCC Dataviz Framework

A data visualization React Library 

### Usage 

*Install:*

```
npm i datavis-library-tcc
```

*Setup:*

```
import { BarChart } from "datavis-library-tcc";

const dataset = Array.from({ length: 12 }, () =>
  Math.floor(Math.random() * 300)
);

const labels = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

const colors = ["#9bbfeb", "#e62e43", "#7be893"];

ReactDOM.render(
  <React.StrictMode>
    <BarChart size="500" data={dataset} labels={labels} colors={colors} />
  </React.StrictMode>,
  document.getElementById("root")
);

```

### Development

*Build:*

```
npm run build
```
