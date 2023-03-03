import { AssetType } from "@/common/consts";

interface IconProps {
  type: string;
  fill: string;
}

export const AssetIcon = ({ type, fill }: IconProps): JSX.Element => {
  return (
    <>
      {type === AssetType.Machine ? (
        <svg style={{ fill: fill }} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
          <path d="M10.05 42q-2.5 0-4.25-1.75T4.05 36q0-2.5 1.75-4.25T10.05 30h28q2.5 0 4.25 1.75T44.05 36q0 2.5-1.75 4.25T38.05 42Zm0-3h28q1.3 0 2.15-.875.85-.875.85-2.125 0-1.3-.85-2.15-.85-.85-2.15-.85h-28q-1.25 0-2.125.85T7.05 36q0 1.25.875 2.125T10.05 39Zm9.5-13q-.65 0-1.075-.425-.425-.425-.425-1.075v-17q0-.65.425-1.075Q18.9 6 19.55 6h17q.65 0 1.075.425.425.425.425 1.075v17q0 .65-.425 1.075Q37.2 26 36.55 26Zm1.5-3h14V9h-14Zm-17.1-1.5v-3H15v3Zm20.05-6h8.1v-3H24Zm-15.95 0h7.35v-3H8.05Zm13 7.5V9v14Z" />
        </svg>
      ) : null}
    </>
  );
};
