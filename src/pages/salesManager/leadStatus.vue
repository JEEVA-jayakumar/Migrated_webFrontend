<template>
  <q-page>
    <div>
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <!-- //Common lead information in popup -->
      <userLeadInformation
        v-if="propUserLeads"
        :propUserId="propUserId"
        :propAction="propAction"
        :propToggleLeadInformationModal="propUserLeads"
        @fetchCurrentUserLeads="fetchCurrentUserLeads"
      />
      <!--START: table title -->
      <div class="q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">Lead Status</div>
      <!--END: table title -->
      <!-- START: Role/user selection -->
      <div class="q-px-lg q-py-md text-weight-regular text-grey-8">
        <div class="row group">
          <div class="group">
            <!-- :class="[activeId == item.name && item.role == 'SO' ? 'bg-purple-9 text-white no-pointer-events':'bg-grey-5 text-dark']" -->
            <q-chip
              @click="breadCrumsNavigation(item,index)"
              v-for="(item,index) in items"
              :key="index"
              class="capitalize cursor-pointer"
              :class="customComputedClass(item)"
            >
              {{item.name}} /
              <small>{{item.role}}</small>
            </q-chip>
          </div>
        </div>
      </div>
      <!-- END: Role/user selection -->
      <!-- START: Lead Stats -->
      <div class="q-px-lg text-weight-regular text-grey-8">
        <q-card class="q-pa-md shadow-4" align="center">
          <div class="row justify-center">
            <div class="col-md-2 col-sm-4 col-xs-6">
              <div>Short Lead</div>
              <div class="q-py-sm">
                <q-btn
                  @click="fetchCurrentUserLeads(activeUserId,$SALES_MANAGER_STATUS_SHORT_LEADS)"
                  color="purple-9"
                  size="md"
                  round
                >{{statusCount.shortLeadCount == undefined ? 0 : statusCount.shortLeadCount}}</q-btn>
              </div>
            </div>
            <div class="col-md-2 col-sm-4 col-xs-6">
              <div>WIP Lead</div>
              <div class="q-py-sm">
                <q-btn
                  @click="fetchCurrentUserLeads(activeUserId,$SALES_MANAGER_STATUS_WIP_LEADS)"
                  color="purple-9"
                  size="md"
                  round
                >{{statusCount.wipLeadCount == undefined ? 0 : statusCount.wipLeadCount}}</q-btn>
              </div>
            </div>
            <div class="col-md-2 col-sm-4 col-xs-6">
              <div>Rejected</div>
              <div class="q-py-sm">
                <q-btn
                  @click="fetchCurrentUserLeads(activeUserId,$SALES_MANAGER_STATUS_REJECTED_LEADS)"
                  color="purple-9"
                  size="md"
                  round
                >{{statusCount.rejectedLeadCount == undefined ? 0 : statusCount.rejectedLeadCount}}</q-btn>
              </div>
            </div>
            <div class="col-md-2 col-sm-4 col-xs-6">
              <div>Implemented</div>
              <div class="q-py-sm">
                <q-btn
                  @click="fetchCurrentUserLeads(activeUserId,$SALES_MANAGER_STATUS_IMPLEMENTATION_LEADS)"
                  color="purple-9"
                  size="md"
                  round
                >{{statusCount.implementationCount == undefined ? 0 : statusCount.implementationCount}}</q-btn>
              </div>
            </div>
            <div class="col-md-2 col-sm-4 col-xs-6">
              <div>Submitted to SAT</div>
              <div class="q-py-sm">
                <q-btn
                  @click="fetchCurrentUserLeads(activeUserId,$SALES_MANAGER_STATUS_SUBMIT_TO_SAT_LEADS)"
                  color="purple-9"
                  size="md"
                  round
                >{{statusCount.submitToSatCount == undefined ? 0 : statusCount.submitToSatCount}}</q-btn>
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <!-- END: Lead Stats -->
      <div class="q-px-lg q-py-md row items-center">
        <!--START: table title -->
        <div
          class="col-md-7 q-title text-weight-regular text-grey-9"
        >{{getLeadStatusUserDetails == undefined?'':getLeadStatusUserDetails.leadCount.userRoleName}} List</div>
        <!--END: table title -->
        <!--START: table search -->
        <div class="col-md-5">
          <q-search
            clearable
            v-model="filter"
            separator
            color="grey-9"
            placeholder="Type.."
            float-label="Search"
          />
        </div>
        <!--END: table search -->
      </div>
      <!--START: table data -->
      <q-table
        v-if="viewTableFormatAndNotTabs"
        table-class="customTableClass"
        :data="tableDataNormal"
        :columns="columns"
        :filter="filter"
        :pagination.sync="paginationControl"
        row-key="name"
      >
        <q-tr
          slot="body"
          slot-scope="props"
          :class="[rowActiveId == props.row.__index? 'bg-grey-4 text-dark':'']"
          :props="props"
          @mouseover.native="rowHover(props.row.__index)"
          @click.native="rowClick(props.row)"
          class="cursor-pointer"
        >
          <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
        </q-tr>
      </q-table>
      <!--END: table data -->
      <!-- content -->
      <q-tabs
        v-if="!viewTableFormatAndNotTabs"
        v-model="tabsModel"
        text-color="grey-14"
        color="white"
        two-lines
        no-pane-border
      >
        <!--START: tabs header -->
        <q-tab
          @select="fnLoadSOTableData"
          v-for="tabHeader in tabs.tabsHeader"
          :key="tabHeader.value"
          :name="tabHeader.value"
          :label="tabHeader.label"
          class="text-dark"
          slot="title"
        />
     
        <!--END: tabs header -->
        <!--START: tabs body -->
        <q-tab-pane
          v-for="tBodyContent in tabs.tabsBody"
          :key="tBodyContent.value"
          :name="tBodyContent.value"
        >
          <!--START: table aging pending/reject -->
          <q-table
            table-class="customTableClass"
            :data="tBodyContent.customData.tableData"
            :columns="tBodyContent.customData.columns"
            :filter="filter"
            :pagination.sync="paginationControl"
            row-key="name"
          >
            <q-td
              slot="body-cell-shortleadDate"
              slot-scope="props"
              :props="props"
            >{{props.row.shortleadDate | moment("Do MMM Y")}}</q-td>
            <q-td
              slot="body-cell-id"
              slot-scope="props"
              :props="props"
              class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row)"
            >
              <span class="label text-primary">#{{props.row.leadNumber}}</span>
            </q-td>
          </q-table>
          <!--END: table table aging pending/reject -->
        </q-tab-pane>
        <!--END: tabs body -->
      </q-tabs>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import generalLeadInformation from "../../components/generalLeadInformation.vue";
import userLeadInformation from "../../components/sat/userLeadInformation.vue";
export default {
  components: {
    generalLeadInformation,
    userLeadInformation
  },
  name: "LeadStatus",
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      propUserLeads: null,
      propUserId: null,
      propAction: null,

      statusCount: {
        shortLeadCount: 0,
        wipLeadCount: 0,
        rejectedLeadCount: 0,
        implementationCount: 0,
        submitToSatCount: 0
      },
      activeUserId: JSON.parse(localStorage.getItem("u_i")).user.id,
      viewTableFormatAndNotTabs: true,
      activeId: "",
      rowActiveId: "",
      items: [],
      paginationControl: {
        rowsPerPage: 10
      },
      filter: "",
      tableDataNormal: [],
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "shortLead",
          required: true,
          label: "Short Lead",
          align: "center",
          field: "shortLeadCount",
          sortable: true
        },
        {
          name: "WIPLead",
          required: true,
          label: "WIP Lead",
          align: "center",
          field: "wipLeadCount",
          sortable: true
        },
        {
          name: "rejected",
          required: true,
          label: "Rejected",
          align: "center",
          field: "rejectedLeadCount",
          sortable: true
        },
        {
          name: "implementation",
          required: true,
          label: "Implementation",
          align: "center",
          field: "implementationCount",
          sortable: true
        },
        {
          name: "submittedToSat",
          required: true,
          label: "Submitted to SAT",
          align: "center",
          field: "submitToSatCount",
          sortable: true
        }
      ],
      loading: true,

      tabsModel: "xtab-1",

      tabs: {
        tabsHeader: [
          {
            label: "Short Leads",
            value: "xtab-1"
          },
          {
            label: "WIP Lead",
            value: "xtab-2"
          },
          {
            label: "Rejected",
            value: "xtab-3"
          },
          {
            label: "Implementation",
            value: "xtab-4"
          }
        ],
        tabsBody: [
          {
            value: "xtab-1",
            tableFilter: "",
            customData: {
              columns: [
                {
                  name: "shortleadDate",
                  required: true,
                  label: "Date(C)",
                  align: "left",
                  field: "shortleadDate",
                  sortable: true
                },
                {
                  name: "id",
                  required: true,
                  label: "Lead ID",
                  align: "left",
                  field: row => {
                    return "# " + row.leadNumber;
                  },
                  sortable: true
                },
                {
                  name: "leadName",
                  required: true,
                  label: "SO Name",
                  align: "left",
                  field: "leadName",
                  sortable: true
                },
                {
                  name: "state",
                  required: true,
                  label: "state",
                  align: "left",
                  field: "state",
                  sortable: true
                }
              ],
              tableData: []
            }
          },
          {
            value: "xtab-2",
            tableFilter: "",
            customData: {
              columns: [
                {
                  name: "shortleadDate",
                  required: true,
                  label: "Date(C)",
                  align: "left",
                  field: "shortleadDate",
                  sortable: true
                },
                {
                  name: "id",
                  required: true,
                  label: "Lead ID",
                  align: "left",
                  field: row => {
                    return "# " + row.leadNumber;
                  },
                  sortable: true
                },
                {
                  name: "leadName",
                  required: true,
                  label: "SO Name",
                  align: "left",
                  field: "leadName",
                  sortable: true
                },
                {
                  name: "state",
                  required: true,
                  label: "state",
                  align: "left",
                  field: "state",
                  sortable: true
                }
              ],
              tableData: []
            }
          },
          {
            value: "xtab-3",
            tableFilter: "",
            customData: {
              columns: [
                {
                  name: "shortleadDate",
                  required: true,
                  label: "Date(C)",
                  align: "left",
                  field: "shortleadDate",
                  sortable: true
                },
                {
                  name: "id",
                  required: true,
                  label: "Lead ID",
                  align: "left",
                  field: row => {
                    return "# " + row.leadNumber;
                  },
                  sortable: true
                },
                {
                  name: "leadName",
                  required: true,
                  label: "SO Name",
                  align: "left",
                  field: "leadName",
                  sortable: true
                },
                {
                  name: "state",
                  required: true,
                  label: "state",
                  align: "left",
                  field: "state",
                  sortable: true
                }
              ],
              tableData: []
            }
          },
          {
            value: "xtab-4",
            tableFilter: "",
            customData: {
              columns: [
                {
                  name: "shortleadDate",
                  required: true,
                  label: "Date(C)",
                  align: "left",
                  field: "shortleadDate",
                  sortable: true
                },
                {
                  name: "id",
                  required: true,
                  label: "Lead ID",
                  align: "left",
                  field: row => {
                    return "#" + row.leadNumber;
                  },
                  sortable: true
                },
                {
                  name: "leadName",
                  required: true,
                  label: "SO Name",
                  align: "left",
                  field: "leadName",
                  sortable: true
                },
                {
                  name: "state",
                  required: true,
                  label: "state",
                  align: "left",
                  field: "state",
                  sortable: true
                }
              ],
              tableData: []
            }
          }
        ]
      }
    };
  },
  created() {
    this.loadBreadCrums();
    this.fnLoadAllTableData();
  },
  computed: {
    ...mapGetters("SM_LeadStatusInDetail", [
      "getLeadStatusUserDetails",
      "getLeadStatusUserDetails_ShortLeads",
      "getLeadStatusUserDetails_WIP",
      "getLeadStatusUserDetails_Rejected",
      "getLeadStatusUserDetails_Implementation"
    ]),

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
        if (this.activeId == item.name && item.role == "SO") {
          return "bg-purple-9 text-white no-pointer-events";
        } else if (this.activeId == item.name) {
          return "bg-purple-9 text-white";
        } else {
          return "bg-grey-5 text-dark";
        }
      };
    }
  },
  methods: {
    ...mapActions("SM_LeadStatusInDetail", [
      "LEAD_STATUS_IN_DETAIL",
      "LEAD_STATUS_IN_DETAIL_SO"
    ]),

    // =============> On page loads
    loadBreadCrums() {
      let intialUserInformation = _.find(
        JSON.parse(localStorage.getItem("u_i")).roles,
        function(oo) {
          return oo.hierarchy.hierarchyCode.includes("SH");
        }
      );
      let intialPushObj = {
        name: JSON.parse(localStorage.getItem("u_i")).user.name,
        id: JSON.parse(localStorage.getItem("u_i")).user.id,
        role: intialUserInformation.role,
        userRoleName: ""
      };
      this.items.push(intialPushObj);
    },
    // =========================================> On page loads

    rowClick(item, index) {
      this.items.push({
        name: item.name,
        role: this.getLeadStatusUserDetails.leadCount.userRoleName,
        id: item.id,
        hierarchyRoleLevel: item.hierarchyRoleLevel
      });
      this.activeId = item.name;
      this.activeUserId = item.id;
      this.rowActiveId = index;

      // Condition to check if the last-before screen has reached
      // TODO => SO name is static now
      if (item.hierarchyRoleLevel == this.$ROLE_HIERARCHY_SALES_SO) {
        // console.log("item.userRoleName", item);
        this.currentUserIndex = item.id;
        this.fnLoadSOTableData(item);
        this.viewTableFormatAndNotTabs = false;
      } else {
        this.fnLoadAllTableData(item);
        this.viewTableFormatAndNotTabs = true;
      }
    },

    breadCrumsNavigation(item, index) {
      this.activeId = item.name;
      this.items.length = index + 1;

      // Condition to check if the last-before screen has reached
      // TODO => SO name is static now
      if (item.hierarchyRoleLevel == this.$ROLE_HIERARCHY_SALES_SO) {
        this.currentUserIndex = item.id;
        this.fnLoadSOTableData(item);
        this.viewTableFormatAndNotTabs = false;
      } else {
        this.fnLoadAllTableData(item);
        this.viewTableFormatAndNotTabs = true;
      }
    },

    rowHover(index) {
      this.rowActiveId = index;
    },

    fnLoadAllTableData(item) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching list.."
      });
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
      this.LEAD_STATUS_IN_DETAIL(requestParams)
        .then(response => {
          //Come on man, dont panic. I'm just populating the count values respectively
          this.tableDataNormal = this.getLeadStatusUserDetails.userListCount;
          this.statusCount.shortLeadCount = this.getLeadStatusUserDetails.leadCount.shortLeadCount;
          this.statusCount.wipLeadCount = this.getLeadStatusUserDetails.leadCount.wipLeadCount;
          this.statusCount.rejectedLeadCount = this.getLeadStatusUserDetails.leadCount.rejectedLeadCount;
          this.statusCount.implementationCount = this.getLeadStatusUserDetails.leadCount.implementationCount;
          this.statusCount.submitToSatCount = this.getLeadStatusUserDetails.leadCount.submitToSatCount;
          this.$q.loading.hide();
        })
        .catch(error => {
          if (error.status == this.$API_BAD_REQUEST) {
            this.statusCount.shortLeadCount = 0;
            this.statusCount.wipLeadCount = 0;
            this.statusCount.rejectedLeadCount = 0;
            this.statusCount.implementationCount = 0;
            this.statusCount.submitToSatCount = 0;
            this.tableDataNormal = [];
          } else {
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: "Oh snap! the list is empty",
              icon: "info"
            });
          }
          this.$q.loading.hide();
        });
    },
    // Function to load data for SO role
    fnLoadSOTableData(item) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching list.."
      });
      let self = this;
      // Finding the exact table data to bind the response
      let findTabElement = _.find(this.tabs.tabsBody, function(o) {
        return o.value == self.tabsModel;
      });

      findTabElement.customData.tableData = [];

      //Values for on click action
      let requestParams = {
        userId: this.currentUserIndex,
        tabsModel: self.tabsModel
      };
      self
        .LEAD_STATUS_IN_DETAIL_SO(requestParams)
        .then(response => {
          let assumeArr = [];

          // Assigning values to respective table after API call
          if (self.tabsModel == "xtab-1") {
            findTabElement.customData.tableData = this.getLeadStatusUserDetails_ShortLeads.leadInformation;
            assumeArr = this.getLeadStatusUserDetails_ShortLeads.leadCount;
          } else if (self.tabsModel == "xtab-2") {
            findTabElement.customData.tableData = this.getLeadStatusUserDetails_WIP.leadInformation;
            assumeArr = this.getLeadStatusUserDetails_ShortLeads.leadCount;
          } else if (self.tabsModel == "xtab-3") {
            findTabElement.customData.tableData = this.getLeadStatusUserDetails_Rejected.leadInformation;
            assumeArr = this.getLeadStatusUserDetails_ShortLeads.leadCount;
          } else {
            findTabElement.customData.tableData = this.getLeadStatusUserDetails_Implementation.leadInformation;
            assumeArr = this.getLeadStatusUserDetails_ShortLeads.leadCount;
          }

          //Come on man, dont panic. I'm just populating the count
          this.statusCount.shortLeadCount = assumeArr.shortLeadCount;
          this.statusCount.wipLeadCount = assumeArr.wipLeadCount;
          this.statusCount.rejectedLeadCount = assumeArr.rejectedLeadCount;
          this.statusCount.implementationCount = assumeArr.implementationCount;
          this.statusCount.submitToSatCount = assumeArr.submitToSatCount;

          this.$q.loading.hide();
        })
        .catch(error => {
          self.$q.notify({
            color: "negative",
            position: "bottom",
            message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
            icon: "thumb_down"
          });
          this.$q.loading.hide();
        });
    },

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    fetchCurrentUserLeads(userId, action) {
      this.propUserLeads = !this.propUserLeads;
      if (userId != undefined) {
        this.propUserId = userId;
        this.propAction = action;
      }
    }
  }
};
</script>

<style scoped>
.btn-border-radius {
  border-radius: 20px;
  padding: 10px;
}
</style>
