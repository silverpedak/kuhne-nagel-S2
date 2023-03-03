import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";

interface ChangeCenterProps {
  center: LatLngExpression;
  zoom: number;
}

export const ChangeCenter = ({ center, zoom }: ChangeCenterProps) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};
