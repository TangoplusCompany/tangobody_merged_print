// hooks/usePoseCroppedImage.ts
import { useState, useEffect } from "react";

/**
 * 순수 이미지 로드 유틸리티 함수
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error("Image source is required"));
      return;
    }

    // 💡 원본 외부 서버 주소를 Vite 프록시(/zp6-1a) 상대 경로로 자동 변환
    let finalSrc = src.replace(
      /^https?:\/\/gym\.tangoplus\.co\.kr\/data\/Results\/?/,
      "/zp6-1a/"
    );

    // 슬래시 중복(//) 방지
    finalSrc = finalSrc.replace(/\/+/g, "/").replace(":/", "://");

    const img = new Image();

    // 💡 프록시(/zp6-1a) 경로는 Same-Origin(localhost:5173) 요청이 되므로 
    // crossOrigin을 설정하지 않아야 CORS 검사를 통과합니다.
    if (!finalSrc.startsWith("data:") && !finalSrc.startsWith("/")) {
      img.crossOrigin = "anonymous";
    }

    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = finalSrc;
  });
}

/**
 * 정적 랜드마크 회전 및 크롭 처리 Hook
 */
export function useStaticLandmark(
  imageUrl: string,
  cameraOrientation: 0 | 1,
  showLine: boolean = true
): {
  resultUrl: string | null;
  loading: boolean;
} {
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imageUrl) return;

    let isCancelled = false;
    Promise.resolve().then(() => {
    if (!isCancelled) {
      setLoading(true);
    }
  });
    const draw = async () => {
      try {
        const image = await loadImage(imageUrl);
        if (isCancelled) return;

        const srcW = image.width;   // 1280
        const srcH = image.height;  // 720

        const dstW = cameraOrientation === 1 ? srcH : srcW; // 720 or 1280
        const dstH = cameraOrientation === 1 ? srcW : srcH; // 1280 or 720

        const canvas = document.createElement("canvas");
        canvas.width = dstW;
        canvas.height = dstH;
        const ctx = canvas.getContext("2d")!;

        ctx.save();
        if (cameraOrientation === 1) {
          ctx.translate(0, dstH);
          ctx.rotate(-Math.PI / 2);
        }
        ctx.drawImage(image, 0, 0, srcW, srcH);
        ctx.restore();

        // 3:4 비율 크롭
        let cropX = 0;
        let cropY = 0;
        let cropWidth = dstW;
        let cropHeight = dstH;
        const targetAspect = 3 / 4;

        if (cameraOrientation === 0) {
          cropHeight = dstH;
          cropWidth = cropHeight * targetAspect;
          cropX = (dstW - cropWidth) / 2;
          cropY = 0;
        } else {
          cropWidth = dstW;
          cropHeight = cropWidth / targetAspect;
          cropX = 0;
          cropY = (dstH - cropHeight) / 2;
        }

        const croppedCanvas = document.createElement("canvas");
        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;
        const croppedCtx = croppedCanvas.getContext("2d")!;
        croppedCtx.drawImage(
          canvas,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight
        );

        const result = croppedCanvas.toDataURL("image/png");
        if (!isCancelled) {
          setResultUrl(result);
        }
      } catch (err) {
        console.error("useStaticLandmark Image draw failed:", err);
        if (!isCancelled) {
          setResultUrl(null);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    draw();

    return () => {
      isCancelled = true;
    };
  }, [imageUrl, cameraOrientation, showLine]); // 💡 [imageUrl, cameraOrientation, showLine]만 깔끔하게 관찰

  return { resultUrl, loading };
}