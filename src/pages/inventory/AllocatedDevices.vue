<template>
  <q-page>
    <!-- content -->
    
    <div>
      <!--STARTv-model: table title -->
      <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      ></div>
      <!--END: table title -->
      <!--START: table lead validation -->
      <q-table
        table-class="customTableClass"
        class="q-py-none"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :rows-per-page-options="[50,100,150,200,250]"
        :pagination="paginationControl"
        :loading="toggleAjaxLoadFilter"
        @request="ajaxLoadAllLeadInfo"
      >
       
     
        <template v-slot:top="props" class="bottom-border">
          <!--START: table filter,search -->
           <div class="col">
          <q-select
        
            outline
            no-caps
            v-model="filter"
             float-label="Select a Region"
            radio
            color="grey-9"
            :options="getAllocatedDevicesRegionMenu"
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
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
import moment from "moment";
import downloadExcel from "vue-json-excel";
export default {
  name: "getAllocatedDevice",
  components: {
    downloadExcel
  },
  data() {
    return {
      // regionFilter: "",
      formData: {
       region: "",
        getAllocatedDevicesRegionMenu: [],
      },
        getAllocatedDevicesRegionMenu: [],

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
    ...mapGetters("summary",["getAllocatedDevice"]),
    ...mapGetters("AllocatedDevices",["getAllocatedMenu"]),
    
  },
   
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  created() {
    this.fnAjaxgetAllocatedDevice();
  },

  

  methods: {
    ...mapActions("summary",["ALLOCATED_DEVICE"]),
    ...mapActions("AllocatedDevices",["ALLOCATED_MENU"]),
    ...mapActions("InventoryCentral",["REPORT_INVENTORY_SUMMARY1"]),

     fnAjaxgetAllocatedDevice() {
      this.ALLOCATED_MENU()
        .then(() => {
          let assumeArr = [];
          console.log("The Regions : " + assumeArr);
          assumeArr.push({
            label: 'ALL',
            value: '%'
          });
          console.log("The Regions : " + assumeArr);
          
          this.getAllocatedMenu.map(function(value, index) {
            assumeArr.push({
              label: value,
              value: value,
            });
          });
          this.getAllocatedDevicesRegionMenu = assumeArr;
        })
        .catch(error => {
          this.getAllocatedDevicesRegionMenu = [];
        });
    },

    

    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.ALLOCATED_DEVICE({ pagination, filter })
        .then(res => {
        
          this.paginationControl = pagination;

         
          this.paginationControl.rowsNumber = this.getAllocatedDevice.totalElements;
          this.paginationControl.page =
            this.getAllocatedDevice.number + 1;
            this.tableData = this.getAllocatedDevice.content;
          if (this.getAllocatedDevice.sort != null) {
            this.paginationControl.sortBy = this.getAllocatedDevice.sort[0].property;
            this.paginationControl.descending = this.getAllocatedDevice.sort[0].ascending;
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
      this.REPORT_INVENTORY_SUMMARY1()
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

  
         
   
   
 
