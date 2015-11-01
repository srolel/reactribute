var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './build/index',
  output: {
    filename: 'dist/reactibute.js',
    libraryTarget: 'umd',
    library: 'reactribute'
  },
  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ]
};
