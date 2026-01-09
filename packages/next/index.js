/**
 * @bratislava/eslint-config-next
 *
 * ESLint configuration for Next.js frontend projects.
 * Extends base config with Next.js, React, and i18n-specific rules.
 */

import {
  disabledRules,
  eslintRules,
  simpleImportSortConfig,
  sonarjsRules,
  typescriptRules,
} from "@bratislava/eslint-config";
import eslint from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import prettier from "eslint-config-prettier";
import i18next from "eslint-plugin-i18next";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * React-specific rules
 */
export const reactRules = {
  "react/function-component-definition": [
    2,
    { namedComponents: "arrow-function" },
  ],
  "react/require-default-props": "off",
  "react/react-in-jsx-scope": "off",
  "react/jsx-no-useless-fragment": [2, { allowExpressions: true }],
  "react/display-name": "off",
};

/**
 * Import plugin rules (relaxed for Next.js)
 */
export const importRules = {
  "import/prefer-default-export": "off",
  "import/extensions": "off",
  "import/no-unresolved": "off",
  "import/namespace": "off",
  "import/default": "off",
  "import/no-duplicates": "off",
  "import/no-named-as-default": "off",
  "import/no-named-as-default-member": "off",
};

/**
 * JSX A11y rules
 */
export const jsxA11yRules = {
  "jsx-a11y/anchor-is-valid": "off",
  "jsx-a11y/img-redundant-alt": "warn",
};

/**
 * Next.js-specific rules
 */
const nextRules = {
  "@next/next/no-img-element": "off",
  "no-underscore-dangle": [
    2,
    { allow: ["__NEXT_DATA__", "__NEXT_LOADED_PAGES__", "__typename"] },
  ],
};

/**
 * Frontend-specific rules
 */
const frontendRules = {
  // Console warnings instead of errors for frontend
  "no-console": "warn",

  // Return statement formatting
  "padding-line-between-statements": [
    "warn",
    { blankLine: "always", prev: "*", next: "return" },
  ],

  // Empty function allowed (common in React)
  "@typescript-eslint/no-empty-function": "off",

  // Misused promises config for React event handlers
  "@typescript-eslint/no-misused-promises": [
    "error",
    { checksVoidReturn: { attributes: false } },
  ],
  "@typescript-eslint/no-floating-promises": "warn",

  // i18next rules (disabled by default, enable in project if needed)
  "i18next/no-literal-string": "off",
};

/**
 * Creates a Next.js ESLint configuration.
 *
 * @param {Object} options - Configuration options
 * @param {string[]} [options.ignores] - Additional patterns to ignore
 * @returns {Array} ESLint flat config array
 *
 * @example
 * // eslint.config.mjs
 * import { createNextConfig } from '@bratislava/eslint-config-next'
 *
 * export default createNextConfig({
 *   ignores: ['services/graphql/**'],
 * })
 */
export function createNextConfig(options = {}) {
  const { ignores = [] } = options;

  return tseslint.config(
    // Next.js flat config
    nextPlugin.flatConfig.recommended,
    nextPlugin.flatConfig.coreWebVitals,

    // React and related plugins
    {
      plugins: {
        react,
        "react-hooks": reactHooks,
        import: importPlugin,
        "jsx-a11y": jsxA11y,
      },
      rules: {
        ...reactRules,
        ...importRules,
        ...jsxA11yRules,
        ...nextRules,
      },
    },

    // Language options
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
        },
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.es2021,
        },
      },
    },

    // Base configs
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylistic,
    prettier,
    simpleImportSortConfig,
    security.configs.recommended,
    noUnsanitized.configs.recommended,
    sonarjs.configs.recommended,
    i18next.configs["flat/recommended"],
    tanstackQuery.configs["flat/recommended"],
    ...tailwindcss.configs["flat/recommended"],

    // Main rules
    {
      rules: {
        ...typescriptRules,
        ...eslintRules,
        ...sonarjsRules,
        ...disabledRules,
        ...frontendRules,

        // SonarJS additional config for frontend
        "sonarjs/different-types-comparison": "off",
      },
    },

    // Next.js pages directory config
    {
      files: [
        "**/pages/**/*.{js,jsx,ts,tsx}",
        "**/src/pages/**/*.{js,jsx,ts,tsx}",
      ],
      rules: {
        "react/display-name": "off",
      },
    },

    // Ignore patterns
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
        "next-env.d.ts",
        "**/*.svg",
        ".next/**",
        "out/**",
        ...ignores,
      ],
    }
  );
}

/**
 * Default Next.js configuration.
 * For customization, use createNextConfig() instead.
 */
export default createNextConfig();
