<template>
  <q-page>
    <div>
      <div
        class="col-md-6 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Bijlipay POD List</div>
      <q-table
        table-class="customTableClass"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        :rows-per-page-options="[5,10,15,20,25]"
        row-key="name"
        :loading="toggleAjaxLoadFilter"
        @request="ajaxLoadAllLeadInfo"
        
      >
        <q-td v-slot:body-cell-action="props" :props="props">
          <div class="row no-wrap no-padding">
            <q-btn
              dense
              no-caps
              no-wrap
              label="Modify"
              icon="far fa-edit"
              size="md"
              @click="fnShowEditRegion(props.row)"
              flat
              class="text-light-blue"
            ></q-btn>
          </div>
        </q-td>
        <q-td
          v-slot:body-cell-createdAt="props"
          :props="props"
        >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td>
        <q-td
          v-slot:body-cell-receivedAt="props"
          :props="props"
        >{{ props.row.receivedAt | moment("Do MMM Y") }}</q-td>

        <q-td
          v-slot:body-cell-receivedAt="props"
          :props="props"
        >{{ props.row.receivedAt ==null? "NA" : props.row.receivedAt | moment("Do MMM Y") }}</q-td>
        <q-td
          v-slot:body-cell-DeviceList="props"
          :props="props"
        >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td>
        <q-td
          v-slot:body-cell-ModifyDate="props"
          :props="props"
        >{{ props.row.device.modifyDate | moment("Do MMM Y") }}</q-td>
        <template v-slot:top="props">
          <div class="col-md-5">
            <q-input
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Search By Pod Number, BP Region"
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
            @click="downloadPodList()" />
           
          </div>
          <!-- <div class="col-md-5">
            <downloadExcel :rows="getAllPodList" :fields="json_fields" name="PodList.xls">
              <q-btn outline color="grey-9" label="Download as excel" />
            </downloadExcel>
          </div> -->
          <div class="col-md-4"></div>
          <!--END: table excel download -->
        </template>
      </q-table>
      <!--START >>  Download Reports -->
      <DownloadPod
         v-if="propPodListDatas" 
        :propPodListDatas="propPodListDatas" 
        @emitfnshowPodList="downloadPodList"
     ></DownloadPod>
      <!--END:  Download Reports-->
      <editRegion
        v-if="propShowEditRegion"
        :propShowEditRegion="propShowEditRegion"
        :propRowDetails="propRowDetails"
        @emitfnshowEditRegion="fnShowEditRegion"
      ></editRegion>
      <!--END: table data -->
       <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
      <!--END >>  Show Ajax Spinner --> 
    </div>
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
import moment from "moment";
import editRegion from "../../components/inventory/editRegion.vue";
import DownloadPod from "../../components/inventory/DownloadPod.vue";

export default {
  name: "merchantTracker",
  components: {
    editRegion,
    DownloadPod
  },

  data() {
    return {
      propShowEditRegion: false,
      propPodListDatas: false,
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "createdAt",
        descending: false,
        rowsPerPage: 10
      },
        tableData: [],
      filter: "",
      filter_values: "",
      json_fields: {
        PodNumber: "podNumber",
        DeviceType: "device.deviceName",
        // ReceiveAt: " receivedAt",
        ReceivedDate: {
          field: "receivedAt",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        createdAt: {
          field: "createdAt",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        // CreateDate: "createdAt",
        BPRegion: "region.regionAreaName"
      },
      columns: [
        {
          name: "podNumber",
          label: "podNumber",
          field: "podNumber",
          align: "center",
          sortable: true
        },
        {
          name: "device",
          required: true,
          label: "Device Type",
          align: "center",
          field: row => {
            return row.device.deviceName;
          },
          sortable: true
        },
        {
          name: "receivedAt",
          required: true,
          label: "Received Date",
          align: "center",
          field: row => {
            return moment(row.receivedAt).format("DD/MM/YYYY");
          }
        },

        // {
        //   name: "ModifyDate",
        //   required: true,
        //   label: "Modify Date",
        //   align: "center",
        //   field: row => {
        //     return row.device.modifyDate;
        //   }
        // },
        {
          name: "DeviceList",
          required: true,
          label: "Create Date",
          align: "center",
          field: "createdAt"
        },

        {
          name: "region",
          required: true,
          label: "BPRegion",
          align: "center",
          field: row => {
            return row.region.regionAreaName;
          }
        },
        {
          name: "action",
          required: true,
          label: "Modify POD",
          align: "left",
          field: "action",
          sortable: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters("PodList", ["getAllPodList"])
  },
  created() {
    this.FETCH_POD_LIST();
  },
   mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  methods: {
    ...mapActions("PodList", ["FETCH_POD_LIST"]),
    ...mapActions("reports", ["POD_LIST_DOWNLOAD"]),

    //  ajaxLoadAllLeadInfo() {
    //   this.toggleAjaxLoadFilter = true;
    //   this.FETCH_POD_LIST()
    //     .then(response => {
    //       this.toggleAjaxLoadFilter = false;
    //     })
    //     .catch(error => {
    //       this.toggleAjaxLoadFilter = false;
    //     });
    // },
     ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_POD_LIST({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getAllPodList.totalElements;
          this.paginationControl.page = this.getAllPodList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getAllPodList.content;
          if (this.getAllPodList.sort != null) {
            this.paginationControl.sortBy = this.getAllPodList.sort[0].property;
            this.paginationControl.descending = this.getAllPodList.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    downloadPodList(){
      this.propPodListDatas =! this.propPodListDatas;
    },
    fnShowEditRegion(rowDetails) {
      this.propShowEditRegion = !this.propShowEditRegion;
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    // downloadReport() {
    //   this.$q.loading.show({
    //     delay: 100 // ms
    //   });
    //   this.POD_LIST_DOWNLOAD(this.formData)
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
