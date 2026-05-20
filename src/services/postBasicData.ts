import axios from "axios";
import type { IReportDetail } from "../types/basic";


export const postBasicData = async (encryptedData: string): Promise<IReportDetail> => {
  // BASE_URL을 무시하고 vercel.json에 설정한 source 경로를 직접 입력
  const { data } = await axios.post(`/admin_api/report`, { 
    t_r: encryptedData 
  });
  
  return data.data;
};