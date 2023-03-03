import { AssetState } from "@/common/consts";
import { ThemeColors } from "@/common/theme";

export const BuildingLegend = () => {
  return (
    <div className="legend-container">
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: ThemeColors.theme.success }} />
        <p>{AssetState.Operational.charAt(0) + AssetState.Operational.slice(1).toLowerCase()}</p>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: ThemeColors.theme.warning }} />
        <p>{AssetState.Warning.charAt(0) + AssetState.Warning.slice(1).toLowerCase()}</p>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: ThemeColors.theme.danger }} />
        <p>{AssetState.Error.charAt(0) + AssetState.Error.slice(1).toLowerCase()}</p>
      </div>
    </div>
  );
};
