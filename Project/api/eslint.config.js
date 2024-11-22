import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import"; // Import the plugin

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Specify the files you want to lint
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: "@typescript-eslint/parser", // Specify the parser for TypeScript
      parserOptions: {
        ecmaVersion: 2020, // Specify the ECMAScript version
        sourceType: "module", // Allow the use of imports
      },
    },
    plugins: {
      import: importPlugin, // Add the import plugin here
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": [
        "warn",
        { allow: ["error"] },
      ],
      "import/extensions": ["error", "ignorePackages"], // Your import rule
    },
  },
  // Include recommended configurations
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
