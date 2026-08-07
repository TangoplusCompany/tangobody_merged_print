import type { IAppProps } from "../basic/BasicApp";
import type { IGaitDetail } from "../../types/gait";
import GaitInfo from "./Info";
import GaitBalance from "./Balance";
import GaitParameter from "./Parameter";
import GaitFall from "./Fall";
import logoWhite from '../../assets/logo_white.png';

export function GaitApp({ t_r }: IAppProps) { //
  console.log(t_r)
  // TODO Gait 수정하기
  //  const { mutate, data, isPending, isError } = usePostGaitData();
  //   const encryptData = async () => {
      
  //     // const cryptoData = {
  //     //   sn: 2329,
  //     //   user_uuid: "QAAYA6RDBKSJQRA2",
  //     //   receiver: "01025248218",
  //     // };
  //     // const encryptData = await actionPrintEncrypt(cryptoData);
  //     // console.log(encryptData)
  //   };q
  //   useEffect(() => {
  //     encryptData()
  //     if (t_r) {
  //       mutate(t_r);
  //     }
  //   }, [mutate, t_r]);
  //   if (isPending) return <div className="flex h-screen items-center justify-center">로딩 중...</div>;
  //   if (!t_r || isError || (data === undefined)) {
  //     return (
  //       <div className="print:hidden flex flex-col h-screen items-center justify-center gap-4">
  //         <div className="text-xl font-bold text-red-500">올바르지 않은 데이터입니다.</div>
  //       </div>
  //     );
  //   }
  return (
    <div className="a4-page flex flex-col bg-white">
      <div className='flex justify-between w-full h-fit bg-sub-300 p-2 gap-4 '>
        <div className='flex gap-4'>
          <img src={logoWhite} alt="로고" className="flex w-6 h-fit my-auto" />
          <div className='flex text-center my-auto text-white text-xl font-bold'>Tango Body Report</div>
        </div>
        {/* {data && (
          <div className='justify-center px-3 bg-white flex flex-col rounded-[2px] text-[12px] text-center'>
            
            <div className='flex gap-8'>
              <span>이름: {data.user_name}</span>
              <span>성별: {data.br_input_gender === 0 ? "여성" : "남성"}</span>
              <span>신장: {data.br_input_height}cm</span>
              <span>나이: 만 {data.br_input_age}세</span>
            </div>
            <div className='h-[1px] w-full bg-sub-400'></div>
            <div className='flex gap-4 justify-center '>
              <span>현재 검사일: {data.measure_date?.replace(/-/g, ".").slice(0, 11)} </span>
              <span>
                이전 검사일: {data.most_previous_data?.measure_date ? `${data.most_previous_data.measure_date.replace(/-/g, ".").slice(0, 11)}` : '미실시'}
              </span>
            </div>
            
          </div>
        )} */}
      </div>
      <div className="flex flex-col mt-2 gap-2">
        <div className="flex flex-col ">
          <GaitInfo  data={mockMeasureGaitDetail} />
        </div>
        <div className="flex flex-1 w-full gap-2">

          <div className="flex flex-col w-2/3 gap-1">
            <GaitBalance data={mockMeasureGaitDetail} />
            <GaitParameter data={mockMeasureGaitDetail} />
          </div>

          <div className="w-1/3">
          <GaitFall data={mockMeasureGaitDetail} />
          </div>
        </div>
      </div>
    </div>
  );
}
export interface GaitContainerProps {
  data: IGaitDetail;
}
const mockMeasureGaitDetail: IGaitDetail = {
  sn: 1,
  local_sn: 101,
  device_sn: 5002,
  measure_sn: 2026072901,
  measure_server_sn: 90001,
  user_uuid: "usr_8f9a2b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
  user_sn: 42,
  user_name: "홍길동",
  measure_date: "2026-07-29T10:30:00Z",
  file_server_video_name: "8-2805-2-1785390105.mp4",
  file_server_gait_frame_name: "8-2805-2-1785391133.json",
  totalSequenceCount: 120,
  averageStepLength: 0.654,
  avgLeftStepLength: 0.648,
  avgRightStepLength: 0.660,
  averageStrideLength: 1.308,
  avgLeftStrideLength: 1.302,
  avgRightStrideLength: 1.314,
  averageStepWidth: 8.25,
  overallGaitSpeed: 1.15,
  cadence: 110.5,
  avgStancePhaseRatio: 60.2,
  avgSwingPhaseRatio: 39.8,
  avgDoubleSupportRatio: 20.4,
  averageToeClearance: 2.1,
  avgLeftSingleSupportRatio: 39.9,
  avgRightSingleSupportRatio: 39.7,
  avgDoubleSupportTime: 0.22,
  avgLeftSingleSupportTime: 0.43,
  avgRightSingleSupportTime: 0.42,
  avgLeftStanceRatio: 60.1,
  avgLeftSwingRatio: 39.9,
  avgRightStanceRatio: 60.3,
  avgRightSwingRatio: 39.7,
  overallDataQualityScore: 95.0,
  avgMaxShoulderTilt: 2.3,
  avgMaxTrunkFlexion: 4.1,
  avgMaxTrunkSway: 3.5,
  avgMaxPevisDrop: 1.8,
  avgArmSwingSymmetry: 92.5,
  avgLeftArmSwingRange: 25.4,
  avgRightArmSwingRange: 24.8,
  avgMaxLeftKneeFlexion: 58.2,
  avgMaxRightKneeFlexion: 57.9,
  avgLeftStepSpeed: 1.14,
  avgRightStepSpeed: 1.16,
  avgOverallStepSpeed: 1.15,
  avgLeftStrideSpeed: 1.14,
  avgRightStrideSpeed: 1.16,
  avgOverallStrideSpeed: 1.15,
  resultToeClearanceRisk: 0,
  resultDoubleSupportRisk: 1,
  resultSpeedRisk: 2,
  resultStepWidthRisk: 0,
  resultLeftKneeFlexionRisk: 0,
  resultRightKneeFlexionRisk: 1,
  resultKneeFlexionRisk: 1,
  resultSpeedDiffRatio: 1.02,
  resultFallRiskScore: 15.5,
  resultIsAsymmetric: 0,
  resultGaitTypeGrade: 0,
  resultGaitTypeTitle: "정상 보행 패턴",
  resultGaitPatternGrade: 0,
  resultGaitPatternTitle: "안정적인 보행",
  resultGaitPatternDescription: "보행 시 좌우 균형이 양호하며, 안정적인 속도를 유지하고 있습니다.",
  resultGaitBalanceGrade: 1,
  resultGaitBalanceTitle: "보행 균형 주의",
  resultGaitBalanceDescription: "체중 이동 시 약간의 흔들림이 관찰됩니다. 균형 감각 강화 운동이 권장됩니다.",
  resultGaitEfficiencyGrade: 0,
  resultGaitEfficiencyTitle: "우수한 보행 효율",
  resultGaitEfficiencyDescription: "보คง 속도와 보폭의 리듬감이 일정합니다. 보행 에너지가 효율적으로 사용되고 있습니다.",
  resultGaitTotalCommentTitle: "종합 보행 평가 결과",
  resultGaitTotalCommentDescription: "전반적으로 양호한 보행 상태를 보이고 있습니다. 꾸준한 유산소 운동을 지속하세요.",
  resultGaitTotalCommentGrade: 0,
  resultGaitRhythmTitle: "보행 리듬 평가",
  resultGaitRhythmDescription: "양발의 접지 시간이 규칙적입니다. 보행 리듬 유지가 원활합니다.",
  resultGaitRhythmGrade: 0,
  resultFallRiskTitle: "낙상 위험도 낮음",
  resultFallRiskDescription: "현재 낙상 위험 수준은 낮습니다. 주변 환경의 장애물을 주의하세요.",
  resultFallRiskGrade: 0,
  resultRecommendCommentTitle: "맞춤 운동 추천",
  resultRecommendCommentDescription: "하체 근력 강화를 위해 스쿼트를 추천합니다. 하루 15회씩 3세트 진행하세요.",
  resultRecommendCommentGrade: 0,
  resultLeftSingleSupportRisk: 0,
  resultRightSingleSupportRisk: 1,
  resultSingleRiskSupportDescription: "우측 단각지지 시간이 다소 짧습니다. 오른쪽 다리의 지지력을 확인하세요.",
  resultDoubleSupportRiskDescription: "양각지지 비율이 평균보다 높습니다. 보행 속도가 줄어들 수 있습니다.",
  resultLeftStanceRisk: 0,
  resultRightStanceRisk: 0,
  resultStanceRiskDescription: "입각기 비율이 안정적인 범위를 유지하고 있습니다.",
  resultSymmetryRisk: 0,
  resultSymmetryDescription: "좌우 보폭 및 지지 시간의 대칭성이 매우 양호합니다.",
  resultPhaseMaxRisk: 1,
  resultStepLengthRisk: 2,
  resultStrideLengthRisk: 1,
  resultStepLengthAsymmetry: 1.8,
  resultStepLenthDescirption: "보폭 크기가 신장 대비 적절합니다. 현재 상태를 유지하세요.",
  ersultStrideLengthDescription: "보구 간격이 규칙적으로 측정되었습니다. 안정적인 걸음걸이입니다.",
};