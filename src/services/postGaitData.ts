import axios from "axios";
import type { IGaitDetail } from "../types/gait";


export const postGaitData = async (encryptedData: string): Promise<IGaitDetail> => {
  const { data } = await axios.post(`/x-7a8f/gait-report`, { 
    t_r: encryptedData 
  });
  
  return data.data;
};