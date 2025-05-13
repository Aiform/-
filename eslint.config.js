import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import {defineConfig} from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

// 共享的样式规则
const sharedStylisticRules = {
    "@stylistic/indent": ["error", 2],
    "@stylistic/quotes": ["error", "single"],
    "@stylistic/semi": ["error", "never"],
    "@stylistic/comma-dangle": ["error", "never"],
    "@stylistic/max-len": ["warn", {code: 100}],
};

// 共享的基础规则
const sharedBaseRules = {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-unused-vars": "off", // 由 TypeScript 版本替代
};

export default defineConfig([
    // 基础 JavaScript 配置
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: {
            stylistic,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...sharedStylisticRules,
            ...sharedBaseRules,
        },
    },

    // TypeScript 配置
    {
        files: ["**/*.ts"],
        plugins: {
            "@typescript-eslint": typescriptPlugin,
            stylistic,
        },
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: "./tsconfig.json",
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        rules: {
            ...typescriptPlugin.configs.recommended.rules,
            ...sharedStylisticRules,
            ...sharedBaseRules,
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-non-null-assertion": "warn",
        },
    },

    // Vue 配置
    {
        files: ["**/*.vue"],
        plugins: {
            vue: pluginVue,
            stylistic,
        },
        languageOptions: {
            parser: pluginVue.parser,
            parserOptions: {
                parser: typescriptParser,
                extraFileExtensions: [".vue"],
                project: "./tsconfig.json",
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                ...globals.browser,
                defineProps: "readonly",
                defineEmits: "readonly",
                defineExpose: "readonly",
                withDefaults: "readonly",
                defineOptions: "readonly",
                defineSlots: "readonly",
            },
        },
        rules: {
            ...pluginVue.configs.base.rules,
            ...pluginVue.configs["vue3-recommended"].rules,
            ...sharedStylisticRules,
            ...sharedBaseRules,
            "vue/multi-word-component-names": "off",
            "vue/component-tags-order": [
                "error",
                {
                    order: ["script", "template", "style"],
                },
            ],
            "vue/attributes-order": [
                "error",
                {
                    order: [
                        "DEFINITION",
                        "LIST_RENDERING",
                        "CONDITIONALS",
                        "RENDER_MODIFIERS",
                        "GLOBAL",
                        "UNIQUE",
                        "TWO_WAY_BINDING",
                        "OTHER_DIRECTIVES",
                        "OTHER_ATTR",
                        "EVENTS",
                        "CONTENT",
                    ],
                },
            ],
            "vue/html-self-closing": [
                "error",
                {
                    html: {
                        void: "always",
                        normal: "always",
                        component: "always",
                    },
                },
            ],
            "vue/max-attributes-per-line": [
                "warn",
                {
                    singleline: 3,
                    multiline: 1,
                },
            ],
        },
    },

    // 特定文件覆盖配置
    {
        files: ["**/tests/**/*.{js,ts}", "**/*.test.{js,ts}", "**/*.spec.{js,ts}"],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "no-console": "off",
        },
    },
]);
