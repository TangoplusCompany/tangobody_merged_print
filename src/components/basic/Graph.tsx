
import type { IBasicCards, IBasicHistoryUnit, IReportDetail } from "../../types/basic";
import { getRangeCircle } from "../../utils/getRiskString";
import qr_my_tangobody from "../../assets/qr_my_tangobody.png"

export function Graph({ data }: { data: IReportDetail }) {
  function getBgColor(riskLevel: number): string {
    const colorMap: Record<number, string> = {
      0: "bg-sub-100 text-sub-200", // 정상 혹은 낮은 단계
      1: "bg-orangee-400 text-orangee-800",   // 주의 단계
      2: "bg-redd-400 text-redd-800",   // 위험 단계
    };

    // 매핑된 값이 없으면 기본값으로 "text-sub-800"을 반환합니다.
    return colorMap[riskLevel] ?? "text-sub-800";
  }

  const bodyParts: { key: keyof IBasicCards; label: string }[] = [
    { key: "neck", label: "목" },
    { key: "shoulder", label: "어깨" },
    { key: "elbow", label: "팔꿈치" },
    { key: "hip", label: "골반" },
    { key: "knee", label: "무릎" },
    { key: "ankle", label: "발목" },
  ];

  const historyList = [...(data.result_history_data?.history_data || [])]
    .reverse()
    .slice(0, 10);

  const gridSlots = Array.from({ length: 10 });

  const bodyBalance = 'UNKNOWN'
  const currentImg =  qr_my_tangobody;
  return (
    <div className="grid grid-cols-[2.5fr_1.5fr] rounded-xl border border-sub-200 overflow-hidden bg-white text-[13px] text-sub-800 mt-2">
      {/* 왼쪽 측정 이력 */}
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-[1fr_4fr] items-center border-b border-sub-200">
          <div className="h-8 print:h-6 font-bold flex items-center bg-sub-200 justify-center text-sub-800 text-[12px] print:text-[10px] border-r border-sub-200">
            측정 이력
          </div>
          <div className="grid grid-cols-10 h-8 print:h-6 items-center text-center text-[8px] text-gray-500 bg-sub-100">
            {gridSlots.map((_, idx) => {
              const history = historyList[idx];
              return (
                <div key={idx} className="px-1 text-[9px] print:text-[8px] leading-tight text-center">
                  {history ? (() => {
                    const dateParts = history.measure_date.split('-'); 
                    if (dateParts.length < 3) return history.measure_date;

                    const year = dateParts[0];
                    const month = dateParts[1];
                    const day = dateParts[2].slice(0, 2);

                    return (
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-sub-600 text-[7px]">{year}</span>
                        <span className="font-bold text-sub-800 text-[8px]">{month}.{day}</span>
                      </div>
                    );
                  })() : ""}
                </div>
              );
            })}
          </div>
        </div>

        {/* ----------------- 하단 6행: 부위별 데이터 행 ----------------- */}
        <div className="flex flex-col h-full">
          {bodyParts.map(({ key, label }) => (
            // 💡 1. 여기에 border-b와 last:border-b-0을 몰아줍니다. 이제 진짜 '발목' 행에서만 선이 지워집니다.
            <div key={key} className="h-full grid grid-cols-[1fr_4fr] items-center border-b last:border-b-0 border-sub-200">
              
              {/* 좌측 부위 명칭 */}
              {/* 💡 2. 내부의 border-b와 last:border-b-0은 완전히 제거합니다. */}
              <div className="flex items-center h-full justify-center text-sub-600 text-[11px] print:text-[9px] border-r border-sub-200 font-bold">
                {label}
              </div>
              
              {/* 우측 부위별 10개 데이터 그리드 */}
              {/* 💡 3. 여기도 마찬가지로 내부의 border-b와 last:border-b-0을 제거합니다. */}
              <div className="grid grid-cols-10 h-full items-center text-center">
                {gridSlots.map((_, idx) => {
                  const history = historyList[idx];
                  
                  const riskKey = `risk_level_${key}` as keyof IBasicHistoryUnit;
                  const rangeKey = `range_level_${key}` as keyof IBasicHistoryUnit;

                  const currentRiskLevel = (history?.[riskKey] as number) ?? 0;
                  const currentRangeLevel = (history?.[rangeKey] as number) ?? 0;

                  const bgColor = getBgColor(currentRiskLevel); 
                  const rangeCircle = getRangeCircle(currentRangeLevel);
                  
                  return (
                    <div key={idx} className="flex justify-center items-center h-full leading-none pt-0.5 pb-0.5 first:pt-1 first:pb-0.5 last:pt-0.5 last:pb-1 border-r last:border-r-0 border-sub-100">
                      {history ? (
                        <div className={`w-full h-full font-bold flex items-center mx-1 rounded-[4px] text-center justify-center ${bgColor} text-[14px]`}>
                          {rangeCircle} 
                        </div>
                      ) : (
                        <div className="leading-none"/>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*  체형 유형 분석 */}
      <div className="flex flex-col w-full h-full">
        <div className="h-10 print:h-8 font-bold flex items-center bg-sub-200 justify-center text-sub-800 text-[12px] print:text-[10px] border-r border-sub-200">
          더 많은 결과 확인하기
        </div>
        <div className="flex gap-1 h-full w-full items-center px-2">
          <img 
            src={currentImg} 
            alt={bodyBalance} 
            className="w-40 h-40 print:w-28 print:h-28 bg-sub-200 rounded-[8px]"
          />
          <div className="flex items-center  text-sub-800 text-base print:text-xs pr-1 text-start leading-tight">
            QR코드를 스캔 해보세요.<br/>지난 검사 기록들을 확인하고 비교해볼 수 있습니다.
          </div>
        </div>
      </div>

    </div>
  );
}