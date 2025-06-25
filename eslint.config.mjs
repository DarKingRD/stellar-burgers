// eslint.config.mjs
import js from '@eslint/js';
import globals from 'globals';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

export default [
  js.configs.recommended,
  reactRecommended,
  {
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Disable this rule
    },
  },
];