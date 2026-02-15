<template>
  <q-page>
    <div>
      <q-table
        table-class="customTableClass"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        row-key="name"
        :loading="toggleAjaxLoadFilter"
        :rows-per-page-options="[5,10,15,20]"
        @request="ajaxLoadAllLeadInfo"
             >
        <q-td v-slot:body-cell-active="props" :props="props">
               <span v-if="props.row.leadSourceId.active==true" class="label text-positive">Active</span>
                <span v-else-if="props.row.leadSourceId.active==false" class="label text-negative">DeActive</span>
                <span v-else>NA</span>
          </q-td>
          <q-td class="group" v-slot:body-cell-lock="props" :props="props">
          <q-btn v-if="props.row.leadSourceId.active==false" flat color="blue" @click="activateMatmUser(props.row.id)"><img src="statics/lock.png" style="height:35px;width:35px"></q-btn>
          <q-btn v-else-if="props.row.leadSourceId.active==true" flat color="blue" @click="deactivateMatmUser(props.row.id)"><img src="statics/unlock.png" style="height:35px;width:35px"></q-btn>
          
        </q-td>
          <q-td
          v-slot:body-cell-sourceName="props"
          :props="props"
          class="cursor-pointer"
          @click.native="toggleLeadInformation(props.row.leadSourceId.sourceName)"
        >
          <span class="label text-primary"> {{props.row.leadSourceId.sourceName}}</span>
        </q-td>
         <q-td
          v-slot:body-cell-deviceName="props"
          :props="props"
          class="cursor-pointer"
          @click.native="toggleLeadInformation(props.row.deviceId.deviceName)"
        >
          <span class="label text-primary"> {{props.row.deviceId.deviceName}}</span>
        </q-td>
        <q-td v-slot:body-cell-planName="props" :props="props">
          <q-btn
            align="left"
            dense
            flat
            no-wrap
            no-caps
            icon="fas fa-pencil-alt"
            color="primary"
            @click="editPlanDetails(props.row)"
            :label="props.row.planName"
            class="capitalize"
          />
        </q-td>
        <!-- <q-td v-slot:body-cell-action="props" :props="props">
           <q-btn
            highlight
            push
            class="q-mx-sm"
            color="positive"
            size="sm"
            @click="editPlanDetails(props.row)"
          >Edit Plan Details</q-btn>
        </q-td> -->
        <q-td v-slot:body-cell-delete="props" :props="props">
           <q-btn
            highlight
            push
            class="q-mx-sm"
            color="positive"
            size="sm"
            @click="deletePlanDetails(props.row)"
          >Delete Plan Details</q-btn>
        </q-td>

        <template v-slot:top="props">
          <!--START: table filter,search -->
          <div class="col-md-12 group">
            <div class="row">
              <div class="col-md-6">
                <q-input
                  clearable
                  color="grey-9"
                  v-model.trim="filterSearch"
                  placeholder="Type.."
                  float-label="Search by Plan Name"
                />
              </div>
             
            </div>
          </div>
          <div class="col-md-12" align="right">
                <q-btn no-caps class="text-weight-regular" @click="$router.push('/super/admin/manage/mATMplan')"
                  label="Add M-ATM Plan" color="purple-9" size="md" />
              </div>
        </template>
      </q-table>
      <deleteUsersDetails
        v-if="showDeleteUserDetails"
        :propDeteledUsers="deteledUsers"
        :propToggleModal="showDeleteUserDetails"
        @emitToggleDeleteUsersModal="toggleDeleteUsersModal"
      />
      <!-- @closeLeadsList="retrieveLeadsList" -->
    </div>
    <div v-if="toggleAjaxLoadFilter || toggleAjaxLoadFilter1" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import deleteUsersDetails from "../../components/super_admin/deleteUsersDetails.vue";
export default {
  name: "getMatmDatas",
  components: {
    deleteUsersDetails
  },
  data() {
    return {
      customizedHirarchyFilter: [],
      activeItemId: 0,
      activeTab: "tab-1",
      deteledUsers: [],
      getData: [],
      showDeleteUserDetails: false,
      bgColorClass: false,
      propShowAddUser: false,
      propShowEditUser: false,
      toggleAjaxLoadFilter: false,
            toggleAjaxLoadFilter1: false,
      filter: "",
      // filter_values: "",
      multipleSelect: "",

      filterTabVisiblity: "",

      paginationControl: {
        rowsNumber: 5,
        page: 1,
      },

      formData: {
        selectedUsersToDelete: []
      },
      //table information
      tableAjaxLoading: false,
      filterSearch: "",
      filterSearchDeactivated: "",
      //Defining columns for table
      columns: [
        {
          name: "planName",
          required: true,
          label: "Plan Name",
          align: "left",
          // field: row => {
          //   return row.data.planName;
          // },
           field:"planName",
          sortable: false
        },
         {
          name: "sourceName",
          required: true,
          label: "Lead Source",
          align: "left",
          field: row => {
             row.leadSourceId.sourceName;
          },
           //field:"sourceName",
          sortable: false
        },
        {
          name: "deviceName",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => {
             row.deviceId.deviceName;
          },
           //field:"sourceName",
          sortable: false
        },
          {
          name: "active",
          required: true,
          label: "Status",
          align: "left",
         
        },
         {
          name: 'action',
          required: true,
          label: '',
          align: 'center',
          field: 'action',
          sortable: true
        },
        {  
          name: 'lock',
          required: true,
          label: 'UserLock',
          align: 'UserLock',
          field: 'lock',
          sortable: true
        },
        {
          name: 'delete',
          required: true,
          label: '',
          align: 'center',
          field: 'delete',
          sortable: true
        },
        
      ],

      //Load from API
      //Function: ajaxLoadDataForAllUsersList
      // allUsers: [],
      tableData: [],

      //Load from API
      //Function: ajaxLoadDataForRolesFilter
      filterRoles: [],
      // select: '1',
      error: true,
      warning: false
    };
  },

  created() {
    /* START: Load user table data */
    // this.ajaxLoadDataForAllUsersList();
    /* END: Load user table data */

    /* START: Load user table data filter > Roles */
    this.ajaxLoadDataForRolesFilter();
    /* End: Load user table data filter > Roles */

    /* START: Load user table data filter > Hierarchy */
    this.ajaxLoadDataForHeirarchyFilter();
    /* End: Load user table data filter > Hierarchy */

    /* START: Load user table data filter > Hierarchy */
    this.ajaxLoadDataForRegionsFilter();
    /* End: Load user table data filter > Hierarchy */
  },
  beforeMount(){
      // this.getData = this.getMatmDatas;
     console.log("GET DATAS----------------->"+JSON.stringify(this.getMatmDatas))
  },

  computed: {
    ...mapGetters("SuperAdminUsers", [
      "getAllUsers",
      "getAllRoles",
      "getAllRegionsData",
      "getAllHierarchiesData",
      "getAllUserByUserIdData",
      "getAllStatesData"
    ]),
    ...mapGetters("getMatmDatas",["getMatmDatas","getMatmPlanDetails"]),
  },
    mounted () {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
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
    ...mapActions("getMatmDatas", ["FETCH_ALL_MATM_DATAS","FETCH_ALL_MATM_PLAN_DETAILS"]),
    ...mapActions("reports", ["REPORT_LEAD_APPROVAL_TRACKER"]),
    ...mapActions("deactivatePlan", ["DELETE_PLAN_DETAILS"]),
    ...mapActions("activatePlan", ["ACTIVATE_PLAN_DETAILS"]),
    ...mapActions("deletePlanDetails", ["DELETE_PLAN_DETAILS_DATAS"]),
     ...mapActions("deactiveMatmUser", ["DEACTIVATE_MATM_USER_DETAILS"]),
    ...mapActions("activeMatmUser", ["ACTIVATE_MATM_USER_DETAILS"]),

      ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.FETCH_ADDITIONAL_TID_DATAS()
        .then(response => {
          this.toggleAjaxLoadFilter = false;
        })
        .catch(error => {
          this.toggleAjaxLoadFilter = false;
        });
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
        .catch(() => {

        });
    },
    activateMatmUser(id){
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
        .catch(() => {
 
         
        });

    },
    deletePlanDetails(reqData){
        //  this.getData = this.getMatmDatas;
        // id
        console.log('the request data ' + JSON.stringify(reqData))
        let params = {
            Id: reqData.id
        };
          this.DELETE_PLAN_DETAILS_DATAS(params)
            .then(() => {
             this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Deleted the Plan",
              icon: "thumb_up"
        })
       })
         .catch(error => {
            console.log(error);
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again later!!",
              icon: "thumb_down"
            });
          })
        

    },
    editPlanDetails(reqData){
      console.log('the request data ' + JSON.stringify(reqData))
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Are you sure want to Edit Plans?',
          ok: 'Continue',
          cancel: 'Cancel'
        })
        .then(() => {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: 'purple-9',
            message: 'Processing ..'
          })

          this.FETCH_ALL_MATM_PLAN_DETAILS(reqData)
            .then(() => {
              // this.ajaxLoadAllLeadInfo();
              this.$q.loading.hide();
               this.$router.push({name: "editMatmPlans", params: {data: reqData}})
        })
        })
    },
      ajaxLoadAllLeadInfo ({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      });
      this.FETCH_ALL_MATM_DATAS({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          // this.paginationControl = pagination;

          // // we also set (or update) rowsNumber
          // this.paginationControl.rowsNumber = this.getMatmDatas.totalElements;
          // this.paginationControl.page = this.getMatmDatas.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getMatmDatas;
          // if (this.getadditionalTid.sort != null) {
          //   this.paginationControl.sortBy = this.getMatmDatas.sort[0].property;
          //   this.paginationControl.descending = this.getMatmDatas.sort[0].ascending;
          // }
            console.log(" GET MATM VALUES FROM Table Datas ---------------------->"+JSON.stringify(this.tableData));
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

    //API for table filter using hierarchy
    // ajaxLoadDataForRoleIdFilter() {
    //   if (this.filter_values != undefined) {
    //     this.FETCH_ALL_USERS_BY_ROLE_DATA(this.filter_values);
    //   }
    // },

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
