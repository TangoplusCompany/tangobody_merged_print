import { useMutation } from "@tanstack/react-query";
import { postBasicData } from "../../services/postBasicData";

export const usePostBasicData = () => {
  const mutation = useMutation({
    mutationFn: postBasicData,
  });

  // 단일 IReportDetail 객체로 취급 (필요 시 변환 함수 적용)
  const basicDetail = mutation.data ? mutation.data : undefined;

  return {
    ...mutation,
    basicDetail,
  };
};