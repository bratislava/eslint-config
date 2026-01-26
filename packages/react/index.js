/**
 * @bratislava/eslint-config-react
 *
 * ESLint configuration for React projects (without Next.js).
 * Extends base config with React-specific rules and plugins.
 */

import { baseConfig } from "@bratislava/eslint-config";
import tanstackQuery from "@tanstack/eslint-plugin-query";
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
 * Import plugin rules
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
 * Creates a React ESLint configuration.
 *
 * @param {Object} options - Configuration options
 * @param {string[]} [options.ignores] - Additional patterns to ignore
 * @returns {Array} ESLint flat config array
 *
 * @example
 * // eslint.config.mjs
 * import { createReactConfig } from '@bratislava/eslint-config-react'
 *
 * export default createReactConfig({
 *   ignores: ['src/generated/**'],
 * })
 */
export function createReactConfig(options = {}) {
  const { ignores = [] } = options;

  return [
    // Base configuration (eslint, typescript, prettier, security, sonarjs, etc.)
    ...baseConfig,

    // React-specific configs
    ...tanstackQuery.configs["flat/recommended"],
    ...tailwindcss.configs["flat/recommended"],

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

    // Language options (extend base with browser globals and JSX)
    {
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          ...globals.browser,
        },
      },
    },

    // React settings
    {
      settings: {
        react: {
          version: "detect",
        },
      },
    },

    // Frontend rules and overrides
    {
      rules: {
        ...frontendRules,
        ...reactRules,
        "sonarjs/different-types-comparison": "off", // TODO consider removing
      },
    },

    // Ignore patterns
    {
      ignores: [
        "dist/**",
        "build/**",
        "node_modules/**",
        "coverage/**",
        "*.config.js",
        "*.config.mjs",
        "*.config.ts",
        "eslint.config.js",
        "eslint.config.mjs",
        "**/*.svg",
        ...ignores,
      ],
    },
  ];
}

/**
 * Default React configuration.
 * For customization, use createReactConfig() instead.
 */
export default createReactConfig();
