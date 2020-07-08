const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const helpers = require("./helpers");
const isDevelopment = process.env.NODE_ENV === "development";
const env = process.env.NODE_ENV;

const commonWebpackConfig = {
    mode: env || "development",
    entry: {
        polyfill: "@babel/polyfill",
        main: helpers.root("src", "main"),
    },
    resolve: {
        extensions: [".js", ".vue"],
        alias: {
            vue$: isDevelopment ? "vue/dist/vue.runtime.js" : "vue/dist/vue.runtime.min.js",
            "@": helpers.root("src"),
        },
    },
    module: {
        rules: [
            { test: /\.vue$/, loader: "vue-loader", include: [helpers.root("src")] },
            { test: /\.js$/, loader: "babel-loader", include: [helpers.root("src")] },
            {
                test: /\.css$/,
                use: [
                    isDevelopment ? "vue-style-loader" : MiniCSSExtractPlugin.loader,
                    { loader: "css-loader", options: { sourceMap: isDevelopment } },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    isDevelopment ? "vue-style-loader" : MiniCSSExtractPlugin.loader,
                    { loader: "css-loader", options: { sourceMap: isDevelopment } },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                fiber: require("fibers"),
                                indentedSyntax: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    isDevelopment ? "vue-style-loader" : MiniCSSExtractPlugin.loader,
                    { loader: "css-loader", options: { sourceMap: isDevelopment } },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                fiber: require("fibers"),
                                indentedSyntax: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new VueLoaderPlugin(), new HtmlPlugin({ template: "index.html" })],
};

module.exports = commonWebpackConfig;
