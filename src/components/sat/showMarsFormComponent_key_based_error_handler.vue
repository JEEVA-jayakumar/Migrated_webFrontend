<template>
  <div>
    <!-- Documents -->
    <div id="mainContainer" class="row">
      <!-- Documents proof -->
      <div id="leftSidePane" class="col-md-5 q-pa-xs largeCont" v-if="showDocumentPreview">
        <viewLeadDocumentsDataEntryComponent
          :propLeadDocumentInformation="propLeadDeatils.leadDocuments"
          :propGetShortInfo="propLeadDeatils"
        />
      </div>
      <!-- Document related form -->
      <div id="rightSidePane" class="col-md-7 q-pa-xs block relative">
        <q-stepper color="purple-9" ref="stepper" contractable text alternative-labels>
          <q-step
            error-icon="warning"
            :error="error.tab.salesInformation"
            name="first"
            title="Sales"
            subtitle="Info"
          >
            <div class="row gutter-sm">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  @blur="$v.merchant.salesInformation.institutionCode.$touch"
                  :error="$v.merchant.salesInformation.institutionCode.$error"
                  placeholder="Choose from the below"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.institutionCode"
                  float-label="Institution Code*"
                  :options="institutionCodeOptions"
                  @input="fetchAllDropdownValuesFromMARSapi"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.institutionCode.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.institutionCode"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  @blur="$v.merchant.salesInformation.applicationType.$touch"
                  :error="$v.merchant.salesInformation.applicationType.$error"
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.applicationType"
                  float-label="Application Type*"
                  :options="applicationTypeOptions"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.applicationType.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.applicationType"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.salesInformation.applicationNumber.$touch"
                  :error="$v.merchant.salesInformation.applicationNumber.$error"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.applicationNumber"
                  float-label="Application Number*"
                  placeholder="Application Number*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.applicationNumber.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.applicationNumber"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-datetime
                  @blur="$v.merchant.salesInformation.applicationDate.$touch"
                  :error="$v.merchant.salesInformation.applicationDate.$error"
                  color="grey-9"
                  format="DD/MM/YYYY"
                  format-model="number"
                  modal
                  v-model.trim="merchant.salesInformation.applicationDate"
                  float-label="Application Date*"
                  placeholder="Application Date*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.applicationDate.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.applicationDate"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-datetime
                  format="DD/MM/YYYY"
                  format-model="number"
                  @blur="$v.merchant.salesInformation.aggreementDate.$touch"
                  :error="$v.merchant.salesInformation.aggreementDate.$error"
                  color="grey-9"
                  modal
                  v-model.trim="merchant.salesInformation.aggreementDate"
                  float-label="Agreement Date*"
                  placeholder="Agreement Date*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.aggreementDate.alert"
                >
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.aggreementDate"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  @blur="$v.merchant.salesInformation.merchantType.$touch"
                  :error="$v.merchant.salesInformation.merchantType.$error"
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.merchantType"
                  float-label="Merchant Type*"
                  :options="merchantTypeOptions"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.merchantType.alert"
                >
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.merchantType"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  @blur="$v.merchant.salesInformation.categoryType.$touch"
                  :error="$v.merchant.salesInformation.categoryType.$error"
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.categoryType"
                  float-label="Category Type*"
                  :options="categoryTypeOptions"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.categoryType.alert"
                >
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.categoryType"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  @blur="$v.merchant.salesInformation.salesPersonCode.$touch"
                  :error="$v.merchant.salesInformation.salesPersonCode.$error"
                  v-model.trim="merchant.salesInformation.salesPersonCode"
                  float-label="Sales Person*"
                  :options="salesPersonOptions"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.salesPersonCode.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.salesPersonCode"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  @blur="$v.merchant.salesInformation.region.$touch"
                  :error="$v.merchant.salesInformation.region.$error"
                  v-model.trim="merchant.salesInformation.region"
                  float-label="Region*"
                  :options="regionOptions"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.region.alert"
                >
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.region"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  @blur="$v.merchant.salesInformation.leadFrom.$touch"
                  :error="$v.merchant.salesInformation.leadFrom.$error"
                  v-model.trim="merchant.salesInformation.leadFrom"
                  float-label="Lead From*"
                  :options="leadFromOptions"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.leadFrom.alert"
                >
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.leadFrom"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="q-caption">Sharing Model</p>
                <div v-for="(item,index) in viewBinding.sharingModelCode" :key="index">
                  <q-radio
                    color="grey-9"
                    v-model.trim="merchant.salesInformation.sharingModelCode"
                    :val="item.value"
                    :label="item.label"
                  />
                </div>
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.sharingModelCode.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.sharingModelCode"
                  />
                </div>
              </div>
            </div>
            <!-- T => Transaction value model -->
            <div
              v-if="merchant.salesInformation.sharingModelCode == 'T'"
              class="row gutter-sm q-my-xs"
            >
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  @blur="$v.merchant.salesInformation.sharingPartnerCode.$touch"
                  :error="$v.merchant.salesInformation.sharingPartnerCode.$error"
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.sharingPartnerCode"
                  float-label="Sharing partner*"
                  :options="sharingPartnerOptions"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.sharingPartnerCode.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.sharingPartnerCode"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.salesInformation.dailyFixedAmount.$touch"
                  :error="$v.merchant.salesInformation.dailyFixedAmount.$error"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.dailyFixedAmount"
                  float-label="Daily fixed amount*"
                  type="number"
                  placeholder="Daily fixed amount*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.dailyFixedAmount.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.dailyFixedAmount"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.salesInformation.loanDisbursementPercentage.$touch"
                  :error="$v.merchant.salesInformation.loanDisbursementPercentage.$error"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.loanDisbursementPercentage"
                  float-label="Percentage*"
                  type="number"
                  placeholder="Percentage*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.loanDisbursementPercentage.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.loanDisbursementPercentage"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.salesInformation.loanDisbursementAmount.$touch"
                  :error="$v.merchant.salesInformation.loanDisbursementAmount.$error"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.loanDisbursementAmount"
                  float-label="Loan disbursement value*"
                  type="number"
                  placeholder="Loan disbursement value*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.loanDisbursementAmount.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.loanDisbursementAmount"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-datetime
                  format="DD/MM/YYYY"
                  format-model="number"
                  @blur="$v.merchant.salesInformation.loanDisbursementDate.$touch"
                  :error="$v.merchant.salesInformation.loanDisbursementDate.$error"
                  color="grey-9"
                  modal
                  v-model.trim="merchant.salesInformation.loanDisbursementDate"
                  float-label="Disbursement Date*"
                  placeholder="Disbursement Date*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.loanDisbursementDate.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.loanDisbursementDate"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.salesInformation.tenureMonth.$touch"
                  :error="$v.merchant.salesInformation.tenureMonth.$error"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.tenureMonth"
                  float-label="Tenure (in months)*"
                  type="number"
                  placeholder="Tenure (in months)*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.tenureMonth.alert"
                >
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.tenureMonth"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.salesInformation.tenureDay.$touch"
                  :error="$v.merchant.salesInformation.tenureDay.$error"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.tenureDay"
                  float-label="Tenure (in days)*"
                  type="number"
                  placeholder="Tenure (in days)*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.tenureDay.alert"
                >
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.tenureDay"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-datetime
                  format="DD/MM/YYYY"
                  format-model="number"
                  @blur="$v.merchant.salesInformation.tenureStartDate.$touch"
                  :error="$v.merchant.salesInformation.tenureStartDate.$error"
                  color="grey-9"
                  modal
                  v-model.trim="merchant.salesInformation.tenureStartDate"
                  float-label="Start Date*"
                  placeholder="Tenure Start Date*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.tenureStartDate.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.tenureStartDate"
                  />
                </div>
              </div>
            </div>
            <!-- M => MDR/cash@pos/rent -->
            <div
              v-if="merchant.salesInformation.sharingModelCode == 'M'"
              class="row gutter-sm q-my-xs"
            >
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  @blur="$v.merchant.salesInformation.sharingPartnerCode.$touch"
                  :error="$v.merchant.salesInformation.sharingPartnerCode.$error"
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.sharingPartnerCode"
                  float-label="Sharing partner*"
                  :options="sharingPartnerOptions"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.sharingPartnerCode.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.salesInformation.sharingPartnerCode"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.salesInformation.rentPercentage.$touch"
                  :error="$v.merchant.salesInformation.rentPercentage.$error"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.rentPercentage"
                  float-label="Rent %*"
                  type="number"
                  placeholder="Rent %*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.rentPercentage.alert"
                >
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.rentPercentage"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.salesInformation.rentFixed.$touch"
                  :error="$v.merchant.salesInformation.rentFixed.$error"
                  color="grey-9"
                  v-model.trim="merchant.salesInformation.rentFixed"
                  float-label="Rent fixed*"
                  type="number"
                  placeholder="Rent fixed*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.salesInformation.rentFixed.alert"
                >
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.rentFixed"/>
                </div>
              </div>
            </div>
            <!-- Navigation for this step at the end of QStep-->
            <q-stepper-navigation>
              <q-btn
                color="primary"
                class="q-ma-xs"
                icon="check"
                @click="validatebeforeNavigate('salesInformation')"
                label="Continue"
              />
              <q-btn
                color="amber-10"
                class="q-ma-xs"
                icon="save"
                label="Save Partial"
                @click="saveCurrentChanges()"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step
            error-icon="warning"
            name="second"
            :error="error.tab.companyInformation"
            title="Details"
          >
            <div class="row gutter-sm">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.legalName.$touch"
                  :error="$v.merchant.companyInformation.legalName.$error"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.legalName"
                  float-label="Legal Name*"
                  placeholder="Legal Name*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.companyInformation.legalName.alert"
                >
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.legalName"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.dbaName.$touch"
                  :error="$v.merchant.companyInformation.dbaName.$error"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.dbaName"
                  float-label="DBA Name*"
                  placeholder="DBA Name*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.companyInformation.dbaName.alert"
                >
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.dbaName"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  float-label="Registered Address* (max 120 characters)"
                  placeholder="Registered Address*"
                  v-model.trim="merchant.companyInformation.registeredAddress"
                  @blur="$v.merchant.companyInformation.registeredAddress.$touch"
                  :error="$v.merchant.companyInformation.registeredAddress.$error"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.companyInformation.registeredAddress.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.companyInformation.registeredAddress"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.registeredCityRefCode.$touch"
                  :error="autoCompleteError($v.merchant.companyInformation.registeredCityRefCode,$v.merchant.companyInformation.registeredCityName)"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.registeredCityName"
                  float-label="Registered city (type min 3 characters)*"
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
                <div
                  class="text-negative"
                  v-if="error.field.merchant.companyInformation.registeredCityRefCode.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.companyInformation.registeredCityRefCode"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.registeredStateRefCode.$touch"
                  :error="autoCompleteError($v.merchant.companyInformation.registeredStateRefCode,$v.merchant.companyInformation.registeredStateName)"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.registeredStateName"
                  float-label="Registered state (type min 3 characters)*"
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
                <div
                  class="text-negative"
                  v-if="error.field.merchant.companyInformation.registeredStateRefCode.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.companyInformation.registeredStateRefCode"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.registeredPin.$touch"
                  :error="$v.merchant.companyInformation.registeredPin.$error"
                  color="grey-9"
                  type="number"
                  v-model.trim="merchant.companyInformation.registeredPin"
                  float-label="PIN*"
                  placeholder="PIN*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.companyInformation.registeredPin.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.companyInformation.registeredPin"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  disable
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.constitutionName"
                  float-label="Type of Business Entity"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.companyInformation.constitutionName.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.companyInformation.constitutionName"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-datetime
                  format="DD/MM/YYYY"
                  format-model="number"
                  color="grey-9"
                  modal
                  @blur="$v.merchant.companyInformation.establishYear.$touch"
                  :error="$v.merchant.companyInformation.establishYear.$error"
                  v-model.trim="merchant.companyInformation.establishYear"
                  float-label="Year of Establishment*"
                  placeholder="Year of Establishment*"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.companyInformation.establishYear.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.companyInformation.establishYear"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.companyInformation.registerNumber.$touch"
                  :error="$v.merchant.companyInformation.registerNumber.$error"
                  v-model.trim="merchant.companyInformation.registerNumber"
                  float-label="Establish Number"
                  placeholder="Establish Number"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.companyInformation.registerNumber.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.companyInformation.registerNumber"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.tin.$touch"
                  :error="$v.merchant.companyInformation.tin.$error"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.tin"
                  float-label="TIN"
                  placeholder="TIN"
                />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.tin.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.tin"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  upper-case
                  @blur="$v.merchant.companyInformation.pan.$touch"
                  :error="$v.merchant.companyInformation.pan.$error"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.pan"
                  float-label="Company PAN*"
                  placeholder="Company PAN*"
                />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.pan.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.pan"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  upper-case
                  @blur="$v.merchant.companyInformation.tan.$touch"
                  :error="$v.merchant.companyInformation.tan.$error"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.tan"
                  float-label="TAN"
                  placeholder="TAN"
                />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.tan.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.tan"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.businessNature"
                  float-label="Nature of Business"
                  placeholder="Nature of Business"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.companyInformation.businessNature.alert"
                >
                  <MarsErrorResponse
                    :error="error.field.merchant.companyInformation.businessNature"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.businessType"
                  float-label="Type of Business"
                  :options="businessTypeOptions"
                />
                <div
                  class="text-negative"
                  v-if="error.field.merchant.companyInformation.businessType.alert"
                >
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.businessType"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.mcc.$touch"
                  :error="autoCompleteError($v.merchant.companyInformation.mcc,$v.merchant.companyInformation.mccname)"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.mccname"
                  float-label="MCC (type min 3 characters)"
                  placeholder="Start typing ..*"
                >
                  <q-autocomplete
                    separator
                    @search="mccSearch"
                    :debounce="10"
                    :min-characters="3"
                    @selected="mccSelected"
                  />
                </q-input>
                <div class="text-negative" v-if="error.field.merchant.companyInformation.mcc.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.mcc"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.residentialAddress.$touch"
                  :error="$v.merchant.companyInformation.residentialAddress.$error"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.residentialAddress"
                  float-label="Residential Address* (max 120 characters)"
                  placeholder="Residential Address*"
                />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.residentialAddress.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.residentialAddress"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.residentialPin.$touch"
                  :error="$v.merchant.companyInformation.residentialPin.$error"
                  color="grey-9"
                  type="number"
                  v-model.trim="merchant.companyInformation.residentialPin"
                  float-label="PIN*"
                  placeholder="PIN*"
                />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.residentialPin.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.residentialPin"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.residentialCityRefCode.$touch"
                  :error="autoCompleteError($v.merchant.companyInformation.residentialCityRefCode,$v.merchant.companyInformation.residentCityName)"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.residentCityName"
                  float-label="City (type min 3 characters)*"
                  placeholder="Start typing ..*"
                >
                  <q-autocomplete
                    separator
                    @search="residentCitySearch"
                    :debounce="10"
                    :min-characters="3"
                    @selected="residentCitySelected"
                  />
                </q-input>
                <div class="text-negative" v-if="error.field.merchant.companyInformation.residentialCityRefCode.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.residentialCityRefCode"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.residentialStateRefCode.$touch"
                  :error="autoCompleteError($v.merchant.companyInformation.residentialStateRefCode,$v.merchant.companyInformation.residentStateName)"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.residentStateName"
                  float-label="State (type min 3 characters)*"
                  placeholder="Start typing ..*"
                >
                  <q-autocomplete
                    separator
                    @search="residentStateSearch"
                    :debounce="10"
                    :min-characters="1"
                    @selected="residentStateSelected"
                  />
                </q-input>
                <div class="text-negative" v-if="error.field.merchant.companyInformation.residentialStateRefCode.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.residentialStateRefCode"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.contactName.$touch"
                  :error="$v.merchant.companyInformation.contactName.$error"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.contactName"
                  float-label="Contact Name*"
                  placeholder="Contact Name*"
                />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.contactName.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.contactName"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.contactMobile.$touch"
                  :error="$v.merchant.companyInformation.contactMobile.$error"
                  color="grey-9"
                  v-model.trim="merchant.companyInformation.contactMobile"
                  float-label="Contact mobile*"
                  placeholder="Contact Mobile*"
                />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.contactMobile.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.contactMobile"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  type="tel"
                  @blur="$v.merchant.companyInformation.contactAlternateMobile.$touch"
                  :error="$v.merchant.companyInformation.contactAlternateMobile.$error"
                  v-model.trim="merchant.companyInformation.contactAlternateMobile"
                  float-label="Contact Alt Mobile"
                  placeholder="Contact Alt Mobile"
                />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.contactAlternateMobile.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.contactAlternateMobile"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  type="tel"
                  @blur="$v.merchant.companyInformation.contactPhone.$touch"
                  :error="$v.merchant.companyInformation.contactPhone.$error"
                  v-model.trim="merchant.companyInformation.contactPhone"
                  float-label="Contact Phone* (12 digits)"
                  placeholder="Contact Phone* (12 digits)"
                />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.contactPhone.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.contactPhone"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.merchant.companyInformation.contactEmail.$touch"
                  :error="$v.merchant.companyInformation.contactEmail.$error"
                  color="grey-9"
                  type="email"
                  v-model.trim="merchant.companyInformation.contactEmail"
                  float-label="Contact Email*"
                  placeholder="Contact Email*"
                />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.contactEmail.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.contactEmail"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="q-caption">Statement type</div>
                <div class="group">
                  <q-radio
                    @blur="$v.merchant.companyInformation.statementType.$touch"
                    :error="$v.merchant.companyInformation.statementType.$error"
                    v-for="(item,index) in viewBinding.statementType"
                    :key="index"
                    color="grey-9"
                    v-model.trim="merchant.companyInformation.statementType"
                    :val="item.value"
                    :label="item.label"
                  />
                </div>
                <div class="text-negative" v-if="error.field.merchant.companyInformation.statementType.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.statementType"/>
                </div>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <p class="q-caption">Statement frequency</p>
                <div class="group">
                  <q-radio
                    @blur="$v.merchant.companyInformation.statementFrequency.$touch"
                    :error="$v.merchant.companyInformation.statementFrequency.$error"
                    v-for="(item,index) in viewBinding.statementFrequency"
                    :key="index"
                    color="grey-9"
                    v-model.trim="merchant.companyInformation.statementFrequency"
                    :val="item.value"
                    :label="item.label"
                  />
                </div>
                <div class="text-negative" v-if="error.field.merchant.companyInformation.statementFrequency.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.statementFrequency"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  float-label="Statement Email"
                  placeholder="Statement Email"
                  @blur="$v.merchant.companyInformation.statementEmail.$touch"
                  :error="$v.merchant.companyInformation.statementEmail.$error"
                  v-model.trim="merchant.companyInformation.statementEmail"
                />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.statementEmail.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.statementEmail"/>
                </div>
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn
                color="primary"
                class="q-ma-xs"
                icon="check"
                @click="validatebeforeNavigate('companyInformation')"
                label="Continue"
              />
              <q-btn
                color="amber-10"
                class="q-ma-xs"
                icon="save"
                label="Save Partial"
                @click="saveCurrentChanges()"
              />
              <q-btn
                color="grey-7"
                class="q-ma-xs"
                icon="block"
                @click="$refs.stepper.previous()"
                label="Back"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step
            error-icon="warning"
            :icon="showPartnerstab?'':'block'"
            name="third"
            :error="error.tab.partnerInformation"
            title="Partners"
            :disable="!showPartnerstab"
          >
            <div
              v-for="(v,index) in $v.viewBinding.partnersArr.$each.$iter"
              :key="index"
              class="row q-my-xs gutter-sm"
              ref="parentElement"
            >
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="row group items-center">
                  <div class="col">
                    <span class="q-pa-sm bg-light text-dark">
                      <q-icon name="people"/>
                      Partner 0{{parseInt(index)+1}}
                    </span>
                  </div>
                  <div
                    class="col-auto"
                    v-if="Object.keys($v.viewBinding.partnersArr.$each.$iter).length > 1"
                  >
                    <q-btn
                      round
                      icon="delete"
                      @click="removePartnerFromArr(v,index)"
                      color="negative"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  :error="v.name.$anyError"
                  @blur="() => v.name.$anyError"
                  color="grey-9"
                  v-model.trim="v.$model.name"
                  float-label="Name*"
                  placeholder="Name*"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  upper-case
                  :error="v.pan.$anyError"
                  @blur="() => v.pan.$anyError"
                  color="grey-9"
                  v-model.trim="v.$model.pan"
                  float-label="Pan*"
                  placeholder="Pan*"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  :error="v.address.$anyError"
                  @blur="() => v.address.$anyError"
                  color="grey-9"
                  v-model.trim="v.$model.address"
                  float-label="Address* (max 120 characters)"
                  placeholder="Address*"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  :error="v.pin.$anyError"
                  @blur="() => v.pin.$anyError"
                  color="grey-9"
                  type="number"
                  v-model.trim="v.$model.pin"
                  float-label="Pincode*"
                  placeholder="Pincode*"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  :error="autoCompleteError(v.cityRefLabel,v.cityRefCode)"
                  @blur="v.cityRefLabel.$touch()"
                  color="grey-9"
                  v-model.trim="v.$model.cityRefLabel"
                  float-label="City (type min 3 characters)*"
                  placeholder="Start typing ..*"
                >
                  <q-autocomplete
                    separator
                    @search="partnerCitySearch"
                    :debounce="10"
                    :min-characters="3"
                    @selected="obj => partnerCitySelected(obj,index)"
                  />
                </q-input>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  :error="autoCompleteError(v.stateRefLabel,v.stateRefCode)"
                  @blur="v.stateRefLabel.$touch()"
                  color="grey-9"
                  v-model.trim="v.$model.stateRefLabel"
                  float-label="State (type min 3 characters)*"
                  placeholder="Start typing ..*"
                >
                  <q-autocomplete
                    separator
                    @search="partnerStateSearch"
                    :debounce="10"
                    :min-characters="1"
                    @selected="obj => partnerStateSelected(obj,index)"
                  />
                </q-input>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  :error="v.contactMobile.$anyError"
                  @blur="() => v.contactMobile.$anyError"
                  color="grey-9"
                  type="tel"
                  v-model.trim="v.$model.contactMobile"
                  float-label="Mobile*"
                  placeholder="Mobile*"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  :error="v.contactEmail.$anyError"
                  @blur="() => v.contactEmail.$anyError"
                  color="grey-9"
                  type="email"
                  v-model.trim="v.$model.contactEmail"
                  float-label="Email*"
                  placeholder="Email*"
                />
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn
                color="primary"
                class="q-ma-xs"
                icon="check"
                @click="validatebeforeNavigate('partners')"
                label="Continue"
              />
              <q-btn
                color="amber-10"
                class="q-ma-xs"
                icon="save"
                label="Save Partial"
                @click="saveCurrentChanges()"
              />
              <q-btn
                color="grey-7"
                class="q-ma-xs"
                icon="block"
                @click="$refs.stepper.previous()"
                label="Back"
              />
              <q-btn
                color="positive float-right"
                @click="addMorePartnersSet()"
                class="q-ma-xs"
                icon="add"
                label="Add More"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step
            error-icon="warning"
            name="fourth"
            :error="error.tab.businessInformation"
            title="Business"
            subtitle="Info"
          >
            <div class="row gutter-sm">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.businessInformation.weekdayStartHour.$touch"
                  :error="$v.merchant.businessInformation.weekdayStartHour.$error"
                  v-model.trim="merchant.businessInformation.weekdayStartHour"
                  float-label="Weekday start hour (00.00)"
                  placeholder="Weekday start hour"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.businessInformation.weekdayEndHour.$touch"
                  :error="$v.merchant.businessInformation.weekdayEndHour.$error"
                  v-model.trim="merchant.businessInformation.weekdayEndHour"
                  float-label="Weekday end hour (00.00)"
                  placeholder="Weekday end hour"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.businessInformation.weekendStartHour.$touch"
                  :error="$v.merchant.businessInformation.weekendStartHour.$error"
                  v-model.trim="merchant.businessInformation.weekendStartHour"
                  float-label="Weekend start hour (00.00)"
                  placeholder="Weekend start hour"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.businessInformation.weekendEndHour.$touch"
                  :error="$v.merchant.businessInformation.weekendEndHour.$error"
                  v-model.trim="merchant.businessInformation.weekendEndHour"
                  float-label="Weekend end hour (00.00)"
                  placeholder="Weekend end hour"
                />
              </div>
              <!-- <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" type="number" v-model.trim="merchant.businessInformation.weekdayStartHour" float-label="Business Income" placeholder="Business Income" />
              </div>-->
              <div class="col-md-6 col-sm-12 col-xs-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.businessInformation.lastTurnoverYear.$touch"
                  :error="$v.merchant.businessInformation.lastTurnoverYear.$error"
                  v-model.trim="merchant.businessInformation.lastTurnoverYear"
                  float-label="Last turnover year"
                  placeholder="Last turnover year"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.businessInformation.lastTurnoverAmount.$touch"
                  :error="$v.merchant.businessInformation.lastTurnoverAmount.$error"
                  v-model.trim="merchant.businessInformation.lastTurnoverAmount"
                  float-label="Turnover during last year"
                  placeholder="Turnover during last year"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.businessInformation.expectedCardBusiness.$touch"
                  :error="$v.merchant.businessInformation.expectedCardBusiness.$error"
                  v-model.trim="merchant.businessInformation.expectedCardBusiness"
                  float-label="Expected Card Business"
                  placeholder="Expected Card Business"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.businessInformation.averageBillAmount.$touch"
                  :error="$v.merchant.businessInformation.averageBillAmount.$error"
                  v-model.trim="merchant.businessInformation.averageBillAmount"
                  float-label="Average Bill Amount"
                  placeholder="Average Bill Amount"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  upper-case
                  color="grey-9"
                  @blur="$v.merchant.businessInformation.gstId.$touch"
                  :error="$v.merchant.businessInformation.gstId.$error"
                  v-model.trim="merchant.businessInformation.gstId"
                  @change="marsRequiredFormattingofGST"
                  float-label="GST ID"
                  placeholder="GST ID"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  v-model.trim="merchant.businessInformation.currentPosName"
                  float-label="Name of the other POS Currentlly Used"
                  placeholder="Name of the other POS Currentlly Used"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.businessInformation.debitCardMdr.$touch"
                  :error="$v.merchant.businessInformation.debitCardMdr.$error"
                  v-model.trim="merchant.businessInformation.debitCardMdr"
                  float-label="Debit Card MDR"
                  placeholder="Debit Card MDR"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.businessInformation.creditCardMdr.$touch"
                  :error="$v.merchant.businessInformation.creditCardMdr.$error"
                  v-model.trim="merchant.businessInformation.creditCardMdr"
                  float-label="Credit Card MDR"
                  placeholder="Credit Card MDR"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-datetime
                  format="DD/MM/YYYY"
                  format-model="number"
                  @blur="$v.merchant.businessInformation.memberSince.$touch"
                  :error="$v.merchant.businessInformation.memberSince.$error"
                  color="grey-9"
                  modal
                  v-model.trim="merchant.businessInformation.memberSince"
                  float-label="Member since"
                  placeholder="Member since"
                />
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn
                color="primary"
                class="q-ma-xs"
                icon="check"
                @click="validatebeforeNavigate('businessInformation')"
                label="Continue"
              />
              <q-btn
                color="amber-10"
                class="q-ma-xs"
                icon="save"
                label="Save Partial"
                @click="saveCurrentChanges()"
              />
              <q-btn
                color="grey-7"
                class="q-ma-xs"
                icon="block"
                @click="$refs.stepper.previous()"
                label="Back"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step
            error-icon="warning"
            name="fifth"
            :error="error.tab.paymentDetails"
            title="Payment"
            subtitle="Details"
          >
            <div class="row gutter-sm">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="q-caption">Device Owned By</p>
                <div class="group">
                  <q-radio
                    @blur="$v.merchant.paymentDetails.deviceOwnedBy.$touch"
                    :error="$v.merchant.paymentDetails.deviceOwnedBy.$error"
                    v-for="(item,index) in deviceOwnedByOptions"
                    :key="index"
                    color="grey-9"
                    v-model.trim="merchant.paymentDetails.deviceOwnedBy"
                    :val="item.value"
                    :label="item.label"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.paymentDetails.installationFee.$touch"
                  :error="$v.merchant.paymentDetails.installationFee.$error"
                  v-model.trim="merchant.paymentDetails.installationFee"
                  float-label="Installation Fee*"
                  placeholder="Installation Fee*"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Choose from the below"
                  color="grey-9"
                  @blur="$v.merchant.paymentDetails.terminalModeCode.$touch"
                  :error="$v.merchant.paymentDetails.terminalModeCode.$error"
                  v-model.trim="merchant.paymentDetails.terminalModeCode"
                  float-label="Terminal Model*"
                  :options="terminalModelSet"
                />
              </div>
              <div class="col-md-6 col-sm-12">
                <q-input
                  color="grey-9"
                  type="number"
                  disable
                  @blur="$v.merchant.paymentDetails.numberOfTerminals.$touch"
                  :error="$v.merchant.paymentDetails.numberOfTerminals.$error"
                  v-model.trim="merchant.paymentDetails.numberOfTerminals"
                  float-label="No of Terminals*"
                  placeholder="No of Terminals*"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="q-caption">Cash @POS Enabled?</p>
                <div class="group">
                  <q-radio
                    disable
                    @blur="$v.merchant.paymentDetails.cashAtPosEnabled.$touch"
                    :error="$v.merchant.paymentDetails.cashAtPosEnabled.$error"
                    v-for="(item,index) in cashAtPosEnabledOptions"
                    :key="index"
                    color="grey-9"
                    v-model.trim="merchant.paymentDetails.cashAtPosEnabled"
                    :val="item.value"
                    :label="item.label"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="merchant.paymentDetails.rentalPlanCode"
                  float-label="Rental Plan*"
                  :options="rentalPlanSet"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="merchant.paymentDetails.rentalMode"
                  float-label="Rental Mode*"
                  :options="rentalModeOptions"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  @blur="$v.merchant.paymentDetails.serviceProvider.$touch"
                  :error="$v.merchant.paymentDetails.serviceProvider.$error"
                  v-model.trim="merchant.paymentDetails.serviceProvider"
                  float-label="Service provider*"
                  :options="serviceProviderListSet"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  @blur="$v.merchant.paymentDetails.networkPreferred.$touch"
                  :error="$v.merchant.paymentDetails.networkPreferred.$error"
                  v-model.trim="merchant.paymentDetails.networkPreferred"
                  float-label="Network provider*"
                  :options="networkProviderListSet"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="q-caption">Rental Type</p>
                <div class="group">
                  <q-radio
                    @blur="$v.merchant.paymentDetails.rentalType.$touch"
                    :error="$v.merchant.paymentDetails.rentalType.$error"
                    v-for="(item,index) in rentalTypeOptions"
                    :key="index"
                    color="grey-9"
                    v-model="merchant.paymentDetails.rentalType"
                    :val="item.value"
                    :label="item.label"
                    @input="selectCurrentType()"
                  />
                </div>
              </div>
              <div
                v-if="merchant.paymentDetails.rentalType == 'R'"
                class="col-md-6 col-sm-12 col-xs-12"
              >
                <q-input
                  @blur="$v.merchant.paymentDetails.gracePeriod.$touch"
                  :error="$v.merchant.paymentDetails.gracePeriod.$error"
                  color="grey-9"
                  type="number"
                  v-model.trim="merchant.paymentDetails.gracePeriod"
                  float-label="Grace period*"
                  placeholder="Grace period*"
                />
              </div>
              <div
                v-if="merchant.paymentDetails.rentalType == 'A'"
                class="col-md-6 col-sm-12 col-xs-12"
              >
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.paymentDetails.advanceRentCollected.$touch"
                  :error="$v.merchant.paymentDetails.advanceRentCollected.$error"
                  v-model.trim="merchant.paymentDetails.advanceRentCollected"
                  float-label="Advance Rent Collected*"
                  placeholder="Advance Rent Collected*"
                />
              </div>
              <div
                v-if="merchant.paymentDetails.rentalType == 'A'"
                class="col-md-6 col-sm-12 col-xs-12"
              >
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.paymentDetails.noOfMonthRentPaidInAdvance.$touch"
                  :error="$v.merchant.paymentDetails.noOfMonthRentPaidInAdvance.$error"
                  v-model.trim="merchant.paymentDetails.noOfMonthRentPaidInAdvance"
                  float-label="No. Of Month Rent Paid In Advance*"
                  placeholder="No. Of Month Rent Paid In Advance*"
                />
              </div>
              <div
                v-if="merchant.paymentDetails.rentalType == 'A'"
                class="col-md-6 col-sm-12 col-xs-12"
              >
                <p class="q-caption">Advanced Rent Mode</p>
                <div class="group">
                  <q-radio
                    @blur="$v.merchant.paymentDetails.advanceRentMode.$touch"
                    :error="$v.merchant.paymentDetails.advanceRentMode.$error"
                    v-for="(item,index) in advanceRentModeOptions"
                    :key="index"
                    color="grey-9"
                    v-model.trim="merchant.paymentDetails.advanceRentMode"
                    :val="item.value"
                    :label="item.label"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.paymentDetails.devicePrice.$touch"
                  :error="$v.merchant.paymentDetails.devicePrice.$error"
                  v-model.trim="merchant.paymentDetails.devicePrice"
                  float-label="Device Price"
                  placeholder="Device Price"
                />
              </div>
              <div class="col-md-6 col-sm-12">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.paymentDetails.otherCharges.$touch"
                  :error="$v.merchant.paymentDetails.otherCharges.$error"
                  v-model.trim="merchant.paymentDetails.otherCharges"
                  float-label="Other Charges"
                  placeholder="Other Charges"
                />
              </div>
              <div class="col-md-6 col-sm-12">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.paymentDetails.totalAmountPaid.$touch"
                  :error="$v.merchant.paymentDetails.totalAmountPaid.$error"
                  v-model.trim="merchant.paymentDetails.totalAmountPaid"
                  float-label="Total Amount Paid"
                  placeholder="Total Amount Paid"
                />
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn
                color="primary"
                class="q-ma-xs"
                icon="check"
                @click="validatebeforeNavigate('paymentDetails')"
                label="Continue"
              />
              <q-btn
                color="amber-10"
                class="q-ma-xs"
                icon="save"
                label="Save Partial"
                @click="saveCurrentChanges()"
              />
              <q-btn
                color="grey-7"
                class="q-ma-xs"
                icon="block"
                @click="$refs.stepper.previous()"
                label="Back"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step
            error-icon="warning"
            :error="error.tab.mdrPlan || error.SharingDiscountFee"
            name="sixth"
            title="Discount"
            subtitle="Rate"
          >
            <div class="row group items-center">
              <div class="col-md-12">
                <div class="row items-center">
                  <div class="col-3">
                    <div class="q-caption text-weight-medium">Domestic Debit Card below 2000</div>
                  </div>
                  <div class="col">
                    <div
                      class="q-caption text-weight-medium q-py-sm"
                      align="center"
                    >Merchant Disc Fee</div>
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.domesticDebitUpTo2000.fixed.$touch"
                          :error="$v.merchant.mdrPlan.domesticDebitUpTo2000.fixed.$error"
                          v-model.trim="merchant.mdrPlan.domesticDebitUpTo2000.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.domesticDebitUpTo2000.percentage.$touch"
                          :error="$v.merchant.mdrPlan.domesticDebitUpTo2000.percentage.$error"
                          v-model.trim="merchant.mdrPlan.domesticDebitUpTo2000.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.domesticDebitUpTo2000.minimum.$touch"
                          :error="$v.merchant.mdrPlan.domesticDebitUpTo2000.minimum.$error"
                          v-model.trim="merchant.mdrPlan.domesticDebitUpTo2000.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div
                      class="q-caption text-weight-medium q-py-sm"
                      align="center"
                    >Sharing Disc Fee</div>
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.domesticDebitUpTo2000.fixed.$touch"
                          :error="$v.merchant.SharingDiscountFee.domesticDebitUpTo2000.fixed.$error"
                          v-model.trim="merchant.SharingDiscountFee.domesticDebitUpTo2000.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.domesticDebitUpTo2000.percentage.$touch"
                          :error="$v.merchant.SharingDiscountFee.domesticDebitUpTo2000.percentage.$error"
                          v-model.trim="merchant.SharingDiscountFee.domesticDebitUpTo2000.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.domesticDebitUpTo2000.minimum.$touch"
                          :error="$v.merchant.SharingDiscountFee.domesticDebitUpTo2000.minimum.$error"
                          v-model.trim="merchant.SharingDiscountFee.domesticDebitUpTo2000.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="q-caption text-weight-medium">Domestic Debit Card above 2000</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.domesticDebitAbove2000.fixed.$touch"
                          :error="$v.merchant.mdrPlan.domesticDebitAbove2000.fixed.$error"
                          v-model.trim="merchant.mdrPlan.domesticDebitAbove2000.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.domesticDebitAbove2000.percentage.$touch"
                          :error="$v.merchant.mdrPlan.domesticDebitAbove2000.percentage.$error"
                          v-model.trim="merchant.mdrPlan.domesticDebitAbove2000.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.domesticDebitAbove2000.minimum.$touch"
                          :error="$v.merchant.mdrPlan.domesticDebitAbove2000.minimum.$error"
                          v-model.trim="merchant.mdrPlan.domesticDebitAbove2000.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.domesticDebitAbove2000.fixed.$touch"
                          :error="$v.merchant.SharingDiscountFee.domesticDebitAbove2000.fixed.$error"
                          v-model.trim="merchant.SharingDiscountFee.domesticDebitAbove2000.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.domesticDebitAbove2000.percentage.$touch"
                          :error="$v.merchant.SharingDiscountFee.domesticDebitAbove2000.percentage.$error"
                          v-model.trim="merchant.SharingDiscountFee.domesticDebitAbove2000.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.domesticDebitAbove2000.minimum.$touch"
                          :error="$v.merchant.SharingDiscountFee.domesticDebitAbove2000.minimum.$error"
                          v-model.trim="merchant.SharingDiscountFee.domesticDebitAbove2000.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row items-center">
                  <div class="col-3">
                    <div class="q-caption text-weight-medium">Standard/Classic (1st Stab)</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.standardOrClassic.fixed.$touch"
                          :error="$v.merchant.mdrPlan.standardOrClassic.fixed.$error"
                          v-model.trim="merchant.mdrPlan.standardOrClassic.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.standardOrClassic.percentage.$touch"
                          :error="$v.merchant.mdrPlan.standardOrClassic.percentage.$error"
                          v-model.trim="merchant.mdrPlan.standardOrClassic.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.standardOrClassic.minimum.$touch"
                          :error="$v.merchant.mdrPlan.standardOrClassic.minimum.$error"
                          v-model.trim="merchant.mdrPlan.standardOrClassic.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.standardOrClassic.fixed.$touch"
                          :error="$v.merchant.SharingDiscountFee.standardOrClassic.fixed.$error"
                          v-model.trim="merchant.SharingDiscountFee.standardOrClassic.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.standardOrClassic.percentage.$touch"
                          :error="$v.merchant.SharingDiscountFee.standardOrClassic.percentage.$error"
                          v-model.trim="merchant.SharingDiscountFee.standardOrClassic.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.standardOrClassic.minimum.$touch"
                          :error="$v.merchant.SharingDiscountFee.standardOrClassic.minimum.$error"
                          v-model.trim="merchant.SharingDiscountFee.standardOrClassic.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="q-caption text-weight-medium">Premium/Platinum (2nd Stab)</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.premiumOrPlatinum.fixed.$touch"
                          :error="$v.merchant.mdrPlan.premiumOrPlatinum.fixed.$error"
                          v-model.trim="merchant.mdrPlan.premiumOrPlatinum.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.premiumOrPlatinum.percentage.$touch"
                          :error="$v.merchant.mdrPlan.premiumOrPlatinum.percentage.$error"
                          v-model.trim="merchant.mdrPlan.premiumOrPlatinum.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.premiumOrPlatinum.minimum.$touch"
                          :error="$v.merchant.mdrPlan.premiumOrPlatinum.minimum.$error"
                          v-model.trim="merchant.mdrPlan.premiumOrPlatinum.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.premiumOrPlatinum.fixed.$touch"
                          :error="$v.merchant.SharingDiscountFee.premiumOrPlatinum.fixed.$error"
                          v-model.trim="merchant.SharingDiscountFee.premiumOrPlatinum.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.premiumOrPlatinum.percentage.$touch"
                          :error="$v.merchant.SharingDiscountFee.premiumOrPlatinum.percentage.$error"
                          v-model.trim="merchant.SharingDiscountFee.premiumOrPlatinum.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.premiumOrPlatinum.minimum.$touch"
                          :error="$v.merchant.SharingDiscountFee.premiumOrPlatinum.minimum.$error"
                          v-model.trim="merchant.SharingDiscountFee.premiumOrPlatinum.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="q-caption text-weight-medium">Super Premium/Signature (3rd Stab)</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.superPremiumOrSignature.fixed.$touch"
                          :error="$v.merchant.mdrPlan.superPremiumOrSignature.fixed.$error"
                          v-model.trim="merchant.mdrPlan.superPremiumOrSignature.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.superPremiumOrSignature.percentage.$touch"
                          :error="$v.merchant.mdrPlan.superPremiumOrSignature.percentage.$error"
                          v-model.trim="merchant.mdrPlan.superPremiumOrSignature.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.superPremiumOrSignature.minimum.$touch"
                          :error="$v.merchant.mdrPlan.superPremiumOrSignature.minimum.$error"
                          v-model.trim="merchant.mdrPlan.superPremiumOrSignature.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.superPremiumOrSignature.fixed.$touch"
                          :error="$v.merchant.SharingDiscountFee.superPremiumOrSignature.fixed.$error"
                          v-model.trim="merchant.SharingDiscountFee.superPremiumOrSignature.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.superPremiumOrSignature.percentage.$touch"
                          :error="$v.merchant.SharingDiscountFee.superPremiumOrSignature.percentage.$error"
                          v-model.trim="merchant.SharingDiscountFee.superPremiumOrSignature.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.superPremiumOrSignature.minimum.$touch"
                          :error="$v.merchant.SharingDiscountFee.superPremiumOrSignature.minimum.$error"
                          v-model.trim="merchant.SharingDiscountFee.superPremiumOrSignature.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="q-caption text-weight-medium">Commercial/Coporate 4th Stab</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.commercialOrCorporate.fixed.$touch"
                          :error="$v.merchant.mdrPlan.commercialOrCorporate.fixed.$error"
                          v-model.trim="merchant.mdrPlan.commercialOrCorporate.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.commercialOrCorporate.percentage.$touch"
                          :error="$v.merchant.mdrPlan.commercialOrCorporate.percentage.$error"
                          v-model.trim="merchant.mdrPlan.commercialOrCorporate.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.commercialOrCorporate.minimum.$touch"
                          :error="$v.merchant.mdrPlan.commercialOrCorporate.minimum.$error"
                          v-model.trim="merchant.mdrPlan.commercialOrCorporate.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.commercialOrCorporate.fixed.$touch"
                          :error="$v.merchant.SharingDiscountFee.commercialOrCorporate.fixed.$error"
                          v-model.trim="merchant.SharingDiscountFee.commercialOrCorporate.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.commercialOrCorporate.percentage.$touch"
                          :error="$v.merchant.SharingDiscountFee.commercialOrCorporate.percentage.$error"
                          v-model.trim="merchant.SharingDiscountFee.commercialOrCorporate.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.commercialOrCorporate.minimum.$touch"
                          :error="$v.merchant.SharingDiscountFee.commercialOrCorporate.minimum.$error"
                          v-model.trim="merchant.SharingDiscountFee.commercialOrCorporate.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="q-caption text-weight-medium">International Debit Card</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.internationalDebitCard.fixed.$touch"
                          :error="$v.merchant.mdrPlan.internationalDebitCard.fixed.$error"
                          v-model.trim="merchant.mdrPlan.internationalDebitCard.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.internationalDebitCard.percentage.$touch"
                          :error="$v.merchant.mdrPlan.internationalDebitCard.percentage.$error"
                          v-model.trim="merchant.mdrPlan.internationalDebitCard.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.internationalDebitCard.minimum.$touch"
                          :error="$v.merchant.mdrPlan.internationalDebitCard.minimum.$error"
                          v-model.trim="merchant.mdrPlan.internationalDebitCard.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.internationalDebitCard.fixed.$touch"
                          :error="$v.merchant.SharingDiscountFee.internationalDebitCard.fixed.$error"
                          v-model.trim="merchant.SharingDiscountFee.internationalDebitCard.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.internationalDebitCard.percentage.$touch"
                          :error="$v.merchant.SharingDiscountFee.internationalDebitCard.percentage.$error"
                          v-model.trim="merchant.SharingDiscountFee.internationalDebitCard.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.internationalDebitCard.minimum.$touch"
                          :error="$v.merchant.SharingDiscountFee.internationalDebitCard.minimum.$error"
                          v-model.trim="merchant.SharingDiscountFee.internationalDebitCard.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="q-caption text-weight-medium">International Credit Card</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.internationalCreditCard.fixed.$touch"
                          :error="$v.merchant.mdrPlan.internationalCreditCard.fixed.$error"
                          v-model.trim="merchant.mdrPlan.internationalCreditCard.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.internationalCreditCard.percentage.$touch"
                          :error="$v.merchant.mdrPlan.internationalCreditCard.percentage.$error"
                          v-model.trim="merchant.mdrPlan.internationalCreditCard.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.internationalCreditCard.minimum.$touch"
                          :error="$v.merchant.mdrPlan.internationalCreditCard.minimum.$error"
                          v-model.trim="merchant.mdrPlan.internationalCreditCard.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.internationalCreditCard.fixed.$touch"
                          :error="$v.merchant.SharingDiscountFee.internationalCreditCard.fixed.$error"
                          v-model.trim="merchant.SharingDiscountFee.internationalCreditCard.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.internationalCreditCard.percentage.$touch"
                          :error="$v.merchant.SharingDiscountFee.internationalCreditCard.percentage.$error"
                          v-model.trim="merchant.SharingDiscountFee.internationalCreditCard.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.internationalCreditCard.minimum.$touch"
                          :error="$v.merchant.SharingDiscountFee.internationalCreditCard.minimum.$error"
                          v-model.trim="merchant.SharingDiscountFee.internationalCreditCard.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="q-caption text-weight-medium">Onus</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.onus.fixed.$touch"
                          :error="$v.merchant.mdrPlan.onus.fixed.$error"
                          v-model.trim="merchant.mdrPlan.onus.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.onus.percentage.$touch"
                          :error="$v.merchant.mdrPlan.onus.percentage.$error"
                          v-model.trim="merchant.mdrPlan.onus.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.onus.minimum.$touch"
                          :error="$v.merchant.mdrPlan.onus.minimum.$error"
                          v-model.trim="merchant.mdrPlan.onus.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.onus.fixed.$touch"
                          :error="$v.merchant.SharingDiscountFee.onus.fixed.$error"
                          v-model.trim="merchant.SharingDiscountFee.onus.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.onus.percentage.$touch"
                          :error="$v.merchant.SharingDiscountFee.onus.percentage.$error"
                          v-model.trim="merchant.SharingDiscountFee.onus.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.onus.minimum.$touch"
                          :error="$v.merchant.SharingDiscountFee.onus.minimum.$error"
                          v-model.trim="merchant.SharingDiscountFee.onus.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="q-caption text-weight-medium">mVISA</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.mVisa.fixed.$touch"
                          :error="$v.merchant.mdrPlan.mVisa.fixed.$error"
                          v-model.trim="merchant.mdrPlan.mVisa.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.mVisa.percentage.$touch"
                          :error="$v.merchant.mdrPlan.mVisa.percentage.$error"
                          v-model.trim="merchant.mdrPlan.mVisa.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.mVisa.minimum.$touch"
                          :error="$v.merchant.mdrPlan.mVisa.minimum.$error"
                          v-model.trim="merchant.mdrPlan.mVisa.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.mVisa.fixed.$touch"
                          :error="$v.merchant.SharingDiscountFee.mVisa.fixed.$error"
                          v-model.trim="merchant.SharingDiscountFee.mVisa.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.mVisa.percentage.$touch"
                          :error="$v.merchant.SharingDiscountFee.mVisa.percentage.$error"
                          v-model.trim="merchant.SharingDiscountFee.mVisa.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.mVisa.minimum.$touch"
                          :error="$v.merchant.SharingDiscountFee.mVisa.minimum.$error"
                          v-model.trim="merchant.SharingDiscountFee.mVisa.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="q-caption text-weight-medium">Master Pass</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.masterPass.fixed.$touch"
                          :error="$v.merchant.mdrPlan.masterPass.fixed.$error"
                          v-model.trim="merchant.mdrPlan.masterPass.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.masterPass.percentage.$touch"
                          :error="$v.merchant.mdrPlan.masterPass.percentage.$error"
                          v-model.trim="merchant.mdrPlan.masterPass.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.masterPass.fixed.$touch"
                          :error="$v.merchant.mdrPlan.masterPass.fixed.$error"
                          v-model.trim="merchant.mdrPlan.masterPass.fixed"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.masterPass.fixed.$touch"
                          :error="$v.merchant.SharingDiscountFee.masterPass.fixed.$error"
                          v-model.trim="merchant.SharingDiscountFee.masterPass.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.masterPass.percentage.$touch"
                          :error="$v.merchant.SharingDiscountFee.masterPass.percentage.$error"
                          v-model.trim="merchant.SharingDiscountFee.masterPass.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.masterPass.minimum.$touch"
                          :error="$v.merchant.SharingDiscountFee.masterPass.minimum.$error"
                          v-model.trim="merchant.SharingDiscountFee.masterPass.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="q-caption text-weight-medium">Cash at POS</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.cashAtPos.fixed.$touch"
                          :error="$v.merchant.mdrPlan.cashAtPos.fixed.$error"
                          v-model.trim="merchant.mdrPlan.cashAtPos.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.cashAtPos.percentage.$touch"
                          :error="$v.merchant.mdrPlan.cashAtPos.percentage.$error"
                          v-model.trim="merchant.mdrPlan.cashAtPos.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.mdrPlan.cashAtPos.minimum.$touch"
                          :error="$v.merchant.mdrPlan.cashAtPos.minimum.$error"
                          v-model.trim="merchant.mdrPlan.cashAtPos.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.cashAtPos.fixed.$touch"
                          :error="$v.merchant.SharingDiscountFee.cashAtPos.fixed.$error"
                          v-model.trim="merchant.SharingDiscountFee.cashAtPos.fixed"
                          placeholder="Fixed"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.cashAtPos.percentage.$touch"
                          :error="$v.merchant.SharingDiscountFee.cashAtPos.percentage.$error"
                          v-model.trim="merchant.SharingDiscountFee.cashAtPos.percentage"
                          placeholder="%"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="grey-9"
                          type="number"
                          @blur="$v.merchant.SharingDiscountFee.cashAtPos.minimum.$touch"
                          :error="$v.merchant.SharingDiscountFee.cashAtPos.minimum.$error"
                          v-model.trim="merchant.SharingDiscountFee.cashAtPos.minimum"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn
                color="primary"
                class="q-ma-xs"
                icon="check"
                @click="validatebeforeNavigate('mdr')"
                label="Continue"
              />
              <q-btn
                color="amber-10"
                class="q-ma-xs"
                icon="save"
                label="Save Partial"
                @click="saveCurrentChanges()"
              />
              <q-btn
                color="grey-7"
                class="q-ma-xs"
                icon="block"
                @click="$refs.stepper.previous()"
                label="Back"
              />
            </q-stepper-navigation>
          </q-step>

          <q-step
            error-icon="warning"
            name="seventh"
            :error="error.tab.bankInformation"
            title="Bank & Collection"
            subtitle="Details"
          >
            <div class="row q-mb-md gutter-sm items-center">
              <div class="col-md-12">
                <div class="q-title">Merchant Bank Details</div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  upper-case
                  color="grey-9"
                  :error="$v.merchant.bankInformation.bankDetails.ifsc.$error"
                  @blur="populateBankDetails"
                  v-model.trim="merchant.bankInformation.bankDetails.ifsc"
                  float-label="IFSC Code*"
                  placeholder="Enter IFSC*"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.bankInformation.bankDetails.branchName.$touch"
                  :error="$v.merchant.bankInformation.bankDetails.branchName.$error"
                  v-model.trim="merchant.bankInformation.bankDetails.branchName"
                  float-label="Branch Name*"
                  placeholder="Branch Name* "
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Choose from the below"
                  color="grey-9"
                  v-model.trim="merchant.bankInformation.bankDetails.feeType"
                  float-label="Fee Type"
                  :options="feeTypeOptions"
                  @input="merchant.bankInformation.bankDetails.settlementOrNeftFee = ''"
                />
              </div>
              <div
                v-if="merchant.bankInformation.bankDetails.feeType == 'N' || merchant.bankInformation.bankDetails.feeType == 'S'"
                class="col-md-6 col-sm-12 col-xs-12"
              >
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.bankInformation.bankDetails.settlementOrNeftFee.$touch"
                  :error="$v.merchant.bankInformation.bankDetails.settlementOrNeftFee.$error"
                  v-model.trim="merchant.bankInformation.bankDetails.settlementOrNeftFee"
                  float-label="NEFT/Settlement Fee Inclusive of Tax*"
                  placeholder="NEFT/Settlement Fee Inclusive of Tax*"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.bankInformation.bankDetails.micr.$touch"
                  :error="$v.merchant.bankInformation.bankDetails.micr.$error"
                  v-model.trim="merchant.bankInformation.bankDetails.micr"
                  float-label="MICR*"
                  placeholder="MICR*"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.bankInformation.bankDetails.bankName.$touch"
                  :error="$v.merchant.bankInformation.bankDetails.bankName.$error"
                  v-model.trim="merchant.bankInformation.bankDetails.bankName"
                  float-label="Bank Name*"
                  placeholder="Bank Name*"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Choose from the below"
                  color="grey-9"
                  v-model.trim="merchant.bankInformation.bankDetails.paymentMode"
                  float-label="Payment mode"
                  :options="paymnentModeOptions"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.bankInformation.bankDetails.bankCityRefCode.$touch"
                  :error="autoCompleteError($v.merchant.bankInformation.bankDetails.bankCityName,$v.merchant.bankInformation.bankDetails.bankCityRefCode)"
                  v-model.trim="merchant.bankInformation.bankDetails.bankCityName"
                  float-label="City (type min 3 characters)*"
                  placeholder="Start typing ..*"
                >
                  <q-autocomplete
                    separator
                    @search="residentCitySearch"
                    :debounce="10"
                    :min-characters="3"
                    @selected="bankCitySelected"
                  />
                </q-input>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.bankInformation.bankDetails.bankStateRefCode.$touch"
                  :error="autoCompleteError($v.merchant.bankInformation.bankDetails.bankStateName,$v.merchant.bankInformation.bankDetails.bankStateRefCode)"
                  v-model.trim="merchant.bankInformation.bankDetails.bankStateName"
                  float-label="State (type min 3 characters)*"
                  placeholder="Start typing ..*"
                >
                  <q-autocomplete
                    separator
                    @search="residentStateSearch"
                    :debounce="10"
                    :min-characters="1"
                    @selected="bankStateSelected"
                  />
                </q-input>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Choose from the below"
                  color="grey-9"
                  v-model.trim="merchant.bankInformation.bankDetails.accountType"
                  float-label="Account Type"
                  :options="accountTypeOptions"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.merchant.bankInformation.bankDetails.accountNumber.$touch"
                  :error="$v.merchant.bankInformation.bankDetails.accountNumber.$error"
                  v-model.trim="merchant.bankInformation.bankDetails.accountNumber"
                  float-label="Bank A/c Number*"
                  placeholder="Bank A/c Number*"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-checkbox
                  color="grey-9"
                  true-value="Y"
                  false-value="N"
                  v-model.trim="merchant.bankInformation.bankDetails.bankStatementAttached"
                  label="Bank Statement Attached"
                />
                <q-checkbox
                  color="grey-9"
                  true-value="Y"
                  false-value="N"
                  v-model.trim="merchant.bankInformation.bankDetails.cancelChequeAttached"
                  label="Cancelled Cheque Lead Attached"
                />
              </div>
            </div>
            <div class="row gutter-sm items-center">
              <div class="col-md-12">
                <div class="q-title">Payment Collection Details</div>
              </div>
              <div v-show="propLeadDeatils.paymentOption == 1" class="col-md-12">
                <div class="row">
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input
                      color="grey-9"
                      @blur="$v.merchant.bankInformation.collectionDetails.chequeNumber.$touch"
                      :error="$v.merchant.bankInformation.collectionDetails.chequeNumber.$error"
                      v-model.trim="merchant.bankInformation.collectionDetails.chequeNumber"
                      float-label="Cheque/UTR No*"
                      placeholder="Cheque/UTR No*"
                    />
                  </div>
                </div>
              </div>
              <div v-show="propLeadDeatils.paymentOption == 3" class="col-md-12">
                <div class="row">
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <q-input
                      color="grey-9"
                      @blur="$v.merchant.bankInformation.collectionDetails.swipeAmount.$touch"
                      :error="$v.merchant.bankInformation.collectionDetails.swipeAmount.$error"
                      v-model.trim="merchant.bankInformation.collectionDetails.swipeAmount"
                      float-label="Swipe Amount*"
                      placeholder="Swipe Amount*"
                    />
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <q-datetime
                      format="DD/MM/YYYY"
                      format-model="number"
                      color="grey-9"
                      modal
                      @blur="$v.merchant.bankInformation.collectionDetails.collectedDate.$touch"
                      :error="$v.merchant.bankInformation.collectionDetails.collectedDate.$error"
                      v-model.trim="merchant.bankInformation.collectionDetails.collectedDate"
                      float-label="Swipe Date*"
                      placeholder="Swipe Date*"
                    />
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <q-input
                      color="grey-9"
                      @blur="$v.merchant.bankInformation.collectionDetails.swipeTerminal.$touch"
                      :error="$v.merchant.bankInformation.collectionDetails.swipeTerminal.$error"
                      v-model.trim="merchant.bankInformation.collectionDetails.swipeTerminal"
                      float-label="Swiped on the terminal of*"
                      placeholder="Swiped on the terminal of*"
                    />
                  </div>
                </div>
              </div>
              <div v-show="propLeadDeatils.paymentOption == 2" class="col-md-12">
                <div class="row">
                  <div class="col-md-3 col-sm-12 col-xs-12">
                    <q-input
                      color="grey-9"
                      @blur="$v.merchant.bankInformation.collectionDetails.chequeAmount.$touch"
                      :error="$v.merchant.bankInformation.collectionDetails.chequeAmount.$error"
                      v-model.trim="merchant.bankInformation.collectionDetails.chequeAmount"
                      float-label="Cheque Amount*"
                      placeholder="Cheque Amount*"
                    />
                  </div>
                  <div class="col-md-3 col-sm-12">
                    <q-datetime
                      format="DD/MM/YYYY"
                      format-model="number"
                      color="grey-9"
                      modal
                      @blur="$v.merchant.bankInformation.collectionDetails.chequeDate.$touch"
                      :error="$v.merchant.bankInformation.collectionDetails.chequeDate.$error"
                      v-model.trim="merchant.bankInformation.collectionDetails.chequeDate"
                      float-label="Cheque Date*"
                      placeholder="Cheque Date*"
                    />
                  </div>
                  <div class="col-md-3 col-sm-12 col-xs-12">
                    <q-datetime
                      format="DD/MM/YYYY"
                      format-model="number"
                      color="grey-9"
                      modal
                      @blur="$v.merchant.bankInformation.collectionDetails.chequeDepositedDate.$touch"
                      :error="$v.merchant.bankInformation.collectionDetails.chequeDepositedDate.$error"
                      v-model.trim="merchant.bankInformation.collectionDetails.chequeDepositedDate"
                      float-label="Cheque Deposited Date*"
                      placeholder="Cheque Deposited Date*"
                    />
                  </div>
                  <div class="col-md-3 col-sm-12 col-xs-12">
                    <q-input
                      color="grey-9"
                      @blur="$v.merchant.bankInformation.collectionDetails.chequeNumber.$touch"
                      :error="$v.merchant.bankInformation.collectionDetails.chequeNumber.$error"
                      v-model.trim="merchant.bankInformation.collectionDetails.chequeNumber"
                      float-label="Cheque/UTR No*"
                      placeholder="Cheque/UTR No*"
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <q-select
                  clearable
                  placeholder="Choose from the below"
                  color="grey-9"
                  v-model.trim="merchant.bankInformation.collectionDetails.acquirerBank"
                  float-label="Bank Name"
                  :options="bankListSet"
                />
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn
                color="primary"
                class="q-ma-xs"
                icon="check"
                @click="validatebeforeNavigate('bank')"
                label="Continue"
              />
              <q-btn
                color="amber-10"
                class="q-ma-xs"
                icon="save"
                label="Save Partial"
                @click="saveCurrentChanges()"
              />
              <q-btn
                color="grey-7"
                class="q-ma-xs"
                icon="block"
                @click="$refs.stepper.previous()"
                label="Back"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step error-icon="warning" name="eight" title="KYC" subtitle="Details">
            <div class="row items-center">
              <div
                class="col-12 bottom-border q-py-md"
                v-for="(key,index) in Object.keys(propLeadDeatils.leadDocuments)"
                :key="index"
              >
                <div class="row group items-center">
                  <div class="col-auto">
                    <span class="text-purple-9 text-weight-bold border-1 q-pa-sm">{{index+1}}</span>
                  </div>
                  <div
                    class="col-10"
                    v-for="(item,subIndex) in propLeadDeatils.leadDocuments[key]"
                    :key="subIndex"
                  >
                    <div class="row">
                      <div class="col-4 q-body-1">Document</div>
                      <div
                        class="col-8 q-body-1 text-weight-bold text-negative"
                        v-if="item.documentType == ''"
                      >NA</div>
                      <div class="col-8 q-body-1" v-else>{{item.documentType}}</div>
                    </div>
                    <div class="row">
                      <div class="col-4 q-body-1">Sub document</div>
                      <div
                        class="col-8 q-body-1 text-weight-bold text-negative"
                        v-if="item.subDocumentType == ''"
                      >NA</div>
                      <div
                        class="col-8 q-body-1 text-weight-bold text-positive"
                        v-else
                      >{{item.subDocumentType}}</div>
                    </div>
                    <div class="row">
                      <div class="col-12" v-show="item.uploadedDocuments.length > 0">
                        <div
                          class="q-caption"
                          v-for="(document, documentIndex) in item.uploadedDocuments"
                          :key="documentIndex"
                        >{{document.fileName}}</div>
                      </div>
                      <div class="q-caption" v-show="item.uploadedDocuments.length == 0">
                        <div class="text-weight-bold text-negative">No document available</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row group q-py-md items-center">
              <div class="col-6">
                <q-input
                  color="grey-9"
                  v-model.trim="leadDataEntryRemarks"
                  float-label="Remarks"
                  placeholder="Remarks"
                />
              </div>
              <div class="col-6">
                <p class="q-ma-0">Hold payment?</p>
                <q-radio color="grey-9" v-model.trim="holdPayment" :val="1" label="Yes"/>
                <q-radio color="grey-9" v-model.trim="holdPayment" :val="0" label="No"/>
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn
                color="primary"
                class="q-ma-xs"
                icon="check"
                @click="finalFormSubmit()"
                label="Submit"
              />
              <q-btn
                color="amber-10"
                class="q-ma-xs"
                icon="save"
                label="Save Partial"
                @click="saveCurrentChanges()"
              />
              <q-btn
                color="grey-7"
                class="q-ma-xs"
                icon="block"
                @click="$refs.stepper.previous()"
                label="Back"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </div>
    </div>
  </div>
</template>

<script>
import { easing } from "quasar";
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
  decimal
} from "vuelidate/lib/validators";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import { uid, filter } from "quasar";
import Vue from "vue";

import viewLeadDocumentsDataEntryComponent from "./viewLeadDocumentsDataEntryComponent.vue";

import { helpers } from "vuelidate/lib/validators";
const panCard = helpers.regex(
  "panCard",
  /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
);

const gstn = helpers.regex(
  "gstn",
  // /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9]{1})+$/
  /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[1-9a-zA-Z]{1})+$/
);

// 4 alphabets, 5 numbers, 1 number
const tanValidate = helpers.regex("tanValidate", /[A-Za-z]{4}\d{5}[A-Za-z]{1}/);
const timeValidate = helpers.regex(
  "timeValidate",
  /^(?:\d|[01]\d|2[0-3])\.[0-5]\d$/
);

// const alphaNumericValidate = helpers.regex(
//   "alphaNumericValidate",
//   /^[a-zA-Z ]*$/
// );
const alphaNumericValidate = helpers.regex(
  "alphaNumericValidate",
  /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/
);

export default {
  name: "leadDataEntry",
  components: {
    viewLeadDocumentsDataEntryComponent
  },
  props: ["propLeadDeatils"],
  data() {
    return {
      showPartnerstab: false,
      ifscErrFlag: false,
      salesInformationError: false,
      companyInformationError: false,
      businessInformationError: false,
      partnerInformationError: false,
      paymentDetailsError: false,
      bankInformationError: false,

      viewBinding: {},

      //start >> Actual dropdown options values
      institutionCodeOptions: [
        // {
        //   label: "IOB",
        //   value: 1
        // },
        // {
        //   label: "AB",
        //   value: 2
        // },
        {
          label: "GPRS",
          value: 3
        }
      ],
      applicationTypeOptions: [
        {
          label: "Digital",
          value: "D"
        },
        {
          label: "Non Digital",
          value: "N"
        }
      ],
      categoryTypeOptions: [
        {
          label: "Small",
          value: "S"
        },
        {
          label: "Other",
          value: "O"
        }
      ],
      merchantTypeOptions: [
        {
          label: "Group Merchant",
          value: "G"
        },
        {
          label: "Merchant Outlet",
          value: "O"
        },
        {
          label: "Merchant",
          value: "M"
        }
      ],
      businessTypeOptions: [
        {
          label: "Rented",
          value: "R"
        },
        {
          label: "Owned",
          value: "O"
        },
        {
          label: "Leased",
          value: "L"
        }
      ],
      constitutionOptions: [
        {
          label: "Individuals",
          value: "IN"
        },
        {
          label: " Partnership/LLP",
          value: "PL"
        },
        {
          label: "Sole Proprietorship",
          value: "SP"
        },
        {
          label: "Public/Pvt.Ltd",
          value: "PB"
        },
        {
          label: "Trust",
          value: "TR"
        },
        {
          label: "Society",
          value: "SO"
        },
        {
          label: "Other",
          value: "OT"
        }
      ],
      deviceOwnedByOptions: [
        {
          label: "Bijlipay",
          value: "B"
        },
        {
          label: "Merchant",
          value: "M"
        }
      ],
      cashAtPosEnabledOptions: [
        {
          label: "Yes",
          value: "Y"
        },
        {
          label: "No",
          value: "N"
        }
      ],
      rentalTypeOptions: [
        {
          label: "Advanced",
          value: "A"
        },
        {
          label: "Regular",
          value: "R"
        }
      ],
      rentalModeOptions: [
        {
          label: "Standing instructions",
          value: "S"
        },
        {
          label: "Normal",
          value: "N"
        },
        {
          label: "Nabad",
          value: "B"
        },
        {
          label: "Invoice for EPRS",
          value: "I"
        },
        {
          label: "Equitas Rental",
          value: "E"
        },
        {
          label: "Big merchant",
          value: "M"
        },
        {
          label: "Invoice to Trade",
          value: "IT"
        },
        {
          label: "Rental Fee Waiver",
          value: "RW"
        },
        {
          label: "Advance Rental",
          value: "AR"
        },
        {
          label: "Settlement",
          value: "SE"
        },
        {
          label: "Exibition",
          value: "EX"
        },
        {
          label: "Clix",
          value: "CX"
        },
        {
          label: "Subvention",
          value: "SB"
        },
        {
          label: "EMI Rental",
          value: "EM"
        },
        {
          label: "BPCL",
          value: "BP"
        },
        {
          label: "Demo Device",
          value: "DD"
        },
        {
          label: "Invoice to Bank",
          value: "IB"
        },
        {
          label: "Finetree Finance LTD",
          value: "FF"
        },
        {
          label: "Deactivated",
          value: "DT"
        }
      ],
      advanceRentModeOptions: [
        {
          label: "Card",
          value: "Card"
        },
        {
          label: "Cheque",
          value: "Cheque"
        },
        {
          label: "NEFT",
          value: "NEFT"
        },
        {
          label: "IMPS",
          value: "IMPS"
        },
        {
          label: "Cash",
          value: "Cash"
        }
      ],
      accountTypeOptions: [
        {
          label: "Saving account",
          value: "S"
        },
        {
          label: "Current account",
          value: "C"
        },
        {
          label: "Overdraft account",
          value: "O"
        },
        {
          label: "Cash credit account",
          value: "R"
        }
      ],
      feeTypeOptions: [
        {
          label: "NEFT",
          value: "N"
        },
        {
          label: "Settlement",
          value: "S"
        },
        {
          label: "None",
          value: "X"
        }
      ],
      paymnentModeOptions: [
        {
          label: "Direct credit",
          value: "D"
        },
        {
          label: "NEFT",
          value: "N"
        },
        {
          label: "IMPS",
          value: "I"
        }
      ],
      regionOptions: [],
      leadFromOptions: [],
      salesPersonOptions: [],
      sharingPartnerOptions: [],
      cityOptions: [],
      stateOptions: [],
      mccSearchSet: [],
      terminalModelSet: [],
      ifscSet: [],
      rentalPlanSet: [],
      mdrSearchSet: [],
      bankListSet: [],
      networkProviderListSet: [],
      serviceProviderListSet: [],
      //end >> Actual dropdown options values

      holdPayment: 1,
      leadDataEntryRemarks: "",
      merchant: {
        salesInformation: {
          institutionCode: 3,
          applicationType: "D",
          applicationNumber: "",
          applicationDate: "",
          aggreementDate: "",
          merchantType: "M",
          categoryType: "O",
          region: "",
          salesPersonCode: "",
          leadFrom: "",
          sharingModelCode: "N",
          sharingPartnerCode: "",
          dailyFixedAmount: "",
          loanDisbursementPercentage: "",
          loanDisbursementAmount: "",
          loanDisbursementDate: "",
          tenureMonth: "",
          tenureDay: "",
          tenureStartDate: "",
          rentPercentage: 2,
          rentFixed: ""
        },
        companyInformation: {
          legalName: "",
          dbaName: "",
          registeredAddress: "",
          registeredPin: "",
          registeredCityRefCode: "",
          registeredStateRefCode: "",
          constitution: "",
          constitutionName: "",
          constitutionDescription: "",
          establishYear: "",
          registerNumber: "",
          pan: "",
          tin: "",
          tan: "",
          businessNature: "",
          businessType: "R",
          mcc: "",
          residentialAddress: "",
          residentialPin: "",
          residentialCityRefCode: "",
          residentialStateRefCode: "",
          contactName: "",
          contactMobile: "",
          contactAlternateMobile: "",
          contactPhone: "",
          contactEmail: "",
          statementType: "P",
          statementFrequency: "D",
          statementEmail: ""
        },
        businessInformation: {
          weekdayStartHour: "00.00",
          weekdayEndHour: "00.00",
          weekendStartHour: "00.00",
          weekendEndHour: "00.00",
          lastTurnoverYear: 2017,
          lastTurnoverAmount: "",
          expectedCardBusiness: "",
          averageBillAmount: "",
          gstId: null,
          currentPosName: "",
          debitCardMdr: "",
          creditCardMdr: "",
          memberSince: "",
          businessIncome: ""
        },
        partnerInformation: [
          {
            name: "",
            address: "",
            pan: "",
            pin: "",
            stateRefCode: "",
            cityRefCode: "",
            contactMobile: "",
            contactEmail: ""
          }
        ],
        paymentDetails: {
          deviceOwnedBy: "B",
          installationFee: "",
          terminalModeCode: "",
          numberOfTerminals: 1,
          cashAtPosEnabled: "Y",
          rentalPlanCode: 1,
          serviceProvider: 1,
          networkPreferred: 1,
          rentalMode: "S",
          rentalType: "A",
          advanceRentCollected: "",
          advanceRentMode: "NEFT",
          noOfMonthRentPaidInAdvance: "",
          gracePeriod: 0,
          devicePrice: "",
          otherCharges: "",
          totalAmountPaid: ""
        },
        bankInformation: {
          bankDetails: {
            ifsc: "",
            micr: "",
            bankName: "",
            branchName: "",
            bankCityRefCode: "",
            bankStateRefCode: "",
            paymentMode: "D",
            accountType: "S",
            accountNumber: "",
            bankStatementAttached: "Y",
            cancelChequeAttached: "Y",
            feeType: "N",
            settlementOrNeftFee: ""
          },
          collectionDetails: {
            collectedDate: "",
            swipeAmount: "",
            swipeTerminal: "",
            chequeAmount: "",
            chequeDate: "",
            chequeDepositedDate: "",
            chequeNumber: "",
            acquirerBank: ""
          }
        },
        kyc: {
          documents: []
        },
        mdrPlan: {
          code: 1,
          domesticDebitUpTo2000: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          domesticDebitAbove2000: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          standardOrClassic: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          premiumOrPlatinum: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          superPremiumOrSignature: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          commercialOrCorporate: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          internationalDebitCard: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          internationalCreditCard: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          onus: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          mVisa: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          masterPass: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          cashAtPos: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          }
        },
        SharingDiscountFee: {
          domesticDebitUpTo2000: {
            fixed: 0,
            percentage: 0,
            minimum: 0
          },
          domesticDebitAbove2000: {
            fixed: 0,
            percentage: 0,
            minimum: 0
          },
          standardOrClassic: {
            fixed: 0,
            percentage: 0,
            minimum: 0
          },
          premiumOrPlatinum: {
            fixed: 0,
            percentage: 0,
            minimum: 0
          },
          superPremiumOrSignature: {
            fixed: 0,
            percentage: 0,
            minimum: 0
          },
          commercialOrCorporate: {
            fixed: 0,
            percentage: 0,
            minimum: 0
          },
          internationalDebitCard: {
            fixed: 0,
            percentage: 0,
            minimum: 0
          },
          internationalCreditCard: {
            fixed: 0,
            percentage: 0,
            minimum: 0
          },
          onus: {
            fixed: 0,
            percentage: 0,
            minimum: 0
          },
          mVisa: {
            fixed: 0,
            percentage: 0,
            minimum: 0
          },
          masterPass: {
            fixed: 0,
            percentage: 0,
            minimum: 0
          },
          cashAtPos: {
            fixed: 0,
            percentage: 0,
            minimum: 0
          }
        }
      },
      error: {
        tab: {
          salesInformation: false,
          companyInformation: false,
          partnerInformation: false,
          businessInformation: false,
          paymentDetails: false,
          mdrPlan: false,
          SharingDiscountFee: false,
          bankInformation: false
        }
      },
      model: true,
      toggleChequeImageResult: false,
      toggleDocPanResult: false,
      toggleDocAadharResult: false,
      checked: false,
      thumbnailsHorizontal: false,

      populatedDocumentUrl: false,
      showDocumentPreview: true,
      showOpenPaymentChequeInfo: false
    };
  },

  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("SatLeadValidation", [
      "getShortLeadInfo",
      "getDeviceVerificationStatus"
    ]),
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("mars_regions", ["regionsFromMars"]),
    ...mapGetters("mars_leadFrom", ["leadFromInfoFromMars"]),
    ...mapGetters("mars_salesPerson", ["salesPersonFromMars"]),
    ...mapGetters("mars_sharingPartner", ["sharingPartnerFromMars"]),
    ...mapGetters("mars_city", ["cityFromMars"]),
    ...mapGetters("mars_state", ["stateFromMars"]),
    ...mapGetters("mars_mcc", ["mccFromMars"]),
    ...mapGetters("mars_deviceModel", ["deviceModelFromMars"]),
    ...mapGetters("mars_rentalPlans", ["rentalPlanFromMars"]),
    ...mapGetters("mars_ifsc", ["ifscFromMars"]),
    ...mapGetters("mars_mdrPlans", ["mdrPlanFromMars"]),
    ...mapGetters("mars_bankList", ["bankListFromMars"]),
    ...mapGetters("mars_serviceProvider", ["serviceProviderFromMars"]),
    ...mapGetters("mars_networkProvider", ["networkProviderFromMars"]),
    ...mapGetters("mars_dataSubmit", ["marsSavedDataFromInternal"]),
    //Validation functions
    // T => Transaction value model
    getTransctionValueModel() {
      return this.merchant.salesInformation.sharingModelCode == "T"
        ? true
        : false;
    },
    // M => MDR/cash@pos/rent
    getCashAtPos() {
      return this.merchant.salesInformation.sharingModelCode == "M"
        ? true
        : false;
    },
    // M => MDR/cash@pos/rent
    getPartnersVisiblity() {
      return this.$PARTNERS_TAB_ENABLED_ITEMS.includes(
        this.merchant.companyInformation.constitution
      )
        ? true
        : false;
    },
    // R=> rental type /= Rental
    getRentalTypeVisibilityForRental() {
      return this.merchant.paymentDetails.rentalType == "R" ? true : false;
    },
    // A=> rental type /= Advanced
    getRentalTypeVisibilityForAdvanced() {
      return this.merchant.paymentDetails.rentalType == "A" ? true : false;
    },
    // A=> rental type /= Advanced
    getfeeTypeForSettlementVisibility() {
      return this.merchant.bankInformation.bankDetails.feeType == "N" ||
        this.merchant.bankInformation.bankDetails.feeType == "S"
        ? true
        : false;
    },
    showOnlyIfSharingModelIsEnabled() {
      // N => No sharing
      return this.merchant.salesInformation.sharingModelCode != "N"
        ? true
        : false;
    },
    chequeNumberValidation() {
      return this.propLeadDeatils.paymentOption == 2 ? 6 : 25;
    },
    bankInfoSwipePayment() {
      return this.propLeadDeatils.paymentOption == 3 ? true : false;
    },
    bankInfoChequePayment() {
      return this.propLeadDeatils.paymentOption == 2 ? true : false;
    },
    getStatementType() {
      return this.merchant.companyInformation.statementType == "E"
        ? true
        : false;
    }
    //////////////////////////////////////////////////////
  },

  validations: {
    merchant: {
      salesInformation: {
        institutionCode: {
          required
        },
        applicationType: {
          required
        },
        applicationNumber: {
          required,
          alphaNum
        },
        applicationDate: {
          required
        },
        aggreementDate: {
          required
        },
        salesPersonCode: {
          required
        },
        region: {
          required
        },
        merchantType: {
          required
        },
        categoryType: {
          required
        },
        leadFrom: {
          required
        },
        sharingPartnerCode: {
          required: requiredIf(function() {
            return (
              this.getTransctionValueModel === true ||
              this.getCashAtPos === true
            );
          })
        },
        dailyFixedAmount: {
          required: requiredIf(function() {
            return this.getTransctionValueModel === true;
          }),
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(99999.99),
          minLength: minLength(2),
          maxLength: maxLength(7)
        },
        loanDisbursementPercentage: {
          required: requiredIf(function() {
            return this.getTransctionValueModel === true;
          }),
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(100)
        },
        loanDisbursementAmount: {
          required: requiredIf(function() {
            return this.getTransctionValueModel === true;
          }),
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(99999999.99),
          maxLength: maxLength(10),
          minLength: minLength(2)
        },
        loanDisbursementDate: {
          required: requiredIf(function() {
            return this.getTransctionValueModel === true;
          })
        },
        tenureMonth: {
          required: requiredIf(function() {
            return this.getTransctionValueModel === true;
          }),
          integer,
          minValue: minValue(0)
        },
        tenureDay: {
          required: requiredIf(function() {
            return this.getTransctionValueModel === true;
          }),
          integer,
          minValue: minValue(0)
        },
        tenureStartDate: {
          required: requiredIf(function() {
            return this.getTransctionValueModel === true;
          })
        },
        rentPercentage: {
          required: requiredIf(function() {
            return this.getCashAtPos === true;
          }),
          maxValue: maxValue(100),
          decimal,
          minValue: minValue(0)
        },
        rentFixed: {
          required: requiredIf(function() {
            return this.getCashAtPos === true;
          }),
          decimal,
          minValue: minValue(0)
        }
      },
      companyInformation: {
        legalName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(120),
          alphaNumericValidate
        },
        dbaName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(120),
          alphaNumericValidate
        },
        registeredAddress: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(250)
        },
        registeredPin: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(6)
        },
        registeredCityRefCode: {
          required,
          integer
        },
        registeredCityName: {
          required
        },
        registeredStateRefCode: {
          required,
          integer
        },
        registeredStateName: {
          required
        },
        constitution: {
          required
        },
        establishYear: {
          required
        },
        registerNumber: {
          alphaNum,
          minLength: minLength(2),
          maxLength: maxLength(20)
        },

        mccname: {
          required
        },
        mcc: {
          required
        },
        residentialAddress: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(250)
        },
        residentialPin: {
          required,
          integer,
          minLength: minLength(6),
          maxLength: maxLength(6)
        },
        residentCityName: {
          required
        },
        residentialCityRefCode: {
          required,
          integer
        },
        residentStateName: {
          required
        },
        residentialStateRefCode: {
          required,
          integer
        },
        pan: {
          required,
          panCard,
          maxLength: maxLength(10),
          minLength: minLength(10)
        },
        tin: {
          required: false,
          integer,
          minLength: minLength(9),
          maxLength: maxLength(12)
        },
        tan: {
          required: false,
          maxLength: maxLength(10),
          minLength: minLength(10),
          tanValidate
        },
        contactName: {
          required,
          alphaNumericValidate
        },
        contactMobile: {
          numeric,
          required,
          minLength: minLength(10),
          maxLength: maxLength(10)
        },
        contactAlternateMobile: {
          numeric,
          minLength: minLength(10),
          maxLength: maxLength(10)
        },
        contactPhone: {
          numeric,
          required,
          minLength: minLength(12),
          maxLength: maxLength(12)
        },
        contactEmail: {
          required,
          email
        },
        statementEmail: {
          required: requiredIf(function() {
            return this.getStatementType === true;
          }),
          email
        },
        statementType: {
          required
        },
        statementFrequency: {
          required
        }
      },
      businessInformation: {
        gstId: {
          // required,
          // gstn,
          maxLength: maxLength(15),
          minLength: minLength(15)
        },
        weekendEndHour: {
          timeValidate
        },
        weekendStartHour: {
          timeValidate
        },
        weekdayEndHour: {
          timeValidate
        },
        weekdayStartHour: {
          timeValidate
        },
        memberSince: {
          // Removing the validation as per client request
          required: false
        },
        debitCardMdr: {
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(99.99)
        },
        creditCardMdr: {
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(99.99)
        },
        expectedCardBusiness: {
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(9999999999.99)
        },
        averageBillAmount: {
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(9999999999.99)
        },
        lastTurnoverAmount: {
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(9999999999.99)
        },
        lastTurnoverYear: {
          integer,
          minValue: minValue(0),
          maxValue: maxValue(2018),
          minLength: minLength(4),
          maxLength: maxLength(4)
        }
      },
      paymentDetails: {
        installationFee: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForRental === true;
          }),
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(999999.99),
          minLength: minLength(1),
          maxLength: maxLength(12)
        },
        serviceProvider: {
          required
        },
        networkPreferred: {
          required
        },
        terminalModeCode: {
          required
        },
        devicePrice: {
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(999999.99),
          minLength: minLength(2),
          maxLength: maxLength(8)
        },
        otherCharges: {
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(999999),
          minLength: minLength(2),
          maxLength: maxLength(8)
        },
        totalAmountPaid: {
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(999999),
          minLength: minLength(2),
          maxLength: maxLength(12)
        },
        numberOfTerminals: {
          numeric,
          minValue: minValue(1),
          maxValue: maxValue(100)
        },
        deviceOwnedBy: {
          required
        },
        cashAtPosEnabled: {
          required
        },
        rentalType: {
          required
        },
        advanceRentCollected: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForAdvanced === true;
          }),
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(999999),
          minLength: minLength(2),
          maxLength: maxLength(8)
        },
        advanceRentMode: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForAdvanced === true;
          })
        },
        noOfMonthRentPaidInAdvance: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForAdvanced === true;
          }),
          minValue: minValue(0),
          maxValue: maxValue(999999),
          minLength: minLength(1),
          maxLength: maxLength(8)
        },
        gracePeriod: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForRental === true;
          }),
          minValue: minValue(0),
          maxValue: maxValue(999999),
          minLength: minLength(1),
          maxLength: maxLength(8)
        }
      },
      bankInformation: {
        bankDetails: {
          ifsc: {
            required,
            alphaNum,
            maxLength: maxLength(11)
          },
          micr: {
            required,
            numeric,
            minLength: minLength(9),
            maxLength: maxLength(9)
          },
          branchName: {
            required
          },
          bankName: {
            required
          },
          bankCityName: {
            required
          },
          bankCityRefCode: {
            required,
            numeric
          },
          accountNumber: {
            required,
            numeric,
            minLength: minLength(6),
            maxLength: maxLength(19)
          },
          bankStateName: {
            required
          },
          bankStateRefCode: {
            required,
            numeric
          },
          paymentMode: {
            required
          },
          accountType: {
            required
          },
          settlementOrNeftFee: {
            required: requiredIf(function() {
              return this.getfeeTypeForSettlementVisibility === true;
            }),
            integer,
            maxValue: maxValue(999),
            minValue: minValue(0)
          }
        },
        collectionDetails: {
          collectedDate: {
            required: requiredIf(function() {
              return this.bankInfoSwipePayment === true;
            })
          },
          swipeAmount: {
            decimal,
            required: requiredIf(function() {
              return this.bankInfoSwipePayment === true;
            }),
            minValue: minValue(0)
          },
          swipeTerminal: {
            required: requiredIf(function() {
              return this.bankInfoSwipePayment === true;
            })
          },
          chequeAmount: {
            decimal,
            required: requiredIf(function() {
              return this.bankInfoChequePayment === true;
            }),
            minValue: minValue(0)
          },
          chequeNumber: {
            alphaNum,
            required: requiredIf(function() {
              return this.bankInfoChequePayment === true;
            }),
            minLength: minLength(6),
            maxLength: maxLength(25)
          },
          chequeDate: {
            required: requiredIf(function() {
              return this.bankInfoChequePayment === true;
            })
          },
          chequeDepositedDate: {
            required: requiredIf(function() {
              return this.bankInfoChequePayment === true;
            })
          }
        }
      },
      kyc: {
        documents: []
      },
      mdrPlan: {
        domesticDebitUpTo2000: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required
          },
          percentage: {
            minValue: minValue(0),
            required,
            maxValue: maxValue(100)
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required
          }
        },
        domesticDebitAbove2000: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required
          }
        },
        standardOrClassic: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required
          }
        },
        premiumOrPlatinum: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required
          }
        },
        superPremiumOrSignature: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required
          }
        },
        commercialOrCorporate: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required
          }
        },
        internationalDebitCard: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required
          }
        },
        internationalCreditCard: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required
          }
        },
        onus: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required
          }
        },
        mVisa: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required
          }
        },
        masterPass: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required
          }
        },
        cashAtPos: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required
          }
        }
      },
      SharingDiscountFee: {
        domesticDebitUpTo2000: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            }),
            maxValue: maxValue(100)
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        domesticDebitAbove2000: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        standardOrClassic: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        premiumOrPlatinum: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        superPremiumOrSignature: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        commercialOrCorporate: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        internationalDebitCard: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        internationalCreditCard: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        onus: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        mVisa: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        masterPass: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        cashAtPos: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            minValue: minValue(0),
            maxValue: maxValue(100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        }
      }
    },
    viewBinding: {
      partnersArr: {
        required: requiredIf(function() {
          return this.getPartnersVisiblity;
        }),
        $each: {
          name: {
            required,
            minLength: minLength(2),
            maxLength: maxLength(120),
            alphaNumericValidate
          },
          address: {
            minLength: minLength(2),
            maxLength: maxLength(120),
            required
          },
          pan: {
            required,
            panCard,
            maxLength: maxLength(10),
            minLength: minLength(10)
          },
          pin: {
            required,
            integer,
            minLength: minLength(6),
            maxLength: maxLength(7)
          },
          stateRefCode: {
            required,
            integer
          },
          stateRefLabel: {
            required
          },
          cityRefCode: {
            required,
            integer
          },
          cityRefLabel: {
            required
          },
          contactMobile: {
            required,
            integer,
            minLength: minLength(10),
            maxLength: maxLength(10)
          },
          contactEmail: {
            required,
            email
          }
        }
      }
    }
  },

  beforeMount() {
    // >>View binding
    this.viewBinding = {
      sharingModelCode: [
        {
          label: "No sharing",
          value: "N"
        },
        {
          label: "Transaction value model",
          value: "T"
        },
        {
          label: "MDR/cash@pos/rent",
          value: "M"
        }
      ],
      statementType: [
        {
          label: "E-Statement",
          value: "E"
        },
        {
          label: "Paper statement",
          value: "P"
        }
      ],
      statementFrequency: [
        {
          label: "Daily",
          value: "D"
        },
        {
          label: "Monthly",
          value: "M"
        },
        {
          label: "Quaterly",
          value: "Q"
        },
        {
          label: "Half yearly",
          value: "H"
        },
        {
          label: "Yearly",
          value: "Y"
        },
        {
          label: "None",
          value: "N"
        }
      ],
      partnersArr: [
        {
          name: "",
          address: "",
          pan: "",
          pin: null,
          cityRefCode: "",
          cityRefLabel: "",
          stateRefCode: "",
          stateRefLabel: "",
          contactMobile: "",
          contactEmail: ""
        }
      ]
    };
    //<< View binding
    this.fetchAllDropdownValuesFromMARSapi(
      this.merchant.salesInformation.institutionCode
    );
    /* Populating values from FOS */
    this.merchant.salesInformation.applicationNumber = Math.floor(
      Date.now() / 1000 + 22 * 10
    );

    this.merchant.companyInformation.constitution = this.propLeadDeatils.merchantType.marsMappingId;

    this.merchant.companyInformation.constitutionName = this.propLeadDeatils.merchantType.merchantTypeName;

    if (
      this.$PARTNERS_TAB_ENABLED_ITEMS.includes(
        this.merchant.companyInformation.constitution
      )
    ) {
      this.showPartnerstab = true;
    } else {
      this.showPartnerstab = false;
    }

    this.merchant.companyInformation.dbaName = this.propLeadDeatils.leadName;
    this.merchant.companyInformation.contactMobile = this.propLeadDeatils.contactNumber;
    this.merchant.companyInformation.contactName = this.propLeadDeatils.contactName;
    this.merchant.companyInformation.registeredAddress = this.propLeadDeatils.leadAddress;
    this.merchant.companyInformation.registeredPin = this.propLeadDeatils.pincode;
    this.merchant.companyInformation.contactName = this.propLeadDeatils.contactName;
    this.merchant.companyInformation.contactMobile = this.propLeadDeatils.contactNumber;
    this.merchant.paymentDetails.numberOfTerminals = this.propLeadDeatils.deviceCount;
    this.merchant.mdrPlan.domesticDebitUpTo2000.percentage = this.getShortLeadInfo.debitLessthanAmount;
    this.merchant.mdrPlan.domesticDebitAbove2000.percentage = this.getShortLeadInfo.debitGreaterthanAmount;
    this.merchant.mdrPlan.standardOrClassic.percentage = this.getShortLeadInfo.stdCC;
    this.merchant.mdrPlan.premiumOrPlatinum.percentage = this.getShortLeadInfo.premiumCC;
    this.merchant.mdrPlan.superPremiumOrSignature.percentage = this.getShortLeadInfo.superPremiumlCC;
    this.merchant.mdrPlan.commercialOrCorporate.percentage = this.getShortLeadInfo.corpCC;
    this.merchant.mdrPlan.internationalCreditCard.percentage = this.getShortLeadInfo.intlCC;
    /* Populating values from FOS */
    this.fetchAndCookDocuments();
  },

  methods: {
    ...mapActions("mars_regions", ["REGION_FROM_MARS"]),
    ...mapActions("mars_leadFrom", ["LEAD_FROM_FROM_MARS"]),
    ...mapActions("mars_salesPerson", ["SALES_PERSON_FROM_MARS"]),
    ...mapActions("mars_sharingPartner", ["SHARING_PARTNER_FROM_MARS"]),
    ...mapActions("mars_city", ["CITY_FROM_MARS"]),
    ...mapActions("mars_state", ["STATE_FROM_MARS"]),
    ...mapActions("mars_mcc", ["MCC_FROM_MARS"]),
    ...mapActions("mars_deviceModel", ["DEVICE_MODEL_FROM_MARS"]),
    ...mapActions("mars_rentalPlans", ["RENTAL_PLAN_FROM_MARS"]),
    ...mapActions("mars_ifsc", ["IFSC_FROM_MARS"]),
    ...mapActions("mars_mdrPlans", ["MDR_PLAN_FROM_MARS"]),
    ...mapActions("mars_bankList", ["BANK_LIST_FROM_MARS"]),
    ...mapActions("mars_networkProvider", ["NETWORK_PROVIDER"]),
    ...mapActions("mars_serviceProvider", ["SERVICE_PROVIDER"]),
    ...mapActions("mars_dataSubmit", [
      "MARS_DATA_SUBMIT_INTERNAL",
      "MARS_DATA_SUBMIT_EXTERNAL",
      "MARS_DATA_EXTERNAL_SUBMIT_RESPONSE",
      "FETCH_SAVED_DATA_FROM_OWN_DB"
    ]),
    toggleChequeImage() {
      this.toggleChequeImageResult = !this.toggleChequeImageResult;
    },
    fnDocumentUrl(documentUrl) {
      this.populatedDocumentUrl = documentUrl;
      this.showDocumentPreview = !this.showDocumentPreview;
    },

    /* IFSC bank search result */
    populateBankDetails() {
      let self = this;
      let ifscArr = [];
      self
        .IFSC_FROM_MARS(this.merchant.bankInformation.bankDetails.ifsc)
        .then(response => {
          if (response.status == 200) {
            this.merchant.bankInformation.bankDetails.bankName =
              self.ifscFromMars.bankName;
            this.merchant.bankInformation.bankDetails.branchName =
              self.ifscFromMars.branchName;
            this.merchant.bankInformation.bankDetails.micr =
              self.ifscFromMars.MICR;
          } else {
            this.$q.notify({
              color: "negative",
              position: "bottom-left",
              message: "Invalid IFSC code",
              icon: "clear"
            });
            this.merchant.bankInformation.bankDetails.ifsc = "";
            this.merchant.bankInformation.bankDetails.bankName = "";
            this.merchant.bankInformation.bankDetails.branchName = "";
            this.merchant.bankInformation.bankDetails.micr = "";
          }
        });
    },
    /* IFSC bank search result */

    /* MCC search result */
    partnerCitySearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.cityOptions, terms));
    },
    partnerCitySelected(item, index) {
      this.$v.viewBinding.partnersArr.$each.$iter[index].cityRefCode.$model =
        item.value;
      this.$v.viewBinding.partnersArr.$each.$iter[index].cityRefLabel.$model =
        item.label;
    },

    /* MCC search result */
    partnerStateSearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.stateOptions, terms));
    },
    partnerStateSelected(item, index) {
      this.$v.viewBinding.partnersArr.$each.$iter[index].stateRefCode.$model =
        item.value;
      this.$v.viewBinding.partnersArr.$each.$iter[index].stateRefLabel.$model =
        item.label;
    },
    /* MCC search result */

    /* MCC search result */
    mccSearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.mccSearchSet, terms));
    },
    mccSelected(item) {
      this.merchant.companyInformation.mccname = item.label;
      this.merchant.companyInformation.mcc = item.value;
    },
    /* MCC search result */

    /* City search result */
    residentCitySearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.cityOptions, terms));
    },
    residentCitySelected(item) {
      this.merchant.companyInformation.residentCityName = item.label;
      this.merchant.companyInformation.residentialCityRefCode = item.value;
    },
    /* City search result */

    /* State search result */
    residentStateSearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.stateOptions, terms));
    },
    residentStateSelected(item) {
      this.merchant.companyInformation.residentStateName = item.label;
      this.merchant.companyInformation.residentialStateRefCode = item.value;
    },
    /* State search result */

    /* Registered City search result */
    registeredCitySelected(item) {
      this.merchant.companyInformation.registeredCityName = item.label;
      this.merchant.companyInformation.registeredCityRefCode = item.value;
    },
    /* Registered City search result */

    /* Registered State search result */
    registeredStateSelected(item) {
      this.merchant.companyInformation.registeredStateName = item.label;
      this.merchant.companyInformation.registeredStateRefCode = item.value;
    },
    /* Registered State search result */

    /* Registered City search result */
    bankCitySelected(item) {
      this.merchant.bankInformation.bankDetails.bankCityName = item.label;
      this.merchant.bankInformation.bankDetails.bankCityRefCode = item.value;
    },
    /* Registered City search result */

    /* Registered State search result */
    bankStateSelected(item) {
      this.merchant.bankInformation.bankDetails.bankStateName = item.label;
      this.merchant.bankInformation.bankDetails.bankStateRefCode = item.value;
    },
    /* Registered State search result */

    COMMON_FILTER_FUNCTION(arraySet, terms) {
      return _.filter(arraySet, function(oo) {
        return (
          oo.label.toLowerCase().includes(terms.toLowerCase()) ||
          oo.value.toString().includes(terms.toString())
        );
      });
    },

    selectCurrentType() {
      this.merchant.paymentDetails.gracePeriod = "";
      this.merchant.paymentDetails.advanceRentCollected = "";
      this.merchant.paymentDetails.noOfMonthRentPaidInAdvance = "";
    },

    addMorePartnersSet() {
      let partnerObj = {
        name: "",
        address: "",
        pan: "",
        pin: "",
        cityRefCode: "",
        cityRefLabel: "",
        stateRefCode: "",
        stateRefLabel: "",
        contactMobile: "",
        contactEmail: ""
      };
      this.viewBinding.partnersArr.push(partnerObj);
    },
    removePartnerFromArr(item, index) {
      this.$delete(this.viewBinding.partnersArr, index);
    },
    validatebeforeNavigate(step) {
      if (step == "salesInformation") {
        this.$v.merchant.salesInformation.$touch();
        if (this.$v.merchant.salesInformation.$error) {
          this.$q.notify("Please review sales information fields again.");
        } else {
          // // TODO 1 => IOB
          // // else 2 => AB
          // if (this.merchant.salesInformation.institutionCode == 3) {
          //   // TODO S => Small
          //   // else O => others
          //   if (this.merchant.salesInformation.categoryType == "S") {
          //     this.merchant.mdrPlan.code = 44;
          //   } else {
          //     this.merchant.mdrPlan.code = 45;
          //   }
          // } else {
          //   // TODO S => Small
          //   // else O => others
          //   if (this.merchant.salesInformation.categoryType == "S") {
          //     this.merchant.mdrPlan.code = 40;
          //   } else {
          //     this.merchant.mdrPlan.code = 41;
          //   }
          // }
          // 3 => GPRS
          if (this.merchant.salesInformation.categoryType == "S") {
            //for UAT
            // this.merchant.mdrPlan.code = 44;
            // for production
            this.merchant.mdrPlan.code = 45;
          } else {
            // for UAT
            // this.merchant.mdrPlan.code = 45;
            // for production
            this.merchant.mdrPlan.code = 44;
          }
          this.error.salesInformation = false;
          this.saveCurrentChanges();
          this.$refs.stepper.next();
        }
      } else if (step == "companyInformation") {
        this.$v.merchant.companyInformation.$touch();
        if (this.$v.merchant.companyInformation.$error) {
          this.$q.notify("Please review company information fields again.");
        } else {
          this.error.companyInformation = false;
          if (
            this.$PARTNERS_TAB_ENABLED_ITEMS.includes(
              this.merchant.companyInformation.constitution
            )
          ) {
            this.saveCurrentChanges();
            this.$refs.stepper.next();
          } else {
            this.saveCurrentChanges();
            this.$refs.stepper.goToStep("fourth");
          }
        }
      } else if (step == "partners") {
        this.$v.viewBinding.partnersArr.$touch();
        if (this.$v.viewBinding.partnersArr.$error) {
          this.$q.notify("Please review partners fields again.");
        } else {
          this.error.partnerInformation = false;
          this.saveCurrentChanges();
          this.$refs.stepper.next();
        }
      } else if (step == "businessInformation") {
        this.$v.merchant.businessInformation.$touch();
        if (this.$v.merchant.businessInformation.$error) {
          this.$q.notify("Please review business information fields again.");
        } else {
          this.error.businessInformation = false;
          this.saveCurrentChanges();
          this.$refs.stepper.next();
        }
      } else if (step == "mdr") {
        this.$v.merchant.mdrPlan.$touch();
        if (this.$v.merchant.mdrPlan.$error) {
          this.$q.notify("Please review MDR plan fields fields again.");
          this.error.mdrPlan = false;
        } else if (this.$v.merchant.SharingDiscountFee.$error) {
          this.$q.notify("Please review sharing discount fee fields again.");
          this.error.sharingDiscountFee = false;
        } else {
          this.saveCurrentChanges();
          this.$refs.stepper.next();
        }
      } else if (step == "paymentDetails") {
        this.$v.merchant.paymentDetails.$touch();
        if (this.$v.merchant.paymentDetails.$error) {
          this.$q.notify("Please review payment details fields again.");
        } else {
          this.error.paymentDetails = false;
          this.saveCurrentChanges();
          this.$refs.stepper.next();
        }
      } else if (step == "bank") {
        this.$v.merchant.bankInformation.$touch();
        if (this.$v.merchant.bankInformation.$error) {
          this.$q.notify("Please review bank information fields again.");
        } else {
          this.error.bankInformation = false;
          this.saveCurrentChanges();
          this.$refs.stepper.next();
        }
      } else {
      }
    },

    fetchAllDropdownValuesFromMARSapi(institutionCode) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Setting data .."
      });
      let self = this;
      /* API call to fetch regions */
      self
        .REGION_FROM_MARS(institutionCode)
        .then(() => {
          self.regionOptions = [];
          return self.regionsFromMars.items.map(oo => {
            self.regionOptions.push({ label: oo.name, value: oo.code });
          });
        })
        .then(() => {
          /* API call to fetch sharing partner */
          return self
            .SHARING_PARTNER_FROM_MARS(institutionCode)
            .then(response => {
              self.sharingPartnerOptions = [];
              self.sharingPartnerFromMars.items.map(oo => {
                self.sharingPartnerOptions.push({
                  label: oo.name,
                  value: oo.code
                });
              });
            });
        })
        .then(() => {
          /* API call to fetch sharing partner */
          return self.LEAD_FROM_FROM_MARS(institutionCode).then(response => {
            self.leadFromOptions = [];
            self.leadFromInfoFromMars.items.map(oo => {
              self.leadFromOptions.push({ label: oo.name, value: oo.name });
            });
            // self.leadFromOptions = leadFrom;
          });
        })
        .then(() => {
          /* API call to fetch sales person */
          return self.SALES_PERSON_FROM_MARS(institutionCode).then(response => {
            self.salesPersonOptions = [];
            self.salesPersonFromMars.items.map(oo => {
              self.salesPersonOptions.push({ label: oo.name, value: oo.code });
            });
            // self.salesPersonOptions = salesPerson;
          });
        })
        .then(() => {
          /* API call to fetch city */
          return self.CITY_FROM_MARS().then(response => {
            self.cityOptions = [];
            self.cityFromMars.items.map(oo => {
              self.cityOptions.push({ label: oo.name, value: oo.code });
            });
            // self.cityOptions = city;
          });
        })
        .then(() => {
          /* API call to fetch state */
          return self.STATE_FROM_MARS().then(response => {
            self.stateOptions = [];
            self.stateFromMars.items.map(oo => {
              self.stateOptions.push({ label: oo.name, value: oo.code });
            });
            // self.stateOptions = stateArr;
          });
        })
        .then(() => {
          /* API call to fetch state */
          return self.MCC_FROM_MARS().then(response => {
            self.mccSearchSet = [];
            self.mccFromMars.items.map(oo => {
              self.mccSearchSet.push({
                label: oo.code + "-" + oo.name,
                value: oo.code
              });
            });
            // self.mccSearchSet = mccSubArr;
          });
        })
        .then(() => {
          /* API call to fetch device model */
          return self.DEVICE_MODEL_FROM_MARS(institutionCode).then(response => {
            self.terminalModelSet = [];
            self.deviceModelFromMars.items.map(oo => {
              self.terminalModelSet.push({ label: oo.name, value: oo.code });
            });
            // self.terminalModelSet = terminalModelArr;
          });
        })
        .then(() => {
          /* API call to fetch rental plan */
          return self.RENTAL_PLAN_FROM_MARS(institutionCode).then(response => {
            self.rentalPlanSet = [];
            self.rentalPlanFromMars.items.map(oo => {
              self.rentalPlanSet.push({ label: oo.name, value: oo.code });
            });
            // self.rentalPlanSet = rentalPlan;
          });
        })
        .then(() => {
          /* API call to fetch bank list */
          return self.BANK_LIST_FROM_MARS(institutionCode).then(response => {
            // let bankList = [];
            self.bankListFromMars.bankNames.map(oo => {
              self.bankListSet.push({ label: oo, value: oo });
            });
            // self.bankListSet = bankList;
          });
          return true;
        })
        .then(() => {
          /* API call to fetch bank list */
          return self.NETWORK_PROVIDER(institutionCode).then(response => {
            // let bankList = [];
            self.networkProviderFromMars.items.map(oo => {
              self.networkProviderListSet.push({
                label: oo.name,
                value: oo.code
              });
            });
            // self.networkProviderListSet = bankList;
          });
          return true;
        })
        .then(() => {
          /* API call to fetch bank list */
          return self.SERVICE_PROVIDER(institutionCode).then(response => {
            // let bankList = [];
            self.serviceProviderFromMars.items.map(oo => {
              self.serviceProviderListSet.push({
                label: oo.name,
                value: oo.code
              });
            });
            // self.bankListSet = bankList;
          });
          return true;
        })
        .then(() => {
          if (
            this.propLeadDeatils.marsFormSubmitAction == 1 ||
            this.propLeadDeatils.marsFormSubmitAction == 2
          ) {
            return this.FETCH_SAVED_DATA_FROM_OWN_DB({
              leadId: this.$route.params.id
            })
              .then(() => {
                //Date formatting for MARS
                return this.$set(
                  this.marsSavedDataFromInternal.salesInformation,
                  "applicationDate",
                  this.commonDateFormat(
                    this.marsSavedDataFromInternal.salesInformation
                      .applicationDate
                  )
                );
              })
              .then(() => {
                return this.$set(
                  this.marsSavedDataFromInternal.salesInformation,
                  "aggreementDate",
                  this.commonDateFormat(
                    this.marsSavedDataFromInternal.salesInformation
                      .aggreementDate
                  )
                );
              })
              .then(() => {
                return this.$set(
                  this.marsSavedDataFromInternal.salesInformation,
                  "loanDisbursementDate",
                  this.commonDateFormat(
                    this.marsSavedDataFromInternal.salesInformation
                      .loanDisbursementDate
                  )
                );
              })
              .then(() => {
                return this.$set(
                  this.marsSavedDataFromInternal.salesInformation,
                  "tenureStartDate",
                  this.commonDateFormat(
                    this.marsSavedDataFromInternal.salesInformation
                      .tenureStartDate
                  )
                );
              })
              .then(() => {
                return this.$set(
                  this.marsSavedDataFromInternal.companyInformation,
                  "establishYear",
                  this.commonDateFormat(
                    this.marsSavedDataFromInternal.companyInformation
                      .establishYear
                  )
                );
              })
              .then(() => {
                return this.$set(
                  this.marsSavedDataFromInternal.bankInformation
                    .collectionDetails,
                  "chequeDepositedDate",
                  this.commonDateFormat(
                    this.marsSavedDataFromInternal.bankInformation
                      .collectionDetails.chequeDepositedDate
                  )
                );
              })
              .then(() => {
                return this.$set(
                  this.marsSavedDataFromInternal.bankInformation
                    .collectionDetails,
                  "collectedDate",
                  this.commonDateFormat(
                    this.marsSavedDataFromInternal.bankInformation
                      .collectionDetails.collectedDate
                  )
                );
              })
              .then(() => {
                return this.$set(
                  this.marsSavedDataFromInternal.bankInformation
                    .collectionDetails,
                  "chequeDate",
                  this.commonDateFormat(
                    this.marsSavedDataFromInternal.bankInformation
                      .collectionDetails.chequeDate
                  )
                );
              })
              .then(() => {
                return this.$set(
                  this.marsSavedDataFromInternal.businessInformation,
                  "memberSince",
                  this.commonDateFormat(
                    this.marsSavedDataFromInternal.businessInformation
                      .memberSince
                  )
                );
              })
              .then(() => {
                this.holdPayment =
                  this.marsSavedDataFromInternal.holdPayment == null
                    ? ""
                    : this.marsSavedDataFromInternal.holdPayment;
                this.leadDataEntryRemarks =
                  this.marsSavedDataFromInternal.leadDataEntryRemarks == null
                    ? ""
                    : this.marsSavedDataFromInternal.leadDataEntryRemarks;
                this.merchant.salesInformation = this.marsSavedDataFromInternal.salesInformation;
                this.merchant.companyInformation = this.marsSavedDataFromInternal.companyInformation;
                this.merchant.businessInformation = this.marsSavedDataFromInternal.businessInformation;
                this.viewBinding.partnersArr = this.marsSavedDataFromInternal.partnerInformation;
                this.merchant.paymentDetails = this.marsSavedDataFromInternal.paymentDetails;
                this.merchant.bankInformation = this.marsSavedDataFromInternal.bankInformation;
                this.merchant.mdrPlan = this.marsSavedDataFromInternal.mdrPlan;
                if (this.marsSavedDataFromInternal.SharingDiscountFee != null) {
                  this.merchant.SharingDiscountFee = this.marsSavedDataFromInternal.sharingDiscountFee;
                }
                this.merchant.companyInformation.constitution = this.propLeadDeatils.merchantType.marsMappingId;
                this.merchant.companyInformation.constitutionName = this.propLeadDeatils.merchantType.merchantTypeName;
                if (
                  this.$PARTNERS_TAB_ENABLED_ITEMS.includes(
                    this.merchant.companyInformation.constitution
                  )
                ) {
                  this.showPartnerstab = true;
                } else {
                  this.showPartnerstab = false;
                }
              });
          } else {
            return true;
          }
        })
        .then(() => {
          this.merchant.paymentDetails.cashAtPosEnabled = this.propLeadDeatils
            .posEnable
            ? "Y"
            : "N";
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    // Restructure documents as per mars requirement
    fetchAndCookDocuments() {
      let self = this;
      self.merchant.kyc.documents.push({
        documentName: "Agreement",
        documentType: this.propLeadDeatils.merchantType.marsAgreementId,
        documentImage: [
          this.GLOBAL_FILE_FETCH_URL +
            "/" +
            this.propLeadDeatils.applicationFile
        ]
      });

      Object.keys(this.propLeadDeatils.leadDocuments).forEach(function(
        key,
        index
      ) {
        _.map(self.propLeadDeatils.leadDocuments[key], function(oo) {
          if (oo.uploadedDocuments.length > 0) {
            let assumeArr = [];
            _.map(oo.uploadedDocuments, function(doc) {
              assumeArr.push(self.GLOBAL_FILE_FETCH_URL + "/" + doc.fileName);
            });
            self.merchant.kyc.documents.push({
              documentName: oo.subDocumentType,
              documentType: oo.marsDocumentId,
              documentImage: assumeArr
            });
          }
        });
      });
    },

    saveCurrentChanges() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Saving data .."
      });
      this.$set(this.merchant, "leadId", this.$route.params.id);
      this.$set(
        this.merchant,
        "partnerInformation",
        this.viewBinding.partnersArr
      );
      this.MARS_DATA_SUBMIT_INTERNAL({ merchant: this.merchant, action: 1 })
        .then(response => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Saved successfully",
            icon: "thumb_up"
          });
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again",
            icon: "thumb_down"
          });
          this.$q.loading.hide();
        });
    },

    finalFormSubmit() {
      this.$v.merchant.$touch();
      if (this.$v.merchant.$error) {
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill all mandatory fields",
          icon: "info"
        });
      } else {
        let self = this;
        self.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Validating .."
        });
        const finalRequest = { action: 2, merchant: self.merchant };
        finalRequest.merchant.leadId = self.$route.params.id;
        finalRequest.merchant.leadDataEntryRemarks =
          finalRequest.leadDataEntryRemarks;
        finalRequest.merchant.holdPayment = finalRequest.holdPayment;

        if (
          self.$PARTNERS_TAB_ENABLED_ITEMS.includes(
            self.merchant.companyInformation.constitution
          )
        ) {
          finalRequest.merchant.partnerInformation =
            self.viewBinding.partnersArr;
        } else {
          finalRequest.merchant.partnerInformation = [];
        }
        /* API call to fetch regions */
        self
          .MARS_DATA_SUBMIT_INTERNAL(finalRequest)
          .then(response => {
            self.$q.loading.show({
              delay: 0, // ms
              spinnerColor: "purple-9",
              message: "Saved.. Sending data to mars"
            });
            delete finalRequest.merchant.leadId;
            delete finalRequest.action;
            delete finalRequest.merchant.leadDataEntryRemarks;
            delete finalRequest.merchant.holdPayment;
            delete finalRequest.merchant.companyInformation.constitutionName;
            self
              .MARS_DATA_SUBMIT_EXTERNAL({
                params: finalRequest,
                leadStatus: this.propLeadDeatils.leadStatus,
                refNumber: this.propLeadDeatils.merchantRefCode
              })
              .then(response => {
                let feed_paramaters;
                if (response.status == 204) {
                  feed_paramaters = {
                    applicationNumber: this.propLeadDeatils.applicationNumber,
                    merchantRefCode: this.propLeadDeatils.merchantRefCode
                  };
                } else {
                  feed_paramaters = response.body;
                }
                self.$q.loading.show({
                  delay: 0, // ms
                  spinnerColor: "purple-9",
                  message: "Great.. All set to go"
                });
                self
                  .MARS_DATA_EXTERNAL_SUBMIT_RESPONSE({
                    request: feed_paramaters,
                    leadId: self.$route.params.id
                  })
                  .then(response => {
                    self.$q.notify({
                      color: "positive",
                      position: "bottom",
                      message: "Successfully submitted to MARS",
                      icon: "thumb_up"
                    });
                    self.$router.push("/sat/lead/validation");
                    self.$q.loading.hide();
                  });
              })
              .catch(error => {
                this.merchant.companyInformation.constitutionName = this.propLeadDeatils.merchantType.merchantTypeName;
                //Date formatting for MARS
                this.$set(
                  finalRequest.merchant.salesInformation,
                  "applicationDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.applicationDate
                  )
                );

                this.$set(
                  finalRequest.merchant.salesInformation,
                  "aggreementDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.aggreementDate
                  )
                );

                this.$set(
                  finalRequest.merchant.salesInformation,
                  "loanDisbursementDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.loanDisbursementDate
                  )
                );

                this.$set(
                  finalRequest.merchant.salesInformation,
                  "tenureStartDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.tenureStartDate
                  )
                );

                this.$set(
                  finalRequest.merchant.companyInformation,
                  "establishYear",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.companyInformation.establishYear
                  )
                );

                this.$set(
                  finalRequest.merchant.bankInformation.collectionDetails,
                  "chequeDepositedDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.bankInformation.collectionDetails
                      .chequeDepositedDate
                  )
                );

                this.$set(
                  finalRequest.merchant.bankInformation.collectionDetails,
                  "collectedDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.bankInformation.collectionDetails
                      .collectedDate
                  )
                );

                this.$set(
                  finalRequest.merchant.bankInformation.collectionDetails,
                  "chequeDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.bankInformation.collectionDetails
                      .chequeDate
                  )
                );

                this.$set(
                  finalRequest.merchant.businessInformation,
                  "memberSince",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.businessInformation.memberSince
                  )
                );

                if (error.data.hasOwnProperty("errorDetails")) {
                  let OThis = this;
                  _.map(error.data.errorDetails, actual => {
                    let splitted = actual.field.split("/");
                    if (splitted[1].slice(0, 18) == "partnerInformation") {
                      let findPartnersErrorIndex = actual.field
                        .split("partnerInformation")[1]
                        .slice(1, 2);
                      let computeSplitted = splitted[splitted.length - 1];
                      let fieldErrorFound = eval(`
                        OThis.$v.viewBinding.partnersArr.$each.$iter[
                          ${findPartnersErrorIndex}
                        ].${computeSplitted}`);
                      fieldErrorFound.$model = "";
                      OThis.error.partnerInformation = true;
                    } else {
                      let splittingErrorField = `OThis.$v.${splitted.join(
                        "."
                      )}`;
                      let fieldErrorFound = eval(splittingErrorField);
                      fieldErrorFound.$model = "";
                      OThis.$set(OThis.error.tab, splitted[1], true);
                    }
                  });
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: `${error.data.message}`,
                    icon: "thumb_down"
                  });
                } else {
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: `${error.data.message}`,
                    icon: "thumb_down"
                  });
                }
                self.$q.loading.hide();
              });
          })
          .catch(() => {
            self.$q.loading.hide();
          });
      }
    },

    //Common function for data format
    commonDateFormat(selectedDate) {
      if (
        selectedDate == "" ||
        selectedDate == null ||
        selectedDate == "Invalid date"
      ) {
        return null;
      } else {
        return moment(selectedDate).format("YYYY-MM-DD");
      }
    },
    //Common function for data format
    commonDateFormatInvalidMARSformat(selectedDate) {
      if (
        selectedDate == "" ||
        selectedDate == null ||
        selectedDate == "Invalid date"
      ) {
        return null;
      } else {
        return moment(selectedDate, "DD/MM/YYYY").format("YYYY-MM-DD");
      }
    },
    marsRequiredFormattingofGST(val) {
      if (val == "") {
        this.merchant.businessInformation.gstId = null;
      } else {
        this.merchant.businessInformation.gstId = val;
      }
    },
    autoCompleteError(val1, val2) {
      val1.$touch();
      val2.$touch();
      if (val1.$anyError || val2.$anyError) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.border-1 {
  border: 1px solid #e5e5e5;
}

.q-custom-class {
  min-height: 270px;
}

.custom-z-index {
  z-index: 2;
}
</style>
