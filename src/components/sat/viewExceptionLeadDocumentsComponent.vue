<template>
  <div>
    <!-- START >> Display attached documents -->
    <q-list no-border class="no-padding">
      <!-- START >> (Mandatory) Application form  -->
      <q-item separator class="text-body1 text-dark bg-grey-4 text-weight-medium">
        <q-item-section>Application Form</q-item-section>
      </q-item>
      <q-item separator class="text-body1">
        <q-item-section>
          <div class="full-width">
            <!-- START >>If document type is PDF format -->
            <div
              class="cursor-pointer"
              v-if="propGetShortInfo.applicationFileMimeType.includes('pdf')"
            >
              <div @click="fnPDFViewModal(propGetShortInfo.applicationFile)" class="ellipsis">
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
        </q-item-section>
      </q-item>
      <!-- END >> (Mandatory) Application form  -->
      <!-- START >>Loop through cooked(in store) array for documents -->
      <!-- START >> (Not Mandatory) Other attached documents  -->
      <q-item class="no-padding" v-if="Object.keys(propLeadDocumentInformation).length > 0">
        <q-item-section>
          <div v-for="(documents,index) in propLeadDocumentInformation" :key="index">
            <!-- START >> View type is 0, direct documents  will be visible -->
            <div
              class="row items-center full-width"
              v-if="index.toString()==documents[0].subDocumentType"
            >
              <div class="col-md-12 text-body1">
                <q-expansion-item separator indent icon-toggle opened multiline class="full-width">
                  <template slot="header">
                    <q-item-section icon="attach_file"/>
                    <q-item-section
                      class="text-body1"
                      :sublabel="documents[0].uploadedDocuments.length + 'Document(s)'"
                      :label="index"
                    />
                    <q-item-section
                      v-if="documents[0].documentVerifiedStatus == 2 && documents[0].uploadedDocuments.length > 0"
                      right
                    >
                      <q-btn
                        round
                        size="xs"
                        class="q-ma-xs"
                        color="green"
                        icon="fas fa-check"
                        @click="fnDocumentApproveModal(documents[0])"
                      />
                      <q-btn
                        round
                        size="xs"
                        class="q-ma-xs"
                        color="red"
                        icon="fas fa-times"
                        @click="fnDocumentRejectModal(documents[0])"
                      />
                    </q-item-section>
                    <q-item-section v-else right>
                      <span
                        v-if="documents[0].documentVerifiedStatus == 1"
                        class="text-body1 text-weight-medium text-positive"
                      >Approved</span>
                      <span
                        v-if="documents[0].documentVerifiedStatus == 3"
                        class="text-body1 text-weight-medium text-negative"
                      >Rejected</span>
                    </q-item-section>
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
                      <div v-else>No document attached</div>
                    </div>
                  </div>
                  <div v-else>No document attached</div>
                </q-expansion-item>
              </div>
            </div>
            <!-- END >> View type is 0, direct documents  will be visible -->
            <!-- START >> View type is 1, Category has sub category, hence defined in else part -->
            <div class="row items-center full-width" v-else>
              <div class="col-md-12 text-body1">
                <q-expansion-item separator indent icon-toggle opened class="full-width">
                  <template slot="header">
                    <q-item-section icon="apps"/>
                    <q-item-section
                      class="text-body1"
                      :sublabel="documents.length + 'Type(s)'"
                      :label="index"
                    />
                  </template>
                  <div
                    class="row items-center full-width bottom-border"
                    v-for="(subDocument,subIndex) in documents"
                    :key="subIndex"
                  >
                    <div class="col-md-12 text-body1">
                      <q-expansion-item
                        separator
                        icon-toggle
                        group="closeOnOpenSubDocument"
                        multiline
                        class="full-width"
                      >
                        <template slot="header">
                          <q-item-section icon="attach_file"/>
                          <q-item-section
                            class="text-body1"
                            :sublabel="subDocument.uploadedDocuments.length + 'Document(s)'"
                            :label="subDocument.subDocumentType"
                          />
                          <q-item-section
                            v-if="subDocument.documentVerifiedStatus == 2 && subDocument.uploadedDocuments.length > 0"
                            right
                          >
                            <q-btn
                              round
                              size="xs"
                              class="q-ma-xs"
                              color="green"
                              icon="fas fa-check"
                              @click="fnDocumentApproveModal(subDocument)"
                            />
                            <q-btn
                              round
                              size="xs"
                              class="q-ma-xs"
                              color="red"
                              icon="fas fa-times"
                              @click="fnDocumentRejectModal(subDocument)"
                            />
                          </q-item-section>
                          <q-item-section v-else right>
                            <span
                              v-if="subDocument.documentVerifiedStatus == 1"
                              class="text-body1 text-weight-medium text-positive"
                            >Approved</span>
                            <span
                              v-if="subDocument.documentVerifiedStatus == 3"
                              class="text-body1 text-weight-medium text-negative"
                            >Rejected</span>
                          </q-item-section>
                        </template>
                        <div
                          v-if="subDocument.uploadedDocuments.length > 0"
                          class="q-py-sm cursor-pointer"
                        >
                          <div
                            v-for="(item,subIndex) in subDocument.uploadedDocuments"
                            :key="subIndex"
                          >
                            <div v-if="item.mimeType.includes('application')" class="ellipsis">
                              <div @click="fnPDFViewModal(item.fileName)">
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
                          </div>
                        </div>
                        <div v-else>No document attached</div>
                      </q-expansion-item>
                    </div>
                  </div>
                </q-expansion-item>
              </div>
            </div>
            <!-- END >> View type is 1, Category has sub category, hence defined in else part -->
          </div>
        </q-item-section>
      </q-item>
      <!-- END >>Loop through cooked(in store) array for documents -->
      <!-- END >> (Not Mandatory) Other attached documents  -->
    </q-list>
    <!-- END >> Display attached documents -->
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
import { not } from '@vuelidate/validators';
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
    fnViewHandedOverFileImage() {
      this.$refs.handedOverImageViewer.click();
    },

    // Function to approve document with reason
    fnDocumentApproveModal(documentDetails) {
      this.toggleLeadDocumentApproveModal = !this
        .toggleLeadDocumentApproveModal;
      documentDetails["leadId"] = this.$route.params.id;
      this.documentApproveTempArr = documentDetails;
    },

    // Function to reject document with reason
    fnDocumentRejectModal(documentDetails) {
      this.toggleLeadDocumentRejectModal = !this.toggleLeadDocumentRejectModal;
      documentDetails["leadId"] = this.$route.params.id;
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

    // Function to show PDF
    fnPDFViewModal(documentUrl) {
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    }
  }
};
</script>

<style>
</style>
