<template>
  <q-page padding>
    <q-stepper flat ref="stepper" v-model="step" color="primary">
      <q-step default name="campaign" title="Edit Rental Details">
        {{this.info.datainfo1}}
        {{this.getImplementedQueue.leadInformation.merchantType.merchantTypeName}}
       
        
        <b>Edit Rental Details</b>
        <br />
        <br />
        <b>Device Count : {{formdata.deviceCount}}</b>
       
        <!-- {{this.getMidBasedList.tids}} -->
        <!-- {{formdata.mid}} -->
        <br />
        <br />
        <div>
          <div class="row gutter-sm q-my-xs" v-if="check==false">
            <!-- <div class="col-xs-12 col-sm-6">
              <q-input disable
                v-model="formdata.deviceCount"
                class="no-margin"
                float-label="Device Count"
              />
            </div>-->
            <!-- data: {{getRsmReason.reason}} -->
            <div class="col-xs-12 col-sm-6">
              <q-select
                v-model="formdata.plan"
                class="no-margin"
                float-label="Select Rental Plan"
                :options="dropDown.planOptions"
                :disable="this.getImplementedQueue.leadInformation.cmsLeadStatus==15"
                @input="fnPlan1"
              />
              <!-- @input="planSelected" -->
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-select
                clearable
                :disable="((formdata.plan != this.getImplementedQueue.leadInformation.plan.id)||(this.getImplementedQueue.leadInformation.cmsLeadStatus ==15)||(this.getImplementedQueue.leadInformation.cmsLeadStatus==21))"
                @blur="$v.formdata.paymentOption.$touch"
                :error="$v.formdata.paymentOption.$error"
                v-model.trim="formdata.paymentOption"
                class="no-margin"
                float-label="select Payment"
                :options="payment"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                disable
                v-model="formdata.setupFees"
                class="no-margin"
                float-label="Setup Fees"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                disable
                v-model="formdata.recurringFees"
                class="no-margin"
                float-label="Recurring fees"
              />
            </div>
            <!-- <div class="col-xs-12 col-sm-6">
              <q-input v-model="model" class="no-margin" float-label="Payment Ref Number" />
            </div>-->
            <!-- <div class="col-xs-12 col-sm-6">
              <q-input v-model="model" class="no-margin" float-label="Amount" />
            </div>-->
            <div class="col-xs-12 col-sm-6">
              <!-- <p class="caption">Pricing Exception</p> -->
              <q-checkbox
                v-model="check"
                :disable="this.getImplementedQueue.leadInformation.cmsLeadStatus==15"
                color="positive"
                label="Pricing Exception"
                left-label
              />
            </div>
          </div>

          <div class="row gutter-sm q-my-xs" v-else>
            <!-- <div class="col-xs-12 col-sm-6">
              <q-input disable
                v-model="formdata1.deviceCount"
                class="no-margin"
                float-label="Device Count"
              />
            </div>-->

            <div class="col-xs-12 col-sm-6">
              <q-select
                v-model="formdata1.plan"
                class="no-margin"
                float-label="Select Rental Plan"
                :options="dropDown.planOptions"
                @input="fnPlan"
              />
            </div>
            <!-- <div class="col-xs-12 col-sm-6">
              <q-select clearable
               @blur="$v.formdata.paymentOption.$touch"
              :error="$v.formdata.paymentOption.$error"
              v-model="formdata.paymentOption"
                class="no-margin"
                float-label="select Payment"
                :options="payment"
              />
            </div>-->
            <div class="col-xs-12 col-sm-6">
              <q-input v-model="formdata1.setupFees" class="no-margin" float-label="Setup Fees" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="formdata1.recurringFees"
                class="no-margin"
                float-label="Recurring fees"
              />
            </div>
            <!-- <div class="col-xs-12 col-sm-6">
              <q-input v-model="model" class="no-margin" float-label="Payment Ref Number" />
            </div>-->
            <!-- <div class="col-xs-12 col-sm-6">
              <q-input v-model="model" class="no-margin" float-label="Amount" />
            </div>-->
            <div class="col-xs-12 col-sm-6">
              <!-- <p class="caption">Pricing Exception</p> -->
              <q-checkbox
                v-model="check"
                :disable="this.getImplementedQueue.leadInformation.cmsLeadStatus==15"
                color="positive"
                label="Pricing Exception"
                left-label
              />
            </div>
          </div>
        </div>
        <div v-if="formdata.paymentOption==2" class="row gutter-sm q-my-xs">
          <div class="col-xs-12 col-sm-6">
            <p></p>
            <q-item>
              <q-item-section>Upload the Cheque File :</q-item-section>
              <label class="cursor-pointer text-white" style="background-color: #202c3f;">
                <span>Attach</span>
                <input
                  type="file"
                  name="file"
                  @change="fnUploadApplicationForm($event,document)"
                  accept=".png, .jpg, .pdf"
                />
              </label>
              &nbsp;{{this.formdata.paymentDocumentFile}}
            </q-item>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              @blur="$v.formdata.paymentMadeon.$touch"
              :error="$v.formdata.paymentMadeon.$error"
              v-model.trim="formdata.paymentMadeon"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="*Transaction Made ON"
              placeholder="Transaction Made ON"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              @blur="$v.formdata.referenceNumber.$touch"
              :error="$v.formdata.referenceNumber.$error"
              v-model.trim="formdata.referenceNumber"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Cheque Reference Number"
            />
          </div>
        </div>
        <div v-else-if="formdata.paymentOption==1" class="row gutter-sm q-my-xs">
          <div class="col-xs-12 col-sm-6">
            <q-input
              @blur="$v.formdata.referenceNumber.$touch"
              :error="$v.formdata.referenceNumber.$error"
              v-model.trim="formdata.referenceNumber"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="*NEFT Reference Number"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              @blur="$v.formdata.paymentMadeon.$touch"
              :error="$v.formdata.paymentMadeon.$error"
              v-model.trim="formdata.paymentMadeon"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="*Transaction Made ON"
            />
          </div>
        </div>
        <div v-else-if="formdata.paymentOption==3" class="row gutter-sm q-my-xs">
          <div class="col-xs-12 col-sm-6">
            <q-input
              @blur="$v.formdata.referenceNumber.$touch"
              :error="$v.formdata.referenceNumber.$error"
              v-model.trim="formdata.referenceNumber"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="*Swipe Reference Number"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              @blur="$v.formdata.paymentMadeon.$touch"
              :error="$v.formdata.paymentMadeon.$error"
              v-model.trim="formdata.paymentMadeon"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="*Transaction Made ON"
            />
          </div>
        </div>
        <br />

        <q-stepper-navigation>
          <!-- <q-btn color="primary" @click="$refs.stepper.goToStep('create_ad')">Create ad now</q-btn> -->
          <div
            v-if="((formdata.plan == this.getImplementedQueue.leadInformation.plan.id) && (check==false) && (this.getImplementedQueue.leadInformation.cmsLeadStatus==15))"
          >
            <!-- <q-btn class="q-ml-sm" color="primary" @click="sendtoNH(formdata)"
            >Send to mars</q-btn>-->
            <q-btn class="q-ml-sm" color="primary" @click="sendtoFinance(formdata)">Send to Finance</q-btn>
            <!-- <q-btn
                color="negative"
                class="q-ma-xs"
                icon="backspace"
                label="Back to document validation"
                @click="goBackToDocumentVerificationStage()"
            />-->

            <!-- <q-btn class="q-ml-sm" color="primary" @click="$refs.stepper.next()">Continue</q-btn> -->
          </div>
          <div
            v-else-if="((formdata.plan == this.getImplementedQueue.leadInformation.plan.id) && (check==false) && (this.getImplementedQueue.leadInformation.cmsLeadStatus==21))"
          >
            <!-- <q-btn class="q-ml-sm" color="primary" @click="sendtoNH(formdata)"
            >Send to mars</q-btn>-->
            <q-btn class="q-ml-sm" color="primary" @click="sendtoFinance(formdata)">Send to Finance</q-btn>
            <!-- <q-btn
                color="negative"
                class="q-ma-xs"
                icon="backspace"
                label="Back to document validation"
                @click="goBackToDocumentVerificationStage()"
            />-->

            <!-- <q-btn class="q-ml-sm" color="primary" @click="$refs.stepper.next()">Continue</q-btn> -->
          </div>
          <div
            v-else-if="((formdata.plan == this.getImplementedQueue.leadInformation.plan.id) && (check==false) && (this.getImplementedQueue.leadInformation.cmsLeadStatus==19) || (this.getImplementedQueue.leadInformation.cmsLeadStatus==17))"
          >
            <!-- <q-btn class="q-ml-sm" color="primary" @click="sendtoNH(formdata)"
            >Send to mars</q-btn>-->
            <q-btn class="q-ml-sm" color="primary" @click="sendtoNH(formdata1)">Send to RSM</q-btn>
            <!-- <q-btn
                color="negative"
                class="q-ma-xs"
                icon="backspace"
                label="Back to document validation"
                @click="goBackToDocumentVerificationStage()"
            />-->

            <!-- <q-btn class="q-ml-sm" color="primary" @click="$refs.stepper.next()">Continue</q-btn> -->
          </div>
          <div
            v-else-if="((formdata.plan != this.getImplementedQueue.leadInformation.plan.id) && (check==false))"
          >
            <!-- &&(formdata.paymentOption == 1 || formdata.paymentOption == 2 || formdata.paymentOption == 3) -->
            <q-btn class="q-ml-sm" color="primary" @click="sendtoFinance(formdata)">Send to Finance</q-btn>
            <!-- <q-btn
                color="negative"
                class="q-ma-xs"
                icon="backspace"
                label="Back to document validation"
                @click="goBackToDocumentVerificationStage()"
            />-->
            <!-- <q-btn class="q-ml-sm" color="primary" @click="$refs.stepper.next()">Continue</q-btn> -->
          </div>
          <div
            v-else-if="((formdata.plan != this.getImplementedQueue.leadInformation.plan.id || formdata.plan == this.getImplementedQueue.leadInformation.plan.id) && (check==true))"
          >
            <q-btn class="q-ml-sm" color="primary" @click="sendtoNH(formdata1)">Send to RSM</q-btn>
            <!-- <q-btn
                color="negative"
                class="q-ma-xs"
                icon="backspace"
                label="Back to document validation"
                @click="goBackToDocumentVerificationStage()"
            />-->
            <!-- <q-btn class="q-ml-sm" color="primary" @click="$refs.stepper.next()">Continue</q-btn> -->
          </div>
          <div v-else>
            <q-btn class="q-ml-sm" color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          </div>
        </q-stepper-navigation>
      </q-step>

      <q-step name="ad_group" title="Edit KYC Fields">
        <p class="caption">
          <strong>Edit KYC Details</strong>
        </p>
        <div class="row gutter-sm">
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="merchant.companyinformation.legalName"
              class="no-margin"
              float-label="Legal Name"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="merchant.companyinformation.dbaName"
              class="no-margin"
              float-label="DBA Name"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              
              v-model="merchant.companyinformation.contactName"
              class="no-margin"
              float-label="Contact Name"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="merchant.companyinformation.registeredAddress"
              class="no-margin"
              float-label="Address"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              
              color="grey-9"
              v-model.trim="merchant.companyinformation.registeredCityName"
              float-label="City (type min 3 characters)*"
              placeholder="Start typing ..*"
            >
              <q-autocomplete
                separator
                @search="residentCitySearch"
                :debounce="10"
                :min-characters="3"
                @selected="registeredCitySelected"
              />
            </q-input>
            <!-- {{merchant.companyinformation.registeredCityName}} -->
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              
              color="grey-9"
              v-model.trim="merchant.companyinformation.registeredStateName"
              float-label="state (type min 3 characters)*"
              placeholder="Start typing ..*"
            >
              <q-autocomplete
                separator
                @search="residentStateSearch"
                :debounce="10"
                :min-characters="1"
                @selected="registeredStateSelected"
              />
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              
              v-model="merchant.companyinformation.registeredPin"
              class="no-margin"
              float-label="Pincode"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="merchant.companyinformation.contactMobile"
              class="no-margin"
              float-label="Mobile Number"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="merchant.companyinformation.contactEmail"
              class="no-margin"
              float-label="Email Id"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              
              v-model="merchant.companyinformation.statementEmail"
              class="no-margin"
              float-label="Statement Email ID"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="merchant.companyinformation.businessNature"
              class="no-margin"
              float-label="Nature of Business Change"
            />
          </div>
          <!-- <div class="col-xs-12 col-sm-6">
              <q-input v-model="merchant.companyinformation.contactMobile" class="no-margin" float-label="Contact Number" />
          </div>-->

          <div class="col-xs-12 col-sm-6">
            <q-input
              upper-case
              color="grey-9"
              @blur="$v.merchant.companyinformation.pan.$touch"
              :error="$v.merchant.companyinformation.pan.$error"
              v-model="merchant.companyinformation.pan"
              class="no-margin"
              float-label="Pan Number"
            />
            <div class="text-negative" v-if="error.field.merchant.companyinformation.pan.alert">
              <MarsErrorResponse :error="error.field.merchant.companyinformation.pan" />
            </div>
            <div
              class="text-negative q-py-xs group text-caption"
              v-if="$v.merchant.companyinformation.pan.$error"
            >
              <div>
                <q-icon color="negative" name="warning" />&nbsp;Required - Provide valid PAN Number
              </div>
              <div v-if="$v.merchant.companyinformation.pan.$params.minLength">
                <q-icon color="negative" name="warning" />
                &nbsp;Length should be between {{$v.merchant.companyinformation.pan.$params.minLength.min}} and {{ $v.merchant.companyinformation.pan.$params.maxLength.max }}
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              upper-case
              color="grey-9"
              @blur="$v.merchant.businessInformation.gstId.$touch"
              :error="$v.merchant.businessInformation.gstId.$error"
              v-model="merchant.businessInformation.gstId"
              class="no-margin"
              float-label="Gst Number"
            />
            <div class="text-negative" v-if="error.field.merchant.businessInformation.gstId.alert">
              <MarsErrorResponse :error="error.field.merchant.businessInformation.gstId" />
            </div>

            <div
              class="text-negative q-py-xs group text-caption"
              v-if="$v.merchant.businessInformation.gstId.$error"
            >
              <div>
                <q-icon color="negative" name="warning" />&nbsp;Required - Provide valid GST Number
              </div>
              <div v-if="$v.merchant.businessInformation.gstId.$params.minLength">
                <q-icon color="negative" name="warning" />
                &nbsp;Length should be between {{$v.merchant.businessInformation.gstId.$params.minLength.min}} and {{ $v.merchant.businessInformation.gstId.$params.maxLength.max }}
              </div>
            </div>
          </div>
          <!-- <div class="col-xs-12 col-sm-6">
              <q-input v-model="model" class="no-margin" float-label="Details 4" />
          </div>-->
          <div class="col-xs-12 col-sm-6">
            <q-input
              
              upper-case
              color="grey-9"
              @blur="populateBankDetails"
              v-model.trim="merchant.bankInformation.bankDetails.ifsc"
              float-label="IFSC Code*"
              placeholder="Enter IFSC*"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              
              upper-case
              color="grey-9"
              v-model.trim="merchant.bankInformation.bankDetails.bankName"
              float-label="Bank Name*"
              placeholder="Enter IFSC*"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              
              placeholder="Choose from the below"
              color="grey-9"
              v-model.trim="merchant.bankInformation.bankDetails.paymentMode"
              float-label="Payment mode"
              :options="paymnentModeOptions"
            />
          </div>
          <!-- <div class="col-xs-12 col-sm-6">
              <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="merchant.paymentDetails.rentalPlanCode"
                  float-label="Rental Plan*"
                  :options="rentalPlanSet"
                />
          </div> -->
          <div class="col-xs-12 col-sm-6">
            <q-select
              
              placeholder="Choose from the below"
              color="grey-9"
              v-model.trim="merchant.bankInformation.bankDetails.accountType"
              float-label="Account Type"
              :options="accountTypeOptions"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="merchant.bankInformation.bankDetails.accountNumber"
              class="no-margin"
              float-label="Account Numbers"
            />
          </div>
          <!-- <div class="col-xs-12 col-sm-6">
              <p><b>Auto or Manual Settlement?</b></P>
              <q-radio
                v-for="(item,index) in autoormanualOptions"
                :key="index"
                color="grey-9"
                v-model.trim="merchant.paymentDetails.settlementType"
                :val="item.value"
                :label="item.label"
              />
          </div> -->
          <!-- <div class="col-xs-12 col-sm-6">
              <q-input v-model="model" class="no-margin" float-label="MDR Change" />
          </div>-->
          <!-- <div class="col-xs-12 col-sm-6">
              <p>
                <b>Pre Auth Enable?</b>
              </p>
              <q-radio
                v-for="(item,index) in preauthOptions"
                :key="index"
                color="grey-9"
                v-model.trim="merchant.paymentDetails.preAuth"
                :val="item.value"
                :label="item.label"
              />
          </div> -->
          <!-- <div class="col-xs-12 col-sm-6">
              <p>
                <b>Cash/POS Activation?</b>
              </p>
              <q-radio
                v-for="(item,index) in cashandposOptions"
                :key="index"
                color="grey-9"
                v-model.trim="merchant.paymentDetails.cashAtPosEnabled"
                :val="item.value"
                :label="item.label"
              />
          </div> -->
          <!-- <div class="col-xs-12 col-sm-6">
              <p>
                <b>Internation Card Acceptance?</b>
              </p>
              <q-radio
                v-for="(item,index) in internationalcardOptions"
                :key="index"
                color="grey-9"
                v-model.trim="merchant.paymentDetails.intlCardAcceptance"
                :val="item.value"
                :label="item.label"
              />
          </div> -->
          <!-- <div class="col-xs-12 col-sm-6">
              <p>
                <b>Tip Enable?</b>
              </p>
              <q-radio
                v-for="(item,index) in tipOptions"
                :key="index"
                color="grey-9"
                v-model.trim="merchant.paymentDetails.tipEnabled"
                :val="item.value"
                :label="item.label"
              />
          </div> -->
        </div>
        <!-- <div class="row gutter-sm">
          <div class="col-xs-12">
            Cheque
            <label class="cursor-pointer text-white" style="background-color: #202c3f;">
              <span class="text-caption text-weight-light">Attach</span>
              <input
                type="file"
                name="file"
                id="file"
                v-on:change="fnVerificationDocumentUploadSingleUpload()"
                accept=".png, .jpg, .pdf"
              />
            </label>
          </div>
        </div>Pan Card:
        <div>
          <label class="cursor-pointer text-white" style="background-color: #202c3f;">
            <span class="text-caption text-weight-light">Attach</span>
            <input
              type="file"
              name="file"
              id="file"
              v-on:change="fnVerificationDocumentUploadSingleUpload()"
              accept=".png, .jpg, .pdf"
            />
          </label>
        </div>
        <div>
          Cheque :
          <label class="cursor-pointer text-white" style="background-color: #202c3f;">
            <span class="text-caption text-weight-light">Attach</span>
            <input
              type="file"
              name="file"
              id="file"
              v-on:change="fnVerificationDocumentUploadSingleUpload()"
              accept=".png, .jpg, .pdf"
            />
          </label>
        </div>-->

        <q-stepper-navigation>
          <!-- <q-btn color="primary" @click="$refs.stepper.next()">Submit</q-btn> -->
          <!-- <q-btn class="q-ml-sm" color="secondary"  @click="finalMerchant(merchant)">Submit to Mars Merchant Details</q-btn> -->
          <q-btn class="q-ml-sm" color="primary" @click="next()">Continue</q-btn>

          <q-btn class="q-ml-sm" color="primary" flat @click="$refs.stepper.previous()">Back</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="mdrdetails" title="MDR Changes">
        <div class="row group items-center">
          <div class="col-md-12">
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>Domestic Debit Card below 2000</strong>
                </div>
              </div>
              <div class="col">
                <div class="text-caption text-weight-medium q-py-sm" align="center">
                  <b>Merchant Disc Fee</b>
                </div>
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.domesticDebitUpTo2000.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.domesticDebitUpTo2000.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.domesticDebitUpTo2000.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>Domestic Debit Card above 2000</strong>
                </div>
              </div>
              <div class="col">
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.domesticDebitAbove2000.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.domesticDebitAbove2000.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.domesticDebitAbove2000.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>Standard/Classic (1st Stab)</strong>
                </div>
              </div>
              <div class="col">
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.standardOrClassic.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.standardOrClassic.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.standardOrClassic.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>Premium/Platinum (2nd Stab)</strong>
                </div>
              </div>
              <div class="col">
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.premiumOrPlatinum.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.premiumOrPlatinum.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.premiumOrPlatinum.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>Super Premium/Signature (3rd Stab)</strong>
                </div>
              </div>
              <div class="col">
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.superPremiumOrSignature.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.superPremiumOrSignature.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.superPremiumOrSignature.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>Commercial/Coporate 4th Stab</strong>
                </div>
              </div>
              <div class="col">
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.commercialOrCorporate.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.commercialOrCorporate.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.commercialOrCorporate.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>International Debit Card</strong>
                </div>
              </div>
              <div class="col">
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.internationalDebitCard.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.internationalDebitCard.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.internationalDebitCard.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>International Credit Card</strong>
                </div>
              </div>
              <div class="col">
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.internationalCreditCard.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.internationalCreditCard.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.internationalCreditCard.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>Onus</strong>
                </div>
              </div>
              <div class="col">
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.onus.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.onus.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.onus.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>Diners</strong>
                </div>
              </div>
              <div class="col">
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.diners.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.diners.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.diners.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>Master Pass</strong>
                </div>
              </div>
              <div class="col">
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.masterPass.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.masterPass.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.masterPass.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>Cash at POS</strong>
                </div>
              </div>
              <div class="col">
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.cashAtPos.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.cashAtPos.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.cashAtPos.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-3">
                <div class="text-caption text-weight-medium">
                  <strong>Convenience fees</strong>
                </div>
              </div>
              <div class="col">
                <div class="row group bg-green-2">
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.convenientFee.fixed"
                      placeholder="Fixed"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.convenientFee.percentage"
                      placeholder="%"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model.trim="merchant.mdrPlan.convenientFee.minimum"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="row group">
                    <div class="col-md-4">
                      <q-input
                          color="grey-9"
                          type="number"
                          v-model.trim="merchant.mdrPlan.remarks"
                          placeholder="Mdr Remarks"
                        />

                    </div>
                   
            </div>-->
          </div>
        </div>

        <q-stepper-navigation>
          <!-- <q-btn class="q-ml-sm" color="secondary"  @click="finalFormSubmit(merchant)">Submit to Mars MDR</q-btn> -->
          <!-- <q-btn class="q-ml-sm" color="primary" @click="next()">Continue</q-btn> -->
          <q-btn class="q-ml-sm" color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          <q-btn class="q-ml-sm" color="primary" flat @click="$refs.stepper.previous()">Back</q-btn>
        </q-stepper-navigation>
      </q-step>
       <q-step name="zata" title="Attach Documents">
        <div>
          <q-item separator class="text-body1">
            <q-item-section>
              <q-item-label>
                <div class="text-body1">
                  Merchant type:
                  <span class="text-weight-medium">{{this.getImplementedQueue.leadInformation.merchantType.merchantTypeName}}</span>
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item separator class="text-body1 text-dark bg-grey-4 text-weight-medium">
            <q-item-section>Application Form</q-item-section>
            <q-item-section>
              <label class="cursor-pointer text-white" style="background-color: #202c3f;">
                <span class="text-caption text-weight-light">Attach</span>
                <input
                  type="file"
                  name="file"
                  @change="fnUploadApplicationForm1($event,document)"
                  accept=".png, .jpg, .pdf"
                />
              </label>
            </q-item-section>
          </q-item>
          <q-item separator class="text-body1">
            <q-item-section>
              <div class="full-width">
                <div
                  class="cursor-pointer"
                  v-if="getShortLeadInfo.applicationFileMimeType==null"
                >
                  <div @click="fnPDFViewModal(getShortLeadInfo.applicationFile)" class="ellipsis">
                    <q-btn round size="sm" icon="fas fa-file-pdf" color="primary" />
                    &nbsp;{{getShortLeadInfo.applicationFile}}
                  </div>
                </div>
                <div
                  class="cursor-pointer"
                  v-else-if="getShortLeadInfo.applicationFileMimeType.includes('pdf')"
                >
                  <div @click="fnPDFViewModal(getShortLeadInfo.applicationFile)" class="ellipsis">
                    <q-btn round size="sm" icon="fas fa-file-pdf" color="primary" />
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
                    />
                  </viewer>
                  <div @click="fnViewHandedOverFileImage()" class="ellipsis">
                    <q-icon name="fas fa-image" color="amber-9" />
                    &nbsp;{{getShortLeadInfo.applicationFile}}
                  </div>
                </div>
                <div v-else>Invalid document type/ No document available</div>
              </div>
            </q-item-section>
          </q-item>
          <!-- START >> (Optional) payment document file == bank subvention  -->
          
          <div v-if="this.getImplementedQueue.leadInformation.merchantType.merchantTypeName == 0" class="full-width text-body1 q-pa-sm">
            <p>No documents available to display</p>
          </div>
          <div v-else class="group">
            <q-list
              class="no-padding"
              dense
              v-if="getShortLeadInfoDocumentTypes"
              v-for="(singleDocument,singleDocumentIndex) in getShortLeadInfoDocumentTypes.uploadedDocuments.forSingleDocument"
              :key="singleDocumentIndex"
            >
              <div
                v-for="(document,documentIndex) in singleDocument.documents"
                :key="documentIndex"
                class="border-bottom"
              >
                <q-item separator dense class="text-body1 bg-grey-4 q-pa-sm">
                  <q-item-section>{{document.subDocumentType}}</q-item-section>
                  <q-item-section>
                    <label class="cursor-pointer text-white" style="background-color: #202c3f;">
                      <span class="text-caption text-weight-light">Attach</span>
                      <input
                        type="file"
                        name="file"
                        @change="fnVerificationDocumentUploadSingleUpload($event,document)"
                        accept=".png, .jpg, .pdf"
                      />
                    </label>
                  </q-item-section>
                </q-item>
                <!-- {{getShortLeadInfo.leadDocuments}} -->
                <div
                  v-if="displayAttachedFileIndex == document.documentType"
                  v-for="
          (displayAttachedFile,displayAttachedFileIndex) in getShortLeadInfo.leadDocuments"
                  :key="displayAttachedFileIndex"
                >
                  <div
                    v-if="attachedSubFile.subDocumentType == document.subDocumentType"
                    v-for="
            attachedSubFile in displayAttachedFile"
                    :key="attachedSubFile.id"
                  >
                    <q-item
                      dense
                      v-for="(filesAttachedEarlier,filesAttachedEarlierIndex) in attachedSubFile.uploadedDocuments"
                      :key="filesAttachedEarlierIndex"
                      class="text-body1"
                      separator
                    >
                      <q-item-section>
                        <q-item-label class="text-body1">
                          <div
                            class="cursor-pointer"
                            v-if="filesAttachedEarlier.mimeType.includes('pdf')"
                          >
                            <div
                              ref="attachedImageViewer"
                              @click="fnPDFViewModal(filesAttachedEarlier.fileName)"
                              class="ellipsis"
                            >
                              <q-icon name="fas fa-file-pdf" color="negative" />
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
                              />
                            </viewer>
                            <div
                              @click="fnViewAttachedFileImage(filesAttachedEarlierIndex)"
                              class="ellipsis"
                            >
                              <q-icon name="fas fa-image" color="amber-9" />
                              &nbsp;{{filesAttachedEarlier.fileName}}
                            </div>
                          </div>
                        </q-item-label>
                      </q-item-section>

                      <q-item-section>
                        <q-btn
                          size="xs"
                          icon="clear"
                          @click="fnDeleteAlreadyAttachedFile(filesAttachedEarlier)"
                          round
                          color="negative"
                          label="Remove"
                        />
                      </q-item-section>
                    </q-item>
                  </div>
                </div>
              </div>
            </q-list>
            <q-list
              class="no-padding"
              dense
              v-if="getShortLeadInfoDocumentTypes"
              v-for="multipleDocument in getShortLeadInfoDocumentTypes.uploadedDocuments.forMutipleDocument"
              :key="multipleDocument.id"
            >
              <q-item-label header class="q-mb-sm bg-grey-4">{{multipleDocument.documentType}}</q-item-label header>
              <div>
                <q-item separator dense class="text-body1 q-pa-sm">
                  <q-item-section>
                    <!-- <pre>{{multipleDocument.subDocumentTypeSelection}}</pre> -->
                    <select
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
                  </q-item-section>
                  <q-item-section
                    v-if="fn_________GetEntryPermissionToUploadSubDocuments(multipleDocument)"
                    ref="subDocumentUploadParent"
                  >
                    <label class="cursor-pointer text-white" style="background-color: #202c3f;">
                      <span class="text-caption text-weight-light">Attach</span>
                      <input
                        type="file"
                        ref="subDocumentUpload"
                        @change="fnVerificationDocumentUpload($event,multipleDocument.subDocumentTypeSelection)"
                        name="file"
                        accept=".png, .jpg, .pdf"
                      />
                    </label>
                  </q-item-section>
                </q-item>
              </div>
              <q-separator />
              <div
                v-if="displayAttachedFileIndex == multipleDocument.documentType"
                v-for="
            (displayAttachedFile,displayAttachedFileIndex) in getShortLeadInfo.leadDocuments"
                :key="displayAttachedFileIndex"
              >
                <div
                  v-for="
            attachedSubFile in displayAttachedFile"
                  :key="attachedSubFile.id"
                >
                  <q-item
                    v-for="(filesAttachedEarlier,filesAttachedEarlierIndex) in attachedSubFile.uploadedDocuments"
                    :key="filesAttachedEarlierIndex"
                    class="text-body1"
                    separator
                    dense
                  >
                    <q-item-section>
                      <q-item-label class="text-body1">
                        <div
                          class="cursor-pointer"
                          v-if="filesAttachedEarlier.mimeType.includes('pdf')"
                        >
                          <div
                            ref="multiAttachedImageViewer"
                            @click="fnPDFViewModal(filesAttachedEarlier.fileName)"
                            class="ellipsis"
                          >
                            <q-icon name="fas fa-file-pdf" color="negative" />
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
                            />
                          </viewer>
                          <div
                            @click="fnViewMultiAttachedFileImage(filesAttachedEarlierIndex)"
                            class="ellipsis"
                          >
                            <q-icon name="fas fa-image" color="amber-9" />
                            &nbsp;{{filesAttachedEarlier.fileName}}
                          </div>
                        </div>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-btn
                        size="xs"
                        icon="clear"
                        @click="fnDeleteAlreadyAttachedFile(filesAttachedEarlier)"
                        round
                        color="negative"
                        label="Remove"
                      />
                    </q-item-section>
                  </q-item>
                  <q-separator />
                </div>
              </div>
            </q-list>
            <br />
            <br />
            <div class="row group">
              <div class="col-md-4">
                <q-input
                  color="grey-9"
                  v-model.trim="merchant.kyc.remarks"
                  placeholder="KYC Document Remarks"
                />
              </div>
            </div>
          </div>

          <!-- END >> (Mandatory) payment document file == bank subvention  -->
          <!-- END >> (Mandatory) Application form  -->

          <!-- START >> Handover to SAT, document upload -->
        </div>

        <q-stepper-navigation>
          <!-- <q-btn
            class="q-ml-sm"
            color="secondary"
            @click="finalFormSubmitKyc(merchant)"
          >Submit to Mars</q-btn> -->
          <q-btn class="q-ml-sm" color="primary" @click="next1()">Continue</q-btn>
          <!-- <q-btn class="q-ml-sm" color="primary" @click="fnsubmitTOmars()">Submit to Mars</q-btn> -->

          <q-btn class="q-ml-sm" color="primary" flat @click="$refs.stepper.previous()">Back</q-btn>
        </q-stepper-navigation>
      </q-step>
     
      <q-step default name="campaign1" title="TID Level Details">
       
          
        <div class="row gutter-sm q-my-xs items-center">
          
          <div class="col-xs-12" align="center">
            <q-card><strong>Choose the TID List</strong>
              <q-card-section>
                <q-checkbox
                v-for="(item,index) in formdata.mid"
                :key="index"
                color="grey-9"
                v-model.trim="formdata.tid"
                :val="item"
                :label="item"
              />
              </q-card-section>
            </q-card>
          </div>
        </div><br><br>
      
   
        <div class="row">
          <!--START: table title -->
          <div class="col-md-3">
            <strong>
              <span>Amount Collected </span>
            </strong>
            <br />
            
          </div>

          <div class="col-md-6">
            <q-input disable
                v-model="formdata.amountCollected"
                class="no-margin"
                float-label="Amount Collected"
              />
            <!--   :error="$v.formdata.leadSource.$error" -->
          </div>
        </div>
        <br />
        <div class="row">
          <!--START: table title -->
          <div class="col-md-3">
            <strong>
              <span>Recurring Fees</span>
            </strong>
            <br />
            
          </div>

          <div class="col-md-6">
            <q-input disable
                v-model="formdata.recurringFees"
                class="no-margin"
                float-label="Recurring Fees"
              />
            <!--   :error="$v.formdata.leadSource.$error" -->
          </div>
        </div>
        <br />
              <div class="row">
          <div class="col-md-3">
            <strong>
              <span>Select the Rental Plan</span>
            </strong>
            <br />
           
          </div>
          <div class="col-md-6">
           <q-select :disable="this.getImplementedQueue.leadInformation.cmsLeadStatus==22"
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="merchant.paymentDetails.rentalPlanCode"
                  float-label="Rental Plan*"
                  :options="rentalPlanSet"
                />
            <!-- :error="$v.formdata.count.$error" -->
          </div>
        </div>
         <div class="row">
          <!--START: table title -->
          <div class="col-md-3">
            <strong>
              <span>Auto or Manual Settlement?</span>
            </strong>
            <br />
            
          </div>

          <div class="col-md-6">
                         <q-radio
                v-for="(item,index) in autoormanualOptions"
                :key="index"
                color="grey-9"
                v-model.trim="merchant.paymentDetails.settlementType"
                :val="item.value"
                :label="item.label"
              />
            <!--   :error="$v.formdata.leadSource.$error" -->
          </div>
        </div>
        <br />
         <div class="row">
          <!--START: table title -->
          <div class="col-md-3">
            <strong>
              <span>Pre Auth Enable?</span>
            </strong>
            <br />
            
          </div>

          <div class="col-md-6">
            <q-radio
                v-for="(item,index) in preauthOptions"
                :key="index"
                color="grey-9"
                v-model.trim="merchant.paymentDetails.preAuth"
                :val="item.value"
                :label="item.label"
              />
            <!--   :error="$v.formdata.leadSource.$error" -->
          </div>
        </div>
        <br />
         <div class="row">
          <!--START: table title -->
          <div class="col-md-3">
            <strong>
              <span>Cash/POS Activation?</span>
            </strong>
            <br />
            
          </div>

          <div class="col-md-6">
                <q-radio
                v-for="(item,index) in cashandposOptions"
                :key="index"
                color="grey-9"
                v-model.trim="merchant.paymentDetails.cashAtPosEnabled"
                :val="item.value"
                :label="item.label"
              />
            <!--   :error="$v.formdata.leadSource.$error" -->
          </div>
        </div>
        <br />
         <div class="row">
          <!--START: table title -->
          <div class="col-md-3">
            <strong>
              <span>Internation Card Acceptance?</span>
            </strong>
            <br />
            
          </div>

          <div class="col-md-6">
                    <q-radio
                v-for="(item,index) in internationalcardOptions"
                :key="index"
                color="grey-9"
                v-model.trim="merchant.paymentDetails.intlCardAcceptance"
                :val="item.value"
                :label="item.label"
              />
            <!--   :error="$v.formdata.leadSource.$error" -->
          </div>
        </div>
        <br />
         <div class="row">
          <!--START: table title -->
          <div class="col-md-3">
            <strong>
              <span>Tip Enable?</span>
            </strong>
            <br />
            
          </div>

          <div class="col-md-6">
            <q-radio
                v-for="(item,index) in tipOptions"
                :key="index"
                color="grey-9"
                v-model.trim="merchant.paymentDetails.tipEnabled"
                :val="item.value"
                :label="item.label"
              />
            <!--   :error="$v.formdata.leadSource.$error" -->
          </div>
        </div>
        <br />
  
        
            
            
         
        
       
        <q-stepper-navigation>
          <q-btn
            class="q-ml-sm"
            color="secondary"
            @click="finalFormSubmitKyc(merchant)"
          >Submit to Mars</q-btn>
          
          <!-- <q-btn class="q-ml-sm" color="primary" @click="fnsubmitTOmars()">Submit to Mars</q-btn> -->

          <q-btn class="q-ml-sm" color="primary" flat @click="$refs.stepper.previous()">Back</q-btn>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    <showPdfModalComponent
      v-if="toggleshowPDFModal"
      :propToggleshowPDFModal="toggleshowPDFModal"
      :propPDFDetails="PDFDetails"
      @togglePDFModal="fnPDFViewModal"
    ></showPdfModalComponent>
  </q-page>
</template>
<style>
</style>
<style scoped>
</style>
<script>

import { LocalStorage } from "quasar";
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;

import {
  required,
  requiredIf,
  alphaNum,
  integer,
  numeric,
  minLength,
  maxLength,
  email,
  maxValue,
  minValue,
  decimal,
} from "@vuelidate/validators";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import { uid } from "quasar";

import MarsErrorResponse from "../../components/MarsErrorResponseHandler.vue";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";

import { helpers } from "@vuelidate/validators";
const panCard = helpers.regex(
  "panCard",
  /^([A-Z]{3}[ABCFEGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1})?$/
);

const gstn = helpers.regex(
  "gstn",
  // /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9]{1})+$/
  /^([0-9]){2}([A-Z]{3}[ABCFEGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[0-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
);
export default {
  components: {
    showPdfModalComponent,
    MarsErrorResponse,
  },
  data() {
    return {
      PDFDetails: null,
      toggleshowPDFModal: false,
      formData: {
        shortLead: this.getShortLeadInfo,
        documentType: [],
      },
      check: false,
      merchantTypeSelection: "",
      subDocumentTypeSelection: 0,
      stateOptions: [],
      cityOptions: [],
      rentalPlanSet: [],
      dropDown: {
        deviceOptions: [],
        planOptions: [],
        leadSourceOptions: [],
        merchantTypesOptions: [],
      },
      info: {
        datainfo1: "",
      },
      merchant: {
        datainfo: "",
      },
      formdata: {
        mid:[],
        tid:[],
        sample:"",
        paymentOption: "",
        referenceNumber: "",
        paymentMadeon: "",
        setupFees: "",
        deviceId: "",
        leadSourceId: "",
        recurringFees: "",
        verifiedCmsPricingStatus: 1,
        plan: "",
        planCode: "",
        contactName: "",
        contactNumber: "",
        alternateContactNumber: "",
        city: "",
        device: "",
        deviceCount: "",
        leadAddress: "",
        latitude: "",
        longitude: "",
        state: "",
        leadCategory: 2,
        kyc: false,
        verifiedBanksubventionStatus: "",
        reason: "",
        amountCollected:"",
        merchantCategory: "",
        corpCC: "",
        debitGreaterthanAmount: "",
        debitLessthanAmount: "",
        premiumCC: "",
        pricing: 1,
        leadStatus: "",
        submittoRSMDate: "",
        posIncentive: "",
        posEnable: "",
        leadName: "",
        paymentDocumentFile: "",
        paymentDocumentMimeType: "",
      },
      forminfo:{
        applicationNumber:""
      },
      formdata1: {
        paymentOption: "",
        referenceNumber: "",
        paymentMadeon: "",
        setupFees: "",
        deviceId: "",
        leadSourceId: "",
        recurringFees: "",
        verifiedCmsPricingStatus: 1,
        plan: "",
        planCode: "",
        contactName: "",
        contactNumber: "",
        alternateContactNumber: "",
        city: "",
        device: "",
        deviceCount: "",
        leadAddress: "",
        latitude: "",
        longitude: "",
        state: "",
        leadCategory: 2,
        kyc: false,
        verifiedBanksubventionStatus: "",
        reason: "",
        // amountCollected:"",
        merchantCategory: "",
        corpCC: "",
        debitGreaterthanAmount: "",
        debitLessthanAmount: "",
        premiumCC: "",
        pricing: 1,
        leadStatus: "",
        submittoRSMDate: "",
        posIncentive: "",
        posEnable: "",
        leadName: "",
        paymentDocumentFile: "",
        paymentDocumentMimeType: "",
      },
      merchant: {
        salesInformation: {
          institutionCode: "",
        },
        companyinformation: {
          pan: "",
          contactPhone: "",
          legalName: "",
          dbaName: "",
          registeredAddress: "",
          registeredPin: "",
          registeredCityRefCode: "",
          registeredStateRefCode: "",
          registeredCityName: "",
          registeredStateName: "",
          businessNature: "",
          contactMobile: "",
          contactName: "",
          statementEmail: "",
          contactEmail: "",
          applicationNumber: "",
          remarks: "Company Details Updated",
        },
        bankInformation: {
          bankDetails: {
            accountNumber: "",
            ifsc: "",
            bankName: "",
            paymentMode: "",
            accountType: "",
          },
          remarks: "Bank Details Updated",
        },
        businessInformation: {
          gstId:null,
          remarks: "",
        },
        kyc: {
          remarks: "",
          documents: [],
        },
        // partnerInformation:[],
        // customIncentiveRates:[],
        // additionalInfo:"",
        paymentDetails: {
          settlementType:"",
          tipEnabled: "",
          cashAtPosEnabled: "",
          intlCardAcceptance: "",
          preAuth: "",
          rentalPlanCode: "",
          remarks: "Payment Details Updated",
          //       deviceSerialNumber:"2314shbcnas341",
          //  installationDate: "30/12/2019",
          //  deinstallationDate: "31/12/2019"
        },
        mdrPlan: {
          remarks: "MDR Value Updated",
          code: 1,
          domesticDebitUpTo2000: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
          domesticDebitAbove2000: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
          standardOrClassic: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
          premiumOrPlatinum: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
          superPremiumOrSignature: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
          commercialOrCorporate: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
          internationalDebitCard: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
          internationalCreditCard: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
          onus: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
          diners: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
          masterPass: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
          cashAtPos: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
          convenientFee: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0,
          },
        },
      },
      error: {
        field: {
          merchant: {
            businessInformation: {
              gstId: {
                alert: false,
                issue: "",
                value: "",
              },
            },
            companyinformation: {
              pan: {
                alert: false,
                issue: "",
                value: "",
              },
            },
          },
        },
      },

      model: "",
      // rental: [
      //   {
      //     label: "Monthly Plan",
      //     value: "1"
      //   },
      //   {
      //     label: "Six Month Plan",
      //     value: "2"
      //   }
      // ],
      payment: [
        {
          label: "Cheque",
          value: 2,
        },
        {
          label: "Swipe",
          value: 3,
        },
        {
          label: "Neft",
          value: 1,
        },
      ],
      autoormanualOptions: [
        {
          label: "Auto Settlement",
          value: "A",
        },
        {
          label: "Manual Settlement",
          value: "M",
        },
      ],
      preauthOptions: [
        {
          label: "Enable",
          value: "Y",
        },
        {
          label: "Disable",
          value: "N",
        },
      ],
      cashandposOptions: [
        {
          label: "Enable",
          value: "Y",
        },
        {
          label: "Disable",
          value: "N",
        },
      ],
      internationalcardOptions: [
        {
          label: "Enable",
          value: "Y",
        },
        {
          label: "Disable",
          value: "N",
        },
      ],
      tipOptions: [
        {
          label: "Enable",
          value: "Y",
        },
        {
          label: "Disable",
          value: "N",
        },
      ],
      paymnentModeOptions: [
        {
          label: "Direct credit",
          value: "D",
        },
        {
          label: "NEFT",
          value: "N",
        },
        // {
        //   label: "IMPS",
        //   value: "I"
        // }
      ],
      accountTypeOptions: [
        {
          label: "Saving account",
          value: "S",
        },
        {
          label: "Current account",
          value: "C",
        },
        {
          label: "Overdraft account",
          value: "O",
        },
        {
          label: "Cash credit account",
          value: "R",
        },
      ],
    };
  },

  computed: {
    ...mapGetters("SatLeadValidation", [
      "getShortLeadInfo",
      "getDeviceVerificationStatus",
    ]),
    ...mapGetters("mars_rentalPlans", ["rentalPlanFromMars"]),
    ...mapGetters("categoryBasedRental", ["categoryBasedRental"]),
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("SA_Devices", ["getAllDevicesInfo"]),
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
    ...mapGetters("plan", ["getActivePlan"]),
    ...mapGetters("CategoryBasedMdr", ["categoryBasedMdr"]),
    // ...mapGetters("GetMarsData", ["getAllMarsData"]),
    ...mapGetters("GetMarsData", ["getAllMarsData", "getImplementedQueue","getMidBasedList"]),
    ...mapGetters("SatLeadValidation", [
      "getShortLeadInfo",
      "getDeviceVerificationStatus",
      "getShortLeadInfoDocumentTypes",
    ]),
    ...mapGetters("mars_city", ["cityFromMars"]),
    ...mapGetters("mars_state", ["stateFromMars"]),
    ...mapGetters("mars_ifsc", ["ifscFromMars"]),
    getRsmReason() {
      return _.find(
        this.getImplementedQueue.leadInformation.leadVerificationStatus,
        function (oo) {
          return oo.verificationType == 6 && oo.status == false;
        }
      );
    },
  },
  created() {
    // this.ajaxLoadLeadDataEntryInfo();
    this.ajaxLoadDataForDeviceTypeTable1();
    //  this.IMPLEMENTED_QUEUE("BIB09593")
    this.ajaxLoadMarsData();
    this.ajaxLoadShortLeadInfoForDocumentTypes();
    this.fetchAllDropdownValuesFromMARSapi();
    // this.fetchAndCookDocuments();
    // this.fetchAndCookDocuments();
  },
  validations: {
    formdata: {
      referenceNumber: {
        required,
      },
      paymentOption: {
        required,
      },
      paymentMadeon: {
        required,
      },
      // paymentDocumentFile:{
      //   required
      // },
    },
    // merchant1:{
    //        kyc:{
    //     remarks:{
    //       required
    //     }
    //   }
    // },
    merchant: {
      companyinformation: {
        pan: {
          required,
          panCard,
          maxLength: maxLength(10),
          minLength: minLength(10),
        },
      },

      businessInformation: {
        gstId: {
          gstn,
          maxLength: maxLength(15),
          minLength: minLength(15),
        },
      },
    },
  },
  methods: {
    ...mapActions("SatLeadValidation", [
      "FETCH_SHORT_LEAD_DATA",
      "VERIFY_DEVICE_FULL_LEAD",
    ]),
    ...mapActions("mars_rentalPlans", ["RENTAL_PLAN_FROM_MARS"]),
    ...mapActions("categoryBasedRental", ["CATEGORY_BASED_RENTAL_PLAN1"]),
    ...mapActions("mars_city", ["CITY_FROM_MARS"]),
    ...mapActions("mars_state", ["STATE_FROM_MARS"]),
    ...mapActions("mars_ifsc", ["IFSC_FROM_MARS"]),
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA"]),
    // ...mapActions("GetMarsData", ["FETCH_MARS_DATA"]),
    ...mapActions("GetMarsData", ["FETCH_MARS_DATA", "IMPLEMENTED_QUEUE","MIDBASEDLIST"]),
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("MdrPlan", ["MDR_PLAN"]),
    ...mapActions("CategoryBasedMdr", [
      "CATEGORY_BASED_MDR_PLAN",
      "EDIT_MDR_PLAN",
    ]),
    ...mapActions("SatLeadValidation", [
      "FEED_HAND_OVER_TO_SAT_DOCUMENT",
      "FEED_CHEQUE_FORM",
      "FEED_FULL_APPLICATION_FORM",
      "DELETE_DOCUMENT_FROM_BY_SAT",
      "FETCH_LEAD_DOCUMENT_TYPE_DATA",
      "FETCH_SHORT_LEAD_DATA",
    ]),
    ...mapActions("SatLeadValidation", [
      "MOVE_BACK_DOCUMENT_VERIFICATION_STAGE",
    ]),
    ...mapActions("SendTORSMCMS", ["SEND_TO_RSM_CMS"]),
    ...mapActions("plan", ["PLAN_ACTIVE_LIST"]),
    ...mapActions("CMS_EDIT_MDR", [
      "CMS_EDIT_MDR",
      "CMS_EDIT_MERCHANT",
      "CMS_EDIT_KYC",
      "CMS_EDIT_TERMINAL",
      "CMS_STATUS_CHANGE",
    ]),
    
      ...mapActions("mars_dataSubmit", [
      
      "MARS_DATA_SUBMIT_INTERNAL_CHANGEMANAGEMENT",
    ]),

    // planSelected(item) {

    // this.formdata.plan= item;
    // // this.formdata.planCode=item.planName;
    // // this.formdata.planCode1=item.
    //   console.log("Hello",this.formdata.plan);
    // },
    sendtoFinance(request) {
      this.$v.formdata.$touch();
      if (this.$v.formdata.$error) {
        this.$q.notify("Please review fields again.");
      } else if (
        this.formdata.paymentOption == 2 &&
        this.formdata.paymentDocumentFile == ""
      ) {
        this.$q.notify({
          color: "amber",
          position: "bottom",
          message: "data",
          icon: "attachment",
          message: "Please attach the Cheque File",
        });
      } else {
        let requestparams = {
          url: {
            id: this.getShortLeadInfo.id,
          },
          params: {
            setupFees: request.setupFees,
            amountCollected: request.setupFees,
            recurringFees: request.recurringFees,
            planCode: request.planCode,
            verifiedCmsPricingStatus: request.verifiedCmsPricingStatus,
            contactName: request.contactName,
            contactNumber: request.contactNumber,
            alternateContactNumber: request.alternateContactNumber,
            city: request.city,
            device: request.device,
            deviceCount: request.deviceCount,
            leadAddress: request.leadAddress,
            latitude: request.latitude,
            longitude: request.longitude,
            state: request.state,
            leadCategory: request.leadCategory,
            kyc: request.kyc,
            verifiedBanksubventionStatus: request.verifiedBanksubventionStatus,
            reason: request.reason,
            //  amountCollected:request.amountCollected,
            merchantCategory: request.merchantCategory,
            corpCC: request.corpCC,
            debitGreaterthanAmount: request.debitGreaterthanAmount,
            debitLessthanAmount: request.debitLessthanAmount,
            premiumCC: request.premiumCC,
            pricing: request.pricing,
            leadStatus: request.leadStatus,
            submittoRSMDate: request.submittoRSMDate,
            posEnable: request.posEnable,
            posIncentive: request.posIncentive,
            plan1: request.plan,
            leadName: request.leadName,
            paymentMadeon: request.paymentMadeon,
            referenceNumber: request.referenceNumber,
            paymentOption: request.paymentOption,
            paymentDocumentFile: request.paymentDocumentFile,
            paymentDocumentMimeType: request.paymentDocumentMimeType,
          },
        };
        if (this.check == false) {
          requestparams.params.leadCategory = 1;
          requestparams.params.pricing = 0;
        } else {
          requestparams.params.leadCategory = 2;
          requestparams.params.pricing = 1;
        }
        // this.SEND_TO_RSM_CMS(requestparams)
        // this.$q.notify({
        //             color: "positive",
        //             position: "bottom",
        //             message: "Succesfully Send to RSM",
        //             icon: "thumb_up"
        //           });
        //  this.$router.push("/sat/change/management");
        // delete this.formdata.plan;
        this.SEND_TO_RSM_CMS(requestparams)
          .then((response) => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "data",
              icon: "thumb_up",
              message: response.data.message,
            });
            this.$router.push("/sat/change/management");
            // var self = this;
            // Object.keys(this.formData).forEach(function(key, index) {
            //   self.formData[key] = "";
            // });
          })
          .catch((error) => {
            console.log(error);
            this.$q.notify({
              color: "negative",
              position: "bottom",
              icon: "thumb_down",
              message: error.data.message,
            });
            // var self = this;
            // Object.keys(this.formData).forEach(function(key, index) {
            //   self.formData[key] = "";
            // });
          });
      }
    },
    fnPlan() {
      let formData = {
        leadSource: this.formdata1.leadSourceId,
        device: this.formdata1.deviceId,
        plan: this.formdata1.plan,
      };
      this.CATEGORY_BASED_RENTAL_PLAN1(formData).then((response) => {
        if (response.status == 200) {
          this.formdata1.setupFees =
            this.categoryBasedRental == null
              ? 0
              : this.getImplementedQueue.leadInformation.deviceCount *
                this.categoryBasedRental.setupFees;
          this.formdata1.recurringFees =
            this.categoryBasedRental == null
              ? 0
              : this.getImplementedQueue.leadInformation.deviceCount *
                this.categoryBasedRental.monthlyFees;
        }
      });
    },
    fnPlan1() {
      let formData = {
        leadSource: this.formdata.leadSourceId,
        device: this.formdata.deviceId,
        plan: this.formdata.plan,
      };
      this.CATEGORY_BASED_RENTAL_PLAN1(formData).then((response) => {
        if (response.status == 200) {
          this.formdata.setupFees =
            this.categoryBasedRental == null
              ? 0
              : this.getImplementedQueue.leadInformation.deviceCount *
                this.categoryBasedRental.setupFees;
          this.formdata.recurringFees =
            this.categoryBasedRental == null
              ? 0
              : this.getImplementedQueue.leadInformation.deviceCount *
                this.categoryBasedRental.monthlyFees;
        }
      });
    },

    sendtoNH(request) {
      let requestparams = {
        url: {
          id: this.getShortLeadInfo.id,
        },
        params: {
          setupFees: request.setupFees,
          amountCollected: request.setupFees,
          recurringFees: request.recurringFees,
          planCode: request.planCode,
          verifiedCmsPricingStatus: request.verifiedCmsPricingStatus,
          contactName: request.contactName,
          contactNumber: request.contactNumber,
          alternateContactNumber: request.alternateContactNumber,
          city: request.city,
          device: request.device,
          deviceCount: request.deviceCount,
          leadAddress: request.leadAddress,
          latitude: request.latitude,
          longitude: request.longitude,
          state: request.state,
          leadCategory: request.leadCategory,
          kyc: request.kyc,
          verifiedBanksubventionStatus: request.verifiedBanksubventionStatus,
          reason: request.reason,
          //  amountCollected:request.amountCollected,
          merchantCategory: request.merchantCategory,
          corpCC: request.corpCC,
          debitGreaterthanAmount: request.debitGreaterthanAmount,
          debitLessthanAmount: request.debitLessthanAmount,
          premiumCC: request.premiumCC,
          pricing: request.pricing,
          leadStatus: request.leadStatus,
          submittoRSMDate: request.submittoRSMDate,
          posEnable: request.posEnable,
          posIncentive: request.posIncentive,
          plan1: request.plan,
          leadName: request.leadName,
          paymentMadeon: request.paymentMadeon,
          referenceNumber: request.referenceNumber,
          paymentOption: request.paymentOption,
          paymentDocumentFile: request.paymentDocumentFile,
          paymentDocumentMimeType: request.paymentDocumentMimeType,
        },
      };
      if (this.check == false) {
        requestparams.params.leadCategory = 1;
        requestparams.params.pricing = 0;
      } else {
        requestparams.params.leadCategory = 2;
        requestparams.params.pricing = 1;
      }
      // this.SEND_TO_RSM_CMS(requestparams)
      // this.$q.notify({
      //             color: "positive",
      //             position: "bottom",
      //             message: "Succesfully Send to RSM",
      //             icon: "thumb_up"
      //           });
      //  this.$router.push("/sat/change/management");
      // delete this.formdata.plan;
      this.SEND_TO_RSM_CMS(requestparams)
        .then((response) => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "data",
            icon: "thumb_up",
            message: response.data.message,
          });
          this.$router.push("/sat/change/management");
          // var self = this;
          // Object.keys(this.formData).forEach(function(key, index) {
          //   self.formData[key] = "";
          // });
        })
        .catch((error) => {
          console.log(error);
          this.$q.notify({
            color: "negative",
            position: "bottom",
            icon: "thumb_down",
            message: error.data.message,
          });
          // var self = this;
          // Object.keys(this.formData).forEach(function(key, index) {
          //   self.formData[key] = "";
          // });
        });
    },
    fnVerificationDocumentUpload(event, documentDetails) {
      this.merchant.kyc.documents = [];
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Uploading file ..",
      });
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      // formData.append("fileNameOriginal", "cheque");

      let requestParams = {
        files: formData,
        leadId: this.getShortLeadInfo.id,
        documentId: documentDetails.id,
      };

      this.FEED_HAND_OVER_TO_SAT_DOCUMENT(requestParams)
        .then((response) => {
          // this.ajaxLoadMarsData();
          this.shortLeadInfo();
          this.$q.loading.hide();
          //  this.ajaxLoadMarsData();
          // this.$emit(
          //   "emitAjaxLoadShortLeadInfo",
          //   "hotReloadForDocumentsUploadValidation",
          //   this.merchantTypeSelection
          // );

          // this.FETCH_SHORT_LEAD_DATA(this.getShortLeadInfo.id)
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Failed to upload document",
            icon: "thumb_down",
          });
        });
    },
    ajaxLoadDataForDeviceTypeTable1() {
      let self = this;
      self
        .FETCH_DEVICES_DATA()
        .then(() => {
          return _.map(self.getAllDevicesInfo, (item) => {
            self.dropDown.deviceOptions.push({
              value: item.id,
              label: item.deviceName,
            });
          });
        })
        .then(() => {
          self.LEAD_SOURCE_ACTIVE_LIST().then(() => {
            return _.map(self.getActiveLeadSource, (item) => {
              self.dropDown.leadSourceOptions.push({
                value: item.id,
                label: item.sourceName,
              });
            });
          });
        })
        .then(() => {
          self.PLAN_ACTIVE_LIST().then(() => {
            return _.map(self.getActivePlan, (item) => {
              self.dropDown.planOptions.push({
                value: item.id,
                label: item.planName,
              });
            });
          });
        });
    },
    ajaxLoadMarsData() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.IMPLEMENTED_QUEUE(this.$route.params.id)

        // this.FETCH_MARS_DATA(this.getImplementedQueue.leadInformation.id)
        // this.FETCH_SHORT_LEAD_DATA(this.getImplementedQueue.leadInformation.id)
        .then((response) => {
          //  this.FETCH_MARS_DATA(this.getImplementedQueue.leadInformation.id)
          this.FETCH_SHORT_LEAD_DATA(
            this.getImplementedQueue.leadInformation.id
          );
          //  this.FETCH_SHORT_LEAD_DATA(this.getImplementedQueue.leadInformation.id)
          this.marsInfo();

          (this.formdata.plan = this.getImplementedQueue.leadInformation.plan.id),
            (this.formdata.planCode = this.getImplementedQueue.leadInformation.plan.planName);
          this.formdata.deviceId = this.getImplementedQueue.leadInformation.device.id;
          this.formdata.leadSourceId = this.getImplementedQueue.leadInformation.leadSource.id;

          this.formdata.contactName = this.getImplementedQueue.leadInformation.contactName;
          this.formdata.contactNumber = this.getImplementedQueue.leadInformation.contactName;
          this.formdata.alternateContactNumber = this.getImplementedQueue.leadInformation.alternateContactNumber;
          this.formdata.city = this.getImplementedQueue.leadInformation.city;
          this.formdata.device = this.getImplementedQueue.leadInformation.device;
          this.formdata.deviceCount = this.getImplementedQueue.leadInformation.deviceCount;
          this.formdata.leadAddress = this.getImplementedQueue.leadInformation.leadAddress;
          this.formdata.latitude = this.getImplementedQueue.leadInformation.latitude;
          this.formdata.longitude = this.getImplementedQueue.leadInformation.longitude;
          this.formdata.state = this.getImplementedQueue.leadInformation.state;
          // this.formdata.leadCategory=this.getImplementedQueue.leadInformation.leadCategory;
          this.formdata.kyc = this.getImplementedQueue.leadInformation.kyc;
          this.formdata.verifiedBanksubventionStatus = this.getImplementedQueue.leadInformation.verifiedBanksubventionStatus;
          this.formdata.reason = this.getImplementedQueue.leadInformation.reason;
          // this.formdata.amountCollected=this.getImplementedQueue.leadInformation.amountCollected;
          this.formdata.merchantCategory = this.getImplementedQueue.leadInformation.merchantCategory;
          // this.formdata.corpCC=this.getImplementedQueue.leadInformation.corpCC;
          // this.formdata.debitGreaterthanAmount=this.getImplementedQueue.leadInformation.debitGreaterthanAmount;
          // this.formdata.debitLessthanAmount=this.getImplementedQueue.leadInformation.debitGreaterthanAmount;
          // this.formdata.premiumCC=this.getImplementedQueue.leadInformation.premiumCC;
          this.formdata.pricing = this.getImplementedQueue.leadInformation.pricing;
          this.formdata.leadStatus = this.getImplementedQueue.leadInformation.leadStatus;
          this.formdata.submittoRSMDate = this.getImplementedQueue.leadInformation.submittoRSMDate;
          this.formdata.posIncentive = this.getImplementedQueue.leadInformation.posIncentive;
          this.formdata.posEnable = this.getImplementedQueue.leadInformation.posEnable;
          this.formdata.leadName = this.getImplementedQueue.leadInformation.leadName;

          (this.formdata1.plan = this.getImplementedQueue.leadInformation.plan.id),
            (this.formdata1.planCode = this.getImplementedQueue.leadInformation.plan.planName);
          this.formdata1.setupFees = this.getImplementedQueue.leadInformation.setupFees;
          this.formdata1.recurringFees = this.getImplementedQueue.leadInformation.recurringFees;
              //  this.forminfo.applicationNumber = this.getImplementedQueue.applicationNumber;
          this.formdata.setupFees = this.getImplementedQueue.leadInformation.setupFees;
          this.formdata.recurringFees = this.getImplementedQueue.leadInformation.recurringFees;
           this.formdata.amountCollected = this.getImplementedQueue.leadInformation.amountCollected;
          this.formdata1.contactName = this.getImplementedQueue.leadInformation.contactName;
          this.formdata1.contactNumber = this.getImplementedQueue.leadInformation.contactName;
          this.formdata1.alternateContactNumber = this.getImplementedQueue.leadInformation.alternateContactNumber;
          this.formdata1.city = this.getImplementedQueue.leadInformation.city;
          this.formdata1.device = this.getImplementedQueue.leadInformation.device;
          this.formdata1.deviceId = this.getImplementedQueue.leadInformation.device.id;
          this.formdata1.leadSourceId = this.getImplementedQueue.leadInformation.leadSource.id;
          this.formdata1.deviceCount = this.getImplementedQueue.leadInformation.deviceCount;
          this.formdata1.leadAddress = this.getImplementedQueue.leadInformation.leadAddress;
          this.formdata1.latitude = this.getImplementedQueue.leadInformation.latitude;
          this.formdata1.longitude = this.getImplementedQueue.leadInformation.longitude;
          this.formdata1.state = this.getImplementedQueue.leadInformation.state;
          // this.formdata1.leadCategory=this.getImplementedQueue.leadInformation.leadCategory;
          this.formdata1.kyc = this.getImplementedQueue.leadInformation.kyc;
          this.formdata1.verifiedBanksubventionStatus = this.getImplementedQueue.leadInformation.verifiedBanksubventionStatus;
          this.formdata1.reason = this.getImplementedQueue.leadInformation.reason;
          // this.formdata1.amountCollected=this.getImplementedQueue.leadInformation.amountCollected;
          this.formdata1.merchantCategory = this.getImplementedQueue.leadInformation.merchantCategory;
          // this.formdata1.corpCC=this.getShortLeadInfo.corpCC;
          // this.formdata1.debitGreaterthanAmount=this.getShortLeadInfo.debitGreaterthanAmount;
          // this.formdata1.debitLessthanAmount=this.getShortLeadInfo.debitGreaterthanAmount;
          // this.formdata1.premiumCC=this.getShortLeadInfo.premiumCC;
          this.formdata1.pricing = this.getImplementedQueue.leadInformation.pricing;
          this.formdata1.leadStatus = this.getImplementedQueue.leadInformation.leadStatus;
          this.formdata1.submittoRSMDate = this.getImplementedQueue.leadInformation.submittoRSMDate;
          this.formdata1.posIncentive = this.getImplementedQueue.leadInformation.posIncentive;
          this.formdata1.posEnable = this.getImplementedQueue.leadInformation.posEnable;
          this.formdata1.leadName = this.getImplementedQueue.leadInformation.leadName;
          this.merchant.mdrPlan.domesticDebitUpTo2000.percentage = this.getImplementedQueue.leadInformation.debitLessthanAmount;
          this.merchant.mdrPlan.domesticDebitAbove2000.percentage = this.getImplementedQueue.leadInformation.debitGreaterthanAmount;
          this.merchant.mdrPlan.standardOrClassic.percentage = this.getImplementedQueue.leadInformation.stdCC;
          this.merchant.mdrPlan.premiumOrPlatinum.percentage = this.getImplementedQueue.leadInformation.premiumCC;
          this.merchant.mdrPlan.superPremiumOrSignature.percentage = this.getImplementedQueue.leadInformation.superPremiumlCC;
          this.merchant.mdrPlan.commercialOrCorporate.percentage = this.getImplementedQueue.leadInformation.corpCC;
          this.merchant.mdrPlan.internationalCreditCard.percentage = this.getImplementedQueue.leadInformation.intlCC;
          this.merchantTypeSelection = this.getImplementedQueue.leadInformation.merchantType.merchantTypeName;
          // this.formdata.plan=this.getShortLeadInfo.plan.id,
          // this.formdata.planCode=this.getShortLeadInfo.plan.planName;
          // this.formdata.setupFees=this.getShortLeadInfo.setupFees;
          // this.formdata.recurringFees=this.getShortLeadInfo.recurringFees;
          // this.formdata.contactName=this.getShortLeadInfo.contactName;
          // this.formdata.contactNumber=this.getShortLeadInfo.contactName;
          // this.formdata.alternateContactNumber=this.getShortLeadInfo.alternateContactNumber;
          // this.formdata.city=this.getShortLeadInfo.city;
          // this.formdata.device=this.getShortLeadInfo.device;
          // this.formdata.deviceCount=this.getShortLeadInfo.deviceCount;
          // this.formdata.leadAddress=this.getShortLeadInfo.leadAddress;
          // this.formdata.latitude=this.getShortLeadInfo.latitude;
          // this.formdata.longitude=this.getShortLeadInfo.longitude;
          // this.formdata.state=this.getShortLeadInfo.state;
          // // this.formdata.leadCategory=this.getShortLeadInfo.leadCategory;
          // this.formdata.kyc=this.getShortLeadInfo.kyc;
          // this.formdata.verifiedBanksubventionStatus=this.getShortLeadInfo.verifiedBanksubventionStatus;
          // this.formdata.reason=this.getShortLeadInfo.reason;
          // this.formdata.amountCollected=this.getShortLeadInfo.amountCollected;
          // this.formdata.merchantCategory=this.getShortLeadInfo.merchantCategory;
          // this.formdata.corpCC=this.getShortLeadInfo.corpCC;
          // this.formdata.debitGreaterthanAmount=this.getShortLeadInfo.debitGreaterthanAmount;
          // this.formdata.debitLessthanAmount=this.getShortLeadInfo.debitGreaterthanAmount;
          // this.formdata.premiumCC=this.getShortLeadInfo.premiumCC;
          // // this.formdata.pricing=this.getShortLeadInfo.pricing;
          // this.formdata.leadStatus=this.getShortLeadInfo.leadStatus;
          // this.formdata.submittoRSMDate=this.getShortLeadInfo.submittoRSMDate;
          // this.formdata.posIncentive=this.getShortLeadInfo.posIncentive;
          // this.formdata.posEnable=this.getShortLeadInfo.posEnable;
          // this.formdata.leadName=this.getShortLeadInfo.leadName
          // this.merchant.companyinformation.pan=this.getAllMarsData.companyInformation.pan;
          // this.merchant.companyinformation.contactPhone=this.getAllMarsData.companyInformation.contactPhone;
          // this.merchant.companyinformation.legalName=this.getAllMarsData.companyInformation.legalName;
          // this.merchant.companyinformation.dbaName=this.getAllMarsData.companyInformation.dbaName;
          // this.merchant.companyinformation.registeredAddress=this.getAllMarsData.companyInformation.registeredAddress;
          // this.merchant.companyinformation.registeredPin=this.getAllMarsData.companyInformation.registeredPin;
          // this.merchant.companyinformation.registeredCityRefCode=this.getAllMarsData.companyInformation.registeredCityRefCode;
          // this.merchant.companyinformation.registeredCityName=this.getAllMarsData.companyInformation.registeredCityName;
          // this.merchant.companyinformation.registeredStateRefCode=this.getAllMarsData.companyInformation.registeredStateRefCode;
          // this.merchant.companyinformation.registeredStateName=this.getAllMarsData.companyInformation.registeredStateName;
          // this.merchant.companyinformation.contactName=this.getAllMarsData.companyInformation.contactName;
          // this.merchant.companyinformation.statementEmail=this.getAllMarsData.companyInformation.statementEmail;
          // this.merchant.companyinformation.applicationNumber=this.getAllMarsData.salesInformation.applicationNumber;
          // this.merchant.companyinformation.contactEmail=this.getAllMarsData.companyInformation.contactEmail;
          // this.merchant.companyinformation.contactMobile=this.getAllMarsData.companyInformation.contactMobile;
          // this.merchant.companyinformation.businessNature=this.getAllMarsData.companyInformation.businessNature;
          // // this.formdata.merchant.companyinformation.gst=this.getAllMarsData.companyInformation.gst
          // // this.merchant.businessInformation.gstId=this.getAllMarsData.businessInformation.gst
          // this.merchant.bankInformation.bankDetails.accountNumber=this.getAllMarsData.bankInformation.bankDetails.accountNumber
          // this.merchant.bankInformation.bankDetails.ifsc=this.getAllMarsData.bankInformation.bankDetails.ifsc
          // this.merchant.bankInformation.bankDetails.bankName=this.getAllMarsData.bankInformation.bankDetails.bankName
          // this.merchant.bankInformation.bankDetails.paymentMode=this.getAllMarsData.bankInformation.bankDetails.paymentMode
          // this.merchant.bankInformation.bankDetails.accountType=this.getAllMarsData.bankInformation.bankDetails.accountType
          // this.merchant.paymentDetails.settlementType=this.getAllMarsData.paymentDetails.settlementType
          // // this.merchant.paymentDetails.settlementType=this.getAllMarsData.paymentDetails.settlementType
          // this.merchant.paymentDetails.tipEnabled=this.getAllMarsData.paymentDetails.tipEnabled
          // this.merchant.paymentDetails.cashAtPosEnabled=this.getAllMarsData.paymentDetails.cashAtPosEnabled
          // this.merchant.paymentDetails.intlCardAcceptance=this.getAllMarsData.paymentDetails.intlCardAcceptance
          // this.merchant.paymentDetails.preAuth=this.getAllMarsData.paymentDetails.preAuth
          // this.merchant.paymentDetails.rentalPlanCode=this.getAllMarsData.paymentDetails.rentalPlanCode;
          // this.merchant.salesInformation.institutionCode=this.getAllMarsData.salesInformation.institutionCode

          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },
    fnUploadApplicationForm(event, documentDetails) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Uploading file ..",
      });
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("fileNameOriginal", "Cheque");

      let requestParams = {
        files: formData,
        fileNameOriginal: "Cheque",
      };
      this.FEED_CHEQUE_FORM(requestParams)
        .then((response) => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "data",
            icon: "thumb_up",
            message: "File Successfully Uploaded" + "-" + response.fileName,
          });
          console.log("application form", response.fileName);
          this.formdata.paymentDocumentFile = response.fileName;
          this.formdata.paymentDocumentMimeType = response.mimeType;
          // this.ajaxLoadLeadDataEntryInfo()
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Failed to upload document",
            icon: "thumb_down",
          });
        });
    },
    ajaxLoadShortLeadInfoForDocumentTypes() {
      //function to load all lead details
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching files ..",
      });
      this.FETCH_LEAD_DOCUMENT_TYPE_DATA()
        .then((response) => {
          return this.fnGetMerchantTypeValue(
            this.getImplementedQueue.leadInformation.merchantType
              .merchantTypeName
          );
        })
        .then((response) => {
          this.formData.documentType = this.getShortLeadInfoDocumentTypes;
          // this.$emit(
          //   "emitAjaxLoadShortLeadInfo",
          //   "hotReloadForDocumentsUploadValidation",
          //   this.merchantTypeSelection
          // );
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },
    fnUploadApplicationForm1(event, documentDetails) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Uploading file ..",
      });
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      this.merchant.kyc.documents = [];

      let requestParams = {
        files: formData,
        leadId: this.getShortLeadInfo.id,
      };

      this.FEED_FULL_APPLICATION_FORM(requestParams)

        .then((response) => {
           this.shortLeadInfo();
           
           
          //  this.FETCH_SHORT_LEAD_DATA(this.getShortLeadInfo.leadInformation.id);
          this.$q.loading.hide();

          // this.FETCH_SHORT_LEAD_DATA(this.getShortLeadInfo.leadInformation.id);
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Failed to upload document",
            icon: "thumb_down",
          });
        });
    },
    // Function to show PDF
    fnPDFViewModal(documentUrl) {
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
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
          documentDetails["selectedSubDocumentType"] = documentDetails.subDocumentType;
        }
      }
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
        return true;
      }
    },
    fnViewHandedOverFileImage() {
      this.$refs.handedOverImageViewer.click();
    },
    fnGetMerchantTypeValue(inputValue) {
      let merchantDocumentCategory = _.find(
        this.getShortLeadInfoDocumentTypes,
        (o) => o.merchantType === inputValue
      );
      let arr = {
        forSingleDocument: [],
        forMutipleDocument: [],
      };
      let innerSelf = this;
      let leadDocuments = innerSelf.getShortLeadInfo.leadDocuments;
      merchantDocumentCategory.documentsApplicable.map(function (value, index) {
        if (value.viewType == 1) {
          arr.forSingleDocument.push(value);
        } else {
          if (value.documentType in leadDocuments) {
            let assumeArr = _.find(value.documents, function (oo) {
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
            if (assumeArr == undefined) {
              value["subDocumentTypeSelection"] = 0;
            } else {
              value["subDocumentTypeSelection"] = assumeArr;
            }
          } else {
            value["subDocumentTypeSelection"] = 0;
          }
          arr.forMutipleDocument.push(value);
        }
      });
      this.getShortLeadInfoDocumentTypes["uploadedDocuments"] = arr;
    },
    fnViewbankUploadedLetterImage() {
      this.$refs.bankUploadedLetter.click();
    },
    fnDeleteAlreadyAttachedFile(documentDetails) {
      this.merchant.kyc.documents = [];
      let innerSelf = this;
      innerSelf.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete uploaded document?",
          ok: "Continue",
          cancel: "Cancel",
        })
        .then(() => {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing ..",
          });
          innerSelf
            .DELETE_DOCUMENT_FROM_BY_SAT(documentDetails)
            .then((response) => {
              this.shortLeadInfo();
              // this.ajaxLoadMarsData();
              innerSelf.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully removed!",
                icon: "thumb_up",
              });
              // innerSelf.FETCH_SHORT_LEAD_DATA(innerSelf.$route.params.id);
              // innerSelf.$emit(
              //   "emitAjaxLoadShortLeadInfo",
              //   "hotReloadForDocumentsUploadValidation",
              //   innerSelf.merchantTypeSelection
              // );
              // this.FETCH_SHORT_LEAD_DATA(this.getShortLeadInfo.id
              // )
              this.$q.loading.hide();
            })
            .catch((error) => {
              this.$q.loading.hide();
              innerSelf.$q.notify({
                color: "negative",
                position: "bot  tom",
                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                icon: "thumb_down",
              });
            });
        })
        .catch(() => {
          innerSelf.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down",
          });
        });
    },
    fnViewMultiAttachedFileImage(attachedImageIndex) {
      this.$refs.multiAttachedImageViewer[attachedImageIndex].click();
    },
    fnVerificationDocumentUploadSingleUpload(event, documentDetails) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Uploading file ..",
      });
      // return
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      this.merchant.kyc.documents = [];

      let requestParams = {
        files: formData,
        leadId: this.getShortLeadInfo.id,
        documentId: documentDetails.id,
      };
      this.FEED_HAND_OVER_TO_SAT_DOCUMENT(requestParams)
        .then((response) => {
          // this.$emit(
          //   "emitAjaxLoadShortLeadInfo",
          //   "hotReloadForDocumentsUploadValidation",
          //   this.merchantTypeSelection
          // );
          // this.FETCH_SHORT_LEAD_DATA(this.getShortLeadInfo.id);
          // this.ajaxLoadMarsData();
          this.shortLeadInfo();
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Failed to upload document",
            icon: "thumb_down",
          });
        });
    },
    // marsRequiredFormattingofGST(val) {
    //   if (val == "") {
    //     this.merchant.businessInformation.gstId = null;
    //   } else {
    //     this.merchant.businessInformation.gstId = val;
    //   }
    // },
    fnViewAttachedFileImage(attachedImageIndex) {
      this.$refs.attachedImageViewer[attachedImageIndex].click();
    },
    finalMerchant(request) {
      if (this.$v.merchant.businessInformation.$error) {
        this.$q.notify("Please review business information fields again.");
      } else {
        let key = this.merchant.salesInformation.institutionCode;
        this.$q.localStorage.set("a_t", key);
        let requestparams = {
          url: {
            id: this.getAllMarsData.merchantRefCode,
          },

          params: {
            merchant: {
              companyInformation: request.companyinformation,
              businessInformation: request.businessInformation,
              paymentDetails: request.paymentDetails,
              bankInformation: request.bankInformation,
            },
          },
        };
        let terminalparams = {
          terminal: {
            id: this.getAllMarsData.paymentDetails.terminalModeCode,
          },
          terminalparams: {
            merchant: {
              companyInformation: {
                applicationNumber: this.getAllMarsData.salesInformation
                  .applicationNumber,
              },
              paymentDetails: request.paymentDetails,
            },
          },
        };

        //  let terman

        this.CMS_EDIT_TERMINAL(terminalparams)
          .then((response) => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "data",
              icon: "thumb_up",
              message: response.data.message,
            });
          })
          .catch((error) => {
            console.log(error);
            this.$q.notify({
              color: "negative",
              position: "bottom",
              icon: "thumb_down",
              message: error.data.message,
            });
          });
        this.CMS_EDIT_MERCHANT(requestparams)

          .then((response) => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "data",
              icon: "thumb_up",
              message: response.data.message,
            });

            // var self = this;
            // Object.keys(this.formData).forEach(function(key, index) {
            //   self.formData[key] = "";
            // });
          })
          .catch((error) => {
            console.log(error.status);
            if (error.status == 400) {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                icon: "thumb_down",
                message:
                  error.data.errorDetails[1].field +
                  "-" +
                  error.data.errorDetails[1].issue,
              });
            } else {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                icon: "thumb_down",
                message: "Merchant Details" + error.data.message,
              });
            }
            // if (error.data.hasOwnProperty("errorDetails")) {
            //             let OThis = this;
            //             _.map(error.data.errorDetails, actual => {
            //               let splitted = actual.field.split("/");

            //                 // let splittingErrorField = `OThis.$v.${splitted.join(
            //                 //   "."
            //                 // )}`;
            //                 // let fieldErrorFound = eval(splittingErrorField);
            //                 // fieldErrorFound.$model = "";
            //                 // OThis.$set(OThis.error.tab, splitted[1], true);

            //                 let generateErrorMessage = eval(
            //                   `OThis.error.field.${splitted.join(".")}`
            //                 );
            //                 generateErrorMessage.alert = true;
            //                 generateErrorMessage.issue = actual.issue;
            //                 generateErrorMessage.value = actual.value;

            //             });
            //             this.$q.notify({
            //               color: "negative",
            //               position: "bottom",
            //               message: `${error.data.message}`,
            //               icon: "thumb_down"
            //             });
            //           } else {
            //             this.$q.notify({
            //               color: "negative",
            //               position: "bottom",
            //               message: `${error.data.message}`,
            //               icon: "thumb_down"
            //             });
            //           }
            // self.$q.loading.hide();
          });

        // .catch(() => {
        //   // self.$q.loading.hide();
        // });

        console.log(
          "final submit to mars",
          requestparams.params.merchant.salesInformation.institutionCode
        );
      }
    },
    finalFormSubmit(request) {
      let key = this.merchant.salesInformation.institutionCode;
      this.$q.localStorage.set("a_t", key);
      let requestparams = {
        url: {
          id: this.getAllMarsData.merchantRefCode,
          //  code:this.getAllMarsData.salesInformation.institutionCode
        },

        params: {
          merchant: {
            companyInformation: {
              applicationNumber: this.getAllMarsData.salesInformation
                .applicationNumber,
            },
            mdrPlan: request.mdrPlan,
          },
        },
      };

      this.CMS_EDIT_MDR(requestparams)

        .then((response) => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "data",
            icon: "thumb_up",
            message: response.data.message,
          });

          // var self = this;
          // Object.keys(this.formData).forEach(function(key, index) {
          //   self.formData[key] = "";
          // });
        })
        .catch((error) => {
          console.log(error);
          this.$q.notify({
            color: "negative",
            position: "bottom",
            icon: "thumb_down",
            message: error.data.message,
          });
          // var self = this;
          // Object.keys(this.formData).forEach(function(key, index) {
          //   self.formData[key] = "";
          // });
        });
      console.log("final submit to mars", requestparams.url);
    },
    finalFormSubmitKyc(request) {
      
      // if (this.merchant.kyc.remarks == "") {
      //   this.$q.notify("Please review the KYC Remarks fields again.");
      // } else {
        let key = this.merchant.salesInformation.institutionCode;
        this.$q.localStorage.set("a_t", key);
        let merchantrequestparams = {
          url: {
            id: this.getImplementedQueue.mid,
            leadId:this.getImplementedQueue.leadInformation.id
          },

          params: {
            
            merchant: { 
              // leadId:"708",
              // remarks: "",
              partnerInformation:request.partnerInformation,
              additionalInfo:request.additionalInfo,
              customIncentiveRates:request.customIncentiveRates,
              salesInformation:request.salesInformation,
              companyInformation: request.companyinformation,
              businessInformation: request.businessInformation,
              paymentDetails: request.paymentDetails,
              bankInformation: request.bankInformation,
              mdrPlan: request.mdrPlan,
              kyc: request.kyc,
            },
          },
        };
         let a = {
          ...merchantrequestparams.params.merchant.businessInformation,
        };
         merchantrequestparams.params.merchant.businessInformation = { ...a, gstId:this.merchant.businessInformation.gstId};
         

        //  let mdrrequestparams={
        //    url:{
        //      id:this.getImplementedQueue.mid,
        //     //  code:this.getAllMarsData.salesInformation.institutionCode
        //   },

        //  params:{
        //    merchant:{
        //    companyInformation:{
        //    applicationNumber:this.getAllMarsData.salesInformation.applicationNumber
        //    },
        //    mdrPlan:request.mdrPlan,
        //    }

        //   }
        //  }

        // let requestparams={
        //    url:{
        //      id:this.getImplementedQueue.mid,
        //     //  code:this.getAllMarsData.salesInformation.institutionCode
        //   },

        //  params:{
        //    merchant:{
        //      companyInformation:{
        //       applicationNumber: this.getAllMarsData.salesInformation.applicationNumber,
        //        },

        //   kyc :request.kyc,
        //    }

        //   }
        //  }
           
          console.log("................."+this.formdata.sample)
        // let terminalparams = {
        //   terminal: {
        //     id: this.formdata.sample,
        //   },
        //   terminalparams: {
        //     merchant: {
        //       companyInformation: {
        //         applicationNumber: this.getAllMarsData.salesInformation
        //           .applicationNumber,
        //       },
        //       paymentDetails: request.paymentDetails,
        //     },
        //   },
        // };
       
        // this.ajaxLoadMarsData()
        this.CMS_EDIT_MERCHANT(merchantrequestparams)
        .then((response) => {
            this.terinalUpdate()
           this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "data",
              icon: "thumb_up",
              message: "Merchant Details successfully Updated",
            });
           
          })
          .catch((error) => {
            //  this.MARS_DATA_SUBMIT_INTERNAL_CHANGEMANAGEMENT(merchantrequestparams)
            console.log(error.status);

            this.$q.notify({
              color: "negative",
              position: "bottom",
              icon: "thumb_down",
              message: error.data.message,
            });
          });
       
          
        // this.CMS_EDIT_TERMINAL(terminalparams)
        // .then((response) => {
        //   this.$q.notify({
        //     color: "positive",
        //     position: "bottom",
        //     message: "data",
        //     icon: "thumb_up",
        //     message: "Terminal Details Successfully Updated",
        //   });

        // })

        // .catch((error) => {
        //   console.log(error);
        //   this.$q.notify({
        //     color: "negative",
        //     position: "bottom",
        //     icon: "thumb_down",
        //     message: error.data.message,
        //   });
        // });
      
    },
    terinalUpdate(){
       if (
          this.merchant.paymentDetails.rentalPlanCode !=
          this.getAllMarsData.paymentDetails.rentalPlanCode
        ) {
          this.merchant.paymentDetails.remarks = "Rental Plan updated";
        }
        if (
          this.merchant.paymentDetails.settlementType !=
          this.getAllMarsData.paymentDetails.settlementType
        ) {
          this.merchant.paymentDetails.remarks = "Settlement Type updated";
        }
          if (
          this.merchant.paymentDetails.tipEnabled !=
          this.getAllMarsData.paymentDetails.tipEnabled
        ) {
          this.merchant.paymentDetails.remarks = "Tip updated";
        }
                   if (
          this.merchant.paymentDetails.cashAtPosEnabled !=
          this.getAllMarsData.paymentDetails.cashAtPosEnabled
        ) {
          this.merchant.paymentDetails.remarks = "Cash@Pos updated";
        }
        if (
          this.merchant.paymentDetails.preAuth !=
          this.getAllMarsData.paymentDetails.preAuth
        ) {
          this.merchant.paymentDetails.remarks = "PreAuth updated";
        }
          if (
          this.merchant.paymentDetails.intlCardAcceptance !=
          this.getAllMarsData.paymentDetails.intlCardAcceptance
        ) {
          this.merchant.paymentDetails.remarks = "Intlcard Acceptance updated";
        }
                  if (
          this.merchant.paymentDetails.rentalPlanCode !=
          this.getAllMarsData.paymentDetails.rentalPlanCode && this.merchant.paymentDetails.settlementType!=this.getAllMarsData.paymentDetails.settlementType && this.merchant.paymentDetails.tipEnabled!=this.getAllMarsData.paymentDetails.tipEnabled && this.merchant.paymentDetails.cashAtPosEnabled !=this.getAllMarsData.paymentDetails.cashAtPosEnabled && this.merchant.paymentDetails.intlCardAcceptance!=this.getAllMarsData.paymentDetails.intlCardAcceptance && this.merchant.paymentDetails.preAuth!=this.getAllMarsData.paymentDetails.preAuth
        ) {
          this.merchant.paymentDetails.remarks = "Rental plan,settlement Type,cash@pos,Tip,intlecard,PreAuth";
        }
  

        if (
          this.merchant.paymentDetails.settlementType !=
            this.getAllMarsData.paymentDetails.settlementType &&
          this.merchant.paymentDetails.rentalPlanCode !=
            this.getAllMarsData.paymentDetails.rentalPlanCode
        ) {
          this.merchant.paymentDetails.remarks =
            "SettlementType and Rental plan";
        }
                      if (
          this.merchant.paymentDetails.rentalPlanCode !=
          this.getAllMarsData.paymentDetails.rentalPlanCode && this.merchant.paymentDetails.settlementType!=this.getAllMarsData.paymentDetails.settlementType && this.merchant.paymentDetails.tipEnabled!=this.getAllMarsData.paymentDetails.tipEnabled && this.merchant.paymentDetails.cashAtPosEnabled !=this.getAllMarsData.paymentDetails.cashAtPosEnabled && this.merchant.paymentDetails.intlCardAcceptance!=this.getAllMarsData.paymentDetails.intlCardAcceptance && this.merchant.paymentDetails.preAuth!=this.getAllMarsData.paymentDetails.preAuth
        ) {
          this.merchant.paymentDetails.remarks = "Rental plan,settlement Type,cash@pos,Tip,intlecard,PreAuth";
        }
           if (
          this.merchant.paymentDetails.rentalPlanCode !=
          this.getAllMarsData.paymentDetails.rentalPlanCode && this.merchant.paymentDetails.settlementType!=this.getAllMarsData.paymentDetails.settlementType && this.merchant.paymentDetails.cashAtPosEnabled !=this.getAllMarsData.paymentDetails.cashAtPosEnabled && this.merchant.paymentDetails.intlCardAcceptance!=this.getAllMarsData.paymentDetails.intlCardAcceptance && this.merchant.paymentDetails.preAuth!=this.getAllMarsData.paymentDetails.preAuth
        ) {
          this.merchant.paymentDetails.remarks = "Rental plan,cash@pos,Settlement Type,intlecard,PreAuth";
        }
                if (
          this.merchant.paymentDetails.rentalPlanCode !=
          this.getAllMarsData.paymentDetails.rentalPlanCode && this.merchant.paymentDetails.settlementType!=this.getAllMarsData.paymentDetails.settlementType && this.merchant.paymentDetails.tipEnabled !=this.getAllMarsData.paymentDetails.tipEnabled && this.merchant.paymentDetails.intlCardAcceptance!=this.getAllMarsData.paymentDetails.intlCardAcceptance && this.merchant.paymentDetails.preAuth!=this.getAllMarsData.paymentDetails.preAuth
        ) {
          this.merchant.paymentDetails.remarks = "Rental plan,tip,Settlement Type,intlecard,PreAuth";
        }
        
        
        if (
          this.merchant.paymentDetails.rentalPlanCode !=
          this.getAllMarsData.paymentDetails.rentalPlanCode && this.merchant.paymentDetails.tipEnabled!=this.getAllMarsData.paymentDetails.tipEnabled && this.merchant.paymentDetails.cashAtPosEnabled !=this.getAllMarsData.paymentDetails.cashAtPosEnabled && this.merchant.paymentDetails.intlCardAcceptance!=this.getAllMarsData.paymentDetails.intlCardAcceptance && this.merchant.paymentDetails.preAuth!=this.getAllMarsData.paymentDetails.preAuth
        ) {
          this.merchant.paymentDetails.remarks = "Rental plan,cash@pos,Tip,intlecard,PreAuth";
        }
    if (
          this.merchant.paymentDetails.rentalPlanCode !=
          this.getAllMarsData.paymentDetails.rentalPlanCode && this.merchant.paymentDetails.tipEnabled!=this.getAllMarsData.paymentDetails.tipEnabled && this.merchant.paymentDetails.cashAtPosEnabled !=this.getAllMarsData.paymentDetails.cashAtPosEnabled && this.merchant.paymentDetails.intlCardAcceptance!=this.getAllMarsData.paymentDetails.intlCardAcceptance
        ) {
          this.merchant.paymentDetails.remarks = "Rental plan,cash@pos,Tip,intlecard";
        }
     
      let key = this.merchant.salesInformation.institutionCode;
        this.$q.localStorage.set("a_t", key);
for(var i=0;i<this.formdata.tid.length
           ;i++)
          {
            this.formdata.sample =this.formdata.tid[i]
            let terminalparams = {
          terminal: {
            id: this.formdata.sample,
          },
          terminalparams: {
            merchant: {
              companyInformation: {
                
              },
              paymentDetails: this.merchant.paymentDetails,
            },
          },
          
        }
        let a = {
          ...terminalparams.terminalparams.merchant.companyInformation,
        };
         terminalparams.terminalparams.merchant.companyInformation = { ...a, applicationNumber:this.forminfo.applicationNumber};
        this.CMS_EDIT_TERMINAL(terminalparams)
        .then((response) => {
          this.CMS_STATUS_CHANGE(this.getImplementedQueue.leadInformation.id);
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "data",
            icon: "thumb_up",
            message: "Terminal Details Successfully Updated",
          });
 this.$router.push("/sat/change/management");
        })

        .catch((error) => {
          
          console.log(error);
          this.$q.notify({
            color: "negative",
            position: "bottom",
            icon: "thumb_down",
            message: error.data.message,
          });
        })
          }
    },
    fetchAllDropdownValuesFromMARSapi() {
      // let key = this.merchant.salesInformation.institutionCode
      //     let variable = localStorage.getItem("aa_t")
      //     let v = variable.lastIndexOf('|')
      //     let res = variable.substring(v+1)

      // console.log("ram _"+res);
      // this.merchant.salesInformation.institionCode=this.merchant.companyInformation.mcc;
      // this.$q.localStorage.set("aa_t", key);
      //  console.log("Before Set _"+res)
      let self = this;
      /* API call to fetch regions */
      self
        .CITY_FROM_MARS()
        .then(() => {
          self.cityOptions = [];
          self.cityFromMars.items.map((oo) => {
            self.cityOptions.push({ label: oo.name, value: oo.code });
          });
        })
        .then(() => {
          /* API call to fetch rental plan */
          return self.RENTAL_PLAN_FROM_MARS().then((response) => {
            self.rentalPlanSet = [];
            self.rentalPlanFromMars.items.map((oo) => {
              self.rentalPlanSet.push({ label: oo.name, value: oo.code });
            });
            // self.rentalPlanSet = rentalPlan;
          });
        })

        .then(() => {
          /* API call to fetch state */
          return self.STATE_FROM_MARS().then((response) => {
            self.stateOptions = [];
            self.stateFromMars.items.map((oo) => {
              self.stateOptions.push({ label: oo.name, value: oo.code });
            });
            // self.stateOptions = stateArr;
          });
        });
    },
    marsInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      // this.IMPLEMENTED_QUEUE(this.$route.params.id)

      this.FETCH_MARS_DATA(this.getImplementedQueue.leadInformation.id)
        // this.FETCH_SHORT_LEAD_DATA(this.getImplementedQueue.leadInformation.id)
        .then((response) => {
          //  this.FETCH_MARS_DATA(this.getImplementedQueue.leadInformation.id)
          this.shortLeadInfo();
          //  this.FETCH_SHORT_LEAD_DATA(this.getImplementedQueue.leadInformation.id)

          (this.formdata.plan = this.getImplementedQueue.leadInformation.plan.id),
            (this.formdata.planCode = this.getImplementedQueue.leadInformation.plan.planName);
          // this.formdata.setupFees=this.getImplementedQueue.leadInformation.setupFees;
          // this.formdata.recurringFees=this.getImplementedQueue.leadInformation.recurringFees;
          this.formdata.contactName = this.getImplementedQueue.leadInformation.contactName;
          this.formdata.contactNumber = this.getImplementedQueue.leadInformation.contactName;
          this.formdata.alternateContactNumber = this.getImplementedQueue.leadInformation.alternateContactNumber;
          this.formdata.city = this.getImplementedQueue.leadInformation.city;
          this.formdata.device = this.getImplementedQueue.leadInformation.device;
          this.formdata.deviceCount = this.getImplementedQueue.leadInformation.deviceCount;
          this.formdata.leadAddress = this.getImplementedQueue.leadInformation.leadAddress;
          this.formdata.latitude = this.getImplementedQueue.leadInformation.latitude;
          this.formdata.longitude = this.getImplementedQueue.leadInformation.longitude;
          this.formdata.state = this.getImplementedQueue.leadInformation.state;
          // this.formdata.leadCategory=this.getImplementedQueue.leadInformation.leadCategory;
          this.formdata.kyc = this.getImplementedQueue.leadInformation.kyc;
          this.formdata.verifiedBanksubventionStatus = this.getImplementedQueue.leadInformation.verifiedBanksubventionStatus;
          this.formdata.reason = this.getImplementedQueue.leadInformation.reason;
          // this.formdata.amountCollected=this.getImplementedQueue.leadInformation.amountCollected;
          this.formdata.merchantCategory = this.getImplementedQueue.leadInformation.merchantCategory;
          // this.formdata.corpCC=this.getImplementedQueue.leadInformation.corpCC;
          // this.formdata.debitGreaterthanAmount=this.getImplementedQueue.leadInformation.debitGreaterthanAmount;
          // this.formdata.debitLessthanAmount=this.getImplementedQueue.leadInformation.debitGreaterthanAmount;
          // this.formdata.premiumCC=this.getImplementedQueue.leadInformation.premiumCC;

          this.merchant.companyinformation.pan = this.getAllMarsData.companyInformation.pan;
          this.merchant.companyinformation.contactPhone = this.getAllMarsData.companyInformation.contactPhone;
          this.merchant.companyinformation.legalName = this.getAllMarsData.companyInformation.legalName;
          this.merchant.companyinformation.dbaName = this.getAllMarsData.companyInformation.dbaName;
          this.merchant.companyinformation.registeredAddress = this.getAllMarsData.companyInformation.registeredAddress;
          this.merchant.companyinformation.registeredPin = this.getAllMarsData.companyInformation.registeredPin;
          this.merchant.companyinformation.registeredCityRefCode = this.getAllMarsData.companyInformation.registeredCityRefCode;
          this.merchant.companyinformation.registeredCityName = this.getAllMarsData.companyInformation.registeredCityName;
          this.merchant.companyinformation.registeredStateRefCode = this.getAllMarsData.companyInformation.registeredStateRefCode;
          this.merchant.companyinformation.registeredStateName = this.getAllMarsData.companyInformation.registeredStateName;
          this.merchant.companyinformation.contactName = this.getAllMarsData.companyInformation.contactName;
          this.merchant.companyinformation.statementEmail = this.getAllMarsData.companyInformation.statementEmail;
          this.merchant.companyinformation.applicationNumber = this.getAllMarsData.salesInformation.applicationNumber;
          this.forminfo.applicationNumber = this.getAllMarsData.salesInformation.applicationNumber;
          this.merchant.companyinformation.contactEmail = this.getAllMarsData.companyInformation.contactEmail;
          this.merchant.companyinformation.contactMobile = this.getAllMarsData.companyInformation.contactMobile;
          this.merchant.companyinformation.businessNature = this.getAllMarsData.companyInformation.businessNature;
          // this.merchant.additionalInfo=this.getAllMarsData.additionalInfo,
          // this.merchant.customIncentiveRates=this.getAllMarsData.customIncentiveRates,
          
          this.merchant.bankInformation.bankDetails.accountNumber = this.getAllMarsData.bankInformation.bankDetails.accountNumber;
          this.merchant.bankInformation.bankDetails.ifsc = this.getAllMarsData.bankInformation.bankDetails.ifsc;
          this.merchant.bankInformation.bankDetails.bankName = this.getAllMarsData.bankInformation.bankDetails.bankName;
          this.merchant.bankInformation.bankDetails.paymentMode = this.getAllMarsData.bankInformation.bankDetails.paymentMode;
          this.merchant.bankInformation.bankDetails.accountType = this.getAllMarsData.bankInformation.bankDetails.accountType;
          this.merchant.paymentDetails.settlementType = this.getAllMarsData.paymentDetails.settlementType;

          this.merchant.paymentDetails.tipEnabled = this.getAllMarsData.paymentDetails.tipEnabled;
          this.merchant.paymentDetails.cashAtPosEnabled = this.getAllMarsData.paymentDetails.cashAtPosEnabled;
          this.merchant.paymentDetails.intlCardAcceptance = this.getAllMarsData.paymentDetails.intlCardAcceptance;
          this.merchant.paymentDetails.preAuth = this.getAllMarsData.paymentDetails.preAuth;
          this.merchant.paymentDetails.rentalPlanCode = this.getAllMarsData.paymentDetails.rentalPlanCode;
          this.merchant.salesInformation.institutionCode = this.getAllMarsData.salesInformation.institutionCode;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },
    shortLeadInfo() {
      // this.fetchAndCookDocuments();
      this.FETCH_SHORT_LEAD_DATA(this.getImplementedQueue.leadInformation.id);
      this.MidBasedList();
    },
    MidBasedList(){
        this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.MIDBASEDLIST(this.getImplementedQueue.mid)
      .then((response) => {
        this.formdata.mid=this.getMidBasedList.tids
           this.$q.loading.hide();
        })
      .catch(() => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },
    fetchAndCookDocuments() {
      let self = this;
      self.merchant.kyc.documents.push({
        documentName: "Agreement",
        documentType: this.getShortLeadInfo.merchantType.marsAgreementId,
        documentImage: [
          this.GLOBAL_FILE_FETCH_URL +
            "/" +
            this.getShortLeadInfo.applicationFile,
        ],
      });

      Object.keys(this.getShortLeadInfo.leadDocuments).forEach(function (
        key,
        index
      ) {
        _.map(self.getShortLeadInfo.leadDocuments[key], function (oo) {
          if (oo.uploadedDocuments.length > 0) {
            let assumeArr = [];
            _.map(oo.uploadedDocuments, function (doc) {
              assumeArr.push(self.GLOBAL_FILE_FETCH_URL + "/" + doc.fileName);
            });
            self.merchant.kyc.documents.push({
              documentName: oo.subDocumentType,
              documentType: oo.marsDocumentId,
              documentImage: assumeArr,
            });
          }
        });
      });
    },
    populateBankDetails() {
      let self = this;
      let ifscArr = [];
      self
        .IFSC_FROM_MARS(this.merchant.bankInformation.bankDetails.ifsc)
        .then((response) => {
          if (response.status == 200) {
            this.merchant.bankInformation.bankDetails.bankName =
              self.ifscFromMars.bankName;
          } else {
            this.$q.notify({
              color: "negative",
              position: "bottom-left",
              message: "Invalid IFSC code",
              icon: "clear",
            });
            this.merchant.bankInformation.bankDetails.ifsc = "";
            this.merchant.bankInformation.bankDetails.bankName = "";
          }
        });
    },
    /* IFSC bank search result */
    residentStateSearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.stateOptions, terms));
    },
    registeredStateSelected(item) {
      this.merchant.companyinformation.registeredStateName = item.label;
      this.merchant.companyinformation.registeredStateRefCode = item.value;
    },
    residentStateSearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.stateOptions, terms));
    },
    residentCitySearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.cityOptions, terms));
    },
    registeredCitySelected(item) {
      this.merchant.companyinformation.registeredCityName = item.label;
      this.merchant.companyinformation.registeredCityRefCode = item.value;
    },
    COMMON_FILTER_FUNCTION(arraySet, terms) {
      return _.filter(arraySet, function (oo) {
        return (
          oo.label.toLowerCase().includes(terms.toLowerCase()) ||
          oo.value.toString().includes(terms.toString())
        );
      });
    },

    goBackToDocumentVerificationStage() {
      let formData = {
        leadId: this.$route.params.id,
        defaultUrlValue:
          this.getShortLeadInfo.leadStatus ==
          this.$LEAD_STATUS_MARS_REFERRAL_BACK_DATA_ENTRY_PENDING
            ? this.$SAT_LEAD_VALIDATION_PROCEED_TO_DATA_ENTRY_WITH_REFERBACK
            : this.$SAT_LEAD_VALIDATION_APPROVE,
      };

      this.$q
        .dialog({
          title: "Confirm",
          message:
            "Are you sure want to proceed to document verification stage?",
          ok: "Continue",
          cancel: "Cancel",
        })
        .then(() => {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing ..",
          });

          this.MOVE_BACK_DOCUMENT_VERIFICATION_STAGE(formData).then(() => {
            this.$router.push("/sat/lead/validation/" + this.$route.params.id);
            this.$q.loading.hide();
          });
        })
        .catch((error) => {
          this.$q.loading.hide();
        });
    },
    next1(){
            let self = this;
      self.merchant.kyc.documents.push({
        documentName: "Agreement",
        documentType: this.getShortLeadInfo.merchantType.marsAgreementId,
        documentImage: [
          this.GLOBAL_FILE_FETCH_URL +
            "/" +
            this.getShortLeadInfo.applicationFile,
        ],
      });

      Object.keys(this.getShortLeadInfo.leadDocuments).forEach(function (
        key,
        index
      ) {
        _.map(self.getShortLeadInfo.leadDocuments[key], function (oo) {
          if (oo.uploadedDocuments.length > 0) {
            let assumeArr = [];
            _.map(oo.uploadedDocuments, function (doc) {
              assumeArr.push(self.GLOBAL_FILE_FETCH_URL + "/" + doc.fileName);
            });
            self.merchant.kyc.documents.push({
              documentName: oo.subDocumentType,
              documentType: oo.marsDocumentId,
              documentImage: assumeArr,
            });
          }
        });
      });
       this.$refs.stepper.next();
    },
    next() {
      this.$v.merchant.$touch();
      if (this.$v.merchant.$error) {
        this.$q.notify("Please review the KYC information fields again.");
      } else {
        if (
          this.merchant.companyinformation.legalName !=
          this.getAllMarsData.companyInformation.legalName
        ) {
          this.merchant.companyinformation.remarks = "Legal Name";
        }
        if (
          this.merchant.companyinformation.dbaName !=
          this.getAllMarsData.companyInformation.dbaName
        ) {
          this.merchant.companyinformation.remarks = "DBA Name";
        }
        if (
          this.merchant.companyinformation.pan !=
          this.getAllMarsData.companyInformation.pan
        ) {
          this.merchant.companyinformation.remarks = "Pan Number";
        }
        if (
          this.merchant.companyinformation.registeredAddress !=
          this.getAllMarsData.companyInformation.registeredAddress
        ) {
          this.merchant.companyinformation.remarks = "Address";
        }
        if (
          this.merchant.companyinformation.contactMobile !=
          this.getAllMarsData.companyInformation.contactMobile
        ) {
          this.merchant.companyinformation.remarks = "Contact Number";
        }
                if (
          this.merchant.companyinformation.registeredCityRefCode !=
          this.getAllMarsData.companyInformation.registeredCityRefCode
        ) {
          this.merchant.companyinformation.remarks = "City";
        }
          if (
          this.merchant.companyinformation.registeredStateRefCode !=
          this.getAllMarsData.companyInformation.registeredStateRefCode
        ) {
          this.merchant.companyinformation.remarks = "State";
        }
                  if (
          this.merchant.companyinformation.registeredPin !=
          this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks = "pincode";
        }
        if (
          this.merchant.companyinformation.businessNature !=
          this.getAllMarsData.companyInformation.businessNature
        ) {
          this.merchant.companyinformation.remarks = "Business Nature";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName
        ) {
          this.merchant.companyinformation.remarks = "lead name, DBA name";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address,mobile number";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address,mobile number,email";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address,mobile number,email,business nature";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address,mobile number,email,business nature,pan";
        }
              if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address,mobile number,email,business nature,pan,city";
        }
                      if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.statementEmail !=this.getAllMarsData.companyInformation.statementEmail
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address,mobile number,email,business nature,pan,city,state";
        }
          if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin && this.merchant.companyinformation.statementEmail !=this.getAllMarsData.companyInformation.statementEmail
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address,mobile number,email,business nature,pan,city,state,pincode";
        }
                      if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin && this.merchant.companyinformation.statementEmail !=this.getAllMarsData.companyInformation.statementEmail
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address,mobile number,email,business nature,pan,city,pincode";
        }
        if (
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress
        ) {
          this.merchant.companyinformation.remarks = "DBA name,address";
        }
        if (
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile
        ) {
          this.merchant.companyinformation.remarks =
            "DBA name,address,mobile number";
        }
        if (
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail
        ) {
          this.merchant.companyinformation.remarks =
            "DBA name,address,mobile number,email";
        }
        if (
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks =
            "DBA name,address,mobile number,email,business nature,state,city,pincode";
        }
          if (
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode
        ) {
          this.merchant.companyinformation.remarks =
            "DBA name,address,mobile number,email,business nature,city";
        }
          if (
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode
        ) {
          this.merchant.companyinformation.remarks =
            "DBA name,address,mobile number,email,business nature,state,city";
        }
        if (
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin 
        ) {
          this.merchant.companyinformation.remarks =
            "DBA name,address,mobile number,email,business nature,pan,state,city,pincode";
        }
             if (
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode 
        ) {
          this.merchant.companyinformation.remarks =
            "DBA name,address,mobile number,email,business nature,pan,city";
        }
             if (
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode
        ) {
          this.merchant.companyinformation.remarks =
            "DBA name,address,mobile number,email,business nature,pan,state,city";
        }
        if (
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks = "address,mobile number,state,city,pincode";
        }
        if (
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks =
            "address,mobile number,email,state,city,pincode";
        }
        if (
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks =
            "address,mobile number,email,business nature,city,state,pincode";
        }
        if (
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks =
            "address,mobile number,email,business nature,pan,state,city,pincode";
        }
        if (
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail
        ) {
          this.merchant.companyinformation.remarks = "mobile number,email";
        }
        if (
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature
        ) {
          this.merchant.companyinformation.remarks =
            "mobile number,email,business nature";
        }
        if (
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan
        ) {
          this.merchant.companyinformation.remarks =
            "mobile number,email,business nature,pan";
        }
        if (
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature
        ) {
          this.merchant.companyinformation.remarks = "email,business nature";
        }
        if (
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan
        ) {
          this.merchant.companyinformation.remarks =
            "email,business nature,pan";
        }
        if (
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan
        ) {
          this.merchant.companyinformation.remarks = "business nature,pan";
        }

        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address,pan";
        }

        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile
        ) {
          this.merchant.companyinformation.remarks =
            "legalname,dba,mobile number";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan
        ) {
          this.merchant.companyinformation.remarks =
            "legalname,dba,mobile number, pan";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature
        ) {
          this.merchant.companyinformation.remarks =
            "legalname,dba,mobile number,pan,business nature";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail
        ) {
          this.merchant.companyinformation.remarks =
            "legalname,dba,address,statement email";
        }
        if (
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail
        ) {
          this.merchant.companyinformation.remarks =
            "DBA name,address,statement email";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail
        ) {
          this.merchant.companyinformation.remarks =
            "Legal name,address,statement email";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName
        ) {
          this.merchant.companyinformation.remarks =
            "Legal name,DBA name,address,statement email";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan &&
          this.merchant.companyinformation.contactPhone !=
            this.getAllMarsData.companyInformation.contactPhone &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature
        ) {
          this.merchant.companyinformation.remarks =
            "Legal name,DBA name,address,statement email,pan,mobile Number,business nature";
        }

        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan
        ) {
          this.merchant.companyinformation.remarks = "lead name, DBA name,pan";
        }
        //    if(this.merchant.companyinformation.legalName!=this.getAllMarsData.companyInformation.legalName && this.merchant.companyinformation.dbaName!=this.getAllMarsData.companyInformation.dbaName && this.merchant.companyinformation.pan!=this.getAllMarsData.companyInformation.pan) {
        //   this.merchant.companyinformation.remarks="lead name, DBA name,pan"
        // }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address,Mobile No";
        }

        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address,mobile number,businsess nature";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan
        ) {
          this.merchant.companyinformation.remarks =
            "lead name, DBA name,address,mobile number,pan,businsess nature";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks =
            "DBA name,address,mobile number,pan,businsess nature,contactEmail,city,state,pincode";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail
        ) {
          this.merchant.companyinformation.remarks =
            "Legal name,address,mobile number,pan,businsess nature,contactEmail";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks =
            "legal name,DBA name,address,mobile number,pan,businsess nature,contactEmail,city,state,pincode";
        }
        if (
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks =
            "address,mobile number,pan,businsess nature,contactEmail,city,state,pincode";
        }
        if (
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks =
            "mobile number,pan,businsess nature,contactEmail,city,state,pincode";
        }
        if (
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks =
            "pan,businsess nature,contactEmail,city,state,pincode";
        }
        if (
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks =
            "businsess nature,contactEmail,city,state,pincode";
        }
        if (
          this.merchant.companyinformation.legalName !=
            this.getAllMarsData.companyInformation.legalName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail && this.merchant.companyinformation.registeredStateRefCode != this.getAllMarsData.companyInformation.registeredStateRefCode && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode && this.merchant.companyinformation.registeredPin !=this.getAllMarsData.companyInformation.registeredPin
        ) {
          this.merchant.companyinformation.remarks =
            "Lead name,address,mobile number,pan,businsess nature,contactEmail,city,state,pincode";
        }
        if (
          this.merchant.companyinformation.dbaName !=
            this.getAllMarsData.companyInformation.dbaName &&
          this.merchant.companyinformation.registeredAddress !=
            this.getAllMarsData.companyInformation.registeredAddress &&
          this.merchant.companyinformation.contactMobile !=
            this.getAllMarsData.companyInformation.contactMobile &&
          this.merchant.companyinformation.businessNature !=
            this.getAllMarsData.companyInformation.businessNature &&
          this.merchant.companyinformation.pan !=
            this.getAllMarsData.companyInformation.pan &&
          this.merchant.companyinformation.contactEmail !=
            this.getAllMarsData.companyInformation.contactEmail && this.merchant.companyinformation.registeredCityRefCode!=this.getAllMarsData.companyInformation.registeredCityRefCode
        ) {
          this.merchant.companyinformation.remarks =
            "DBA Name,address,mobile number,pan,businsess nature,contactEmail,city";
        }

        if (
          this.merchant.businessInformation.gstId !=
          this.getAllMarsData.businessInformation.gstId
        ) {
          this.merchant.businessInformation.remarks = "Gst Updated";
        }
        if (
          this.merchant.bankInformation.bankDetails.ifsc !=
          this.getAllMarsData.bankInformation.bankDetails.ifsc
        ) {
          this.merchant.bankInformation.remarks = "ifsc updated";
        }
        if (
          this.merchant.bankInformation.bankDetails.bankName !=
          this.getAllMarsData.bankInformation.bankDetails.bankName
        ) {
          this.merchant.bankInformation.remarks = "Bank Name updated";
        }
        if (
          this.merchant.bankInformation.bankDetails.paymentMode !=
          this.getAllMarsData.bankInformation.bankDetails.paymentMode
        ) {
          this.merchant.bankInformation.remarks = "Payment Mode updated";
        }
        if (
          this.merchant.bankInformation.bankDetails.accountType !=
          this.getAllMarsData.bankInformation.bankDetails.accountType
        ) {
          this.merchant.bankInformation.remarks = "AccType Changed";
        }
       
        if (
          this.merchant.bankInformation.bankDetails.accountNumber !=
          this.getAllMarsData.bankInformation.bankDetails.accountNumber
        ) {
          this.merchant.bankInformation.remarks = "Account Number updated";
        }
              if (
          this.merchant.bankInformation.bankDetails.ifsc !=
          this.getAllMarsData.bankInformation.bankDetails.ifsc
        ) {
          this.merchant.bankInformation.remarks = "IFSC Code Updated";
        }
              if (
          this.merchant.bankInformation.bankDetails.bankName !=
          this.getAllMarsData.bankInformation.bankDetails.bankName
        ) {
          this.merchant.bankInformation.remarks = "Bank Name Updated";
        }
              if (
          this.merchant.bankInformation.bankDetails.accountNumber !=
          this.getAllMarsData.bankInformation.bankDetails.accountNumber
        ) {
          this.merchant.bankInformation.remarks = "Account Number updated";
        }
              if (
          this.merchant.bankInformation.bankDetails.accountNumber !=
          this.getAllMarsData.bankInformation.bankDetails.accountNumber
        ) {
          this.merchant.bankInformation.remarks = "Account Number updated";
        }
              if (
          this.merchant.bankInformation.bankDetails.accountNumber !=
          this.getAllMarsData.bankInformation.bankDetails.accountNumber
        ) {
          this.merchant.bankInformation.remarks = "Account Number updated";
        }

        if(this.merchant.bankInformation.bankDetails.ifsc!=this.getAllMarsData.bankInformation.bankDetails.ifsc && this.merchant.bankInformation.bankDetails.bankName!=this.getAllMarsData.bankInformation.bankDetails.bankName){
          this.merchant.bankInformation.remarks="ifsc,BankName"
        }
        if(this.merchant.bankInformation.bankDetails.ifsc!=this.getAllMarsData.bankInformation.bankDetails.ifsc && this.merchant.bankInformation.bankDetails.bankName!=this.getAllMarsData.bankInformation.bankDetails.bankName && this.merchant.bankInformation.bankDetails.accountNumber!=this.getAllMarsData.bankInformation.bankDetails.accountNumber && this.merchant.bankInformation.bankDetails.accountNumber!=this.getAllMarsData.bankInformation.bankDetails.accountNumber){
          this.merchant.bankInformation.remarks="ifsc,BankName,account number"
        }
            if(this.merchant.bankInformation.bankDetails.ifsc!=this.getAllMarsData.bankInformation.bankDetails.ifsc && this.merchant.bankInformation.bankDetails.bankName!=this.getAllMarsData.bankInformation.bankDetails.bankName && this.merchant.bankInformation.bankDetails.accountNumber!=this.getAllMarsData.bankInformation.bankDetails.accountNumber && this.merchant.bankInformation.bankDetails.accountNumber!=this.getAllMarsData.bankInformation.bankDetails.accountNumber && this.merchant.bankInformation.bankDetails.accountType!=this.getAllMarsData.bankInformation.bankDetails.accountType){
          this.merchant.bankInformation.remarks="ifsc,BankName,account number,account Type"
        }
                 if(this.merchant.bankInformation.bankDetails.ifsc!=this.getAllMarsData.bankInformation.bankDetails.ifsc && this.merchant.bankInformation.bankDetails.accountNumber!=this.getAllMarsData.bankInformation.bankDetails.accountNumber && this.merchant.bankInformation.bankDetails.bankName!=this.getAllMarsData.bankInformation.bankDetails.bankName && this.merchant.bankInformation.bankDetails.accountNumber!=this.getAllMarsData.bankInformation.bankDetails.accountNumber && this.merchant.bankInformation.bankDetails.bankName!=this.getAllMarsData.bankInformation.bankDetails.bankName && this.merchant.bankInformation.bankDetails.accountType!=this.getAllMarsData.bankInformation.bankDetails.accountType && this.merchant.bankInformation.bankDetails.paymentMode!=this.getAllMarsData.bankInformation.bankDetails.paymentMode){
          this.merchant.bankInformation.remarks="ifsc,AccNO,AcType,BankName,paymentMode"
        }

        this.$refs.stepper.next();
      }
    },
  },
};
</script>
<style>
.customQuasarSelect {
  padding: 5px;
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