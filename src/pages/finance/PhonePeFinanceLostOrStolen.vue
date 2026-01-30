<template>
    <q-page>
      <!-- //Common lead information in popup -->
      <generalLeadInformation v-if="propToggleLeadInformation" :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation" @closeLeadInformation="toggleLeadInformation" />
      <!-- content -->
      <!--START: table lead validation -->
      <q-table table-class="customTableClass" :data="tableData" :columns="columns" :filter="filter"
        :pagination.sync="paginationControl" row-key="name" :loading="toggleAjaxLoadFilter"
        :rows-per-page-options="[5, 10, 15, 20]" @request="ajaxLoadAllLeadInfo">
        <!--START: table header -->
        <q-tr slot="top-row" slot-scope="props">
          <q-th v-for="col in props.columns" :key="col.name" :props="props">{{ col.label }}</q-th>
        </q-tr>
        <!--END: table header -->
  
        <q-td slot="body-cell-tid" slot-scope="props" :props="props">
          <span class="label text-primary"># {{ props.row.tid }}</span>
        </q-td>
        <q-td slot="body-cell-mid" slot-scope="props" :props="props">
          <span class="label text-primary"># {{ props.row.mid }}</span>
        </q-td>
        <!-- <q-td
            slot="body-cell-leadName"
            slot-scope="props"
            :props="props"
          >{{props.row.leadInformation.leadName}}</q-td>-->
        <q-td slot="body-cell-leadNumber" slot-scope="props" :props="props" class="cursor-pointer"
          @click.native="toggleLeadInformation(props.row.leadInformation)">
          <span class="label text-primary"># {{ props.row.leadInformation.leadNumber }}</span>
        </q-td>
        <q-td slot="body-cell-mobileNumber" slot-scope="props" :props="props">{{
          props.row.leadInformation == null ?
            'NA' : props.row.leadInformation.contactNumber
        }}</q-td>
        <q-td slot="body-cell-leadAddress" slot-scope="props" :props="props">{{
          props.row.leadInformation == null ?
            'NA' : props.row.leadInformation.leadAddress
        }}</q-td>
        <q-td slot="body-cell-deviceStatusDate" slot-scope="props" :props="props">
          <span class="label">{{ props.row.deviceStatusDate | moment("Do MMM Y") }}</span>
        </q-td>
        <q-td slot="body-cell-action" slot-scope="props" :props="props">
          <q-btn highlight push class="q-mx-sm" color="positive" @click="openReject(props.row)" size="sm">Reject</q-btn>
          <q-btn highlight push class="q-mx-sm" color="negative" @click="openAccept(props.row)" size="sm">Approve</q-btn>
        </q-td>
        <template slot="top" slot-scope="props" class="bottom-border">
          <!--START: table filter,search,excel download -->
          <div class="col-5">
            <q-search clearable v-model="filter" separator color="grey-9" placeholder="Type.."
              float-label="Search Using Device Serial Number/TID" class="q-mr-lg q-py-sm" />
          </div>
        </template>
      </q-table>
      <!--START: Open Reject model -->
      <PhonepeRejectModel v-if="showRejectModel" :showRejectModel="showRejectModel"
        :propShowRejectComponent="propsRejectAppend" @reloadPaymentTrackerData="ajaxLoadAllLeadInfo"
        @closeRejectModel="openReject"></PhonepeRejectModel>
      <!--END: Open Reject model -->
      <!--END: table lead validation -->
      <showMerchantTransactionLevelDetails v-if="valueToggleMerchantTransaction"
        :valueToggleMerchantTransaction="valueToggleMerchantTransaction" @revertRowClick="rowClick">
      </showMerchantTransactionLevelDetails>
      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
      <!--END >>  Show Ajax Spinner -->
    </q-page>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import PhonepeRejectModel from "../../components/finance/PhonepeRejectModel.vue";
  import showMerchantTransactionLevelDetails from "../../components/sat/showMerchantTransactionLevelDetails.vue";
  import generalLeadInformation from "../../components/generalLeadInformation.vue";
  
  export default {
    name: "merchantTransactionLevel",
  
  
    components: {
        PhonepeRejectModel,
      showMerchantTransactionLevelDetails,
      generalLeadInformation
  
    },
  
    data() {
      return {
        propToggleLeadInformation: false,
        addtnLeadInformation: null,
  
        // paginationControl: {
        //   rowsPerPage: 10
        // },
        toggleAjaxLoadFilter: false,
        paginationControl: {
          rowsNumber: 10,
          page: 1,
          sortBy: "tid",
          descending: false,
          rowsPerPage: 10
        },
  
        tableData: [],
        showRejectModel: false,
        valueToggleMerchantTransaction: false,
        filter: "",
        //table information
        columns: [
          {
            name: "tid",
            required: true,
            label: "TID",
            align: "left",
            field: "tid",
            sortable: true
          },
          {
            name: "mid",
            required: true,
            label: "MID",
            align: "left",
            field: "mid",
            sortable: true
          },
          {
            name: "leadNumber",
            required: true,
            label: "Lead Id",
            align: "left",
            field: row => {
              row.leadInformation.leadNumber;
            },
            sortable: false
          },
          {
            name: "leadInformation",
            required: true,
            label: "ME Name",
            align: "left",
            field: row => {
              return row.leadInformation.leadName;
            },
            sortable: false
          },
          {
            name: "leadAddress",
            required: true,
            label: "Merchant Address",
            align: "center",
            field: row => {
              row.leadInformation.leadAddress;
            },
            sortable: false
          },
          {
            name: "deviceName",
            required: true,
            label: "Device type",
            align: "right",
            field: row => {
              return row.leadInformation.device.deviceName;
            },
            sortable: false
          },
          {
            name: "device_serial_number",
            required: true,
            label: "Device Serial Number",
            align: "left",
            field: row => {
              return row.regionalInventory == null
                ? "NA"
                : row.regionalInventory.serialNumber;
            },
            sortable: true
          },
          {
            name: "deviceStatusDate",
            required: true,
            label: "Implementation Date",
            align: "left",
            field: "deviceStatusDate",
            sortable: true
          },
          {
            name: "assignedTo",
            required: true,
            label: "Implemented by",
            align: "left",
            field: row => {
              return row.assignedTo == null ? "NA" : row.assignedTo.name;
            },
            sortable: true
          },
          {
            name: "deviceAddress",
            required: true,
            label: "Implemented Address",
            align: "left",
            field: row => {
              return row.deviceAddress;
            },
            sortable: true
          },
          {
            name: "mobileNumber",
            required: true,
            label: "Mobile Number",
            align: "center",
            field: row => {
              row.leadInformation.contactNumber;
            },
            sortable: false
          },
          {
            name: "lostOrStolenRemarks",
            required: true,
            label: "Remarks",
            align: "right",
            field: row => {
              return row.regionalInventory.lostOrStolenRemarks;
            },
            sortable: false
          },
          {
            name: 'action',
            required: true,
            label: '',
            align: 'center',
            field: 'action',
            sortable: true
          }
        ],
        loading: true,
        filter_values: ""
      };
    },
    computed: {
      ...mapGetters("LostFinance", ["getlostDatas", "getPhonepeLostDatas"])
    },
    mounted() {
      this.ajaxLoadAllLeadInfo({
        pagination: this.paginationControl,
        filter: this.filter
      });
    },
    // created() {
    //   this.ajaxLoadAllLeadInfo();
    // },
    methods: {
      // ...mapActions("MasterTracker", ["MASTER_TRACKER_LIST"]),
      ...mapActions("LostFinance", ["FETCH_LOST_FINANCE_DATAS", "APPROVE_LOST_STOLEN_EXCEPTION", "REJECT_LOST_STOLEN_EXCEPTION", "APPROVE_PHONEPE_LOST_STOLEN_EXCEPTION","FETCH_PHONEPE_LOST_FINANCE_DATAS"]),
      //Load all short lead info while page loading
      ajaxLoadAllLeadInfo() {
        this.toggleAjaxLoadFilter = true;
        this.MASTER_TRACKER_LIST()
          .then(response => {
            this.toggleAjaxLoadFilter = false;
          })
          .catch(error => {
            this.toggleAjaxLoadFilter = false;
          });
      },
      ajaxLoadAllLeadInfo({ pagination, filter }) {
        // we set QTable to "loading" state
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.FETCH_PHONEPE_LOST_FINANCE_DATAS({ pagination, filter })
          .then(res => {
            // updating pagination to reflect in the UI
            this.paginationControl = pagination;
  
            // we also set (or update) rowsNumber
            this.paginationControl.rowsNumber = this.getPhonepeLostDatas.totalElements;
            this.paginationControl.page = this.getPhonepeLostDatas.number + 1;
  
            // then we update the rows with the fetched ones
            this.tableData = this.getPhonepeLostDatas.content;
            if (this.getPhonepeLostDatas.sort != null) {
              this.paginationControl.sortBy = this.getPhonepeLostDatas.sort[0].property;
              this.paginationControl.descending = this.getPhonepeLostDatas.sort[0].ascending;
            }
  
            // finally we tell QTable to exit the "loading" state
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
      openAccept(reqData) {
        console.log('the request data ' + JSON.stringify(reqData))
        this.$q
          .dialog({
            title: 'Confirm',
            message: 'Are you sure want to Move Lost/Stolen?',
            ok: 'Continue',
            cancel: 'Cancel'
          })
          .then(() => {
            this.$q.loading.show({
              delay: 0, // ms
              spinnerColor: 'purple-9',
              message: 'Processing ..'
            })
  
            let obj = {
              id: reqData.regionalInventory.id,
              serialNumber: reqData.regionalInventory.serialNumber,
              lostOrStolenRemarks: ""
            }
  
            this.APPROVE_PHONEPE_LOST_STOLEN_EXCEPTION(obj)
              .then(() => {
                // this.ajaxLoadAllLeadInfo();
                this.$q.loading.hide();
                this.$q.notify({
                  color: 'positive',
                  position: 'bottom',
                  message: 'Successfully Approved!',
                  icon: 'thumb_up'
                })
              })
              .catch(error => {
                this.$q.loading.hide();
                this.$q.notify({
                  color: 'negative',
                  position: 'bottom',
                  message: 'Please try again later!',
                  icon: 'thumb_down'
                })
              })
          })
      },
  
      openReject(exceptionDetails) {
        this.showRejectModel = !this.showRejectModel;
        this.propsRejectAppend = exceptionDetails;
        console.log("Exception Details------------>" + JSON.stringify(exceptionDetails))
      },
      // Function to toggle lead information pop up screen
      toggleLeadInformation(leadDetails) {
        this.propToggleLeadInformation = !this.propToggleLeadInformation;
        if (leadDetails != undefined) {
          this.addtnLeadInformation = leadDetails;
        }
      }
    }
  };
  </script>
  
  <style>
  
  </style>
  