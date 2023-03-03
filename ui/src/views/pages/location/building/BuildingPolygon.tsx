import { useEffect, useState } from "react";
import { Polygon } from "react-leaflet";

import { AssetState, GREEN_LIGTH, RED_LIGHT, YELLOW_LIGHT } from "@/common/consts";
import { ThemeColors } from "@/common/theme";
import { Building } from "@/types/domain/building-model.type";

interface BuildingPolygonProps {
  building: Building;
  onBuildingClick: (arg1: number) => void;
}

export const BuildingPolygon = ({
  building,
  onBuildingClick,
}: BuildingPolygonProps): JSX.Element => {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    setColor(
      building.status === AssetState.Operational
        ? ThemeColors.theme.success
        : building.status === AssetState.Warning
        ? ThemeColors.theme.orange
        : building.status === AssetState.Error
        ? ThemeColors.theme.danger
        : ""
    );
  }, [building]);

  return (
    <Polygon
      className="building-polygon"
      stroke
      pathOptions={{
        color: color,
      }}
      positions={building.latLng.positions}
      eventHandlers={{
        click: () => onBuildingClick(building.id),
        mouseover: () => {
          setColor(
            building.status === AssetState.Error
              ? RED_LIGHT
              : building.status === AssetState.Warning
              ? YELLOW_LIGHT
              : building.status === AssetState.Operational
              ? GREEN_LIGTH
              : ThemeColors.transparent
          );
        },
        mouseout: () => {
          setColor(
            building.status === AssetState.Error
              ? ThemeColors.theme.danger
              : building.status === AssetState.Warning
              ? ThemeColors.theme.orange
              : building.status === AssetState.Operational
              ? ThemeColors.theme.success
              : ThemeColors.transparent
          );
        },
      }}
    />
  );
};
