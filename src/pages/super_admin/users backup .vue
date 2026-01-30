<template>
	<q-page>  
		<!-- content -->
    <!-- <p>Test >> {{finalGetAllUsers}}</p> -->
		<div>
      <h2>tttt</h2>
      <pre>{{ getAllUsers }}</pre>
      <h2>tttt</h2>
      <pre>{{ testData }}</pre>
			<q-table :data="getAllUsers" :columns="columns" :filter="filterSearch" selection="multiple" :selected.sync="selectedSecond" :pagination.sync="paginationControl" :loading="tableAjaxLoading" row-key="name" color="grey-9">
				
				<q-td slot="body-cell-sales" slot-scope="props" :props="props">
					<img :src="props.row.profilePicture" class="avatar">
				</q-td>

				<q-td slot="body-cell-role" slot-scope="props" :props="props">
					<div class="row no-wrap">
						<div v-for="role in props.row.roles" :key="role.role">
							<!-- <q-chip v-if="role.role == 'RSM'" color="light-blue">
								{{role.role}}
							</q-chip>
							<q-chip v-else-if="role.role == 'ASM'" color="amber-9">
								{{role.role}}
							</q-chip>
							<q-chip v-else-if="role.role == 'TL'" color="light-blue">
								{{role.role}}
							</q-chip> -->
								<q-chip color="light-blue">
								{{role.role}}
							</q-chip>
						</div>
					</div>
				</q-td>

				 <q-td slot="body-cell-permission" slot-scope="props" :props="props">
					<div class="row no-wrap">
						<div v-for="role in props.row.roles" :key="role.role">
							<q-chip v-for="rolePermission in role.permission" :key="rolePermission.permission" color="grey-5" class="text-grey-9">
								{{rolePermission.permission}}
							</q-chip>
						</div>
					</div>
				</q-td>
	
				<template slot="top" slot-scope="props">
	
					<!--START: table title -->
					<div class="col-md-6 q-title q-mt-lg  text-weight-regular">Users</div>
						<!--END: table title -->

					<!--START: table filter,search -->
					<div class="col-md-6">
						<q-search
							clearable
							color="grey-9"
							v-model="filter"
							placeholder="Type.."
							float-label="Search by SO name, Merchant Name, Lead ID"
							class="q-mt-lg q-mr-lg"
						/>
					</div>
					<!--END: table filter,search -->

					<!--START: Tabs -->
					<div class="col-md-6">
						<div class="q-my-md">

							<q-btn v-for="tab in filtertabs" :key="tab.name" color="blue-grey-2 q-mx-xs" class="text-black" size="sm" rounded :label="tab.name">
							</q-btn>

						</div>
					</div>
					<div class="col-md-3 q-my-md">
						<q-select
							v-model="filter_values"
							separator
							color="grey-9"
							placeholder="Select"
							float-label="Filter By"
							:options="filterRoles"
						/>
					</div>
					<div class="col-md-3 q-my-md" align="right">
						<q-btn  
						flat
						color="white" 
						class="text-grey-9 q-mr-md"
						size="md"
						@click="fnDeleteUser"
						icon="far fa-trash-alt" 
						/>
						<q-btn 
						@click="fnShowAddUser"
						label="Add User"
						color="purple-9" 
						size="md"
						/>
					</div>
					<!--END: Tabs -->
				</template>

			</q-table>

			<showAddUser v-if="propShowAddUser" :propShowAddUser="propShowAddUser" @emitfnShowAddUser="fnShowAddUser" :propFilterRoles="filterRoles" ></showAddUser>
      
		</div>
	</q-page>
</template>

<script>
import showAddUser from "../../components/super_admin/showAddUser.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "users",
  components: {
    showAddUser
  },
  data() {
    return {
      propShowAddUser: false,
      filter: "",
      filter_values: "",
      multipleSelect: "",

      filtertabs: [
        {
          name: "ALL",
          value: 1
        },
        {
          name: "Sales",
          value: 2
        },
        {
          name: "Implementation",
          value: 3
        },
        {
          name: "Finance",
          value: 4
        }
      ],

      paginationControl: {
        rowsPerPage: 10
      },

      selectedSecond: [],

      //table information
      tableAjaxLoading: false,
      filterSearch: "",
      //Defining columns for table
      columns: [
        {
          name: "profilePicture",
          required: true,
          label: "Sales",
          align: "left",
          field: "profilePicture",
          sortable: true
        },
        {
          name: "name",
          required: true,
          label: "Name",
          align: "center",
          field: "name",
          sortable: true
        },
        {
          name: "employeeID",
          required: true,
          label: "Employee ID",
          align: "left",
          field: "employeeID",
          sortable: true
        },
        {
          name: "contactNumber",
          required: true,
          label: "Contact No",
          align: "left",
          field: "contactNumber",
          sortable: true
        },
        {
          name: "email",
          required: true,
          label: "Email ID",
          align: "left",
          field: "email",
          sortable: true
        },
        {
          name: "role",
          required: true,
          label: "Role",
          align: "center",
          field: "role",
          sortable: true
        },
        {
          name: "permission",
          required: true,
          label: "Permissions",
          align: "center",
          field: "permission",
          sortable: true
        },
        {
          name: "state",
          required: true,
          label: "Location",
          align: "left",
          field: "state",
          sortable: true
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
    // this.tableAjaxLoading = true;
    // setTimeout(() => {
    //   this.tableData = this.$store.state.SuperAdminUsers.allUserData;
    //   console.log("<< == START == >>");
    //   console.log(
    //     "Created >> Users list >>",
    //     this.$store.state.SuperAdminUsers.allUserData
    //   );
    //   this.tableAjaxLoading = false;
    // }, 2000);
    /* END: Load user table data */

    /* START: Load user table data filter > Roles */
    this.ajaxLoadDataForRolesFilter();
    setTimeout(() => {
      console.log(
        "Created >> Roles list >>",
        (this.filterRoles = this.$store.state.SuperAdminUsers.allRolesData)
      );
      console.log("<< == END == >>");
    }, 2000);
    /* End: Load user table data filter > Roles */
  },

  computed: {
    // ...mapGetters({
    //   finalGetAllUsers: "SuperAdminUsers/getAllUsers",
    //   finalGetAllRoles: "SuperAdminUsers/getAllRoles"
    // })
    ...mapGetters("SuperAdminUsers", [
        "testData"
      ]),

      // testData() {
      //   return this.$store.state.SuperAdminUsers.state.testtt
      // }
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_USERS_DATA",
      "FETCH_ALL_ROLES_DATA"
    ]),

    fnDeleteUser() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete users?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Deleted successfully!",
            icon: "thumb_up"
          });
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down"
          });
        });
    },

    fnShowAddUser() {
      this.propShowAddUser = !this.propShowAddUser;
    },

    //API for table data
    ajaxLoadDataForAllUsersList() {
      this.FETCH_ALL_USERS_DATA();
    },

    //API for table filter using role
    ajaxLoadDataForRolesFilter() {
      this.FETCH_ALL_ROLES_DATA();
    }
  }
};
</script>

<style>
</style>
