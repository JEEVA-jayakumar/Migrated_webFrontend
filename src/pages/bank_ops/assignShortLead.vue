<template>
  <q-page>
    <!-- Common component to view full lead information -->
    <generalLeadInformation
      v-if="propToggleLeadInformation"
      v-model:leadInformation="addtnLeadInformation"
      :propToggleLeadInformationPop="propToggleLeadInformation"
      @closeLeadInformation="toggleLeadInformation"
    />

    <!--START: table title -->
    <div class="row bottom-border items-center">
      <div class="col-md-8 text-h6 q-px-lg q-py-md text-weight-regular text-grey-9">Short Lead</div>
      <div class="col-md-4 q-px-lg q-py-sm" align="right">
        <q-btn
          no-caps
          push
          outline
          color="purple-9"
          to="/bank/ops/assign/short/lead/new"
        >Add New Lead</q-btn>
      </div>
    </div>
    <!--END: table title -->
    <!--START: table lead validation -->
    <q-table
      table-class="customTableClass"
      :rows="getAllShortLeadInfo"
      :columns="columns"
      :filter="filter"
      :pagination="paginationControl"
      row-key="name"
    >
      <!--START: table body modification -->
      <q-td v-slot:body-cell-date="props" :props="props">
        <span class="label">{{props.row.createdAt | moment("Do MMM Y")}}</span>
      </q-td>
      <!--END: table body modification -->
      <!--START: table body modification -->
      <q-td
        v-slot:body-cell-lead_id="props"
        :props="props"
        class="cursor-pointer"
        @click.native="toggleLeadInformation(props.row)"
      >
        <span class="label text-primary"># {{props.row.leadNumber}}</span>
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
        <div class="col-5">
          <q-input
            clearable
            color="grey-9"
            v-model="filter"
            placeholder="Type.."
            float-label="Search by SO name, Merchant Name, Lead ID"
            class="q-mr-lg q-py-sm"
          />
        </div>
        <!-- <div class="col-3">
                <q-select
                  multiple
                  v-model="multipleSelect"
                  separator
                  color="grey-9"
                  :options="options"
                  placeholder="Select"
                  float-label= "Filter By"
                  class="q-mr-lg q-py-sm "
                  size="sm"
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

    //table information
    filter: "",
    paginationControl: {
      rowsPerPage: 10
    },
    columns: [
      {
        name: "date",
        required: true,
        label: "Date",
        align: "left",
        field: "createdAt",
        sortable: true
      },
      {
        name: "lead_id",
        required: true,
        label: "Lead ID",
        align: "left",
        field: "id",
        sortable: true
      },
      {
        name: "me_name",
        required: true,
        label: "ME Name",
        align: "left",
        field: row => row.leadName,
        sortable: false
      },
      {
        name: "address",
        required: true,
        label: "Address",
        align: "left",
        field: row => row.leadAddress,
        sortable: true
      },
      {
        name: "state",
        required: true,
        label: "State",
        align: "left",
        field: "state",
        sortable: false
      },
      {
        name: "device_type",
        required: true,
        label: "Device Type",
        align: "left",
        field: row => row.device.deviceName,
        sortable: false
      },
      {
        name: "device_count",
        required: true,
        label: "Device Count",
        align: "left",
        field: "deviceCount",
        sortable: true
      },
      {
        name: "lead_source",
        required: true,
        label: "Lead Source",
        align: "left",
        field: row => row.leadSource.sourceName,
        sortable: true
      },
      {
        name: "assigned_to",
        required: true,
        label: "Assigned To",
        align: "left",
        field: row => row.assignedOpsTo.name,
        sortable: false
      }
    ],
    loading: true,
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
    /* START: Load all States */
    this.ajaxLoadDataForAllShortLeadList();
    /* End: Load all States */
  },

  computed: {
    ...mapGetters("BankOpsShortLead", ["getAllShortLeadInfo"])
  },

  methods: {
    ...mapActions("BankOpsShortLead", ["FETCH_SHORT_LEAD_DATA"]),
    ajaxLoadDataForAllShortLeadList() {
      this.FETCH_SHORT_LEAD_DATA();
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
