<template>
  <q-page>
    <!-- //Common lead information in popup -->
    <generalLeadInformation
      v-if="propToggleLeadInformation"
      v-model:leadInformation="addtnLeadInformation"
      :propToggleLeadInformationPop="propToggleLeadInformation"
      @closeLeadInformation="toggleLeadInformation"
    />
    <!--START: table title -->
    <div
      class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
    >Merchant Tracker</div>
    <!--END: table title -->
    <!--START: table lead validation -->
    <q-table
      table-class="customTableClass"
      :rows="getAllMerchantTrackerInfo"
      :columns="columns"
      :filter="filter"
      :pagination="paginationControl"
      row-key="name"
    >
      <!--START: table body modification -->
      <q-td
        v-slot:body-cell-createdAt="props"
        :props="props"
      >{{props.row.createdAt | moment("Do MMM Y")}}</q-td>
      <q-td
        v-slot:body-cell-shortleadDate="props"
        :props="props"
      >{{props.row.shortleadDate | moment("Do MMM Y")}}</q-td>
      <q-td
        v-slot:body-cell-leadSource="props"
        :props="props"
      >{{props.row.leadSource.sourceName}}</q-td>
      <q-td
        v-slot:body-cell-lead_id="props"
        :props="props"
        class="cursor-pointer"
        @click.native="toggleLeadInformation(props.row)"
      >
        <span class="label text-primary"># {{props.row.leadNumber}}</span>
      </q-td>
      <q-td v-slot:body-cell-leadStatus="props" :props="props">
        <q-chip
          class="text-positive text-weight-bold"
          v-if="props.row.leadStatus == $LEAD_STATUS_SHORT_LEAD"
        >Short Lead</q-chip>
        <q-chip
          class="text-positive text-weight-bold"
          v-else-if="props.row.leadStatus == $LEAD_STATUS_WIP_LEAD"
        >WIP Lead</q-chip>
        <q-chip
          class="text-amber-9 text-weight-bold"
          v-else-if="props.row.leadStatus == $LEAD_STATUS_RSM_PENDING"
        >RSM Pending</q-chip>
        <q-chip
          class="text-negative text-weight-bold"
          v-else-if="props.row.leadStatus == $LEAD_STATUS_RSM_REJECT"
        >RSM Rejected</q-chip>
        <q-chip
          class="text-amber-9 text-weight-bold"
          v-else-if="props.row.leadStatus == $LEAD_STATUS_NH_PENDING"
        >NH Pending</q-chip>
        <q-chip
          class="text-negative text-weight-bold"
          v-else-if="props.row.leadStatus == $LEAD_STATUS_NH_REJECT"
        >NH Rejected</q-chip>
        <q-chip
          class="text-positive text-weight-bold"
          v-else-if="props.row.leadStatus == $LEAD_STATUS_SUBMIT_TO_SAT_LEAD"
        >Submitted to SAT</q-chip>
        <q-chip
          class="text-amber-9 text-weight-bold"
          v-else-if="props.row.leadStatus == $LEAD_STATUS_DATA_ENTRY_PENDING"
        >Data Entry Pending</q-chip>
        <q-chip
          class="text-positive text-weight-bold"
          v-else-if="props.row.leadStatus == $LEAD_STATUS_SUBMITED_TO_MARS"
        >Submitted to MARS</q-chip>
        <q-chip
          class="text-negative text-weight-bold"
          v-else-if="props.row.leadStatus == $LEAD_STATUS_MARS_REJECTED"
        >MARS Rejected</q-chip>
        <q-chip
          class="text-positive text-weight-bold"
          v-else-if="props.row.leadStatus == $LEAD_STATUS_MARS_APPROVED"
        >MARS Approved</q-chip>
        <q-chip
          class="text-amber-9 text-weight-bold"
          v-else-if="props.row.leadStatus == $LEAD_STATUS_IMPLEMENT_PENDING"
        >Implementation Pending</q-chip>
        <q-chip
          class="text-positive text-weight-bold"
          v-else-if="props.row.leadStatus == $LEAD_STATUS_IMPLEMENT_APPROVED"
        >Implementation Approved</q-chip>
      </q-td>
      <!--END: table body modification -->
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
        <!--START: table filter,search -->
        <!-- <div class="col-md-5">
            <q-input
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              float-label= "Search by SO name, Merchant Name, Lead ID"
              class="q-mr-lg q-py-sm"
            />
        </div>-->
        <!-- <div class="col-md-2">
            <q-select
              v-model="selectBankSource"
              separator
              color="grey-9"
              :options="sourceBankOptions"
              placeholder="Filter By Bank"
              float-label="Filter By Bank"
              class="q-mr-lg q-py-sm "
              size="sm"
            />
        </div>-->
        <!-- <div class="col-md-2">
            <q-select
              v-model="selectSource"
              separator
              color="grey-9"
              :options="sourceOptions"
              placeholder="Select"
              float-label= "Filter By"
              class="q-mr-lg q-py-sm "
              size="sm"
            />
          </div>
          <div class="col-md-3">
            <q-input
              v-model="model" 
              float-label="Date Filter"
              type="date"
              class="q-mr-lg q-py-sm"
              color="grey-9" 
            />
        </div>-->
        <!--END: table filter,search -->
      </template>
    </q-table>
    <!--END: table lead validation -->
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';

import { mapGetters, mapActions } from "vuex";
import generalLeadInformation from "../../components/generalLeadInformation.vue";
export default {
  name: "assignShortLead",
  components: {
    generalLeadInformation
  },
  data: () => ({
    propToggleLeadInformation: false,
    addtnLeadInformation: null,
    paginationControl: {
      rowsPerPage: 10
    },
    //table information
    model: "",
    filter: "",
    startDate: "2017-09-05",
    endDate: "2017-09-15",
    columns: [
      {
        name: "createdAt",
        required: true,
        label: "Date (C)",
        align: "left",
        field: "createdAt",
        sortable: true
      },
      {
        name: "shortleadDate",
        required: true,
        label: "Submitted On",
        align: "center",
        field: "shortleadDate",
        sortable: true
      },
      {
        name: "leadSource",
        required: true,
        label: "Lead source",
        align: "left",
        field: row => {
          return row.leadSource.sourceName;
        },
        sortable: false
      },
      {
        name: "lead_id",
        required: true,
        label: "Lead ID",
        align: "left",
        field: row => {
          return "# " + row.leadNumber;
        },
        sortable: true
      },
      {
        name: "merchant_name",
        required: true,
        label: "Merchant Name",
        align: "left",
        field: "leadName",
        sortable: false
      },
      {
        name: "location",
        required: true,
        label: "Location",
        align: "left",
        field: "leadAddress",
        sortable: false
      },
      {
        name: "assignedTo",
        required: true,
        label: "SO Name",
        align: "left",
        field: row => {
          return row.assignedTo == null ? "NA" : row.assignedTo.name;
        },
        sortable: false
      },
      {
        name: "leadStatus",
        required: true,
        label: "Status",
        align: "left",
        field: "leadStatus",
        sortable: false
      }
    ],
    loading: true,
    lazy: [],
    selectSource: "fb",
    selectBankSource: "ind",
    error: true,
    warning: false,
    sourceOptions: [
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
    ],
    sourceBankOptions: [
      {
        label: "Indian Bank",
        value: "ind"
      },
      {
        label: "ICICI",
        value: "icici"
      },
      {
        label: "SBI",
        value: "sbi"
      },
      {
        label: "KVB",
        value: "kvb"
      },
      {
        label: "PNB",
        value: "pnb"
      }
    ]
  }),
  created() {
    /* START: Load all States */
    this.ajaxLoadDataForAllShortLeadList();
    /* End: Load all States */
  },

  computed: {
    ...mapGetters("BankOpsShortLead", ["getAllMerchantTrackerInfo"])
  },

  methods: {
    ...mapActions("BankOpsShortLead", ["FETCH_ALL_OPEN_MERCHANT_TRACKER_DATA"]),
    ajaxLoadDataForAllShortLeadList() {
      this.FETCH_ALL_OPEN_MERCHANT_TRACKER_DATA();
    },
    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    }
  }
};
</script>

<style>
</style>
