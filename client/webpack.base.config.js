var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  // the base path which will be used to resolve entry points
  context: __dirname,
  // the main entry point for our application's frontend JS
  entry: {
    app: './app/app.js',
    vendor: [
      'jquery', 
      'jquery-ujs', 
      'bootstrap-sass',
      'lodash',
      'angular',
      'angular-resource',
      'angular-animate',
      'ng-fx',
      './js/angular-ui-router',
      'angular-ui-bootstrap',
      'angular-tree-control',
      'angular-easyfb',
      'angularjs-slider',
      'angular-xeditable',
      'ui-select',
      'angularjs-color-picker/dist/angularjs-color-picker',
      'angular-timer',
      'angular-scroll',
      'tinycolor2',
      'select2',
      'sortablejs/ng-sortable',
      'filepicker-js',
      'video.js',
      'howler',
      'format-as-currency',
      'moment',
      'humanize-duration',
      'getusermedia',
      'scriptjs',
      'slick-carousel',
      'node-uuid',
      'bowser',
      'toastr',
      'js-sha256',
      './js/recorder.js',
      './app/vendor.js'
    ]
  },

  output: {
    // Write bundles to public/assets/webpack
    path: path.join(__dirname, '..', 'public', 'assets', 'webpack'),
    // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
    filename: '[name]-bundle.js',
    // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
    publicPath: 'http://localhost:8080/assets/webpack/',
    pathinfo: true
  },

  resolve: {
    // tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
    extensions: ['', '.js']
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),

    new ngAnnotatePlugin({add: true}),
    new AssetsPlugin({path: path.join(__dirname, '..', 'public', 'assets')}),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime'],
          cacheDirectory: true
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=10000hash=sha512&digest=hex&name=[name]-[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(woff2?|ttf|eot)$/i,
        loaders: [
          'url?limit=10000hash=sha512&digest=hex&name=[name]-[hash].[ext]'
        ]
      },
      // Not all apps require jQuery. Many Rails apps do, such as those using TurboLinks or
      // bootstrap js
      {test: require.resolve("jquery"), loader: "expose?$!expose?jQuery"},
      {test: require.resolve("lodash"), loader: "expose?_"},
      {test: require.resolve("sortablejs"), loader: "expose?Sortable"},
      {test: require.resolve("tinycolor2"), loader: "expose?tinycolor"},
      // videojs-contrib-hls requires this
      {test: require.resolve("video.js"), loader: "expose?videojs"},
      {test: require.resolve("angular-timer"), loader: "imports?humanizeDuration=humanize-duration,moment"},
      {test: /\.html$/, loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './app')) + '/!html'}
    ]
  },
  postcss: function () {
    return [autoprefixer]
  }
};
