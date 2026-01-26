/**
 * @bratislava/eslint-config-next
 *
 * ESLint configuration for Next.js frontend projects.
 * Extends base config with Next.js, React, and i18n-specific rules.
 */

import { baseConfig } from "@bratislava/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import i18next from "eslint-plugin-i18next";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";

/**
 * React-specific rules overrides
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
  "react/no-array-index-key": "warn",
  "react/destructuring-assignment": "warn",
  "react/no-unused-prop-types": "warn",
  "react/style-prop-object": "warn",
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
  "@typescript-eslint/no-confusing-void-expression": "off",

  "jsx-a11y/control-has-associated-label": "warn",
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

  return [
    // Base configuration (eslint, typescript, prettier, security, sonarjs, etc.)
    ...baseConfig,

    // Next.js flat config
    nextPlugin.flatConfig.recommended,
    nextPlugin.flatConfig.coreWebVitals,

    // React & React hooks recommended configs
    reactHooks.configs.flat.recommended,
    react.configs.flat.recommended,
    react.configs.flat["jsx-runtime"], // Recommended by the docs if using React 17+

    // JSX A11y recommended config
    jsxA11y.flatConfigs.recommended,

    // Import rules (plugin registered in base config)
    {
      rules: {
        ...importRules,
      },
    },

    // Language options (extend base with browser/node globals)
    {
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
    },

    // Next.js specific configs
    i18next.configs["flat/recommended"],
    ...tanstackQuery.configs["flat/recommended"],
    ...tailwindcss.configs["flat/recommended"],

    // Frontend rules and overrides
    {
      rules: {
        ...frontendRules,
        ...reactRules,
        ...nextRules,
        "sonarjs/different-types-comparison": "off", // TODO consider removing
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
    },
  ];
}

/**
 * Default Next.js configuration.
 * For customization, use createNextConfig() instead.
 */
export default createNextConfig();
