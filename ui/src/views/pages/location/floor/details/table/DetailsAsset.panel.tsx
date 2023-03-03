import { Container, Table } from "reactstrap";

import { Asset, AssetData } from "@/types/domain";
import { useEffect, useState } from "react";

interface AssetTablePanelProps {
  asset: Asset;
}

export const DetailsAssetPanel = ({ asset }: AssetTablePanelProps) => {
  const [data, setData] = useState<AssetData>({});

  useEffect(() => {
    if (asset.data) {
      setData(asset.data);
    }
  }, [asset]);

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Table className="w-50">
          <tbody>
            <tr>
              <td>Temperature</td>
              <td>{data.temperature ? `${data.temperature}°` : "-"}</td>
            </tr>
            <tr>
              <td>State</td>
              <td>{data.state ? `${data.state}°` : "-"}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{data.status ? `${data.status}°` : "-"}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};
