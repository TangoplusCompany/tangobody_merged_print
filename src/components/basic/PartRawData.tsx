import { useTranslation } from "react-i18next";
import type { IBasicCards, IBasicCardUnit, IBasicInfo, IReportDetail } from "../../types/basic";
import { getRiskString } from "../../utils/getRiskString";

interface PartRawDataProps {
  data: keyof IBasicCards;   // "neck", "shoulder" 등
  rawData: IBasicCards;      // 전체 데이터 객체
  summaryData: IReportDetail;
}


export function PartRawData({ data, rawData, summaryData }: PartRawDataProps) {
  const {t, i18n} = useTranslation();
  const locale = i18n.language;
  function getRiskBgColor(riskLevel: number): string {
    const colorMap: Record<number, string> = {
      0: "bg-sub-100 text-sub-200", // 정상 혹은 낮은 단계
      1: "bg-orangee-600 text-orangee-600",   // 주의 단계
      2: "bg-redd-600 text-redd-600",   // 위험 단계
    };

    // 매핑된 값이 없으면 기본값으로 "text-sub-800"을 반환합니다.
    return colorMap[riskLevel] ?? "bg-sub-100 text-sub-200";
  }

  function getArrowColor(riskLevel: number): string {
    const colorMap: Record<number, string> = {
      0: "text-sub-200", // 정상 혹은 낮은 단계
      1: "text-orangee-800",   // 주의 단계
      2: "text-redd-800",   // 위험 단계
    };

    // 매핑된 값이 없으면 기본값으로 "text-sub-800"을 반환합니다.
    return colorMap[riskLevel] ?? "text-sub-800";
  }

  const riskKey = `risk_level_${data}` as keyof IBasicInfo;
  const rangeKey = `range_level_${data}` as keyof IBasicInfo;
  const currentRiskLevel = summaryData.result_summary_data[riskKey] as number;
  const currentRangeLevel = summaryData.result_summary_data[rangeKey] as number;
  const bgCondition = {
    0: "bg-sub-600",
    1: "bg-orangee-600",
    2: "bg-redd-600",
  }[currentRiskLevel] ?? "bg-sub-200";
  const riskString = getRiskString(currentRiskLevel, locale);



  const titleMap: Record<keyof IBasicCards, string> = {
    neck: "basic_neck",
    shoulder: "basic_shoulder",
    elbow: "basic_elbow",
    hip: "basic_pelvis",
    knee: "basic_knee",
    ankle: "basic_ankle"
  };

  const detailTitleMap: Record<string, string> = {
    turtle_neck: "basic_turtle_neck",
    scoliosis: "basic_scoliosis",
    side_neck_balance: "basic_side_neck_balance",
    shoulder_tilit: "basic_shoulder_tilit",
    frozen_shoulder: "basic_frozen_shoulder",
    shoulder_impingement: "basic_shoulder_impingement",
    bicep_tension: "basic_bicep_tension",
    elbow_disorder: "basic_elbow_disorder",
    elbow_muscle_tension: "basic_elbow_muscle_tension",
    hip_tilit: "basic_hip_tilit",
    hip_disorder: "basic_hip_disorder",
    hip_knee_tilit: "basic_hip_knee_tilit",
    knee_angle: "basic_knee_angle",
    knee_disorder: "basic_knee_disorder",
    hip_knee_ankle_tilit: "basic_hip_knee_ankle_tilit",
    ankle_angle: "basic_ankle_angle",
    left_right_balance: "basic_left_right_balance",
    uppper_lower_balance: "basic_uppper_lower_balance",
  };

  const title: string = titleMap[data] || "알 수 없음";

  const targetSection = rawData[data]; 

  const detailKeys = Object.keys(targetSection);

  return (
    <div className="grid grid-cols-[1fr_3fr] border-b border-sub-200 last:border-b-0 w-full h-full">
      <div className={`bg-sub-100 font-bold p-2 flex items-center justify-center print:text-[12px] `}>
        <div className="flex flex-col">
          {t(title)} 
          <span className={`${bgCondition} text-white text-[9px] font-bold px-2 py-0.5 print:py-0 rounded-full shrink-0 mt-1 print:text-[8px] `}>
            {riskString} {currentRangeLevel}{t('basic_level')}
          </span>
        </div>
      </div>

      <div className="grid grid-rows-3 h-full">
        {detailKeys.map((rawKey) => {
          const detailTitle = detailTitleMap[rawKey] || rawKey;
          const unitData = targetSection[rawKey as keyof typeof targetSection] as IBasicCardUnit | undefined;
          const riskLevel = unitData?.risk_level ?? 0;
          const rangeLevel = unitData?.range_level ?? 0;
          const styleClass = getRiskBgColor(riskLevel);
          const arrowClass = getArrowColor(riskLevel);
          return (
            <div key={rawKey} className="h-full grid grid-cols-[30%_70%] border-b last:border-b-0 items-center">
              <span className="text-sub-800 text-[9px] print:text-[8px] leading-none items-center flex justify-center text-center print:p-0">
                {t(detailTitle)}
              </span>

              <div className="grid grid-rows-2 w-full h-full text-center text-[8px] font-bold leading-none">
                {/* 1층: 상단 바 및 화살표 영역 */}
                <div className="grid grid-cols-3">
                  {[0, 1, 2].map((idx) => {
                    const defaultBgMap: Record<number, string> = {
                      0: "bg-sub-100",
                      1: "bg-sub-150",
                      2: "bg-sub-200",
                    };

                    // 현재 인덱스가 riskLevel과 같으면 활성화 색상, 다르면 지정된 기본 배경색 사용
                    const currentBg = riskLevel === idx 
                      ? styleClass.split(" ")[0] 
                      : (defaultBgMap[idx] ?? "bg-sub-600");

                    return (
                      <div
                        key={idx}
                        className={`flex flex-col items-center justify-center relative ${currentBg}`}
                      >
                        {/* 현재 riskLevel 위치에만 역삼각형 화살표 표시 */}
                        {riskLevel === idx && (
                          <span className={`text-[12px] print:text-[10px]  leading-none absolute top-0.5 ${arrowClass}`}>▼</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* 2층: 단계 텍스트 영역 */}
                <div className="grid grid-cols-3 h-full items-center">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="flex justify-center items-center">
                      {/* 현재 riskLevel 위치에만 X단계 텍스트 표시 */}
                      {riskLevel === idx && (
                        <span className={`${styleClass.split(" ")[1]}`}>
                          {rangeLevel}{t('basic_level')}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}