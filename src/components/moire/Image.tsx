import { DUMMY_SECTION_DATA, useDetectMoireSections, type IMoireSectionData } from "../../hooks/moire/useDetectMoireSections";
import type { IMoireSeq } from "../../types/moire";
import { useMeasureMoireMatJson } from "../../hooks/moire/useMeasureMoireMatJson";
import { useStaticLandmark } from "../../actions/useStaticLandmark";
import FootStatic from "./FootStatic";


export function SectionOverlay({isFront, sectionData = DUMMY_SECTION_DATA }: {isFront: boolean, sectionData : IMoireSectionData}) {
  const { lineYPercents, labels } = sectionData;

  return (
    <div className="absolute inset-0 pointer-events-none select-none px-1">
      {/* 1. 중앙 수직 레드 라인 */}
      <div
        className="absolute bottom-4 top-4 w-[2px] bg-redd-600 z-10 -translate-x-1/2"
        style={{ left: `${sectionData.lineXPercent}%` }}
      />

      {/* 2. 상단 좌측/우측 뱃지 */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex w-full max-w-[300px] justify-between px-2 z-10">
        <span className="bg-sub-800/50 text-white text-xs px-2.5 py-0.5 rounded-full backdrop-blur-sm">
          {isFront ? "좌측" : "우측"}
        </span>
        <span className="bg-sub-800/50 text-white text-xs px-2.5 py-0.5 rounded-full backdrop-blur-sm">
          {isFront ? "우측" : "좌측"}
        </span>
      </div>

      {/* 3. 횡단면 점선 4개 (양끝 원 포함) */}
      {lineYPercents.map((yPercent, idx) => (
        <div
          key={`line-${idx}`}
          className="absolute left-3 right-3 flex items-center z-10"
          style={{ top: `${yPercent}%` }}
        >
          {/* 좌측 점 */}
          <div className="w-1 h-1 rounded-full bg-sub-800/80 shrink-0" />
          
          {/* 중앙 점선: h-0으로 박스 높이를 없애고 border-b로 1px 단일 하단선만 적용 */}
          <div className="flex-1 h-0 border-b border-dashed bg-sub-800/60" />
          
          {/* 우측 점 */}
          <div className="w-1 h-1 rounded-full bg-sub-800/80 shrink-0" />
        </div>
      ))}

      {/* 4. 점선 사이 텍스트 라벨 (두 점선의 중간 위치) */}
      {labels.map((label, idx) => {
        const topY = lineYPercents[idx];
        const bottomY = lineYPercents[idx + 1];
        const midY = (topY + bottomY) / 2;

        return (
          <div
            key={`label-${idx}`}
            className="absolute left-1 -translate-y-1/2 bg-sub-800/50 backdrop-blur-sm z-20 rounded-full px-2 "
            style={{ top: `${midY}%` }}
          >
            <span className="text-white text-xs text-center">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export interface IMoireImageProps {
  isFront: boolean;
  data: IMoireSeq
}

export default function MoireImage({ imageData }: { imageData: IMoireImageProps }) {
  const fileBaseUrl = import.meta.env.VITE_PUBLIC_FILE_URL ?? "";
  const moireFileName = imageData.data.server_file_name_moire;

  // 슬래시 중복(/data/Results//8-2834...) 방지 처리
  const cleanFileName = moireFileName ? moireFileName.replace(/^\//, "") : "";
  const moireUrl = `${fileBaseUrl.replace(/\/$/, "")}/${cleanFileName}`;
  const matFileName = imageData.data.server_file_name_mat_json;
  const { data: matJson, isLoading: jsonLoading, isError: jsonError } = useMeasureMoireMatJson(matFileName);
  

  const { resultUrl: moireResultUrl, loading: moireLoading } = useStaticLandmark(moireUrl, 1, false);
  const { sectionData, isLoading: isSectionLoading } = useDetectMoireSections(moireResultUrl);

  const loadingPlaceholder = (
    <div className="w-full h-[720px] rounded-2xl bg-sub100 animate-pulse flex flex-col items-center justify-center gap-4">
      <div
        className="w-12 h-12 rounded-full border-4 border-sub200 border-t-accent animate-spin"
        aria-hidden
      />
      <p className="text-sub-400 dark:text-sub300 text-sm font-medium animate-pulse">
        로딩중입니다
      </p>
    </div>
  );

  // 💡 1. 모든 로딩 상태 하나로 통합 (빨간 에러 문구 깜빡임 방지)
  const isTotalLoading = jsonLoading || isSectionLoading || moireLoading;

  if (isTotalLoading) {
    return loadingPlaceholder;
  }

  // 💡 3. 이미지 생성 실패 시 처리 (!sectionData 제거하여 무한 로딩 방지)
  if (!moireResultUrl) {
    return loadingPlaceholder;
  }
  
  if (jsonError || !matJson) {
    return <div className="text-red-500">오류가 발생했습니다. Moire 데이터 데이터 누락</div>;
  }
  const pressures = {
    leftTopPressure: matJson.left_top_weight_pct,
    leftBottomPressure: matJson.left_bottom_weight_pct,
    rightTopPressure: matJson.right_top_weight_pct,
    rightBottomPressure: matJson.right_bottom_weight_pct,
    leftPressure: matJson.left_weight_pct,
    rightPressure: matJson.right_weight_pct,
    topPressure: matJson.fore_weight_pct,
    bottomPressure: matJson.heel_weight_pct,
  };

  return (
    <div className="relative flex flex-col w-full ">
      
      <div className='flex gap-1 pt-3 items-center'>
        <div className='w-3 h-3 rounded-[3px] bg-accent' />
        <span className='text-accent font-bold text-sm'>{imageData.isFront ? "모아레 측정(전면)" : "모아레 측정(후면)"}</span>
      </div>

      <div className="flex flex-1 justify-center w-full rounded-xl mt-1 border-2 border-sub-200">
        <div className="relative flex justify-center items-center w-full h-[420px] ">
          {/* 이미지 wrapper: 여전히 350px, 가운데 위치 */}
          <div className="relative w-[262px] h-[350px] overflow-hidden rounded-2xl">
            <img
              src={moireResultUrl}
              alt="모아레 오버레이"
              className="absolute inset-0 w-full h-full rounded-2xl cursor-pointer pointer-events-none transition-opacity duration-150"
              style={{ opacity: 100 }}
            />
          </div>

          {/* SectionOverlay는 바깥 420px 컨테이너 기준으로 inset-0 */}
          <SectionOverlay isFront={imageData.isFront} sectionData={sectionData ?? DUMMY_SECTION_DATA} />
        </div>

        {imageData.isFront && (
          <div className="absolute bottom-4 right-4 w-28 h-28 sm:w-[120px] sm:h-[120px] bg-sub-200 backdrop-blur-sm rounded-xl p-1.5">
            <FootStatic fileName={imageData.data.server_file_name_mat} matStatics={pressures} />
          </div>
        )}
      </div>
    </div>
  );
}