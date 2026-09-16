export const translateKoToEn = async (text: string): Promise<string> => {
  if (!text) return '';

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=${encodeURIComponent(text)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('번역 실패');

  const data = await res.json();
  // 번역된 문장 조각들을 하나로 합침
  return data[0].map((item: [string]) => item[0]).join('');
};