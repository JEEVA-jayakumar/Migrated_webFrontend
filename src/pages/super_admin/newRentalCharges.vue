<template>
  <q-page>
    <div>
      <!--@select="goToUnassignedTab"-->
      <q-tabs v-model="selectedTab" class="shadow-1" color="grey-1" @select="goToUnassignedTab">
        <q-tab default color="dark" name="active" slot="title" label="Active Rental Charges" />
        <q-tab color="dark" name="deactive" slot="title" label="DeActived Rental Charges" />
        <q-tab-panel name="active">
          <!--STARTv-model: table Data -->
          <q-table table-class="customTableClass" :rows="tableData" :columns="columns" :filter="filterSearch"
            :pagination="paginationControl" row-key="name" :loading="toggleAjaxLoadFilter"
            :rows-per-page-options="[5, 10, 15, 20]" @request="ajaxLoadAllLeadInfo">
            <q-td v-slot:body-cell-leadSource="props" :props="props" class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row.leadSource.sourceName)">
              <span class="label text-primary">
                {{ props.row.leadSource.sourceName }}</span>
            </q-td>
            <q-td v-slot:body-cell-device="props" :props="props" class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row.device.deviceName)">
              <span class="label text-primary">
                {{ props.row.device.deviceName }}</span>
            </q-td>
            <q-td v-slot:body-cell-marsDeviceModel="props" :props="props" class="cursor-pointer">
              <span class="label">{{ props.row.marsDeviceModel == null ? "NA" : props.row.marsDeviceModel.name }}</span>
            </q-td>
            <q-td v-slot:body-cell-plan="props" :props="props" class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row.plan.planName)">
              <span class="label text-primary"> {{ props.row.plan.planName }}</span>
            </q-td>
            <q-td v-slot:body-cell-action="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md"
                  @click="fnDeleteRental(props.row)" flat class="text-negative"></q-btn>
              </div>
            </q-td>
            <q-td v-slot:body-cell-plan="props" :props="props">
              <q-btn align="left" dense flat no-wrap no-caps icon="fas fa-pencil-alt" color="primary"
                @click="editPlanDetails(props.row)" :label="props.row.plan.planName" class="capitalize" />
            </q-td>

            <template v-slot:top="props">
              <!--START: table filter,search -->
              <div class="col-md-12 group">
                <div class="row">
                  <div class="col-md-6">
                    <q-input clearable color="grey-9" v-model.trim="filterSearch" placeholder="Type.."
                      float-label="Search by Plan Name" />
                  </div>
                </div>
              </div>
              <div class="col-md-12" align="right">
                <q-btn no-caps class="text-weight-regular" @click="$router.push('/super/admin/manage/rental/charges')"
                  label="Add New Rental Charges" color="purple-9" size="md" />
              </div>
            </template>
          </q-table>
          <!--ENDv-model: table Data -->
        </q-tab-panel>
        <q-tab-panel name="deactive">
          <!--START: table Data -->
          <q-table table-class="customTableClass" :rows="deactiveTableData" :columns="columnsDeactive"
            :filter="filterSearch1" :pagination="paginationControl1" row-key="name"
            :loading="toggleAjaxLoadFilter1" :rows-per-page-options="[5, 10, 15, 20]" @request="ajaxLoadAllLeadInfo1">
            <q-td v-slot:body-cell-leadSource="props" :props="props" class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row.leadSource.sourceName)">
              <span class="label text-primary">
                {{ props.row.leadSource.sourceName }}</span>
            </q-td>
            <q-td v-slot:body-cell-device="props" :props="props" class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row.device.deviceName)">
              <span class="label text-primary">
                {{ props.row.device.deviceName }}</span>
            </q-td>
            <q-td v-slot:body-cell-action1="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Enable" icon="far fa-plus-square" size="md"
                  @click="fnEnableRental(props.row)" flat class="text-positive"></q-btn>
              </div>
            </q-td>
            <q-td v-slot:body-cell-marsDeviceModel="props" :props="props" class="cursor-pointer">
              <span class="label">{{ props.row.marsDeviceModel == null ? "NA" : props.row.marsDeviceModel.name }}</span>
            </q-td>
            <q-td v-slot:body-cell-plan="props" :props="props" class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row.plan.planName)">
              <span class="label text-primary"> {{ props.row.plan.planName }}</span>
            </q-td>

            <template v-slot:top="props">
              <!--START: table filter,search -->
              <div class="col-md-12 group">
                <div class="row">
                  <div class="col-md-6">
                    <q-input clearable color="grey-9" v-model.trim="filterSearch1" placeholder="Type.."
                      float-label="Search by Plan Name" />
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-12" align="right">
                <q-btn no-caps class="text-weight-regular" @click="$router.push('/super/admin/manage/rental/charges')"
                  label="Add New Rental Charges" color="purple-9" size="md" />
              </div> -->
            </template>
          </q-table>
          <!--END: table Data -->
        </q-tab-panel>
      </q-tabs>

      <EditRentalCharges v-if="propShoweditPlanDetails" :propShoweditPlanDetails="propShoweditPlanDetails"
        :propRowDetails="propRowDetails"  @emitfnshowEditRental="editPlanDetails"></EditRentalCharges>
    </div>
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
// import deleteUsersDetails from "../../components/super_admin/deleteUsersDetails.vue";
import EditRentalCharges from "../../pages/super_admin/editRentalCharges.vue";
export default {
  name: "getAllMdrPlanDetails",
  components: {
    // deleteUsersDetails,
    EditRentalCharges
  },
  data() {
    return {
      customizedHirarchyFilter: [],
      propShoweditPlanDetails: false,
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

      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "id",
        descending: false,
        rowsPerPage: 10
      },
      paginationControl1: {
        rowsNumber: 10,
        page: 1,
        sortBy: "id",
        descending: false,
        rowsPerPage: 10
      },

      formData: {
        selectedUsersToDelete: []
      },
      //table information
      // tableAjaxLoading: false,
      filterSearch: "",
      filterSearch1: "",

      filterSearchDeactivated: "",
      //Defining columns for table
      columns: [
        {
          name: "plan",
          required: true,
          label: "Plan Name",
          align: "left",
          field: row => {
            row.plan.planName;
          },
          //field:"sourceName",
          sortable: true
        },
        {
          name: "leadSource",
          required: true,
          label: "Lead Source",
          align: "left",
          field: row => {
            row.leadSource.sourceName;
          },
          sortable: true
        },
        {
          name: "device",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => {
            row.device.deviceName;
          },
          //field:"sourceName",
          sortable: true
        },
        {
          name: "marsDeviceModel",
          required: true,
          label: "Mars Device Model",
          align: "left",
          field: "marsDeviceModel",
          field: row => {
            row.marsDeviceModel.name;
          },
          sortable: true
        },
        {
          name: "setupFees",
          required: true,
          label: "setupFees",
          align: "left",
          field: "setupFees",
          //field:"sourceName",
          sortable: true
        },
        {
          name: "monthlyFees",
          required: true,
          label: "Recurring Fees",
          align: "left",
          field: "monthlyFees",
          sortable: true
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false
        }
      ],
      columnsDeactive: [
        {
          name: "plan",
          required: true,
          label: "Plan Name",
          align: "left",
          field: row => {
            row.plan.planName;
          },
          //field:"sourceName",
          sortable: true
        },
        {
          name: "leadSource",
          required: true,
          label: "Lead Source",
          align: "left",
          field: row => {
            row.leadSource.sourceName;
          },
          sortable: true
        },
        {
          name: "device",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => {
            row.device.deviceName;
          },
          //field:"sourceName",
          sortable: true
        },
        {
          name: "marsDeviceModel",
          required: true,
          label: "Mars Device Model",
          align: "left",
          field: "marsDeviceModel",
          field: row => {
            row.marsDeviceModel.name;
          },
          sortable: true
        },
        {
          name: "setupFees",
          required: true,
          label: "setupFees",
          align: "left",
          field: "setupFees",
          //field:"sourceName",
          sortable: true
        },
        {
          name: "monthlyFees",
          required: true,
          label: "Recurring Fees",
          align: "left",
          field: "monthlyFees",
          sortable: true
        },
        {
          name: "action1",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false
        }
      ],
      tableData: [],
      deactiveTableData: [],
      filterRoles: [],
      // select: '1',
      error: true,
      warning: false
    };
  },

  created() {
    this.ajaxLoadDataForRolesFilter();
    /* End: Load user table data filter > Roles */

    /* START: Load user table data filter > Hierarchy */
    this.ajaxLoadDataForHeirarchyFilter();
    /* End: Load user table data filter > Hierarchy */

    /* START: Load user table data filter > Hierarchy */
    this.ajaxLoadDataForRegionsFilter();
    /* End: Load user table data filter > Hierarchy */
  },
  beforeMount() { },

  computed: {
    ...mapGetters("SuperAdminUsers", [
      "getAllUsers",
      "getAllRoles",
      "getAllRegionsData",
      "getAllHierarchiesData",
      "getAllUserByUserIdData",
      "getAllStatesData"
    ]),
    ...mapGetters("getMatmDatas", ["getMatmDatas", "getMatmPlanDetails"]),

    ...mapGetters("mdrCharges", [
      "getAllMdrPlanDetails",
      "getAllMdrPlanEditDetails"
    ]),
    ...mapGetters("rentalCharges", ["getAllRentalPlanDetails", "getDeactivatedRentalPlanDetails"])
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filterSearch
    });
    this.ajaxLoadAllLeadInfo1({
      pagination: this.paginationControl1,
      filter: this.filterSearch1
    });
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
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
    ...mapActions("categoryBasedRental", ["ENABLE_OR_DISABLE_RENTAL_PLAN"]),
    fnEnableRental(request) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure, do you want to enable this Rental?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none"
          });
          request.active = request.active == false ? true : request.active;
          this.ENABLE_OR_DISABLE_RENTAL_PLAN(request)
            .then((response) => {
              this.ajaxLoadAllLeadInfo1({
                pagination: this.paginationControl1,
                filter: this.filterSearch1
              });
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully removed",
                icon: "thumb_up"
              });

            })
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: error.data.message,
            icon: "thumb_down"
          });
        });
    },
    fnDeleteRental(request) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete Rental?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none"
          });
          request.active = request.active == true ? false : request.active;
          this.ENABLE_OR_DISABLE_RENTAL_PLAN(request)
            .then(response => {
              this.ajaxLoadAllLeadInfo({
                pagination: this.paginationControl,
                filter: this.filterSearch
              });
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully removed",
                icon: "thumb_up"
              });

            })
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: error.data.message,
            icon: "thumb_down"
          });
        });
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
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filterSearch,
        });
      }
    },

    ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.FETCH_ALL_RENTAL_PLAN_DETAILS()
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
    editPlanDetails(rowDetails) {
      this.propShoweditPlanDetails = !this.propShoweditPlanDetails;
      // eslint-disable-next-line eqeqeq
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    toggleDeleteUsersModal() {
      this.showDeleteUserDetails = !this.showDeleteUserDetails;
    },
    deactivateMatmUser(id) {
      this.$q
        .dialog({
          title: "Alert",
          message: "Are You Sure want to Deactive the User?",
          ok: "Ok",
          cancel: "Cancel"
        })
        .then(() => {
          this.DEACTIVATE_MATM_USER_DETAILS(id).then(() => {
            this.FETCH_ALL_MATM_DATAS();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Deactive Successfully !",
              icon: "thumb_up"
            });
          });
        })
        .catch(() => { });
    },
    activateMatmUser(id) {
      this.$q
        .dialog({
          title: "Alert",
          message: "Are You Sure want to active the User?",
          ok: "Ok",
          cancel: "Cancel"
        })
        .then(() => {
          this.ACTIVATE_MATM_USER_DETAILS(id).then(() => {
            this.FETCH_ALL_MATM_DATAS();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Active Successfully !",
              icon: "thumb_up"
            });
          });
        })
        .catch(() => { });
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
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_ALL_RENTAL_PLAN_DETAILS({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getAllRentalPlanDetails.totalElements;
          this.paginationControl.page = this.getAllRentalPlanDetails.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getAllRentalPlanDetails.content;
          if (this.getAllRentalPlanDetails.sort != null) {
            this.paginationControl.sortBy = this.getAllRentalPlanDetails.sort[0].property;
            this.paginationControl.descending = this.getAllRentalPlanDetails.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    //API to fetch roles
    ajaxLoadDataForRolesFilter() {
      this.FETCH_ALL_ROLES_DATA();
    },

    //API to fetch hierarchy
    ajaxLoadDataForHeirarchyFilter() {
      this.FETCH_ALL_HIERARCHIES_DATA().then(response => {
        this.customizedHirarchyFilter = this.getAllHierarchiesData;
        this.customizedHirarchyFilter.unshift({ value: 0, label: "All" });
      });
    },

    //API to fetch hierarchy
    ajaxLoadDataForRegionsFilter() {
      this.FETCH_ALL_REGIONS_DATA();
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
  }
};
</script>

<style>
.customTabActive {
  background: purple;
  color: #fff;
}
</style>
