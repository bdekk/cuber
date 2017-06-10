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
        ],
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            // {test: /\.(jpe?g|png|gif|svg|json)$/i, loader: "file-loader?name=/public/assets/[name].[ext]"}
            
        ]
    }, 
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"]
    }
};
