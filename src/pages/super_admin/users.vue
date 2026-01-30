<template>
  <q-page>
    <div>
      <q-tabs v-model="activeTab" class="shadow-1" color="grey-1" @select="changeTabs">
        <q-tab default color="dark" name="tab-1" slot="title" label="Active Users" />
        <q-tab color="dark" name="tab-2" slot="title" label="De-activated Users" />
        <q-tab-pane name="tab-1">
          <!--START: table Data -->
          <q-table :data="getAllUsers" :columns="columns" table-class="customSATableClass" :filter="filterSearch"
            selection="multiple" :selected.sync="formData.selectedUsersToDelete" :pagination.sync="paginationControl"
            :loading="tableAjaxLoading" :filter-method="myCustomSearchFilter" row-key="userId" color="grey-9">
            <q-td slot="body-cell-name" slot-scope="props" :props="props">
              <q-btn align="left" dense flat no-wrap no-caps icon="fas fa-pencil-alt" color="primary"
                @click="fnShowEditUser(props.row.userId)" :label="props.row.user.name" class="capitalize" />
            </q-td>

            <q-td slot="body-cell-role" slot-scope="props" :props="props">
              <div class="row no-wrap group" v-for="role in props.row.roles" :key="role.role">
                <!-- <q-chip :style="{ background: role.roleColor}"> -->
                <q-chip color="light" class="text-dark">
                  <span>{{ role.hierarchy.hierarchyCode }}</span>
                  | {{ role.role }}
                </q-chip>
              </div>
            </q-td>

            <template slot="top" slot-scope="props">
              <!--START: table filter,search -->
              <div class="col-md-12 group">
                <div class="row">
                  <div class="col-md-6">
                    <q-search clearable color="grey-9" v-model.trim="filterSearch" placeholder="Type.."
                      float-label="Search by Name, Merchant Name, Lead ID" />
                  </div>
                  <div class="col-md-3"></div>
                  <div class="col-md-3">
                    <q-select clearable v-model="filter_values" separator color="grey-9" placeholder="Select"
                      float-label="Filter By" @clear="ajaxLoadDataForAllUsersList"
                      @input="ajaxLoadDataForRoleIdFilter()" :options="getAllRoles" />
                  </div>
                </div>
              </div>
              <!--END: table filter,search -->
              <!--START: Tabs -->
              <div class="col-md-12">
                <div class="row justify-between">
                  <div class="col">
                    <q-btn v-for="(tab, index) in getAllHierarchiesData" :key="index" ref="removeClass"
                      class="text-black q-ma-xs" size="sm" :class="[
                        activeItemId === index
                          ? 'customTabActive text-light'
                          : 'bg-blue-grey-2'
                      ]" @click="ajaxLoadDataForHeirarchyIdFilter(index, tab)" rounded :label="tab.label" />
                  </div>
                  <div class="col-auto" align="right">
                    <div class="row justify-evenly">
                      <div class="col-auto q-px-xs">
                        <q-btn :disabled="formData.selectedUsersToDelete.length == 0" flat color="white"
                          class="text-grey-9"
                          @click="activate_deactivate_users(formData.selectedUsersToDelete)"
                          icon="far fa-trash-alt" />
                      </div>
                      <div class="col-auto q-px-xs">
                        <downloadExcel :data="getAllUsers" :fields="json_fields" name="UserDetails.xls">
                          <q-btn outline color="grey-9" label="Download as excel" />
                        </downloadExcel>
                      </div>
                      <div class="col-auto q-px-xs">
                        <q-btn no-caps class="text-weight-regular" @click="$router.push('/super/admin/users/add/user')"
                          label="Add User" color="purple-9" size="md" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--END: Tabs -->
            </template>
          </q-table>
          <!--END: table Data -->
        </q-tab-pane>
        <q-tab-pane name="tab-2">
          <!--START: table Data   :data="getImplementationQueueUnassignedList"  -->
          <q-table :data="getAllUsers" :columns="columns" table-class="customSATableClass" :filter="filterSearch"
            selection="multiple" :selected.sync="formData.selectedUsersToDelete" :pagination.sync="paginationControl"
            :loading="tableAjaxLoading" :filter-method="myCustomSearchFilter" row-key="userId" color="grey-9">
            <q-td slot="body-cell-name" slot-scope="props" :props="props">
              <q-btn align="left" dense flat no-wrap no-caps icon="fas fa-pencil-alt" color="primary"
                @click="fnShowEditUser(props.row.userId)" :label="props.row.user.name" class="capitalize" />
            </q-td>

            <q-td slot="body-cell-role" slot-scope="props" :props="props">
              <div class="row no-wrap group" v-for="role in props.row.roles" :key="role.role">
                <!-- <q-chip :style="{ background: role.roleColor}"> -->
                <q-chip color="light" class="text-dark">
                  <span>{{ role.hierarchy.hierarchyCode }}</span>
                  | {{ role.role }}
                </q-chip>
              </div>
            </q-td>

            <template slot="top" slot-scope="props">
              <!--START: table filter,search -->
              <div class="col-md-12 group">
                <div class="row items-stretch">
                  <div class="col-md-6">
                    <q-search clearable color="grey-9" v-model.trim="filterSearch" placeholder="Type.."
                      float-label="Search by Name, Merchant Name, Lead ID" />
                  </div>
                  <div class="col-md-6" align="right">
                    <q-btn :disabled="formData.selectedUsersToDelete.length == 0" flat color="white"
                      class="text-grey-9 q-mr-md" size="md"
                      @click="activate_deactivate_users(formData.selectedUsersToDelete)" icon="far fa-trash-alt" />
                  </div>
                </div>
              </div>
            </template>
          </q-table>
          <!--END: table Data -->
        </q-tab-pane>
      </q-tabs>

      <deleteUsersDetails v-if="showDeleteUserDetails" :propDeteledUsers="deteledUsers"
        :propToggleModal="showDeleteUserDetails" @emitToggleDeleteUsersModal="toggleDeleteUsersModal" />
      <!-- @closeLeadsList="retrieveLeadsList" -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import downloadExcel from "vue-json-excel";
import deleteUsersDetails from "../../components/super_admin/deleteUsersDetails.vue";
export default {
  name: "users",
  components: {
    deleteUsersDetails,
    downloadExcel
  },
  data() {
    return {
      customizedHirarchyFilter: [],
      json_fields: {
        Name: "user.name",
        EmployeeID: "user.employeeID",
        ContactNo: "user.contactNumber",
        EmailID: "user.email",
        Role: {
          field: 'roles',
          callback: (value) => {
            let role = "";
            if (value.length > 0) {
              value.map(v => {
                if (role == "")
                  role = v.role;
                else
                  role = role + " | " + v.role;
              })
            }
            return role;
          }
        },
        ReportingTo: {
          field: 'roles',
          callback: (value) => {
            let predecessor = "";
            if (value.length > 0) {
              value.map(v => {
                if (predecessor == "")
                  predecessor = v.predecessor != null ? v.predecessor.email : "";
                else
                  predecessor = predecessor + " | " + v.predecessor != null ? v.predecessor.email : "";
              })
            }
            return predecessor;
          }
        },
        Location: "user.city"
      },
      activeItemId: 0,
      activeTab: "tab-1",
      deteledUsers: [],
      showDeleteUserDetails: false,
      bgColorClass: false,
      propShowAddUser: false,
      propShowEditUser: false,
      filter: "",
      filter_values: "",
      multipleSelect: "",

      filterTabVisiblity: "",

      paginationControl: {
        rowsPerPage: 10,
        page: 1
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
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => {
            return row.user.name;
          },
          sortable: false
        },
        {
          name: "employeeID",
          required: true,
          label: "Employee ID",
          align: "left",
          field: row => {
            return row.user.employeeID;
          },
          sortable: true
        },
        {
          name: "contactNumber",
          required: true,
          label: "Contact No",
          align: "left",
          field: row => {
            return row.user.contactNumber;
          },
          sortable: false
        },
        {
          name: "email",
          required: true,
          label: "Email ID",
          align: "left",
          field: row => {
            return row.user.email;
          },
          sortable: false
        },
        {
          name: "role",
          required: true,
          label: "Role",
          align: "left",
          field: "role",
          sortable: false
        },
        {
          name: "city",
          required: true,
          label: "Location",
          align: "left",
          field: row => {
            return row.user.city;
          },
          sortable: false
        }
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
    this.ajaxLoadDataForAllUsersList();
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

  computed: {
    ...mapGetters("SuperAdminUsers", [
      "getAllUsers",
      "getAllRoles",
      "getAllRegionsData",
      "getAllHierarchiesData",
      "getAllUserByUserIdData",
      "getAllStatesData"
    ])
  },
  beforeMount() {
    console.log("GET ALL USER--------->", JSON.stringify(this.getAllUsers))
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
    ...mapActions("reports", ["REPORT_LEAD_APPROVAL_TRACKER"]),

    //Load all short lead info while page loading
    changeTabs(tab) {
      if (tab == "tab-2") {
        this.ajaxLoadDataForAllUsersList({
          pagination: this.paginationControl,
          filter: this.filterSearch
        });
      } else {
        this.ajaxLoadDataForAllUsersList({
          pagination: this.paginationControl,
          filter: this.filterSearch
        });
      }
    },
    activate_deactivate_users(selectedUsersToDelete) {
      if (selectedUsersToDelete.length < 1) {
        this.$q.notify({
          color: "warning",
          position: "bottom",
          message: "You must select atleast one item to proceed!",
          icon: "warning"
        });
      } else {
        this.$q
          .dialog({
            title: "Confirm",
            message:
              this.activeTab == "tab-2"
                ? "Are you sure want to activate users?"
                : "Are you sure want to delete users?",
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

            let usersSelectSync = [];
            selectedUsersToDelete.map(function (value, key) {
              usersSelectSync.push(value.userId);
            });

            if (this.activeTab == "tab-2") {
              this.activateUsers(usersSelectSync)
                .then(() => {
                  this.FETCH_ALL_USERS_DATA();
                  this.formData.selectedUsersToDelete = [];
                  this.$q.loading.hide();
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: "Successfully Activated!",
                    icon: "thumb_up"
                  });
                })
                .catch(error => {
                  this.$q.loading.hide();
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message:
                      error.body.message == null
                        ? "Please Try Again Later !"
                        : error.body.message,
                    icon: "thumb_down"
                  });
                });
            } else {
              this.deactivateUsers(usersSelectSync)
                .then(response => {
                  this.formData.selectedUsersToDelete = [];
                  this.$q.loading.hide();
                  // this.$q.notify({
                  //   color: "negative",
                  //   position: "bottom",
                  //   message: "Successfully Deactivated!",
                  //   icon: "thumb_up"
                  // });
                  this.deteledUsers = response.data.data;
                  this.toggleDeleteUsersModal();
                })
                .catch(error => {
                  this.$q.loading.hide();
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message:
                      error.body.message == null
                        ? "Please Try Again Later !"
                        : error.body.message,
                    icon: "thumb_down"
                  });
                });
            }
          })
          .catch(err => {
            console.log(err);
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "No changes made!",
              icon: "thumb_down"
            });
          });
      }
    },
    toggleDeleteUsersModal() {
      this.showDeleteUserDetails = !this.showDeleteUserDetails;
    },

    activateUsers(usersSelectSync) {
      return this.ACTIVATE_SELECTED_USERS(usersSelectSync);
    },
    deactivateUsers(usersSelectSync) {
      return this.DELETE_SELECTED_USERS(usersSelectSync);
    },

    fnShowEditUser(userId) {
      this.$router.push(
        "/super/admin/users/edit/user/" +
        userId +
        "/" +
        this.paginationControl.page +
        "/" +
        this.paginationControl.rowsPerPage
      );
    },
    // fndownload(){
    //    const datas =this.getAllUsers;
    //   let output = '';
    //   console.log(datas);
    //   // while (index < datas.length) {
    //   //   console.log(datas[index].stan);
    //   //   output += datas[index].stan;
    //   //   output += '\r\n';
    //   //   index += 1;
    //   // }
    //   datas.forEach(element => {

    //     output += element.serialNumber;
    //     output += '\r\n';
    //   });

    //   const file = new Blob([output],

    //     { type: 'text/plain;charset=utf-8' });
    //   // element.href = URL.createObjectURL(file);
    //   // element.download = "serialNumber.txt";
    //   // document.body.appendChild(element);

    //   // element.click();
    //    let link = document.createElement("a");
    //         link.href = window.URL.createObjectURL(file);
    //         link.download = "serialNumber.txt"

    //         link.click();
    // },

    //API to fetch table data
    ajaxLoadDataForAllUsersList() {
      this.$q.loading.show({
        delay: 100, // ms
        message: "Fetching List ..",
        spinnerColor: "purple-9",
        customClass: "shadow-none"
      });
      this.formData.selectedUsersToDelete = [];
      this.FETCH_ALL_USERS_DATA(
        this.activeTab == "tab-2" ? this.$INACTIVE_FLAG_FOR_LIST : undefined
      )
        .then(() => {
          this.paginationControl.page =
            this.$route.params.page == undefined ? 1 : this.$route.params.page;
          this.paginationControl.rowsPerPage =
            this.$route.params.perPage == undefined
              ? 10
              : this.paginationControl.perPage;
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
    ajaxLoadDataForRoleIdFilter() {
      if (this.filter_values != undefined) {
        this.FETCH_ALL_USERS_BY_ROLE_DATA(this.filter_values);
      }
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

    //API for table filter using hierarchy
    ajaxLoadDataForHeirarchyIdFilter(itemIndex, tab) {
      this.$q.loading.show({
        delay: 100, // ms
        message: "Please Wait",
        spinnerColor: "purple-9",
        customClass: "shadow-none"
      });
      this.activeItemId = itemIndex;
      if (tab.value == 0) {
        this.FETCH_ALL_USERS_DATA().then(() => {
          this.$q.loading.hide();
        });
      } else {
        this.FETCH_ALL_USERS_BY_HIERARCHY_DATA(tab.value).then(() => {
          this.$q.loading.hide();
        });
      }
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
