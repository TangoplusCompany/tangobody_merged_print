export interface IRomPair {
  left: IRomDetail;
  right?: IRomDetail;
}


export interface IRomCard extends IRomRange {
  score: number;
  description: string;
  value_1_min: number;
  value_1_max: number;
  value_2_min: number;
  value_2_max: number;
}

export interface IRomRange {
  normal_bad: number;
  normal_warning: number;
  normal_normal: number;
  max_value: number;
}

export interface IRomGraph {
  values : number[];
  values2 : number[];
}

export interface IRomHistory {
  history_by_measure_type: Record<string, number>;
}

export interface IRomDetail extends IRomCard, IRomHistory {
  sn: number;
  measure_sn: number;
  user_sn: number;
  user_name: string;
  gender: string; 
  measure_seq: number;
  measure_type: number;
  reg_date: string;
  measure_overlay_scale_factor_x: number;
  measure_overlay_scale_factor_y: number;
  measure_server_file_name: string;
  measure_server_json_name: string;
  measure_server_mat_json_name: string;
  measure_server_data_json_name: string;
  result_index: number;
  title: string;
  howto: string;
}

// export interface IRomRawData {
//   front_neck_left_down_angle_center_shoulder_nose: number;
//   front_neck_left_down_angle_upper_shoulder_shoulder_nose: number;
//   front_neck_left_down_angle_shoulder_center_shoulder_nose: number;
//   front_neck_left_down_velocity: number;
//   front_neck_right_down_angle_center_shoulder_nose: number;
//   front_neck_right_down_angle_upper_shoulder_shoulder_nose: number;
//   front_neck_right_down_angle_shoulder_center_shoulder_nose: number;
//   front_neck_right_down_velocity: number;
//   front_shoulder_left_up_angle_under_shoulder_shoulder_wrist: number;
//   front_shoulder_left_up_angle_under_shoulder_shoulder_elbow: number;
//   front_shoulder_left_up_angle_shoulder_elbow_wrist: number;
//   front_shoulder_left_up_velocity: number;
//   front_shoulder_right_up_angle_under_shoulder_shoulder_wrist: number;
//   front_shoulder_right_up_angle_under_shoulder_shoulder_elbow: number;
//   front_shoulder_right_up_angle_shoulder_elbow_wrist: number;
//   front_shoulder_right_up_velocity: number;
//   front_upper_body_left_down_angle_center_hip_center_shoulder: number;
//   front_upper_body_left_down_angle_upper_hip_center_hip_center_sho: number;
//   front_upper_body_left_down_angle_shoulder: number;
//   front_upper_body_left_down_angle_shoulder_3_point: number;
//   front_upper_body_left_down_velocity: number;
//   front_upper_body_right_down_angle_center_hip_center_shoulder: number;
//   front_upper_body_right_down_angle_upper_hip_center_hip_center_sh: number;
//   front_upper_body_right_down_angle_shoulder: number;
//   front_upper_body_right_down_angle_shoulder_3_point: number;
//   front_upper_body_right_down_velocity: number;
//   front_leg_left_up_angle_under_hip_hip_ankle: number;
//   front_leg_left_up_angle_under_hip_hip_knee: number;
//   front_leg_left_up_angle_hip_knee_ankle: number;
//   front_leg_left_up_angle_hip_ankle: number;
//   front_leg_left_up_angle_hip_knee: number;
//   front_leg_left_up_velocity: number;
//   front_leg_right_up_angle_under_hip_hip_ankle: number;
//   front_leg_right_up_angle_under_hip_hip_knee: number;
//   front_leg_right_up_angle_hip_knee_ankle: number;
//   front_leg_right_up_angle_hip_ankle: number;
//   front_leg_right_up_angle_hip_knee: number;
//   front_leg_right_up_velocity: number;
//   side_left_neck_down_angle_hip_ear: number;
//   side_left_neck_down_angle_shoulder_ear: number;
//   side_left_neck_down_angle_upper_hip_hip_ear: number;
//   side_left_neck_down_angle_upper_shoulder_shoulder_ear: number;
//   side_left_neck_down_velocity: number;
//   side_left_neck_up_angle_hip_ear: number;
//   side_left_neck_up_angle_shoulder_ear: number;
//   side_left_neck_up_angle_upper_hip_hip_ear: number;
//   side_left_neck_up_angle_upper_shoulder_shoulder_ear: number;
//   side_left_neck_up_velocity: number;
//   side_left_shoulder_up_angle_under_shoulder_shoulder_wrist: number;
//   side_left_shoulder_up_angle_under_shoulder_shoulder_elbow: number;
//   side_left_shoulder_up_angle_shoulder_elbow_wrist: number;
//   side_left_shoulder_up_angle_shoulder_wrist: number;
//   side_left_shoulder_up_angle_shoulder_elbow: number;
//   side_left_shoulder_up_velocity: number;
//   side_left_shoulder_back_angle_under_shoulder_shoulder_wrist: number;
//   side_left_shoulder_back_angle_under_shoulder_shoulder_elbow: number;
//   side_left_shoulder_back_angle_shoulder_elbow_wrist: number;
//   side_left_shoulder_back_angle_shoulder_wrist: number;
//   side_left_shoulder_back_angle_shoulder_elbow: number;
//   side_left_shoulder_back_velocity: number;
//   side_left_elbow_wrist_rotate_up_angle_elbow_wrist: number;
//   side_left_elbow_wrist_rotate_up_angle_horizontal_elbow_elbow_wri: number;
//   side_left_elbow_wrist_rotate_up_velocity: number;
//   side_left_elbow_wrist_rotate_down_angle_elbow_wrist: number;
//   side_left_elbow_wrist_rotate_down_angle_horizontal_elbow_elbow_w: number;
//   side_left_elbow_wrist_rotate_down_velocity: number;
//   side_left_elbow_wrist_up_angle_under_elbow_elbow_wrist: number;
//   side_left_elbow_wrist_up_angle_shoulder_elbow_wrist: number;
//   side_left_elbow_wrist_up_velocity: number;
//   side_left_upper_body_down_angle_under_hip_hip_shoulder: number;
//   side_left_upper_body_down_angle_hip_shoulder: number;
//   side_left_upper_body_down_angle_hip_shoulder_wrist: number;
//   side_left_upper_body_down_angle_hip_knee_ankle: number;
//   side_left_upper_body_down_angle_knee_hip_shoulder: number;
//   side_left_upper_body_down_distance_toe_mid_finger: number;
//   side_left_upper_body_down_distance_toe_index_finger: number;
//   side_left_upper_body_down_velocity: number;
//   side_left_upper_body_back_angle_upper_hip_hip_shoulder: number;
//   side_left_upper_body_back_angle_hip_shoulder: number;
//   side_left_upper_body_back_angle_upper_hip_waist_shoulder: number;
//   side_left_upper_body_back_velocity: number;
//   side_left_leg_up_angle_under_hip_hip_ankle: number;
//   side_left_leg_up_angle_under_hip_hip_knee: number;
//   side_left_leg_up_angle_hip_knee_ankle: number;
//   side_left_leg_up_angle_hip_ankle: number;
//   side_left_leg_up_velocity: number;
//   side_left_leg_back_angle_under_hip_hip_ankle: number;
//   side_left_leg_back_angle_under_hip_hip_knee: number;
//   side_left_leg_back_angle_hip_knee_ankle: number;
//   side_left_leg_back_angle_hip_ankle: number;
//   side_left_leg_back_velocity: number;
//   side_left_knee_up_angle_under_knee_knee_ankle: number;
//   side_left_knee_up_angle_knee_ankle: number;
//   side_left_knee_up_velocity: number;
//   side_left_foot_up_angle_knee_ankle_toe: number;
//   side_left_foot_up_velocity: number;
//   side_left_foot_down_angle_knee_ankle_toe: number;
//   side_left_foot_down_velocity: number;
//   side_right_neck_down_angle_hip_ear: number;
//   side_right_neck_down_angle_shoulder_ear: number;
//   side_right_neck_down_angle_upper_hip_hip_ear: number;
//   side_right_neck_down_angle_upper_shoulder_shoulder_ear: number;
//   side_right_neck_down_velocity: number;
//   side_right_neck_up_angle_hip_ear: number;
//   side_right_neck_up_angle_shoulder_ear: number;
//   side_right_neck_up_angle_upper_hip_hip_ear: number;
//   side_right_neck_up_angle_upper_shoulder_shoulder_ear: number;
//   side_right_neck_up_velocity: number;
//   side_right_shoulder_up_angle_under_shoulder_shoulder_wrist: number;
//   side_right_shoulder_up_angle_under_shoulder_shoulder_elbow: number;
//   side_right_shoulder_up_angle_shoulder_elbow_wrist: number;
//   side_right_shoulder_up_angle_shoulder_wrist: number;
//   side_right_shoulder_up_angle_shoulder_elbow: number;
//   side_right_shoulder_up_velocity: number;
//   side_right_shoulder_back_angle_under_shoulder_shoulder_wrist: number;
//   side_right_shoulder_back_angle_under_shoulder_shoulder_elbow: number;
//   side_right_shoulder_back_angle_shoulder_elbow_wrist: number;
//   side_right_shoulder_back_angle_shoulder_wrist: number;
//   side_right_shoulder_back_angle_shoulder_elbow: number;
//   side_right_shoulder_back_velocity: number;
//   side_right_elbow_wrist_rotate_up_angle_elbow_wrist: number;
//   side_right_elbow_wrist_rotate_up_angle_horizontal_elbow_elbow_wr: number;
//   side_right_elbow_wrist_rotate_up_velocity: number;
//   side_right_elbow_wrist_rotate_down_angle_elbow_wrist: number;
//   side_right_elbow_wrist_rotate_down_angle_horizontal_elbow_elbow_: number;
//   side_right_elbow_wrist_rotate_down_velocity: number;
//   side_right_elbow_wrist_up_angle_under_elbow_elbow_wrist: number;
//   side_right_elbow_wrist_up_angle_shoulder_elbow_wrist: number;
//   side_right_elbow_wrist_up_velocity: number;
//   side_right_upper_body_down_angle_under_hip_hip_shoulder: number;
//   side_right_upper_body_down_angle_hip_shoulder: number;
//   side_right_upper_body_down_angle_hip_shoulder_wrist: number;
//   side_right_upper_body_down_angle_hip_knee_ankle: number;
//   side_right_upper_body_down_angle_knee_hip_shoulder: number;
//   side_right_upper_body_down_distance_toe_mid_finger: number;
//   side_right_upper_body_down_distance_toe_index_finger: number;
//   side_right_upper_body_down_velocity: number;
//   side_right_upper_body_back_angle_upper_hip_hip_shoulder: number;
//   side_right_upper_body_back_angle_hip_shoulder: number;
//   side_right_upper_body_back_angle_upper_hip_waist_shoulder: number;
//   side_right_upper_body_back_velocity: number;
//   side_right_leg_up_angle_under_hip_hip_ankle: number;
//   side_right_leg_up_angle_under_hip_hip_knee: number;
//   side_right_leg_up_angle_hip_knee_ankle: number;
//   side_right_leg_up_angle_hip_ankle: number;
//   side_right_leg_up_velocity: number;
//   side_right_leg_back_angle_under_hip_hip_ankle: number;
//   side_right_leg_back_angle_under_hip_hip_knee: number;
//   side_right_leg_back_angle_hip_knee_ankle: number;
//   side_right_leg_back_angle_hip_ankle: number;
//   side_right_leg_back_velocity: number;
//   side_right_knee_up_angle_under_knee_knee_ankle: number;
//   side_right_knee_up_angle_knee_ankle: number;
//   side_right_knee_up_velocity: number;
//   side_right_foot_up_angle_knee_ankle_toe: number;
//   side_right_foot_up_velocity: number;
//   side_right_foot_down_angle_knee_ankle_toe: number;
//   side_right_foot_down_velocity: number;
//   back_left_apley_distance_mid_finger: number;
//   back_left_apley_distance_index_finger: number;
//   back_left_apley_angle_left_shoulder_elbow_wrist: number;
//   back_left_apley_angle_right_shoulder_elbow_wrist: number;
//   back_right_apley_distance_mid_finger: number;
//   back_right_apley_distance_index_finger: number;
//   back_right_apley_angle_left_shoulder_elbow_wrist: number;
//   back_right_apley_angle_right_shoulder_elbow_wrist: number;
// }

export type titles = 
  '[정면] 목 가쪽 굽힘 검사 - 왼쪽' |
  '[정면] 목 가쪽 굽힘 검사 - 오른쪽' |
  '[측면] 목 굽힘 검사' | 
  '[측면] 목 폄 검사' | 
  '[정면] 어깨 벌림 검사 - 왼쪽' | 
  '[정면] 어깨 벌림 검사 - 오른쪽' | 
  '[왼측면] 어깨 굽힘 검사' | 
  '[오른측면] 어깨 굽힘 검사' | 
  '[왼측면] 어깨 폄검사' | 
  '[오른측면] 어깨 폄검사' | 
  '[왼측면] 어깨 가쪽 돌림 검사' | 
  '[오른측면] 어깨 가쪽 돌림 검사' | 
  '[왼측면] 어깨 안쪽 돌림 검사' | 
  '[오른측면] 어깨 안쪽 돌림 검사' | 
  '[왼측면] 팔꿉 관절 굽힘 검사' | 
  '[오른측면] 팔꿉 관절 굽힘 검사' | 
  '[정면] 몸통 왼쪽 가쪽 굽힘' | 
  '[정면] 몸통 오른쪽 가쪽 굽힘' | 
  '[측면] 몸통 굽힘 검사' | 
  '[측면] 몸통 폄 검사' | 
  '[정면] 왼쪽 엉덩관절 벌림 검사' | 
  '[정면] 오른쪽 엉덩관절 벌림 검사' | 
  '[왼측면] 엉덩관절 굽힘 검사' | 
  '[오른측면] 엉덩관절 굽힘 검사' | 
  '[왼측면] 엉덩관절 폄검사' | 
  '[오른측면] 엉덩관절 폄검사' |

    
  '[왼측면] 무릎관절 굽힘 검사' |
  '[오른측면] 무릎관절 굽힘 검사' |
  '[왼측면] 왼쪽 발등 굽힘 검사' |
  '[왼측면] 왼쪽 발바닥 굽힘 검사' |
  '[오른측면] 왼쪽 발등 굽힘 검사' |
  '[오른측면] 왼쪽 발바닥 굽힘 검사';
  