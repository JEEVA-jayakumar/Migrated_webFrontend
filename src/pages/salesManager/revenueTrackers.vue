<template>
  <q-page>
    <div>
      <div class="row">
        <div class="col-md-5 col-sm-6 col-xs-12">
          <!--START: table title -->
          <div class="text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">Revenue Tracker</div>
          <!--END: table title -->

          <!-- START: Role/user selection -->
          <div class="q-px-lg q-py-md text-weight-regular text-grey-8">
            <div class="row group">
              <div class="group">
                <!-- :class="[activeId == item.name && item.role == 'SO' ? 'bg-purple-9 text-white no-pointer-events':'bg-grey-5 text-dark']" -->
                <q-chip @click="breadCrumsNavigation(item,index)" v-for="(item,index) in items" :key="index" class="capitalize cursor-pointer" :class="customComputedClass(item)">
                  {{item.name}} / <small>{{item.role}}</small></q-chip>
              </div>
            </div>
          </div>
          <!-- END: Role/user selection -->

          <!--START: table aging pending/reject -->
          <q-table
            table-class="customTableClass"
            :rows="tableData.userList"
            v-model:columns="column"
            :filter="filter"
            :pagination="paginationControl"
            row-key="name">
            <q-tr v-slot:body="props" :class="[rowActiveId == props.row.__index? 'bg-grey-4 text-dark':'']" :props="props" @mouseover.native="rowHover(props.row.__index)" @click.native="rowClick(props.row)" class="cursor-pointer">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
            <template v-slot:top="props">
              <!--START: table filter,search,excel download -->
              <div class="col">
                <q-input
                clearable
                v-model="filter"
                separator
                color="grey-9"
                placeholder="Type.."
                float-label= "Search"
                class="q-mr-lg q-py-sm"
                />
              </div>
            </template>
          </q-table>
          <!--END: table table aging pending/reject -->
        </div>
        <div class="col-md-7 col-sm-6 col-xs-12">
          <q-card flat class="q-pa-xs" color="light-blue">
            <div class="row items-center">
              <div class="col-md-3 col-sm-3 col-xs-6 q-pa-md" align="center" style="border-right:1px solid #cecece">
                <q-icon size="30px" name="fas fa-money-check-alt"/>
              </div>
              <div class="col-md-9 col-sm-9 col-xs-6 q-pa-md">
                <div class="custom-dimmed">Target</div>
                <div class="q-display-1" v-if="tableData.currentUser.incentive.targetRevenue == 0">Nil</div>
                <div class="q-display-1" v-else><q-icon size="14px" class="custom-dimmed" name="fas fa-rupee-sign"/>
                &nbsp;{{tableData.currentUser.incentive.targetRevenue}}</div>
              </div>
            </div>
          </q-card>
          <div class="items-center">
            <q-list class="group" multiline no-border	>
              <q-item class="q-pa-lg" multiline>
                <q-item-section>
                  <q-item-label>
                    Revenue accrued from implemented merchants
                  </q-item-label>
                </q-item-section>
                <q-item-section right>
                  <q-item-label>
                    <q-icon size="14px" name="fas fa-rupee-sign"/> 
                    {{tableData.currentUser.incentive.implementedRevenue}}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="q-pa-lg" multiline>
                <q-item-section>
                  <q-item-label>
                    Revenue from pending implementations
                  </q-item-label>
                </q-item-section>
                <q-item-section right>
                  <q-item-label>
                    <q-icon size="14px" name="fas fa-rupee-sign"/> 
                    {{tableData.currentUser.incentive.pendingImplementationRevenue}}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="q-pa-lg items-center" multiline>
                <q-item-section class="vertical-middle">
                  <q-item-label>
                    Revenue percentage from target
                  </q-item-label>
                </q-item-section>
                <q-item-section right v-if="tableData.currentUser.incentive.targetRevenue == 0">
                  Nil
                </q-item-section>
                <q-item-section right v-else>
                  <div>
                    <RadialProgressBar 
                    :diameter="50"
                    :completed-steps="tableData.currentUser.incentive.revenuePercentage"
                    :total-steps="totalSteps"
                    :innerStrokeColor="innerStrokeColor"
                    :startColor="startColor"
                    :stopColor="stopColor"
                    :strokeWidth="strokeWidth"
                    :animateSpeed="animateSpeed"
                    >
                     <p class="no-margin"><small>{{ tableData.currentUser.incentive.revenuePercentage}}%</small></p>
                    </RadialProgressBar>
                  </div>
                </q-item-section>
              </q-item>  
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { required, and } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

import RadialProgressBar from "vue-radial-progress";

export default {
  name: "revenueTrackers",
  components: {
    RadialProgressBar
  },
  data() {
    return {
      strokeWidth: 3,
      animateSpeed: 500,
      startColor: "#421551",
      stopColor: "#421551",
      innerStrokeColor: "#cecece",
      completedSteps: 6,
      totalSteps: 100,
      paginationControl: {
        rowsPerPage: 10
      },
      filter: "",

      column: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
          sortable: false
        },
        {
          name: "userRoleName",
          required: true,
          label: "Role",
          align: "left",
          field: "userRoleName",
          sortable: false
        }
      ],
      tableData: {
        currentUser: {},
        userList: []
      },
      activeId: "",
      rowActiveId: "",
      items: []
    };
  },

  computed: {
    ...mapGetters("revenueTracker", ["revenueTrackerInfo"]),
    identifySalesHierarchyRole() {
      let self = this;
      /* Hierachy sales values has been taken from gloabl variables from plugin */
      return _.find(JSON.parse(localStorage.getItem("u_i")).roles, function(
        oo
      ) {
        return oo.hierarchy.hierarchyCode.includes(self.$HIERARCHY_SALES);
      });
    },
    customComputedClass() {
      return item => {
        if (this.activeId == item.name) {
          return "bg-purple-9 text-white no-pointer-events";
        } else if (this.activeId == item.name) {
          return "bg-purple-9 text-white";
        } else {
          return "bg-grey-5 text-dark";
        }
      };
    }
  },

  created() {
    this.fnLoadAllTableData();
  },
  methods: {
    ...mapActions("revenueTracker", ["REVENUE_TRACKER"]),
    // =============> On page loads

    fnLoadAllTableData(item) {
      //Setting up values when on new load and recursive actions
      let requestParams;
      if (item == undefined) {
        //Values for on load action
        requestParams = {
          heirarchyId: this.identifySalesHierarchyRole.hierarchy.id,
          userId: JSON.parse(localStorage.getItem("u_i")).user.id
        };
      } else {
        //Values for on click action
        requestParams = {
          heirarchyId: this.identifySalesHierarchyRole.hierarchy.id,
          userId: item.id
        };
      }
      this.REVENUE_TRACKER(requestParams).then(response => {
        this.tableData.currentUser = this.revenueTrackerInfo.currentUser;
        this.tableData.userList = this.revenueTrackerInfo.userList;
        if (this.items.length == 0) {
          let intialPushObj = {
            name: this.tableData.currentUser.name,
            id: this.tableData.currentUser.id,
            role: this.tableData.currentUser.userRoleName,
            hierarchyRoleLevel: this.tableData.currentUser.hierarchyRoleLevel
          };
          this.items.push(intialPushObj);
        }
      });
    },
    // =========================================> On page loads

    breadCrumsNavigation(item, index) {
      this.activeId = item.name;
      this.items.length = index + 1;
      this.fnLoadAllTableData(item);
    },

    rowClick(item, index) {
      if (item.hierarchyRoleLevel == this.$ROLE_HIERARCHY_SALES_SO) {
        let getIndex = this.items.findIndex(p => p.name == this.activeId);
        console.log("this.items", this.items);
        console.log("this.items[getIndex]", this.activeId);
        if (
          this.items[getIndex].hierarchyRoleLevel ==
          this.$ROLE_HIERARCHY_SALES_SO
        ) {
          this.items.splice(getIndex, 1);
        }
        this.items.push({
          name: item.name,
          role: item.userRoleName,
          id: item.id,
          hierarchyRoleLevel: item.hierarchyRoleLevel
        });
        this.activeId = item.name;
        this.rowActiveId = index;

        //Values for on click action
        let requestParams = {
          heirarchyId: this.identifySalesHierarchyRole.hierarchy.id,
          userId: item.id
        };
        this.REVENUE_TRACKER(requestParams).then(response => {
          this.tableData.currentUser = this.revenueTrackerInfo.currentUser;
        });
      } else {
        this.items.push({
          name: item.name,
          role: item.userRoleName,
          id: item.id,
          hierarchyRoleLevel: item.hierarchyRoleLevel
        });
        this.activeId = item.name;
        this.rowActiveId = index;
        this.fnLoadAllTableData(item);
      }
    },
    rowHover(index) {
      this.rowActiveId = index;
    },

    progress(event, progress, stepValue) {
      console.log(stepValue);
    },
    progress_end(event) {
      console.log("Circle progress end");
    }
  }
};
</script>

<style>
.custom-dimmed {
  color: rgba(255, 255, 255, 0.85);
}
</style>
