// ** Third Party Components

// ** Styles
import "@styles/base/pages/page-misc.scss";
import { useState } from "react";
import { buildData } from "../../utility/chartData/barChartData";
import SlideView from "../createSlide/SlideView";

const Presentation = () => {
  const [values, setValues] = useState([1, 3, 2]);

  return (
    <div className="container-lg d-flex align-items-center h-100">
      <div className="w-100">
        <SlideView
          title={"currentSlide.detail.title"}
          chartData={buildData(["aaa", "bbb", "ccc"], values)}
          setValues={setValues}
        />
      </div>
    </div>
  );
};
export default Presentation;
