/**
 * @bratislava/eslint-config-nest
 *
 * ESLint configuration for NestJS backend projects.
 * Extends base config with NestJS-specific rules and plugins.
 */

import { baseConfig, prettierBase } from "@bratislava/eslint-config";
import eslintNestJs from "@darraghor/eslint-plugin-nestjs-typed";
import json from "@eslint/json";
import vitest from "@vitest/eslint-plugin";
import jest from "eslint-plugin-jest";
import globals from "globals";

export { prettierBase };

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
 * Supported test runners
 */
const TEST_RUNNERS = ["jest", "vitest"];

/**
 * Rules for test files that don't depend on the test runner
 */
const testRules = {
  // Allow unused vars in tests (common with mocking)
  "@typescript-eslint/no-unused-vars": "warn",
  "dot-notation": "off", // to test private methods
  "sonarjs/no-nested-functions": "off",
  "@typescript-eslint/no-misused-spread": "off", // spreading DTOs in tests is fine, prototype is irrelevant
};

/**
 * Runner-specific replacements for @typescript-eslint/unbound-method.
 */
const testRunnerRules = {
  jest: { "jest/unbound-method": "error" },
  vitest: { "vitest/unbound-method": "error" },
};

/**
 * Test file configuration for the given runner.
 * Both plugins are always registered so consumer overrides that reference
 * `jest/*` or `vitest/*` rules keep resolving; only the matching rules are enabled.
 *
 * @param {"jest" | "vitest"} testRunner
 */
function createTestConfig(testRunner) {
  return {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    plugins: {
      jest,
      vitest,
    },
    rules: {
      "@typescript-eslint/unbound-method": "off",
      ...testRunnerRules[testRunner],
      ...testRules,
    },
  };
}

/**
 * Creates a NestJS ESLint configuration.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.tsconfigRootDir] - Root directory for TypeScript config (defaults to process.cwd())
 * @param {string[]} [options.ignores] - Additional patterns to ignore
 * @param {"jest" | "vitest"} [options.testRunner] - Test runner whose ESLint rules apply to
 *   test files (defaults to "jest")
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
  const {
    tsconfigRootDir = process.cwd(),
    ignores = [],
    testRunner = "jest",
  } = options;

  if (!TEST_RUNNERS.includes(testRunner)) {
    throw new Error(
      `@bratislava/eslint-config-nest: unknown testRunner "${testRunner}", expected one of ${TEST_RUNNERS.join(", ")}`,
    );
  }

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

    // Test file config (Jest or Vitest)
    createTestConfig(testRunner),

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
