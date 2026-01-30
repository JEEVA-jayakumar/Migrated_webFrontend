<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header style="margin-left:0px" class="shadow-0 z-top" flat>
      <customHeader @fnToggleSideMenu="fnMainToggleSideMenu"></customHeader>
    </q-layout-header>

    <q-layout-drawer class="no-shadow" v-model="leftDrawerOpen" content-class="no-shadow"
      :content-style="{ background: getComputedColor, width: '250px' }">
      <q-scroll-area style="height: 100vh" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#cecece',
        width: '5px',
        opacity: 0.5
      }" :delay="1500">
        <q-list no-border link inset-delimiter highlight style="padding-top:65px">
          <div>
            <!-- Entry point for sat -->
            <div v-if="
              $q.localStorage.get.item('u_i') != undefined &&
              showMenu.includes($ROLE_HIERARCHY_OPERATION_SAT)
            ">
            <div v-if="JSON.parse($q.localStorage.get.item('u_i')).region.regionAreaName == 'VARANEEK'">
             <q-item
                    v-for="menu in menus.varaneekSat"
                    :key="menu.id"
                    :to="menu.to"
                    class="menu-main-item-color"
                  >
                    <q-item-main class="menu-item-color">{{ menu.name }}</q-item-main>
                  </q-item>
                  </div>

                  <div v-else>
              <q-item v-for="menu in menus.sat" :key="menu.id" v-if="menu.subItems.length == 0" :to="menu.to"
                class="menu-main-item-color">
                <q-item-main class="menu-item-color">{{ menu.name }}</q-item-main>
              </q-item>
              <q-item v-else>
                <div class="col-md-12">
                  <div class="col-md-12" color="light" text-color="light" v-if="(menu.name == 'Bijlipay')">
                    <q-select inverted-light v-model="selectedValueSat" float-label="Please Select"
                      placeholder="Please Select" color="light" class="cursor-pointer menu-item-color"
                      :options="options" @input="fnclickdropdownSat" />
                  </div>
                  <!--@input="fnclickdropdown"-->
                  <div v-if="selectedValueSat == menuListNameSat && menu.name == menuListNameSat" align="left">
                    <q-item v-for="subItem in menu.subItems" :key="subItem.id" :to="subItem.to"
                      class="menu-main-item-color">
                      <q-item-main class="cursor-pointer menu-item-color">{{ subItem.name }}</q-item-main>
                    </q-item>
                  </div>
                 
                  <div v-else-if="selectedValueSat == menuListNameSat && selectedValueSat != '' && selectedValueSat != 'Bijlipay'  && menu.name == 'Other' " align="left">
                    <q-item v-for="subItem in menu.subItems" :key="subItem.id" :to="subItem.to"
                      class="menu-main-item-color">
                      <q-item-main class="cursor-pointer menu-item-color">{{ subItem.name }}</q-item-main>
                    </q-item>
                  </div>
                </div>
              </q-item>
            </div>
            </div>

            <!-- Entry point for finance manager -->
            <div
              v-if="$q.localStorage.get.item('u_i') != undefined && (showMenu.includes($ROLE_HIERARCHY_FINANCE_HEAD) || showMenu.includes($ROLE_HIERARCHY_FINANCE_MANAGER) || showMenu.includes($ROLE_HIERARCHY_FINANCE_EXECUTIVE))">
              <q-item v-for="menu in menus.finance" :key="menu.id" :to="menu.to" class="menu-main-item-color">
                <q-item-main class="menu-item-color">{{ menu.name }}</q-item-main>
              </q-item>
            </div>

            <!-- Entry point for inventory -->
            <div
              v-if="$q.localStorage.get.item('u_i') != undefined && showMenu.includes($ROLE_HIERARCHY_INVENTORY_OFFICER)">
              <q-item v-for="menu in menus.inventory" :key="menu.id" v-if="menu.subItems.length == 0" :to="menu.to"
                class="menu-main-item-color">
                <q-item-main class="menu-item-color">{{ menu.name }}</q-item-main>
              </q-item>
              <q-item v-else>
                <div class="col-md-12">
                  <div class="col-md-12" color="light" text-color="light" v-if="(menu.name == 'Bijlipay')">
                    <q-select inverted-light v-model="selectedValue" float-label="Please Select"
                      placeholder="Please Select" color="light" class="cursor-pointer menu-item-color"
                      :options="options" @input="fnclickdropdown" />
                  </div>
                  <!--@input="fnclickdropdown"-->
                  <div v-if="selectedValue == menuListName && menu.name == menuListName" align="left">
                    <q-item v-for="subItem in menu.subItems" :key="subItem.id" :to="subItem.to"
                      class="menu-main-item-color">
                      <q-item-main class="cursor-pointer menu-item-color">{{ subItem.name }}</q-item-main>
                    </q-item>
                  </div>
                  <!-- && menu.name == menuListName -->
                 
                  <div v-else-if="selectedValue == menuListName && selectedValue != 'Bijlipay' && selectedValue != '' && menu.name == 'Others'" align="left">
                    <q-item v-for="subItem in menu.subItems" :key="subItem.id" :to="subItem.to"
                      class="menu-main-item-color">
                      <q-item-main class="cursor-pointer menu-item-color">{{ subItem.name }}</q-item-main>
                    </q-item>
                  </div>
                </div>
              </q-item>
            </div>

            <!-- Entry point for ksn inventory -->

            <div
              v-if="
                $q.localStorage.get.item('u_i') != undefined &&
                showMenu.includes($ROLE_HIERARCHY_KSN)
              "
            >
              <q-item
                v-for="menu in menus.ksn"
                :key="menu.id"
                :to="menu.to"
                class="menu-main-item-color"
              >
                <q-item-main class="menu-item-color">{{ menu.name }}</q-item-main>
              </q-item>
            </div>

            <!-- Entry point for opeartions head -->
            <div
              v-if="$q.localStorage.get.item('u_i') != undefined && showMenu.includes($ROLE_HIERARCHY_OPERATIONS_HEAD)">
              <q-item v-for="menu in menus.opsHead" :key="menu.id" v-if="menu.subItems.length == 0" :to="menu.to"
                class="menu-main-item-color">
                <q-item-main class="cursor-pointer menu-item-color">{{ menu.name }}</q-item-main>
              </q-item>
              <q-item v-else>
                <q-item-main class="menu-item-color">
                  <q-collapsible dense class="no-padding" header-class="no-padding" header-style="font-size:14px"
                    label="Reports">
                    <q-item v-for="subItem in menu.subItems" :key="subItem.id" :to="subItem.to"
                      class="menu-main-item-color">
                      <q-item-main class="cursor-pointer menu-item-color">{{ subItem.name }}</q-item-main>
                    </q-item>
                  </q-collapsible>
                </q-item-main>
              </q-item>
            </div>

            <!-- Entry point for sales manager => RSM/ASM -->
            <div
              v-if="$q.localStorage.get.item('u_i') != undefined && (showMenu.includes($ROLE_HIERARCHY_SALES_RSM) || showMenu.includes($ROLE_HIERARCHY_SALES_ASM) || showMenu.includes($ROLE_HIERARCHY_SALES_NATIONAL_HEAD))">
              <q-item v-for="menu in menus.salesManager" :key="menu.id" :to="menu.to" class="menu-main-item-color">
                <q-item-main class="menu-item-color">{{ menu.name }}</q-item-main>
              </q-item>
            </div>

            <!-- Entry point for sales manager => bank ops -->
            <div v-if="$q.localStorage.get.item('u_i') != undefined && showMenu.includes($ROLE_HIERARCHY_BANK_OPS)">
              <q-item v-for="menu in menus.bankOps" :key="menu.id" :to="menu.to" class="menu-main-item-color">
                <q-item-main class="menu-item-color">{{ menu.name }}</q-item-main>
              </q-item>
            </div>

            <!-- Entry point for CRM USERS -->
            <div v-if="$q.localStorage.get.item('u_i') != undefined && showMenu.includes($HIERARCHY_CRM1)">
              <q-item v-for="menu in menus.crm" :key="menu.id" :to="menu.to" class="menu-main-item-color">
                <q-item-main class="menu-item-color">{{ menu.name }}</q-item-main>
              </q-item>
            </div>
            <!-- Entry point for super admin/bijlipay managemnet -->
            <div v-if="$q.localStorage.get.item('u_i') != undefined && showMenu.includes($ROLE_BIJLIPAY_MANAGER)">
              <q-item v-for="menu in menus.superAdmin" :key="menu.id" :to="menu.to">
                <q-item-main class="menu-item-color-SA">{{ menu.name}}</q-item-main>
              </q-item>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <customBody></customBody>
    </q-page-container>
  </q-layout>
</template>

<script>
 import Vue from "vue";
import { mapGetters, mapActions } from "vuex"; 
import customHeader from '../components/customHeader.vue';
import customBody from '../components/customBody.vue';
import _ from "lodash";
export default {
  components: {
    customHeader,
    customBody
  },
  name: 'LayoutDefault',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
        ? this.$route.name != 'leadDataEntry'
          ? true
          : false
        : false,
      propShowDatas: false,
      menuListName: '',
      menuListNameSat: '',
      name:'',
      options: [],
      showMenu: [],
      array:[],
      selectedValue: "",
      selectedValueSat: "",
      menus: {
        varaneekSat: [
        {
            id: 3,
            to: '/sat/lead/lead/dataentry',
            name: 'Lead Creation'
          },
          {
            id: 1,
            to: '/sat/lead/validation',
            name: 'Lead Validation'
          },
          {
            id: 8,
            to: '/sat/varaneekimplementationRequest',
            name: 'Lead Status',
            subItems: []
          }
        ],
        sat: [
          {
            id: 1,
            to: "/sat/master/Bijlipay",
            name: "Bijlipay",
            subItems: [
              {
                id: 0,
                to: "/sat/dashboard",
                name: "Dashboard",
                subItems: [],
              },
              // {
              //   id: 1,
              //   to: '/sat/lead/validation',
              //   name: 'Lead Validation'
              // },
              {
                id: 1,
                to: "/sat/lead/validation",
                name: "Lead Validation",
                subItems: [],
              },
              {
                id: 21,
                to: "/sat/additionalTid",
                name: "Additional Terminals",
                subItems: [],
              },
              {
                id: 15,
                to: "/sat/change/management",
                name: "Change Management",
                subItems: [],
              },
              //     {
              //   id: 15,
              //   to: "/sat/change/management/terminal",
              //   name: "Update Terminal Data",
              // },
              {
                id: 20,
                to: "/sat/internalLostOrStolen",
                name: "Lost/Stolen",
                subItems: [],
              },
              {
                id: 22,
                to: "/sat/InternalGlobalSearchFilter",
                name: "Global Serial Number/TID Search",
                subItems: [],
              },

              {
                id: 2,
                to: "/sat/exception/queue",
                name: "Exception Queue",
                subItems: [],
              },
              {
                id: 3,
                to: "/sat/open/merchant/tracker",
                name: "Open Merchant tracker",
                subItems: [],
              },
              // {
              //   id: 4,
              //   to: "/sat/merchant/tracker",
              //   name: "Merchant Tracker - TID",
              // },
              // {
              //   id: 5,
              //   to: "/sat/merchant/transaction/level",
              //   name: "Merchant Tracker - Transaction Level",
              // },
              // {
              //   id: 6,
              //   to: "/sat/statement/view",
              //   name: "Statement View",
              // },
              {
                id: 7,
                to: "/sat/internalRegionalInventory",
                name: "Regional Inventory",
                subItems: [],
              },
              // {
              //   id: 40,
              //   to: '/sat/Phonepe/deviceRecovery',
              //   name: 'Device Recovery',
              //   subItems: []
              // },
              // {
              //   id: 41,
              //   to: '/sat/TestingRecovery',
              //   name: 'Device Recovery',
              //   subItems: []
              // },
              // {
              //   id: 17,
              //   to: '/sat/Aggregator/inventory',
              //   name: 'Aggregator Inventory',
              //   subItems: []
              // },
              // {
              //   id: 18,
              //   to: '/sat/AggregatorsLostOrStolen',
              //   name: 'Aggregators Lost Or Stolen',
              //   subItems: []
              // },
              {
                id: 8,
                to: "/sat/internalimplementationRequest",
                name: "Implementation Queue",
                subItems: [],
              },
              {
                id: 9,
                to: "/sat/master/tracker",
                name: "Master Tracker-Implemented",
                subItems: [],
              },
              {
                id: 10,
                to: "/sat/device/recovery/tracker",
                name: "Device Recovery Tracker",
                subItems: [],
              },
              // {
              //   id: 11,
              //   to: "/sat/device/recovery",
              //   name: "Device Recovery"
              // },
              {
                id: 12,
                to: "/sat/lead/lead/dataentry",
                name: "Lead Creation",
                subItems: [],
              },
              {
                id: 13,
                to: "/sat/lead/lead/view/audocuments",
                name: "Implemented Verification Queue",
                subItems: [],
              },
              {
               id: 78,
               to: "/sat/deactivelist",
               name: "Bijlipay De-Active List ",
               subItems: []
              },
              {
                id: 14,
                to: "/sat/device/replacement",
                name: "Device Replacement",
                subItems: [],
              },
              {
                id: 1001,
                to: "/sat/hitachiDetails",
                name: "Hitachi -Upload & Download",
                subItems: [],
              },
              {
                id: 16,
                to: "/sat/staticQrLeads",
                name: "Static QR Leads",
                subItems: [],
              },
              {
                id: 17,
                to: "/sat/staticQRinventory",
                name: "Static QR Inventory",
                subItems: [],
              },
              {
                id: 19,
                to: "/sat/OnboardingExistingMerchants",
                name: "Onboarding Existing Merchants",
                subItems: [],
              },

              {
                id: 27,
                to: "/sat/hitachiIndianBankOnboarding",
                name: "Hitachi Indian Bank Onboarding",
                subItems: [],
              },
              {
                id:28,
                to:"/sat/equitasSoundboxOnboarding",
                name: "Equitas SoundBox Onboarding",
              }
              // {
              //   id: 38,
              //   to: '/sat/demapping',
              //   name: 'DE-Mapping',
              //   subItems: []
              // },
              // {
              //   id: 15,
              //   to: "/sat/change/management",
              //   name: "Change Management"
              // },
              // {
              //   id: 28,
              //   to: '/sat/internalserviceRequest',
              //   name: 'Service Request',
              //   subItems: []
              // }
              // {
              //   id: 15,
              //   to: "/sat/change/management",
              //   name: "Change Management"
              // }

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
          },

          {
            id: 28,
            to: "/sat/master/Other",
            name: "Other",
            subItems: [
              {
                id: 30,
                to: "/sat/dashboardPhonepe" || "/sat/dashboardMobikwik",
                name: "Dashboard",
                subItems: [],
              },
              // {
              //   id: 1,
              //   to: '/sat/lead/validation',
              //   name: 'Lead Validation'
              // },
              {
                id: 31,
                to: "/sat/aggregator/lead/validation",
                name: "Lead Validation",
                subItems: [],
              },
              // {
              //   id: 21,
              //   to: '/sat/additionalTid',
              //   name: 'Additional Terminals',
              //   subItems: []
              // },
              // {
              //   id: 15,
              //   to: '/sat/change/management',
              //   name: 'Change Management',
              //   subItems: []
              // },
              {
                id: 32,
                to: "/sat/AggregatorsLostOrStolen",
                name: "Lost/Stolen",
                subItems: [],
              },
              {
                id: 33,
                to: "/sat/AggregatorGlobalSearchFilter",
                name: "Global Serial Number/TID Search",
                subItems: [],
              },

              // {
              //   id: 2,
              //   to: '/sat/exception/queue',
              //   name: 'Exception Queue',
              //   subItems: []
              // },
              {
                id: 3,
                to: "/sat/aggOpenMerchantTracker",
                name: "Open Merchant tracker",
                subItems: [],
              },
              {
                id: 34,
                to: "/sat/AggregatorInventory",
                name: "Regional Inventory",
                subItems: [],
              },
              {
                id: 41,
                to: "/sat/TestingRecovery",
                name: "PhonePe Device Recovery",
              },
              {
                id: 14,
                to: "/sat/AggregatorDeviceRecovery",
                name: "Mobikwik Device Recovery",
              },
              {
                id: 35,
                to: "/sat/externalimplementationRequest",
                name: "Implementation Queue",
                subItems: [],
              },
              {
                id: 9,
                to: "/sat/AggregatorMasterTracker",
                name: "Master Tracker-Implemented",
                subItems: [],
              },
              {
                id: 88,
                to: "/sat/AggregatorServiceTicket",
                name: "SAT - Service Verification",
                subItems: [],
              },
              // {
              //   id: 10,
              //   to: '/sat/device/recovery/tracker',
              //   name: 'Device Recovery Tracker',
              //   subItems: []
              // },
              // {
              //   id: 12,
              //   to: '/sat/lead/lead/dataentry',
              //   name: 'Lead Creation',
              //   subItems: []
              // },
              {
                id: 13,
                to: "/sat/AggregatorVerificationQueue",
                name: "Implemented Verification Queue",
                subItems: [],
              },
              {
                id: 73,
                to: "/sat/AggregatorDeactiveList",
                name: "Aggregator De-Active List ",
                subItems: []
              },
              // {
              //   id: 14,
              //   to: '/sat/device/replacement',
              //   name: 'Device Replacement',
              //   subItems: []
              // },
              {
                id: 36,
                to: "/sat/externalserviceRequest",
                name: "Service Request",
                subItems: [],
              },
              {
                id: 14,
                to: "/sat/AggregatorDeviceReplacement",
                name: "Device Replacement",
                subItems: [],
              },
              {
                id: 38,
                to: "/sat/demapping",
                name: "DE-Mapping",
                subItems: [],
              },
            ],
          },
        ],
        finance: [
          {
            id: 1,
            to: "/finance/payment/verification/tracker",
            name: "Payment Verification Tracker",
          },
          {
            id: 2,
            to: "/finance/finance/approved/tracker",
            name: "Finance Approved Tracker ",
          },
          // {
          //   id: 3,
          //   to: '/finance/LostOrStolen',
          //   name: 'Lost Or Stolen'
          // }
          {
            id: 3,
            to: "/finance/lost/finance",
            name: "Lost/Stolen",
          },
          {
            id: 3,
            to: '/finance/PosInventory',
            name: 'Pos Inventory'
          }
          // LostOrStolen
        ],
        inventory: [
          {
            id: 1,
            to: "/inventory/master/Bijlipay",
            name: "Bijlipay",
            subItems: [
              {
                id: 1,
                to: "/inventory/home",
                name: "Dashboard",
                subItems: [],
              },
              {
                id: 2,
                to: "/inventory/central",
                name: "Central Inventory",
                subItems: [],
              },
              {
                id: 23,
                to: "/inventory/staticQrBankPortalInventory",
                name: "Static QR - Request from Bank Portal",
                subItems: [],
              },
              {
                id: 3,
                to: "/inventory/master/SendToRepair",
                name: "SendToRepair",
                subItems: [],
              },
              {
                id: 64,
                to: "/inventory/master/spareParts",
                name: "Spare Parts",
                subItems: [],
              },
              {
                id: 4,
                to: "/inventory/master/MovedToScrap",
                name: "MovedToScrap",
                subItems: [],
              },
              {
                id: 15,
                to: "/inventory/master/Lost",
                name: "Lost/Stolen",
                subItems: [],
              },
              {
                id: 16,
                to: "/inventory/master/GlobalSearch",
                name: "Global Serial Number/TID Search",
                subItems: [],
              },
              {
                id: 21,
                to: "/inventory/master/InventoryRegion",
                name: "Inventory With Regions",
                subItems: [],
              },
              {
                id: 5,
                to: "/inventory/merchant",
                name: "Inventory with Merchant",
                subItems: [],
              },
              {
                id: 6,
                to: "/inventory/faulty",
                name: "Regional return & Faulty Inventory",
                subItems: [],
              },

              {
                id: 8,
                to: "/inventory/podlist",
                name: "POD Updated List",
                subItems: [],
              },
              {
                id: 9,
                to: "/inventory/inventorywithso",
                name: "Inventory with SO",
                subItems: [],
              },
              {
                id: 10,
                to: "/inventory/inventorywithresellar",
                name: "Inventory with Resellar",
                subItems: [],
              },
              // {
              //   id: 11,
              //   to: "/inventory/master/serialnumberupdate",
              //   name: "Serial Number Update",
              //   subItems: [],
              // },
              {
                id: 12,
                to: "/inventory/master/Reports",
                name: "Reports",
                subItems: [],
              },
              {
                id: 13,
                to: "/inventory/master/generateQR",
                name: "Generate QR",
                subItems: [],
              },

              {
                id: 14,
                to: "/inventory/master/simStatus",
                name: "Sim Status",
                subItems: [],
              },
            ],
          },
          {
            id: 2,
            to: "/inventory/master/Others",
            name: "Others",
            subItems: [
              {
                id: 1,
                to: "/inventory/Phonepehome" || "/inventory/Mobikwikhome",
                name: "Dashboard",
                subItems: [],
              },
              {
                id: 2,
                to: "/inventory/PhonepeInventory",
                name: "Central Inventory",
                subItems: [],
              },
              {
                id: 3,
                to: "/inventory/AggregatorsSendToRepair",
                name: "Send To Repair",
                subItems: [],
              },
              // {
              //   id: 4,
              //   to: '/inventory/AggregatorsMovedToScrap',
              //   name: ' MovedToScrap',
              //   subItems: []
              // },
              {
                id: 64,
                to: "/inventory/master/AggregatorsspareParts",
                name: "Spare Parts",
                subItems: [],
              },
              {
                id: 4,
                to: "/inventory/AggregatorsMovedToScrap",
                name: " MovedToScrap",
                subItems: [],
              },

              {
                id: 15,
                to: "/inventory/AggregatorsLost",
                name: "Lost/Stolen",
                subItems: [],
              },

              {
                id: 16,
                to: "/inventory/master/PhonepeGlobalSearch",
                name: "Global Serial Number/TID Search",
                subItems: [],
              },
              // PhonepeInventoryRegion
              {
                id: 21,
                to: "/inventory/master/PhonepeInventoryRegion",
                name: "Inventory With Regions",
                subItems: [],
              },
              {
                id: 5,
                to: "/inventory/Aggregatorsmerchant",
                name: "Inventory with Merchant",
                subItems: [],
              },

              // {
              //   id: 6,
              //   to: '/inventory/faulty',
              //   name: 'Regional return & Faulty Inventory',
              //   subItems: []
              // },

              // {
              //   id: 8,
              //   to: '/inventory/podlist',
              //   name: 'POD Updated List',
              //   subItems: []
              // },
              {
                id: 38,
                to: "/inventory/AggregatorInventoryFaulty",
                name: "Regional return & Faulty Inventory",
                subItems: [],
              },

              {
                id: 36,
                to: "/inventory/Aggregatorpodlist",
                name: "POD Updated List",
                subItems: [],
              },
              {
                id: 37,
                to: "/inventory/AggregatorInventoryWithSO",
                name: "Inventory with SO",
                subItems: [],
              },
              {
                id: 25,
                to: "/inventory/master/PhonepeDeviceHistory",
                name: " Device History",
                subItems: [],
              },
              {
                id: 26,
                to: "/inventory/master/phonepePaperRoll",
                name: "Phonepe Paper Roll",
                subItems: [],
              },
              // {
              //   id: 10,
              //   to: '/inventory/inventorywithresellar',
              //   name: 'Inventory with Resellar',
              //   subItems: []
              // },
              // {
              //   id: 33,
              //   to: '/inventory/master/AggregatorSerialNumberUpdate',
              //   name: 'Serial Number Update',
              //   subItems: []
              // },

              // {
              //   id: 12,
              //   to: '/inventory/master/Reports',
              //   name: 'Reports',
              //   subItems: []
              // }
              // {
              //   id: 11,
              //   to: '/inventory/master/Replacement',
              //   name: 'Reports',
              //   subItems: [

              //     {
              //       id: 1,
              //       name: 'Replacement/Recovery',
              //       to: '/inventory/master/Replacement'
              //     },
              //     {
              //       id: 2,
              //       name: 'Device History',
              //       to: '/inventory/master/DeviceHistory'
              //     },
              //     // {
              //     //   id: 3,
              //     //   name: 'Device With Merchants',
              //     //   to: '/inventory/master/DeviceMerchant'
              //     // },
              //     {
              //       id: 4,
              //       name: 'Device With FSE/SO',
              //       to: '/inventory/master/DeviceFSE'
              //     },
              //     {
              //       id: 5,
              //       name: 'Device With BP Regions',
              //       to: '/inventory/master/DeviceBP'
              //     },
              //     {
              //       id: 6,
              //       name: 'Inventory Summary',
              //       to: '/inventory/master/InventorySummary'
              //     }

              //     //  {
              //     //   id: 7,
              //     //   name: "Inventory Time",
              //     //   to: "/inventory/master/InventoryTime",
              //     // },
              //   ]
              // }
            ],
          },

        ],
        ksn: [
          {
            id: 77,
            to: "/inventory/ksn",
            name: "KSN Enable",
          },
        ],
        bankOps: [
          {
            id: 1,
            to: "/bank/ops/assign/short/lead",
            name: "Assign Short Lead",
          },
          {
            id: 2,
            to: "/bank/ops/bank/merchant/tracker",
            name: "Merchant Tracker",
          },
        ],
        crm: [
          {
            id: 1,
            to: "phonepePendingCrm",
            name: "Phonepe Service Request",
          },
          {
            id: 2,
            to: "bijlipayCrm",
            name: "Bijlipay Service Request",
          },
          {
            id: 2,
            to: "globalTicketSearch",
            name: "Global Ticket Search",
          },
          {
            id: 288,
            to: "docviewer",
            name: "DOC View",
          },
          {
            id: 888,
            to: "serviceticket",
            name: "Service Ticket",
          },
        ],
        opsHead: [
          // {
          //   id: 1,
          //   to: '/ops/head/dashboard',
          //   name: 'Dashboard',
          //   subItems: []
          // },
          {
            id: 2,
            to: "/ops/head/exceptions",
            name: "Exceptions",
            subItems: [],
          },
          {
            id: 3,
            to: null,
            name: "Reports",
            subItems: [
              {
                id: 1,
                name: "Lead Approval Tracker",
                to: "/ops/head/lead/approval/tracker",
              },
              {
                id: 2,
                name: "Sourcewise - Lead Tracker",
                to: "/ops/head/sourcewise/lead/tracker",
              },
              {
                id: 3,
                name: "Source & Region - Lead Tracker",
                to: "/ops/head/source/region/lead/tracker",
              },
              {
                id: 4,
                name: "In - active Merchant",
                to: "/ops/head/inactive/merchant/tracker",
              },
              {
                id: 5,
                name: "Month-old Inactive Merchant ",
                to: "/ops/head/month/old/inactive/merchant/tracker",
              },
              {
                id: 6,
                name: "Proxy Lead / Misselling",
                to: "/ops/head/proxy/lead/tracker",
              },
            ],
          },
        ],
        salesManager: [
          {
            id: 1,
            to: "/sales/manager/lead/allocation/tracker",
            name: "Lead Allocation Tracker",
          },
          {
            id: 2,
            to: "/sales/manager/leads/status",
            name: "Leads Status",
          },
          {
            id: 3,
            to: "/sales/manager/revenue/trackers",
            name: "Revenue Trackers",
          },
          {
            id: 4,
            to: "/sales/manager/pricing/exception/verification",
            name: "Pricing Exception Verification",
          },
          // {
          //   id: 5,
          //   to: "/sales/manager/leads/pending/assignment",
          //   name: "Leads Pending Assignment"
          // },
          {
            id: 6,
            to: "/sales/manager/aging/tracker/pending/leads",
            name: "Aging Tracker for Pending Leads",
          },
        ],
        superAdmin: [
          {
            id: 1,
            to: "/super/admin/dashboard/",
            name: "Dashboard",
          },
          {
            id: 2,
            to: "/super/admin/users/",
            name: "Users",
          },
          {
            id: 3,
            to: "/super/admin/hierarchy/",
            name: "Hierarchy",
          },
          {
            id: 4,
            to: "/super/admin/roles/permissions/",
            name: "Roles & Permissions",
          },
          {
            id: 5,
            to: "/super/admin/permissions/",
            name: "Permissions",
          },
          {
            id: 6,
            to: "/super/admin/regions/",
            name: "Regions",
          },
          {
            id: 22,
            to: "/super/admin/regionGroup/",
            name: "RegionGroup",
          },
          //16mars2022
          // {
          //   id: 7,
          //   to: "/super/admin/subregions/",
          //   name: "subRegions"
          // },
          {
            id: 8,
            to: "/super/admin/pincodes",
            name: "Pincodes",
          },
          {
            id: 9,
            to: "/super/admin/manage/merchant/types",
            name: "Merchant and Document Types",
          },
          {
            id: 10,
            to: "/super/admin/manage/mdrCharges",
            name: "MDR Charges",
          },
          {
            id: 11,
            to: "/super/admin/manage/newRentalCharges",
            name: "Rental Charges",
          },
          //16mars2022
          // {
          //   id: 20,
          //   to: "/super/admin/manage/vasUpdates",
          //   name: "VAS"
          // },
          // {
          //   id: 10,
          //   to: '/super/admin/manage/mdr/charges',
          //   name: 'Add New MDR Charges'
          // },
          // {
          //   id: 11,
          //   to: '/super/admin/manage/rental/charges',
          //   name: 'Add New Rental Charges'
          // },
          // {
          //   id: 12,
          //   to: '/super/admin/manage/add/mdr/charges',
          //   name: 'Exisiting MDR Charges'
          // },
          // {
          //   id: 13,
          //   to: '/super/admin/manage/add/rental/charges',
          //   name: 'Exisiting Rental Charges'
          // },
          {
            id: 14,
            to: "/super/admin/manage/mdr/bankSO",
            name: "Bank SO",
          },
          //16mars2022
          // {
          //   id: 15,
          //   to: "/super/admin/manage/serialupdate",
          //   name: "Serial Update",
          // },
          {
            id: 16,
            to: "/super/admin/manage/notifications",
            name: "Notifications",
          },
          {
            id: 17,
            to: "/super/admin/manage/QR/Sticker",
            name: "QRSticker",
          },
          //  {
          //   id: 18,
          //   to: "/super/admin/manage/mATMplan",
          //   name: "Add M-ATM plan"
          // },
          {
            id: 19,
            to: "/super/admin/manage/existingmATMplan",
            name: "M-ATM",
          },
          {
            id: 20,
            to: "/super/admin/manage/multiTid",
            name: "Multi-TID",
          },
          {
            id: 21,
            to: "/super/admin/manage/prefixConfig",
            name: "prefix Config",
          },
          {
            id: 30,
            to: "/super/admin/sparePartsTypes",
            name: "Spare Parts Types",
          },
          {
            id: 31,
            to: "/super/admin/manage/serviceRequest",
            name: "Service Request",
          },
          {
            id: 25,
            to: "/super/admin/manage/aggregators",
            name: "Aggregators",
          },
          {
            id: 26,
            to: "/super/admin/manage/aggregatorsDevice",
            name: "Aggregators Device",
          },
          //   {
          //   id: 3,
          //   to: "/super/admin/hierarchy/",
          //   name: "Hierarchy",
          // },
          // {
          //   id: 20,
          //   to: "/super/admin/manage/mdrCharges",
          //   name: "MDR Charges"
          // },
          //  {
          //   id: 21,
          //   to: "/super/admin/manage/newRentalCharges",
          //   name: "Rental Charges"
          // },

          {
            id: 38,
            to: "/super/admin/manage/APISync",
            name: "MARS API SYNC",
            subItems: [],
          },
        ],
        Phonepeinventory: [
          {
            id: 1,
            to: "/inventory/master/Bijlipay",
            name: "Bijlipay",
            subItems: [
              {
                id: 1,
                to: "/inventory/home",
                name: "Dashboard",
                subItems: [],
              },
              {
                id: 2,
                to: "/inventory/central",
                name: "Central Inventory",
                subItems: [],
              },
              {
                id: 3,
                to: "/inventory/master/SendToRepair",
                name: "SendToRepair",
                subItems: [],
              },
              {
                id: 64,
                to: "/inventory/master/spareParts",
                name: "Spare Parts",
                subItems: [],
              },
              {
                id: 4,
                to: "/inventory/master/MovedToScrap",
                name: "MovedToScrap",
                subItems: [],
              },
              {
                id: 15,
                to: "/inventory/master/Lost",
                name: "Lost/Stolen",
                subItems: [],
              },
              {
                id: 16,
                to: "/inventory/master/GlobalSearch",
                name: "Global Serial Number/TID Search",
                subItems: [],
              },
              {
                id: 21,
                to: "/inventory/master/InventoryRegion",
                name: "Inventory With Regions",
                subItems: [],
              },
              {
                id: 5,
                to: "/inventory/merchant",
                name: "Inventory with Merchant",
                subItems: [],
              },
              {
                id: 6,
                to: "/inventory/faulty",
                name: "Regional return & Faulty Inventory",
                subItems: [],
              },

              {
                id: 8,
                to: "/inventory/podlist",
                name: "POD Updated List",
                subItems: [],
              },
              {
                id: 9,
                to: "/inventory/inventorywithso",
                name: "Inventory with SO",
                subItems: [],
              },
              {
                id: 10,
                to: "/inventory/inventorywithresellar",
                name: "Inventory with Resellar",
                subItems: [],
              },
              {
                id: 11,
                to: "/inventory/master/serialnumberupdate",
                name: "Serial Number Update",
                subItems: [],
              },
              {
                id: 12,
                to: "/inventory/master/Reports",
                name: "Reports",
                subItems: [],
              },
              {
                id: 13,
                to: "/inventory/master/generateQR",
                name: "Generate QR",
                subItems: [],
              },
            ],
          },
          {
            id: 2,
            to: "/inventory/master/Others",
            name: "Others",
            subItems: [
              {
                id: 1,
                to: "/inventory/Phonepehome" || "/inventory/Mobikwikhome",
                name: "Dashboard",
                subItems: [],
              },
              {
                id: 2,
                to: "/inventory/PhonepeInventory",
                name: "Central Inventory",
                subItems: [],
              },
              {
                id: 3,
                to: "/inventory/AggregatorsSendToRepair",
                name: "Send To Repair",
                subItems: [],
              },
              // {
              //   id: 4,
              //   to: '/inventory/AggregatorsMovedToScrap',
              //   name: ' MovedToScrap',
              //   subItems: []
              // },
              {
                id: 64,
                to: "/inventory/master/AggregatorsspareParts",
                name: "Spare Parts",
                subItems: [],
              },
              {
                id: 4,
                to: "/inventory/AggregatorsMovedToScrap",
                name: " MovedToScrap",
                subItems: [],
              },

              {
                id: 15,
                to: "/inventory/AggregatorsLost",
                name: "Lost/Stolen",
                subItems: [],
              },

              {
                id: 16,
                to: "/inventory/master/PhonepeGlobalSearch",
                name: "Global Serial Number/TID Search",
                subItems: [],
              },
              // PhonepeInventoryRegion
              {
                id: 21,
                to: "/inventory/master/PhonepeInventoryRegion",
                name: "Inventory With Regions",
                subItems: [],
              },
              {
                id: 5,
                to: "/inventory/Aggregatorsmerchant",
                name: "Inventory with Merchant",
                subItems: [],
              },

              // {
              //   id: 6,
              //   to: '/inventory/faulty',
              //   name: 'Regional return & Faulty Inventory',
              //   subItems: []
              // },

              // {
              //   id: 8,
              //   to: '/inventory/podlist',
              //   name: 'POD Updated List',
              //   subItems: []
              // },
              {
                id: 38,
                to: "/inventory/AggregatorInventoryFaulty",
                name: "Regional return & Faulty Inventory",
                subItems: [],
              },

              {
                id: 36,
                to: "/inventory/Aggregatorpodlist",
                name: "POD Updated List",
                subItems: [],
              },
              {
                id: 37,
                to: "/inventory/AggregatorInventoryWithSO",
                name: "Inventory with SO",
                subItems: [],
              },
              {
                id: 25,
                to: "/inventory/master/PhonepeDeviceHistory",
                name: " Device History",
                subItems: [],
              },

              {
                id: 26,
                to: "/inventory/master/phonepePaperRoll",
                name: "Phonepe Paper Roll",
                subItems: [],
              },
              // {
              //   id: 10,
              //   to: '/inventory/inventorywithresellar',
              //   name: 'Inventory with Resellar',
              //   subItems: []
              // },
              // {
              //   id: 33,
              //   to: '/inventory/master/AggregatorSerialNumberUpdate',
              //   name: 'Serial Number Update',
              //   subItems: []
              // },

              // {
              //   id: 12,
              //   to: '/inventory/master/Reports',
              //   name: 'Reports',
              //   subItems: []
              // }
              // {
              //   id: 11,
              //   to: '/inventory/master/Replacement',
              //   name: 'Reports',
              //   subItems: [

              //     {
              //       id: 1,
              //       name: 'Replacement/Recovery',
              //       to: '/inventory/master/Replacement'
              //     },
              //     {
              //       id: 2,
              //       name: 'Device History',
              //       to: '/inventory/master/DeviceHistory'
              //     },
              //     // {
              //     //   id: 3,
              //     //   name: 'Device With Merchants',
              //     //   to: '/inventory/master/DeviceMerchant'
              //     // },
              //     {
              //       id: 4,
              //       name: 'Device With FSE/SO',
              //       to: '/inventory/master/DeviceFSE'
              //     },
              //     {
              //       id: 5,
              //       name: 'Device With BP Regions',
              //       to: '/inventory/master/DeviceBP'
              //     },
              //     {
              //       id: 6,
              //       name: 'Inventory Summary',
              //       to: '/inventory/master/InventorySummary'
              //     }

              //     //  {
              //     //   id: 7,
              //     //   name: "Inventory Time",
              //     //   to: "/inventory/master/InventoryTime",
              //     // },
              //   ]
              // }
            ],
          },
        ],
      },
    };
  },

  created() {
    this.findMenuAuth();
  },
  beforeMount() {
    this.fnAjaxGetAllMenuList();
  },
  computed: {
    ...mapGetters("superAdminAggregators", ["getActiveCreatedAggregatorList"]),
    getComputedColor() {
      return this.$route.fullPath.includes("super/admin") ? "#773581" : "#202c3f";
    },
    menuList() {
      return JSON.parse(localStorage.getItem("u_i")).roles;
    },
  },
  methods: {
    ...mapActions("superAdminAggregators", ["GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),
    findMenuAuth() {
      // Declaring roles ad array from local storage
      let authUserRoles = JSON.parse(localStorage.getItem("u_i")).roles;
      /* variables:
      authUserRoles => contains user info, which is saved in local storage of browser
      hierarchyRoleLevel =>  contains current object of roles array */
      let menuArr = [];
      _.map(authUserRoles, function (oo) {
        menuArr.push(oo.hierarchyRoleLevel);
      });
      this.showMenu = menuArr;
    },
    // fnselectedValues(value){

    //  console.log("fnselectedValues ------->", value)
    //   // if(value == Bijlipay){
    //   //
    //   // }
    //   // /inventory/master/Bijlipay
    // },
    fnclickdropdown(request) {
      this.array = this.menus.Phonepeinventory[1].subItems;
      this.$q.localStorage.set("selectedTab", request);
      if (request == "Bijlipay") {
        this.menuListName = request;
        this.$router.push("/inventory/home");
      } else if (request == 3) {
        this.menus.inventory[1].subItems = this.array;
        this.menuListName = request;
        this.$router.push("/inventory/Phonepehome");
      } else {
        this.menus.inventory[1].subItems = this.menus.inventory[1].subItems.filter(
          (item) => item.id !== 26
        );
        this.menuListName = request;
        console.log("menuListName CHECK REQUEST", JSON.stringify(this.menuListName));
        this.$router.push("/inventory/Mobikwikhome");
      }
    },

    fnclickdropdownSat(request) {
      this.$q.localStorage.set("selectedTab", request);
      console.log("REQUEST FUNCTION DETAILED------------>>>>", JSON.stringify(request));
      if (request == "Bijlipay") {
        this.menuListNameSat = request;
        this.$router.push("/sat/dashboard");
      } else if (request == 3) {
        this.menuListNameSat = request;
        this.$router.push("/sat/dashboardPhonepe");
      } else {
        this.menuListNameSat = request;
        this.$router.push("/sat/dashboardMobikwik");
      }
    },
    fnMainToggleSideMenu() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    fnAjaxGetAllMenuList() {
      this.GET_ACTIVE_CREATED_AGGREGATORS_LIST()
        .then((response) => {
          let assumeArr = [
            {
              label: "Bijlipay",
              value: "Bijlipay",
            },
          ];
          // console.log("MENU LIST", JSON.stringify(response));
          this.getActiveCreatedAggregatorList.map(function (value) {
            assumeArr.push({
              label: value.name,
              value: value.id,
            });
          });
          this.options = assumeArr;
          console.log("MENU LIST NAMES", JSON.stringify(this.options));
        })
        .catch(() => {
          this.options = [];
        });
    },
  },
};
</script>

<style scoped></style>
