module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['prettier', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser', // Vue项目作为可选
  plugins: ['prettier'], // Vue项目作为可选
  rules: {
    'no-console': 'off',
    'linebreak-style': ['error', 'unix'],
    'no-cond-assign': ['error', 'except-parens'],
    'no-unused-expressions': [
      'error',
      {
        allowTernary: true,
        allowShortCircuit: true,
        allowTaggedTemplates: true,
      },
    ],
    'import/order': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'prettier/prettier': 'error',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'global-require': 0,
    'no-param-reassign': 'off',
    'import/no-unresolved': 'off',
  },
};
