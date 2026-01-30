<template>
  <q-page>
    <div>
      <div class="col-md-6 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">Aggregator POD List</div>
      <!--END: table title -->
      <!--START: table lead validation -->
      <!-- <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
        <div class="col-md-4">
          <q-select color="grey-9" v-model="aggregator" float-label="Select Aggregator" radio
            :options="aggregatorOptions" @input="getaggregator" />
        </div>
      </div> -->

      <q-table table-class="customTableClass" :data="tableData" :columns="columns" :filter="filter"
        :pagination.sync="paginationControl" :rows-per-page-options="[5, 10, 15, 20, 25]" row-key="name"
        :loading="toggleAjaxLoadFilter" @request="ajaxLoadAllLeadInfo">
        <q-td slot="body-cell-action" slot-scope="props" :props="props">
          <div class="row no-wrap no-padding">
            <q-btn dense no-caps no-wrap label="Modify" icon="far fa-edit" size="md"
              @click="fnShowEditRegion(props.row)" flat class="text-light-blue"></q-btn>
          </div>
        </q-td>
        <q-td slot="body-cell-createdAt" slot-scope="props" :props="props">{{
          props.row.createdAt | moment("Do MMM Y")
        }}</q-td>
        <q-td slot="body-cell-receivedAt" slot-scope="props" :props="props">{{
          props.row.receivedAt | moment("Do MMM Y")
        }}</q-td>

        <q-td slot="body-cell-receivedAt" slot-scope="props" :props="props">{{
          props.row.receivedAt == null ? "NA" :
            props.row.receivedAt | moment("Do MMM Y")
        }}</q-td>
        <q-td slot="body-cell-DeviceList" slot-scope="props" :props="props">{{
          props.row.createdAt | moment("Do MMM Y")
        }}</q-td>
        <q-td slot="body-cell-ModifyDate" slot-scope="props" :props="props">{{
          props.row.device.modifyDate |
            moment("Do MMM Y")
        }}</q-td>
        <template slot="top" slot-scope="props">
          <div class="col-md-5">
            <q-search clearable v-model="filter" separator color="grey-9" placeholder="Type.."
            float-label="Search By Pod Number, BP Region" class="q-mr-lg q-py-sm" />
          </div>
          <div class="col-md-6">

            <q-btn square outline color="purple-9" label="Download as Excel" class="q-mr-lg q-py-sm float-right"
              size="md" @click="downloadPodList" />

          </div>
          <div class="col-md-4"></div>
          <!--END: table excel download -->
        </template>
      </q-table>
      <!--START >>  Download Reports -->
      <AggregatorDownloadPod v-if="propPodListDatas" :propPodListDatas="propAggregator" :propData="this.propAggregator"
        @emitfnshowPodList="downloadPodList"></AggregatorDownloadPod>
      <!--END:  Download Reports-->
      <AggregatorEditRegion v-if="propShowEditRegion" :propShowEditRegion="propShowEditRegion"
        :propRowDetails="propRowDetails" @emitfnshowEditRegion="fnShowEditRegion"></AggregatorEditRegion>
      <!--END: table data -->
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
import { date } from "quasar";
import moment from "moment";
import AggregatorEditRegion from "../../components/inventory/AggregatorEditRegion.vue";
import AggregatorDownloadPod from "../../components/inventory/AggregatorDownloadPod.vue";

export default {
  name: "merchantTracker",
  components: {
    AggregatorEditRegion,
    AggregatorDownloadPod
  },

  data() {
    return {
      // aggregatorOptions: [],
      deviceOptions: [],
      // aggregator: "",
      // flag: false,
      propShowEditRegion: false,
      propPodListDatas: false,
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "createdAt",
        descending: false,
        rowsPerPage: 10
      },
      tableData: [],
      filter: "",
      filter_values: "",
      json_fields: {
        PodNumber: "podNumber",
        DeviceType: "AggregatorDevice.deviceName",
        // ReceiveAt: " receivedAt",
        ReceivedDate: {
          field: "receivedAt",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        createdAt: {
          field: "createdAt",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        // CreateDate: "createdAt",
        BPRegion: "region.regionAreaName"
      },
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
          field: row => {
            //   return row.device.deviceName;
            return row.AggregatorDevice.deviceName == null
              ? "NA"
              : row.AggregatorDevice.deviceName;
          },
          sortable: true
        },
        {
          name: "receivedAt",
          required: true,
          label: "Received Date",
          align: "center",
          field: row => {
            return moment(row.receivedAt).format("DD/MM/YYYY");
          }
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
          label: "Create Date",
          align: "center",
          field: "createdAt"
        },

        {
          name: "region",
          required: true,
          label: "BPRegion",
          align: "center",
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
    ...mapGetters("AggregatorPodLists", ["getAllAggregatorPodList"]),
    ...mapGetters("superAdminAggregators", ["getActiveCreatedAggregatorList"]),
  },
  // created() {
  //   this.FETCH_AGGREGATOR_POD_LIST();
  // },
  mounted() {
    // this.fetchAggregatorList();
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  methods: {
    ...mapActions("AggregatorPodLists", ["FETCH_AGGREGATOR_POD_LIST"]),
    ...mapActions("reports", ["AGGREGATOR_POD_LIST_DOWNLOAD"]),
    ...mapActions("superAdminAggregators", ["GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),

    // fetchAggregatorList() {
    //   let self = this;
    //   let cookedArr = [];
    //   self.GET_ACTIVE_CREATED_AGGREGATORS_LIST()
    //     .then(() => {
    //       return _.map(self.getActiveCreatedAggregatorList, (item) => {
    //         console.log("ITEM -------->", item)
    //         cookedArr.push({
    //           value: item,
    //           label: item.name
    //         });
    //         console.log("cookedArr -------->", cookedArr)
    //         self.aggregatorOptions = cookedArr;
    //         // this.flag = true;
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
      this.FETCH_AGGREGATOR_POD_LIST({ pagination, filter})
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getAllAggregatorPodList.totalElements;
          this.paginationControl.page = this.getAllAggregatorPodList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getAllAggregatorPodList.content;
          if (this.getAllAggregatorPodList.sort != null) {
            this.paginationControl.sortBy = this.getAllAggregatorPodList.sort[0].property;
            this.paginationControl.descending = this.getAllAggregatorPodList.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    downloadPodList(val) {
      this.propPodListDatas = !this.propPodListDatas;
      this.propAggregator = val;
      console.log("AGGREGATOR VALUES------>>>", JSON.stringify(val))
    },
    fnShowEditRegion(rowDetails) {
      this.propShowEditRegion = !this.propShowEditRegion;
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    // downloadReport() {
    //   this.$q.loading.show({
    //     delay: 100 // ms
    //   });
    //   this.AGGREGATOR_POD_LIST_DOWNLOAD(this.formData)
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

<style>

</style>
