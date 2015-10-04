
module.exports = {
    entry: "./src/client.js",
    output: {
        path: __dirname,
        filename: "static/js/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            { test: /\.css$/, loader: "style!css" },
            { test: /\.(sass)$/, loader: "style!css!sass?indentedSyntax=sass" },
        ]
    },
    resolve: {
      extensions: ["", ".webpack.js", ".web.js", ".js", "sass"]
    }
};
