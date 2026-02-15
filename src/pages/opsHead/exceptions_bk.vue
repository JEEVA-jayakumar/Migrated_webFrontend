<template>
  <q-page>
    <div>
      <!--STARTv-model: table title -->
      <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Exceptions</div>
      <!--END: table title -->
      <!-- <pre>{{tableData}}</pre> -->
      <q-table
        table-class="customTableClass"
        :rows="getKycExceptionInfo"
        :columns="columns"
        :filter="filterSearch"
        :filter-method="myCustomSearchFilter"
        :pagination="paginationControl"
        row-key="name"
      >
        <q-tr
          v-slot:body="props"
          :props="props"
          @click.native="fnRowClick(props.row)"
          @mouseover.native="fnRowMouseOver(props.row.__index)"
          @mouseleave.native="fnRowMouseLeave(props.row.__index)"
          class="cursor-pointer"
          :class="[props.row.__index === activeId ? 'bg-grey-3' : '']"
        >
          <q-td :props="props"></q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <span
              v-if="col.name == 'dateOfUpdation'"
              class="label capitalize"
            >{{props.row.submitteSATDate | moment("MMMM Do YYYY") }}</span>
            <span
              v-if="col.name == 'leadId'"
              class="label capitalize text-primary cursor-pointer"
              @click.stop="toggleLeadInformation(props.row)"
            ># {{props.row.id}}</span>
            <span v-if="col.name == 'leadName'" class="label capitalize">{{props.row.leadName}}</span>
            <span v-if="col.name == 'SOName'" class="label capitalize">{{props.row.createdBy.name}}</span>
            <span v-if="col.name == 'reason'" class="label capitalize">{{props.row.reason}}</span>
            <div v-if="col.name == 'SATName'" class="label capitalize">
              <span
                class="label capitalize"
                v-if="props.row.leadVerificationStatus.length > 0"
              >{{sortArraysForCreatedBy(props.row.leadVerificationStatus)}}</span>
              <span class="label capitalize" v-else>NA</span>
            </div>
            <div v-if="col.name == 'SATRemarks'" class="label capitalize">
              <span
                class="label capitalize"
                v-if="props.row.leadVerificationStatus.length > 0"
              >{{sortArraysForReason(props.row.leadVerificationStatus)}}</span>
              <span class="label capitalize" v-else>NA</span>
            </div>
            <div v-if="col.name == 'expectedDateSubmission'" class="label capitalize">
              <span
                class="label capitalize"
                v-if="props.row.leadVerificationStatus.length > 0"
              >{{sortArraysForExpectedSubmitDate(props.row.leadVerificationStatus) | moment("MMMM Do YYYY")}}</span>
              <span class="label capitalize" v-else>NA</span>
            </div>
          </q-td>
        </q-tr>

        <template v-slot:top="props">
          <!--START: table fullscreen mode -->
          <!-- <div class="col-md-4" align="right">
                  <q-btn
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="props.toggleFullscreen"
                    class="q-mt-lg"
                    color="grey-9"
                    size="sm"
          />-->
          <!-- </div> -->
          <!--END: table fullscreen mode -->
          <!--START: table search -->
          <div class="col-md-5">
            <q-input
              clearable
              v-model="filterSearch"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Search by MID, TID, Merchant Name, MCC,UTR Number, Device Type"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <!--END: table search -->
          <!--START: table filter dropdown -->
          <!-- <div class="col-md-3">
                  <q-input
                    v-model="filters.filter_date" 
                    float-label="Date Filter"
                    type="date"
                    class="q-mr-lg q-py-sm"
                    color="grey-9" 
                    minimal
                  />
          </div>-->
          <!--END: table filter dropdown -->
          <!--START: table excel download -->
          <!-- <div class="col-md-4">
                  <downloadExcel
                  :rows="tableData"
                  :fields="columns.label"
                  name="KYC Exceptions List.xls">
                    <q-btn 
                      outline  
                      color="grey-9" 
                      label="Download as Excel"
                      class="q-mr-lg q-py-sm float-right"
                      size="md"
                    />
                  </downloadExcel>
          </div>-->
          <!--END: table excel download -->
        </template>
      </q-table>
      <!-- <download-excel
          class   = "btn btn-default"
          :data   = "json_data"
          :fields = "json_fields"
          name    = "filename.xls">
          Download Excel (you can customize this with html code!)
      </download-excel>-->
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
    </div>
  </q-page>
</template>

<script>
import { required, and } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import downloadExcel from "vue-json-excel";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "exceptions",
  components: {
    downloadExcel,
    generalLeadInformation
  },

  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      activeId: "",
      toggleRejectModal: false,
      propRejectModal: [],

      paginationControl: {
        rowsPerPage: 10
      },
      filterSearch: "",
      columns: [
        {
          name: "dateOfUpdation",
          required: true,
          label: "Date of updation",
          align: "left",
          field: "dateOfUpdation",
          sortable: true
        },
        {
          name: "leadId",
          required: true,
          label: "Lead ID",
          align: "center",
          field: row => {
            return "# " + row.id;
          },
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
          name: "SOName",
          required: true,
          label: "SO Name",
          align: "left  ",
          field: row => row.createdBy.name,
          sortable: true
        },
        {
          name: "reason",
          required: true,
          label: "SO Remarks",
          align: "left  ",
          field: "reason",
          sortable: true
        },
        {
          name: "SATName",
          required: true,
          label: "SAT Name",
          align: "left",
          field: "SATName",
          sortable: true
        },
        {
          name: "SATRemarks",
          required: true,
          label: "SAT Remarks",
          align: "left",
          field: "SATRemarks",
          sortable: true
        },
        {
          name: "expectedDateSubmission",
          required: true,
          label: "Expected date of submission",
          align: "left",
          field: "expectedDateSubmission",
          sortable: true
        }
      ],
      loading: true,
      tableData: [],
      filters: {
        filter_date: ""
      }
    };
  },

  created() {
    /* START: Load user table data */
    this.ajaxLoadDataForAllExceptionList();
    /* END: Load user table data */
  },

  computed: {
    ...mapGetters("OPSHead", ["getKycExceptionInfo"]),
    ...mapGetters("commonLoader", ["getToggleCommonLoader"])
  },

  methods: {
    ...mapActions("OPSHead", [
      "FETCH_ALL_EXCEPTION_KYC_DATA",
      "FEED_EQ_KYC_FEEDBACK"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    //API to fetch ALL EXCEPTIONS data
    ajaxLoadDataForAllExceptionList() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching list .."
      });
      this.FETCH_ALL_EXCEPTION_KYC_DATA()
        .then(response => {
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    // Function to fetch latest createdBy because of reject and reprocess
    sortArraysForCreatedBy(item) {
      let arrCooked = _.orderBy(item, "id", "desc");
      var arrFinal = arrCooked.reduce(function(value, index) {
        if (
          _.has(value, "verificationType") &&
          value.verificationType == 3 &&
          value.status
        ) {
          return value;
        }
      });
      if (_.isEmpty(arrFinal)) {
        return "NA";
      } else {
        return arrFinal.createdBy.name;
        // return "Abinandhan";
      }
    },

    // Function to fetch latest reason because of reject and reprocess
    sortArraysForReason(item) {
      let arrCooked = _.orderBy(item, "id", "desc");
      var arrFinal = arrCooked.reduce(function(value, index) {
        if (
          _.has(value, "verificationType") &&
          value.verificationType == 3 &&
          value.status
        ) {
          return value;
        }
      });
      if (_.isEmpty(arrFinal)) {
        return "NA";
      } else {
        return arrFinal.kycSatRemark;
      }
    },

    // Function to fetch latest expected submit date because of reject and reprocess
    sortArraysForExpectedSubmitDate(item) {
      let arrCooked = _.orderBy(item, "id", "desc");
      var arrFinal = arrCooked.reduce(function(value, index) {
        if (
          _.has(value, "verificationType") &&
          value.verificationType == 3 &&
          value.status
        ) {
          return value;
        }
      });
      if (_.isEmpty(arrFinal)) {
        return "NA";
      } else {
        return arrFinal.expectedSubmitDate;
      }
    },

    // Function to trigger what should happen after clicking on row
    fnRowClick(itemDetails) {
      this.$router.push("/ops/head/exceptions/" + itemDetails.id);
    },

    // Function to trigger what should happen after hovering on row
    fnRowMouseOver(index) {
      this.activeId = index;
    },

    // Function to trigger what should happen after hovering on row
    fnRowMouseLeave(index) {
      this.activeId = "";
    },

    myCustomSearchFilter(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      return rows.filter(row =>
        cols.some(
          col =>
            (cellValue(col, row) + "").toLowerCase().indexOf(lowerTerms) !== -1
        )
      );
    }
  }
};
</script>

<style>
</style>
