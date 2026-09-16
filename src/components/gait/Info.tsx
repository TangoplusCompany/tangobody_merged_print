import { useTranslation } from "react-i18next";
import type { GaitContainerProps } from "./GaitApp";

export interface GaitInfoCardProps {
  type: string//"Pattern" | "Balance" | "Efficiency"
  title?: string;
  description : string;
  grade: number;
}
export function GaitInfoHorizonCard({ type, description,  grade } : GaitInfoCardProps) {
  const {t} = useTranslation()
  const bgColor = {
    0 : " bg-sub-600",
    1 : "bg-orangee-600",
    2: "bg-redd-600"
  } [grade];
  const textColor = {
    0 : "text-sub-700",
    1 : "text-orangee-600",
    2: "text-redd-600"
  } [grade];
  const typeTitle = {
    "Pattern" : "gait_type_pattern",
    "Balance" : "gait_type_balance",
    "Efficiency": "gait_type_efficiency"
  } [type];
  const riskTitle = {
    0 : "basic_normal",
    1 : "basic_caution",
    2 : "basic_danger"
  }[grade];

  return (
    <div className={`flex flex-col px-2 py-2 print:py-1 rounded-[4px]  border border-sub-200`}>
      <div className="flex justify-between w-full py-2 print:py-0">
        <div className={`text-sm print:text-[10px] text-sub-400`}>{t(typeTitle ?? "")}</div>
        <div className={`text-sm print:text-xs ${bgColor} text-white px-1.5 print:py-0.5 rounded-full`}>{t(riskTitle ?? "")}</div>
      </div>
      <div className={`text-start text-sm ${textColor}`}>{description}</div>
    </div>
  )
}

export function GaitInfoVertiCard({ type, description, grade } : GaitInfoCardProps) {
  const {t} = useTranslation()
  const textBg = {
    0: "bg-sub-600 dark:bg-gray-600",
    1: "bg-warning",
    2: "bg-danger",
  } [grade];
  const typeTitle = {
    "TotalComment" : "gait_comment_total",
    "Rhythm" : "gait_comment_rhythm",
    "FallRisk": "gait_comment_fall_risk",
    "RecommendComment": "gait_comment_recommend"
  } [type];

  const gradeTitle = {
    0 : "basic_normal",
    1 : "basic_caution",
    2 : "basic_danger"
  } [grade];

  return (
    <div className={`flex flex-col gap-2 px-2 py-2 print:py-1 `}>
      <div className="flex w-full justify-between items-center">
        <div className={`text-xs print:text-[10px] text-sub-400 font-semibold`}>{t(typeTitle ?? "")}</div>
        <div className={`text-sm print:text-xs ${textBg} text-white px-1.5 py-0.5 rounded-full`}>{t(gradeTitle ?? "")}</div>
      </div>
      <div className={`text-start text-sm print:text-xs text-sub-800`}>{description}</div>
    </div>
  )
}



export default function GaitInfo({data}: GaitContainerProps) {
  const {t} = useTranslation();
  const infoHorizonCards = [
    {
      type: "Pattern",
      title: data.resultGaitPatternTitle,
      description: data.resultGaitPatternDescription,
      grade: data.resultGaitPatternGrade
    },
    {
      type: "Balance",
      title: data.resultGaitBalanceTitle,
      description: data.resultGaitBalanceDescription,
      grade: data.resultGaitBalanceGrade
    },
    {
      type: "Efficiency",
      title: data.resultGaitEfficiencyTitle,
      description: data.resultGaitEfficiencyDescription,
      grade: data.resultGaitEfficiencyGrade
    }
  ]

  const infoVertiCards = [
    {
      type: "TotalComment",
      title: data.resultGaitTotalCommentTitle,
      description: data.resultGaitTotalCommentDescription,
      grade: data.resultGaitTotalCommentGrade
    },
    {
      type: "Rhythm",
      title: data.resultGaitRhythmTitle,
      description: data.resultGaitRhythmDescription,
      grade: data.resultGaitRhythmGrade
    },
    {
      type: "FallRisk",
      title: data.resultFallRiskTitle,
      description: data.resultFallRiskDescription,
      grade: data.resultFallRiskGrade
    },
    // {
    //   type: "RecommendComment",
    //   title: data.resultRecommendCommentTitle,
    //   description: data.resultRecommendCommentDescription,
    //   grade: data.resultRecommendCommentGrade
    // }
  ]
  return (
    <div className="flex flex-col py-2">
      <div className="flex gap-1 items-center mb-1">
        <div className="bg-accent w-3 h-3 rounded-[4px]"/>
        <span className="text-sm font-semibold print:text-xs text-accent">
          {t('gait_overall_result')}
        </span>
      </div>
      
      <div>
        <div className="grid grid-cols-[15%_85%] items-center gap-2 bg-sub-100 rounded-[4px] py-2 print:py-0 my-2 print:my-1 px-2">
          <div className="text-sm print:text-xs text-sub-800 text-center">
            {t('gait_overall_judgment')}
          </div>
          <div className="text-start font-semibold text-sub-800 text-sm py-1">{data.resultGaitTypeTitle}</div>
        </div>
        

        <div className="grid grid-cols-3 gap-1 mb-2">
          {infoHorizonCards.map((card, id) => (
            <GaitInfoHorizonCard key={id} type={card.type} description={card.description} grade={card.grade} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1 mt-2 bg-sub-100">
          {infoVertiCards.map((card, id) => (
              <GaitInfoVertiCard key={id} type={card.type} title={card.title} description={card.description} grade={card.grade} />
            ))}
        </div>
      </div>
    </div>
  )
};