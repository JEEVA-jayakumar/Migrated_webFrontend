<template>
  <q-toolbar class="bg-custom-light-grey bottom-border" color="grey-9" flat inverted>
    <q-btn
      flat
      dense
      round
      @click="triggerSideMenu"
      aria-label="Menu"
      v-if="getRole != 'KSN'"
    >
      <q-icon name="menu" />
    </q-btn>
    <q-toolbar-title class>
      <div class="row items-center vertical-middle">
        <!-- {{localStorage.getItem('selectedTab')}} -->
        <div class="col-auto">
          <img
            v-if="leftDrawerOpen"
            class="cursor-pointer"
            src="~assets/images/logo.png"
            style="height:38px;"
          />
        </div>
        <div class="col float-right" align="right">
          <q-btn flat color="grey-9" icon="far fa-bell" />
          <q-btn flat color="grey-9 vertical-middle">
            <span class="mobile-hide capitalize text-weight-regular">{{getUserNAme}}</span>
            <img
              src="~assets/images/user.png"
              style="height:30px; width:30px; padding: 5px"
              class="vertical-middle"
            />
            <!-- Direct child of target -->
            <q-popover
              class="shadow-8"
              anchor="bottom middle"
              self="top middle"
              style="min-width:350px"
            >
              <q-list separator link class="no-padding">
                <q-item v-close-overlay @click.native="openMyAccount()">
                  <q-item-side icon="fas fa-user" inverted color="dark" />
                  <q-item-main>
                    <q-item-tile label>Change Password</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item v-close-overlay @click.native="clearLocalStorageData()">
                  <q-item-side icon="fas fa-sign-out-alt" inverted color="dark" />
                  <q-item-main>
                    <q-item-tile label>Logout</q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
        </div>
      </div>
    </q-toolbar-title>
    <toggleMyAccount
      v-if="toggleMyAccount"
      :propsToggleModal="toggleMyAccount"
      @propsToggleModal="openMyAccount"
    />
  </q-toolbar>
<!-- </q-modal> -->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import toggleMyAccount from "./toggleMyAccount.vue";
export default {
  // props: ["propRowDetails"],
  name: "LayoutDefault",
  components: {
    toggleMyAccount
  },
  data() {
    return {
      toggleMyAccount: false,
      // toggleModel: this.propShowDatas,
      leftDrawerOpen: this.$q.platform.is.desktop,
   
        // fnvalue:"",selectedTab
    };
  },
 
  methods: {
    triggerSideMenu() {
      // this.leftDrawerOpen = !this.leftDrawerOpen;
      this.$emit("fnToggleSideMenu");
    },
    clearLocalStorageData() {
      localStorage.removeItem("u_i");
      localStorage.removeItem("auth_token");
      this.$q.notify({
        color: "positive",
        position: "bottom",
        message: "Succesfully Logged Out",
        icon: "thumb_up"
      });
      this.$router.push({ name: "login" });
    },
    openMyAccount() {
      this.toggleMyAccount = !this.toggleMyAccount;
    }
  },
  computed: {
    getUserNAme() {
      return JSON.parse(localStorage.getItem("u_i")).user.name;
    },
    getRole() {
      if (JSON.parse(localStorage.getItem("u_i")).roles[0].role == "KSN") {
        this.$emit("fnToggleSideMenu");
      }
      return JSON.parse(localStorage.getItem("u_i")).roles[0].role;
    },
  },
};
</script>
