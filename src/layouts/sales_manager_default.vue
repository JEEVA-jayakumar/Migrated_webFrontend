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
import { mapGetters, mapActions } from "vuex";
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
          to: "/sales/manager/revenue/approval",
          name: "Exception Approval",
        },
        {
          id: 5,
          to: "/sales/manager/leads/pending/assignment",
          name: "Leads Pending Assignment",
        },
        {
          id: 6,
          to: "/sales/manager/aging/tracker/pending/leads",
          name: "Aging Tracker for Pending Leads",
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
