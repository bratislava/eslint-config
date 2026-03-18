/**
 * @bratislava/eslint-config-nest
 *
 * ESLint configuration for NestJS backend projects.
 * Extends base config with NestJS-specific rules and plugins.
 */

import { baseConfig } from "@bratislava/eslint-config";
import eslintNestJs from "@darraghor/eslint-plugin-nestjs-typed";
import json from "@eslint/json";
import jest from "eslint-plugin-jest";
import globals from "globals";

/**
 * NestJS-specific rules
 */
const nestRules = {
  // We're used to style without this, extra typing with little value
  "@darraghor/nestjs-typed/api-property-returning-array-should-set-array":
    "off",
};

/**
 * Backend-specific rules
 */
const backendRules = {
  // Enforce logger use instead of console
  "no-console": "error",
};

/**
 * Jest test file configuration
 */
const jestConfig = {
  files: ["**/*.spec.ts", "**/*.test.ts"],
  plugins: {
    jest,
  },
  rules: {
    // Use jest version of unbound-method
    "@typescript-eslint/unbound-method": "off",
    "jest/unbound-method": "error",
    // Allow unused vars in tests (common with mocking)
    "@typescript-eslint/no-unused-vars": "warn",
  },
};

/**
 * Creates a NestJS ESLint configuration.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.tsconfigRootDir] - Root directory for TypeScript config (defaults to process.cwd())
 * @param {string[]} [options.ignores] - Additional patterns to ignore
 * @returns {Array} ESLint flat config array
 *
 * @example
 * // eslint.config.mjs
 * import { createNestConfig } from '@bratislava/eslint-config-nest'
 *
 * export default createNestConfig({
 *   tsconfigRootDir: import.meta.dirname,
 *   ignores: ['src/generated-clients/*'],
 * })
 */
export function createNestConfig(options = {}) {
  const { tsconfigRootDir = process.cwd(), ignores = [] } = options;

  return [
    // Base configuration (eslint, typescript, prettier, security, sonarjs, etc.)
    ...baseConfig,

    // NestJS plugin
    ...eslintNestJs.configs.flatRecommended,

    // JSON support
    {
      plugins: {
        json,
      },
    },
    {
      files: ["**/*.json"],
      ignores: ["package-lock.json"],
      language: "json/json",
      ...json.configs.recommended,
    },

    // Language options (extend base with node globals and tsconfigRootDir)
    {
      languageOptions: {
        parserOptions: {
          tsconfigRootDir,
        },
        globals: {
          ...globals.node,
        },
      },
    },

    // NestJS and backend-specific rules
    {
      rules: {
        ...nestRules,
        ...backendRules,
      },
    },

    // Jest config for test files
    jestConfig,

    // Default ignores
    {
      ignores: [
        "dist/**",
        "node_modules/**",
        "coverage/**",
        "*.config.js",
        "*.config.mjs",
        "*.config.ts",
        "eslint.config.js",
        "eslint.config.mjs",
        "eslint.config.ts",
        ...ignores,
      ],
    },
  ];
}

/**
 * Default NestJS configuration.
 * For customization, use createNestConfig() instead.
 */
export default createNestConfig();
