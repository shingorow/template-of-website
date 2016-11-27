const webpack = require("webpack");
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
  entry: './src/scripts/index.js',
  output: {
    path: __dirname + '/assets/scripts',
    filename: 'bundle.js',
		publicPath: '/assets/',
  },
  module: {
    preLoaders: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        query: {
          type: 'babel'
        }
      }
    ],
    loaders: [
     { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015'] } },
    ]
  },
  resolve: {
      extensions: ['', '.js']
  },
  plugins: [
    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      "Tether": 'tether',
      "window.Tether": "tether"
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ]
}, {
  entry: { style: './src/stylesheet/index.js' },
  output: { path: path.join(__dirname, 'assets/stylesheets/'), filename: 'bundle.css' },
  module: { loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize") },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?minimize") },
      { test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' },
      { test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' }
    ] },
    plugins: [
      new ExtractTextPlugin("bundle.css")
    ]
}]
