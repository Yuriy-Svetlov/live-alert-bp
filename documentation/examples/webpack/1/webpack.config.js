
const path = require('path'),
  webpack = require('webpack'),
  ESLintPlugin = require('eslint-webpack-plugin'),
  StylelintPlugin = require('stylelint-webpack-plugin'),
  express = require('express'),
  chokidar = require('chokidar'),
  LiveAlert = require('./webpack.livealert.config');

const 
  liveAlert = new LiveAlert();


module.exports = {
  stats: "normal",	
  mode: 'development',
  devtool: 'inline-source-map',	
  entry: './src/index.js',
  watchOptions: {
    ignored: /node_modules/,
  },  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new ESLintPlugin({ formatter: liveAlert.formatterESLint }),
    new StylelintPlugin({
      customSyntax: 'postcss-scss',
      failAfterError: true,
      fix: false,
      formatter: liveAlert.formatterStylelint,
    }),
    liveAlert
  ], 
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
	        {
		        loader: 'style-loader',
	        },
	        'css-loader'
        ],
      },
    ],
  },
  devServer: {
    liveReload: true,
    hot: true,
    hotOnly: false,
    writeToDisk: false,
    contentBase: './dist',   
  },
};
