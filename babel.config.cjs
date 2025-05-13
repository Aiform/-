module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: { node: 'current' },
            modules: 'auto' // 自动识别 ESM/CommonJS
        }]
    ]
};