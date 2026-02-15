<template>
  <q-page>
    <div
      class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
    > Device Request</div>
   
    <q-table
      table-class="customTableClass"
      :rows="tableData"
      :columns="columns"
      :filter="filter"
      :pagination="paginationControl"
      :loading="toggleAjaxLoadFilter"
      :rows-per-page-options="[5, 10, 15, 20]"
      @request="ajaxLoadAllLeadInfo"
    >
      
      <q-td v-slot:body-cell-soName="props" :props="props">{{
        props.row.soName == null
          ? "NA"
          : props.row.soName
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
        <q-btn  v-if="props.row.status == 0"
          highlight
          push
          class="q-mx-sm"
          color="negative"
          size="sm"
          @click="deviceRequest(props.row)"
          >Reject</q-btn
        > 
       <span  class="label text-green" v-if="props.row.status == 1"> Device Allocated SuccesFully</span>
       <div v-if="props.row.status == 2">
        <span  class="label text-red" > Rejected</span>
        <br>
        <span  class="label text">Remarks: {{ props.row.remarks == null ? "NA": props.row.remarks }}</span>
       </div>
       
      </q-td>
      <!-- <q-td v-slot:body-cell-action2="props" :props="props"  > -->
       
       <!-- <q-td auto-width key="action" :props="props">
              <q-btn
              highlight
              push
              class="q-mx-sm"
              color="positive"
               @click="openAcceptModel(props.row)"
              size="sm"
             >Accept</q-btn>
           </q-td> -->
         
     
      <template slot="top" class="bottom-border">
        <!--START: table filter,search,excel download -->
        <div class="col-5">
          <q-input
            clearable
            v-model="filter"
            separator
            color="grey-9"
            placeholder="Type.."
            float-label="Search Using POD,Serial No, Merchant Name"
            class="q-mr-lg q-py-sm"
          />
        </div>
      </template>
    </q-table>

    <!--END: table lead validation -->
    <!--START >>  Download Reports -->
     
      <!--END:  Download Reports-->
    
    <!--START >>  Show Ajax Spinner -->
    <!--START: Lost or Stolen model -->
    <deviceAllocationRequest
      v-if="showRequestModal"
      :showRequestModal="showRequestModal"
      :showRequestComponent="propsLostAppend"
      @closeLostModel="deviceRequest"
    ></deviceAllocationRequest>
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
import { mapGetters, mapActions } from "vuex";



import { date } from "quasar";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
import moment from "moment";

import deviceAllocationRequest from "../../components/sat/rejectDeviceRequest.vue";
import { req } from "@vuelidate/validators";


export default {
  name: "merchantTransactionLevel",

  components: {

    deviceAllocationRequest,
   
  },

  data() {
    return {
      propToggleLeadInformation: false,
      propLostStolenDatas: false,
      propsLostAppend: [],
      showRequestModal: false,
      addtnLeadInformation: null,

      // paginationControl: {
      //   rowsPerPage: 10
      // },
      toggleAjaxLoadFilter: false,
      toggleAjaxLoadFilter1: false,

      paginationControl: {
        rowsNumber: 10,
        page: 1,
        // sortBy: "",
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
            return  row.regionalInventory.serialNumber;
          },
          sortable: true
        },
        {
          name: "podNumber",
          required: true,
          label: "POD",
          align: "left",
          field: row => {
            return  row.podNumber == null ? "NA" : row.podNumber;
          },
          sortable: false
        },
        {
          name: "requestedAt",
          required: true,
          label: "Requested Date",
          align: "left",
          field: row => {
            return  moment(row.requestedAt).format("DD/MM/YYYY")
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
        },
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
    // this.lostOrStolenLoadInfo({
    //   pagination: this.paginationControl1,
    //   filter: this.filter1
    // });
  },
  // created() {
  //   this.ajaxLoadAllLeadInfo();
  // },
  methods: {
    ...mapActions("VerifyDevice", [
      "BIJLIPAY_SELF_ASSIGNMENT_TRACKER","APPROVE_BIJLIPAY_SELF_ASSIGNMENT",
      "APPROVE_LOST_STOLEN_DEVICE"
    ]),
    ...mapActions("lostOrStolenDatas", ["FETCH_ALL_LOST_DEVICES_DATAS"]),
    // ...mapActions("InventoryCentral", ["DOWNLOAD_lOST_OR_STOLEN_DATAS"]),
    //Load all short lead info while page loading
    ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.BIJLIPAY_SELF_ASSIGNMENT_TRACKER()
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
      
      this.BIJLIPAY_SELF_ASSIGNMENT_TRACKER({ pagination, filter })
        .then(res => {
          console.log("RESPONSE REQUEST",JSON.stringify(res.body));
         let responseData = res.body
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = responseData.data.totalElements
          this.paginationControl.page = responseData.data.number + 1

          // then we update the rows with the fetched ones
          this.tableData = responseData.data.content
          console.log("TABLE DATA",JSON.stringify(this.tableData));
          // if (this.getMasterTrackerList.sort != null) {
          //   this.paginationControl.sortBy = this.getMasterTrackerList.sort[0].property;
          //   this.paginationControl.descending = this.getMasterTrackerList.sort[0].ascending;
          // }

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

    deviceRequest(exceptionDetails) {
      this.showRequestModal = !this.showRequestModal;
      this.propsLostAppend = exceptionDetails;
      if(this.showRequestModal == false){
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
    approveDeviceReques(request){
      console.log("REQ",JSON.stringify(request));
      let param ={
        selfAssignmentId:request.id,
    serialNumber:request.regionalInventory.serialNumber
      }
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
            this.APPROVE_BIJLIPAY_SELF_ASSIGNMENT(param)
              .then(() => {
                this.ajaxLoadAllLeadInfo({
           pagination: this.paginationControl,
            filter: this.filter
    });
                this.$q.loading.hide()
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "Approved Succesfully",
                  icon: "clear"
                });
                self.$q.loading.hide();
              })
              .catch(error => {
                this.$q.loading.hide()
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                  icon: "thumb_down"
                });
              });
          })
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

