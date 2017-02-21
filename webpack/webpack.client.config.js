const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/client.jsx',
  output: {
    filename: 'app.js',
    path: './build/statics'
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
          presets: ['es2016', 'es2017', 'react'],
          plugins: ['transform-es2015-modules-commonjs']
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
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [
    new ExtractTextPlugin('../statics/styles.css')
  ]
};