import type { IBasicInfo, IReportDetail } from "../../types/basic";
import { getRiskString } from "../../utils/getRiskString";
import { preprocessTrajectoryImage, removeBlackBackground } from "../../utils/removeBlackBackground";
import body from "../../assets/img_body.png";
import { useEffect, useState } from "react";

export function BodyUpperLower({data}: {data: IReportDetail}) {


  const staticUrl = `${data.static_mat_data.measure_server_mat_image_name}`;
  const dynamicUrl = `${data.dynamic_mat_data.mat_hip_down_image_name}`;
  const hipDownUrl = `${data.dynamic_mat_data.mat_hip_trajectory_image_name}`;
  const leftKneeUrl = `${data.dynamic_mat_data.mat_left_knee_trajectory_image_name}`;
  const rightKneeUrl = `${data.dynamic_mat_data.mat_right_knee_trajectory_image_name}`;
  const riskUpperString = getRiskString(data.result_summary_data.risk_upper_risk_level);
  const riskLowerString = getRiskString(data.result_summary_data.risk_lower_risk_level);
  const [staticSrc, setstaticSrc] = useState<string>("");
  const [dynamicSrc, setdynamicSrc] = useState<string>("");
  const [hipDownSrc, sethipDownSrc] = useState<string>("");
  const [leftKneeSrc, setleftKneeSrc] = useState<string>("");
  const [rightKneeSrc, setrightKneeSrc] = useState<string>("");
  useEffect(() => {
    removeBlackBackground(staticUrl)
      .then((result) => {
        setstaticSrc(result);
      })
      .catch(() => {
        setstaticSrc("");
      });

      removeBlackBackground(dynamicUrl)
      .then((result) => {
        setdynamicSrc(result);
      })
      .catch(() => {
        setdynamicSrc("");
      });

      preprocessTrajectoryImage(hipDownUrl)
      .then((result) => {
        sethipDownSrc(result);
      })
      .catch(() => {
        sethipDownSrc("");
      });

      preprocessTrajectoryImage(leftKneeUrl)
      .then((result) => {
        setleftKneeSrc(result);
      })
      .catch(() => {
        setleftKneeSrc("");
      });

      preprocessTrajectoryImage(rightKneeUrl)
      .then((result) => {
        setrightKneeSrc(result);
      })
      .catch(() => {
        setrightKneeSrc("");
      });
  }, [dynamicSrc, dynamicUrl, hipDownSrc, hipDownUrl, leftKneeSrc, leftKneeUrl, rightKneeSrc, rightKneeUrl, staticUrl]);

  const bgUpperCondition = {
      0: "bg-sub-200",
      1: "bg-orangee-600",
      2: "bg-redd-600",
    }[data.result_summary_data.risk_upper_risk_level] ?? "bg-sub-200";
  const textUpperCondition = {
    0: "text-sub-800",
    1: "text-white",
    2: "text-white",
  }[data.result_summary_data.risk_upper_risk_level] ?? "text-sub-800";

  const bgLowerCondition = {
      0: "bg-sub-200",
      1: "bg-orangee-600",
      2: "bg-redd-600",
    }[data.result_summary_data.risk_lower_risk_level] ?? "bg-sub-200";
  const textLowerCondition = {
    0: "text-sub-800",
    1: "text-white",
    2: "text-white",
  }[data.result_summary_data.risk_lower_risk_level] ?? "text-sub-800";


  const jointPositions: Record<string, { top: string; left: string }> = {
    neck: { top: "15%", left: "50%" },
    shoulder_left: { top: "24%", left: "30%" },
    shoulder_right: { top: "24%", left: "70%" },
    elbow_left: { top: "38%", left: "27%" },
    elbow_right: { top: "38%", left: "73%" },
    hip_left: { top: "50%", left: "41%" },
    hip_right: { top: "50%", left: "59%" },
    knee_left: { top: "70%", left: "38%" },
    knee_right: { top: "70%", left: "62%" },
    ankle_left: { top: "89%", left: "39%" },
    ankle_right: { top: "89%", left: "61%" },
  };

  // 💡 2. 렌더링할 부위 리스트 정의 (IBasicInfo의 키값과 매칭)
  const jointsToRender: (keyof IBasicInfo)[] = [
    "risk_neck", "risk_shoulder_left", "risk_shoulder_right",
    "risk_elbow_left", "risk_elbow_right", "risk_wrist_left", "risk_wrist_right",
    "risk_hip_left", "risk_hip_right", "risk_knee_left", "risk_knee_right",
    "risk_ankle_left", "risk_ankle_right"
  ];
  const createRedCircleBitmap = (radius: number = 8, coreRadius:number, riskLevel: 0 | 1 | 2): string => {
    const level = Number(riskLevel);
    if (level === 0) return "";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const padding = 2;
    const size = radius * 2 + padding;
    canvas.width = size;
    canvas.height = size;

    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    const centerX = radius + padding / 2;
    const centerY = radius + padding / 2;

    const rValue = 255;
    const gValue = level === 1 ? 167 : 74;
    const bValue = level === 1 ? 58 : 74;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const index = (y * size + x) * 4;
        const distToCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

        data[index] = rValue;     
        data[index + 1] = gValue; 
        data[index + 2] = bValue; 

        if (distToCenter <= coreRadius) {
          data[index + 3] = 255; 
        } else if (distToCenter <= radius) {
          const opacity = 1 - (distToCenter - coreRadius) / (radius - coreRadius);
          data[index + 3] = opacity * 255;
        } else if (distToCenter < radius + 1) {
          const opacity = 1 - (distToCenter - radius);
          data[index + 3] = Math.max(0, opacity * 30); // 부드럽게 사라지도록 낮춤
        } else {
          data[index + 3] = 0; 
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
  };
  
  return (
    <div className="grid grid-rows-[60%_40%] rounded-xl border border-sub-200 overflow-hidden bg-white text-[13px] text-sub-800">
      {/* 상단 3단 그리드 영역 */}
      <div className="grid grid-cols-[1fr_1.5fr_1.5fr]">
        
        <div className="flex flex-col">
          <div className="h-10 print:h-8 bg-sub-200 py-2 items-center font-bold text-base print:text-[14px] leading-tight border-r border-white">
            주의 부위
          </div>
          <div className="py-4 px-2 flex flex-col items-center  h-full border-r border-sub-200">
            <div className="flex w-full justify-between text-[10px] px-2">
              <span className="bg-sub-200/80 px-2 py-0.5 print:py-0 rounded-full">좌측</span>
              <span className="bg-sub-200/80 px-2 py-0.5 print:py-0 rounded-full">우측</span>
            </div>
            <div className="relative flex justify-center items-center ">
              {/* 베이스 인체 더미 이미지 */}
              <img src={body} alt="인체 더미" className="w-34 print:w-28" />

                {/* 💡 직접 그린 비트맵 동적 렌더링 */}
                {jointsToRender.map((jointKey) => {
                  const riskMent = data.result_summary_data[jointKey];
                  // 값이 없거나 공백이면 렌더링하지 않음
                  if (!riskMent ) return null;

                  const positionKey = jointKey.replace("risk_", "");
                  const pos = jointPositions[positionKey as keyof typeof jointPositions];
                  if (!pos) return null;

                  const currentRadius = 10; // 💡 원하는 반지름 크기 설정
                  const padding = 2;
                  
                  // 비트맵 URL 생성 (0일 때는 "" 반환)
                  const circleBitmapUrl = createRedCircleBitmap(currentRadius, 2,riskMent as 0 | 1 | 2);

                  // 💡 핵심: 생성된 비트맵 URL이 빈 문자열("")이면 img 태그를 아예 그리지 않고 건너뜁니다.
                  if (!circleBitmapUrl) return null;

                  return (
                    <img
                      key={jointKey}
                      src={circleBitmapUrl}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 object-contain"
                      style={{ 
                        top: pos.top, 
                        left: pos.left,
                        width: `${currentRadius * 2 + padding}px`, 
                        height: `${currentRadius * 2 + padding}px` 
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </div>

        {/* 2. 상지 측정 요약 */}
        <div className="flex flex-col">
          {/* 헤더 */}
          <div className="h-10 print:h-8 bg-sub-200 py-2 px-4 flex justify-between items-center leading-tight border-r border-white">
            <span className="font-bold print:text-[14px]  mx-auto translate-x-6">상지 측정 요약</span>
            <span className={`${bgUpperCondition} ${textUpperCondition} text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0`}>
              {riskUpperString} {data.result_summary_data.risk_upper_range_level}단계
            </span>
          </div>
          {/* 콘텐츠 영역 */}
          <div className="p-4 text-start flex flex-col h-full overflow-y-auto border-r border-sub-200 whitespace-pre-line leading-tight ">
            {data.result_summary_data.risk_upper_ment ? (
              data.result_summary_data.risk_upper_ment
                .split(/(\[[^\]]+\])/g)
                .map((part, index) => {
                  
                  const trimmedPart = part.trim();
                  if (!trimmedPart) return null; 

                  if (trimmedPart.startsWith('[') && trimmedPart.endsWith(']')) {
                    return (
                      <span key={index} className="font-bold text-[9px] text-sub-800 block mt-3 first:mt-0">
                        {trimmedPart}
                      </span>
                    );
                  }
                  
                  // 본문 내용은 inline-block으로 설정하여 대괄호 바로 다음 줄에 1번만 줄바꿈되어 붙도록 유도
                  return (
                    <span className="text-sub-600 text-[9px] text-start block mt-0.5" key={index}>
                      {trimmedPart}
                    </span>
                  );
                })
            ) : (
              "측정 데이터가 없습니다."
            )}
          </div>
        </div>
              {/* h-10 print:h-8 bg-sub-200 py-2 items-center text-center font-bold text-base print:text-sm border-r border-white */}
        {/* 3. 하지 측정 요약 */}
        <div className="flex flex-col">
          {/* 헤더 */}
          <div className="h-10 print:h-8 bg-sub-200 py-2 px-4 flex justify-between items-center leading-tight ">
            <span className="font-bold print:text-[14px]  mx-auto translate-x-6">하지 측정 요약</span>
            <span className={`${bgLowerCondition} ${textLowerCondition} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0`}>
              {riskLowerString} {data.result_summary_data.risk_lower_range_level}단계
            </span>
          </div>
          <div className="p-4 text-start flex flex-col h-full overflow-y-auto whitespace-pre-line leading-tight ">
            {data.result_summary_data.risk_lower_ment ? (() => {
              const lines = data.result_summary_data.risk_lower_ment.split('\n');
              const processedLines: string[] = [];

              lines.forEach((line) => {
                const trimmed = line.trim();
                if (!trimmed) return;

                if (trimmed.startsWith('-') && processedLines.length > 0) {
                  processedLines[processedLines.length - 1] += ` ${trimmed}`;
                } else {
                  processedLines.push(trimmed);
                }
              });

              // 3. 가공된 배열을 가지고 화면에 렌더링합니다.
              return processedLines.map((line, index) => {
                if (line.startsWith('[') && line.endsWith(']')) {
                  return (
                    <span key={index} className="font-bold text-[9px] text-sub-800 block mt-3 first:mt-0">
                      {line}
                    </span>
                  );
                }
                return (
                  <span className="text-sub-600 text-[9px] text-start block mt-0.5 whitespace-pre-line" key={index}>
                    {line}
                  </span>
                );
              });
            })() : (
              "측정 데이터가 없습니다."
            )}
          </div>
        </div>

      </div>

      {/* 하단 3단 그리드 영역 */}
      <div className="grid grid-cols-[1fr_3fr] ">
        
        <div className="flex flex-col">
          <div className="h-10 print:h-8 bg-sub-200 py-2 items-center text-center font-bold text-base print:text-[14px] leading-tight border-r border-white">
            족압 정적 측정
          </div>
          <div className="flex flex-col flex-1 items-center p-2 border-r border-sub-200">
            <div className="relative w-fit h-fit">
              {staticSrc !== "" && staticSrc !== null && (
                <img
                  src={staticSrc}
                  alt="정적 족압 이미지"
                  className="w-24 h-24 print:w-20 print:h-20 p-1 rounded-[12px] border bg-transparent"
                  onError={(e) => {
                    e.currentTarget.src = "";
                  }}
                />
              )}
              <div className="absolute top-1/2 left-[40%] w-1/5 h-[1px] bg-sub-300 -translate-y-1/2" />
              <div className="absolute left-1/2 top-[40%] h-1/5 w-[1px] bg-sub-300 -translate-x-1/2" />

              {/* 상단 */}
              <span className="absolute top-1 left-1/2 -translate-x-1/2 text-sub-800 text-[10px] font-semibold">
                {Math.round(data.result_summary_data.mat_static_top_pressure)}%
              </span>

              {/* 좌측 */}
              <span className="absolute top-1/2 left-1 -translate-y-1/2 text-sub-800 text-[10px] font-semibold">
                {Math.round(data.result_summary_data.mat_static_left_pressure)}%
              </span>

              {/* 우측 */}
              <span className="absolute top-1/2 right-1 -translate-y-1/2 text-sub-800 text-[10px] font-semibold">
                {Math.round(data.result_summary_data.mat_static_right_pressure)}%
              </span>

              {/* 하단 */}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-sub-800 text-[10px] font-semibold">
                {Math.round(data.result_summary_data.mat_static_bottom_pressure)}%
              </span>
            </div>

            <div className="flex flex-col text-[11px] print:text-[9px] leading-tight text-start mt-1">
              <span className="font-bold text-sub-800">[좌우 무게 분석] <span className="font-bold text-sub-600">{data.static_mat_data.mat_static_horizontal_ment}</span></span>
              <span className="font-bold text-sub-800">[상하 무게 분석] <span className="font-bold text-sub-600">{data.static_mat_data.mat_static_vertical_ment}</span></span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-10 print:h-8 bg-sub-200 py-2 items-center text-center font-bold text-base print:text-[14px] leading-tight ">
            족압 동적 측정
          </div>
          {/* 동적 족압 이미지 */}
          <div className="grid grid-cols-2 p-2">
            <div className="flex flex-col items-center mr-1">
              <div className="flex gap-4 items-center">
                <div className="relative w-fit h-fit">
                  {dynamicSrc !== "" && dynamicSrc !== null && (
                    <img
                      src={dynamicSrc}
                      alt="동적 족압 이미지"
                      className="w-24 h-24 print:w-20 print:h-20 p-1 rounded-[12px] border bg-transparent"
                      onError={(e) => {
                        e.currentTarget.src = "";
                      }}
                    />
                  )}
                  <div className="absolute top-1/2 left-[40%] w-1/5 h-[1px] bg-sub-300 -translate-y-1/2" />
                  <div className="absolute left-1/2 top-[40%] h-1/5 w-[1px] bg-sub-300 -translate-x-1/2" />

                  {/* 상단 */}
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 text-sub-800 text-[10px] font-semibold">
                    {Math.round(data.result_summary_data.mat_static_top_pressure)}%
                  </span>

                  {/* 좌측 */}
                  <span className="absolute top-1/2 left-1 -translate-y-1/2 text-sub-800 text-[10px] font-semibold">
                    {Math.round(data.result_summary_data.mat_static_left_pressure)}%
                  </span>

                  {/* 우측 */}
                  <span className="absolute top-1/2 right-1 -translate-y-1/2 text-sub-800 text-[10px] font-semibold">
                    {Math.round(data.result_summary_data.mat_static_right_pressure)}%
                  </span>

                  {/* 하단 */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-sub-800 text-[10px] font-semibold">
                    {Math.round(data.result_summary_data.mat_static_bottom_pressure)}%
                  </span>
                </div>
                {/* 힙다운 족압 이미지 */}
                <div className="relative w-fit h-fit">
                  {hipDownSrc !== "" && hipDownSrc !== null && (
                    <img
                      src={hipDownSrc}
                      alt="힙다운 이미지"
                      className="w-24 h-24 print:w-20 print:h-20 p-1 rounded-[12px] border bg-transparent"
                      onError={(e) => {
                        e.currentTarget.src = "";
                      }}
                    />
                  )}
                  {/* <div className="absolute top-1/2 left-[40%] w-1/5 h-[1px] bg-sub-300 -translate-y-1/2" />
                  <div className="absolute left-1/2 top-[40%] h-1/5 w-[1px] bg-sub-300 -translate-x-1/2" /> */}
                </div>
              </div>

              <div className="flex flex-col text-[11px] print:text-[9px] leading-tight text-start mt-1">
                <span className="font-bold text-sub-800">[좌우 무게 분석] <span className="font-bold text-sub-600">{data.static_mat_data.mat_static_horizontal_ment}</span></span>
                <span className="font-bold text-sub-800">[상하 무게 분석] <span className="font-bold text-sub-600">{data.static_mat_data.mat_static_vertical_ment}</span></span>
              </div>
            </div>


            {/* 무릎 */}
          <div className="flex flex-col items-center ml-1">
            <div className="flex gap-4 items-center">
              <div className="relative w-fit h-fit">
                {leftKneeSrc !== "" && leftKneeSrc !== null && (
                  <img
                    src={leftKneeSrc}
                    alt="왼쪽 무릎 이미지"
                    className="w-24 h-24 print:w-20 print:h-20 p-1 rounded-[12px] border bg-transparent"
                    onError={(e) => {
                      e.currentTarget.src = "";
                    }}
                  />
                )}
                <div className="absolute top-1/2 left-[40%] w-1/5 h-[1px] bg-sub-300 -translate-y-1/2" />
                <div className="absolute left-1/2 top-[40%] h-1/5 w-[1px] bg-sub-300 -translate-x-1/2" />
              </div>
              {/* 오른쪽 무릎 이미지 */}
              <div className="relative w-fit h-fit">
                {rightKneeSrc !== "" && rightKneeSrc !== null && (
                  <img
                    src={rightKneeSrc}
                    alt="오른쪽 무릎 이미지"
                    className="w-24 h-24 print:w-20 print:h-20 p-1 rounded-[12px] border bg-transparent"
                    onError={(e) => {
                      e.currentTarget.src = "";
                    }}
                  />
                )}
                {/* <div className="absolute top-1/2 left-[40%] w-1/5 h-[1px] bg-sub-300 -translate-y-1/2" />
                <div className="absolute left-1/2 top-[40%] h-1/5 w-[1px] bg-sub-300 -translate-x-1/2" /> */}
              </div>
            </div>

            <div className="flex flex-col text-[11px] print:text-[9px] leading-tight text-start mt-1">
              <span className="font-bold text-sub-800">[무릎 흔들림 분석] <span className="font-bold text-sub-600">{data.dynamic_mat_data.mat_ohs_knee_ment}</span></span>
            </div>
          </div>


          </div>
        </div>
      </div>
    </div>
  );
}