var path = require('path');
var webpack = require('webpack');

// sample config file, not production ready
module.exports = {
  entry: './src/sprinklesClientBundle.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'build.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: /src/,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  }
};
