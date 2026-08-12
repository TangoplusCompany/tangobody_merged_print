import { useMutation } from "@tanstack/react-query";
import { postMoireData } from "../../services/postMoireData";

export const usePostMoireData = () => {
  const mutation = useMutation({
    mutationFn: postMoireData,
  });
  
  const biaDetail = mutation.data ? mutation.data : undefined;

  return {
    ...mutation,
    biaDetail,
  };
};