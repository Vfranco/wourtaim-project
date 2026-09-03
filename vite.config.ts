import { defineConfig } from "vitest/config"
import tailwindcss from '@tailwindcss/vite'
import path from "node:path"

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
        }
    },
    plugins: [tailwindcss()],
    test: {
        globals: true,
        environment: "node",
        include: ["tests/**/*.test.ts"],
    }
})