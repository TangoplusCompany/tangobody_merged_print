import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(( ) => {

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        // 1. 기존 파일 서버용 프록시
        '/proxy-data': {
          // 도메인까지만 target으로 설정합니다.
          target: 'https://gym.tangoplus.co.kr', 
          changeOrigin: true,
          // rewrite에서 실제 백엔드 경로인 /data/Results를 붙여줍니다.
          rewrite: (path) => path.replace(/^\/proxy-data/, '/data/Results'),
          secure: false,
        },
        // 2. API 서버용 프록시 추가 (로컬용)
        '/admin_api': {
          target: 'https://gym.tangoplus.co.kr', // 백엔드 도메인
          changeOrigin: true,
          // rewrite가 없으면 '/admin_api'가 포함된 주소 그대로 전달됩니다.
          secure: false,
        },
      },
    },
  };
});