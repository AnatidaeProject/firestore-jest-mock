module.exports = {
  extends: ['@upstatement', 'plugin:jest/recommended'],
  plugins: ['jest'],
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        '@upstatement',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'prettier/@typescript-eslint',
      ],

      // If need to support jsx
      //     parserOptions: {
      //       ecmaFeatures: { jsx: true }
      //     },

      /**
       * Typescript Rules
       * https://github.com/bradzacher/eslint-plugin-typescript
       * Enable your own typescript rules.
       */
      rules: {
        'no-console': 'off',
        // Prevent TypeScript-specific constructs from being erroneously flagged as unused
        '@typescript-eslint/no-unused-vars': 'off',
        // Require PascalCased class and interface names
        // '@typescript-eslint/class-name-casing': 'error',
        // Require a specific member delimiter style for interfaces and type literals
        // Default Semicolon style
        // '@typescript-eslint/member-delimiter-style': 'error',
        // Require a consistent member declaration order
        // '@typescript-eslint/member-ordering': 'error',
        // Require consistent spacing around type annotations
        // '@typescript-eslint/type-annotation-spacing': 'error',
      },
    },
  ],
};
