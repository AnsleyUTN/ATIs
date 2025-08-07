import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * @file eslint.config.js
 * @description The main ESLint configuration file for the project.
 * This file uses the modern "flat config" format to define linting rules.
 * The configuration is set up to lint JavaScript and JSX files, enforce React Hooks rules,
 * and support Vite's Fast Refresh feature.
 */

export default defineConfig([
  // Global ignores: Specifies files and folders that ESLint should completely ignore.
  // This is similar to a .gitignore file but for linting.
  globalIgnores(['dist']),
  {
    // The `files` property specifies which files this configuration object should apply to.
    files: ['**/*.{js,jsx}'],

    // The `extends` property applies a set of predefined rules from other configurations.
    // This is a convenient way to get a solid base of linting rules without defining them manually.
    extends: [
      // Recommended rules from ESLint itself for general JavaScript best practices.
      js.configs.recommended,
      // Enforces the "Rules of Hooks" to prevent common bugs in React components.
      reactHooks.configs['recommended-latest'],
       // Rules specific to Vite's Fast Refresh (Hot Module Replacement).
      // It ensures components are compatible with HMR.
      reactRefresh.configs.vite,
    ],

    // `languageOptions` defines how the parser should interpret your code.
    languageOptions: {
      // Sets the JavaScript version used for the syntax.
      ecmaVersion: 2020,
      // Defines global variables available in the browser environment (e.g., `window`, `document`).
      globals: globals.browser,
       // Additional parser options.
      parserOptions: {
        // Sets the ECMAScript version for parsing. "latest" ensures support for new features.
        ecmaVersion: 'latest',
        // Enables support for JSX syntax.
        ecmaFeatures: { jsx: true },
        // Specifies that the code uses ES modules (e.g., `import` and `export`).
        sourceType: 'module',
      },
    },

     // The `rules` property allows you to customize or override specific rules.
    rules: {
       // Overrides the default "no-unused-vars" rule.
      // It ignores variables that are not used if their names start with a capital letter or underscore.
      // This is useful for component props or types that are often imported but not directly used.
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
