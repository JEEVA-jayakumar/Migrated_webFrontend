<template>
  <div>
    <!-- START >> (Default) Merchant type  -->
    <q-item separator class="q-body-1">
      <q-item-main>
        <q-item-tile>
          <div class="q-body-1">
            Merchant type:
            <span class="text-weight-medium">{{merchantTypeSelection}}</span>
          </div>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <!-- END >> (Default) Merchant type  -->
    <div class="group">
      <!-- START >> (Mandatory) Application form  -->
      <q-list class="no-padding">
        <q-item separator class="q-body-1 text-dark bg-grey-4 text-weight-medium">
          <q-item-main>Application Form</q-item-main>
          <q-item-side>
            <label class="cursor-pointer text-white" style="background-color: #202c3f;">
              <span class="q-caption text-weight-light">Attach</span>
              <input
                type="file"
                name="file"
                @change="fnUploadApplicationForm($event,document)"
                accept=".png, .jpg, .pdf"
              >
            </label>
          </q-item-side>
        </q-item>
        <q-item separator class="q-body-1">
          <q-item-main>
            <div class="full-width">
              <div
                class="cursor-pointer"
                v-if="getShortLeadInfo.applicationFileMimeType.includes('pdf')"
              >
                <div @click="fnPDFViewModal(getShortLeadInfo.applicationFile)">
                  <q-btn round size="sm" icon="fas fa-file-pdf" color="primary"/>
                  &nbsp;{{getShortLeadInfo.applicationFile}}
                </div>
              </div>
              <div
                class="cursor-pointer"
                v-else-if="getShortLeadInfo.applicationFileMimeType.includes('image')"
              >
                <viewer
                  :images="[GLOBAL_FILE_FETCH_URL+ '/'+getShortLeadInfo.applicationFile]"
                  class="hidden"
                >
                  <img
                    :src="[GLOBAL_FILE_FETCH_URL+ '/'+getShortLeadInfo.applicationFile]"
                    ref="handedOverImageViewer"
                    style="max-width:100%"
                  >
                </viewer>
                <div @click="fnViewHandedOverFileImage()">
                  <q-icon name="fas fa-image" color="amber-9"/>
                  &nbsp;{{getShortLeadInfo.applicationFile}}
                </div>
              </div>
              <div v-else>Invalid document type/ No document available</div>
            </div>
          </q-item-main>
        </q-item>
      </q-list>
      <!-- END >> (Mandatory) Application form  -->
      <!-- START >> (Optional) payment document file == bank subvention  -->
      <q-list v-if="getShortLeadInfo.paymentDocumentFile != ''">
        <q-list-header class="bg-grey-4">Bank Letter</q-list-header>
        <q-item separator class="q-body-1">
          <q-item-main>
            <div class="full-width">
              <div
                class="cursor-pointer"
                v-if="getShortLeadInfo.paymentDocumentMimeType.includes('pdf')"
              >
                <div @click="fnPDFViewModal(getShortLeadInfo.paymentDocumentFile)">
                  <q-btn round size="sm" icon="fas fa-file-pdf" color="primary"/>
                  &nbsp;{{getShortLeadInfo.paymentDocumentFile}}
                </div>
              </div>
              <div
                class="cursor-pointer"
                v-else-if="getShortLeadInfo.paymentDocumentMimeType.includes('image')"
              >
                <viewer
                  :images="[GLOBAL_FILE_FETCH_URL+ '/'+getShortLeadInfo.paymentDocumentFile]"
                  class="hidden"
                >
                  <img
                    :src="[GLOBAL_FILE_FETCH_URL+ '/'+getShortLeadInfo.paymentDocumentFile]"
                    ref="bankUploadedLetter"
                    style="max-width:100%"
                  >
                </viewer>
                <div @click="fnViewbankUploadedLetterImage()">
                  <q-icon name="fas fa-image" color="amber-9"/>
                  &nbsp;{{getShortLeadInfo.paymentDocumentFile}}
                </div>
              </div>
              <div v-else>Invalid document type/ No document available</div>
            </div>
          </q-item-main>
        </q-item>
      </q-list>
      <!-- END >> (Mandatory) payment document file == bank subvention  -->
      <!-- START >> (Mandatory != kyc) Handover to SAT, document upload -->
      <!-- START >> For viewType => 0 -->
      <q-list
        separator
        class="no-padding"
        v-show="getShortLeadInfoDocumentTypes.hasOwnProperty('uploadedDocuments')"
        v-for="(singleDocument,singleDocumentIndex) in getShortLeadInfoDocumentTypes.uploadedDocuments.forSingleDocument"
        :key="singleDocumentIndex"
      >
        <q-list-header class="bg-grey-4">{{singleDocument.documentType}}</q-list-header>
        <div
          v-for="(document,documentIndex) in singleDocument.documents"
          :key="documentIndex"
          class
          style="border:1px solid #afafaf;margin:5px"
        >
          <q-item
            separator
            class="q-body-1 q-pa-sm text-dark text-weight-medium bottom-border"
            :class="[document.isKycChecked?'bg-amber-4':'']"
          >
            <q-item-side v-if="!document.reprocess && document.verifiedStatus != 1">
              <q-checkbox
                :disabled="computeAndToggleCheckboxForSingleDocument(document)"
                :class="[computeAndToggleCheckboxForSingleDocument(document)? 'no-pointer-events':'']"
                v-model="document.isKycChecked"
                color="dark"
                @input="fnCookKYCdocumentArr(document)"
              />
            </q-item-side>
            <q-item-main>{{document.subDocumentType}}</q-item-main>
            <q-item-side v-if="!document.reprocess && document.verifiedStatus != 1">
              <label
                class="cursor-pointer text-white"
                style="background-color: #202c3f;"
                @click="fnShowDisabledMessageForFileUpload(document,document.isKycChecked)"
              >
                <span class="q-caption text-weight-light">Attach</span>
                <input
                  type="file"
                  name="file"
                  :disabled="document.isKycChecked"
                  @change="fnVerificationDocumentUploadSingleUpload($event,document)"
                  accept=".png, .jpg, .pdf"
                >
              </label>
            </q-item-side>

            <!-- TODO -- START =>> Quick fix remove for proper buttons visibility -->
            <q-item-side v-if="!document.reprocess && document.verifiedStatus == 1">
              <span class="q-body-1 text-weight-medium text-positive">Approved</span>
            </q-item-side>
            <!-- TODO -- END  =>> Quick fix remove for proper buttons visibility -->
            <q-item-side
              v-if="document.reprocess && !computedGetSingleDocumentAccessForStatus(document)"
              right
            >
              <q-btn
                round
                size="xs"
                class="q-ma-xs"
                color="green"
                icon="fas fa-check"
                @click="fnDocumentApproveModal(document)"
              />
              <q-btn
                round
                size="xs"
                class="q-ma-xs"
                color="red"
                icon="fas fa-times"
                @click="fnDocumentRejectModal(document)"
              />
            </q-item-side>
            <q-item-side
              v-if="document.reprocess && computedGetSingleDocumentAccessForStatus(document)"
            >
              <span
                v-if="checkSumForDocumentVerificationStatus(document).documentVerifiedStatus == 1"
                class="q-body-1 text-weight-medium text-positive"
              >Approved</span>
              <span
                v-if="checkSumForDocumentVerificationStatus(document).documentVerifiedStatus == 3"
                class="q-body-1 text-weight-medium text-negative"
              >Rejected</span>
            </q-item-side>
          </q-item>
          <div
            v-show="displayAttachedFileIndex == document.documentType"
            v-for="
          (displayAttachedFile,displayAttachedFileIndex) in getShortLeadInfo.leadDocuments"
            :key="displayAttachedFileIndex"
          >
            <div
              v-show="attachedSubFile.subDocumentType == document.subDocumentType"
              v-for="
            attachedSubFile in displayAttachedFile"
              :key="attachedSubFile.id"
            >
              <q-item
                v-for="(filesAttachedEarlier,filesAttachedEarlierIndex) in attachedSubFile.uploadedDocuments"
                :key="filesAttachedEarlierIndex"
                class="q-body-1"
                separator
              >
                <q-item-main>
                  <q-item-tile class="q-body-1">
                    <div
                      class="cursor-pointer"
                      v-if="filesAttachedEarlier.mimeType.includes('pdf')"
                    >
                      <div @click="fnPDFViewModal(filesAttachedEarlier.fileName)" class="wrapWord">
                        <q-icon name="fas fa-file-pdf" color="negative"/>
                        &nbsp;{{filesAttachedEarlier.fileName}}
                      </div>
                    </div>
                    <div
                      class="cursor-pointer"
                      v-else-if="filesAttachedEarlier.mimeType.includes('image')"
                    >
                      <viewer
                        :images="[GLOBAL_FILE_FETCH_URL+ '/'+filesAttachedEarlier.fileName]"
                        class="hidden"
                      >
                        <img
                          :src="[GLOBAL_FILE_FETCH_URL+ '/'+filesAttachedEarlier.fileName]"
                          ref="attachedImageViewer"
                          style="max-width:100%"
                        >
                      </viewer>
                      <div
                        class="wrapWord"
                        @click="fnViewAttachedFileImage(filesAttachedEarlierIndex)"
                      >
                        <q-icon name="fas fa-image" color="amber-9"/>
                        &nbsp;{{filesAttachedEarlier.fileName}}
                      </div>
                    </div>
                  </q-item-tile>
                </q-item-main>
                <!-- <pre>{{attachedSubFile}}</pre> -->
                <q-item-side v-if="attachedSubFile.documentVerifiedStatus == 4">
                  <q-btn
                    size="xs"
                    icon="clear"
                    @click="fnDeleteAlreadyAttachedFile(filesAttachedEarlier)"
                    round
                    color="negative"
                    label="Remove"
                  />
                </q-item-side>
              </q-item>
              <q-item-separator/>
            </div>
          </div>
        </div>
      </q-list>
      <!-- END >> For viewType => 0 -->
      <!-- START >> For viewType => 1 -->
      <q-list
        class="no-padding"
        dense
        v-show="getShortLeadInfoDocumentTypes.hasOwnProperty('uploadedDocuments')"
        v-for="multipleDocument in getShortLeadInfoDocumentTypes.uploadedDocuments.forMutipleDocument"
        :key="multipleDocument.id"
      >
        <!-- <pre>{{multipleDocument}}</pre> -->
        <q-list-header
          class
          :class="[multipleDocument.isKycChecked?'text-dark bg-amber-4':'bg-grey-4']"
        >
          <div class="row items-center">
            <div class="col-auto" v-if="!multipleDocument.reprocess">
              <!-- <pre>{{computeAndToggleCheckbox(multipleDocument)}}</pre> -->
              <q-checkbox
                v-if="multipleDocument.verifiedStatus != 1"
                :disabled="computeAndToggleCheckbox(multipleDocument)"
                :class="[computeAndToggleCheckbox(multipleDocument)? 'no-pointer-events':'']"
                v-model="multipleDocument.isKycChecked"
                color="dark"
                @input="fnCookKYCdocumentArr(multipleDocument)"
                :label="multipleDocument.documentType"
              />
              <span v-else>{{multipleDocument.documentType}}</span>
            </div>
            <div class="col" v-if="multipleDocument.reprocess">
              <span class="col">{{multipleDocument.documentType}}</span>
            </div>
            <div
              class="col"
              v-if="!multipleDocument.reprocess && multipleDocument.verifiedStatus == 1"
              align="right"
            >
              <span class="q-body-1 text-weight-medium text-positive" right>Approved</span>
            </div>
            <div class="col-auto" v-if="multipleDocument.reprocess">
              <!-- <pre>{{getShortLeadInfo.leadDocuments[multipleDocument.documentType][0]}}</pre> -->
              <span v-if="computedGetAccess(multipleDocument)" right>
                <q-btn
                  round
                  size="xs"
                  class="q-mx-xs"
                  color="green"
                  icon="fas fa-check"
                  @click="fnDocumentApproveModal(getShortLeadInfo.leadDocuments[multipleDocument.documentType][0])"
                />
                <q-btn
                  round
                  size="xs"
                  class="q-mx-xs"
                  color="red"
                  icon="fas fa-times"
                  @click="fnDocumentRejectModal(getShortLeadInfo.leadDocuments[multipleDocument.documentType][0])"
                />
              </span>
              <span v-else right>
                <span
                  v-if="getShortLeadInfo.leadDocuments[multipleDocument.documentType][0].documentVerifiedStatus == 1"
                  class="q-body-1 text-weight-medium text-positive"
                >Approved</span>
                <span
                  v-if="getShortLeadInfo.leadDocuments[multipleDocument.documentType][0].documentVerifiedStatus == 3"
                  class="q-body-1 text-weight-medium text-negative"
                >Rejected</span>
              </span>
            </div>
          </div>
        </q-list-header>
        <!-- <pre>{{multipleDocument}}</pre> -->
        <div>
          <q-item separator class="q-body-1 q-pa-sm group">
            <q-item-main>
              <!-- <pre>{{multipleDocument.subDocumentTypeSelection}}</pre> -->
              <select
                :disabled="multipleDocument.isKycChecked || multipleDocument.reprocess || multipleDocument.verifiedStatus == 1"
                class="full-width customQuasarSelect"
                v-model="multipleDocument.subDocumentTypeSelection"
                @change="fnGetSubDocuments(multipleDocument.subDocumentTypeSelection)"
              >
                <option disabled value="0">Choose from below</option>
                <option
                  v-for="type in multipleDocument.documents"
                  :key="type.id"
                  :value="type"
                >{{type.subDocumentType}}</option>
              </select>
            </q-item-main>
            <!-- START >> Will be displayed if reprocess key => false -->
            <div v-if="!multipleDocument.reprocess && multipleDocument.verifiedStatus != 1">
              <q-item-side v-if="multipleDocument.isKycChecked? false : true">
                <label
                  class="cursor-pointer text-white"
                  style="background-color: #202c3f;"
                  @click="fnShowDisabledMessageForFileUpload(multipleDocument,multipleDocument.isKycChecked)"
                >
                  <span class="q-caption text-weight-light">Attach</span>
                  <input
                    type="file"
                    :disabled="multipleDocument.isKycChecked"
                    ref="subDocumentUpload"
                    @change="fnVerificationDocumentUpload($event,multipleDocument.subDocumentTypeSelection,multipleDocument)"
                    name="file"
                    accept=".png, .jpg, .pdf"
                  >
                </label>
              </q-item-side>
            </div>
            <!-- END >> Will be displayed if reprocess key => false -->
          </q-item>
        </div>
        <q-item-separator/>
        <div
          v-if="displayAttachedFileIndex == multipleDocument.documentType"
          v-for="
          (displayAttachedFile,displayAttachedFileIndex) in getShortLeadInfo.leadDocuments"
          :key="displayAttachedFileIndex"
        >
          <div v-for="
          attachedSubFile in displayAttachedFile" :key="attachedSubFile.id">
            <q-item
              v-for="(filesAttachedEarlier,filesAttachedEarlierIndex) in attachedSubFile.uploadedDocuments"
              :key="filesAttachedEarlierIndex"
              class="q-body-1"
              separator
              multiline
            >
              <q-item-main>
                <q-item-tile class="q-body-1">
                  <div class="cursor-pointer" v-if="filesAttachedEarlier.mimeType.includes('pdf')">
                    <div @click="fnPDFViewModal(filesAttachedEarlier.fileName)" class="wrapWord">
                      <q-icon name="fas fa-file-pdf" color="negative"/>
                      &nbsp;{{filesAttachedEarlier.fileName}}
                    </div>
                  </div>
                  <div
                    class="cursor-pointer"
                    v-else-if="filesAttachedEarlier.mimeType.includes('image')"
                  >
                    <viewer
                      :images="[GLOBAL_FILE_FETCH_URL+ '/'+filesAttachedEarlier.fileName]"
                      class="hidden"
                    >
                      <img
                        :src="[GLOBAL_FILE_FETCH_URL+ '/'+filesAttachedEarlier.fileName]"
                        ref="multiAttachedImageViewer"
                        style="max-width:100%"
                      >
                    </viewer>
                    <div
                      @click="fnViewMultiAttachedFileImage(filesAttachedEarlierIndex)"
                      class="wrapWord"
                    >
                      <q-icon name="fas fa-image" color="amber-9"/>
                      &nbsp;{{filesAttachedEarlier.fileName}}
                    </div>
                  </div>
                </q-item-tile>
              </q-item-main>
              <q-item-side v-if="attachedSubFile.documentVerifiedStatus == 4">
                <q-btn
                  size="xs"
                  icon="clear"
                  @click="fnDeleteAlreadyAttachedFile(filesAttachedEarlier)"
                  round
                  color="negative"
                  label="Remove"
                />
              </q-item-side>
              <!-- END >> Will be displayed if reprocess key => true -->
              <q-item-separator/>
            </q-item>
          </div>
        </div>
      </q-list>
      <!-- <pre>{{merchantDocumentIds}}</pre> -->
      <!-- END >> For viewType => 1 -->
    </div>
    <!-- END >> (Mandatory != kyc) Handover to SAT, document upload -->
    <!-- START >> COMPONENT: Document reject  -->
    <showDocumentLeadApproveComponent
      v-if="toggleLeadDocumentApproveModal"
      :propToggleDocumentApproveModal="toggleLeadDocumentApproveModal"
      :propDocumentDetails="documentApproveTempArr"
      @toggleDocumentModal="fnDocumentApproveModalAfterEmit"
    ></showDocumentLeadApproveComponent>
    <!-- END >> COMPONENT: Document approve -->
    <!-- START >> COMPONENT: Document reject  -->
    <showDocumentLeadRejectComponent
      v-if="toggleLeadDocumentRejectModal"
      :propToggleDocumentRejectModal="toggleLeadDocumentRejectModal"
      :propDocumentDetails="documentRejectTempArr"
      @toggleDocumentModal="fnDocumentRejectModalAfterEmit"
    ></showDocumentLeadRejectComponent>
    <!-- END >> COMPONENT: Document reject -->
    <!-- START >> COMPONENT: View PDF  -->
    <showPdfModalComponent
      v-if="toggleshowPDFModal"
      :propToggleshowPDFModal="toggleshowPDFModal"
      :propPDFDetails="PDFDetails"
      @togglePDFModal="fnPDFViewModal"
    ></showPdfModalComponent>
    <!-- END >> COMPONENT: View PDF -->
    <!-- START >> Inner loader for document section, since values are dynamic  -->
    <q-inner-loading :visible="toggleAjaxLoadFilter">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading>
    <!-- END >> Inner loader for document section, since values are dynamic  -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import showDocumentLeadApproveComponent from "../../components/sat/showDocumentLeadApproveComponent.vue";
import showDocumentLeadRejectComponent from "../../components/sat/showDocumentLeadRejectComponent.vue";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";

export default {
  props: ["propMerchantTypeFromSO"],

  components: {
    showPdfModalComponent,
    showDocumentLeadApproveComponent,
    showDocumentLeadRejectComponent
  },

  data() {
    return {
      toggleLeadDocumentApproveModal: false,
      toggleLeadDocumentRejectModal: false,

      merchantDocumentIds: [],
      toggleAjaxLoadFilter: false,
      PDFDetails: null,
      toggleshowPDFModal: false,
      formData: {
        shortLead: this.propMerchantTypeFromSO,
        documentType: []
      },
      merchantTypeSelection: this.propMerchantTypeFromSO.merchantType
        .merchantTypeName,
      subDocumentTypeSelection: 0
    };
  },
  computed: {
    ...mapGetters("commonLoader", ["getToggleCommonLoader"]),
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("SatLeadValidation", [
      "getShortLeadInfo",
      "getDeviceVerificationStatus",
      "getShortLeadInfoDocumentTypes"
    ])
  },

  created() {
    this.ajaxLoadShortLeadInfoForDocumentTypes();
  },
  methods: {
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    ...mapActions("SatLeadValidation", [
      "FEED_HAND_OVER_TO_SAT_DOCUMENT",
      "DELETE_DOCUMENT_FROM_BY_SAT",
      "FETCH_LEAD_DOCUMENT_TYPE_DATA",
      "FETCH_SHORT_LEAD_DATA"
    ]),

    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////

    // /* Function to get access for re processed approve or reject button to appear */
    // computedGetAccess() {
    //   return item => {
    //     if (
    //       this.getShortLeadInfo.leadDocuments.hasOwnProperty(
    //         item.documentType
    //       ) &&
    //       this.getShortLeadInfo.leadDocuments[item.documentType].documents[0]
    //         .documentVerifiedStatus == 2 &&
    //       this.getShortLeadInfo.leadDocuments[item.documentType].documents[0]
    //         .uploadedDocuments.length > 0
    //     ) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   };
    // },
    /* Function to get access for re processed approve or reject button to appear */
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////

    // computedGetSingleDocumentAccess() {
    //   return item => {
    //     console.log("findSubDocument", "item");
    //     let selectDocumentByDocumentType = this.getShortLeadInfo.leadDocuments[
    //       item.documentType
    //     ];
    //     let findSubDocument = _.find(
    //       selectDocumentByDocumentType.document,
    //       function(oo) {
    //         return oo.documentVerifiedStatus == 2 ? true : false;
    //       }
    //     );
    //     if (
    //       findSubDocument != undefined &&
    //       selectDocumentByDocumentType.findSubDocument.documentVerifiedStatus ==
    //         2 &&
    //       selectDocumentByDocumentType.findSubDocument.uploadedDocuments
    //         .length > 0
    //     ) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   };
    // },
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////

    // Function to load all document types
    ajaxLoadShortLeadInfoForDocumentTypes() {
      //function to load all lead details
      this.FETCH_LEAD_DOCUMENT_TYPE_DATA().then(response => {
        this.fnGetMerchantTypeValue(
          this.propMerchantTypeFromSO.merchantType.merchantTypeName
        );
        this.formData.documentType = this.getShortLeadInfoDocumentTypes;

        this.$emit(
          "emitAjaxLoadShortLeadInfo",
          "hotReloadForDocumentsUploadValidation",
          this.merchantTypeSelection
        );
      });
      this.toggleAjaxLoadFilter = false;
    },

    // Function to approve document with reason
    fnDocumentApproveModal(documentDetails) {
      // console.log("documentDetails >>>>>", documentDetails);
      this.toggleLeadDocumentApproveModal = !this
        .toggleLeadDocumentApproveModal;
      this.$set(documentDetails, "leadId", this.$route.params.id);
      this.documentApproveTempArr = documentDetails;
    },

    // Function to reject document with reason
    fnDocumentRejectModal(documentDetails) {
      this.toggleLeadDocumentRejectModal = !this.toggleLeadDocumentRejectModal;
      this.$set(documentDetails, "leadId", this.$route.params.id);
      this.documentRejectTempArr = documentDetails;
    },

    // Function to approve document with reason
    fnDocumentApproveModalAfterEmit(leadId) {
      this.toggleLeadDocumentApproveModal = !this
        .toggleLeadDocumentApproveModal;
      this.$emit("emitTriggerComponentHotLoad", leadId);
    },

    // Function to approve document with reason
    fnDocumentRejectModalAfterEmit(leadId) {
      this.toggleLeadDocumentRejectModal = !this.toggleLeadDocumentRejectModal;
      this.$emit("emitTriggerComponentHotLoad", leadId);
    },

    // Function to populate single/multiple documents
    fnGetMerchantTypeValue(inputValue) {
      this.TOGGLE_COMMON_LOADER(true);
      let merchantDocumentCategory = _.find(
        this.getShortLeadInfoDocumentTypes,
        o => o.merchantType === inputValue
      );
      let arr = {
        forSingleDocument: [],
        forMutipleDocument: []
      };
      let innerSelf = this;
      let leadDocuments = innerSelf.getShortLeadInfo.leadDocuments;
      // console.log("leadDocuments", leadDocuments);
      // Function to get all applicable documents from queue
      merchantDocumentCategory.documentsApplicable.map(function(value, index) {
        // Condition for single document type
        if (value.viewType == 1) {
          let assumeArr = [];
          value.documents.map(function(subValue, subIndex) {
            if (subValue.documentType in leadDocuments) {
              let assumeArrForChecksum = _.find(
                leadDocuments[value.documentType],
                function(oo) {
                  return oo.subDocumentType == subValue.subDocumentType;
                }
              );
              // console.log("value.documents", value.documents);

              //get verified status and place to the parent
              if (assumeArrForChecksum != undefined) {
                innerSelf.$set(
                  subValue,
                  "verifiedStatus",
                  assumeArrForChecksum.documentVerifiedStatus
                );
              }
              //get verified status and place to the parent

              /* Start >> Setting isKycChecked flag for kyc checkbox */
              if (
                assumeArrForChecksum != undefined &&
                (assumeArrForChecksum.documentVerifiedStatus == 1 ||
                  assumeArrForChecksum.documentVerifiedStatus == 2) &&
                assumeArrForChecksum.kycException == true
              ) {
                // console.log(">>>>>>>>", subValue);
                innerSelf.merchantDocumentIds.push(subValue.id);
                innerSelf.$set(subValue, "isKycChecked", true);
              } else {
                innerSelf.$set(subValue, "isKycChecked", false);
              }
              /* END >> Setting isKycChecked flag for kyc checkbox */

              /* START >> Setting reprocess flag for kyc checkbox */
              if (
                assumeArrForChecksum != undefined &&
                assumeArrForChecksum.reprocess == true
              ) {
                innerSelf.$set(subValue, "reprocess", true);
                innerSelf.$set(
                  subValue,
                  "currentDocumentId",
                  assumeArrForChecksum.id
                );
              } else {
                innerSelf.$set(subValue, "reprocess", false);
              }
              /* END >> Setting reprocess flag for kyc checkbox */
            } else {
              innerSelf.$set(subValue, "isKycChecked", false);
              innerSelf.$set(subValue, "reprocess", false);
            }
            assumeArr.push(subValue);
          });
          value.documents = assumeArr;
          arr.forSingleDocument.push(value);
        } else {
          // Condition for mulitple document type
          if (value.documentType in leadDocuments) {
            let assumeArr = _.find(value.documents, function(oo) {
              if (
                leadDocuments.hasOwnProperty(oo.documentType) &&
                (oo.subDocumentType ==
                  leadDocuments[oo.documentType][0].subDocumentType ||
                  leadDocuments[oo.documentType][0].documentType ==
                    leadDocuments[oo.documentType][0].subDocumentType)
              ) {
                return oo.documentType;
              }
            });

            //get verified status and place to the parent
            // console.log("assumeArr", value);

            /* START >>  Set reprocess flag dynamically */
            if (assumeArr != undefined) {
              //get verified status and place to the parent
              innerSelf.$set(
                value,
                "verifiedStatus",
                leadDocuments[assumeArr.documentType][0].documentVerifiedStatus
              );

              if (leadDocuments[assumeArr.documentType][0].reprocess == true) {
                innerSelf.$set(value, "reprocess", true);
              } else {
                innerSelf.$set(value, "reprocess", false);
              }

              /* END >>  Set reprocess flag dynamically */

              // console.log(" >>>>>>>> ------------", value);
              /* START >>  Set isKycChecked flag dynamically */
              if (
                leadDocuments[assumeArr.documentType][0].kycException == true
              ) {
                // console.log("value ??===", value);
                innerSelf.merchantDocumentIds.push(value.id);
                innerSelf.$set(value, "isKycChecked", true);
              } else {
                innerSelf.$set(value, "isKycChecked", false);
              }
              /* END >>  Set isKycChecked flag dynamically */
              // console.log("assumeArrSelectionOption", assumeArr);
              // console.log("assumeArrSelectionOption", assumeArr);
              innerSelf.$set(value, "subDocumentTypeSelection", assumeArr);
            } else {
              /* START >> Dropdown default value setup */
              innerSelf.$set(value, "subDocumentTypeSelection", 0);
              innerSelf.$set(value, "reprocess", false);
              innerSelf.$set(value, "isKycChecked", false);
              /* END >> Dropdown default value setup */
            }
          } else {
            innerSelf.$set(value, "subDocumentTypeSelection", 0);
            innerSelf.$set(value, "reprocess", false);
            innerSelf.$set(value, "isKycChecked", false);
          }

          arr.forMutipleDocument.push(value);
        }
      });
      this.$set(this.getShortLeadInfoDocumentTypes, "uploadedDocuments", arr);
      // console.log(
      //   "this.getShortLeadInfoDocumentTypes",
      //   this.getShortLeadInfoDocumentTypes
      // );
      this.$emit("emitCookUpKYCdocumentsId", this.merchantDocumentIds);
      this.TOGGLE_COMMON_LOADER(false);
    },

    // Function to populate sub document types
    fnGetSubDocuments(documentDetails) {
      if (typeof documentDetails !== "undefined") {
        if (
          documentDetails.hasOwnProperty("selectedSubDocumentType") &&
          typeof documentDetails.selectedSubDocumentType !== "undefined"
        ) {
          documentDetails.selectedSubDocumentType =
            documentDetails.subDocumentType;
        } else {
          this.$set(
            documentDetails,
            "selectedSubDocumentType",
            documentDetails.subDocumentType
          );
        }
      }
    },

    //TODO default 1 for sat document submission as url params
    fnVerificationDocumentUpload(event, documentDetails, multipleDocument) {
      if (documentDetails == 0) {
        this.$q.notify({
          color: "primary",
          position: "bottom",
          message:
            "Select a document type to upload documents for " +
            multipleDocument.documentType,
          icon: "info"
        });
        return;
      }
      this.TOGGLE_COMMON_LOADER(true);
      let formData = new FormData();
      formData.append("file", event.target.files[0]);

      let requestParams = {
        files: formData,
        leadId: this.$route.params.id,
        documentId: documentDetails.id
      };
      // Function to trigger => store API action
      this.FEED_HAND_OVER_TO_SAT_DOCUMENT(requestParams)
        .then(response => {
          this.TOGGLE_COMMON_LOADER(false);
          this.$emit(
            "emitAjaxLoadShortLeadInfo",
            "hotReloadForDocumentsUploadValidation",
            this.merchantTypeSelection
          );
        })
        .catch(error => {
          this.TOGGLE_COMMON_LOADER(false);
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Failed to upload document",
            icon: "thumb_down"
          });
        });
    },

    //TODO default 1 for sat document submission as url params
    fnUploadApplicationForm(event, documentDetails) {
      this.TOGGLE_COMMON_LOADER(true);
      let formData = new FormData();
      formData.append("file", event.target.files[0]);

      let requestParams = {
        files: formData,
        leadId: this.$route.params.id
      };

      this.FEED_FULL_APPLICATION_FORM(requestParams)
        .then(response => {
          this.TOGGLE_COMMON_LOADER(false);
          this.$emit(
            "emitAjaxLoadShortLeadInfo",
            "hotReloadForDocumentsUploadValidation",
            this.merchantTypeSelection
          );
        })
        .catch(error => {
          this.TOGGLE_COMMON_LOADER(false);
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Failed to upload document",
            icon: "thumb_down"
          });
        });
    },

    //TODO default 1 for sat document submission as url params
    fnVerificationDocumentUploadSingleUpload(event, documentDetails) {
      this.TOGGLE_COMMON_LOADER(true);
      let formData = new FormData();
      formData.append("file", event.target.files[0]);

      let requestParams = {
        files: formData,
        leadId: this.$route.params.id,
        documentId: documentDetails.id
      };
      this.FEED_HAND_OVER_TO_SAT_DOCUMENT(requestParams)
        .then(response => {
          this.TOGGLE_COMMON_LOADER(false);
          this.$emit(
            "emitAjaxLoadShortLeadInfo",
            "hotReloadForDocumentsUploadValidation",
            this.merchantTypeSelection
          );
        })
        .catch(error => {
          this.TOGGLE_COMMON_LOADER(false);
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Failed to upload document",
            icon: "thumb_down"
          });
        });
    },

    // Function to delete attached file with respective category
    fnDeleteAlreadyAttachedFile(documentDetails) {
      // console.log("documentDetails", documentDetails);
      // return;
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete uploaded document?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.DELETE_DOCUMENT_FROM_BY_SAT(documentDetails)
            .then(response => {
              this.FETCH_SHORT_LEAD_DATA(this.$route.params.id);
              this.$emit(
                "emitAjaxLoadShortLeadInfo",
                "hotReloadForDocumentsUploadValidation",
                this.merchantTypeSelection
              );
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully removed!",
                icon: "thumb_up"
              });
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bot  tom",
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

    // Function to enable file upload input
    // fnGetEntryPermissionToUploadSubDocuments(multipleDocument) {
    //   if (
    //     multipleDocument.hasOwnProperty("subDocumentTypeSelection") &&
    //     typeof multipleDocument.subDocumentTypeSelection !== "undefined" &&
    //     multipleDocument.subDocumentTypeSelection.hasOwnProperty(
    //       "selectedSubDocumentType"
    //     ) &&
    //     typeof multipleDocument.subDocumentTypeSelection
    //       .selectedSubDocumentType !== "undefined"
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },

    // Function to anbale or disable multiple category documentupload
    computeAndToggleCheckboxForSingleDocument(currentSelection) {
      if (
        this.getShortLeadInfo.leadDocuments.hasOwnProperty(
          currentSelection.documentType
        ) &&
        this.getShortLeadInfo.leadDocuments[currentSelection.documentType]
          .length > 1
      ) {
        return _.find(
          this.getShortLeadInfo.leadDocuments[currentSelection.documentType],
          function(oo) {
            return oo.uploadedDocuments.length > 0 &&
              oo.subDocumentType == currentSelection.subDocumentType
              ? true
              : false;
          }
        );
      } else {
        return this.getShortLeadInfo.leadDocuments.hasOwnProperty(
          currentSelection.documentType
        )
          ? this.getShortLeadInfo.leadDocuments[
              currentSelection.documentType
            ][0].uploadedDocuments.length > 0 &&
            this.getShortLeadInfo.leadDocuments[
              currentSelection.documentType
            ][0].subDocumentType == currentSelection.subDocumentType
            ? true
            : false
          : false;
      }
    },
    // Function to anbale or disable multiple category documentupload
    computeAndToggleCheckbox(currentSelection) {
      return this.getShortLeadInfo.leadDocuments.hasOwnProperty(
        currentSelection.documentType
      )
        ? this.getShortLeadInfo.leadDocuments[currentSelection.documentType][0]
            .uploadedDocuments.length > 0 &&
          this.getShortLeadInfo.leadDocuments[currentSelection.documentType][0]
            .subDocumentType ==
            currentSelection.subDocumentTypeSelection.subDocumentType
          ? true
          : false
        : false;
    },

    // Function to cook up KYC document array
    fnCookKYCdocumentArr(document) {
      let findIndex = this.merchantDocumentIds.indexOf(document.id);
      if (findIndex == -1) {
        this.merchantDocumentIds.push(document.id);
      } else {
        this.merchantDocumentIds.splice(findIndex, 1);
      }
      this.$emit("emitCookUpKYCdocumentsId", this.merchantDocumentIds);
    },

    // Function to view handed over file
    fnViewHandedOverFileImage() {
      this.$refs.handedOverImageViewer.click();
    },

    //Function to open bank letter
    fnViewHandedOverFileImage() {
      this.$refs.handedOverImageViewer.click();
    },

    // Function to view attached file
    fnViewAttachedFileImage(attachedImageIndex) {
      this.$refs.attachedImageViewer[attachedImageIndex].click();
    },

    // Function to view multiple attached document
    fnViewMultiAttachedFileImage(attachedImageIndex) {
      this.$refs.multiAttachedImageViewer[attachedImageIndex].click();
    },

    // Function to show PDF
    fnPDFViewModal(documentUrl) {
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    },

    //Function to show disabled message for fileupload
    fnShowDisabledMessageForFileUpload(singleDocument, item) {
      if (item) {
        if (singleDocument.viewType == 1) {
          this.$q.notify({
            color: "primary",
            position: "bottom",
            message: singleDocument.subDocumentType + " is marked as KYC.",
            icon: "info"
          });
        } else {
          this.$q.notify({
            color: "primary",
            position: "bottom",
            message: singleDocument.documentType + " is marked as KYC.",
            icon: "info"
          });
        }
      }
    },

    computedGetSingleDocumentAccess(item) {
      let valueToBeReturned;
      let selectDocumentByDocumentType = this.getShortLeadInfo.leadDocuments[
        item.documentType
      ];
      let findSubDocument = _.find(selectDocumentByDocumentType, function(oo) {
        return oo.documentVerifiedStatus == 2 ? true : false;
      });
      if (
        findSubDocument != undefined &&
        findSubDocument.uploadedDocuments.length > 0
      ) {
        valueToBeReturned = true;
      } else {
        valueToBeReturned = false;
      }
      return valueToBeReturned;
    },

    computedGetSingleDocumentAccessForStatus(item) {
      let valueToBeReturned;
      let selectDocumentByDocumentType = this.getShortLeadInfo.leadDocuments[
        item.documentType
      ];
      let findSubDocument = _.find(selectDocumentByDocumentType, function(oo) {
        return (
          oo.subDocumentType == item.subDocumentType &&
          (oo.documentVerifiedStatus == 1 || oo.documentVerifiedStatus == 3)
        );
      });
      if (
        findSubDocument != undefined &&
        findSubDocument.uploadedDocuments.length > 0
      ) {
        valueToBeReturned = true;
      } else {
        valueToBeReturned = false;
      }
      return valueToBeReturned;
    },

    /* Function to get access for re processed approve or reject button to appear */
    computedGetAccess(item) {
      if (
        this.getShortLeadInfo.leadDocuments.hasOwnProperty(item.documentType) &&
        this.getShortLeadInfo.leadDocuments[item.documentType][0]
          .documentVerifiedStatus == 2 &&
        this.getShortLeadInfo.leadDocuments[item.documentType][0]
          .uploadedDocuments.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },

    /* Function to get document verification status */
    checkSumForDocumentVerificationStatus(documentDetails) {
      return _.find(
        this.getShortLeadInfo.leadDocuments[documentDetails.documentType],
        function(oo) {
          return oo.subDocumentType == documentDetails.subDocumentType;
        }
      );
    }
  }
};
</script>

<style>
.customQuasarSelect {
  padding: 5px;
  border: 1px solid rgb(140, 140, 140);
}

label {
  padding: 5px 10px;
  display: table;
}

input[type="file"] {
  display: none;
}
.bg-dark-custom {
  background: rgba(0, 0, 0, 0.5);
}
</style>