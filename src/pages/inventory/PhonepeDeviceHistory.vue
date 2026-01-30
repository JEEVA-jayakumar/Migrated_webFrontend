<template>
  <q-page>
    <!-- content -->
    <div>
      <!--START: table title -->
      <div class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">Aggregator Device History</div>
      <!--END: table title -->
      <!--START: table lead validation -->
      <!-- <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
        <div class="col-md-4">
          <q-select color="grey-9" v-model="aggregator" float-label="Select Aggregator" radio
            :options="aggregatorOptions" @input="getaggregator" />
        </div>
      </div> -->
    
        <q-table table-class="customTableClass" class="q-py-none" :columns="columns" :data="tableData" :filter="filter"
          :rows-per-page-options="[100, 200, 300, 400, 500]" :pagination.sync="paginationControl"
          :loading="toggleAjaxLoadFilter" @request="ajaxLoadAllLeadInfo">
          <q-td slot="body-cell-installationDate" slot-scope="props" :props="props">
            <span class="label">{{ props.row.installationDate | moment("Do MMM Y") }}</span>
          </q-td>
          <q-td slot="body-cell-deInstallationDate" slot-scope="props" :props="props">
            <span class="label">{{ props.row.deInstallationDate | moment("Do MMM Y") }}</span>
          </q-td>
          
          <template slot="top" slot-scope="props" class="bottom-border">
            <!--START: table  :rows-per-page-options="[5,10,15,20,25]"filter,search -->
            <div class="col-md-3">
              <q-search clearable color="grey-9" v-model="filter" placeholder="Type.."
                float-label="Search by MID, TID" class="q-mr-lg q-py-sm" />
            </div>
            <div class="col-md-6">

              <q-btn square outline color="purple-9" label="Download as Excel" class="q-mr-lg q-py-sm float-right"
                size="md" @click="downloaddeviceHist" />

            </div>

            <!--END: table filter,search -->
          </template>
        </q-table>



      <!--END: table lead validation -->
      <!--START >>  Download Reports -->
      <DownloadAggregatorsDeviceHistoryReport v-if="propDeviceHistoryReport"
        :propDeviceHistoryReport="propDeviceHistoryReport" @emitfnshowDeviceHistory="downloaddeviceHist">
      </DownloadAggregatorsDeviceHistoryReport>
      <!--END:  Download Reports-->

      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
      <!--END >>  Show Ajax Spinner -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Vuelidate from "vuelidate";
import Vue from "vue";
Vue.use(Vuelidate);
import { date } from "quasar";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
import moment from "moment";
import DownloadAggregatorsDeviceHistoryReport from "../../components/inventory/DownloadAggregatorsDeviceHistoryReport.vue";
export default {
  name: "getReplacementRecoveryList",
  components: {
    DownloadAggregatorsDeviceHistoryReport,
  },
  data() {
    return {
      propToggleLeadInformation: false,
      propDeviceHistoryReport: false,
      addtnLeadInformation: null,
      tomorrow: addToDate(today, { days: -1 }),
      yesterday: subtractFromDate(today, { days: 90 }),
      state: new Date(),
      defaultValue: startOfDate(today, "year"),
      separator: 'horizontal',
      message: "",
      icon: "",
      // flag: false,
      // aggregator: "",
      // aggregatorOptions: [],
      formData: {
        from: "",
        to: ""
      },
      // regionFilter: "",
      model: "",
      model1: "",
      json_fields: {
        dateOfRecoveryReplacement: {
          field: "dateOfRecoveryReplacement",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },

      },
      filter: "",
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "deInstallationDate",
        descending: false,
        rowsPerPage: 10
      },
      columns: [
        {
          name: "Device Serial Number",
          required: true,
          label: "Device Serial Number",
          align: "left",
          field: "SerialNumber",
          sortable: true
        },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: "mId",
          sortable: true
        },

        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: "tId",
          sortable: true
        },
        {
          name: "BpRegion",
          required: true,
          label: "BpRegion",
          align: "left",
          field: "BpRegion",
          sortable: true
        },

        {
          name: "installationDate",
          required: true,
          label: "Installed Date",
          align: "center",
          field: "installationDate",
          sortable: true
        },
        {
          name: "deInstallationDate",
          required: true,
          label: "De-Installed Date",
          align: "center",
          field: "deInstallationDate",
          sortable: true
        },

      ],
      loading: true,
      tableData: [],
    };
  },
  computed: {
    ...mapGetters("devicehistory", ["getDeviceWithHistory", "getAggregatorsDeviceWithHistory"]),
    ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),

  },
  mounted() {
    // this.fetchAggregatorList();
    this.ajaxLoadAllLeadInfo({
        pagination: this.paginationControl,
        filter: this.filter
      });
  },
  methods: {
    ...mapActions("devicehistory", ["DEVICE_WITH_HISTORY", "AGGREGATORS_DEVICE_WITH_HISTORY"]),
    ...mapActions("InventoryCentral", ["REPORT_DEVICE_HISTORY_LIST"]),
    ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),

    // fetchAggregatorList() {
    //   let self = this;
    //   let cookedArr = [];
    //   self.GET_ACTIVE_CREATED_AGGREGATORS_LIST()
    //     .then(() => {
    //       return _.map(self.getActiveCreatedAggregatorList, (item) => {
    //         console.log("ITEM -------->", item)
    //         cookedArr.push({
    //           value: item.id,
    //           label: item.name
    //         });
    //         console.log("cookedArr -------->", cookedArr)
    //         self.aggregatorOptions = cookedArr;
    //       });

    //     })
    // },
    // getaggregator(value) {
    //   this.flag = true;
    //   this.ajaxLoadAllLeadInfo({
    //     pagination: this.paginationControl,
    //     filter: this.filter,
    //     aggregator: value
    //   });
    // },

    ajaxLoadAllLeadInfo({ pagination, filter}) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.AGGREGATORS_DEVICE_WITH_HISTORY({ pagination, filter})
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getAggregatorsDeviceWithHistory.totalElements;
          this.paginationControl.page =
            this.getAggregatorsDeviceWithHistory.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getAggregatorsDeviceWithHistory.content;
          if (this.getAggregatorsDeviceWithHistory.sort != null) {
            this.paginationControl.sortBy = this.getAggregatorsDeviceWithHistory.sort[0].property;
            this.paginationControl.descending = this.getAggregatorsDeviceWithHistory.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    toTimestamp(strDate) {
      console.log("The date string : --- : ", strDate)
      var date = strDate.split("T")[0]
      var curDate = new Date();
      var mnth = curDate.getMonth() + 1;
      var chDate = curDate.getFullYear() + "-" + (mnth < 10 ? "0" + mnth : mnth) + "-" + curDate.getDate();
      var datum = null
      if (chDate == date)
        datum = Date.now();
      else
        datum = Date.parse(strDate);
      console.log("The Datum: --- : ", datum)
      return datum;
    },
    //     downloaddeviceHist(request){

    //   let params = {
    //     from: this.toTimestamp(request.from.toString()),
    //     to: this.toTimestamp(request.to.toString())
    //   };
    //   this.$q.loading.show({
    //       delay: 100, // ms
    //       spinnerColor: "purple-9",
    //       message: "Please wait.."
    //   });
    //   this.REPORT_RECOVERY_REPLACEMENT_HIST(params)
    //     .then(response => {
    //       this.$q.loading.hide();
    //       console.log("data information------------------>",response)
    //       this.$q.notify({
    //         color: "positive",
    //         position: "bottom",
    //         message: "Successfully Downloaded",
    //         icon: "thumb_up"
    //       });
    //       this.formData.from="",
    //       this.formData.to=""


    //     })
    //     .catch(error => {
    //         // console.log("data information-------->",error)
    //       console.log("hello",error)
    //       this.$q.loading.hide();
    //       if(error.status==400){
    //         this.$q.notify({
    //         color: "amber",
    //         position: "bottom",
    //         message: error,
    //         icon: "thumb_down"
    //       });
    //       }
    //       else if(error.status == 500){
    //         this.$q.notify({
    //         color: "amber",
    //         position: "bottom",
    //         message: error,
    //         icon: "thumb_down"
    //       });

    //       }

    //       this.formData.from="",
    //       this.formData.to=""
    //     });

    // },
    downloaddeviceHist() {
      // aggregator
      this.propDeviceHistoryReport = !this.propDeviceHistoryReport;
    },

  }
};
</script>

<style>

</style>
