/**
 * @bratislava/eslint-config/nest
 *
 * ESLint configuration for NestJS backend projects.
 * Extends base config with NestJS-specific rules and plugins.
 */

import eslint from '@eslint/js'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import eslintNestJs from '@darraghor/eslint-plugin-nestjs-typed'
import prettier from 'eslint-config-prettier'
import jest from 'eslint-plugin-jest'
import noUnsanitized from 'eslint-plugin-no-unsanitized'
import security from 'eslint-plugin-security'
import sonarjs from 'eslint-plugin-sonarjs'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import {
  simpleImportSortConfig,
  typescriptRules,
  eslintRules,
  sonarjsRules,
  disabledRules,
} from './index.js'

/**
 * NestJS-specific rules
 */
const nestRules = {
  // We're used to style without this, extra typing with little value
  '@darraghor/nestjs-typed/api-property-returning-array-should-set-array': 'off',
}

/**
 * Backend-specific rules
 */
const backendRules = {
  // Enforce logger use instead of console
  'no-console': 'error',
}

/**
 * Jest test file configuration
 */
const jestConfig = {
  files: ['**/*.spec.ts', '**/*.test.ts'],
  plugins: {
    jest,
  },
  rules: {
    // Use jest version of unbound-method
    '@typescript-eslint/unbound-method': 'off',
    'jest/unbound-method': 'error',
    // Allow unused vars in tests (common with mocking)
    '@typescript-eslint/no-unused-vars': 'warn',
  },
}

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
 * import { createNestConfig } from '@bratislava/eslint-config/nest'
 *
 * export default createNestConfig({
 *   tsconfigRootDir: import.meta.dirname,
 *   ignores: ['src/generated-clients/*'],
 * })
 */
export function createNestConfig(options = {}) {
  const { tsconfigRootDir = process.cwd(), ignores = [] } = options

  return tseslint.config(
    // Base configs
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylistic,
    prettier,
    security.configs.recommended,
    noUnsanitized.configs.recommended,
    sonarjs.configs.recommended,
    eslintNestJs.configs.flatRecommended,

    // Markdown support
    ...markdown.configs.recommended,

    // JSON support
    {
      plugins: {
        json,
      },
    },
    {
      files: ['**/*.json'],
      ignores: ['package-lock.json'],
      language: 'json/json',
      ...json.configs.recommended,
    },

    // Import sorting
    simpleImportSortConfig,

    // Language options
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
        globals: {
          ...globals.node,
          ...globals.es2021,
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
        ...nestRules,
        ...backendRules,
      },
    },

    // Jest config for test files
    jestConfig,

    // Default ignores
    {
      ignores: [
        'dist/**',
        'node_modules/**',
        'coverage/**',
        '*.config.js',
        '*.config.mjs',
        '*.config.ts',
        'eslint.config.js',
        'eslint.config.mjs',
        'eslint.config.ts',
        ...ignores,
      ],
    },
  )
}

/**
 * Default NestJS configuration.
 * For customization, use createNestConfig() instead.
 */
export default createNestConfig()
