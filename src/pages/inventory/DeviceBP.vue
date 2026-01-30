
<template>
  <q-page>
    <!-- content -->

    <div>
      <!--START: table title -->
      <div
        class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >
        Devices with BPRegions
      </div>

      <!--START: table lead validation -->
      <q-table
        table-class="customTableClass"
        :data="tableData"
        :columns="columns"
        :filter="filter"
        :pagination.sync="paginationControl"
        row-key="name"
        :loading="toggleAjaxLoadFilter"
        :rows-per-page-options="[5,10,15,20,25]"
        @request="ajaxLoadAllLeadInfo"
      >
        <q-td
          slot="body-cell-TidCreationDate"
          slot-scope="props"
          :props="props"
        >
          <span class="label">{{
            props.row.TidCreationDate | moment("Do MMM Y")
          }}</span>
        </q-td>

        <template slot="top"  class="bottom-border">
          <!--START: table filter,search -->
          <div class="col-md-4">
            <q-select
              v-model="filter"
              float-label="Select a Region"
              radio
              color="grey-9"
              :options="getBpRegionsMenuOptions"
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
              @click="downloadBpMenu()"
            />
          </div>
          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->
      <DownloadBpRegionReport
        v-if="propBpRegionReport"
        :propBpRegionReport="propBpRegionReport"
        @emitfnshowBpRegionReport="downloadBpMenu"
      ></DownloadBpRegionReport>
      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars
          class="absolute-center"
          style="color:#61116a"
          :size="35"
        />
      </div>
      <!--END >>  Show Ajax Spinner -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DownloadBpRegionReport from "../../components/inventory/DownloadBpRegionReport.vue";
import Vuelidate from "vuelidate";
import Vue from "vue";
Vue.use(Vuelidate);
import { date } from "quasar";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
import moment from "moment";
export default {
  name: "getDeviceWithBpRegion",
  components: {
    DownloadBpRegionReport
  },
  data() {
    return {
      // propToggleLeadInformation: false,
      propBpRegionReport: false,
      tomorrow: addToDate(today, { days: -1 }),
      yesterday: subtractFromDate(today, { days: 90 }),
      state: new Date(),
      defaultValue: startOfDate(today, "year"),
      separator: "horizontal",
      message: "",
      icon: "",
      formData: {
        from: "",
        to: ""
      },
      getBpRegionsMenuOptions: [],

      model: "",
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
        }
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
          // sortable: true
        },
        {
          name: "TID",
          required: true,
          label: "TID",
          align: "left",
          field: "tid",
          // sortable: true
        },
        {
          name: "TidCreationDate",
          required: true,
          label: "TID Creation Date",
          align: "left",
          field: "TidCreationDate",
          sortable: true
        },
        {
          name: "Merchant Name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "MerchantName",
          // sortable: true
        },
        {
          name: "Bp Region",
          required: true,
          label: "Bp Region",
          align: "left",
          field: "BpRegion",
          // sortable: true
        },
        {
          name: "SO Id",
          required: true,
          label: "SO",
          align: "left",
          field: row => {
            return row.soId+" | "+row.soEmpId;
          },
          // sortable: true
        },
        {
          name: "Aging",
          required: true,
          label: "Aging",
          align: "left",
          field: "Aging",
          // sortable: true
        },

        {
          name: "Device Type",
          required: true,
          label: "Device Type",
          align: "left",
          field: "deviceType",
          // sortable: true
        },
        {
          name: "POD Details",
          required: true,
          label: "POD Details",
          align: "left",
          field: "PODdetails",
          // sortable: true
        }
      ],
      loading: true,
      tableData: []
    };
  },
  computed: {
    ...mapGetters("region", ["getDeviceWithBpRegion"]),
    ...mapGetters("reg", ["getBpRegionMenu"])
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  created() {
    this.fnAjaxgetDeviceWithBpRegion();
  },

  methods: {
    ...mapActions("region", ["DEVICE_WITH_BPREGION"]),
    ...mapActions("reg", ["BPREGION_MENU"]),

    ...mapActions("InventoryCentral", ["REPORT_BPREGION_MENU"]),

    fnAjaxgetDeviceWithBpRegion() {
      this.BPREGION_MENU()
        .then(() => {
          let assumeArr = [];
          this.getBpRegionMenu.map(function(value, index) {
            assumeArr.push({
              label: value,
              value: value
            });
          });
          this.getBpRegionsMenuOptions = assumeArr;
        })
        .catch(error => {
          this.getBpRegionsMenuOptions = [];
        });
    },

    // toTimestamp(strDate) {
    //   console.log("The date string : --- : ", strDate)
    //   var date = strDate.split("T")[0]
    //   var curDate = new Date();      
    //   var mnth = curDate.getMonth()+1;
    //   var chDate = curDate.getFullYear()+"-"+(mnth < 10 ? "0"+mnth : mnth)+"-"+curDate.getDate();
    //   var datum = null
    //   if (chDate == date) 
    //     datum = Date.now();
    //   else
    //     datum = Date.parse(strDate);
    //   console.log("The Datum: --- : ", datum)
    //   return datum;
    // },

    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.DEVICE_WITH_BPREGION({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getDeviceWithBpRegion.totalElements;
          this.paginationControl.page = this.getDeviceWithBpRegion.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getDeviceWithBpRegion.content;
          if (this.getDeviceWithBpRegion.sort != null) {
            this.paginationControl.sortBy = this.getDeviceWithBpRegion.sort[0].property;
            this.paginationControl.descending = this.getDeviceWithBpRegion.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    // downloadBpMenu(request) {
    //   let params = {
    //     from: this.toTimestamp(request.from.toString()),
    //     to: this.toTimestamp(request.to.toString())
    //   };
    //   this.$q.loading.show({
    //     delay: 100, // ms
    //     spinnerColor: "purple-9",
    //     message: "Please wait.."
    //   });
    //   this.REPORT_BPREGION_MENU(params)
    //     .then(response => {
    //       this.$q.loading.hide();
    //       console.log("data information------------------>", response);
    //       this.$q.notify({
    //         color: "positive",
    //         position: "bottom",
    //         message: "Successfully Downloaded",
    //         icon: "thumb_up"
    //       });
    //       (this.formData.from = ""), (this.formData.to = "");
    //     })
    //     .catch(error => {
    //       // console.log("data information-------->",error)
    //       console.log("hello", error);
    //       this.$q.loading.hide();
    //       if (error.status == 400) {
    //         this.$q.notify({
    //           color: "amber",
    //           position: "bottom",
    //           message: error,
    //           icon: "thumb_down"
    //         });
    //       } else if (error.status == 500) {
    //         this.$q.notify({
    //           color: "amber",
    //           position: "bottom",
    //           message: error,
    //           icon: "thumb_down"
    //         });
    //       }

    //       (this.formData.from = ""), (this.formData.to = "");
    //     });
    // },
    downloadBpMenu() {
      this.propBpRegionReport = !this.propBpRegionReport;
    }
  }
};
</script>

<style></style>

