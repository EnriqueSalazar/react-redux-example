let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let StatsPlugin = require('stats-webpack-plugin');
let CompressionPlugin = require("compression-webpack-plugin");
let zlib = require('zlib');

console.info('Loading webpack.production.config');
console.info('Server environment', process.env.NODE_ENV);

//this webpack building configuration decreases the size of a 13Mb dist file into less than 450Kb!
module.exports = {
  entry: [
    path.join(__dirname, 'index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      warnings: false,
      screw_ie8: true
    }),
    new StatsPlugin('webpack.stats.json', {
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false,
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 1024,
      minRatio: 0.3
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: ['transform-runtime'],
          presets: [ "es2015", "stage-0","react", "react-hmre"]
        }
      },      {test: /bootstrap.+\.(jsx|js)$/, loader: 'imports?jQuery=jquery,$=jquery,this=>window'},
      {test: /(\.css)$/, loader: "style!css"},
      {test: /\.png$/, loader: "url-loader?limit=100000"},
      {test: /\.jpg$/, loader: "file-loader"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
    ]
  }
}
