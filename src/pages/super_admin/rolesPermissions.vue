<template>
  <q-page>
    <!-- content -->
    <div>

      <q-tabs v-model="selectedTab" class="shadow-1" color="grey-1" @select="changeTabs">
        <q-tab default color="dark" name="active" slot="title" label="Active Roles" />
        <q-tab color="dark" name="deactive" slot="title" label="Deactive Roles" />

         <q-tab-panel name="active">
           <q-table :rows="activeTableData" table-class="customSATableClass" :columns="columns" :filter="filterSearch" :pagination="paginationControl" :filter-method="myCustomSearchFilter" row-key="name" color="grey-9">
        <q-td v-slot:body-cell-action="props" :props="props">
          <div class="row no-wrap no-padding">
            <q-btn dense no-caps no-wrap label="Modify Role/Permissions" icon="far fa-plus-square" size="md" @click="fnShowEditRole(props.row)" flat class="text-light-blue">
            </q-btn>

            <q-btn dense no-caps no-wrap label="Disable Role" icon="far fa-minus-square" size="md" @click="fnDisableRole(props.row)" flat class="text-negative">
            </q-btn>
          </div>
        </q-td>

        <template v-slot:top="props">
  
            <!--START: table title -->
           


            <!-- Can be enabled in future for adding new role to application-->
            <!-- <div class="col-md-6 q-my-md" align="right">
              <q-btn no-caps no-wrap label="Add New Role" class="q-mt-lg text-weight-regular" color="purple-9"  icon="far fa-plus-square" size="md" @click="fnshowCreateRole()"/>
            </div> -->
            <!-- Can be enabled in future for adding new role to application -->

            <!--END: table title -->

            <!--START: table filter,search -->
            <div class="col-6">
              <q-input
                clearable
                color="grey-9"
                v-model="filterSearch"
                placeholder="Type.."
                class="q-mr-lg"
              />
            </div>
            <div class="col-md-12" align="right">
            <q-btn
              no-caps
              class="text-weight-regular"
              @click="fnshowAddRole(props.row)"
              label="Add New Role"
              color="purple-9"
              size="md"
            />
          </div>
            <!--ENDv-model: table filter,search -->

        </template>

      </q-table>
         </q-tab-panel>
         <q-tab-panel name="deactive">
           <q-table :rows="deactivatedTableData" table-class="customSATableClass" :columns="columns1" :filter="filterSearch1" :pagination="paginationControl1" :filter-method="myCustomSearchFilter" row-key="name" color="grey-9">
        <q-td v-slot:body-cell-action="props" :props="props">
          <div class="row no-wrap no-padding">
            <!-- <q-btn dense no-caps no-wrap label="Modify Role/Permissions" icon="far fa-plus-square" size="md" @click="fnShowEditRole(props.row)" flat class="text-light-blue">
            </q-btn> -->

            <q-btn dense no-caps no-wrap label="Active" icon="far fa-minus-square" size="md" @click="fnActiveRoles(props.row)" flat class="text-negative">
            </q-btn>
          </div>
        </q-td>

        <template v-slot:top="props">
  
            <!--START: table title -->
            

            <!-- Can be enabled in future for adding new role to application-->
            <!-- <div class="col-md-6 q-my-md" align="right">
              <q-btn no-caps no-wrap label="Add New Role" class="q-mt-lg text-weight-regular" color="purple-9"  icon="far fa-plus-square" size="md" @click="fnshowCreateRole()"/>
            </div> -->
            <!-- Can be enabled in future for adding new role to application -->

            <!--END: table title -->

            <!--START: table filter,search -->
            <div class="col-6">
              <q-input
                clearable
                color="grey-9"
                v-model="filterSearch1"
                placeholder="Type.."
                class="q-mr-lg"
              />
            </div>
            <!--END: table filter,search -->

        </template>

      </q-table>
         </q-tab-panel>
      </q-tabs>

       <!--START: Show create role -->
      <showCreateRole 
      v-if="propShowCreateRole" 
      :propGetAllHierarchiesData="getAllHierarchiesData"
      :proprolePermissions="propShowCreateRole"  
      @emitCreaterolePermissions="fnshowCreateRole"
      ></showCreateRole>
      <!--END: Show create role -->

      <!--START: Show edit role -->
      <showEditRole 
      v-if="propShowEditRole" 
      :proprolePermissions="propShowEditRole"  
      :propRowDetails="propRowDetails"
      :propGetAllHierarchiesData="getAllHierarchiesData"
      @emitfnEditrolePermissions="fnShowEditRole"
      ></showEditRole>
      <!--END: Show edit role -->
       <showAddRole
      v-if="showAddRole"
      :propRowDetails="propRowDetails"
      :propsToggleModal1="showAddRole"
      @propsToggleModal1="fnshowAddRole"
    />




    </div>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import showCreateRole from "../../components/super_admin/showCreateRole.vue";
import showEditRole from "../../components/super_admin/ShowEditRole.vue";
import showAddRole from "../../components/super_admin/showAddRole.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "users",
  components: {
    showCreateRole,
    showEditRole,
    showAddRole,
  },
  data() {
    return {
      propGetAllRegionData: [],
      propGetAllHierarchyData: [],
      propShowCreateRole: false,
      propShowEditRole: false,
      propRowDetails: "",
      selectedTab: "",
       showAddRole: false,
      propShowAddRole: false,

      filter: "",
      filterSearch: "",
      filterSearch1: "",
      filter_values: "",
      multipleSelect: "",

      paginationControl: {
        rowsPerPage: 10,
      },
      paginationControl1:{
        rowsPerPage: 10,
      },

      //table information
      columns: [
        {
          name: "hierarchy",
          required: true,
          label: "Hierarchy",
          align: "left",
          field: row => {
            if (row.hierarchy) {
              return row.hierarchy.hierarchy;
            } else {
              return "NA";
            }
          },
          sortable: false,
        },
        {
          name: "role",
          required: true,
          label: "Role",
          align: "left",
          field: "role",
          sortable: false,
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false,
        },
      ],
      
        columns1: [
        {
          name: "hierarchy",
          required: true,
          label: "Hierarchy",
          align: "left",
          field: row => {
            if (row.hierarchy) {
              return row.hierarchy.hierarchy;
            } else {
              return "NA";
            }
          },
          sortable: false,
        },
        {
          name: "role",
          required: true,
          label: "Role",
          align: "left",
          field: "role",
          sortable: false,
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false,
        },
      ],

      loading: true,
      tableData: [], 
      activeTableData: [],
      deactivatedTableData: [],
      select: "goog",
      error: true,
      warning: false,
      filterRoles: [],
    };
  },

  computed: {
    ...mapGetters("SuperAdminUsers", [
      "getAllRolesPermissions",
      "getAllFilterRoles",
      "getAllHierarchiesData",
    ]),
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_ROLES_PERMISSIONS_DATA",
      "FETCH_ALL_HIERARCHIES_DATA",
      "DELETE_ROLE_BY_ROLE_ID_DATA","ACTIVATE_ROLE_BY_ROLE_ID_DATA"
    ]),

    changeTabs(tab) {
      if (tab == "deactive") {
        this.ajaxLoadDataForRolesPermissions();
      } else {
        this.ajaxLoadDataForRolesPermissions();
      }
    },

    fnshowCreateRole() {
      this.propShowCreateRole = !this.propShowCreateRole;
    },
     fnshowAddRole(rowDetails) {
      this.propRowDetails = rowDetails;
      this.showAddRole = !this.showAddRole;
    },


    fnShowEditRole(rowDetails) {
      this.propRowDetails = rowDetails;
      this.propShowEditRole = !this.propShowEditRole;
    },
    fnActiveRoles(roleId){
      console.log("ACTIVATED ROLES DETAILS--------->",JSON.stringify(roleId))
            this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to active role?",
          ok: "Continue",
          cancel: "Cancel",
        })
        .then(() => {
          let param = {
            id: roleId.id,
            role: roleId.role,
            roleColor:roleId.roleColor,
            hierarchyId: roleId.hierarchy.id,
          };
          this.ACTIVATE_ROLE_BY_ROLE_ID_DATA(param)
            .then(response => {
              this.FETCH_ALL_ROLES_PERMISSIONS_DATA();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully Deleted!",
                icon: "thumb_up",
              });
              this.ajaxLoadDataForRolesPermissions();
            })
            .catch(() => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                icon: "thumb_down",
              });
            });
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down",
          });
        });
    },

    fnDisableRole(roleId) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete role?",
          ok: "Continue",
          cancel: "Cancel",
        })
        .then(() => {
          this.DELETE_ROLE_BY_ROLE_ID_DATA(roleId)
            .then(response => {
              this.FETCH_ALL_ROLES_PERMISSIONS_DATA();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully Deleted!",
                icon: "thumb_up",
              });
              this.ajaxLoadDataForRolesPermissions();
            })
            .catch(() => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                icon: "thumb_down",
              });
            });
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down",
          });
        });
    },

    //API for table filter using role permissions
    ajaxLoadDataForRolesPermissions() {
      this.tableAjaxLoading = true;
      this.$q.loading.show({
        delay: 100, // ms
        message: "Please Wait",
        spinnerColor: "purple-9",
        customClass: "shadow-none",
      });
      this.FETCH_ALL_ROLES_PERMISSIONS_DATA()
        .then(response => {
          console.log("role 123 DATA-------->", JSON.stringify(this.getAllRolesPermissions))
          this.tableData = this.getAllRolesPermissions;
          this.activeTableData = this.getAllRolesPermissions.filter(service => service.active == true);
          this.deactivatedTableData = this.getAllRolesPermissions.filter(service => service.active == false);
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
            icon: "thumb_down",
          });
        });
    },
    ajaxLoadDataForHierarchyData() {
      this.FETCH_ALL_HIERARCHIES_DATA();
    },

    myCustomSearchFilter(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      return rows.filter(row =>
        cols.some(
          col =>
            (cellValue(col, row) + "").toLowerCase().indexOf(lowerTerms) !== -1
        )
      );
    },
  },

  created() {
    /* START: Load user table data filter > Roles */
    this.ajaxLoadDataForRolesPermissions();
    /* End: Load user table data filter > Roles */

    /* START: Load user table data filter > Roles */
    this.ajaxLoadDataForHierarchyData();
    /* End: Load user table data filter > Roles */
  },
};
</script>

<style>
</style>
