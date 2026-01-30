<template>
  <q-page>
    <div>
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :propLeadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />

      <q-pull-to-refresh :distance="30" :handler="PullToRefresh" inline>
        <!--START: table title -->
        <div
          class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
        >Lead Validation</div>
        <!--END: table title -->
        <!--START: table lead validation -->
        <q-table
          title="Lead Validation"
          table-class="customTableClass"
          class="q-py-none"
          :data="tableData"
          :columns="columns"
          :filter="filter"
          :pagination.sync="paginationControl"
          row-key="name"
        >
          <!--START: table body modification -->
          <q-td
            slot="body-cell-date"
            slot-scope="props"
            :props="props"
          >{{ props.row.submitteSATDate | moment("Do MMM Y") }}</q-td>

          <q-td
            slot="body-cell-lead_id"
            slot-scope="props"
            :props="props"
            class="cursor-pointer"
            @click.native="toggleLeadInformation(props.row)"
          >
            <span
              class="label"
              :class="[props.row.priority?'text-negative text-weight-bolder':'text-primary']"
            ># {{props.row.leadNumber}}</span>
          </q-td>

          <q-td slot="body-cell-leadName" slot-scope="props" :props="props">
            <span class="capitalize">{{props.row.leadName}}</span>
          </q-td>

          <q-td slot="body-cell-state" slot-scope="props" :props="props">
            <span class="capitalize">{{props.row.state}}</span>
          </q-td>

          <q-td slot="body-cell-so_name" slot-scope="props" :props="props">
            <span
              class="capitalize"
              v-if="props.row.createdBy !== null"
            >{{props.row.createdBy.name}}</span>
            <span v-else>NA</span>
          </q-td>

          <q-td slot="body-cell-finance_approval" slot-scope="props" :props="props">
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

          <q-td slot="body-cell-status" slot-scope="props" :props="props">
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

          <q-td slot="body-cell-action" slot-scope="props" :props="props">
            <q-btn
              v-if="props.row.leadStatus == $LEAD_STATUS_DATA_ENTRY_PENDING"
              highlight
              push
              outline
              color="purple-9"
              size="sm"
              @click="$router.push('/sat/lead/validation/'+ props.row.id+'/data/entry')"
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
              :to="'/sat/lead/validation/'+ props.row.id"
            >Validate</q-btn>
            <q-btn
              v-else-if="props.row.leadStatus == $LEAD_STATUS_REFER_BACK"
              highlight
              push
              outline
              color="amber-9"
              size="sm"
              @click="$router.push('/sat/lead/validation/'+ props.row.id)"
            >Referred Back</q-btn>
            <q-btn
              v-else-if="props.row.leadStatus == $LEAD_STATUS_MARS_REFERRAL_BACK_DATA_ENTRY_PENDING"
              highlight
              push
              outline
              color="amber-9"
              size="sm"
              @click="$router.push('/sat/lead/validation/'+ props.row.id+'/data/entry')"
            >RB - data entry</q-btn>

            <q-btn v-else class="disabled" highlight push outline color="grey-9" size="sm">Validate</q-btn>
          </q-td>
          <!-- END: table body modification -->
          <template slot="top" slot-scope="props" class="bottom-border">
            <!--START: table filter,search -->
            <div class="col-md-5">
              <q-search
                clearable
                color="grey-9"
                v-model="filter"
                placeholder="Type.."
                float-label="Search by SO name, Merchant Name, Lead ID"
                class="q-mr-lg q-py-sm"
              />
            </div>
            <!--END: table filter,search -->
          </template>
        </q-table>
        <!--END: table lead validation -->
      </q-pull-to-refresh>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import generalLeadInformation from "../../components/generalLeadInformation.vue";
export default {
  name: "leadValidation",
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
        rowsPerPage: 10,
        page: 1
      },
      columns: [
        {
          name: "date",
          required: true,
          label: "Date(C)",
          align: "left",
          field: "date",
          sortable: true
        },
        {
          name: "lead_id",
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
          field: "leadName",
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
          name: "so_name",
          required: true,
          label: "SO Name",
          align: "left",
          field: row => {
            return row.createdBy.name;
          },
          sortable: true
        },
        {
          name: "finance_approval",
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
          name: "status",
          required: true,
          label: "Status",
          align: "left",
          field: "status",
          sortable: true
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: true
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
  computed: {
    ...mapGetters("SatLeadValidation", ["getAllLeadsValidationInfo"])
  },
  created() {
    this.ajaxLoadAllLeadInfo();
  },
  methods: {
    ...mapActions("SatLeadValidation", ["FETCH_ALL_LEAD_VALIDATIONS_DATA"]),
    //Load all short lead info while page loading
    ajaxLoadAllLeadInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_ALL_LEAD_VALIDATIONS_DATA()
        .then(response => {
          this.$q.loading.hide();
          this.tableData = this.getAllLeadsValidationInfo;
        })
        .catch(error => {
          this.$q.loading.hide();
        });
    },

    //Function pull to refresh
    PullToRefresh(done) {
      this.FETCH_ALL_LEAD_VALIDATIONS_DATA()
        .then(() => {
          this.tableData = this.getAllLeadsValidationInfo;
        })
        .then(() => {
          done();
        })
        .catch(error => {
          done();
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

<style scoped>
.q-btn-flat,
.q-btn-outline {
  min-width: 100px !important;
}
</style>
