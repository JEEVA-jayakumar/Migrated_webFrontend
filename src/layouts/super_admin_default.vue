<template>
  <q-layout view="lHh Lpr lFf">
     <q-header style="margin-left:0px" class="shadow-0 z-top" flat>
      <q-toolbar
    class="bg-custom-light-grey bottom-border"
    color="grey-9"
    flat
    inverted
  >
    <q-btn
    flat
    dense
    round
    @click="triggerSideMenu"
    aria-label="Menu"
    >
      <q-icon name="menu" />
    </q-btn>

    <q-toolbar-title class="">
      <div class="row items-center vertical-middle">
        <div class="col-auto">
        <img v-if="leftDrawerOpen" class="cursor-pointer" src="~assets/images/logo.png" style="height:38px;">
        </div>
        <div class="col float-right" align="right">
          <q-btn flat color="grey-9" icon="far fa-bell"/>  
          <q-btn flat color="grey-9 vertical-middle">
            <span class="mobile-hide capitalize text-weight-regular">{{getUserName}}</span>
            <img src="https://pdc.techinasia.com/wp-content/uploads/2018/03/user60.png" style="height:30px;width:30px" class="vertical-middle">
            <!-- Direct child of target -->
            <q-menu class="shadow-8 " anchor="bottom middle" self="top middle" style="min-width:350px">
              <q-list separator link class="no-padding">
                <q-item v-close-overlay @click.native="showNotification">
                  <q-item-section icon="fas fa-user" inverted color="dark" />
                  <q-item-section>
                    <q-item-label label>My Account</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-close-overlay @click.native="$router.push('/login')">
                  <q-item-section icon="fas fa-sign-out-alt" inverted color="dark" />
                  <q-item-section>
                    <q-item-label label>Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-toolbar-title>
  </q-toolbar>
    </q-header>

    <q-drawer
      class="shadow-9"
      v-model="leftDrawerOpen"
      content-class="no-shadow"
      :content-style="{background: '#531b64',width:'250px'}"
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
      <transition
       :duration="{ enter: 300, leave: 300 }"
        appear
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        > 
      <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LayoutDefault",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      menus: [
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
        // {
        //   id: 7,
        //   to: "/super/admin/device/types/",
        //   name: "Devices",
        // },
        {
          id: 7,
          to: "/super/admin/manage/rental/charges",
          name: "Manage Rental Charges",
        },
        {
          id: 8,
          to: "/super/admin/manage/mdr/charges",
          name: "Manage MDR Charges",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("commonLoader", ["getToggleCommonLoader"]),
    getUserName() {
      return JSON.parse(localStorage.getItem("u_i")).user.name;
    },
  },
  methods: {
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    beforeEnter: function(el) {
      this.TOGGLE_COMMON_LOADER(true);
    },
    navigateToDashboard() {
      this.$router.push("/super/admin/dashboard");
    },

    triggerSideMenu() {
      // this.leftDrawerOpen = !this.leftDrawerOpen;
      this.$emit("fnToggleSideMenu");
    },

    // the done callback is optional when
    // used in combination with CSS
    enter: function(el, done) {
      done();
    },

    afterEnter: function(el) {
      this.TOGGLE_COMMON_LOADER(false);
    },
  },
};
</script>

<style scoped>
.menu-item-color {
  color: #e3e4e5;
  font-size: 14px;
}
.menu-main-item-color:hover {
  color: #e3e4e5;
  font-size: 14px;
  background: #531a65 !important;
}
.menu-main-item-color:active {
  color: #e3e4e5;
  font-size: 14px;
  background: #531a65 !important;
}

.menu-main-item-color:focus {
  color: #e3e4e5;
  font-size: 14px;
  background: #531a65 !important;
}

.q-item.active,
.q-item.router-link-active,
.q-item:focus {
  background: #3b084b !important;
  color: #e3e4e5;
}
</style>
