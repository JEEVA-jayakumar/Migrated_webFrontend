<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header style="margin-left:0px" class="shadow-0 z-top" flat>
      <customHeader @fnToggleSideMenu="fnMainToggleSideMenu"></customHeader>
    </q-layout-header>

    <q-layout-drawer
      class="no-shadow"
      v-model="leftDrawerOpen"
      content-class="no-shadow"
      :content-style="{background: '#202c3f',width:'250px'}"
    >
      <q-list
        no-border
        link
        inset-delimiter
        highlight
        style="padding-top:65px"
      >

        <q-item v-for="menu in menus" :key="menu.id" :to="menu.to" class="menu-main-item-color">
          <q-item-main class="menu-item-color">{{menu.name}}</q-item-main>
        </q-item>
        
      </q-list>
    </q-layout-drawer>

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
    customBody,
  },
  name: "LayoutDefault",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      menus: [
        // {
        //   id: 0,
        //   to: "/sat/dashboard",
        //   name: "Dashboard"
        // },
        {
          id: 1,
          to: "/sat/lead/validation",
          name: "Lead Validation",
        },
        {
          id: 2,
          to: "/sat/exception/queue",
          name: "Exception Queue",
        },
        // {
        //   id: 3,
        //   to: "/sat/open/merchant/tracker",
        //   name: "Open Merchant tracker"
        // },
        // {
        //   id: 4,
        //   to: "/sat/merchant/tracker",
        //   name: "Merchant Tracker - TID"
        // },
        {
          id: 5,
          to: "/sat/merchant/transaction/level",
          name: "Merchant Tracker - Transaction Level",
        },
        // {
        //   id: 6,
        //   to: "/sat/statement/view",
        //   name: "Statement View"
        // },
        {
          id: 7,
          to: "/sat/inventory/allocation",
          name: "Inventory Allocation",
        },
        {
          id: 8,
          to: "/sat/implementation/queue",
          name: "Implementation Queue",
        },
        {
          id: 9,
          to: "/sat/master/tracker",
          name: "Master Tracker",
        },
        {
          id: 10,
          to: "/sat/device/recovery/tracker",
          name: "Device Recovery Tracker",
        },
      ],
      // menus: {
      //   sat: [
      //     // {
      //     //   id: 0,
      //     //   to: "/sat/dashboard",
      //     //   name: "Dashboard"
      //     // },
      //     {
      //       id: 1,
      //       to: "/sat/lead/validation",
      //       name: "Lead Validation",
      //     },
      //     {
      //       id: 2,
      //       to: "/sat/exception/queue",
      //       name: "Exception Queue",
      //     },
      //     // {
      //     //   id: 3,
      //     //   to: "/sat/open/merchant/tracker",
      //     //   name: "Open Merchant tracker"
      //     // },
      //     // {
      //     //   id: 4,
      //     //   to: "/sat/merchant/tracker",
      //     //   name: "Merchant Tracker - TID"
      //     // },
      //     {
      //       id: 5,
      //       to: "/sat/merchant/transaction/level",
      //       name: "Merchant Tracker - Transaction Level",
      //     },
      //     // {
      //     //   id: 6,
      //     //   to: "/sat/statement/view",
      //     //   name: "Statement View"
      //     // },
      //     {
      //       id: 7,
      //       to: "/sat/inventory/allocation",
      //       name: "Inventory Allocation",
      //     },
      //     {
      //       id: 8,
      //       to: "/sat/implementation/queue",
      //       name: "Implementation Queue",
      //     },
      //     {
      //       id: 9,
      //       to: "/sat/master/tracker",
      //       name: "Master Tracker",
      //     },
      //     {
      //       id: 10,
      //       to: "/sat/device/recovery/tracker",
      //       name: "Device Recovery Tracker",
      //     },
      //   ],
      //   finance: {},
      //   inventory: {},
      //   opsHead: {},
      //   salesManager: {},
      //   superAdmin: {},
      // },
    };
  },
  methods: {
    fnMainToggleSideMenu() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>

<style>
</style>
