import axios from "axios";
import type { IBiaData } from "../types/bia";


export const postGaitData = async (encryptedData: string): Promise<IBiaData> => {
  const { data } = await axios.post(`/x-7a8f/gait-report`, { 
    t_r: encryptedData 
  });
  
  return data.data;
};