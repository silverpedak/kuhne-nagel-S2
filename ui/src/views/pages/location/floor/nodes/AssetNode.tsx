import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Container } from "reactstrap";

import { ThemeColors } from "@/common/theme";
import { AssetState } from "@/common/consts";
import { AssetIcon } from "@/assets/icons/location-icons";
import { Asset } from "@/types/domain";

export type AssetNodeProps = NodeProps<Asset>;

const AssetNode = ({ data, isConnectable }: AssetNodeProps): JSX.Element => {
  const getBackgroundColor = (state: string) => {
    switch (state) {
      case AssetState.Error:
        return ThemeColors.theme.danger;
      default:
        return ThemeColors.theme.secondary;
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center"></div>
      <Container
        className="d-flex rounded p-1"
        style={{ background: getBackgroundColor(data.data?.state || AssetState.Normal) }}
      >
        <AssetIcon
          type={data.type}
          fill={
            data.data?.state === AssetState.Operational
              ? ThemeColors.theme.success
              : data.data?.state === AssetState.Warning
              ? ThemeColors.theme.warning
              : ""
          }
        />
      </Container>
      <div className="d-flex justify-content-center"></div>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} id="a" isConnectable={isConnectable} />
    </>
  );
};

AssetNode.displayName = "AssetNode";

export default memo(AssetNode);
