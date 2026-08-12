export interface IGaitResponse {
  gait_result: IGaitResult
}

export interface IGaitResult {
  gait_measure_info: IGaitInfo
  user_info: IUserInfo
}
export interface IUserInfo {
  user_name : string;
  gender: string;
}
export interface IGaitMeta {
  sn : number;
  local_sn: number;
  device_sn: number;
  measure_sn	: number;
  measure_server_sn: number;
  user_uuid	 : string;
  user_sn: number;
  user_name : string;
  gender: string;
  measure_date : string;
}
export interface IGaitInfo extends IGaitMeta {
  file_server_video_name : string;
  file_server_gait_frame_name : string;
  totalSequenceCount	: number;
  averageStepLength	: number;
  avgLeftStepLength	: number;
  avgRightStepLength: number;
  averageStrideLength	: number;
  avgLeftStrideLength	: number;
  avgRightStrideLength	: number;
  averageStepWidth	: number;
  overallGaitSpeed	: number;
  cadence: number;
  avgStancePhaseRatio	: number;
  avgSwingPhaseRatio: number;
  avgDoubleSupportRatio: number;
  averageToeClearance: number;
  avgLeftSingleSupportRatio: number;
  avgRightSingleSupportRatio: number;
  avgDoubleSupportTime: number;
  avgLeftSingleSupportTime: number;
  avgRightSingleSupportTime: number;
  avgLeftStanceRatio: number;
  avgLeftSwingRatio: number;
  avgRightStanceRatio: number;
  avgRightSwingRatio: number;
  overallDataQualityScore: number;
  avgMaxShoulderTilt	: number;
  avgMaxTrunkFlexion	: number;
  avgMaxTrunkSway	: number;
  avgMaxPevisDrop: number;
  avgArmSwingSymmetry	: number;
  avgLeftArmSwingRange	: number;
  avgRightArmSwingRange	: number;
  avgMaxLeftKneeFlexion	: number;
  avgMaxRightKneeFlexion	: number;
  avgLeftStepSpeed	: number;
  avgRightStepSpeed	: number;
  avgOverallStepSpeed	: number;
  avgLeftStrideSpeed	: number;
  avgRightStrideSpeed	: number;
  avgOverallStrideSpeed	: number;
  resultToeClearanceRisk	: number;
  resultDoubleSupportRisk	: number;
  resultSpeedRisk	: number;
  resultStepWidthRisk	: number;
  resultLeftKneeFlexionRisk	: number;
  resultRightKneeFlexionRisk	: number;
  resultKneeFlexionRisk	: number;
  resultSpeedDiffRatio	: number;
  resultFallRiskScore	: number;
  resultIsAsymmetric	: number;
  resultGaitTypeGrade	: number;
  resultGaitTypeTitle	: string;
  resultGaitPatternGrade	: number;
  resultGaitPatternTitle	: string;
  resultGaitPatternDescription	: string;
  resultGaitBalanceGrade	: number;
  resultGaitBalanceTitle	: string;
  resultGaitBalanceDescription	: string;
  resultGaitEfficiencyGrade	: number;
  resultGaitEfficiencyTitle	: string;
  resultGaitEfficiencyDescription	: string;
  resultGaitTotalCommentTitle	: string;
  resultGaitTotalCommentDescription	: string;
  resultGaitTotalCommentGrade	: number;
  resultGaitRhythmTitle	: string;
  resultGaitRhythmDescription	: string;
  resultGaitRhythmGrade	: number;
  resultFallRiskTitle	: string;
  resultFallRiskDescription	: string;
  resultFallRiskGrade	: number;
  resultRecommendCommentTitle	: string;
  resultRecommendCommentDescription	: string;
  resultRecommendCommentGrade	: number;
  resultLeftSingleSupportRisk	: number;
  resultRightSingleSupportRisk	: number;
  resultSingleRiskSupportDescription: string;
  resultDoubleSupportRiskDescription	: string;
  resultLeftStanceRisk	: number;
  resultRightStanceRisk	: number;
  resultStanceRiskDescription	: string;
  resultSymmetryRisk	: number;
  resultSymmetryDescription	: string;
  resultPhaseMaxRisk	: number;
  resultStepLengthRisk	: number;
  resultStrideLengthRisk	: number;
  resultStepLengthAsymmetry	: number;
  resultStepLenthDescirption	: string;
  ersultStrideLengthDescription: string;
}