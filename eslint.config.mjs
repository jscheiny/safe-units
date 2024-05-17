// @ts-check

import eslint from "@eslint/js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
    eslint.configs.recommended,
    eslintPluginPrettierRecommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            "@stylistic/ts": stylisticTs,
        },
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/ban-types": "off",
            "@/linebreak-style": ["error", "unix"],
            "prettier/prettier": [
                "error",
                {
                    arrowParens: "avoid",
                    printWidth: 120,
                    tabWidth: 4,
                    trailingComma: "all",
                },
            ],
        },
    },
);
