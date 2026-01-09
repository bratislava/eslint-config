/**
 * @bratislava/eslint-config/react
 *
 * ESLint configuration for React projects (without Next.js).
 * Extends base config with React-specific rules and plugins.
 */

import eslint from '@eslint/js'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import noUnsanitized from 'eslint-plugin-no-unsanitized'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import security from 'eslint-plugin-security'
import sonarjs from 'eslint-plugin-sonarjs'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import {
  disabledRules,
  eslintRules,
  simpleImportSortConfig,
  sonarjsRules,
  typescriptRules,
} from './index.js'
import { importRules, jsxA11yRules,reactRules } from './next.js'

/**
 * Frontend-specific rules (same as Next.js config, without Next.js-specific rules)
 */
const frontendRules = {
  // Console warnings instead of errors for frontend
  'no-console': 'warn',

  // Return statement formatting
  'padding-line-between-statements': [
    'warn',
    { blankLine: 'always', prev: '*', next: 'return' },
  ],

  // Empty function allowed (common in React)
  '@typescript-eslint/no-empty-function': 'off',

  // Misused promises config for React event handlers
  '@typescript-eslint/no-misused-promises': [
    'error',
    { checksVoidReturn: { attributes: false } },
  ],
  '@typescript-eslint/no-floating-promises': 'warn',
}

/**
 * Creates a React ESLint configuration.
 *
 * @param {Object} options - Configuration options
 * @param {string[]} [options.ignores] - Additional patterns to ignore
 * @returns {Array} ESLint flat config array
 *
 * @example
 * // eslint.config.mjs
 * import { createReactConfig } from '@bratislava/eslint-config/react'
 *
 * export default createReactConfig({
 *   ignores: ['src/generated/**'],
 * })
 */
export function createReactConfig(options = {}) {
  const { ignores = [] } = options

  return tseslint.config(
    // Base configs
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylistic,
    prettier,
    simpleImportSortConfig,
    security.configs.recommended,
    noUnsanitized.configs.recommended,
    sonarjs.configs.recommended,
    tanstackQuery.configs['flat/recommended'],

    // React and related plugins
    {
      plugins: {
        react,
        'react-hooks': reactHooks,
        import: importPlugin,
        'jsx-a11y': jsxA11y,
      },
      rules: {
        ...reactRules,
        ...importRules,
        ...jsxA11yRules,
      },
    },

    // Language options
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          ...globals.browser,
          ...globals.es2021,
        },
      },
    },

    // React settings
    {
      settings: {
        react: {
          version: 'detect',
        },
      },
    },

    // Main rules
    {
      rules: {
        ...typescriptRules,
        ...eslintRules,
        ...sonarjsRules,
        ...disabledRules,
        ...frontendRules,

        // SonarJS additional config for frontend
        'sonarjs/different-types-comparison': 'off',
      },
    },

    // Ignore patterns
    {
      ignores: [
        'dist/**',
        'build/**',
        'node_modules/**',
        'coverage/**',
        '*.config.js',
        '*.config.mjs',
        '*.config.ts',
        'eslint.config.js',
        'eslint.config.mjs',
        '**/*.svg',
        ...ignores,
      ],
    },
  )
}

/**
 * Default React configuration.
 * For customization, use createReactConfig() instead.
 */
export default createReactConfig()
