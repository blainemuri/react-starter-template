const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})
const ReactPlugin = new webpack.ProvidePlugin({ React: 'react' })

let cssLoaderQuery = 'css-loader?modules'
if (process.env.NODE_ENV !== 'production') {
  cssLoaderQuery += '&localIdentName=[path][name]---[local]'
}

var config = {
  context: __dirname + '/',
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: '[hash].js',
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    contentBase: __dirname + '/',
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: [ "babel-preset-es2015" ].map(require.resolve)
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [ "babel-preset-es2015" ].map(require.resolve)
        },
        exclude: /node_modules/,
      },
      {
        test: /\.styl/,
        use: ['style-loader', cssLoaderQuery, 'postcss-loader', 'stylus-loader?resolve url']
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, ReactPlugin]
}

module.exports = config
