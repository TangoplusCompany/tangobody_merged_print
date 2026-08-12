import axios from "axios";
import type { IMoireResponse } from "../types/moire";


export const postMoireData = async (encryptedData: string): Promise<IMoireResponse> => {
  const { data } = await axios.post(`/x-7a8f/moire-report`, { 
    t_r: encryptedData 
  });
  
  return data.data;
};