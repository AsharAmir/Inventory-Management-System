import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        structuredClone: 'readonly',  // Make structuredClone available globally
      },
      parser: '@typescript-eslint/parser',  // Enable TypeScript support
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      react: pluginReact,
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Add any custom rules if needed
    },
    // Directly include the configurations rather than using `extends`
    ...pluginJs.configs.recommended,  // JavaScript recommended rules
    ...tseslint.configs.recommended, // TypeScript recommended rules
    ...pluginReact.configs.flat.recommended, // React recommended rules
  },
];
