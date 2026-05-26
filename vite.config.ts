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