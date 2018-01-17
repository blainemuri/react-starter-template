const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})
const DirectoryNamedWebpackPluginConfig = new DirectoryNamedWebpackPlugin({
  exclude: /node_modules/,
  transformFn: function(dirName, dirPath, webpackResolveRequest) {
    return dirName + '/index.jsx'
    return ['index.jsx', 'index.js']
  }
})

var config = {
  context: __dirname + '/', // `__dirname` is root of project
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index.bundle.js',
  },
  devServer: {
    open: true, // to open the local server in browser
    contentBase: __dirname + '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/, //Check for all js files
        loader: 'babel-loader',
        query: {
          presets: [ "babel-preset-es2015" ].map(require.resolve)
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/, //Check for all js files
        loader: 'babel-loader',
        query: {
          presets: [ "babel-preset-es2015" ].map(require.resolve)
        },
        exclude: /node_modules/,
      },
      {
        test: /\.styl/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, DirectoryNamedWebpackPluginConfig]
}

module.exports = config
