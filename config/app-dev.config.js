module.exports = require('tsrx/tools/tsReactConfig').tsReactConfigValidator({
  source: 'playground',
  outputPath: 'dist',
  nodeEnv: {},
  host: 'localhost',
  port: 8001,
  reactHotLoader: true,
  devServer: {
    hot: true,
    open: true
  }
});
