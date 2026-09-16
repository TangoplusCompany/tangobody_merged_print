import MoireImage, { type IMoireImageProps } from "./Image";
import MoireGraph from "./Graph";
import { useMeasureMoireStaticJson } from "../../hooks/moire/useMeasureMoireStaticJson";
import type { IMoireDetail } from "../../types/moire";
import { useTranslation } from "react-i18next";

export interface IMoireContainerProps {
  data : IMoireDetail
}
export type IMoireGraphTitle = "moire_shoulder_contour" | "moire_waist_contour" | "moire_pelvis_contour"

// 2. 부위 식별 키
export type MoireBodyPart = 
  | 'frontShoulderValue'
  | 'frontWaistValue'
  | 'frontHipValue'
  | 'backShoulderValue'
  | 'backWaistValue'
  | 'backHipValue';


export type IMoireMultiPartData = Record<MoireBodyPart, number[]>;

export default function MoireContainer ({ data }: IMoireContainerProps) {
  const {t} = useTranslation()
  const leftFileName = data?.front?.server_file_name_moire_json
  const rightFileName = data?.back?.server_file_name_moire_json

  const { data: measureJson0, isLoading: jsonLoading0, isError: jsonError0 } = useMeasureMoireStaticJson(leftFileName);
  const { data: measureJson1, isLoading: jsonLoading1, isError: jsonError1 } = useMeasureMoireStaticJson(rightFileName);

  if (jsonLoading0 || jsonLoading1) {
    return <div className="text-sub400">{t('loading')}</div>;
  }
  if (jsonError0 || jsonError1) {
    return <div className="text-red-500">{t('invalid_data')}</div>;
  }


  const frontD = data.front;
  const backD = data.back;
  const graphs = [
    ...(frontD ? [{
      title: "moire_front_shoulder" as IMoireGraphTitle,
      leftValue: frontD?.shoulder_left_peak_depth * 100,
      rightValue: frontD?.shoulder_right_peak_depth * 100,
      leftIndex: frontD?.shoulder_left_peak_index,
      rightIndex: frontD?.shoulder_right_peak_index,
      unit: "cm",
      indexData: measureJson0?.[0]?.DepthArray ?? []
    }] : []),
    ...(backD ? [{
      title: "moire_back_shoulder" as IMoireGraphTitle,
      leftValue: backD?.shoulder_left_peak_depth * 100,
      rightValue: backD?.shoulder_right_peak_depth * 100,
      leftIndex: backD?.shoulder_left_peak_index,
      rightIndex: backD?.shoulder_right_peak_index,
      unit: "cm",
      indexData: measureJson1?.[0]?.DepthArray ?? []
    }] : []),
    ...(frontD ? [{
      title: "moire_front_waist" as IMoireGraphTitle,
      leftValue: frontD?.waist_left_peak_depth * 100,
      rightValue: frontD?.waist_right_peak_depth * 100,
      leftIndex: frontD?.waist_left_peak_index,
      rightIndex: frontD?.waist_right_peak_index,
      unit: "cm",
      indexData: measureJson0?.[1]?.DepthArray ?? []
    }] : []),
    ...(backD ? [{
      title: "moire_back_waist" as IMoireGraphTitle,
      leftValue: backD?.waist_left_peak_depth * 100,
      rightValue: backD?.waist_right_peak_depth * 100,
      leftIndex: backD?.waist_left_peak_index,
      rightIndex: backD?.waist_right_peak_index,
      unit: "cm",
      indexData: measureJson1?.[1]?.DepthArray ?? []
    }] : []),
    ...(frontD ? [{
      title: "moire_front_pelvis" as IMoireGraphTitle,
      leftValue: frontD?.hip_left_peak_depth * 100,
      rightValue: frontD?.hip_right_peak_depth * 100,
      leftIndex: frontD?.hip_left_peak_index,
      rightIndex: frontD?.hip_right_peak_index,
      unit: "cm",
      indexData: measureJson0?.[2]?.DepthArray ?? []
    }] : []),
    ...(backD ? [{
      title: "moire_back_pelvis" as IMoireGraphTitle,
      leftValue: backD?.hip_left_peak_depth * 100,
      rightValue: backD?.hip_right_peak_depth * 100,
      leftIndex: backD?.hip_left_peak_index,
      rightIndex: backD?.hip_right_peak_index,
      unit: "cm",
      indexData: measureJson1?.[2]?.DepthArray ?? []
    }] : []),
  ]
  const imageDatas = [
    {
      isFront: true,
      data: frontD
    },
    {
      isFront: false, 
      data: backD
    }
  ]
  return (
    <div className="flex flex-col gap-2">

      <div className="grid grid-cols-2 gap-2">
        {imageDatas
          .filter((imageD): imageD is IMoireImageProps => !!imageD?.data)
          .map((imageD, key) => (
            <MoireImage key={key} imageData={imageD} />
          ))}
      </div>
 

      <div className='flex gap-1 pl-1 pt-1 items-center'>
        <div className='w-3 h-3 rounded-[3px] bg-accent' />
        <span className='text-accent font-bold text-sm'>{t('moire_front_back_contour')}</span>
      </div>


      <div className="grid grid-cols-2 grid-rows-3 gap-2">
        {graphs.map((graphData, key) => (
          <MoireGraph key={key} graphData={graphData} />
        ))}
      </div>
    </div>
  )
}