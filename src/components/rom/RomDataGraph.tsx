import { Area, AreaChart, CartesianGrid, YAxis } from "recharts";
import { ChartContainer } from "../ui/chart";
import type { IRomCard } from "../../types/rom";

export interface RawDataGraphProps {
  graphType: 0 | 1;
  data: number[];
  maxMinValue?: IRomCard;
}

export const RomDataGraph = ({
  graphType,
  data, 
  maxMinValue
}: RawDataGraphProps) => {
  const chartData = data.map((value, index) => ({
    frame: index,
    value: value
  }));
  const maxValue = (graphType === 0 ? maxMinValue?.value_1_max : maxMinValue?.value_2_max) ?? 0
  const minValue = (graphType === 0 ? maxMinValue?.value_1_min : maxMinValue?.value_2_min) ?? 0

  return (
    <div className="flex h-full flex-col rounded-lg border border-sub-100 overflow-hidden bg-white">
      {/* 1. 상단 헤더: shrink-0으로 높이 고정 */}
      <div className="flex justify-between shrink-0 p-0">
        <span className="text-[10px] font-semibold bg-accent text-white rounded-tl-[4px] rounded-br-[4px] px-2">
          {graphType === 0 ? '각도 변화' : '각속도 변화'}
        </span>

        <div className="flex text-[10px] gap-2 text-sub-700 text-end leading-tight pr-2 pt-1">
          <div>{graphType === 0 ? '최대' : '최대'}: {Math.abs(maxValue).toFixed(1)}°</div>
          <div>{graphType === 0 ? '최소' : '최소'}: {Math.abs(minValue).toFixed(1)}°</div>
        </div>
      </div>

      {/* 2. 차트 영역: min-h-0으로 부모 밖 유출 방지 및 수직 중앙 정렬 */}
      <div className="flex-1 flex items-center justify-center w-full min-h-0 overflow-hidden px-1"> 
        <ChartContainer
          config={{
            value: {
              label: graphType === 0 ? "각도" : "각속도",
              color: "#2660E9",
            },
          }}
          
          className="w-full h-[56px]" 
        >
          
          <AreaChart 
            data={chartData} 
            margin={{ top: 5, right: 5, left: 5, bottom: 10 }}
          >
            <defs>
              <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2660E9" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#f1f5f9" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            
            <YAxis hide domain={[0, 'dataMax + 10']} />

            <Area
              dataKey="value"
              type="monotone"
              fill="url(#fillGradient)"
              stroke="#2660E9"
              strokeWidth={1}
              isAnimationActive={false}
            />
            
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default RomDataGraph