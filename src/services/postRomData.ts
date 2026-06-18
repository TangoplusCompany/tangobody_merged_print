import axios from "axios";
import type { IRomDetail } from "../types/rom";


export const postROMData = async (encryptedData: string): Promise<IRomDetail[]> => {
  // BASE_URL을 무시하고 vercel.json에 설정한 source 경로를 직접 입력
  const { data } = await axios.post(`/x-7a8f/rom-report`, { 
    t_r: encryptedData 
  });
  
  return data.data;
};