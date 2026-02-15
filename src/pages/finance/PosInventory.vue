<template>
    <q-page>
      
      <!-- <q-pull-to-refresh :handler="PullToRefresh" inline></q-pull-to-refresh> -->
        <!--START: table title -->
        <div
          class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
        >POS Inventory</div>
        <!--END: table title -->
        <!-- //Common lead information in popup -->
        <generalLeadInformation
          v-if="propToggleLeadInformation"
          :leadInformation="addtnLeadInformation"
          :propToggleLeadInformationPop="propToggleLeadInformation"
          @closeLeadInformation="toggleLeadInformation"
        />
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
          :rows-per-page-options="[5,10,15,20]"
          @request="ajaxLoadAllLeadInfo"
        >
         <!--START: table header -->
          <q-tr v-slot:top-row="props">
          <q-th v-for="col in props.columns" :key="col.name" :props="props">{{ col.label }}</q-th>  
          </q-tr>
          <!--END: table header -->

          <q-td v-slot:body-cell-deviceType="props" :props="props">
            <span class="label text-primary">
              {{ props.row.device ? props.row.device.deviceName : 'NA' }}
            </span>
          </q-td>


          <q-td v-slot:body-cell-deviceCount="props" :props="props">
          {{props.row == null? 'NA':props.row.deviceCount}}</q-td>


          <q-td v-slot:body-cell-dateofSubmission="props" :props="props">
            <span class="label">{{props.row.financeSubmissionDate | moment("Do MMM Y")}}</span>
          </q-td>
          <template v-slot:top="props" class="bottom-border">
          <!--START: table  :rows-per-page-options="[5,10,15,20,25]"filter,search -->
          <div class="col">
            <q-input
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              float-label="Search by Request Number"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <div class="col-md-6">
           
            <q-btn 
            square 
            outline 
            color="purple-9" 
            label="Download Report" 
            class="q-mr-lg q-py-sm float-right" 
            size="md" 
            @click="downloadPOSReport()" />
           
          </div>
          <!--END: table filter,search -->
        </template>

          <q-td v-slot:body-cell-action="props" :props="props">
                  <q-btn
                    v-if ="props.row.status == 0"
                    push
                    class="q-mx-sm fixed-width-btn"
                    color="positive"
                    size="sm"
                    @click="fnApproveFinance(props.row)"
                    >Approve</q-btn
                  >
                  <q-btn
                    v-if ="props.row.status == 0"
                    disable
                    push
                    class="q-mx-sm fixed-width-btn"
                    color="purple-9"
                    size="sm"
                    >View Invoice Copy</q-btn
                  >
                  <q-btn
                    v-if ="props.row.status == 1"
                    disable
                    push
                    class="q-mx-sm fixed-width-btn"
                    color="negative"
                    size="sm"
                    >Already Approved</q-btn
                  >
                  <q-btn
                    v-if ="props.row.status == 1"
                    highlight
                    push
                    class="q-mx-sm fixed-width-btn"
                    color="purple-9"
                    size="sm"
                    @click="fnPDFViewModal(props.row)"
                    >View Invoice Copy</q-btn
                  >
                </q-td>
          <!-- <q-td v-slot:body-cell-action="props" :props="props">
              <q-btn
               highlight
               push
               class="q-mx-sm"
               color="positive"
               @click="openAccept(props.row)"
               size="sm"
               >Approve</q-btn>
            </q-td> -->
          <!-- <template v-slot:top="props" class="bottom-border" >
            <div class="col-5">
              <q-input
                clearable
                v-model="filter"
                separator
                color="grey-9"
                placeholder="Type.."
                float-label="Search By Device Type..."
                class="q-mr-lg q-py-sm"
              />
            </div>
          </template> -->
        </q-table>
        <!--END: table lead validation -->
        <!-- <showMerchantTransactionLevelDetails
          v-if="valueToggleMerchantTransaction"
          :valueToggleMerchantTransaction="valueToggleMerchantTransaction"
          @revertRowClick="rowClick"
        ></showMerchantTransactionLevelDetails> -->

        <!--START >>  Download Reports -->
      <DownloadPOSInventoryReport
         v-if="propDeviceHistoryReport" 
        :propDeviceHistoryReport="propDeviceHistoryReport" 
        @emitfnshowDeviceHistory="downloadPOSReport"
     ></DownloadPOSInventoryReport>
      <!--END:  Download Reports-->

        <UpdatePOSInventory
        v-if="propShowPosInventory"
        :propShowPosInventory="propShowPosInventory"
        :propRowDetails="propRowDetails"
        @emitfnshowPosInventory="fnApproveFinance"
      ></UpdatePOSInventory>

      <showPdfFinanceModalComponent
        v-if="toggleshowPDFModal"
        :propToggleshowPDFModal="toggleshowPDFModal"
        :propPDFDetails="PDFDetails"
        @togglePDFModal="fnPDFViewModal"
        ></showPdfFinanceModalComponent>
        <!--START >>  Show Ajax Spinner -->
        <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
          <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
        </div>
        <!--END >>  Show Ajax Spinner -->
    </q-page>
  </template>
  <script>
import { required, or } from '@vuelidate/validators';
  import { mapGetters, mapActions } from "vuex";
  import UpdatePOSInventory from "../../components/sat/UpdatePOSInventory.vue";
  import showPdfFinanceModalComponent from "../../components/sat/showPdfFinanceModalComponent.vue";
  import generalLeadInformation from "../../components/generalLeadInformation.vue";
  import DownloadPOSInventoryReport from "../../components/inventory/DownloadPOSInventoryReport.vue";
  export default {
    name: "merchantTransactionLevel",
    
  
    components: {
      UpdatePOSInventory,
      generalLeadInformation,
      showPdfFinanceModalComponent,
      DownloadPOSInventoryReport
      
    },
  
    data() {
      return {
        propToggleLeadInformation: false,
        addtnLeadInformation: null,
        showOpenPaymentChequeDocumentInfo: false,
        toggleshowPDFModal: false,
        propDeviceHistoryReport:false,
        propShowPosInventory: false,
        PDFDetails: null,
        // paginationControl: {
        //   rowsPerPage: 10
        // },
        toggleAjaxLoadFilter: false,
        paginationControl: {
          rowsNumber: 10,
          page: 1,
          sortBy: "createdAt",
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
            name: "deviceType",
            required: true,
            label: "Device Type",
            align: "left",
            field: row => {
              return row.device;
            },
            sortable: true
          },
          {
            name: "deviceCount",
            required: true,
            label: "Device Count",
            align: "left",
            field: row => {
              return row.deviceCount;
            },
            sortable: false
          },
          {
            name: "dateofSubmission",
            required: true,
            label: "Date of Submission to Finance",
            align: "left",
            field: "dateofSubmission",
            sortable: true
          },
          {
            name: 'action',
            required: true,
            label: '',
            align: 'center',
            field: 'action',
            sortable: false
          }
        ],
        loading: true,
        filter_values: ""
      };
    },
    computed: {
      ...mapGetters("LostFinance", ["getPosInventoryDatas"])
    },
    mounted () {
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
      ...mapActions("LostFinance", ["FETCH_POS_INVENTORY_FINANCE","APPROVE_LOST_STOLEN_EXCEPTION"]),
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
      ajaxLoadAllLeadInfo ({ pagination, filter }) {
        console.log("PAGINATION",pagination)
        // we set QTable to "loading" state
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.FETCH_POS_INVENTORY_FINANCE({ pagination, filter })
          .then(res => {
            // updating pagination to reflect in the UI
            this.paginationControl = pagination;
  
            // we also set (or update) rowsNumber
            this.paginationControl.rowsNumber = this.getPosInventoryDatas.totalElements;
            this.paginationControl.page = this.getPosInventoryDatas.number + 1;
  
            // then we update the rows with the fetched ones
            this.tableData = this.getPosInventoryDatas.content;
            if (this.getPosInventoryDatas.sort != null) {
              this.paginationControl.sortBy = this.getPosInventoryDatas.sort[0].property;
              this.paginationControl.descending = this.getPosInventoryDatas.sort[0].ascending;
            }
  
            // finally we tell QTable to exit the "loading" state
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
      fnApproveFinance(rowDetails) {
      this.propShowPosInventory = !this.propShowPosInventory;
      // eslint-disable-next-line eqeqeq
      this.ajaxLoadAllLeadInfo({pagination: this.paginationControl, filter: this.filter});
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    fnPDFViewModal(documentUrl) {
      this.showOpenPaymentChequeDocumentInfo = !this.showOpenPaymentChequeDocumentInfo;
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    },
    //    openAccept (reqData) {
    //     console.log('the request data ' + JSON.stringify(reqData))
    //     this.$q
    //       .dialog({
    //         title: 'Confirm',
    //         message: 'Are you sure want to Move Lost/Stolen?',
    //         ok: 'Continue',
    //         cancel: 'Cancel'
    //       })
    //       .then(() => {
    //         this.$q.loading.show({
    //           delay: 0, // ms
    //           spinnerColor: 'purple-9',
    //           message: 'Processing ..'
    //         })
  
    //         let obj =  {
    //         id : reqData.regionalInventory.id,
    //         serialNumber:reqData.regionalInventory.serialNumber,
    //         lostOrStolenRemarks: ""
    //         }
  
    //         this.APPROVE_LOST_STOLEN_EXCEPTION(obj)
    //           .then(() => {
    //             // this.ajaxLoadAllLeadInfo();
    //             this.$q.loading.hide();
    //             this.$q.notify({
    //               color: 'positive',
    //               position: 'bottom',
    //               message: 'Successfully Approved!',
    //               icon: 'thumb_up'
    //             })
    //           })
    //           .catch(error => {
    //            this.$q.loading.hide();
    //             this.$q.notify({
    //               color: 'negative',
    //               position: 'bottom',
    //               message: 'Please try again later!',
    //               icon: 'thumb_down'
    //             })
    //           })
    //       })
    //   },
    downloadPOSReport(){
        this.propDeviceHistoryReport=!this.propDeviceHistoryReport;
    },
      // Function to toggle lead information pop up screen
      toggleLeadInformation (leadDetails) {
        this.propToggleLeadInformation = !this.propToggleLeadInformation;
        if (leadDetails != undefined) {
          this.addtnLeadInformation = leadDetails;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .fixed-width-btn {
  width: 121px; /* Adjust this value as needed */
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
  </style>
  
