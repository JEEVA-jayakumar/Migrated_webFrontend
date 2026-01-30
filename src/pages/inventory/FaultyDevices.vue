<template>
  <q-page>
    <!-- content -->
    
    <div>
      <!--START: table title -->
      <div
        class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      ></div>
      <!--END: table title -->
      <!--START: table lead validation -->
      <q-table
        table-class="customTableClass"
        class="q-py-none"
        :data="tableData"
        :columns="columns"
        :filter="filter"
        :rows-per-page-options="[5,10,15,20,25]"
        :pagination.sync="paginationControl"
        :loading="toggleAjaxLoadFilter"
        @request="ajaxLoadAllLeadInfo"
      >
       
     
        <template slot="top"  class="bottom-border">
          <!--START: table filter,search -->
          <div class="col-md-4">
          <q-select
        
            outline
            no-caps
            v-model="filter"
             float-label="Select  a Region"
            radio
            color="grey-9"
            :options="getFaultyDevicesMenuOptions"
           />
           </div>
           <div class="col-md-7">
            <q-btn
              square
              outline
              color="purple-9"
              label="Download as Excel"
              class="q-mr-lg q-py-sm float-right"
              size="md"
              @click="downloadInventorySummaryInfoMenu()"
            />
          </div>
       <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->

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
import downloadExcel from "vue-json-excel";
export default {
  name: "getFaultyDevice",
  components: {
    downloadExcel
  },
  data() {
    return {
      // regionFilter: "",
      formData: {
       region: "",
        getFaultyDevicesMenuOptions: [],
      },
        getFaultyDevicesMenuOptions: [],

      model:"",
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
          name: "BpRegion",
          required: true,
          label: "BpRegion",
          align: "left",
          field: "BpRegion"
        },
        {
          name: "deviceType",
          required: true,
          label: "Device Type",
          align: "left",
          field: "deviceType"
        },
        {
          name: "Total",
          required: true,
          label: "Total",
          align: "left",
          field: "Total"
        },
        
        // {
        //   name: "mid",
        //   required: true,
        //   label: "MID",
        //   align: "left",
        //   field: "mid"
        // },
        // deviceType
        // {
        //   name: "tid",
        //   required: true,
        //   label: "TID",
        //   align: "left",
        //   field: "tid"
        // },
        // {
        //   name: "ME NAME",
        //   required: true,
        //   label: "ME Name",
        //   align: "left",
        //   field: "ME Name"
        // },
        // {
        //   name: "Device Serial Number",
        //   required: true,
        //   label: "Device Serial Number",
        //   align: "left",
        //   field: "DeviceSerialNumber"
        // },
        //  {
        //   name: "	Device Recovered Date ",
        //   required: true,
        //   label: "	Device Recovered Date ",
        //   align: "left",
        //   field: "	Device Recovered Date "
        // },
        // {
        //   name: "Ageing",
        //   required: true,
        //   label: "Ageing",
        //   align: "left",
        //   field: "Ageing"
        // },
          
        
        
      ],
      loading: true,
      tableData: [],
     
    
    };
  },
  computed: {
    ...mapGetters("faulty",["getFaultyDevice"]),
    ...mapGetters("FaultyDevices",["getFaultyDevicesRegionMenu"]), 
  },
   
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  created() {
    this.fnAjaxFaultyDevice();
  },

  

  methods: {
    ...mapActions("faulty",["FAULTY_DEVICE"]),
    ...mapActions("FaultyDevices",["FAULTY_DEVICE_LIST"]),
    ...mapActions("InventoryCentral",["REPORT_INVENTORY_SUMMARY3"]),

     fnAjaxFaultyDevice() {
      this.FAULTY_DEVICE_LIST()
        .then(() => {
          let assumeArr = [];
           console.log("The Regions : " + assumeArr);
          assumeArr.push({
            label: 'ALL',
            value: '%'
          });
          console.log("The Regions : " + assumeArr);
          this.getFaultyDevicesRegionMenu.map(function(value, index) {
            assumeArr.push({
              label: value,
              value: value,
            });
          });
          this.getFaultyDevicesMenuOptions = assumeArr;
        })
        .catch(error => {
          this.getFaultyDevicesMenuOptions = [];
        });
    },

    

    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FAULTY_DEVICE({ pagination, filter })
        .then(res => {
        
          this.paginationControl = pagination;

         
          this.paginationControl.rowsNumber = this.getFaultyDevice.totalElements;
          this.paginationControl.page =
            this.getFaultyDevice.number + 1;
            this.tableData = this.getFaultyDevice.content;
          if (this.getFaultyDevice.sort != null) {
            this.paginationControl.sortBy = this.getFaultyDevice.sort[0].property;
            this.paginationControl.descending = this.getFaultyDevice.sort[0].ascending;
          }

         
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    // fnSubmitAllocateResellar(request) {
    //   let params = {};
    //   if (this.formData.region == "") {
    //     this.$q.notify({
    //       color: "amber-9",
    //       position: "bottom",
    //       message: "Region cannot be empty!",
    //       icon: "warning"
    //     });
    //   } else if (this.formData.podNumber == "") {
    //     this.$q.notify({
    //       color: "amber-9",
    //       position: "bottom",
    //       message: "POD number cannot be empty!",
    //       icon: "warning"
    //     });
    //   } else if (this.formData.scannedDevices.length == 0) {
    //     this.$q.notify({
    //       color: "amber-9",
    //       position: "bottom",
    //       message: "Scanned devices cannot be empty!",
    //       icon: "warning"
    //     });
    //   } else {
    //     this.FEED_ALLOCATE_TO_REGION_BASED_RESELLAR(this.formData)
    //       .then(() => {
    //         this.TOGGLE_COMMON_LOADER(false);
    //         this.$q.notify({
    //           color: "positive",
    //           position: "bottom",
    //           message: "Devices has been successfully allocated to region",
    //           icon: "thumb_up"
    //         });
    //         this.$router.push("/inventory/central");
    //       })
    //       .catch(error => {
    //         this.TOGGLE_COMMON_LOADER(false);
    //         this.$q.notify({
    //           color: "negative",
    //           position: "bottom",
    //           message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
    //           icon: "thumb_down"
    //         });
    //       });
    //   }
    // },
    downloadInventorySummaryInfoMenu(){
      this.$q.loading.show({
        delay: 100 // ms
      });
      this.REPORT_INVENTORY_SUMMARY3()
        .then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Success, file has been downloaded",
            icon: "check"
          });
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again" + error.message,
            icon: "thumb_down"
          });
        });
    }
  }
};
</script>

<style>
</style>

  
         
   
   
 
