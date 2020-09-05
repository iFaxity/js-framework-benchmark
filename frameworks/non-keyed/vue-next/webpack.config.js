const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = (env = {}) => ({
  cache: {},
  mode: env.prod ? 'production' : 'development',
  devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
  entry: {
    main: './src/main',
  },
  output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		sourceMapFilename: '[file].map',
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      'vue': '@vue/runtime-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
})
