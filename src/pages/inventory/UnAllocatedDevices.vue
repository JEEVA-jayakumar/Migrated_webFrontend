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
            :options="getUnAllocatedDevicesMenuOptions"
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
  name: "getUnAllocatedDevice",
  components: {
    downloadExcel
  },
  data() {
    return {
      // regionFilter: "",
      formData: {
       region: "",
        getUnAllocatedDevicesMenuOptions: [],
      },
        getUnAllocatedDevicesMenuOptions: [],

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
          name: "BP Region",
          required: true,
          label: "BP Region",
          align: "left",
          field: "BpRegion"
        },
        {
          name: "Device Type",
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
          
        
        
      ],
      loading: true,
      tableData: [],
     
    
    };
  },
  computed: {
    ...mapGetters("unallocate",["getUnAllocatedDevice"]),
    ...mapGetters("UnallocatedDevices",["getUnAllocatedDevicesRegionMenu"]),
    
  },
   
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  created() {
    this.fnAjaxUnAllocatedDevice();
  },

  

  methods: {
    ...mapActions("unallocate",["UNALLOCATED_DEVICE"]),
    ...mapActions("UnallocatedDevices",["UNALLOCATED_DEVICE_LIST"]),
    ...mapActions("InventoryCentral",["REPORT_INVENTORY_SUMMARY2"]),

     fnAjaxUnAllocatedDevice() {
      this.UNALLOCATED_DEVICE_LIST()
        .then(() => {
          let assumeArr = [];
           console.log("The Regions : " + assumeArr);
          assumeArr.push({
            label: 'ALL',
            value: '%'
          });
          console.log("The Regions : " + assumeArr);
          this.getUnAllocatedDevicesRegionMenu.map(function(value, index) {
            assumeArr.push({
              label: value,
              value: value,
            });
          });
          this.getUnAllocatedDevicesMenuOptions = assumeArr;
        })
        .catch(error => {
          this.getUnAllocatedDevicesMenuOptions = [];
        });
    },

    

    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.UNALLOCATED_DEVICE({ pagination, filter })
        .then(res => {
        
          this.paginationControl = pagination;

         
          this.paginationControl.rowsNumber = this.getUnAllocatedDevice.totalElements;
          this.paginationControl.page =
            this.getUnAllocatedDevice.number + 1;
            this.tableData = this.getUnAllocatedDevice.content;
          if (this.getUnAllocatedDevice.sort != null) {
            this.paginationControl.sortBy = this.getUnAllocatedDevice.sort[0].property;
            this.paginationControl.descending = this.getUnAllocatedDevice.sort[0].ascending;
          }

         
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    downloadInventorySummaryInfoMenu(){
      this.$q.loading.show({
        delay: 100 // ms
      });
      this.REPORT_INVENTORY_SUMMARY2()
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
            message: "Please try again",
            icon: "thumb_down"
          });
        });
    }
  }
};
</script>

<style>
</style>

  
         
   
   
 
