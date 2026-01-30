<template>
  <q-page>
    <div>
      <q-pull-to-refresh :handler="PullToRefresh" inline>
        <!--START: table title -->
        <div
          class="col-md-12 capitalize q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
        >Finance</div>
        <q-tabs v-model="activeTab" class="shadow-1" color="grey-1" @select="goToQrMerchant">
          <q-tab default color="dark" name="tab-1" slot="title" label="Pos Merchant" />
        <q-tab color="dark" name="tab-2" slot="title" label="QR Merchant" />
     

        <!--END: table title -->
        <!-- table payment verification tracker -->
        <q-tab-pane name="tab-1">
        <q-table
          table-class="customTableClass"
          :data="tableData"
          :columns="columns"
          :filter="filter"
          row-key="field"
          color="grey-9"
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
              <q-td key="leadInformation.leadNumber" :props="props">
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
              <q-td key="assignedTo.name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="leadInformation.leadName" :props="props">{{ props.row.leadName }}</q-td>
              <q-td key="leadInformation.leadAddress" :props="props">{{props.row.leadAddress }}</q-td>
              <q-td key="state" :props="props">{{ props.row.state }}</q-td>
              <q-td key="leadSource.sourceName" :props="props">{{props.row.leadSource}}</q-td>
              <q-td
                key="deviceCount"
                :props="props"
              >{{ props.row.deviceCount }}-{{ props.row.deviceName }}</q-td>

              <q-td key="action" :props="props">
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
                  @click="financeApproveSubmit(props.row.leadId)"
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
                  v-if="props.row.planName == '' || props.row.planName == null"
                >NA</div>
                <div class="text-left" v-else>{{ props.row.planName }}</div>
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
                  <div v-else-if="props.row.paymentOption == 4" class="text-left">UPI LINK</div>
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
              <q-td>
                <div class="text-left q-caption text-grey-8 text-weight-medium">Ref.No Count</div>
                <div
                  class="text-left"
                  v-if="props.row.referenceNumbercount == '' || props.row.referenceNumbercount == null"
                >
                  <q-chip square color="purple">NA</q-chip>
                </div>
                <div class="text-left" v-else>
                  <q-chip square color="purple">{{ props.row.referenceNumbercount }}</q-chip>
                </div>
              </q-td>
              <q-td colspan="2">
                <div
                  class="text-left q-caption text-grey-8 text-weight-medium"
                >Document Uploaded by SAT</div>
                <div
                  class="text-left"
                  v-if="props.row.leadVerificationStatusMimeType != '' && props.row.leadVerificationStatusMimeType != null"
                >
                  <div
                    v-if="props.row.leadVerificationStatusMimeType.includes('pdf')"
                    class="cursor-pointer"
                  >
                    <div @click="fnPDFViewModal(props.row.leadVerificationStatusBankAttachedFile)">
                      <q-icon name="fas fa-file-pdf" color="primary" />
                      &nbsp;{{props.row.leadVerificationStatusBankAttachedFile}}
                    </div>
                  </div>
                  <div
                    v-else-if="props.row.leadVerificationStatusMimeType.includes('image')"
                    class="cursor-pointer"
                  >
                    <div
                      @click="fnViewMultiAttachedFileImageUploadedBySat(props.row.leadVerificationStatusBankAttachedFile)"
                    >
                      <viewer
                        :images="[GLOBAL_FILE_FETCH_URL+ '/'+props.row.leadVerificationStatusBankAttachedFile]"
                        class="hidden"
                      >
                        <img
                          :src="[GLOBAL_FILE_FETCH_URL+ '/'+props.row.leadVerificationStatusBankAttachedFile]"
                          ref="multiAttachedImageViewerUploadedBySAT"
                          style="max-width:100%"
                        />
                      </viewer>
                      <q-icon name="fas fa-image" color="amber-9" />
                      &nbsp;{{props.row.leadVerificationStatusBankAttachedFile}}
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
          <template slot="top" >
            <!--START: table search -->
            <div class="col-md-5">
              <q-search
                clearable
                color="grey-9"
                v-model="filter"
                placeholder="Type.."
                float-label="Search .. "
                class="q-mr-lg q-py-sm"
              />
            </div>
            <!--END: table search -->
            <!--START: table filter dropdown -->
            <div class="col-md-3"></div>
            <!--END: table filter dropdown -->
          </template>
          <!--END: table search, filter -->
        </q-table>
      </q-tab-pane>
      <q-tab-pane name="tab-2">
        <q-table
          table-class="customTableClass"
          :data="tableData1"
          :columns="columns1"
          :filter="filter1"
          row-key="field"
          color="grey-9"
          :pagination.sync="paginationControl1"
          :rows-per-page-options="[5,10,15,20]"
          @request="ajaxLoadAllPaymentTrackerInfo1"
          table-style="word-break: break-all"
          class="payment_verification_table capitalize"
        >
          <!--START: table header -->
          <q-tr slot="top-row" slot-scope="props">
            <q-th v-for="col in props.columns1" :key="col.name" :props="props">{{ col.label }}</q-th>
          </q-tr>
          <!--END: table header -->
          <!--START: Table body -->
          <template slot="body" slot-scope="props">
            <!--START: table rows -->
            <q-tr :props="props" class="bottom-border">
              <!--START: table expand button :Checkbox -->
              <q-td key="qrLeadNumber" :props="props">
                <q-checkbox
                  color="grey-9"
                  v-model="props.row.expand"
                  checked-icon="fas fa-chevron-up"
                  unchecked-icon="fas fa-chevron-down"
                  class="q-mr-md"
                  @input="expandQrRowPlease(props.row)"
                />
                <span
                  class="cursor-pointer"
                  :class="[props.row.priority?'text-negative text-weight-bolder':'text-primary']"
                  @click.prevent="toggleQrLeadInformation(props.row)"
                ># {{ props.row.qrLeadNumber }}</span>
              </q-td>
              <!--END: table expand button :Checkbox -->
              <!--START: table other data -->
              <q-td key="createdBy.name" :props="props">{{ props.row.createdBy.name }}</q-td>
              <q-td key="leadInformation.marketingName" :props="props">{{ props.row.marketingName }}</q-td>
              <q-td key="leadInformation.contactAddress" :props="props">{{props.row.contactAddress }}</q-td>
              <q-td key="state" :props="props">{{ props.row.state }}</q-td>
              <q-td key="leadSource.sourceName" :props="props">{{props.row.leadSource.sourceName}}</q-td>
              <q-td
                key="deviceCount"
                :props="props"
              >{{ props.row.device == null   ? "NA" :props.row.device.deviceName }}</q-td>

              <q-td key="action" :props="props">
                <q-btn
                  highlight
                  push
                  outline
                  class="q-mx-sm"
                  color="negative"
                  @click="openQrRejectModel(props.row)"
                  size="sm"
                >Reject</q-btn>
                <q-btn
                  highlight
                  push
                  outline
                  class="q-mx-sm"
                  color="purple-9"
                  size="sm"
                  @click="qrFinanceApproveSubmit(props.row.id)"
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
                  v-if="props.row.plan == '' || props.row.plan == null"
                >NA</div>
                <div class="text-left" v-else>{{ props.row.plan.planName }}</div>
              </q-td>
              <!-- <q-td>
                <div class="text-left q-caption text-grey-8 text-weight-medium">Amount Collected</div>
                <div class="text-left" v-if="props.row.amountCollected == null">NA</div>
                <div class="text-left" v-else>{{ props.row.amountCollected }}</div>
              </q-td> -->
              <q-td>
                <div class="text-left q-caption text-grey-8 text-weight-medium">Payment Type</div>
                <div v-if="props.row.neftId == '' || props.row.neftId == null " class="text-left">
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
                      <div @click="fnViewMultiAttachedQrFile()">
                        <viewer
                          :img="[GLOBAL_FILE_FETCH_URL+ '/'+ props.row.paymentDocumentFile]">
                          <img 
                          :src="[GLOBAL_FILE_FETCH_URL+ '/'+  props.row.paymentDocumentFile]" 
                          ref="handedOverImageViewerCheque"
                          style="max-width: 15%"
                          />
                        </viewer>
                        <div
                            @click="fnViewHandedOverFileImageCheque()"
                            class="ellipsis"
                          >
                        <q-icon name="fas fa-image" color="amber-9" />
                        &nbsp;{{props.row.paymentDocumentFile}}
                        </div>
                      </div>
                    </div>
                    <div v-else>No document attached</div>
                  </div>
                </div>
                <div v-else-if="props.row.paymentDocumentMimeType == null ||props.row.paymentDocumentMimeType== '' " class="text-left">NEFT</div>
             
                <div v-else class="text-left">NA</div>
              </q-td>
              <!-- <q-td>
                <div class="text-left q-caption text-grey-8 text-weight-medium">Payment Date</div>
                <div
                  class="text-left"
                  v-if="props.row.paymentMadeon == '' || props.row.paymentMadeon == null"
                >NA</div>
                <div class="text-left" v-else>{{ props.row.paymentMadeon | moment("Do MMM Y") }}</div>
              </q-td> -->
              <q-td>
                <div class="text-left q-caption text-grey-8 text-weight-medium">Payment Reference</div>
                <div
                  class="text-left"
                  v-if="(props.row.chequeNumber == '' || props.row.chequeNumber == null) && (props.row.neftId == '' || props.row.neftId == null)"
                >NA</div>
                <div class="text-left" v-else>{{( (props.row.chequeNumber != null || props.row.chequeNumber != '')? props.row.chequeNumber :props.row.neftId ) || ((props.row.neftId != null ||props.row.neftId != '')? props.row.neftId :props.row.chequeNumber ) }}</div>
              </q-td>
              <!-- <q-td>
                <div class="text-left q-caption text-grey-8 text-weight-medium">Ref.No Count</div>
                <div
                  class="text-left"
                  v-if="props.row.referenceNumbercount == '' || props.row.referenceNumbercount == null"
                >
                  <q-chip square color="purple">NA</q-chip>
                </div>
                <div class="text-left" v-else>
                  <q-chip square color="purple">{{ props.row.referenceNumbercount }}</q-chip>
                </div>
              </q-td> -->
              <!-- <q-td colspan="2">
                <div
                  class="text-left q-caption text-grey-8 text-weight-medium"
                >Document Uploaded by SAT</div>
                <div
                  class="text-left"
                  v-if="props.row.leadVerificationStatusMimeType != '' && props.row.leadVerificationStatusMimeType != null"
                >
                  <div
                    v-if="props.row.leadVerificationStatusMimeType.includes('pdf')"
                    class="cursor-pointer"
                  >
                    <div @click="fnPDFViewModal(props.row.leadVerificationStatusBankAttachedFile)">
                      <q-icon name="fas fa-file-pdf" color="primary" />
                      &nbsp;{{props.row.leadVerificationStatusBankAttachedFile}}
                    </div>
                  </div>
                  <div
                    v-else-if="props.row.leadVerificationStatusMimeType.includes('image')"
                    class="cursor-pointer"
                  >
                    <div
                      @click="fnViewMultiAttachedFileImageUploadedBySat(props.row.leadVerificationStatusBankAttachedFile)"
                    >
                      <viewer
                        :images="[GLOBAL_FILE_FETCH_URL+ '/'+props.row.leadVerificationStatusBankAttachedFile]"
                        class="hidden"
                      >
                        <img
                          :src="[GLOBAL_FILE_FETCH_URL+ '/'+props.row.leadVerificationStatusBankAttachedFile]"
                          ref="multiAttachedImageViewerUploadedBySAT"
                          style="max-width:100%"
                        />
                      </viewer>
                      <q-icon name="fas fa-image" color="amber-9" />
                      &nbsp;{{props.row.leadVerificationStatusBankAttachedFile}}
                    </div>
                  </div>
                  <div v-else>No document attached</div>
                </div>
                <div v-else>NA</div>
              </q-td> -->
            </q-tr>
            <!--END: table expand values -->
          </template>
          <!--END: Table body -->
          <!--START: table search, filter -->
          <template slot="top" >
            <!--START: table search -->
            <div class="col-md-5">
              <q-search
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
          </template>
          <!--END: table search, filter -->
        </q-table>
      </q-tab-pane>
    </q-tabs>
      </q-pull-to-refresh>
     
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
      <!--START: Open Reject model -->
      <openRejectModelComp
        v-if="showRejectModel"
        :showRejectModel="showRejectModel"
        :propShowRejectComponent="propsRejectAppend"
        @reloadPaymentTrackerData="ajaxLoadAllPaymentTrackerInfo({ pagination: paginationControl,filter: filter })"
        @closeRejectModel="openRejectModel"
      ></openRejectModelComp>
      <!--END: Open Reject model -->

      <openQrRejectModelComp
        v-if="showQrRejectModel"
        :showQrRejectModel="showQrRejectModel"
        :propShowQrRejectComponent="propsQRRejectAppend"
        @reloadQrPaymentTrackerData="ajaxLoadAllPaymentTrackerInfo1({ pagination: paginationControl1,filter: filter1 })"
        @closeQrRejectModel="openQrRejectModel"
      ></openQrRejectModelComp>

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
import openQrRejectModelComp from "../../components/finance/openQrRejectModelComp.vue";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";
import generalQrLeadInformation from "../../components/generalQrLeadInformation.vue";
import openChequeImageComp from "../../components/finance/openChequeImageComp.vue";
import { mapGetters, mapActions } from "vuex";
import { ref, computed } from "vue";
export default {
  name: "paymentVerificationTrackerModule",
  components: {
    openRejectModelComp,
    openQrRejectModelComp,
    showPdfModalComponent,
    generalLeadInformation,
    generalQrLeadInformation
  },
  data() {
    return {
      propToggleLeadInformation: false,
      propToggleQrLeadInformation: false,
      addtnLeadInformation: null,
      addQrLeadInformation: null,
      toggleshowPDFModal: false,
      PDFDetails: "",
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "leadNumber",
        descending: false,
        rowsPerPage: 10
      },
      paginationControl1: {
        rowsNumber: 10,
        page: 1,
        sortBy: "qrLeadNumber",
        descending: false,
        rowsPerPage: 10
      },
      propsRejectAppend: [],
      propsQRRejectAppend: [],
      // Open reject model
      showRejectModel: false,
      showQrRejectModel: false,
      //showChequeImage
      showChequeImage: false,

      // To expand table rows
      filter: "",
      filter1: "",

      // Datatable data
      columns: [
        {
          name: "leadInformation.leadNumber",
          required: true,
          label: "Lead Number",
          align: "left",
          field: row => {
            return "# " + row.leadNumber;
          },
          sortable: true
        },
        {
          name: "assignedTo.name",
          required: true,
          label: "SO Name",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "leadInformation.leadName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "leadName",
          sortable: true
        },
        {
          name: "leadInformation.leadAddress",
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
          name: "leadSource.sourceName",
          required: true,
          label: "Lead Source/Bank Name",
          align: "left",
          field: "leadSource",
          sortable: true
        },
        {
          name: "deviceCount",
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
          sortable: false
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
          name: "createdBy.name",
          required: true,
          label: "SO Name",
          align: "left",
          field: "name",
          sortable: false
        },
        {
          name: "leadInformation.marketingName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "marketingName",
          sortable: false
        },
        {
          name: "leadInformation.contactAddress",
          required: true,
          label: "Address",
          align: "left",
          field: "contactAddress",
          sortable: false
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
          name: "leadSource.sourceName",
          required: true,
          label: "Lead Source/Bank Name",
          align: "left",
          field: "sourceName",
          sortable: false
        },
        {
          name: "deviceCount",
          required: true,
          label: "Device Type",
          align: "left",
          field: "DeviceName",
          sortable: false
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "center",
          field: "action",
          sortable: false
        }
      ],
      tableData: [],
      tableData1: []
    };
  },
  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("Finance", ["getPaymentTrackerInfo"]),
    ...mapGetters("commonLoader", ["getToggleCommonLoader"]),
    ...mapGetters("qrFinance", ["getstaticQrPaymentTrackerData"]),
  },

  mounted() {
    this.ajaxLoadAllPaymentTrackerInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
    this.ajaxLoadAllPaymentTrackerInfo1({
      pagination: this.paginationControl1,
      filter: this.filter1
    });
  },
  methods: {
    ...mapActions("Finance", [
      "FETCH_ALL_PAYMENT_TRACKER_DATA",
      "APPROVE_FINANCE_EXCEPTION",
      "REJECT_FINANCE_EXCEPTION"
    ]),
    ...mapActions("qrFinance", [
      "FETCH_ALL_QR_PAYMENT_TRACKER_DATA",
      "QR_APPROVE_FINANCE_EXCEPTION",
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    //Function pull to refresh
    PullToRefresh(done) {
      done();
    },
    goToQrMerchant(tab) {
            if (tab == "tab-2") {
                this.ajaxLoadAllPaymentTrackerInfo1({
                    pagination: this.paginationControl1,
                    filter: this.filter1
                });
            } else {
                this.ajaxLoadAllPaymentTrackerInfo({
                    pagination: this.paginationControl,
                    filter: this.filter
                });
            }
        },
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

    ajaxLoadAllPaymentTrackerInfo({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_ALL_PAYMENT_TRACKER_DATA({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getPaymentTrackerInfo.totalElements;
          this.paginationControl.page = this.getPaymentTrackerInfo.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getPaymentTrackerInfo.content;
          if (this.getPaymentTrackerInfo.sort != null) {
            this.paginationControl.sortBy = this.getPaymentTrackerInfo.sort[0].property;
            this.paginationControl.descending = this.getPaymentTrackerInfo.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(err => {
          console.log(err);
          this.$q.loading.hide();
        });
    },
    ajaxLoadAllPaymentTrackerInfo1({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9", 
        message: "Fetching data .."
      });
      this.FETCH_ALL_QR_PAYMENT_TRACKER_DATA({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getstaticQrPaymentTrackerData.totalElements;
          this.paginationControl1.page = this.getstaticQrPaymentTrackerData.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 = this.getstaticQrPaymentTrackerData.content;
          console.log("TABLE DATA 1",JSON.stringify( this.tableData1));
          if (this.getstaticQrPaymentTrackerData.sort != null) {
            this.paginationControl1.sortBy = this.getstaticQrPaymentTrackerData.sort[0].property;
            this.paginationControl1.descending = this.getstaticQrPaymentTrackerData.sort[0].ascending;
          }
           // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(err => {
          console.log(err);
          this.$q.loading.hide();
        });
    },
    openRejectModel(exceptionDetails) {
      this.showRejectModel = !this.showRejectModel;
      this.propsRejectAppend = exceptionDetails;
    },
    openQrRejectModel(exceptionDetails) {
      this.showQrRejectModel = !this.showQrRejectModel;
      this.propsQRRejectAppend = exceptionDetails;
    },

    openChequeImage(chequeImagevalue) {
      this.showChequeImage = !this.showChequeImage;
      this.chequeImagevalue = chequeImagevalue;
    },
    fnViewHandedOverFileImageCheque() {
      this.$refs.handedOverImageViewerCheque.click();
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
              this.ajaxLoadAllPaymentTrackerInfo({
                pagination: this.paginationControl,
                filter: this.filter
              });
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
      this.TOGGLE_COMMON_LOADER(false);
    },
    qrFinanceApproveSubmit(exceptionDetails) {
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
          let qrUsersSelectSync = {
            qrLeadInformation: {
              verifiedFinanceStatus: 1
            },
            qrLeadVerificationStatus: {
              status: 1,
              fieldName: "Finance"
            },
            leadId: exceptionDetails
          };

          this.QR_APPROVE_FINANCE_EXCEPTION(qrUsersSelectSync)
            .then(() => {
              this.ajaxLoadAllPaymentTrackerInfo1({
                pagination: this.paginationControl1,
                filter: this.filter1
              });
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
      this.TOGGLE_COMMON_LOADER(false);
    },
    expandRowPlease(value) {},
    expandQrRowPlease(data){},
    // Function to show PDF
    fnPDFViewModal(documentUrl) {
      console.log(documentUrl);
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    },

    fnViewMultiAttachedFileImage(attachedImageIndex) {
      this.$refs.multiAttachedImageViewer.click();
    },
    
    fnViewMultiAttachedQrFile(attachedImageIndex) {
      this.$refs.multiAttachedQrImageViewer;
      console.log("attachedImageIndex--",  attachedImageIndex);
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
