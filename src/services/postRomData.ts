import axios from "axios";
import type { IRomDetail } from "../types/rom";

// Vite 환경 변수에서 API 기본 주소를 가져옵니다.
// const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

export const postROMData = async (encryptedData: string): Promise<IRomDetail[]> => {
  // BASE_URL을 무시하고 vercel.json에 설정한 source 경로를 직접 입력
  const { data } = await axios.post(`/admin_api/rom-report`, { 
    t_r: encryptedData 
  });
  
  return data.data;
};