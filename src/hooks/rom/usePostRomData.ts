import { useMutation } from "@tanstack/react-query";
import { postROMData } from "../../services/postRomData";
import { transformToRomPairs } from "../../utils/romMapper";

export const usePostRomData = () => {
  const mutation = useMutation({
    mutationFn: postROMData,
  });

  // mutation.data가 변경되면 자동으로 pairedData가 계산됨
  const pairedData = mutation.data ? transformToRomPairs(mutation.data) : [];

  return {
    ...mutation,
    pairedData,
  };
};