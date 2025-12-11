import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import importPlugin from "eslint-plugin-import"

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "import": importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Import 플러그인 규칙
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "pathGroups": [
            // React를 가장 먼저 오도록 설정
            { pattern: "react", group: "external", position: "before" },
            { pattern: "react-dom/**", group: "external", position: "before" },
            { pattern: "react/**", group: "external", position: "before" },
            { pattern: "@/app/**", group: "internal", position: "before" },
            { pattern: "@/views/**", group: "internal", position: "before" },
            { pattern: "@/widgets/**", group: "internal", position: "before" },
            { pattern: "@/features/**", group: "internal", position: "before" },
            { pattern: "@/entities/**", group: "internal", position: "before" },
            { pattern: "@/shared/**", group: "internal", position: "before" },
          ],
          "pathGroupsExcludedImportTypes": ["react", "react-dom"],
          "newlines-between": "always",
          "alphabetize": {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
)
