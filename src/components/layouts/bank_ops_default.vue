<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header style="margin-left:0px" class="shadow-0 z-top" flat>
      <customHeader></customHeader>
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
          to: "/bank/ops/assign/short/lead",
          name: "Assign Short Lead",
        },
        {
          id: 2,
          to: "/bank/ops/bank/merchant/tracker",
          name: "Merchant Tracker",
        },
      ],
    };
  },
};
</script>

<style>
</style>
