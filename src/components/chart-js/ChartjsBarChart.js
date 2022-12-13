// ** Third Party Components
import { Bar } from "react-chartjs-2";

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";

const ChartjsBarChart = ({
  gridLineColor,
  labelColor,
  chartData,
  setValues = () => {},
}) => {
  // ** Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor,
        },
        ticks: { color: labelColor },
      },
      y: {
        display: false,
      },
    },
    onClick: (event, clickedEles) => {
      const idx = clickedEles[0]?.index;

      const newValues = [...chartData?.datasets[0]?.data];
      newValues[idx] = newValues[idx] + 1;
      setValues([...newValues]);
    },
    plugins: {
      legend: { display: false },
    },
  };

  // ** Chart data
  // const data = {
  //   labels: ["7/12", "8/12", "9/12", "10/12"],
  //   datasets: [
  //     {
  //       // maxBarThickness: 15,
  //       backgroundColor: ["#bb2"],
  //       borderColor: "transparent",
  //       borderRadius: { topRight: 15, topLeft: 15 },
  //       data: [275, 90, 190, 205],
  //     },
  //   ],
  // };

  return (
    <Card>
      <CardBody>
        <div style={{ height: "500px" }}>
          <Bar data={chartData} options={options} height={500} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ChartjsBarChart;
