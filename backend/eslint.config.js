const js = require('@eslint/js');
const globals = require('globals');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    ignores: ['node_modules', 'uploads'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 12,
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2021,
        ...globals.jest,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
    },
  },
];
