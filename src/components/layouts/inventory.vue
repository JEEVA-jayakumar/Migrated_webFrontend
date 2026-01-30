<template>
  <q-layout view="lHh Lpr lFf">
     <q-layout-header style="margin-left:0px" class="shadow-0 z-top" flat>
      <customHeader @fnToggleSideMenu="fnMainToggleSideMenu"></customHeader>
    </q-layout-header>

    <q-layout-drawer
      class="shadow-9"
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
        {
          id: 1,
          to: "/inventory/home",
          name: "Inventory Table",
        },
        {
          id: 2,
          to: "/inventory/central",
          name: "Central Inventory",
        },
        // {
        //   id: 3,
        //   to: "/inventory/regional",
        //   name: "Regional Inventory",
        // },
        // {
        //   id: 4,
        //   to: "/inventory/transit",
        //   name: "Inventory in Transit",
        // },
        // {
        //   id: 5,
        //   to: "/inventory/merchant",
        //   name: "Inventory with Merchant",
        // },
        {
          id: 6,
          to: "/inventory/faulty",
          name: "Faulty Inventory",
        },
        {
          id: 6,
          to: "/inventory/master/inventory",
          name: "Master Inventory",
        },
      ],
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
