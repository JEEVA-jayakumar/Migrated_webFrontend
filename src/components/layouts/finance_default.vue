<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="margin-left:0px" class="shadow-0 z-top" flat>
      <customHeader @fnToggleSideMenu="fnMainToggleSideMenu"></customHeader>
    </q-header>

    <q-drawer
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
          <q-item-section class="menu-item-color">{{menu.name}}</q-item-section>
        </q-item>
      </q-list>
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
      leftDrawerOpen: this.$q.platform.is.desktop,
      menus: [
        {
          id: 1,
          to: "/finance/payment/verification/tracker",
          name: "Payment Verification Tracker"
        },
        {
          id: 2,
          to: "/finance/finance/approved/tracker",
          name: "Finance Aproved Tracker "
        }
        // {
        //   id: 4,
        //   to: "/finance/tid/rental/tracker",
        //   name: "TID Rental Tracker"
        // },
        // {
        //   id: 5,
        //   to: "/finance/invoice/generator",
        //   name: "Invoice Generator"
        // },
      ]
    };
  },

  methods: {
    fnMainToggleSideMenu() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    }
  }
};
</script>

<style>
</style>
