const { configure } = require('quasar/wrappers');
const path = require('path');
module.exports = configure(function (ctx) {
  return {
    boot: ['i18n', 'axios', 'GlobalVariables', 'vuelidate', 'moment', 'image-viewer', 'stubs'],
    css: ['app.scss'],
    extras: ['roboto-font', 'material-icons', 'fontawesome-v5'],
    build: {
      vueRouterMode: 'hash',
      publicPath: '',
      gzip: true,
      extendWebpack (cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          'vue-barcode-scanner': path.resolve(__dirname, './src/stubs/index.js'),
          'vue-pdfjs': path.resolve(__dirname, './src/stubs/index.js'),
          'vue-json-excel': path.resolve(__dirname, './src/stubs/index.js'),
          'vue-radial-progress': path.resolve(__dirname, './src/stubs/index.js'),
          'vue-chartjs': path.resolve(__dirname, './src/stubs/index.js'),
          'vuetify': path.resolve(__dirname, './src/stubs/index.js'),
          'babel-types': path.resolve(__dirname, './src/stubs/index.js'),
          'vue-resource': path.resolve(__dirname, './src/stubs/index.js'),
          'http': path.resolve(__dirname, './src/stubs/index.js'),
          'https': path.resolve(__dirname, './src/stubs/index.js'),
          'fs': path.resolve(__dirname, './src/stubs/index.js'),
          'path': path.resolve(__dirname, './src/stubs/index.js'),
          'vuelidate': path.resolve(__dirname, './node_modules/@vuelidate/core')
        };
        cfg.module.rules.forEach(rule => {
          if (rule.oneOf) {
            rule.oneOf.forEach(oneOfRule => {
              if (oneOfRule.use) {
                oneOfRule.use.forEach(loader => {
                  if (loader.loader && loader.loader.includes('sass-loader')) {
                    loader.options = {
                      ...loader.options,
                      api: 'legacy'
                    };
                  }
                });
              }
            });
          }
        });
      }
    },
    devServer: { port: 8081, open: true },
    framework: {
      plugins: ['Notify', 'Dialog', 'Loading', 'LocalStorage', 'SessionStorage']
    }
  };
});
