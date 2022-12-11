// ** Styles
import { useSkin } from "@hooks/useSkin";
import "@styles/base/pages/page-misc.scss";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import ChartjsBarChart from "../../components/chart-js/ChartjsBarChart";
import { SLIDE_TYPE } from "../../constants/slide";

// const data = {
//   code: "",
//   type: SLIDE_TYPE.MUL_CHOICES,
//   title: "TITLE",
//   options: [
//     {
//       name: "",
//       value: 0,
//     },
//     {
//       name: "",
//       value: 0,
//     },
//   ],
// };

const SlideView = ({ title, chartData }) => {
  const { skin } = useSkin();
  const labelColor = skin === "dark" ? "#b4b7bd" : "#6e6b7b";

  return (
    <Card style={{ border: "1px solid black", marginBottom: 0 }}>
      <CardHeader className="justify-content-center">
        <CardTitle tag={"h2"}>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <ChartjsBarChart
          success={"#28dac6"}
          labelColor={labelColor}
          gridLineColor={"rgba(200, 200, 200, 0.2)"}
          chartData={chartData}
        />
      </CardBody>
    </Card>
  );
};
export default SlideView;
