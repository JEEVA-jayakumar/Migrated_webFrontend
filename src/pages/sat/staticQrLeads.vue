<template>
  <q-page>
    <div>
      <staticQrGeneralLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <q-pull-to-refresh :distance="30" :handler="PullToRefresh" inline>
        <div
          class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
        >
          Static QR Lead Validation
        </div>
        <q-table
          title="Lead Validation"
          table-class="customTableClass"
          class="q-py-none"
          :data="tableData"
          :columns="columns"
          row-key="name"
          :filter="filter"
          :pagination.sync="paginationControl"
          :rows-per-page-options="[5, 10, 15, 20]"
          :loading="toggleAjaxLoadFilter"
          @request="ajaxLoadAllLeadInfo"
        >
          <q-td slot="body-cell-createdAt" slot-scope="props" :props="props">{{
            props.row.date | moment("Do MMM Y")
          }}</q-td>
          <q-td
            slot="body-cell-leadNumber"
            slot-scope="props"
            :props="props"
            class="cursor-pointer"
            @click.native="toggleLeadInformation(props.row)"
          >
            <span
              class="label"
              :class="[
                props.row.priority
                  ? 'text-negative text-weight-bolder'
                  : 'text-primary'
              ]"
              ># {{ props.row.leadNumber }}</span
            >
          </q-td>
          <q-td slot="body-cell-leadName" slot-scope="props" :props="props">
            <span class="capitalize">{{ props.row.marketingName }}</span>
          </q-td>
          <q-td slot="body-cell-state" slot-scope="props" :props="props">
            <span class="capitalize">{{ props.row.state }}</span>
          </q-td>

          <q-td
            slot="body-cell-assignedTo.name"
            slot-scope="props"
            :props="props"
          >
            <span class="capitalize">{{ props.row.salesOfficerName }}</span>
          </q-td>
          <!-- <q-td slot="body-cell-leadStatus" slot-scope="props" :props="props">
            <span class="label text-primary" v-if="props.row.leadStatus == 1"
              >Pending With Bank Details</span
            >
            <span
              class="label text-orange"
              v-else-if="props.row.leadStatus == 2"
              >Pending With Document Upload</span
            >
            <span class="label text-lime" v-else-if="props.row.leadStatus == 3"
              >Pending With QR Scan</span
            >
            <span
              class="label text-purple-9"
              v-else-if="props.row.leadStatus == 4"
            >
              Manual Verification</span
            >
            <span
              class="label text-amber"
              v-else-if="props.row.leadStatus == 5"
            >
              Submitted To SAT</span
            >
            <span class="label text-blue" v-else-if="props.row.leadStatus == 6">
              WIP</span
            >
            <span
              class="label text-green"
              v-else-if="props.row.leadStatus == 7"
            >
              Pending For Registration With Axis</span
            >
            <span
              class="label text-orange"
              v-else-if="props.row.leadStatus == 8"
            >
              Reffer Back</span
            >
            <span
              class="label text-green"
              v-else-if="props.row.leadStatus == 9"
            >
              Re-Upload</span
            >
            <span
              class="label text-blue"
              v-else-if="props.row.leadStatus == 10"
            >
              QR Activated</span
            >
            <span
              class="label text-green"
              v-else-if="props.row.leadStatus == 12"
            >
            Waiting For Response File</span
            >
            <span class="label text-negative" v-else>Pending</span>
          </q-td> -->
          <q-td slot="body-cell-leadStatus" slot-scope="props" :props="props">
            <span class="label text-primary" v-if="props.row.leadStatus == 1"
              >Pending With Bank Details</span
            >
            <span
              class="label text-orange"
              v-else-if="props.row.leadStatus == 2"
              >Pending With Document Upload</span
            >
            <span class="label text-lime" v-else-if="props.row.leadStatus == 3"
              >Pending With QR Scan</span
            >
            <span
              class="label text-purple-9"
              v-else-if="(props.row.leadStatus == 4 && props.row.referbackStatus == false)"
            >
              Manual Verification</span
            >
            <span
              class="label text-amber"
              v-else-if="props.row.leadStatus == 5"
            >
            Pending With MDR and Rental Details</span
            >
            <span class="label text-blue"
             v-else-if="props.row.leadStatus == 6">
              WIP</span
            >
            <!-- <span
              class="label text-green"
              v-else-if="props.row.leadStatus == 7"
            >
              Pending For Registration With Axis</span
            > -->
            <span
              class="label text-green"
              v-else-if="props.row.leadStatus == 7"
            >
              Pending For Registration With Axis</span
            >
            <span
              class="label text-orange"
              v-else-if="props.row.leadStatus == 8"
            >
              Reffer Back</span
            >
            <span
              class="label text-green"
              v-else-if="(props.row.leadStatus == 4 && props.row.referbackStatus == true)"
            >
              Re-Upload</span
            >
            <span
              class="label text-blue"
              v-else-if="props.row.leadStatus == 10"
            >
              QR Activated</span
            >
            <span
              class="label text-negative"
              v-else-if="props.row.leadStatus == 11"
            >
           Mars Rejected</span
            >
            <span
              class="label text-green"
              v-else-if="props.row.leadStatus == 12"
            >
            Waiting For Response File</span
            >
            <span
              class="label text-green"
              v-else-if="props.row.leadStatus == 13"
            >
            Pending With Personal Info</span
            >
            <span
              class="label text-green"
              v-else-if="props.row.leadStatus == 14"
            >
            Pending With Risk Info</span
            >
            <span
              class="label text-orange"
              v-else-if="props.row.leadStatus == 9"
            >
            Mars Re-Upload</span
            >
            <span class="label text-negative" v-else>Pending</span>
          </q-td>
          <q-td slot="body-cell-action" slot-scope="props" :props="props">
            <q-btn
              class="btn1"
              v-if="(props.row.leadStatus == 4 && props.row.referbackStatus == false)"
              :disabled="props.row.verifiedFinanceStatus != 1"
              highlight
              push
              color="purple-9"
              size="sm"
              :to="'qrLead/validation/' + props.row.leadId"
              >Validate</q-btn
            >
            <q-btn
              class="btn3"
              v-if="(props.row.leadStatus == 4 && props.row.referbackStatus == true)"
              highlight
              push
              outline
              color="blue"
              size="sm"
              :to="'qrLead/validation/' + props.row.leadId"
              >Re-submit</q-btn
            >
            <q-btn
              class="btn3"
              v-if="props.row.leadStatus == 9"
              highlight
              push
              outline
              color="green"
              size="sm"
              :to="'qrLead/validation/' + props.row.leadId"
              >MARS ReferBack</q-btn
            >
            <q-btn
              class="btn2"
              disable
              v-else-if="props.row.leadStatus == 6"
              highlight
              push
              color="red"
              size="sm"
              >Pending With Mars</q-btn
            >
            <q-btn
              v-else-if="props.row.leadStatus == 7"
              disable
              highlight
              push
              color="green"
              size="sm"
              >Mars Approved</q-btn
            >
            <q-btn
              class="btn3"
              v-else-if="props.row.leadStatus == 8"
              highlight
              push
              outline
              color="amber"
              size="sm"
              >Reffer Back</q-btn
            >
          </q-td>

          <q-td
            slot="body-cell-verifiedFinanceStatus"
            slot-scope="props"
            :props="props"
          >
            <span
              class="label text-green"
              v-if="props.row.verifiedFinanceStatus == 1"
              >Approved</span
            >
            <span
              class="label text-negative"
              v-else-if="props.row.verifiedFinanceStatus == 2"
              >Pending</span
            >
            <span
              class="label text-negative"
              v-else-if="props.row.verifiedFinanceStatus == 3"
              >Rejected</span
            >
            <span class="label text-negative" v-else>Pending</span>
          </q-td>
          <template slot="top" slot-scope="props" class="bottom-border , row">
            <div class="col-md-4">
              <q-search
                clearable
                color="grey-9"
                v-model="filter"
                placeholder="Type.."
                :debounce="300"
                class="q-mr-lg q-py-sm"
                float-label="Search By Lead ID, Merchant Name ..."
              />
            </div>
            <!-- <div class="size1">
              <q-stepper-navigation>
                <q-btn
                  square
                  outline
                  color="purple-9"
                  label="Download as Excel"
                  size="md"
                  @click="downloadFiles()"
                />
                <q-btn
                  class="size2"
                  square
                  icon="attach_file"
                  @click="excelFileUpload"
                  color="purple-9"
                  label="File Upload"
                />
              </q-stepper-navigation>
            </div> -->
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
      <!--START: Open showPDOmodal model -->
      <staticQrFileUpload
        v-if="toggleFileUpload"
        :propFileUpload="toggleFileUpload"
        :propAllExcelFile="deviceOptions"
        @closeModel="excelFileUpload"
      ></staticQrFileUpload>
      <!--END: Open showPDOmodal model -->
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import staticQrGeneralLeadInformation from "../../components/sat/staticQrGeneralLeadInformation.vue";
import openRejectLeadComp from "../../components/sat/openRejectLeadComp.vue";
import staticQrFileUpload from "../../components/sat/staticQrFileUpload.vue";
export default {
  name: "staticQrLeads",
  components: {
    openRejectLeadComp,
    staticQrGeneralLeadInformation,
    staticQrFileUpload
  },
  data() {
    return {
      // watcherData:this.getAllStaticQrLeadsValidationInfo.content,
      propToggleLeadInformation: false,
      showRejectLeadModel: false,
      addtnLeadInformation: null,
      filter: "",
      toggleAjaxLoadFilter: false,
      toggleFileUpload: false,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "qrLeadNumber",
        descending: false,
        rowsPerPage: 10
      },
      propsRejectAppend: [],
      columns: [
        // {
        //   name: "action1",
        //   required: true,
        //   label: "",
        //   align: "left",
        //   field: "action1",
        //   sortable: false
        // },
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
          sortable: false
        },
        {
          name: "leadName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "marketingName",
          sortable: false
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
          sortable: false
        },
        {
          name: "verifiedFinanceStatus",
          required: true,
          label: "Finace Status",
          align: "left",
          field: "verifiedFinanceStatus",
          sortable: true
        },
        {
          name: "leadStatus",
          required: true,
          label: "Status",
          align: "left",
          field: "leadStatus",
          sortable: false
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
        }
      ],
      tableData: []
    };
  },

  computed: {
    ...mapGetters("iciciStaticQr", ["getAllStaticQrLeadsValidationInfo"])
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  created() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  methods: {
    ...mapActions("iciciStaticQr", [
      "FETCH_ALL_STATIC_QR_LEAD_VALIDATIONS_DATA"
    ]),
    ...mapActions("staticQRDownload", [
      "STATIC_QR_LEAD_VALIDATION_DOWNLOAD_FILE"
    ]),
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_ALL_STATIC_QR_LEAD_VALIDATIONS_DATA({ pagination, filter })
        .then(res => {
          console.log(
            "getAllStaticQrLeadsValidationInfo",
            JSON.stringify(this.getAllStaticQrLeadsValidationInfo)
          );
          this.paginationControl = pagination;
          this.paginationControl.rowsNumber = this.getAllStaticQrLeadsValidationInfo.totalElements;
          this.paginationControl.page =
            this.getAllStaticQrLeadsValidationInfo.number + 1;
          this.tableData = this.getAllStaticQrLeadsValidationInfo.content;
          console.log("TABLE STATUS", this.tableData);
          if (this.getAllStaticQrLeadsValidationInfo.sort != null) {
            this.paginationControl.sortBy = this.getAllStaticQrLeadsValidationInfo.sort[0].property;
            this.paginationControl.descending = this.getAllStaticQrLeadsValidationInfo.sort[0].ascending;
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
    // Function pull to refresh
    PullToRefresh(done) {
      this.ajaxLoadAllLeadInfo({
        pagination: this.paginationControl,
        filter: this.filter
      });
    },
    downloadFiles() {
      this.$q.loading.show({
        delay: 100 // ms
      });
      this.STATIC_QR_LEAD_VALIDATION_DOWNLOAD_FILE()
        .then(() => {
          // this.ajaxLoadAllLeadInfo({ pagination: this.paginationControl, filter: this.filter});
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Success, file has been downloaded",
            icon: "check"
          });
          this.ajaxLoadAllLeadInfo({pagination: this.paginationControl, filter: this.filter});
          this.$q.loading.hide();
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again",
            icon: "thumb_down"
          });
        });
    },
    excelFileUpload() {
      this.toggleFileUpload = !this.toggleFileUpload;
      this.ajaxLoadAllLeadInfo({pagination: this.paginationControl, filter: this.filter});
    },
    toggleLeadInformation(leadDetails) {
      console.log(leadDetails);
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
.btn1 {
  width: 114px;
}
.btn2 {
  width: 140px;
}
.btn3{
  width: 114px;
}
.size1 {
  margin-left: 367px;
}
.size2 {
  margin-left: 10px;
}
</style>
