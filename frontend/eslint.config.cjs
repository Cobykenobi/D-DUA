const js = require('@eslint/js');
const globals = require('globals');
const reactPlugin = require('eslint-plugin-react');

function cleanGlobals(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.trim(), value])
  );
}

module.exports = [
  {
    ignores: ['node_modules', 'dist'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...cleanGlobals(globals.browser),
        ...cleanGlobals(globals.node),
      },
    },
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['tests/**'],
    languageOptions: {
      globals: {
        ...cleanGlobals(globals.jest),
        ...cleanGlobals(globals.node),
      },
    },
  },
];
