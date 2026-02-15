<template>
  <q-page>
    <div class="q-ma-md">
      <div class="row">
        <div class="col">
          <!-- <pre>{{IsKYCVerifiedBySAT}}</pre> -->
          <q-banner
            v-if="formData.shortLead.kyc && formData.shortLead.bankSubvention 
                        && IsKYCVerifiedBySAT == undefined"
            icon="info"
            type="primary"
            message=" KYC & Bank subvention"
            detail=" Status: SAT verification pending"
          />
          <q-banner
            v-if="formData.shortLead.kyc && formData.shortLead.bankSubvention 
                        && formData.shortLead.verifiedKycStatus == $VERIFIED_KYC_STATUS_OP_PENDING && IsKYCVerifiedBySAT != undefined"
            icon="info"
            type="primary"
            message="KYC & Bank subvention"
            :detail="'Status: Approved by '+IsKYCVerifiedBySAT.createdBy.name+ ' (SAT)'+ ' / OPS head verification pending'"
          />
          <q-banner
            v-if="formData.shortLead.kyc && formData.shortLead.bankSubvention 
                        && IsKYCVerifiedBySAT != undefined && formData.shortLead.verifiedKycStatus != $VERIFIED_KYC_STATUS_OP_PENDING"
            icon="info"
            type="primary"
            message="KYC & Bank subvention"
            :detail="'Status: Approved by '+IsKYCVerifiedBySAT.createdBy.name+ ' (OPS head)'"
          />
        </div>
      </div>
      <div class="row items-stretch q-ma-xs">
        <div class="col-md-3">
          <div class="text-h6 q-my-md capitalize">{{formData.shortLead.leadName}}</div>
          <p
            class="text-light-blue cursor-pointer"
            @click="toggleLeadInformation(formData.shortLead)"
          ># {{formData.shortLead.id}}</p>
        </div>
        <div class="col-md-3">
          <div class="text-h6 q-my-md">Contact</div>
          <p class="no-margin">{{formData.shortLead.contactNumber}}</p>
          <p>{{formData.shortLead.alternateContactNumber}}</p>
        </div>
        <div class="col-md-3">
          <div class="text-h6 q-my-md">Address</div>
          <p
            v-if="formData.shortLead.leadAddress != null"
            class="capitalize no-margin"
          >{{formData.shortLead.leadAddress}}</p>
          <p class="capitalize no-margin">{{formData.shortLead.city}}, {{formData.shortLead.state}}</p>
        </div>
      </div>

      <!-- Device, Exception, Payment, MDR and Documents -->
      <div class="row">
        <div class="col-md-6">
          <div class="flex">
            <!-- Device -->
            <div class="full-width">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-section class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col text-body1 text-weight-medium">
                      Device -
                      {{formData.shortLead.deviceCount}}
                      {{formData.shortLead.device.deviceName}}
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <q-list separator no-border class="no-padding text-body1">
                    <q-item class="q-pa-sm text-body1">
                      <q-item-section>Plan</q-item-section>
                      <q-item-section>{{formData.shortLead.plan.planName}}</q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm text-body1">
                      <q-item-section>Setup Fees</q-item-section>
                      <q-item-section v-if="this.getShortLeadInfo.leadSource.id === 114">Rs. {{formData.shortLead.setUpFeeAppliedAmount}}</q-item-section>
                      <q-item-section v-else>Rs. {{formData.shortLead.setupFees}}</q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm text-body1">
                      <q-item-section>Recurring Fees</q-item-section>
                      <q-item-section v-if="this.getShortLeadInfo.leadSource.id === 114">Rs. {{formData.shortLead.recurringFeeAppliedAmount}}</q-item-section>
                      <q-item-section v-else>Rs. {{formData.shortLead.recurringFees}}</q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm text-body1">
                      <q-item-section>Merchant Category</q-item-section>
                      <q-item-section>{{formData.shortLead.merchantCategory.merchantCategoryName}}</q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>

            <!-- Payment -->
            <div class="full-width">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-section class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col-auto text-body1 text-weight-medium">Payment</div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <q-list no-border separator class="no-padding">
                    <q-item class="q-pa-sm">
                      <q-item-section class="text-body1">Mode of payment</q-item-section>
                      <q-item-section class="text-body1">
                        <span
                          class="text-body1"
                          v-if="formData.shortLead.paymentOption == 1"
                        >IMPS/NEFT</span>
                        <span
                          class="text-body1"
                          v-else-if="formData.shortLead.paymentOption == 2"
                        >Cheque</span>
                        <span
                          class="text-body1"
                          v-else-if="formData.shortLead.paymentOption == 3"
                        >Swipe</span>
                                    <span
                          class="text-body1"
                          v-else-if="formData.shortLead.paymentOption == 4"
                        >UPI Link</span>
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-section class="text-body1">Reference No</q-item-section>
                      <q-item-section
                        class="text-body1"
                      >{{formData.shortLead.referenceNumber == ''? 'NA':formData.shortLead.referenceNumber}}</q-item-section>
                    </q-item>
                    <q-item v-if="formData.shortLead.paymentOption == 2">
                      <div
                        v-if="formData.shortLead.paymentDocumentMimeType != null && formData.shortLead.paymentDocumentMimeType.includes('pdf')"
                      >
                        <q-btn
                          size="sm"
                          :outline="!showOpenPaymentChequeDocumentInfo"
                          color="dark"
                          label="View Document"
                          icon="attach_file"
                          @click="fnPDFViewModal(formData.shortLead.paymentDocumentFile,'CHEQUE')"
                        ></q-btn>
                      </div>
                      <div
                        v-else-if="formData.shortLead.paymentDocumentMimeType != null && formData.shortLead.paymentDocumentMimeType.includes('image')"
                      >
                        <q-btn
                          :outline="!showOpenPaymentChequeInfo"
                          size="sm"
                          color="dark"
                          label="View Document"
                          icon="attach_file"
                          @click="fnOpenPaymentChequeInfo(formData.shortLead.paymentDocumentFile)"
                        />
                      </div>
                      <div v-else class="text-grey-9">
                        <q-icon name="clear" color="negative" />No document attached
                      </div>
                    </q-item>
                    <q-item v-if="showOpenPaymentChequeInfo">
                      <viewer
                        class="cursor-pointer"
                        :images="[GLOBAL_FILE_FETCH_URL+ '/'+formData.shortLead.paymentDocumentFile]"
                      >
                        <img
                          :src="GLOBAL_FILE_FETCH_URL+ '/'+formData.shortLead.paymentDocumentFile"
                          style="max-width:100%"
                        />
                      </viewer>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
            <!-- MDR -->
            <div class="full-width">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-section class="q-pa-sm bottom-border title-bg">
                  <span class="text-body1 text-weight-medium">MDR</span>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <q-list no-border class="no-padding">
                    <q-item class="q-pa-sm">
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Debit < 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="debitModelLesserThan"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Debit > 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="debitModelGreaterThan"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Std CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="debitModelStdCC"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Premium CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="debitModelPremiumCC"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Corp Pre CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="debitModelCorpCC"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Intl Pre CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="debitModelIntlCC"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Super Pre CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="debitModelSuperPremiumCC"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Upi Debit Card UpTo 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="upiDebitCardUpTo2000"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm">
                       <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Upi Debit Card Above 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="upiDebitCardAbove2000"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Upi Prepaid Credit Cards UpTo 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="upiPrepaidCreditCardsUpTo2000"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm">
                       <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Upi Prepaid Credit Cards Above 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="upiPrepaidCreditCardsAbove2000"
                        />
                      </q-item-section>
                    </q-item>
                   
                    <q-item class="items-start q-pa-sm" v-if="formData.shortLead.posEnable">
                      <q-checkbox
                        v-model="formData.shortLead.posEnable"
                        class="no-pointer-events"
                        color="purple-9"
                      >
                        <small class="text-caption">Enable Cash@POS Cash @POS incentive Rs.5</small>
                      </q-checkbox>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
            <!-- Remarks -->
            <div class="full-width">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-section class="q-pa-sm bottom-border title-bg">
                  <span class="text-body1 text-weight-medium">Remarks</span>
                </q-card-section>
                <q-card-section class="q-pa-sm text-grey-9">
                  <q-list separator no-border class="no-padding">
                    <q-item
                      class="q-pa-sm align-middle"
                      multiline
                      v-show="getShortLeadInfo.bankSubventionTracker.length > 0"
                      v-for="(item,index) in getShortLeadInfo.bankSubventionTracker"
                      :key="index"
                    >
                      <q-item-section class="text-dark capitalize">{{item.remarks}}</q-item-section>
                      <q-item-section>{{item.createdAt | moment("Do MMM Y")}}</q-item-section>
                    </q-item>
                    <q-item
                      v-show="getShortLeadInfo.bankSubventionTracker.length == 0"
                    >No data to display</q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="flex">
            <!-- Exception -->
            <div class="full-width">
              <div v-if="formData.shortLead.leadCategory == 2">
                <q-card v-if="formData.shortLead.kyc" class="q-ma-xs border-1 q-custom-class" flat>
                  <q-card-section class="q-pa-sm bottom-border title-bg">
                    <div class="row items-center">
                      <div class="col-auto text-body1 text-weight-medium">Exception KYC</div>
                    </div>
                  </q-card-section>
                  <q-card-section class="no-padding">
                    <div class="row items-center q-pa-sm q-py-md">
                      <div class="col-md-3 col-sm-12 col-xs-12">
                        <span class="text-caption text-faded">Reason</span>
                      </div>
                      <div class="col-md-9 col-sm-12 col-xs-12">
                        <span
                          class="text-caption text-faded"
                          v-if="formData.shortLead.reason == null"
                        >Reason not specified</span>
                        <span class="text-caption text-faded" v-else>{{formData.shortLead.reason}}</span>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card
                  v-if="formData.shortLead.bankSubvention"
                  class="q-ma-xs border-1 q-custom-class"
                  flat
                >
                  <q-card-section class="q-pa-sm bottom-border title-bg">
                    <div class="row items-center">
                      <div class="col-auto text-body1 text-weight-medium">Exception Bank Subvention</div>
                    </div>
                  </q-card-section>
                  <q-card-section class="no-padding">
                    <div class="row items-center q-pa-sm q-py-md">
                      <div class="col-md-3 col-sm-12 col-xs-12">
                        <div class="text-caption text-faded">Reason</div>
                      </div>
                      <div class="col-md-9 col-sm-12 col-xs-12">
                        <div
                          class="text-caption text-faded"
                          v-if="formData.shortLead.reason == null"
                        >Reason no specified</div>
                        <div class="text-caption text-faded" v-else>{{formData.shortLead.reason}}</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card
                  v-if="formData.shortLead.pricing"
                  class="q-ma-xs border-1 q-custom-class"
                  flat
                >
                  <q-card-section class="q-pa-sm bottom-border title-bg">
                    <div class="row items-center">
                      <div class="col-auto text-body1 text-weight-medium">Exception Pricing</div>
                    </div>
                  </q-card-section>
                  <q-card-section class="no-padding">
                    <div class="row items-center q-pa-sm q-py-md">
                      <div class="col-md-3 col-sm-12 col-xs-12">
                        <div class="text-caption text-faded">Reason</div>
                      </div>
                      <div class="col-md-9 col-sm-12 col-xs-12">
                        <div class="text-caption text-faded">{{formData.shortLead.reason}}</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>


            <q-card class="cardsize1">
            <q-card-section class="q-pa-sm bottom-border title-bg">
                    <div class="row items-center">
                      <div class="col-auto text-body1 text-weight-medium">Application Form</div>
                    </div>
                  </q-card-section>
                  <q-item separator class="text-body1">
                    <q-item-section>
                      <div class="full-width">
                        <div class="cursor-pointer" v-if="formData.shortLead.applicationFileMimeType.includes('pdf')">
                          <div @click="fnPDFViewModal(formData.shortLead.applicationFile)">
                            <q-btn
                              round
                              size="sm"
                              icon="fas fa-file-pdf"
                              color="primary"
                            />
                            &nbsp;{{ formData.shortLead.applicationFile }}
                          </div>
                        </div>
                        <div class="cursor-pointer" v-else-if="formData.shortLead.applicationFileMimeType.includes('image')">
                          <viewer
                            :images="[GLOBAL_FILE_FETCH_URL + '/' + formData.shortLead.applicationFile]"
                            class="hidden"
                          >
                            <img
                              :src="[
                                GLOBAL_FILE_FETCH_URL + '/' + formData.shortLead.applicationFile]"
                              ref="handedOverImageViewerApplication"
                              style="max-width:100%"
                            />
                          </viewer>
                          <div
                            @click="fnViewHandedOverFileImageApplication()"
                            class="ellipsis"
                          >
                            <q-icon name="fas fa-image" color="amber-9" />
                            &nbsp;{{ formData.shortLead.applicationFile }}
                          </div>
                        </div>
                        <div v-else>
                          Invalid document type/ No document available
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                  </q-card>
            <!-- <pre>{{formData.shortLead.leadDocuments}}</pre> -->
            <!-- Documents proof -->
            <div class="full-width" v-if="Object.keys(formData.shortLead.leadDocuments).length > 0">
              <q-card class="q-ma-xs border-1" flat>
                <q-card-section class="q-pa-sm title-bg bottom-border">
                  <span class="text-body1 text-weight-medium">Documents</span>
                  <span class="text-body1 text-weight-medium"></span>
                </q-card-section>
                <q-card-section class="q-pa-xs">
                  <q-list no-border class="no-padding">
                    <q-item class="no-padding">
                      <q-item-section>
                        <div
                          v-for="(documents,index) in formData.shortLead.leadDocuments"
                          :key="index"
                        >
                          <div
                            class="row items-center full-width"
                            v-if="index.toString()==documents[0].subDocumentType"
                          >
                            <div class="col-md-12 text-body1">
                              <q-expansion-item
                                separator
                                indent
                                icon-toggle
                                opened
                                multiline
                                class="full-width"
                              >
                                <template slot="header">
                                  <q-item-section icon="attach_file" />
                                  <q-item-section
                                    class="text-body1"
                                    :sublabel="documents[0].uploadedDocuments.length + 'Document(s)'"
                                    :label="index"
                                  />
                                </template>
                                <div
                                  v-for="(item,subIndex) in documents[0].uploadedDocuments"
                                  :key="subIndex"
                                  class="q-py-sm"
                                >
                                  <div v-if="item.mimeType.includes('application')">
                                    <div
                                      @click="fnPDFViewModal(item.fileName)"
                                      class="cursor-pointer no-underline"
                                    >
                                      <q-btn
                                        round
                                        size="sm"
                                        icon="fas fa-file-pdf"
                                        color="primary"
                                      />
                                      &nbsp;{{item.fileNameOriginal}}
                                    </div>
                                  </div>
                                  <div v-else-if="item.mimeType.includes('image')">
                                    <div class="no-underline cursor-pointer">
                                      <viewer :images="[GLOBAL_FILE_FETCH_URL+ '/'+item.fileName]">
                                        <img
                                          :src="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName"
                                          style="max-width:100%"
                                        />
                                      </viewer>
                                    </div>
                                  </div>
                                  <div v-else>No documents attached</div>
                                </div>
                              </q-expansion-item>
                            </div>
                          </div>

                          <div class="row items-center full-width" v-else>
                            <!-- <pre>{{documents}}</pre> -->
                            <div class="col-md-12 text-body1">
                              <q-expansion-item
                                separator
                                indent
                                sicon-toggle
                                opened
                                class="full-width"
                              >
                                <template slot="header">
                                  <q-item-section icon="apps" />
                                  <q-item-section
                                    class="text-body1"
                                    :sublabel="documents.length + 'Type(s)'"
                                    :label="index"
                                  />
                                </template>
                                <div
                                  class="row items-center full-width"
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
                                      indent
                                    >
                                      <template slot="header">
                                        <q-item-section icon="attach_file" />
                                        <q-item-section
                                          class="text-body1"
                                          :sublabel="subDocument.uploadedDocuments.length + 'Document(s)'"
                                          :label="subDocument.subDocumentType"
                                        />
                                      </template>
                                      <div
                                        v-for="(item,subIndex) in subDocument.uploadedDocuments"
                                        :key="subIndex"
                                        class="q-py-sm"
                                      >
                                        <div v-if="item.mimeType.includes('application')">
                                          <div
                                            @click="fnPDFViewModal(item.fileName)"
                                            class="cursor-pointer no-underline"
                                          >
                                            <q-btn
                                              round
                                              size="sm"
                                              icon="fas fa-file-pdf"
                                              color="primary"
                                            />
                                            &nbsp;{{item.fileNameOriginal}}
                                          </div>
                                        </div>
                                        <div v-else-if="item.mimeType.includes('image')">
                                          <div class="no-underline cursor-pointer">
                                            <viewer
                                              :images="[GLOBAL_FILE_FETCH_URL+ '/'+item.fileName]"
                                            >
                                              <img
                                                :src="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName"
                                                style="max-width:100%"
                                              />
                                            </viewer>
                                          </div>
                                        </div>
                                        <div v-else>No document attached</div>
                                      </div>
                                    </q-expansion-item>
                                  </div>
                                </div>
                              </q-expansion-item>
                            </div>
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <!-- Final actions -->
        <div class="col-md-12" align="right">
          <q-btn
            icon="block"
            color="grey-5"
            class="q-ma-sm text-dark"
            @click="$router.go(-1)"
            label="Cancel"
          />
          <q-btn icon="save" class="q-ma-sm" color="amber-9" label="Save" @click="saveRemarks" />
          <q-btn
            icon="clear"
            class="q-ma-sm"
            color="negative"
            label="Reject"
            @click="fnUploadDocumentAndSubmitRejection"
          />
          <q-btn
            v-if="this.formData.shortLead.leadSource.id != 114 && this.formData.shortLead.leadSource.id != 115"
            icon="cloud_upload"
            class="q-ma-sm"
            color="positive"
            label="Upload bank subvention letter"
            @click="fnUploadDocumentAndSubmit"
          />
        </div>
      </div>

      <!--START >>  COMPONENT toggleUploadDocumentAndSubmit -->
      <toggleUploadDocumentAndSubmit
        :propLeadDetails="formData.shortLead"
        :propToggleUploadDocumentAndSubmit="toggleUploadDocumentAndSubmit"
        @toggleDocumentUploadAndFinalSubmit="fnUploadDocumentAndSubmit"
      ></toggleUploadDocumentAndSubmit>
      <!--END >>  COMPONENT toggleUploadDocumentAndSubmit -->
      <!-- START >> COMPONENT: Final reject -->
      <showRejectLeadRejectComponent
        v-if="toggleLeadRejectModal"
        :propToggleLeadModal="toggleLeadRejectModal"
        :propLeadDetails="getShortLeadInfo"
        @toggleLeadModal="fnUploadDocumentAndSubmitRejection"
      />
      <!-- END >> COMPONENT: Final reject -->
      <!-- START >> COMPONENT: View PDF  -->
      <showPdfModalComponent
        v-if="toggleshowPDFModal"
        :propToggleshowPDFModal="toggleshowPDFModal"
        :propPDFDetails="PDFDetails"
        @togglePDFModal="fnPDFViewModal"
      ></showPdfModalComponent>
      <!-- END >> COMPONENT: View PDF -->
      <!-- START >> COMPONENT: View remarks  -->
      <remarks
        v-if="remarks"
        :propToggleLeadModal="remarks"
        :propLeadDetails="getShortLeadInfo"
        @toggleLeadModal="saveRemarks"
        @refreshContentOnSavingRemarks="ajaxLoadShortLeadInfo"
      ></remarks>
      <!-- END >> COMPONENT: View remarks -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />

      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
      <!--END >>  Show Ajax Spinner -->
    </div>
  </q-page>
</template>

<script>
import { not, and } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

import toggleUploadDocumentAndSubmit from "../../components/sat/toggleUploadDocumentAndSubmit.vue";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";
import remarks from "../../components/sat/remarks.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

// import showRejectLeadRejectComponent from "../../components/sat/BankSubventionRejectComponent.vue";

export default {
  name: "exceptionQueueBankLeadDetails",
  components: {
    showPdfModalComponent,
    toggleUploadDocumentAndSubmit,
    generalLeadInformation,
    remarks,
    // showRejectLeadRejectComponent
  },
  data() {
    return {
      remarks: false,
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      PDFDetails: null,
      toggleshowPDFModal: null,

      toggleLeadRejectModal: false,

      toggleAjaxLoadFilter: false,
      toggleUploadDocumentAndSubmit: false,
      model: "",
      tabsModel: "xtab-2",
      toggleChequeImageResult: false,
      toggleDocumentLeadRejectModal: false,
      documentRejectTempArr: [],
      checked: false,
      thumbnailsHorizontal: false,
      toggleLeadRejectModal: false,
      showOpenPaymentChequeDocumentInfo: false,
      showOpenPaymentChequeInfo: false,
      leadRejectReason: "",
      formData: {
        shortLead: ""
      }
    };
  },

  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("SatLeadValidation", [
      "getShortLeadInfo",
      "getDeviceVerificationStatus"
    ]),

    debitModelLesserThan() {
    if (this.getShortLeadInfo.leadSource.id === 114) {
      return this.formData.shortLead.appliedDebitLessthanAmount;
    } else {
      return this.formData.shortLead.debitLessthanAmount;
    }
  },
  debitModelGreaterThan() {
    if (this.getShortLeadInfo.leadSource.id === 114) {
      return this.formData.shortLead.appliedDebitGreaterthanAmount;
    } else {
      return this.formData.shortLead.debitGreaterthanAmount;
    }
  },
  debitModelStdCC() {
    if (this.getShortLeadInfo.leadSource.id === 114) {
      return this.formData.shortLead.appliedStdCC;
    } else {
      return this.formData.shortLead.stdCC;
    }
  },
  debitModelPremiumCC() {
    if (this.getShortLeadInfo.leadSource.id === 114) {
      return this.formData.shortLead.appliedPremiumCC;
    } else {
      return this.formData.shortLead.premiumCC;
    }
  },
  debitModelCorpCC() {
    if (this.getShortLeadInfo.leadSource.id === 114) {
      return this.formData.shortLead.appliedCorpCC;
    } else {
      return this.formData.shortLead.corpCC;
    }
  },
  debitModelIntlCC() {
    if (this.getShortLeadInfo.leadSource.id === 114) {
      return this.formData.shortLead.appliedIntlCC;
    } else {
      return this.formData.shortLead.intlCC;
    }
  },
  debitModelSuperPremiumCC() {
    if (this.getShortLeadInfo.leadSource.id === 114) {
      return this.formData.shortLead.appliedSuperPremiumCC;
    } else {
      return this.formData.shortLead.superPremiumlCC;
    }
  },
  upiDebitCardUpTo2000() {
    if (this.getShortLeadInfo.leadSource.id === 114) {
      return this.formData.shortLead.appliedUpiDebitCardUpTo2000;
    } else {
      return this.formData.shortLead.upiDebitCardUpTo2000;
    }
  },
  upiDebitCardAbove2000() {
    if (this.getShortLeadInfo.leadSource.id === 114) {
      return this.formData.shortLead.appliedUpiDebitCardAbove2000;
    } else {
      return this.formData.shortLead.upiDebitCardAbove2000 ;
    }
  },
  upiPrepaidCreditCardsUpTo2000() {
    if (this.getShortLeadInfo.leadSource.id === 114) {
      return this.formData.shortLead.appliedUpiPrepaidCreditCardUpTo2000;
    } else {
      return this.formData.shortLead.upiPrepaidCreditCardsUpTo2000;
    }
  },
  upiPrepaidCreditCardsAbove2000() {
    if (this.getShortLeadInfo.leadSource.id === 114) {
      return this.formData.shortLead.appliedUpiPrepaidCreditCardAbove2000;
    } else {
      return this.formData.shortLead.upiPrepaidCreditCardsAbove2000 ;
    }
  },

    IsKYCVerifiedBySAT() {
      return _.find(
        _.orderBy(
          this.getShortLeadInfo.leadVerificationStatus,
          ["id"],
          ["desc"]
        ),
        function(oo) {
          return oo.status && oo.verificationType == 3;
        }
      );
    }
  },
  created() {
    //function to load all lead details when page loads
    this.ajaxLoadShortLeadInfo();
  },

  methods: {
    ...mapActions("SatLeadValidation", [
      "FETCH_SHORT_LEAD_DATA",
      "VERIFY_DEVICE_FULL_LEAD",
      "VERIFY_DOCUMENT_FULL_LEAD",
      "VERIFY_LEAD_DATA"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },
    fnViewHandedOverFileImageApplication() {
      this.$refs.handedOverImageViewerApplication.click();
    },
    //function to load all lead details
    ajaxLoadShortLeadInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_SHORT_LEAD_DATA(this.$route.params.id)
        .then(response => {
          this.formData.shortLead = this.getShortLeadInfo;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },

    // Function to show PDF
    fnOpenPaymentChequeInfo() {
      this.showOpenPaymentChequeInfo = !this.showOpenPaymentChequeInfo;
    },

    fnUploadDocumentAndSubmit() {
      this.toggleUploadDocumentAndSubmit = !this.toggleUploadDocumentAndSubmit;
    },

    fnUploadDocumentAndSubmitRejection() {
      this.toggleLeadRejectModal = !this.toggleLeadRejectModal;
    },

    // Toggle save remarks
    saveRemarks() {
      this.remarks = !this.remarks;
    },

    // funcion to toggle pdf component
    fnPDFViewModal(documentUrl, viewChequeFlag) {
      if (viewChequeFlag == "CHEQUE") {
        this.showOpenPaymentChequeDocumentInfo = !this
          .showOpenPaymentChequeDocumentInfo;
        this.PDFDetails = documentUrl;
        this.toggleshowPDFModal = !this.toggleshowPDFModal;
      } else {
        this.PDFDetails = documentUrl;
        //this.PDFDetails = "http://www.africau.edu/images/default/sample.pdf";
        this.toggleshowPDFModal = !this.toggleshowPDFModal;
      }
    }
  }
};
</script>

<style scoped>
.border-1 {
  border: 1px solid #c7c7c7;
}

.custom-z-index {
  z-index: 2;
}
.title-bg {
  background: #bbbbbb4a;
}
.no-underline {
  text-decoration: none;
  color: #222;
}
.no-underline:hover,
.no-underline:active,
.no-underline:focus {
  text-decoration: none;
  color: #027be3;
}
.cardsize1{
  margin-left: 6px;
  width: 98%;
}
</style>
