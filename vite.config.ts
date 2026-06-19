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
        '/x-7a8f': {
          target: 'https://gym.tangoplus.co.kr', 
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/x-7a8f/, '/admin_api'),
          secure: false,
        },
        
        '/zp6-1a': {
          target: 'https://gym.tangoplus.co.kr', 
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/zp6-1a/, '/data/Results'),
          secure: false,
        },
      },
    },
  };
});