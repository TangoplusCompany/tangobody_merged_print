import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(( ) => {

  return {
    plugins: [react()],
    css: {
      // 이 부분을 추가하거나 수정해 주세요!
      transformer: 'postcss', // lightningcss가 설정되어 있다면 제거하거나 포스트시스로 변경
      minify: 'esbuild',      // 압축 방식을 esbuild로 강제 지정
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        '/proxy-data': {
          target: 'https://gym.tangoplus.co.kr', 
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy-data/, '/data/Results'),
          secure: false,
        },
        '/admin_api': {
          target: 'https://gym.tangoplus.co.kr', 
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});