export default [
  {
    languageOptions: {
      globals: {
        browser: 'readonly',
        node: 'readonly'
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    rules: {
      'no-console': 'warn',
      'semi': ['error', 'always']
    }
  }
]; 