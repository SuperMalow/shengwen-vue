import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

import path from "path";

const __dirname = path.resolve();

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5173, // 开发服务器端口
    hosts: true, // 允许主机名访问
    allowedHosts: ['localhost', '127.0.0.1'], // 允许的访问主机名列表
  },
});
