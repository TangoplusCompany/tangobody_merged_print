import axios from "axios";
import type { IGaitResponse } from "../types/gait";


export const postGaitData = async (encryptedData: string): Promise<IGaitResponse> => {
  const { data } = await axios.post(`/x-7a8f/gait-report`, { 
    t_r: encryptedData 
  });
  
  return data.data;
};