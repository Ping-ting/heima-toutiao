// 这个文件是 vue-cli 创建出来的项目的配置文件
// 在 vue.config.js 这个配置文件中，可以对整个项目的打包，构建进行全局性的配置

//  webpack 在进行打包的时候 底层用到了 node.js
// 因此 可以使用 nodejs 的核心模块
const path = require('path')
const themePath = path.join(__dirname, './src/theme.less')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'nav-bar-background-color': '#84a6ca;'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${themePath}"`
          }
        }
      }
    }
  }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://www.escook.cn',
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }
})
