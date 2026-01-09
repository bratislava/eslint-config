/**
 * @bratislava/eslint-config
 *
 * Base/shared ESLint configuration for all Bratislava projects.
 * Contains common TypeScript and ESLint rules.
 */

import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import security from "eslint-plugin-security";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * Simple import sort plugin configuration
 */
export const simpleImportSortConfig = {
  plugins: {
    "simple-import-sort": simpleImportSort,
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};

/**
 * Common TypeScript ESLint rules used across all projects
 */
export const typescriptRules = {
  // Rules where we override eslint's type-less version with @typescript-eslint version
  "no-restricted-imports": "off",
  "@typescript-eslint/no-restricted-imports": "error",
  "no-loop-func": "off",
  "@typescript-eslint/no-loop-func": "error",
  "no-shadow": "off",
  "@typescript-eslint/no-shadow": "error",
  "@typescript-eslint/require-await": "error",

  // Other @typescript-eslint rules
  "@typescript-eslint/prefer-enum-initializers": "error",
  "@typescript-eslint/no-import-type-side-effects": "error",
  "@typescript-eslint/no-extraneous-class": [
    "error",
    {
      allowWithDecorator: true, // typical for NestJS modules and decorators
    },
  ],
  "@typescript-eslint/restrict-template-expressions": [
    "error",
    {
      allowNumber: true,
      allowBoolean: true,
      allowNullish: true,
    },
  ],
  "@typescript-eslint/promise-function-async": "error",
  "@typescript-eslint/require-array-sort-compare": "error",
  "@typescript-eslint/switch-exhaustiveness-check": "error",
};

/**
 * Common ESLint rules used across all projects
 */
export const eslintRules = {
  "sort-imports": "off", // using simple-import-sort
  "array-callback-return": "error",
  "no-constructor-return": "error",
  "no-duplicate-imports": "error",
  "no-useless-assignment": "error",
  "block-scoped-var": "error",
  "consistent-return": "error",
  "default-case-last": "error",
  "default-param-last": "error",
  "dot-notation": "error",
  eqeqeq: ["error", "smart"],
  "new-cap": ["error", { capIsNew: false }],
  "no-caller": "error",
  "no-div-regex": "error",
  "no-else-return": "error",
  "no-implicit-coercion": "error",
  "no-invalid-this": "error",
  "no-lonely-if": "error",
  "no-param-reassign": "error",
  "no-return-assign": "error",
  "no-unneeded-ternary": "error",
  "no-unused-expressions": "error",
  "no-useless-call": "error",
  "no-useless-computed-key": "error",
  "no-useless-return": "error",
  "no-var": "error",
  "object-shorthand": "error",
  "prefer-const": "error",
  "prefer-object-spread": "error",
  "prefer-template": "error",
  "require-await": "error",
  yoda: "error",
};

/**
 * Common SonarJS rule overrides
 */
export const sonarjsRules = {
  "sonarjs/todo-tag": "off", // often too noisy in active development
  "sonarjs/no-duplicate-string": "off",
  "sonarjs/prefer-immediate-return": "off",
  "sonarjs/no-useless-catch": "off",
  "sonarjs/no-commented-code": "off",
  "sonarjs/no-nested-conditional": "off",
  "sonarjs/fixme-tag": "warn",
  "sonarjs/deprecation": "warn",
};

/**
 * Common disabled rules that don't provide value for our projects
 */
export const disabledRules = {
  "max-classes-per-file": "off",
  "class-methods-use-this": "off",
  "no-useless-catch": "off",
  "no-await-in-loop": "off",
  "@typescript-eslint/return-await": "off",
  "@typescript-eslint/explicit-function-return-type": "off",
};

/**
 * Base configuration for all projects.
 * Includes ESLint recommended, TypeScript strict, Prettier, security plugins.
 */
export const baseConfig = [
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylistic,
  prettier,
  simpleImportSortConfig,
  security.configs.recommended,
  noUnsanitized.configs.recommended,
  sonarjs.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      globals: {
        ...globals.es2021,
      },
    },
  },
  {
    rules: {
      ...typescriptRules,
      ...eslintRules,
      ...sonarjsRules,
      ...disabledRules,
    },
  },
];

export default baseConfig;
