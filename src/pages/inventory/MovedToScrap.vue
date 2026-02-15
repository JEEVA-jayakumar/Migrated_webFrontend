<template>
    <q-page>
      <!-- content -->
      <div>
        <q-pull-to-refresh :handler="PullToRefresh" inline>
          <!--START: table title -->
          <div class="
              col-md-12
              capitalize
              text-h6 q-px-lg q-py-md
              text-weight-regular
              bottom-border
              text-grey-9
            ">
            Bijlipay Moved To Scrap
          </div>
          <!--END: table title -->
          <!-- <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
            <div class="col-md-4">
              <q-select color="grey-9" v-model="aggregator" float-label="Select Aggregator" radio
                :options="aggregatorOptions" @input="getaggregator" />
            </div>
          </div> -->
          <!--END: table title -->
          <!-- table moved to Scrap -->
       
            <q-table
              table-class="customTableClass" 
              :columns="columns" 
              :rows="tableData"
              color="grey-9"
              :filter="filterSearch" 
              :pagination="paginationControl"
              :rows-per-page-options="[5, 10, 15, 20, 25]"
              :loading="toggleAjaxLoadFilter"
               @request="ajaxLoadAllLeadInfo"
              >
              <!--START: table header -->
              <q-tr v-slot:top-row="props">
                <q-th v-for="col in props.columns" :key="col.name" :props="props">{{
                  col.label
                }}</q-th>
              </q-tr>
              <!--END: table header -->
  
              <!--START: table search, filter -->
              <template v-slot:top="props">
                <!--START: table search -->
                <div class="col-md-5">
                  <q-input
                    clearable 
                    color="grey-9"
                    v-model="filterSearch" 
                    placeholder="Type.."
                    float-label="Search Using Device Serial Number " class="q-mr-lg q-py-sm" 
                  />
                </div>
                <!--END: table search -->
                <!--START: table filter dropdown -->
                <div class="col-md-5">
                  <q-btn 
                  square 
                  outline 
                  color="purple-9" 
                  label="Download as Excel"
                  class="q-mr-lg q-py-sm float-right"
                  size="md" 
                  @click="downloadMovedToScrapList" 
                  />
                </div>
              </template>
              <!--END: table search, filter -->
            </q-table>
  
  
        </q-pull-to-refresh>
        <!--START >>  Download Reports -->
        <DownloadMovedToScrap
         v-if="propMovedToScrapList"
          :propMovedToScrapList="propMovedToScrapList"
           @emitfnshowMovedToScrapList="downloadMovedToScrapList">
        </DownloadMovedToScrap>
        <!--END:  Download Reports-->
        <!-- //Common lead information in popup -->
        <generalLeadInformation v-if="propToggleLeadInformation" :leadInformation="addtnLeadInformation"
          :propToggleLeadInformationPop="propToggleLeadInformation" @closeLeadInformation="toggleLeadInformation" />
        <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
          <q-spinner-bars class="absolute-center" style="color: #61116a" :size="35" />
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
import { required, or } from '@vuelidate/validators';
  import { mapGetters, mapActions } from "vuex";
  import DownloadMovedToScrap from "../../components/inventory/DownloadMovedToScrap.vue";
  export default {
  name: "getMovedToScrapDetails",
  components: {
    DownloadMovedToScrap,
  },
  
    data() {
      return {
        propToggleLeadInformation: false,
        propMovedToScrapList: false,
        toggleAjaxLoadFilter: false,
        model: "",
        filterSearch: "",
        paginationControl: {
          rowsNumber: 10,
          page: 1,
          sortBy: ["updatedAt"],
          descending: true,
          rowsPerPage: 5,
        },
        tableData: [],
        flag: false,
        json_fields: {
          SerialNumber: "serialNumber",
          DeviceType: "device.deviceName",
        },
  
        //table information
        columns: [
          {
            name: "serialNumber",
            required: true,
            label: "Device Serial Number",
            align: "left",
            field: "serialNumber",
            sortable: true
          },
          {
          name: "deviceName",
          required: true,
          label: "Device Type",
          align: "left",
          field: (row) => {
            return row.device == null ? "NA" : row.device.deviceName ;
          },
          // sortable: true
        },
        {
          name: "updatedAt",
          required: true,
          label: "Updated Date",
          align: "center",
          field: (row) => {
            var date = new Date(row.updatedAt);
            return date.toString("DD/MM/YYYY");
          },
          sortable: false
        },
        {
          name: "lostOrStolenRemarks",
          required: true,
          label: "Remarks",
          align: "left",
          field: "lostOrStolenRemarks",
          sortable: false,
        },
      ],
      loading: true,
      filter_values: "",
    };
  },
  computed: {
    ...mapGetters("SendToRepair", ["getMovedToScrapDetails"]),
  },
    mounted() {
      // this.fetchAggregatorList();
      this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filterSearch
        });
  
    },
    methods: {
    ...mapActions("SendToRepair", ["FETCH_ALL_MOVED_TO_SCRAP_DATA"]),
    downloadMovedToScrapList() {
      this.propMovedToScrapList = !this.propMovedToScrapList;
    },
    //Function pull to refresh
    PullToRefresh(done) {
      done();
    },
  
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
      //   console.log("getaggregator ----->", JSON.stringify(value))
      //   this.flag = true;
  
      //   this.ajaxLoadAllLeadInfo({
      //     pagination: this.paginationControl,
      //     filter: this.filterSearch,
      //     aggregator: value
      //   });
      // },
  
      ajaxLoadAllLeadInfo({ pagination, filter}) {
        // we set QTable to "loading" state
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Fetching data ..",
        });
        this.FETCH_ALL_MOVED_TO_SCRAP_DATA({ pagination, filter})
          .then((res) => {
            this.paginationControl = pagination;
  
            // we also set (or update) rowsNumber
            this.paginationControl.rowsNumber =
              this.getMovedToScrapDetails.totalElements;
            this.paginationControl.page = this.getMovedToScrapDetails.number + 1;
  
            // then we update the rows with the fetched ones
            this.tableData = this.getMovedToScrapDetails.content;
            if (this.getMovedToScrapDetails.sort != null) {
              this.paginationControl.sortBy =
                this.getMovedToScrapDetails.sort[0].property;
              this.paginationControl.descending =
                this.getMovedToScrapDetails.sort[0].ascending;
            }
            // this.tableData = this.getMovedToScrapDetails.content
  
            // finally we tell QTable to exit the "loading" state
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
      // Function to toggle lead information pop up screen
      toggleLeadInformation(leadDetails) {
        this.propToggleLeadInformation = !this.propToggleLeadInformation;
        if (leadDetails != undefined) {
          this.addtnLeadInformation = leadDetails;
        }
      },
    },
  };
  </script>
  
  <style>
  
  </style>
  
