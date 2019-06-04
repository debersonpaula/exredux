const path = require('path');
const rootDir = path.resolve(__dirname, '../');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: [path.join(rootDir, 'src/index.ts')],
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	output: {
		filename: 'index.js',
		path: path.join(rootDir, 'dist'),
		library: 'exredux',
		libraryTarget: 'umd',
		publicPath: '/dist/',
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
		react: {
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'React',
			root: 'React'
		},
		'react-dom': {
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			amd: 'ReactDOM',
			root: 'ReactDOM'
		},
		'axios': {
			commonjs: 'axios',
			commonjs2: 'axios',
			amd: 'axios',
			root: 'axios'
		}
	}
};
