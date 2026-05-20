import CryptoJS from "crypto-js";

export interface IActionPrintCryptoProps {
  sn: number;
  user_uuid: string;
  receiver: string;
}

// 1. 환경 변수 가져오기 (Vite 방식)
const rawKey = import.meta.env.VITE_TANGO_SECRET_KEY ?? "";
const rawIv = import.meta.env.VITE_TANGO_SECRET_IV ?? "";

// 2. 키와 IV 생성
// Node의 createHash("sha256")와 동일한 로직
const key = CryptoJS.SHA256(rawKey); 
const iv = CryptoJS.enc.Utf8.parse(rawIv);

export const actionPrintEncrypt = async (
  data: IActionPrintCryptoProps,
): Promise<string> => {
  if (!rawKey || !rawIv) {
    return "ERROR";
  }

  try {
    // 3. AES-256-CBC 암호화
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data), 
      key, 
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7, // Node.js Cipher의 기본 패딩
      }
    );

    // 결과값을 Base64 문자열로 반환
    return encrypted.toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    return "ERROR";
  }
};