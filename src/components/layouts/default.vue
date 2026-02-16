<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="margin-left:0px" class="shadow-0 z-top" flat>
      <customHeader @fnToggleSideMenu="fnMainToggleSideMenu"></customHeader>
    </q-header>

    <q-drawer
      class="no-shadow"
      v-model="leftDrawerOpen"
      content-class="no-shadow"
      :content-style="{background: getComputedColor,width:'250px'}"
    >
      <q-scroll-area
        style="height: 100vh"
        :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#cecece',
        width: '5px',
        opacity: 0.5
      }"
        :delay="1500"
      >
        <q-list no-border link inset-delimiter highlight style="padding-top:65px">
          <div>
            <!-- Entry point for sat -->
            <div
              v-if="$q.localStorage.getItem('u_i') != undefined && showMenu.includes($ROLE_HIERARCHY_OPERATION_SAT)"
            >
              <q-item
                v-for="menu in menus.sat"
                :key="menu.id"
                :to="menu.to"
                class="menu-main-item-color"
              >
                <q-item-section class="menu-item-color">{{menu.name}}</q-item-section>
              </q-item>
            </div>

            <!-- Entry point for finance manager -->
            <div
              v-if="$q.localStorage.getItem('u_i') != undefined && (showMenu.includes($ROLE_HIERARCHY_FINANCE_HEAD) || showMenu.includes($ROLE_HIERARCHY_FINANCE_MANAGER) || showMenu.includes($ROLE_HIERARCHY_FINANCE_EXECUTIVE))"
            >
              <q-item
                v-for="menu in menus.finance"
                :key="menu.id"
                :to="menu.to"
                class="menu-main-item-color"
              >
                <q-item-section class="menu-item-color">{{menu.name}}</q-item-section>
              </q-item>
            </div>

            <!-- Entry point for inventory -->
            <div
              v-if="$q.localStorage.getItem('u_i') != undefined && showMenu.includes($ROLE_HIERARCHY_INVENTORY_OFFICER)"
            >
              <q-item
                v-for="menu in menus.inventory"
                :key="menu.id"
                :to="menu.to"
                class="menu-main-item-color"
              >
                <q-item-section class="menu-item-color">{{menu.name}}</q-item-section>
              </q-item>
            </div>
            <!-- Entry point for ksn inventory -->
            <div
              v-if="
                $q.localStorage.getItem('u_i') != undefined &&
                showMenu.includes($ROLE_HIERARCHY_KSN)
              "
            >
              <q-item
                v-for="menu in menus.ksn"
                :key="menu.id"
                :to="menu.to"
                class="menu-main-item-color"
              >
                <q-item-section class="menu-item-color">{{ menu.name }}</q-item-section>
              </q-item>
            </div>
            <!-- Entry point for opeartions head -->
            <div
              v-if="$q.localStorage.getItem('u_i') != undefined && showMenu.includes($ROLE_HIERARCHY_OPERATIONS_HEAD)"
            >
              <q-item
                v-for="menu in menus.opsHead"
                :key="menu.id"
                v-if="menu.subItems.length == 0"
                :to="menu.to"
                class="menu-main-item-color"
              >
                <q-item-section class="cursor-pointer menu-item-color">{{menu.name}}</q-item-section>
              </q-item>
              <q-item v-else>
                <q-item-section class="menu-item-color">
                  <q-expansion-item
                    dense
                    class="no-padding"
                    header-class="no-padding"
                    header-style="font-size:14px"
                    label="Reports"
                  >
                    <q-item
                      v-for="subItem in menu.subItems"
                      :key="subItem.id"
                      :to="subItem.to"
                      class="menu-main-item-color"
                    >
                      <q-item-section class="cursor-pointer menu-item-color">{{subItem.name}}</q-item-section>
                    </q-item>
                  </q-expansion-item>
                </q-item-section>
              </q-item>
            </div>

            <!-- Entry point for sales manager => RSM/ASM -->
            <div
              v-if="$q.localStorage.getItem('u_i') != undefined && (showMenu.includes($ROLE_HIERARCHY_SALES_RSM) || showMenu.includes($ROLE_HIERARCHY_SALES_ASM) || showMenu.includes($ROLE_HIERARCHY_SALES_NATIONAL_HEAD))"
            >
              <q-item
                v-for="menu in menus.salesManager"
                :key="menu.id"
                :to="menu.to"
                class="menu-main-item-color"
              >
                <q-item-section class="menu-item-color">{{menu.name}}</q-item-section>
              </q-item>
            </div>

            <!-- Entry point for sales manager => bank ops -->
            <div
              v-if="$q.localStorage.getItem('u_i') != undefined && showMenu.includes($ROLE_HIERARCHY_BANK_OPS)"
            >
              <q-item
                v-for="menu in menus.bankOps"
                :key="menu.id"
                :to="menu.to"
                class="menu-main-item-color"
              >
                <q-item-section class="menu-item-color">{{menu.name}}</q-item-section>
              </q-item>
            </div>
            
            <!-- Entry point for CRM Users -->
            <div
              v-if="$q.localStorage.getItem('u_i') != undefined && showMenu.includes($HIERARCHY_CRM)"
            >
              <q-item
                v-for="menu in menus.crm"
                :key="menu.id"
                :to="menu.to"
                class="menu-main-item-color"
              >
                <q-item-section class="menu-item-color">{{menu.name}}</q-item-section>
              </q-item>
            </div>

            <!-- Entry point for super admin/bijlipay managemnet -->
            <div
              v-if="$q.localStorage.getItem('u_i') != undefined && showMenu.includes($ROLE_BIJLIPAY_MANAGER)"
            >
              <q-item v-for="menu in menus.superAdmin" :key="menu.id" :to="menu.to">
                <q-item-section class="menu-item-color-SA">{{menu.name}}</q-item-section>
              </q-item>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <customBody></customBody>
    </q-page-container>
  </q-layout>
</template>

<script>
import customHeader from "../components/customHeader.vue";
import customBody from "../components/customBody.vue";
export default {
  components: {
    customHeader,
    customBody
  },
  name: "LayoutDefault",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
        ? this.$route.name != "leadDataEntry"

        : false,
      showMenu: [],
      menus: {
        sat: [
          {
            id: 0,
            to: "/sat/dashboard",
            name: "Dashboard"
          },
          {
            id: 1,
            to: "/sat/lead/validation",
            name: "Lead Validation"
          },
          {
            id: 2,
            to: "/sat/exception/queue",
            name: "Exception Queue"
          },
          {
            id: 3,
            to: "/sat/open/merchant/tracker",
            name: "Open Merchant tracker"
          },
          {
            id: 4,
            to: "/sat/merchant/tracker",
            name: "Merchant Tracker - TID"
          },
          {
            id: 5,
            to: "/sat/merchant/transaction/level",
            name: "Merchant Tracker - Transaction Level"
          },
          {
            id: 6,
            to: "/sat/statement/view",
            name: "Statement View"
          },
          {
            id: 7,
            to: "/sat/inventory/allocation",
            name: "Regional Inventory"
          },
          {
            id: 8,
            to: "/sat/implementation/queue",
            name: "Implementation Queue"
          },
          {
            id: 9,
            to: "/sat/master/tracker",
            name: "Master Tracker-Implemented"
          },
          {
            id: 10,
            to: "/sat/device/recovery/tracker",
            name: "Device Recovery Tracker"
          },
          // {
          //   id: 11,
          //   to: "/sat/device/recovery",
          //   name: "Device Recovery"
          // },
          {
            id: 12,
            to: "/sat/lead/lead/dataentry",
            name: "Lead Data Entry"
          },
          {
            id: 13,
            to: "/sat/lead/lead/view/audocuments",
            name: "Implemented Verification Queue"
          },
          {
            id: 78,
            to: "/sat/deactivelist",
            name: "Bijlipay De-Active List "
          },
          {
            id: 13,
            to: "/sat/device/replacement",
            name: "Device Replacement"
          }

          // {
          //   id: 12,
          //   to: "/sat/lead/device",
          //   name: "SO Device List"
          // }
          // {
          //   id: 11,
          //   to: "/sat/lead/information",
          //   name: "Lead Dat"
          // }
        ],
        finance: [
          {
            id: 1,
            to: "/finance/payment/verification/tracker",
            name: "Payment Verification Tracker"
          },
          {
            id: 2,
            to: "/finance/finance/approved/tracker",
            name: "Finance Aproved Tracker "
          },
        ],
        ksn: [
          {
            id: 77,
            to: "/inventory/ksn",
            name: "KSN Enable"
          },
        ],
        inventory: [
          {
            id: 1,
            to: "/inventory/home",
            name: "Dashboard"
          },
          {
            id: 2,
            to: "/inventory/central",
            name: "Central Inventory"
          },
          {
            id: 5,
            to: "/inventory/merchant",
            name: "Inventory with Merchant"
          },
          {
            id: 6,
            to: "/inventory/faulty",
            name: "Regional return & Faulty Inventory"
          },
          {
            id: 8,
            to: "/inventory/podlist",
            name: "POD Updated List"
          },
          {
            id: 9,
            to: "/inventory/inventorywithso",
            name: "Inventory with SO"
          },
          {
            id: 10,
            to: "/inventory/inventorywithresellar",
            name: "Inventory with Resellar"
          }
        ],
        bankOps: [
          {
            id: 1,
            to: "/bank/ops/assign/short/lead",
            name: "Assign Short Lead"
          },
          {
            id: 2,
            to: "/bank/ops/bank/merchant/tracker",
            name: "Merchant Tracker"
          }
        ],
        crm: [
          {
            id: 1,
            to: "phonepePendingCrm",
            name: "Phonepe CRM"
          },
       
        ],
        opsHead: [
          {
            id: 1,
            to: "/ops/head/dashboard",
            name: "Dashboard",
            subItems: []
          },
          {
            id: 2,
            to: "/ops/head/exceptions",
            name: "Exceptions",
            subItems: []
          },
          {
            id: 3,
            to: null,
            name: "Reports",
            subItems: [
              {
                id: 1,
                name: "Lead Approval Tracker",
                to: "/ops/head/lead/approval/tracker"
              },
              {
                id: 2,
                name: "Sourcewise - Lead Tracker",
                to: "/ops/head/sourcewise/lead/tracker"
              },
              {
                id: 3,
                name: "Source & Region - Lead Tracker",
                to: "/ops/head/source/region/lead/tracker"
              },
              {
                id: 4,
                name: "In - active Merchant",
                to: "/ops/head/inactive/merchant/tracker"
              },
              {
                id: 5,
                name: "Month-old Inactive Merchant ",
                to: "/ops/head/month/old/inactive/merchant/tracker"
              },
              {
                id: 6,
                name: "Proxy Lead / Misselling",
                to: "/ops/head/proxy/lead/tracker"
              }
            ]
          }
        ],
        salesManager: [
          {
            id: 1,
            to: "/sales/manager/lead/allocation/tracker",
            name: "Lead Allocation Tracker"
          },
          {
            id: 2,
            to: "/sales/manager/leads/status",
            name: "Leads Status"
          },
          {
            id: 3,
            to: "/sales/manager/revenue/trackers",
            name: "Revenue Trackers"
          },
          {
            id: 4,
            to: "/sales/manager/pricing/exception/verification",
            name: "Pricing Exception Verification"
          },
          // {
          //   id: 5,
          //   to: "/sales/manager/leads/pending/assignment",
          //   name: "Leads Pending Assignment"
          // },
          {
            id: 6,
            to: "/sales/manager/aging/tracker/pending/leads",
            name: "Aging Tracker for Pending Leads"
          }
        ],
        superAdmin: [
          {
            id: 1,
            to: "/super/admin/dashboard/",
            name: "Dashboard"
          },
          {
            id: 2,
            to: "/super/admin/users/",
            name: "Users"
          },
          {
            id: 3,
            to: "/super/admin/hierarchy/",
            name: "Hierarchy"
          },
          {
            id: 4,
            to: "/super/admin/roles/permissions/",
            name: "Roles & Permissions"
          },
          {
            id: 5,
            to: "/super/admin/permissions/",
            name: "Permissions"
          },
          {
            id: 6,
            to: "/super/admin/regions/",
            name: "Regions"
          },
          // {
          //   id: 7,
          //   to: "/super/admin/subregions/",
          //   name: "subRegions"
          // },
          {
            id: 7,
            to: "/super/admin/pincodes",
            name: "Pincodes"
          },
          // {
          //   id: 8,
          //   to: "/super/admin/manage/merchant/types",
          //   name: "Manage Merchant Types"
          // },
          {
            id: 8,
            to: "/super/admin/manage/mdr/charges",
            name: "Add New MDR Charges"
          },
          {
            id: 9,
            to: "/super/admin/manage/rental/charges",
            name: "Add New Rental Charges"
          },
          {
            id: 10,
            to: "/super/admin/manage/add/mdr/charges",
            name: "Exisiting MDR Charges"
          },
          {
            id: 11,
            to: "/super/admin/manage/add/rental/charges",
            name: "Exisiting Rental Charges"
          },
          {
            id: 10,
            to: "/super/admin/manage/mdr/bankSO",
            name: "Bank SO"
          }
        ]
      }
    };
  },

  created() {
    this.findMenuAuth();
  },

  computed: {
    getComputedColor() {
      return this.$route.fullPath.includes("super/admin")
        ? "#773581"
        : "#202c3f";
    },
    menuList() {
      return JSON.parse(localStorage.getItem("u_i")).roles;
    }
  },
  methods: {
    findMenuAuth() {
      // Declaring roles ad array from local storage
      let authUserRoles = JSON.parse(localStorage.getItem("u_i")).roles;
      /* variables:
      authUserRoles => contains user info, which is saved in local storage of browser
      hierarchyRoleLevel =>  contains current object of roles array */
      let menuArr = [];
      _.map(authUserRoles, function(oo) {
        menuArr.push(oo.hierarchyRoleLevel);
      });
      this.showMenu = menuArr;
    },
    fnMainToggleSideMenu() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    }
  }
};
</script>

<style scoped>
</style>
