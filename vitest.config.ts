import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "./vite.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        provider: "istanbul",
        reportsDirectory: "./coverage",
        reporter: [
          "text",
          "clover",
          "json",
          [
            "html",
            {
              subdir: "html",
            },
          ],
        ],
      },
      include: ["**/*.test.?(c|m)[jt]s?(x)"],
      setupFiles: "src/tests/setup/vite-setup.ts",
    },
  }),
);
