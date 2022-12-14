import { colors } from "../../constants/chartColor";

export const buildData = (options = [], value = []) => {
  return {
    labels: [...options],
    datasets: [
      {
        backgroundColor: colors,
        borderColor: "transparent",
        borderRadius: { topRight: 15, topLeft: 15 },
        data: [...value],
      },
    ],
  };
};
