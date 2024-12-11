import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import parserTypescript from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        structuredClone: 'readonly',  // Explicitly define structuredClone as a global
      },
      parser: parserTypescript,  // Set the parser to @typescript-eslint/parser for TypeScript support
      parserOptions: {
        ecmaVersion: 'latest', // Use the latest ECMAScript version
        sourceType: 'module',  // Enable module syntax
        project: './tsconfig.json',  // Point to your TypeScript configuration file (if needed)
      },
    },
    plugins: {
      react: pluginReact,
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Custom rules can be added here

      // Example: Disable prop-types rule if you're using TypeScript
      'react/prop-types': 'off',  // Disable prop-types rule for TypeScript users
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],

      // Example: TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',  // Warn on unused variables
      '@typescript-eslint/explicit-module-boundary-types': 'off',  // Disable requiring explicit return types

      // Example: JavaScript rules
      'no-console': 'warn', // Warn on console statements
      'no-unused-vars': 'warn', // Warn on unused variables
    },
  },
];
