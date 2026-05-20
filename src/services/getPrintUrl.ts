export const getPrintUrl = async (encrypted: string, type: string): Promise<string> => {
  // const REPORT_PRINT_CATEGORY = 7; // 실제 카테고리 값 맞추기

  
  if (!encrypted) {
    throw new Error("Encrypted string is missing");
  }

   const baseUrl = import.meta.env.VITE_PRINT_URL ?? "";
  const t_r = encodeURIComponent(encrypted);

  // return `${baseUrl}?category=${REPORT_PRINT_CATEGORY}&t_r=${t_r}`;

  return `${baseUrl}/generate?t_r=${t_r}&type=${type}`;
};
