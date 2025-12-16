import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-template-curly-in-string": "warn",
    },
    plugin: { js },
    extends: ["js/recommended"]
  },
]);