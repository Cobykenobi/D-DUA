const js = require('@eslint/js');
const globals = require('globals');

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
    plugins: {},
    rules: {},
  },
];
