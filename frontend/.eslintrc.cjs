module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: [
    "react-refresh",
    "react-hooks", //added
  ],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react-hooks/rules-of-hooks": "error", // added
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "(useMyCustomHook|useMyOtherCustomHook)",
      },
    ], // added
  },
};
