<template>
  <div>
    <q-list no-border class="no-padding">
      <q-item
        class="no-padding"
        v-if="Object.keys(propLeadDocumentInformation).length >= 0"
      >
        <q-item-main>
          <div>
            <div v-if="propGetShortInfo.documentUploadedType != 1" class="row items-center full-width">
              <div class="col-md-12 q-body-1">
                <q-collapsible separator indent opened class="full-width">
                  <template slot="header">
                    <q-item-side icon="apps" />
                    <q-item-main class="q-body-1" :sublabel="'FORMS'" />
                  </template>
                  <b><label>Agreement Form & Application Form</label></b>
                  <q-item separator class="q-body-1">
                    <q-item-main>
                      <div class="full-width">
                        <div
                          class="cursor-pointer"
                          v-if="
                            propGetShortInfo.aggrementFormMimeType.includes(
                              'pdf'
                            )
                          "
                        >
                          <div
                            @click="
                              fnPDFViewModal(propGetShortInfo.aggrementForm)
                            "
                          >
                            <q-btn
                              round
                              size="sm"
                              icon="fas fa-file-pdf"
                              color="primary"
                            />
                            &nbsp;{{ propGetShortInfo.aggrementForm }}
                          </div>
                        </div>
                        <div
                          class="cursor-pointer"
                          v-else-if="
                            propGetShortInfo.aggrementFormMimeType.includes(
                              'image'
                            )
                          "
                        >
                          <viewer
                            :images="[
                              GLOBAL_FILE_FETCH_URL +
                                '/' +
                                propGetShortInfo.aggrementForm
                            ]"
                            class="hidden"
                          >
                            <img
                              :src="[
                                GLOBAL_FILE_FETCH_URL +
                                  '/' +
                                  propGetShortInfo.aggrementForm
                              ]"
                              ref="handedOverImageViewerAgreement"
                              style="max-width:100%"
                            />
                          </viewer>
                          <div
                            @click="fnViewHandedOverFileImageAgreement()"
                            class="ellipsis"
                          >
                            <q-icon name="fas fa-image" color="amber-9" />
                            &nbsp;{{ propGetShortInfo.aggrementForm }}
                          </div>
                        </div>
                        <div v-else>
                          Invalid document type/ No document available
                        </div>
                      </div>
                    </q-item-main>
                  </q-item>

                  <!-- <b><label>Application Form</label></b>
                  <q-item separator class="q-body-1">
                    <q-item-main>
                      <div class="full-width">
                        <div
                          class="cursor-pointer"
                          v-if="
                            propGetShortInfo.applicationFormMimeType.includes(
                              'pdf'
                            )
                          "
                        >
                          <div
                            @click="
                              fnPDFViewModal(propGetShortInfo.applicationForm)
                            "
                          >
                            <q-btn
                              round
                              size="sm"
                              icon="fas fa-file-pdf"
                              color="primary"
                            />
                            &nbsp;{{ propGetShortInfo.applicationForm }}
                          </div>
                        </div>
                        <div
                          class="cursor-pointer"
                          v-else-if="
                            propGetShortInfo.applicationFormMimeType.includes(
                              'image'
                            )
                          "
                        >
                          <viewer
                            :images="[
                              GLOBAL_FILE_FETCH_URL +
                                '/' +
                                propGetShortInfo.applicationForm
                            ]"
                            class="hidden"
                          >
                            <img
                              :src="[
                                GLOBAL_FILE_FETCH_URL +
                                  '/' +
                                  propGetShortInfo.applicationForm
                              ]"
                              ref="handedOverImageViewerApplication"
                              style="max-width:100%"
                            />
                          </viewer>
                          <div
                            @click="fnViewHandedOverFileImageApplication()"
                            class="ellipsis"
                          >
                            <q-icon name="fas fa-image" color="amber-9" />
                            &nbsp;{{ propGetShortInfo.applicationForm }}
                          </div>
                        </div>
                        <div v-else>
                          Invalid document type/ No document available
                        </div>
                      </div>
                    </q-item-main>
                  </q-item> -->

                  <b><label>Cheque Leaf</label></b>
                  <q-item separator class="q-body-1">
                    <q-item-main>
                      <div class="full-width">
                        <div
                          class="cursor-pointer"
                          v-if="
                            propGetShortInfo.chequeLeafFormMimeType.includes(
                              'pdf'
                            )
                          "
                        >
                          <div
                            @click="
                              fnPDFViewModal(propGetShortInfo.chequeLeafForm)
                            "
                          >
                            <q-btn
                              round
                              size="sm"
                              icon="fas fa-file-pdf"
                              color="primary"
                            />
                            &nbsp;{{ propGetShortInfo.chequeLeafForm }}
                          </div>
                        </div>
                        <div
                          class="cursor-pointer"
                          v-else-if="
                            propGetShortInfo.chequeLeafFormMimeType.includes(
                              'image'
                            )
                          "
                        >
                          <viewer
                            :images="[
                              GLOBAL_FILE_FETCH_URL +
                                '/' +
                                propGetShortInfo.chequeLeafForm
                            ]"
                            class="hidden"
                          >
                            <img
                              :src="[
                                GLOBAL_FILE_FETCH_URL +
                                  '/' +
                                  propGetShortInfo.chequeLeafForm
                              ]"
                              ref="handedOverImageViewerCheque"
                              style="max-width:100%"
                            />
                          </viewer>
                          <div
                            @click="fnViewHandedOverFileImageCheque()"
                            class="ellipsis"
                          >
                            <q-icon name="fas fa-image" color="amber-9" />
                            &nbsp;{{ propGetShortInfo.chequeLeafForm }}
                          </div>
                        </div>
                        <div v-else>
                          Invalid document type/ No document available
                        </div>
                      </div>
                    </q-item-main>
                  </q-item>

                  <b><label>Implementation Form</label></b>
                  <q-item separator class="q-body-1">
                    <q-item-main>
                      <div class="full-width">
                        <div
                          class="cursor-pointer"
                          v-if="
                            propGetShortInfo.implementationFormMimeType.includes(
                              'pdf'
                            )
                          "
                        >
                          <div
                            @click="
                              fnPDFViewModal(
                                propGetShortInfo.implementationForm
                              )
                            "
                          >
                            <q-btn
                              round
                              size="sm"
                              icon="fas fa-file-pdf"
                              color="primary"
                            />
                            &nbsp;{{ propGetShortInfo.implementationForm }}
                          </div>
                        </div>
                        <div
                          class="cursor-pointer"
                          v-else-if="
                            propGetShortInfo.implementationFormMimeType.includes(
                              'image'
                            )
                          "
                        >
                          <viewer
                            :images="[
                              GLOBAL_FILE_FETCH_URL +
                                '/' +
                                propGetShortInfo.implementationForm
                            ]"
                            class="hidden"
                          >
                            <img
                              :src="[
                                GLOBAL_FILE_FETCH_URL +
                                  '/' +
                                  propGetShortInfo.implementationForm
                              ]"
                              ref="handedOverImageViewerImplementation"
                              style="max-width:100%"
                            />
                          </viewer>
                          <div
                            @click="fnViewHandedOverFileImageImplementation()"
                            class="ellipsis"
                          >
                            <q-icon name="fas fa-image" color="amber-9" />
                            &nbsp;{{ propGetShortInfo.implementationForm }}
                          </div>
                        </div>
                        <div v-else>
                          Invalid document type/ No document available
                        </div>
                      </div>
                    </q-item-main>
                  </q-item>

                  <b><label>Picture of Shop</label></b>
                  <q-item separator class="q-body-1">
                    <q-item-main>
                      <div class="full-width">
                        <div
                          class="cursor-pointer"
                          v-if="
                            propGetShortInfo.pictureOfShopMimeType.includes(
                              'pdf'
                            )
                          "
                        >
                          <div
                            @click="
                              fnPDFViewModal(propGetShortInfo.pictureOfShop)
                            "
                          >
                            <q-btn
                              round
                              size="sm"
                              icon="fas fa-file-pdf"
                              color="primary"
                            />
                            &nbsp;{{ propGetShortInfo.pictureOfShop }}
                          </div>
                        </div>
                        <div
                          class="cursor-pointer"
                          v-else-if="
                            propGetShortInfo.pictureOfShopMimeType.includes(
                              'image'
                            )
                          "
                        >
                          <viewer
                            :images="[
                              GLOBAL_FILE_FETCH_URL +
                                '/' +
                                propGetShortInfo.pictureOfShop
                            ]"
                            class="hidden"
                          >
                            <img
                              :src="[
                                GLOBAL_FILE_FETCH_URL +
                                  '/' +
                                  propGetShortInfo.pictureOfShop
                              ]"
                              ref="handedOverImageViewerPicture"
                              style="max-width:100%"
                            />
                          </viewer>
                          <div
                            @click="fnViewHandedOverFileImagePicture()"
                            class="ellipsis"
                          >
                            <q-icon name="fas fa-image" color="amber-9" />
                            &nbsp;{{ propGetShortInfo.pictureOfShop }}
                          </div>
                        </div>
                        <div v-else>
                          Invalid document type/ No document available
                        </div>
                      </div>
                    </q-item-main>
                  </q-item>
                </q-collapsible>
              </div>
            </div>

            <div v-if="propGetShortInfo.documentUploadedType == 1">
              <q-item
  separator
  class="q-body-1 text-dark bg-grey-4 text-weight-medium"
>
  <q-item-main>Agreement Form & Application Form</q-item-main>
  <q-item-side>
    <label
      class="cursor-pointer text-white"
      style="background-color: #202c3f;"
    >
      <span class="q-caption text-weight-light">Attach</span>
      <input
        type="file"
        name="file"
@change="fnVerificationDocumentUploadFormsUpload($event, 'Agreement')"
        accept=".png, .jpg, .pdf"
      />
    </label>
  </q-item-side>
</q-item>
<q-item separator class="q-body-1">
  <q-item-main>
    <div class="full-width">
      <div class="cursor-pointer" v-if="isAgreementPdf">
        <div
          @click="fnPDFViewModal(propGetShortInfo.aggrementForm)"
          class="ellipsis"
        >
          <q-btn
            round
            size="sm"
            icon="fas fa-file-pdf"
            color="primary"
          />
          &nbsp;{{ propGetShortInfo.aggrementForm }}
        </div>
      </div>
      <div class="cursor-pointer" v-else-if="isAgreementImage">
        <viewer :images="[agreementImageSource]" class="hidden">
          <img
            :src="agreementImageSource"
            ref="handedOverImageViewerAgreement"
            style="max-width:100%"
          />
        </viewer>
        <div
          @click="fnViewHandedOverFileImageAgreement()"
          class="ellipsis"
        >
          <q-icon name="fas fa-image" color="amber-9" />
          &nbsp;{{ propGetShortInfo.aggrementForm }}
        </div>
      </div>
      <div v-else>
        No document available
     </div>
 </div>
</q-item-main>
</q-item>

<!-- <q-item
  separator
  class="q-body-1 text-dark bg-grey-4 text-weight-medium"
>
  <q-item-main>Application Form</q-item-main>
  <q-item-side>
    <label
      class="cursor-pointer text-white"
      style="background-color: #202c3f;"
    >
      <span class="q-caption text-weight-light">Attach</span>
      <input
        type="file"
        name="file"
        @change="fnVerificationDocumentUploadFormsUpload($event, 'ApplicationForm')"
        accept=".png, .jpg, .pdf"
      />
    </label>
  </q-item-side>
</q-item>
<q-item separator class="q-body-1">
  <q-item-main>
    <div class="full-width">
      <div class="cursor-pointer" v-if="isApplicationPdf">
        <div
          @click="fnPDFViewModal(propGetShortInfo.applicationForm)"
          class="ellipsis"
        >
          <q-btn
            round
            size="sm"
            icon="fas fa-file-pdf"
            color="primary"
          />
          &nbsp;{{ propGetShortInfo.applicationForm }}
        </div>
      </div>
      <div class="cursor-pointer" v-else-if="isApplicationImage">
        <viewer :images="[applicationImageSource]" class="hidden">
          <img
            :src="applicationImageSource"
            ref="handedOverImageViewerApplication"
            style="max-width:100%"
          />
        </viewer>
        <div
          @click="fnViewHandedOverFileImageApplication()"
          class="ellipsis"
        >
          <q-icon name="fas fa-image" color="amber-9" />
          &nbsp;{{ propGetShortInfo.applicationForm }}
        </div>
      </div>
      <div v-else>
        No document available
      </div>
    </div>
  </q-item-main>
</q-item> -->

              <q-item
                separator
                class="q-body-1 text-dark bg-grey-4 text-weight-medium"
              >
                <q-item-main>Cheque Leaf</q-item-main>
                <q-item-side>
                  <label
                    id="attach"
                    class="cursor-pointer text-white"
                    style="background-color: #202c3f;"
                  >
                    <span class="q-caption text-weight-light">Attach</span>
                    <input
                      type="file"
                      name="file"
                 @change="fnVerificationDocumentUploadFormsUpload($event, 'ChequeleaforBankstatement')"
                      accept=".png, .jpg, .pdf"
                    />
                  </label>
                </q-item-side>
              </q-item>
              <q-item separator class="q-body-1">
                <q-item-main>
                  <div class="full-width">
                    <div class="cursor-pointer" v-if="isChequeLeafPdf">
                      <div
                        @click="fnPDFViewModal(propGetShortInfo.chequeLeafForm)"
                        class="ellipsis"
                      >
                        <q-btn
                          round
                          size="sm"
                          icon="fas fa-file-pdf"
                          color="primary"
                        />
                        &nbsp;{{ propGetShortInfo.chequeLeafForm }}
                      </div>
                    </div>
                    <div class="cursor-pointer" v-else-if="isChequeLeafImage">
                      <viewer :images="[chequeLeafImageSource]" class="hidden">
                        <img
                          :src="chequeLeafImageSource"
                          ref="handedOverImageViewerCheque"
                          style="max-width:100%"
                        />
                      </viewer>
                      <div
                        @click="fnViewHandedOverFileImageCheque()"
                        class="ellipsis"
                      >
                        <q-icon name="fas fa-image" color="amber-9" />
                        &nbsp;{{ propGetShortInfo.chequeLeafForm }}
                      </div>
                    </div>
                    <div v-else>
                      No document available
                    </div>
                  </div>
                </q-item-main>
              </q-item>

              <q-item
              separator
              class="q-body-1 text-dark bg-grey-4 text-weight-medium"   >
              <q-item-main>Implementation Form</q-item-main>
              <q-item-side>
                <label
                  id="attach"
                  class="cursor-pointer text-white"
                  style="background-color: #202c3f;"
                >
                  <span class="q-caption text-weight-light">Attach</span>
                  <input
                    type="file"
                   name="file"
                   @change="fnVerificationDocumentUploadFormsUpload($event,'ImplementationForm')"
                    accept=".png, .jpg, .pdf"
                  />
                </label>
              </q-item-side>
            </q-item>
            <q-item separator class="q-body-1">
              <q-item-main>
                <div class="full-width">
                  <div class="cursor-pointer" v-if="isImplementationPdf">
                    <div
                 @click="fnPDFViewModal(propGetShortInfo.implementationForm)"
                      class="ellipsis"
                    >
                      <q-btn
                        round
                        size="sm"
                        icon="fas fa-file-pdf"
                        color="primary"
                      />
                      &nbsp;{{ propGetShortInfo.implementationForm }}
                    </div>
                  </div>
                  <div class="cursor-pointer" v-else-if="isImplementationImage">
           <viewer :images="[implementationImageSource]" class="hidden">
                      <img
                        :src="implementationImageSource"
                      ref="handedOverImageViewerImplementation"
                        style="max-width:100%"
                      />
                    </viewer>
                    <div
                      @click="fnViewHandedOverFileImageImplementation()"
                      class="ellipsis"
                    >
                      <q-icon name="fas fa-image" color="amber-9" />
                      &nbsp;{{ propGetShortInfo.implementationForm }}
                      </div>
                    </div>
                    <div v-else>
                      No document available
                    </div>
                  </div>
                </q-item-main>
            </q-item>
            <q-item
            separator
            class="q-body-1 text-dark bg-grey-4 text-weight-medium">
            <q-item-main>Picture of Shop</q-item-main>
            <q-item-side>
              <label
                id="attach"
                class="cursor-pointer text-white"
                style="background-color: #202c3f;"
              >
                <span class="q-caption text-weight-light">Attach</span>
                <input
                  type="file"
                  name="file"
                  @change="fnVerificationDocumentUploadFormsUpload($event, 'PhotoofShop')"
                  accept=".png, .jpg, .pdf"
                />
    </label>
</q-item-side>
          </q-item>
          <q-item separator class="q-body-1">
            <q-item-main>
              <div class="full-width">
                <div class="cursor-pointer" v-if="isPictureOfShopPdf">
                  <div
                    @click="fnPDFViewModal(propGetShortInfo.pictureOfShop)"
                    class="ellipsis"
                  >
                    <q-btn
                      round
                      size="sm"
                      icon="fas fa-file-pdf"
                      color="primary"
                    />
                    &nbsp;{{ propGetShortInfo.pictureOfShop }}
                   </div>
                 </div>
                <div
                   class="cursor-pointer" v-else-if="isPictureOfShopImage">
                  <viewer :images="[pictureOfShopImageSource]" class="hidden">
                    <img
                      :src="pictureOfShopImageSource"
                      ref="handedOverImageViewerPicture"
                      style="max-width:100%"
                    />
                  </viewer>
                  <div
                    @click="fnViewHandedOverFileImagePicture()"
                    class="ellipsis"
                  >
                    <q-icon name="fas fa-image" color="amber-9" />
                    &nbsp;{{ propGetShortInfo.pictureOfShop }}
                  </div>
                </div>
                <div v-else>
                  No document available
                </div>
              </div>
            </q-item-main>
          </q-item>
            </div>

            <div v-if="propGetShortInfo.documentUploadedType != null && propGetShortInfo.qrLeadCategory == false">
              <div
                v-if="propGetShortInfo.documentUploadedType != 1 && propGetShortInfo.qrLeadCategory == false"
                class="row items-center full-width"
              >
                <div class="col-md-12 q-body-1">
                  <q-collapsible separator indent opened class="full-width">
                    <template slot="header">
                      <q-item-side icon="apps" />
                      <q-item-main
                        class="q-body-1"
                        :sublabel="
                          propLeadDocumentInformation.length + 'Type(s)'
                        "
                      />
                    </template>
                    <div
                      class="row items-center full-width"
                      v-for="(subDocument,
                      subIndex) in propLeadDocumentInformation"
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
                            <q-item-main
                              class="q-body-1"
                              :sublabel="
                                subDocument.uploadedDocuments.length +
                                  'Document(s)'
                              "
                              :label="subDocument.subDocumentType"
                            />
                            <q-item-side
                              v-if="
                                [2, 4].includes(
                                  subDocument.documentVerifiedStatus
                                )
                              "
                              right
                            >
                              <q-btn
                                round
                                size="xs"
                                class="q-ma-xs"
                                color="green"
                                icon="fas fa-check"
                                @click.stop="
                                  fnDocumentApproveModal(subDocument)
                                "
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
                                >Approved</span
                              >
                              <span
                                v-if="subDocument.documentVerifiedStatus == 3"
                                class="q-body-1 text-weight-medium text-negative"
                                >Rejected</span
                              >
                              <div v-if="propGetShortInfo.qrLeadStatus == 9">
                                <q-btn
                                  round
                                  size="xs"
                                  class="q-ma-xs"
                                  color="green"
                                  icon="fas fa-check"
                                  @click.stop="
                                    fnDocumentApproveModal(subDocument)
                                  "
                                />
                                <q-btn
                                  round
                                  size="xs"
                                  class="q-ma-xs"
                                  color="red"
                                  icon="fas fa-times"
                                  @click.stop="
                                    fnDocumentRejectModal(subDocument)
                                  "
                                />
                              </div>
                            </q-item-side>
                          </template>
                          <div v-if="subDocument.uploadedDocuments.length > 0">
                            <div
                              v-for="(item,
                              subIndex) in subDocument.uploadedDocuments"
                              :key="subIndex"
                              class="q-py-sm cursor-pointer"
                            >
                              <div v-if="item.mimeType.includes('application')">
                                <div
                                  @click="fnPDFViewModal(item.fileName)"
                                  class="ellipsis"
                                >
                                  <q-btn
                                    round
                                    size="sm"
                                    icon="fas fa-file-pdf"
                                    color="primary"
                                  />
                                  &nbsp;{{ item.fileName }}
                                </div>
                              </div>
                              <div
                                v-else-if="item.mimeType.includes('image')"
                                class="q-pa-md"
                              >
                                <viewer
                                  :images="[
                                    GLOBAL_FILE_FETCH_URL + '/' + item.fileName
                                  ]"
                                >
                                  <img
                                    :src="
                                      GLOBAL_FILE_FETCH_URL +
                                        '/' +
                                        item.fileName
                                    "
                                    style="max-width:100%"
                                  />
                                </viewer>
                              </div>
                              <div v-else class="full-width">
                                Invalid document type/ No document available
                              </div>
                            </div>
                          </div>
                          <div v-else>No document available</div>
                        </q-collapsible>
                      </div>
                    </div>
                  </q-collapsible>
                </div>
              </div>

              <div v-if="propGetShortInfo.documentUploadedType != 2">
                <!-- <q-item separator class="q-body-1">
                  <q-item-main>
                    <q-item-tile>
                      <div class="q-body-1">
                        Merchant Type:
                        <span class="text-weight-medium">{{
                          merchantTypeSelection
                        }}</span>
                      </div>
                    </q-item-tile>
                  </q-item-main>
                </q-item> -->

                <!-- {{ this.propGetShortInfo.qrMerchantType.merchantTypeName }} -->
                <!-- <div class="group" v-if="(this.propGetShortInfo.qrMerchantType.merchantTypeName ===  'Individuals') || (this.propGetShortInfo.qrMerchantType.merchantTypeName ===  'Sole Proprietorship')"> -->

                <div
                  class="group"
                  v-if="
                    this.propGetShortInfo.qrMerchantType.merchantTypeName ==
                      'Sole Proprietorship' ||
                      this.propGetShortInfo.qrMerchantType.merchantTypeName ==
                        'Individuals'
                  "
                >
                  <q-list
                    class="no-padding"
                    dense
                    v-for="(singleDocument,
                    singleDocumentIndex) in documents.forSingleDocument"
                    v-if="
                      getQrShortLeadInfoDocumentTypes &&
                        singleDocument.isQr != 0
                    "
                    :key="singleDocumentIndex"
                  >
                    <div
                      v-for="(document,
                      documentIndex) in singleDocument.documents"
                      :key="documentIndex"
                      class="border-bottom"
                    >
                      <q-item
                        separator
                        dense
                        class="q-body-1 bg-grey-4 q-pa-sm"
                      >
                        <q-item-main>
                          {{ document.subDocumentType }}
                        </q-item-main>
                        <q-item-side>
                          <label
                            id="attach"
                            class="cursor-pointer text-white"
                            style="background-color: #202c3f;"
                          >
                            <span class="q-caption text-weight-light"
                              >Attach</span
                            >
                            <input
                              type="file"
                              name="file"
                              @change="
                                fnVerificationDocumentUploadSingleUpload(
                                  $event,
                                  document
                                )
                              "
                              accept=".png, .jpg, .pdf"
                            />
                          </label>
                        </q-item-side>
                      </q-item>
                      <!-- {{ document.documentType }}    {{ displayAttachedFileIndex }}  -->

                      <div
                        v-if="displayAttachedFileIndex == document.documentType"
                        v-for="(displayAttachedFile,
                        displayAttachedFileIndex) in Docs"
                        :key="displayAttachedFileIndex"
                      >
                        <div
                          v-if="
                            attachedSubFile.subDocumentType ==
                              document.subDocumentType
                          "
                          v-for="attachedSubFile in displayAttachedFile"
                          :key="attachedSubFile.id"
                        >
                          <q-item
                            dense
                            v-for="(filesAttachedEarlier,
                            filesAttachedEarlierIndex) in attachedSubFile.uploadedDocuments"
                            :key="filesAttachedEarlierIndex"
                            class="q-body-1"
                            separator
                          >
                            <q-item-main>
                              <q-item-tile class="q-body-1">
                                <div
                                  class="cursor-pointer"
                                  v-if="
                                    filesAttachedEarlier.mimeType.includes(
                                      'pdf'
                                    )
                                  "
                                >
                                  <div
                                    ref="attachedImageViewer"
                                    @click="
                                      fnPDFViewModal(
                                        filesAttachedEarlier.fileName
                                      )
                                    "
                                    class="ellipsis"
                                  >
                                    <q-icon
                                      name="fas fa-file-pdf"
                                      color="negative"
                                    />
                                    &nbsp;{{ filesAttachedEarlier.fileName }}
                                  </div>
                                </div>
                                <div
                                  class="cursor-pointer"
                                  v-else-if="
                                    filesAttachedEarlier.mimeType.includes(
                                      'image'
                                    )
                                  "
                                >
                                  <viewer
                                    :images="[
                                      GLOBAL_FILE_FETCH_URL +
                                        '/' +
                                        filesAttachedEarlier.fileName
                                    ]"
                                    class="hidden"
                                  >
                                    <img
                                      :src="[
                                        GLOBAL_FILE_FETCH_URL +
                                          '/' +
                                          filesAttachedEarlier.fileName
                                      ]"
                                      ref="attachedImageViewer"
                                      style="max-width:100%"
                                    />
                                  </viewer>
                                  <div
                                    @click="
                                      fnViewAttachedFileImage(
                                        filesAttachedEarlierIndex
                                      )
                                    "
                                    class="ellipsis"
                                  >
                                    <q-icon
                                      name="fas fa-image"
                                      color="amber-9"
                                    />
                                    &nbsp;{{ filesAttachedEarlier.fileName }}
                                  </div>
                                </div>
                              </q-item-tile>
                            </q-item-main>

                            <q-item-side>
                              <q-btn
                                size="xs"
                                icon="clear"
                                @click="
                                  fnDeleteAlreadyAttachedFile(
                                    filesAttachedEarlier
                                  )
                                "
                                round
                                color="negative"
                                label="Remove"
                              />
                            </q-item-side>
                          </q-item>
                        </div>
                      </div>
                    </div>
                  </q-list>

                  <div>
                    <q-list
                      class="no-padding"
                      dense
                      v-for="multipleDocument in documents.forMutipleDocument"
                      :key="multipleDocument.id"
                      v-if="
                        getQrShortLeadInfoDocumentTypes &&
                          multipleDocument.isQr != 0
                      "
                    >
                      <q-list-header
                        v-if="multipleDocument.isQr != 0"
                        class="q-mb-sm bg-grey-4"
                        >{{ multipleDocument.documentType }}
                      </q-list-header>
                      <div>
                        <q-item separator dense class="q-body-1 q-pa-sm">
                          <q-item-main>
                            <select
                              v-if="multipleDocument.isQr != 0"
                              class="full-width customQuasarSelect"
                              v-model="
                                multipleDocument.subDocumentTypeSelection
                              "
                              @change="
                                fnGetSubDocuments(
                                  multipleDocument.subDocumentTypeSelection
                                )
                              "
                            >
                              <option disabled value="0"
                                >Choose from below</option
                              >
                              <option
                                v-for="type in multipleDocument.documents"
                                :key="type.id"
                                :value="type"
                                v-if="type.isQr != 0"
                                >{{ type.subDocumentType }}
                              </option>
                            </select>
                          </q-item-main>
                          <q-item-side
                            v-if="
                              fn_________GetEntryPermissionToUploadSubDocuments(
                                multipleDocument
                              )
                            "
                            ref="subDocumentUploadParent"
                          >
                            <label
                              id="attach"
                              class="cursor-pointer text-white"
                              style="background-color: #202c3f;"
                            >
                              <span class="q-caption text-weight-light"
                                >Attach</span
                              >
                              <input
                                type="file"
                                ref="subDocumentUpload"
                                @change="
                                  fnVerificationDocumentUpload(
                                    $event,
                                    multipleDocument.subDocumentTypeSelection
                                  )
                                "
                                name="file"
                                accept=".png, .jpg, .pdf"
                              />
                            </label>
                          </q-item-side>
                        </q-item>
                      </div>
                      <q-item-separator />

                      <div
                        v-if="
                          displayAttachedFileIndex ==
                            multipleDocument.documentType
                        "
                        v-for="(displayAttachedFile,
                        displayAttachedFileIndex) in Docs"
                        :key="displayAttachedFileIndex"
                      >
                        <div
                          v-for="attachedSubFile in displayAttachedFile"
                          :key="attachedSubFile.id"
                        >
                          <q-item
                            v-for="(filesAttachedEarlier,
                            filesAttachedEarlierIndex) in attachedSubFile.uploadedDocuments"
                            :key="filesAttachedEarlierIndex"
                            class="q-body-1"
                            separator
                            dense
                          >
                            <q-item-main>
                              <q-item-tile class="q-body-1">
                                <div
                                  class="cursor-pointer"
                                  v-if="
                                    filesAttachedEarlier.mimeType.includes(
                                      'pdf'
                                    )
                                  "
                                >
                                  <div
                                    ref="multiAttachedImageViewer"
                                    @click="
                                      fnPDFViewModal(
                                        filesAttachedEarlier.fileName
                                      )
                                    "
                                    class="ellipsis"
                                  >
                                    <q-icon
                                      name="fas fa-file-pdf"
                                      color="negative"
                                    />
                                    &nbsp;{{ filesAttachedEarlier.fileName }}
                                  </div>
                                </div>
                                <div
                                  class="cursor-pointer"
                                  v-else-if="
                                    filesAttachedEarlier.mimeType.includes(
                                      'image'
                                    )
                                  "
                                >
                                  <viewer
                                    :images="[
                                      GLOBAL_FILE_FETCH_URL +
                                        '/' +
                                        filesAttachedEarlier.fileName
                                    ]"
                                    class="hidden"
                                  >
                                    <img
                                      :src="[
                                        GLOBAL_FILE_FETCH_URL +
                                          '/' +
                                          filesAttachedEarlier.fileName
                                      ]"
                                      ref="multiAttachedImageViewer"
                                      style="max-width:100%"
                                    />
                                  </viewer>
                                  <div
                                    @click="
                                      fnViewMultiAttachedFileImage(
                                        filesAttachedEarlierIndex
                                      )
                                    "
                                    class="ellipsis"
                                  >
                                    <q-icon
                                      name="fas fa-image"
                                      color="amber-9"
                                    />
                                    &nbsp;{{ filesAttachedEarlier.fileName }}
                                  </div>
                                </div>
                              </q-item-tile>
                            </q-item-main>
                            <q-item-side>
                              <q-btn
                                size="xs"
                                icon="clear"
                                @click="
                                  fnDeleteAlreadyAttachedFile(
                                    filesAttachedEarlier
                                  )
                                "
                                round
                                color="negative"
                                label="Remove"
                              />
                            </q-item-side>
                          </q-item>
                          <q-item-separator />
                        </div>
                      </div>
                    </q-list>
                  </div>
                </div>

                <div class="group" v-else>
                  <q-list
                    class="no-padding"
                    dense
                    v-for="(singleDocument,
                    singleDocumentIndex) in documents.forSingleDocument"
                    v-if="
                      getQrShortLeadInfoDocumentTypes &&
                        singleDocument.isQr != 1
                    "
                    :key="singleDocumentIndex"
                  >
                    <div
                      v-for="(document,
                      documentIndex) in singleDocument.documents"
                      :key="documentIndex"
                      class="border-bottom"
                    >
                      <q-item
                        separator
                        dense
                        class="q-body-1 bg-grey-4 q-pa-sm"
                      >
                        <q-item-main>
                          {{ document.subDocumentType }}
                        </q-item-main>

                        <!-- <q-item-main>
             @input="docuValue(document)"
            </q-item-main> -->

                        <q-item-side>
                          <label
                            id="attach"
                            class="cursor-pointer text-white"
                            style="background-color: #202c3f;"
                          >
                            <span class="q-caption text-weight-light"
                              >Attach</span
                            >
                            <input
                              type="file"
                              name="file"
                              @change="
                                fnVerificationDocumentUploadSingleUpload(
                                  $event,
                                  document
                                )
                              "
                              accept=".png, .jpg, .pdf"
                            />
                          </label>
                        </q-item-side>
                      </q-item>

                      <div
                        v-if="displayAttachedFileIndex == document.documentType"
                        v-for="(displayAttachedFile,
                        displayAttachedFileIndex) in Docs"
                        :key="displayAttachedFileIndex"
                      >
                        <div
                          v-if="
                            attachedSubFile.subDocumentType ==
                              document.subDocumentType
                          "
                          v-for="attachedSubFile in displayAttachedFile"
                          :key="attachedSubFile.id"
                        >
                          <q-item
                            dense
                            v-for="(filesAttachedEarlier,
                            filesAttachedEarlierIndex) in attachedSubFile.uploadedDocuments"
                            :key="filesAttachedEarlierIndex"
                            class="q-body-1"
                            separator
                          >
                            <q-item-main>
                              <q-item-tile class="q-body-1">
                                <div
                                  class="cursor-pointer"
                                  v-if="
                                    filesAttachedEarlier.mimeType.includes(
                                      'pdf'
                                    )
                                  "
                                >
                                  <div
                                    ref="attachedImageViewer"
                                    @click="
                                      fnPDFViewModal(
                                        filesAttachedEarlier.fileName
                                      )
                                    "
                                    class="ellipsis"
                                  >
                                    <q-icon
                                      name="fas fa-file-pdf"
                                      color="negative"
                                    />
                                    &nbsp;{{ filesAttachedEarlier.fileName }}
                                  </div>
                                </div>
                                <div
                                  class="cursor-pointer"
                                  v-else-if="
                                    filesAttachedEarlier.mimeType.includes(
                                      'image'
                                    )
                                  "
                                >
                                  <viewer
                                    :images="[
                                      GLOBAL_FILE_FETCH_URL +
                                        '/' +
                                        filesAttachedEarlier.fileName
                                    ]"
                                    class="hidden"
                                  >
                                    <img
                                      :src="[
                                        GLOBAL_FILE_FETCH_URL +
                                          '/' +
                                          filesAttachedEarlier.fileName
                                      ]"
                                      ref="attachedImageViewer"
                                      style="max-width:100%"
                                    />
                                  </viewer>
                                  <div
                                    @click="
                                      fnViewAttachedFileImage(
                                        filesAttachedEarlierIndex
                                      )
                                    "
                                    class="ellipsis"
                                  >
                                    <q-icon
                                      name="fas fa-image"
                                      color="amber-9"
                                    />
                                    &nbsp;{{ filesAttachedEarlier.fileName }}
                                  </div>
                                </div>
                              </q-item-tile>
                            </q-item-main>

                            <q-item-side>
                              <q-btn
                                size="xs"
                                icon="clear"
                                @click="
                                  fnDeleteAlreadyAttachedFile(
                                    filesAttachedEarlier
                                  )
                                "
                                round
                                color="negative"
                                label="Remove"
                              />
                            </q-item-side>
                          </q-item>
                        </div>
                      </div>
                    </div>
                  </q-list>
                  <div>
                    <q-list
                      class="no-padding"
                      dense
                      v-for="multipleDocument in documents.forMutipleDocument"
                      :key="multipleDocument.id"
                      v-if="
                        getQrShortLeadInfoDocumentTypes &&
                          multipleDocument.isQr != 1
                      "
                    >
                      <q-list-header
                        class="q-mb-sm bg-grey-4"
                        v-if="multipleDocument.isQr != 1"
                      >
                        {{ multipleDocument.documentType }}
                      </q-list-header>
                      <div>
                        <q-item separator dense class="q-body-1 q-pa-sm">
                          <q-item-main>
                            <select
                              class="full-width customQuasarSelect"
                              v-model="
                                multipleDocument.subDocumentTypeSelection
                              "
                              @change="
                                fnGetSubDocuments(
                                  multipleDocument.subDocumentTypeSelection
                                )
                              "
                            >
                              <option disabled value="0"
                                >Choose from below</option
                              >
                              <option
                                v-for="type in multipleDocument.documents"
                                :key="type.id"
                                :value="type"
                                v-if="type.isQr != 1"
                              >
                                {{ type.subDocumentType }}
                              </option>
                            </select>
                          </q-item-main>
                          <q-item-side
                            v-if="
                              fn_________GetEntryPermissionToUploadSubDocuments(
                                multipleDocument
                              )
                            "
                            ref="subDocumentUploadParent"
                          >
                            <label
                              id="attach"
                              class="cursor-pointer text-white"
                              style="background-color: #202c3f;"
                            >
                              <span class="q-caption text-weight-light"
                                >Attach</span
                              >
                              <input
                                type="file"
                                ref="subDocumentUpload"
                                @change="
                                  fnVerificationDocumentUpload(
                                    $event,
                                    multipleDocument.subDocumentTypeSelection
                                  )
                                "
                                name="file"
                                accept=".png, .jpg, .pdf"
                              />
                            </label>
                          </q-item-side>
                        </q-item>
                      </div>
                      <q-item-separator />

                      <div
                        v-if="
                          displayAttachedFileIndex ==
                            multipleDocument.documentType
                        "
                        v-for="(displayAttachedFile,
                        displayAttachedFileIndex) in Docs"
                        :key="displayAttachedFileIndex"
                      >
                        <div
                          v-for="attachedSubFile in displayAttachedFile"
                          :key="attachedSubFile.id"
                        >
                          <q-item
                            v-for="(filesAttachedEarlier,
                            filesAttachedEarlierIndex) in attachedSubFile.uploadedDocuments"
                            :key="filesAttachedEarlierIndex"
                            class="q-body-1"
                            separator
                            dense
                          >
                            <q-item-main>
                              <q-item-tile class="q-body-1">
                                <div
                                  class="cursor-pointer"
                                  v-if="
                                    filesAttachedEarlier.mimeType.includes(
                                      'pdf'
                                    )
                                  "
                                >
                                  <div
                                    ref="multiAttachedImageViewer"
                                    @click="
                                      fnPDFViewModal(
                                        filesAttachedEarlier.fileName
                                      )
                                    "
                                    class="ellipsis"
                                  >
                                    <q-icon
                                      name="fas fa-file-pdf"
                                      color="negative"
                                    />
                                    &nbsp;{{ filesAttachedEarlier.fileName }}
                                  </div>
                                </div>
                                <div
                                  class="cursor-pointer"
                                  v-else-if="
                                    filesAttachedEarlier.mimeType.includes(
                                      'image'
                                    )
                                  "
                                >
                                  <viewer
                                    :images="[
                                      GLOBAL_FILE_FETCH_URL +
                                        '/' +
                                        filesAttachedEarlier.fileName
                                    ]"
                                    class="hidden"
                                  >
                                    <img
                                      :src="[
                                        GLOBAL_FILE_FETCH_URL +
                                          '/' +
                                          filesAttachedEarlier.fileName
                                      ]"
                                      ref="multiAttachedImageViewer"
                                      style="max-width:100%"
                                    />
                                  </viewer>
                                  <div
                                    @click="
                                      fnViewMultiAttachedFileImage(
                                        filesAttachedEarlierIndex
                                      )
                                    "
                                    class="ellipsis"
                                  >
                                    <q-icon
                                      name="fas fa-image"
                                      color="amber-9"
                                    />
                                    &nbsp;{{ filesAttachedEarlier.fileName }}
                                  </div>
                                </div>
                              </q-item-tile>
                            </q-item-main>
                            <q-item-side>
                              <q-btn
                                size="xs"
                                icon="clear"
                                @click="
                                  fnDeleteAlreadyAttachedFile(
                                    filesAttachedEarlier
                                  )
                                "
                                round
                                color="negative"
                                label="Remove"
                              />
                            </q-item-side>
                          </q-item>
                          <q-item-separator />
                        </div>
                      </div>
                    </q-list>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input
            type="file"
            ref="fileUpload"
            class="hidden"
            accept=".jpg, .png, .pdf"
            @change="uploadFile($event,subDocumentTypeId)"
          />
        </q-item-main>
      </q-item>
    </q-list>
    <showQrPdfModalComponent
      v-if="toggleshowPDFModal"
      :propToggleshowPDFModal="toggleshowPDFModal"
      :propPDFDetails="PDFDetails"
      @togglePDFModal="fnPDFViewModal"
    ></showQrPdfModalComponent>
    <showDocumentQrLeadApproveComponent
      v-if="toggleLeadDocumentApproveModal"
      :propToggleDocumentApproveModal="toggleLeadDocumentApproveModal"
      :propDocumentDetails="documentApproveTempArr"
      @toggleDocumentModal="fnDocumentApproveModalAfterEmit"
    ></showDocumentQrLeadApproveComponent>
    <showDocumentQrLeadRejectComponent
      v-if="toggleLeadDocumentRejectModal"
      :propToggleDocumentRejectModal="toggleLeadDocumentRejectModal"
      :propDocumentDetails="documentRejectTempArr"
      @toggleDocumentModal="fnDocumentRejectModalAfterEmit"
    ></showDocumentQrLeadRejectComponent>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import showQrPdfModalComponent from "../../components/sat/showQrPdfModalComponent.vue";
import showDocumentQrLeadApproveComponent from "../../components/sat/showDocumentQrLeadApproveComponent.vue";
import showDocumentQrLeadRejectComponent from "../../components/sat/showDocumentQrLeadRejectComponent.vue";
export default {
  name: "viewQrLeadDocument",
  props: ["propLeadDocumentInformation", "propGetShortInfo"],
  components: {
    showQrPdfModalComponent,
    showDocumentQrLeadApproveComponent,
    showDocumentQrLeadRejectComponent
  },
  data() {
    return {
      subDocumentTypeId: "",
      propData: [],
      documentArr: [],
      documents: {},
      PDFDetails: null,
      toggleshowPDFModal: false,
      toggleLeadDocumentApproveModal: false,
      formData: {
        shortLead: this.propGetShortInfo.qrMerchantType.merchantTypeName,
        documentType: []
      },
      merchantTypeSelection: this.propGetShortInfo.qrMerchantType
        .merchantTypeName,
      toggleLeadDocumentRejectModal: false,
      documentApproveTempArr: [],
      documentRejectTempArr: [],
      Docs: []
    };
  },
  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("SatLeadValidation", [
      // "getShortLeadInfo",
      // "getDeviceVerificationStatus",
      "getShortLeadInfoDocumentTypes",
      "getQrShortLeadInfoDocumentTypes"
    ]),
    ...mapGetters("iciciStaticQr", ["getAllStaticQrShortLeadDatas"]),
      isAgreementPdf() {
      return (
        this.propGetShortInfo.aggrementFormMimeType &&
        this.propGetShortInfo.aggrementFormMimeType.includes('pdf')
      );
    },
    isAgreementImage() {
      return (
        this.propGetShortInfo.aggrementFormMimeType &&
        this.propGetShortInfo.aggrementFormMimeType.includes('image')
      );
    },
    agreementImageSource() {
      return `${this.GLOBAL_FILE_FETCH_URL}/${this.propGetShortInfo.aggrementForm}`;
    },


    isApplicationPdf() {
      return (
        this.propGetShortInfo.applicationFormMimeType &&
        this.propGetShortInfo.applicationFormMimeType.includes("pdf")
      );
    },
    isApplicationImage() {
      return (
        this.propGetShortInfo.applicationFormMimeType &&
        this.propGetShortInfo.applicationFormMimeType.includes("image")
      );
    },
    applicationImageSource() {
      return `${this.GLOBAL_FILE_FETCH_URL}/${this.propGetShortInfo.applicationForm}`;
    },

    isChequeLeafPdf() {
      return (
        this.propGetShortInfo.chequeLeafFormMimeType &&
        this.propGetShortInfo.chequeLeafFormMimeType.includes("pdf")
      );
    },
    isChequeLeafImage() {
      return (
        this.propGetShortInfo.chequeLeafFormMimeType &&
        this.propGetShortInfo.chequeLeafFormMimeType.includes("image")
      );
    },
    chequeLeafImageSource() {
      return `${this.GLOBAL_FILE_FETCH_URL}/${this.propGetShortInfo.chequeLeafForm}`;
    },

    isImplementationPdf() {
      return (
        this.propGetShortInfo.implementationFormMimeType &&
        this.propGetShortInfo.implementationFormMimeType.includes("pdf")
      );
    },
    isImplementationImage() {
      return (
        this.propGetShortInfo.implementationFormMimeType &&
        this.propGetShortInfo.implementationFormMimeType.includes("image")
      );
    },
    implementationImageSource() {
      return `${this.GLOBAL_FILE_FETCH_URL}/${this.propGetShortInfo.implementationForm}`;
    },

    isPictureOfShopPdf() {
      return (
        this.propGetShortInfo.pictureOfShopMimeType &&
        this.propGetShortInfo.pictureOfShopMimeType.includes("pdf")
      );
    },
    isPictureOfShopImage() {
      return (
        this.propGetShortInfo.pictureOfShopMimeType &&
        this.propGetShortInfo.pictureOfShopMimeType.includes("image")
      );
    },
    pictureOfShopImageSource() {
      return `${this.GLOBAL_FILE_FETCH_URL}/${this.propGetShortInfo.pictureOfShop}`;
    }
  },

  created() {
    this.ajaxLoadShortLeadInfoForDocumentTypes();
    this.ajaxQrLoadShortLeadInfo();

    // console.log(
    //   "LEADVIEWQR ",
    //   JSON.stringify(this.propLeadDocumentInformation)
    // );
  },
  beforeMount() {
  
    this.setGroup();
  },
  methods: {
    ...mapActions("SatLeadValidation", [
      "FETCH_LEAD_DOCUMENT_TYPE_DATA",
      "FETCH_LEAD_DOCUMENT_TYPE_DATA_QR",
      "FEED_HAND_OVER_TO_SAT_QR_DOCUMENT",
      "FEED_HAND_OVER_TO_SAT_FORMS_QR_DOCUMENT",
      "DELETE_DOCUMENT_FROM_BY_SAT"
    ]),
    ...mapActions("iciciStaticQr", [
      "FETCH_STATIC_QR_SHORT_LEAD_DATA",
      "FORMS_UPLOADED_DOCUMENT_QR_DETAILS"
    ]),
    fnViewHandedOverFileImageAgreement() {
      this.$refs.handedOverImageViewerAgreement.click();
    },
    fnViewHandedOverFileImageApplication() {
      this.$refs.handedOverImageViewerApplication.click();
    },
    fnViewHandedOverFileImageCheque() {
      this.$refs.handedOverImageViewerCheque.click();
    },
    fnViewHandedOverFileImageImplementation() {
      this.$refs.handedOverImageViewerImplementation.click();
    },
    fnViewHandedOverFileImagePicture() {
      this.$refs.handedOverImageViewerPicture.click();
    },

    functionToggleCollapsible() {
      this.toggleCollapsible = "toggleCollapsible";
    },
    fnViewMultiAttachedFileImage(attachedImageIndex) {
      this.$refs.multiAttachedImageViewer[attachedImageIndex].click();
    },
    fnViewAttachedFileImage(attachedImageIndex) {
      this.$refs.attachedImageViewer[attachedImageIndex].click();
    },

    fnToggleVerificationButtonStatus(document) {
      let assumeArr = _.filter(document, function(value) {
        // >> 2 is document verification pending
        return value.documentVerifiedStatus == (4 || 2);
      });
      if (assumeArr.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    setGroup() {
      var groupDocuments = _.groupBy(
        this.propGetShortInfo.qrLeadDocuments,
        function(document) {
          return document.documentType;
        }
      );
      this.Docs = groupDocuments;
      console.log("DOCS DATA", JSON.stringify(this.Docs));
    },

    fnPDFViewModal(documentUrl) {
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    },

    fnDocumentApproveModal(documentDetails) {
      this.toggleLeadDocumentApproveModal = !this
        .toggleLeadDocumentApproveModal;
      this.$set(documentDetails, "leadId", this.$route.params.id);
      this.documentApproveTempArr = documentDetails;
    },

    fnDocumentApproveModalAfterEmit(leadId) {
      this.toggleLeadDocumentApproveModal = !this
        .toggleLeadDocumentApproveModal;
      this.$emit("emitTriggerComponentHotLoad", leadId);
    },

    fnDocumentRejectModalAfterEmit(leadId) {
      this.toggleLeadDocumentRejectModal = !this.toggleLeadDocumentRejectModal;
      this.$emit("emitTriggerComponentHotLoad", leadId);
    },

    fnDocumentRejectModal(documentDetails) {
      this.toggleLeadDocumentRejectModal = !this.toggleLeadDocumentRejectModal;
      this.$set(documentDetails, "leadId", this.$route.params.id);
      this.documentRejectTempArr = documentDetails;
    },

    ajaxLoadShortLeadInfoForDocumentTypes() {
      //function to load all lead details
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching files .."
      });
      this.FETCH_LEAD_DOCUMENT_TYPE_DATA_QR()
        .then(response => {
          return this.fnGetMerchantTypeValue(
            this.propGetShortInfo.qrMerchantType.merchantTypeName
          );
        })
        .then(response => {
          this.formData.documentType = this.getQrShortLeadInfoDocumentTypes;
          console.log(
            "LEAD DETAILS",
            JSON.stringify(this.getQrShortLeadInfoDocumentTypes)
          );

          this.$emit(
            "emitAjaxLoadShortLeadInfo",
            "hotReloadForDocumentsUploadValidation",
            this.merchantTypeSelection
          );
          // console.log("VALUE FOR DOCUMENT------------->>>>",JSON.stringify(this.getQrShortLeadInfoDocumentTypes.uploadedDocuments.forSingleDocument))
          // console.log("DOCUMENT Deatils------------->>>>",JSON.stringify(this.getQrShortLeadInfoDocumentTypes.uploadedDocuments))
          // console.log("MutipleDocument Document Deatils------------->>>>",JSON.stringify(this.getQrShortLeadInfoDocumentTypes.uploadedDocuments.forMutipleDocument))
          // this.$emit(
          //   "emitAjaxLoadShortLeadInfo",
          //   "hotReloadForDocumentsUploadValidation",
          //   this.merchantTypeSelection
          // );
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },

    fnGetMerchantTypeValue(inputvalue) {
      console.log("CHECK", JSON.stringify(inputvalue));

      if (inputvalue == ("Individuals" || "Sole Proprietorship")) {
        console.log("IFF");
        let merchantDocumentCategory = _.find(
          this.getQrShortLeadInfoDocumentTypes,
          o => o.merchantType === inputvalue
        );
        let arr = {
          forSingleDocument: [],
          forMutipleDocument: []
        };
        let innerSelf = this;
        // let qrLeadDocuments = innerSelf.getAllStaticQrShortLeadDatas
        let qrLeadDocuments = innerSelf.Docs;
        console.log("RESPONSE DOCS GETTER", JSON.stringify(this.Docs));
        let multipleDocs = [];
        let mccValue =
          this.propGetShortInfo.merchantIndustry.mccCode == "0763"
            ? 1
            : this.propGetShortInfo.merchantIndustry.mccCode == "5813" ||
              this.propGetShortInfo.merchantIndustry.mccCode == "5921"
            ? 2
            : this.propGetShortInfo.merchantIndustry.mccCode == "5122" ||
              this.propGetShortInfo.merchantIndustry.mccCode == "5912"
            ? 3
            : (this.propGetShortInfo.merchantIndustry.mccCode ==
                this.propGetShortInfo.merchantIndustry.mccCode) ==
                "8011" ||
              this.propGetShortInfo.merchantIndustry.mccCode == "8021" ||
              this.propGetShortInfo.merchantIndustry.mccCode == "8031" ||
              this.propGetShortInfo.merchantIndustry.mccCode == "8042" ||
              this.propGetShortInfo.merchantIndustry.mccCode == "8049"
            ? 4
            : 5;

        merchantDocumentCategory.documentsApplicable.map(function(
          value,
          index
        ) {
          if (value.viewType == 1) {
            arr.forSingleDocument.push(value);
          } else {
            if (value.documentType in qrLeadDocuments) {
              let assumeArr = _.find(value.documents, function(oo) {
                if (
                  qrLeadDocuments.hasOwnProperty(oo.documentType) &&
                  (oo.subDocumentType ==
                    qrLeadDocuments[oo.documentType][0].subDocumentType ||
                    qrLeadDocuments[oo.documentType][0].documentType ==
                      qrLeadDocuments[oo.documentType][0].subDocumentType)
                ) {
                  return oo.documentType;
                }
              });
              if (assumeArr == undefined) {
                innerSelf.$set(value, "subDocumentTypeSelection", 0);
              } else {
                innerSelf.$set(value, "subDocumentTypeSelection", assumeArr);
              }
            } else {
              innerSelf.$set(value, "subDocumentTypeSelection", 0);
            }
            multipleDocs.push(value);
          }
        });
        console.log("MCC VALUE", mccValue);
        if (mccValue != 5) {
          let data = multipleDocs.find(
            obj => obj.documentType === "Company Proof"
          );
          multipleDocs = multipleDocs.filter(
            obj => obj.documentType !== "Company Proof"
          );

          if (data) {
            data.documents = data.documents.filter(
              obj => obj.isMcc == mccValue
            );
          }
          multipleDocs.push(data);
          arr.forMutipleDocument.push(...multipleDocs);
          this.documents = arr;
          console.log("FInalDATA ", JSON.stringify(this.documents));
        } else {
          arr.forMutipleDocument.push(...multipleDocs);
          this.documents = arr;
          console.log("MULTIPLE DOCS", JSON.stringify(this.documents));
        }
      } else {
        console.log("ELSE");
        console.log("TEST GETTER");
        let merchantDocumentCategory = _.find(
          this.getQrShortLeadInfoDocumentTypes,
          o => o.merchantType === inputvalue
        );
        let arr = {
          forSingleDocument: [],
          forMutipleDocument: []
        };
        let multipleDocs = [];

        merchantDocumentCategory.documentsApplicable.map(function(
          value,
          index
        ) {
          if (value.viewType == 1) {
            arr.forSingleDocument.push(value);
          } else {
            multipleDocs.push(value);
          }
        });
        arr.forMutipleDocument.push(...multipleDocs);
        this.documents = arr;
        console.log("THIS>DOC", JSON.stringify(this.documents));
      }
    },
//     fnVerificationDocumentUploadFormsUpload(event, formType) {
//   this.$q.loading.show({
//     delay: 0,
//     spinnerColor: "purple-9",
//     message: "Uploading file .."
//   });

//   let filePath = event.target.value;
//   let fileName = filePath.split('\\').pop().split('.')[0];
//   fileName = `${this.$route.params.id}_${formType}`;
//   console.log("fileName------->>>>",fileName)
//   let formData = new FormData();
//   formData.append("file", event.target.files[0]);
//   formData.append("fileNameOriginal", fileName);

//   let requestParams = {
//     files: formData,
//     fileNameOriginal: fileName
//   };

//   this.FEED_HAND_OVER_TO_SAT_FORMS_QR_DOCUMENT(requestParams)
//     .then(response => {
//       // Extract fileName and mimeType from the response
//       let { fileName, mimeType } = response;

//       this.setGroup();
//       this.$emit("emitAjaxLoadShortLeadInfo", "hotReloadForDocumentsUploadValidation", this.merchantTypeSelection);
//       this.$q.loading.hide();

//       // Call saveformsLists with fileName and mimeType
//       this.saveformsLists(fileName, mimeType);
//     })
//     .catch(error => {
//       this.$q.loading.hide();
//       this.$q.notify({
//         color: "negative",
//         position: "bottom",
//         message: "Failed to upload document",
//         icon: "thumb_down"
//       });
//     });
// },

// saveformsLists(fileName, mimeType) {
//   this.$q.loading.show();

//   let param = {
//     data1: {
//       id: this.propGetShortInfo.id,
//     },
//     formsList: {
//       aggrementForm: fileName,
//       aggrementFormMimeType: mimeType,
//       applicationForm:fileName,
//       applicationFormMimeType:mimeType
//     },
//   };

//   this.FORMS_UPLOADED_DOCUMENT_QR_DETAILS(param)
//     .then(() => {
//       this.$q.loading.hide();
//       this.$q.notify({
//         color: "positive",
//         position: "bottom",
//         message: "Successfully Updated!",
//         icon: "thumb_up"
//       });
//     })
//     .catch(error => {
//       this.$q.loading.hide();
//       this.$q.notify({
//         color: "negative",
//         position: "bottom",
//         message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
//         icon: "thumb_down"
//       });
//     });
// },
fnVerificationDocumentUploadFormsUpload(event, formType) {
  this.$q.loading.show({
    delay: 0,
    spinnerColor: "purple-9",
    message: "Uploading file .."
  });

  let filePath = event.target.value;
  let fileName = filePath.split('\\').pop().split('.')[0];
  fileName = `${this.$route.params.id}_${formType}`;
  let formData = new FormData();
  formData.append("file", event.target.files[0]);
  formData.append("fileNameOriginal", fileName);
  let requestParams = {
    files: formData,
    fileNameOriginal: fileName
  };
  this.FEED_HAND_OVER_TO_SAT_FORMS_QR_DOCUMENT(requestParams)
    .then(response => {
      // Extract fileName and mimeType from the response
      let { fileName, mimeType } = response;
      this.setGroup();
      this.$emit("emitAjaxLoadShortLeadInfo", "hotReloadForDocumentsUploadValidation", this.merchantTypeSelection);
      this.$q.loading.hide();

      // Determine which form type to update based on fileName
      let formTypeToUpdate = this.getFormTypeToUpdate(fileName);
      if (formTypeToUpdate) {
        // Call saveformsLists with fileName, mimeType, and the form type to update
        this.saveformsLists(fileName, mimeType, formTypeToUpdate);
      } else {
        // Handle case where fileName doesn't match expected types
        console.error("Unsupported fileName:", fileName);
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Unsupported file uploaded",
          icon: "thumb_down"
        });
      } 
   })
  .catch(error => {
      this.$q.loading.hide();
      this.$q.notify({
        color: "negative",
        position: "bottom",
        message: "Failed to upload document",
        icon: "thumb_down"
   });
});
},
getFormTypeToUpdate(fileName) {
  // Determine which form type to update based on fileName pattern
  if (fileName.toLowerCase().includes("agreement")) {
    return "aggrementForm";
  } 
  // else if (fileName.toLowerCase().includes("applicationform")) {
  //   return "applicationForm";
  // } 
  else if (fileName.toLowerCase().includes("chequeleaforbankstatement")) {
    return "chequeLeafForm";
  } else if (fileName.toLowerCase().includes("implementationform")) {
    return "implementationForm";
  } else if (fileName.toLowerCase().includes("photoofshop")) {
    return "pictureOfShop";
  } 
  // Add more conditions as needed for other file types
  return null; // Return null if fileName doesn't match expected types
},

saveformsLists(fileName, mimeType, formTypeToUpdate) {
  this.$q.loading.show();

  let param = {
    data1: {
      id: this.propGetShortInfo.id,
},
      formsList: {
      [formTypeToUpdate]: fileName,
      [`${formTypeToUpdate}MimeType`]: mimeType
},
  };

  this.FORMS_UPLOADED_DOCUMENT_QR_DETAILS(param)
    .then(() => {
      this.$q.loading.hide();
      this.$q.notify({
        color: "positive",
        position: "bottom",
        message: "Successfully Updated!",
        icon: "thumb_up"
      });
      this.ajaxQrLoadShortLeadInfo();
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
},

    //TODO default 1 for sat document submission as url params
    fnVerificationDocumentUploadSingleUpload(event, documentDetails) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Uploading file .."
      });
      let formData = new FormData();
      formData.append("file", event.target.files[0]);

      let requestParams = {
        files: formData,
        leadId: this.$route.params.id,
        documentId: documentDetails.id
      };
      this.FEED_HAND_OVER_TO_SAT_QR_DOCUMENT(requestParams)
        .then(response => {
          this.setGroup();
          this.$emit(
            "emitAjaxLoadShortLeadInfo",
            "hotReloadForDocumentsUploadValidation",
            this.merchantTypeSelection
          );
          this.ajaxQrLoadShortLeadInfo();
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Failed to upload document",
            icon: "thumb_down"
          });
        });
    },

    fn_________GetEntryPermissionToUploadSubDocuments(multipleDocument) {
      if (
        multipleDocument.hasOwnProperty("subDocumentTypeSelection") &&
        typeof multipleDocument.subDocumentTypeSelection !== "undefined" &&
        multipleDocument.subDocumentTypeSelection.hasOwnProperty(
          "selectedSubDocumentType"
        ) &&
        typeof multipleDocument.subDocumentTypeSelection
          .selectedSubDocumentType !== "undefined"
      ) {
        return true;
      } else {
        return false;
      }
    },

    fnVerificationDocumentUpload(event, documentDetails) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Uploading file .."
      });
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      // formData.append("fileNameOriginal", "cheque");

      let requestParams = {
        files: formData,
        leadId: this.$route.params.id,
        documentId: documentDetails.id
      };

      this.FEED_HAND_OVER_TO_SAT_QR_DOCUMENT(requestParams)
        .then(response => {
          this.$q.loading.hide();
          this.$emit(
            "emitAjaxLoadShortLeadInfo",
            "hotReloadForDocumentsUploadValidation",
            this.merchantTypeSelection
          );
          this.ajaxQrLoadShortLeadInfo();
          this.setGroup();
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Failed to upload document",
            icon: "thumb_down"
          });
        });
 },

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

    ajaxQrLoadShortLeadInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_STATIC_QR_SHORT_LEAD_DATA(this.$route.params.id)
        .then(response => {
          //  console.log("RESPONSE DATA GETTER",JSON.stringify(this.getAllStaticQrShortLeadDatas));
          if (response.data.data.qrLeadDocuments != "") {
            var groupDocuments = _.groupBy(
              response.data.data.qrLeadDocuments,
              function(document) {
                return document.documentType;
              }
            );
            this.Docs = groupDocuments;
          }

          //  console.log("DOCS DATA NEW",JSON.stringify(this.Docs));
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    fnDeleteAlreadyAttachedFile(documentDetails) {
      let innerSelf = this;
      innerSelf.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete uploaded document?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing .."
          });
          innerSelf
            .DELETE_DOCUMENT_FROM_BY_SAT(documentDetails)
            .then(response => {
              innerSelf.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully removed!",
                icon: "thumb_up"
              });
              this.ajaxQrLoadShortLeadInfo();
              // innerSelf.FETCH_SHORT_LEAD_DATA(innerSelf.$route.params.id);
              // innerSelf.$emit(
              //   "emitAjaxLoadShortLeadInfo",
              //   "hotReloadForDocumentsUploadValidation",
              //   innerSelf.merchantTypeSelection
              // );
              this.$q.loading.hide();
            })
            .catch(error => {
              this.$q.loading.hide();
              innerSelf.$q.notify({
                color: "negative",
                position: "bot  tom",
                message:
                  error.body.message == null
                    ? "Please Try Again Later !"
                    : error.body.message,
                icon: "thumb_down"
              });
            });
        })
        .catch(() => {
          innerSelf.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down"
          });
        });
    },
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
      this.FEED_HAND_OVER_TO_SAT_QR_DOCUMENT(requestParams)
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
  }
};
</script>
<style>
#attach {
  height: 33px;
}
.customQuasarSelect {
  padding: 5px;
  height: 33px;
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
