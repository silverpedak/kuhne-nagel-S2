import { useMap } from "react-leaflet";

interface ResizeMapProps {
  mapId: string;
}

//This makes React-leaflet work with reactstrap tabs.
export const ResizeMap = ({ mapId }: ResizeMapProps) => {
  const map = useMap();
  const resizeObserver = new ResizeObserver(() => {
    map.invalidateSize();
  });
  const container = document.getElementById(mapId);
  resizeObserver.observe(container!);

  return null;
};
