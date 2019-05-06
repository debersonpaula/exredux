const path = require("path");
const rootDir = path.resolve(__dirname, "../");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  entry: [path.join(rootDir, "deploy/index.ts")],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/,
        query: {
          declaration: true
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  output: {
    filename: "index.js",
    path: path.join(rootDir, "dist"),
    library: "exredux",
    libraryTarget: "umd",
    publicPath: "/dist/",
    umdNamedDefine: true
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          compress: true,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  externals: {
    redux: {
      commonjs: "redux",
      commonjs2: "redux",
      amd: "redux",
      root: "redux"
    },
    "react-redux": {
      commonjs: "react-redux",
      commonjs2: "react-redux",
      amd: "react-redux",
      root: "react-redux"
    },
    rxjs: {
      commonjs: "rxjs",
      commonjs2: "rxjs",
      amd: "rxjs",
      root: "rxjs"
    },
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  }
};
