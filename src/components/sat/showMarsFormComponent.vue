<template>
  <div>
    <!-- Documents -->
    <div id="mainContainer" class="row">
      <!-- Documents proof -->
      <div id="leftSidePane" class="col-md-5 q-pa-xs largeCont" v-if="showDocumentPreview">
        <viewLeadDocumentsDataEntryComponent :propLeadDocumentInformation="propLeadDeatils.leadDocuments"
          :propGetShortInfo="propLeadDeatils" />
      </div>
      <!-- Document related form -->
      <div id="rightSidePane" class="col-md-7 q-pa-xs block relative merchant">
        <q-stepper color="purple-9" ref="stepper" contractable text alternative-labels>
          <q-step error-icon="warning" :error="error.tab.salesInformation" name="first" title="Sales" subtitle="Info">
            <!-- {{this.merchant.paymentDetails.amountCollected}} -->
            <div class="row gutter-sm">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" disable v-model.trim="leadSourceApp.sourceName" float-label="Lead Source*" />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" disable v-model.trim="deviceTypeApp.deviceName" float-label="Device Type*" />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select :class="{
    'readonly-select': propLeadDeatils.leadSource.sourceName === 'LS_TOHANDS'
  }" :disabled="this.propLeadDeatils.leadStatus == 102 || this.propLeadDeatils.leadSource.sourceName === 'LS_TOHANDS'"
                  :error="$v.merchant.salesInformation.institutionCode.$error" placeholder="Choose from the below"
                  color="grey-9" v-model.trim="merchant.salesInformation.institutionCode"
                  float-label="Institution Code*" :options="getinstitutionCode"
                  @input="fetchAllDropdownValuesFromMARSapi" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.institutionCode.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.institutionCode
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.institutionCode.$error">
                  <div v-if="
                      $v.merchant.salesInformation.institutionCode.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div v-if="merchant.salesInformation.institutionCode == 104" class="row gutter-sm q-my-xs">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.branchZone" float-label="ZONE*" :options="getAllZone"
                    @clear="fnClearZone" @input="fnFetchZone()" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.iaDistrict" float-label="IA_District*"
                    :options="getAllDistrict" @input="fnFetchBranchName()" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select disable placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.raDistrict" float-label="RA_District*"
                    :options="getAllDistrict" @clear="fnClearZone" @input="fnFetchZone()" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select disable placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.od1District" float-label="OD1_District*"
                    :options="getAllDistrict" @clear="fnClearZone" @input="fnFetchZone()" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select disable placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.od2District" float-label="OD2_District*"
                    :options="getAllDistrict" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9" v-model.trim="
                      merchant.additionalInfo.installationBranchCode
                    " float-label="InstallationBranchName*" :options="getAllBranchName" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" v-model.trim="merchant.additionalInfo.lorState"
                    float-label="IOR_STATE(type min 3 characters)*" placeholder="Start typing ..*">
                    <q-autocomplete separator @search="searchIorState" :debounce="10" :min-characters="3" />
                  </q-input>
                </div>

                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" v-model.trim="merchant.additionalInfo.pin" float-label="Pincode"
                    placeholder="Start typing ..*" @input="pincodeBasedDistrict">
                    <q-autocomplete separator @search="searchAxisBankPincode" :min-characters="3" />
                  </q-input>
                </div>

                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.state" float-label="State*"
                    @input="pincodeandDistrictBasedCity" :options="getPincodeBasedDistrict" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.city" float-label="City*" :options="getPincodeDistrict"
                    @input="citybasedlocation" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.iaLocation" float-label="IA_LOCATION*"
                    :options="getCityBasedLocation" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.iaSalutation" float-label="IA_Salution*"
                    :options="iaSalutationOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.iaGender" float-label="IA_Gender*"
                    :options="iaGenderOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.od1Salutation" float-label="OD1_Salutation*"
                    :options="od1SalutationOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.od1Gender" float-label="OD1_Gender*"
                    :options="od1GenderOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.od2Salutation" float-label="OD2_Salutation*"
                    :options="od2SalutationOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.od2Gender" float-label="OD2_Gender*"
                    :options="od2GenderOptions" />
                </div>
              </div>

              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select @blur="$v.merchant.salesInformation.applicationType.$touch"
                  :error="$v.merchant.salesInformation.applicationType.$error" placeholder="Choose from the below*"
                  color="grey-9" v-model.trim="merchant.salesInformation.applicationType"
                  float-label="Application Type*" :options="applicationTypeOptions" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.applicationType.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.applicationType
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.applicationType.$error">
                  <div v-if="
                      $v.merchant.salesInformation.applicationType.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input readonly @blur="$v.merchant.salesInformation.applicationNumber.$touch"
                  :error="$v.merchant.salesInformation.applicationNumber.$error" color="grey-9"
                  v-model.trim="merchant.salesInformation.applicationNumber" float-label="Application Number*"
                  placeholder="Application Number*" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.applicationNumber
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.applicationNumber
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.applicationNumber.$error">
                  <div v-if="
                      $v.merchant.salesInformation.applicationNumber.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.salesInformation.applicationDate.$touch"
                  :error="$v.merchant.salesInformation.applicationDate.$error" color="grey-9" format="DD/MM/YYYY"
                  format-model="number" modal v-model.trim="merchant.salesInformation.applicationDate"
                  float-label="Application Date*" placeholder="Application Date*" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.applicationDate.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.applicationDate
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.applicationDate.$error">
                  <div v-if="
                      $v.merchant.salesInformation.applicationDate.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input format="DD/MM/YYYY" format-model="number"
                  @blur="$v.merchant.salesInformation.aggreementDate.$touch"
                  :error="$v.merchant.salesInformation.aggreementDate.$error" color="grey-9" modal
                  v-model.trim="merchant.salesInformation.aggreementDate" float-label="Agreement Date*"
                  placeholder="Agreement Date*" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.aggreementDate.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.aggreementDate
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.aggreementDate.$error">
                  <div v-if="
                      $v.merchant.salesInformation.aggreementDate.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select @blur="$v.merchant.salesInformation.merchantType.$touch"
                  :error="$v.merchant.salesInformation.merchantType.$error" placeholder="Choose from the below*"
                  color="grey-9" v-model.trim="merchant.salesInformation.merchantType" float-label="Merchant Type*"
                  :options="merchantTypeOptions" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.merchantType.alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.merchantType" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.merchantType.$error">
                  <div v-if="
                      $v.merchant.salesInformation.merchantType.$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select @blur="$v.merchant.salesInformation.categoryType.$touch"
                  :error="$v.merchant.salesInformation.categoryType.$error" placeholder="Choose from the below*"
                  color="grey-9" v-model.trim="merchant.salesInformation.categoryType" float-label="Category Type*"
                  :options="categoryTypeOptions" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.categoryType.alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.categoryType" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.categoryType.$error">
                  <div v-if="
                      $v.merchant.salesInformation.categoryType.$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select placeholder="Choose from the below*" color="grey-9"
                  @blur="$v.merchant.salesInformation.region.$touch" :error="$v.merchant.salesInformation.region.$error"
                  v-model.trim="merchant.salesInformation.region" float-label="Region*" :options="regionOptions" />
                <div class="text-negative" v-if="error.field.merchant.salesInformation.region.alert">
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.region" />
                </div>

                <div class="text-negative q-py-xs group text-caption" v-if="$v.merchant.salesInformation.region.$error">
                  <div v-if="$v.merchant.salesInformation.region.$params.required">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select placeholder="Choose from the below*" color="grey-9" filter clearable
                  @blur="$v.merchant.salesInformation.salesPersonName.$touch"
                  :error="$v.merchant.salesInformation.salesPersonName.$error"
                  v-model.trim="merchant.salesInformation.salesPersonName" float-label="Sales Person*"
                  :options="salesPersonOptions" />

                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.salesPersonName.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.salesPersonName
                    " />
                </div>

                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.salesPersonName.$error">
                  <div v-if="
                      $v.merchant.salesInformation.salesPersonName.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select placeholder="Choose from the below*" color="grey-9"
                  @blur="$v.merchant.salesInformation.leadFrom.$touch"
                  :error="$v.merchant.salesInformation.leadFrom.$error"
                  v-model.trim="merchant.salesInformation.leadFrom" float-label="Lead From*" :options="leadFromOptions"
                  :disabled="this.propLeadDeatils.leadSource.sourceName === 'LS_TOHANDS'" :class="{
    'readonly-select': propLeadDeatils.leadSource.sourceName === 'LS_TOHANDS'
  }" />
                <div class="text-negative" v-if="error.field.merchant.salesInformation.leadFrom.alert">
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.leadFrom" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="$v.merchant.salesInformation.leadFrom.$error">
                  <div v-if="
                      $v.merchant.salesInformation.leadFrom.$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>

              <div class="fillingTypesOptions">
                <p class="text-caption">Sharing Model</p>
                <div v-for="(item, index) in viewBinding.sharingModelCode" :key="index">
                  <q-radio color="grey-9" v-model.trim="merchant.salesInformation.sharingModelCode" :val="item.value"
                    :label="item.label" @input="sharemodebasedonSharingMode()" />
                </div>
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.sharingModelCode.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.sharingModelCode
                    " />
                </div>
              </div>
            </div>
            <!-- T => Transaction value model -->
            <div v-if="merchant.salesInformation.sharingModelCode == 'T'" class="row gutter-sm q-my-xs">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select @blur="$v.merchant.salesInformation.sharingPartnerCode.$touch" :error="
                    $v.merchant.salesInformation.sharingPartnerCode.$error
                  " placeholder="Choose from the below*" color="grey-9"
                  v-model.trim="merchant.salesInformation.sharingPartnerCode" float-label="Sharing partner*"
                  :options="sharingPartnerCode" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.sharingPartnerCode.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.sharingPartnerCode
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.sharingPartnerCode.$error">
                  <div v-if="
                      $v.merchant.salesInformation.sharingPartnerCode.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.salesInformation.dailyFixedAmount.$touch"
                  :error="$v.merchant.salesInformation.dailyFixedAmount.$error" color="grey-9"
                  v-model.trim="merchant.salesInformation.dailyFixedAmount" float-label="Daily fixed amount*"
                  type="number" placeholder="Daily fixed amount*" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.dailyFixedAmount.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.dailyFixedAmount
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.dailyFixedAmount.$error">
                  <div v-if="
                      $v.merchant.salesInformation.dailyFixedAmount.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div v-if="
                      $v.merchant.salesInformation.dailyFixedAmount.$params
                        .minValue ||
                      $v.merchant.salesInformation.dailyFixedAmount.$params
                        .maxValue
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.salesInformation.dailyFixedAmount.$params
                    .minValue.min
                    }}
                    and
                    {{
                    $v.merchant.salesInformation.dailyFixedAmount.$params
                    .maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="
                    $v.merchant.salesInformation.loanDisbursementPercentage
                      .$touch;
                  " :error="
                    $v.merchant.salesInformation.loanDisbursementPercentage
                      .$error
                  " color="grey-9" v-model.trim="
                    merchant.salesInformation.loanDisbursementPercentage
                  " float-label="Percentage*" type="number" placeholder="Percentage*" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation
                      .loanDisbursementPercentage.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation
                        .loanDisbursementPercentage
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.salesInformation.loanDisbursementPercentage
                      .$error
                  ">
                  <div v-if="
                      $v.merchant.salesInformation.loanDisbursementPercentage
                        .$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div v-if="
                      $v.merchant.salesInformation.loanDisbursementPercentage
                        .$params.minValue ||
                      $v.merchant.salesInformation.loanDisbursementPercentage
                        .$params.maxValue
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.salesInformation.loanDisbursementPercentage
                    .$params.minValue.min
                    }}
                    and
                    {{
                    $v.merchant.salesInformation.loanDisbursementPercentage
                    .$params.maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="
                    $v.merchant.salesInformation.loanDisbursementAmount.$touch
                  " :error="
                    $v.merchant.salesInformation.loanDisbursementAmount.$error
                  " color="grey-9" v-model.trim="
                    merchant.salesInformation.loanDisbursementAmount
                  " float-label="Loan disbursement value*" type="number" placeholder="Loan disbursement value*" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.loanDisbursementAmount
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation
                        .loanDisbursementAmount
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.salesInformation.loanDisbursementAmount.$error
                  ">
                  <div v-if="
                      $v.merchant.salesInformation.loanDisbursementAmount
                        .$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div v-if="
                      $v.merchant.salesInformation.loanDisbursementAmount
                        .$params.minValue ||
                      $v.merchant.salesInformation.loanDisbursementAmount
                        .$params.maxValue
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.salesInformation.loanDisbursementAmount
                    .$params.minValue.min
                    }}
                    and
                    {{
                    $v.merchant.salesInformation.loanDisbursementAmount
                    .$params.maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input format="DD/MM/YYYY" format-model="number" @blur="
                    $v.merchant.salesInformation.loanDisbursementDate.$touch
                  " :error="
                    $v.merchant.salesInformation.loanDisbursementDate.$error
                  " color="grey-9" modal v-model.trim="merchant.salesInformation.loanDisbursementDate"
                  float-label="Disbursement Date*" placeholder="Disbursement Date*" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.loanDisbursementDate
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.loanDisbursementDate
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.salesInformation.loanDisbursementDate.$error
                  ">
                  <div v-if="
                      $v.merchant.salesInformation.loanDisbursementDate.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.salesInformation.tenureMonth.$touch"
                  :error="$v.merchant.salesInformation.tenureMonth.$error" color="grey-9"
                  v-model.trim="merchant.salesInformation.tenureMonth" float-label="Tenure (in months)*" type="number"
                  placeholder="Tenure (in months)*" />
                <div class="text-negative" v-if="error.field.merchant.salesInformation.tenureMonth.alert">
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.tenureMonth" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.tenureMonth.$error">
                  <div v-if="
                      $v.merchant.salesInformation.tenureMonth.$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.salesInformation.tenureDay.$touch"
                  :error="$v.merchant.salesInformation.tenureDay.$error" color="grey-9"
                  v-model.trim="merchant.salesInformation.tenureDay" float-label="Tenure (in days)*" type="number"
                  placeholder="Tenure (in days)*" />
                <div class="text-negative" v-if="error.field.merchant.salesInformation.tenureDay.alert">
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.tenureDay" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="$v.merchant.salesInformation.tenureDay.$error">
                  <div v-if="
                      $v.merchant.salesInformation.tenureDay.$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input format="DD/MM/YYYY" format-model="number"
                  @blur="$v.merchant.salesInformation.tenureStartDate.$touch"
                  :error="$v.merchant.salesInformation.tenureStartDate.$error" color="grey-9" modal
                  v-model.trim="merchant.salesInformation.tenureStartDate" float-label="Start Date*"
                  placeholder="Tenure Start Date*" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.tenureStartDate.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.tenureStartDate
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.tenureStartDate.$error">
                  <div v-if="
                      $v.merchant.salesInformation.tenureStartDate.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
            </div>
            <!-- M => MDR/cash@pos/rent -->
            <div v-if="merchant.salesInformation.sharingModelCode == 'M'" class="row gutter-sm q-my-xs">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select @blur="$v.merchant.salesInformation.sharingPartnerCode.$touch" :error="
                    $v.merchant.salesInformation.sharingPartnerCode.$error
                  " placeholder="Choose from the below*" color="grey-9"
                  v-model.trim="merchant.salesInformation.sharingPartnerCode" float-label="Sharing partner*"
                  :options="sharingPartnerCode" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.sharingPartnerCode
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.sharingPartnerCode
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.sharingPartnerCode.$error">
                  <div v-if="
                      $v.merchant.salesInformation.sharingPartnerCode.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.salesInformation.rentPercentage.$touch"
                  :error="$v.merchant.salesInformation.rentPercentage.$error" color="grey-9"
                  v-model.trim="merchant.salesInformation.rentPercentage" float-label="Rent %*" type="number"
                  placeholder="Rent %*" />
                <div class="text-negative" v-if="
                    error.field.merchant.salesInformation.rentPercentage.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.salesInformation.rentPercentage
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.salesInformation.rentPercentage.$error">
                  <div v-if="
                      $v.merchant.salesInformation.rentPercentage.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div v-if="
                      $v.merchant.salesInformation.rentPercentage.$params
                        .minValue ||
                      $v.merchant.salesInformation.rentPercentage.$params
                        .maxValue
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.salesInformation.rentPercentage.$params
                    .minValue.min
                    }}
                    and
                    {{
                    $v.merchant.salesInformation.rentPercentage.$params
                    .maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.salesInformation.rentFixed.$touch"
                  :error="$v.merchant.salesInformation.rentFixed.$error" color="grey-9"
                  v-model.trim="merchant.salesInformation.rentFixed" float-label="Rent fixed*" type="number"
                  placeholder="Rent fixed*" />
                <div class="text-negative" v-if="error.field.merchant.salesInformation.rentFixed.alert">
                  <MarsErrorResponse :error="error.field.merchant.salesInformation.rentFixed" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="$v.merchant.salesInformation.rentFixed.$error">
                  <div v-if="
                      $v.merchant.salesInformation.rentFixed.$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div v-if="
                      $v.merchant.salesInformation.rentFixed.$params.minValue ||
                      $v.merchant.salesInformation.rentFixed.$params.maxValue
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.salesInformation.rentFixed.$params.minValue
                    .min
                    }}
                    and
                    {{
                    $v.merchant.salesInformation.rentFixed.$params.maxValue
                    .max
                    }}
                  </div>
                </div>
              </div>
            </div>
            <!-- Navigation for this step at the end of QStep-->
            <q-stepper-navigation>
              <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('salesInformation')"
                label="Continue" />
              <q-btn color="amber-10" class="q-ma-xs" icon="inbox" label="Save Partial" @click="saveCurrentChanges()" />
              <q-btn color="negative" class="q-ma-xs" icon="backspace" label="Back to Document Validation"
                @click="goBackToDocumentVerificationStage()" />
            </q-stepper-navigation>
          </q-step>
          <q-step error-icon="warning" name="second" :error="error.tab.companyInformation" title="Details">
            <div class="row gutter-sm">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input type="text" @blur="$v.merchant.companyInformation.legalName.$touch"
                  :error="$v.merchant.companyInformation.legalName.$error" color="grey-9"
                  v-model.trim="merchant.companyInformation.legalName" float-label="Legal Name*"
                  placeholder="Legal Name*" />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.legalName.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.legalName" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.legalName.$error">
                  <!-- <div
                    v-if="
                      $v.merchant.companyInformation.legalName.$params.required
                    "
                  >
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Only digits and alphabets are allowed
                  </div> -->
                  <!-- <div v-if="!/^[a-zA-Z\s]*$/.test(merchant.companyInformation.legalName)"> -->
                  <div v-if="
                      !/^[a-zA-Z0-9\s]*$/.test(
                        merchant.companyInformation.legalName
                      )
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Only
                    AlphaNumeric and spaces are allowed.
                  </div>
                  <div v-if="
                      $v.merchant.companyInformation.legalName.$params
                        .minLength ||
                      $v.merchant.companyInformation.legalName.$params.maxLength
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.companyInformation.legalName.$params.minLength
                    .min
                    }}
                    and
                    {{
                    $v.merchant.companyInformation.legalName.$params.maxLength
                    .max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.companyInformation.dbaName.$touch"
                  :error="$v.merchant.companyInformation.dbaName.$error" color="grey-9"
                  v-model.trim="merchant.companyInformation.dbaName" float-label="DBA Name*" placeholder="DBA Name*" />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.dbaName.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.dbaName" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="$v.merchant.companyInformation.dbaName.$error">
                  <div v-if="
                      $v.merchant.companyInformation.dbaName.$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Only digits and alphabets are allowed
                  </div>
                  <div v-if="
                      $v.merchant.companyInformation.dbaName.$params
                        .minLength ||
                      $v.merchant.companyInformation.dbaName.$params.maxLength
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.companyInformation.dbaName.$params.minLength
                    .min
                    }}
                    and
                    {{
                    $v.merchant.companyInformation.dbaName.$params.maxLength
                    .max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="text-caption">SMS Enable or Disable?</p>
                <div class="group">
                  <q-radio @blur="$v.merchant.companyInformation.smsFlag.$touch"
                    :error="$v.merchant.companyInformation.smsFlag.$error" v-for="(item, index) in smsFlagOptions"
                    :key="index" color="grey-9" v-model.trim="merchant.companyInformation.smsFlag" :val="item.value"
                    :label="item.label" />
                  <div class="text-negative" v-if="error.field.merchant.companyInformation.smsFlag.alert">
                    <MarsErrorResponse :error="error.field.merchant.companyInformation.smsFlag" />
                  </div>
                  <div class="text-negative q-py-xs group text-caption"
                    v-if="$v.merchant.companyInformation.smsFlag.$error">
                    <div>
                      <q-icon color="negative" name="warning" />&nbsp;Required
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" float-label="Registered Address* (max 120 characters)"
                  placeholder="Registered Address*" v-model.trim="merchant.companyInformation.registeredAddress" @blur="
                    $v.merchant.companyInformation.registeredAddress.$touch
                  " :error="
                    $v.merchant.companyInformation.registeredAddress.$error
                  " />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.registeredAddress
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.registeredAddress
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.registeredAddress.$error">
                  <div v-if="
                      $v.merchant.companyInformation.registeredAddress.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Only digits and alphabets are allowed
                  </div>
                  <div v-if="
                      $v.merchant.companyInformation.registeredAddress.$params
                        .minLength ||
                      $v.merchant.companyInformation.registeredAddress.$params
                        .maxLength
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.companyInformation.registeredAddress.$params
                    .minLength.min
                    }}
                    and
                    {{
                    $v.merchant.companyInformation.registeredAddress.$params
                    .maxLength.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" type="text" @blur="$v.merchant.companyInformation.cityzone.$touch"
                  :error="$v.merchant.companyInformation.cityzone.$error"
                  v-model.trim="merchant.companyInformation.cityzone" float-label="Merchant City Zone"
                  placeholder="Merchant City Zone" />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.cityzone.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.cityzone" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.cityzone.$error">
                  <div v-if="
                      !/^[a-zA-Z\s]*$/.test(
                        merchant.companyInformation.cityzone
                      )
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Only
                    Alphabets and spaces are allowed.
                  </div>
                  <div v-if="
                      $v.merchant.companyInformation.cityzone.$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="fnClrRegisteredCity" :error="
                    autoCompleteError(
                      $v.merchant.companyInformation.registeredCityRefCode,
                      $v.merchant.companyInformation.registeredCityName
                    )
                  " color="grey-9" v-model.trim="merchant.companyInformation.registeredCityName"
                  @input="fninputTyping($event, 1)" float-label="Registered city (type min 3 characters)*"
                  placeholder="Start typing ..*">
                  <q-autocomplete separator @search="residentCitySearch" :debounce="10" :min-characters="3"
                    @selected="registeredCitySelected" />
                </q-input>
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation
                      .registeredCityRefCode.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation
                        .registeredCityRefCode
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.companyInformation.registeredCityRefCode
                      .$error ||
                    $v.merchant.companyInformation.registeredCityName.$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Type and choose from the suggestions
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select @blur="$v.merchant.companyInformation.statezone.$touch"
                  :error="$v.merchant.companyInformation.statezone.$error" placeholder="Choose from the below*"
                  color="grey-9" v-model.trim="merchant.companyInformation.statezone"
                  float-label=" Merchant State Zone*" :options="statezoneOptions" />

                <div class="text-negative" v-if="error.field.merchant.companyInformation.statezone.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.statezone" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.statezone.$error">
                  <div v-if="
                      $v.merchant.companyInformation.statezone.$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="fnClrRegisteredState" :error="
                    autoCompleteError(
                      $v.merchant.companyInformation.registeredStateRefCode,
                      $v.merchant.companyInformation.registeredStateName
                    )
                  " color="grey-9" v-model.trim="merchant.companyInformation.registeredStateName"
                  @input="fninputTyping($event, 2)" float-label="Registered state (type min 3 characters)*"
                  placeholder="Start typing ..*">
                  <q-autocomplete separator @search="residentStateSearch" :debounce="10" :min-characters="1"
                    @selected="registeredStateSelected" />
                </q-input>
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation
                      .registeredStateRefCode.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation
                        .registeredStateRefCode
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.companyInformation.registeredStateRefCode
                      .$error ||
                    $v.merchant.companyInformation.registeredStateName.$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Type and choose from the suggestions
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.companyInformation.registeredPin.$touch"
                  :error="$v.merchant.companyInformation.registeredPin.$error" color="grey-9" type="number"
                  v-model.trim="merchant.companyInformation.registeredPin" float-label="PIN*" placeholder="PIN*" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.registeredPin.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.registeredPin
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.registeredPin.$error">
                  <div v-if="
                      $v.merchant.companyInformation.registeredPin.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div v-if="
                      $v.merchant.companyInformation.registeredPin.$params
                        .minLength
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.companyInformation.registeredPin.$params
                    .minLength.min
                    }}
                    and
                    {{
                    $v.merchant.companyInformation.registeredPin.$params
                    .maxLength.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select @blur="$v.merchant.companyInformation.constitutionName.$touch" :error="
                    $v.merchant.companyInformation.constitutionName.$error
                  " placeholder="Choose from the below*" color="grey-9"
                  v-model.trim="merchant.companyInformation.constitutionName" float-label="Type of Business Entity*"
                  :options="merchantOptions" />

                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.constitutionName
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.constitutionName
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.constitutionName.$error">
                  <div v-if="
                      $v.merchant.companyInformation.constitutionName.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input format="DD/MM/YYYY" format-model="number" color="grey-9" modal
                  @blur="$v.merchant.companyInformation.establishYear.$touch"
                  :error="$v.merchant.companyInformation.establishYear.$error"
                  v-model.trim="merchant.companyInformation.establishYear" float-label="Year of Establishment*"
                  placeholder="Year of Establishment*" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.establishYear.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.establishYear
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.establishYear.$error">
                  <div v-if="
                      $v.merchant.companyInformation.establishYear.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" @blur="$v.merchant.companyInformation.registerNumber.$touch"
                  :error="$v.merchant.companyInformation.registerNumber.$error"
                  v-model.trim="merchant.companyInformation.registerNumber" float-label="Establish Number*"
                  placeholder="Establish Number*" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.registerNumber.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.registerNumber
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.registerNumber.$error">
                  <div v-if="
                      $v.merchant.companyInformation.registerNumber.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Accepts alphanumeric values
                  </div>
                  <div v-if="
                      $v.merchant.companyInformation.registerNumber.$params
                        .minLength
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.companyInformation.registerNumber.$params
                    .minLength.min
                    }}
                    and
                    {{
                    $v.merchant.companyInformation.registerNumber.$params
                    .maxLength.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.companyInformation.tin.$touch"
                  :error="$v.merchant.companyInformation.tin.$error" color="grey-9"
                  v-model.trim="merchant.companyInformation.tin" float-label="TIN" placeholder="TIN" />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.tin.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.tin" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="$v.merchant.companyInformation.tin.$error">
                  <div v-if="$v.merchant.companyInformation.tin.$params.required">
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    provide valid TIN
                  </div>
                  <div v-if="$v.merchant.companyInformation.tin.$params.minLength">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.companyInformation.tin.$params.minLength.min
                    }}
                    and
                    {{
                    $v.merchant.companyInformation.tin.$params.maxLength.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input upper-case @blur="$v.merchant.companyInformation.pan.$touch"
                  :error="$v.merchant.companyInformation.pan.$error" color="grey-9"
                  v-model.trim="merchant.companyInformation.pan" float-label="Company PAN*"
                  placeholder="Company PAN*" />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.pan.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.pan" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="$v.merchant.companyInformation.pan.$error">
                  <div v-if="$v.merchant.companyInformation.pan.$params.required">
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    provide valid PAN
                  </div>
                  <div v-if="$v.merchant.companyInformation.pan.$params.minLength">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.companyInformation.pan.$params.minLength.min
                    }}
                    and
                    {{
                    $v.merchant.companyInformation.pan.$params.maxLength.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input upper-case @blur="$v.merchant.companyInformation.tan.$touch"
                  :error="$v.merchant.companyInformation.tan.$error" color="grey-9"
                  v-model.trim="merchant.companyInformation.tan" float-label="TAN" placeholder="TAN" />
                <div class="text-negative" v-if="error.field.merchant.companyInformation.tan.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.tan" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="$v.merchant.companyInformation.tan.$error">
                  <div v-if="$v.merchant.companyInformation.tan.$params.required">
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    provide valid TAN
                  </div>
                  <div v-if="$v.merchant.companyInformation.tan.$params.minLength">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.companyInformation.tan.$params.minLength.min
                    }}
                    and
                    {{
                    $v.merchant.companyInformation.tan.$params.maxLength.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" v-model.trim="merchant.companyInformation.businessNature"
                  float-label="Nature of Business" placeholder="Nature of Business" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.businessNature.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.businessNature
                    " />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select placeholder="Choose from the below*" color="grey-9"
                  v-model.trim="merchant.companyInformation.businessType" float-label="Type of Business"
                  :options="businessTypeOptions" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.businessType.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.businessType
                    " />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.companyInformation.mcc.$touch" :error="
                    autoCompleteError(
                      $v.merchant.companyInformation.mcc,
                      $v.merchant.companyInformation.mccname
                    )
                  " color="grey-9" v-model.trim="merchant.companyInformation.mccname"
                  float-label="MCC (type min 3 characters)" placeholder="Start typing ..*">
                  <q-autocomplete separator @search="mccSearch" :debounce="10" :min-characters="3"
                    @selected="mccSelected" />
                </q-input>
                <div class="text-negative" v-if="error.field.merchant.companyInformation.mcc.alert">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.mcc" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.companyInformation.mcc.$error ||
                    $v.merchant.companyInformation.mccname.$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Type and choose from the suggestions
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="
                    $v.merchant.companyInformation.residentialAddress.$touch
                  " :error="
                    $v.merchant.companyInformation.residentialAddress.$error
                  " color="grey-9" v-model.trim="merchant.companyInformation.residentialAddress"
                  float-label="Residential Address* (max 120 characters)" placeholder="Residential Address*" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.residentialAddress
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.residentialAddress
                    " />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.companyInformation.residentialPin.$touch"
                  :error="$v.merchant.companyInformation.residentialPin.$error" color="grey-9" type="number"
                  v-model.trim="merchant.companyInformation.residentialPin" float-label="Pincode*"
                  placeholder="Pincode*" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.residentialPin.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.residentialPin
                    " />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="
                    $v.merchant.companyInformation.residentialCityRefCode.$touch
                  " :error="
                    autoCompleteError(
                      $v.merchant.companyInformation.residentialCityRefCode,
                      $v.merchant.companyInformation.residentCityName
                    )
                  " color="grey-9" v-model.trim="merchant.companyInformation.residentCityName"
                  float-label="City (type min 3 characters)*" placeholder="Start typing ..*">
                  <q-autocomplete separator @search="residentCitySearch" :debounce="10" :min-characters="3"
                    @selected="residentCitySelected" />
                </q-input>
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation
                      .residentialCityRefCode.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation
                        .residentialCityRefCode
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.companyInformation.residentialCityRefCode
                      .$error ||
                    $v.merchant.companyInformation.residentCityName.$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Type and choose from the suggestions
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="
                    $v.merchant.companyInformation.residentialStateRefCode
                      .$touch;
                  " :error="
                    autoCompleteError(
                      $v.merchant.companyInformation.residentialStateRefCode,
                      $v.merchant.companyInformation.residentStateName
                    )
                  " color="grey-9" v-model.trim="merchant.companyInformation.residentStateName"
                  float-label="State (type min 3 characters)*" placeholder="Start typing ..*">
                  <q-autocomplete separator @search="residentStateSearch" :debounce="10" :min-characters="1"
                    @selected="residentStateSelected" />
                </q-input>
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation
                      .residentialStateRefCode.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation
                        .residentialStateRefCode
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.companyInformation.residentialStateRefCode
                      .$error ||
                    $v.merchant.companyInformation.residentStateName.$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Type and choose from the suggestions
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.companyInformation.contactName.$touch"
                  :error="$v.merchant.companyInformation.contactName.$error"
                  onkeypress="return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)"
                  color="grey-9" v-model.trim="merchant.companyInformation.contactName" float-label="Contact Name*"
                  placeholder="Contact Name*" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.contactName.alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.companyInformation.contactName" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.contactName.$error">
                  <div v-if="
                      $v.merchant.companyInformation.contactName.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div v-if="
                      $v.merchant.companyInformation.contactName.$params
                        .minLength
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.companyInformation.contactName.$params
                    .minLength.min
                    }}
                    and
                    {{
                    $v.merchant.companyInformation.contactName.$params
                    .maxLength.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.companyInformation.contactMobile.$touch"
                  :error="$v.merchant.companyInformation.contactMobile.$error" color="grey-9"
                  v-model.trim="merchant.companyInformation.contactMobile" float-label="Contact mobile*"
                  placeholder="Contact Mobile*" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.contactMobile.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.contactMobile
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.contactMobile.$error">
                  <div v-if="
                      $v.merchant.companyInformation.contactMobile.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div v-if="
                      $v.merchant.companyInformation.contactMobile.$params
                        .minLength
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.companyInformation.contactMobile.$params
                    .minLength.min
                    }}
                    and
                    {{
                    $v.merchant.companyInformation.contactMobile.$params
                    .maxLength.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" type="tel" @blur="
                    $v.merchant.companyInformation.contactAlternateMobile.$touch
                  " :error="
                    $v.merchant.companyInformation.contactAlternateMobile.$error
                  " v-model.trim="
                    merchant.companyInformation.contactAlternateMobile
                  " float-label="Contact Alt Mobile" placeholder="Contact Alt Mobile" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation
                      .contactAlternateMobile.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation
                        .contactAlternateMobile
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.companyInformation.contactAlternateMobile.$error
                  ">
                  <div v-if="
                      $v.merchant.companyInformation.contactAlternateMobile
                        .$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div v-if="
                      $v.merchant.companyInformation.contactAlternateMobile
                        .$params.minLength
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.companyInformation.contactAlternateMobile
                    .$params.minLength.min
                    }}
                    and
                    {{
                    $v.merchant.companyInformation.contactAlternateMobile
                    .$params.maxLength.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" type="tel" @blur="$v.merchant.companyInformation.contactPhone.$touch"
                  :error="$v.merchant.companyInformation.contactPhone.$error"
                  v-model.trim="merchant.companyInformation.contactPhone" float-label="Contact Phone* (12 digits)"
                  placeholder="Contact Phone* (12 digits)" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.contactPhone.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.contactPhone
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.contactPhone.$error">
                  <div v-if="
                      $v.merchant.companyInformation.contactPhone.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div v-if="
                      $v.merchant.companyInformation.contactPhone.$params
                        .minLength
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.companyInformation.contactPhone.$params
                    .minLength.min
                    }}
                    and
                    {{
                    $v.merchant.companyInformation.contactPhone.$params
                    .maxLength.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.companyInformation.contactEmail.$touch"
                  :error="$v.merchant.companyInformation.contactEmail.$error" color="grey-9" type="email"
                  v-model.trim="merchant.companyInformation.contactEmail" float-label="Contact Email*"
                  placeholder="Contact Email*" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.contactEmail.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.contactEmail
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.contactEmail.$error">
                  <div v-if="
                      $v.merchant.companyInformation.contactEmail.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div v-if="
                      $v.merchant.companyInformation.contactEmail.$params.email
                    ">
                    <q-icon color="negative" name="warning" />&nbsp; Invalid
                    email address format
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="text-caption">Statement type</div>
                <div class="group">
                  <q-radio @blur="$v.merchant.companyInformation.statementType.$touch"
                    :error="$v.merchant.companyInformation.statementType.$error"
                    v-for="(item, index) in viewBinding.statementType" :key="index" color="grey-9"
                    v-model.trim="merchant.companyInformation.statementType" :val="item.value" :label="item.label" />
                </div>
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.statementType.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.statementType
                    " />
                </div>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <p class="text-caption">Statement frequency</p>
                <div class="group">
                  <q-radio @blur="
                      $v.merchant.companyInformation.statementFrequency.$touch
                    " :error="
                      $v.merchant.companyInformation.statementFrequency.$error
                    " v-for="(item, index) in viewBinding.statementFrequency" :key="index" color="grey-9" v-model.trim="
                      merchant.companyInformation.statementFrequency
                    " :val="item.value" :label="item.label" />
                </div>
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.statementFrequency
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.statementFrequency
                    " />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" float-label="Statement Email" placeholder="Statement Email"
                  @blur="$v.merchant.companyInformation.statementEmail.$touch"
                  :error="$v.merchant.companyInformation.statementEmail.$error"
                  v-model.trim="merchant.companyInformation.statementEmail" />
                <div class="text-negative" v-if="
                    error.field.merchant.companyInformation.statementEmail.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.companyInformation.statementEmail
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.companyInformation.statementEmail.$error">
                  <div v-if="
                      $v.merchant.companyInformation.statementEmail.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div v-if="
                      $v.merchant.companyInformation.statementEmail.$params
                        .email
                    ">
                    <q-icon color="negative" name="warning" />&nbsp; Invalid
                    email address format
                  </div>
                </div>
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('companyInformation')"
                label="Continue" />
              <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="previousClicked()" label="Previous" />
              <q-btn color="amber-10" class="q-ma-xs" icon="inbox" label="Save Partial" @click="saveCurrentChanges()" />
              <q-btn color="negative" class="q-ma-xs" icon="backspace" label="Back to document validation"
                @click="goBackToDocumentVerificationStage()" />
            </q-stepper-navigation>
          </q-step>
          <q-step error-icon="warning" name="third" :error="error.tab.partnerInformation" title="Partners">
            <div v-for="(v, index) in $v.viewBinding.partnersArr.$each" :key="index" class="row q-my-xs gutter-sm"
              ref="parentElement">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="row group items-center">
                  <div class="col">
                    <span class="q-pa-sm bg-light text-dark">
                      <q-icon name="people" />
                      Partner 0{{ parseInt(index) + 1 }}
                    </span>
                  </div>
                  <div class="col-auto" v-if="
                      Object.keys($v.viewBinding.partnersArr.$each)
                        .length > 1
                    ">
                    <q-btn round icon="delete" @click="removePartnerFromArr(v, index)" color="negative" />
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input :error="v.name.$anyError" @blur="v.name.$touch()" color="grey-9" v-model.trim="v.$model.name"
                  float-label="Name*" placeholder="Name*" />
                <div class="text-negative" v-if="
                    error.field.merchant.partnerInformation[index].name.alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.partnerInformation[index]" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="v.name.$anyError">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.salesInformation.applicationDate.$touch"
                  :error="$v.merchant.salesInformation.applicationDate.$error" color="grey-9" format="DD/MM/YYYY"
                  format-model="number" modal v-model.trim="merchant.salesInformation.applicationDate"
                  float-label="Application Date*" placeholder="Application Date*" /> 
              </div> -->
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input :min="past" :max="future" format="DD/MM/YYYY" format-model="number" modal
                  :error="v.dob.$anyError" @blur="v.dob.$touch()" color="grey-9" v-model.trim="v.$model.dob"
                  float-label="PAN DOB *" placeholder="PAN DOB *" />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input upper-case :error="v.pan.$anyError" @blur="v.pan.$touch()" color="grey-9"
                  v-model.trim="v.$model.pan" float-label="Pan*" placeholder="Pan*" />
                <div class="textf-negative" v-if="
                    error.field.merchant.partnerInformation[index].pan.alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.partnerInformation[index]" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="v.pan.$anyError">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    provide valid PAN
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp; Should be
                    10 digits
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input :error="v.address.$anyError" @blur="v.address.$touch()" color="grey-9"
                  v-model.trim="v.$model.address" float-label="Address* (max 120 characters)" placeholder="Address*" />
                <div class="text-negative" v-if="
                    error.field.merchant.partnerInformation[index].address.alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.partnerInformation[index]" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="v.address.$anyError">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input :error="v.pin.$anyError" @blur="v.pin.$touch()" color="grey-9" type="number"
                  v-model.trim="v.$model.pin" float-label="Pincode*" placeholder="Pincode*" />
                <div class="text-negative" v-if="
                    error.field.merchant.partnerInformation[index].pin.alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.partnerInformation[index]" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="v.pin.$anyError">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    provide valid pincode
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp; Should be
                    between 6 and 7 digits
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input :error="autoCompleteError(v.cityRefLabel, v.cityRefCode)" color="grey-9"
                  v-model.trim="v.$model.cityRefLabel" float-label="City (type min 3 characters)*"
                  placeholder="Start typing ..*">
                  <q-autocomplete separator @search="partnerCitySearch" :debounce="10" :min-characters="3"
                    @selected="(obj) => partnerCitySelected(obj, index)" />
                </q-input>
                <div class="text-negative" v-if="
                    error.field.merchant.partnerInformation[index].cityRefCode
                      .alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.partnerInformation[index]" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="v.cityRefLabel.$error || v.cityRefCode.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Type and choose from the suggestions
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input :error="autoCompleteError(v.stateRefLabel, v.stateRefCode)" @blur="v.stateRefLabel.$touch()"
                  color="grey-9" v-model.trim="v.$model.stateRefLabel" float-label="State (type min 3 characters)*"
                  placeholder="Start typing ..*">
                  <q-autocomplete separator @search="partnerStateSearch" :debounce="10" :min-characters="1"
                    @selected="(obj) => partnerStateSelected(obj, index)" />
                </q-input>
                <div class="text-negative" v-if="
                    error.field.merchant.partnerInformation[index].stateRefCode
                      .alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.partnerInformation[index]" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="v.stateRefCode.$anyError || v.stateRefLabel.$anyError">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Type and choose from the suggestions
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input :error="v.contactMobile.$anyError" @blur="v.contactMobile.$touch()" color="grey-9" type="tel"
                  v-model.trim="v.$model.contactMobile" float-label="Mobile*" placeholder="Mobile*" />
                <div class="text-negative" v-if="
                    error.field.merchant.partnerInformation[index].contactMobile
                      .alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.partnerInformation[index]" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="v.contactMobile.$anyError">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Accepts only digits
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp; Should be
                    10 digits
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input :error="v.contactEmail.$anyError" @blur="v.contactEmail.$touch()" color="grey-9" type="email"
                  v-model.trim="v.$model.contactEmail" float-label="Email*" placeholder="Email*" />
                <div class="text-negative" v-if="
                    error.field.merchant.partnerInformation[index].contactEmail
                      .alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.partnerInformation[index]" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="v.contactEmail.$anyError">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Provide valid emal address
                  </div>
                </div>
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('partners')"
                label="Continue" />
              <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="previousClicked()" label="Previous" />
              <q-btn color="amber-10" class="q-ma-xs" icon="inbox" label="Save Partial" @click="saveCurrentChanges()" />
              <q-btn color="positive float-right" @click="addMorePartnersSet()" class="q-ma-xs" icon="add"
                label="Add More" />
              <q-btn color="negative" class="q-ma-xs" icon="backspace" label="Back to document validation"
                @click="goBackToDocumentVerificationStage()" />
            </q-stepper-navigation>
          </q-step>
          <q-step error-icon="warning" name="fourth" :error="error.tab.businessInformation" title="Business"
            subtitle="Info">
            <div class="row gutter-sm">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select color="grey-9" @blur="
                    $v.merchant.businessInformation.weekdayStartHour.$touch
                  " :error="
                    $v.merchant.businessInformation.weekdayStartHour.$error
                  " v-model.trim="merchant.businessInformation.weekdayStartHour"
                  float-label="Weekday start hour (00.00)*" :options="BusinessHourFromOptions"
                  placeholder="Weekday start hour" />
                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation.weekdayStartHour
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation.weekdayStartHour
                    " />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select color="grey-9" @blur="$v.merchant.businessInformation.weekdayEndHour.$touch"
                  :error="$v.merchant.businessInformation.weekdayEndHour.$error"
                  v-model.trim="merchant.businessInformation.weekdayEndHour" float-label="Weekday end hour (00.00)*"
                  :options="BusinessHourToOptions" placeholder="Weekday end hour" />
                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation.weekdayEndHour
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation.weekdayEndHour
                    " />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select color="grey-9" @blur="
                    $v.merchant.businessInformation.weekendStartHour.$touch
                  " :error="
                    $v.merchant.businessInformation.weekendStartHour.$error
                  " v-model.trim="merchant.businessInformation.weekendStartHour"
                  float-label="Weekend start hour (00.00)*" :options="BusinessHourFromOptions"
                  placeholder="Weekend start hour" />
                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation.weekendStartHour
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation.weekendStartHour
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.businessInformation.weekendStartHour.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Provide valid start hour
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select color="grey-9" @blur="$v.merchant.businessInformation.weekendEndHour.$touch"
                  :error="$v.merchant.businessInformation.weekendEndHour.$error"
                  v-model.trim="merchant.businessInformation.weekendEndHour" float-label="Weekend end hour (00.00)*"
                  :options="BusinessHourToOptions" placeholder="Weekend end hour" />
                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation.weekendEndHour
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation.weekendEndHour
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.businessInformation.weekendEndHour.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Provide valid end hour
                  </div>
                </div>
              </div>
              <!--<div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" type="number" v-model.trim="merchant.businessInformation.weekdayStartHour" float-label="Business Income" placeholder="Business Income" />
              </div>-->

              <div class="col-md-6 col-sm-12 col-xs-12 col-xs-12">
                <q-input color="grey-9" @blur="
                    $v.merchant.businessInformation.lastTurnoverYear.$touch
                  " :error="
                    $v.merchant.businessInformation.lastTurnoverYear.$error
                  " v-model.trim="merchant.businessInformation.lastTurnoverYear" float-label="Last turnover year"
                  placeholder="Last turnover year" />
                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation.lastTurnoverYear
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation.lastTurnoverYear
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.businessInformation.lastTurnoverYear.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Provide valid year
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" type="number" @blur="
                    $v.merchant.businessInformation.maximumMonthlyUsage.$touch
                  " :error="
                    $v.merchant.businessInformation.maximumMonthlyUsage.$error
                  " v-model.trim="
                    merchant.businessInformation.maximumMonthlyUsage
                  " float-label="Maximum Monthly Usage*" placeholder="Maximum Monthly Usage*" />

                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation.maximumMonthlyUsage
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation
                        .maximumMonthlyUsage
                    " />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select @blur="
                    $v.merchant.businessInformation.merchantTypeCode.$touch
                  " :error="
                    $v.merchant.businessInformation.merchantTypeCode.$error
                  " placeholder="Choose from the below*" color="grey-9"
                  v-model.trim="merchant.businessInformation.merchantTypeCode" float-label="merchant Category*"
                  :options="merchantTypeCodeOptions" />
                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation.merchantTypeCode
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation.merchantTypeCode
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.businessInformation.merchantTypeCode.$error">
                  <div v-if="
                      $v.merchant.businessInformation.merchantTypeCode.$params
                        .required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" type="number" @blur="
                    $v.merchant.businessInformation.lastTurnoverAmount.$touch
                  " :error="
                    $v.merchant.businessInformation.lastTurnoverAmount.$error
                  " v-model.trim="merchant.businessInformation.lastTurnoverAmount"
                  float-label="Turnover during last year" placeholder="Turnover during last year" />
                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation.lastTurnoverAmount
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation
                        .lastTurnoverAmount
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.businessInformation.lastTurnoverAmount.$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.businessInformation.lastTurnoverAmount.$params
                    .minValue.min
                    }}
                    and
                    {{
                    $v.merchant.businessInformation.lastTurnoverAmount.$params
                    .maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" type="number" @blur="
                    $v.merchant.businessInformation.expectedCardBusiness.$touch
                  " :error="
                    $v.merchant.businessInformation.expectedCardBusiness.$error
                  " v-model.trim="
                    merchant.businessInformation.expectedCardBusiness
                  " float-label="Expected Card Business*" placeholder="Expected Card Business*" />
                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation
                      .expectedCardBusiness.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation
                        .expectedCardBusiness
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.businessInformation.expectedCardBusiness.$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.businessInformation.expectedCardBusiness
                    .$params.minValue.min
                    }}
                    and
                    {{
                    $v.merchant.businessInformation.expectedCardBusiness
                    .$params.maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" type="number" @blur="
                    $v.merchant.businessInformation.averageBillAmount.$touch
                  " :error="
                    $v.merchant.businessInformation.averageBillAmount.$error
                  " v-model.trim="merchant.businessInformation.averageBillAmount" float-label="Average Bill Amount"
                  placeholder="Average Bill Amount" />
                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation.averageBillAmount
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation.averageBillAmount
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.businessInformation.averageBillAmount.$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.businessInformation.averageBillAmount.$params
                    .minValue.min
                    }}
                    and
                    {{
                    $v.merchant.businessInformation.averageBillAmount.$params
                    .maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input upper-case color="grey-9" @blur="$v.merchant.businessInformation.gstId.$touch"
                  :error="$v.merchant.businessInformation.gstId.$error"
                  v-model.trim="merchant.businessInformation.gstId" @change="marsRequiredFormattingofGST"
                  float-label="GST ID" placeholder="GST ID" />
                <div class="text-negative" v-if="error.field.merchant.businessInformation.gstId.alert">
                  <MarsErrorResponse :error="error.field.merchant.businessInformation.gstId" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="$v.merchant.businessInformation.gstId.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Provide valid GST Number
                  </div>
                  <div v-if="
                      $v.merchant.businessInformation.gstId.$params.minLength
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.businessInformation.gstId.$params.minLength
                    .min
                    }}
                    and
                    {{
                    $v.merchant.businessInformation.gstId.$params.maxLength
                    .max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select placeholder="Choose from the below*" color="grey-9"
                  v-model.trim="merchant.businessInformation.currentPosName" float-label="Already having a mPOS/POS*"
                  :options="currentPosOptions" />
              </div>

              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" @blur="$v.merchant.businessInformation.debitCardMdr.$touch"
                  :error="$v.merchant.businessInformation.debitCardMdr.$error"
                  v-model.trim="merchant.businessInformation.debitCardMdr" float-label="Debit Card MDR"
                  placeholder="Debit Card MDR" />
                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation.debitCardMdr.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation.debitCardMdr
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.businessInformation.debitCardMdr.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.businessInformation.debitCardMdr.$params
                    .minValue.min
                    }}
                    and
                    {{
                    $v.merchant.businessInformation.debitCardMdr.$params
                    .maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" @blur="$v.merchant.businessInformation.creditCardMdr.$touch"
                  :error="$v.merchant.businessInformation.creditCardMdr.$error"
                  v-model.trim="merchant.businessInformation.creditCardMdr" float-label="Credit Card MDR"
                  placeholder="Credit Card MDR" />
                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation.creditCardMdr.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation.creditCardMdr
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.businessInformation.creditCardMdr.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.businessInformation.creditCardMdr.$params
                    .minValue.min
                    }}
                    and
                    {{
                    $v.merchant.businessInformation.creditCardMdr.$params
                    .maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input format="DD/MM/YYYY" format-model="number"
                  @blur="$v.merchant.businessInformation.memberSince.$touch"
                  :error="$v.merchant.businessInformation.memberSince.$error" color="grey-9" modal
                  v-model.trim="merchant.businessInformation.memberSince" float-label="Member since*"
                  placeholder="Member since*" />
                <div class="text-negative" v-if="
                    error.field.merchant.businessInformation.memberSince.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.businessInformation.memberSince
                    " />
                </div>
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('businessInformation')"
                label="Continue" />
              <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="previousClicked()" label="Previous" />
              <q-btn color="amber-10" class="q-ma-xs" icon="inbox" label="Save Partial" @click="saveCurrentChanges()" />
              <q-btn color="negative" class="q-ma-xs" icon="backspace" label="Back to document validation"
                @click="goBackToDocumentVerificationStage()" />
            </q-stepper-navigation>
          </q-step>
          <q-step error-icon="warning" name="fifth" :error="error.tab.paymentDetails" title="Payment"
            subtitle="Details">
            <div class="row gutter-sm">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="text-caption">Device Owned By</p>
                <div class="group">
                  <q-radio @blur="$v.merchant.paymentDetails.deviceOwnedBy.$touch"
                    :error="$v.merchant.paymentDetails.deviceOwnedBy.$error"
                    v-for="(item, index) in deviceOwnedByOptions" :key="index" color="grey-9"
                    v-model.trim="merchant.paymentDetails.deviceOwnedBy" :val="item.value" :label="item.label" />
                  <div class="text-negative" v-if="
                      error.field.merchant.paymentDetails.deviceOwnedBy.alert
                    ">
                    <MarsErrorResponse :error="error.field.merchant.paymentDetails.deviceOwnedBy" />
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select @blur="VasSelected" placeholder="Choose from the below" color="grey-9"
                  :error="$v.merchant.paymentDetails.terminalModeCode.$error"
                  v-model="merchant.paymentDetails.terminalModeCode" :options="terminalModelSet"
                  float-label="Terminal Model*" />
                <!-- @input="mccbasedSelect" -->
                <div class="text-negative" v-if="
                    error.field.merchant.paymentDetails.terminalModeCode.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.paymentDetails.terminalModeCode
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.paymentDetails.terminalModeCode.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div v-if="
                  merchant.salesInformation.institutionCode == 109 ||
                  merchant.salesInformation.institutionCode == 104
                " class="col-md-6 col-sm-12 col-xs-12">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.paymentDetails.cardAcceptance" float-label="Card Acceptance"
                    :options="cardAcceptanceOptions" />
                </div>
              </div>

              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select @blur="$v.merchant.paymentDetails.terminalType.$touch"
                  :error="$v.merchant.paymentDetails.terminalType.$error" placeholder="Choose from the below*"
                  color="grey-9" v-model.trim="merchant.paymentDetails.terminalType" float-label="Terminal Type*"
                  :options="terminalTypeOptions" />
                <!-- @input="terminalBased" -->
                <div class="text-negative" v-if="error.field.merchant.paymentDetails.terminalType.alert">
                  <MarsErrorResponse :error="error.field.merchant.paymentDetails.terminalType" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.paymentDetails.terminalType.$error">
                  <div v-if="
                      $v.merchant.paymentDetails.terminalType.$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div v-if="merchant.paymentDetails.terminalType == 'MPOS'" class="row gutter-sm q-my-xs">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.state" float-label="STATE*" :options="getMposState"
                    @input="fnMposStatebasedCity()" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.city" float-label="CITY*" :options="getMposCity" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.fillingType" float-label="FillingTypes*"
                    :options="getAllFillingTypes" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.category" float-label="Category*" :options="getMposCategory"
                    @input="categoryBasedSubCategory" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9"
                    v-model.trim="merchant.additionalInfo.subCategory" float-label="SubCategory*"
                    :options="getMposSubCategory" />
                </div>

                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input format="DD/MM/YYYY" format-model="number" color="grey-9" modal
                    v-model.trim="merchant.additionalInfo.ownerDOB" float-label="Date Of Birth*"
                    placeholder="Date Of Birth*" />
                </div>

                <div class="col-md-12">
                  <div class="row items-center">
                    <div class="col-3">
                      <div class="text-caption text-weight-medium">200 to 999</div>
                    </div>
                    <div class="col">
                      <div class="text-caption text-weight-medium q-py-sm" align="center">
                        customIncentiveRates
                      </div>
                      <div class="row group">
                        <div class="col">
                          <q-input color="grey-9" type="number" v-model.trim="
                              merchant.customIncentiveRates[0].mechantFixed
                            " placeholder="Merchant - A" @input="populateCustom" />
                        </div>

                        <div class="col">
                          <q-input color="grey-9" type="number" v-model.trim="
                              merchant.customIncentiveRates[0].sharingFixed
                            " placeholder="Distributor - B" @input="populateCustom" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="row items-center">
                    <div class="col-3">
                      <div class="text-caption text-weight-medium">
                        1000 to 1999
                      </div>
                    </div>
                    <div class="col">
                      <div class="row group">
                        <div class="col">
                          <q-input color="grey-9" type="number" v-model.trim="
                              merchant.customIncentiveRates[1].mechantFixed
                            " placeholder="Merchant - A" @input="populateCustom1" />
                        </div>
                        <div class="col">
                          <q-input color="grey-9" type="number" v-model.trim="
                              merchant.customIncentiveRates[1].sharingFixed
                            " placeholder="Distributor - B" @input="populateCustom1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="row items-center">
                    <div class="col-3">
                      <div class="text-caption text-weight-medium">
                        2000 to 2999
                      </div>
                    </div>
                    <div class="col">
                      <div class="row group">
                        <div class="col">
                          <q-input color="grey-9" type="number" v-model.trim="
                              merchant.customIncentiveRates[2].mechantFixed
                            " placeholder="Merchant - A" @input="populateCustom2" />
                        </div>
                        <div class="col">
                          <q-input color="grey-9" type="number" v-model.trim="
                              merchant.customIncentiveRates[2].sharingFixed
                            " placeholder="Distributor - B" @input="populateCustom2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="row items-center">
                    <div class="col-3">
                      <div class="text-caption text-weight-medium">
                        3000 to 3499
                      </div>
                    </div>
                    <div class="col">
                      <div class="row group">
                        <div class="col">
                          <q-input color="grey-9" type="number" v-model.trim="
                              merchant.customIncentiveRates[3].mechantFixed
                            " placeholder="Merchant - A" @input="populateCustom3" />
                        </div>
                        <div class="col">
                          <q-input color="grey-9" type="number" v-model.trim="
                              merchant.customIncentiveRates[3].sharingFixed
                            " placeholder="Distributor - B" @input="populateCustom3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="row items-center">
                    <div class="col-3">
                      <div class="text-caption text-weight-medium">
                        3500 to 10000
                      </div>
                    </div>
                    <div class="col">
                      <div class="row group">
                        <div class="col">
                          <q-input color="grey-9" type="number" v-model.trim="
                              merchant.customIncentiveRates[4].mechantFixed
                            " placeholder="Merchant - A" @input="populateCustom4" />
                        </div>

                        <div class="col">
                          <q-input color="grey-9" type="number" v-model.trim="
                              merchant.customIncentiveRates[4].sharingFixed
                            " placeholder="Distributor - B" @input="populateCustom4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-12">
                <q-input color="grey-9" type="number" disable
                  @blur="$v.merchant.paymentDetails.numberOfTerminals.$touch"
                  :error="$v.merchant.paymentDetails.numberOfTerminals.$error"
                  v-model.trim="merchant.paymentDetails.numberOfTerminals" float-label="No of Terminals*"
                  placeholder="No of Terminals*" />
                <div class="text-negative" v-if="
                    error.field.merchant.paymentDetails.numberOfTerminals.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.paymentDetails.numberOfTerminals
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.paymentDetails.numberOfTerminals.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.paymentDetails.numberOfTerminals.$params
                    .minValue.min
                    }}
                    and
                    {{
                    $v.merchant.paymentDetails.numberOfTerminals.$params
                    .maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="group">
                  <q-checkbox @blur="$v.merchant.paymentDetails.omcEnabled.$touch"
                    :error="$v.merchant.paymentDetails.omcEnabled.$error"
                    v-model.trim="merchant.paymentDetails.omcEnabled" color="black" label="1% OMC Convenience fee :"
                    left-label />
                  <div class="text-negative" v-if="error.field.merchant.paymentDetails.omcEnabled.alert">
                    <MarsErrorResponse :error="error.field.merchant.paymentDetails.omcEnabled" />
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12" v-if="merchant.paymentDetails.omcEnabled == true"></div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="text-caption">International Card Acceptance Enabled?</p>
                <div class="group">
                  <q-radio @blur="$v.merchant.paymentDetails.intlCardAcceptance.$touch" :error="
                      $v.merchant.paymentDetails.intlCardAcceptance.$error
                    " v-for="(item, index) in internationalCardAcceptanceOptions" :key="index" color="grey-9"
                    v-model.trim="merchant.paymentDetails.intlCardAcceptance" :val="item.value" :label="item.label" />
                  <div class="text-negative" v-if="
                      error.field.merchant.paymentDetails.intlCardAcceptance
                        .alert
                    ">
                    <MarsErrorResponse :error="
                        error.field.merchant.paymentDetails.intlCardAcceptance
                      " />
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="text-caption">Credit card block Enabled?</p>
                <div class="group">
                  <q-radio @blur="$v.merchant.paymentDetails.creditCardBlock.$touch"
                    :error="$v.merchant.paymentDetails.creditCardBlock.$error"
                    v-for="(item, index) in creditCardBlockOptions" :key="index" color="grey-9"
                    v-model.trim="merchant.paymentDetails.creditCardBlock" :val="item.value" :label="item.label" />
                  <div class="text-negative" v-if="
                      error.field.merchant.paymentDetails.creditCardBlock.alert
                    ">
                    <MarsErrorResponse :error="
                        error.field.merchant.paymentDetails.creditCardBlock
                      " />
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" v-model.trim="merchant.paymentDetails.tipPercentage"
                  float-label="Tip Percentage" placeholder="Tip Percentage" />
              </div>
              <div class="col-md-6 col-sm-12">
                <q-input color="grey-9" type="number" @blur="$v.merchant.paymentDetails.installationFee.$touch"
                  :error="$v.merchant.paymentDetails.installationFee.$error"
                  v-model.trim="merchant.paymentDetails.installationFee" float-label="Installation Fee*"
                  placeholder="Installation Fee*" />
                <div class="text-negative" v-if="
                    error.field.merchant.paymentDetails.installationFee.alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.paymentDetails.installationFee" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.paymentDetails.installationFee.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.paymentDetails.installationFee.$params
                    .minValue.min
                    }}
                    and
                    {{
                    $v.merchant.paymentDetails.installationFee.$params
                    .maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select filter clearable placeholder="Choose from the below*" color="grey-9"
                  v-model.trim="merchant.paymentDetails.rentalPlanCode"
                  :error="$v.merchant.paymentDetails.rentalPlanCode.$error" float-label="Rental Plan*"
                  :options="rentalPlanSet" />
                <div class="text-negative" v-if="
                    error.field.merchant.paymentDetails.rentalPlanCode.alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.paymentDetails.rentalPlanCode" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.paymentDetails.rentalPlanCode.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input readOnly color="grey-9" v-model.trim="merchant.paymentDetails.recurringFees"
                  float-label="Recurring Fees*" />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select placeholder="Choose from the below*" color="grey-9"
                  v-model.trim="merchant.paymentDetails.rentalMode" float-label="Rental Mode*"
                  :options="rentalModeOptions" @input="handleInputrentalMode" />
                <div class="text-negative" v-if="error.field.merchant.paymentDetails.rentalMode.alert">
                  <MarsErrorResponse :error="error.field.merchant.paymentDetails.rentalMode" />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12" v-if="merchant.paymentDetails.rentalMode == 'IB'">
                <q-input readOnly color="grey-9" v-model.trim="bankFee" type="number"
                  float-label="Bank rental (Without GST)*" />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12" v-if="merchant.paymentDetails.rentalMode == 'SB'">
                <q-input readOnly color="grey-9" v-model.trim="bankFee" float-label="Rental Amount (Without GST)*" />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12" v-if="merchant.paymentDetails.rentalMode == 'SB'">
                <q-input color="grey-9" v-model.trim="subventionBankFeeData" float-label="Bank rental (Without GST)*"
                  type="text" @input="handleInput" />

                <div class="text-negative" v-if="
                    subventionBankFeeData > propLeadDeatils.recurringFees / 1.18
                  ">
                  {{ "Bank Rental should be lesser than rental amount" }}
                </div>
                <div class="text-negative" v-if="
                    subventionBankFeeData == '' ||
                    this.subventionBankFeeData == undefined ||
                    this.subventionBankFeeData == null
                  ">
                  {{ " Bank rental shouldn't be empty" }}
                </div>
                <div class="text-negative" v-if="/[^0-9]/.test(subventionBankFeeData)">
                  {{ " only numbers are allowed" }}
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="text-caption">Rental Type</p>
                <div class="group">
                  <q-radio @blur="$v.merchant.paymentDetails.rentalType.$touch"
                    :error="$v.merchant.paymentDetails.rentalType.$error" v-for="(item, index) in rentalTypeOptions"
                    :key="index" color="grey-9" v-model="merchant.paymentDetails.rentalType" :val="item.value"
                    :label="item.label" @input="selectCurrentType()" />
                  <div class="text-negative" v-if="error.field.merchant.paymentDetails.rentalType.alert">
                    <MarsErrorResponse :error="error.field.merchant.paymentDetails.rentalType" />
                  </div>
                </div>
              </div>
              <div v-if="merchant.paymentDetails.rentalType == 'E'" class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.paymentDetails.totalEmiAmount.$touch"
                  :error="$v.merchant.paymentDetails.totalEmiAmount.$error" color="grey-9" type="number"
                  v-model.trim="merchant.paymentDetails.totalEmiAmount" float-label="Total Emi Amount*"
                  placeholder="Total Emi Amount*" />
                <div class="text-negative" v-if="
                    error.field.merchant.paymentDetails.totalEmiAmount.alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.paymentDetails.totalEmiAmount" />
                </div>
              </div>
              <div v-if="merchant.paymentDetails.rentalType == 'E'" class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.paymentDetails.emiTenure.$touch"
                  :error="$v.merchant.paymentDetails.emiTenure.$error" color="grey-9" type="number"
                  v-model.trim="merchant.paymentDetails.emiTenure" float-label="Emi Tenure*"
                  placeholder="Emi Tenure*" />
                <div class="text-negative" v-if="error.field.merchant.paymentDetails.emiTenure.alert">
                  <MarsErrorResponse :error="error.field.merchant.paymentDetails.emiTenure" />
                </div>
              </div>
              <div v-if="merchant.paymentDetails.rentalType == 'E'" class="col-md-6 col-sm-12 col-xs-12">
                <q-input format="DD/MM/YYYY" format-model="number"
                  @blur="$v.merchant.paymentDetails.emiStartDate.$touch"
                  :error="$v.merchant.paymentDetails.emiStartDate.$error" color="grey-9" modal
                  v-model.trim="merchant.paymentDetails.emiStartDate" float-label="Emi Start Date*"
                  placeholder="Emi Start Date*" />
                <div class="text-negative" v-if="error.field.merchant.paymentDetails.emiStartDate.alert">
                  <MarsErrorResponse :error="error.field.merchant.paymentDetails.emiStartDate" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.paymentDetails.emiStartDate.$error">
                  <div v-if="
                      $v.merchant.paymentDetails.emiStartDate.$params.required
                    ">
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>
              <div v-if="merchant.paymentDetails.rentalType == 'R'" class="col-md-6 col-sm-12 col-xs-12">
                <q-input @blur="$v.merchant.paymentDetails.gracePeriod.$touch"
                  :error="$v.merchant.paymentDetails.gracePeriod.$error" color="grey-9" type="number"
                  v-model.trim="merchant.paymentDetails.gracePeriod" float-label="Grace period*"
                  placeholder="Grace period*" />
                <div class="text-negative" v-if="error.field.merchant.paymentDetails.gracePeriod.alert">
                  <MarsErrorResponse :error="error.field.merchant.paymentDetails.gracePeriod" />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="$v.merchant.paymentDetails.gracePeriod.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.paymentDetails.gracePeriod.$params.minValue
                    .min
                    }}
                    and
                    {{
                    $v.merchant.paymentDetails.gracePeriod.$params.maxValue
                    .max
                    }}
                  </div>
                </div>
              </div>
              <div v-if="merchant.paymentDetails.rentalType == 'A'" class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" type="number" @blur="$v.merchant.paymentDetails.advanceRentCollected.$touch"
                  :error="
                    $v.merchant.paymentDetails.advanceRentCollected.$error
                  " v-model.trim="merchant.paymentDetails.advanceRentCollected" float-label="Advance Rent Collected*"
                  placeholder="Advance Rent Collected*" />
                <div class="text-negative" v-if="
                    error.field.merchant.paymentDetails.advanceRentCollected
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.paymentDetails.advanceRentCollected
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.paymentDetails.advanceRentCollected.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.paymentDetails.advanceRentCollected.$params
                    .minValue.min
                    }}
                    and
                    {{
                    $v.merchant.paymentDetails.advanceRentCollected.$params
                    .maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div v-if="merchant.paymentDetails.rentalType == 'A'" class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" type="number" @blur="
                    $v.merchant.paymentDetails.noOfMonthRentPaidInAdvance.$touch
                  " :error="
                    $v.merchant.paymentDetails.noOfMonthRentPaidInAdvance.$error
                  " v-model.trim="
                    merchant.paymentDetails.noOfMonthRentPaidInAdvance
                  " float-label="No. Of Month Rent Paid In Advance*"
                  placeholder="No. Of Month Rent Paid In Advance*" />
                <div class="text-negative" v-if="
                    error.field.merchant.paymentDetails
                      .noOfMonthRentPaidInAdvance.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.paymentDetails
                        .noOfMonthRentPaidInAdvance
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.paymentDetails.noOfMonthRentPaidInAdvance.$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.paymentDetails.noOfMonthRentPaidInAdvance
                    .$params.minValue.min
                    }}
                    and
                    {{
                    $v.merchant.paymentDetails.noOfMonthRentPaidInAdvance
                    .$params.maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div v-if="merchant.paymentDetails.rentalType == 'A'" class="col-md-6 col-sm-12 col-xs-12">
                <p class="text-caption">Advanced Rent Mode</p>
                <div class="group">
                  <q-radio @blur="$v.merchant.paymentDetails.advanceRentMode.$touch"
                    :error="$v.merchant.paymentDetails.advanceRentMode.$error"
                    v-for="(item, index) in advanceRentModeOptions" :key="index" color="grey-9"
                    v-model.trim="merchant.paymentDetails.advanceRentMode" :val="item.value" :label="item.label" />
                  <div class="text-negative" v-if="
                      error.field.merchant.paymentDetails.advanceRentMode.alert
                    ">
                    <MarsErrorResponse :error="
                        error.field.merchant.paymentDetails.advanceRentMode
                      " />
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" v-model.trim="devicePrice" float-label="Device Price*"
                  placeholder="Device Price*" />
              </div>
              <div class="col-md-6 col-sm-12">
                <q-input color="grey-9" type="number" @blur="$v.merchant.paymentDetails.otherCharges.$touch"
                  :error="$v.merchant.paymentDetails.otherCharges.$error"
                  v-model.trim="merchant.paymentDetails.otherCharges" float-label="Other Charges"
                  placeholder="Other Charges" />
                <div class="text-negative" v-if="error.field.merchant.paymentDetails.otherCharges.alert">
                  <MarsErrorResponse :error="error.field.merchant.paymentDetails.otherCharges" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.paymentDetails.otherCharges.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.paymentDetails.otherCharges.$params.minValue
                    .min
                    }}
                    and
                    {{
                    $v.merchant.paymentDetails.otherCharges.$params.maxValue
                    .max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <q-input color="grey-9" type="number" @blur="$v.merchant.paymentDetails.totalAmountPaid.$touch"
                  :error="$v.merchant.paymentDetails.totalAmountPaid.$error"
                  v-model.trim="merchant.paymentDetails.totalAmountPaid" float-label="Total Amount Paid"
                  placeholder="Total Amount Paid" />
                <div class="text-negative" v-if="
                    error.field.merchant.paymentDetails.totalAmountPaid.alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.paymentDetails.totalAmountPaid" />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.paymentDetails.totalAmountPaid.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                  <div>
                    <q-icon color="negative" name="warning" />
                    &nbsp;Value should be between
                    {{
                    $v.merchant.paymentDetails.totalAmountPaid.$params
                    .minValue.min
                    }}
                    and
                    {{
                    $v.merchant.paymentDetails.totalAmountPaid.$params
                    .maxValue.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select placeholder="Choose from the below*" color="grey-9"
                  @blur="$v.merchant.paymentDetails.serviceProvider.$touch"
                  :error="$v.merchant.paymentDetails.serviceProvider.$error"
                  v-model.trim="merchant.paymentDetails.serviceProvider" float-label="Service provider*"
                  :options="serviceProviderListSet" />
                <div class="text-negative" v-if="
                    error.field.merchant.paymentDetails.serviceProvider.alert
                  ">
                  <MarsErrorResponse :error="error.field.merchant.paymentDetails.serviceProvider" />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select placeholder="Choose from the below*" color="grey-9"
                  @blur="$v.merchant.paymentDetails.networkPreferred.$touch"
                  :error="$v.merchant.paymentDetails.networkPreferred.$error"
                  v-model.trim="merchant.paymentDetails.networkPreferred" float-label="Network provider*"
                  :options="networkProviderListSet" />
                <div class="text-negative" v-if="
                    error.field.merchant.paymentDetails.networkPreferred.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.paymentDetails.networkPreferred
                    " />
                </div>
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('paymentDetails')"
                label="Continue" />
              <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="previousClicked()" label="Previous" />
              <q-btn color="amber-10" class="q-ma-xs" icon="inbox" label="Save Partial" @click="saveCurrentChanges()" />
              <q-btn color="negative" class="q-ma-xs" icon="backspace" label="Back to document validation"
                @click="goBackToDocumentVerificationStage()" />
            </q-stepper-navigation>
          </q-step>
          <q-step error-icon="warning" :error="error.tab.mdrPlan || error.SharingDiscountFee" name="sixth"
            title="Discount" subtitle="Rate">
            <div class="row group items-center">
              <div v-if="$v.merchant.mdrPlan.$anyError" class="col-md-12 text-negative">
                <q-icon color="negative" name="warning" />&nbsp; Error in MDR
                plan fields, kindly check it.
              </div>
              <div v-if="$v.merchant.SharingDiscountFee.$anyError" class="col-md-12 text-negative">
                <q-icon color="negative" name="warning" />&nbsp; Error in
                Sharing discount fee fields, kindly check it.
              </div>
              <div class="col-md-12">
                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      Domestic Debit Card below 2000
                    </div>
                  </div>
                  <div class="col">
                    <div class="text-caption text-weight-medium q-py-sm" align="center">
                      Merchant Disc Fee
                    </div>
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.domesticDebitUpTo2000.fixed
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.domesticDebitUpTo2000.fixed
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.domesticDebitUpTo2000.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.domesticDebitUpTo2000
                              .fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.domesticDebitUpTo2000
                                .fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.domesticDebitUpTo2000.percentage
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.domesticDebitUpTo2000.percentage
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.domesticDebitUpTo2000.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.domesticDebitUpTo2000
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.domesticDebitUpTo2000
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.domesticDebitUpTo2000.minimum
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.domesticDebitUpTo2000.minimum
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.domesticDebitUpTo2000.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.domesticDebitUpTo2000
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.domesticDebitUpTo2000
                                .minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="text-caption text-weight-medium q-py-sm" align="center">
                      Sharing Disc Fee
                    </div>
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.domesticDebitUpTo2000
                              .fixed.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.domesticDebitUpTo2000
                              .fixed.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.domesticDebitUpTo2000
                              .fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .domesticDebitUpTo2000.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .domesticDebitUpTo2000.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.domesticDebitUpTo2000
                              .percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.domesticDebitUpTo2000
                              .percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.domesticDebitUpTo2000
                              .percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .domesticDebitUpTo2000.percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .domesticDebitUpTo2000.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.domesticDebitUpTo2000
                              .minimum.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.domesticDebitUpTo2000
                              .minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.domesticDebitUpTo2000
                              .minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .domesticDebitUpTo2000.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .domesticDebitUpTo2000.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      Domestic Debit Card above 2000
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.domesticDebitAbove2000.fixed
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.domesticDebitAbove2000.fixed
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.domesticDebitAbove2000.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.domesticDebitAbove2000
                              .fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan
                                .domesticDebitAbove2000.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.domesticDebitAbove2000
                              .percentage.$touch;
                          " :error="
                            $v.merchant.mdrPlan.domesticDebitAbove2000
                              .percentage.$error
                          " v-model.trim="
                            merchant.mdrPlan.domesticDebitAbove2000.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.domesticDebitAbove2000
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan
                                .domesticDebitAbove2000.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.domesticDebitAbove2000.minimum
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.domesticDebitAbove2000.minimum
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.domesticDebitAbove2000.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.domesticDebitAbove2000
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan
                                .domesticDebitAbove2000.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee
                              .domesticDebitAbove2000.fixed.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee
                              .domesticDebitAbove2000.fixed.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.domesticDebitAbove2000
                              .fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .domesticDebitAbove2000.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .domesticDebitAbove2000.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee
                              .domesticDebitAbove2000.percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee
                              .domesticDebitAbove2000.percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.domesticDebitAbove2000
                              .percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .domesticDebitAbove2000.percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .domesticDebitAbove2000.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee
                              .domesticDebitAbove2000.minimum.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee
                              .domesticDebitAbove2000.minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.domesticDebitAbove2000
                              .minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .domesticDebitAbove2000.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .domesticDebitAbove2000.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      Standard/Classic (1st Stab)
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.standardOrClassic.fixed.$touch
                          " :error="
                            $v.merchant.mdrPlan.standardOrClassic.fixed.$error
                          " v-model.trim="
                            merchant.mdrPlan.standardOrClassic.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.standardOrClassic.fixed
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.standardOrClassic
                                .fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.standardOrClassic.percentage
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.standardOrClassic.percentage
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.standardOrClassic.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.standardOrClassic
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.standardOrClassic
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.standardOrClassic.minimum.$touch
                          " :error="
                            $v.merchant.mdrPlan.standardOrClassic.minimum.$error
                          " v-model.trim="
                            merchant.mdrPlan.standardOrClassic.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.standardOrClassic
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.standardOrClassic
                                .minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.standardOrClassic
                              .fixed.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.standardOrClassic
                              .fixed.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.standardOrClassic.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .standardOrClassic.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .standardOrClassic.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.standardOrClassic
                              .percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.standardOrClassic
                              .percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.standardOrClassic
                              .percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .standardOrClassic.percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .standardOrClassic.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.standardOrClassic
                              .minimum.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.standardOrClassic
                              .minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.standardOrClassic
                              .minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .standardOrClassic.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .standardOrClassic.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      Premium/Platinum (2nd Stab)
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.premiumOrPlatinum.fixed.$touch
                          " :error="
                            $v.merchant.mdrPlan.premiumOrPlatinum.fixed.$error
                          " v-model.trim="
                            merchant.mdrPlan.premiumOrPlatinum.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.premiumOrPlatinum.fixed
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.premiumOrPlatinum
                                .fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.premiumOrPlatinum.percentage
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.premiumOrPlatinum.percentage
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.premiumOrPlatinum.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.premiumOrPlatinum
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.premiumOrPlatinum
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.premiumOrPlatinum.minimum.$touch
                          " :error="
                            $v.merchant.mdrPlan.premiumOrPlatinum.minimum.$error
                          " v-model.trim="
                            merchant.mdrPlan.premiumOrPlatinum.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.premiumOrPlatinum
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.premiumOrPlatinum
                                .minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.premiumOrPlatinum
                              .fixed.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.premiumOrPlatinum
                              .fixed.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.premiumOrPlatinum.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .premiumOrPlatinum.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .premiumOrPlatinum.minimum
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.premiumOrPlatinum
                              .percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.premiumOrPlatinum
                              .percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.premiumOrPlatinum
                              .percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .premiumOrPlatinum.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .premiumOrPlatinum.minimum
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.premiumOrPlatinum
                              .minimum.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.premiumOrPlatinum
                              .minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.premiumOrPlatinum
                              .minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .premiumOrPlatinum.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .premiumOrPlatinum.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      Super Premium/Signature (3rd Stab)
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.superPremiumOrSignature.fixed
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.superPremiumOrSignature.fixed
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.superPremiumOrSignature.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.superPremiumOrSignature
                              .fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan
                                .superPremiumOrSignature.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.superPremiumOrSignature
                              .percentage.$touch;
                          " :error="
                            $v.merchant.mdrPlan.superPremiumOrSignature
                              .percentage.$error
                          " v-model.trim="
                            merchant.mdrPlan.superPremiumOrSignature.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.superPremiumOrSignature
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan
                                .superPremiumOrSignature.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.superPremiumOrSignature.minimum
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.superPremiumOrSignature.minimum
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.superPremiumOrSignature.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.superPremiumOrSignature
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan
                                .superPremiumOrSignature.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee
                              .superPremiumOrSignature.fixed.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee
                              .superPremiumOrSignature.fixed.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.superPremiumOrSignature
                              .fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .superPremiumOrSignature.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .superPremiumOrSignature.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee
                              .superPremiumOrSignature.percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee
                              .superPremiumOrSignature.percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.superPremiumOrSignature
                              .percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .superPremiumOrSignature.percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .superPremiumOrSignature.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee
                              .superPremiumOrSignature.minimum.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee
                              .superPremiumOrSignature.minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.superPremiumOrSignature
                              .minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .superPremiumOrSignature.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .superPremiumOrSignature.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      Commercial/Coporate 4th Stab
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.commercialOrCorporate.fixed
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.commercialOrCorporate.fixed
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.commercialOrCorporate.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.commercialOrCorporate
                              .fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.commercialOrCorporate
                                .fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.commercialOrCorporate.percentage
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.commercialOrCorporate.percentage
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.commercialOrCorporate.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.commercialOrCorporate
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.commercialOrCorporate
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.commercialOrCorporate.minimum
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.commercialOrCorporate.minimum
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.commercialOrCorporate.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.commercialOrCorporate
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.commercialOrCorporate
                                .minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.commercialOrCorporate
                              .fixed.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.commercialOrCorporate
                              .fixed.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.commercialOrCorporate
                              .fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .commercialOrCorporate.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .commercialOrCorporate.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.commercialOrCorporate
                              .percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.commercialOrCorporate
                              .percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.commercialOrCorporate
                              .percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .commercialOrCorporate.percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .commercialOrCorporate.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.commercialOrCorporate
                              .minimum.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.commercialOrCorporate
                              .minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.commercialOrCorporate
                              .minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .commercialOrCorporate.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .commercialOrCorporate.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      International Debit Card
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.internationalDebitCard.fixed
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.internationalDebitCard.fixed
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.internationalDebitCard.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.internationalDebitCard
                              .fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan
                                .internationalDebitCard.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.internationalDebitCard
                              .percentage.$touch;
                          " :error="
                            $v.merchant.mdrPlan.internationalDebitCard
                              .percentage.$error
                          " v-model.trim="
                            merchant.mdrPlan.internationalDebitCard.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.internationalDebitCard
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan
                                .internationalDebitCard.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.internationalDebitCard.minimum
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.internationalDebitCard.minimum
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.internationalDebitCard.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.internationalDebitCard
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan
                                .internationalDebitCard.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee
                              .internationalDebitCard.fixed.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee
                              .internationalDebitCard.fixed.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.internationalDebitCard
                              .fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .internationalDebitCard.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .internationalDebitCard.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee
                              .internationalDebitCard.percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee
                              .internationalDebitCard.percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.internationalDebitCard
                              .percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .internationalDebitCard.percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .internationalDebitCard.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee
                              .internationalDebitCard.minimum.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee
                              .internationalDebitCard.minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.internationalDebitCard
                              .minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .internationalDebitCard.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .internationalDebitCard.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      International Credit Card
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.internationalCreditCard.fixed
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.internationalCreditCard.fixed
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.internationalCreditCard.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.internationalDebitCard
                              .fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan
                                .internationalDebitCard.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.internationalCreditCard
                              .percentage.$touch;
                          " :error="
                            $v.merchant.mdrPlan.internationalCreditCard
                              .percentage.$error
                          " v-model.trim="
                            merchant.mdrPlan.internationalCreditCard.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.internationalDebitCard
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan
                                .internationalDebitCard.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.internationalCreditCard.minimum
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.internationalCreditCard.minimum
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.internationalCreditCard.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.internationalDebitCard
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan
                                .internationalDebitCard.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee
                              .internationalCreditCard.fixed.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee
                              .internationalCreditCard.fixed.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.internationalCreditCard
                              .fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .internationalCreditCard.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .internationalCreditCard.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee
                              .internationalCreditCard.percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee
                              .internationalCreditCard.percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.internationalCreditCard
                              .percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .internationalCreditCard.percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .internationalCreditCard.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee
                              .internationalCreditCard.minimum.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee
                              .internationalCreditCard.minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.internationalCreditCard
                              .minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .internationalCreditCard.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .internationalCreditCard.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">Onus</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.onus.fixed.$touch"
                          :error="$v.merchant.mdrPlan.onus.fixed.$error" v-model.trim="merchant.mdrPlan.onus.fixed"
                          placeholder="Fixed" />
                        <div class="text-negative" v-if="error.field.merchant.mdrPlan.onus.fixed.alert">
                          <MarsErrorResponse :error="error.field.merchant.mdrPlan.onus.fixed" />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.onus.percentage.$touch"
                          :error="$v.merchant.mdrPlan.onus.percentage.$error"
                          v-model.trim="merchant.mdrPlan.onus.percentage" placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.onus.percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.onus.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.onus.minimum.$touch"
                          :error="$v.merchant.mdrPlan.onus.minimum.$error" v-model.trim="merchant.mdrPlan.onus.minimum"
                          placeholder="Max" />
                        <div class="text-negative" v-if="error.field.merchant.mdrPlan.onus.minimum.alert">
                          <MarsErrorResponse :error="error.field.merchant.mdrPlan.onus.minimum" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.onus.fixed.$touch
                          " :error="
                            $v.merchant.SharingDiscountFee.onus.fixed.$error
                          " v-model.trim="merchant.SharingDiscountFee.onus.fixed" placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.onus.fixed
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee.onus.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.onus.percentage
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.onus.percentage
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.onus.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.onus
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee.onus
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.onus.minimum.$touch
                          " :error="
                            $v.merchant.SharingDiscountFee.onus.minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.onus.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.onus.minimum
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee.onus
                                .minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">Diners</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.diners.fixed.$touch"
                          :error="$v.merchant.mdrPlan.diners.fixed.$error" v-model.trim="merchant.mdrPlan.diners.fixed"
                          placeholder="Fixed" />
                        <div class="text-negative" v-if="error.field.merchant.mdrPlan.diners.fixed.alert">
                          <MarsErrorResponse :error="error.field.merchant.mdrPlan.diners.fixed" />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.diners.percentage.$touch"
                          :error="$v.merchant.mdrPlan.diners.percentage.$error"
                          v-model.trim="merchant.mdrPlan.diners.percentage" placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.diners.percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.diners.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.diners.minimum.$touch"
                          :error="$v.merchant.mdrPlan.diners.minimum.$error"
                          v-model.trim="merchant.mdrPlan.diners.minimum" placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.diners.minimum.alert
                          ">
                          <MarsErrorResponse :error="error.field.merchant.mdrPlan.diners.minimum" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.diners.fixed.$touch
                          " :error="
                            $v.merchant.SharingDiscountFee.diners.fixed.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.diners.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.diners.fixed
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee.diners
                                .fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.diners.percentage
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.diners.percentage
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.diners.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.diners
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee.diners
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.diners.minimum.$touch
                          " :error="
                            $v.merchant.SharingDiscountFee.diners.minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.diners.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.diners
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee.diners
                                .minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      Amex Domestic
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.amexDomestic.fixed.$touch"
                          :error="$v.merchant.mdrPlan.amexDomestic.fixed.$error"
                          v-model.trim="merchant.mdrPlan.amexDomestic.fixed" placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.amexDomestic.fixed
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.amexDomestic.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.amexDomestic.percentage.$touch
                          " :error="
                            $v.merchant.mdrPlan.amexDomestic.percentage.$error
                          " v-model.trim="
                            merchant.mdrPlan.amexDomestic.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.amexDomestic.percentage
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.amexDomestic
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.amexDomestic.minimum.$touch
                          " :error="
                            $v.merchant.mdrPlan.amexDomestic.minimum.$error
                          " v-model.trim="merchant.mdrPlan.amexDomestic.minimum" placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.amexDomestic.minimum
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.amexDomestic.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.amexDomestic.fixed
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.amexDomestic.fixed
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.amexDomestic.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.amexDomestic
                              .fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .amexDomestic.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.amexDomestic
                              .percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.amexDomestic
                              .percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.amexDomestic.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.amexDomestic
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .amexDomestic.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.amexDomestic.minimum
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.amexDomestic.minimum
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.amexDomestic.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.amexDomestic
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .amexDomestic.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      Amex International
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.amexInternational.fixed.$touch
                          " :error="
                            $v.merchant.mdrPlan.amexInternational.fixed.$error
                          " v-model.trim="
                            merchant.mdrPlan.amexInternational.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.amexInternational.fixed
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.amexInternational
                                .fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.amexInternational.percentage
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.amexInternational.percentage
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.amexInternational.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.amexInternational
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.amexInternational
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.amexInternational.minimum.$touch
                          " :error="
                            $v.merchant.mdrPlan.amexInternational.minimum.$error
                          " v-model.trim="
                            merchant.mdrPlan.amexInternational.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.amexInternational
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.amexInternational
                                .minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.amexInternational
                              .fixed.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.amexInternational
                              .fixed.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.amexInternational.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .amexInternational.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .amexInternational.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.amexInternational
                              .percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.amexInternational
                              .percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.amexInternational
                              .percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .amexInternational.percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .amexInternational.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.amexInternational
                              .minimum.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.amexInternational
                              .minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.amexInternational
                              .minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .amexInternational.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .amexInternational.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="merchant.mdrPlan.hasOwnProperty('upiUpto2000')" class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      UPI Debit Card UpTo 2000
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.upiUpto2000.fixed.$touch"
                          :error="$v.merchant.mdrPlan.upiUpto2000.fixed.$error"
                          v-model.trim="merchant.mdrPlan.upiUpto2000.fixed" placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.upiUpto2000.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.upiUpto2000.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.upiUpto2000.percentage.$touch;
                          " :error="
                            $v.merchant.mdrPlan.upiUpto2000.percentage.$error
                          " v-model.trim="merchant.mdrPlan.upiUpto2000.percentage" placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.upiUpto2000.percentage
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.upiUpto2000
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.upiUpto2000.minimum.$touch"
                          :error="
                            $v.merchant.mdrPlan.upiUpto2000.minimum.$error
                          " v-model.trim="merchant.mdrPlan.upiUpto2000.minimum" placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.upiUpto2000.minimum
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.upiUpto2000.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.upiUpto2000.fixed
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.upiUpto2000.fixed
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.upiUpto2000.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.upiUpto2000
                              .fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .upiUpto2000.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.upiUpto2000
                              .percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.upiUpto2000
                              .percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.upiUpto2000.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.upiUpto2000
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .upiUpto2000.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.upiUpto2000.minimum
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.upiUpto2000.minimum
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.upiUpto2000.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.upiUpto2000
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .upiUpto2000.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="merchant.mdrPlan.hasOwnProperty('upiAbove2000')" class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      UPI Debit Card Above 2000
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.upiAbove2000.fixed.$touch"
                          :error="$v.merchant.mdrPlan.upiAbove2000.fixed.$error"
                          v-model.trim="merchant.mdrPlan.upiAbove2000.fixed" placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.upiAbove2000.fixed
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.upiAbove2000.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.upiAbove2000.percentage.$touch;
                          " :error="
                            $v.merchant.mdrPlan.upiAbove2000.percentage.$error
                          " v-model.trim="
                            merchant.mdrPlan.upiAbove2000.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.upiAbove2000.percentage
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.upiAbove2000
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.upiAbove2000.minimum.$touch
                          " :error="
                            $v.merchant.mdrPlan.upiAbove2000.minimum.$error
                          " v-model.trim="merchant.mdrPlan.upiAbove2000.minimum" placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.upiAbove2000.minimum
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.upiAbove2000.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.upiAbove2000.fixed
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.upiAbove2000.fixed
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.upiAbove2000.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.upiAbove2000
                              .fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .upiAbove2000.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.upiAbove2000
                              .percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.upiAbove2000
                              .percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.upiAbove2000.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.upiAbove2000
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .upiAbove2000.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.upiAbove2000.minimum
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.upiAbove2000.minimum
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.upiAbove2000.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.upiAbove2000
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .upiAbove2000.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="merchant.mdrPlan.hasOwnProperty('upiCreditUpto2000')" class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      UPI Prepaid Credit Cards UpTo 2000
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.upiCreditUpto2000.fixed.$touch
                          " :error="
                            $v.merchant.mdrPlan.upiCreditUpto2000.fixed.$error
                          " v-model.trim="
                            merchant.mdrPlan.upiCreditUpto2000.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.upiCreditUpto2000.fixed
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.upiCreditUpto2000
                                .fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.upiCreditUpto2000.percentage
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.upiCreditUpto2000.percentage
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.upiCreditUpto2000.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.upiCreditUpto2000
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.upiCreditUpto2000
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.upiCreditUpto2000.minimum.$touch
                          " :error="
                            $v.merchant.mdrPlan.upiCreditUpto2000.minimum.$error
                          " v-model.trim="
                            merchant.mdrPlan.upiCreditUpto2000.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.upiCreditUpto2000
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.upiCreditUpto2000
                                .minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.upiCreditUpto2000
                              .fixed.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.upiCreditUpto2000
                              .fixed.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.upiCreditUpto2000.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .upiCreditUpto2000.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .upiCreditUpto2000.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.upiCreditUpto2000
                              .percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.upiCreditUpto2000
                              .percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.upiCreditUpto2000
                              .percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .upiCreditUpto2000.percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .upiCreditUpto2000.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.upiCreditUpto2000
                              .minimum.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.upiCreditUpto2000
                              .minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.upiCreditUpto2000
                              .minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .upiCreditUpto2000.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .upiCreditUpto2000.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="merchant.mdrPlan.hasOwnProperty('upiCreditAbove2000')" class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      UPI Prepaid Credit Cards Above 2000
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.upiCreditAbove2000.fixed.$touch
                          " :error="
                            $v.merchant.mdrPlan.upiCreditAbove2000.fixed.$error
                          " v-model.trim="
                            merchant.mdrPlan.upiCreditAbove2000.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.upiCreditAbove2000
                              .fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.upiCreditAbove2000
                                .fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.upiCreditAbove2000.percentage
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.upiCreditAbove2000.percentage
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.upiCreditAbove2000.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.upiCreditAbove2000
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.upiCreditAbove2000
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.upiCreditAbove2000.minimum
                              .$touch;
                          " :error="
                            $v.merchant.mdrPlan.upiCreditAbove2000.minimum
                              .$error
                          " v-model.trim="
                            merchant.mdrPlan.upiCreditAbove2000.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.upiCreditAbove2000
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.upiCreditAbove2000
                                .minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.upiCreditAbove2000
                              .fixed.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.upiCreditAbove2000
                              .fixed.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.upiCreditAbove2000.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .upiCreditAbove2000.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .upiCreditAbove2000.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.upiCreditAbove2000
                              .percentage.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.upiCreditAbove2000
                              .percentage.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.upiCreditAbove2000
                              .percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .upiCreditAbove2000.percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .upiCreditAbove2000.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.upiCreditAbove2000
                              .minimum.$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.upiCreditAbove2000
                              .minimum.$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.upiCreditAbove2000
                              .minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee
                              .upiCreditAbove2000.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee
                                .upiCreditAbove2000.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">Master Pass</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.masterPass.fixed.$touch"
                          :error="$v.merchant.mdrPlan.masterPass.fixed.$error"
                          v-model.trim="merchant.mdrPlan.masterPass.fixed" placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.masterPass.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.masterPass.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.masterPass.percentage.$touch
                          " :error="
                            $v.merchant.mdrPlan.masterPass.percentage.$error
                          " v-model.trim="merchant.mdrPlan.masterPass.percentage" placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.masterPass.percentage
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.masterPass.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.masterPass.minimum.$touch"
                          :error="$v.merchant.mdrPlan.masterPass.minimum.$error"
                          v-model.trim="merchant.mdrPlan.masterPass.minimum" placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.masterPass.minimum
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.masterPass.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.masterPass.fixed
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.masterPass.fixed
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.masterPass.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.masterPass
                              .fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee.masterPass
                                .fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.masterPass.percentage
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.masterPass.percentage
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.masterPass.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.masterPass
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee.masterPass
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.masterPass.minimum
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.masterPass.minimum
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.masterPass.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.masterPass
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee.masterPass
                                .minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">Cash at POS</div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.cashAtPos.fixed.$touch"
                          :error="$v.merchant.mdrPlan.cashAtPos.fixed.$error"
                          v-model.trim="merchant.mdrPlan.cashAtPos.fixed" placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.cashAtPos.fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.cashAtPos.fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.mdrPlan.cashAtPos.percentage.$touch
                          " :error="
                            $v.merchant.mdrPlan.cashAtPos.percentage.$error
                          " v-model.trim="merchant.mdrPlan.cashAtPos.percentage" placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.cashAtPos.percentage
                              .alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.cashAtPos.percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="$v.merchant.mdrPlan.cashAtPos.minimum.$touch"
                          :error="$v.merchant.mdrPlan.cashAtPos.minimum.$error"
                          v-model.trim="merchant.mdrPlan.cashAtPos.minimum" placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.mdrPlan.cashAtPos.minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.mdrPlan.cashAtPos.minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.cashAtPos.fixed
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.cashAtPos.fixed
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.cashAtPos.fixed
                          " placeholder="Fixed" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.cashAtPos
                              .fixed.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee.cashAtPos
                                .fixed
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.cashAtPos.percentage
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.cashAtPos.percentage
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.cashAtPos.percentage
                          " placeholder="%" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.cashAtPos
                              .percentage.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee.cashAtPos
                                .percentage
                            " />
                        </div>
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" @blur="
                            $v.merchant.SharingDiscountFee.cashAtPos.minimum
                              .$touch;
                          " :error="
                            $v.merchant.SharingDiscountFee.cashAtPos.minimum
                              .$error
                          " v-model.trim="
                            merchant.SharingDiscountFee.cashAtPos.minimum
                          " placeholder="Max" />
                        <div class="text-negative" v-if="
                            error.field.merchant.SharingDiscountFee.cashAtPos
                              .minimum.alert
                          ">
                          <MarsErrorResponse :error="
                              error.field.merchant.SharingDiscountFee.cashAtPos
                                .minimum
                            " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center" v-if="this.plan == 'mATM'">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      Plan for MATM
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" v-model.trim="merchant.mdrPlan.incentive.percentage"
                          placeholder="%" />
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" v-model.trim="merchant.mdrPlan.incentive.minimum"
                          placeholder="Min" />
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" v-model.trim="
                            merchant.mdrPlan.incentive.minimumTxnValue
                          " placeholder="Max" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center" v-if="
                    merchant.companyInformation.mcc == '5541' ||
                    merchant.companyInformation.mcc == '5542'
                  ">
                  <div class="col-3">
                    <div class="text-caption text-weight-medium">
                      Convenience fees
                    </div>
                  </div>
                  <div class="col">
                    <div class="row group bg-green-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" v-model.trim="merchant.mdrPlan.convenientFee.fixed"
                          placeholder="Fixed" />
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" v-model.trim="
                            merchant.mdrPlan.convenientFee.percentage
                          " placeholder="%" />
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" v-model.trim="merchant.mdrPlan.convenientFee.minimum"
                          placeholder="Max" />
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                    <div class="row group bg-yellow-2">
                      <div class="col">
                        <q-input color="grey-9" type="number" v-model.trim="
                            merchant.SharingDiscountFee.convenientFee.fixed
                          " placeholder="Fixed" />
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" v-model.trim="
                            merchant.SharingDiscountFee.convenientFee.percentage
                          " placeholder="%" />
                      </div>
                      <div class="col">
                        <q-input color="grey-9" type="number" v-model.trim="
                            merchant.SharingDiscountFee.convenientFee.minimum
                          " placeholder="Max" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('mdr')"
                label="Continue" />
              <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="previousClicked()" label="Previous" />
              <q-btn color="amber-10" class="q-ma-xs" icon="inbox" label="Save Partial" @click="saveCurrentChanges()" />
              <q-btn color="negative" class="q-ma-xs" icon="backspace" label="Back to document validation"
                @click="goBackToDocumentVerificationStage()" />
            </q-stepper-navigation>
          </q-step>

          <q-step error-icon="warning" name="seventh" :error="error.tab.bankInformation" title="Bank & Collection"
            subtitle="Details">
            <div class="row q-mb-md gutter-sm items-center">
              <div class="col-md-12">
                <div class="text-h6">Merchant Bank Details</div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input upper-case color="grey-9" :error="$v.merchant.bankInformation.bankDetails.ifsc.$error"
                  @blur="populateBankDetails" v-model.trim="merchant.bankInformation.bankDetails.ifsc"
                  float-label="IFSC Code*" placeholder="Enter IFSC*" />
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails.ifsc.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails.ifsc
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.bankInformation.bankDetails.ifsc.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Once entered and moved to the next field, bank details will
                    be populated automatically.
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" disable @blur="
                    $v.merchant.bankInformation.bankDetails.branchName.$touch
                  " :error="
                    $v.merchant.bankInformation.bankDetails.branchName.$error
                  " v-model.trim="merchant.bankInformation.bankDetails.branchName" float-label="Branch Name*"
                  placeholder="Branch Name* " />
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails.branchName
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails
                        .branchName
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.bankInformation.bankDetails.branchName.$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    will get automatically populated based on IFSC code.
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" v-model.trim="merchant.bankInformation.bankDetails.branchCode"
                  float-label="Branch Code" placeholder="Branch Code" />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" v-model.trim="merchant.bankInformation.bankDetails.branchZone"
                  float-label="Branch Zone" placeholder="Branch Zone" />
              </div>

              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select placeholder="Choose from the below" color="grey-9"
                  v-model.trim="merchant.bankInformation.bankDetails.feeType" float-label="Fee Type"
                  :options="feeTypeOptions" @input="
                    merchant.bankInformation.bankDetails.settlementOrNeftFee =
                      ''
                  " />
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails.feeType
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails.feeType
                    " />
                </div>
              </div>
              <div v-if="
                  merchant.bankInformation.bankDetails.feeType == 'N' ||
                  merchant.bankInformation.bankDetails.feeType == 'S'
                " class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" @blur="
                    $v.merchant.bankInformation.bankDetails.settlementOrNeftFee
                      .$touch;
                  " :error="
                    $v.merchant.bankInformation.bankDetails.settlementOrNeftFee
                      .$error
                  " v-model.trim="
                    merchant.bankInformation.bankDetails.settlementOrNeftFee
                  " float-label="NEFT/Settlement Fee Inclusive of Tax*"
                  placeholder="NEFT/Settlement Fee Inclusive of Tax*" />
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails
                      .settlementOrNeftFee.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails
                        .settlementOrNeftFee
                    " />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" @blur="$v.merchant.bankInformation.bankDetails.micr.$touch"
                  :error="$v.merchant.bankInformation.bankDetails.micr.$error"
                  v-model.trim="merchant.bankInformation.bankDetails.micr" float-label="MICR*" placeholder="MICR*" />
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails.micr.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails.micr
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.bankInformation.bankDetails.micr.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    will get automatically populated based on IFSC code.
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" disable @blur="
                    $v.merchant.bankInformation.bankDetails.bankName.$touch
                  " :error="
                    $v.merchant.bankInformation.bankDetails.bankName.$error
                  " v-model.trim="merchant.bankInformation.bankDetails.bankName" float-label="Bank Name*"
                  placeholder="Bank Name*" />
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails.bankName
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails.bankName
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption"
                  v-if="$v.merchant.bankInformation.bankDetails.bankName.$error">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    will get automatically populated based on IFSC code.
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select placeholder="Choose from the below" color="grey-9" v-model.trim="
                    merchant.bankInformation.bankDetails.paymentMode
                  " float-label="Payment mode" :options="paymnentModeOptions" />
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails.paymentMode
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails
                        .paymentMode
                    " />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" @blur="
                    $v.merchant.bankInformation.bankDetails.bankCityRefCode
                      .$touch;
                  " :error="
                    autoCompleteError(
                      $v.merchant.bankInformation.bankDetails.bankCityName,
                      $v.merchant.bankInformation.bankDetails.bankCityRefCode
                    )
                  " v-model.trim="
                    merchant.bankInformation.bankDetails.bankCityName
                  " float-label="City (type min 3 characters)*" placeholder="Start typing ..*">
                  <q-autocomplete separator @search="residentCitySearch" :debounce="10" :min-characters="3"
                    @selected="bankCitySelected" />
                </q-input>
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails
                      .bankCityRefCode.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails
                        .bankCityRefCode
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.bankInformation.bankDetails.bankCityRefCode
                      .$error ||
                    $v.merchant.bankInformation.bankDetails.bankCityName.$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Type and choose from the suggestions
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" @blur="
                    $v.merchant.bankInformation.bankDetails.bankStateRefCode
                      .$touch
                  " :error="
                    autoCompleteError(
                      $v.merchant.bankInformation.bankDetails.bankStateName,
                      $v.merchant.bankInformation.bankDetails.bankStateRefCode
                    )
                  " v-model.trim="
                    merchant.bankInformation.bankDetails.bankStateName
                  " float-label="State (type min 3 characters)*" placeholder="Start typing ..*">
                  <q-autocomplete separator @search="residentStateSearch" :debounce="10" :min-characters="1"
                    @selected="bankStateSelected" />
                </q-input>
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails
                      .bankStateRefCode.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails
                        .bankStateRefCode
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.bankInformation.bankDetails.bankStateRefCode
                      .$error ||
                    $v.merchant.bankInformation.bankDetails.bankStateName.$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    Type and choose from the suggestions
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <p class="text-caption">Current Account details Available ?*</p>
                <div class="group">
                  <q-radio @blur="
                      $v.merchant.bankInformation.bankDetails.accountdetails
                        .$touch
                    " :error="
                      $v.merchant.bankInformation.bankDetails.accountdetails
                        .$error
                    " v-for="(item, index) in viewBinding.accountdetails" :key="index" color="grey-9" v-model.trim="
                      merchant.bankInformation.bankDetails.accountdetails
                    " :val="item.value" :label="item.label" />
                </div>
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails
                      .accountdetails.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails
                        .accountdetails
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.bankInformation.bankDetails.accountdetails
                      .$error
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-select :class="{
    'readonly-select': propLeadDeatils.leadSource.sourceName === 'LS_TOHANDS'
  }" :disabled="this.propLeadDeatils.leadSource.sourceName === 'LS_TOHANDS'" placeholder="Choose from the below"
                  color="grey-9" v-model="
                    merchant.bankInformation.bankDetails.accountType
                  " float-label="Account Type" :options="accountTypeOptions" />
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails.accountType
                      .alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails
                        .accountType
                    " />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-input color="grey-9" @blur="
                    $v.merchant.bankInformation.bankDetails.accountNumber.$touch
                  " :error="
                    $v.merchant.bankInformation.bankDetails.accountNumber.$error
                  " v-model.trim="
                    merchant.bankInformation.bankDetails.accountNumber
                  " float-label="Bank A/c Number*" placeholder="Bank A/c Number*" />
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails
                      .accountNumber.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails
                        .accountNumber
                    " />
                </div>
                <div class="text-negative q-py-xs group text-caption" v-if="
                    $v.merchant.bankInformation.bankDetails.accountNumber
                      .$anyError
                  ">
                  <div>
                    <q-icon color="negative" name="warning" />&nbsp;Required -
                    provide valid account number
                  </div>
                  <div v-if="
                      $v.merchant.bankInformation.bankDetails.accountNumber
                        .$params.minLength
                    ">
                    <q-icon color="negative" name="warning" />
                    &nbsp;Length should be between
                    {{
                    $v.merchant.bankInformation.bankDetails.accountNumber
                    .$params.minLength.min
                    }}
                    and
                    {{
                    $v.merchant.bankInformation.bankDetails.accountNumber
                    .$params.maxLength.max
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <q-checkbox color="grey-9" true-value="Y" false-value="N" v-model.trim="
                    merchant.bankInformation.bankDetails.bankStatementAttached
                  " label="Bank Statement Attached" />
                <q-checkbox color="grey-9" true-value="Y" false-value="N" v-model.trim="
                    merchant.bankInformation.bankDetails.cancelChequeAttached
                  " label="Cancelled Cheque Lead Attached" />
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.bankDetails
                      .accountNumber.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.bankDetails
                        .accountNumber
                    " />
                </div>
              </div>
            </div>
            <div class="row gutter-sm items-center">
              <div class="col-md-12">
                <div class="text-h6">Payment Collection Details</div>
              </div>
              <div v-show="propLeadDeatils.paymentOption == 1" class="col-md-12">
                <div class="row">
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input color="grey-9" @blur="
                        $v.merchant.bankInformation.collectionDetails
                          .chequeNumber.$touch;
                      " :error="
                        $v.merchant.bankInformation.collectionDetails
                          .chequeNumber.$error
                      " v-model.trim="
                        merchant.bankInformation.collectionDetails.chequeNumber
                      " float-label="Cheque/UTR No*" placeholder="Cheque/UTR No*" />
                    <div class="text-negative" v-if="
                        error.field.merchant.bankInformation.collectionDetails
                          .chequeNumber.alert
                      ">
                      <MarsErrorResponse :error="
                          error.field.merchant.bankInformation.collectionDetails
                            .chequeNumber
                        " />
                    </div>
                    <div class="text-negative q-py-xs group text-caption" v-if="
                        $v.merchant.bankInformation.collectionDetails
                          .chequeNumber.$anyError
                      ">
                      <div>
                        <q-icon color="negative" name="warning" />&nbsp;Required
                        - provide valid account number
                      </div>
                      <div v-if="
                          $v.merchant.bankInformation.collectionDetails
                            .chequeNumber.$params.minLength
                        ">
                        <q-icon color="negative" name="warning" />
                        &nbsp;Length should be between
                        {{
                        $v.merchant.bankInformation.collectionDetails
                        .chequeNumber.$params.minLength.min
                        }}
                        and
                        {{
                        $v.merchant.bankInformation.collectionDetails
                        .chequeNumber.$params.maxLength.max
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="propLeadDeatils.paymentOption == 4" class="col-md-12">
                <div class="row">
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input color="grey-9" @blur="
                        $v.merchant.bankInformation.collectionDetails.upiLink
                          .$touch;
                      " :error="
                        $v.merchant.bankInformation.collectionDetails.upiLink
                          .$error
                      " v-model.trim="
                        merchant.bankInformation.collectionDetails.upiLink
                      " float-label="UPI Link*" placeholder="UPI Link*" />
                    <div class="text-negative" v-if="
                        error.field.merchant.bankInformation.collectionDetails
                          .upiLink.alert
                      ">
                      <MarsErrorResponse :error="
                          error.field.merchant.bankInformation.collectionDetails
                            .upiLink
                        " />
                    </div>
                    <div class="text-negative q-py-xs group text-caption" v-if="
                        $v.merchant.bankInformation.collectionDetails.upiLink
                          .$anyError
                      ">
                      <div>
                        <q-icon color="negative" name="warning" />&nbsp;Required
                        - provide valid account number
                      </div>
                      <div v-if="
                          $v.merchant.bankInformation.collectionDetails.upiLink
                            .$params.minLength
                        ">
                        <q-icon color="negative" name="warning" />
                        &nbsp;Length should be between
                        {{
                        $v.merchant.bankInformation.collectionDetails.upiLink
                        .$params.minLength.min
                        }}
                        and
                        {{
                        $v.merchant.bankInformation.collectionDetails.upiLink
                        .$params.maxLength.max
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="propLeadDeatils.paymentOption == 3" class="col-md-12">
                <div class="row">
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <q-input color="grey-9" @blur="
                        $v.merchant.bankInformation.collectionDetails
                          .swipeAmount.$touch;
                      " :error="
                        $v.merchant.bankInformation.collectionDetails
                          .swipeAmount.$error
                      " v-model.trim="
                        merchant.bankInformation.collectionDetails.swipeAmount
                      " float-label="Swipe Amount*" placeholder="Swipe Amount*" />
                    <div class="text-negative" v-if="
                        error.field.merchant.bankInformation.collectionDetails
                          .swipeAmount.alert
                      ">
                      <MarsErrorResponse :error="
                          error.field.merchant.bankInformation.collectionDetails
                            .swipeAmount
                        " />
                    </div>
                    <div class="text-negative q-py-xs group text-caption" v-if="
                        $v.merchant.bankInformation.collectionDetails
                          .swipeAmount.$anyError
                      ">
                      <div>
                        <q-icon color="negative" name="warning" />&nbsp;Required
                        - provide valid account number
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <q-input format="DD/MM/YYYY" format-model="number" color="grey-9" modal @blur="
                        $v.merchant.bankInformation.collectionDetails
                          .collectedDate.$touch;
                      " :error="
                        $v.merchant.bankInformation.collectionDetails
                          .collectedDate.$error
                      " v-model.trim="
                        merchant.bankInformation.collectionDetails.collectedDate
                      " float-label="Swipe Date*" placeholder="Swipe Date*" />
                    <div class="text-negative" v-if="
                        error.field.merchant.bankInformation.collectionDetails
                          .collectedDate.alert
                      ">
                      <MarsErrorResponse :error="
                          error.field.merchant.bankInformation.collectionDetails
                            .collectedDate
                        " />
                    </div>
                    <div class="text-negative q-py-xs group text-caption" v-if="
                        $v.merchant.bankInformation.collectionDetails
                          .collectedDate.$anyError
                      ">
                      <div>
                        <q-icon color="negative" name="warning" />&nbsp;Required
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <q-input color="grey-9" @blur="
                        $v.merchant.bankInformation.collectionDetails
                          .swipeTerminal.$touch;
                      " :error="
                        $v.merchant.bankInformation.collectionDetails
                          .swipeTerminal.$error
                      " v-model.trim="
                        merchant.bankInformation.collectionDetails.swipeTerminal
                      " float-label="Swiped on the terminal of*" placeholder="Swiped on the terminal of*" />
                    <div class="text-negative" v-if="
                        error.field.merchant.bankInformation.collectionDetails
                          .swipeTerminal.alert
                      ">
                      <MarsErrorResponse :error="
                          error.field.merchant.bankInformation.collectionDetails
                            .swipeTerminal
                        " />
                    </div>
                    <div class="text-negative q-py-xs group text-caption" v-if="
                        $v.merchant.bankInformation.collectionDetails
                          .swipeTerminal.$anyError
                      ">
                      <div>
                        <q-icon color="negative" name="warning" />&nbsp;Required
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="propLeadDeatils.paymentOption == 2" class="col-md-12">
                <div class="row">
                  <div class="col-md-3 col-sm-12 col-xs-12">
                    <q-input color="grey-9" @blur="
                        $v.merchant.bankInformation.collectionDetails
                          .chequeAmount.$touch;
                      " :error="
                        $v.merchant.bankInformation.collectionDetails
                          .chequeAmount.$error
                      " v-model.trim="
                        merchant.bankInformation.collectionDetails.chequeAmount
                      " float-label="Cheque Amount*" placeholder="Cheque Amount*" />
                    <div class="text-negative" v-if="
                        error.field.merchant.bankInformation.collectionDetails
                          .chequeAmount.alert
                      ">
                      <MarsErrorResponse :error="
                          error.field.merchant.bankInformation.collectionDetails
                            .chequeAmount
                        " />
                    </div>
                    <div class="text-negative q-py-xs group text-caption" v-if="
                        $v.merchant.bankInformation.collectionDetails
                          .chequeAmount.$anyError
                      ">
                      <div>
                        <q-icon color="negative" name="warning" />&nbsp;Required
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-12">
                    <q-input format="DD/MM/YYYY" format-model="number" color="grey-9" modal @blur="
                        $v.merchant.bankInformation.collectionDetails.chequeDate
                          .$touch;
                      " :error="
                        $v.merchant.bankInformation.collectionDetails.chequeDate
                          .$error
                      " v-model.trim="
                        merchant.bankInformation.collectionDetails.chequeDate
                      " float-label="Cheque Date*" placeholder="Cheque Date*" />
                    <div class="text-negative" v-if="
                        error.field.merchant.bankInformation.collectionDetails
                          .chequeDate.alert
                      ">
                      <MarsErrorResponse :error="
                          error.field.merchant.bankInformation.collectionDetails
                            .chequeDate
                        " />
                    </div>
                    <div class="text-negative q-py-xs group text-caption" v-if="
                        $v.merchant.bankInformation.collectionDetails.chequeDate
                          .$anyError
                      ">
                      <div>
                        <q-icon color="negative" name="warning" />&nbsp;Required
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-12 col-xs-12">
                    <q-input format="DD/MM/YYYY" format-model="number" color="grey-9" modal @blur="
                        $v.merchant.bankInformation.collectionDetails
                          .chequeDepositedDate.$touch;
                      " :error="
                        $v.merchant.bankInformation.collectionDetails
                          .chequeDepositedDate.$error
                      " v-model.trim="
                        merchant.bankInformation.collectionDetails
                          .chequeDepositedDate
                      " float-label="Cheque Deposited Date*" placeholder="Cheque Deposited Date*" />
                    <div class="text-negative" v-if="
                        error.field.merchant.bankInformation.collectionDetails
                          .chequeDepositedDate.alert
                      ">
                      <MarsErrorResponse :error="
                          error.field.merchant.bankInformation.collectionDetails
                            .chequeDepositedDate
                        " />
                    </div>
                    <div class="text-negative q-py-xs group text-caption" v-if="
                        $v.merchant.bankInformation.collectionDetails
                          .chequeDepositedDate.$anyError
                      ">
                      <div>
                        <q-icon color="negative" name="warning" />&nbsp;Required
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-12 col-xs-12">
                    <q-input color="grey-9" @blur="
                        $v.merchant.bankInformation.collectionDetails
                          .chequeNumber.$touch;
                      " :error="
                        $v.merchant.bankInformation.collectionDetails
                          .chequeNumber.$error
                      " v-model.trim="
                        merchant.bankInformation.collectionDetails.chequeNumber
                      " float-label="Cheque/UTR No*" placeholder="Cheque/UTR No*" />
                    <div class="text-negative" v-if="
                        error.field.merchant.bankInformation.collectionDetails
                          .chequeNumber.alert
                      ">
                      <MarsErrorResponse :error="
                          error.field.merchant.bankInformation.collectionDetails
                            .chequeNumber
                        " />
                    </div>
                    <div class="text-negative q-py-xs group text-caption" v-if="
                        $v.merchant.bankInformation.collectionDetails
                          .chequeNumber.$anyError
                      ">
                      <div>
                        <q-icon color="negative" name="warning" />&nbsp;Required
                        - provide valid account number
                      </div>
                      <div v-if="
                          $v.merchant.bankInformation.collectionDetails
                            .chequeNumber.$params.minLength
                        ">
                        <q-icon color="negative" name="warning" />
                        &nbsp;Length should be between
                        {{
                        $v.merchant.bankInformation.collectionDetails
                        .chequeNumber.$params.minLength.min
                        }}
                        and
                        {{
                        $v.merchant.bankInformation.collectionDetails
                        .chequeNumber.$params.maxLength.max
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <q-select clearable placeholder="Choose from the below" color="grey-9" v-model.trim="
                    merchant.bankInformation.collectionDetails.acquirerBank
                  " float-label="Bank Name" :options="bankListSet" />
                <div class="text-negative" v-if="
                    error.field.merchant.bankInformation.collectionDetails
                      .acquirerBank.alert
                  ">
                  <MarsErrorResponse :error="
                      error.field.merchant.bankInformation.collectionDetails
                        .acquirerBank
                    " />
                </div>
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('bank')"
                label="Continue" />
              <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="previousClicked()" label="Previous" />
              <q-btn color="amber-10" class="q-ma-xs" icon="inbox" label="Save Partial" @click="saveCurrentChanges()" />
              <q-btn color="negative" class="q-ma-xs" icon="backspace" label="Back to document validation"
                @click="goBackToDocumentVerificationStage()" />
            </q-stepper-navigation>
          </q-step>
          <q-step error-icon="warning" :error="error.tab.revParameters" name="ten" title="Rev Param & Lead"
            subtitle="Info">
            <div class="row gutter-sm">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="caption">Merchant Requested Vas</p>
                <li v-for="sVas in soSelectedVas.split(',')" :key="sVas">
                  {{ sVas }}
                </li>
              </div>
              <!-- <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="caption">Vas Based Instance*</p>
                <q-option-group inline type="checkbox" v-model.trim="tmpVasMapping"
                  class="text-weight-regular text-grey-8" color="grey-9" :options="vasBasedOnInstance" />
              </div> -->
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="caption">Vas Based Instance*</p>
                <!-- <q-option-group inline type="checkbox" v-model.trim="tmpVasMapping"
                  class="text-weight-regular text-grey-8" color="grey-9" :options="vasBasedOnInstance" /> -->
                <!-- <q-option-group :key="vasKey" inline type="checkbox" v-model="tmpVasMapping"
                  :options="vasBasedOnInstance" color="grey-9" class="text-weight-regular text-grey-8" /> -->
                <q-option-group inline type="checkbox" @input="handleVasChange" :value="tmpVasMapping"
                  class="text-weight-regular text-grey-8" color="grey-9" :disable="vasDisableFlag"
                  :options="vasBasedOnInstance" />
                <!-- <q-select multiple checked type ="checkbox" v-model.trim="tmpVasMapping" :options="vasBasedOnInstance" class="text-weight-regular text-grey-8"
              color="grey-9"  />   // v-model.trim="tmpVasMapping"   :disabled="this.vasDisable = true"-->
              </div>
              <!-- <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="text-caption">SMS Enable or Disable?</p>
                <div class="group">
                  <q-radio @blur="$v.merchant.companyInformation.smsFlag.$touch"
                    :error="$v.merchant.companyInformation.smsFlag.$error" v-for="(item, index) in smsFlagOptions"
                    :key="index" color="grey-9" v-model.trim="merchant.companyInformation.smsFlag" :val="item.value"
                    :label="item.label" />
                  <div class="text-negative" v-if="error.field.merchant.companyInformation.smsFlag.alert">
                    <MarsErrorResponse :error="error.field.merchant.companyInformation.smsFlag" />
                  </div>
                  <div class="text-negative q-py-xs group text-caption"
                    v-if="$v.merchant.companyInformation.smsFlag.$error">
                    <div>
                      <q-icon color="negative" name="warning" />&nbsp;Required
                    </div>
                  </div>
                </div>
              </div> -->
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="text-caption">Notification Recipient Enabled?</p>
                <div class="group">
                  <q-radio @blur="
                      $v.merchant.revParameters.notificationRecipient.$touch
                    " :error="
                      $v.merchant.revParameters.notificationRecipient.$error
                    " v-for="(item, index) in edcOptions" :key="index" color="grey-9"
                    v-model.trim="merchant.revParameters.notificationRecipient" :val="item.value" :label="item.label" />
                  <div class="text-negative" v-if="
                      error.field.merchant.revParameters.notificationRecipient
                        .alert
                    ">
                    <MarsErrorResponse :error="
                        error.field.merchant.revParameters.notificationRecipient
                      " />
                  </div>
                  <div class="text-negative q-py-xs group text-caption" v-if="
                      $v.merchant.revParameters.notificationRecipient.$error
                    ">
                    <div>
                      <q-icon color="negative" name="warning" />&nbsp;Required
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="text-caption">Bijlipay Switch</p>
                <div class="group">
                  <q-radio @blur="$v.revParamAndLeadInfo.bijlipaySwitch.$touch"
                    :error="$v.revParamAndLeadInfo.bijlipaySwitch.$error" v-for="(item, index) in bijlipaySwitchOptions"
                    :key="index" color="grey-9" v-model.trim="revParamAndLeadInfo.bijlipaySwitch" :val="item.value"
                    :label="item.label" />
                  <div class="text-negative" v-if="error.field.revParamAndLeadInfo.bijlipaySwitch.alert">
                    <MarsErrorResponse :error="error.field.revParamAndLeadInfo.bijlipaySwitch" />
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="text-caption">Sale Enabled?</p>
                <div class="group">
                  <q-radio @blur="$v.merchant.revParameters.saleFlag.$touch"
                    :error="$v.merchant.revParameters.saleFlag.$error" v-for="(item, index) in saleFlagOptions"
                    :key="index" color="grey-9" v-model.trim="merchant.revParameters.saleFlag" :val="item.value"
                    :label="item.label" />
                  <div class="text-negative" v-if="error.field.merchant.revParameters.saleFlag.alert">
                    <MarsErrorResponse :error="error.field.merchant.revParameters.saleFlag" />
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="text-caption">Tip FacilityAcceptance Enabled?</p>
                <div class="group">
                  <q-radio @blur="$v.merchant.revParameters.tipEnabled.$touch"
                    :error="$v.merchant.revParameters.tipEnabled.$error" v-for="(item, index) in tipFaclityOptions"
                    :key="index" color="grey-9" v-model.trim="merchant.revParameters.tipEnabled" :val="item.value"
                    :label="item.label" />
                  <div class="text-negative" v-if="error.field.merchant.revParameters.tipEnabled.alert">
                    <MarsErrorResponse :error="error.field.merchant.revParameters.tipEnabled" />
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <p class="text-caption">Auto or Manual Settlement?</p>
                <div class="group">
                  <q-radio @blur="$v.merchant.revParameters.settlementType.$touch"
                    :error="$v.merchant.revParameters.settlementType.$error"
                    v-for="(item, index) in autoormanualOptions" :key="index" color="grey-9"
                    v-model.trim="merchant.revParameters.settlementType" :val="item.value" :label="item.label" />
                  <div class="text-negative" v-if="
                      error.field.merchant.revParameters.settlementType.alert
                    ">
                    <MarsErrorResponse :error="error.field.merchant.revParameters.settlementType" />
                  </div>
                </div>
              </div>
            </div>

            <q-stepper-navigation>
              <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('revParameters')"
                label="Continue" />
              <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="previousClicked()" label="Previous" />
              <q-btn color="amber-10" class="q-ma-xs" icon="inbox" label="Save Partial" @click="saveCurrentChanges()" />
              <q-btn color="negative" class="q-ma-xs" icon="backspace" label="Back to document validation"
                @click="goBackToDocumentVerificationStage()" />
            </q-stepper-navigation>
          </q-step>

          <q-step error-icon="warning" name="eight" title="KYC" subtitle="Details">
            <div class="row items-center">
              <div class="col-12 bottom-border q-py-md" v-for="(key, index) in Object.keys(
                  propLeadDeatils.leadDocuments
                )" :key="index">
                <div class="row group items-center">
                  <div class="col-auto">
                    <span>{{ propLeadDeatils.revParameters }}</span>
                  </div>
                  <div class="col-auto">
                    <span class="text-purple-9 text-weight-bold border-1 q-pa-sm">{{ index + 1 }}</span>
                  </div>
                  <div class="col-10" v-for="(item, subIndex) in propLeadDeatils.leadDocuments[
                      key
                    ]" :key="subIndex">
                    <div class="row">
                      <div class="col-4 text-body1">Document</div>
                      <div class="col-8 text-body1 text-weight-bold text-negative" v-if="item.documentType == ''">
                        NA
                      </div>
                      <div class="col-8 text-body1" v-else>
                        {{ item.documentType }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-4 text-body1">Sub document</div>
                      <div class="col-8 text-body1 text-weight-bold text-negative" v-if="item.subDocumentType == ''">
                        NA
                      </div>
                      <div class="col-8 text-body1 text-weight-bold text-positive" v-else>
                        {{ item.subDocumentType }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12" v-show="item.uploadedDocuments.length > 0">
                        <div class="text-caption" v-for="(
                            document, documentIndex
                          ) in item.uploadedDocuments" :key="documentIndex">
                          {{ document.fileName }}
                        </div>
                      </div>
                      <div class="text-caption" v-show="item.uploadedDocuments.length == 0">
                        <div class="text-weight-bold text-negative">
                          No document available
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row group q-py-md items-center">
              <div class="col-6">
                <q-input color="grey-9" v-model.trim="merchant.remarks" float-label="Remarks" placeholder="Remarks" />
              </div>
              <div class="col-6">
                <p class="q-ma-0">Hold payment?</p>
                <q-radio color="grey-9" v-model.trim="holdPayment" :val="1" label="Yes" />
                <q-radio color="grey-9" v-model.trim="holdPayment" :val="0" label="No" />
              </div>
            </div>
            <q-stepper-navigation>
              <!-- <q-btn  /> -->
              <q-btn v-if="this.leadSourceApp.multiTidEnabled != true" color="primary" class="q-ma-xs" icon="check"
                @click="finalFormSubmit()" label="Submit" />
              <q-btn v-if="this.leadSourceApp.multiTidEnabled == true" color="primary" class="q-ma-xs" icon="check"
                @click="OpenMultiTidToggle()" label="Create Base TID" />
              <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="previousClicked()" label="Previous" />
              <q-btn color="amber-10" class="q-ma-xs" icon="inbox" label="Save Partial" @click="saveCurrentChanges()" />
              <q-btn color="negative" class="q-ma-xs" icon="backspace" label="Back to document validation"
                @click="goBackToDocumentVerificationStage()" />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
        <multiTidComponents v-if="propTogglemultiTidComponentDetails"
          :multiTidComponentDetails="addtnmultiTidComponentDetails" :propTogglemultiTidComponentDetails="
            propTogglemultiTidComponentDetails
          " />
      </div>
    </div>
  </div>
</template>

<script>


  import { LocalStorage } from "quasar";
  import multiTidComponents from "./multiTidComponents.vue";
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

  import { date } from "quasar";
  import moment from "moment";
  import { ref } from "vue";
  import { mapGetters, mapActions } from "vuex";
  import { uid } from "quasar";


  import viewLeadDocumentsDataEntryComponent from "./viewLeadDocumentsDataEntryComponent.vue";
  import MarsErrorResponse from "../MarsErrorResponseHandler.vue";

  import { helpers } from "@vuelidate/validators";
  const today = new Date();
  const { startOfDate, addToDate, subtractFromDate } = date;
  const panCard = helpers.regex(
    "panCard",
    /^([A-Z]{3}[ABCFEGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1})?$/
  );

  const gstn = helpers.regex(
    "gstn",
    // /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9]{1})+$/
    /^([0-9]){2}([A-Z]{3}[ABCFEGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[0-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
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
  // const alphaNumericValidate = helpers.regex(
  //   "alphaNumericValidate",
  //   /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/
  // );
  const alphaNumericValidate = helpers.regex(
    "alphaNumericValidate",
    /^(?:[A-Za-z0-9]+)(?:[A-Za-z0-9 ]*)$/
  );
  const alphaNumericSpecialValidate = helpers.regex(
    "alphaNumericSpecialValidate",
    /^[ A-Za-z0-9_@.*#/!%^()&+-,"]*$/
  );
  // const alpha = helpers.regex(
  //   "Only letters and spaces are allowed",
  //   /^[a-zA-Z\s]*$/
  // );
  const alpha = helpers.regex("alphaNumericSpecialValidate", /^[A-Za-z0-9\s]*$/);

  export default {
    name: "leadDataEntry",
    components: {
      MarsErrorResponse,
      viewLeadDocumentsDataEntryComponent,
      multiTidComponents,
    },
    props: ["propLeadDeatils"],
    data() {
      return {
        propTogglemultiTidComponentDetails: false,
        subTidListConfs: {},
        today,
        // selectedSecond: [
        // vasBasedOnInstance : {}
        // ],
        past: subtractFromDate(today, { days: 76500 }),
        future: addToDate(today, { days: 0 }),
        check: "",
        showPartnerstab: false,
        vasDisableFlag: false,
        showAxistab: false,
        ifscErrFlag: false,
        // vasDisable: false,
        salesInformationError: false,
        companyInformationError: false,
        revParametersError: false,
        businessInformationError: false,
        partnerInformationError: false,
        paymentDetailsError: false,
        ptCitySelected: false,
        companyRegisteredCitySelected: false,
        companyRegisteredStateSelected: false,

        bankInformationError: false,
        file: "",
        subventionBankFeeData: "",
        originalBankFeeData: 0,
        baseTidFlag: true,
        SubTidField: false,
        genSubTidFlag: false,
        //  VasTerminalType:"",
        viewBinding: {},
        incentive1: {},
        plan: [],
        //start >> Actual dropdown options values
        dob: {
          from: null,
          to: null,
        },
        baseAndSubTidList: [],
        listAllSubTidDetails: [],
        disabledListAllSubTidDetails: [],
        addtnmultiTidComponentDetails: {
          merchant: {},
          propLeadDeatils: {},
          leadId: "",
          diners: {},
          holdPayment: "",
        },
        columns: [
          {
            name: "tid",
            required: true,
            label: "Tid",
            align: "left",
            field: (row) => {
              return row.tid == null ? "NA" : row.tid;
            },
            sortable: true,
          },
          {
            name: "mid",
            required: true,
            label: "Mid",
            align: "left",
            field: (row) => {
              return row.mid == null ? "NA" : row.mid;
            },
            sortable: true,
          },
          {
            name: "baseTid",
            required: true,
            label: "BaseTid",
            align: "left",
            field: "baseTid",
            sortable: true,
          },
          {
            name: "institutionCode",
            required: true,
            label: "Institution Code",
            align: "left",
            field: "institutionCode",
            sortable: true,
          },
          //subTid
          {
            name: "subTid",
            required: true,
            label: "SubTid",
            align: "left",
            field: "subTid",
            sortable: true,
          },
          //tidIdentifier
          {
            name: "tidIdentifier",
            required: true,
            label: "Tid Identifier",
            align: "left",
            field: "tidIdentifier",
            sortable: true,
          },
          {
            name: "action",
            required: true,
            label: "",
            align: "center",
            field: "action",
            sortable: true,
          },
        ],
        institutionCodeOptions: [
          {
            label: "IOB GPRS",
            value: 101,
          },
          {
            label: "Axis Bank",
            value: 104,
          },
          {
            label: "Corp Bank",
            value: 103,
          },
          {
            label: "Federal",
            value: 102,
          },
          {
            label: "MPOS",
            value: 107,
          },
        ],
        bijlipaySwitchOptions: [
          {
            label: "Yes",
            value: true,
          },
          {
            label: "No",
            value: false,
          },
        ],
        smsFlagOptions: [
          {
            label: "Yes",
            value: "Y",
          },
          {
            label: "No",
            value: "N",
          },
        ],
        applicationTypeOptions: [
          {
            label: "Digital",
            value: "D",
          },
          {
            label: "Non Digital",
            value: "N",
          },
        ],
        categoryTypeOptions: [
          {
            label: "Small",
            value: "S",
          },
          {
            label: "Other",
            value: "O",
          },
        ],
        cardAcceptanceOptions: [
          {
            label: "International + Domestic Credit/Debit Card",
            value: "0",
          },
          {
            label: "Domestic Credit/Debit Cards",
            value: "1",
          },
          {
            label: "Domestic Debit Cards",
            value: "3",
          },
        ],
        terminalTypeOptions: [
          {
            label: "POS",
            value: "POS",
          },
          {
            label: "MPOS ",
            value: "MPOS",
          },
          {
            label: "PG",
            value: "PG",
          },
        ],
        merchantOptions: [
          {
            label: "Individual",
            value: "90",
          },
          {
            label: "Proprietor",
            value: "80",
          },
          {
            label: "Pvt Ltd",
            value: "70",
          },
          {
            label: "Public Ltd",
            value: "60",
          },
          {
            label: "Partnership",
            value: "61",
          },
          {
            label: "Trust",
            value: "50",
          },
          {
            label: "Government",
            value: "30",
          },
          {
            label: "Society",
            value: "40",
          },
        ],

        merchantTypeOptions: [
          {
            label: "POS Merchant",
            value: "P",
          },
          {
            label: "HERMES Merchant",
            value: "H",
          },
          // {
          //   label: "Pagement Gateway",
          //   value: "G"
          // }
        ],
        BusinessHourToOptions: [
          {
            label: "00.00",
            value: "00.00",
          },
          {
            label: "00.30",
            value: "00.30",
          },
          {
            label: "01.00",
            value: "01.00",
          },
          {
            label: "01.30",
            value: "01.30",
          },
          {
            label: "02.00",
            value: "02.00",
          },
          {
            label: "02.30",
            value: "02.30",
          },
          {
            label: "03.00",
            value: "03.00",
          },
          {
            label: "03.30",
            value: "03.30",
          },
          {
            label: "04.00",
            value: "04.00",
          },
          {
            label: "04.30",
            value: "04.30",
          },
          {
            label: "05.00",
            value: "05.00",
          },
          {
            label: "05.30",
            value: "05.30",
          },
          {
            label: "06.00",
            value: "06.00",
          },
          {
            label: "06.30",
            value: "06.30",
          },
          {
            label: "07.00",
            value: "07.00",
          },
          {
            label: "07.30",
            value: "07.30",
          },
          {
            label: "08.00",
            value: "08.00",
          },
          {
            label: "08.30",
            value: "08.30",
          },
          {
            label: "09.00",
            value: "09.00",
          },
          {
            label: "09.30",
            value: "09.30",
          },
          {
            label: "10.00",
            value: "10.00",
          },
          {
            label: "10.30",
            value: "10.30",
          },
          {
            label: "11.00",
            value: "11.00",
          },
          {
            label: "11.30",
            value: "11.30",
          },
          {
            label: "12.00 ",
            value: "12.00",
          },
          {
            label: "12.30",
            value: "12.30",
          },
          {
            label: "13.00 ",
            value: "13.00",
          },
          {
            label: "13.30",
            value: "13.30",
          },
          {
            label: "14.00 ",
            value: "14.00",
          },
          {
            label: "14.30",
            value: "14.30",
          },
          {
            label: "15.00 ",
            value: "15.00",
          },
          {
            label: "15.30",
            value: "15.30",
          },
          {
            label: "16.00 ",
            value: "16.00",
          },
          {
            label: "16.30",
            value: "16.30",
          },
          {
            label: "17.00 ",
            value: "17.00",
          },
          {
            label: "17.30",
            value: "17.30",
          },
          {
            label: "18.00 ",
            value: "18.00",
          },
          {
            label: "18.30",
            value: "18.30",
          },
          {
            label: "19.00 ",
            value: "19.00",
          },
          {
            label: "19.30",
            value: "19.30",
          },
          {
            label: "20.00 ",
            value: "20.00",
          },
          {
            label: "20.30",
            value: "20.30",
          },

          {
            label: "21.00 ",
            value: "21.00",
          },
          {
            label: "21.30",
            value: "21.30",
          },
          {
            label: "22.00 ",
            value: "22.00",
          },
          {
            label: "22.30",
            value: "22.30",
          },
          {
            label: "23.00 ",
            value: "23.00",
          },
          {
            label: "23.30",
            value: "23.30",
          },
        ],
        BusinessHourFromOptions: [
          {
            label: "00.00",
            value: "00.00",
          },
          {
            label: "00.30",
            value: "00.30",
          },
          {
            label: "01.00",
            value: "01.00",
          },
          {
            label: "01.30",
            value: "01.30",
          },
          {
            label: "02.00",
            value: "02.00",
          },
          {
            label: "02.30",
            value: "02.30",
          },
          {
            label: "03.00",
            value: "03.00",
          },
          {
            label: "03.30",
            value: "03.30",
          },
          {
            label: "04.00",
            value: "04.00",
          },
          {
            label: "04.30",
            value: "04.30",
          },
          {
            label: "05.00",
            value: "05.00",
          },
          {
            label: "05.30",
            value: "05.30",
          },
          {
            label: "06.00",
            value: "06.00",
          },
          {
            label: "06.30",
            value: "06.30",
          },
          {
            label: "07.00",
            value: "07.00",
          },
          {
            label: "07.30",
            value: "07.30",
          },
          {
            label: "08.00",
            value: "08.00",
          },
          {
            label: "08.30",
            value: "08.30",
          },
          {
            label: "09.00",
            value: "09.00",
          },
          {
            label: "09.30",
            value: "09.30",
          },
          {
            label: "10.00",
            value: "10.00",
          },
          {
            label: "10.30",
            value: "10.30",
          },
          {
            label: "11.00",
            value: "11.00",
          },
          {
            label: "11.30",
            value: "11.30",
          },
          {
            label: "12.00 ",
            value: "12.00",
          },
          {
            label: "12.30",
            value: "12.30",
          },
          {
            label: "13.00 ",
            value: "13.00",
          },
          {
            label: "13.30",
            value: "13.30",
          },
          {
            label: "14.00 ",
            value: "14.00",
          },
          {
            label: "14.30",
            value: "14.30",
          },
          {
            label: "15.00 ",
            value: "15.00",
          },
          {
            label: "15.30",
            value: "15.30",
          },
          {
            label: "16.00 ",
            value: "16.00",
          },
          {
            label: "16.30",
            value: "16.30",
          },
          {
            label: "17.00 ",
            value: "17.00",
          },
          {
            label: "17.30",
            value: "17.30",
          },
          {
            label: "18.00 ",
            value: "18.00",
          },
          {
            label: "18.30",
            value: "18.30",
          },
          {
            label: "19.00 ",
            value: "19.00",
          },
          {
            label: "19.30",
            value: "19.30",
          },
          {
            label: "20.00 ",
            value: "20.00",
          },
          {
            label: "20.30",
            value: "20.30",
          },

          {
            label: "21.00 ",
            value: "21.00",
          },
          {
            label: "21.30",
            value: "21.30",
          },
          {
            label: "22.00 ",
            value: "22.00",
          },
          {
            label: "22.30",
            value: "22.30",
          },
          {
            label: "23.00 ",
            value: "23.00",
          },
          {
            label: "23.30",
            value: "23.30",
          },
        ],
        merchantTypeCodeOptions: [
          {
            label: "Stand Alone",
            value: "S",
          },
          {
            label: "Integrated",
            value: "I",
          },
        ],
        currentPosOptions: [
          {
            label: "YES",
            value: "Y",
          },
          {
            label: "NO",
            value: "N",
          },
        ],

        businessTypeOptions: [
          {
            label: "Rented",
            value: "R",
          },
          {
            label: "Owned",
            value: "O",
          },
          {
            label: "Leased",
            value: "L",
          },
        ],
        // acquiringBankOptions: [
        //   {
        //     label: "IOB",
        //     value: 101
        //   },
        //   {
        //     label: "AU",
        //     value: 102
        //   },
        //   {
        //     label: "EQUITAS",
        //     value: 103
        //   }
        // ],
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

        // mcccodeOptions: [
        //   {
        //     label: "Restricted MCC",
        //     value: "100",
        //   },
        //   {
        //     label: "High Risk MCC",
        //     value: "90",
        //   },
        //   {
        //     label: "Medium Risk MCC",
        //     value: "60",
        //   },
        //  {
        //     label: "Low Risk MCC",
        //     value: "30",
        //   },

        // ],

        statezoneOptions: [
          {
            label: "East Zone",
            value: "90",
          },
          {
            label: "West Zone",
            value: "80",
          },
          {
            label: "North Zone",
            value: "70",
          },
          {
            label: "South Zone",
            value: "60",
          },
        ],
        tipFaclityOptions: [
          {
            label: "Yes",
            value: "Y",
          },
          {
            label: "No",
            value: "N",
          },
        ],
        saleFlagOptions: [
          {
            label: "Yes",
            value: "1",
          },
          {
            label: "No",
            value: "0",
          },
        ],
        edcOptions: [
          {
            label: "Yes",
            value: "EDC01",
          },
          {
            label: "No",
            value: "N",
          },
        ],
        internationalCardAcceptanceOptions: [
          {
            label: "Yes",
            value: "Y",
          },
          {
            label: "No",
            value: "N",
          },
        ],
        // preauthFacilityOptions: [
        //   {
        //     label: "Yes",
        //     value: "Y"
        //   },
        //   {
        //     label: "No",
        //     value: "N"
        //   }
        // ],
        creditCardBlockOptions: [
          {
            label: "Yes",
            value: "Y",
          },
          {
            label: "No",
            value: "N",
          },
        ],
        constitutionOptions: [
          {
            label: "Individuals",
            value: "IN",
          },
          {
            label: " Partnership/LLP",
            value: "PL",
          },
          {
            label: "Sole Proprietorship",
            value: "SP",
          },
          {
            label: "Public/Pvt.Ltd",
            value: "PB",
          },
          {
            label: "Trust",
            value: "TR",
          },
          {
            label: "Society",
            value: "SO",
          },
          {
            label: "Other",
            value: "OT",
          },
        ],
        deviceOwnedByOptions: [
          // {
          //   label: "Bijlipay",
          //   value: "B"
          // },
          // {
          //   label: "Merchant",
          //   value: "M"
          // }
          {
            label: "Service Provide(Bijlipay)",
            value: "S",
          },
          {
            label: "BANK",
            value: "B",
          },
          {
            label: "Merchant",
            value: "M",
          },
        ],
        // cashAtPosEnabledOptions: [
        //   {
        //     label: "Yes",
        //     value: "Y"
        //   },
        //   {
        //     label: "No",
        //     value: "N"
        //   }
        // ],
        omcEnabledOptions: [
          {
            label: "Yes",
            value: "Y",
          },
          {
            label: "No",
            value: "N",
          },
        ],
        rentalTypeOptions: [
          {
            label: "Advanced",
            value: "A",
          },
          {
            label: "Regular",
            value: "R",
          },
          {
            label: "EMI",
            value: "E",
          },
        ],
        iaSalutationOptions: [
          {
            label: "MR",
            value: "Mr",
          },
          {
            label: "MRS",
            value: "Mrs",
          },
          {
            label: "Ms",
            value: "Ms",
          },
        ],
        iaGenderOptions: [
          {
            label: "Male",
            value: "M",
          },
          {
            label: "FeMale",
            value: "F",
          },
          {
            label: "Transgender",
            value: "T",
          },
        ],
        od1SalutationOptions: [
          {
            label: "MR",
            value: "Mr",
          },
          {
            label: "MRS",
            value: "Mrs",
          },
          {
            label: "MS",
            value: "Ms",
          },
        ],
        od1GenderOptions: [
          {
            label: "Male",
            value: "M",
          },
          {
            label: "FeMale",
            value: "F",
          },
          {
            label: "Transgender",
            value: "T",
          },
        ],
        od2SalutationOptions: [
          {
            label: "MR",
            value: "Mr",
          },
          {
            label: "MRS",
            value: "Mrs",
          },
          {
            label: "MS",
            value: "Ms",
          },
        ],
        od2GenderOptions: [
          {
            label: "Male",
            value: "M",
          },
          {
            label: "FeMale",
            value: "F",
          },
          {
            label: "Transgender",
            value: "T",
          },
        ],

        d1SalutionOptions: [
          {
            label: "MR",
            value: "Mr",
          },
          {
            label: "MR",
            value: "Mr",
          },
        ],
        states: [
          {
            label: "TamilNadu",
            value: "tamilnadu",
          },
          {
            label: "Karnataka",
            value: "karnataka",
          },
          {
            label: "Andhrapradesh",
            value: "andhrapradesf",
          },
        ],
        city: [
          {
            label: "chennai",
            value: "chennai",
          },
          {
            label: "vellore",
            value: "vellore",
          },
          {
            label: "madurai",
            value: "madurai",
          },
        ],
        fillingTypes: [
          {
            label: "Society",
            value: "society",
          },
          {
            label: "Partnership",
            value: "Partnership",
          },
          {
            label: "LLP",
            value: "LLP",
          },
          {
            label: "Trust",
            value: "Trust",
          },
          {
            label: "Govt",
            value: "Govt",
          },
          {
            label: "Individual",
            value: "Individual",
          },
          {
            label: "Sole",
            value: "Sole",
          },
          {
            label: "Public",
            value: "Public",
          },
          {
            label: "Private",
            value: "Private",
          },
        ],
        subCategory: [
          {
            label: "100-hospital",
            value: "100",
          },
          {
            label: "101-Schools",
            value: "101",
          },
          {
            label: "102-Educations",
            value: "102",
          },
        ],
        categoryCode: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
        ],

        rentalModeOptions: [
          {
            label: "Standing instructions",
            value: "S",
          },
          {
            label: "Normal",
            value: "N",
          },
          {
            label: "Nabad",
            value: "B",
          },
          {
            label: "Invoice for EPRS",
            value: "I",
          },
          {
            label: "Equitas Rental",
            value: "E",
          },
          {
            label: "Big merchant",
            value: "M",
          },
          {
            label: "Invoice to Trade",
            value: "IT",
          },
          {
            label: "Rental Fee Waiver",
            value: "RW",
          },
          {
            label: "Advance Rental",
            value: "AR",
          },
          {
            label: "Settlement",
            value: "SE",
          },
          {
            label: "Exibition",
            value: "EX",
          },
          {
            label: "Clix",
            value: "CX",
          },
          {
            label: "Subvention",
            value: "SB",
          },
          {
            label: "EMI Rental",
            value: "EM",
          },
          {
            label: "BPCL",
            value: "BP",
          },
          {
            label: "Demo Device",
            value: "DD",
          },
          {
            label: "Invoice to Bank",
            value: "IB",
          },
          {
            label: "Finetree Finance LTD",
            value: "FF",
          },
          {
            label: "Deactivated",
            value: "DT",
          },
          {
            label: "APAC FINANCIAL SERVICES PVT LTD",
            value: "AP",
          },
          {
            label: "NEO GROWTH",
            value: "NG",
          },
          {
            label: "Capital Float",
            value: "CF",
          },
          {
            label: "KBL Rent Settlement",
            value: "KS",
          },
          {
            label: "KBL Rent Invoice to Bank",
            value: "KI",
          },
        ],
        advanceRentModeOptions: [
          {
            label: "Card",
            value: "Card",
          },
          {
            label: "Cheque",
            value: "Cheque",
          },
          {
            label: "NEFT",
            value: "NEFT",
          },
          {
            label: "IMPS",
            value: "IMPS",
          },
          {
            label: "Cash",
            value: "Cash",
          },
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

        feeTypeOptions: [
          {
            label: "NEFT",
            value: "N",
          },
          {
            label: "Settlement",
            value: "S",
          },
          {
            label: "None",
            value: "X",
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
        regionOptions: [],
        leadFromOptions: [],
        allDistrict: [],
        tccOptions: [],
        salesPersonOptions: [],
        sharingPartnerOptions: [],
        cityOptions: [],
        stateOptions: [],
        mccSearchSet: [],
        terminalModelSet: [],
        ifscSet: [],
        vasSet: [],
        action: "",
        rentalPlanSet: [],
        mdrSearchSet: [],
        bankListSet: [],
        networkProviderListSet: [],
        serviceProviderListSet: [],
        //  VasTerminalType:[],

        //end >> Actual dropdown options values

        holdPayment: 0,

        formdata: {
          fixed: 0.0,
          percentage: 0.0,
          minimum: 0.0,
        },
        formdata1: {
          fixed: 0.0,
          percentage: 0.0,
          minimum: 0.0,
        },
        // leadDataEntryRemarks: "",
        soSelectedVas: "",
        vasBasedOnInstance: [],
        tmpVasMapping: [],
        leadSourceApp: {},
        // multiTidEnabled: "",
        deviceTypeApp: {},
        salesCode: "",
        salesPerson: "",
        salesPersonName: "",
        devicePrice: "",
        ChequeDatas: "",
        revParamAndLeadInfo: {
          bijlipaySwitch: true,
          vasInstanceMapping: "",
        },
        merchant: {
          device: "",
          revParameters: {
            cashAtPosEnabled: "N",
            tipEnabled: "N",
            saleFlag: "1",
            notificationRecipient: "N",
            // saleEnabled:"",
            preAuth: "N",
            settlementType: "A",

            txnEmiAllowed: "0",
            sodexoEnabled: "0",
            amexEnabled: "0",
            bqrEnabled: "0",
            upichargeslipEnabled: "0",
            linkpaymentFlag: "0",
            matmAllowed: "N",
            upiFlag: "0",
          },
          salesInformation: {
            // leadSourceApp:null,
            // deviceTypeApp:null,

            institutionCode: 101,
            applicationType: "D",
            applicationNumber: "",
            applicationDate: "",
            aggreementDate: "",
            merchantType: "P",
            categoryType: "O",
            region: "",
            salesPersonName: "",
            // salesPersonCode: "",

            // soName:"",
            // regionName:"",
            leadFrom: "",
            // leadSourceName:"",
            // installationBranchCode: "",
            // iaDistrict: "",
            // iaLocation: "",
            // raDistrict: "",
            // od1District: "",
            // od2District: "",
            // lorState: "",
            // iaSalutation: "",
            // iaGender: "",
            // od1Salutation: "",
            // od1Gender: "",
            // od2Salutation: "",
            // od2Gender: "",

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
            rentFixed: "",
          },
          additionalInfo: {
            installationBranchCode: "",
            iaLocation: "",
            iaDistrict: "",
            branchZone: "",
            raDistrict: "",
            od1District: "",
            od2District: "",
            lorState: "",
            iaSalutation: "",
            iaGender: "",
            od1Salutation: "",
            od1Gender: "",
            od2Salutation: "",
            od2Gender: "",
            // ownerFirstName: "",
            // ownerLastName: "",
            // ownerDOB: this.commonDateFormatDOB(this.propLeadDeatils.ownerDOB),
            state: "",
            city: "",
            fillingType: "",
            category: "",
            subCategory: "",
            ownerDOB: "",
            pin: "",
            city: "",
          },
          companyInformation: {
            legalName: "",
            dbaName: "",
            smsFlag: "",
            registeredAddress: "",
            registeredPin: "",
            registeredCityRefCode: "",
            registeredStateRefCode: "",
            constitution: "",
            // constitutionName:JSON.stringify(this.propLeadDeatils.merchantType.merchantTypeName),
            constitutionName: "",
            constitutionDescription: "",
            establishYear: "",
            registerNumber: "",
            pan: "",
            tin: "",
            tan: "",
            businessNature: "",
            businessType: "R",
            // acquiringBank: "",
            mcc: "",
            // intlCardAcceptance: "N",
            // settlementType: "A",
            // tipEnabled: "N",
            // preAuth: "N",
            // creditCardBlock: "N",
            residentialAddress: "",
            residentialPin: "",
            statezone: "",
            cityzone: "",
            // mcccode:"",
            residentialCityRefCode: "",
            residentialStateRefCode: "",
            contactName: "",
            contactMobile: "",
            contactAlternateMobile: "",
            contactPhone: "",
            contactEmail: "",
            // statementType: "P",
            statementType: "E",
            statementFrequency: "D",
            statementEmail: "",
          },
          businessInformation: {
            weekdayStartHour: "",
            weekdayEndHour: "",
            weekendStartHour: "",
            weekendEndHour: "",
            //BusinessHour:"",
            lastTurnoverYear: null,
            maximumMonthlyUsage: "",
            merchantTypeCode: "",
            // currentPos:"",
            lastTurnoverAmount: "",
            expectedCardBusiness: "",
            averageBillAmount: "",
            gstId: null,
            currentPosName: "",
            debitCardMdr: "",
            creditCardMdr: "",
            memberSince: "",
            //  member:"",
            businessIncome: "",
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
              contactEmail: "",
              dob: "",
            },
          ],
          customIncentiveRates: [
            {
              minValue: 200,
              maxValue: 999,
              mechantFixed: 0.5,
              merchantPercent: 0,
              sharingFixed: 0,
              sharingPercent: 0,
              add: 0,
            },
            {
              minValue: 1000,
              maxValue: 1999,
              mechantFixed: 2,
              merchantPercent: 0,
              sharingFixed: 1,
              sharingPercent: 0,
              add: 0,
            },
            {
              minValue: 2000,
              maxValue: 2999,
              mechantFixed: 5,
              merchantPercent: 0,
              sharingFixed: 1,
              sharingPercent: 0,
              add: 0,
            },
            {
              minValue: 3000,
              maxValue: 3499,
              mechantFixed: 9.5,
              merchantPercent: 0,
              sharingFixed: 1,
              sharingPercent: 0,
              add: 0,
            },
            {
              minValue: 3500,
              maxValue: 10000,
              mechantFixed: 5,
              merchantPercent: 0,
              sharingFixed: 2,
              sharingPercent: 0,
              add: 0,
            },
          ],
          paymentDetails: {
            deviceOwnedBy: "S",
            installationFee: "",
            terminalModeCode: "",
            terminalType: "POS",
            cardAcceptance: "1",
            numberOfTerminals: 1,
            emiStartDate: "",
            // cashAtPosEnabled: "Y",
            omcEnabled: false,
            intlCardAcceptance: "N",
            // settlementType: "A",
            // preAuth: "N",
            creditCardBlock: "N",
            tipPercentage: "20",
            rentalPlanCode: 1,
            // amountCollected:"",
            recurringFees: "",
            bankFee: "",
            serviceProvider: 1,
            networkPreferred: 1,
            rentalMode: "S",
            rentalType: "A",
            advanceRentCollected: "",
            advanceRentMode: "NEFT",
            noOfMonthRentPaidInAdvance: "",
            gracePeriod: 0,
            totalEmiAmount: "",
            emiTenure: "",
            otherCharges: "",
            totalAmountPaid: "",
          },
          bankInformation: {
            bankDetails: {
              ifsc: "",
              micr: "",
              bankName: "",
              branchName: "",
              branchCode: "",
              branchZone: "",
              bankCityRefCode: "",
              bankStateRefCode: "",
              paymentMode: "D",
              accountType: "",
              accountdetails: "",
              accountNumber: "",
              bankStatementAttached: "Y",
              cancelChequeAttached: "Y",
              feeType: "N",
              settlementOrNeftFee: "",
            },
            collectionDetails: {
              collectedDate: "",
              swipeAmount: "",
              swipeTerminal: "",
              chequeAmount: "",
              chequeDate: "",
              chequeDepositedDate: "",
              chequeNumber: "",
              upiLink: "",
              acquirerBank: "",
            },
          },
          kyc: {
            documents: [],
          },
          remarks: "",
          // QRcode: "Y",
          mdrPlan: {
            code: 1,
            domesticDebitUpTo2000: {
              fixed: 0.0,
              percentage: 0.0,
              minimum: 99999,
            },
            incentive: {
              percentage: 0.0,
              minimum: 0.0,
              minimumTxnValue: 0,
            },
            domesticDebitAbove2000: {
              fixed: 0.0,
              percentage: 0.0,
              minimum: 99999,
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
            mVisa: {
              fixed: 0.0,
              percentage: 3,
              minimum: 0.0,
            },
            upiUpto2000: {
              fixed: 0.0,
              percentage: 0.0,
              minimum: 0.0,
            },
            diners: {
              fixed: 0.0,
              percentage: 0,
              minimum: 0.0,
            },
            amexDomestic: {
              fixed: 0.0,
              percentage: 0,
              minimum: 0.0,
            },
            amexInternational: {
              fixed: 0.0,
              percentage: 0,
              minimum: 0.0,
            },
            upiAbove2000: {
              fixed: 0.0,
              percentage: 0,
              minimum: 0.0,
            },
            upiCreditUpto2000: {
              fixed: 0.0,
              percentage: 0,
              minimum: 0.0,
            },
            upiCreditAbove2000: {
              fixed: 0.0,
              percentage: 0,
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
          SharingDiscountFee: {
            domesticDebitUpTo2000: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            domesticDebitAbove2000: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            upiUpto2000: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            standardOrClassic: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            premiumOrPlatinum: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            superPremiumOrSignature: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            commercialOrCorporate: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            internationalDebitCard: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            internationalCreditCard: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            onus: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            mVisa: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            diners: {
              fixed: 0.0,
              percentage: 0.0,
              minimum: 0.0,
            },
            amexDomestic: {
              fixed: 0.0,
              percentage: 0.0,
              minimum: 0.0,
            },
            amexInternational: {
              fixed: 0.0,
              percentage: 0.0,
              minimum: 0.0,
            },

            upiAbove2000: {
              fixed: 0.0,
              percentage: 0.0,
              minimum: 0.0,
            },
            upiCreditUpto2000: {
              fixed: 0.0,
              percentage: 0.0,
              minimum: 0.0,
            },
            upiCreditAbove2000: {
              fixed: 0.0,
              percentage: 0.0,
              minimum: 0.0,
            },
            masterPass: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            cashAtPos: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
            convenientFee: {
              fixed: 0,
              percentage: 0,
              minimum: 0,
            },
          },
        },
        error: {
          tab: {
            salesInformation: false,
            companyInformation: false,
            partnerInformation: false,
            businessInformation: false,
            paymentDetails: false,
            revParameters: false,
            // multiTid: false,
            // subTid: false,
            mdrPlan: false,
            SharingDiscountFee: false,
            bankInformation: false,
          },
          field: {
            revParamAndLeadInfo: {
              bijlipaySwitch: {
                alert: false,
                issue: "",
                value: "",
              },
              // edcEnabled: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
            },
            merchant: {
              salesInformation: {
                institutionCode: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                applicationType: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                applicationNumber: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                applicationDate: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                aggreementDate: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                merchantType: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                categoryType: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                region: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                salesPersonName: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                leadFrom: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                // installationBranchCode: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // iaDistrict: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // iaLocation: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // raDistrict: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // od1District: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // od2District: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // lorState: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // iaSalutation: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // iaGender: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // od1Salutation: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // od1Gender: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // od2Salutation: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // od2Gender: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                sharingModelCode: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                sharingPartnerCode: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                dailyFixedAmount: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                loanDisbursementPercentage: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                loanDisbursementAmount: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                loanDisbursementDate: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                tenureMonth: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                tenureDay: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                tenureStartDate: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                rentPercentage: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                rentFixed: {
                  alert: false,
                  issue: "",
                  value: "",
                },
              },
              // additionalInfo: {
              //   installationBranchCode: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   iaLocation: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   iaDistrict: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   branchZone: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   raDistrict: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   od1District: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   od2District: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   lorState: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   iaSalutation: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   iaGender: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   od1Salutation: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   od1Gender: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   od2Salutation: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   od2Gender: {
              //     alert: false,
              //     issue: "",
              //     value: ""
              //   },
              //   state:{
              //     alert:false,
              //     issue:"",
              //     value:""
              //   },
              //   city:{
              //     alert:false,
              //     issue:"",
              //     value:""
              //   },
              // fillingType:{
              //   alert:false,
              //   issue:"",
              //   value:""
              //   },
              // category:{
              //     alert:false,
              //     issue:"",
              //     value:""
              //   },
              //   subCategory:{
              //     alert:false,
              //     issue:"",
              //     value:""
              //   },
              //    ownerDOB:{
              //     alert:false,
              //     issue:"",
              //     value:""
              //   }
              // },
              companyInformation: {
                legalName: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                smsFlag: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                dbaName: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                statezone: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                cityzone: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                // mcccode:{
                //   alert: false,
                //   issue: "",
                //   value: "",
                // },

                registeredAddress: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                registeredPin: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                registeredCityRefCode: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                registeredStateRefCode: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                constitution: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                constitutionName: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                constitutionDescription: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                establishYear: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                registerNumber: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                pan: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                tin: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                tan: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                businessNature: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                businessType: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                // acquiringBank: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                mcc: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                // internationalCardAcceptance: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // autoormanual: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // tipFacility: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },

                // preauthFacility: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // creditCardBlock: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },

                residentialAddress: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                residentialPin: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                residentialCityRefCode: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                residentialStateRefCode: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                contactName: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                contactMobile: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                contactAlternateMobile: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                contactPhone: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                contactEmail: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                statementType: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                statementFrequency: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                statementEmail: {
                  alert: false,
                  issue: "",
                  value: "",
                },
              },
              revParameters: {
                bijlipaySwitch: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                cashAtPosEnabled: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                preAuth: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                settlementType: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                tipEnabled: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                notificationRecipient: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                saleFlag: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                // saleEnabled:{
                //   alert: false,
                //   issue: "",
                //   value: "",
                // },
                // basedInstance:{
                //   alert:false,
                //   issue:"",
                //   value:"",
                // },
                // txnEmiAllowed:{
                //   alert:false,
                //   issue:"",
                //   value:"",
                // },
                // sodexoEnabled:{
                //  alert:false,
                //   issue:"",
                //   value:"",
                // },
                //  amexEnabled:{
                //    alert:false,
                //   issue:"",
                //   value:"",
                //  },
                //    intlCardACardAcceptance:{
                //     alert:false,
                //   issue:"",
                //   value:"",
                //    },
                //     bqrEnabled:{
                //         alert:false,
                //          issue:"",
                //         value:"",
                //     },
                //  upiFlag:{
                //   alert:false,
                //   issue:"",
                //   value:"",
                //  },
                //   linkpaymentFlag:{
                //   alert:false,
                //   issue:"",
                //   value:"",
                //   },
                //    matmEnabled:{
                //      alert:false,
                //   issue:"",
                //   value:"",
                //    },
                //     upichargeslipEnabled:{
                //        alert:false,
                //   issue:"",
                //   value:"",
                //     },
              },
              businessInformation: {
                weekdayStartHour: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                weekdayEndHour: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                // BusinessHour:{
                //   alert: false,
                //   issue: "",
                //   value: "",

                // },
                weekendStartHour: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                weekendEndHour: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                lastTurnoverYear: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                maximumMonthlyUsage: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                merchantTypeCode: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                // currentPos:{
                //    alert: false,
                //   issue: "",
                //   value: "",
                // },
                lastTurnoverAmount: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                expectedCardBusiness: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                averageBillAmount: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                gstId: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                currentPosName: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                debitCardMdr: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                creditCardMdr: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                memberSince: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                // member:{
                //    alert: false,
                //   issue: "",
                //   value: "",
                // },
                businessIncome: {
                  alert: false,
                  issue: "",
                  value: "",
                },
              },
              partnerInformation: [
                {
                  name: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  dob: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  address: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  pan: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  pin: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  stateRefCode: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  cityRefCode: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  contactMobile: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  contactEmail: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
              ],
              paymentDetails: {
                deviceOwnedBy: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                emiStartDate: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                installationFee: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                terminalModeCode: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                terminalType: {
                  alert: false,
                  issue: "",
                  value: "",
                },

                numberOfTerminals: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                // cashAtPosEnabled: {
                //   alert: false,
                //   issue: "",
                //   value: "",
                // },
                omcEnabled: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                intlCardAcceptance: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                // settlementType: {
                //   alert: false,
                //   issue: "",
                //   value: "",
                // },
                // tipEnabled: {
                //   alert: false,
                //   issue: "",
                //   value: "",
                // },
                // preAuth: {
                //   alert: false,
                //   issue: "",
                //   value: "",
                // },
                creditCardBlock: {
                  alert: false,
                  issue: "",
                  value: "",
                },

                rentalPlanCode: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                serviceProvider: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                networkPreferred: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                rentalMode: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                rentalType: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                advanceRentCollected: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                advanceRentMode: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                noOfMonthRentPaidInAdvance: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                gracePeriod: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                totalEmiAmount: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                emiTenure: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                otherCharges: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                totalAmountPaid: {
                  alert: false,
                  issue: "",
                  value: "",
                },
                // txnEmiAllowed:{
                //   alert:false,
                //   issue:"",
                //   value:"",
                // },
                // sodexoEnabled:{
                //  alert:false,
                //   issue:"",
                //   value:"",
                // },
                //  amexEnabled:{
                //    alert:false,
                //   issue:"",
                //   value:"",
                //  },
                //  intlCardACardAcceptance:{
                //   alert:false,
                // issue:"",
                // value:"",
                //  },
                // bqrEnabled:{
                //     alert:false,
                //      issue:"",
                //     value:"",
                // },
                //  upiFlag:{
                //   alert:false,
                //   issue:"",
                //   value:"",
                //  },
                // linkpaymentFlag:{
                // alert:false,
                // issue:"",
                // value:"",
                // },
                //  matmEnabled:{
                //    alert:false,
                // issue:"",
                // value:"",
                //  },
                //   upichargeslipEnabled:{
                //      alert:false,
                // issue:"",
                // value:"",
                //   },
                // city: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // states: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // fillingTypes: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
                // category:{
                //   alert:false,
                //   issue:"",
                //   value:""
                // },
                // subCategory: {
                //   alert: false,
                //   issue: "",
                //   value: ""
                // },
              },
              bankInformation: {
                bankDetails: {
                  ifsc: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  micr: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  bankName: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  branchName: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  // branchCode: {
                  //   alert: false,
                  //   issue: "",
                  //   value: ""
                  // },
                  // branchZone: {
                  //   alert: false,
                  //   issue: "",
                  //   value: ""
                  // },
                  bankCityRefCode: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  bankStateRefCode: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  paymentMode: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  accountType: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  accountdetails: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  accountNumber: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  bankStatementAttached: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  cancelChequeAttached: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  feeType: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  settlementOrNeftFee: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                collectionDetails: {
                  collectedDate: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  swipeAmount: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  swipeTerminal: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  chequeAmount: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  chequeDate: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  chequeDepositedDate: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  chequeNumber: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  upiLink: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  acquirerBank: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
              },
              mdrPlan: {
                domesticDebitUpTo2000: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                // incentive: {
                //   percentage: {
                //     alert: false,
                //     issue: "",
                //     value: ""
                //   },
                //   minimum: {
                //     alert: false,
                //     issue: "",
                //     value: ""
                //   },
                //   minimumTxnValue: {
                //     alert: false,
                //     issue: "",
                //     value: ""
                //   },

                // },
                domesticDebitAbove2000: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                upiUpto2000: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                standardOrClassic: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                premiumOrPlatinum: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                superPremiumOrSignature: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                commercialOrCorporate: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                internationalDebitCard: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                internationalCreditCard: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                onus: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                mVisa: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                diners: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                amexDomestic: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                amexInternational: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                upiAbove2000: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                upiCreditUpto2000: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                upiCreditAbove2000: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                masterPass: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                cashAtPos: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },

                convenientFee: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
              },
              SharingDiscountFee: {
                domesticDebitUpTo2000: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                domesticDebitAbove2000: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                upiUpto2000: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                standardOrClassic: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                premiumOrPlatinum: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                superPremiumOrSignature: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                commercialOrCorporate: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                internationalDebitCard: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                internationalCreditCard: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                onus: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                mVisa: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                diners: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                amexDomestic: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                amexInternational: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                upiAbove2000: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                upiCreditUpto2000: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                upiCreditAbove2000: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                masterPass: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
                cashAtPos: {
                  fixed: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  percentage: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                  minimum: {
                    alert: false,
                    issue: "",
                    value: "",
                  },
                },
              },
            },
          },
        },
        model: true,
        toggleChequeImageResult: false,
        toggleDocPanResult: false,
        toggleDocAadharResult: false,
        checked: false,
        thumbnailsHorizontal: false,

        populatedDocumentUrl: false,
        showDocumentPreview: true,
        showOpenPaymentChequeInfo: false,
      };
    },

    computed: {
      ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
      // ...mapGetters("SatLeadValidation", ["getShortLeadInfo"]),
      ...mapGetters("SatLeadValidation", [
        "getShortLeadInfo",
        "getDeviceVerificationStatus",
      ]),
      ...mapGetters("VasCheck", ["getInstance"]),
      ...mapGetters("leadSourceVasDeviceConfig", ["getLsDeviceBasedVasDetails"]),
      ...mapGetters("AllZone", ["getAllZone"]),
      ...mapGetters("IA_LOCATION", ["getiaLocation"]),
      ...mapGetters("District", ["getAllDistrict"]),
      ...mapGetters("BranchName", ["getAllBranchName"]),
      ...mapGetters("StateName", ["getiorState"]),
      ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
      ...mapGetters("mars_regions", ["regionsFromMars"]),
      ...mapGetters("mars_leadFrom", ["leadFromInfoFromMars"]),
      ...mapGetters("MccBasedLeadSource", ["getmccBasedLeadsource"]),
      ...mapGetters("mars_salesPerson", ["salesPersonFromMars"]),
      ...mapGetters("mars_sharingPartner", ["sharingPartnerFromMars"]),
      ...mapGetters("sharingModeBasedOnSharingPartnerCode", [
        "sharingPartnerCode",
      ]),
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
      ...mapGetters("MPOST_FILLINGTYPES", ["getAllFillingTypes"]),
      ...mapGetters("MPOS_STATE", ["getMposState"]),
      ...mapGetters("MPOS_CITY", ["getMposCity"]),
      ...mapGetters("MPOS_CATEGORY", ["getMposCategory"]),
      ...mapGetters("MPOS_SUBCATEGORY", ["getMposSubCategory"]),
      ...mapGetters("InstitutionCode", ["getinstitutionCode"]),
      ...mapGetters("AxisBankPincode", ["getAxisBankPincode"]),
      ...mapGetters("PincodeBasedDistrict", ["getPincodeBasedDistrict"]),
      ...mapGetters("StateBasedDistrict", ["getPincodeDistrict"]),
      ...mapGetters("CityBasedLocation", ["getCityBasedLocation"]),
      ...mapGetters("applicationNumberFromAPI", ["getApplicationNumber"]),

      //Validation functions
      // T => Transaction value model
      getAxisBank() {
        return this.merchant.salesInformation.leadFrom == "OPEN MARKET"
          ;
      },
      getMpos() {
        return this.merchant.paymentDetails.terminalType == "MPOS" ;
      },

      getTransctionValueModel() {
        return this.merchant.salesInformation.sharingModelCode == "T"
          ;
      },
      // M => MDR/cash@pos/rent
      getCashAtPos() {
        return this.merchant.salesInformation.sharingModelCode == "M"
          ;
      },
      // M => MDR/cash@pos/rent
      // getPartnersVisiblity() {
      //   return this.$PARTNERS_TAB_ENABLED_ITEMS.includes(
      //     this.merchant.companyInformation.constitution
      //   )
      //     ? true
      //     : false;
      // },
      // R=> rental type /= Rental
      getRentalTypeVisibilityForRental() {
        return this.merchant.paymentDetails.rentalType == "R" ;
      },
      // A=> rental type /= Advanced
      getRentalTypeVisibilityForAdvanced() {
        return this.merchant.paymentDetails.rentalType == "A" ;
      },
      getRentalTypeVisibilityForEmi() {
        return this.merchant.paymentDetails.rentalType == "E" ;
      },
      // A=> rental type /= Advanced
      getfeeTypeForSettlementVisibility() {
        return this.merchant.bankInformation.bankDetails.feeType == "N" ||
          this.merchant.bankInformation.bankDetails.feeType == "S"
          ;
      },
      showOnlyIfSharingModelIsEnabled() {
        // N => No sharing
        return this.merchant.salesInformation.sharingModelCode != "N"
          ;
      },
      chequeNumberValidation() {
        return this.propLeadDeatils.paymentOption == 2 ? 6 : 25;
      },
      bankInfoSwipePayment() {
        return this.propLeadDeatils.paymentOption == 3 ;
      },
      bankInfoChequePayment() {
        return this.propLeadDeatils.paymentOption == 2 ;
      },
      bankInfoUpiLink() {
        return this.propLeadDeatils.paymentOption == 4 ;
      },
      getStatementType() {
        return this.merchant.companyInformation.statementType == "E"
          ;
      },
      getmpose() {
        return this.merchant.businessInformation.currentPosName == "Y"
          ;
      },
      //////////////////////////////////////////////////////
    },

    validations: {
      revParamAndLeadInfo: {
        bijlipaySwitch: {
          required,
        },
      },
      // terminalModel: {
      //   required
      // },
      merchant: {
        salesInformation: {
          institutionCode: {
            required: requiredIf(function () {
              return this.getInstitutionBank === true;
            }),
          },
          applicationType: {
            required,
          },
          applicationNumber: {
            required,
            alphaNum,
          },
          applicationDate: {
            required,
          },
          aggreementDate: {
            required,
          },
          salesPersonName: {
            required,
          },
          region: {
            required,
          },
          merchantType: {
            required,
          },
          categoryType: {
            required,
          },

          // leadFrom: {
          //   required
          // },
          leadFrom: {
            required: requiredIf(function () {
              return this.getAxisBank === true;
            }),
          },
          // installationBranchCode: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // iaDistrict: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // iaLocation: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // raDistrict: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // od1District: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // od2District: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // lorState: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // iaSalutation: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // iaGender: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // od1Salutation: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // od1Gender: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // od1Salutation: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // od2Gender: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // od2Salutation: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },
          // od1Gender: {
          //   required: requiredIf(function() {
          //     return this.getAxisBank === true;
          //   })
          // },

          sharingPartnerCode: {
            required: requiredIf(function () {
              return (
                this.getTransctionValueModel === true ||
                this.getCashAtPos === true
              );
            }),
          },
          dailyFixedAmount: {
            required: requiredIf(function () {
              return this.getTransctionValueModel === true;
            }),
            decimal,
            minValue: minValue(0),
            maxValue: maxValue(99999.99),
            minLength: minLength(1),
            maxLength: maxLength(7),
          },
          loanDisbursementPercentage: {
            required: requiredIf(function () {
              return this.getTransctionValueModel === true;
            }),
            decimal,
            minValue: minValue(0),
            maxValue: maxValue(100),
          },
          loanDisbursementAmount: {
            required: requiredIf(function () {
              return this.getTransctionValueModel === true;
            }),
            decimal,
            minValue: minValue(0),
            maxValue: maxValue(99999999.99),
            maxLength: maxLength(10),
            minLength: minLength(2),
          },
          loanDisbursementDate: {
            required: requiredIf(function () {
              return this.getTransctionValueModel === true;
            }),
          },
          tenureMonth: {
            required: requiredIf(function () {
              return this.getTransctionValueModel === true;
            }),
            integer,
            minValue: minValue(0),
          },
          tenureDay: {
            required: requiredIf(function () {
              return this.getTransctionValueModel === true;
            }),
            integer,
            minValue: minValue(0),
          },
          tenureStartDate: {
            required: requiredIf(function () {
              return this.getTransctionValueModel === true;
            }),
          },
          rentPercentage: {
            required: requiredIf(function () {
              return this.getCashAtPos === true;
            }),
            maxValue: maxValue(100),
            decimal,
            minValue: minValue(0),
          },
          rentFixed: {
            required: requiredIf(function () {
              return this.getCashAtPos === true;
            }),
            decimal,
            minValue: minValue(0),
          },
        },
        // additionalInfo: {
        //   installationBranchCode: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   iaLocation: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   iaDistrict: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   branchZone: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   raDistrict: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   od1District: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   od2District: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },

        //   ownerDOB:{
        //       required
        //   },
        //   lorState: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   iaSalutation: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   iaGender: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   od1Salutation: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   od1Gender: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   od1Salutation: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   od2Gender: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   od2Salutation: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        //   od1Gender: {
        //     required: requiredIf(function() {
        //       return this.getAxisBank === true;
        //     })
        //   },
        // state:{
        //     required: requiredIf(function() {
        //     return this.getMpos === true;
        //   })
        // },
        // city:{
        //     required: requiredIf(function() {
        //     return this.getMpos === true;
        //   })

        // },
        // fillingType:{
        //    required: requiredIf(function() {
        //     return this.getMpos === true;
        //   })

        // },
        // category:{
        //     required: requiredIf(function() {
        //     return this.getMpos === true;
        //   })
        // },
        // subCategory:{
        //     required: requiredIf(function() {
        //     return this.getMpos === true;
        //   })

        // }
        // },
        companyInformation: {
          legalName: {
            required,
            minLength: minLength(0),
            maxLength: maxLength(60),
            alpha,
            // alphaNumericSpecialValidate
          },
          dbaName: {
            required,
            minLength: minLength(0),
            maxLength: maxLength(60),
            alphaNumericSpecialValidate,
          },
          smsFlag: {
            required,
          },

          registeredAddress: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(120),
          },
          registeredPin: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(6),
          },
          registeredCityRefCode: {
            required,
            integer,
          },
          registeredCityName: {
            required,
          },
          registeredStateRefCode: {
            required,
            integer,
          },
          registeredStateName: {
            required,
          },
          statezone: {
            required,
          },
          cityzone: {
            required: false,
            alpha,
          },
          // mcccode:{
          //     required,
          // },
          constitution: {
            required,
          },
          establishYear: {
            required,
          },
          constitutionName: {
            required,
          },
          registerNumber: {
            required,
            alphaNum,
            minLength: minLength(1),
            maxLength: maxLength(20),
          },

          mccname: {
            required,
          },
          mcc: {
            required,
          },
          // internationalCardAcceptance: {
          //   required
          // },
          // autoormanual: {
          //   required
          // },
          // tipFacility: {
          //   required
          // },
          // preauthFacility: {
          //   required
          // },
          // creditCardBlock: {
          //   required
          // },
          // acquiringBank: {
          //   required
          // },
          residentialAddress: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(120),
          },
          residentialPin: {
            required,
            integer,
            minLength: minLength(6),
            maxLength: maxLength(6),
          },
          residentCityName: {
            required,
          },
          residentialCityRefCode: {
            required,
            integer,
          },
          residentStateName: {
            required,
          },
          residentialStateRefCode: {
            required,
            integer,
          },
          pan: {
            required,
            panCard,
            maxLength: maxLength(10),
            minLength: minLength(10),
          },
          tin: {
            required: false,
            integer,
            minLength: minLength(9),
            maxLength: maxLength(12),
          },
          tan: {
            required: false,
            maxLength: maxLength(10),
            minLength: minLength(10),
            tanValidate,
          },
          contactName: {
            required,
            minLength: minLength(0),
            maxLength: maxLength(30),
            alphaNumericValidate,
          },
          contactMobile: {
            numeric,
            required,
            minLength: minLength(10),
            maxLength: maxLength(10),
          },
          contactAlternateMobile: {
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(10),
          },
          contactPhone: {
            numeric,
            required,
            minLength: minLength(12),
            maxLength: maxLength(12),
          },
          contactEmail: {
            required,
            email,
          },
          statementEmail: {
            required,
            //  requiredIf(function() {
            //   return this.getStatementType === true;
            // }),
            email,
          },
          statementType: {
            required,
          },
          statementFrequency: {
            required,
          },
        },
        businessInformation: {
          gstId: {
            // required,
            gstn,
            minLength: minLength(15),
            maxLength: maxLength(15),
          },
          weekendEndHour: {
            // timeValidate,
            required,
          },
          weekendStartHour: {
            // timeValidate,
            required,
          },
          weekdayEndHour: {
            // timeValidate,
            required,
          },
          weekdayStartHour: {
            // timeValidate,
            required,
          },
          // BusinessHour:{
          //    required,
          // },
          memberSince: {
            // Removing the validation as per client request
            required,
          },
          //  member:{
          //    required,
          //  },
          currentPosName: {
            required,
          },
          // debitCardMdr: {
          //   decimal,
          //   minValue: minValue(0),
          //   maxValue: maxValue(99.99)
          // },
          debitCardMdr: {
            required: requiredIf(function () {
              return this.getmpose === true;
            }),
            minValue: minValue(0),
            maxValue: maxValue(99.99),
          },
          creditCardMdr: {
            required: requiredIf(function () {
              return this.getmpose === true;
            }),
            minValue: minValue(0),
            maxValue: maxValue(99.99),
          },
          expectedCardBusiness: {
            decimal,
            required,
            minValue: minValue(0),
            maxValue: maxValue(9999999999.99),
          },
          averageBillAmount: {
            decimal,
            minValue: minValue(0),
            maxValue: maxValue(9999999999.99),
          },
          lastTurnoverAmount: {
            decimal,
            minValue: minValue(0),
            maxValue: maxValue(9999999999.99),
          },
          lastTurnoverYear: {
            required: false,
          },
          maximumMonthlyUsage: {
            decimal,
            required,
            minValue: minValue(0),
            maxValue: maxValue(9999999999.99),
          },
          merchantTypeCode: {
            required,
          },
          // currentPos:{
          //   required,
          // },
        },
        paymentDetails: {
          installationFee: {
            required: requiredIf(function () {
              return this.getRentalTypeVisibilityForRental === true;
            }),
            decimal,
            minValue: minValue(0),
            maxValue: maxValue(999999.99),
            minLength: minLength(1),
            maxLength: maxLength(12),
          },
          rentalPlanCode: {
            required,
          },
          emiStartDate: {
            required: requiredIf(function () {
              return this.getRentalTypeVisibilityForEmi === true;
            }),
          },
          // txnEmiAllowed:{
          // //  required,
          // },
          // sodexoEnabled:{
          //      //  required,
          // },
          // amexEnabled:{
          //    //  required,
          // },
          // intlCardACardAcceptance:{
          //   //  required,
          // },
          // bqrEnabled:{
          //   //  required,
          // },
          // upiFlag:{
          //    //  required,
          // },
          // linkpaymentFlag:{
          //  //  required,
          // },
          // matmEnabled:{
          //   //  required,
          // },
          // upichargeslipEnabled:{
          //      //  required,
          // },
          serviceProvider: {
            required: true,
          },
          networkPreferred: {
            required: true,
          },
          terminalModeCode: {
            required,
          },
          terminalType: {
            required: requiredIf(function () {
              return this.getMpos === true;
            }),
          },

          // devicePrice: {
          //   decimal,
          //   minValue: minValue(0),
          //   maxValue: maxValue(999999.99),
          //   minLength: minLength(1),
          //   maxLength: maxLength(8),
          // },
          otherCharges: {
            decimal,
            minValue: minValue(0),
            maxValue: maxValue(999999),
            minLength: minLength(1),
            maxLength: maxLength(8),
          },
          totalAmountPaid: {
            decimal,
            minValue: minValue(0),
            maxValue: maxValue(999999),
            minLength: minLength(1),
            maxLength: maxLength(12),
          },
          // city: {
          //     required: requiredIf(function() {
          //     return this.getMpos === true;
          //   })
          // },
          // states: {
          //     required: requiredIf(function() {
          //     return this.getMpos === true;
          //   })
          // },
          // fillingTypes: {
          //     required: requiredIf(function() {
          //     return this.getMpos === true;
          //   })
          // },
          // category: {
          //     required: requiredIf(function() {
          //     return this.getMpos === true;
          //   })
          // },
          // subCategory:{
          //     required: requiredIf(function() {
          //     return this.getMpos === true;
          //   })

          // },

          numberOfTerminals: {
            numeric,
            minValue: minValue(1),
            maxValue: maxValue(100),
          },
          deviceOwnedBy: {
            required,
          },
          // cashAtPosEnabled: {
          //   required,
          // },
          omcEnabled: {
            required,
          },
          intlCardAcceptance: {
            required,
          },
          // settlementType: {
          //   required,
          // },
          // tipEnabled: {
          //   required,
          // },
          // preAuth: {
          //   required,
          // },
          creditCardBlock: {
            required,
          },
          rentalType: {
            required,
          },
          advanceRentCollected: {
            required: requiredIf(function () {
              return this.getRentalTypeVisibilityForAdvanced === true;
            }),
            decimal,
            minValue: minValue(0),
            maxValue: maxValue(999999),
            minLength: minLength(1),
            maxLength: maxLength(8),
          },
          advanceRentMode: {
            required: requiredIf(function () {
              return this.getRentalTypeVisibilityForAdvanced === true;
            }),
          },
          noOfMonthRentPaidInAdvance: {
            required: requiredIf(function () {
              return this.getRentalTypeVisibilityForAdvanced === true;
            }),
            minValue: minValue(0),
            maxValue: maxValue(999999),
            minLength: minLength(1),
            maxLength: maxLength(8),
          },
          gracePeriod: {
            required: requiredIf(function () {
              return this.getRentalTypeVisibilityForRental === true;
            }),
            minValue: minValue(0),
            maxValue: maxValue(999999),
            minLength: minLength(1),
            maxLength: maxLength(8),
          },
          totalEmiAmount: {
            required: requiredIf(function () {
              return this.getRentalTypeVisibilityForEmi === true;
            }),
          },
          emiTenure: {
            required: requiredIf(function () {
              return this.getRentalTypeVisibilityForEmi === true;
            }),
          },
        },
        revParameters: {
          // basedInstance:{
          //   required,
          // },
          // matmEnabled:{
          //  required,
          // },
          // bijlipaySwitch:{
          // required,
          // },
          cashAtPosEnabled: {
            required,
          },
          settlementType: {
            required,
          },
          preAuth: {
            required,
          },
          tipEnabled: {
            required,
          },
          notificationRecipient: {
            required,
          },
          saleFlag: {
            required,
          },
          // saleEnabled:{
          //   required,
          // },
          // basedInstance:{
          //   required,
          // },
          // txnEmiAllowed:{
          // //  required,
          // },
          // sodexoEnabled:{
          //      //  required,
          // },
          // amexEnabled:{
          //    //  required,
          // },
          // intlCardACardAcceptance:{
          //   //  required,
          // },
          // bqrEnabled:{
          //   //  required,
          // },
          // upiFlag:{
          //    //  required,
          // },
          // linkpaymentFlag:{
          //  //  required,
          // },
          // matmEnabled:{
          //   //  required,
          // },
          // upichargeslipEnabled:{
          //      //  required,
          // },
        },
        bankInformation: {
          bankDetails: {
            ifsc: {
              required,
              alphaNum,
              maxLength: maxLength(11),
            },
            micr: {
              required,
              numeric,
              minLength: minLength(9),
              maxLength: maxLength(9),
            },
            branchName: {
              required,
            },
            // branchCode: {
            //   required
            // },
            // branchZone: {
            //   required
            // },
            bankName: {
              required,
            },
            bankCityName: {
              required,
            },
            bankCityRefCode: {
              required,
              numeric,
            },
            accountNumber: {
              required,
              alphaNum,
              minLength: minLength(6),
              maxLength: maxLength(19),
            },
            bankStateName: {
              required,
            },
            bankStateRefCode: {
              required,
              numeric,
            },
            paymentMode: {
              required,
            },
            accountType: {
              required,
            },
            accountdetails: {
              required,
            },
            settlementOrNeftFee: {
              required: requiredIf(function () {
                return this.getfeeTypeForSettlementVisibility === true;
              }),
              integer,
              maxValue: maxValue(999),
              minValue: minValue(0),
            },
          },
          collectionDetails: {
            collectedDate: {
              required: requiredIf(function () {
                return this.bankInfoSwipePayment === true;
              }),
            },
            swipeAmount: {
              decimal,
              required: requiredIf(function () {
                return this.bankInfoSwipePayment === true;
              }),
              minValue: minValue(0),
            },
            swipeTerminal: {
              required: requiredIf(function () {
                return this.bankInfoSwipePayment === true;
              }),
            },
            chequeAmount: {
              decimal,
              required: requiredIf(function () {
                return this.bankInfoChequePayment === true;
              }),
              minValue: minValue(0),
            },
            chequeNumber: {
              alphaNum,
              // required,
              required: requiredIf(function () {
                return this.bankInfoChequePayment === true;
              }),
              minLength: minLength(6),
              maxLength: maxLength(25),
            },
            upiLink: {
              required,
              required: requiredIf(function () {
                return this.bankInfoUpiLink === true;
              }),
            },
            chequeDate: {
              required: requiredIf(function () {
                return this.bankInfoChequePayment === true;
              }),
            },
            chequeDepositedDate: {
              required: requiredIf(function () {
                return this.bankInfoChequePayment === true;
              }),
            },
          },
        },
        kyc: {
          documents: [],
        },
        mdrPlan: {
          domesticDebitUpTo2000: {
            fixed: {
              minValue: minValue(0),
              decimal,
              // required
            },
            percentage: {
              minValue: minValue(0),
              // required,
              maxValue: maxValue(100),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              // required
            },
          },
          // incentive: {
          //   percentage: {
          //     minValue: minValue(0),
          //     required,
          //     maxValue: maxValue(100)
          //   },
          //   minimum: {
          //     minValue: minValue(0),
          //     required,
          //     maxValue: maxValue(100)
          //   },
          //   minimumTxnValue: {
          //     minValue: minValue(0),
          //     required,
          //     maxValue: maxValue(100)
          //   },

          // },
          domesticDebitAbove2000: {
            fixed: {
              minValue: minValue(0),
              decimal,
              // required
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              // required
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              // required
            },
          },
          upiUpto2000: {
            fixed: {
              minValue: minValue(0),
              decimal,
              // required
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              // required
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              // required
            },
          },
          standardOrClassic: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
          premiumOrPlatinum: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
          superPremiumOrSignature: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
          commercialOrCorporate: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
          internationalDebitCard: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
          internationalCreditCard: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
          onus: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
          mVisa: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
          diners: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
          amexDomestic: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
          amexInternational: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
          upiAbove2000: {
            fixed: {
              minValue: minValue(0),
              decimal,
              // required
            },
            percentage: {
              minValue: minValue(0),
              // required,
              maxValue: maxValue(100),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              // required
            },
          },
          upiCreditUpto2000: {
            fixed: {
              minValue: minValue(0),
              decimal,
              // required
            },
            percentage: {
              minValue: minValue(0),
              // required,
              maxValue: maxValue(100),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              // required
            },
          },
          upiCreditAbove2000: {
            fixed: {
              minValue: minValue(0),
              decimal,
              // required
            },
            percentage: {
              minValue: minValue(0),
              // required,
              maxValue: maxValue(100),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              // required
            },
          },

          masterPass: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
          cashAtPos: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required,
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required,
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required,
            },
          },
        },

        SharingDiscountFee: {
          domesticDebitUpTo2000: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
              maxValue: maxValue(100),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          domesticDebitAbove2000: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          upiUpto2000: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          standardOrClassic: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          premiumOrPlatinum: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          superPremiumOrSignature: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          commercialOrCorporate: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          internationalDebitCard: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          internationalCreditCard: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          onus: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          mVisa: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          diners: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          amexDomestic: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          amexInternational: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          upiAbove2000: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          upiCreditUpto2000: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          upiCreditAbove2000: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          masterPass: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
          cashAtPos: {
            fixed: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            percentage: {
              minValue: minValue(0),
              maxValue: maxValue(100),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
            minimum: {
              minValue: minValue(0),
              decimal,
              required: requiredIf(function () {
                return this.showOnlyIfSharingModelIsEnabled === true;
              }),
            },
          },
        },
      },
      viewBinding: {
        partnersArr: {
          required: requiredIf(function () {
            return this.getPartnersVisiblity;
          }),
          $each: {
            name: {
              required,
              minLength: minLength(1),
              maxLength: maxLength(120),
              alphaNumericValidate,
            },
            dob: {
              required,
            },
            address: {
              minLength: minLength(1),
              maxLength: maxLength(120),
              required,
            },
            pan: {
              required,
              panCard,
              maxLength: maxLength(10),
              minLength: minLength(10),
            },
            pin: {
              required,
              integer,
              minLength: minLength(6),
              maxLength: maxLength(7),
            },
            stateRefCode: {
              required,
              integer,
            },
            stateRefLabel: {
              required,
            },
            cityRefCode: {
              required,
              integer,
            },
            cityRefLabel: {
              required,
            },
            contactMobile: {
              required,
              integer,
              minLength: minLength(10),
              maxLength: maxLength(10),
            },
            contactEmail: {
              required,
              email,
            },
          },
        },
      },
    },

    beforeMount() {
      // >>View binding
      this.viewBinding = {
        sharingModelCode: [
          {
            label: "No sharing",
            value: "N",
          },
          {
            label: "Transaction value model",
            value: "T",
          },
          {
            label: "MDR/cash@pos/rent",
            value: "M",
          },
        ],
        accountdetails: [
          {
            label: "YES",
            value: "60",
          },
          {
            label: "NO",
            value: "90",
          },
        ],
        member: [
          {
            label: "1-3 years",
            value: "90",
          },
          {
            label: " 3-5 years",
            value: "70",
          },
          {
            label: " > 5 years",
            value: "50",
          },
        ],
        od1_gender: [
          {
            label: "Male",
            value: "M",
          },
          {
            label: "Female",
            value: "F",
          },
          {
            label: "Transgender",
            value: "T",
          },
        ],
        od2_gender: [
          {
            label: "Male",
            value: "M",
          },
          {
            label: "Female",
            value: "F",
          },
          {
            label: "Transgender",
            value: "T",
          },
        ],
        statementType: [
          {
            label: "E-Statement",
            value: "E",
          },
          // {
          //   label: "Paper statement",
          //   value: "P"
          // }
        ],
        statementFrequency: [
          {
            label: "Daily",
            value: "D",
          },
          {
            label: "Monthly",
            value: "M",
          },
          {
            label: "Quaterly",
            value: "Q",
          },
          {
            label: "Half yearly",
            value: "H",
          },
          {
            label: "Yearly",
            value: "Y",
          },
          {
            label: "None",
            value: "N",
          },
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
            contactEmail: "",
          },
        ],
      };
      //<< View binding
      this.fetchAllDropdownValuesFromMARSapi(
        this.merchant.salesInformation.institutionCode
      );
      this.varaneekInstance();
      /* Populating values from FOS */
      // this.tmpVasMapping = this.VasSelected();
      // this.leadId = $route.propLeadDeatils.id;

      if (this.propLeadDeatils.leadSource.sourceName === "LS_TOHANDS") {
        console.log("LEAD SOURCE INSIDE TO HANDS")
        let leadid = this.propLeadDeatils.id;
        this.applicationNumberFromToHands(leadid);
      }
      else {
        this.merchant.salesInformation.applicationNumber = new Date().getTime();
        // let leadid1 = this.propLeadDeatils.id;
        console.log("LEAD SOURCE INSIDE THIS")
        // console.log("LEAD ID",leadid1)
      }
      // this.merchant.salesInformation.applicationNumber = new Date().getTime();
      console.log("PROPS DETAILS------------>", this.propLeadDeatils);

      this.subventionBankFeeData = this.propLeadDeatils.bankFee;
      this.merchant.companyInformation.constitution =
        this.propLeadDeatils.merchantType.marsMappingId;

      this.merchant.companyInformation.dbaName = this.propLeadDeatils.leadName;
      //  console.log("PROPS DETAILS------------>", this.propLeadDeatils);
      console.log(
        "this.getShortLeadInfo.vasInstanceMapping --->",
        this.getShortLeadInfo.vasInstanceMapping
      );
      this.soSelectedVas = this.getShortLeadInfo.vasInstanceMapping
        .replaceAll('"', "")
        .replace("[", "")
        .replace("]", "");
      this.revParamAndLeadInfo.bijlipaySwitch =
        this.propLeadDeatils.bijlipaySwitch;
      this.merchant.companyInformation.contactMobile =
        this.propLeadDeatils.contactNumber;
      this.merchant.companyInformation.contactName =
        this.propLeadDeatils.contactName;
      this.merchant.companyInformation.registeredAddress =
        this.propLeadDeatils.leadAddress;
      this.merchant.companyInformation.registeredPin =
        this.propLeadDeatils.pincode;
      this.merchant.companyInformation.contactName =
        this.propLeadDeatils.contactName;
      this.merchant.companyInformation.contactMobile =
        this.propLeadDeatils.contactNumber;
      this.merchant.paymentDetails.numberOfTerminals =
        this.propLeadDeatils.deviceCount;
      this.merchant.salesInformation.categoryType = this.soSelectedVas.includes(
        "Small merchant"
      )
        ? "S"
        : "O";
      //recurring fees is plan based amount selected by wip lead
      this.merchant.paymentDetails.recurringFees =
        this.propLeadDeatils.recurringFees;
      this.propLeadDeatils.recurringFees;
      this.bankFee = this.propLeadDeatils.recurringFees / 1.18;
      // this.propLeadDeatils.recurringFees * 0.18;
      const PercentageReduceData = this.bankFee;
      this.originalBankFeeData = PercentageReduceData;
      this.bankFee = this.originalBankFeeData;
      // if(this.merchant.paymentDetails.rentalMode == 'SB'){
      console.log("INSIDE PercentageReduceData  ", this.bankFee);
      // this.subventionBankFeeData = this.propLeadDeatils.bankFee
      // // this.bankFee = this.bankFee - this.subventionBankFee()
      // // console.log("Result",this.bankFee)
      // }
      if (this.propLeadDeatils.device.deviceName == "Q161_PRO_DQR" || this.propLeadDeatils.device.deviceName == "Q161_PRO_SQR") {
        this.merchant.salesInformation.institutionCode = 104
      }

      if (this.propLeadDeatils.leadSource.sourceName == "LS_TOHANDS") {
        this.merchant.salesInformation.institutionCode = 104;

        this.merchant.bankInformation.bankDetails.accountType = "C";
      }
      else {
        this.merchant.bankInformation.bankDetails.accountType = "S";
      }
      // setup fee amount
      this.devicePrice = this.propLeadDeatils.setupFees;
      this.leadSourceApp = this.propLeadDeatils.leadSource;
      // this.multiTidEnabled = this.this.propLeadDeatils.leadSource.multiTidEnabled;
      this.deviceTypeApp = this.propLeadDeatils.device;
      this.salesPerson = this.propLeadDeatils.createdBy.name;
      this.salesCode = this.propLeadDeatils.createdBy.employeeID;
      this.merchant.salesInformation.salesPersonName =
        this.salesPerson + "-" + this.salesCode;
      this.salesPersonName = this.salesPerson + "-" + this.salesCode;
      this.merchant.mdrPlan.domesticDebitUpTo2000.percentage =
        this.getShortLeadInfo.debitLessthanAmount;
      this.merchant.mdrPlan.domesticDebitAbove2000.percentage =
        this.getShortLeadInfo.debitGreaterthanAmount;
      this.merchant.mdrPlan.upiUpto2000.percentage =
        this.getShortLeadInfo.upiDebitCardUpTo2000;
      this.merchant.mdrPlan.upiAbove2000.percentage =
        this.getShortLeadInfo.upiDebitCardAbove2000;
      this.merchant.mdrPlan.upiCreditUpto2000.percentage =
        this.getShortLeadInfo.upiPrepaidCreditCardsUpTo2000;
      this.merchant.mdrPlan.upiCreditAbove2000.percentage =
        this.getShortLeadInfo.upiPrepaidCreditCardsAbove2000;

      this.plan = this.getShortLeadInfo.vasInstanceMapping
        .replaceAll('"', "")
        .replace("[", "")
        .replace("]", "");

      // this.merchant.mdrPlan.incentive.percentage= this.incentive.includes(this.incentivePercentage);

      /* Populating values from FOS */
      this.fetchAndCookDocuments();
      this.plan = this.getShortLeadInfo.vasInstanceMapping
        .replaceAll('"', "")
        .replace("[", "")
        .replace("]", "");

      // this.tmpVasMapping = this.propLeadDeatils.vasInstanceMapping
      //   .replaceAll('"', "")
      //   .replace("[", "")
      //   .replace("]", "");
      this.incentive1 = this.getShortLeadInfo.mAtmOnboardingPlan;
      this.merchant.mdrPlan.incentive.percentage =
        this.incentive1.incentivePercentage;
      this.merchant.mdrPlan.incentive.minimum = this.incentive1.maxIncPerTxn;
      // this.merchant.mdrPlan.incentive.minimumTxnValue = this.incentive1.minTxnVal;
      this.merchant.mdrPlan.incentive.minimumTxnValue = this.incentive1.minTxnVal;

      this.merchant.mdrPlan.amexDomestic.percentage =
        this.getShortLeadInfo.amexDomestic;
      this.merchant.mdrPlan.amexInternational.percentage =
        this.getShortLeadInfo.amexInternational;

      this.merchant.bankInformation.collectionDetails.upiLink =
        this.propLeadDeatils.paymentOption == 4
          ? this.propLeadDeatils.referenceNumber
          : this.merchant.bankInformation.collectionDetails.upiLink == "";

      this.merchant.mdrPlan.standardOrClassic.percentage =
        this.getShortLeadInfo.stdCC;
      this.merchant.mdrPlan.premiumOrPlatinum.percentage =
        this.getShortLeadInfo.premiumCC;
      this.merchant.mdrPlan.superPremiumOrSignature.percentage =
        this.getShortLeadInfo.superPremiumlCC;
      this.merchant.mdrPlan.commercialOrCorporate.percentage =
        this.getShortLeadInfo.corpCC;
      this.merchant.mdrPlan.internationalCreditCard.percentage =
        this.getShortLeadInfo.intlCC;
    },
    watch: {
      "merchant.businessInformation.currentPosName": function (newVal) {
        this.$v.$touch();
      },
      tmpVasMapping(val) {
        if (
          this.propLeadDeatils.leadSource.sourceName === "LS_TOHANDS" &&
          !val.includes("UPI QR")
        ) {
          this.tmpVasMapping = ["UPI QR"];
        }
      },
    },
    mounted() {
      // this.loadPreData();
      //LEAD_STATUS_MARS_SUB_TID_PENDING 104
      //LEAD_STATUS_BASE_TID_PENDING 103
      //this.genSubTidFlag == true
      this.merchant.leadId = this.$route.params.id;
      // if (this.propLeadDeatils.leadStatus == 104 || this.propLeadDeatils.leadStatus == 103) {
      //   this.OpenMultiTidToggle();
      // }
    },
    created() {
      this.fetchAllZone();
      this.fetchAllDistrict();
      this.sharemodebasedonSharingMode();
      this.mpos();
      this.fetchInstutionCode();
    },

    methods: {
      ...mapActions("SatLeadValidation", [
        "MOVE_BACK_DOCUMENT_VERIFICATION_STAGE",
      ]),
      // ...mapActions("SatLeadValidation", ["FETCH_SHORT_LEAD_DATA"]),
      ...mapActions("leadInformationVasMapping", [
        "LEAD_INFORMATION_VAS_MAPPING_DERTAILS",
        "SAVEING_THE_LEAD_STATUS_DETAILS",
        "GET_LEAD_INFORMATION_VAS_MAPPING_DERTAILS",
        "CREATE_BASE_TID",
        "GET_BASE_TID_LIST",
        "GET_SUB_TID_LIST",
        "CREATE_SUB_TIDS_LIST",
      ]),
      ...mapActions("VasCheck", ["FETCH_INSTANCE"]),
      ...mapActions("leadSourceVasDeviceConfig", [
        "GET_LS_VAS_DEVICE_CONFIG_DETAILS",
        "GET_LS_AND_DEVICE_BASED_VAS_DETAILS",
      ]),
      ...mapActions("AllZone", ["FETCH_ALL_ZONE"]),
      ...mapActions("IA_LOCATION", ["FETCH_IA_LOCATION"]),
      ...mapActions("District", ["FETCH_ALL_DISTRICT"]),
      ...mapActions("BranchName", ["FECTCH_ALL_BRANCH"]),
      ...mapActions("StateName", ["FETCH_IOR_STATE"]),
      ...mapActions("mars_regions", ["REGION_FROM_MARS"]),
      ...mapActions("mars_leadFrom", ["LEAD_FROM_FROM_MARS"]),
      ...mapActions("MccBasedLeadSource", ["FECTCH_MCC_BASED_LEADSOURCE"]),
      ...mapActions("mars_salesPerson", ["SALES_PERSON_FROM_MARS"]),
      ...mapActions("mars_sharingPartner", ["SHARING_PARTNER_FROM_MARS"]),
      ...mapActions("sharingModeBasedOnSharingPartnerCode", [
        "FETCH_SHARING_MODEL_BASED_SHARING_PARTNER_CODE",
      ]),
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
        "MARS_CHECK_STATUS_API",
        "EQUITAS_FRM_DATA",
        "MARS_DATA_SUBMIT_EXTERNAL",
        "SAT_TO_MARS_LEADDETAILS_SHARING_TO_HITACHI",
        "MARS_DATA_EXTERNAL_SUBMIT_RESPONSE",
        "SUBMIT_SUB_TID_MERCHANT_REF_CODE_DETAILS",
        "FETCH_SAVED_DATA_FROM_OWN_DB",
      ]),
      ...mapActions("MPOST_FILLINGTYPES", ["FETCH_ALL_FILLING_TYPES"]),
      ...mapActions("MPOS_STATE", ["FETCH_ALL_MPOS_STATE"]),
      ...mapActions("MPOS_CITY", ["FETCH_ALL_MPOS_CITY"]),
      ...mapActions("MPOS_CATEGORY", ["FETCH_ALL_MPOS_CATEGORY"]),
      ...mapActions("MPOS_SUBCATEGORY", ["FETCH_ALL_MPOS_SUBCATEGORY"]),
      ...mapActions("InstitutionCode", ["INSTITUTIONCODE_FROM_FROM_MARS"]),
      ...mapActions("AxisBankPincode", ["FETCH_AXIS_BANK_PINCODE_LOCATION"]),
      ...mapActions("PincodeBasedDistrict", [
        "FETCH_AXIS_BANK_PINCODE_BASED_DISTRICT",
      ]),
      ...mapActions("StateBasedDistrict", ["FETCH_AXIS_BANK_PINCODE_DISTRICT"]),
      ...mapActions("CityBasedLocation", ["FETCH_AXIS_BANK_CITY_LOCATION"]),
      ...mapActions("applicationNumberFromAPI", ["FETCH_APPLICATION_NUMBER"]),
      //Loading base tids if any

      // subventionBankFee(){
      //   console.log("SUBTRACT",data)
      //   return  this.subventionBankFeeData
      // },
      //     handleInput(){
      //       if(this.subventionBankFeeData == null){
      //         this.bankFee = this.originalBankFeeData
      //       }else{
      //  const inputValue = this.subventionBankFeeData
      //       this.bankFee = this.originalBankFeeData - inputValue;
      //       }

      //     },

      handleInput() {
        const value = this.subventionBankFeeData;

        if (!value || isNaN(value)) {
          this.bankFee = this.originalBankFeeData;
        } else {
          this.bankFee = this.originalBankFeeData - parseFloat(value);
        }
      },
      handleInputrentalMode() {
        if (this.merchant.paymentDetails.rentalMode == "IB") {
          this.bankFee = this.propLeadDeatils.recurringFees / 1.18;
          // this.propLeadDeatils.recurringFees * 0.18;
          console.log("RENTAL MODE", this.subventionBankFeeData);
        } else if (this.merchant.paymentDetails.rentalMode == "SB") {
          if (this.subventionBankFeeData > 0) {
            const inputValue = this.subventionBankFeeData;
            this.bankFee = this.originalBankFeeData - inputValue;
          }
        }
      },
      loadSubTidList() {
        this.GET_BASE_TID_LIST(this.merchant)
          .then((response) => {
            if (response.status == 200) {
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: response.body.message,
                icon: "thumb_up",
              });
              this.baseAndSubTidList = [];
              let res = response.body.data;
              res.baseTids.map((bTids) => {
                this.baseAndSubTidList.push({
                  baseTidList: bTids,
                  subTidConfsList: res.subTidConfs,
                });
              });
              this.baseTidFlag = false;
              this.SubTidField = true;
            } else {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Something went wrong!",
                icon: "clear",
              });
            }
          })
          .catch((error) => {
            this.baseTidFlag = true;
            this.SubTidField = false;
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body != null
                  ? error.body.message
                  : "Base TID creation failed!",
              icon: "clear",
            });
            this.$q.loading.hide();
          });
      },
      // Creating base tids and load sub tid confs
      OpenMultiTidToggle() {
        this.propTogglemultiTidComponentDetails =
          !this.propTogglemultiTidComponentDetails;
        // addtnmultiTidComponentDetails
        if (this.merchant != undefined && this.propLeadDeatils != undefined) {
          this.addtnmultiTidComponentDetails.merchant = this.merchant;
          this.addtnmultiTidComponentDetails.propLeadDeatils =
            this.propLeadDeatils;
          this.addtnmultiTidComponentDetails.holdPayment = this.holdPayment;
          this.addtnmultiTidComponentDetails.leadId = this.$route.params.id;
          this.addtnmultiTidComponentDetails.diners = this.formdata;
        }
      },
      fnCreateOrGetBaseTid() {
        this.CREATE_BASE_TID(this.merchant)
          .then((response) => {
            if (response.status == 200) {
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: response.message,
                icon: "thumb_up",
              });
              this.baseTidFlag = false;
              this.SubTidField = true;
              this.loadSubTidList();
            } else {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Something went wrong!",
                icon: "clear",
              });
            }
            this.updateLeadStatus({ leadId: this.$route.params.id, status: 103 });
          })
          .catch((error) => {
            this.baseTidFlag = true;
            this.SubTidField = false;
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body != null
                  ? error.body.message
                  : "Base TID creation failed!",
              icon: "clear",
            });
            this.$q.loading.hide();
          });
      },
      // To create sub tids or load sub tids
      getSubTidConfOrCreateSubTids() {
        //load sub tids if created already
        this.GET_SUB_TID_LIST(this.merchant)
          .then((response) => {
            if (response.status == 200) {
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: response.body.message,
                icon: "thumb_up",
              });
              let res = response.body.data;
              let res1 = response.body.data.submittedToMars;
              this.disabledListAllSubTidDetails = res1;
              this.listAllSubTidDetails = res;
              this.genSubTidFlag = true;
              this.SubTidField = false;
              this.baseTidFlag = false;
            } else {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Something went wrong!",
                icon: "clear",
              });
            }
          })
          .catch((error) => {
            if (error.status == 404) {
              // create sub tids
              this.CREATE_SUB_TIDS_LIST(this.merchant)
                .then((response) => {
                  if (response.status == 200) {
                    this.$q.notify({
                      color: "positive",
                      position: "bottom",
                      message: response.body.message,
                      icon: "thumb_up",
                    });
                    let res = response.body.data;
                    this.listAllSubTidDetails = res;
                    this.genSubTidFlag = true;
                    this.SubTidField = false;
                    this.baseTidFlag = false;
                  } else {
                    this.$q.notify({
                      color: "negative",
                      position: "bottom",
                      message: "Something went wrong!",
                      icon: "clear",
                    });
                  }
                })
                .catch((error) => {
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message:
                      error.body != null
                        ? error.body.message
                        : "Sub TID creation failed!",
                    icon: "clear",
                  });
                  this.$q.loading.hide();
                });
            }
            this.genSubTidFlag = false;
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body != null
                  ? error.body.message
                  : "Sub TID generation failed!",
              icon: "clear",
            });
            this.$q.loading.hide();
          });
      },

      updateLeadStatus(request) {
        this.SAVEING_THE_LEAD_STATUS_DETAILS(request)
          .then((response) => {
            if (response.status == 200) {
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: response.message,
                icon: "thumb_up",
              });
            } else {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Something went wrong!",
                icon: "clear",
              });
            }
          })
          .catch((error) => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body != null
                  ? error.body.message
                  : "Lead Information status update failed!",
              icon: "clear",
            });
            this.$q.loading.hide();
          });
      },
      toggleChequeImage() {
        this.toggleChequeImageResult = !this.toggleChequeImageResult;
      },
      fnDocumentUrl(documentUrl) {
        this.populatedDocumentUrl = documentUrl;
        this.showDocumentPreview = !this.showDocumentPreview;
      },
      populateCustom() {
        let param =
          this.merchant.customIncentiveRates[0].mechantFixed +
          this.merchant.customIncentiveRates[0].sharingFixed;
        this.merchant.customIncentiveRates[0].add = param;
      },
      populateCustom1() {
        let param1 =
          this.merchant.customIncentiveRates[1].mechantFixed +
          this.merchant.customIncentiveRates[1].sharingFixed;
        this.merchant.customIncentiveRates[1].add = param1;
      },
      populateCustom2() {
        let param2 =
          this.merchant.customIncentiveRates[2].mechantFixed +
          this.merchant.customIncentiveRates[2].sharingFixed;
        this.merchant.customIncentiveRates[2].add = param2;
      },
      populateCustom3() {
        let param3 =
          this.merchant.customIncentiveRates[3].mechantFixed +
          this.merchant.customIncentiveRates[3].sharingFixed;
        this.merchant.customIncentiveRates[3].add = param3;
      },
      populateCustom4() {
        let param4 =
          this.merchant.customIncentiveRates[4].mechantFixed +
          this.merchant.customIncentiveRates[4].sharingFixed;
        this.merchant.customIncentiveRates[4].add = param4;
      },
      // fnVerificationDocumentUploadSingleUpload() {
      //   // return
      //   this.file = this.$refs.file.file;
      // },

      /* IFSC bank search result */
      populateBankDetails() {
        let self = this;
        let ifscArr = [];
        self
          .IFSC_FROM_MARS(this.merchant.bankInformation.bankDetails.ifsc)
          .then((response) => {
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
                icon: "clear",
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
        this.ptCitySelected = true;
        this.$v.viewBinding.partnersArr.$each[index].cityRefCode.$model =
          item.value;
        this.$v.viewBinding.partnersArr.$each[index].cityRefLabel.$model =
          item.label;
      },
      partnerClearCity() {
        if (!this.ptCitySelected) this.cityRefLabel = "";
      },
      /* MCC search result */
      partnerStateSearch(terms, done) {
        done(this.COMMON_FILTER_FUNCTION(this.stateOptions, terms));
      },
      partnerStateSelected(item, index) {
        this.$v.viewBinding.partnersArr.$each[index].stateRefCode.$model =
          item.value;
        this.$v.viewBinding.partnersArr.$each[index].stateRefLabel.$model =
          item.label;
      },
      /* MCC search result */

      /* MCC search result */
      mccSearch(terms, done) {
        done(this.COMMON_FILTER_FUNCTION(this.mccSearchSet, terms));
      },
      // selectLead() {
      //   if (this.merchant.salesInformation.leadFrom == "OPEN MARKET") {
      //     //for UAT
      //     this.merchant.salesInformation.institutionCode = 104;
      //     // for production
      //     // this.merchant.mdrPlan.code = 6;
      //   } else {
      //     // for UAT
      //     this.merchant.salesInformation.institutionCode = 101;
      //     // for production
      //     // this.merchant.mdrPlan.code = 7;
      //   }
      // },
      mccSelected(item) {
        this.merchant.companyInformation.mccname = item.label;
        this.merchant.companyInformation.mcc = item.value;
        // let formData = {
        //   mcc_code: this.merchant.companyInformation.mcc,
        //   leadsource: this.merchant.salesInformation.leadFrom
        // };
        // this.FECTCH_MCC_BASED_LEADSOURCE(formData).then(response => {
        //   this.$q.notify({
        //     color: "positive",
        //     position: "bottom",
        //     message: response.data.code,
        //     icon: "thumb_up"
        //   });
        //   this.$q.localStorage.set("aa_t", response.data.code);
        //   this.merchant.salesInformation.institutionCode = response.data.code;
        // });
        if (
          this.merchant.companyInformation.mcc == "5812" ||
          this.merchant.companyInformation.mcc == "5813" ||
          this.merchant.companyInformation.mcc == "5814" ||
          this.merchant.companyInformation.mcc == "7011"
          // || this.merchant.companyInformation.mcc == "5541" ||
          // this.merchant.companyInformation.mcc == "5542"
        ) {
          this.merchant.revParameters.settlementType = "M";
          this.merchant.revParameters.tipEnabled = "Y";
          // if(this.merchant.revParameters.saleEnabled == 'CASH@POS')
          //     this.merchant.paymentDetails.omcEnabled = true;
          if (this.merchant.companyInformation.mcc == "5541")
            this.merchant.paymentDetails.omcEnabled = true;
          else this.merchant.paymentDetails.omcEnabled = false;
          this.revParamAndLeadInfo.bijlipaySwitch = true;
        } else {
          this.merchant.revParameters.settlementType = "A";
          this.merchant.revParameters.tipEnabled = "N";
          this.merchant.paymentDetails.omcEnabled = false;
          this.revParamAndLeadInfo.bijlipaySwitch = true;
        }
      },
      sharemodebasedonSharingMode() {
        this.FETCH_SHARING_MODEL_BASED_SHARING_PARTNER_CODE(
          this.merchant.salesInformation.sharingModelCode
        );
      },
      mpos() {
        this.FETCH_ALL_FILLING_TYPES();
        this.FETCH_ALL_MPOS_STATE();
        this.FETCH_ALL_MPOS_CATEGORY();
      },
      // terminalBased() {
      //   if (this.merchant.paymentDetails.terminalType == "MPOS") {
      //     this.merchant.salesInformation.institutionCode = 107;
      //   } else {
      //     let formData = {
      //       mcc_code: this.merchant.companyInformation.mcc,
      //       leadsource: this.merchant.salesInformation.leadFrom,
      //       deviceType: this.merchant.paymentDetails.terminalModeCode
      //     };
      //     this.FECTCH_MCC_BASED_LEADSOURCE(formData).then(response => {
      //       // this.$q.notify({
      //       //   color: "positive",
      //       //   position: "bottom",
      //       //   message: response.data.code,
      //       //   icon: "thumb_up"
      //       // });
      //       this.$q.localStorage.set("aa_t", response.data.code);
      //       this.merchant.salesInformation.institutionCode = response.data.code;
      //     });
      //   }
      // },
      fetchInstutionCode() {
        this.INSTITUTIONCODE_FROM_FROM_MARS();
      },
      previewFiles() {
        this.files = this.$refs.myFiles.files;
      },
      // mccbasedSelect() {
      //   let formData = {
      //     mcc_code: this.merchant.companyInformation.mcc,
      //     leadsource: this.merchant.salesInformation.leadFrom,
      //     deviceType: this.merchant.paymentDetails.terminalModeCode
      //   };
      //   this.FECTCH_MCC_BASED_LEADSOURCE(formData).then(response => {
      //     // this.$q.notify({
      //     //   color: "positive",
      //     //   position: "bottom",
      //     //   message: response.data.code,
      //     //   icon: "thumb_up"
      //     // });
      //     this.$q.localStorage.set("aa_t", response.data.code);
      //     this.merchant.salesInformation.institutionCode = response.data.code;
      //   });
      // },

      leadbasedonMerchant() {
        let formData = {
          mcc_code: this.merchant.companyInformation.mcc,
          leadsource: this.merchant.salesInformation.leadFrom,
        };
        this.FECTCH_MCC_BASED_LEADSOURCE(formData);
      },
      //     mccbasedLeadSource(){
      //       let formData1 = {
      //         mcc_code: this.merchant.companyInformation.mcc,
      //         leadsource:this.merchant.salesInformation.leadFrom
      //       }

      //       this.FECTCH_MCC_BASED_LEADSOURCE(this.formData1);
      // },
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
        this.companyRegisteredCitySelected = true;
        this.merchant.companyInformation.registeredCityName = item.label;
        this.merchant.companyInformation.registeredCityRefCode = item.value;
      },
      /* Registered City search result */
      fnClrRegisteredCity() {
        if (!this.companyRegisteredCitySelected)
          this.merchant.companyInformation.registeredCityName = "";
      },
      fninputTyping(event, type) {
        let flag = event.split("");
        switch (type) {
          case 1:
            this.companyRegisteredCitySelected = false;
          case 2:
            this.companyRegisteredStateSelected = false;
        }
        if (this.cityOptions.length <= 0 || this.stateOptions.length <= 0) {
          this.fetchmarsCity(
            this.merchant.companyInformation.registeredCityName,
            this.merchant.companyInformation.registeredStateName
          );
        }
      },

      /* Registered State search result */
      registeredStateSelected(item) {
        this.companyRegisteredStateSelected = true;
        this.merchant.companyInformation.registeredStateName = item.label;
        this.merchant.companyInformation.registeredStateRefCode = item.value;
      },
      /* Registered State search result */
      fnClrRegisteredState() {
        if (!this.companyRegisteredStateSelected)
          this.merchant.companyInformation.registeredStateName = "";
      },

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
        return _.filter(arraySet, function (oo) {
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
          contactEmail: "",
        };
        let errorObj = {
          name: {
            alert: false,
            issue: "",
            value: "",
          },
          address: {
            alert: false,
            issue: "",
            value: "",
          },
          pan: {
            alert: false,
            issue: "",
            value: "",
          },
          pin: {
            alert: false,
            issue: "",
            value: "",
          },
          stateRefCode: {
            alert: false,
            issue: "",
            value: "",
          },
          cityRefCode: {
            alert: false,
            issue: "",
            value: "",
          },
          contactMobile: {
            alert: false,
            issue: "",
            value: "",
          },
          contactEmail: {
            alert: false,
            issue: "",
            value: "",
          },
        };
        this.error.field.merchant.partnerInformation.push(errorObj);
        this.viewBinding.partnersArr.push(partnerObj);
      },
      removePartnerFromArr(item, index) {
        this.viewBinding.partnersArr.splice(index, 1);
      },
      previousClicked() {
        if (this.$refs.stepper.step == "eight") {
          this.getlsVasMappingController();
        }
        this.$refs.stepper.previous();
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
            if (this.merchant.salesInformation.categoryType == "O") {
              //for UAT
              this.merchant.mdrPlan.code = 9;
              // for production
              // this.merchant.mdrPlan.code = 6;
            } else {
              // for UAT
              this.merchant.mdrPlan.code = 8;
              // for production
              // this.merchant.mdrPlan.code = 7;
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
            // if (
            //   this.$PARTNERS_TAB_ENABLED_ITEMS.includes(
            //     this.merchant.companyInformation.constitution
            //   )
            // ) {
            this.saveCurrentChanges();
            this.$refs.stepper.next();
            // } else {
            //   this.saveCurrentChanges();
            //   this.$refs.stepper.goToStep("fourth");
            // }
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
          } else if (this.$v.merchant.businessInformation.gstId.$model == null) {
            this.$q
              .dialog({
                title: "Confirm",
                message: "Are you sure GSTID is not available?",
                ok: "Yes",
                cancel: "No",
              })
              .then(() => {
                this.saveCurrentChanges();
                this.fetchMarsDeviceDetails();
                this.$refs.stepper.next();
                // }
              })
              .catch(() => { });
          } else {
            this.saveCurrentChanges();
            this.fetchMarsDeviceDetails();
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
            this.formdata.fixed = this.merchant.mdrPlan.diners.fixed;
            this.formdata.percentage = this.merchant.mdrPlan.diners.percentage;
            this.formdata.minimum = this.merchant.mdrPlan.diners.minimum;
            // this.merchant.SharingDiscountFee.diners.fixed = this.merchant.SharingDiscountFee.mVisa.fixed;
            // this.merchant.SharingDiscountFee.diners.percentage = this.merchant.SharingDiscountFee.mVisa.percentage;
            // this.merchant.SharingDiscountFee.diners.minimum = this.merchant.SharingDiscountFee.mVisa.minimum;
            this.merchant.SharingDiscountFee.diners.fixed =
              this.merchant.mdrPlan.diners.fixed;
            this.merchant.SharingDiscountFee.diners.percentage =
              this.merchant.mdrPlan.diners.percentage;
            this.merchant.SharingDiscountFee.diners.minimum =
              this.merchant.mdrPlan.diners.minimum;
            // if(this.plan == 'mATM'){
            //   this.merchant.incentive.percentage = this.merchant.incentive.percentage;
            // this.merchant.incentive.minimum = this.merchant.incentive.minimum;
            // this.merchant.incentive.minimumTxnValue = this.merchant.incentive.minimumTxnValue;
            // }
            // incentive: {
            //       percentage: {
            //         alert: false,
            //         issue: "",
            //         value: ""
            //       },
            //       minimum: {
            //         alert: false,
            //         issue: "",
            //         value: ""
            //       },
            //       minimumTxnValue: {
            //         alert: false,
            //         issue: "",
            //         value: ""
            //       },

            //     },
            this.saveCurrentChanges();
            this.$refs.stepper.next();
          }
        } else if (step == "paymentDetails") {
          this.$v.merchant.paymentDetails.$touch();
          if (this.$v.merchant.paymentDetails.$error) {
            this.$q.notify("Please review payment details fields again.");
          } else if (this.merchant.customIncentiveRates[0].add > 0.5) {
            this.$q.notify(
              "200 to 999 Please customeIncentive less then or equal to 0.5."
            );
          } else if (this.merchant.customIncentiveRates[1].add > 3) {
            this.$q.notify(
              "1000 to 1999 Please customeIncentive less then equal to 3."
            );
          } else if (this.merchant.customIncentiveRates[2].add > 6) {
            this.$q.notify(
              "2000 to 2999 Please customeIncentive less then equal to 6."
            );
          } else if (this.merchant.customIncentiveRates[3].add > 10.5) {
            this.$q.notify(
              "3000 to 3499 Please customeIncentive less then equal to 10.5."
            );
          } else if (this.merchant.customIncentiveRates[4].add > 7) {
            this.$q.notify(
              "3500 to 10000 Please customeIncentive less then equal to 7."
            );
          } else if (
            this.subventionBankFeeData >
            this.propLeadDeatils.recurringFees / 1.18
          ) {
            this.$q.notify("Bank Rental should be lesser than rental amount");
          } else if (
            this.merchant.paymentDetails.rentalMode === "SB" &&
            (this.subventionBankFeeData === "" ||
              this.subventionBankFeeData == null ||
              this.subventionBankFeeData == undefined)
          ) {
            this.$q.notify("Bank rental shouldn't be empty");
          } else if (
            this.merchant.paymentDetails.rentalMode === "SB" &&
            /[^0-9]/.test(this.subventionBankFeeData)
          ) {
            this.$q.notify(
              "Invalid input: only numbers are allowed in Bank Rental "
            );
          } else {
            this.error.paymentDetails = false;
            if (this.merchant.paymentDetails.rentalMode == "IB") {
              this.merchant.paymentDetails.bankFee = this.bankFee;
            } else if (this.merchant.paymentDetails.rentalMode == "SB") {
              this.merchant.paymentDetails.bankFee = this.subventionBankFeeData;
            } else {
              this.merchant.paymentDetails.splice("bankFee", 1);
            }

            this.saveCurrentChanges();
            //GOTO

            this.VasSelected();
            this.$refs.stepper.next();
          }
        } else if (step == "revParameters") {
          this.$v.merchant.revParameters.$touch();
          if (this.$v.merchant.revParameters.$error) {
            this.$q.notify("Please review Rev fields again.");
            this.error.revParameters = false;
          } else {
            this.error.revParameters = false;
            this.$v.revParamAndLeadInfo.vasInstanceMapping = JSON.stringify(
              this.tmpVasMapping
            );
            if (this.leadSourceApp.multiTidEnabled == true) {
              this.lsVasMappingController();
            }
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
            if (this.leadSourceApp.multiTidEnabled == true) {
              this.getlsVasMappingController();
            }
            this.vasAutoSelected();
            this.$refs.stepper.next();
          }
        } else if (step == "kyc") {
          this.$v.merchant.kyc.$touch();
          if (this.$v.merchant.kyc.$error) {
            this.$q.notify("Please review bank information fields again.");
          } else {
            this.error.kyc = false;
            this.saveCurrentChanges();
            this.loadSubTidList();
            this.$refs.stepper.next();
          }
        } else {
        }
      },
      handleVasChange(newVal) {
        let updated = [...newVal];

        const has = val => updated.includes(val);
        const had = val => this.tmpVasMapping.includes(val); // previously selected

        // === Case 1: Unselecting EMI → remove Bank EMI + Brand EMI
        if (had("EMI") && !has("EMI")) {
          updated = updated.filter(v => v !== "Bank EMI" && v !== "Brand EMI");
        }

        // === Case 2: Selecting EMI → ensure Bank EMI is selected
        if (has("EMI") && !has("Bank EMI")) {
          updated.push("Bank EMI");
        }

        // === Case 3: Selecting Bank EMI → ensure EMI is selected
        if (has("Bank EMI") && !has("EMI")) {
          updated.push("EMI");
        }

        // === Case 4: Selecting Brand EMI → ensure EMI is selected (not Bank EMI)
        if (has("Brand EMI") && !has("EMI")) {
          updated.push("EMI");
        }

        this.tmpVasMapping = [...new Set(updated)];
      },
      VasSelected() {
        let params = {
          device: this.merchant.paymentDetails.terminalModeCode,
          code: this.merchant.salesInformation.institutionCode,
        };
        let self = this;
        let vasArr = [];
        let data = new Object();
        if (this.propLeadDeatils.leadSource.multiTidEnabled == true) {
          let params1 = {
            leadSource: this.propLeadDeatils.leadSource.id,
            device: this.propLeadDeatils.device.id,
          };
          self.GET_LS_AND_DEVICE_BASED_VAS_DETAILS(params1).then((response) => {
            //  if (response.status == 200) {
            self.getLsDeviceBasedVasDetails.vasList.map(function (value, key) {
              vasArr.push({
                label: value.name,
                value: JSON.stringify(value),
              });
            });
            this.vasBasedOnInstance = vasArr;
          });
        } else {
          self.FETCH_INSTANCE(params).then((response) => {
            if (response.status == 200) {
              self.getInstance.map(function (value, key) {
                vasArr.push({
                  label: value.vas.name,
                  value: value.vas.name,
                });
              });

              // this.vasBasedOnInstance = vasArr.map((opt) => ({
              //   ...opt,
              //   disable: this.propLeadDeatils.leadSource.sourceName === 'LS_TOHANDS' && opt.value !== 'UPI QR'
              // }));
              // this.$nextTick(() => {
              //   const upiExists = this.vasBasedOnInstance.some(opt => opt.value === 'UPI QR');
              //   if (upiExists) {
              //     this.tmpVasMapping = ['UPI QR'];
              //     this.vasKey++; // ✅ Force re-render
              //     console.log('✅ Auto-selected VAS:', this.tmpVasMapping);
              //   }
              // });
              if (this.propLeadDeatils.leadSource.sourceName === "LS_TOHANDS") {
                this.vasBasedOnInstance = vasArr;
                this.vasBasedOnInstance = vasArr.map((opt) => ({
                  ...opt,
                  disable:
                    this.propLeadDeatils.leadSource.sourceName === "LS_TOHANDS" &&
                    opt.value !== "UPI QR",
                }));
                this.$nextTick(() => {
                  const upiExists = this.vasBasedOnInstance.some(
                    (opt) => opt.value === "UPI QR"
                  );
                  if (upiExists) {
                    this.tmpVasMapping = ["UPI QR"];
                    this.vasKey++; // ✅ Force re-render
                    console.log("✅ Auto-selected VAS:", this.tmpVasMapping);
                  }
                });
              } else {
                this.vasBasedOnInstance = vasArr;
              }
              // if (this.propLeadDeatils.leadSource.sourceName === 'LS_TOHANDS') {
              //   // Disable all except UPI QR
              //   vasArr.forEach(option => {
              //     option.disable = option.value !== 'UPI QR';
              //   });

              //   this.vasBasedOnInstance = vasArr;

              //   // ✅ Important: Apply selection after options render
              //   this.$nextTick(() => {
              //     const upiExists = this.vasBasedOnInstance.some(opt => opt.value === 'UPI QR');
              //     if (upiExists) {
              //       this.tmpVasMapping = ['UPI QR']; // this must match the value field
              //       console.log('Auto-selected VAS:', this.tmpVasMapping);
              //     } else {
              //       console.warn('UPI QR not found in VAS list.');
              //     }
              //   });

              // } else {
              //   // Normal flow without disabling
              //   this.vasBasedOnInstance = vasArr;
              // }
              // if (this.propLeadDeatils.leadSource.sourceName === 'LS_TOHANDS') {
              //   vasArr.forEach(option => {
              //     option.disable = option.value !== 'UPI QR';
              //   });

              //   this.vasBasedOnInstance = vasArr;

              //   // 🛠️ Use $nextTick to ensure UI is updated before assigning selection
              //   this.$nextTick(() => {
              //     // Double check if 'UPI QR' is actually present in the options
              //     const isUpiPresent = vasArr.some(opt => opt.value === 'UPI QR');
              //     if (isUpiPresent) {
              //       this.tmpVasMapping = ['UPI QR'];
              //     } else {
              //       console.warn('UPI QR not found in options');
              //     }
              //   });
              // } else {
              //   this.vasBasedOnInstance = vasArr;
              // }
            } else {
              this.$q.notify({
                color: "negative",
                position: "bottom-left",
                message: "Invalid",
                icon: "clear",
              });
              this.merchant.revParamAndLeadInfo.vasInstanceMapping = "";
            }
          });
        }

        //  });
      },
      fetchAllZone() {
        this.FETCH_ALL_ZONE();
      },
      fetchAllDistrict() {
        this.FETCH_ALL_DISTRICT();
      },
      // appLoadData(){
      // this.FETCH_APP_VAS_DATA();
      // },

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

      fetchMarsDeviceDetails() {
        /* API call to fetch device model */
        let param = {
          leadSource: this.getShortLeadInfo.leadSource.id,
          device: this.getShortLeadInfo.device.id,
          plan: this.getShortLeadInfo.plan.id,
        };
        this.DEVICE_MODEL_FROM_MARS(param).then((response) => {
          let obj = response.body.data.marsDeviceModel;
          this.terminalModelSet = [];
          this.terminalModelSet.push({
            label: obj.name,
            value: obj.code,
          });
          this.merchant.paymentDetails.terminalModeCode = obj.code;
        });
      },

      fetchAllDropdownValuesFromMARSapi(institutionCode) {
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Setting data ..",
        });
        let self = this;
        /* API call to fetch regions */
        self
          .REGION_FROM_MARS(institutionCode)
          .then(() => {
            self.regionOptions = [];
            return self.regionsFromMars.items.map((oo) => {
              self.regionOptions.push({ label: oo.name, value: oo.code });
            });
          })
          .then(() => {
            /* API call to fetch sharing partner */
            return self.LEAD_FROM_FROM_MARS(institutionCode).then((response) => {
              self.leadFromOptions = [];
              if (
                JSON.parse(localStorage.getItem("u_i")).region.regionAreaName ==
                "VARANEEK"
              ) {
                self.leadFromInfoFromMars.items.map((oo) => {
                  if (oo.name == "VARANEEK") {
                    self.leadFromOptions.push({ label: oo.name, value: oo.name });
                  }
                });
              } else {
                self.leadFromInfoFromMars.items.map((oo) => {
                  self.leadFromOptions.push({ label: oo.name, value: oo.name });
                });
              }
              self.merchant.salesInformation.leadFrom =
                this.propLeadDeatils.leadSource.sourceName;
            });
          })
          .then(() => {
            /* API call to fetch sales person */
            return self
              .SALES_PERSON_FROM_MARS(institutionCode)
              .then((response) => {
                self.salesPersonOptions = [
                  {
                    label: this.salesPerson + "-" + this.salesCode,
                    value: this.salesPerson + "-" + this.salesCode,
                  },
                ];
                self.salesPersonFromMars.items.map((oo) => {
                  self.salesPersonOptions.push({
                    label: oo.name + " - " + oo.empCode,
                    value: oo.name + " - " + oo.empCode,
                  });
                });

                // self.salesPersonOptions = salesPerson;
              });
          })
          .then(() => {
            /* API call to fetch city */
            return self.CITY_FROM_MARS().then((response) => {
              self.cityOptions = [];
              self.cityFromMars.items.map((oo) => {
                self.cityOptions.push({ label: oo.name, value: oo.code });
              });
              // self.cityOptions = city;
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
          })
          .then(() => {
            /* API call to fetch state */
            return self.MCC_FROM_MARS().then((response) => {
              self.mccSearchSet = [];
              self.mccFromMars.items.map((oo) => {
                self.mccSearchSet.push({
                  label: oo.code + "-" + oo.name,
                  value: oo.code,
                });
                // if(oo.code == "5812" || oo.code == "5813" || oo.code == "5814" ||oo.code == "7011" || oo.code == "5541" || oo.code == "5529"
                // ) {
                //   this.merchant.companyInformation.autoormanual == "A";
                //   this.merchant.companyInformation.tipFacility == "Y";
                // } else if(oo.code == "") {
                //   this.merchant.companyInformation.autoormanual == "M";
                //   this.merchant.companyInformation.tipFacility == "N";
                // }
              });
              // self.mccSearchSet = mccSubArr;
            });
          })
          .then(() => {
            /* API call to fetch rental plan */
            return self
              .RENTAL_PLAN_FROM_MARS(institutionCode)
              .then((response) => {
                self.rentalPlanSet = [];
                self.rentalPlanFromMars.items.map((oo) => {
                  self.rentalPlanSet.push({ label: oo.name, value: oo.code });
                });
                // self.rentalPlanSet = rentalPlan;
              });
          })
          .then(() => {
            /* API call to fetch bank list */
            return self.BANK_LIST_FROM_MARS(institutionCode).then((response) => {
              // let bankList = [];
              self.bankListFromMars.bankNames.map((oo) => {
                self.bankListSet.push({ label: oo, value: oo });
              });
              // self.bankListSet = bankList;
            });
            return true;
          })
          .then(() => {
            /* API call to fetch bank list */
            return self.NETWORK_PROVIDER(institutionCode).then((response) => {
              // let bankList = [];
              self.networkProviderFromMars.items.map((oo) => {
                self.networkProviderListSet.push({
                  label: oo.name,
                  value: oo.code,
                });
              });
              // self.networkProviderListSet = bankList;
            });
            return true;
          })
          .then(() => {
            /* API call to fetch bank list */
            return self.SERVICE_PROVIDER(institutionCode).then((response) => {
              // let bankList = [];
              self.serviceProviderFromMars.items.map((oo) => {
                self.serviceProviderListSet.push({
                  label: oo.name,
                  value: oo.code,
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
                leadId: this.$route.params.id,
              })
                .then(() => {
                  this.merchant.additionalInfo.branchZone = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).branchZone;
                  this.fnFetchZone();
                  this.merchant.additionalInfo.iaDistrict = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).iaDistrict;
                  this.fnFetchBranchName();
                  this.merchant.additionalInfo.raDistrict = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).raDistrict;
                  this.merchant.additionalInfo.od1District = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).od1District;
                  this.merchant.additionalInfo.od2District = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).od2District;
                  this.merchant.additionalInfo.installationBranchCode =
                    JSON.parse(
                      this.marsSavedDataFromInternal.additionalInfo
                    ).installationBranchCode;
                  this.merchant.additionalInfo.lorState = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).lorState;
                  this.merchant.additionalInfo.pin = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).pin;
                  this.pincodeBasedDistrict();
                  this.merchant.additionalInfo.state = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).state;
                  this.pincodeandDistrictBasedCity();
                  this.merchant.additionalInfo.city = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).city;
                  this.citybasedlocation();
                  this.merchant.additionalInfo.iaLocation = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).iaLocation;
                  this.merchant.additionalInfo.iaSalutation = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).iaSalutation;
                  this.merchant.additionalInfo.iaGender = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).iaGender;
                  this.merchant.additionalInfo.od1Salutation = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).od1Salutation;
                  this.merchant.additionalInfo.od1Gender = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).od1Gender;
                  this.merchant.additionalInfo.od2Salutation = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).od2Salutation;
                  this.merchant.additionalInfo.od2Gender = JSON.parse(
                    this.marsSavedDataFromInternal.additionalInfo
                  ).od2Gender;
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
                  return this.$set(
                    this.marsSavedDataFromInternal.businessInformation,
                    "lastTurnoverYear",
                    this.commonDateFormat(
                      this.marsSavedDataFromInternal.businessInformation
                        .lastTurnoverYear
                    )
                  );
                })
                .then(() => {
                  delete this.marsSavedDataFromInternal.salesInformation
                    .salesPersonCode;
                  this.merchant.salesInformation =
                    this.marsSavedDataFromInternal.salesInformation;
                  if (this.merchant.paymentDetails.rentalMode == "SB") {
                    if (
                      this.marsSavedDataFromInternal &&
                      this.marsSavedDataFromInternal.paymentDetails &&
                      "bankFee" in this.marsSavedDataFromInternal.paymentDetails
                    ) {
                      this.subventionBankFeeData =
                        this.marsSavedDataFromInternal.paymentDetails.bankFee;
                      this.bankFee = this.bankFee - this.subventionBankFeeData;
                    }
                  }

                  console.log("INSIDE PercentageReduceData  ", this.bankFee);

                  // this.merchant.salesInformation.salesPersonName = this.merchant.salesInformation.salesPersonName;
                  // this.merchant.salesInformation.salesPersonName =  this.salesPerson + "-" + this.salesCode,
                  if (
                    this.merchant.salesInformation.salesPersonName !=
                    this.salesPerson + "-" + this.salesCode
                  ) {
                    this.merchant.salesInformation.salesPersonName =
                      this.merchant.salesInformation.salesPersonName;
                  } else {
                    this.merchant.salesInformation.salesPersonName =
                      this.salesPerson + "-" + this.salesCode;
                  }

                  this.merchant.companyInformation =
                    this.marsSavedDataFromInternal.companyInformation;
                  this.merchant.businessInformation =
                    this.marsSavedDataFromInternal.businessInformation;
                  this.viewBinding.partnersArr =
                    this.marsSavedDataFromInternal.partnerInformation;
                  let errorThis = this;
                  let errorObj = {
                    name: {
                      alert: false,
                      issue: "",
                      value: "",
                    },
                    address: {
                      alert: false,
                      issue: "",
                      value: "",
                    },
                    pan: {
                      alert: false,
                      issue: "",
                      value: "",
                    },
                    pin: {
                      alert: false,
                      issue: "",
                      value: "",
                    },
                    stateRefCode: {
                      alert: false,
                      issue: "",
                      value: "",
                    },
                    cityRefCode: {
                      alert: false,
                      issue: "",
                      value: "",
                    },
                    contactMobile: {
                      alert: false,
                      issue: "",
                      value: "",
                    },
                    contactEmail: {
                      alert: false,
                      issue: "",
                      value: "",
                    },
                  };
                  errorThis.error.field.merchant.partnerInformation = [];
                  this.viewBinding.partnersArr.map(() => {
                    errorThis.error.field.merchant.partnerInformation.push(
                      errorObj
                    );
                  });
                  this.merchant.paymentDetails =
                    this.marsSavedDataFromInternal.paymentDetails;
                  this.merchant.bankInformation =
                    this.marsSavedDataFromInternal.bankInformation;
                  this.merchant.mdrPlan = this.marsSavedDataFromInternal.mdrPlan;
                  if (this.marsSavedDataFromInternal.SharingDiscountFee != null) {
                    this.merchant.SharingDiscountFee =
                      this.marsSavedDataFromInternal.sharingDiscountFee;
                  }
                  this.merchant.companyInformation.constitution =
                    this.propLeadDeatils.merchantType.marsMappingId;
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

      varaneekInstance() {
        if (
          this.propLeadDeatils.leadSource.id == 81 &&
          this.propLeadDeatils.device.id == 6
        ) {
          this.merchant.salesInformation.institutionCode = 106;
        }
        if (
          this.propLeadDeatils.leadSource.id == 81 &&
          this.propLeadDeatils.device.id == 6 &&
          this.propLeadDeatils.merchantCategory.merchantCategoryName == "Retail"
        ) {
          this.merchant.salesInformation.institutionCode = 104;
        }
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
            this.propLeadDeatils.applicationFile,
          ],
        });

        Object.keys(this.propLeadDeatils.leadDocuments).forEach(function (
          key,
          index
        ) {
          _.map(self.propLeadDeatils.leadDocuments[key], function (oo) {
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
      lsVasMappingController() {
        if (this.tmpVasMapping.length > 0) {
          let params = {
            leadInformation: {
              id: this.propLeadDeatils.id,
            },
            vasList: this.tmpVasMapping.map((vas) => JSON.parse(vas)),
          };

          let nameOfVas = this.tmpVasMapping.map((vas) => JSON.parse(vas).name);
          this.tmpVasMapping = nameOfVas;

          this.LEAD_INFORMATION_VAS_MAPPING_DERTAILS(params)
            .then((response) => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Vas Mapping Successfully Created",
                icon: "thumb_up",
              });
            })
            .catch(() => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Please try again",
                icon: "thumb_down",
              });
              this.$q.loading.hide();
            });
        } else {
          this.getlsVasMappingController();
        }
      },
      getlsVasMappingController() {
        let params = {
          id: this.propLeadDeatils.id,
        };
        this.GET_LEAD_INFORMATION_VAS_MAPPING_DERTAILS(params)
          .then((response) => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Vas Mapping Successfully Created",
              icon: "thumb_up",
            });
            let nameOfVas = response.body.data.map((leadInfoVas) =>
              JSON.stringify(leadInfoVas.vas)
            );
            this.tmpVasMapping = nameOfVas;
            return true;
          })
          .catch(() => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down",
            });
            this.$q.loading.hide();
            return false;
          });
      },

      saveCurrentChanges() {
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Saving data ..",
        });
        let a = {
          ...this.merchant.mdrPlan,
        };
        this.merchant.mdrPlan = { ...a, diners: this.formdata };

        let revParams = this.merchant.revParameters;
        delete this.merchant.revParameters;

        if (this.tmpVasMapping.length > 0) {
          this.revParamAndLeadInfo.vasInstanceMapping = JSON.stringify(
            this.tmpVasMapping
          );

          revParams.cashAtPosEnabled =
            this.tmpVasMapping.includes("CASH@POS") == true ? "Y" : "N";
          revParams.preAuth =
            this.tmpVasMapping.includes("PREAUTH") == true ? "Y" : "N";
          revParams.txnEmiAllowed =
            this.tmpVasMapping.includes("EMI") == true ? "1" : "0";
          revParams.sodexoEnabled =
            this.tmpVasMapping.includes("SODEXO") == true ? "1" : "0";
          revParams.amexEnabled =
            this.tmpVasMapping.includes("AMEX") == true ? "1" : "0";
          revParams.bqrEnabled =
            this.tmpVasMapping.includes("QR") == true ? "1" : "0";
          revParams.upichargeslipEnabled =
            this.tmpVasMapping.includes("UPI_CHARGESLIP") == true ? "1" : "0";
          revParams.linkpaymentFlag =
            this.tmpVasMapping.includes("Link based Payment") == true ? "1" : "0";
          revParams.matmAllowed =
            this.tmpVasMapping.includes("mATM") == true ? "Y" : "N";
          revParams.upiFlag =
            this.tmpVasMapping.includes("UPI QR") == true ? "1" : "0";
        }

        this.merchant["leadId"] = this.$route.params.id;
        this.merchant["partnerInformation"] = this.viewBinding.partnersArr;
        this.merchant["revParamAndLeadInfo"] = this.revParamAndLeadInfo;
        this.MARS_DATA_SUBMIT_INTERNAL({ merchant: this.merchant, action: 1 })
          .then((response) => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Saved successfully",
              icon: "thumb_up",
            });
          })
          .catch(() => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down",
            });
            this.$q.loading.hide();
          });
        this.merchant.revParameters = revParams;
      },
      vasAutoSelected() {
        let vasAuto = [];
        _.map(this.getLsDeviceBasedVasDetails.vasList, function (oo) {
          vasAuto.push(JSON.stringify(oo));
        });
        var size = vasAuto.length;
        var items = vasAuto.slice(0, size).map((i) => {
          return i;
        });
        this.tmpVasMapping = items;
        if (this.propLeadDeatils.device.deviceName == "Q161_PRO_DQR") {
          const upiOption = this.vasBasedOnInstance.find(opt => opt.label === "UPI QR");
          this.vasDisableFlag = true
          if (upiOption) {
            this.tmpVasMapping = [upiOption.value]; // Must be array for checkbox
            console.log("DEVICE TYPE=================>>>>>>>>>", this.selectedVas)
          }
        } else {
          this.tmpVasMapping = [];
          this.vasDisableFlag = false
        }
        console.log("VASMAPPING", this.tmpVasMapping)
        // this.fnVasDisable(items);
      },
      // fnVasDisable(items) {
      //     if(items<3){
      //       return items >3 ;
      //       // return true;
      //   //     var size = 3;
      //   // var items = this.tmpVasMapping.slice(0, size).map(i => {
      //   //   return items
      //   // });
      //     }else{
      //       return false;
      //     }
      //   },
      finalFormSubmit(request) {
        this.$v.merchant.$touch();
        if (this.$v.merchant.$error) {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please fill all mandatory fields",
            icon: "info",
          });
        } else {
          let self = this;
          self.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Validating ..",
          });
          const finalRequest = { action: 2, merchant: self.merchant };

          finalRequest.merchant.leadId = self.$route.params.id;
          finalRequest.merchant.holdPayment = finalRequest.holdPayment;
          let a = {
            ...finalRequest.merchant.mdrPlan,
          };
          // finalRequest.merchant.mdrPlan = { ...a, diners: this.formdata};
          finalRequest.merchant.mdrPlan = {
            ...a,
            diners: this.merchant.mdrPlan.diners,
          };
          finalRequest.merchant.businessInformation.currentPosName =
            finalRequest.merchant.businessInformation.currentPosName == "N"
              ? ""
              : finalRequest.merchant.businessInformation.currentPosName;
          finalRequest.merchant.companyInformation.constitutionName =
            finalRequest.merchant.companyInformation.constitutionName == "61"
              ? "60"
              : finalRequest.merchant.companyInformation.constitutionName;
          (finalRequest.merchant.paymentDetails.emiStartDate =
            this.commonDateFormatDOB1(
              finalRequest.merchant.paymentDetails.emiStartDate
            )),
            (finalRequest.merchant.revParameters.notificationRecipient =
              finalRequest.merchant.revParameters.notificationRecipient == "N"
                ? null
                : finalRequest.merchant.revParameters.notificationRecipient);
          finalRequest.merchant.revParameters.dQR =
            finalRequest.merchant.salesInformation.institutionCode == "109"
              ? "1"
              : 0;

          let equitasData = {
            contactEmail: finalRequest.merchant.companyInformation.contactName,
            contactMobile: finalRequest.merchant.companyInformation.contactMobile,
            contactName: finalRequest.merchant.companyInformation.contactName,
            dob: moment(finalRequest.merchant.partnerInformation[0].dob).format(
              "DD/MM/YYYY"
            ),
            contactPhone: finalRequest.merchant.companyInformation.contactMobile,
            dbaName: finalRequest.merchant.companyInformation.dbaName,
            establishYear: moment(
              finalRequest.merchant.companyInformation.establishYear
            ).format("DD/MM/YYYY"),
            legalName: finalRequest.merchant.companyInformation.legalName,
            mcc: finalRequest.merchant.companyInformation.mcc,
            pan: finalRequest.merchant.companyInformation.pan,
            registeredCityRefCode:
              finalRequest.merchant.companyInformation.registeredCityRefCode,
            registeredStateRefCode:
              finalRequest.merchant.companyInformation.registeredStateRefCode,
            applicationNumber:
              finalRequest.merchant.salesInformation.applicationNumber,
            planID: "",
            registeredAddress:
              finalRequest.merchant.companyInformation.registeredAddress,
            registeredCityName:
              finalRequest.merchant.companyInformation.registeredCityName,
            registeredStateName:
              finalRequest.merchant.companyInformation.registeredStateName,
            registeredPin: finalRequest.merchant.companyInformation.registeredPin,
            weekdayStartHour:
              finalRequest.merchant.businessInformation.weekdayStartHour,
            weekdayEndHour:
              finalRequest.merchant.businessInformation.weekdayEndHour,
            weekendStartHour:
              finalRequest.merchant.businessInformation.weekendStartHour,
            weekendEndHour:
              finalRequest.merchant.businessInformation.weekendEndHour,
            lastTurnOverYear:
              finalRequest.merchant.businessInformation.lastTurnoverYear == null
                ? ""
                : finalRequest.merchant.businessInformation.lastTurnoverYear,
            lastTurnOverAmount:
              finalRequest.merchant.businessInformation.lastTurnoverAmount,
            expectedCardBusiness:
              finalRequest.merchant.businessInformation.expectedCardBusiness,
            averageBillAmount:
              finalRequest.merchant.businessInformation.averageBillAmount,
            businessIncome:
              finalRequest.merchant.businessInformation.businessIncome,
            averageCountTxnPerDay: "",
            declaredAnnualIncome: "",
            declaredAnnualLimit: "",
            minimumTransaction: "",
            maximumTransaction: "",
            cashAtPosEnabled:
              finalRequest.merchant.revParameters.cashAtPosEnabled,
            preAuth: finalRequest.merchant.revParameters.preAuth,
            tipEnabled: finalRequest.merchant.revParameters.tipEnabled,
            tipPercentage: finalRequest.merchant.paymentDetails.tipPercentage,
            settlementType: finalRequest.merchant.revParameters.settlementType,
            txnEmiAllowed: finalRequest.merchant.revParameters.txnEmiAllowed,
            sodexoEnabled: finalRequest.merchant.revParameters.sodexoEnabled,
            amexEnabled: finalRequest.merchant.revParameters.amexEnabled,
            upiChargeslipEnabled:
              finalRequest.merchant.revParameters.upichargeslipEnabled,
            upiFlag: finalRequest.merchant.revParameters.upiFlag,
            cardAcceptance: finalRequest.merchant.paymentDetails.cardAcceptance,
            deviceType: this.propLeadDeatils.device.deviceName,
            smallMerchant: finalRequest.merchant.salesInformation.categoryType,
            gstNumber: finalRequest.merchant.businessInformation.gstId,
          };

          if (
            finalRequest.merchant.salesInformation.leadFrom ==
            "LS_EQUITAS SMALL FINANCE BANK LIMITED"
          ) {
            self
              .EQUITAS_FRM_DATA(equitasData)
              .then((response) => { })
              .catch(() => {
                self.$q.loading.hide();
              });
          }
          self
            .MARS_DATA_SUBMIT_INTERNAL(finalRequest)
            .then((response) => {
              self.$q.loading.show({
                delay: 0, // ms
                spinnerColor: "purple-9",
                message: "Saved.. Sending data to mars",
              });
              let key = this.merchant.salesInformation.institutionCode;
              this.$q.localStorage.set("aa_t", key);
              if (this.propLeadDeatils.leadStatus == "102") {
                // let key = this.merchant.salesInformation.institutionCode;
                // this.$q.localStorage.set("aa_t", key);
                delete this.merchant.customIncentiveRates[0].add;
                delete this.merchant.customIncentiveRates[1].add;
                delete this.merchant.customIncentiveRates[2].add;
                delete this.merchant.customIncentiveRates[3].add;
                delete this.merchant.customIncentiveRates[4].add;
                delete finalRequest.merchant.leadId;
                delete finalRequest.action;
                delete finalRequest.merchant.revParamAndLeadInfo;
                delete finalRequest.merchant.holdPayment;
                delete finalRequest.merchant.SharingDiscountFee;

                if (this.propLeadDeatils.mAtmOnboardingPlan != null) {
                  if (
                    this.propLeadDeatils.mAtmOnboardingPlan.leadSource
                      .sourceName == "ATM" &&
                    this.propLeadDeatils.mAtmOnboardingPlan.planName ==
                    "Kannor ATM Plan"
                  ) {
                    finalRequest.merchant.mdrPlan.incentive.fixed =
                      finalRequest.merchant.mdrPlan.incentive.fixed;
                    finalRequest.merchant.mdrPlan.incentive.percentage =
                      finalRequest.merchant.mdrPlan.incentive.percentage;
                    finalRequest.merchant.mdrPlan.incentive.minimum =
                      finalRequest.merchant.mdrPlan.incentive.minimum;
                    finalRequest.merchant.mdrPlan.incentive.minimumTxnValue =
                      finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
                  } else {
                    finalRequest.merchant.mdrPlan.incentive.percentage =
                      finalRequest.merchant.mdrPlan.incentive.percentage == 0
                        ? null
                        : finalRequest.merchant.mdrPlan.incentive.percentage;
                    finalRequest.merchant.mdrPlan.incentive.fixed =
                      finalRequest.merchant.mdrPlan.incentive.fixed == 0
                        ? null
                        : finalRequest.merchant.mdrPlan.incentive.fixed;
                    finalRequest.merchant.mdrPlan.incentive.minimum =
                      finalRequest.merchant.mdrPlan.incentive.minimum == 0
                        ? null
                        : finalRequest.merchant.mdrPlan.incentive.minimum;
                    finalRequest.merchant.mdrPlan.incentive.minimumTxnValue =
                      finalRequest.merchant.mdrPlan.incentive.minimumTxnValue == 0
                        ? null
                        : finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
                  }
                } else {
                  finalRequest.merchant.mdrPlan.incentive.percentage =
                    finalRequest.merchant.mdrPlan.incentive.percentage == 0
                      ? null
                      : finalRequest.merchant.mdrPlan.incentive.percentage;
                  finalRequest.merchant.mdrPlan.incentive.fixed =
                    finalRequest.merchant.mdrPlan.incentive.fixed == 0
                      ? null
                      : finalRequest.merchant.mdrPlan.incentive.fixed;
                  finalRequest.merchant.mdrPlan.incentive.minimum =
                    finalRequest.merchant.mdrPlan.incentive.minimum == 0
                      ? null
                      : finalRequest.merchant.mdrPlan.incentive.minimum;
                  finalRequest.merchant.mdrPlan.incentive.minimumTxnValue =
                    finalRequest.merchant.mdrPlan.incentive.minimumTxnValue == 0
                      ? null
                      : finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
                }
                if (
                  finalRequest.merchant.salesInformation.institutionCode ==
                  "104" &&
                  this.propLeadDeatils.device.id == "31"
                ) {
                  // alert("AXIS INSTANCE AND ME31 DEVICE CALLING")
                  finalRequest.merchant.paymentDetails.terminalModeCode = "34";
                }
                // finalRequest.merchant.paymentDetails.numberOfTerminals = 1;
                let size = finalRequest.merchant.partnerInformation.length;
                for (var i = 0; i < size; i++) {
                  finalRequest.merchant.partnerInformation[i].dob =
                    this.commonDateFormatDOB1(
                      finalRequest.merchant.partnerInformation[i].dob
                    );
                }

                self
                  .MARS_DATA_SUBMIT_EXTERNAL({
                    params: finalRequest,
                    leadStatus: this.propLeadDeatils.leadStatus,
                    refNumber: this.propLeadDeatils.merchantRefCode,
                  })

                  .then((response) => {
                    let feed_paramaters;
                    if (response.status == 204) {
                      feed_paramaters = {
                        applicationNumber: this.propLeadDeatils.applicationNumber,
                        merchantRefCode: this.propLeadDeatils.merchantRefCode,
                      };
                    } else {
                      feed_paramaters = response.body;
                    }
                    self.$q.loading.show({
                      delay: 0, // ms
                      spinnerColor: "purple-9",
                      message: "Great.. All set to go",
                    });

                    if (self.leadSourceApp.multiTidEnabled == true) {
                      let param = {
                        merchantRefCode: feed_paramaters.merchantRefCode,
                        marsDeviceId: request.id,
                      };
                      self
                        .SUBMIT_SUB_TID_MERCHANT_REF_CODE_DETAILS(param)
                        .then((response) => {
                          self.$q.notify({
                            color: "positive",
                            position: "bottom",
                            message: "Successfully submitted to MARS",
                            icon: "thumb_up",
                          });
                          self.$q.loading.hide();
                        });
                      self.updateLeadStatus({
                        leadId: self.$route.params.id,
                        status: 104,
                      });
                    }
                    self
                      .MARS_DATA_EXTERNAL_SUBMIT_RESPONSE({
                        request: feed_paramaters,
                        leadId: self.$route.params.id,
                      })
                      .then((response) => {
                        self.$q.notify({
                          color: "positive",
                          position: "bottom",
                          message: "Successfully submitted to MARS",
                          icon: "thumb_up",
                        });
                        if (self.leadSourceApp.multiTidEnabled == false)
                          self.$router.push("/sat/lead/validation");
                        self.$q.loading.hide();
                      });
                  })
                  .catch((error) => {
                    this.merchant.companyInformation.constitutionName =
                      this.propLeadDeatils.merchantType.merchantTypeName;
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
                        finalRequest.merchant.salesInformation
                          .loanDisbursementDate
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
                    this.$set(
                      finalRequest.merchant.businessInformation,
                      "lastTurnoverYear",
                      this.commonDateFormatInvalidMARSformat(
                        finalRequest.merchant.businessInformation.lastTurnoverYear
                      )
                    );

                    if (error.data.hasOwnProperty("errorDetails")) {
                      let OThis = this;
                      _.map(error.data.errorDetails, (actual) => {
                        let splitted = actual.field.split("/");
                        if (splitted[1].slice(0, 18) == "partnerInformation") {
                          let findPartnersErrorIndex = actual.field
                            .split("partnerInformation")[1]
                            .slice(1, 2);
                          let computeSplitted = splitted[splitted.length - 1];
                          let fieldErrorFound = eval(`
          OThis.$v.viewBinding.partnersArr.$each[
            ${findPartnersErrorIndex}
          ].${computeSplitted}`);
                          fieldErrorFound.$model = "";
                          OThis.error.tab.partnerInformation = true;

                          let generateErrorMessage = eval(`
          OThis.error.field.merchant.partnerInformation[
            ${findPartnersErrorIndex}
          ]`);
                          generateErrorMessage.alert = true;
                          generateErrorMessage.issue = actual.issue;
                          generateErrorMessage.value = actual.value;
                        } else {
                          let splittingErrorField = `OThis.$v.${splitted.join(
                            "."
                          )}`;
                          let fieldErrorFound = eval(splittingErrorField);
                          fieldErrorFound.$model = "";
                          OThis.$set(OThis.error.tab, splitted[1], true);

                          let generateErrorMessage = eval(
                            `OThis.error.field.${splitted.join(".")}`
                          );
                          generateErrorMessage.alert = true;
                          generateErrorMessage.issue = actual.issue;
                          generateErrorMessage.value = actual.value;
                        }
                      });
                      this.$q.notify({
                        color: "negative",
                        position: "bottom",
                        message: `${error.data.message}`,
                        icon: "thumb_down",
                      });
                    } else {
                      this.$q.notify({
                        color: "negative",
                        position: "bottom",
                        message: `${error.data.message}`,
                        icon: "thumb_down",
                      });
                    }
                    self.$q.loading.hide();
                  });
              } else {
                self
                  .MARS_CHECK_STATUS_API(finalRequest)
                  .then(response => {
                    let feed_paramaters = {
                      applicationNumber: response.body.applicationNumber,
                      merchantRefCode: response.body.merchantRefCode,
                      merchantId: null,
                      terminalId: null,
                      remarks: null,
                      agrName: null,
                      vpa: null
                    };
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
                        if (self.leadSourceApp.multiTidEnabled == false)
                          self.$router.push("/sat/lead/validation");
                        self.$q.loading.hide();
                      });
                  })
                  .catch(error => {
                    self.$q.loading.hide();
                    if (
                      error.body.name == "INVALID APPLICATION NUMBER" &&
                      error.status == 404
                    ) {
                      self.$q.loading.show({
                        delay: 0, // ms
                        spinnerColor: "purple-9",
                        message: "Saved.. Sending data to mars"
                      });
                      delete this.merchant.customIncentiveRates[0].add;
                      delete this.merchant.customIncentiveRates[1].add;
                      delete this.merchant.customIncentiveRates[2].add;
                      delete this.merchant.customIncentiveRates[3].add;
                      delete this.merchant.customIncentiveRates[4].add;

                      delete finalRequest.merchant.leadId;
                      delete finalRequest.action;
                      delete finalRequest.merchant.revParamAndLeadInfo;
                      delete finalRequest.merchant.holdPayment;
                      delete finalRequest.merchant.SharingDiscountFee;

                      if (this.propLeadDeatils.mAtmOnboardingPlan != null) {
                        if (
                          this.propLeadDeatils.mAtmOnboardingPlan.leadSource
                            .sourceName == "ATM" &&
                          this.propLeadDeatils.mAtmOnboardingPlan.planName ==
                          "Kannor ATM Plan"
                        ) {
                          finalRequest.merchant.mdrPlan.incentive.fixed =
                            finalRequest.merchant.mdrPlan.incentive.fixed;
                          finalRequest.merchant.mdrPlan.incentive.percentage =
                            finalRequest.merchant.mdrPlan.incentive.percentage;
                          finalRequest.merchant.mdrPlan.incentive.minimum =
                            finalRequest.merchant.mdrPlan.incentive.minimum;
                          finalRequest.merchant.mdrPlan.incentive.minimumTxnValue =
                            finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
                        } else {
                          finalRequest.merchant.mdrPlan.incentive.percentage =
                            finalRequest.merchant.mdrPlan.incentive.percentage ==
                              0
                              ? null
                              : finalRequest.merchant.mdrPlan.incentive
                                .percentage;
                          finalRequest.merchant.mdrPlan.incentive.fixed =
                            finalRequest.merchant.mdrPlan.incentive.fixed == 0
                              ? null
                              : finalRequest.merchant.mdrPlan.incentive.fixed;
                          finalRequest.merchant.mdrPlan.incentive.minimum =
                            finalRequest.merchant.mdrPlan.incentive.minimum == 0
                              ? null
                              : finalRequest.merchant.mdrPlan.incentive.minimum;
                          finalRequest.merchant.mdrPlan.incentive.minimumTxnValue =
                            finalRequest.merchant.mdrPlan.incentive
                              .minimumTxnValue == 0
                              ? null
                              : finalRequest.merchant.mdrPlan.incentive
                                .minimumTxnValue;
                        }
                      } else {
                        finalRequest.merchant.mdrPlan.incentive.percentage =
                          finalRequest.merchant.mdrPlan.incentive.percentage == 0
                            ? null
                            : finalRequest.merchant.mdrPlan.incentive.percentage;
                        finalRequest.merchant.mdrPlan.incentive.fixed =
                          finalRequest.merchant.mdrPlan.incentive.fixed == 0
                            ? null
                            : finalRequest.merchant.mdrPlan.incentive.fixed;
                        finalRequest.merchant.mdrPlan.incentive.minimum =
                          finalRequest.merchant.mdrPlan.incentive.minimum == 0
                            ? null
                            : finalRequest.merchant.mdrPlan.incentive.minimum;
                        finalRequest.merchant.mdrPlan.incentive.minimumTxnValue =
                          finalRequest.merchant.mdrPlan.incentive
                            .minimumTxnValue == 0
                            ? null
                            : finalRequest.merchant.mdrPlan.incentive
                              .minimumTxnValue;
                      }
                      if (
                        finalRequest.merchant.salesInformation.institutionCode ==
                        "104" &&
                        this.propLeadDeatils.device.id == "31"
                      ) {
                        // alert("AXIS INSTANCE AND ME31 DEVICE CALLING")
                        finalRequest.merchant.paymentDetails.terminalModeCode =
                          "34";
                      }
                      // finalRequest.merchant.paymentDetails.numberOfTerminals = 1;
                      let size = finalRequest.merchant.partnerInformation.length;
                      for (var i = 0; i < size; i++) {
                        finalRequest.merchant.partnerInformation[
                          i
                        ].dob = this.commonDateFormatDOB1(
                          finalRequest.merchant.partnerInformation[i].dob
                        );
                      }

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
                              applicationNumber: this.propLeadDeatils
                                .applicationNumber,
                              merchantRefCode: this.propLeadDeatils
                                .merchantRefCode
                            };
                          } else {
                            feed_paramaters = response.body;
                          }
                          self.$q.loading.show({
                            delay: 0, // ms
                            spinnerColor: "purple-9",
                            message: "Great.. All set to go"
                          });

                          if (self.leadSourceApp.multiTidEnabled == true) {
                            let param = {
                              merchantRefCode: feed_paramaters.merchantRefCode,
                              marsDeviceId: request.id
                            };
                            self
                              .SUBMIT_SUB_TID_MERCHANT_REF_CODE_DETAILS(param)
                              .then(response => {
                                self.$q.notify({
                                  color: "positive",
                                  position: "bottom",
                                  message: "Successfully submitted to MARS",
                                  icon: "thumb_up"
                                });
                                self.$q.loading.hide();
                              });
                            self.updateLeadStatus({
                              leadId: self.$route.params.id,
                              status: 104
                            });
                          }
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
                              if (self.leadSourceApp.multiTidEnabled == false)
                                self.$router.push("/sat/lead/validation");
                              self.$q.loading.hide();
                            });
                        })
                        .catch(error => {
                          this.merchant.companyInformation.constitutionName = this.propLeadDeatils.merchantType.merchantTypeName;
                          this.$set(
                            finalRequest.merchant.salesInformation,
                            "applicationDate",
                            this.commonDateFormatInvalidMARSformat(
                              finalRequest.merchant.salesInformation
                                .applicationDate
                            )
                          );

                          this.$set(
                            finalRequest.merchant.salesInformation,
                            "aggreementDate",
                            this.commonDateFormatInvalidMARSformat(
                              finalRequest.merchant.salesInformation
                                .aggreementDate
                            )
                          );

                          this.$set(
                            finalRequest.merchant.salesInformation,
                            "loanDisbursementDate",
                            this.commonDateFormatInvalidMARSformat(
                              finalRequest.merchant.salesInformation
                                .loanDisbursementDate
                            )
                          );

                          this.$set(
                            finalRequest.merchant.salesInformation,
                            "tenureStartDate",
                            this.commonDateFormatInvalidMARSformat(
                              finalRequest.merchant.salesInformation
                                .tenureStartDate
                            )
                          );

                          this.$set(
                            finalRequest.merchant.companyInformation,
                            "establishYear",
                            this.commonDateFormatInvalidMARSformat(
                              finalRequest.merchant.companyInformation
                                .establishYear
                            )
                          );

                          this.$set(
                            finalRequest.merchant.bankInformation
                              .collectionDetails,
                            "chequeDepositedDate",
                            this.commonDateFormatInvalidMARSformat(
                              finalRequest.merchant.bankInformation
                                .collectionDetails.chequeDepositedDate
                            )
                          );

                          this.$set(
                            finalRequest.merchant.bankInformation
                              .collectionDetails,
                            "collectedDate",
                            this.commonDateFormatInvalidMARSformat(
                              finalRequest.merchant.bankInformation
                                .collectionDetails.collectedDate
                            )
                          );

                          this.$set(
                            finalRequest.merchant.bankInformation
                              .collectionDetails,
                            "chequeDate",
                            this.commonDateFormatInvalidMARSformat(
                              finalRequest.merchant.bankInformation
                                .collectionDetails.chequeDate
                            )
                          );

                          this.$set(
                            finalRequest.merchant.businessInformation,
                            "memberSince",
                            this.commonDateFormatInvalidMARSformat(
                              finalRequest.merchant.businessInformation
                                .memberSince
                            )
                          );
                          this.$set(
                            finalRequest.merchant.businessInformation,
                            "lastTurnoverYear",
                            this.commonDateFormatInvalidMARSformat(
                              finalRequest.merchant.businessInformation
                                .lastTurnoverYear
                            )
                          );

                          if (error.data.hasOwnProperty("errorDetails")) {
                            let OThis = this;
                            _.map(error.data.errorDetails, actual => {
                              let splitted = actual.field.split("/");
                              if (
                                splitted[1].slice(0, 18) == "partnerInformation"
                              ) {
                                let findPartnersErrorIndex = actual.field
                                  .split("partnerInformation")[1]
                                  .slice(1, 2);
                                let computeSplitted =
                                  splitted[splitted.length - 1];
                                let fieldErrorFound = eval(`
          OThis.$v.viewBinding.partnersArr.$each[
            ${findPartnersErrorIndex}
          ].${computeSplitted}`);
                                fieldErrorFound.$model = "";
                                OThis.error.tab.partnerInformation = true;

                                let generateErrorMessage = eval(`
          OThis.error.field.merchant.partnerInformation[
            ${findPartnersErrorIndex}
          ]`);
                                generateErrorMessage.alert = true;
                                generateErrorMessage.issue = actual.issue;
                                generateErrorMessage.value = actual.value;
                              } else {
                                let splittingErrorField = `OThis.$v.${splitted.join(
                                  "."
                                )}`;
                                let fieldErrorFound = eval(splittingErrorField);
                                fieldErrorFound.$model = "";
                                OThis.$set(OThis.error.tab, splitted[1], true);

                                let generateErrorMessage = eval(
                                  `OThis.error.field.${splitted.join(".")}`
                                );
                                generateErrorMessage.alert = true;
                                generateErrorMessage.issue = actual.issue;
                                generateErrorMessage.value = actual.value;
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
                    } else {
                    }
                  });
              }
            })
            .catch(() => {
              self.$q.loading.hide();
            });
        }
      },

      commonDateFormatDOB1(selectedDate) {
        if (
          selectedDate == "" ||
          selectedDate == null ||
          selectedDate == "Invalid date"
        ) {
          return null;
        } else {
          return moment(selectedDate).format("DD/MM/YYYY");

          //         if(selectedDate instanceof number){
          //         return moment(selectedDate).format("DD/MM/YYYY");
          //         }
          //         else{
          //             return selectedDate;
          //         }
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
      commonDateFormatDOB(selectedDate) {
        if (
          selectedDate == "" ||
          selectedDate == null ||
          selectedDate == "Invalid date"
        ) {
          return null;
        } else {
          return moment(selectedDate).format("DD-MM-YYYY");
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
      },
      fnClearZone() {
        this.merchant.additionalInfo.branchZone = "";
      },
      fnMposStatebasedCity() {
        this.FETCH_ALL_MPOS_CITY(this.merchant.additionalInfo.state);
      },
      categoryBasedSubCategory() {
        this.FETCH_ALL_MPOS_SUBCATEGORY(this.merchant.additionalInfo.category);
      },
      fnFetchZone() {
        //  this.FETCH_ALL_DISTRICT(this.merchant.salesInformation.iaLocation).then(() => {

        //     let assumeArr = [];
        //     this.getAllDistrict.district.map(function(value) {
        //       assumeArr.push({ label: value.district, value: value.district });
        //     });
        //     this.allDistrict = assumeArr;

        // });

        this.FETCH_ALL_DISTRICT(this.merchant.additionalInfo.branchZone);
      },
      fnFetchBranchName() {
        this.FECTCH_ALL_BRANCH(this.merchant.additionalInfo.iaDistrict);
        this.merchant.additionalInfo.raDistrict =
          this.merchant.additionalInfo.iaDistrict;
        this.merchant.additionalInfo.od1District =
          this.merchant.additionalInfo.iaDistrict;
        this.merchant.additionalInfo.od2District =
          this.merchant.additionalInfo.iaDistrict;
        // this.merchant.additionalInfo.lorState = this.merchant.additionalInfo.iaDistrict;
      },
      fnClearBranchName() {
        this.merchant.additionalInfo.installationBranchCode = "";
      },
      searchIaLocation(request, done) {
        this.FETCH_IA_LOCATION(request);
        done(this.getiaLocation);
      },
      searchIorState(request, done) {
        this.FETCH_IOR_STATE(request);
        done(this.getiorState);
      },
      searchAxisBankPincode(request, done) {
        this.FETCH_AXIS_BANK_PINCODE_LOCATION(request);
        done(this.getAxisBankPincode);
      },
      pincodeBasedDistrict() {
        this.FETCH_AXIS_BANK_PINCODE_BASED_DISTRICT(
          this.merchant.additionalInfo.pin
        );
      },
      pincodeandDistrictBasedCity() {
        this.FETCH_AXIS_BANK_PINCODE_DISTRICT(
          this.merchant.additionalInfo.pin +
          "/" +
          this.merchant.additionalInfo.state
        );
      },
      citybasedlocation() {
        this.FETCH_AXIS_BANK_CITY_LOCATION(this.merchant.additionalInfo.city);
      },
      applicationNumberFromToHands(leadid) {
        this.FETCH_APPLICATION_NUMBER(leadid)
          .then(() => {

            console.log("TWO HANDS APP NUM", this.getApplicationNumber.applicationNumber)

            this.merchant.salesInformation.applicationNumber = this.getApplicationNumber.applicationNumber;
          })
          .catch((error) => {
            console.error("Error fetching application number:", error);
          });
      },
    },
  };
</script>

<style scoped>
  .payment_verification_table i {
    transition: none !important;
  }

  .customTableClass .q-table tbody tr td {
    word-break: break-all;
    transition: none !important;
  }

  /* .q-table tbody td {
  word-wrap: break-word !important;
} */
  .border-1 {
    border: 1px solid #e5e5e5;
  }

  .q-custom-class {
    min-height: 270px;
  }

  .custom-z-index {
    z-index: 2;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    text-align: left;
    padding: 16px;
  }

  .readonly-select {
    pointer-events: none;
    opacity: 1 !important;
    cursor: not-allowed !important;
  }
</style>
