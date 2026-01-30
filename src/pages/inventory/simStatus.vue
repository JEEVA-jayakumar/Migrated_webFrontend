<template>
  <q-page>
    <div>
      <div
        class="col-md-6 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >
        Sim Status
      </div>
      <q-table
        table-class="customTableClass"
        :columns="columns"
        :filter="filter"
        :data="tableData"
        :pagination.sync="paginationControl"
        row-key="id"
        :rows-per-page-options="[5, 10, 15, 20]"
         :loading="toggleAjaxLoadFilter"
         @request="ajaxLoadAllLeadInfo"
      >
        <!-- <q-td
          slot="body-cell-createdAt"
          slot-scope="props"
          :props="props"
        >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td>
        <q-td
          slot="body-cell-receivedAt"
          slot-scope="props"
          :props="props"
        >{{ props.row.receivedAt | moment("Do MMM Y") }}</q-td>
        <q-td
          slot="body-cell-receivedAt"
          slot-scope="props"
          :props="props"
        >{{ props.row.receivedAt ==null? "NA" : props.row.receivedAt | moment("Do MMM Y") }}</q-td>
        <q-td
          slot="body-cell-DeviceList"
          slot-scope="props"
          :props="props"
        >{{ props.row.device.createDate | moment("Do MMM Y") }}</q-td>
        <q-td
          slot="body-cell-ModifyDate"
          slot-scope="props"
          :props="props"
        >{{ props.row.device.modifyDate | moment("Do MMM Y") }}</q-td>-->

        <template slot="top" slot-scope="props">
          <div class="col-md-5">
            <q-search
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Sim Number"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <div class="col-md-5">
            <q-btn
              no-caps
              label="Upload file for Activation"
              class="common-dark-blue agnalgin1"
              @click="UploadSimActivation()"
            />
            &nbsp;
            <q-btn
              no-caps
              label="Upload file for De-Activation"
              class="common-dark-blue agnalgin1"
              @click="SimDeActivation()"
            />
            

            <uploadSimActivation
              v-if="propSimActivationList"
              :propSimActivationList="propSimActivationList"
              @emitpropSimActivationList="UploadSimActivation"
            ></uploadSimActivation>

            <uploadSimDeactivation
              v-if="propSimDeactivation"
              :propSimDeactivation="propSimDeactivation"
              @emitpropSimDeactivation="SimDeActivation"
            ></uploadSimDeactivation>
            <!-- <downloadExcel
              :data="getAllInventoryWithResellar"
              :fields="json_fields"
              name="InventoryWithReseller.xls"
            >
              <q-btn outline color="grey-9" label="Download as excel" />
            </downloadExcel> -->
          </div>
          <!--END: table excel download -->
        </template>
      </q-table>

      <!--END: table data -->
      <!--START >>  Download Reports -->
      <!--END:  Download Reports-->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
import moment from "moment";

import uploadSimActivation from "../../components/inventory/uploadSimActivation.vue";
import uploadSimDeactivation from "../../components/inventory/uploadSimDeactivation.vue";
export default {
  name: "merchantTracker",
  components: {
    uploadSimActivation,
    uploadSimDeactivation
  },

  data() {
    return {
      propSimActivationList: false,
      propSimDeactivation: false,
      propInventoryResellerList: false,
      paginationControl: {
        rowsPerPage: 10,
        sortBy: "id",
        descending: false,
      },
      filter: "",
      filter_values: "",
      json_fields: {
        SoName: "user.name",
        PodNumber: "podnumber",
        SerialNumber: "serialnumber",
        DeviceName: "device.deviceName",
        createDate: {
          field: "createDate",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        ReceivedDate: {
          field: "modifyDate",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        BPRegion: "region.regionGroup.regionName"
      },

      columns: [
        {
          name: "simNo",
          required: true,
          label: "Sim Number",
          align: "center",
          field: row => {
            return row.simNo;
          },
          sortable: true
        },
        {
          name: "activationDate",
          label: "Activation Date",

          align: "center",
          field: row => {
            return  row.activationDate == null ? "NA" :  moment(row.activationDate).format("DD/MM/YYYY");
          },
          sortable: true
        },
        {
          name: "deactivationDate",
          label: "Deactivation Date",

          align: "center",
          field: row => {
            return row.deactivationDate == null
              ? "NA"
              : moment(row.deactivationDate).format("DD/MM/YYYY");
          },
          sortable: true
        },
        {
          name: "deployedDate",
          required: true,
          label: "Sim Card Deployed",
          align: "center",
          field: row => {
            return row.deployedDate == null
              ? "NA"
              : moment(row.deployedDate).format("DD/MM/YYYY");
          }
        },

        {
          name: "simRecoveredDate",
          required: true,
          label: "Sim Recoverd",
          align: "center",
          field: row => {
            return row.simRecoveredDate == null
              ? "NA"
              : moment(row.simRecoveredDate).format("DD/MM/YYYY");
          }
        },

        {
          name: "logonDate",
          required: true,
          label: "Logon Date",
          align: "center",
          field: row => {
            return row.logonDate == null
              ? "NA"
              : moment(row.logonDate).format("DD/MM/YYYY");
          },
          sortable: true
        },
        {
          name: "simStatus",
          required: true,
          label: "Sim Status",
          align: "center",
          field: row => {
            return row.simStatus;
          },
          sortable: true
        }
      ],
      tableData: []
    };
  },
  computed: {
    ...mapGetters("Regional", ["getSimStatus"])
  },
  // created() {
  //   this.FETCH_INVENTORY_WITH_RESELLAR();
  // },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
    created() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },

  methods: {
    ...mapActions("Regional", ["FETCH_ALL_SIM_STATUS"]),
    // ...mapActions("reports", ["INVENTORY_WITH_RESELLER_LIST_"]),

    // downloadInventoryResellerList(){
    //    this.propInventoryResellerList=!this.propInventoryResellerList;
    // },

    UploadSimActivation() {
              this.ajaxLoadAllLeadInfo({
              pagination: this.paginationControl,
              filter: this.filter
               });
      this.propSimActivationList = !this.propSimActivationList;
  
    },

    SimDeActivation() {
          this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filter
    });
      this.propSimDeactivation = !this.propSimDeactivation;
  
    },

    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_ALL_SIM_STATUS({ pagination, filter })
        .then(res => {
          console.log("SIM STATUS", JSON.stringify(this.getSimStatus));
          this.tableData = this.getSimStatus.content;
          this.paginationControl = pagination;
          this.paginationControl.rowsNumber = this.getSimStatus.totalElements;
          this.paginationControl.page = 
          this.getSimStatus.number + 1;
          if (this.getSimStatus.sort != null) {
            this.paginationControl.sortBy = this.sort[0].property;
            this.paginationControl.descending = this.getSimStatus.sort[0].ascending;
          }
          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    // downloadReport() {
    //   this.$q.loading.show({
    //     delay: 100 // ms
    //   });
    //   this.INVENTORY_WITH_RESELLER_LIST_(this.formData)
    //     .then(() => {
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         color: "positive",
    //         position: "bottom",
    //         message: "Success, file has been downloaded",
    //         icon: "check"
    //       });
    //     })
    //     .catch(error => {
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         color: "negative",
    //         position: "bottom",
    //         message: "Please try again",
    //         icon: "thumb_down"
    //       });
    //     });
    // }
  }
};
</script>

<style></style>
