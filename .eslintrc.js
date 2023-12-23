module.exports = {
  root: true,
  plugins: [
    '@nx',
    '@typescript-eslint/eslint-plugin',
    'prettier',
    'simple-import-sort',
  ],
  overrides: [
    {
      files: ['*.ts', '*.js'],
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['*.ts'],
      extends: ['plugin:@nx/typescript'],
      rules: {},
    },
    {
      files: ['*.js'],
      extends: ['plugin:@nx/javascript'],
      rules: {},
    },
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
