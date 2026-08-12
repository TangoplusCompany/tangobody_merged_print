import axios from "axios";

export const customJsonAxios = axios.create({
  baseURL: "/zp6-1a", // Vite 프록시 사용
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export async function getMeasureJson(json_path: string) {
  let formattedPath = json_path;

  if (formattedPath.startsWith("/data/Results")) {
    formattedPath = formattedPath.replace("/data/Results", "");
  } else if (formattedPath.startsWith("data/Results")) {
    formattedPath = formattedPath.replace("data/Results", "");
  }

  const cleanPath = formattedPath.startsWith("/") ? formattedPath : `/${formattedPath}`;

  const response = await customJsonAxios.get(cleanPath);
  return response.data;
}