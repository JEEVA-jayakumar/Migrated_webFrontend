<template>
  <q-page>
    <!-- content -->
    <div>
      <!-- <pre>{{getAllHierarchiesData}}</pre> -->
      <q-table :rows="getAllPermissionData" table-class="customSATableClass" :columns="columns" :filter="filterSearch" :pagination="paginationControl" :filter-method="myCustomSearchFilter" row-key="name" color="grey-9">

        <q-td v-slot:body-cell-Permission="props" :props="props">
          {{props.row.label}}
        </q-td>
        <q-td v-slot:body-cell-PermissionCode="props" :props="props">
          {{props.row.shortCode}}
        </q-td>
        <q-td v-slot:body-cell-action="props" :props="props">
          <div class="row no-wrap no-padding">
            <q-btn dense no-caps no-wrap label="Modify" icon="far fa-plus-square" size="md" @click="fnShowEditPermission(props.row)" flat class="text-light-blue">
            </q-btn>
            <!-- <q-btn  dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md" @click="fnDisablePermission(props.row.id)" flat class="text-negative"> -->
            <!-- </q-btn> -->
          </div>
        </q-td>

        <template v-slot:top="props">
  
            <!--START: table title -->
            <div class="col-12 text-h6 q-my-lg text-weight-regular">Permissions</div>

            <!-- <div class="col-md-6 q-my-md" align="right">
              <q-btn no-caps no-wrap label="Add New Permission" class="q-mt-lg text-weight-regular" color="purple-9"  icon="far fa-plus-square" size="md" @click="fnshowCreatePermission()"/>
            </div> -->
            <!--END: table title -->

            <!--START: table filter,search -->
            <div class="col-md-6">
              <q-input
                clearable
                color="grey-9"
                v-model="filterSearch"
                placeholder="Type.."
                class="q-mr-lg"
              />
            </div>
            <!--END: table filter,search -->

        </template>

      </q-table>
     
    <!--START: Show create Permission -->
    <showCreatePermission 
    v-if="propShowCreatePermission" 
    :propShowCreatePermission="propShowCreatePermission"  
    :propGetAllPermissionData="getAllPermissionData"
    @emitfnshowAddPermissions="fnshowCreatePermission"
    ></showCreatePermission>
    <!--END: Show create Permission -->

    <!--START: Show edit Permission -->
      <showEditPermission 
      v-if="propShowEditPermission" 
      :propShowEditPermission="propShowEditPermission" 
      :propGetAllPermissionData="getAllPermissionData" 
      :propRowDetails="propRowDetails"
      @emitEditpermissionDetails="fnShowEditPermission"
      ></showEditPermission>
    <!--END: Show edit Permission -->

    </div>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import showCreatePermission from "../../components/super_admin/showCreatePermission.vue";
import showEditPermission from "../../components/super_admin/showEditPermission.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "users",
  components: {
    showCreatePermission,
    showEditPermission,
  },
  data() {
    return {
      propShowCreatePermission: false,
      propShowEditPermission: false,
      propRowDetails: "",

      filter: "",
      filterSearch: "",
      filter_values: "",
      multipleSelect: "",

      paginationControl: {
        rowsPerPage: 10,
      },

      //table information
      columns: [
        {
          name: "permission",
          required: true,
          label: "Permission",
          align: "left",
          field: "permission",
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
      tableData: [],
      filterPermissions: [],
    };
  },

  computed: {
    ...mapGetters("SuperAdminUsers", ["getAllPermissionData"]),
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_PERMISSIONS_DATA",
      "DELETE_PERMISSION_BY_PERMISSION_ID_DATA",
    ]),

    fnshowCreatePermission() {
      this.propShowCreatePermission = !this.propShowCreatePermission;
    },

    fnShowEditPermission(rowDetails) {
      this.propShowEditPermission = !this.propShowEditPermission;
      this.propRowDetails = rowDetails;
    },

    fnDisablePermission(PermissionId) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete Permission?",
          ok: "Continue",
          cancel: "Cancel",
        })
        .then(() => {
          this.DELETE_PERMISSION_BY_PERMISSION_ID_DATA(PermissionId)
            .then(response => {
              this.FETCH_ALL_PERMISSIONS_DATA();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully Deleted!",
                icon: "thumb_up",
              });
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

    //API for table filter using Permission permissions
    ajaxLoadDataForPermissionTable() {
      this.tableAjaxLoading = true;
      this.$q.loading.show({
        delay: 100, // ms
        message: "Please Wait",
        spinnerColor: "purple-9",
        customClass: "shadow-none",
      });
      this.FETCH_ALL_PERMISSIONS_DATA()
        .then(response => {
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
    /* START: Load user table data filter > Permissions */
    this.ajaxLoadDataForPermissionTable();
    /* End: Load user table data filter > Permissions */
  },
};
</script>

<style>
</style>
