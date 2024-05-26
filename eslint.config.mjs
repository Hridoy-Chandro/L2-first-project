

import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ESLint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        "process": "readonly"
      },
    },
  },
  {
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  },
  
  {
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions:": "error",
      "prefer-const:": "error",
      "no-console": "warn",
      "no-undef": "error",

    },
  },
  {
    ignores: ["**/node_modules/", "**/dist/"],
  }
);







