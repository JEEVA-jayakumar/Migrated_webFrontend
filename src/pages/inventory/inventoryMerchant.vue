<template>
  <q-page>
    <!-- content -->
    <div>
      <!--START: table title -->
      <div
        class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Bijlipay Inventory with Merchant</div>
      <!--END: table title -->
      <!--START: table lead validation -->
      <q-table
        table-class="customTableClass"
        class="q-py-none"
        :data="tableData"
        :columns="columns"
        :filter="filter"
        :rows-per-page-options="[100,200,300,400,500]"
        :pagination.sync="paginationControl"
        :loading="toggleAjaxLoadFilter"
        @request="ajaxLoadAllLeadInfo"
      >
      <!-- :rows-per-page-options="[100,200,300,400,500]" -->
      <q-td slot="body-cell-deviceStatusDate" slot-scope="props" :props="props">
          <span class="label">{{props.row.deviceStatusDate | moment("Do MMM Y")}}</span>
        </q-td>
        <template slot="top" class="bottom-border">
          <!--START: table filter,search -->
          <div class="col">
            <q-search
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              float-label="Search by Device Serial Number, MID, TID, Merchant Name"
              class="q-mr-lg q-py-sm"
            />
          </div>

          <!-- <div class="col-4">
            <q-select
              clearable
              @clear="filterMasterTrackerClear()"
              @input="filterMasterTrackerByRegionId"
              v-model="regionFilter"
              color="grey-9"
              :options="getAllRegionsData"
              placeholder="Select"
              float-label="Filter By"
            />
          </div>-->
           <div class="col-md-6">
           
            <q-btn 
            square 
            outline 
            color="purple-9" 
            label="Download as Excel" 
            class="q-mr-lg q-py-sm float-right" 
            size="md" 
            @click="downloadInventoryWithMerchant()" />
           
          </div>
          <div class="col-auto">
            <!-- <q-btn
              @click="downloadMasterInventory()"
              outline
              color="grey-9"
              label="Download as Excel"
              class="q-mr-lg q-py-sm float-right"
              size="md"
            />-->
            <!-- <downloadExcel :data="tableData" :fields="json_fields" name="InventoryWithMerchant.xls">
              <q-btn outline color="grey-9" label="Download as excel" />
            </downloadExcel> -->
          </div>

          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->
       <!--START >>  Download Reports -->
      <DownloadInventoryMerchant
         v-if="propInventoryWithMerchant" 
        :propInventoryWithMerchant="propInventoryWithMerchant" 
        @emitfnshowInventoryWithMerchant="downloadInventoryWithMerchant"
     ></DownloadInventoryMerchant>
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
import DownloadInventoryMerchant from "../../components/inventory/DownloadInventoryMerchant.vue";
export default {
  name: "inventoryMerchant",
  components: {
    DownloadInventoryMerchant
  },
  data() {
    return {
      // regionFilter: "",
      propInventoryWithMerchant: false,
      json_fields: {
          DeviceStatusDate: {
          field: "deviceStatusDate",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        LeadAddress: "leadInformation.leadAddress",
        LeadName: "leadInformation.leadName",
        TID: "tid",
        MID: "mid",
        DeviceName: "leadInformation.device.deviceName",
        SerialNumber: "regionalInventory.serialNumber",
        BPRegion: "leadInformation.region.regionAreaName"
      },
      filter: "",
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "tid",
        descending: false,
        rowsPerPage: 10
      },
      columns: [
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
          name: "device",
          required: true,
          label: "Device type",
          align: "left",
          field: row => {
            return row.leadInformation.device.deviceName;
          },
          sortable: false
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
          name: "region",
          required: true,
          label: "Region",
          align: "left",
          field: row => {
            return row.leadInformation.region.regionAreaName;
          },
          sortable: false
        },
        {
          name: "address",
          required: true,
          label: "Address",
          align: "left",
          field: row => {
            return row.leadInformation.leadAddress;
          },
          sortable: false
        }
      ],
      loading: true,
      tableData: [],
      regionOptions: []
    };
  },
  computed: {
    ...mapGetters("InventoryCentral", ["getInventoryWithMerchantData"])
    // ...mapGetters("SuperAdminUsers", ["getAllRegionsData"])
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
    ...mapActions("InventoryCentral", [
      "FETCH_INVENTORY_WITH_MERCHANT_DATA",
      "REPORT_MASTER_INVENTORY"
    ]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA"]),
     ...mapActions("DownloadInventoryMerchantReports",["FETCH_INVENTORY_WITH_MERCHANT_ALL_DATAS"]),

    // getAllInventoryData() {
    //   this.FETCH_INVENTORY_WITH_MERCHANT_DATA().then(() => {
    //     this.tableData = this.getMasterInventoryData;
    //     this.FETCH_ALL_REGIONS_DATA().then(() => {
    //       this.regionOptions = this.getAllRegionsData;
    //     });
    //   });
    // },
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_INVENTORY_WITH_MERCHANT_DATA({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getInventoryWithMerchantData.totalElements;
          this.paginationControl.page =
            this.getInventoryWithMerchantData.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getInventoryWithMerchantData.content;
          if (this.getInventoryWithMerchantData.sort != null) {
            this.paginationControl.sortBy = this.getInventoryWithMerchantData.sort[0].property;
            this.paginationControl.descending = this.getInventoryWithMerchantData.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    // filterMasterTrackerByRegionId() {
    //   this.FETCH_INVENTORY_WITH_MERCHANT_DATA(this.regionFilter).then(() => {
    //     this.tableData = this.getMasterInventoryData;
    //     this.FETCH_ALL_REGIONS_DATA().then(() => {
    //       this.regionOptions = this.getAllRegionsData;
    //     });
    //   });
    // },
    // filterMasterTrackerClear() {
    //   this.regionFilter = "";
    // },
    downloadInventoryWithMerchant(){
      this.propInventoryWithMerchant =!this.propInventoryWithMerchant;
    },
    // downloadInventoryWithMerchant(request) {
    //   let params = {
    //     fromDate: this.toTimestamp(request.fromDate.toString()),
    //     toDate: this.toTimestamp(request.toDate.toString()),
    //   };
    //   this.$q.loading.show({
    //       delay: 100, // ms
    //       spinnerColor: "purple-9",
    //       message: "Please wait.."
    //   });
    //   this.FETCH_INVENTORY_WITH_MERCHANT_ALL_DATAS(params)
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
    // }
  }
};
</script>

<style>
</style>
