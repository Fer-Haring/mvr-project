module.exports = {
  '**/*.ts?(x)': [
    'npx eslint --ext .ts --ext .tsx --max-warnings 0',
    'npx prettier --check',
    (fileNames) => `npx cspell --no-must-find-files ${fileNames.join(' ')}`,
  ],
  '*.js': 'eslint --cache --fix',
  '*.{js,css,md,json}': 'prettier --write',
};