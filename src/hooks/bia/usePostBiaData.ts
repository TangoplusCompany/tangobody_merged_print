import { useMutation } from "@tanstack/react-query";
import { postBiaData } from "../../services/postBiaData";

export const usePostBiaData = () => {
  const mutation = useMutation({
    mutationFn: postBiaData,
  });
  
  const biaDetail = mutation.data ? mutation.data : undefined;

  return {
    ...mutation,
    biaDetail,
  };
};