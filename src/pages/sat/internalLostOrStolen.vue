<template>
    <q-page>
      <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      > Bijlipay Lost/Stolen</div>
      <!-- <q-pull-to-refresh :handler="PullToRefresh" inline></q-pull-to-refresh> -->
      <!--START: table title -->
      <!-- <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
     
      ></div> -->
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
        :rows-per-page-options="[5, 10, 15, 20]"
        @request="ajaxLoadAllLeadInfo"
      >
        <!--START: table header -->
        <q-tr v-slot:top-row="props">
          <q-th v-for="col in props.columns" :key="col.name" :props="props">{{
            col.label
          }}</q-th>
        </q-tr>
        <!--END: table header -->
  
        <q-td v-slot:body-cell-tid="props" :props="props">
          <span class="label text-primary"># {{ props.row.tid }}</span>
        </q-td>
        <q-td v-slot:body-cell-mid="props" :props="props">
          <span class="label text-primary"># {{ props.row.mid }}</span>
        </q-td>
        <!-- <q-td
            v-slot:body-cell-leadName="props"
            :props="props"
          >{{props.row.leadInformation.leadName}}</q-td>-->
        <q-td
          v-slot:body-cell-leadNumber="props"
          :props="props"
          class="cursor-pointer"
          @click.native="toggleLeadInformation(props.row.leadInformation)"
        >
          <span class="label text-primary"
            ># {{ props.row.leadInformation.leadNumber }}</span
          >
        </q-td>
        <q-td v-slot:body-cell-mobileNumber="props" :props="props">{{
          props.row.leadInformation == null
            ? "NA"
            : props.row.leadInformation.contactNumber
        }}</q-td>
        <q-td v-slot:body-cell-leadAddress="props" :props="props">{{
          props.row.leadInformation == null
            ? "NA"
            : props.row.leadInformation.leadAddress
        }}</q-td>
        <q-td
          v-slot:body-cell-lostOrStolenRemarks="props"
          :props="props"
        >
          <span class="label">{{ props.row.lostOrStolenRemarks }}</span>
        </q-td>
        <q-td v-slot:body-cell-deviceStatusDate="props" :props="props">
          <span class="label">{{
            props.row.deviceStatusDate | moment("Do MMM Y")
          }}</span>
        </q-td>
        <!-- <q-td v-slot:body-cell-deviceStatusDate="props" :props="props">
          <span class="label">{{
            props.row.deviceStatusDate | moment("Do MMM Y")
          }}</span>
        </q-td> -->
        <q-td v-slot:body-cell-action="props" :props="props">
          <q-btn
            highlight
            push
            class="q-mx-sm"
            color="positive"
            size="sm"
            @click="lostStolenDevice(props.row)"
            >Lost/Stolen</q-btn
          >
        </q-td>
        <!-- <q-td auto-width key="action" :props="props">
                <q-btn
                highlight
                push
                class="q-mx-sm"
                color="positive"
                 @click="openAcceptModel(props.row)"
                size="sm"
               >Accept</q-btn>
             </q-td>
             </q-tr>
          </template> -->
        <template slot="top" class="bottom-border">
          <!--START: table filter,search,excel download -->
          <div class="col-5">
            <q-input
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Search Using TID, MID, Lead ID, Merchant Name"
              class="q-mr-lg q-py-sm"
            />
          </div>
        </template>
      </q-table>
 <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Lost/Stolen Status</div>
       <q-table
        table-class="customTableClass"
        v-model:columns="columns1"
        :rows="tableData1"
        row-key="field"
        color="grey-9"
        :filter="filter1"
        :rows-per-page-options="[5, 10, 15, 20, 25]"
        :pagination="paginationControl1"
        :loading="toggleAjaxLoadFilter1"
        @request="lostOrStolenLoadInfo"
        table-style="word-break: break-all"
        class="payment_verification_table capitalize"
      >
      
        <!-- <q-td v-slot:body-cell-deviceStatusDate="props" :props="props">
          <span class="label">{{
            props.row.deviceStatusDate | moment("Do MMM Y")
          }}</span>
        </q-td> -->
        <q-td
            v-slot:body-cell-updated_at="props"
            :props="props"
          >{{ props.row.updatedAt ==null? "NA" : props.row.updatedAt | moment("Do MMM Y") }}</q-td>
        <q-td v-slot:body-cell-Status="props" :props="props">
          <span
            class="label text-positive"
            v-if="props.row.regionalInventory.deviceStatus == 8"
            >Waiting for Approval</span
          >
          <span
            class="label text-amber"
            v-if="props.row.regionalInventory.deviceStatus == 7"
            >Submitted By SO</span
          >
          <span
            class="label text-purple"
            v-if="props.row.regionalInventory.deviceStatus == 10"
            >Rejected By Finance</span
          >
        </q-td>
        <q-td v-slot:body-cell-action="props" :props="props">
          <q-btn
            v-if="props.row.regionalInventory.deviceStatus == 8"
            disable
            push
            color="purple-9"
            size="sm"
            >Waiting for Approval</q-btn
          >
          <q-btn
            v-else-if="props.row.regionalInventory.deviceStatus == 7"
            highlight
            push
            disable
            color="blue"
            size="sm"
            >Submitted By SO</q-btn
          >
          <q-btn
            v-else-if="props.row.regionalInventory.deviceStatus == 10"
            highlight
            push
            disable
            color="red"
            size="sm"
            >Rejected By Finance</q-btn
          >
        </q-td>
        <q-td v-slot:body-cell-action="props" :props="props">
          <q-btn
            v-if="props.row.regionalInventory.deviceStatus == 10"
            highlight
            push
            color="red"
            size="sm"
            @click="loststolendevice(props.row)"
            >Lost/Stolen</q-btn
          >
          <q-btn
            v-if="props.row.regionalInventory.deviceStatus == 8"
            highlight
            push
            color="purple-9"
            size="sm"
            @click="loststolendevice(props.row)"
            >Lost/Stolen</q-btn
          >
          <q-btn
            v-else-if="props.row.regionalInventory.deviceStatus == 7"
            highlight
            push
            class="q-mx-sm"
            color="positive"
            size="sm"
            @click="loststolendevice(props.row)"
            >Lost/Stolen</q-btn
          >
        </q-td>
        <template slot="top" class="bottom-border">
          <div class="col-md-5">
            <q-input
              clearable
              color="grey-9"
              v-model="filter1"
              placeholder="Type.."
              float-label="Search Using TID, MID "
              class="q-mr-lg q-py-sm"
            />
          </div>
          <div class="col-md-6">
             
              <q-btn 
              square 
              outline 
              color="purple-9" 
              label="Download as Excel" 
              class="q-mr-lg q-py-sm float-right" 
              size="md" 
              @click="downloadLostDatas()" />
             
            </div>
          
        </template>
      </q-table>
      <!--END: table lead validation -->
      <!--START >>  Download Reports -->
        <DownloadLostOrStolen
           v-if="propLostStolenDatas" 
          :propLostStolenDatas="propLostStolenDatas" 
          @emitfnshowLostOrStolen="downloadLostDatas"
       ></DownloadLostOrStolen>
        <!--END:  Download Reports-->
      <showMerchantTransactionLevelDetails
        v-if="valueToggleMerchantTransaction"
        :valueToggleMerchantTransaction="valueToggleMerchantTransaction"
        @revertRowClick="rowClick"
      ></showMerchantTransactionLevelDetails>
      <!--START >>  Show Ajax Spinner -->
      <!--START: Lost or Stolen model -->
      <lostStolenDeviceComp
        v-if="showLostModel"
        :showLostModel="showLostModel"
        :propShowLostComponent="propsLostAppend"
        @closeLostModel="lostStolenDevice"
      ></lostStolenDeviceComp>
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
      <!--END >>  Show Ajax Spinner -->
    </q-page>
  </template>
  
  <script>
import { required, or } from '@vuelidate/validators';
  import { mapGetters, mapActions } from "vuex";



  import { date } from "quasar";
  const today = new Date();
  const { startOfDate, addToDate, subtractFromDate } = date;
  import moment from "moment";
  import DownloadLostOrStolen from "../../components/sat/DownloadLostOrStolen.vue";
  import lostStolenDeviceComp from "../../components/sat/lostStolenDeviceComp.vue";
  import showMerchantTransactionLevelDetails from "../../components/sat/showMerchantTransactionLevelDetails.vue";
  import generalLeadInformation from "../../components/generalLeadInformation.vue";
  
  export default {
    name: "merchantTransactionLevel",
  
    components: {
      showMerchantTransactionLevelDetails,
      lostStolenDeviceComp,
      generalLeadInformation,
      DownloadLostOrStolen
    },
  
    data() {
      return {
        propToggleLeadInformation: false,
        propLostStolenDatas: false,
        propsLostAppend: [],
        showLostModel: false,
        addtnLeadInformation: null,
  
        // paginationControl: {
        //   rowsPerPage: 10
        // },
        toggleAjaxLoadFilter: false,
        toggleAjaxLoadFilter1: false,
  
        paginationControl: {
          rowsNumber: 10,
          page: 1,
          sortBy: "tid",
          descending: false,
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
            label: "Merchant Name",
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
              return row.assignedTo == null ? "NA" : row.assignedTo.name+" | "+row.assignedTo.employeeID;
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
            name: "action",
            required: true,
            label: "",
            align: "center",
            field: "action",
            sortable: true
          }
        ],
        columns1: [
          {
            name: "leadInformation.leadName",
            required: true,
            label: "Merchant Name",
            align: "left",
  
            field: row => {
              return row.leadInformation.leadName;
            }
            // sortable: true,
          },
          {
            name: "Address",
            required: true,
            label: "Address",
            align: "left",
            field: row => {
              return row.leadInformation.leadAddress;
            },
            sortable: true
          },
  
          {
            name: "leadInformation.device.deviceName",
            required: true,
            label: "Device",
            align: "left",
            field: row => {
              return row.leadInformation.device.deviceName;
            }
            // sortable: true,
          },
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
            name: "updated_at",
            required: true,
            label: "Receive Date",
            align: "center",
            field: row => {
              return moment(row.updated_at).format("DD/MM/YYYY");
            }
          },
          {
            name: "lostOrStolenRemarks",
            required: true,
            label: "Remarks",
            align: "left",
            field: row => {
              return row.regionalInventory.lostOrStolenRemarks;
            }
            // sortable: true
          },
          {
            name: "Status",
            required: true,
            label: "Status",
            align: "left",
            field: row => {
              return row.regionalInventory.deviceStatus;
            },
            sortable: true
          },
          {
            name: "action",
            required: true,
            label: "",
            align: "left",
            field: "action",
            sortable: false
          }
        ],
        loading: true,
        filter_values: "",
        filter1_values: ""
      };
    },
    computed: {
      ...mapGetters("MasterTracker", ["getMasterTrackerList"]),
      ...mapGetters("lostOrStolenDatas", ["getLostOrStolenDatas"])
    },
    mounted() {
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
      ...mapActions("MasterTracker", [
        "MASTER_TRACKER_LIST",
        "APPROVE_LOST_STOLEN_DEVICE"
      ]),
      ...mapActions("lostOrStolenDatas", ["FETCH_ALL_LOST_DEVICES_DATAS"]),
      // ...mapActions("InventoryCentral", ["DOWNLOAD_lOST_OR_STOLEN_DATAS"]),
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
      lostOrStolenLoadInfo() {
        this.toggleAjaxLoadFilter1 = true;
        this.FETCH_ALL_LOST_DEVICES_DATAS()
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
        this.MASTER_TRACKER_LIST({ pagination, filter })
          .then(res => {
            // updating pagination to reflect in the UI
            this.paginationControl = pagination;
  
            // we also set (or update) rowsNumber
            this.paginationControl.rowsNumber = this.getMasterTrackerList.totalElements;
            this.paginationControl.page = this.getMasterTrackerList.number + 1;
  
            // then we update the rows with the fetched ones
            this.tableData = this.getMasterTrackerList.content;
            if (this.getMasterTrackerList.sort != null) {
              this.paginationControl.sortBy = this.getMasterTrackerList.sort[0].property;
              this.paginationControl.descending = this.getMasterTrackerList.sort[0].ascending;
            }
  
            // finally we tell QTable to exit the "loading" state
            this.$q.loading.hide();
            // console.log("Table Datas ---------------------->"+JSON.stringify(this.tableData));
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
      downloadLostDatas(){
        this.propLostStolenDatas =!this.propLostStolenDatas;
      },
      lostStolenDevice(exceptionDetails) {
        this.showLostModel = !this.showLostModel;
        this.propsLostAppend = exceptionDetails;
      },
      lostOrStolenLoadInfo({ pagination, filter }) {
        // we set QTable to "loading" state
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.FETCH_ALL_LOST_DEVICES_DATAS({ pagination, filter })
          .then(res => {
            console.log("INSIDE LOAD ALL LEAD INFO 1 :::::::::::::::::::::");
            console.log(
              "Table Datas 1---------------------->" +
                JSON.stringify(this.getLostOrStolenDatas)
            );
  
            // updating pagination to reflect in the UI
            this.paginationControl1 = pagination;
  
            // we also set (or update) rowsNumber
            this.paginationControl1.rowsNumber = this.getLostOrStolenDatas.totalElements;
            this.paginationControl1.page = this.getLostOrStolenDatas.number + 1;
  
            // then we update the rows with the fetched ones
            this.tableData1 = this.getLostOrStolenDatas.content;
  
            if (this.getAllLostDeviceDatas.sort != null) {
              this.paginationControl1.sortBy = this.getLostOrStolenDatas.sort[0].property;
              this.paginationControl1.descending = this.getLostOrStolenDatas.sort[0].ascending;
            }
  
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
  
