const { configure } = require('quasar/wrappers');
module.exports = configure(function (ctx) {
  return {
    boot: ['i18n', 'axios', 'GlobalVariables', 'vuelidate', 'moment', 'image-viewer'],
    css: ['app.scss'],
    extras: ['roboto-font', 'material-icons', 'fontawesome-v5'],
    build: {
      vueRouterMode: 'hash',
      publicPath: '',
      gzip: true,
      extendWebpack (cfg) {
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