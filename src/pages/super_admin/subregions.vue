<template>
  <q-page>
    <!-- content -->
    <div>
      <q-table
        :data="getAllPincodes"
        table-class="customSATableClass"
        :columns="columns"
        :filter="filter"
        :pagination.sync="serverPagination"
        row-key="name"
        :loading="loading"
        @request="searchRequest"
        color="grey-9"
      >
        <q-td slot="body-cell-action" slot-scope="props" :props="props">
          <div class="row no-wrap no-padding">
            <q-btn
              dense
              no-caps
              no-wrap
              label="Modify"
              icon="far fa-plus-square"
              size="md"
              @click="fnShowEditPincode(props.row)"
              flat
              class="text-light-blue"
            ></q-btn>
            <!-- <q-btn  dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md" @click="fnDisablePermission(props.row.id)" flat class="text-negative">
            </q-btn>-->
          </div>
        </q-td>

        <template slot="top" slot-scope="props">
          <!--START: table title -->
          <div class="col-md-6 q-title q-mt-lg text-weight-regular">Pincodes</div>

          <div class="col-md-6 q-my-md" align="right">
            <q-btn
              no-caps
              no-wrap
              label="Add New Regions"
              class="q-mt-lg text-weight-regular"
              color="purple-9"
              icon="far fa-plus-square"
              size="md"
              @click="fnshowCreatePincodes()"
            />
          </div>
          <!--END: table title -->

          <!--START: table filter,search -->
          <div class="col-md-5">
            <q-search
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              class="q-mr-lg"
            />
          </div>
          <!--END: table filter,search -->
        </template>
      </q-table>

      <!--START: Show create Pincode -->
      <addPincode
        v-if="propShowCreatePincodes"
        :propShowCreatePincodes="propShowCreatePincodes"
        @emitfnshowAddPincodes="fnshowCreatePincodes"
      ></addPincode>
      <!--END: Show create Pincode -->

      <!--START: Show edit Pincode -->
      <editPincode
        v-if="propShowEditPincodes"
        :propShowEditPincodes="propShowEditPincodes"
        :propRowDetails="propRowDetails"
        @emitfnshowEditPincodes="fnShowEditPincode"
      ></editPincode>
      <!--END: Show edit Pincode -->
    </div>
  </q-page>
</template>

<script>
import addPincode from "../../components/super_admin/addPincode.vue";
import editPincode from "../../components/super_admin/editPincode.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "users",
  components: {
    addPincode,
    editPincode
  },
  data() {
    return {
      propShowCreatePincodes: false,
      propShowEditPincodes: false,
      propRowDetails: "",

      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 10 // specifying this determines pagination is server-side
      },

      filter: "",
      //table information
      columns: [
        {
          name: "pincode",
          required: true,
          label: "Pincode",
          align: "left",
          field: "pincode",
          sortable: false
        },
        {
          name: "stateName",
          required: true,
          label: "State",
          align: "left",
          field: "stateName",
          sortable: false
        },
        {
          name: "cityName",
          required: true,
          label: "City",
          align: "left",
          field: "cityName",
          sortable: false
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false
        }
      ]
    };
  },

  created() {
    /* START: Load user table data filter > Permissions */
    this.ajaxLoadDataForPermissionTable();
    /* End: Load user table data filter > Permissions */
  },

  computed: {
    ...mapGetters("pincodes", ["getAllPincodes"])
  },

  methods: {
    ...mapActions("pincodes", ["FETCH_ALL_PINCODES"]),

    //API for table filter using Pincode
    ajaxLoadDataForPermissionTable() {
      this.tableAjaxLoading = true;
      this.$q.loading.show({
        delay: 100, // ms
        message: "Please Wait",
        spinnerColor: "purple-9",
        customClass: "shadow-none"
      });
      this.FETCH_ALL_PINCODES()
        .then(response => {
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
            icon: "thumb_down"
          });
        });
    },
    fnshowCreatePincodes() {
      this.propShowCreatePincodes = !this.propShowCreatePincodes;
    },

    fnShowEditPincode(rowDetails) {
      this.propShowEditPincodes = !this.propShowEditPincodes;
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },

    searchRequest({ pagination, filter }) {
      console.log("pagination", pagination);
      // we set QTable to "loading" state
      this.loading = true;
      this.FETCH_ALL_PINCODES(filter)
        .then(({ data }) => {
          // updating pagination to reflect in the UI
          this.serverPagination = pagination;
          // we also set (or update) rowsNumber
          // this.serverPagination.rowsPerPage = data.rowsNumber;
          // finally we tell QTable to exit the "loading" state
          this.loading = false;
        })
        .catch(error => {
          // we tell QTable to exit the "loading" state
          this.loading = false;
        });
    },

    fnDisablePermission(PermissionId) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete Pincode?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.DELETE_PERMISSION_BY_PERMISSION_ID_DATA(PermissionId)
            .then(response => {
              this.FETCH_ALL_PINCODES();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully Deleted!",
                icon: "thumb_up"
              });
            })
            .catch(() => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                icon: "thumb_down"
              });
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
    }
  }
};
</script>

<style>
</style>
