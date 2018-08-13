'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const axios=require('axios');
const bodyParser = require('body-parser')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    // clientLogLevel: 'warning',
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
    //   ],
    // },
    before(app){
      app.use(bodyParser.urlencoded({extended: true}));
      const querystring = require('querystring');
      //首页api
      app.get('/api/home',function (req,res) {
        const url='https://api.bilibili.com/x/web-interface/ranking';

        axios.get(url,{
          header:{
            Host: 'api.bilibili.com',
            Origin: 'https://m.bilibili.com',
            Referer: 'https://m.bilibili.com/index.html'
          },
          params: {
            rid:1,
            day:3,
            jsonp:'jsonp'
          }
        }).then((response)=>{
          res.json(response.data);
        }).catch((e)=>{
          console.error(e);
        })
      });

      app.get('/api/animation',function (req,res) {
        let url='';
        axios.get(url,{
          header:{
            Host: 'api.bilibili.com',
            Origin: 'https://m.bilibili.com',
            Referer: 'https://m.bilibili.com/channel/1.html'
          },
          params:req.query
        }).then((response)=>{
          res.json(response.data);
        }).catch((e)=>{
          console.error(e);
        });
      });

      app.get('/api/common',function (req,res) {
        console.log("/api/common");
        let url='https://api.bilibili.com/x/web-interface/ranking/region';
        axios.get(url,{
          header:{
            Host: 'api.bilibili.com',
            Origin: 'https://m.bilibili.com',
            Referer: 'https://m.bilibili.com/channel/1.html'
          },
          params:req.query
        }).then((response)=>{
          res.jsonp(response.data);
        }).catch((e)=>{
          console.error(e);
        })
      })

      app.get('/api/recommend',function (req,res) {
        let paramsList=[];
        for(let key in req.query){
          paramsList.push(JSON.parse(req.query[key]));
        }
        axios.all([
          axios.get(`https://api.bilibili.com/x/web-interface/ranking/region?rid=${paramsList[0].id}&day=${paramsList[0].day}&jsonp=jsonp`),
          axios.get(`https://api.bilibili.com/x/web-interface/ranking/region?rid=${paramsList[1].id}&day=${paramsList[1].day}&jsonp=jsonp`),
          axios.get(`https://api.bilibili.com/x/web-interface/ranking/region?rid=${paramsList[2].id}&day=${paramsList[2].day}&jsonp=jsonp`),
          axios.get(`https://api.bilibili.com/x/web-interface/ranking/region?rid=${paramsList[3].id}&day=${paramsList[3].day}&jsonp=jsonp`),
          axios.get(`https://api.bilibili.com/x/web-interface/ranking/region?rid=${paramsList[4].id}&day=${paramsList[4].day}&jsonp=jsonp`)
        ]).then(axios.spread(function (...rest) {
          let backData=rest.map((item)=>{
            return item.data.data;
          });
          res.jsonp(backData);
        }));

      })

      app.get('/api/others',function (req,res) {
        console.log("/api/others");
        let url='https://api.bilibili.com/x/web-interface/ranking/region';
        axios.get(url,{
          header:{
            Host: 'api.bilibili.com',
            Origin: 'https://m.bilibili.com',
            Referer: 'https://m.bilibili.com/channel/1.html'
          },
          params:req.query
        }).then((response)=>{
          res.jsonp(response.data);
        }).catch((e)=>{
          console.error(e);
        })
      })

      app.get('/api/getMore',function (req,res) {
        let url='https://api.bilibili.com/archive_rank/getarchiverankbypartion';
        let params='jsonp=jsonp&tid=24&pn=1';
        axios.get(url,{
          header:{
            Host: 'api.bilibili.com',
            Origin: 'https://m.bilibili.com',
            Referer: 'https://m.bilibili.com/channel/1.html'
          },
          params:req.query
        }).then((response)=>{
          res.jsonp(response.data);
        }).catch((e)=>{
          console.error(e);
        })
      });

    },
    historyApiFallback: true,
    hot: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
    // historyApiFallback: true,
    // hot: true,
    // contentBase: false, // since we use CopyWebpackPlugin.
    // compress: true,
    // host: HOST || config.dev.host,
    // port: PORT || config.dev.port,
    // open: config.dev.autoOpenBrowser,
    // overlay: config.dev.errorOverlay
    //   ? { warnings: false, errors: true }
    //   : false,
    // publicPath: config.dev.assetsPublicPath,
    // proxy: config.dev.proxyTable,
    // quiet: true, // necessary for FriendlyErrorsPlugin
    // watchOptions: {
    //   poll: config.dev.poll,
    // }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
