import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import genezioLocalSDKReload from "@genezio/vite-plugin-genezio";
export default defineConfig({
  plugins: [react(), genezioLocalSDKReload()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
