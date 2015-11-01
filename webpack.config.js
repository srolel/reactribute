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
  // module: {
  //   loaders: [
  //     { test: /\.js$/, loader: 'babel-core', include: path.join(__dirname, 'src') }
  //   ]
  // },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
