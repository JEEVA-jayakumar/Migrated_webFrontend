<template>
  <q-page>
    <!-- <div
          class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
        >REQUEST DEVICE REASSIGNED LIST</div> -->
    <!-- <generalLeadInformation v-if="propToggleLeadInformation" v-model:leadInformation="addtnLeadInformation"
          :propToggleLeadInformationPop="propToggleLeadInformation" @closeLeadInformation="toggleLeadInformation" /> -->
    <!-- content -->
    <!--START: table lead validation -->
    <q-table
      table-class="customTableClass"
      :rows="tableData"
      :columns="columns"
      :filter="filter"
      :pagination="paginationControl"
      row-key="name"
      :loading="toggleAjaxLoadFilter"
      :rows-per-page-options="[5, 10, 15, 20]"
      @request="ajaxLoadAllLeadInfo"
    >
      <!--START: table header -->
      <q-td v-slot:body-cell-soName="props" :props="props">{{
        props.row.soName == null ? "NA" : props.row.soName
      }}</q-td>

      <!-- <q-td v-slot:body-cell-deviceStatusDate="props" :props="props">
        <span class="label">{{
          props.row.deviceStatusDate | moment("Do MMM Y")
        }}</span>
      </q-td>   -->
      <q-td v-slot:body-cell-action="props" :props="props">
        <q-btn
          v-if="props.row.status == 0"
          highlight
          push
          class="q-mx-sm"
          color="positive"
          size="sm"
          @click="approveDeviceReques(props.row)"
          >Approve</q-btn
        >
        <q-btn
          v-if="props.row.status == 0"
          highlight
          push
          class="q-mx-sm"
          color="negative"
          size="sm"
          @click="deviceRequest(props.row)"
          >Reject</q-btn
        >
        <span class="label text-green" v-if="props.row.status == 1">
          Device Allocated SuccesFully</span
        >
        <div v-if="props.row.status == 2">
        <span  class="label text-red" > Rejected</span>
        <br>
        <span  class="label text">Remarks: {{ props.row.remarks == null ? "NA": props.row.remarks }}</span>
       </div>
      </q-td>
      <template slot="top" class="bottom-border">
        <div class="col-5">
          <q-input
            clearable
            v-model="filter"
            separator
            color="grey-9"
            placeholder="Type.."
            float-label="Search Using POD, Serial No, Merchant Name"
            class="q-mr-lg q-py-sm"
          />
        </div>
      </template>
    </q-table>
    <!--END: table lead validation -->
    <AggregatorRequestRejectRemarks
      v-if="showRejectModal"
      :showRejectModal="showRejectModal"
      :propsRejectDeviceComponent="propsRejectData"
      @closeLostModel="deviceRequest"
    >
    </AggregatorRequestRejectRemarks>
    <!--END: Lost or Stolen model -->
    <div
      v-if="toggleAjaxLoadFilter || toggleAjaxLoadFilter1"
      class="fullscreen spinner-overlay"
    >
      <q-spinner-bars
        class="absolute-center"
        style="color:#61116a"
        :size="35"
      />
    </div>
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";



import { date } from "quasar";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
import moment from "moment";
import AggregatorRequestRejectRemarks from "../../components/sat/AggregatorRequestRejectRemarks.vue";
// import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  // name: "merchantTransactionLevel",

  components: {
    AggregatorRequestRejectRemarks
    // generalLeadInformation
  },

  data() {
    return {
      // propToggleLeadInformation: false,
     
      propsRejectData: [],
      showRejectModal: false,
      addtnLeadInformation: null,

      // paginationControl: {
      //   rowsPerPage: 10
      // },
      toggleAjaxLoadFilter: false,
      toggleAjaxLoadFilter1: false,
      // aggregator: "",
      // flag: false,
      // aggregatorOptions: [],
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        // sortBy: "tid",
        // descending: false,
        rowsPerPage: 10
      },
      paginationControl1: {
        rowsNumber: 10,
        page: 1,
        sortBy: "tid",
        descending: false,
        rowsPerPage: 10
      },
      tableData: [],
      tableData1: [],
      valueToggleMerchantTransaction: false,
      filter: "",
      filter1: "",
      //table information
      columns: [
        {
          name: "soName",
          required: true,
          label: "SO Name",
          align: "left",
          field: "soName",
          sortable: true
        },
        {
          name: "serialNumber",
          required: true,
          label: "Serial Number",
          align: "left",
          field: row => {
            return row.aggregatorRegionalInventory == null ? "NA" : row.aggregatorRegionalInventory.serialNumber;
          },
          sortable: true
        },
        {
          name: "podNumber",
          required: true,
          label: "POD",
          align: "left",
          field: row => {
            return row.podNumber == null ? "NA" :row.podNumber ;
          },
          sortable: false
        },
        {
          name: "requestedAt",
          required: true,
          label: "Requested Date",
          align: "left",
          field: row => {
            return moment(row.requestedAt).format("DD/MM/YYYY");
          },
          sortable: false
        },
        {
          name: "actionedAt",
          required: true,
          label: "Actioned Date",
          align: "center",
          field: row => {
            return row.actionedAt == null?"NA" :moment(row.actionedAt).format("DD/MM/YYYY")
          },
          sortable: false
        },

        {
          name: "action",
          required: true,
          label: "Action",
          align: "center",
          field: "action",
          sortable: true
        }
        // {
        //   name: "action2",
        //   required: true,
        //   label: "",
        //   align: "center",
        //   field: "action2",
        //   sortable: true
        // },
      ],

      loading: true,
      filter_values: "",
      filter1_values: ""
    };
  },
  computed: {
    ...mapGetters("MasterTracker", [
      "getMasterTrackerList",
      "getAggregatorsMasterTrackerList"
    ]),
    ...mapGetters("lostOrStolenDatas", [
      "getLostOrStolenDatas",
      "getAggregatorsLostOrStolenDatas"
    ]),
    ...mapGetters("superAdminAggregators", [
      "getCreatedAggregatorList",
      "getActiveCreatedAggregatorList"
    ])
  },
  mounted() {
    // this.fetchAggregatorList();
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
    this.lostOrStolenLoadInfo({
      pagination: this.paginationControl1,
      filter: this.filter1
    });
  },
  // created() {
  //   this.ajaxLoadAllLeadInfo();
  // },
  methods: {
    ...mapActions("VerifyDevice", [
      "AGGREGATOR_SELF_ASSIGNMENT_TRACKER",
      "APPROVE_AGGREGATOR_SELF_ASSIGNMENT"
    ]),

    ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.AGGREGATOR_SELF_ASSIGNMENT_TRACKER()
        .then(response => {
          this.toggleAjaxLoadFilter = false;
        })
        .catch(error => {
          this.toggleAjaxLoadFilter = false;
        });
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

    //   //    this.ajaxLoadAllLeadInfo({
    //   //     pagination: this.paginationControl,
    //   //     filter: this.filterSearch,
    //   //     aggregator: value
    //   //   });
    //   this.ajaxLoadAllLeadInfo({
    //     pagination: this.paginationControl,
    //     filter: this.filter,
    //     aggregator: value
    //   });
    //   this.lostOrStolenLoadInfo({
    //     pagination: this.paginationControl1,
    //     filter: this.filter1,
    //     aggregator: value
    //   });
    // },
    lostOrStolenLoadInfo() {
      this.toggleAjaxLoadFilter1 = true;
      this.FETCH_AGGREGATORS_ALL_LOST_DEVICES_DATAS()
        .then(response => {
          this.toggleAjaxLoadFilter1 = false;
        })
        .catch(error => {
          his.toggleAjaxLoadFilter1 = false;
        });
    },
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.AGGREGATOR_SELF_ASSIGNMENT_TRACKER({ pagination, filter })
        .then(res => {
          console.log("AGGREGATOR", JSON.stringify(res));
          console.log("RESPONSE REQUEST", JSON.stringify(res.body));
          let responseData = res.body;
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = responseData.data.totalElements;
          this.paginationControl.page = responseData.data.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = responseData.data.content;
          console.log("TABLE DATA", JSON.stringify(this.tableData));

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
          // console.log("Table Datas ---------------------->"+JSON.stringify(this.tableData));
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    downloadLostDatas() {
      this.propLostStolenDatas = !this.propLostStolenDatas;
    },
    deviceRequest(exceptionDetails) {
      this.showRejectModal = !this.showRejectModal;
      this.propsRejectData = exceptionDetails;
      if(this.showRejectModal == false){
        this.ajaxLoadAllLeadInfo({
           pagination: this.paginationControl,
            filter: this.filter
    });
      }
    },
    lostOrStolenLoadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_AGGREGATORS_ALL_LOST_DEVICES_DATAS({ pagination, filter })
        .then(res => {
          console.log("INSIDE LOAD ALL LEAD INFO 1 :::::::::::::::::::::");
          console.log(
            "Table Datas 1---------------------->" +
              JSON.stringify(this.getAggregatorsLostOrStolenDatas)
          );

          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getAggregatorsLostOrStolenDatas.totalElements;
          this.paginationControl1.page =
            this.getAggregatorsLostOrStolenDatas.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 = this.getAggregatorsLostOrStolenDatas.content;

          if (this.getAllLostDeviceDatas.sort != null) {
            this.paginationControl1.sortBy = this.getAggregatorsLostOrStolenDatas.sort[0].property;
            this.paginationControl1.descending = this.getAggregatorsLostOrStolenDatas.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    approveDeviceReques(request) {
      console.log("REQ", JSON.stringify(request));
      let param = {
        selfAssignmentId: request.id,
        serialNumber: request.aggregatorRegionalInventory.serialNumber
      };
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to Approve the lead?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing .."
          });
          this.APPROVE_AGGREGATOR_SELF_ASSIGNMENT(param)
            .then(() => {
              this.ajaxLoadAllLeadInfo({
                pagination: this.paginationControl,
                filter: this.filter
              });
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Approved Succesfully",
                icon: "clear"
              });
              self.$q.loading.hide();
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
        });
    },
    // deviceRequest(exceptionDetails) {
    //   this.showRequestModal = !this.showRequestModal;
    //   this.propsRejectData = exceptionDetails;
    //   if(this.showRequestModal == false){
    //     this.ajaxLoadAllLeadInfo({
    //        pagination: this.paginationControl,
    //         filter: this.filter
    // });
    //   }
    // },
    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    }

    // downloadLostDatas() {
    //   this.$q.loading.show({
    //     delay: 100 // ms
    //   });
    //   this.DOWNLOAD_lOST_OR_STOLEN_DATAS()
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
    //       console.log(error);
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
