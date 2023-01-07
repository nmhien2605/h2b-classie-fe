// ** Styles
import { useSkin } from "@hooks/useSkin";
import "@styles/base/pages/page-misc.scss";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import ChartjsBarChart from "../../components/chart-js/ChartjsBarChart";

const SlideView = ({ extraTitle, title, chartData }) => {
  const { skin } = useSkin();
  const labelColor = skin === "dark" ? "#b4b7bd" : "#6e6b7b";

  return (
    <Card style={{ border: "1px solid black", marginBottom: 0 }}>
      <CardHeader className="justify-content-center">
        <CardTitle tag={"h2"}>
          {extraTitle} <br /> {title}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <ChartjsBarChart
          success={"#28dac6"}
          labelColor={labelColor}
          gridLineColor={"rgba(200, 200, 200, 0.2)"}
          chartData={chartData}
          // setValues={setValues}
        />
      </CardBody>
    </Card>
  );
};
export default SlideView;
