<template>
  <div>
    <q-list no-border class="no-padding">
      <!-- START >> (Mandatory) Application form  -->
      <q-item separator class="q-body-1 text-dark bg-grey-4 text-weight-medium">
        <q-item-main>Application Form</q-item-main>
      </q-item>
      <q-item separator class="q-body-1">
        <q-item-main>
          <div class="full-width">
            <!-- START >>If document type is PDF format -->
            <div
              class="cursor-pointer"
              v-if="propGetShortInfo.applicationFileMimeType.includes('pdf')"
            >
              <div @click="fnPDFViewModal(propGetShortInfo.applicationFile)">
                <q-btn round size="sm" icon="fas fa-file-pdf" color="primary"/>
                &nbsp;{{propGetShortInfo.applicationFile}}
              </div>
            </div>
            <!-- END >>If document type is PDF format -->
            <!-- START >>If document type is image format -->
            <div
              class="cursor-pointer"
              v-else-if="propGetShortInfo.applicationFileMimeType.includes('image')"
            >
              <viewer
                :images="[GLOBAL_FILE_FETCH_URL+ '/'+propGetShortInfo.applicationFile]"
                class="hidden"
              >
                <img
                  :src="[GLOBAL_FILE_FETCH_URL+ '/'+propGetShortInfo.applicationFile]"
                  ref="handedOverImageViewer"
                  style="max-width:100%"
                >
              </viewer>
              <div @click="fnViewHandedOverFileImage()" class="ellipsis">
                <q-icon name="fas fa-image" color="amber-9"/>
                &nbsp;{{propGetShortInfo.applicationFile}}
              </div>
            </div>
            <!-- END >>If document type is image format -->
            <!-- START >>If document type is not image/pdf format -->
            <div v-else>Invalid document type/ No document available</div>
            <!-- END >>If document type is not image/pdf format -->
          </div>
        </q-item-main>
      </q-item>
      <!-- END >> (Mandatory) Application form  -->
      <!-- START >>Loop through cooked(in store) array for documents -->
      <!-- START >> (Not Mandatory) Other attached documents  -->
      <q-item class="no-padding" v-if="Object.keys(propLeadDocumentInformation).length > 0">
        <q-item-main>
          <!-- {{propLeadDocumentInformation}} -->
          <div v-for="(documents,index) in propLeadDocumentInformation" :key="index">
            <!-- START >> View type is 0, direct documents  will be visible -->
            <div
              class="row items-center full-width"
              v-if="index.toString()==documents[0].subDocumentType"
            >
              <div class="col-md-12 q-body-1">
                <q-collapsible separator opened multiline class="full-width">
                  <template slot="header">
                    <q-item-side
                      :color="documents[0].kycException?'amber-9':''"
                      :icon="documents[0].kycException? 'warning' :'attach_file'"
                    />
                    <q-item-main
                      class="q-body-1"
                      :sublabel="documents[0].uploadedDocuments.length + 'Document(s)'"
                      :label="index"
                    />
                    <q-item-side v-if="[2,4].includes(documents[0].documentVerifiedStatus)" right>
                      <q-btn
                        round
                        size="xs"
                        class="q-ma-xs"
                        color="green"
                        icon="fas fa-check"
                        @click.stop="fnDocumentApproveModal(documents[0])"
                      />
                      <q-btn
                        round
                        size="xs"
                        class="q-ma-xs"
                        color="red"
                        icon="fas fa-times"
                        @click.stop="fnDocumentRejectModal(documents[0])"
                      />
                      <q-btn
                        round
                        size="xs"
                        class="q-ma-xs"
                        color="primary"
                        icon="fas fa-plus"
                        @click.stop="fileUploadForUsingMerchantId(documents[0].merchantDocumentType)"
                      />
                    </q-item-side>
                    <q-item-side v-else right>
                      <span
                        v-if="documents[0].documentVerifiedStatus == 1"
                        class="q-body-1 text-weight-medium text-positive"
                      >Approved</span>
                      <span
                        v-if="documents[0].documentVerifiedStatus == 3"
                        class="q-body-1 text-weight-medium text-negative"
                      >Rejected</span>
                      <div v-if="propGetShortInfo.leadStatus == 101 && !documents[0].kycException">
                        <q-btn
                          round
                          size="xs"
                          class="q-ma-xs"
                          color="green"
                          icon="fas fa-check"
                          @click.stop="fnDocumentApproveModal(documents[0].merchantDocumentType)"
                        />
                        <q-btn
                          round
                          size="xs"
                          class="q-ma-xs"
                          color="red"
                          icon="fas fa-times"
                          @click.stop="fnDocumentRejectModal(documents[0].merchantDocumentType)"
                        />
                        <q-btn
                          round
                          size="xs"
                          class="q-ma-xs"
                          color="primary"
                          icon="fas fa-plus"
                          @click.stop="fileUploadForUsingMerchantId(documents[0].merchantDocumentType)"
                        />
                      </div>
                    </q-item-side>
                  </template>
                  <div v-if="documents[0].uploadedDocuments.length > 0">
                    <div
                      v-for="(item,subIndex) in documents[0].uploadedDocuments"
                      :key="subIndex"
                      class="q-py-sm cursor-pointer"
                    >
                      <div v-if="item.mimeType.includes('application')">
                        <div @click="fnPDFViewModal(item.fileName)" class="ellipsis">
                          <q-btn round size="sm" icon="fas fa-file-pdf" color="primary"/>
                          &nbsp;{{item.fileName}}
                        </div>
                      </div>
                      <div v-else-if="item.mimeType.includes('image')" class="q-pa-md">
                        <viewer :images="[GLOBAL_FILE_FETCH_URL+ '/'+item.fileName]">
                          <img
                            :src="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName"
                            style="max-width:100%"
                          >
                        </viewer>
                      </div>
                      <div v-else>Invalid document type/ No document available</div>
                    </div>
                  </div>
                  <div v-else class="full-width">No document available</div>
                </q-collapsible>
              </div>
            </div>
            <!-- END >> View type is 0, direct documents  will be visible -->
            <!-- START >> View type is 1, Category has sub category, hence defined in else part -->
            <div class="row items-center full-width" v-else>
              <div class="col-md-12 q-body-1">
                <q-collapsible separator indent opened class="full-width">
                  <template slot="header">
                    <q-item-side icon="apps"/>
                    <q-item-main
                      class="q-body-1"
                      :sublabel="documents.length + 'Type(s)'"
                      :label="index"
                    />
                    <q-item-side v-if="fnToggleVerificationButtonStatus(documents)" right>
                      <q-btn
                        round
                        size="xs"
                        class="q-ma-xs"
                        color="green"
                        icon="fas fa-check"
                        @click.stop="fnDocumentApproveModal(documents[0])"
                      />
                      <q-btn
                        round
                        size="xs"
                        class="q-ma-xs"
                        color="red"
                        icon="fas fa-times"
                        @click.stop="fnDocumentRejectModal(documents[0])"
                      />
                    </q-item-side>
                    <q-item-side v-else right>
                      <span
                        v-if="fnToggleVerificationButtonStatusAfterAction(documents)"
                        class="q-body-1 text-weight-medium text-positive"
                      >Approved</span>
                      <span
                        v-else-if="fnToggleVerificationButtonStatusAfterActionRejection(documents)"
                        class="q-body-1 text-weight-medium text-negative"
                      >Rejected</span>
                      <span v-else></span>
                    </q-item-side>
                  </template>
                  <div
                    class="row items-center full-width"
                    v-for="(subDocument,subIndex) in documents"
                    :key="subIndex"
                  >
                    <div class="col-md-12 q-body-1">
                      <q-collapsible
                        separator
                        group="closeOnOpenSubDocument"
                        multiline
                        class="full-width"
                      >
                        <template slot="header">
                          <q-item-side
                            :color="subDocument.kycException?'amber-9':''"
                            :icon="subDocument.kycException? 'warning' :'attach_file'"
                          />
                          <q-item-main
                            class="q-body-1"
                            :sublabel="subDocument.uploadedDocuments.length + 'Document(s)'"
                            :label="subDocument.subDocumentType"
                          />
                          <q-item-side
                            v-if="[2,4].includes(subDocument.documentVerifiedStatus)"
                            right
                          >
                            <q-btn
                              round
                              size="xs"
                              class="q-ma-xs"
                              color="green"
                              icon="fas fa-check"
                              @click.stop="fnDocumentApproveModal(subDocument)"
                            />
                            <q-btn
                              round
                              size="xs"
                              class="q-ma-xs"
                              color="red"
                              icon="fas fa-times"
                              @click.stop="fnDocumentRejectModal(subDocument)"
                            />
                            <q-btn
                              round
                              size="xs"
                              class="q-ma-xs"
                              color="primary"
                              icon="fas fa-plus"
                              @click.stop="fileUploadForUsingMerchantId(subDocument.merchantDocumentType)"
                            />
                          </q-item-side>
                          <q-item-side v-else right>
                            <span
                              v-if="subDocument.documentVerifiedStatus == 1"
                              class="q-body-1 text-weight-medium text-positive"
                            >Approved</span>
                            <span
                              v-if="subDocument.documentVerifiedStatus == 3"
                              class="q-body-1 text-weight-medium text-negative"
                            >Rejected</span>
                            <div
                              v-if="propGetShortInfo.leadStatus == 101 && !subDocument.kycException"
                            >
                              <q-btn
                                round
                                size="xs"
                                class="q-ma-xs"
                                color="green"
                                icon="fas fa-check"
                                @click.stop="fnDocumentApproveModal(subDocument)"
                              />
                              <q-btn
                                round
                                size="xs"
                                class="q-ma-xs"
                                color="red"
                                icon="fas fa-times"
                                @click.stop="fnDocumentRejectModal(subDocument)"
                              />
                              <q-btn
                                round
                                size="xs"
                                class="q-ma-xs"
                                color="primary"
                                icon="fas fa-plus"
                                @click.stop="fileUploadForUsingMerchantId(subDocument.merchantDocumentType)"
                              />
                            </div>
                          </q-item-side>
                        </template>
                        <div v-if="subDocument.uploadedDocuments.length > 0">
                          <div
                            v-for="(item,subIndex) in subDocument.uploadedDocuments"
                            :key="subIndex"
                            class="q-py-sm cursor-pointer"
                          >
                            <div v-if="item.mimeType.includes('application')">
                              <div @click="fnPDFViewModal(item.fileName)" class="ellipsis">
                                <q-btn round size="sm" icon="fas fa-file-pdf" color="primary"/>
                                &nbsp;{{item.fileName}}
                              </div>
                            </div>
                            <div v-else-if="item.mimeType.includes('image')" class="q-pa-md">
                              <viewer :images="[GLOBAL_FILE_FETCH_URL+ '/'+item.fileName]">
                                <img
                                  :src="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName"
                                  style="max-width:100%"
                                >
                              </viewer>
                            </div>
                            <div
                              v-else
                              class="full-width"
                            >Invalid document type/ No document available</div>
                          </div>
                        </div>
                        <div v-else>No document available</div>
                      </q-collapsible>
                    </div>
                  </div>
                </q-collapsible>
              </div>
            </div>
            <!-- END >> View type is 1, Category has sub category, hence defined in else part -->
          </div>
          <input
            type="file"
            ref="fileUpload"
            class="hidden"
            accept=".jpg, .png, .pdf"
            @change="uploadFile($event,subDocumentTypeId)"
          >
        </q-item-main>
      </q-item>
      <!-- END >>Loop through cooked(in store) array for documents -->
      <!-- END >> (Not Mandatory) Other attached documents  -->
    </q-list>

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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import showDocumentLeadApproveComponent from "../../components/sat/showDocumentLeadApproveComponent.vue";
import showDocumentLeadRejectComponent from "../../components/sat/showDocumentLeadRejectComponent.vue";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";

export default {
  name: "viewLeadDocumentsComponent",
  props: ["propLeadDocumentInformation", "propGetShortInfo"],

  components: {
    showDocumentLeadApproveComponent,
    showDocumentLeadRejectComponent,
    showPdfModalComponent
  },

  data() {
    return {
      subDocumentTypeId: "",
      primaryIndex: 0,
      singleFileIndex: 0,
      subDocumentFileIndex: 0,
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      showOpenPaymentChequeDocumentInfo: false,
      PDFDetails: null,
      toggleshowPDFModal: false,

      merchantTypeSelection: 0,
      subDocumentTypeSelection: 0,

      //Component properties
      toggleLeadDocumentApproveModal: false,
      toggleLeadDocumentRejectModal: false,
      toggleshowPDFModal: false,
      PDFDetails: null,

      documentApproveTempArr: [],
      documentRejectTempArr: [],
      rejectTempArr: []
      //Component properties
    };
  },

  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"])
  },

  methods: {
    ...mapActions("SatLeadValidation", ["FEED_HAND_OVER_TO_SAT_DOCUMENT"]),
    fileUpload(index) {
      this.$refs.singleFile[index].click();
    },
    fileUploadForUsingMerchantId(details) {
      this.subDocumentTypeId = details;
      this.$refs.fileUpload.click();
    },
    uploadFile(evt, details) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Uploading file .."
      });
      // return
      let formData = new FormData();
      formData.append("file", evt.target.files[0]);
      let requestParams = {
        files: formData,
        leadId: this.$route.params.id,
        documentId: details
      };
      this.FEED_HAND_OVER_TO_SAT_DOCUMENT(requestParams)
        .then(response => {
          this.$emit("emitTriggerComponentHotLoad");
          evt.target.value = "";
          this.$q.loading.hide();
        })
        .catch(error => {
          evt.target.value = "";
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Failed to upload document",
            icon: "thumb_down"
          });
        });
    },

    fnViewHandedOverFileImage() {
      this.$refs.handedOverImageViewer.click();
    },

    // Function to approve document with reason
    fnDocumentApproveModal(documentDetails) {
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

    fnToggleVerificationButtonStatus(document) {
      let assumeArr = _.filter(document, function(value) {
        // >> 2 is document verification pending
        return value.kycException === true && value.documentVerifiedStatus == 2;
      });
      if (assumeArr.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    fnToggleVerificationButtonStatusAfterAction(document) {
      let assumeArr = _.filter(document, function(value) {
        // >> 1 is document verification approved
        return value.kycException === true && value.documentVerifiedStatus == 1;
      });
      if (assumeArr.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    fnToggleVerificationButtonStatusAfterActionRejection(document) {
      let assumeArr = _.filter(document, function(value) {
        // >> 3 is document verification approved
        return value.kycException === true && value.documentVerifiedStatus == 3;
      });
      if (assumeArr.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    // Function to show PDF
    fnPDFViewModal(documentUrl) {
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    }
  }
};
</script>

<style scoped>
label {
  background-color: rgb(32, 44, 63);
  border-radius: 65%;
  padding: 3px;
  height: 25px;
  width: 25px;
  text-align: center;
}
</style>
