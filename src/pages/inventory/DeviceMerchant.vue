<template>
  <q-page>
    <!-- content -->
    <div>
      <!--START: table title -->
      <div
        class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Devices with Merchants</div>

      <!--START: table lead validation -->
      <q-table
        table-class="customTableClass"
        class="q-py-none"
        :data="tableData"
        :columns="columns"
        :filter="filter"
        :pagination.sync="paginationControl"
        row-key="name"
        :loading="toggleAjaxLoadFilter"
        :rows-per-page-options="[5,10,15,20]"
        @request="ajaxLoadAllLeadInfo"
      >
       <q-td slot="body-cell-implementedDate" slot-scope="props" :props="props">
          <span class="label">{{props.row.implementedDate | moment("Do MMM Y")}}</span>
        </q-td>
        <!-- <q-td slot="body-cell-installationDate" slot-scope="props" :props="props">
          <span class="label">{{props.row.installationDate | moment("Do MMM Y")}}</span>
        </q-td> -->
           <!-- <q-td key="action" :props="props">
                <div class="q-gutter-sm">
              <q-checkbox v-model="val" />
                 </div>
               
              </q-td>
         -->
     
        <template slot="top"  class="bottom-border">
          <!--START: table filter,search -->
          <div class="col">
            <q-search
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              float-label="Search by MID, TID"
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
            @click="fndownloadMerchantMenu()" 
            />
           
          </div>
           <!-- <div class="col-md-12 col-md-6 q-pt-md group" align="right">
            <q-btn
               icon="check"
              outline
              color="black"
              label="Last"
              class="common-btn"
              size="md"
            />
           
          </div> -->

          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->
       <!--START >>  Download Reports -->
      <DownloadDeviceMerchantReport
         v-if="propDeviceMerchantReport" 
        :propDeviceMerchantReport="propDeviceMerchantReport" 
        @emitfnshowDeviceMerchant="fndownloadMerchantMenu"
     ></DownloadDeviceMerchantReport>
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
import DownloadDeviceMerchantReport from "../../components/inventory/DownloadDeviceMerchantReport.vue";
export default {
  name: "getDeviceWithMerchant",
  components: {
    DownloadDeviceMerchantReport
  },
  data() {
    return {
      
       propToggleLeadInformation: false,
       propDeviceMerchantReport:false,
      addtnLeadInformation: null,
       tomorrow: addToDate(today, { days: -1 }),
      yesterday: subtractFromDate(today, { days: 90 }),
      state: new Date(),
      defaultValue: startOfDate(today, "year"),
      separator: 'horizontal',
      message:"",
      icon:"",
      formData:{
        from:"",
        to:""
      },
      model:"",
      json_fields: {
          implementedDate: {
          field: "implementedDate",
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
     // val: ref(true),
      paginationControl: {
        rowsNumber: 10,
        
        page: 1,
        sortBy: "tid",
        descending: false,
        rowsPerPage: 5
      },
      
      columns: [
        {
          name: "action",
          required: true,
          label: "",
          align: "center",
          field: "action",
          sortable: false
        },
        
        {
          name: "MID",
          required: true,
          label: "MID",
          align: "left",
          field: "mid",
          sortable: true
        },
        {
          name: "TID",
          required: true,
          label: "TID",
          align: "left",
          field: "tid",
          sortable: true
        },
        {
          name: "Merchant Name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "merchantName",
          sortable: true
        },
        {
          name: "BP Region",
          required: true,
          label: "BP Region",
          align: "left",
          field: "bpRegions",
          sortable: true
        },
        {
          name: "SO id",
          required: true,
          label: "SO id",
          align: "left",
          field: "soId",
          sortable: true
        },
        
        {
          name: "implementedDate",
          required: true,
          label: "Implemented Date",
          align: "left",
          field: "implementedDate",
          sortable: true
        },
         {
          name: "Device Serial Number",
          required: true,
          label: "Device Serial Number",
          align: "left",
          field: "deviceSerialNumber",
          sortable: true
        },
        {
          name: "Device Type",
          required: true,
          label: "Device Type",
          align: "left",
          field: "deviceType",
          sortable: true
        },
      ],
      loading: true,
      tableData: [],
    
    };
  },
  computed: {
    ...mapGetters("merchant", ["getDeviceWithMerchant"])
  
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
 

  methods: {
    ...mapActions("merchant",["DEVICE_WITH_MERCHANT"]),
     ...mapActions("InventoryCentral",["REPORT_MERCHANT_MENU"]),

    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.DEVICE_WITH_MERCHANT({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getDeviceWithMerchant.totalElements;
          this.paginationControl.page =
            this.getDeviceWithMerchant.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getDeviceWithMerchant.content;
          if (this.getDeviceWithMerchant.sort != null) {
            this.paginationControl.sortBy = this.getDeviceWithMerchant.sort[0].property;
            this.paginationControl.descending = this.getDeviceWithMerchant.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    toTimestamp(strDate) {
       var datum = Date.parse(strDate);
       return datum / 1000;
      },
     // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },
    
    fndownloadMerchantMenu(request){
   
      let params = {
        from: this.toTimestamp(request.from.toString()),
        to: this.toTimestamp(request.to.toString())
      };
      this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
      });
      this.REPORT_MERCHANT_MENU(params)
        .then(response => {
          this.$q.loading.hide();
          console.log("data information------------------>",response)
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully Downloaded",
            icon: "thumb_up"
          });
          this.formData.from="",
          this.formData.to=""
    
          
        })
        .catch(error => {
            // console.log("data information-------->",error)
          console.log("hello",error)
          this.$q.loading.hide();
          if(error.status==400){
            this.$q.notify({
            color: "amber",
            position: "bottom",
            message: error,
            icon: "thumb_down"
          });
          }
          else if(error.status == 500){
            this.$q.notify({
            color: "amber",
            position: "bottom",
            message: error,
            icon: "thumb_down"
          });

          }
     
          this.formData.from="",
          this.formData.to=""
        });
      
    },
     fndownloadMerchantMenu(){

    this.propDeviceMerchantReport=!this.propDeviceMerchantReport;
      },
  }
};
</script>

<style>
</style>