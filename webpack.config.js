const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js?hash=[hash]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/catalog.html',
      filename: 'catalog.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/product.html',
      filename: 'product.html'

    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/404.html',
      filename: '404.html'

    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/503.html',
      filename: '503.html'

    }),
    new CopyWebpackPlugin([{
        from: __dirname + '/src/static',
        to: __dirname + '/dist/static'
      },
      {
        from: __dirname + '/src/fonts',
        to: __dirname + '/dist/fonts'
      },
    ]),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles/[name].css?hash=[hash]",
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'mdb': 'mdbootstrap',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    }),
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './postcss.config.js'
              }
            }
          }, {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),
              sassOptions: {
                includePaths: ['./node_modules']
              },
            },
          },
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]?hash=[hash]'
          }
        }],
      },
    ]
  }

};