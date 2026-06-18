import axios from "axios";
import type { IReportDetail } from "../types/basic";


export const postBasicData = async (encryptedData: string): Promise<IReportDetail> => {
  const { data } = await axios.post(`/x-7a8f/results`, { 
    t_r: encryptedData 
  });
  
  return data.data;
};