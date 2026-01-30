<template>
  <q-page>
    <div class="capitalize">
      <q-pull-to-refresh :distance="30" :handler="PullToRefresh" inline>
        <!-- //Common lead information in popup -->
        <generalLeadInformation
          v-if="propToggleLeadInformation"
          :leadInformation="addtnLeadInformation"
          :propToggleLeadInformationPop="propToggleLeadInformation"
          @closeLeadInformation="toggleLeadInformation"
        />
        <!--START: table title -->
        <div
          class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
        >Aggregator Open Merchant Tracker/Lead Tracker</div>
        <!--END: table title -->
        <!--START: table open merchant tracker -->
        <q-table
          table-class="customTableClass"
          :data="tableData"
          :columns="columns"
          :filter="filter"
          :pagination.sync="paginationControl"
          row-key="name"
        >
          <!--START: table body modification -->
          <q-td slot="body-cell-createdAt" slot-scope="props" :props="props">
            <span class="label">{{props.row.createdAt | moment("Do MMM Y")}}</span>
          </q-td>
          <q-td slot="body-cell-submitteSATDate" slot-scope="props" :props="props">
            <span class="label">{{props.row.updatedAt | moment("Do MMM Y")}}</span>
          </q-td>
          <q-td slot="body-cell-applicationNumber" slot-scope="props" :props="props">
            <span class="label capitalize">{{props.row.applicationNumber}}</span>
          </q-td>
          <q-td slot="body-cell-leadName" slot-scope="props" :props="props">
            <span class="label capitalize">{{props.row.leadName}}</span>
          </q-td>
          <q-td
            slot="body-cell-leadNumber"
            class="cursor-pointer"
            @click.native="toggleLeadInformation(props.row)"
            slot-scope="props"
            :props="props"
          >
            <span class="label text-primary"># {{props.row.leadNumber}}</span>
          </q-td>
          <q-td slot="body-cell-createdBy" slot-scope="props" :props="props">
            <span class="label">{{props.row.assignedTo.name == null? "NA":props.row.assignedTo.name}}</span>
          </q-td>
          <q-td slot="body-cell-leadAddress" slot-scope="props" :props="props">
            <span class="label">{{props.row.leadAddress}}</span>
          </q-td>
          <q-td
            slot="body-cell-verifiedStatus"
            slot-scope="props"
            :props="props"
          >{{props.row.verifiedStatus}}</q-td>

          <!-- <q-td slot="body-cell-status" slot-scope="props" :props="props">
            <span class="label " :class="{'text-green': props.row.status=='Approved', 'text-red': props.row.status=='Rejected', 'text-orange': props.row.status=='Pending with OPS' }">{{props.row.status}}</span>
          </q-td>-->
          <!--END: table body modification -->
          <template slot="top" slot-scope="props">
            <!--START: table fullscreen mode -->
            <!-- <div class="col-md-4" align="right">
            <q-btn
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-mt-lg"
            color="grey-9"
            size="sm"
            />
            </div>-->
            <!--END: table fullscreen mode -->
            <!--START: table filter,search,excel download -->
            <div class="col-5">
              <q-search
                clearable
                v-model="filter"
                separator
                color="grey-9"
                placeholder="Type.."
                float-label="Search by Merchant Name, Lead ID"
                class="q-mr-lg q-py-sm"
              />
            </div>
            <!-- <div class="col-3">
              <q-datetime modal outline type="date" v-model="model" placeholder="Select Date" class="q-mr-lg q-py-sm " float-label="Filter By"
                color="grey-9" />
            </div>-->
            <!-- <div class="col-md-4">
              <downloadExcel :data="excelTableData" :fields="excelColumnData.field" name="Merchant Transaction Level.xls">
                <q-btn outline color="grey-9" label="Download as Excel" class="q-mr-lg q-py-sm float-right" size="md" />
              </downloadExcel>
            </div>-->
            <!--END: table filter,search -->
          </template>
        </q-table>
        <!--END: table open merchant tracker -->
      </q-pull-to-refresh>
      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35"/>
      </div>
      <!--END >>  Show Ajax Spinner -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import downloadExcel from "vue-json-excel";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "aggopenMerchantTracker",
  components: {
    downloadExcel,
    generalLeadInformation
  },
  data: () => ({
    propToggleLeadInformation: false,
    addtnLeadInformation: null,

    toggleAjaxLoadFilter: false,
    paginationControl: {
      rowsPerPage: 10
    },
    model: "",
    filter: "",
    columns: [
      {
        name: "createdAt",
        required: true,
        label: "Created Date",
        align: "left",
        field: (row) => {
                        return row.createdAt == null
                            ? "NA"
                            : row.createdAt;
                    },
        sortable: true
      },
      {
        name: "updatedAt",
        required: true,
        label: "Submitted Date",
        align: "center",
        field: (row) => {
                        return row.updatedAt == null
                            ? "NA"
                            : row.updatedAt;
                    },
        sortable: true
      },
      {
        name: "applicationNumber",
        required: true,
        label: "MRL app no",
        align: "left",
        field: row => {
          return "# " + row.applicationNumber;
        },
        sortable: true
      },
      {
        name: "leadNumber",
        required: true,
        label: "Lead ID",
        align: "left",
        field: (row) => {
                        return "# " + row.leadNumber == null
                            ? "NA"
                            : row.leadNumber;
                    },
        sortable: true
      },
      {
        name: "leadName",
        required: true,
        label: "Merchant Name",
        align: "left",
        field: (row) => {
                        return row.leadName == null
                            ? "NA"
                            :row.leadName;
                    },
        sortable: false
      },
      {
        name: "leadAddress",
        required: true,
        label: "Location",
        align: "left",
        field: row => {
          return  row.leadAddress == null ? "NA": row.leadAddress;
        },
        sortable: false
      },
      {
        name: "name",
        required: true,
        label: "SO Name",
        align: "left",
        field: row => {
          return  row.assignedTo.name == null ? "NA": row.assignedTo.name+" | "+row.assignedTo.employeeID;
        },
        sortable: false
      },
      {
        name: "verifiedStatus",
        required: true,
        label: "Status",
        align: "left",
        field: "verifiedStatus",
        sortable: false
      }
    ],
    excelColumnData: [
      {
        name: "createdAt",
        required: true,
        label: "Created Date",
        align: "left",
        field: "createdAt",
        sortable: true
      },
      {
        name: "submitteSATDate",
        required: true,
        label: "Submitted Date",
        align: "center",
        field: "submitteSATDate",
        sortable: true
      },
      {
        name: "leadNumber",
        required: true,
        label: "Lead ID",
        align: "left",
        field: "leadNumber",
        sortable: true
      },
      {
        name: "leadName",
        required: true,
        label: "Merchant Name",
        align: "left",
        field: "leadName",
        sortable: true
      },
      {
        name: "state",
        required: true,
        label: "Location",
        align: "left",
        field: "state",
        sortable: true
      },
      {
        name: "createdBy",
        required: true,
        label: "SO Name",
        align: "left",
        field: "createdBy",
        sortable: true
      },
      {
        name: "verifiedStatus",
        required: true,
        label: "Status",
        align: "left",
        field: "verifiedStatus",
        sortable: true
      }
    ],
    excelTableData: [],
    loading: true,
    tableData: [],
    lazy: [],
    select: "fb",
    multipleSelect: ["goog", "twtr"],
    error: true,
    warning: false,
    options: [
      {
        label: "Google",
        value: "goog"
      },
      {
        label: "Facebook",
        value: "fb"
      },
      {
        label: "Twitter",
        value: "twtr"
      },
      {
        label: "Apple Inc.",
        value: "appl"
      },
      {
        label: "Oracle",
        value: "ora"
      }
    ]
  }),

  created() {
    /* START: Load open merchant tracker data */
    this.ajaLoadDataAllopenAggMerchantTrackerData();
    /* END: Load open merchant tracker data */
  },

  computed: {
    ...mapGetters("OpenMerchantTracker", ["getOpenMerchantTracker"]),
    ...mapGetters("commonLoader", ["getToggleCommonLoader"])
  },
  methods: {
    ...mapActions("OpenMerchantTracker", [
      "FETCH_ALL_OPEN_MERCHANT_TRACKER_DATA"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    // Function to list all open merchant tracker data
    ajaLoadDataAllopenAggMerchantTrackerData() {
      this.TOGGLE_COMMON_LOADER(true);
      this.FETCH_ALL_OPEN_MERCHANT_TRACKER_DATA()
        .then(response => {
          this.tableData = this.getOpenMerchantTracker;
          console.log("TABLE",JSON.stringify(this.tableData));
          let arr = [];
          this.getOpenMerchantTracker.map(function(value, index) {
            arr.push({
              "Created Date": value.createdAt,
              "Submitted Date": value.submitteSATDate,
              "Lead ID": value.id,
              State: value.state,
              "SO Name": value.createdBy.name,
              Status: value.verifiedStatus
            });
          });
          this.excelTableData = arr;
          this.TOGGLE_COMMON_LOADER(false);
        })
        .catch(() => {
          this.TOGGLE_COMMON_LOADER(false);
        });
    },

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    //Function pull to refresh
    PullToRefresh(done) {
      this.FETCH_ALL_OPEN_MERCHANT_TRACKER_DATA()
        .then(response => {
          this.tableData = this.getOpenMerchantTracker;
          let arr = [];
          this.getOpenMerchantTracker.map(function(value, index) {
            arr.push({
              "Created Date": value.createdAt,
              "Submitted Date": value.submitteSATDate,
              "Lead ID": value.id,
              State: value.state,
              "SO Name": value.createdBy.name,
              Status: value.verifiedStatus
            });
          });
          this.excelTableData = arr;
          done();
        })
        .catch(() => {
          done();
        });
    }
  }
};
</script>

<style>
</style>
