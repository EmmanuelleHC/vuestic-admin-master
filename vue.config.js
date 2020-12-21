const path = require('path')
const StylelintPlugin = require('stylelint-webpack-plugin')

const lintOnSave = true

module.exports = {
  lintOnSave,
  transpileDependencies: [
    'vuestic-ui',
    'epic-spinners',
  ],
  pages: {
    index: {
      // entry for the page
      entry: 'src/app/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Approval',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },
  devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        disableHostCheck: true,
        port: 8080,
        public: 'http://sd6webdev.indomaret.lan:8080/approval',
        proxy: 'http://sd6webdev.indomaret.lan:8000/',




       // proxy: 'http://sd6webdev.indomaret.lan:8000/'
    },
  publicPath: "/",
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
      },
    },
    plugins: [
      ...(
        (!lintOnSave && process.env.NODE_ENV === 'development') ? [] : [new StylelintPlugin({
          files: ['src/**/*.{vue,htm,html,css,sss,less,scss}'],
        })]
      ),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        // Preload vuestic-ui variables and mixins for every component
        data: '@import "~vuestic-ui/src/components/vuestic-sass/resources/resources.scss";',
      },
    },
  },
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/service-worker.js',
      importWorkboxFrom: 'local',
    },
  },
}
