import RomDataGraph from './RomDataGraph';

import neck_fold_left from '../assets/neck_fold_left.png';
import neck_fold_right from '../assets/neck_fold_right.png';
import neck_side_fold from '../assets/neck_side_fold.png';
import neck_side_unfold from '../assets/neck_side_unfold.png';

import shoulder_external_rotate_left from '../assets/shoulder_external_rotate_left.png';
import shoulder_external_rotate_right from '../assets/shoulder_external_rotate_right.png';
import shoulder_front_open_left from '../assets/shoulder_front_open_left.png';
import shoulder_front_open_right from '../assets/shoulder_front_open_right.png';
import shoulder_internal_rotate_left from '../assets/shoulder_internal_rotate_left.png';
import shoulder_internal_rotate_right from '../assets/shoulder_internal_rotate_right.png';
import shoulder_side_front_fold_left from '../assets/shoulder_side_front_fold_left.png';
import shoulder_side_front_fold_right from '../assets/shoulder_side_front_fold_right.png';
import shoulder_side_front_unfold_left from '../assets/shoulder_side_front_unfold_left.png';
import shoulder_side_front_unfold_right from '../assets/shoulder_side_front_unfold_right.png';

import elbow_side_fold_left from '../assets/elbow_side_fold_left.png';
import elbow_side_fold_right from '../assets/elbow_side_fold_right.png';

import abdomen_front_left from '../assets/abdomen_front_left.png';
import abdomen_front_right from '../assets/abdomen_front_right.png';
import abdomen_side_fold from '../assets/abdomen_side_fold.png';
import abdomen_side_unfold from '../assets/abdomen_side_unfold.png';

import pelivs_front_open_left from '../assets/pelvis_front_open_left.png';
import pelvis_front_open_right from '../assets/pelvis_front_open_right.png';
import pelvis_side_fold_left from '../assets/pelvis_side_fold_left.png';
import pelvis_side_fold_right from '../assets/pelvis_side_fold_right.png';
import pelvis_side_unfold_left from '../assets/pelvis_side_unfold_left.png';
import pelvis_side_unfold_right from '../assets/pelvis_side_unfold_right.png';

import knee_fold_left from '../assets/knee_fold_left.png';
import knee_fold_right from '../assets/knee_fold_right.png';

import ankle_side_instep_fold_left from '../assets/ankle_side_instep_fold_left.png';
import ankle_side_instep_fold_right from '../assets/ankle_side_instep_fold_right.png';
import ankle_side_sole_fold_left from '../assets/ankle_side_sole_fold_left.png';
import ankle_side_sole_fold_right from '../assets/ankle_side_sole_fold_right.png';
import type { IRomDetail, titles } from '../../types/rom';
import { useGetRomGraph } from '../../hooks/rom/useGetRomGraph';

const imgName: Record<titles, string> = {
  '[정면] 목 가쪽 굽힘 검사 - 왼쪽': neck_fold_left, 
  '[정면] 목 가쪽 굽힘 검사 - 오른쪽': neck_fold_right,
  '[측면] 목 폄 검사': neck_side_unfold,
  '[측면] 목 굽힘 검사': neck_side_fold,

  '[정면] 어깨 벌림 검사 - 왼쪽': shoulder_front_open_left,
  '[정면] 어깨 벌림 검사 - 오른쪽': shoulder_front_open_right,
  '[왼측면] 어깨 굽힘 검사': shoulder_side_front_fold_left,
  '[오른측면] 어깨 굽힘 검사': shoulder_side_front_fold_right,
  '[왼측면] 어깨 폄검사': shoulder_side_front_unfold_left,
  '[오른측면] 어깨 폄검사': shoulder_side_front_unfold_right,
  '[왼측면] 어깨 가쪽 돌림 검사': shoulder_internal_rotate_left,
  '[오른측면] 어깨 가쪽 돌림 검사': shoulder_internal_rotate_right,
  '[왼측면] 어깨 안쪽 돌림 검사': shoulder_external_rotate_left,
  '[오른측면] 어깨 안쪽 돌림 검사': shoulder_external_rotate_right,

  '[왼측면] 팔꿉 관절 굽힘 검사': elbow_side_fold_left,
  '[오른측면] 팔꿉 관절 굽힘 검사': elbow_side_fold_right,

  '[측면] 몸통 굽힘 검사': abdomen_side_fold,
  '[측면] 몸통 폄 검사': abdomen_side_unfold,
  '[정면] 몸통 왼쪽 가쪽 굽힘': abdomen_front_left,
  '[정면] 몸통 오른쪽 가쪽 굽힘': abdomen_front_right,

  '[정면] 왼쪽 엉덩관절 벌림 검사': pelivs_front_open_left,
  '[정면] 오른쪽 엉덩관절 벌림 검사': pelvis_front_open_right,
  '[왼측면] 엉덩관절 폄검사': pelvis_side_unfold_left,
  '[오른측면] 엉덩관절 폄검사': pelvis_side_unfold_right,
  '[왼측면] 엉덩관절 굽힘 검사': pelvis_side_fold_left,
  '[오른측면] 엉덩관절 굽힘 검사': pelvis_side_fold_right,

  '[왼측면] 왼쪽 발등 굽힘 검사': ankle_side_instep_fold_left,
  '[왼측면] 왼쪽 발바닥 굽힘 검사': ankle_side_instep_fold_right,
  '[오른측면] 왼쪽 발등 굽힘 검사': ankle_side_sole_fold_left,
  '[오른측면] 왼쪽 발바닥 굽힘 검사': ankle_side_sole_fold_right,

  '[왼측면] 무릎관절 굽힘 검사': knee_fold_left,
  '[오른측면] 무릎관절 굽힘 검사': knee_fold_right,

}


const getLevelValue = (value: number, data: IRomDetail) => {
  if (value >= data.normal_normal) {
    return 'text-accent '; // level 3
  } else if (value >= data.normal_warning) {
    return 'text-greenn '; // level 2
  } else if (value >= data.normal_bad) {
    return 'text-orangee '; // level 1
  } else {
    return 'text-redd '; // level 0
  }
};
const getBgLevelValue = (value: number, data: IRomDetail) => {
  if (value >= data.normal_normal) {
    return 'bg-accent '; // level 3
  } else if (value >= data.normal_warning) {
    return 'bg-greenn '; // level 2
  } else if (value >= data.normal_bad) {
    return 'bg-orangee '; // level 1
  } else {
    return 'bg-redd '; // level 0
  }
};

export default function UnitCard({ data }: { data: IRomDetail }) {

  const stateBarColor = {
    0: "bg-redd/75 w-[23.9%]",
    1: "bg-orangee/75 w-[48.9%]",
    2: "bg-greenn/75 w-[73.9%]",
    3: "bg-accent/75 w-[98.9%]"
  } [data.score];
  
  const { data: romJson, isLoading: jsonLoading, isError: jsonError } = useGetRomGraph(
    data?.measure_server_data_json_name
  );
  if (jsonLoading) return <div>로딩중..</div>;
  if (jsonError) return <div>occured Error</div>;
  return (
    <div className="w-full h-full flex flex-col gap-2 rounded-xl border border-sub-400  p-1">
      {/* 1. 타이틀 영역 */}
      <div className="flex text-sm font-bold gap-2 mt-2 ml-2 items-center ">
        <div className='w-4 h-4 rounded-sm bg-accent' />
        {data.title}
      </div>

      {/* 2. 상단 정보 섹션 */}
      <div className="flex items-start">
        <div className="h-full px-2 flex-shrink-0 flex  items-center justify-center">
           <img src={imgName[data.title as titles]} className='bg-white rounded-xl border border-sub-200 w-20 h-20 object-contain' alt="body-part" />
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex justify-between items-end'>
            <p className="text-sm font-bold text-sub-800">최대각도: <span className="text-sub-800 font-bold">{data.value_1_max.toFixed(1)}°</span></p>
          </div>
          <p className="text-[10px] text-gray-500 leading-tight line-clamp-2 h-[24px] overflow-hidden">
            {data.description}
          </p>

          {/* 상단 텍스트 공간 확보를 위해 pt-12 정도로 늘립니다. */}
          <div className="relative w-full pt-8 px-2"> 
            {/* 레이블과 각도값을 묶어서 상단에 배치 */}
            <div className="absolute top-0 w-full flex justify-between px-1">
              {/* 각 섹션(1/4)을 flex-col로 묶어 수직 정렬 */}
              <div className="w-1/4 flex flex-col items-center leading-tight">
                <span className="text-[10px] font-bold text-gray-400">매우 양호</span>
                <span className="text-[10px] font-medium text-gray-400">{data.max_value}°</span>
              </div>
              <div className="w-1/4 flex flex-col items-center leading-tight">
                <span className="text-[10px] font-bold text-gray-400">정상</span>
                <span className="text-[10px] font-medium text-gray-400">{data.normal_normal}°</span>
              </div>
              <div className="w-1/4 flex flex-col items-center leading-tight">
                <span className="text-[10px] font-bold text-gray-400">주의</span>
                <span className="text-[10px] font-medium text-gray-400">{data.normal_warning}°</span>
              </div>
              <div className="w-1/4 flex flex-col items-center leading-tight">
                <span className="text-[10px] font-bold text-gray-400">위험</span>
                <span className="text-[10px] font-medium text-gray-400">{data.normal_bad}°</span>
              </div>
            </div>
            
            {/* 게이지 바 영역 */}
            <div className="relative w-full h-2 rounded-full bg-sub-200 overflow-hidden">
              <span className="absolute top-0 h-full w-px bg-sub-800 left-[25%] opacity-50"></span>
              <span className="absolute top-0 h-full w-px bg-sub-800 left-[50%] opacity-50"></span>
              <span className="absolute top-0 h-full w-px bg-sub-800 left-[75%] opacity-50"></span>
              <div 
                className={`absolute top-0 left-0 h-full ${stateBarColor} rounded-full transition-all duration-500`}
                
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 📊 Grid 미니 그래프 영역 (좌/우) */}
      <div className='grid grid-rows-2 gap-2 h-[190px] print:h-[150px] px-2 min-w-0'>
        <RomDataGraph graphType={0} data={romJson?.values ?? []} maxMinValue={data} />
        <RomDataGraph graphType={1} data={romJson?.values ?? []} maxMinValue={data} />
      </div>

      <div className='w-full px-1'>
        <div className="flex w-full justify-between items-end px-1">
          {[...Object.entries(data.history_by_measure_type), ...Array(6).fill([null, null])]
            .slice(0, 6)
            .map(([date, value], index) => (
              <div key={index} className="flex flex-col items-center">
                {/* 날짜 영역: leading-none으로 행간 제거, mt-1 제거 */}
                <span className={`text-[8px] text-sub-800 tracking-tighter leading-none mb-1 ${!date && 'text-transparent'}`}>
                  {date ? date.slice(0, 11) : " "} 
                </span>

                {/* 값 영역: py-1을 py-0.5로 줄이거나 제거 */}
                
                {date && value !== undefined ? 
                <div className='min-w-[44px] flex items-center px-1 py-1 gap-1 leading-none '>
                  <div className={`w-2 h-2 rounded-sm ${getBgLevelValue(value, data)}`} />
                  <div className={` rounded-md  text-[10px] font-semibold text-center ${getLevelValue(value, data)}`}>
                    {value !== null ? `${value.toFixed(1)}°` : " "}
                  </div>
                </div> : 
                <div className='min-w-[44px] flex items-center px-1 py-1 gap-1 leading-none '>

                </div>}
                
              </div>
              
            ))}
        </div>
      </div>
      
    </div>
  );
}