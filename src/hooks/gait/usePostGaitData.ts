import { useMutation } from "@tanstack/react-query";
import { postGaitData } from "../../services/postGaitData";

export const usePostGaitData = () => {
  const mutation = useMutation({
    mutationFn: postGaitData,
  });
  
  const biaDetail = mutation.data ? mutation.data : undefined;

  return {
    ...mutation,
    biaDetail,
  };
};