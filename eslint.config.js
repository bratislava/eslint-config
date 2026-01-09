import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

/**
 * ESLint configuration for the eslint-config package itself.
 * Uses a simplified version of the base config (no TypeScript since these are JS files).
 */
export default [
  eslint.configs.recommended,
  prettier,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "smart"],
    },
  },
  {
    ignores: ["node_modules/**"],
  },
];
