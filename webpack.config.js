const Path = require('path');

module.exports = {
    entry: "./src/Client.ts",
    output: {
        filename: "discord.js",
        path: Path.resolve(__dirname, 'src/js')
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }]
    }
}