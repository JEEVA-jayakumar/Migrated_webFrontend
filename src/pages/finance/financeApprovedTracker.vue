<template>
  <q-page>
    <div>
      <q-pull-to-refresh :handler="PullToRefresh" inline>
        <!--START: table title -->
        <div
          class="col-md-12 capitalize text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
        >
          Finance Approved Tracker
        </div>
        <!--END: table title -->
        <!-- table finance approved tracker -->
        <q-tabs v-model="activeTab" class="shadow-1" color="grey-1" @select="goToQrMerchant">
          <q-tab default color="dark" name="tab-1" slot="title" label="Pos Merchant" />
        <q-tab color="dark" name="tab-2" slot="title" label="QR Merchant" />
        <q-tab-panel name="tab-1">
        <q-table
          table-class="customTableClass"
          :rows="tableData"
          :columns="columns"
          :filter="filter"
          :pagination="paginationControl"
          :rows-per-page-options="[5, 10, 15, 20]"
          @request="ajaxLoadAllFinanceApprovedData"
          row-key="name"
        >
          <q-td v-slot:body-cell-createdAt="props" :props="props">
            <span class="capitalize">{{
              props.row.submissionDate | moment("Do MMM Y")
            }}</span>
          </q-td>
          <!--START: Amount status -->
          <!-- <q-td v-slot:body-cell-amount_status="props" :props="props">
              <span class="text-positive" v-if="props.row.verifiedFinanceStatus==$VERIFIED_FINANCE_STATUS_SUCCESS">Finance approved</span>
              <span class="text-negative" v-else-if="props.row.verifiedFinanceStatus==$VERIFIED_FINANCE_STATUS_REJECT">Finance rejected</span>
              <span class="text-amber-9" v-else-if="props.row.verifiedFinanceStatus==$VERIFIED_FINANCE_STATUS_PENDING">Finance pending</span>
              <span class="text-amber-9" v-else-if="props.row.leadStatus==$LEAD_STATUS_MARS_PENDING">Pending on board</span>
              <span class="text-negative" v-else-if="props.row.verifiedFinanceStatus==$VERIFIED_FINANCE_STATUS_REJECT">Rejected on board</span>
              <span class="text-positive" v-else-if="props.row.verifiedFinanceStatus==$LEAD_STATUS_MARS_APPROVED">On boarded</span>
              <span class="text-positive" v-else>NA</span>
          </q-td>-->
          <!--END: Amount status -->
          <!-- START: Lead Number -->
          <q-td v-slot:body-cell-approvedDate="props" :props="props">
            <span class="label">{{ props.row.approvedDate | moment("Do MMM Y") }}</span>
          </q-td>
          <q-td v-slot:body-cell-submittedToFinanceDate="props" :props="props">
            <span class="label">{{
              props.row.submittedToFinanceDate | moment("Do MMM Y")
            }}</span>
          </q-td>
          <!-- END: Lead Number -->
          <!-- START: Lead Number -->
          <q-td
            v-slot:body-cell-leadNumber="props"
            class="cursor-pointer"
            @click.native="toggleLeadInformation(props.row)"
            :props="props"
          >
            <span class="label text-primary"># {{ props.row.leadNumber }}</span>
          </q-td>
          <!-- END: Lead Number -->
          <!-- START: TID -->
          <q-td v-slot:body-cell-updatedAt="props" :props="props">
            <!-- <span class="label text-primary"># {{props.row.tid}}</span> -->
            <span class="label">{{
              props.row.leadLastUpdated | moment("Do MMM Y")
            }}</span>
          </q-td>
          <!-- END: TID -->
          <!--START: table search, filter -->
          <template v-slot:top="props">
            <!--START: table search -->
            <div class="col-md-5">
              <q-input
                clearable
                color="grey-9"
                v-model="filter"
                placeholder="Type.."
                float-label="Search .. "
                class="q-mr-lg q-py-sm"
              />
            </div>
            <!--ENDv-model: table search -->
            <!--START: table filter dropdown -->
            <div class="col-md-3"></div>
            <!--END: table filter dropdown -->
            <!--START: table excel download -->
            <!-- <div class="col-md-4" align="right">
              <q-btn outline color="dark" label="Download as excel" @click="downloadReport" />
            </div> -->
            <div class="col-md-4" align="right">
              <q-btn outline color="dark" label="Download as excel" @click="downloadReport" />
            </div>
            <!--END: table excel download -->
          </template>
          <!--END: table search, filter -->
        </q-table>
      </q-tab-panel>
      <q-tab-panel name="tab-2">

        <q-table
          table-class="customTableClass"
          :rows="tableData1"
          :columns="columns1"
          :filter="filter1"
          :pagination="paginationControl1"
          :rows-per-page-options="[5,10,15,20]"
          @request="ajaxLoadAllFinanceQrApprovedData"
          row-key="name"
        >
          <q-td v-slot:body-cell-createdAt="props" :props="props">
            <span class="capitalize">{{props.row.submissionDate | moment("Do MMM Y")}}</span>
          </q-td>
         
          <q-td v-slot:body-cell-approvedDate="props" :props="props">
            <span class="label">{{props.row.approvedDate | moment("Do MMM Y") }}</span>
          </q-td>
          <q-td v-slot:body-cell-submittedToFinanceDate="props" :props="props">
            <span class="label">{{props.row.submittedToFinanceDate | moment("Do MMM Y") }}</span>
          </q-td>
          <!-- END: Lead Number -->
          <!-- START: Lead Number -->
          <q-td
            v-slot:body-cell-qrLeadNumber="props"
            class="cursor-pointer"
            @click.native="toggleQrLeadInformation(props.row)"
            :props="props"
          >
            <span class="label text-primary"># {{props.row.qrLeadNumber}}</span>
          </q-td>
          <!-- END: Lead Number -->
          <!-- START: TID -->
          <q-td v-slot:body-cell-updatedAt="props" :props="props">
            <!-- <span class="label text-primary"># {{props.row.tid}}</span> -->
            <span class="label">{{props.row.leadLastUpdated | moment("Do MMM Y") }}</span>
          </q-td>
          <!-- END: TID -->
          <!--START: table search, filter -->
          <template v-slot:top="props">
            <!--START: table search -->
            <div class="col-md-5">
              <q-input
                clearable
                color="grey-9"
                v-model="filter1"
                placeholder="Type.."
                float-label="Search .. "
                class="q-mr-lg q-py-sm"
              />
            </div>
            <!--END: table search -->
            <!--START: table filter dropdown -->
            <div class="col-md-3"></div>
            <!--END: table filter dropdown -->
            <!--START: table excel download -->
            <div class="col-md-4" align="right">
              <q-btn outline color="dark" label="Download as excel" @click="downloadQrReport" />
            </div>
            <!--END: table excel download -->
          </template>
          <!--END: table search, filter -->
        </q-table>
      </q-tab-panel>
      </q-tabs>
      </q-pull-to-refresh>
      <!-- <download-financeapproval></download-financeapproval> -->
      <downloadFinanceapproval
        v-if="propFinanceApprovalDatas"
        :propFinanceApprovalDatas="propFinanceApprovalDatas"
        @emitfnshowFinanceapproval="downloadApproval"
      ></downloadFinanceapproval>
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <generalQrLeadInformation
        v-if="propToggleQrLeadInformation"
        :QrleadInformation="addQrLeadInformation"
        :propToggleQrLeadInformationPop="propToggleQrLeadInformation"
        @closeLeadInformation="toggleQrLeadInformation"
      />
    </div>
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";



import { date } from "quasar";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
import moment from "moment";
import downloadExcel from "vue-json-excel";
import generalLeadInformation from "../../components/generalLeadInformation.vue";
import generalQrLeadInformation from "../../components/generalQrLeadInformation.vue";
import downloadFinanceapproval from "../../components/finance/downloadFinanceapproval";
export default {
  name: "financeApprovedtracker",
  components: {
    downloadExcel,
    generalLeadInformation,
    downloadFinanceapproval,
    generalQrLeadInformation
  },
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,
      propFinanceApprovalDatas: false,
      propToggleQrLeadInformation: false,
      addQrLeadInformation: null,
      excelFields: [],
      columnFields: null,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "leadNumber",
        descending: false,
        rowsPerPage: 10,
      },
      paginationControl1: {
        rowsNumber: 10,
        page: 1,
        sortBy: "qrLeadNumber",
        descending: false,
        rowsPerPage: 10
      },
      // To expand table rows
      filter: "",
      filter1: "",
      // Datatable data
      columns: [
        {
          name: "leadNumber",
          required: true,
          label: "Lead Number",
          align: "left",
          field: (row) => {
            return "# " + row.leadNumber;
          },
          sortable: true,
        },
        {
          name: "leadName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "merchantName",
          sortable: true,
        },
        {
          name: "assignedTo.name",
          required: true,
          label: "SO Name",
          align: "left",
          field: "soName",
          sortable: true,
        },
        {
          name: "createdAt",
          required: true,
          label: "Submission Date",
          align: "left",
          field: "submissionDate",
          sortable: true,
        },
        {
          name: "submittedToFinanceDate",
          required: true,
          label: "Date",
          align: "center",
          field: "submittedToFinanceDate",
          sortable: true,
        },
        {
          name: "referenceNumber",
          required: true,
          label: "Payment Reference",
          align: "left",
          field: "paymentReference",
          sortable: true,
        },
        {
          name: "setupFees",
          required: true,
          label: "Amount (INR)",
          align: "left",
          field: "amount",
          sortable: true,
        },
        {
          name: "updatedAt",
          required: true,
          label: "TID Activation Date",
          align: "left",
          field: "leadLastUpdated",
          sortable: true
        }
      ],
      columns1: [
        {
          name: "qrLeadNumber",
          required: true,
          label: "Lead Number",
          align: "left",
          field: row => {
            return "# " + row.qrLeadNumber;
          },
          sortable: true
        },
        {
          name: "leadName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "merchantName",
          sortable: false
        },
        {
          name: "assignedTo.name",
          required: true,
          label: "SO Name",
          align: "left",
          field: "soName",
          sortable: false
        },
        {
          name: "createdAt",
          required: true,
          label: "Submission Date",
          align: "left",
          field: "submissionDate",
          sortable: false
        },
        // {
        //   name: "submittedToFinanceDate",
        //   required: true,
        //   label: "Date",
        //   align: "center",
        //   field: "submittedToFinanceDate",
        //   sortable: true
        // },
        {
          name: "referenceNumber",
          required: true,
          label: "Payment Reference",
          align: "left",
          field: row => {
            return  row.paymentReference == null ? 'NA' : row.paymentReference;
          },
          sortable: false
        },
        {
          name: "setupFees",
          required: true,
          label: "Amount (INR)",
          align: "left",
          field: "amount",
          sortable: false
        },
        // {
        //   name: "updatedAt",
        //   required: true,
        //   label: "TID Activation Date",
        //   align: "left",
        //   field: "leadLastUpdated",
        //   sortable: true
        // }
      ],
      tableData: [],
      tableData1: []
    };
  },
  computed: {
    ...mapGetters("Finance", ["getAllApprovedFinaceData"]),
    ...mapGetters("commonLoader", ["getToggleCommonLoader"]),
    ...mapGetters("qrFinance", ["getstaticQrApprovedTrackerData"]),
  },

  mounted() {
    this.ajaxLoadAllFinanceApprovedData({
      pagination: this.paginationControl,
      filter: this.filter
    });
    this.ajaxLoadAllFinanceQrApprovedData({
      pagination: this.paginationControl1,
      filter: this.filter1
    });
  },

  methods: {
    ...mapActions("Finance", ["FETCH_ALL_APPROVED_FINANCE_DATA"]),
    ...mapActions("reports", ["REPORT_FINANCE_APPROVED","REPORT_QR_FINANCE_APPROVED"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    ...mapActions("qrFinance", [ "FETCH_ALL_APPROVED_QR_FINANCE_DATA"]),
    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },
    toggleQrLeadInformation(qrLeadDetails) {
      this.propToggleQrLeadInformation = !this.propToggleQrLeadInformation;
      if (qrLeadDetails != undefined) {
        this.addQrLeadInformation = qrLeadDetails;
      }
    },
    //Function pull to refresh
    PullToRefresh(done) {
      done();
    },

    ajaxLoadAllFinanceApprovedData({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.FETCH_ALL_APPROVED_FINANCE_DATA({ pagination, filter })
        .then((res) => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getAllApprovedFinaceData.totalElements;
          this.paginationControl.page = this.getAllApprovedFinaceData.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getAllApprovedFinaceData.content;
          if (this.getAllApprovedFinaceData.sort != null) {
            this.paginationControl.sortBy = this.getAllApprovedFinaceData.sort[0].property;
            this.paginationControl.descending = this.getAllApprovedFinaceData.sort[0].ascending;
          }
          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    ajaxLoadAllFinanceQrApprovedData({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_ALL_APPROVED_QR_FINANCE_DATA({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;
          console.log("GETTER QR",JSON.stringify(this.getstaticQrApprovedTrackerData));
          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getstaticQrApprovedTrackerData.totalElements;
          this.paginationControl1.page =
            this.getstaticQrApprovedTrackerData.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 = this.getstaticQrApprovedTrackerData.content;
          console.log("CHECK QR APPROVE",JSON.stringify(this.tableData1));
          if (this.getstaticQrApprovedTrackerData.sort != null) {
            this.paginationControl1.sortBy = this.getstaticQrApprovedTrackerData.sort[0].property;
            this.paginationControl1.descending = this.getstaticQrApprovedTrackerData.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    downloadApproval() {
      this.propFinanceApprovalDatas = !this.propFinanceApprovalDatas;
    },

    downloadReport() {
      this.$q.loading.show({
        delay: 100 // ms
      });
      this.REPORT_FINANCE_APPROVED(this.formData)
        .then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Success, file has been downloaded",
            icon: "check"
          });
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again",
            icon: "thumb_down"
          });
        });
    },
    downloadQrReport() {
      this.$q.loading.show({
        delay: 100 // ms
      });
      this.REPORT_QR_FINANCE_APPROVED(this.formData)
        .then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Success, file has been downloaded",
            icon: "check"
          });
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again",
            icon: "thumb_down"
          });
        });
    },
  }
};
</script>

<style></style>
