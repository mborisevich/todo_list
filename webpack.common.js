const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: "./src/template.html",
          title: "Production"
      }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
              test: /\.html$/i,
              loader: "html-loader",
            },
            {
            test: /\.(png|jpg|gif|jpeg)$/i,
            type: 'asset/resource'
            },
        ],
      },
};