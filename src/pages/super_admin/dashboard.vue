<template>
  <q-page class="q-pa-lg">
    <!-- content -->
    <div>
    <!-- START: Total users -->
      <div>
        <div class="row">
          <div class="col-md-8">
            <div class="q-title text-grey-9">Dashboard</div>
            <div class="q-caption q-mt-md text-grey-8">Welcome to Super Admin!</div>
          </div>
          <!-- <div class="col-md-4">
            <q-datetime v-model="dateFilter" float-label="Select Date" type="date" class="q-mt-lg q-mr-lg" color="grey-9" />
          </div> -->
        </div>
        <div class="q-pa-lg">
          <div class="row">
            <div class="col-md-4">
              <q-card inline class="bigger q-ma-sm full-width" style="border: 1px solid #3b084b33">
                <q-card-title class="relative-position">
                  <div class="ellipsis q-subheading text-purple-9">Total Users</div>
                </q-card-title>
                <q-card-main>
                  <div class="row">
                    <div class="col-md-8">
                      <span class="q-display-1 text-grey-9 q-mr-md">{{getAllDashboardCount.totalUserCount}}</span>
                      <span class="q-caption text-grey-9 text-weight-light">Users</span>
                    </div>
                    <div class="col-md-4" align="right">
                      <q-icon style="height:60px;width:60px" size="24px" color="white" class="bg-purple-9 q-pa-md border-radius-10" name="fas fa-user-plus" />
                    </div>
                  </div>
                </q-card-main>
              </q-card>
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-md-12" v-for="(item,index) in getAllDashboardCount.userCountResponse" :key="index">
              <q-card flat class="no-padding">
                <q-card-title>
                  <div class="q-title">{{item.hierarchy.hierarchy}}</div>
                </q-card-title>
                <q-card-main class="no-padding">
                  <div class="row group">
                    <div v-for="(roleItem,roleIndex) in item.role" :key="roleIndex" class="col-md-3 col-sm-6 col-xs-9">
                      <q-card inline class="bigger full-width">
                        <q-card-title class="relative-position">
                          <div class="ellipsis q-subheading text-grey-9">{{roleItem.role}}</div>
                        </q-card-title>
                        <q-card-main>
                          <div class="row">
                            <div class="col-md-8">
                              <span class="q-display-1 text-grey-9 q-mr-md">{{roleItem.count}}</span>
                              <span class="q-caption text-grey-9 text-weight-light">Users</span>
                            </div>
                            <div class="col-md-4" align="right">
                              <q-icon style="height:60px;width:60px" size="24px" color="white" :style="{background:roleItem.roleColor}" class="q-pa-md border-radius-10" name="fas fa-user" />
                            </div>
                          </div>
                        </q-card-main>
                      </q-card>
                    </div>
                  </div>
                </q-card-main>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Total users -->
  
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "superAdminDashboard",
  data() {
    return {
      dateFilter: "",
      totalUsers: 0
    };
  },

  created() {
    /* START: Load user table data */
    this.ajaxLoadDataForDashboardCount();
    /* END: Load user table data */
  },

  computed: {
    ...mapGetters("SuperAdminUsers", ["getAllDashboardCount"])
  },

  methods: {
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_DASHBOARD_COUNTS"]),
    ajaxLoadDataForDashboardCount() {
      this.FETCH_ALL_DASHBOARD_COUNTS();
      // .then(() => {
      //   let totalUsersCount = 0;
      //   _.map(this.getAllDashboardCount, function(oo) {
      //     totalUsersCount = totalUsersCount + oo.count;
      //   });
      //   this.totalUsers = totalUsersCount;
      // });
    }
  }
};
</script>

<style>
.border-radius-10 {
  border-radius: 10px;
}
</style>
