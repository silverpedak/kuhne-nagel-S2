import { VectorMap } from "react-jvectormap";

import { ThemeColors } from "@/common/theme";

import gdpData from "./gdpData.json";

import "./jvector.css";

export const DemoJVectorMapPanel = (): JSX.Element => {
  return (
    <div>
      <VectorMap
        map={"world_mill"}
        backgroundColor="transparent"
        containerStyle={{
          width: "100%",
          height: "500px",
        }}
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
          },
          hover: {
            "fill-opacity": 0.8,
          },
        }}
        series={{
          regions: [
            {
              values: gdpData,
              scale: [ThemeColors.theme.primary, ThemeColors.theme.info],
              normalizeFunction: "polynomial",
            },
          ],
        }}
      />
    </div>
  );
};
