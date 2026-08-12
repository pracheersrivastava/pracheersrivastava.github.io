import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [checker({ typescript: true })],
  worker: {},
  // Width of the CRT text area in scene units. The upstream project supplied
  // this as a global from an external helper script; defining it at build time
  // keeps the render loop from depending on a third-party CDN being up.
  define: {
    screenWidth: 1.396,
  },
  build: {
    sourcemap: false,
  },
  server: {
    open: true,
    port: 1234,
    host: "localhost",
  },
});
