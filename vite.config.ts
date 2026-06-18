import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [react()],
    css: {
      transformer: 'postcss', 
      minify: 'esbuild',      
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        // 💡 1. /admin_api ➡️ 관리자 API 위장 경로 (/x-7a8f)로 변경
        '/x-7a8f': {
          target: 'https://gym.tangoplus.co.kr', 
          changeOrigin: true,
          // 로컬 브라우저가 보낸 /x-7a8f를 진짜 서버 경로인 /admin_api로 가공합니다.
          rewrite: (path) => path.replace(/^\/x-7a8f/, '/admin_api'),
          secure: false,
        },
        // 💡 2. /proxy-data ➡️ 파일 서버 위장 경로 (/zp6-1a)로 변경
        '/zp6-1a': {
          target: 'https://gym.tangoplus.co.kr', 
          changeOrigin: true,
          // 로컬 브라우저가 보낸 /zp6-1a를 진짜 서버 경로인 /data/Results로 가공합니다.
          rewrite: (path) => path.replace(/^\/zp6-1a/, '/data/Results'),
          secure: false,
        },
      },
    },
  };
});