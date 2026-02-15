<template>
  <q-page>
    <!-- content -->
    <div>
      <!--STARTv-model: table title -->
     
      <!--START: table lead validation -->
      <q-table
        table-class="customTableClass"
        class="q-py-none"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :rows-per-page-options="[5,10,15,20,25]"
        :pagination="paginationControl"
        :loading="toggleAjaxLoadFilter"
        @request="ajaxLoadAllLeadInfo"
      >
       <q-td v-slot:body-cell-TidCreationDate="props" :props="props">
          <span class="label">{{props.row.TidCreationDate | moment("Do MMM Y")}}</span>
        </q-td>
        <q-td v-slot:body-cell-ReceivedDate="props" :props="props">
          <span class="label">{{props.row.ReceivedDate | moment("Do MMM Y")}}</span>
        </q-td>
        
       <template v-slot:top="props" class="bottom-border">
          <!--START: table filter,search -->
        <div class="col">
          <q-select
            outline
            no-caps
            v-model="filter"
            filter 
            clearable
            float-label="Select SO"
            radio
            color="grey-9"
            :options="soMenulistOptions"
           
          />
        </div>
      <!-- <div class="col">
            <q-btn
              @click="downloadSoMenu()"
              outline
              color="grey-9"
              label="Download as Excel"
              class="q-mr-lg q-py-sm float-right"
              size="md"
            />
          </div> -->
            <div class="col-md-6">
           
            <q-btn square outline color="purple-9" label="Download as Excel" class="q-mr-lg q-py-sm float-right" size="md" @click="downloadSoMenu()" />
           
          </div>
          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->
 <!--START >>  Download Reports -->
      <DownloadFSEReport
         v-if="propFSEReport" 
        :propFSEReport="propFSEReport" 
        @emitfnshowFSEReport="downloadSoMenu"
     ></DownloadFSEReport>
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
import { required, email, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";



import { date } from "quasar";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
import moment from "moment";
import DownloadFSEReport from "../../components/inventory/DownloadFSEReport.vue";
export default {
  name: "getDeviceWithFse",
  components: {
    DownloadFSEReport
  },
  data() {
    return {
     propFSEReport:false,
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
      soMenulistOptions: [],
    
      model:"",
     json_fields: {
          TidCreationDate: {
          field: "TidCreationDate",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
          },
          ReceivedDate: {
          field: "ReceivedDate",
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
        sortBy: "TidCreationDate",
        descending: false,
        rowsPerPage: 5
      },
      columns: [
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
          name: "TidCreationDate",
          required: true,
          label: "TID creation Date",
          align: "left",
          field: "TidCreationDate",
          sortable: true
        },
        {
          name: "Ageing",
          required: true,
          label: "Ageing",
          align: "left",
          field: "Aging",
          sortable: true
        },
        {
          name: "BPRegion",
          required: true,
          label: "BPRegion",
          align: "left",
          field: "BpRegion",
          sortable: true
        },
         {
          name: "SO Id",
          required: true,
          label: "SO Id",
          align: "left",
          field: row => {
            return row.soId+" | "+row.soEmpId;
          },
          sortable: true
        },
        {
          name: "ReceivedDate",
          required: true,
          label: "ReceivedDate",
          align: "left",
          field: "ReceivedDate",
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
      regionOptions: []
    };
  },
   computed: {
    
    ...mapGetters("FSE",["getDeviceWithFse"]),
    ...mapGetters("FSEDevice",["getFseMenu"]),
  
    
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
      
    });
  },
  created() {
    
    this.fnAjaxgetDeviceWithFse();
  },

  
  methods: {
    ...mapActions("FSE",["DEVICE_WITH_FSE"]),
    ...mapActions("FSEDevice",["FSE_MENU"]),
    
    ...mapActions("InventoryCentral",["REPORT_FSE_MENU"]),


    fnAjaxgetDeviceWithFse() {
      this.FSE_MENU()
        .then(() => {
          let assumeArr = [];
          this.getFseMenu.map(function(value, index) {
            assumeArr.push({
              label: value.name + " | " + value.employeeID+ " | " + value.email,
              value: value.name,
            });
          });
          this.soMenulistOptions = assumeArr;
        })
        .catch(error => {
          this.soMenulistOptions = [];
        });
    },

       toTimestamp(strDate) {
       var datum = Date.parse(strDate);
       return datum / 1000;
      },
  
   
    
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.DEVICE_WITH_FSE({ pagination, filter })
        .then(res => {
           // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getDeviceWithFse.totalElements;
          this.paginationControl.page =
            this.getDeviceWithFse.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getDeviceWithFse.content;
          if (this.getDeviceWithFse.sort != null) {
            this.paginationControl.sortBy = this.getDeviceWithFse.sort[0].property;
            this.paginationControl.descending = this.getDeviceWithFse.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
            downloadSoMenu(request){
   
      let params = {
        from: this.toTimestamp(request.from.toString()),
        to: this.toTimestamp(request.to.toString())
      };
      this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
      });
      this.REPORT_FSE_MENU(params)
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
    downloadSoMenu(){

    this.propFSEReport=!this.propFSEReport;
},
    // downloadSoMenu(){
    //   this.$q.loading.show({
    //     delay: 100 // ms
    //   });
    //   this.REPORT_FSE_MENU()
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

<style>
</style>
