// eslint.config.js
import js from '@eslint/js';
import vueParser from 'vue-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
    // 基础规则
    js.configs.recommended,

    // Vue 文件配置
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                sourceType: 'module'
            }
        },
        plugins: {
            vue: vuePlugin
        },
        rules: {
            // Vue 相关规则
            'vue/multi-word-component-names': 'off'
        }
    },

    // TypeScript 配置
    {
        files: ['**/*.ts'],
        plugins: {
            '@typescript-eslint': tsPlugin
        },
        rules: {
            // TS 相关规则
            '@typescript-eslint/no-explicit-any': 'warn'
        }
    }
];