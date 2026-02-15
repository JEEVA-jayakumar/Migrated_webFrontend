<template>
  <q-page>
    <div>
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />

      <!--START: table title -->
      <div class="row bottom-border items-center">
        <div
          class="col text-h6 q-px-lg q-py-md text-weight-regular text-grey-9"
        >Lead Allocation Tracker</div>
        <div class="col-auto q-px-lg q-py-sm">
          <q-btn
            color="dark"
            label="Lead Allocation"
            icon="add"
            @click="$router.push('/sales/manager/lead/allocation/tracker/add/new')"
          />
        </div>
      </div>
      <!--END: table title -->
      <!--START: table lead validation -->
      <q-table
        title="Lead Validation"
        table-class="customTableClass"
        class="q-py-none"
        :rows="getAllLeadAllocationData.assignedLeads"
        v-model:columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        row-key="name"
      >
        <q-td
          v-slot:body-cell-dateCreated="props"
          :props="props"
        >{{ props.row.createdAt | moment("Do MMM Y")}}</q-td>
        <q-td
          v-slot:body-cell-shortleadDate="props"
          :props="props"
        >{{ props.row.shortleadDate | moment("Do MMM Y")}}</q-td>
        <q-td
          v-slot:body-cell-leadId="props"
          :props="props"
          class="cursor-pointer"
          @click.native="toggleLeadInformation(props.row)"
        >
          <span class="text-primary cursor-pointer"># {{ props.row.leadNumber}}</span>
        </q-td>
        <q-td
          class="breakAll"
          v-slot:body-cell-leadAddress="props"
          :props="props"
        >{{props.row.leadAddress}}</q-td>
        <q-td
          v-slot:body-cell-assignedTo="props"
          :props="props"
        >{{props.row.assignedTo == null? 'NA':props.row.assignedTo.name}}</q-td>
        <q-td v-slot:body-cell-action="props" :props="props">
          <q-btn label="Edit" color="amber-9" icon="edit" @click="navigateToEditScreen(props.row)"/>
        </q-td>

        <template v-slot:top="props" class="bottom-border">
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
          <!--START: table filter,search -->
          <div class="col-md-5">
            <q-input
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              float-label="Search by SO name, Merchant Name, Lead ID"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <!-- <div class="col-md-3">
            <q-select
            multiple
            v-model="multipleSelect"
            separator
            color="grey-9"
            :options="options"
            placeholder="Select"
            float-label= "Filter By"
            class="q-mr-lg q-py-sm"
            size="sm"
            />
          </div>-->
          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->
      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35"/>
      </div>
      <!--END >>  Show Ajax Spinner -->
    </div>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "leadsPendingAssignment",
  components: {
    generalLeadInformation
  },
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      filter: "",
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsPerPage: 10
      },
      columns: [
        {
          name: "dateCreated",
          required: true,
          label: "Date Created",
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
          name: "leadId",
          required: true,
          label: "Lead ID",
          align: "left",
          field: row => {
            return "# " + row.leadNumber;
          },
          sortable: true
        },
        {
          name: "leadName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "leadName",
          sortable: false
        },
        {
          name: "leadAddress",
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
          field: "assignedTo",
          sortable: false
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false
        }
      ],
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
    };
  },

  created() {
    this.fnAjaxRequestPopulateTrackerData();
  },

  computed: {
    ...mapGetters("SalesManager_LeadAllocation", ["getAllLeadAllocationData"])
  },

  methods: {
    ...mapActions("SalesManager_LeadAllocation", [
      "FETCH_ALL_LEAD_ALLOCATION_DATA"
    ]),
    //  Function to populate all lead allocation tracker
    fnAjaxRequestPopulateTrackerData() {
      this.FETCH_ALL_LEAD_ALLOCATION_DATA();
    },
    navigateToEditScreen(item) {
      this.$router.push({
        name: "leadAllocationEdit",
        params: { id: item.id }
      });
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
