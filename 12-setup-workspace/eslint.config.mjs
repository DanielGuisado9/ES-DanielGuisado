import globals from 'globals';
import pluginJs from '@eslint/js';
import neostandard from 'neostandard';

export default [
  {
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
  ...neostandard(
    {
      semi: ['error', 'always']
    }),
  {
    rules: {
      'no-console': 'off',
      'no-undef': 'off'
    }
  },
];
