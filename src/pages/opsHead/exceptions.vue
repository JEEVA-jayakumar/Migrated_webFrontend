<template>
  <q-page>
    <div>
      <!--START: table title -->
      <div
        class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Exceptions</div>
      <!--END: table title -->
      <q-table
        table-class="customTableClass"
        :data="tableData"
        :columns="columns"
        :filter="filter"
        :pagination.sync="paginationControl"
        :rows-per-page-options="[5,10,15,20]"
        @request="ajaxLoadDataForAllExceptionList"
        row-key="name"
      >
        <q-tr
          slot="body"
          slot-scope="props"
          :props="props"
          @click.native="fnRowClick(props.row)"
          @mouseover.native="fnRowMouseOver(props.row.__index)"
          @mouseleave.native="fnRowMouseLeave(props.row.__index)"
          class="cursor-pointer"
          :class="[props.row.__index === activeId ? 'bg-grey-3' : '']"
        >
          <q-td key="leadInformation.updatedAt" :props="props">
            <span class="label capitalize">{{props.row.updatedAt | moment("MMMM Do YYYY") }}</span>
          </q-td>
          <q-td key="leadInformation.leadNumber" :props="props">
            <span
              class="label capitalize text-primary cursor-pointer"
              @click.stop="toggleLeadInformation(props.row)"
            ># {{props.row.leadId }}</span>
          </q-td>
          <q-td key="leadInformation.leadName" :props="props">
            <span class="label capitalize">{{props.row.leadName}}</span>
          </q-td>
          <q-td key="leadInformation.assignedTo.name" :props="props">
            <span class="label capitalize">{{props.row.soName}}</span>
          </q-td>
          <q-td key="leadInformation.reason" :props="props">
            <span class="label capitalize">{{props.row.soRemarks}}</span>
          </q-td>
          <q-td key="leadInformation.createdBy.name" :props="props">
            <span class="label capitalize">{{props.row.satName}}</span>
          </q-td>
          <q-td key="kycSatRemark" :props="props">
            <span class="label capitalize">{{props.row.kycSatRemark}}</span>
          </q-td>
          <q-td key="expectedSubmitDate" :props="props">
            <span class="label capitalize">{{props.row.expectedSubmitDate | moment("MMMM Do YYYY")}}</span>
          </q-td>
        </q-tr>

        <template slot="top" slot-scope="props">
          <!--START: table search -->
          <div class="col-md-5">
            <q-search
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Search .."
              class="q-mr-lg q-py-sm"
            />
          </div>
          <!--END: table search -->
        </template>
      </q-table>
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
        rowsNumber: 10,
        page: 1,
        sortBy: "leadInformation.leadNumber",
        descending: false,
        rowsPerPage: 10
      },
      filter: "",
      columns: [
        {
          name: "leadInformation.updatedAt",
          required: true,
          label: "Date of updation",
          align: "left",
          field: "leadInformation.updatedAt",
          sortable: true
        },
        {
          name: "leadInformation.leadNumber",
          required: true,
          label: "Lead ID",
          align: "center",
          field: row => {
            return "# " + row.leadNumber;
          },
          sortable: true
        },
        {
          name: "leadInformation.leadName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "leadInformation.leadName",
          sortable: true
        },
        {
          name: "leadInformation.assignedTo.name",
          required: true,
          label: "SO Name",
          align: "left  ",
          field: "soName",
          sortable: true
        },
        {
          name: "leadInformation.reason",
          required: true,
          label: "SO Remarks",
          align: "left  ",
          field: "leadInformation.reason",
          sortable: true
        },
        {
          name: "leadInformation.createdBy.name",
          required: true,
          label: "SAT Name",
          align: "left",
          field: "leadInformation.createdBy.name",
          sortable: true
        },
        {
          name: "kycSatRemark",
          required: true,
          label: "SAT Remarks",
          align: "left",
          field: "kycSatRemark",
          sortable: true
        },
        {
          name: "expectedSubmitDate",
          required: true,
          label: "Expected date of submission",
          align: "left",
          field: "expectedSubmitDate",
          sortable: true
        }
      ],
      loading: true,
      tableData: []
    };
  },

  created() {
    /* START: Load user table data */
    // this.ajaxLoadDataForAllExceptionList();
    /* END: Load user table data */
  },

  computed: {
    ...mapGetters("OPSHead", ["getKycExceptionInfo"]),
    ...mapGetters("commonLoader", ["getToggleCommonLoader"])
  },
  mounted() {
    this.ajaxLoadDataForAllExceptionList({
      pagination: this.paginationControl,
      filter: this.filter
    });
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
    ajaxLoadDataForAllExceptionList({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching list .."
      });
      this.FETCH_ALL_EXCEPTION_KYC_DATA({ pagination, filter })
        .then(response => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getKycExceptionInfo.totalElements;
          this.paginationControl.page = this.getKycExceptionInfo.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getKycExceptionInfo.content;
          if (this.getKycExceptionInfo.sort != null) {
            this.paginationControl.sortBy = this.getKycExceptionInfo.sort[0].property;
            this.paginationControl.descending = this.getKycExceptionInfo.sort[0].ascending;
          }
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    // Function to trigger what should happen after clicking on row
    fnRowClick(itemDetails) {
       console.log("TABLE DATA VALUES---------->",JSON.stringify(this.itemDetails))
      this.$router.push("/ops/head/exceptions/" + itemDetails.leadId);
    },

    // Function to trigger what should happen after hovering on row
    fnRowMouseOver(index) {
      this.activeId = index;
    },

    // Function to trigger what should happen after hovering on row
    fnRowMouseLeave(index) {
      this.activeId = "";
    }
  }
};
</script>

<style>
</style>
