'use strict'

const { join, resolve } = require('path')
const webpack = require('webpack')
const glob = require('glob')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractCSS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})

const entries = {}
const chunks = []
const htmlWebpackPluginArray = []
glob.sync('./src/pages/**/app.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
  entries[chunk] = path
  chunks.push(chunk)

  const filename = chunk + '.html'
  const htmlConf = {
    filename: filename,
    template: path.replace(/.js/g, '.html'),
    inject: 'body',
    favicon: './src/assets/img/logo.png',
    hash: true,
    chunks: ['commons', chunk]
  }
  htmlWebpackPluginArray.push(new HtmlWebpackPlugin(htmlConf))
})

const styleLoaderOptions = {
  loader: 'style-loader',
  options: {
    sourceMap: true
  }
}
const cssOptions = [
  { loader: 'css-loader', options: { sourceMap: true } },
  { loader: 'postcss-loader', options: { sourceMap: true } }
]
const config = {
  entry: entries,
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'assets/js/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      assets: join(__dirname, '../src/assets'),
      components: join(__dirname, '../src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: cssOptions,
              fallback: styleLoaderOptions
            })),
            postcss: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: cssOptions,
              fallback: styleLoaderOptions
            })),
              scss: 'vue-style-loader!css-loader!sass-loader',
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: cssOptions,
          fallback: styleLoaderOptions
        }))
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:7].[ext]'
          }
        }]
      },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 3,
          name: 'commons',
          enforce: true
        }
      }
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    extractCSS
  ]
}
config.plugins = [...config.plugins, ...htmlWebpackPluginArray]
module.exports = config
