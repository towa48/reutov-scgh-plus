const webpack = require('webpack');

module.exports = {
  context: __dirname + '/www/js',
  entry: {
    app: './bootstrap.js'
    //vendor: ['angular']
  },
  output: {
    path: __dirname + '/www/js',
    filename: 'app-bundle.js'
  },
  externals: {
    //'commonjs angular',
    //'commonjs angular-ui-router',
  },
  devtool: 'source-map',
  plugins: [
    //new webpack.optimize.UglifyJsPlugin()
    //new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ],
  module: {
    loaders: [
      { test: /\.html$/, loader: 'raw' }
    ]
  }
};
