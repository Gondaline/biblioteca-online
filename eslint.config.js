import js from "@eslint/js";
import globals from "globals";

export default [
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
  },
];