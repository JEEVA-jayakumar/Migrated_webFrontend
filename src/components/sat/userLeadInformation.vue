<template>
  <div>
    <q-dialog
      maximized
      v-model="opened"
      class="q-mt-lg capitalize"
      @hide="emitToggleRemarks"
      @escape-key="emitToggleRemarks"
      :content-css="{padding:'50px 20px'}"
    >
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :propLeadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <div class="row items-center bottom-border q-py-sm">
        <div class="col">Lead Information</div>
        <div class="col-auto">
          <q-btn round size="sm" @click="emitToggleRemarks" outline color="dark" icon="clear"/>
        </div>
      </div>

      <!-- START >> Lead information -->
      <q-table
        title="Lead Validation"
        table-class="customTableClass"
        class="q-py-none"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        row-key="name"
      >
        <!--START: table body modification -->
        <q-td
          v-slot:body-cell-createdAt="props"
          :props="props"
        >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td>

        <q-td
          v-slot:body-cell-lead_id="props"
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
          <span class="capitalize">{{props.row.leadName}}</span>
        </q-td>

        <q-td v-slot:body-cell-state="props" :props="props">
          <span class="capitalize">{{props.row.state}}</span>
        </q-td>

        <q-td v-slot:body-cell-so_name="props" :props="props">
          <span class="capitalize" v-if="props.row.createdBy !== null">{{props.row.createdBy.name}}</span>
          <span v-else>NA</span>
        </q-td>

        <q-td v-slot:body-cell-finance_approval="props" :props="props">
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

        <q-td v-slot:body-cell-status="props" :props="props">
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
        <!-- END: table body modification -->
        <template v-slot:top="props" class="bottom-border">
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
          <!--END: table filter,search -->
        </template>
      </q-table>
      <!-- END >> Lead information -->
    </q-dialog>
  </div>
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import generalLeadInformation from "../generalLeadInformation.vue";

export default {
  components: {
    generalLeadInformation
  },
  props: ["propUserId", "propToggleLeadInformationModal", "propAction"],
  data() {
    return {
      search: "",
      filter: "",
      propToggleLeadInformation: false,
      addtnLeadInformation: null,
      opened: this.propToggleLeadInformationModal,
      columns: [
        {
          name: "createdAt",
          required: true,
          label: "Date(C)",
          align: "left",
          field: "createdAt",
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
      tableData: []
    };
  },
  computed: {
    ...mapGetters("SM_LeadStatusInDetail", ["getuserBasedLeadsData"])
  },
  created() {
    this.ajaxLoadAllLeadInfo();
  },
  methods: {
    ...mapActions("SM_LeadStatusInDetail", [
      "FETCH_ALL_SALES_MANAGER_LEAD_VALIDATIONS_DATA"
    ]),
    emitToggleRemarks() {
      this.$emit("fetchCurrentUserLeads");
    },
    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    //Load all short lead info while page loading
    ajaxLoadAllLeadInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9"
      });
      this.tableData = [];
      this.toggleAjaxLoadFilter = true;
      this.FETCH_ALL_SALES_MANAGER_LEAD_VALIDATIONS_DATA({
        userId: this.propUserId,
        action: this.propAction
      })
        .then(response => {
          this.toggleAjaxLoadFilter = false;
          this.$q.loading.hide();
          if (this.propAction == this.$SALES_MANAGER_STATUS_SHORT_LEADS) {
            console.log(
              "this.getuserBasedLeadsData.leadList.shortLeads",
              this.getuserBasedLeadsData
            );
            this.tableData = this.getuserBasedLeadsData.leadList.shortLeads;
          }
          if (this.propAction == this.$SALES_MANAGER_STATUS_WIP_LEADS) {
            this.tableData = this.getuserBasedLeadsData.leadList.submitToSatLeads;
          }
          if (this.propAction == this.$SALES_MANAGER_STATUS_REJECTED_LEADS) {
            this.tableData = this.getuserBasedLeadsData.leadList.rejectedLeads;
          }
          if (
            this.propAction == this.$SALES_MANAGER_STATUS_SUBMIT_TO_SAT_LEADS
          ) {
            this.tableData = this.getuserBasedLeadsData.leadList.submitToSatLeads;
          }
          if (
            this.propAction == this.$SALES_MANAGER_STATUS_IMPLEMENTATION_LEADS
          ) {
            this.tableData = this.getuserBasedLeadsData.leadList.implementedLeads;
          }
        })
        .catch(error => {
          this.$q.loading.hide();
          this.toggleAjaxLoadFilter = false;
        });
    }
  }
};
</script>

<style>
</style>
