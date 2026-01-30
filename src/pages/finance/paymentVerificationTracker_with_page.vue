<template>
  <q-page>
    <div>
      <q-pull-to-refresh :handler="PullToRefresh" inline>
        <!--START: table title -->
        <div
          class="col-md-12 capitalize q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
        >Finance</div>
        <!--END: table title -->
        <!-- table payment verification tracker -->
        <q-table
          table-class="customTableClass"
          :data="tableData"
          :columns="columns"
          row-key="field"
          color="grey-9"
          :filter="filter"
          :pagination.sync="paginationControl"
          :rows-per-page-options="[5,10,15,20]"
          @request="ajaxLoadAllPaymentTrackerInfo"
          table-style="word-break: break-all"
          class="payment_verification_table capitalize"
        >
          <!--START: table header -->
          <q-tr slot="top-row" slot-scope="props">
            <q-th v-for="col in props.columns" :key="col.name" :props="props">{{ col.label }}</q-th>
          </q-tr>
          <!--END: table header -->
          <!--START: Table body -->
          <template slot="body" slot-scope="props">
            <!--START: table rows -->
            <q-tr :props="props" class="bottom-border">
              <!--START: table expand button :Checkbox -->
              <q-td auto-width key="id" :props="props">
                <q-checkbox
                  color="grey-9"
                  v-model="props.row.expand"
                  checked-icon="fas fa-chevron-up"
                  unchecked-icon="fas fa-chevron-down"
                  class="q-mr-md"
                  @input="expandRowPlease(props.row)"
                />
                <span
                  class="cursor-pointer"
                  :class="[props.row.priority?'text-negative text-weight-bolder':'text-primary']"
                  @click.prevent="toggleLeadInformation(props.row)"
                ># {{ props.row.leadNumber }}</span>
              </q-td>
              <!--END: table expand button :Checkbox -->
              <!--START: table other data -->
              <q-td auto-width key="createdBy" :props="props">{{ props.row.createdBy.name }}</q-td>
              <q-td auto-width key="leadName" :props="props">{{ props.row.leadName }}</q-td>

              <q-td auto-width key="leadAddress" :props="props">
                {{ props.row.leadAddress == "null" ? '': props.row.leadAddress }}
                <p class="capitalize no-margin">{{props.row.city}}, {{props.row.state}}</p>
              </q-td>

              <q-td auto-width key="state" :props="props">{{ props.row.state }}</q-td>

              <q-td auto-width key="leadSource" :props="props">{{props.row.leadSource.sourceName}}</q-td>

              <q-td
                auto-width
                key="device"
                :props="props"
              >{{ props.row.deviceCount }}-{{ props.row.device.deviceName }}</q-td>

              <q-td auto-width key="action" :props="props">
                <q-btn
                  highlight
                  push
                  outline
                  class="q-mx-sm"
                  color="negative"
                  @click="openRejectModel(props.row)"
                  size="sm"
                >Reject</q-btn>
                <q-btn
                  highlight
                  push
                  outline
                  class="q-mx-sm"
                  color="purple-9"
                  size="sm"
                  @click="financeApproveSubmit(props.row.id)"
                >Approve</q-btn>
              </q-td>
              <!--END: table other data -->
            </q-tr>
            <!--END: table rows -->
            <!-- START: table expand values -->
            <q-tr v-show="props.row.expand" :props="props" class="wordWrapCustom bottom-border">
              <q-td>
                <div class="text-left q-caption text-grey-8 text-weight-medium">Rental Plan</div>
                <div
                  class="text-left"
                  v-if="props.row.plan.planName == '' || props.row.plan.planName == null"
                >NA</div>
                <div class="text-left" v-else>{{ props.row.plan.planName }}</div>
              </q-td>
              <q-td>
                <div class="text-left q-caption text-grey-8 text-weight-medium">Amount Collected</div>
                <div class="text-left" v-if="props.row.amountCollected == null">NA</div>
                <div class="text-left" v-else>{{ props.row.amountCollected }}</div>
              </q-td>
              <q-td>
                <div class="text-left q-caption text-grey-8 text-weight-medium">Payment Type</div>
                <div v-if="props.row.paymentOption == 2" class="text-left">
                  <div>Cheque</div>
                  <div v-if="props.row.paymentDocumentMimeType != null">
                    <div
                      v-if="props.row.paymentDocumentMimeType.includes('pdf')"
                      class="cursor-pointer"
                    >
                      <div @click="fnPDFViewModal(props.row.paymentDocumentFile)">
                        <q-icon name="fas fa-file-pdf" color="primary" />
                        &nbsp;{{props.row.paymentDocumentFile}}
                      </div>
                    </div>
                    <div
                      v-else-if="props.row.paymentDocumentMimeType.includes('image')"
                      class="cursor-pointer"
                    >
                      <div @click="fnViewMultiAttachedFileImage(props.row)">
                        <viewer
                          :images="[GLOBAL_FILE_FETCH_URL+ '/'+props.row.paymentDocumentFile]"
                          class="hidden"
                        >
                          <img
                            :src="[GLOBAL_FILE_FETCH_URL+ '/'+props.row.paymentDocumentFile]"
                            ref="multiAttachedImageViewer"
                            style="max-width:100%"
                          />
                        </viewer>
                        <q-icon name="fas fa-image" color="amber-9" />
                        &nbsp;{{props.row.paymentDocumentFile}}
                      </div>
                    </div>
                    <div v-else>No document attached</div>
                  </div>
                </div>
                <div v-else-if="props.row.paymentOption == 3" class="text-left">Swipe</div>
                <div v-else-if="props.row.paymentOption == 1" class="text-left">NEFT</div>
                <div v-else class="text-left">NA</div>
              </q-td>
              <q-td>
                <div class="text-left q-caption text-grey-8 text-weight-medium">Payment Date</div>
                <div
                  class="text-left"
                  v-if="props.row.paymentMadeon == '' || props.row.paymentMadeon == null"
                >NA</div>
                <div class="text-left" v-else>{{ props.row.paymentMadeon | moment("Do MMM Y") }}</div>
              </q-td>
              <q-td>
                <div class="text-left q-caption text-grey-8 text-weight-medium">Payment Reference</div>
                <div
                  class="text-left"
                  v-if="props.row.referenceNumber == '' || props.row.referenceNumber == null"
                >NA</div>
                <div class="text-left" v-else>{{ props.row.referenceNumber }}</div>
              </q-td>
              <q-td colspan="2">
                <div
                  class="text-left q-caption text-grey-8 text-weight-medium"
                >Document Uploaded by SAT</div>
                <div
                  class="text-left"
                  v-if="fnShowCellIfBankSubvention(props.row.leadVerificationStatus)"
                >
                  <div
                    v-if="fnShowBankUploadedDocumentBySat(props.row.leadVerificationStatus)[0].mimeType.includes('pdf')"
                    class="cursor-pointer"
                  >
                    <div
                      @click="fnPDFViewModal(fnShowBankUploadedDocumentBySat(props.row.leadVerificationStatus)[0].bankAttachedFile)"
                    >
                      <q-icon name="fas fa-file-pdf" color="primary" />
                      &nbsp;{{fnShowBankUploadedDocumentBySat(props.row.leadVerificationStatus)[0].bankAttachedFile}}
                    </div>
                  </div>
                  <div
                    v-else-if="fnShowBankUploadedDocumentBySat(props.row.leadVerificationStatus)[0].mimeType.includes('image')"
                    class="cursor-pointer"
                  >
                    <div
                      @click="fnViewMultiAttachedFileImageUploadedBySat(fnShowBankUploadedDocumentBySat(props.row.leadVerificationStatus)[0])"
                    >
                      <viewer
                        :images="[GLOBAL_FILE_FETCH_URL+ '/'+fnShowBankUploadedDocumentBySat(props.row.leadVerificationStatus)[0].bankAttachedFile]"
                        class="hidden"
                      >
                        <img
                          :src="[GLOBAL_FILE_FETCH_URL+ '/'+fnShowBankUploadedDocumentBySat(props.row.leadVerificationStatus)[0].bankAttachedFile]"
                          ref="multiAttachedImageViewerUploadedBySAT"
                          style="max-width:100%"
                        />
                      </viewer>
                      <q-icon name="fas fa-image" color="amber-9" />
                      &nbsp;{{fnShowBankUploadedDocumentBySat(props.row.leadVerificationStatus)[0].bankAttachedFile}}
                    </div>
                  </div>
                  <div v-else>No document attached</div>
                </div>
                <div v-else>NA</div>
              </q-td>
            </q-tr>
            <!--END: table expand values -->
          </template>
          <!--END: Table body -->
          <!--START: table search, filter -->
          <template slot="top" slot-scope="props">
            <!--START: table search -->
            <div class="col-md-5">
              <q-search
                clearable
                color="grey-9"
                v-model="filter"
                placeholder="Type.."
                float-label="Search"
                class="q-mr-lg q-py-sm"
              />
            </div>
            <!--END: table search -->
          </template>
          <!--END: table search, filter -->
        </q-table>
      </q-pull-to-refresh>

      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />

      <!--START: Open Reject model -->
      <openRejectModelComp
        v-if="showRejectModel"
        :showRejectModel="showRejectModel"
        :propShowRejectComponent="propsRejectAppend"
        @reloadPaymentTrackerData="ajaxLoadAllPaymentTrackerInfo"
        @closeRejectModel="openRejectModel"
      ></openRejectModelComp>
      <!--END: Open Reject model -->
      <!-- START >> COMPONENT: View PDF  -->
      <showPdfModalComponent
        v-if="toggleshowPDFModal"
        :propToggleshowPDFModal="toggleshowPDFModal"
        :propPDFDetails="PDFDetails"
        @togglePDFModal="fnPDFViewModal"
      ></showPdfModalComponent>
      <!-- END >> COMPONENT: View PDF -->
    </div>
  </q-page>
</template>

<script>
import openRejectModelComp from "../../components/finance/openRejectModelComp.vue";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

import openChequeImageComp from "../../components/finance/openChequeImageComp.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "paymentVerificationTrackerModule",
  components: {
    openRejectModelComp,
    showPdfModalComponent,
    generalLeadInformation
  },
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      toggleshowPDFModal: false,
      PDFDetails: "",
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        rowsPerPage: 10
      },

      propsRejectAppend: [],
      // Open reject model
      showRejectModel: false,

      //showChequeImage
      showChequeImage: false,

      // To expand table rows
      filter: "",

      // Datatable data
      columns: [
        {
          name: "id",
          required: true,
          label: "Lead Number",
          align: "left",
          field: row => {
            return "# " + row.leadNumber;
          },
          sortable: true
        },
        {
          name: "createdBy",
          required: true,
          label: "SO Name",
          align: "left",
          field: row => {
            return row.createdBy.name;
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
          name: "leadAddress",
          required: true,
          label: "Address",
          align: "left",
          field: "leadAddress",
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
          name: "leadSource",
          required: true,
          label: "Lead Source/Bank Name",
          align: "left",
          field: "leadSource",
          sortable: true
        },
        {
          name: "device",
          required: true,
          label: "Device Type & Count",
          align: "left",
          field: "device",
          sortable: true
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "center",
          field: "action",
          sortable: true
        }
      ],
      loading: false,
      tableData: [],
      lazy: [],
      error: true,
      warning: false,
      filter_values: "",
      filter_options: [
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
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("Finance", ["getPaymentTrackerInfo"]),
    ...mapGetters("commonLoader", ["getToggleCommonLoader"])
  },
  mounted() {
    this.ajaxLoadAllPaymentTrackerInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  methods: {
    ...mapActions("Finance", [
      "FETCH_ALL_PAYMENT_TRACKER_DATA",
      "APPROVE_FINANCE_EXCEPTION",
      "REJECT_FINANCE_EXCEPTION"
    ]),

    //Function pull to refresh
    PullToRefresh(done) {
      this.ajaxLoadAllPaymentTrackerInfo({
        pagination: this.paginationControl,
        filter: this.filter
      });
    },

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    ajaxLoadAllPaymentTrackerInfo({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_ALL_PAYMENT_TRACKER_DATA({ pagination, filter })
        .then(response => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getPaymentTrackerInfo.totalElements;
          this.paginationControl.page = this.getPaymentTrackerInfo.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getPaymentTrackerInfo.content;

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();
        });
    },

    openRejectModel(exceptionDetails) {
      this.showRejectModel = !this.showRejectModel;
      this.propsRejectAppend = exceptionDetails;
    },

    openChequeImage(chequeImagevalue) {
      this.showChequeImage = !this.showChequeImage;
      this.chequeImagevalue = chequeImagevalue;
    },

    financeApproveSubmit(exceptionDetails) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to approve the lead?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing .."
          });
          let usersSelectSync = {
            leadInformation: {
              verifiedFinanceStatus: 1
            },
            leadVerificationStatus: {
              status: 1,
              fieldName: "Finance"
            },
            leadId: exceptionDetails
          };

          this.APPROVE_FINANCE_EXCEPTION(usersSelectSync)
            .then(() => {
              this.ajaxLoadAllPaymentTrackerInfo();
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully Approved!",
                icon: "thumb_up"
              });
            })
            .catch(error => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                icon: "thumb_down"
              });
            });
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down"
          });
        });
    },

    expandRowPlease(value) {},

    // Function to show PDF
    fnPDFViewModal(documentUrl) {
      console.log(documentUrl);
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    },

    fnViewMultiAttachedFileImage(attachedImageIndex) {
      this.$refs.multiAttachedImageViewer.click();
    },

    fnViewMultiAttachedFileImageUploadedBySat(attachedImageIndex) {
      this.$refs.multiAttachedImageViewerUploadedBySAT.click();
    },

    fnShowCellIfBankSubvention(rowDetails) {
      const self = this;
      const returnValue = _.filter(rowDetails, function(value) {
        return (
          value.verificationType === self.$VERIFICATION_TYPE_BANKSUBVENTION
        );
      });
      return returnValue.length > 0 ? true : false;
    },

    fnShowBankUploadedDocumentBySat(rowDetails) {
      const self = this;
      const returnValue = _.filter(rowDetails, function(value) {
        // console.log("value", value);
        return (
          value.verificationType === self.$VERIFICATION_TYPE_BANKSUBVENTION &&
          value.status
        );
      });
      return returnValue;
      // console.log("returnValue[0]", returnValue[0]);
      // return returnValue.length > 0 ? returnValue[0].bankAttachedFile : "NA";
    }
  }
};
</script>

<style>
.payment_verification_table i {
  transition: none !important;
}
/* .customTableClass .q-table tbody tr td {
  word-break: break-all;
} */
.q-table tbody td {
  word-wrap: break-word !important;
}
</style>
