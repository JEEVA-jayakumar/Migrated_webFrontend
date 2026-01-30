<template>
  <q-page>
      <div class="q-ma-md">
        <!-- Merchant details -->
        <!-- <pre>{{getShortLeadInfo}}</pre> -->
        <div class="row q-ma-xs">
            <div class="col">
                <div class="q-title q-my-md capitalize">{{formData.shortLead.leadName}}</div>
                <p class="text-light-blue"># {{formData.shortLead.id}}</p>
            </div>
            <div class="col">
                <div class="q-title q-my-md">Contact</div>
                <p class="no-margin">{{formData.shortLead.contactNumber}}</p>
                <p>{{formData.shortLead.alternateContactNumber}}</p>
            </div>
            <div class="col">
                <div class="q-title q-my-md">Address</div>
                <p class="capitalize">{{formData.shortLead.leadAddress}}</p>
            </div>
             <!-- <div class="col">
                <div class="q-title q-my-md">Account Number</div>
                <p>NA</p>
            </div> -->
        </div>

        <!-- Device, Exception, Payment, MDR and Documents -->
        <div class="row">
            <div class="col-md-6">
                <div class="flex">
                    <!-- Device -->
                    <div class="full-width">
                        <q-card class="q-ma-xs border-1 q-custom-class" flat>
                            <q-card-title class="q-pa-sm bottom-border title-bg">
                                <div class="row items-center">
                                    <div class="col-auto q-body-1 text-weight-medium">
                                        Device - 
                                        {{formData.shortLead.deviceCount}} 
                                        {{formData.shortLead.device.deviceName}}
                                    </div>
                                    <div class="col" v-if="formData.shortLead.verifiedDeviceStatus == 1"  align="right">
                                        <span class="text-positive text-weight-medium q-body-1">
                                            <q-btn
                                            size="xs"
                                            outline
                                            color="positive"
                                            round
                                            icon="check" 
                                            />
                                        Approved</span>
                                    </div>
                                </div>
                            </q-card-title>
                             <q-card-main>
                                <q-list no-border class="no-padding">
                                    <q-item multiline>
                                        <q-item-main>
                                          <q-item-tile>
                                            <q-input 
                                              color="grey-9"
                                              float-label="Debit < 2000 (%)" 
                                              readonly
                                            class="no-pointer-events" v-model="formData.shortLead.debitLessthanAmount"
                                            />
                                          </q-item-tile>
                                        </q-item-main>
                                        <q-item-main>
                                          <q-item-tile>
                                            <q-input 
                                              color="grey-9"
                                              float-label="Debit < 2000 (%)"
                                              readonly
                                            class="no-pointer-events" v-model="formData.shortLead.debitGreaterthanAmount" 
                                            />
                                          </q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                    <q-item-separator />
                                    <q-item multiline>
                                      <q-item-main>
                                        <q-item-tile>
                                            <q-input 
                                                color="grey-9"
                                                float-label="Std CC (%)" 
                                                readonly
                                            class="no-pointer-events" v-model="formData.shortLead.stdCC" 
                                            /> 
                                        </q-item-tile>
                                      </q-item-main>
                                      <q-item-main>
                                        <q-item-tile>
                                            <q-input 
                                                color="grey-9"
                                                float-label="Premium CC (%)" 
                                                readonly
                                            class="no-pointer-events" v-model="formData.shortLead.premiumCC" 
                                            />
                                        </q-item-tile>
                                         </q-item-main>
                                      <q-item-main>
                                        <q-item-tile>
                                            <q-input 
                                                color="grey-9"
                                                float-label="Corp (%)" 
                                                readonly
                                            class="no-pointer-events" v-model="formData.shortLead.corpIntlCC" 
                                            />
                                        </q-item-tile>
                                         </q-item-main>
                                      <q-item-main>
                                        <q-item-tile>
                                            <q-input 
                                                color="grey-9"
                                                float-label="Intl (%)" 
                                                readonly
                                            class="no-pointer-events" v-model="formData.shortLead.corpIntlCC" 
                                            />
                                        </q-item-tile>
                                         </q-item-main>
                                      <q-item-main>
                                        <q-item-tile>
                                            <q-input 
                                                color="grey-9"
                                                float-label="Super Pre CC (%)" 
                                                readonly
                                            class="no-pointer-events" v-model="formData.shortLead.corpIntlCC" 
                                            />
                                        </q-item-tile>
                                         </q-item-main>
                                    </q-item>
                                    <q-item class="items-start q-pa-sm" v-if="formData.shortLead.posEnable">
                                        <q-checkbox v-model="formData.shortLead.posEnable" class="no-pointer-events" color="purple-9">
                                            <small class="q-caption">Enable Cash@POS Cash @POS incentive Rs.5</small>
                                        </q-checkbox>
                                    </q-item>
                                </q-list>
                            </q-card-main>
                        </q-card>
                    </div>

                    <!-- Payment -->
                    <div class="full-width">
                        <q-card class="q-ma-xs border-1 q-custom-class" flat>
                            <q-card-title class="q-pa-sm bottom-border  title-bg">
                                <div class="row items-center">
                                    <div class="col-auto q-body-1 text-weight-medium">
                                        Payment - 
                                        <span v-if="formData.shortLead.paymentOption == 1">IMPS/NEFT</span>
                                        <span v-if="formData.shortLead.paymentOption == 2">Cheque</span>
                                        <span v-if="formData.shortLead.paymentOption == 3">Swipe</span>
                                    </div>
                                    <div class="col q-body-1 text-weight-medium" align="right">
                                    <span v-if="formData.shortLead.verifiedPricingStatus == 1" class="  text-positive q-body-1 ">
                                        <q-btn
                                        size="xs"
                                        outline
                                        color="positive"
                                        round
                                        icon="check" 
                                        />
                                        Approved</span>
                                    <span v-if="formData.shortLead.verifiedPricingStatus == 2" class="text-amber-9  q-body-1">
                                        <q-btn
                                        size="xs"
                                        outline
                                        color="amber-9"
                                        round
                                        icon="warning" 
                                        />
                                        OP Pending</span>
                                    <span v-if="formData.shortLead.verifiedPricingStatus == 3" class=" text-negative q-body-1 ">
                                        <q-btn
                                        size="xs"
                                        outline
                                        color="negative"
                                        round
                                        icon="clear" 
                                        />
                                        OP Rejected</span>
                                    <span v-if="formData.shortLead.verifiedPricingStatus == 4" class=" text-amber-9  q-body-1">
                                        <q-btn
                                        size="xs"
                                        outline
                                        color="amber-9"
                                        round
                                        icon="warning" 
                                        />
                                        Finance Pending</span>
                                    <span v-if="formData.shortLead.verifiedPricingStatus == 5" class=" text-negative q-body-1 ">
                                        <q-btn
                                        size="xs"
                                        outline
                                        color="negative"
                                        round
                                        icon="clear" 
                                        />
                                        Finance Reject</span>
                                    </div>
                                </div>
                            </q-card-title>
                            <q-card-main class="q-pa-sm">
                                <q-list no-border class="no-padding">
                                    <q-item class="items-start q-pa-sm">
                                        <q-item-side class="col-md-6 q-caption">
                                            Payment mode:
                                            <span class="q-caption" v-if="formData.shortLead.paymentOption == 1">IMPS/NEFT</span>
                                            <span class="q-caption" v-else-if="formData.shortLead.paymentOption == 2">Cheque</span>
                                            <span class="q-caption" v-else-if="formData.shortLead.paymentOption == 3">Swipe</span>
                                            </q-item-side>
                                        <q-item-side class="col-md-6 q-caption">
                                            {{formData.shortLead.referenceNumber}}
                                        </q-item-side>
                                    </q-item>
                
                                    <q-item class="items-start">
                                        <q-item-side class="col-md-12 q-caption">
                                            <div v-if="formData.shortLead.paymentDocumentFile == null || formData.shortLead.paymentDocumentFile == ''"><q-icon name="clear" color="negative" /> No image attached</div>
                                            <div v-else>
                                                <q-btn 
                                                    flat
                                                    underline
                                                    size="sm"
                                                    class="bg-white"
                                                    @click="toggleChequeImage(formData.shortLead.paymentDocumentFile)" 
                                                    color="light-blue">
                                                    View Image &nbsp;
                                                    <span v-if="!toggleChequeImageResult"><i class="fas fa-angle-down"></i></span>
                                                    <span v-if="toggleChequeImageResult"><i class="fas fa-angle-up"></i></span>
                                                </q-btn>
                                            </div>
                                        </q-item-side>
                                    </q-item>
                                </q-list>
                            </q-card-main>
                        </q-card>
                    </div>
                    
                    <!-- MDR -->
                    <div class="full-width">
                        <q-card class="q-ma-xs border-1 q-custom-class" flat>
                            <q-card-title class="q-pa-sm bottom-border title-bg">
                                <span class="q-body-1 text-weight-medium">MDR</span>
                            </q-card-title>
                            <q-card-main>
                                <q-list no-border class="no-padding">
                                    <q-item class="no-padding">
                                        <q-item-main>
                                            <div class="row group">
                                                <div class="col-md-5">
                                                    <q-input 
                                                        color="grey-9"
                                                        float-label="Debit < 2000 (%)" 
                                                        readonly
                                                        class="no-pointer-events" v-model="formData.shortLead.debitLessthanAmount"
                                                    />
                                                </div>
                                                <div class="col-md-5">
                                                    <q-input 
                                                        color="grey-9"
                                                        float-label="Debit < 2000 (%)"
                                                        readonly
                                                        class="no-pointer-events" v-model="formData.shortLead.debitGreaterthanAmount" 
                                                    />
                                                </div>
                                            </div>
                                        </q-item-main>
                                    </q-item>
                                    <q-item-separator />
                                    <q-item class="no-padding">
                                        <q-item-main>
                                            <div class="row group">
                                                <div class="col-md-3">
                                                    <q-input 
                                                        color="grey-9"
                                                        float-label="Std CC (%)" 
                                                        readonly
                                                        class="no-pointer-events" v-model="formData.shortLead.stdCC" 
                                                    /> 
                                                </div>
                                                <div class="col-md-3">
                                                    <q-input 
                                                        color="grey-9"
                                                        float-label="Premium CC (%)" 
                                                        readonly
                                                        class="no-pointer-events" v-model="formData.shortLead.premiumCC" 
                                                    />
                                                </div>
                                                <div class="col-md-5">
                                                    <q-input 
                                                        color="grey-9"
                                                        float-label="Corp/Intl/Super Pre CC (%)" 
                                                        readonly
                                                        class="no-pointer-events" v-model="formData.shortLead.corpIntlCC" 
                                                    />
                                                </div>
                                            </div>
                                        </q-item-main>
                                    </q-item>
                                    <q-item class="items-start q-pa-sm" v-if="formData.shortLead.posEnable">
                                        <q-checkbox v-model="formData.shortLead.posEnable" class="no-pointer-events" color="purple-9">
                                            <small class="q-caption">Enable Cash@POS Cash @POS incentive Rs.5</small>
                                        </q-checkbox>
                                    </q-item>
                                </q-list>
                            </q-card-main>
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
                                <q-card-title class="q-pa-sm bottom-border title-bg">
                                    <div class="row items-center">
                                        <div class="col-auto q-body-1 text-weight-medium">
                                            Exception KYC
                                        </div>
                                        <div class="col q-body-1 text-weight-medium" align="right">
                                            <span v-if="formData.shortLead.verifiedKycStatus == 1" class="  text-positive">
                                                <q-btn
                                                size="xs"
                                                outline
                                                color="positive"
                                                round
                                                icon="check" 
                                                />
                                                Approved</span>
                                            <span v-if="formData.shortLead.verifiedKycStatus == 2" class="  text-amber-9">
                                                <q-btn
                                                size="xs"
                                                outline
                                                color="amber-9"
                                                round
                                                icon="warning" 
                                                />
                                                OP Pending</span>
                                            <span v-if="formData.shortLead.verifiedKycStatus == 3" class="  text-negative"><q-btn
                                                size="xs"
                                                outline
                                                color="negative"
                                                round
                                                icon="clear" 
                                                />
                                                OP Rejected</span>
                                            <span v-if="formData.shortLead.verifiedKycStatus == 4" class="  text-amber-9"><q-btn
                                                size="xs"
                                                outline
                                                color="amber-9"
                                                round
                                                icon="warning" 
                                                />
                                                Finance Pending</span>
                                            <span v-if="formData.shortLead.verifiedKycStatus == 5" class="  text-negative"><q-btn
                                                size="xs"
                                                outline
                                                color="negative"
                                                round
                                                icon="clear" 
                                                />
                                                Finance Reject</span>
                                        </div>
                                    </div>
                                </q-card-title>
                                <q-card-main class="no-padding">
                                    <div class="row items-center q-pa-sm q-py-md">
                                        <div class="col-md-3 col-sm-12 col-xs-12">
                                            <span class="q-caption text-faded">Reason</span>
                                        </div>
                                        <div class="col-md-9 col-sm-12 col-xs-12">
                                            <span class="q-caption text-faded" v-if="formData.shortLead.reason == null">Reason not specified</span>
                                            <span class="q-caption text-faded" v-else>
                                                {{formData.shortLead.reason}}</span>
                                        </div>
                                    </div>
                                </q-card-main>
                            </q-card>
                            <q-card v-if="formData.shortLead.bankSubvention" class="q-ma-xs border-1 q-custom-class" flat>
                                <q-card-title class="q-pa-sm bottom-border title-bg">
                                    <div class="row items-center">
                                        <div class="col-auto q-body-1 text-weight-medium">
                                            Exception Bank Subvention
                                        </div>
                                        <div class="col q-body-1 text-weight-medium" align="right">
                                            <span v-if="formData.shortLead.verifiedBanksubventionStatus == 1" class="  text-positive q-body-1 ">
                                                <q-btn
                                                size="xs"
                                                outline
                                                color="positive"
                                                round
                                                icon="check" 
                                                />
                                                Approved</span>
                                            <span v-if="formData.shortLead.verifiedBanksubventionStatus == 2" class="text-amber-9  q-body-1">
                                                <q-btn
                                                size="xs"
                                                outline
                                                color="amber-9"
                                                round
                                                icon="warning" 
                                                />
                                                OP Pending</span>
                                            <span v-if="formData.shortLead.verifiedBanksubventionStatus == 3" class=" text-negative q-body-1 ">
                                                <q-btn
                                                size="xs"
                                                outline
                                                color="negative"
                                                round
                                                icon="clear" 
                                                />
                                                OP Rejected</span>
                                            <span v-if="formData.shortLead.verifiedBanksubventionStatus == 4" class=" text-amber-9  q-body-1">
                                                <q-btn
                                                size="xs"
                                                outline
                                                color="amber-9"
                                                round
                                                icon="warning" 
                                                />
                                                Finance Pending</span>
                                            <span v-if="formData.shortLead.verifiedBanksubventionStatus == 5" class=" text-negative q-body-1 ">
                                                <q-btn
                                                size="xs"
                                                outline
                                                color="negative"
                                                round
                                                icon="clear" 
                                                />
                                                Finance Reject</span>
                                        </div>
                                    </div>
                                </q-card-title>
                                <q-card-main class="no-padding">
                                    <div class="row items-center q-pa-sm q-py-md">
                                        <div class="col-md-3 col-sm-12 col-xs-12">
                                            <div class="q-caption text-faded">Reason</div>
                                        </div>
                                        <div class="col-md-9 col-sm-12 col-xs-12">
                                            <div class="q-caption text-faded" v-if="formData.shortLead.reason == null">Reason not specified</div>
                                            <div class="q-caption text-faded" v-else>{{formData.shortLead.reason}}</div>
                                        </div>
                                    </div>
                                </q-card-main>
                            </q-card> 
                            <q-card  v-if="formData.shortLead.pricing" class="q-ma-xs border-1 q-custom-class" flat>
                                <q-card-title class="q-pa-sm bottom-border title-bg">
                                    <div class="row items-center">
                                        <div class="col-auto q-body-1 text-weight-medium">
                                            Exception Pricing
                                        </div>
                                        <div class="col q-body-1 text-weight-medium" align="right">
                                            <span v-if="formData.shortLead.verifiedPricingStatus == 1" class="  text-positive q-body-1 ">
                                                <q-btn
                                                size="xs"
                                                outline
                                                color="positive"
                                                round
                                                icon="check" 
                                                />
                                                Approved</span>
                                            <span v-if="formData.shortLead.verifiedPricingStatus == 2" class="text-amber-9  q-body-1">
                                                <q-btn
                                                size="xs"
                                                outline
                                                color="amber-9"
                                                round
                                                icon="warning" 
                                                />
                                                OP Pending</span>
                                            <span v-if="formData.shortLead.verifiedPricingStatus == 3" class=" text-negative q-body-1 ">
                                                <q-btn
                                                size="xs"
                                                outline
                                                color="negative"
                                                round
                                                icon="clear" 
                                                />
                                                OP Rejected</span>
                                            <span v-if="formData.shortLead.verifiedPricingStatus == 4" class=" text-amber-9  q-body-1">
                                                <q-btn
                                                size="xs"
                                                outline
                                                color="amber-9"
                                                round
                                                icon="warning" 
                                                />
                                                Finance Pending</span>
                                            <span v-if="formData.shortLead.verifiedPricingStatus == 5" class=" text-negative q-body-1 ">
                                                <q-btn
                                                size="xs"
                                                outline
                                                color="negative"
                                                round
                                                icon="clear" 
                                                />
                                                Finance Reject</span>
                                            </div>
                                    </div>
                                </q-card-title>
                                <q-card-main class="no-padding">
                                    <div class="row items-center q-pa-sm q-py-md">
                                        <div class="col-md-3 col-sm-12 col-xs-12">
                                            <div class="q-caption text-faded">Reason</div>
                                        </div>
                                        <div class="col-md-9 col-sm-12 col-xs-12">
                                            <div class="q-caption text-faded">{{formData.shortLead.reason}}</div>
                                        </div>
                                    </div>
                                </q-card-main>
                            </q-card>
                        </div>
                    </div>

                    <!-- Documents proof -->
                    <div class="full-width">
                        <q-card class="q-ma-xs border-1" flat>
                            <q-card-title class="q-pa-sm title-bg bottom-border">
                                <span class="q-body-1 text-weight-medium">Document</span>
                            </q-card-title>
                            <q-card-main class="q-pa-xs">
                                <q-list no-border class="no-padding">
                                    <q-item class="no-padding">
                                        <q-item-main>
                                            <div v-if="formData.shortLead.documentUploadedType == 1">
                                                <div class="row items-center q-pa-sm full-width q-body-1">
                                                    <div class="col-md-12">
                                                        <p>Select Merchant Type</p>
                                                        <select class="customQuasarSelect full-width" 
                                                         placeholder="Merchant Type"
                                                         v-model="merchantTypeSelection"
                                                         @change="fnGetMerchantTypeValue(merchantTypeSelection)">
                                                            <option disabled selected value="">Merchant Type</option>
                                                            <option v-for="(document,index) in getShortLeadInfoDocumentTypes" :key="index" :value="index">{{document.merchantType}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div v-if="merchantTypeSelection != ''">
                                                    <div class="row items-center q-pa-sm full-width q-body-1" 
                                                    v-for="(primaryItem,primaryIndex) in getShortLeadInfoDocumentTypes[merchantTypeSelection].documentsApplicable" 
                                                    :key="primaryIndex">
                                                        <div class="col-md-12" v-if="primaryItem.showSingleDocumentUpload">
                                                            <q-list dense>
                                                                <q-item dense>
                                                                    <q-item-side icon="blur_on"/>
                                                                    <q-item-main class="q-body-1 text-weight-medium">
                                                                        {{primaryItem.documentType}}
                                                                    </q-item-main>
                                                                </q-item>
                                                                 <q-item-separator />
                                                                <q-item dense v-for="(secondaryItem,subIndex) in primaryItem.documents" :key="subIndex">
                                                                    <q-item-side icon="attach_file"/>
                                                                    <q-item-main class="q-caption">
                                                                        {{secondaryItem.subDocumentType}}
                                                                    </q-item-main> 
                                                                    <q-item-side>
                                                                        <label class="cursor-pointer"> 
                                                                            <span class="q-caption">Attach Document</span>
                                                                            <input type="file" name="file" accept="image/*,application/pdf">
                                                                        </label>
                                                                    </q-item-side>
                                                                </q-item>
                                                            </q-list>
                                                        </div>

                                                        <div class="col-md-12" v-else>
                                                           <select class="customQuasarSelect full-width" 
                                                            @change="fnGetSubDocumentTypeSelection
                                                            (primaryItem.subDocumentTypeSelection,primaryIndex,primaryItem)" 
                                                            v-model="primaryItem.subDocumentTypeSelection">
                                                                <option disabled selected value="">{{primaryItem.documentType}}</option>
                                                                <option 
                                                                    v-bind:data-docIndex="docIndex"
                                                                 v-for="(document,docIndex) in primaryItem.documents" :key="docIndex" 
                                                                :value="document.id">{{document.subDocumentType}}</option>
                                                            </select>

                                                            <div v-if="primaryItem.documentTypeSelection != null" class="full-width q-py-md">
                                                                <q-list dense>
                                                                    <q-item dense>
                                                                        <q-item-side icon="blur_on"/>
                                                                        <q-item-main class="q-body-1 text-weight-medium">
                                                                            {{primaryItem.documentType}}
                                                                        </q-item-main>
                                                                    </q-item>
                                                                    <q-item-separator />
                                                                    <q-item dense >
                                                                        <q-item-side icon="attach_file"/>
                                                                        <q-item-main class="q-caption">
                                                                            {{
                                                                                primaryItem.documentTypeSelection.subDocumentType
                                                                                }}
                                                                        </q-item-main> 
                                                                        <q-item-side>
                                                                            <label class="cursor-pointer"> 
                                                                                <span class="q-caption">Attach Document</span>
                                                                                <input type="file" name="file" accept="image/*,application/pdf">
                                                                            </label>
                                                                        </q-item-side>
                                                                    </q-item>
                                                                </q-list>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div v-else>
                                                <div class="row items-center full-width q-body-1" v-if="formData.shortLead.documentUploadedType == 1" v-for="(documents,index) in formData.shortLead.leadDocuments" :key="index" >
                                                <div class="full-width" v-if="index.toString()==documents[0].subDocumentType">
                                                    <q-collapsible separator indent icon-toggle opened group="closeOnOpen" multiline class="full-width">
                                                        <template slot="header">
                                                            <q-item-side icon="attach_file" />
                                                            <q-item-main class="q-body-1" :sublabel="documents[0].uploadedDocuments.length + 'Document(s)'" :label="index" />
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
                                                                <span v-if="documents[0].documentVerifiedStatus == 1" class="  q-body-1 text-weight-medium text-positive">Approved</span>
                                                                <span v-if="documents[0].documentVerifiedStatus == 3" class="  q-body-1 text-weight-medium text-negative">Rejected</span>
                                                            </q-item-side>
                                                        </template>
                                                        <div v-for="(item,subIndex) in documents[0].uploadedDocuments" :key="subIndex" class="q-py-sm">
                                                            <div v-if="item.mimeType.includes('application')">
                                                                <div @click="fnPDFViewModal(item.fileName)" class="cursor-pointer no-underline">
                                                                    <q-icon name="fas fa-file-pdf" color="negative" />
                                                                    &nbsp;{{item.fileName}}
                                                                </div>
                                                            </div>
                                                            <div v-else-if="item.mimeType.includes('image')">
                                                                <div class="no-underline cursor-pointer">
                                                                    <viewer :images="[GLOBAL_FILE_FETCH_URL+ '/'+item.fileName]">
                                                                        <img :src="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName" style="max-width:100%">
                                                                    </viewer>
                                                                </div>
                                                            </div>
                                                            <div v-else>No documents attached</div>
                                                        </div>
                                                    </q-collapsible>
                                                </div>   

                                                <div class="full-width"  v-else>
                                                    <q-collapsible separator indent sicon-toggle opened group="closeOnOpen"  class="full-width">
                                                        <template slot="header">
                                                            <q-item-side  icon="apps" />
                                                            <q-item-main class="q-body-1" 
                                                            :sublabel="documents.length + 'Type(s)'"
                                                                :label="index" />
                                                        </template>
                                                        <div class="row items-center full-width" v-for="(subDocument,subIndex) in documents" :key="subIndex">
                                                            <div class="col-md-12 q-body-1">
                                                                <q-collapsible separator icon-toggle opened group="closeOnOpenSubDocument" multiline class="full-width" indent>
                                                                    <template slot="header">
                                                                        <q-item-side icon="attach_file" />
                                                                        <q-item-main class="q-body-1" 
                                                                        :sublabel="subDocument.uploadedDocuments.length + 'Document(s)'"
                                                                        :label="subDocument.subDocumentType" />
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
                                                                        <q-item-side v-else right>
                                                                            <span v-if="subDocument.documentVerifiedStatus == 1" class="q-body-1 text-weight-medium  text-positive">Approved</span>
                                                                            <span v-if="subDocument.documentVerifiedStatus == 3" class=" q-body-1 text-weight-medium text-negative">Rejected</span>
                                                                        </q-item-side>
                                                                    </template>
                                                                    <div v-for="(item,subIndex) in subDocument.uploadedDocuments" :key="subIndex" class="q-py-sm">
                                                                        <div v-if="item.mimeType.includes('pdf')">
                                                                        <div @click="fnPDFViewModal(item.fileName)" class="cursor-pointer no-underline">
                                                                            <q-icon name="fas fa-file-pdf" color="negative" />
                                                                            &nbsp;{{item.fileName}}
                                                                        </div>
                                                                        </div>
                                                                        <div v-else-if="item.mimeType.includes('image')">
                                                                            <div class="no-underline cursor-pointer">
                                                                                <viewer :images="[GLOBAL_FILE_FETCH_URL+ '/'+item.fileName]">
                                                                                    <img :src="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName" style="max-width:100%">
                                                                                </viewer>
                                                                            </div>
                                                                        </div>
                                                                        <div v-else>
                                                                            No document attached
                                                                        </div>
                                                                    </div>
                                                                </q-collapsible>
                                                            </div>
                                                        </div>
                                                    </q-collapsible>
                                                </div>
                                            </div>
                                            </div>
                                        </q-item-main>
                                    </q-item>
                                </q-list>
                            </q-card-main>
                        </q-card>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex" v-if="getShortLeadInfo.isStatus != 7">
            <!-- Final actions -->
            <div class="col-md-12" align="right">
                <q-btn
                    icon="block"
                    color="grey-5"
                    class="q-ma-sm text-dark"
                    @click="$router.go(-1)"
                    label="Cancel"
                />
                <q-btn
                    disable
                    icon="check"
                    class="q-ma-sm"
                    label="PROCEED TO DATA ENTRY"
                    v-if="showProceedToDataEntryButton"
                />
                <q-btn
                    icon="check"
                    color="tertiary"
                    class="q-ma-sm disabled no-pointer-events"
                    @click="fnApproveLeadData(getShortLeadInfo)"
                    label="PROCEED TO DATA ENTRY"
                     v-if="!showProceedToDataEntryButton"
                />
                <q-btn
                    icon="clear"
                    class="q-ma-sm"
                    color="negative"
                    label="REJECT"
                    @click="fnToggleRejectLeadComp"
                />
            </div>
        </div>
        
        <!-- START >> COMPONENT: Final reject -->
        <showFinalRejectLeadRemarksComponent
        v-if="toggleLeadRejectModal"
        :propToggleLeadModal="toggleLeadRejectModal"
        :propLeadDetails="getShortLeadInfo"
        @toggleLeadModal="fnToggleRejectLeadComp"
        ></showFinalRejectLeadRemarksComponent>
        <!-- END >> COMPONENT: Final reject -->

        <!-- START >> COMPONENT: Document reject  -->
        <showDocumentLeadApproveComponent
        v-if="toggleLeadDocumentApproveModal"
        :propToggleDocumentApproveModal="toggleLeadDocumentApproveModal"
        :propDocumentDetails="documentApproveTempArr"
        @toggleDocumentModal="fnDocumentApproveModal"
        ></showDocumentLeadApproveComponent>
        <!-- END >> COMPONENT: Document reject -->

        <!-- START >> COMPONENT: Document reject  -->
        <showDocumentLeadRejectComponent
        v-if="toggleLeadDocumentRejectModal"
        :propToggleDocumentRejectModal="toggleLeadDocumentRejectModal"
        :propDocumentDetails="documentRejectTempArr"
        @toggleDocumentModal="fnDocumentRejectModal"
        ></showDocumentLeadRejectComponent>

        <!-- START >> COMPONENT: View PDF  -->
        <showPdfModalComponent
        v-if="toggleshowPDFModal"
        :propToggleshowPDFModal="toggleshowPDFModal"
        :propPDFDetails="PDFDetails"
        @togglePDFModal="fnPDFViewModal"
        ></showPdfModalComponent>
        <!-- END >> COMPONENT: View PDF -->

        <!--START >>  Show Ajax Spinner -->
        <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
            <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
        </div>
        <!--END >>  Show Ajax Spinner -->
        </div>
    </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { easing } from "quasar";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";

import showFinalRejectLeadRemarksComponent from "../../components/sat/showFinalRejectLeadRemarksComponent.vue";
import showDocumentLeadApproveComponent from "../../components/sat/showDocumentLeadApproveComponent.vue";
import showDocumentLeadRejectComponent from "../../components/sat/showDocumentLeadRejectComponent.vue";

const VERIFIED_KYC_STATUS_FINANCE_PENDING = 6;
const VERIFIED_PRICING_STATUS_FINANCE_PENDING = 4;
const VERIFIED_BANKSUBVENTION_STATUS_FINANCE_PENDING = 3;

const containsKey = (obj, key) => Object.keys(obj).includes(key);
export default {
  name: "leadDataEntry",
  components: {
    showPdfModalComponent,
    showFinalRejectLeadRemarksComponent,
    showDocumentLeadApproveComponent,
    showDocumentLeadRejectComponent
  },
  data() {
    return {
      merchantTypeSelection: "",
      subDocumentTypeSelection: null,
      select: "",
      selectionOptions: [
        {
          label: "Dinesh",
          value: 1
        },
        {
          label: "vels",
          value: 2
        }
      ],
      //PDF property
      PDFDetails: null,
      toggleshowPDFModal: null,

      //Component properties
      toggleApproveLeadModal: false,
      toggleLeadRejectModal: false,
      toggleLeadDocumentApproveModal: false,
      toggleLeadDocumentRejectModal: false,
      documentApproveTempArr: [],
      documentRejectTempArr: [],
      rejectTempArr: [],
      //Component properties

      //Template porperties
      showProceedToDataEntryButton: false,
      toggleAjaxLoadFilter: false,
      model: "",
      tabsModel: "xtab-2",
      toggleChequeImageResult: false,
      toggleDocumentLeadRejectModal: false,
      checked: false,
      thumbnailsHorizontal: false,

      leadRejectReason: "",
      formData: {
        shortLead: "",
        documentType: []
      }
      //Template porperties
    };
  },
  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("SatLeadValidation", [
      "getShortLeadInfo",
      "getDeviceVerificationStatus",
      "getShortLeadInfoDocumentTypes"
    ])
  },
  created() {
    //function to load all lead details when page loads
    this.ajaxLoadShortLeadInfo();
    this.ajaxLoadShortLeadInfoForDocumentTypes();
  },
  methods: {
    ...mapActions("SatLeadValidation", [
      "FETCH_SHORT_LEAD_DATA",
      "FETCH_LEAD_DOCUMENT_TYPE_DATA",
      "VERIFY_DEVICE_FULL_LEAD",
      "VERIFY_DOCUMENT_FULL_LEAD",
      "VERIFY_LEAD_DATA"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    //function to load all lead details
    ajaxLoadShortLeadInfo() {
      this.FETCH_SHORT_LEAD_DATA(this.$route.params.id)
        .then(response => {
          this.formData.shortLead = this.getShortLeadInfo;
        })
        .catch(error => {
          console.log("FAILED >> ajaxLoadShortLeadInfo >>", error);
        });
      this.toggleAjaxLoadFilter = false;
    },

    //function to load all lead details
    ajaxLoadShortLeadInfoForDocumentTypes() {
      this.FETCH_LEAD_DOCUMENT_TYPE_DATA()
        .then(response => {
          this.formData.shortLead.documentType = this.getShortLeadInfoDocumentTypes;
        })
        .catch(error => {
          console.log("FAILED >> ajaxLoadShortLeadInfo >>", error);
        });
      this.toggleAjaxLoadFilter = false;
    },

    fnGetMerchantType(items) {
      let arr = [];
      items.map(function(value, index) {
        arr.push({ label: value.merchantType, value: index });
      });
      return arr;
    },
    fnGetMerchantTypeValue(inputValue) {
      this.getShortLeadInfoDocumentTypes[inputValue].documentsApplicable.map(
        function(value, index) {
          if (value.viewType == 1) {
            value.showSingleDocumentUpload = true;
          } else {
            value.showSingleDocumentUpload = false;
          }
        }
      );
    },
    fnGetSubDocumentType(items) {
      let arr = [];
      items.documents.map(function(value, index) {
        arr.push({ label: value.subDocumentType, value: index });
      });
      return arr;
    },
    fnGetSubDocumentTypeSelection(value3, value2, primaryItem) {
      primaryItem.subDocumentTypeSelection = primaryItem.id;
      let valueNow = this.getShortLeadInfoDocumentTypes[
        this.merchantTypeSelection
      ].documentsApplicable[value2].documents[value3];
      this.$delete(primaryItem, "documentTypeSelection");
      this.$set(primaryItem, "documentTypeSelection", valueNow);
    },

    // function to toggle cheque image for payments info if available
    toggleChequeImage() {
      this.toggleChequeImageResult = !this.toggleChequeImageResult;
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

    // function to approve lead and send to data entry final screen MARS
    fnApproveLeadData(leadInfo) {
      let formData = {
        leadInformation: {
          isStatus: 7,
          verifiedStatus: 1
        },
        leadVerificationStatus: {
          fieldName: "Full Lead Information",
          reason: "",
          leadInformation: {
            id: leadInfo.id
          },
          status: 1
        }
      };
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to proceed to data entry?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.TOGGLE_COMMON_LOADER(true);
          this.VERIFY_LEAD_DATA(formData)
            .then(response => {
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully approved",
                icon: "thumb_up"
              });
              this.$router.push(
                "/sat/lead/validation/" + this.$route.params.id + "/data/entry"
              );
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Error in approving lead!",
                icon: "thumb_down"
              });
            });
          this.TOGGLE_COMMON_LOADER(false);
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

    // funcion to toggle reject lead component
    fnToggleRejectLeadComp() {
      this.toggleLeadRejectModal = !this.toggleLeadRejectModal;
    },

    // funcion to toggle pdf component
    fnPDFViewModal(documentUrl) {
      this.PDFDetails = documentUrl;
      //this.PDFDetails = "http://www.africau.edu/images/default/sample.pdf";
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
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
.customQuasarSelect {
  padding: 5px;
}

label {
  padding: 3px;
  background: #ccc;
  display: table;
  color: #555;
}

input[type="file"] {
  display: none;
}
</style>
