<template>
  <q-dialog
    maximized
    no-backdrop-dismiss
    no-esc-dismiss
    v-model="toggleModal"
    :content-css="{padding:'50px 5px'}"
  >
    <div>
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <!--START: table title -->
      <div class="row items-center q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">
        <div class="col text-h6">Lead Details</div>
        <div class="col-auto">
          <q-btn round @click="emitToggleRemarks" outline color="dark" icon="clear"/>
        </div>
      </div>
      <!--END: table title -->
      <!--START: table lead validation -->
      <q-table
        title="Lead Validation"
        table-class="customTableClass"
        class="q-py-none"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        :rows-per-page-options="[5,10,15,20]"
        @request="ajaxLoadAllLeadInfo"
        row-key="nam6"
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
          <q-btn v-else class="disabled" highlight push outline color="grey-9" size="sm">Validate</q-btn>
        </q-td>
        <!-- END: table body modification -->
        <template v-slot:top="props" class="bottom-border">
          <!--START: table filter,search -->
          <div class="col-md-5">
            <q-input
              clearable
              color="grey-9"
              v-model="filter"
              :debounce="600"
              placeholder="Type.."
              float-label="Search .. "
              class="q-mr-lg q-py-sm"
            />
          </div>
          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->
    </div>
  </q-dialog>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import generalLeadInformation from "../generalLeadInformation.vue";
export default {
  name: "leadValidation",
  props: ["propLeadInformation", "propToggleModal"],
  components: {
    generalLeadInformation
  },
  data() {
    return {
      toggleModal: this.propToggleModal,
      propToggleLeadInformation: false,
      addtnLeadInformation: null,
      filter: "",
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "leadNumber",
        descending: false
      },
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
          field: "salesOfficerName",
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
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false
        }
      ],
      loading: true,
      tableData: []
    };
  },
  computed: {
    ...mapGetters("SAT_Dashboard", ["getSatAgingTrackerListdata"])
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  methods: {
    ...mapActions("SAT_Dashboard", ["FETCH_SAT_AGING_TRACKER_LEADS_DATA"]),
    //Load all short lead info while page loading
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      this.tableData = [];
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_SAT_AGING_TRACKER_LEADS_DATA({
        pagination: pagination,
        filter: filter,
        leadIdList: { leadIdList: this.propLeadInformation }
      })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getSatAgingTrackerListdata.totalElements;
          this.paginationControl.page =
            this.getSatAgingTrackerListdata.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getSatAgingTrackerListdata.content;

          if (this.getSatAgingTrackerListdata.sort != null) {
            this.paginationControl.sortBy = this.getSatAgingTrackerListdata.sort[0].property;
            this.paginationControl.descending = this.getSatAgingTrackerListdata.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.toggleAjaxLoadFilter = false;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.toggleAjaxLoadFilter = false;
          this.$q.loading.hide();
        });
    },

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },
    emitToggleRemarks(leadDetails) {
      this.$emit("closeLeadsList");
    }
  }
};
</script>

<style scoped>
</style>
