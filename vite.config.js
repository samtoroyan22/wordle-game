import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/wordle-game/", // Укажи имя твоего репозитория
  plugins: [react()],
});
