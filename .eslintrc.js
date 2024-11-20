module.exports = {
  plugins: ['jest', 'promise', 'react-hooks'],
  settings: {
    'import/resolver': {
      'babel-module': {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['.'],
        alias: {
          _docs: './__docs__/',
          _tests: './__tests__/',
          _assets: './src/assets',
          _atoms: './src/components/atoms',
          _molecules: './src/components/molecules',
          _organisms: './src/components/organisms',
          _organismsShared: './src/components/organisms-shared',
          _stories: './src/components/stories',
          _templates: './src/components/templates',
          _hooks: './src/hooks',
          _locales: './src/locales',
          _contexts: './src/contexts',
          _navigations: './src/navigations',
          _network: './src/network',
          _queries: './src/queries',
          _stores: './src/stores',
          _scenes: './src/scenes',
          _services: './src/services',
          _styles: './src/styles',
          _types: './src/types',
          _utils: './src/utils',
        },
      },
    },
  },

  extends: [
    '@react-native-community/eslint-config',
    'airbnb',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  plugins: ['@tanstack/query'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', ['external', 'internal'], ['parent', 'sibling']],
        alphabetize: { caseInsensitive: false },
      },
    ],
    'jsx-a11y/href-no-hash': ['off'],
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'max-len': [
      'warn',
      {
        code: 120,
        tabWidth: 2,
        comments: 100,
        ignoreComments: false,
        ignoreTrailingComments: false,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'global-require': 0,
    'import/no-unresolved': ['off'], // for not resolved import
    'react/forbid-prop-types': ['off'], // for using objects as props
    'default-param-last': ['off'], // for default param
    '@typescript-eslint/default-param-last': 'off',
    'react/jsx-props-no-spreading': ['off'],
    'import/prefer-default-export': ['off'],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-plusplus': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'import/no-cycle': 'off', // for not resolved import
    'no-param-reassign': 'off', // to resolve zustand state overwrite
    'no-nested-ternary': 'off', // for allow nested tenrary
    '@typescript-eslint/no-nested-ternary': 'off', // for allow nested tenrary
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@tanstack/query/exhaustive-deps': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'react/require-default-props': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
  },
};
