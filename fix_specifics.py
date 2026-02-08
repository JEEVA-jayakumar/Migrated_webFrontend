import re

def fix_specifics():
    # 1. src/router/routes.js
    with open('src/router/routes.js', 'r') as f:
        content = f.read()
    content = content.replace('import deactivelist from "../pages/sat/deactivelist"', 'import deactivelist from "../pages/sat/DeactiveList"')
    content = content.replace('path: "*"', 'path: "/:catchAll(.*)*"')
    with open('src/router/routes.js', 'w') as f:
        f.write(content)

    # 2. src/pages/inventory/PhonepeInventory.vue
    with open('src/pages/inventory/PhonepeInventory.vue', 'r') as f:
        content = f.read()
    content = content.replace('PhonepeopenAddBulkDeviceModelComp', 'PhonePeopenAddBulkDeviceModelComp')
    with open('src/pages/inventory/PhonepeInventory.vue', 'w') as f:
        f.write(content)

if __name__ == "__main__":
    fix_specifics()
