import os
import shutil
import re

def migrate():
    # 1. Update package.json
    package_json = {
      "name": "quasar_sat",
      "version": "1.0.0",
      "dependencies": {
        "@quasar/extras": "^1.0.0",
        "@vuelidate/core": "^2.0.0",
        "@vuelidate/validators": "^2.0.0",
        "axios": "^1.6.0",
        "chart.js": "^4.0.0",
        "crypto-js": "^4.2.0",
        "date-fns": "^2.30.0",
        "downloadjs": "^1.4.7",
        "jquery": "^3.7.1",
        "lodash": "^4.17.21",
        "moment": "^2.29.4",
        "quasar": "^2.18.0",
        "v-viewer": "^3.0.0",
        "vue": "^3.4.0",
        "vue-i18n": "^9.0.0",
        "vue-router": "^4.0.0",
        "vuex": "^4.0.0",
        "core-js": "^3.33.0"
      },
      "devDependencies": {
        "@quasar/app-webpack": "^3.12.0",
        "autoprefixer": "^10.4.16",
        "babel-loader": "^9.1.3",
        "@babel/core": "^7.23.0",
        "@babel/preset-env": "^7.23.0",
        "@quasar/babel-preset-app": "^2.0.2",
        "eslint": "^8.0.0",
        "eslint-plugin-vue": "^9.0.0",
        "postcss": "^8.4.31",
        "sass": "^1.32.12",
        "sass-loader": "^12.0.0",
        "webpack": "^5.0.0"
      },
      "scripts": {
        "dev": "quasar dev",
        "build": "quasar build"
      }
    }
    import json
    with open('package.json', 'w') as f:
        json.dump(package_json, f, indent=2)

    # 2. Reorganize
    if os.path.exists('src/statics'):
        if os.path.exists('public'): shutil.rmtree('public')
        shutil.move('src/statics', 'public')
    if os.path.exists('src/plugins'):
        if os.path.exists('src/boot'): shutil.rmtree('src/boot')
        shutil.move('src/plugins', 'src/boot')

    # 3. quasar.conf.js
    quasar_conf = """const { configure } = require('quasar/wrappers');
module.exports = configure(function (ctx) {
  return {
    boot: ['i18n', 'axios', 'GlobalVariables', 'vuelidate', 'moment', 'image-viewer'],
    css: ['app.scss'],
    extras: ['roboto-font', 'material-icons', 'fontawesome-v5'],
    build: {
      vueRouterMode: 'hash',
      publicPath: '',
      gzip: true,
      extendWebpack (cfg) {}
    },
    devServer: { port: 8081, open: true },
    framework: {
      plugins: ['Notify', 'Dialog', 'Loading', 'LocalStorage', 'SessionStorage']
    }
  };
});"""
    with open('quasar.conf.js', 'w') as f:
        f.write(quasar_conf)

    # 4. styles
    if os.path.exists('src/css/app.styl'):
        os.rename('src/css/app.styl', 'src/css/app.scss')
    with open('src/css/quasar.variables.scss', 'w') as f:
        f.write('')

    # 5. transform files
    tag_renames = {
        'q-layout-header': 'q-header', 'q-layout-drawer': 'q-drawer', 'q-layout-footer': 'q-footer',
        'q-item-main': 'q-item-section', 'q-item-side': 'q-item-section', 'q-item-tile': 'q-item-label',
        'q-list-header': 'q-item-label header', 'q-card-main': 'q-card-section', 'q-card-title': 'q-card-section',
        'q-card-separator': 'q-separator', 'q-item-separator': 'q-separator', 'q-modal': 'q-dialog',
        'q-popover': 'q-menu', 'q-collapsible': 'q-expansion-item', 'q-tab-pane': 'q-tab-panel',
        'q-datetime': 'q-input', 'q-search': 'q-input', 'q-alert': 'q-banner', 'q-card-media': 'q-img',
    }

    typography_renames = {
        'q-headline': 'text-h5', 'q-title': 'text-h6', 'q-subheading': 'text-subtitle1',
        'q-body-1': 'text-body1', 'q-body-2': 'text-body2', 'q-caption': 'text-caption',
    }

    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.vue') or file.endswith('.js'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Tags
                for old_tag, new_tag in tag_renames.items():
                    content = re.sub(rf'<{old_tag}(\s|/?>)', rf'<{new_tag}\1', content, flags=re.I)
                    content = re.sub(rf'</\s*{old_tag}\s*>', rf'</{new_tag}>', content, flags=re.I)
                    content = content.replace(f'</{old_tag}', f'</{new_tag}') # Catch split tags

                # mapGetters typos
                content = re.sub(r"mapGetters\s*\(\s*['\"]([^'\"]+)['\"]\s*\[", r"mapGetters('\1', [", content)
                content = re.sub(r"mapActions\s*\(\s*['\"]([^'\"]+)['\"]\s*\[", r"mapActions('\1', [", content)

                # .sync
                content = re.sub(r':([^.]+)\.sync="([^"]+)"', r'v-model:\1="\2"', content)

                # Scoped slots
                content = re.sub(r'slot="([^"]+)"\s+slot-scope="([^"]+)"', r'v-slot:\1="\2"', content)
                content = re.sub(r'slot-scope="([^"]+)"\s+slot="([^"]+)"', r'v-slot:\2="\1"', content)

                # Typography
                for old_c, new_c in typography_renames.items():
                    content = content.replace(old_c, new_c)

                # Vuelidate
                content = content.replace('vuelidate/lib/validators', '@vuelidate/validators')
                content = content.replace('@vuelidate/validators/common', '@vuelidate/validators')

                # Vue.http
                if 'Vue.http' in content:
                    content = content.replace('Vue.http', 'api')
                    if 'import { api }' not in content:
                        rel = os.path.relpath('src/boot/axios', os.path.dirname(path))
                        if not rel.startswith('.'): rel = './' + rel
                        content = f"import {{ api }} from '{rel}';\n" + content

                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)

if __name__ == "__main__":
    migrate()
