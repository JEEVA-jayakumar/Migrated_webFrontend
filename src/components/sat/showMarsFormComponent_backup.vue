<template>
    <div>
    <!-- Documents -->
    <div id="mainContainer" class="row">
      <!-- Documents proof -->
      <div id="leftSidePane" class="col-md-5 q-pa-xs largeCont " v-if="showDocumentPreview">
        <viewLeadDocumentsDataEntryComponent :propLeadDocumentInformation="propLeadDeatils.leadDocuments" :propGetShortInfo="propLeadDeatils" />
      </div>
      <!-- Document related form -->
      <div id="rightSidePane" class="col-md-7 q-pa-xs block relative">
        <q-stepper color="purple-9" ref="stepper" contractable text alternative-labels>
            <q-step error-icon="warning" :order="1" :error="salesInformationError" name="first" title="Sales" subtitle="Info">
              <div class="row gutter-sm">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select 
                  @blur="$v.merchant.salesInformation.institutionCode.$touch"      
                  :error="$v.merchant.salesInformation.institutionCode.$error" 
                  placeholder="Choose from the below" color="grey-9" v-model="merchant.salesInformation.institutionCode" float-label="Institution Code*" :options="institutionCodeOptions" @input="fetchAllDropdownValuesFromMARSapi"/>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select 
                  @blur="$v.merchant.salesInformation.applicationType.$touch"      
                  :error="$v.merchant.salesInformation.applicationType.$error" 
                  placeholder="Choose from the below*" color="grey-9" v-model="merchant.salesInformation.applicationType" float-label="Application Type*" :options="applicationTypeOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input 
                  @blur="$v.merchant.salesInformation.applicationNumber.$touch"      
                  :error="$v.merchant.salesInformation.applicationNumber.$error" 
                  color="grey-9" v-model="merchant.salesInformation.applicationNumber"  float-label="Application Number*" placeholder="Application Number*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input
                  @blur="$v.merchant.salesInformation.applicationDate.$touch"      
                  :error="$v.merchant.salesInformation.applicationDate.$error"
                  format="DD/MM/YYYY"
                  color="grey-9" 
                  minimal 
                  v-model="merchant.salesInformation.applicationDate" 
                  float-label="Application Date*" 
                  placeholder="Application Date*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input
                  format="DD/MM/YYYY"
                  format-model="date"
                  @blur="$v.merchant.salesInformation.aggreementDate.$touch"      
                  :error="$v.merchant.salesInformation.aggreementDate.$error"
                  color="grey-9" minimal v-model="merchant.salesInformation.aggreementDate"  float-label="Agreement Date*" placeholder="Agreement Date*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select 
                  @blur="$v.merchant.salesInformation.merchantType.$touch"      
                  :error="$v.merchant.salesInformation.merchantType.$error"
                  placeholder="Choose from the below*" color="grey-9" v-model="merchant.salesInformation.merchantType" float-label="Merchant Type*" :options="merchantTypeOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select 
                  @blur="$v.merchant.salesInformation.categoryType.$touch"      
                  :error="$v.merchant.salesInformation.categoryType.$error"
                  placeholder="Choose from the below*" color="grey-9" v-model="merchant.salesInformation.categoryType" float-label="Category Type*" :options="categoryTypeOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select 
                  placeholder="Choose from the below*" color="grey-9" 
                  @blur="$v.merchant.salesInformation.salesPersonCode.$touch"      
                  :error="$v.merchant.salesInformation.salesPersonCode.$error" v-model="merchant.salesInformation.salesPersonCode" float-label="Sales Person*" :options="salesPersonOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9" 
                  @blur="$v.merchant.salesInformation.region.$touch"      
                  :error="$v.merchant.salesInformation.region.$error"
                  v-model="merchant.salesInformation.region" float-label="Region*" :options="regionOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9" 
                  @blur="$v.merchant.salesInformation.leadFrom.$touch"      
                  :error="$v.merchant.salesInformation.leadFrom.$error" v-model="merchant.salesInformation.leadFrom" float-label="Lead From*" :options="leadFromOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <p class="text-caption">Sharing Model</p>
                  <div v-for="(item,index) in viewBinding.sharingModelCode" :key="index" >
                      <q-radio color="grey-9" v-model="merchant.salesInformation.sharingModelCode" :val="item.value" :label="item.label" />
                  </div>
                </div>
              </div>
              <!-- T => Transaction value model -->
              <div v-if="merchant.salesInformation.sharingModelCode == 'T'" class="row gutter-sm q-my-xs">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select 
                  @blur="$v.merchant.salesInformation.sharingPartnerCode.$touch"      
                  :error="$v.merchant.salesInformation.sharingPartnerCode.$error"
                  placeholder="Choose from the below*" color="grey-9" v-model="merchant.salesInformation.sharingPartnerCode" float-label="Sharing partner*" :options="sharingPartnerOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input 
                  @blur="$v.merchant.salesInformation.dailyFixedAmount.$touch"      
                  :error="$v.merchant.salesInformation.dailyFixedAmount.$error"
                  color="grey-9" v-model="merchant.salesInformation.dailyFixedAmount"  float-label="Daily fixed amount*" type="number" placeholder="Daily fixed amount*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input 
                  @blur="$v.merchant.salesInformation.loanDisbursementPercentage.$touch"      
                  :error="$v.merchant.salesInformation.loanDisbursementPercentage.$error"
                  color="grey-9" v-model="merchant.salesInformation.loanDisbursementPercentage"  float-label="Percentage*" type="number" placeholder="Percentage*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input
                  format="DD/MM/YYYY"
                  format-model="date"
                  @blur="$v.merchant.salesInformation.loanDisbursementAmount.$touch"      
                  :error="$v.merchant.salesInformation.loanDisbursementAmount.$error"
                  color="grey-9" v-model="merchant.salesInformation.loanDisbursementAmount"  float-label="Loan disbursement value*" type="number" placeholder="Loan disbursement value*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input
                  format="DD/MM/YYYY"
                  format-model="date"
                  @blur="$v.merchant.salesInformation.loanDisbursementDate.$touch"      
                  :error="$v.merchant.salesInformation.loanDisbursementDate.$error"
                  color="grey-9" minimal v-model="merchant.salesInformation.loanDisbursementDate"   float-label="Disbursement Date*" placeholder="Disbursement Date*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input 
                  @blur="$v.merchant.salesInformation.tenureMonth.$touch"      
                  :error="$v.merchant.salesInformation.tenureMonth.$error"
                  color="grey-9" v-model="merchant.salesInformation.tenureMonth"  float-label="Tenure (in months)*" type="number" placeholder="Tenure (in months)*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input 
                  @blur="$v.merchant.salesInformation.tenureDay.$touch"      
                  :error="$v.merchant.salesInformation.tenureDay.$error"
                  color="grey-9" v-model="merchant.salesInformation.tenureDay"  float-label="Tenure (in days)*" type="number" placeholder="Tenure (in days)*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input
                  format="DD/MM/YYYY"
                  format-model="date"
                  @blur="$v.merchant.salesInformation.tenureStartDate.$touch"      
                  :error="$v.merchant.salesInformation.tenureStartDate.$error"
                  color="grey-9" minimal v-model="merchant.salesInformation.tenureStartDate"  float-label="Start Date*" placeholder="Tenure Start Date*" />
                </div>
              </div>
              <!-- M => MDR/cash@pos/rent -->
              <div v-if="merchant.salesInformation.sharingModelCode == 'M'"
              class="row gutter-sm q-my-xs">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select
                  @blur="$v.merchant.salesInformation.sharingPartnerCode.$touch"      
                  :error="$v.merchant.salesInformation.sharingPartnerCode.$error"
                  placeholder="Choose from the below*" color="grey-9" v-model="merchant.salesInformation.sharingPartnerCode" float-label="Sharing partner*" :options="sharingPartnerOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input 
                  @blur="$v.merchant.salesInformation.rentPercentage.$touch"      
                  :error="$v.merchant.salesInformation.rentPercentage.$error"
                  color="grey-9" v-model="merchant.salesInformation.rentPercentage"  float-label="Rent %*" type="number" placeholder="Rent %*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input 
                  @blur="$v.merchant.salesInformation.rentFixed.$touch"      
                  :error="$v.merchant.salesInformation.rentFixed.$error"
                  color="grey-9" v-model="merchant.salesInformation.rentFixed"  float-label="Rent fixed*" type="number" placeholder="Rent fixed*" />
                </div>
              </div>
              <!-- Navigation for this step at the end of QStep-->
              <q-stepper-navigation>
                <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('salesInformation')" label="Continue" />
                <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" @click="saveCurrentChanges()" />
              </q-stepper-navigation>
            </q-step>
            <q-step error-icon="warning" name="second" :error="companyInformationError" :order="2" title="Details">
              <div class="row gutter-sm">
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.legalName.$touch"      
                    :error="$v.merchant.companyInformation.legalName.$error"
                    color="grey-9" v-model="merchant.companyInformation.legalName" float-label="Legal Name*" placeholder="Legal Name*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.dbaName.$touch"      
                    :error="$v.merchant.companyInformation.dbaName.$error" 
                    color="grey-9" v-model="merchant.companyInformation.dbaName" float-label="DBA Name*" placeholder="DBA Name*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.registeredAddress.$touch"      
                    :error="$v.merchant.companyInformation.registeredAddress.$error"
                    color="grey-9" v-model="merchant.companyInformation.registeredAddress" float-label="Registered Address*" placeholder="Registered Address*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.registeredCityRefCode.$touch"      
                    :error="$v.merchant.companyInformation.registeredCityRefCode.$error"
                    color="grey-9" v-model="merchant.companyInformation.registeredCityName" float-label="Registered city*" placeholder="Start typing ..*">
                      <q-autocomplete
                      separator
                      @search="residentCitySearch"
                      :debounce="500"
                      :min-characters="3"
                      @selected="registeredCitySelected"
                      />
                    </q-input>
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.registeredStateRefCode.$touch"      
                    :error="$v.merchant.companyInformation.registeredStateRefCode.$error"
                    color="grey-9" v-model="merchant.companyInformation.registeredStateName" float-label="Registered state*" placeholder="Start typing ..*">
                      <q-autocomplete
                      separator
                      @search="residentStateSearch"
                      :debounce="500"
                      :min-characters="3"
                      @selected="registeredStateSelected"
                      />
                    </q-input>
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.registeredPin.$touch"      
                    :error="$v.merchant.companyInformation.registeredPin.$error"
                    color="grey-9" type="number" v-model="merchant.companyInformation.registeredPin" float-label="PIN*" placeholder="PIN*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-select 
                    @input="togglePartnersTab"
                    @blur="$v.merchant.companyInformation.constitution.$touch"      
                    :error="$v.merchant.companyInformation.constitution.$error"
                    placeholder="Choose from the below*" color="grey-9" v-model="merchant.companyInformation.constitution" float-label="Type of business entity*" :options="constitutionOptions" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input color="grey-9" minimal
                    @blur="$v.merchant.companyInformation.establishYear.$touch" 
                    :error="$v.merchant.companyInformation.establishYear.$error"     v-model="merchant.companyInformation.establishYear" float-label="Year of Establishment*" placeholder="Year of Establishment*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input color="grey-9" v-model="merchant.companyInformation.registerNumber" float-label="Establish Number*" placeholder="Establish Number*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input color="grey-9" v-model="merchant.companyInformation.tin" float-label="TIN*" placeholder="TIN*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input color="grey-9" v-model="merchant.companyInformation.pan" float-label="Company PAN*" placeholder="Company PAN*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input color="grey-9" v-model="merchant.companyInformation.tan" float-label="TAN" placeholder="TAN" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input color="grey-9" v-model="merchant.companyInformation.businessNature" float-label="Nature of Business*" placeholder="Nature of Business*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-select placeholder="Choose from the below*" color="grey-9" v-model="merchant.companyInformation.businessType" float-label="Type of Business*" :options="businessTypeOptions" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.mcc.$touch"      
                    :error="$v.merchant.companyInformation.mcc.$error"
                    color="grey-9" v-model="merchant.companyInformation.mccname" float-label="MCC*" placeholder="Start typing ..*">
                      <q-autocomplete
                      separator
                      @search="mccSearch"
                      :debounce="500"
                      :min-characters="3"
                      @selected="mccSelected"
                      />
                    </q-input>
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.residentialAddress.$touch"      
                    :error="$v.merchant.companyInformation.residentialAddress.$error"
                    color="grey-9" v-model="merchant.companyInformation.residentialAddress" float-label="Residential Address*" placeholder="Residential Address*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.residentialPin.$touch"      
                    :error="$v.merchant.companyInformation.residentialPin.$error"
                    color="grey-9" type="number" v-model="merchant.companyInformation.residentialPin" float-label="PIN*" placeholder="PIN*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.residentialCityRefCode.$touch"      
                    :error="$v.merchant.companyInformation.residentialCityRefCode.$error"
                    color="grey-9" v-model="merchant.companyInformation.residentCityName" float-label="City (type min 3 characters)*" placeholder="Start typing ..*">
                      <q-autocomplete
                      separator
                      @search="residentCitySearch"
                      :debounce="500"
                      :min-characters="3"
                      @selected="residentCitySelected"
                      />
                    </q-input>
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input
                    @blur="$v.merchant.companyInformation.residentialStateRefCode.$touch"      
                    :error="$v.merchant.companyInformation.residentialStateRefCode.$error"
                    color="grey-9" v-model="merchant.companyInformation.residentStateName" float-label="State (type min 3 characters)*" placeholder="Start typing ..*">
                      <q-autocomplete
                      separator
                      @search="residentStateSearch"
                      :debounce="500"
                      :min-characters="3"
                      @selected="residentStateSelected"
                      />
                    </q-input>
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.contactName.$touch"      
                    :error="$v.merchant.companyInformation.contactName.$error"
                    color="grey-9" v-model="merchant.companyInformation.contactName" float-label="Contact Name*" placeholder="Contact Name*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.contactMobile.$touch"      
                    :error="$v.merchant.companyInformation.contactMobile.$error"
                    color="grey-9" type="number" v-model="merchant.companyInformation.contactMobile" float-label="Contact mobile*" placeholder="Contact Mobile*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input color="grey-9" type="tel" v-model="merchant.companyInformation.contactAlternateMobile" float-label="Contact Alt Mobile" placeholder="Contact Alt Mobile" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input color="grey-9" type="tel" 
                    @blur="$v.merchant.companyInformation.contactPhone.$touch"      
                    :error="$v.merchant.companyInformation.contactPhone.$error" v-model="merchant.companyInformation.contactPhone" float-label="Contact Phone*" placeholder="Contact Phone*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="$v.merchant.companyInformation.contactEmail.$touch"      
                    :error="$v.merchant.companyInformation.contactEmail.$error"
                    color="grey-9" type="email" v-model="merchant.companyInformation.contactEmail" float-label="Contact Email*" placeholder="Contact Email*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <div class="text-caption">Statement type</div>
                    <div class="group">
                      <q-radio 
                      @blur="$v.merchant.companyInformation.statementType.$touch"      
                      :error="$v.merchant.companyInformation.statementType.$error"
                      v-for="(item,index) in viewBinding.statementType" :key="index" color="grey-9" v-model="merchant.companyInformation.statementType" :val="item.value" :label="item.label"
                        />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <p class="text-caption">Statement frequency</p>
                    <div class="group">
                      <q-radio 
                      @blur="$v.merchant.companyInformation.statementFrequency.$touch"      
                      :error="$v.merchant.companyInformation.statementFrequency.$error"
                      v-for="(item,index) in viewBinding.statementFrequency" :key="index" color="grey-9" v-model="merchant.companyInformation.statementFrequency" :val="item.value" :label="item.label" />
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input color="grey-9" v-model="merchant.companyInformation.statementEmail" float-label="Statement Email" placeholder="Statement Email" />
                  </div>
              </div>
              <q-stepper-navigation>
                <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('companyInformation')" label="Continue" />
                <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" @click="saveCurrentChanges()" />
                <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$refs.stepper.previous()" label="Back" />
              </q-stepper-navigation>
            </q-step>
            <q-step error-icon="warning" name="third" :error="businessInformationError" :order="3" title="Partners" v-if="showPartnerstab">
                <div v-for="(v,index) in $v.viewBinding.partnersArr.$each" :key="index" class="row q-my-xs gutter-sm" ref="parentElement">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row group items-center">
                      <div class="col">
                        <span class="q-pa-sm bg-light text-dark"><q-icon name="people" /> 
                        Partner 0{{parseInt(index)+1}}</span>
                      </div>
                      <div class="col-auto" v-if="$v.viewBinding.partnersArr.$each.length > 1">
                        <q-btn round icon="delete" @click="removePartnerFromArr(v,index)" color="negative" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="v.name.$touch" 
                    :error="v.name.$error"
                    color="grey-9" v-model="v.$model.name" float-label="Name*" placeholder="Name*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="v.pan.$touch" 
                    :error="v.pan.$error"
                    color="grey-9" v-model="v.$model.pan" float-label="Pan*" placeholder="Pan*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                     @blur="v.$model.address.$touch" 
                    :error="v.$model.address.$error"
                    color="grey-9" v-model="v.$model.address" float-label="Address*" placeholder="Address*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="v.$model.pin.$touch" 
                    :error="v.$model.pin.$error"
                    color="grey-9" type="number" v-model="v.$model.pin" float-label="Pincode*" placeholder="Pincode*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                     @blur="v.cityRefLabel.$model.$touch" 
                    :error="v.cityRefLabel.$model.$error"
                    color="grey-9"  v-model="v.$model.cityRefLabel" float-label="City (type min 3 characters)*" placeholder="Start typing ..*">
                    <q-autocomplete
                    separator
                    @search="partnerCitySearch"
                    :debounce="500"
                    :min-characters="3"
                    @selected="obj => partnerCitySelected(obj,index)"
                    />
                    </q-input>
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12" ref="currentStateEl">
                    <q-input 
                    @blur="v.$model.stateRefLabel.$touch" 
                    :error="v.$model.stateRefLabel.$error"
                    color="grey-9" v-model="v.$model.stateRefLabel" float-label="State (type min 3 characters)*" placeholder="Start typing ..*">
                      <q-autocomplete
                      separator
                      @search="partnerStateSearch"
                      :debounce="500"
                      :min-characters="3"
                      @selected="obj => partnerStateSelected(obj,index)"
                      />
                    </q-input>
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="v.$model.contactMobile.$touch" 
                    :error="v.$model.contactMobile.$error"
                    color="grey-9" type="tel" v-model="v.$model.contactMobile" float-label="Mobile*" placeholder="Mobile*" />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                    @blur="v.$model.contactEmail.$touch" 
                    :error="v.$model.contactEmail.$error"
                    color="grey-9" type="email"  v-model="v.$model.contactEmail" float-label="Email*" placeholder="Email*" />
                  </div>
                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('partners')" label="Continue" />
                  <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" @click="saveCurrentChanges()" />
                  <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$refs.stepper.previous()" label="Back" />
                  <q-btn color="positive float-right" @click="addMorePartnersSet()" class="q-ma-xs" icon="add" label="Add More" />
                </q-stepper-navigation>
            </q-step>
            <q-step error-icon="warning" name="fourth" :error="partnerInformationError" :order="4"  title="Business" subtitle="Info">
              <div class="row gutter-sm">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" v-model="merchant.businessInformation.weekdayStartHour" float-label="Weekday start hour" placeholder="Weekday start hour" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" v-model="merchant.businessInformation.weekdayEndHour" float-label="Weekday end hour" placeholder="Weekday end hour" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" v-model="merchant.businessInformation.weekendStartHour" float-label="Weekend start hour" placeholder="Weekend start hour" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" v-model="merchant.businessInformation.weekendEndHour" float-label="Weekend end hour" placeholder="Weekend end hour" />
                </div>
                <!-- <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input color="grey-9" type="number" v-model="merchant.businessInformation.weekdayStartHour" float-label="Business Income" placeholder="Business Income" />
                </div> -->
                <div class="col-md-6 col-sm-12 col-xs-12 col-xs-12">
                  <q-input color="grey-9" type="number" v-model="merchant.businessInformation.lastTurnoverYear" float-label="Last turnover year" placeholder="Last turnover year" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" type="number" v-model="merchant.businessInformation.lastTurnoverAmount" float-label="Turnover during last year" placeholder="Turnover during last year" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" type="number" v-model="merchant.businessInformation.expectedCardBusiness" float-label="Expected Card Business" placeholder="Expected Card Business" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" type="number" v-model="merchant.businessInformation.averageBillAmount" float-label="Average Bill Amount" placeholder="Average Bill Amount" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" 
                  @blur="$v.merchant.businessInformation.gstId.$touch"      
                  :error="$v.merchant.businessInformation.gstId.$error"
                  v-model="merchant.businessInformation.gstId" float-label="GST ID*" placeholder="GST ID*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" v-model="merchant.businessInformation.currentPosName" float-label="Name of the other POS Currentlly Used" placeholder="Name of the other POS Currentlly Used" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" type="number" v-model="merchant.businessInformation.debitCardMdr" float-label="Debit Card" placeholder="Debit Card" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" type="number" 
                  v-model="merchant.businessInformation.creditCardMdr" float-label="Credit Card" placeholder="Credit Card" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <!-- {{merchant.businessInformation.memberSince}} -->
                  <q-input
                  format="DD/MM/YYYY"
                  format-model="date"
                  @blur="$v.merchant.businessInformation.memberSince.$touch"      
                  :error="$v.merchant.businessInformation.memberSince.$error"
                  color="grey-9" minimal v-model="merchant.businessInformation.memberSince"  float-label="Member since*" placeholder="Member since*" />
                </div>
              </div>
              <q-stepper-navigation>
                <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('businessInformation')" label="Continue" />
                <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" @click="saveCurrentChanges()" />
                <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$refs.stepper.previous()" label="Back" />
              </q-stepper-navigation>
            </q-step>
            <q-step error-icon="warning" name="fifth" :error="paymentDetailsError" :order="5" title="Payment" subtitle="Details">
              <div class="row gutter-sm">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <p class="text-caption">Device Owned By</p>
                  <div class="group">
                    <q-radio 
                    @blur="$v.merchant.paymentDetails.deviceOwnedBy.$touch"      
                    :error="$v.merchant.paymentDetails.deviceOwnedBy.$error" 
                    v-for="(item,index) in deviceOwnedByOptions" :key="index" color="grey-9" v-model="merchant.paymentDetails.deviceOwnedBy" :val="item.value" :label="item.label" 
                    />
                  </div>
                </div>
                <div class="col-md-6 col-sm-12">
                  <q-input 
                  color="grey-9" type="number" 
                  @blur="$v.merchant.paymentDetails.installationFee.$touch"      
                    :error="$v.merchant.paymentDetails.installationFee.$error" 
                    v-model="merchant.paymentDetails.installationFee" float-label="Installation Fee*" placeholder="Installation Fee*" 
                  />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below" color="grey-9" 
                  @blur="$v.merchant.paymentDetails.terminalModeCode.$touch"      
                  :error="$v.merchant.paymentDetails.terminalModeCode.$error" 
                  v-model="merchant.paymentDetails.terminalModeCode" float-label="Terminal Model*" :options="terminalModelSet" />
                </div>
                <div class="col-md-6 col-sm-12">
                  <q-input color="grey-9" type="number" v-model="merchant.paymentDetails.numberOfTerminals" float-label="No of Terminals*" placeholder="No of Terminals*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                    <p class="text-caption">Cash @POS Enabled?</p>
                    <div class="group">
                      <q-radio 
                      @blur="$v.merchant.paymentDetails.cashAtPosEnabled.$touch"      
                      :error="$v.merchant.paymentDetails.cashAtPosEnabled.$error" 
                      v-for="(item,index) in cashAtPosEnabledOptions" :key="index" color="grey-9" v-model="merchant.paymentDetails.cashAtPosEnabled" :val="item.value" :label="item.label"
                      />
                    </div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9" v-model="merchant.paymentDetails.rentalPlanCode" float-label="Rental Plan*" :options="rentalPlanSet" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below*" color="grey-9" v-model="merchant.paymentDetails.rentalModeCode" float-label="Rental Mode*" :options="rentalModeOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                    <p class="text-caption">Rental Type</p>
                    <div class="group">
                      <q-radio 
                      @blur="$v.merchant.paymentDetails.rentalType.$touch"      
                      :error="$v.merchant.paymentDetails.rentalType.$error" 
                      v-for="(item,index) in rentalTypeOptions" :key="index" 
                      color="grey-9" v-model="merchant.paymentDetails.rentalType" :val="item.value" :label="item.label" />
                    </div>
                </div>

                <div v-if="merchant.paymentDetails.rentalType == 'R'" class="col-md-6 col-sm-12 col-xs-12">
                  <q-input @blur="$v.merchant.paymentDetails.gracePeriod.$touch"      
                      :error="$v.merchant.paymentDetails.gracePeriod.$error"  color="grey-9" type="number" v-model="merchant.paymentDetails.gracePeriod" float-label="Grace period*" placeholder="Grace period*" />
                </div>
                <div v-if="merchant.paymentDetails.rentalType == 'A'"  class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" type="number" 
                      @blur="$v.merchant.paymentDetails.advanceRentCollected.$touch"      
                      :error="$v.merchant.paymentDetails.advanceRentCollected.$error"  v-model="merchant.paymentDetails.advanceRentCollected" float-label="Advance Rent Collected*" placeholder="Advance Rent Collected*" />
                </div>
                <div v-if="merchant.paymentDetails.rentalType == 'A'"  class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" type="number" 
                   @blur="$v.merchant.paymentDetails.noOfMonthRentPaidInAdvance.$touch"      
                      :error="$v.merchant.paymentDetails.noOfMonthRentPaidInAdvance.$error" v-model="merchant.paymentDetails.noOfMonthRentPaidInAdvance" float-label="No. Of Month Rent Paid In Advance*" placeholder="No. Of Month Rent Paid In Advance*" />
                </div>
                <div v-if="merchant.paymentDetails.rentalType == 'A'"  class="col-md-6 col-sm-12 col-xs-12">
                  <p class="text-caption">Advanced Rent Mode</p>
                  <div class="group">
                    <q-radio 
                    @blur="$v.merchant.paymentDetails.advanceRentMode.$touch"      
                    :error="$v.merchant.paymentDetails.advanceRentMode.$error" 
                    v-for="(item,index) in advanceRentModeOptions" :key="index" 
                    color="grey-9" v-model="merchant.paymentDetails.advanceRentMode" :val="item.value" :label="item.label" />
                  </div>
                </div>

                <div class="col-md-6 col-sm-12">
                  <q-input color="grey-9" type="number" v-model="merchant.paymentDetails.devicePrice" float-label="Device Price" placeholder="Device Price" />
                </div>
                <div class="col-md-6 col-sm-12">
                  <q-input color="grey-9" type="number" v-model="merchant.paymentDetails.otherCharges" float-label="Other Charges" placeholder="Other Charges" />
                </div>
                <div class="col-md-6 col-sm-12">
                  <q-input color="grey-9" type="number" v-model="merchant.paymentDetails.totalAmountPaid" float-label="Total Amount Paid" placeholder="Total Amount Paid" />
                </div>
              </div>
              <q-stepper-navigation>
                <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('paymentDetails')" label="Continue" />
                <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" @click="saveCurrentChanges()" />
                <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$refs.stepper.previous()" label="Back" />
              </q-stepper-navigation>
            </q-step>
            <q-step error-icon="warning" name="sixth" :order="6" title="Discount" subtitle="Rate">
              <div class="row group items-center">
                  <div class="col-md-12">
                      <div class="row items-center">
                          <div class="col-3">
                              <div class="text-caption text-weight-medium">Domestic Debit Card below 2000</div>
                          </div>
                          <div class="col">
                              <div class="text-caption text-weight-medium q-py-sm" align="center">Merchant Disc Fee</div>
                              <div class="row group bg-green-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.domesticDebitUpTo2000.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" 
                                      @blur="$v.merchant.mdrPlan.domesticDebitUpTo2000.percentage.$touch"      
                                      :error="$v.merchant.mdrPlan.domesticDebitUpTo2000.percentage.$error" 
                                      v-model="merchant.mdrPlan.domesticDebitUpTo2000.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.domesticDebitUpTo2000.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                              <div class="text-caption text-weight-medium q-py-sm" align="center">Sharing Disc Fee</div>
                              <div class="row group bg-yellow-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.domesticDebitUpTo2000.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.domesticDebitUpTo2000.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.domesticDebitUpTo2000.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row items-center">
                          <div class="col-3">
                              <div class="text-caption text-weight-medium">Domestic Debit Card above 2000</div>
                          </div>
                          <div class="col">
                              <div class="row group bg-green-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.domesticDebitAbove2000.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" 
                                      @blur="$v.merchant.mdrPlan.domesticDebitAbove2000.percentage.$touch"      
                                      :error="$v.merchant.mdrPlan.domesticDebitAbove2000.percentage.$error" v-model="merchant.mdrPlan.domesticDebitAbove2000.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.domesticDebitAbove2000.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                              <div class="row group bg-yellow-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.domesticDebitAbove2000.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.domesticDebitAbove2000.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.domesticDebitAbove2000.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  
                      <div class="row items-center">
                          <div class="col-3">
                              <div class="text-caption text-weight-medium">Standard/Classic (1st Stab)</div>
                          </div>
                          <div class="col">
                              <div class="row group bg-green-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.standardOrClassic.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" 
                                      @blur="$v.merchant.mdrPlan.standardOrClassic.percentage.$touch"
                                      :error="$v.merchant.mdrPlan.standardOrClassic.percentage.$error" 
                                      v-model="merchant.mdrPlan.standardOrClassic.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.standardOrClassic.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                              <div class="row group bg-yellow-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.standardOrClassic.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.standardOrClassic.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.standardOrClassic.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row items-center">
                          <div class="col-3">
                              <div class="text-caption text-weight-medium">Premium/Platinum (2nd Stab)</div>
                          </div>
                          <div class="col">
                              <div class="row group bg-green-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.premiumOrPlatinum.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" 
                                      @blur="$v.merchant.mdrPlan.premiumOrPlatinum.percentage.$touch"
                                      :error="$v.merchant.mdrPlan.premiumOrPlatinum.percentage.$error" v-model="merchant.mdrPlan.premiumOrPlatinum.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.premiumOrPlatinum.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                              <div class="row group bg-yellow-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.premiumOrPlatinum.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.premiumOrPlatinum.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.premiumOrPlatinum.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row items-center">
                          <div class="col-3">
                              <div class="text-caption text-weight-medium">Super Premium/Signature (3rd Stab)</div>
                          </div>
                          <div class="col">
                              <div class="row group bg-green-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.superPremiumOrSignature.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" 
                                      @blur="$v.merchant.mdrPlan.superPremiumOrSignature.percentage.$touch"
                                      :error="$v.merchant.mdrPlan.superPremiumOrSignature.percentage.$error" 
                                      v-model="merchant.mdrPlan.superPremiumOrSignature.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.superPremiumOrSignature.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                              <div class="row group bg-yellow-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.superPremiumOrSignature.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.superPremiumOrSignature.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.superPremiumOrSignature.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row items-center">
                          <div class="col-3">
                              <div class="text-caption text-weight-medium">Commercial/Coporate 4th Stab</div>
                          </div>
                          <div class="col">
                              <div class="row group bg-green-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.commercialOrCorporate.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" 
                                      @blur="$v.merchant.mdrPlan.commercialOrCorporate.percentage.$touch"
                                      :error="$v.merchant.mdrPlan.commercialOrCorporate.percentage.$error" 
                                      v-model="merchant.mdrPlan.commercialOrCorporate.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.commercialOrCorporate.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                              <div class="row group bg-yellow-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.commercialOrCorporate.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.commercialOrCorporate.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.commercialOrCorporate.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row items-center">
                          <div class="col-3">
                              <div class="text-caption text-weight-medium">International Debit Card</div>
                          </div>
                          <div class="col">
                              <div class="row group bg-green-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.internationalDebitCard.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" 
                                      @blur="$v.merchant.mdrPlan.internationalDebitCard.percentage.$touch"
                                      :error="$v.merchant.mdrPlan.internationalDebitCard.percentage.$error" v-model="merchant.mdrPlan.internationalDebitCard.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.internationalDebitCard.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                              <div class="row group bg-yellow-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.internationalDebitCard.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.internationalDebitCard.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.internationalDebitCard.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row items-center">
                          <div class="col-3">
                              <div class="text-caption text-weight-medium">International Credit Card</div>
                          </div>
                          <div class="col">
                              <div class="row group bg-green-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.internationalCreditCard.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" 
                                      @blur="$v.merchant.mdrPlan.internationalCreditCard.percentage.$touch"
                                      :error="$v.merchant.mdrPlan.internationalCreditCard.percentage.$error" 
                                      v-model="merchant.mdrPlan.internationalCreditCard.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.internationalCreditCard.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                              <div class="row group bg-yellow-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.internationalCreditCard.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.internationalCreditCard.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.internationalCreditCard.minimum" placeholder="Max" />
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
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.onus.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" 
                                       @blur="$v.merchant.mdrPlan.onus.percentage.$touch"
                                      :error="$v.merchant.mdrPlan.onus.percentage.$error" 
                                      v-model="merchant.mdrPlan.onus.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.onus.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                              <div class="row group bg-yellow-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.onus.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.onus.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.onus.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row items-center">
                          <div class="col-3">
                              <div class="text-caption text-weight-medium">mVISA</div>
                          </div>
                          <div class="col">
                              <div class="row group bg-green-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.mVisa.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" 
                                      @blur="$v.merchant.mdrPlan.mVisa.percentage.$touch"
                                      :error="$v.merchant.mdrPlan.mVisa.percentage.$error" v-model="merchant.mdrPlan.mVisa.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.mVisa.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                              <div class="row group bg-yellow-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.mVisa.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.mVisa.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.mVisa.minimum" placeholder="Max" />
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
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.masterPass.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" 
                                      @blur="$v.merchant.mdrPlan.masterPass.percentage.$touch"
                                      :error="$v.merchant.mdrPlan.masterPass.percentage.$error"
                                      v-model="merchant.mdrPlan.masterPass.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.masterPass.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                              <div class="row group bg-yellow-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.masterPass.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.masterPass.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.masterPass.minimum" placeholder="Max" />
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
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.cashAtPos.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number"
                                      @blur="$v.merchant.mdrPlan.cashAtPos.percentage.$touch"
                                      :error="$v.merchant.mdrPlan.cashAtPos.percentage.$error"
                                       v-model="merchant.mdrPlan.cashAtPos.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.mdrPlan.cashAtPos.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
                              <div class="row group bg-yellow-2">
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.cashAtPos.fixed" placeholder="Fixed" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.cashAtPos.percentage" placeholder="%" />
                                  </div>
                                  <div class="col">
                                      <q-input color="grey-9" type="number" v-model="merchant.SharingDiscountFee.cashAtPos.minimum" placeholder="Max" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <q-stepper-navigation>
                <q-btn color="primary" class="q-ma-xs" icon="check" @click="$refs.stepper.next()" label="Continue" />
                <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" @click="saveCurrentChanges()" />
                <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$refs.stepper.previous()" label="Back" />
              </q-stepper-navigation>
              </q-step>
            
            <q-step error-icon="warning" name="seventh" :error="bankInformationError" :order="7" title="Bank & Collection" subtitle="Details">
              <div class="row q-mb-md gutter-sm items-center">
                <div class="col-md-12">
                  <div class="text-h6">Merchant Bank Details</div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" :error="$v.merchant.bankInformation.bankDetails.ifsc.$error" @blur="populateBankDetails"  v-model="merchant.bankInformation.bankDetails.ifsc" float-label="IFSC Code*" placeholder="Enter IFSC*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9"        @blur="$v.merchant.bankInformation.bankDetails.branchName.$touch"      
                  :error="$v.merchant.bankInformation.bankDetails.branchName.$error" v-model="merchant.bankInformation.bankDetails.branchName" float-label="Branch Name*" placeholder="Branch Name* " />
                </div>  
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below" color="grey-9"
                   v-model="merchant.bankInformation.bankDetails.feeType" float-label="Fee Type" :options="feeTypeOptions" />
                </div>
                <div v-if="merchant.bankInformation.bankDetails.feeType == 'N' || merchant.bankInformation.bankDetails.feeType == 'S'" class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" 
                    @blur="$v.merchant.bankInformation.bankDetails.settlementOrNeftFee.$touch"      
                    :error="$v.merchant.bankInformation.bankDetails.settlementOrNeftFee.$error" 
                    v-model="merchant.bankInformation.bankDetails.settlementOrNeftFee" float-label="NEFT/Settlement Fee Inclusive of Tax*" placeholder="NEFT/Settlement Fee Inclusive of Tax*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" 
                  @blur="$v.merchant.bankInformation.bankDetails.micr.$touch"      
                  :error="$v.merchant.bankInformation.bankDetails.micr.$error" 
                  v-model="merchant.bankInformation.bankDetails.micr" float-label="MICR*" placeholder="MICR*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" 
                    @blur="$v.merchant.bankInformation.bankDetails.bankName.$touch"      
                    :error="$v.merchant.bankInformation.bankDetails.bankName.$error" 
                    v-model="merchant.bankInformation.bankDetails.bankName" float-label="Bank Name*" placeholder="Bank Name*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below" color="grey-9" v-model="merchant.bankInformation.bankDetails.paymentMode" float-label="Payment mode" :options="paymnentModeOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" 
                  @blur="$v.merchant.bankInformation.bankDetails.bankCityName.$touch"      
                  :error="$v.merchant.bankInformation.bankDetails.bankCityName.$error" 
                  v-model="merchant.bankInformation.bankDetails.bankCityName" float-label="City (type min 3 characters)*" placeholder="Start typing ..*">
                    <q-autocomplete
                    separator
                    @search="residentCitySearch"
                    :debounce="500"
                    :min-characters="3"
                    @selected="bankCitySelected"
                    />
                  </q-input>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9" 
                    @blur="$v.merchant.bankInformation.bankDetails.bankStateName.$touch"      
                    :error="$v.merchant.bankInformation.bankDetails.bankStateName.$error" 
                    v-model="merchant.bankInformation.bankDetails.bankStateName" float-label="State (type min 3 characters)*" placeholder="Start typing ..*">
                    <q-autocomplete
                    separator
                    @search="residentStateSearch"
                    :debounce="500"
                    :min-characters="3"
                    @selected="bankStateSelected"
                    />
                  </q-input>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select placeholder="Choose from the below" color="grey-9" v-model="merchant.bankInformation.bankDetails.accountType" float-label="Account Type" :options="accountTypeOptions" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-input color="grey-9"
                  @blur="$v.merchant.bankInformation.bankDetails.accountNumber.$touch"      
                  :error="$v.merchant.bankInformation.bankDetails.accountNumber.$error" 
                  v-model="merchant.bankInformation.bankDetails.accountNumber" float-label="Bank A/c Number*" placeholder="Bank A/c Number*" />
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-checkbox color="grey-9" true-value="Y" false-value="N"
                  v-model="merchant.bankInformation.bankDetails.bankStatementAttached" label="Bank Statement Attached" />
                  <q-checkbox color="grey-9" true-value="Y" false-value="N" v-model="merchant.bankInformation.bankDetails.cancelChequeAttached" label="Cancelled Cheque Lead Attached" />
                </div>
              </div>
              <div class="row gutter-sm items-center">
                <div class="col-md-12">
                  <div class="text-h6">Payment Collection Details</div>
                </div>
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-4 col-sm-12 col-xs-12">
                      <q-input color="grey-9" v-model="merchant.bankInformation.collectionDetails.swipeAmount" float-label="Swipe Amount*" placeholder="Swipe Amount*" />
                    </div>
                    <div class="col-md-4 col-sm-12">
                      <q-input
                      format="DD/MM/YYYY"
                      format-model="date"
                      color="grey-9" minimal 
                      v-model="merchant.bankInformation.collectionDetails.collectedDate"  float-label="Swipe Date*" placeholder="Swipe Date*" />
                    </div>
                    <div class="col-md-4 col-sm-12 col-xs-12">
                      <q-input color="grey-9" v-model="merchant.bankInformation.collectionDetails.swipeTerminal" float-label="Swiped on the terminal of*" placeholder="Swiped on the terminal of*" />
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div>OR</div>
                </div>
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-3 col-sm-12 col-xs-12">
                      <q-input color="grey-9" v-model="merchant.bankInformation.collectionDetails.chequeAmount" float-label="Cheque Amount*" placeholder="Cheque Amount*" />
                    </div>
                    <div class="col-md-3 col-sm-12">
                      <q-input
                      format="DD/MM/YYYY"
                      format-model="date"
                      color="grey-9" minimal v-model="merchant.bankInformation.collectionDetails.chequeDate"  float-label="Cheque Date*" placeholder="Cheque Date*" />
                    </div>
                    <div class="col-md-3 col-sm-12 col-xs-12">
                      <q-input
                      format="DD/MM/YYYY"
                      format-model="date"
                      color="grey-9" minimal v-model="merchant.bankInformation.collectionDetails.chequeDepositedDate"  float-label="Cheque Deposited Date*" placeholder="Cheque Deposited Date*" />
                    </div>
                    <div class="col-md-3 col-sm-12 col-xs-12">
                      <q-input color="grey-9" v-model="merchant.bankInformation.collectionDetails.chequeNumber" float-label="Cheque/UTR No*" placeholder="Cheque/UTR No*" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-select clearable placeholder="Choose from the below" color="grey-9" v-model="merchant.bankInformation.collectionDetails.acquirerBank" float-label="Bank Name" :options="bankListSet" />
                </div>
              </div>
              <q-stepper-navigation>
                <q-btn color="primary" class="q-ma-xs" icon="check" @click="finalFormSubmit()" label="Submit" />
                <!-- <q-btn color="primary" class="q-ma-xs" icon="check" @click="$refs.stepper.next()" label="Continue" /> -->
                <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" @click="saveCurrentChanges()" />
                <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$refs.stepper.previous()" label="Back" />
              </q-stepper-navigation>
            </q-step>
        </q-stepper>
      </div>
    </div>
  </div>
</template>

<script>

import {
  required,
  requiredIf,
  alphaNum,
  integer,
  minLength,
  maxLength,
  email,
  maxValue,
  minValue
} from "@vuelidate/validators";
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";
import { uid } from "quasar";
import viewLeadDocumentsDataEntryComponent from "./viewLeadDocumentsDataEntryComponent.vue";
export default {
  name: "leadDataEntry",
  components: {
    viewLeadDocumentsDataEntryComponent
  },
  props: ["propLeadDeatils"],
  data() {
    return {
      showPartnerstab: false,

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
          value: "ND"
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
          value: "GM"
        },
        {
          label: "Merchant Outlet",
          value: "MO"
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
      //end >> Actual dropdown options values

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
          leadFrom: "IOB",
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
          gstId: "",
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
          rentalMode: "S",
          rentalType: "A",
          advanceRentCollected: "",
          advanceRentMode: "NEFT",
          noOfMonthRentPaidInAdvance: "",
          gracePeriod: "",
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
    ...mapGetters("mars_dataSubmit", ["marsSavedDataFromInternal"]),
    //Validation functions
    // T => Transaction value model
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
    getPartnersVisiblity() {
      return this.merchant.companyInformation.constitution == "PL"
        ;
    },
    // R=> rental type /= Rental
    getRentalTypeVisibilityForRental() {
      return this.merchant.paymentDetails.rentalType == "R" ;
    },
    // A=> rental type /= Advanced
    getRentalTypeVisibilityForAdvanced() {
      return this.merchant.paymentDetails.rentalType == "A" ;
    },
    // A=> rental type /= Advanced
    getfeeTypeForSettlementVisibility() {
      return this.merchant.paymentDetails.feeType == "N" ||
        this.merchant.paymentDetails.feeType == "S"
        ;
    },
    showOnlyIfSharingModelIsEnabled() {
      // N => No sharing
      return this.merchant.salesInformation.sharingModelCode != "N"
        ;
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
          minValue: minValue(0)
        },
        loanDisbursementPercentage: {
          required: requiredIf(function() {
            return this.getTransctionValueModel === true;
          }),
          maxValue: maxValue(100)
        },
        loanDisbursementAmount: {
          required: requiredIf(function() {
            return this.getTransctionValueModel === true;
          }),
          minValue: minValue(0)
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
          integer,
          minValue: minValue(0)
        },
        rentFixed: {
          required: requiredIf(function() {
            return this.getCashAtPos === true;
          }),
          integer,
          minValue: minValue(0)
        }
      },
      companyInformation: {
        legalName: {
          required
        },
        dbaName: {
          required
        },
        registeredAddress: {
          required
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

        mccname: {
          required
        },
        mcc: {
          required
        },
        residentialAddress: {
          required
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
        contactName: {
          required
        },
        contactMobile: {
          required,
          minLength: minLength(10),
          maxLength: minLength(10)
        },
        contactPhone: {
          required,
          minLength: minLength(12),
          maxLength: minLength(12)
        },
        contactEmail: {
          required,
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
          required,
          alphaNum
        },
        memberSince: {
          required
        }
      },
      paymentDetails: {
        installationFee: {
          required,
          minValue: minValue(1)
        },
        terminalModeCode: {
          required
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
          minValue: minValue(0)
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
          minValue: minValue(0)
        },
        gracePeriod: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForRental === true;
          }),
          minValue: minValue(0)
        }
      },
      bankInformation: {
        bankDetails: {
          ifsc: {
            required,
            alphaNum
          },
          micr: {
            required,
            alphaNum
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
            integer
          },
          accountNumber: {
            required,
            integer
          },
          bankStateName: {
            required
          },
          bankStateRefCode: {
            required,
            integer
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
        }
      },
      mdrPlan: {
        domesticDebitUpTo2000: {
          fixed: {
            minValue: minValue(0),
            required
          },
          percentage: {
            required,
            maxValue: maxValue(100)
          },
          minimum: {
            minValue: minValue(0),
            required
          }
        },
        domesticDebitAbove2000: {
          fixed: {
            minValue: minValue(0),
            required
          },
          percentage: {
            maxValue: maxValue(100),
            required
          },
          minimum: {
            minValue: minValue(0),
            required
          }
        },
        standardOrClassic: {
          fixed: {
            minValue: minValue(0),
            required
          },
          percentage: {
            maxValue: maxValue(100),
            required
          },
          minimum: {
            minValue: minValue(0),
            required
          }
        },
        premiumOrPlatinum: {
          fixed: {
            minValue: minValue(0),
            required
          },
          percentage: {
            maxValue: maxValue(100),
            required
          },
          minimum: {
            minValue: minValue(0),
            required
          }
        },
        superPremiumOrSignature: {
          fixed: {
            minValue: minValue(0),
            required
          },
          percentage: {
            maxValue: maxValue(100),
            required
          },
          minimum: {
            minValue: minValue(0),
            required
          }
        },
        commercialOrCorporate: {
          fixed: {
            minValue: minValue(0),
            required
          },
          percentage: {
            maxValue: maxValue(100),
            required
          },
          minimum: {
            minValue: minValue(0),
            required
          }
        },
        internationalDebitCard: {
          fixed: {
            minValue: minValue(0),
            required
          },
          percentage: {
            maxValue: maxValue(100),
            required
          },
          minimum: {
            minValue: minValue(0),
            required
          }
        },
        internationalCreditCard: {
          fixed: {
            minValue: minValue(0),
            required
          },
          percentage: {
            maxValue: maxValue(100),
            required
          },
          minimum: {
            minValue: minValue(0),
            required
          }
        },
        onus: {
          fixed: {
            minValue: minValue(0),
            required
          },
          percentage: {
            maxValue: maxValue(100),
            required
          },
          minimum: {
            minValue: minValue(0),
            required
          }
        },
        mVisa: {
          fixed: {
            minValue: minValue(0),
            required
          },
          percentage: {
            maxValue: maxValue(100),
            required
          },
          minimum: {
            minValue: minValue(0),
            required
          }
        },
        masterPass: {
          fixed: {
            minValue: minValue(0),
            required
          },
          percentage: {
            maxValue: maxValue(100),
            required
          },
          minimum: {
            minValue: minValue(0),
            required
          }
        },
        cashAtPos: {
          fixed: {
            minValue: minValue(0),
            required
          },
          percentage: {
            maxValue: maxValue(100),
            required
          },
          minimum: {
            minValue: minValue(0),
            required
          }
        }
      },
      SharingDiscountFee: {
        domesticDebitUpTo2000: {
          fixed: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            }),
            maxValue: maxValue(100)
          },
          minimum: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        domesticDebitAbove2000: {
          fixed: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            maxValue: maxValue(100),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        standardOrClassic: {
          fixed: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            maxValue: maxValue(100),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        premiumOrPlatinum: {
          fixed: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            maxValue: maxValue(100),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        superPremiumOrSignature: {
          fixed: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            maxValue: maxValue(100),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        commercialOrCorporate: {
          fixed: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            maxValue: maxValue(100),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        internationalDebitCard: {
          fixed: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            maxValue: maxValue(100),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        internationalCreditCard: {
          fixed: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            maxValue: maxValue(100),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        onus: {
          fixed: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            maxValue: maxValue(100),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        mVisa: {
          fixed: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            maxValue: maxValue(100),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        masterPass: {
          fixed: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            maxValue: maxValue(100),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          }
        },
        cashAtPos: {
          fixed: {
            minValue: minValue(0),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          percentage: {
            maxValue: maxValue(100),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled === true;
            })
          },
          minimum: {
            minValue: minValue(0),
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
            required
          },
          address: {
            required
          },
          pan: {
            required: true
          },
          pin: { required, minLength: minLength(6), maxLength: maxLength(7) },
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
            minLength: minLength(10),
            maxLength: minLength(10)
          },
          contactEmail: {
            required,
            email
          }
        }
      }
    }
  },

  created() {
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
          pin: 600072,
          cityRefCode: 1,
          cityRefLabel: "",
          stateRefCode: 1,
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
    this.merchant.mdrPlan.domesticDebitUpTo2000.percentage = this.getShortLeadInfo.debitLessthanAmount;
    this.merchant.mdrPlan.domesticDebitAbove2000.percentage = this.getShortLeadInfo.debitGreaterthanAmount;
    this.merchant.mdrPlan.standardOrClassic.percentage = this.getShortLeadInfo.stdCC;
    this.merchant.mdrPlan.premiumOrPlatinum.percentage = this.getShortLeadInfo.premiumCC;
    this.merchant.mdrPlan.superPremiumOrSignature.percentage = this.getShortLeadInfo.superPremiumlCC;
    this.merchant.mdrPlan.commercialOrCorporate.percentage = this.getShortLeadInfo.corpCC;
    this.merchant.mdrPlan.internationalCreditCard.percentage = this.getShortLeadInfo.intlCC;
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
    togglePartnersTab(value) {
      if (value == "PL") {
        this.showPartnerstab = true;
      } else {
        this.showPartnerstab = false;
      }
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
      this.$v.viewBinding.partnersArr.$each[index].cityRefCode.$model =
        item.value;
      this.$v.viewBinding.partnersArr.$each[index].cityRefLabel.$model =
        item.label;
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
      this.viewBinding.partnersArr.splice(index, 1);
    },
    validatebeforeNavigate(step) {
      if (step == "salesInformation") {
        this.$v.merchant.salesInformation.$touch();
        if (this.$v.merchant.salesInformation.$error) {
          this.$q.notify("Please review fields again.");
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
            this.merchant.mdrPlan.code = 44;
          } else {
            this.merchant.mdrPlan.code = 45;
          }
          this.salesInformationError = false;
          this.$refs.stepper.next();
        }
      } else if (step == "companyInformation") {
        this.$v.merchant.companyInformation.$touch();
        if (this.$v.merchant.companyInformation.$error) {
          this.$q.notify("Please review fields again.");
        } else {
          this.companyInformationError = false;
          this.$refs.stepper.next();
        }
      } else if (step == "partners") {
        this.$v.viewBinding.partnersArr.$touch();
        if (this.$v.viewBinding.partnersArr.$error) {
          this.$q.notify("Please review fields again.");
        } else {
          this.partnerInformationError = false;
          this.$refs.stepper.next();
        }
      } else if (step == "businessInformation") {
        this.$v.merchant.businessInformation.$touch();
        if (this.$v.merchant.businessInformation.$error) {
          this.$q.notify("Please review fields again.");
        } else {
          this.businessInformationError = false;
          this.$refs.stepper.next();
        }
      } else if (step == "paymentDetails") {
        this.$v.merchant.paymentDetails.$touch();
        if (this.$v.merchant.paymentDetails.$error) {
          this.$q.notify("Please review fields again.");
        } else {
          this.paymentDetailsError = false;
          this.$refs.stepper.next();
        }
      } else {
      }
    },

    fetchAllDropdownValuesFromMARSapi(institutionCode) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9"
      });

      let self = this;
      /* API call to fetch regions */
      self
        .REGION_FROM_MARS(institutionCode)
        .then(() => {
          let regions = [];
          self.regionsFromMars.items.map(oo => {
            regions.push({ label: oo.name, value: oo.code });
          });
          self.regionOptions = regions;
        })
        .then(() => {
          /* API call to fetch sharing partner */
          self.SHARING_PARTNER_FROM_MARS(institutionCode).then(response => {
            let sharingPartner = [];
            self.sharingPartnerFromMars.items.map(oo => {
              sharingPartner.push({ label: oo.name, value: oo.code });
            });
            self.sharingPartnerOptions = sharingPartner;
          });
        })
        .then(() => {
          /* API call to fetch sharing partner */
          self.LEAD_FROM_FROM_MARS(institutionCode).then(response => {
            let leadFrom = [];
            self.leadFromInfoFromMars.items.map(oo => {
              leadFrom.push({ label: oo.name, value: oo.name });
            });
            self.leadFromOptions = leadFrom;
          });
        })
        .then(() => {
          /* API call to fetch sales person */
          self.SALES_PERSON_FROM_MARS(institutionCode).then(response => {
            let salesPerson = [];
            self.salesPersonFromMars.items.map(oo => {
              salesPerson.push({ label: oo.name, value: oo.code });
            });
            self.salesPersonOptions = salesPerson;
          });
        })
        .then(() => {
          /* API call to fetch city */
          self.CITY_FROM_MARS().then(response => {
            let city = [];
            self.cityFromMars.items.map(oo => {
              city.push({ label: oo.name, value: oo.code });
            });
            self.cityOptions = city;
          });
        })
        .then(() => {
          /* API call to fetch state */
          self.STATE_FROM_MARS().then(response => {
            let stateArr = [];
            self.stateFromMars.items.map(oo => {
              stateArr.push({ label: oo.name, value: oo.code });
            });
            self.stateOptions = stateArr;
          });
        })
        .then(() => {
          /* API call to fetch state */
          self.MCC_FROM_MARS().then(response => {
            let mccSubArr = [];
            self.mccFromMars.items.map(oo => {
              mccSubArr.push({
                label: oo.code + "-" + oo.name,
                value: oo.code
              });
            });
            self.mccSearchSet = mccSubArr;
          });
        })
        .then(() => {
          /* API call to fetch device model */
          self.DEVICE_MODEL_FROM_MARS(institutionCode).then(response => {
            let terminalModelArr = [];
            self.deviceModelFromMars.items.map(oo => {
              terminalModelArr.push({ label: oo.name, value: oo.code });
            });
            self.terminalModelSet = terminalModelArr;
          });
        })
        .then(() => {
          /* API call to fetch rental plan */
          self.RENTAL_PLAN_FROM_MARS(institutionCode).then(response => {
            let rentalPlan = [];
            self.rentalPlanFromMars.items.map(oo => {
              rentalPlan.push({ label: oo.name, value: oo.code });
            });
            self.rentalPlanSet = rentalPlan;
          });
        })
        .then(() => {
          /* API call to fetch rental plan */
          self.BANK_LIST_FROM_MARS(institutionCode).then(response => {
            let bankList = [];
            self.bankListFromMars.bankNames.map(oo => {
              bankList.push({ label: oo, value: oo });
            });
            self.bankListSet = bankList;
          });
        })
        .then(() => {
          if (
            this.propLeadDeatils.marsFormSubmitAction == 1 ||
            this.propLeadDeatils.marsFormSubmitAction == 2
          ) {
            this.FETCH_SAVED_DATA_FROM_OWN_DB({
              leadId: this.$route.params.id
            }).then(() => {
              this.merchant.salesInformation = this.marsSavedDataFromInternal.salesInformation;
              this.merchant.companyInformation = this.marsSavedDataFromInternal.companyInformation;
              this.merchant.businessInformation = this.marsSavedDataFromInternal.businessInformation;
              this.merchant.partnerInformation = this.marsSavedDataFromInternal.partnerInformation;
              this.merchant.paymentDetails = this.marsSavedDataFromInternal.paymentDetails;
              this.merchant.bankInformation = this.marsSavedDataFromInternal.bankInformation;
              this.merchant.mdrPlan = this.marsSavedDataFromInternal.mdrPlan;
              if (this.marsSavedDataFromInternal.SharingDiscountFee != null) {
                this.merchant.SharingDiscountFee = this.marsSavedDataFromInternal.sharingDiscountFee;
              }
              if (this.merchant.companyInformation.constitution == "PL") {
                this.showPartnerstab = true;
              } else {
                this.showPartnerstab = false;
              }
              

              /* Populating values from FOS */
              this.merchant.salesInformation.applicationNumber = this.propLeadDetails.id;
              this.merchant.salesInformation.dbaName = this.propLeadDetails.leadName;
              this.merchant.companyInformation.contact = this.propLeadDetails.leadName;
              /* Populating values from FOS */


            });
          } else {
            return true;
          }
        })
        .then(() => {
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    saveCurrentChanges() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Saving data .."
      });
      this.merchant["leadId"] = this.$route.params.id;
      this.merchant["partnerInformation"] = this.viewBinding.partnersArr;
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

        if (self.merchant.companyInformation.constitution == "PL") {
          finalRequest.merchant.partnerInformation =
            self.viewBinding.partnersArr;
        } else {
          finalRequest.merchant.partnerInformation = [];
        }

        /* API call to fetch regions */
        self
          .MARS_DATA_SUBMIT_INTERNAL(finalRequest)
          .then(response => {
            delete finalRequest.merchant.leadId;
            delete finalRequest.action;
            self.$q.loading.show({
              delay: 0, // ms
              spinnerColor: "purple-9",
              message: "Saved.. Sending data to mars"
            });
            finalRequest.merchant.salesInformation.applicationDate =
              finalRequest.merchant.salesInformation.applicationDate == ""
                ? "00/00/0000"
                : this.commonDateFormat(
                    finalRequest.merchant.salesInformation.applicationDate
                  );
            finalRequest.merchant.salesInformation.aggreementDate =
              finalRequest.merchant.salesInformation.aggreementDate == ""
                ? "00/00/0000"
                : this.commonDateFormat(
                    finalRequest.merchant.salesInformation.aggreementDate
                  );
            finalRequest.merchant.salesInformation.loanDisbursementDate =
              finalRequest.merchant.salesInformation.loanDisbursementDate == ""
                ? "00/00/0000"
                : this.commonDateFormat(
                    finalRequest.merchant.salesInformation.loanDisbursementDate
                  );
            finalRequest.merchant.salesInformation.tenureStartDate =
              finalRequest.merchant.salesInformation.tenureStartDate == ""
                ? "00/00/0000"
                : this.commonDateFormat(
                    finalRequest.merchant.salesInformation.tenureStartDate
                  );
            finalRequest.merchant.companyInformation.establishYear =
              finalRequest.merchant.companyInformation.establishYear == ""
                ? "00/00/0000"
                : this.commonDateFormat(
                    finalRequest.merchant.companyInformation.establishYear
                  );
            finalRequest.merchant.bankInformation.collectionDetails.chequeDepositedDate =
              finalRequest.merchant.bankInformation.collectionDetails
                .chequeDepositedDate == ""
                ? "00/00/0000"
                : this.commonDateFormat(
                    finalRequest.merchant.bankInformation.collectionDetails
                      .chequeDepositedDate
                  );
            finalRequest.merchant.bankInformation.collectionDetails.collectedDate =
              finalRequest.merchant.bankInformation.collectionDetails
                .collectedDate == ""
                ? "00/00/0000"
                : this.commonDateFormat(
                    finalRequest.merchant.bankInformation.collectionDetails
                      .collectedDate
                  );

            finalRequest.merchant.bankInformation.collectionDetails.chequeDate =
              finalRequest.merchant.bankInformation.collectionDetails
                .chequeDate == ""
                ? "00/00/0000"
                : this.commonDateFormat(
                    finalRequest.merchant.bankInformation.collectionDetails
                      .chequeDate
                  );
            finalRequest.merchant.businessInformation.memberSince =
              finalRequest.merchant.businessInformation.memberSince == ""
                ? "00/00/0000"
                : this.commonDateFormat(
                    finalRequest.merchant.businessInformation.memberSince
                  );
            self
              .MARS_DATA_SUBMIT_EXTERNAL(finalRequest)
              .then(response => {
                self.$q.loading.show({
                  delay: 0, // ms
                  spinnerColor: "purple-9",
                  message: "Great.. All set to go"
                });
                self
                  .MARS_DATA_EXTERNAL_SUBMIT_RESPONSE({
                    request: response.body,
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
                let self = this;
                self.fetchAllDropdownValuesFromMARSapi(
                  self.merchant.salesInformation.institutionCode
                );
                let sampleErrArr = [];
                _.map(error.data.errorDetails, function(oo) {
                  sampleErrArr.push(oo.field.split("/")[1]);
                });
                if (sampleErrArr.includes("salesInformation")) {
                  this.salesInformationError = true;
                } else if (sampleErrArr.includes("companyInformation")) {
                  this.companyInformationError = true;
                } else if (sampleErrArr.includes("businessInformation")) {
                  this.businessInformationError = true;
                } else if (sampleErrArr.includes("partnerInformation")) {
                  this.partnerInformationError = true;
                } else if (sampleErrArr.includes("paymentDetails")) {
                  this.paymentDetailsError = true;
                } else if (sampleErrArr.includes("bankInformation")) {
                  this.bankInformationError = true;
                } else {
                }
                self.$q.notify({
                  color: "negative",
                  position: "bottom-left",
                  message: "Some mandatory fields are empty",
                  icon: "info"
                });
              });
            self.$q.loading.hide();
          })
          .catch(() => {
            self.$q.loading.hide();
          });
      }
    },

    //Common function for data format
    commonDateFormat(dataString) {
      if (dataString == "NaN/NaN/0NaN") {
        return "";
      } else {
        return date.formatDate(dataString, "DD/MM/YYYY");
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
