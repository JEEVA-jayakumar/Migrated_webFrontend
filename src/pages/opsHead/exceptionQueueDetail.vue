<template>
  <q-page>
    <div class="q-ma-md">
      <!-- START >> Merchant details -->
      <div class="row q-ma-xs">
        <div class="col">
          <div class="text-h6 q-my-md capitalize">{{formData.shortLead.leadName}}</div>
          <div
            class="text-light-blue cursor-pointer"
            @click="toggleLeadInformation(formData.shortLead)"
          ># {{formData.shortLead.id}}</div>
        </div>
        <div class="col">
          <div class="text-h6 q-my-md">Contact</div>
          <div class="no-margin">{{formData.shortLead.contactNumber}}</div>
          <div>{{formData.shortLead.alternateContactNumber}}</div>
        </div>
        <div class="col">
          <div class="text-h6 q-my-md">Address</div>
          <div class="capitalize no-margin">{{formData.shortLead.leadAddress}}</div>
          <div
            class="capitalize no-margin"
          >{{formData.shortLead.city}}, {{formData.shortLead.state}}</div>
        </div>
      </div>
      <!-- END >> Merchant details -->
      <!-- START >>  Device, Exception, Payment, MDR and Documents -->
      <div class="row">
        <div class="col-md-6">
          <div class="flex">
            <!-- START >> Device -->
            <div class="col-md-12 col-sm-12 col-xs-12">
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
                      <q-item-section>Rs. {{formData.shortLead.setupFees}}</q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm text-body1">
                      <q-item-section>Recurring Fees</q-item-section>
                      <q-item-section>Rs. {{formData.shortLead.recurringFees}}</q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm text-body1">
                      <q-item-section>Merchant Category</q-item-section>
                      <q-item-section>{{formData.shortLead.merchantCategory.merchantCategoryName}}</q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
            <!-- END >> Device -->
            <!-- START >> Payment -->
            <div class="col-md-12 col-sm-12 col-xs-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-section class="q-pa-sm bottom-border-dark bg-grey-4">
                  <div class="col-auto text-body1 text-weight-medium">Payment</div>
                </q-card-section>
                <q-separator/>
                <q-card-section class="q-pa-sm text-grey-9">
                  <q-list separator no-border class="no-padding">
                    <q-item class="q-pa-sm">
                      <q-item-section class="text-body1">Payment mode:</q-item-section>
                      <q-item-section class="text-dark text-body1" align="center">
                        <span v-if="formData.shortLead.paymentOption == 1">IMPS/NEFT</span>
                        <span v-else-if="formData.shortLead.paymentOption == 2">Cheque</span>
                        <span v-else-if="formData.shortLead.paymentOption == 3">Swipe</span>
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-section class="text-body1">Reference:</q-item-section>
                      <q-item-section
                        class="text-dark text-body1"
                        align="center"
                      >{{formData.shortLead.referenceNumber}}</q-item-section>
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
                        <q-icon name="clear" color="negative"/>No document attached
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
                        >
                      </viewer>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
            <!-- END >> Payment -->
            <!-- START >> MDR details-->
            <div class="col-md-12 col-sm-12 col-xs-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-section class="q-pa-sm bottom-border title-bg">
                  <span class="text-body1 text-weight-medium">MDR</span>
                </q-card-section>
                <q-card-section class="q-pa-sm text-grey-9">
                  <q-list no-border class="no-padding">
                    <q-item class="q-pa-sm">
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Debit < 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.debitLessthanAmount"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Debit < 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.debitGreaterthanAmount"
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
                          v-model="formData.shortLead.stdCC"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Premium CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.premiumCC"
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
                          v-model="formData.shortLead.corpCC"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Intl Pre CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.intlCC"
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
                          v-model="formData.shortLead.superPremiumlCC"
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
            <!-- END >> MDR details-->
            <!-- START>> SO/SAT remarks -->
            <!-- START>> Sat Remarks and expected doc submission date -->
            <div class="col-md-12 col-sm-12 col-xs-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-section class="q-pa-sm bottom-border title-bg">
                  <span class="text-body1 text-weight-medium">Details</span>
                </q-card-section>
                <q-card-section class="q-pa-sm text-grey-9">
                  <q-list separator no-border class="no-padding">
                    <q-item class="q-pa-sm" multiline>
                      <q-item-section>SO name</q-item-section>
                      <q-item-section
                        class="text-dark capitalize"
                      >{{getKycExceptionInfoById.assignedTo.name}}</q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm" multiline>
                      <q-item-section>SO - Remarks</q-item-section>
                      <q-item-section class="text-dark capitalize">{{getKycExceptionInfoById.reason}}</q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm" multiline>
                      <q-item-section>SAT - Remarks</q-item-section>
                      <q-item-section class="text-dark">
                        <span
                          class="label capitalize"
                          v-if="getKycExceptionInfoById.leadVerificationStatus.length > 0"
                        >{{sortArraysForReason(getKycExceptionInfoById.leadVerificationStatus)}}</span>
                        <span class="label capitalize" v-else>NA</span>
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm" multiline>
                      <q-item-section>SAT - Approved By</q-item-section>
                      <q-item-section class="text-dark">
                        <span
                          class="label capitalize"
                          v-if="getKycExceptionInfoById.leadVerificationStatus.length > 0"
                        >{{sortArraysForCreatedBy(getKycExceptionInfoById.leadVerificationStatus)}}</span>
                        <span class="label capitalize" v-else>NA</span>
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm" multiline>
                      <q-item-section>SAT - Expected submission date</q-item-section>
                      <q-item-section class="text-dark">
                        <span
                          class="label capitalize"
                          v-if="getKycExceptionInfoById.leadVerificationStatus.length > 0"
                        >{{sortArraysForExpectedSubmitDate(getKycExceptionInfoById.leadVerificationStatus) | moment("MMMM Do YYYY")}}</span>
                        <span class="label capitalize" v-else>NA</span>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
            <!-- END>> Sat Remarks and expected doc submission date -->
            <!-- END>> SO/SAT remarks -->
          </div>
        </div>
        <div class="col-md-6">
          <div class="flex">
            <!-- START >> Exception => KYC, Bank Subvention, Pricing will be rendered on condition -->
            <div class="col-md-12 col-sm-12 col-xs-12">
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
            <!-- END >> Exception => KYC, Bank Subvention, Pricing will be rendered on condition -->
            <!-- START >> Documents => below all documents will be rendered on condition -->
            <div class="col-md-12 col-sm-12 col-xs-12">
              <q-card class="q-ma-xs border-1" flat>
                <q-card-section class="q-pa-sm title-bg bottom-border">
                  <span class="text-body1 text-weight-medium">Documents</span>
                </q-card-section>
                <q-card-section class="no-padding">
                  <q-list no-border class="no-padding">
                    <!-- START >>Application document view -->
                    <q-item class="text-body1">
                      <q-item-section class="text-body1">
                        <q-item-label>Application Form</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item separator class="text-body1 bg-grey-3">
                      <div class="full-width">
                        <!-- START >>If document type is PDF format -->
                        <div
                          class="cursor-pointer"
                          v-if="formData.shortLead.applicationFileMimeType.includes('pdf')"
                        >
                          <div
                            @click="fnPDFViewModal(formData.shortLead.applicationFile)"
                            class="ellipsis"
                          >
                            <q-icon name="fas fa-file-pdf" color="negative"/>
                            &nbsp;{{formData.shortLead.applicationFile}}
                          </div>
                        </div>
                        <!-- END >>If document type is PDF format -->
                        <!-- START >>If document type is image format -->
                        <div
                          class="cursor-pointer"
                          v-else-if="formData.shortLead.applicationFileMimeType.includes('image')"
                        >
                          <viewer
                            :images="[GLOBAL_FILE_FETCH_URL+ '/'+formData.shortLead.applicationFile]"
                            class="hidden"
                          >
                            <img
                              :src="[GLOBAL_FILE_FETCH_URL+ '/'+formData.shortLead.applicationFile]"
                              ref="handedOverImageViewer"
                              style="max-width:100%"
                            >
                          </viewer>
                          <div @click="fnViewHandedOverFileImage()" class="ellipsis">
                            <q-btn round size="sm" icon="fas fa-image" color="amber-9"/>
                            &nbsp;{{formData.shortLead.applicationFile}}
                          </div>
                        </div>
                        <!-- END >>If document type is image format -->
                        <!-- START >>If document type is not image/pdf format -->
                        <div v-else>Invalid document type/ No document available</div>
                        <!-- END >>If document type is not image/pdf format -->
                      </div>
                    </q-item>
                    <!-- END >>Application document view -->
                    <!-- START >>Loop through cooked(in store) array for documents -->
                    <q-item
                      class="no-padding"
                      v-if="Object.keys(formData.shortLead.leadDocuments).length > 0"
                    >
                      <q-item-section>
                        <div
                          v-for="(documents,index) in formData.shortLead.leadDocuments"
                          :key="index"
                        >
                          <!-- START >> View type is 0, direct documents  will be visible -->
                          <div
                            class="row items-center full-width"
                            v-if="index.toString()==documents[0].subDocumentType"
                          >
                            <div class="col-md-12 text-body1">
                              <q-expansion-item separator indent multiline class="full-width">
                                <template slot="header">
                                  <q-item-section
                                    :color="documents[0].kycException?'amber-9':''"
                                    :icon="documents[0].kycException? 'warning' :'attach_file'"
                                  />
                                  <q-item-section
                                    class="text-body1"
                                    :sublabel="documents[0].uploadedDocuments.length + 'Document(s)'"
                                    :label="documents[0].subDocumentType"
                                  />
                                  <q-item-section
                                    v-if="documents[0].documentVerifiedStatus == 2"
                                    right
                                  >
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
                                    class="q-py-sm"
                                  >
                                    <div v-if="item.mimeType.includes('application')">
                                      <div
                                        @click="fnPDFViewModal(item.fileName)"
                                        class="cursor-pointer no-underline ellipsis"
                                      >
                                        <q-icon name="fas fa-file-pdf" color="negative"/>
                                        &nbsp;{{item.fileNameOriginal}}
                                      </div>
                                    </div>
                                    <div v-else-if="item.mimeType.includes('image')">
                                      <div class="no-underline cursor-pointer q-pa-md">
                                        <viewer
                                          :images="[GLOBAL_FILE_FETCH_URL+ '/'+item.fileName]"
                                        >
                                          <img
                                            :src="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName"
                                            style="max-width:100%"
                                          >
                                        </viewer>
                                      </div>
                                    </div>
                                    <div v-else>Invalid document type/ No document available</div>
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
                                  class="row items-center full-width"
                                  v-for="(subDocument,subIndex) in documents"
                                  :key="subIndex"
                                >
                                  <div class="col-md-12 text-body1">
                                    <q-expansion-item
                                      separator
                                      group="closeOnOpenSubDocument"
                                      multiline
                                      class="full-width"
                                    >
                                      <template slot="header">
                                        <q-item-section
                                          :color="subDocument.kycException?'amber-9':''"
                                          :icon="subDocument.kycException? 'warning' :'attach_file'"
                                        />
                                        <q-item-section
                                          class="text-body1"
                                          :sublabel="subDocument.uploadedDocuments.length + 'Document(s)'"
                                          :label="subDocument.subDocumentType"
                                        />
                                        <q-item-section
                                          v-if="subDocument.documentVerifiedStatus == 2"
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
                                      <div v-if="subDocument.uploadedDocuments.length > 0">
                                        <div
                                          v-for="(item,subIndex) in subDocument.uploadedDocuments"
                                          :key="subIndex"
                                          class="q-py-sm"
                                        >
                                          <div v-if="item.mimeType.includes('application')">
                                            <div
                                              @click="fnPDFViewModal(item.fileName)"
                                              class="cursor-pointer no-underline ellipsis"
                                            >
                                              <q-icon name="fas fa-file-pdf" color="negative"/>
                                              &nbsp;{{item.fileNameOriginal}}
                                            </div>
                                          </div>
                                          <div v-else-if="item.mimeType.includes('image')">
                                            <div class="no-underline cursor-pointer q-pa-md">
                                              <viewer
                                                :images="[GLOBAL_FILE_FETCH_URL+ '/'+item.fileName]"
                                              >
                                                <img
                                                  :src="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName"
                                                  style="max-width:100%"
                                                >
                                              </viewer>
                                            </div>
                                          </div>
                                          <div v-else>Invalid document type/ No document available</div>
                                        </div>
                                      </div>
                                      <div v-else>No document attached</div>
                                    </q-expansion-item>
                                  </div>
                                  <!-- <div v-else>
                                                                    No document attached
                                  </div>-->
                                </div>
                              </q-expansion-item>
                            </div>
                          </div>
                          <!-- END >> View type is 1, Category has sub category, hence defined in else part -->
                        </div>
                      </q-item-section>
                    </q-item>
                    <!-- END >>Loop through cooked(in store) array for documents -->
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
            <!-- END >> Documents => below all documents will be rendered on condition -->
          </div>
        </div>
      </div>
      <!-- END >>  Device, Exception, Payment, MDR and Documents -->
      <!-- START >> Final actions -->
      <div class="flex">
        <div class="col-md-12" align="right">
          <!-- START >> Cancel button to go back -->
          <q-btn
            icon="block"
            color="grey-5"
            class="q-ma-sm text-dark"
            @click="$router.go(-1)"
            label="Cancel"
          />
          <!-- END >> Cancel button to go back -->
          <!-- START >> Approved button on condition, refer => computed properties -->
          <q-btn
            icon="check"
            color="positive"
            class="q-ma-sm"
            @click="fnApproveLeadData(getKycExceptionInfoById)"
            label="Approve"
          />
          <!-- END >> Approved button on condition, refer => computed properties -->
          <!-- START >> Rejected button on condition, refer => computed properties -->
          <q-btn
            icon="clear"
            class="q-ma-sm"
            color="negative"
            label="Reject"
            @click="fnToggleRejectLeadComp"
          />
          <!-- END >> Rejected button on condition, refer => computed properties -->
        </div>
      </div>
      <!-- END >> Final actions -->
      <!-- START >> COMPONENT: Final approval -->
      <showApproveRemarksComponent
        v-if="toggleApproveLeadModal"
        :propToggleLeadModal="toggleApproveLeadModal"
        :propLeadDetails="getKycExceptionInfoById"
        @toggleLeadModal="fnApproveLeadData"
      ></showApproveRemarksComponent>
      <!-- END >> COMPONENT: Final approval -->
      <!-- START >> COMPONENT: Final reject -->
      <showRejectLeadRejectComponent
        v-if="toggleLeadRejectModal"
        :propToggleLeadModal="toggleLeadRejectModal"
        :propLeadDetails="getKycExceptionInfoById"
        @toggleLeadModal="fnToggleRejectLeadComp"
      ></showRejectLeadRejectComponent>
      <!-- END >> COMPONENT: Final reject -->
      <!-- START >> COMPONENT: Document reject  -->
      <showDocumentLeadApproveComponent
        v-if="toggleLeadDocumentApproveModal"
        :propToggleDocumentApproveModal="toggleLeadDocumentApproveModal"
        :propDocumentDetails="documentApproveTempArr"
        @toggleDocumentModal="fnDocumentApproveModal"
        @toggleDocumentModalHotReload="ajaxLoadShortLeadInfo"
      ></showDocumentLeadApproveComponent>
      <!-- END >> COMPONENT: Document reject -->
      <!-- START >> COMPONENT: Document reject  -->
      <showDocumentLeadRejectComponent
        v-if="toggleLeadDocumentRejectModal"
        :propToggleDocumentRejectModal="toggleLeadDocumentRejectModal"
        :propDocumentDetails="documentRejectTempArr"
        @toggleDocumentModal="fnDocumentRejectModal"
        @toggleDocumentModalHotReload="ajaxLoadShortLeadInfo"
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
      <!-- START >> COMPONENT: View PDF  -->
      <showReasonModalComponent
        v-if="showDocumentModal"
        :propshowDocumentModal="showDocumentModal"
        :propReason="parseReasonValue"
        @toggleReasonModal="fnOpenReasonModal"
      ></showReasonModalComponent>
      <!-- END >> COMPONENT: View PDF -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />

      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35"/>
      </div>
      <!--END >>  Show Ajax Spinner -->
    </div>
  </q-page>
</template>

<script>
import { not, and } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";


import showApproveRemarksComponent from "../../components/opsHead/showApproveRemarksComponent.vue";
import showRejectLeadRejectComponent from "../../components/opsHead/showRejectLeadRejectComponent.vue";
import showDocumentLeadApproveComponent from "../../components/opsHead/showDocumentLeadApproveComponent.vue";
import showDocumentLeadRejectComponent from "../../components/opsHead/showDocumentLeadRejectComponent.vue";
import showPdfModalComponent from "../../components/opsHead/showPdfModalComponent.vue";
import showReasonModalComponent from "../../components/showReasonModalComponent.vue";

import generalLeadInformation from "../../components/generalLeadInformation.vue";

const VERIFIED_KYC_STATUS_FINANCE_PENDING = 6;
const VERIFIED_PRICING_STATUS_FINANCE_PENDING = 4;
const VERIFIED_BANKSUBVENTION_STATUS_FINANCE_PENDING = 3;

export default {
  name: "exceptionQueueDetails",
  components: {
    showPdfModalComponent,
    showApproveRemarksComponent,
    showRejectLeadRejectComponent,
    showDocumentLeadApproveComponent,
    showDocumentLeadRejectComponent,
    showReasonModalComponent,
    generalLeadInformation
  },
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      PDFDetails: null,
      toggleshowPDFModal: false,
      showOpenPaymentChequeInfo: false,

      showDocumentModal: false,
      parseReasonValue: null,

      toggleApproveLeadModal: false,
      toggleLeadRejectModal: false,
      toggleLeadDocumentApproveModal: false,
      toggleLeadDocumentRejectModal: false,
      toggleshowPDFModal: false,
      PDFDetails: null,

      documentApproveTempArr: [],
      documentRejectTempArr: [],
      rejectTempArr: [],

      showProceedToDataEntryButton: false,
      toggleAjaxLoadFilter: false,

      model: "",
      tabsModel: "xtab-2",

      toggleChequeImageResult: false,
      checked: false,
      thumbnailsHorizontal: false,

      leadRejectReason: "",
      formData: {
        shortLead: ""
      }
    };
  },
  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("OPSHead", ["getKycExceptionInfoById"])
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    //function to load all lead details when page loads
    this.ajaxLoadShortLeadInfo();
  },
  // unmounted() {
  //   this.$q.notify({
  //     timeout: 0
  //   });
  // },
  methods: {
    ...mapActions("OPSHead", [
      "FETCH_ALL_EXCEPTION_KYC_BY_ID_DATA",
      "FEED_EQ_KYC_FEEDBACK"
    ]),
    ...mapActions("SatLeadValidation", [
      "VERIFY_LEAD_DOCUMENTS",
      "VERIFY_REJECT_LEAD_DOCUMENTS"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    fnViewHandedOverFileImage() {
      this.$refs.handedOverImageViewer.click();
    },

    //function to load all lead details
    ajaxLoadShortLeadInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching list .."
      });
      this.FETCH_ALL_EXCEPTION_KYC_BY_ID_DATA(this.$route.params.id)
        .then(response => {
          this.$q.loading.hide();
          this.formData.shortLead = this.getKycExceptionInfoById;
        })
        .catch(() => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },

    // function to toggle cheque image for payments info if available
    toggleChequeImage() {
      this.toggleChequeImageResult = !this.toggleChequeImageResult;
    },

    fnDocumentApproveModal(documentDetails) {
      this.toggleLeadDocumentApproveModal = !this
        .toggleLeadDocumentApproveModal;
      documentDetails["leadId"] = this.$route.params.id;
      this.documentApproveTempArr = documentDetails;
    },

    fnDocumentRejectModal(documentDetails) {
      this.toggleLeadDocumentRejectModal = !this.toggleLeadDocumentRejectModal;
      documentDetails["leadId"] = this.$route.params.id;
      this.documentRejectTempArr = documentDetails;
    },

    fnShowPDFModal(pdfDetails) {
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
      this.pdfDetails = pdfDetails;
    },

    // function to approve lead and send to OPS HEAD
    fnApproveLeadData(leadInfo) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Validating .."
      });
      this.VERIFY_LEAD_DOCUMENTS({
        id: this.$route.params.id,
        params: []
      })
        .then(response => {
          this.toggleApproveLeadModal = !this.toggleApproveLeadModal;
          this.$q.loading.hide();
        })
        .catch(error => {
          if (error.data.data.toBeVerifiedDocuments.length > 0) {
            let arrayMessage = "";
            _.map(error.data.data.toBeVerifiedDocuments, oo => {
              arrayMessage += `${oo}, `;
            });
            this.$q.notify({
              color: "amber-9",
              position: "bottom-left",
              message: `${error.data.message}`,
              detail: arrayMessage,
              timeout: 8000,
              icon: "warning",
              actions: [
                {
                  icon: "clear", // optional
                  noDismiss: false // optional, v0.15.11+
                }
              ]
            });
          } else {
            error.data.data.splice("toBeVerifiedDocuments", 1);
            for (var key in error.data.data) {
              let arrayMessage = "";
              _.map(error.data.data[key], oo => {
                arrayMessage += `${oo}, `;
              });
              this.$q.notify({
                color: "amber-9",
                position: "bottom-left",
                message: `${error.data.message} for ${key}`,
                detail: arrayMessage,
                timeout: 8000,
                icon: "warning",
                actions: [
                  {
                    icon: "clear", // optional
                    noDismiss: false // optional, v0.15.11+
                  }
                ]
              });
            }
          }
          this.$q.loading.hide();
        });
    },

    // funcion to toggle reject lead component
    fnToggleRejectLeadComp() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Validating .."
      });
      this.VERIFY_REJECT_LEAD_DOCUMENTS({
        id: this.$route.params.id
      })
        .then(response => {
          this.toggleLeadRejectModal = !this.toggleLeadRejectModal;
          this.$q.loading.hide();
        })
        .catch(error => {
          let arrayMessage = "";
          _.map(error.data.data, oo => {
            arrayMessage += `${oo}, `;
          });
          this.$q.notify({
            color: "amber-9",
            position: "bottom-left",
            message: `${error.data.message}`,
            detail: arrayMessage,
            timeout: 8000,
            icon: "warning",
            actions: [
              {
                icon: "clear", // optional
                noDismiss: false // optional, v0.15.11+
              }
            ]
          });
          this.$q.loading.hide();
        });
    },

    fnOpenReasonModal(rejectReason) {
      this.showDocumentModal = !this.showDocumentModal;
      this.parseReasonValue = rejectReason;
    },

    fnOpenPaymentChequeInfo() {
      this.showOpenPaymentChequeInfo = !this.showOpenPaymentChequeInfo;
    },

    // Function to show PDF
    fnPDFViewModal(documentUrl) {
      this.showOpenPaymentChequeDocumentInfo = !this
        .showOpenPaymentChequeDocumentInfo;
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
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

    // Function to fetch latest createdBy because of reject and reprocess
    sortArraysForCreatedBy(item) {
      let arrCooked = _.orderBy(item, "id", "desc");
      var arrFinal = arrCooked.reduce(function(value, index) {
        if (
          _.has(value, "verificationType") &&
          value.verificationType == 3 &&
          value.status
        ) {
          return value;
        }
      });
      if (_.isEmpty(arrFinal)) {
        return "NA";
      } else {
        return arrFinal.createdBy.name;
        // return "Abinandhan";
      }
    },

    // Function to fetch latest reason because of reject and reprocess
    sortArraysForReason(item) {
      let arrCooked = _.orderBy(item, "id", "desc");
      var arrFinal = arrCooked.reduce(function(value, index) {
        if (
          _.has(value, "verificationType") &&
          value.verificationType == 3 &&
          value.status
        ) {
          return value;
        }
      });
      if (_.isEmpty(arrFinal)) {
        return "NA";
      } else {
        return arrFinal.kycSatRemark;
      }
    },

    // Function to fetch latest expected submit date because of reject and reprocess
    sortArraysForExpectedSubmitDate(item) {
      let arrCooked = _.orderBy(item, "id", "desc");
      var arrFinal = arrCooked.reduce(function(value, index) {
        if (
          _.has(value, "verificationType") &&
          value.verificationType == 3 &&
          value.status
        ) {
          return value;
        }
      });
      if (_.isEmpty(arrFinal)) {
        return "NA";
      } else {
        return arrFinal.expectedSubmitDate;
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
</style>
