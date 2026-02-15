<template>
  <q-page>
    <div>
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        v-model:leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />

      <q-pull-to-refresh :distance="30"  inline>
        <!--START: table title :handler="PullToRefresh"-->
        <div
          class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
        >Lead Validation</div>
        <!--END: table title -->
        <!--START: table lead validation -->
        <q-table
          title="Lead Validation"
          table-class="customTableClass"
          class="q-py-none"
          :rows="tableData"
          :columns="columns"
          row-key="name"
          :filter="filter"
          :pagination="paginationControl"
          :rows-per-page-options="[5,10,15,20]"
          :loading="toggleAjaxLoadFilter"
          @request="ajaxLoadAllLeadInfo"
        >
          <!--START: table body modification -->
          <q-td
            v-slot:body-cell-createdAt="props"
            :props="props"
          >{{ props.row.date | moment("Do MMM Y") }}</q-td>

          <q-td
            v-slot:body-cell-leadNumber="props"
            :props="props"
            class="cursor-pointer"
            @click.native="toggleLeadInformation(props.row)"
          >
            <span
              class="label"
              :class="[props.row.priority?'text-negative text-weight-bolder':'text-primary']"
            ># {{props.row.leadNumber}}</span>
          </q-td>

          <q-td v-slot:body-cell-leadName="props" :props="props">
            <span class="capitalize">{{props.row.merchantName}}</span>
          </q-td>

          <q-td v-slot:body-cell-state="props" :props="props">
            <span class="capitalize">{{props.row.state}}</span>
          </q-td>

          <q-td v-slot:body-cell-assignedTo.name="props" :props="props">
            <span class="capitalize">{{props.row.salesOfficerName}}</span>
          </q-td>

          <q-td v-slot:body-cell-verifiedFinanceStatus="props" :props="props">
            <span
              class="label text-positive"
              v-if="props.row.verifiedFinanceStatus== $VERIFIED_FINANCE_STATUS_SUCCESS"
            >Approved</span>
            <span
              class="label text-negative"
              v-else-if="props.row.verifiedFinanceStatus== $VERIFIED_FINANCE_STATUS_PENDING"
            >Pending</span>
            <span
              class="label text-negative"
              v-else-if="props.row.verifiedFinanceStatus== $VERIFIED_FINANCE_STATUS_REJECT"
            >Rejected</span>
            <span class="label" v-else>NA</span>
          </q-td>

          <q-td v-slot:body-cell-leadStatus="props" :props="props">
            <span
              class="label text-positive"
              v-if="props.row.verifiedFinanceStatus== $LEAD_STATUS_SUBMIT_TO_SAT_LEAD && props.row.verifiedFinanceStatus== $VERIFIED_FINANCE_STATUS_SUCCESS"
            >New</span>
            <span
              class="label text-negative"
              v-if="props.row.verifiedFinanceStatus== $LEAD_STATUS_SUBMIT_TO_SAT_LEAD && props.row.verifiedFinanceStatus== $VERIFIED_DOCUMENT_STATUS_REJECT"
            >Rejected</span>
            <span
              class="label text-primary"
              v-else-if="props.row.leadStatus== $LEAD_STATUS_DATA_ENTRY_PENDING"
            >WIP</span>
            <span
              class="label text-orange"
              v-else-if="props.row.leadStatus== $LEAD_STATUS_SUBMITED_TO_MARS"
            >With ops</span>
            <span class="label text-negative" v-else>Pending</span>
          </q-td>

          <q-td v-slot:body-cell-action="props" :props="props">
            <q-btn
              v-if="props.row.leadStatus == $LEAD_STATUS_DATA_ENTRY_PENDING"
              highlight
              push
              outline
              color="purple-9"
              size="sm"
              @click="$router.push('/sat/lead/validation/'+ props.row.leadId+'/data/entry')"
            >Data Entry</q-btn>

            <q-btn
              v-else-if="props.row.leadStatus == $LEAD_STATUS_SUBMITED_TO_MARS"
              highlight
              push
              class="disabled"
              color="purple-9"
              size="sm"
            >Pending with MARS</q-btn>

            <q-btn
              v-else-if="props.row.leadStatus == $LEAD_STATUS_SUBMIT_TO_SAT_LEAD && props.row.verifiedFinanceStatus == $VERIFIED_FINANCE_STATUS_SUCCESS"
              highlight
              push
              outline
              color="purple-9"
              size="sm"
              :to="'/sat/lead/validation/'+ props.row.leadId"
            >Validate</q-btn>
            <q-btn
              v-else-if="props.row.leadStatus == $LEAD_STATUS_REFER_BACK"
              highlight
              push
              outline
              color="amber-9"
              size="sm"
              @click="$router.push('/sat/lead/validation/'+ props.row.leadId)"
            >Referred Back</q-btn>
            <q-btn
              v-else-if="props.row.leadStatus == $LEAD_STATUS_MARS_REFERRAL_BACK_DATA_ENTRY_PENDING"
              highlight
              push
              outline
              color="amber-9"
              size="sm"
              @click="$router.push('/sat/lead/validation/'+ props.row.leadId+'/data/entry')"
            >RB - data entry</q-btn>

            <q-btn v-else class="disabled" highlight push outline color="grey-9" size="sm">Validate</q-btn>
          </q-td>
          <q-td v-slot:body-cell-rejectLead="props" :props="props">
             <q-btn
              v-if="props.row.leadStatus == $LEAD_STATUS_SUBMIT_TO_SAT_LEAD  "
             highlight
                  push
                  outline
                  class="q-mx-sm"
                  color="negative"
                  @click="openRejectLead(props.row)"
                  size="sm"
            >Reject Lead</q-btn>
          </q-td>
          <!-- END: table body modification -->
          <template v-slot:top="props" class="bottom-border">
            <!--START: table filter,search -->
            <div class="col-md-5">
              <q-input
                clearable
                color="grey-9"
                v-model="filter"
                placeholder="Type.."
                :debounce="600"
                class="q-mr-lg q-py-sm"
                float-label="Search .. "
              />
            </div>
            <!--END: table filter,search -->
          </template>
        </q-table>
        <!--END: table lead validation -->
      </q-pull-to-refresh>
      <!--START: Open Reject Lead model -->
      <openRejectLeadComp
        v-if="showRejectLeadModel"
        :showRejectLeadModel="showRejectLeadModel"
        :propShowRejectLeadComponent="propsRejectLeadAppend"
        @closeRejectLeadModel="openRejectLead"
      ></openRejectLeadComp>
      <!--END: Open Reject Lead model -->
    </div>
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import generalLeadInformation from "../../components/generalLeadInformation.vue";
import openRejectLeadComp from "../../components/sat/openRejectLeadComp.vue";
export default {
  name: "leadValidation",
  components: {
    generalLeadInformation,
    openRejectLeadComp
  },
  data() {
    return {
      propToggleLeadInformation: false,
      showRejectLeadModel: false,
      addtnLeadInformation: null,
      filter: "",
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "leadNumber",
        descending: false,
        rowsPerPage: 10
      },
        propsRejectAppend: [],
      columns: [
        {
          name: "createdAt",
          required: true,
          label: "Date(C)",
          align: "left",
          field: "date",
          sortable: true
        },
        {
          name: "leadNumber",
          required: true,
          label: "Lead ID",
          align: "center",
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
          field: "merchantName",
          sortable: true
        },
        {
          name: "state",
          required: true,
          label: "State",
          align: "left",
          field: "state",
          sortable: true
        },
        {
          name: "assignedTo.name",
          required: true,
          label: "SO Name",
          align: "left",
          field: row => {
            return row.salesOfficerName;
          },
          sortable: true
        },
        {
          name: "verifiedFinanceStatus",
          required: true,
          label: "Finance Approval",
          align: "left",
          field: row => {
            return row.verifiedFinanceStatus ==
              this.$VERIFIED_FINANCE_STATUS_SUCCESS
              ? "Success"
              : row.verifiedFinanceStatus ==
                this.$VERIFIED_FINANCE_STATUS_PENDING
              ? "Pending"
              : row.verifiedFinanceStatus ==
                this.$VERIFIED_FINANCE_STATUS_REJECT
              ? "Rejected"
              : "NA";
          },
          sortable: true
        },
        {
          name: "leadStatus",
          required: true,
          label: "Status",
          align: "left",
          field: "leadStatus",
          sortable: true
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false
        },
        {
          name: "rejectLead",
          required: true,
          label: "",
          align: "left",
          field: "rejectLead",
          sortable: false
        },
      ],
      tableData: []
    };
  },
  computed: {
    ...mapGetters("SatLeadValidation", ["getAllLeadsValidationInfo"])
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  methods: {
    ...mapActions("SatLeadValidation", ["FETCH_ALL_LEAD_VALIDATIONS_DATA"]),
    //Load all short lead info while page loading
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_ALL_LEAD_VALIDATIONS_DATA({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getAllLeadsValidationInfo.totalElements;
          this.paginationControl.page =
            this.getAllLeadsValidationInfo.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getAllLeadsValidationInfo.content;
          if (this.getAllLeadsValidationInfo.sort != null) {
            this.paginationControl.sortBy = this.getAllLeadsValidationInfo.sort[0].property;
            this.paginationControl.descending = this.getAllLeadsValidationInfo.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    openRejectLead(exceptionDetails) {
      this.showRejectLeadModel = !this.showRejectLeadModel;
      this.propsRejectLeadAppend = exceptionDetails;
    },

    //Function pull to refresh
    // PullToRefresh(done) {
    //   this.ajaxLoadAllLeadInfo({
    //     pagination: this.paginationControl,
    //     filter: this.filter
    //   });
    // },

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

<style scoped>
.q-btn-flat,
.q-btn-outline {
  min-width: 100px !important;
}
</style>
