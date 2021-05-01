module.exports = {
  root: true,
  ignorePatterns: ['!.*.js'],
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './base.tsconfig.json',
      },
      plugins: ['@typescript-eslint', 'prettier'],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          node: {
            extensions: [
              '.js',
              '.jsx',
              '.ts',
              '.tsx',
              'd.ts',
              'spec.ts',
              'spec.tsx',
            ],
          },
        },
        react: {
          version: 'detect',
        },
      },
      rules: {
        // Disabled because we feel that this adds too much boilerplate and
        // loses the power of inference. We don't think that it brings enough
        // value to justify the price to pay.
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        // These rules are disabled because the TypeScript tooling around
        // Truffle and Web3 is not mature enough and we have to make use of
        // any-typed apis.
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        // This rule is enabled by eslint-config-airbnb and disabled by
        // eslint-plugin-prettier disables this rule:
        // https://github.com/prettier/eslint-plugin-prettier/issues/65
        // This is a rare issue and we feel like this rule improves the
        // consistency of the code so we keep it on.
        'arrow-body-style': 'warn',
        // Typescript takes care of that already
        'import/no-unresolved': 'off',
      },
      overrides: [
        {
          files: ['packages/web/src/**/*.ts', 'packages/web/src/**/*.tsx'],
          rules: {
            // On the web package we will have duplicate imports with different
            // query strings (for assets).
            'import/no-duplicates': ['warn', { considerQueryString: true }],
          },
        },
      ],
    },
  ],
  rules: {
    'arrow-body-style': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'prettier/prettier': 'warn',
  },
};
