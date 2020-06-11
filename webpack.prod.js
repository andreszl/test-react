const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = require('./webpack.config');


module.exports = merge(config, {
	mode: 'production',
	output: {
		filename: '[name].js',
		path: `${__dirname}/build/client/public`,
	},
	optimization: {
		minimize: true,
		splitChunks: {
			chunks: 'all',
		},
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
			}),
			new OptimizeCssAssetsPlugin({}),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
});
