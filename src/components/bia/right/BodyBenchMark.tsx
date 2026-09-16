import type { IBodyBenchmark } from '../../../types/bia';
import bt1 from '../../../assets/bt_1.png';
import bt2 from '../../../assets/bt_2.png';
import bt3 from '../../../assets/bt_3.png';
import bt4 from '../../../assets/bt_4.png';
import bt5 from '../../../assets/bt_5.png';
import bt6 from '../../../assets/bt_6.png';
import bt7 from '../../../assets/bt_7.png';
import bt8 from '../../../assets/bt_8.png';
import bt9 from '../../../assets/bt_9.png';
import { useTranslation } from 'react-i18next';


interface MetricItem {
  label: string;
  value: string | number;
  unit?: string;
}

interface MetricListProps {
  title: string;
  titleValue: string | number;
  items: MetricItem[];
}

function MetricList({ title, titleValue, items }: MetricListProps) {
  const {t} = useTranslation()
  return (
    <div className="flex flex-col w-full gap-1">
      {/* 상단 메인 타이틀 (빨간색 강조) */}
      <div className="text-redd-600 text-sm font-bold text-start">
        {title}: {titleValue}
      </div>

      {/* 구분선 */}
      <div className="relative h-[2px] rounded-full bg-sub-800 shrink-0 mr-2" />

      {/* 리스트 영역 */}
      <div className="flex flex-col text-[12px] text-black leading-[1.75]">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center ">
            <span className="font-medium text-sub-600">{t(item.label)}</span>
            <span className="font-bold">
              {item.value}
              {item.unit && <span className="ml-0.5 font-normal">{item.unit}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BodyBenchMark({data}: {data: IBodyBenchmark}) {
  const {t} = useTranslation()
  const radius = 60;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (data.body_score / 100) * circumference;
  const healthMetrics = [
    { label: "bia_target_weight", value: data.target_weight, unit: "kg" },
    { label: "bia_fat_control", value: data.fat_control_amount, unit: "kg" },
    { label: "bia_muscle_control", value: data.muscle_control, unit: "kg" },
    { label: "bia_recommended_intake", value: data.recommended_intake_kcal, unit: "kcal" },
    { label: "bia_lean_mass", value: data.lean_body_weight, unit: "kg" },
    { label: "bia_muscle_mass", value: data.muscle_mass, unit: "kg" },
    { label: "bia_bone_mass", value: data.bone_mass, unit: "kg" },
    { label: "bia_body_cell_mass", value: data.body_cell_mass, unit: "kg" },
    { label: "bia_whr", value: data.waist_to_hip_ratio, unit: "" },
    { label: "bia_obesity_rate", value: data.obesity_percentage, unit: "%" },
    { label: "bia_subcutaneous_fat", value: data.subcutaneous_fat_rate, unit: "%" },
  ];

  const bodyType = {
    1: "bia_body_type_1",
    2: "bia_body_type_2",
    3: "bia_body_type_3",
    4: "bia_body_type_4",
    5: "bia_body_type_5",
    6: "bia_body_type_6 ",
    7: "bia_body_type_7",
    8: "bia_body_type_8",
    9: "bia_body_type_9"
  }[data.body_type]

  const bodyTypeImg = {
    1: bt1,
    2: bt2,
    3: bt3,
    4: bt4,
    5: bt5,
    6: bt6,
    7: bt7,
    8: bt8,
    9: bt9
  }[data.body_type]
  return (
    <div className='flex flex-col'>
      <div className='flex w-fit bg-accent rounded-br-xl rounded-tl-xl text-base text-white font-semibold px-2 py-1'>
        {t('bia_key_health_metrics')}
      </div>

     
      <div className="flex justify-center items-center py-6 relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90" 
        >
          
          <circle
            stroke="#E5E7EB" 
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          
          <circle
            stroke="#5D8DFF" 
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s ease-in-out' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-baseline">
            <span className="text-5xl font-bebas font-bold text-gray-600 leading-none">
              {data.body_score}
            </span>
            <span className="text-lg font-bold text-gray-500 ml-1">{t('bia_unit_point')}</span>
          </div>
        </div>
      </div>


      <div className='flex flex-1 flex-col gap-2 px-2'>
        <div className='flex gap-2'>
          <img 
            src={bodyTypeImg}
            alt='건강지표이미지'
            className='rounded-2xl print:rounded-xl bg-sub-100 w-14 h-14 my-auto border-2 border-sub-200/60'
          >
          </img>
          <div className='flex flex-col gap-0.5'>
            <div className='text-[12px] font-bold text-black'>
              {t(bodyType ?? "")}
            </div>
            <div className='text-[10px] leading-[1.3] break-keep text-black'>
              {data.result_body_type_description}
            </div>
          </div>
        </div>

        <div className='grid grid-rows-[40%_60%] gap-4 h-full'>
          <MetricList 
            title={t('bia_weight_control_amount')}
            titleValue={`${data.weight_control}kg`} 
            items={healthMetrics} 
          />
        </div>
      </div>
    </div>
  );
}