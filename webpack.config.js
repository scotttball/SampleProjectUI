const webpack = require('webpack');

module.exports = {
  entry: {
    app: './container/App.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: /container/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-assign']
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  output: {
    filename: './bundle.js'
  }
};
