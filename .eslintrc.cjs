/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: [".opencode/plugins/**/*.js"],
      parserOptions: { ecmaVersion: 2022, sourceType: "module" },
      rules: {
        "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
        "no-console": "off",
      },
    },
    {
      files: ["scripts/**/*.js", "tests/**/*.js"],
      parserOptions: { ecmaVersion: 2022, sourceType: "script" },
      rules: {
        "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
        "no-console": "off",
        "no-empty": ["error", { allowEmptyCatch: true }],
      },
    },
  ],
  ignorePatterns: ["node_modules/", "dist/", "examples/fixture-repo/"],
};
