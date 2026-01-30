// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      "i18n",
      "vuelidate",
      "vue-resource",
      "moment",
      "image-viewer",
      "GlobalVariables",

    ],
    css: ["app.styl", "../assets/css/style.css"],
    extras: [
      ctx.theme.mat ? "roboto-font" : null,
      "material-icons", // optional, you are not bound to it
      "ionicons",
      "mdi",
      "fontawesome",
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      vueRouterMode: "hash",

      //this public path is for stagging
      // publicPath: "frontend",

      // this publicPath is for production
      publicPath: "",

      // vueCompiler: true,
      gzip: true,
      uglifyOptions: {
        compress: {},
        output: null,
        ie8: true,
        safari10: true,
      },
      // analyze: true,
      extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          // loader: "eslint-loader",
          exclude: /(node_modules|quasar)/,
        });
      },
    },
    devServer: {
      // https: true,
      // host: '0.0.0.0',
      compress: true,
      port: 8081,
      open: true, // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        "QChipsInput",
        "QPullToRefresh",
        "QTooltip",
        "QAutocomplete",
        "QInnerLoading",
        "QSpinnerGears",
        "QProgress",
        "QAlert",
        "QBreadcrumbs",
        "QBreadcrumbsEl",
        "QSpinner",
        "QSpinnerBars",
        "QAjaxBar",
        "QEditor",
        "QLayout",
        "QLayoutHeader",
        "QLayoutDrawer",
        "QPageContainer",
        "QPage",
        "QToolbar",
        "QToolbarTitle",
        "QBtn",
        "QBtnDropdown",
        "QBtnToggle",
        "QSelect",
        "QIcon",
        "QList",
        "QListHeader",
        "QItem",
        "QItemMain",
        "QItemSide",
        "QItemTile",
        "QItemSeparator",
        "QDatetimePicker",
        "QDatetime",
        "QTable",
        // pick only what you are using from:
        "QSearch",
        "QTh",
        "QTr",
        "QTd",
        "QTableColumns",
        //popover
        "QCard",
        "QCardTitle",
        "QCardMedia",
        "QPopover",
        "QCardActions",
        "QCardSeparator",
        "QCardMain",
        //chip
        "QChip",
        //uploader
        "QUploader",
        //Collapsible
        "QCollapsible",
        //input
        "QInput",
        "QField",
        "QRadio",
        "QOptionGroup",
        "QCheckbox",
        //carousal
        "QToggle",
        "QCarousel",
        "QCarouselSlide",
        //tabs
        "QTabs",
        "QTab",
        "QTabPane",
        //model
        "QModal",
        //Rating
        "QRating",
        //Color pciker
        "QColorPicker",
        //Scrollbar
        "QScrollArea",
        "QColor",
        //Stepper
        "QStepper",
        "QStep",
        "QStepperNavigation",
        "QRouteTab"
      ],
      directives: ["Ripple", "CloseOverlay"],
      // Quasar plugins
      plugins: [
        "Notify",
        "Dialog",
        "Loading",
        "SessionStorage",
        "LocalStorage",
      ],
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    animations: "all",
    // --- includes all animations
    // animations: [],
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: "Bijlipay",
        short_name: "Bijlipay",
        description: "One stop platform for management of bijlipay",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#531a64",
        icons: [
          // {
          //   src: "statics/logo.png",
          //   sizes: "16x16",
          //   type: "image/png",
          // },
          {
            src: "statics/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          // {
          //   'src': 'statics/icons/icon-256x256.png',
          //   'sizes': '256x256',
          //   'type': 'image/png'
          // },
          // {
          //   'src': 'statics/icons/icon-384x384.png',
          //   'sizes': '384x384',
          //   'type': 'image/png'
          // },
          // {
          //   'src': 'statics/icons/icon-512x512.png',
          //   'sizes': '512x512',
          //   'type': 'image/png'
          // }
        ],
      },
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      },
    },
  };
};
