import type { IRomDetail } from "../../types/rom";
import UnitCard from "./UnitCard";


export interface IUnitCardContainerProps {
  left: IRomDetail
  right: IRomDetail | undefined
}

export default function UnitCardContainer({
  left,
  right
}: IUnitCardContainerProps) {

  return (
    <div className="w-full h-full  grid grid-cols-2 gap-4">
      <div className="">
        <UnitCard data={left}  />
      </div>
      
      <div className="">
        {right && (
          <UnitCard data={right}  />
        )}
      </div>
    </div>
  );
};