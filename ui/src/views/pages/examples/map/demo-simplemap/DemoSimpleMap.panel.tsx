import { scaleLinear } from "d3-scale";
import { memo } from "react";
import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";

import { ThemeColors } from "@/common/theme";

const colorScale = scaleLinear<string>()
  .domain([0, 100])
  .range([ThemeColors.theme.primary, ThemeColors.theme.info]);

export const DemoSimpleMapPanel = (props: {
  setTooltipContent: (arg0: string) => void;
}): JSX.Element => {
  return (
    <div data-tip="">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
          rotate: [0, 0, 0],
          center: [0, 50],
        }}
      >
        <ZoomableGroup>
          <Geographies geography="/data/countries.json">
            {({ geographies }) =>
              geographies.map((geo, i) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(i)}
                  onMouseEnter={() => {
                    props.setTooltipContent(`${geo.properties.name}`);
                  }}
                  onMouseLeave={() => {
                    props.setTooltipContent("");
                  }}
                  style={{
                    hover: {
                      fill: "#556B2F",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};
export default memo(DemoSimpleMapPanel);
