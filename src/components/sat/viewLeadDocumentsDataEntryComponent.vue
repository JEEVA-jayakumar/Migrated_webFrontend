<template>
  <div>
    <q-list no-border class="no-padding">
      <!-- START >> (Mandatory) Application form  -->
      <q-collapsible
        separator
        opened
        :group="toggleCollapsible"
        @hide="functionToggleCollapsible"
        multiline
        class="full-width"
        icon="attach_file"
        label="Application form"
      >
        <q-item v-if="showDocumentPreview" separator class="q-body-1">
          <q-item-main v-if="propGetShortInfo.applicationFileMimeType.includes('pdf')">
            <div @click="fnDocumentUrl(propGetShortInfo.applicationFile)" class="ellipsis">
              <q-btn round size="sm" icon="fas fa-file-pdf" color="primary" />
              &nbsp;{{propGetShortInfo.applicationFile}}
            </div>
          </q-item-main>
          <q-item-main v-if="propGetShortInfo.applicationFileMimeType.includes('image')">
            <!-- START >>If document type is image format -->
            <div
              class="images"
              v-viewer="{minWidth:0,minHeight:0,inline:true,scalable:true,button:true,movable:true}"
            >
              <img
                :src="GLOBAL_FILE_FETCH_URL+'/'+propGetShortInfo.applicationFile"
                alt="Picture"
                style="max-width:100%"
              />
            </div>
            <!-- END >>If document type is image format -->
          </q-item-main>
        </q-item>
      </q-collapsible>
      <!-- END >> (Mandatory) Application form  -->
      <!-- START >>Loop through cooked(in store) array for documents -->
      <!-- START >> (Not Mandatory) Other attached documents  -->
      <q-item
        class="no-padding"
        v-if="Object.keys(propLeadDocumentInformation).length > 0 && showDocumentPreview"
      >
        <q-item-main>
          <div v-for="(documents,index) in propLeadDocumentInformation" :key="index">
            <!-- START >> View type is 0, direct documents  will be visible -->
           
            <div
              class="row items-center full-width"
              v-if="index.toString()==documents[0].subDocumentType"
            >
              <div class="col-md-12 q-body-1">
                <q-collapsible
                  separator
                  opened
                  :group="toggleCollapsible"
                  @hide="functionToggleCollapsible"
                  :ref="'singleImageIndex'+index"
                  multiline
                  class="full-width"
                >
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
                    <q-item-side v-if="documents[0].documentVerifiedStatus == 2" right>
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
                    </q-item-side>
                  </template>
                  <div v-if="documents[0].uploadedDocuments.length > 0">
                    <q-item
                      v-for="(item,subIndex) in documents[0].uploadedDocuments"
                      :key="subIndex"
                      separator
                      class="q-body-1"
                    >
                      <q-item-main
                        @click="fnDocumentUrl(item.fileName)"
                        v-if="item.mimeType.includes('application')"
                        class="ellipsis"
                      >
                        <q-btn round size="sm" icon="fas fa-file-pdf" color="primary" />
                        &nbsp;{{propGetShortInfo.applicationFile}}
                      </q-item-main>
                      <q-item-main v-else-if="item.mimeType.includes('image')">
                        <!-- START >>If document type is image format -->
                        <div
                          class="images"
                          v-viewer="{minWidth:0,minHeight:0,inline:true,scalable:true,button:true,movable:true}"
                        >
                          <img
                            :src="GLOBAL_FILE_FETCH_URL+'/'+item.fileName"
                            alt="Picture"
                            style="max-width:100%"
                          />
                        </div>
                        <!-- END >>If document type is image format -->
                      </q-item-main>
                      <q-item-main v-else>Invalid document type/ No document available</q-item-main>
                    </q-item>
                  </div>
                  <div v-else>No document available</div>
                </q-collapsible>
              </div>
            </div>
            <!-- END >> View type is 0, direct documents  will be visible -->
            <!-- START >> View type is 1, Category has sub category, hence defined in else part -->
            <div class="row items-center full-width" v-else>
              <div class="col-md-12 q-body-1">
                <q-collapsible separator opened :group="toggleCollapsible" class="full-width">
                  <template slot="header">
                    <q-item-side icon="apps" />
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
                      <q-collapsible separator opened multiline class="full-width">
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
                          <q-item-side v-if="subDocument.documentVerifiedStatus == 2" right>
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
                          </q-item-side>
                          <q-item-side v-else right class="desktop-only cordova-only">
                            <span
                              v-if="subDocument.documentVerifiedStatus == 1"
                              class="q-body-1 text-weight-medium text-positive"
                            >Approved</span>
                            <span
                              v-if="subDocument.documentVerifiedStatus == 3"
                              class="q-body-1 text-weight-medium text-negative"
                            >Rejected</span>
                          </q-item-side>
                        </template>
                        <div v-if="subDocument.uploadedDocuments.length > 0">
                          <q-item
                            v-for="(item,subIndex) in subDocument.uploadedDocuments"
                            :key="subIndex"
                            separator
                            class="q-body-1"
                          >
                            <q-item-main
                              @click="fnDocumentUrl(item.fileName)"
                              v-if="item.mimeType.includes('application')"
                              class="ellipsis"
                            >
                              <q-btn round size="sm" icon="fas fa-file-pdf" color="primary" />
                              &nbsp;{{item.fileName}}
                            </q-item-main>
                            <q-item-main v-else-if="item.mimeType.includes('image')">
                              <!-- START >>If document type is image format -->
                              <div
                                class="images"
                                v-viewer="{minWidth:0,minHeight:0,inline:true,scalable:true,button:true,movable:true}"
                              >
                                <img
                                  :src="GLOBAL_FILE_FETCH_URL+'/'+item.fileName"
                                  alt="Picture"
                                  style="max-width:100%"
                                />
                              </div>
                              <!-- END >>If document type is image format -->
                            </q-item-main>
                            <q-item-main v-else>Invalid document type/ No document available</q-item-main>
                          </q-item>
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
        </q-item-main>
      </q-item>
      <!-- END >>Loop through cooked(in store) array for documents -->
      <!-- END >> (Not Mandatory) Other attached documents  -->
      <div class="col-md-5 q-pa-xs group" v-if="!showDocumentPreview">
        <div>
          <vuePdfjs
            :url="GLOBAL_FILE_FETCH_URL+'/'+populatedDocumentUrl"
            :type="0"
            :height="'500px'"
          ></vuePdfjs>
        </div>
        <div>
          <q-btn
            label="Close Preview"
            icon="clear"
            class="common-dark-blue"
            @click="fnCloseDocumentPreview"
          />
        </div>
      </div>
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
import "viewerjs/dist/viewer.css";
import vuePdfjs from "vue-pdfjs";

import showDocumentLeadApproveComponent from "../../components/sat/showDocumentLeadApproveComponent.vue";
import showDocumentLeadRejectComponent from "../../components/sat/showDocumentLeadRejectComponent.vue";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";

export default {
  name: "viewLeadDocumentsComponent",
  props: ["propLeadDocumentInformation", "propGetShortInfo"],

  components: {
    vuePdfjs,
    showDocumentLeadApproveComponent,
    showDocumentLeadRejectComponent,
    showPdfModalComponent
  },

  data() {
    return {
      toggleCollapsible: "",
      showDocumentPreview: true,
      populatedDocumentUrl: "",

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
  //   mounted(){
  //     this.$el.querySelector(".images").$viewer.show();
  //   },

  methods: {
    functionToggleCollapsible() {
      this.toggleCollapsible = "toggleCollapsible";
    },
    // show() {
    //   let viewer = this.$el.querySelector(".images").$viewer;
    //   viewer.show();
    // },
    // showSingleItem(index) {
    //   let viewer = this.$el.querySelector(".singleItemImage").$viewer;
    //   viewer.show();
    // },
    fnViewHandedOverFileImage() {
      this.$refs.handedOverImageViewer.click();
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
    },

    fnDocumentUrl(documentUrl) {
      this.populatedDocumentUrl = documentUrl;
      this.showDocumentPreview = !this.showDocumentPreview;
    },
    fnImageUrl(imageUrl) {
      this.populatedimageUrl = imageUrl;
      this.showimageUrlPreview = !this.showimageUrlPreview;
    },
    fnCloseDocumentPreview() {
      this.showDocumentPreview = !this.showDocumentPreview;
    }
  }
};
</script>

<style>
</style>
