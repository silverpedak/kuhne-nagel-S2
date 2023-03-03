import { Progress } from "reactstrap";

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps): JSX.Element => {
  const value = (current / total) * 100;
  const color = value > 50 ? "success" : value > 30 ? "warning" : "danger";
  return (
    <>
      <Progress className="m-0" color={color} value={value} style={{ height: "24px" }}>
        {`${current}/${total}`}
      </Progress>
    </>
  );
};
