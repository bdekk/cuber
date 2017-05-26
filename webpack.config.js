module.exports = {
    context: __dirname + "/app",
    entry: './index.ts',
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};
