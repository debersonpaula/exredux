const path = require('path');
const webpack = require('webpack');
const rootDir = path.resolve(__dirname, '../');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port: '8001',
    hot: true,
    open: true,
    historyApiFallback: true
  },
  entry: [path.join(rootDir, 'playground/index.tsx')],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [path.join(process.cwd(), 'node_modules')]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsConfigPathsPlugin()]
  },
  output: {
    filename: 'index.js',
    path: path.join(rootDir, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(rootDir, 'playground/index.html'),
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
