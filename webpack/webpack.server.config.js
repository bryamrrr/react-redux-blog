const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/server.jsx',
  output: {
    filename: 'index.js',
    path: './build/server'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['latest-minimal', 'react']
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
            use: 'css-loader?modules',
        }),
      }
    ]
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [
    new ExtractTextPlugin('../statics/styles.css')
  ]
};