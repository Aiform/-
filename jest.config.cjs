module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest', // 处理 .vue 文件
        '^.+\\.ts$': ['ts-jest', {
            tsconfig: 'tsconfig.json', // 指定 TypeScript 配置
            isolatedModules: true,     // 提升性能
        }],
        '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',  // 别名 @ → src
        '\\.(css|scss)$': 'identity-obj-proxy', // 模拟 CSS
    },
    testMatch: ['**/tests/**/*.spec.[jt]s?(x)'], // 测试文件匹配规则
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // 测试初始化脚本
};