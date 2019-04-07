module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-use-v-if-with-v-for': false,
    'no-underscore-dangle': [0],
    'consistent-return': [0],
    'no-prototype-builtins': [0],
    'class-methods-use-this': [0],
    'no-shadow': [0],
    'import/prefer-default-export': [0],
    'prefer-promise-reject-errors': [0],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
