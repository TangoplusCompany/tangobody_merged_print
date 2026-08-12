import FootPrintIcon from "./FootPrintIcon";
import type { GaitContainerProps } from "./GaitApp";
import GaitGaugeChart from "./GuageChart";

export default function GaitBalance({data}: GaitContainerProps) {
  
  return (
    <div className="flex flex-col h-fit border border-sub-200 rounded-[6px] p-2 gap-2">

      <div className="flex items-center gap-2 ">
        <div className="bg-accent w-3 h-3 rounded-[4px]"/>
        <div className="text-accent text-sm font-bold ">
          02 보행 밸런스 및 보행 주기 균형
        </div>
      </div>


      <div className="grid grid-cols-2 ">
        <div className="flex flex-col">
          
          <div className="text-sub-800 text-xs font-bold text-start">
            보행 시 좌우 지지 비율
          </div>

          <div className="flex flex-1 w-full justify-center mt-6">
            <GaitGaugeChart
              left={{
                label: "왼발",
                percent: data.avgLeftSingleSupportRatio,
                time: `${data.avgDoubleSupportTime.toFixed(1)}초`,
                color: { id: "leftGrad", start: "#5B93FF00", end: "#5B93FF" },
              }}
              both={{
                label: "양발 지지",
                percent: data.avgDoubleSupportRatio,
                time: `${data.avgLeftSingleSupportTime.toFixed(1)}초`,
                color: { id: "bothGrad", start: "#7E7E7E00", end: "#7E7E7E" },
              }}
              right={{
                label: "오른발 지지",
                percent: data.avgRightSingleSupportRatio,
                time: `${data.avgRightSingleSupportTime.toFixed(1)}초`,
                color: { id: "rightGrad", start: "#49D68F00", end: "#49D68F" },
              }}
            />
          </div>

          <div className="flex text-sub-700 text-xs mx-1 print:text-[10px] text-start">
            {data.resultDoubleSupportRiskDescription}
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="text-start text-sub-800 text-xs font-bold ">
              보행 주기 균형
            </div>
          
          <div className="grid grid-cols-[25%_37.5%_37.5%] items-center text-xs text-sub-300 font-semibold">
            <span></span>
            <span>입각기</span>
            <span>유각기</span>
          </div>
          

          <div className="flex flex-col gap-1">
            {/* ⬆️ 양발  |  ⬇️ 왼발 오른발 */}
            <div className="flex flex-col mt-1">
              <div className="grid grid-cols-[25%_75%] w-full rounded-[6px]">
                <div className="flex gap-1 border border-sub-200 rounded-[6px] items-center p-1 mr-1">
                  <div className="flex flex-col  text-sub-700 text-xs font-semibold">
                    <span>L</span>
                    <span className="opacity-10">R</span>
                  </div>
                  <FootPrintIcon leftStartColor="#454545" leftEndColor="#454545" />
                </div>

                <div className="flex w-full rounded-[6px] overflow-hidden bg-sub-100 border border-sub-200 items-center justify-between">
                  <div 
                    className="h-full bg-gradient-to-r from-accent/90 to-accent/30 rounded-[6px] flex items-center justify-between px-1 text-white font-bold"
                    style={{ width: `${data.avgLeftStanceRatio}%` }}
                  >

                    <span className="bg-sub-100/20 text-white mx-auto px-1.5 rounded-full text-[10px] ">{data.avgLeftStanceRatio.toFixed(1)}%</span>
                  </div>
                  <div className="flex-1 flex items-center justify-between px-4 text-sub-700 font-bold">
                    <span className="bg-sub-100/20 px-1.5 py-1 rounded-full text-[10px]">{data.avgLeftSwingRatio.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="grid grid-cols-[25%_75%] w-full rounded-[6px]">
                <div className="flex gap-1 border border-sub-200 rounded-[6px] items-center p-1 mr-1">
                  <div className="flex flex-col  text-sub-700 text-xs font-semibold">
                    <span className="opacity-10">L</span>
                    <span >R</span>
                  </div>
                  <FootPrintIcon rightStartColor="#454545" rightEndColor="#454545" />
                </div>

                <div className="flex w-full rounded-[6px] overflow-hidden bg-sub-100 border border-sub-200 items-center justify-between">
                  <div 
                    className="h-full bg-gradient-to-r from-greenn-500/90 to-greenn-500/30 rounded-[6px] flex items-center justify-between px-1 text-white font-bold shrink-0"
                    style={{ width: `${data.avgLeftStanceRatio}%` }}
                  >
                    <span className="bg-sub-100/20 text-white mx-auto px-1.5 rounded-full text-[10px]">{data.avgRightStanceRatio.toFixed(1)}%</span>
                  </div>
                  <div className="flex-1 flex items-center justify-between px-4 text-sub-700 font-bold">
                    <span className="bg-sub-100/20 px-1.5 py-1 rounded-full text-[10px]">{data.avgRightSwingRatio.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="grid grid-cols-[25%_75%] w-full rounded-[6px]">
                <div className="flex gap-1 border border-sub-200 rounded-[6px] items-center p-1 mr-1">
                  <div className="flex flex-col  text-sub-700 text-xs font-semibold">
                    <span>L</span>
                    <span>R</span>
                  </div>
                  <FootPrintIcon leftStartColor="#454545" leftEndColor="#454545" rightStartColor="#454545" rightEndColor="#454545" />
                </div>

                <div className="flex w-full rounded-[6px] overflow-hidden bg-sub-100 border border-sub-200 items-center justify-between">
                  <div 
                    className="h-full bg-gradient-to-r from-sub-800/90 to-sub-800/30 rounded-[6px] flex items-center justify-between px-1 text-white font-bold shrink-0"
                    style={{ width: `${data.avgLeftStanceRatio}%` }}
                  >
                    <span className="bg-sub-100/20 text-white mx-auto px-1.5 rounded-full text-[10px]">{data.avgStancePhaseRatio.toFixed(1)}%</span>
                  </div>
                  <div className="flex-1 flex items-center justify-between px-4 text-sub-700 font-bold">
                    <span className="bg-sub-100/20 px-1.5 py-1 rounded-full text-[10px]">{data.avgSwingPhaseRatio.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
          <div className="text-sub-700 text-xs print:text-[10px] text-start mx-1">
            {data.resultSingleRiskSupportDescription}
          </div>
        </div>

      </div>
    </div>
  )
}