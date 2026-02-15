<template>
  <q-page>
    <!-- content -->
    <div>

      <q-tabs v-model="selectedTab" class="shadow-1" color="grey-1">
        <q-tab default color="dark" name="active" slot="title" label="Active TID" />
        <!-- <q-tab color="dark" name="deactive" slot="title" label="Deactive TID" /> -->

        <q-tab-panel name="active">
          <q-table :rows="getlsVasHostInstanceDetails" table-class="customSATableClass" :columns="columns" :filter="filterSearch"
            :pagination="paginationControl" :filter-method="myCustomSearchFilter" row-key="name" color="grey-9"
            @request="ajaxLoadAllLeadInfo">

            <q-td v-slot:body-cell-action="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Disable" icon="far fa-plus-square" size="md"
                  @click="fnDisable(props.row)" flat class="text-light-blue">
                </q-btn>

                <!-- <q-btn dense no-caps no-wrap label="Disable Role" icon="far fa-minus-square" size="md" @click="fnDisableRole(props.row)" flat class="text-negative"> -->
                <!-- </q-btn> -->
              </div>
            </q-td>
            <template v-slot:top="props">
              <div class="col-md-12 group">
                <div class="row">
                  <div class="col-md-6">
                    <q-input clearable color="grey-9" v-model.trim="filterSearch" placeholder="Type.."
                      float-label="Search by Plan Name" />
                  </div>
                </div>
              </div>
              <!--@click="$router.push('/super/admin/add/Multi/Tid/Configuration')" -->
              <div class="col-md-12" align="right">
                <q-btn no-caps class="text-weight-regular"
                @click="fnaddnewConfigurarions()"
                  label="Add New Configurations"
                  color="purple-9" size="md" />
              </div>
            </template>
          </q-table>
        </q-tab-panel>



      </q-tabs>

      <AddNewConfigurarions
       v-if="propShowAddNewConfigurarions" 
       :propShowAddNewConfigurarions="propShowAddNewConfigurarions"
      @emitfnshowAddConfiguration="propShowAddNewConfigurarions">
       </AddNewConfigurarions> 




    </div>
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';

import AddNewConfigurarions from "../../pages/super_admin/addMultiTidConfiguration.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "users",
  components: {
    AddNewConfigurarions,
  },
  data() {
    return {
      customizedHirarchyFilter: [],
      propShoweditPlanDetails: false,
      propShowAddNewConfigurarions: false,
      propRowDetails: "",
      activeItemId: 0,
      selectedTab: "active",
      activeTab: "tab-1",
      deteledUsers: [],
      getData: [],
      showDeleteUserDetails: false,
      bgColorClass: false,
      propShowAddUser: false,
      propShowEditUser: false,
      toggleAjaxLoadFilter: false,
      toggleAjaxLoadFilter1: false,
      // filter_values: "",
      multipleSelect: "",

      filterTabVisiblity: "",
      formData: {
        selectedUsersToDelete: []
      },
      //table information
      // tableAjaxLoading: false,
      filterSearch: "",
      filterSearch1: "",

      filterSearchDeactivated: "",

      paginationControl: {
        rowsPerPage: 10,
      },
      paginationControl1: {
        rowsPerPage: 10,
      },

      //table information
      columns: [
        {
          name: "institutionName",
          required: true,
          label: "Institution Name",
          align: "left",
          field: row => {
            return row.institution.institutionName;
          },
          sortable: false,
        },
        {
          name: "leadSource",
          required: true,
          label: "Lead Source",
          align: "left",
          field: row => {
            return row.leadSource.sourceName;
          },
          sortable: false,
        },
        {
          name: "masterHost",
          required: true,
          label: "Master Host",
          align: "left",
          field: row => {
            return row.masterHost.name;
          },
          sortable: false,
        },
        {
          name: "vas",
          required: true,
          label: "vas",
          align: "left",
          field: row => {
            return row.vas.name;
          },
          sortable: false,
        },
        // {
        //   name: "action",
        //   required: true,
        //   label: "",
        //   align: "left",
        //   field: "action",
        //   sortable: true
        // }
      ],
      columns1: [
        {
          name: "label",
          required: true,
          label: "Hierarchy",
          align: "left",
          field: "label",
          sortable: false,
        },
        {
          name: "shortCode",
          required: true,
          label: "Hierarchy Code",
          align: "left",
          field: "shortCode",
          sortable: false,
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: true
        }
      ],
      tableData: [],
      activeTableData: [],
      deActiveTableData: [],
      filterHierarchys: [],
    };
  },

  computed: {
    ...mapGetters("SuperAdminUsers", ["getAllHierarchiesData"]),
    ...mapGetters("lsVasHostInstance", ["getlsVasHostInstanceDetails"])
  },
  // created(){

  // },
  //  beforeMount(){
  //    console.log("DISABLE DATAS------------->",JSON.stringify(this.getAllHierarchiesData))
  //  },

  methods: {...mapActions("SuperAdminUsers", [
      "FETCH_ALL_USERS_DATA",
      "FETCH_ALL_STATES_DATA",
      "FETCH_ALL_ROLES_DATA",
      "FETCH_ALL_USERS_BY_ROLE_DATA",
      "FETCH_ALL_HIERARCHIES_DATA",
      "FETCH_ALL_REGIONS_DATA",
      "FETCH_ALL_USERS_BY_HIERARCHY_DATA",
      "FETCH_ALL_USERS_BY_USER_ID_DATA",
      "DELETE_SELECTED_USERS",
      "ACTIVATE_SELECTED_USERS"
    ]),
    ...mapActions("getMatmDatas", [
      "FETCH_ALL_MATM_DATAS",
      "FETCH_ALL_MATM_PLAN_DETAILS"
    ]),
    ...mapActions("reports", ["REPORT_LEAD_APPROVAL_TRACKER"]),
    ...mapActions("deactivatePlan", ["DELETE_PLAN_DETAILS"]),
    ...mapActions("activatePlan", ["ACTIVATE_PLAN_DETAILS"]),

    ...mapActions("deactiveMatmUser", ["DEACTIVATE_MATM_USER_DETAILS"]),
    ...mapActions("activeMatmUser", ["ACTIVATE_MATM_USER_DETAILS"]),

    ...mapActions("mdrCharges", [
      "FETCH_ALL_MDR_PLAN_DETAILS",
      "FETCH_ALL_MDR_PLAN_EDIT_DETAILS"
    ]),
    ...mapActions("rentalCharges", [
      "FETCH_ALL_RENTAL_PLAN_DETAILS", "FETCH_DEACTIVATED_RENTAL_PLAN_DETAILS",
      "FETCH_ALL_RENTAl_PLAN_EDIT_DETAILS", "ENABLE_OR_DISABLE_RENTAL_PLAN",
    ]),
    ...mapActions("lsVasHostInstance", ["GET_LS_VAS_HOST_INSTANCE_DETAILS"]),

    fnaddnewConfigurarions(){
      this.propShowAddNewConfigurarions= !this.propShowAddNewConfigurarions;
    },
   
    goToUnassignedTab(tab) {
      if (tab == "deactive") {
        let request = {
          pagination: this.paginationControl1,
          filter: this.filterSearch1,
        };
        this.toggleAjaxLoadFilter = true;
        this.FETCH_DEACTIVATED_RENTAL_PLAN_DETAILS(request)
          .then((response) => {
            this.toggleAjaxLoadFilter1 = false;
          })
          .catch((error) => {
            this.toggleAjaxLoadFilter1 = false;
          });
      } else {
        this.ajaxLoadAllLeadInfo();
      }
    },

    ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.GET_LS_VAS_HOST_INSTANCE_DETAILS()
        .then(response => {
          this.toggleAjaxLoadFilter = false;
        })
        .catch(error => {
          this.toggleAjaxLoadFilter = false;
        });
    },
    ajaxLoadAllLeadInfo1() {
      this.toggleAjaxLoadFilter1 = true;
      this.FETCH_DEACTIVATED_RENTAL_PLAN_DETAILS()
        .then(response => {
          this.toggleAjaxLoadFilter1 = false;
        })
        .catch(error => {
          this.toggleAjaxLoadFilter1 = false;
        });
    },
   
    toggleDeleteUsersModal() {
      this.showDeleteUserDetails = !this.showDeleteUserDetails;
    },
  
    ajaxLoadAllLeadInfo1({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_DEACTIVATED_RENTAL_PLAN_DETAILS({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getDeactivatedRentalPlanDetails.totalElements;
          this.paginationControl1.page = this.getDeactivatedRentalPlanDetails.number + 1;

          // then we update the rows with the fetched ones
          this.deactiveTableData = this.getDeactivatedRentalPlanDetails.content;
          if (this.getDeactivatedRentalPlanDetails.sort != null) {
            this.paginationControl1.sortBy = this.getDeactivatedRentalPlanDetails.sort[0].property;
            this.paginationControl1.descending = this.getDeactivatedRentalPlanDetails.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    ajaxLoadAllLeadInfo() {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.GET_LS_VAS_HOST_INSTANCE_DETAILS()
        .then(res => {
          this.tableData = this.getlsVasHostInstanceDetails;
          console.log("GET_LS_VAS_HOST_INSTANCE_DETAILS TABLE DATA-------->",JSON.stringify(this.tableData))
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

  

    myCustomSearchFilter(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      return rows.filter(row =>
        cols.some(
          col =>
            (cellValue(col, row) + "").toLowerCase().indexOf(lowerTerms) !== -1
        )
      );
    }

  },

  created() {
    this.ajaxLoadAllLeadInfo();
  },
};
</script>

<style>
</style>
