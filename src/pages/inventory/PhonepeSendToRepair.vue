<template>
    <q-page>
      <!-- content -->
      <div>
       
        <q-pull-to-refresh :handler="PullToRefresh" inline>
          <!--START: table title -->
          <div
            class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
          >
            Send To Repair
          </div>
          <!--END: table title -->
          <!--START: table lead validation -->
          <q-table
            table-class="customTableClass"
          :columns="columns"
          :data="tableData"
          color="grey-9"
          :filter="filterSearch"
          :pagination.sync="paginationControl"
          :rows-per-page-options="[5,10,15,20,25]"
          :loading="toggleAjaxLoadFilter"
          @request="ajaxLoadAllLeadInfo"
          >
  
            <!--START: table header -->
            <q-tr slot="top-row" slot-scope="props">
              <q-th v-for="col in props.columns" :key="col.name" :props="props">{{
                col.label
              }}</q-th>
            </q-tr>
            
  
            <!--END: table header -->
            <template slot="body" slot-scope="props">
              <!--START: table rows -->
              <q-tr :props="props" class="bottom-border">
                <q-td auto-width key="device" :props="props">{{
                  props.row.device.deviceName
                }}</q-td>
                <q-td auto-width key="device" :props="props">{{
                  props.row.serialNumber
                }}</q-td>
                <q-td auto-width key="updated_at" :props="props">{{ props.row.updatedAt ==null? "NA" : props.row.updatedAt | moment("Do MMM Y") }}</q-td>
                <q-td auto-width key="action" :props="props">
                  <q-btn
                    highlight
                    push
                    class="q-mx-sm"
                    color="positive"
                    @click="openAcceptModel(props.row)"
                    size="sm"
                    >Accept</q-btn
                  >
                  <q-btn
                    highlight
                    push
                    class="q-mx-sm"
                    color="negative"
                    @click="moveToScrap(props.row)"
                    size="sm"
                    >Moved To Scrap</q-btn
                  >
                </q-td>
                <!--END: table other data -->
              </q-tr>
            </template>
            <template slot="top" class="bottom-border">
              <!--START: table filter,search -->
              <div class="col-md-5">
                <q-search
                  clearable
                  color="grey-9"
                  v-model="filterSearch"
                  placeholder="Type.."
                  float-label="Search Using Device Serial Number"
                  class="q-mr-lg q-py-sm"
                />
              </div>
              <!-- <div class="col-md-5">
                <downloadExcel
                  :data="tableData"
                  :fields="json_fields"
                  name="CentralInventory.xls"
                >
                  <q-btn outline color="grey-9" label="Download as excel" />
                </downloadExcel>
              </div> -->
               <div class="col-md-5">
             
              <q-btn 
              square 
              outline 
              color="purple-9" 
              label="Download as Excel" 
              class="q-mr-lg q-py-sm float-right" 
              size="md" 
              @click="downloadSendToRepair()" />
             
            </div>
              <div class="col-md-12" align="right">
                <q-btn
                  outline
                  color="grey-9"
                  icon="attach_file"
                  @click.native="fnOpenBulkModal"
                  label="Bulk Upload"
                />
              </div>
  
              <!--END: table filter,search -->
            </template>
          </q-table>
        </q-pull-to-refresh>
         <!--START >>  Download Reports -->
        <PhonepeDownloadSendToRepair
           v-if="propSendToRepair" 
          :propSendToRepair="propSendToRepair" 
          @emitfnshowSendToRepair="downloadSendToRepair"
       ></PhonepeDownloadSendToRepair>
        <!--END:  Download Reports-->
        <PhonepeOpenAddBulkModelComp
          v-if="openBulkModal"
          :propOpenBulkModal="openBulkModal"
          @closeModel="fnOpenBulkModal"
          @emitToggleinventoryBulkUploadOnSuccess="fnReloadPageInformation"
        ></PhonepeOpenAddBulkModelComp>
  
        <phonepemoveToScrapComp
          v-if="showScrapModel"
          :showScrapModel="showScrapModel"
          :propShowScrapComponent="propsScrapAppend"
          @closeScrapModel="moveToScrap"
        ></phonepemoveToScrapComp>
  
        <!-- //Common lead information in popup -->
        <generalLeadInformation
          v-if="propToggleLeadInformation"
          :leadInformation="addtnLeadInformation"
          :propToggleLeadInformationPop="propToggleLeadInformation"
          @closeLeadInformation="toggleLeadInformation"
        />
        <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
          <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import phonepemoveToScrapComp from "../../components/inventory/phonepemoveToScrapComp.vue";
  import PhonepeOpenAddBulkModelComp from "../../components/inventory/PhonepeOpenAddBulkModelComp.vue";
  import PhonepeDownloadSendToRepair from "../../components/inventory/PhonepeDownloadSendToRepair.vue";
  import { date } from "quasar";
  import moment from "moment";
  
  export default {
    name: "getPhonepeSendToRepairDetails",
    components: {
        PhonepeDownloadSendToRepair,
      phonepemoveToScrapComp,
      PhonepeOpenAddBulkModelComp
    },
    data() {
      return {
        propToggleLeadInformation: false,
        propSendToRepair: false,
           toggleAjaxLoadFilter: false,
        propsScrapAppend: [],
        showScrapModel: false,
        openBulkModal: false,
        // regionFilter: "",
        model: "",
        model1: "",
        filterSearch: "",
        // showMovedToScrap: false,
        paginationControl: {
          rowsNumber: 10,
          page: 1,
          sortBy: "serialNumber",
          descending: false,
          rowsPerPage: 5
        },
        json_fields: {
          SerialNumber: "serialNumber",
          DeviceType: "device.deviceName"
        },
        columns: [
          {
            name: "device",
            required: true,
            label: "Device Type",
            align: "left",
            field: "deviceName",
            sortable: true
          },
          {
            name: "deviceserialNumber",
            required: true,
            label: "Device Serial Numbers",
            align: "left",
            field: "serialNumber",
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
            name: "action",
            required: true,
            label: "",
            align: "center",
            field: "action",
            sortable: true
          }
        ],
        loading: true,
        tableData: []
      };
    },
    computed: {
      ...mapGetters("AggregatorSendToRepair", ["getPhonepeSendToRepairDetails"])
    },
    // created() {
    //   this.ajaxLoadAllLeadInfo();
    // },
      mounted() {
      this.ajaxLoadAllLeadInfo({
        pagination: this.paginationControl,
        filter: this.filterSearch
      });
    },
    methods: {
      ...mapActions("AggregatorSendToRepair", [
        "FETCH_PHONEPE_SEND_TO_REPAIR_DETAILS",
        "APPROVE_PHONEPE_SEND_TO_REPAIR",
        "PHONEPE_MOVED_TO_SCRAP_DATAS"
      ]),
  
      fnOpenBulkModal() {
        this.openBulkModal = !this.openBulkModal;
      },
      downloadSendToRepair(){
        this.propSendToRepair =! this.propSendToRepair;
      },
      fndownload() {
        const datas = this.tableData;
        let output = "";
        console.log(datas);
        // while (index < datas.length) {
        //   console.log(datas[index].stan);
        //   output += datas[index].stan;
        //   output += '\r\n';
        //   index += 1;
        // }
        datas.forEach(element => {
          output += element.serialNumber;
          output += "\r\n";
        });
  
        const file = new Blob(
          [output],
  
          { type: "text/plain;charset=utf-8" }
        );
        // element.href = URL.createObjectURL(file);
        // element.download = "serialNumber.txt";
        // document.body.appendChild(element);
  
        // element.click();
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(file);
        link.download = "serialNumber.txt";
  
        link.click();
      },
      // Function to toggle lead information pop up screen
      toggleLeadInformation(leadDetails) {
        this.propToggleLeadInformation = !this.propToggleLeadInformation;
        if (leadDetails != undefined) {
          this.addtnLeadInformation = leadDetails;
        }
      },
  
      ajaxLoadAllLeadInfo({ pagination, filter }) {
        // we set QTable to "loading" state
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.FETCH_PHONEPE_SEND_TO_REPAIR_DETAILS({ pagination, filter })
          .then(res => {
             this.paginationControl = pagination;
  
            // we also set (or update) rowsNumber
            this.paginationControl.rowsNumber = this.getPhonepeSendToRepairDetails.totalElements;
            this.paginationControl.page = this.getPhonepeSendToRepairDetails.number + 1;
  
            // then we update the rows with the fetched ones
            this.tableData = this.getPhonepeSendToRepairDetails.content;
            if (this.getPhonepeSendToRepairDetails.sort != null) {
              this.paginationControl.sortBy = this.getPhonepeSendToRepairDetails.sort[0].property;
              this.paginationControl.descending = this.getPhonepeSendToRepairDetails.sort[0].ascending;
            }
            // then we update the rows with the fetched ones
            // this.tableData = this.getPhonepeSendToRepairDetails.content;
  
            // finally we tell QTable to exit the "loading" state
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
      moveToScrap(exceptionDetails) {
        this.showScrapModel = !this.showScrapModel;
        this.propsScrapAppend = exceptionDetails;
      },
      PullToRefresh(done) {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filter
        });
      },
  
      openAcceptModel(reqData) {
        console.log("the request data " + JSON.stringify(reqData));
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to approve ?",
            ok: "Continue",
            cancel: "Cancel"
          })
          .then(() => {
            this.$q.loading.show({
              delay: 0, // ms
              spinnerColor: "purple-9",
              message: "Processing .."
            });
  
            this.APPROVE_PHONEPE_SEND_TO_REPAIR(reqData)
              .then(() => {
                // this.ajaxLoadAllLeadInfo();
                this.$q.loading.hide();
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "Successfully Approved!",
                  icon: "thumb_up"
                });
              })
              .catch(error => {
                this.$q.loading.hide();
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: "Please try again later!",
                  icon: "thumb_down"
                });
              });
          });
      }
    }
  };
  </script>
  
  <style></style>
  