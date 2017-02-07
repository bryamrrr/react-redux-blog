module.exports = {
  entry: './src/client.jsx',
  output: {
    filename: 'app.js',
    path: './build/statics'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2016', 'es2017', 'react'],
          plugins: ['transform-es2015-modules-commonjs']
        }
      }
    ]
  },
  target: 'web'
};