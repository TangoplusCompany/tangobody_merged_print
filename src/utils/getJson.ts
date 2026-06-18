"use server";

import axios from "axios";

export async function getJson(json_path: string) {
  // 호출할 때 앞부분에 /proxy-data를 붙입니다.
  // 실제 요청은 브라우저가 아니라 Vite 개발 서버가 대신 쏴주기 때문에 CORS가 발생하지 않습니다.
  const response = await axios.get(`/zp6-1a/${json_path}`);
  return response.data;
}