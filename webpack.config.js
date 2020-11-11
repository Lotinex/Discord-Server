const Path = require('path');

module.exports = {
    entry: "./src/Client.ts",
    output: {
        filename: "discord.js",
        path: Path.resolve(__dirname, 'src/public'),
        libraryTarget: 'umd',
        library: 'Discord',
        umdNamedDefine: true,
        libraryExport: 'default'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }]
    },
    optimization: {
        minimize: false
    },
}