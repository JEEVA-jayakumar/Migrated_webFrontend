<template>
  <q-page>
    <!-- content -->
    <div>
      <q-table
        :rows="getAllPodList"
        table-class="customSATableClass"
        :columns="columns"
        :filter="filter"
        :pagination="serverPagination"
        :rows-per-page-options="[5,10,15,20]"
        row-key="name"
        color="grey-9"
      >
        <q-td v-slot:body-cell-action="props" :props="props">
          <div class="row no-wrap no-padding">
            <q-btn
              dense
              no-caps
              no-wrap
              label="Modify"
              icon="far fa-edit"
              size="md"
              @click="fnShowEditRegion(props.row)"
              flat
              class="text-light-blue"
            ></q-btn>
            <!-- <q-btn  dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md" @click="fnDisablePermission(props.row.id)" flat class="text-negative">
            </q-btn>-->
          </div>
        </q-td>

        <q-td
          v-slot:body-cell-receivedAt="props"
          :props="props"
        >{{ props.row.receivedAt | moment("Do MMM Y") }}</q-td>
        <q-td
          v-slot:body-cell-DeviceList="props"
          :props="props"
        >{{ props.row.device.createDate | moment("Do MMM Y") }}</q-td>

        <template v-slot:top="props">
          <div class="col-md-5">
            <q-input
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Pod Number, Device Type"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <div class="col-md-4"></div>
          <!--END: table excel download -->
        </template>
      </q-table>

      <!--START: Show create Pincode -->
      <!-- <addPincode
        v-if="propShowCreatePincodes"
        :propShowCreatePincodes="propShowCreatePincodes"
        @emitfnshowAddPincodes="fnshowCreatePincodes"
      ></addPincode>-->
      <!--END: Show create Pincode -->

      <!--START: Show edit Pincode -->
      <editRegion
        v-if="propShowEditRegion"
        :propShowEditRegion="propShowEditRegion"
        :propRowDetails="propRowDetails"
        @emitfnshowEditRegion="fnShowEditRegion"
      ></editRegion>
      <!--END: Show edit Pincode -->
    </div>
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import editRegion from "../../components/inventory/editRegion.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "users",
  components: {
    editRegion
  },
  data() {
    return {
      propShowEditRegion: false,
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
          name: "podNumber",
          label: "podNumber",
          field: "podNumber",
          align: "center",
          sortable: true
        },
        {
          name: "device",
          required: true,
          label: "Device Type",
          align: "center",
          sortable: true,
          field: row => {
            return row.device.deviceName;
          }
        },

        {
          name: "receivedAt",
          required: true,
          label: "receivedDate",
          align: "center",
          sortable: true,
          field: "receivedAt"
        },

        // {
        //   name: "ModifyDate",
        //   required: true,
        //   label: "Modify Date",
        //   align: "center",
        //   field: row => {
        //     return row.device.modifyDate;
        //   }
        // },
        {
          name: "DeviceList",
          required: true,
          label: "Send Date",
          align: "center",

          sortable: true,
          field: "createDate"
        },

        {
          name: "region",
          required: true,
          label: "Region",
          align: "center",

          sortable: true,
          field: row => {
            return row.region.regionAreaName;
          }
        },
        {
          name: "action",
          required: true,
          label: "Modify POD",
          align: "left",
          field: "action",
          sortable: false
        }
      ]
    };
  },

  computed: {
    ...mapGetters("PodList", ["getAllPodList"])
  },
  created() {
    this.FETCH_POD_LIST();
  },
  methods: {
    ...mapActions("PodList", ["FETCH_POD_LIST"]),

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

    fnShowEditRegion(rowDetails) {
      this.propShowEditRegion = !this.propShowEditRegion;
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
