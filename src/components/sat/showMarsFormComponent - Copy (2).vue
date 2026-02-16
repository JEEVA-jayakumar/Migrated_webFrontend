<template>
    <div>
        <!-- Documents -->
        <div class="row">
            <!-- Documents proof -->
            <div class="col-md-4 q-pa-xs" v-if="showDocumentPreview">
                <viewLeadDocumentsDataEntryComponent :propLeadDocumentInformation="propLeadDeatils.leadDocuments" :propGetShortInfo="propLeadDeatils" />
            </div>
            <!-- Document related form -->
            <div class="col-md-8 q-pa-xs">
                <q-stepper color="purple-9" ref="stepper" contractable text alternative-labels>
                    <q-step default name="first" title="Sales" subtitle="Info">
                        <div class="row gutter-sm">
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-select 
                            @blur="$v.merchant.salesInformation.institutionCode.$touch"      
                            :error="$v.merchant.salesInformation.institutionCode.$error" 
                            placeholder="Choose from the below" color="grey-9" v-model="merchant.salesInformation.institutionCode" float-label="Institution Code" :options="institutionCodeOptions" @input="fetchAllDropdownValuesFromMARSapi"/>
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-select 
                            @blur="$v.merchant.salesInformation.applicationType.$touch"      
                            :error="$v.merchant.salesInformation.applicationType.$error" 
                            placeholder="Choose from the below" color="grey-9" v-model="merchant.salesInformation.applicationType" float-label="Application Type" :options="applicationTypeOptions" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.salesInformation.applicationNumber.$touch"      
                            :error="$v.merchant.salesInformation.applicationNumber.$error" 
                            color="grey-9" v-model="merchant.salesInformation.applicationNumber"  float-label="Application Number" placeholder="Application Number" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input
                            @blur="$v.merchant.salesInformation.applicationDate.$touch"      
                            :error="$v.merchant.salesInformation.applicationDate.$error"
                            color="grey-9" minimal v-model="merchant.salesInformation.applicationDate" :default-value	="new Date()" type="date" float-label="Application Date" placeholder="Application Date" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input
                            color="grey-9" minimal v-model="merchant.salesInformation.aggreementDate" :default-value	="new Date()" type="date" float-label="Application Date" placeholder="Application Date" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-select 
                            @blur="$v.merchant.salesInformation.merchantType.$touch"      
                            :error="$v.merchant.salesInformation.merchantType.$error"
                            placeholder="Choose from the below" color="grey-9" v-model="merchant.salesInformation.merchantType" float-label="Merchant Type" :options="merchantTypeOptions" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-select 
                            placeholder="Choose from the below" color="grey-9" v-model="merchant.salesInformation.salesPersonCode" float-label="Sales Person" :options="salesPersonOptions" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-select placeholder="Choose from the below" color="grey-9" v-model="merchant.salesInformation.region" float-label="Region" :options="regionOptions" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-select placeholder="Choose from the below" color="grey-9" v-model="merchant.salesInformation.leadFrom" float-label="Lead From" :options="leadFromOptions" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <p class="text-caption">Subvention Type</p>
                            <div v-for="(item,index) in viewBinding.subventionType" :key="index" >
                                <q-checkbox color="grey-9" v-model="merchant.salesInformation.subventionType" :label="item.label" :val="item.value" />
                            </div>
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <p class="text-caption">Sharing Model</p>
                            <div v-for="(item,index) in viewBinding.sharingModelCode" :key="index" >
                                <q-radio color="grey-9" v-model="merchant.salesInformation.sharingModelCode" :val="item.value" :label="item.label" />
                            </div>
                          </div>
                        </div>
                        <!-- T => Transaction value model -->
                        <div v-if="merchant.salesInformation.sharingModelCode == 'T'"
                        class="row gutter-sm q-my-xs">
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-select 
                            @blur="$v.merchant.salesInformation.sharingPartnerCode.$touch"      
                            :error="$v.merchant.salesInformation.sharingPartnerCode.$error"
                            placeholder="Choose from the below" color="grey-9" v-model="merchant.salesInformation.sharingPartnerCode" float-label="Sharing partner" :options="sharingPartnerOptions" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.salesInformation.dailyFixedAmount.$touch"      
                            :error="$v.merchant.salesInformation.dailyFixedAmount.$error"
                            color="grey-9" v-model="merchant.salesInformation.dailyFixedAmount"  float-label="Daily fixed amount" type="number" placeholder="Daily fixed amount" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.salesInformation.loanDisbursementPercentage.$touch"      
                            :error="$v.merchant.salesInformation.loanDisbursementPercentage.$error"
                            color="grey-9" v-model="merchant.salesInformation.loanDisbursementPercentage"  float-label="Percentage" type="number" placeholder="Percentage" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                              <q-input
                              @blur="$v.merchant.salesInformation.loanDisbursementAmount.$touch"      
                              :error="$v.merchant.salesInformation.loanDisbursementAmount.$error"
                                color="grey-9" v-model="merchant.salesInformation.loanDisbursementAmount"  float-label="Loan disbursement value" type="number" placeholder="Loan disbursement value" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input
                            @blur="$v.merchant.salesInformation.loanDisbursementDate.$touch"      
                            :error="$v.merchant.salesInformation.loanDisbursementDate.$error"
                            color="grey-9" minimal v-model="merchant.salesInformation.loanDisbursementDate" :default-value	="new Date()" type="date" float-label="Disbursement Date" placeholder="Disbursement Date" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.salesInformation.tenureMonth.$touch"      
                            :error="$v.merchant.salesInformation.tenureMonth.$error"
                            color="grey-9" v-model="merchant.salesInformation.tenureMonth"  float-label="Tenure (in months)" type="number" placeholder="Tenure (in months)" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.salesInformation.tenureDay.$touch"      
                            :error="$v.merchant.salesInformation.tenureDay.$error"
                            color="grey-9" v-model="merchant.salesInformation.tenureDay"  float-label="Tenure (in days)" type="number" placeholder="Tenure (in days)" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input
                            @blur="$v.merchant.salesInformation.tenureStartDate.$touch"      
                            :error="$v.merchant.salesInformation.tenureStartDate.$error"
                            color="grey-9" minimal v-model="merchant.salesInformation.tenureStartDate" :default-value	="new Date()" type="date" float-label="Start Date" placeholder="Tenure Start Date" />
                          </div>
                        </div>
                        <!-- M => MDR/cash@pos/rent -->
                        <div v-if="merchant.salesInformation.sharingModelCode == 'M'"
                        class="row gutter-sm q-my-xs">
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-select
                            @blur="$v.merchant.salesInformation.sharingPartnerCode.$touch"      
                            :error="$v.merchant.salesInformation.sharingPartnerCode.$error"
                            placeholder="Choose from the below" color="grey-9" v-model="merchant.salesInformation.sharingPartnerCode" float-label="Sharing partner" :options="sharingPartnerOptions" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.salesInformation.rentPercentage.$touch"      
                            :error="$v.merchant.salesInformation.rentPercentage.$error"
                            color="grey-9" v-model="merchant.salesInformation.rentPercentage"  float-label="Rent %" type="number" placeholder="Rent %" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.salesInformation.rentFixed.$touch"      
                            :error="$v.merchant.salesInformation.rentFixed.$error"
                            color="grey-9" v-model="merchant.salesInformation.rentFixed"  float-label="Rent fixed" type="number" placeholder="Rent fixed" />
                          </div>
                        </div>
                        <!-- Navigation for this step at the end of QStep-->
                        <q-stepper-navigation>
                          <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('salesInformation')" label="Continue" />
                          <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" />
                        </q-stepper-navigation>
                    </q-step>
                    <q-step name="second" title="Details">
                        <div class="row gutter-sm">
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.legalName.$touch"      
                            :error="$v.merchant.companyInformation.legalName.$error"
                            color="grey-9" v-model="merchant.companyInformation.legalName" float-label="Legal Name" placeholder="Legal Name" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.dbaName.$touch"      
                            :error="$v.merchant.companyInformation.dbaName.$error" 
                            color="grey-9" v-model="merchant.companyInformation.dbaName" float-label="DBA Name" placeholder="DBA Name" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.registeredAddress.$touch"      
                            :error="$v.merchant.companyInformation.registeredAddress.$error"
                            color="grey-9" v-model="merchant.companyInformation.registeredAddress" float-label="Registered Address" placeholder="Registered Address" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.registeredCityName.$touch"      
                            :error="$v.merchant.companyInformation.registeredCityName.$error"
                            color="grey-9" v-model="merchant.companyInformation.registeredCityName" float-label="Registered city" placeholder="Registered city">
                                <q-autocomplete
                                @search="residentCitySearch"
                                :debounce="500"
                                :min-characters="1"
                                @selected="registeredCitySelected"
                                />
                            </q-input>
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.registeredStateName.$touch"      
                            :error="$v.merchant.companyInformation.registeredStateName.$error"
                            color="grey-9" v-model="merchant.companyInformation.registeredStateName" float-label="Registered state" placeholder="Registered state">
                                <q-autocomplete
                                @search="residentStateSearch"
                                :debounce="500"
                                :min-characters="1"
                                @selected="registeredStateSelected"
                                />
                            </q-input>
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.registeredPin.$touch"      
                            :error="$v.merchant.companyInformation.registeredPin.$error"
                            color="grey-9" type="number" v-model="merchant.companyInformation.registeredPin" float-label="PIN" placeholder="PIN" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-select 
                            @blur="$v.merchant.companyInformation.constitution.$touch"      
                            :error="$v.merchant.companyInformation.constitution.$error"
                            placeholder="Choose from the below" color="grey-9" v-model="merchant.companyInformation.constitution" float-label="Type of business entity" :options="constitutionOptions" />
                          </div>
                          <!-- <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input color="grey-9" v-model="merchant.companyInformation.constitutionDescription" float-label="Constitution description" placeholder="Constitution description" />
                          </div> -->
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input color="grey-9" minimal v-model="merchant.companyInformation.establishYear" :default-value	="new Date()" type="date" float-label="Year of Establishment" placeholder="Year of Establishment" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input color="grey-9" v-model="merchant.companyInformation.registerNumber" float-label="Establish Number" placeholder="Establish Number" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input color="grey-9" v-model="merchant.companyInformation.tin" float-label="TIN" placeholder="TIN" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input color="grey-9" v-model="merchant.companyInformation.pan" float-label="Company PAN" placeholder="Company PAN" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input color="grey-9" v-model="merchant.companyInformation.tan" float-label="TAN" placeholder="TAN" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input color="grey-9" v-model="merchant.companyInformation.businessNature" float-label="Nature of Business" placeholder="Nature of Business" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-select placeholder="Choose from the below" color="grey-9" v-model="merchant.companyInformation.businessType" float-label="Type of Business" :options="businessTypeOptions" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.mccname.$touch"      
                            :error="$v.merchant.companyInformation.mccname.$error"
                            color="amber" v-model="merchant.companyInformation.mccname" float-label="MCC" placeholder="MCC">
                                <q-autocomplete
                                @search="mccSearch"
                                :debounce="500"
                                :min-characters="1"
                                @selected="mccSelected"
                                />
                            </q-input>
                          </div>
                          <!-- <div class="col-md-6 col-sm-12 col-xs-12">
                              <q-input color="grey-9" type="number" v-model="merchant.companyInformation.tcc" float-label="TCC" placeholder="TCC" />
                          </div> -->
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.residentialAddress.$touch"      
                            :error="$v.merchant.companyInformation.residentialAddress.$error"
                            color="grey-9" v-model="merchant.companyInformation.residentialAddress" float-label="Residential Address" placeholder="Residential Address" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.residentialPin.$touch"      
                            :error="$v.merchant.companyInformation.residentialPin.$error"
                            color="grey-9" type="number" v-model="merchant.companyInformation.residentialPin" float-label="PIN" placeholder="PIN" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.residentCityName.$touch"      
                            :error="$v.merchant.companyInformation.residentCityName.$error"
                            color="grey-9" v-model="merchant.companyInformation.residentCityName" float-label="City" placeholder="City">
                                <q-autocomplete
                                @search="residentCitySearch"
                                :debounce="500"
                                :min-characters="1"
                                @selected="residentCitySelected"
                                />
                            </q-input>
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input
                            @blur="$v.merchant.companyInformation.residentStateName.$touch"      
                            :error="$v.merchant.companyInformation.residentStateName.$error"
                            color="grey-9" v-model="merchant.companyInformation.residentStateName" float-label="State" placeholder="State">
                                <q-autocomplete
                                @search="residentStateSearch"
                                :debounce="500"
                                :min-characters="1"
                                @selected="residentStateSelected"
                                />
                            </q-input>
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.contactName.$touch"      
                            :error="$v.merchant.companyInformation.contactName.$error"
                            color="grey-9" v-model="merchant.companyInformation.contactName" float-label="contactName" placeholder="contactName" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.contactMobile.$touch"      
                            :error="$v.merchant.companyInformation.contactMobile.$error"
                            color="grey-9" type="number" v-model="merchant.companyInformation.contactMobile" float-label="Contact mobile" placeholder="Contact Mobile" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input color="grey-9" type="tel" v-model="merchant.companyInformation.contactAlternateMobile" float-label="Contact Alt Mobile" placeholder="Contact Alt Mobile" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input color="grey-9" type="tel" v-model="merchant.companyInformation.contactPhone" float-label="Contact Phone" placeholder="Contact Phone" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input 
                            @blur="$v.merchant.companyInformation.contactEmail.$touch"      
                            :error="$v.merchant.companyInformation.contactEmail.$error"
                            color="grey-9" type="email" v-model="merchant.companyInformation.contactEmail" float-label="Contact Email" placeholder="Contact Email" />
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
                            <q-chips-input v-model="merchant.companyInformation.statementEmail" color="grey-9" float-label="Statement Email" placeholder="Statement Email"/>
                          </div>
                      </div>
                      <q-stepper-navigation>
                        <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('companyInformation')" label="Continue" />
                        <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" />
                        <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$refs.stepper.previous()" label="Back" />
                      </q-stepper-navigation>
                    </q-step>
                    <q-step name="third" title="Partners" v-if="merchant.companyInformation.constitution == 'PL'">
                      <!-- <pre>{{$v.viewBinding.partnersArr.$each}}</pre> -->
                        <div v-for="(v,index) in $v.viewBinding.partnersArr.$each" :key="index" class="row q-my-xs gutter-sm">
                          <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="row group items-center">
                              <div class="col">
                                <span class="q-pa-sm bg-light text-dark"><q-icon name="people" /> Partner 0{{index+1}}</span>
                              </div>
                              <div class="col-auto">
                                <q-btn round icon="delete" @click="removePartnerFromArr(v,index)" color="negative"  />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input :error="v.name.$error"
                            color="grey-9" v-model="v.name.$model" float-label="Name" placeholder="Name" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input :error="v.pan.$error"
                            color="grey-9" v-model="v.pan.$model" float-label="Pan" placeholder="Pan" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input :error="v.address.$error"
                            color="grey-9" v-model="v.address.$model" float-label="Address" placeholder="Address" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input :error="v.pin.$error"
                            color="grey-9" type="number" v-model="v.pin.$model" float-label="Pincode" placeholder="Pincode" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input :error="v.cityRefCode.$error"
                            color="grey-9" v-model="v.cityRefCode.$model" float-label="City" placeholder="City">
                                <q-autocomplete
                                @search="residentCitySearch"
                                :debounce="500"
                                :min-characters="1"
                                @selected="residentCitySelected"
                                />
                            </q-input>
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input :error="v.stateRefCode.$error" 
                            color="grey-9" v-model="v.stateRefCode.$model" float-label="State" placeholder="State">
                                <q-autocomplete
                                @search="residentStateSearch"
                                :debounce="500"
                                :min-characters="1"
                                @selected="residentStateSelected"
                                />
                            </q-input>
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input :error="v.contactMobile.$error"
                            color="grey-9" type="tel" v-model="v.contactMobile.$model" float-label="Mobile" placeholder="Mobile" />
                          </div>
                          <div class="col-md-6 col-sm-12 col-xs-12">
                            <q-input :error="v.contactEmail.$error" 
                            color="grey-9" type="email"  v-model="v.contactEmail.$model" float-label="Email" placeholder="Email" />
                          </div>
                        </div>
                        <q-stepper-navigation>
                          <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('partners')" label="Continue" />
                          <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" />
                          <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$refs.stepper.previous()" label="Back" />
                          <q-btn color="positive float-right" @click="addMorePartnersSet()" class="q-ma-xs" icon="add" label="Add More" />
                        </q-stepper-navigation>
                    </q-step>
                    <q-step name="fourth" title="Business" subtitle="Info">
                      <div class="row gutter-sm">
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" type="number" v-model="merchant.businessInformation.weekdayStartHour" float-label="Weekday start hour" placeholder="Weekday start hour" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" type="number" v-model="merchant.businessInformation.weekdayEndHour" float-label="Weekday end hour" placeholder="Weekday end hour" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" type="number" v-model="merchant.businessInformation.weekendStartHour" float-label="Weekend start hour" placeholder="Weekend start hour" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" type="number" v-model="merchant.businessInformation.weekendEndHour" float-label="Weekend end hour" placeholder="Weekend end hour" />
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
                          <q-input color="grey-9" v-model="merchant.businessInformation.gstId" float-label="GST ID" placeholder="GST ID" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" v-model="merchant.businessInformation.currentPosName" float-label="Name of the other POS Currentlly Used" placeholder="Name of the other POS Currentlly Used" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" type="number" v-model="merchant.businessInformation.debitCardMdr" float-label="Debit Card" placeholder="Debit Card" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" type="number" v-model="merchant.businessInformation.creditCardMdr" float-label="Credit Card" placeholder="Credit Card" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" type="number" v-model="merchant.businessInformation.memberSince" float-label="Member since" placeholder="Member since" />
                        </div>
                      </div>
                      <q-stepper-navigation>
                        <q-btn color="primary" class="q-ma-xs" icon="check" @click="validatebeforeNavigate('businessInformation')" label="Continue" />
                        <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" />
                        <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$refs.stepper.previous()" label="Back" />
                      </q-stepper-navigation>
                    </q-step>
                    <q-step name="fifth" title="Payment" subtitle="Details">
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
                          color="grey-9" type="number" v-model="merchant.paymentDetails.installationFee" float-label="Installation Fee" placeholder="Installation Fee" 
                          />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-select placeholder="Choose from the below" color="grey-9" v-model="merchant.paymentDetails.terminalModeCode" float-label="Terminal Model" :options="terminalModelSet" />
                        </div>
                        <div class="col-md-6 col-sm-12">
                          <q-input color="grey-9" type="number" v-model="merchant.paymentDetails.numberOfTerminals" float-label="No of Terminals" placeholder="No of Terminals" />
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
                          <q-select placeholder="Choose from the below" color="grey-9" v-model="merchant.paymentDetails.rentalPlanCode" float-label="Rental Plan" :options="rentalPlanSet" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-select placeholder="Choose from the below" color="grey-9" v-model="merchant.paymentDetails.rentalModeCode" float-label="Rental Mode" :options="rentalModeOptions" />
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
                          <q-input color="grey-9" type="number" v-model="merchant.paymentDetails.gracePeriod" float-label="Grace period" placeholder="Grace period" />
                        </div>
                        <div v-if="merchant.paymentDetails.rentalType == 'A'"  class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" type="number" v-model="merchant.paymentDetails.advanceRentCollected" float-label="Advance Rent Collected" placeholder="Advance Rent Collected" />
                        </div>
                        <div v-if="merchant.paymentDetails.rentalType == 'A'"  class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" type="number" v-model="merchant.paymentDetails.noOfMonthRentPaidInAdvance" float-label="No. Of Month Rent Paid In Advance" placeholder="No. Of Month Rent Paid In Advance" />
                        </div>
                        <div v-if="merchant.paymentDetails.rentalType == 'A'"  class="col-md-6 col-sm-12 col-xs-12">
                            <p class="text-caption">Advanced Rent Mode</p>
                            <div class="group">
                              <q-radio 
                              @blur="$v.merchant.paymentDetails.advancedRentMode.$touch"      
                              :error="$v.merchant.paymentDetails.advancedRentMode.$error" 
                              v-for="(item,index) in advancedRentModeOptions" :key="index" 
                              color="grey-9" v-model="merchant.paymentDetails.advancedRentMode" :val="item.value" :label="item.label" />
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
                        <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" />
                        <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$refs.stepper.previous()" label="Back" />
                      </q-stepper-navigation>
                    </q-step>
                    <q-step name="sixth" title="Discount" subtitle="Rate">
                      <div class="row group items-center">
                          <div class="col">
                              <p class="text-caption">Device Owned By</p>
                              <q-radio color="grey-9" v-model="option" val="opt1" label="Small Merchant (<= 20 L)" />
                              <q-radio color="grey-9" v-model="option" val="opt2" label="Other Merchant (> 20 L)" />
                          </div>
                          <div class="col-md-12">
                              <div class="row items-center">
                                  <div class="col-3">
                                      <div class="text-caption text-weight-medium">Domestic Debit Card above 2000</div>
                                  </div>
                                  <div class="col">
                                      <div class="text-caption text-weight-medium q-py-sm" align="center">Merchant Disc Fee</div>
                                      <div class="row group bg-green-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col">
                                      <div class="text-caption text-weight-medium q-py-sm" align="center">Provider Disc Fee</div>
                                      <div class="row group bg-yellow-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
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
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col">
                                      <div class="row group bg-yellow-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-12">
                              <div class="row items-center">
                                  <div class="col-3">
                                      <div class="text-caption text-weight-medium">Standard/Classic (1st Stab)</div>
                                  </div>
                                  <div class="col">
                                      <div class="row group bg-green-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col">
                                      <div class="row group bg-yellow-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
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
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col">
                                      <div class="row group bg-yellow-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
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
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col">
                                      <div class="row group bg-yellow-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
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
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col">
                                      <div class="row group bg-yellow-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
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
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col">
                                      <div class="row group bg-yellow-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
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
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col">
                                      <div class="row group bg-yellow-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
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
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col">
                                      <div class="row group bg-yellow-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
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
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col">
                                      <div class="row group bg-yellow-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
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
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col">
                                      <div class="row group bg-yellow-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
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
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col">
                                      <div class="row group bg-yellow-2">
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Fixed" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="%" />
                                          </div>
                                          <div class="col">
                                              <q-input color="grey-9" type="number" v-model="text" placeholder="Max" />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <q-stepper-navigation>
                        <q-btn color="primary" class="q-ma-xs" icon="check" @click="$refs.stepper.next()" label="Continue" />
                        <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" />
                        <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$refs.stepper.previous()" label="Back" />
                      </q-stepper-navigation>
                      </q-step>
                    <q-step name="seventh" title="Bank & Collection" subtitle="Details">
                      <div class="row q-mb-md gutter-sm items-center">
                        <div class="col-md-12">
                          <div class="text-h6">Merchant Bank Details</div>
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" v-model="merchant.bankInformation.bankDetails.ifsc" float-label="IFSC Code" placeholder="IFSC Code" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" v-model="merchant.bankInformation.bankDetails.branchName" float-label="Branch Name" placeholder="IFSC Code" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-select placeholder="Choose from the below" color="grey-9" v-model="merchant.bankInformation.bankDetails.feeType" float-label="Fee Type" :options="feeTypeOptions" />
                        </div>
                        <div v-if="merchant.bankInformation.bankDetails.feeType == 'N' || merchant.bankInformation.bankDetails.feeType == 'S'" class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" 
                            type="number" v-model="merchant.bankInformation.bankDetails.settlementOrNeftFee" float-label="NEFT/Settlement Fee Inclusive of Tax" placeholder="NEFT/Settlement Fee Inclusive of Tax" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" v-model="merchant.bankInformation.bankDetails.chequeDepositedDate" float-label="Cheque Deposited Date" placeholder="Cheque Deposited Date" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" type="number" v-model="merchant.bankInformation.bankDetails.micr" float-label="MICR" placeholder="MICR" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" v-model="merchant.bankInformation.bankDetails.bankName" float-label="Bank Name" placeholder="Bank Name" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-select placeholder="Choose from the below" color="grey-9" v-model="merchant.bankInformation.bankDetails.payment_mode" float-label="Payment mode" :options="paymnentModeOptions" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" v-model="merchant.bankInformation.bankDetails.bankCityName" float-label="City" placeholder="City">
                            <q-autocomplete
                            @search="residentCitySearch"
                            :debounce="500"
                            :min-characters="1"
                            @selected="bankCitySelected"
                            />
                          </q-input>
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" v-model="merchant.bankInformation.bankDetails.bankStateName" float-label="State" placeholder="State">
                            <q-autocomplete
                            @search="residentStateSearch"
                            :debounce="500"
                            :min-characters="1"
                            @selected="bankStateSelected"
                            />
                          </q-input>
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-select placeholder="Choose from the below" color="grey-9" v-model="merchant.bankInformation.bankDetails.accountType" float-label="Account Type" :options="accountTypeOptions" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input color="grey-9" type="number" v-model="merchant.bankInformation.bankDetails.accountNumber" float-label="Bank A/c Number" placeholder="Bank A/c Number" />
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
                        <div class="col-md-4 col-sm-12 col-xs-12">
                          <q-input color="grey-9" v-model="merchant.bankInformation.collectionDetails.swipeAmount" float-label="Swipe Amount" placeholder="Swipe Amount" />
                        </div>
                        <div class="col-md-4 col-sm-12">
                          <q-input color="grey-9" format-model="number" v-model="merchant.bankInformation.collectionDetails.collectedDate" minimal float-label="Swipe Date" />
                        </div>
                        <div class="col-md-4 col-sm-12 col-xs-12">
                          <q-input color="grey-9" v-model="merchant.bankInformation.collectionDetails.swipeTerminal" float-label="Swiped on the terminal of" placeholder="Swiped on the terminal of" />
                        </div>
                        <div class="col-md-4 col-sm-12 col-xs-12">
                          <q-input color="grey-9" v-model="merchant.bankInformation.collectionDetails.chequeAmount" float-label="Cheque Amount" placeholder="Cheque Amount" />
                        </div>
                        <div class="col-md-4 col-sm-12">
                          <q-input color="grey-9" format-model="number" v-model="merchant.bankInformation.collectionDetails.chequeDate" minimal float-label="Cheque Date" />
                        </div>
                        <div class="col-md-4 col-sm-12 col-xs-12">
                          <q-input color="grey-9" v-model="merchant.bankInformation.collectionDetails.chequeNumber" float-label="Cheque/UTR No" placeholder="Cheque/UTR No" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-select placeholder="Choose from the below" color="grey-9" v-model="merchant.bankInformation.collectionDetails.acquirerBank" float-label="Bank Name" :options="selectOptions" />
                        </div>
                      </div>
                      <q-stepper-navigation>
                        <q-btn color="primary" class="q-ma-xs" icon="check" @click="$refs.stepper.next()" label="Continue" />
                        <q-btn color="amber-10" class="q-ma-xs" icon="save" label="Save Partial" />
                        <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$refs.stepper.previous()" label="Back" />
                      </q-stepper-navigation>
                    </q-step>
                </q-stepper>
            </div>
        </div>
    </div>
</template>

<script>

import { required, requiredIf } from "@vuelidate/validators";

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
      date2: "",
      option: [],
      select: "",
      text: "",
      selectOptions: [
        {
          label: "label",
          value: "1"
        },
        {
          label: "label",
          value: "2"
        },
        {
          label: "label",
          value: "3"
        }
      ],

      viewBinding: {
        subventionType: [
          {
            label: "Bank MDR",
            value: 1
          },
          {
            label: "Bijlipay MDR",
            value: 2
          }
        ],
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
            value: "p"
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
        partnerObj: {
          name: "",
          address: "",
          pan: "",
          pin: "",
          cityRefCode: "",
          stateRefCode: "",
          contactMobile: "",
          contactEmail: ""
        },
        partnersArr: [
          {
            name: "",
            address: "",
            pan: "",
            pin: "",
            cityRefCode: 0,
            stateRefCode: 0,
            contactMobile: "",
            contactEmail: ""
          }
        ]
      },

      //start >> Actual dropdown options values
      institutionCodeOptions: [
        {
          label: "AB",
          value: 1
        },
        {
          label: "IOB",
          value: 2
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
      advancedRentModeOptions: [
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
          value: "OD"
        },
        {
          label: "Cash credit account",
          value: "CC"
        },
        {
          label: "Loan account",
          value: "LA"
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
      rentalPlanSet: [],
      //end >> Actual dropdown options values

      merchant: {
        salesInformation: {
          institutionCode: 1,
          applicationType: "D",
          applicationNumber: "QWERTY12333",
          applicationDate: "20/04/2018",
          aggreementDate: "20/04/2018",
          merchantType: "M",
          subventionType: [],
          region: 1,
          salesPersonCode: 1,
          leadFrom: "",
          sharingModelCode: "N",
          sharingPartnerCode: 1,
          dailyFixedAmount: 0,
          loanDisbursementPercentage: 2,
          loanDisbursementAmount: 0,
          loanDisbursementDate: "20/04/2018",
          tenureMonth: 12,
          tenureDay: 356,
          tenureStartDate: "20/04/2018",
          rentPercentage: 2,
          rentFixed: 0
        },
        companyInformation: {
          legalName: "test",
          dbaName: "test",
          registeredAddress: "address",
          registeredPin: "123456",
          registeredCityRefCode: 1,
          registeredCityName: "",
          registeredStateRefCode: 1,
          registeredStateName: "",
          constitution: "PL",
          constitutionDescription: "test",
          establishYear: "20/04/2018",
          registerNumber: "A12456",
          pan: "ABGPD265P",
          tin: "XXXXXX",
          tan: "XXXXXX",
          businessNature: "test",
          businessType: "R",
          mcc: "5733",
          residentialAddress: "address",
          residentialPin: "123456",
          residentCityName: "",
          residentialCityRefCode: 1,
          residentStateName: "",
          residentialStateRefCode: 1,
          contactName: "Dinesh",
          contactMobile: "1234567790",
          contactAlternateMobile: "0123456789",
          contactPhone: "1234567890",
          contactEmail: "test@gmail.com",
          statementType: "E",
          statementFrequency: "D",
          statementEmail: []
        },
        businessInformation: {
          weekdayStartHour: "9",
          weekdayEndHour: "6",
          weekendStartHour: "9",
          weekendEndHour: "2",
          lastTurnoverYear: 2010,
          lastTurnoverAmount: 500000,
          expectedCardBusiness: 500000,
          averageBillAmount: 5000,
          gstId: "ABC45678",
          currentPosName: "INGINICO",
          debitCardMdr: 2,
          creditCardMdr: 2,
          memberSince: "20/04/2018",
          businessIncome: 1121212
        },
        paymentDetails: {
          deviceOwnedBy: "B",
          installationFee: 1000,
          terminalModeCode: 1,
          numberOfTerminals: 1,
          cashAtPosEnabled: "Y",
          rentalPlanCode: 1,
          rentalModeCode: "N",
          rentalType: "A",
          devicePrice: 2500,
          otherCharges: 500,
          totalAmountPaid: 3000,
          advanceRentCollected: 111111.99,
          advancedRentMode: "NEFT",
          noOfMonthRentPaidInAdvance: 12,
          gracePeriod: 12
        },
        bankInformation: {
          bankDetails: {
            ifsc: "XYZ00000123",
            micr: 123456,
            bankName: "XXX Bank",
            bankCityName: "",
            bankCityRefCode: 1,
            bankStateName: "",
            bankStateRefCode: 1,
            branchName: "",
            feeType: "N",
            settlementOrNeftFee: 100,
            chequeDepositedDate: "20/04/2018",
            payment_mode: "D",
            accountType: "S",
            accountNumber: "123456789",
            bankStatementAttached: "Y",
            cancelChequeAttached: "Y"
          },
          collectionDetails: {
            collectedDate: "20/04/2018",
            swipeAmount: 10000,
            swipeTerminal: "INGINICO",
            chequeAmount: 10000,
            chequeDate: "20/04/2018",
            chequeNumber: "123456",
            acquirerBank: "testBank"
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
    }
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
          required
        },
        applicationDate: {
          required
        },
        merchantType: {
          required
        },
        sharingPartnerCode: {
          required: requiredIf(function() {
            // return this.getTransctionValueModel
            return !this.getTransctionValueModel;
          })
        },
        dailyFixedAmount: {
          required: requiredIf(function() {
            return !this.getTransctionValueModel;
          })
        },
        loanDisbursementPercentage: {
          required: requiredIf(function() {
            return !this.getTransctionValueModel;
          })
        },
        loanDisbursementAmount: {
          required: requiredIf(function() {
            return !this.getTransctionValueModel;
          })
        },
        loanDisbursementDate: {
          required: requiredIf(function() {
            return !this.getTransctionValueModel;
          })
        },
        tenureMonth: {
          required: requiredIf(function() {
            return !this.getTransctionValueModel;
          })
        },
        tenureDay: {
          required: requiredIf(function() {
            return !this.getTransctionValueModel;
          })
        },
        tenureStartDate: {
          required: requiredIf(function() {
            return !this.getTransctionValueModel;
          })
        },
        rentPercentage: {
          required: requiredIf(function() {
            return this.getCashAtPos;
          })
        },
        rentFixed: {
          required: requiredIf(function() {
            return this.getCashAtPos;
          })
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
          required
        },
        registeredCityRefCode: {
          required
        },
        registeredCityName: {
          required
        },
        registeredStateRefCode: {
          required
        },
        registeredStateName: {
          required
        },
        constitution: {
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
          required
        },
        residentCityName: {
          required
        },
        residentialCityRefCode: {
          required
        },
        residentStateName: {
          required
        },
        residentialStateRefCode: {
          required
        },
        contactName: {
          required
        },
        contactMobile: {
          required
        },
        contactEmail: {
          required
        },
        statementType: {
          required
        },
        statementFrequency: {
          required
        }
      },
      paymentDetails: {
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
            return this.getRentalTypeVisibilityForAdvanced;
          })
        },
        advancedRentMode: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForAdvanced;
          })
        },
        noOfMonthRentPaidInAdvance: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForAdvanced;
          })
        },
        gracePeriod: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForRental;
          })
        }
      },
      bankInformation: {
        bankDetails: {
          ifsc: {
            required
          },
          micr: {
            required
          },
          bankCityName: {
            required
          },
          bankCityRefCode: {
            required
          },
          bankStateName: {
            required
          },
          bankStateRefCode: {
            required
          },
          payment_mode: {
            required
          },
          accountType: {
            required
          },
          settlementOrNeftFee: {
            required: requiredIf(function() {
              return this.getfeeTypeForSettlementVisibility;
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
            required
          },
          pin: { required },
          stateRefCode: {
            required
          },
          cityRefCode: {
            required
          },
          contactMobile: {
            required
          },
          contactEmail: {
            required
          }
        }
      }
    }
  },

  created() {
    this.fetchAllDropdownValuesFromMARSapi(
      this.merchant.salesInformation.institutionCode
    );
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
    ...mapActions("mars_dataSubmit", [
      "MARS_DATA_SUBMIT_INTERNAL",
      "MARS_DATA_SUBMIT_EXTERNAL",
      "MARS_DATA_EXTERNAL_SUBMIT_RESPONSE"
    ]),

    toggleChequeImage() {
      this.toggleChequeImageResult = !this.toggleChequeImageResult;
    },
    fnDocumentUrl(documentUrl) {
      this.populatedDocumentUrl = documentUrl;
      this.showDocumentPreview = !this.showDocumentPreview;
    },

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
      this.viewBinding.partnersArr.push(this.viewBinding.partnerObj);
    },
    removePartnerFromArr(item) {
      let self = this;
      _.map(self.$v.viewBinding.partnersArr.$each, function(oo) {
        if (_.isEqual(oo.$model, item.$model)) {
          var index = self.viewBinding.partnersArr.indexOf(oo.$model);
          if (index !== -1) {
            self.viewBinding.partnersArr.splice(index, 1);
          }
        }
      });
    },
    validatebeforeNavigate(step) {
      if (step == "salesInformation") {
        this.$v.merchant.salesInformation.$touch();
        if (this.$v.merchant.salesInformation.$error) {
          this.$q.notify("Please review fields again.");
        } else {
          this.$refs.stepper.next();
        }
      } else if (step == "companyInformation") {
        this.$v.merchant.companyInformation.$touch();
        if (this.$v.merchant.companyInformation.$error) {
          this.$q.notify("Please review fields again.");
        } else {
          this.$refs.stepper.next();
        }
      } else if (step == "partners") {
        this.$v.viewBinding.partnersArr.$touch();
        if (this.$v.viewBinding.partnersArr.$error) {
          this.$q.notify("Please review fields again.");
        } else {
          this.$refs.stepper.next();
        }
      } else if (step == "businessInformation") {
        this.$refs.stepper.next();
      } else if ((step = "paymentDetails")) {
        this.$v.merchant.paymentDetails.$touch();
        if (this.$v.merchant.paymentDetails.$error) {
          this.$q.notify("Please review fields again.");
        } else {
          this.$refs.stepper.next();
        }
      } else {
      }
    },

    fetchAllDropdownValuesFromMARSapi(institutionCode) {
      this.$q.loading.show({
        delay: 400, // ms
        spinnerColor: "purple-9"
      });

      let self = this;
      /* API call to fetch regions */
      self
        .REGION_FROM_MARS(institutionCode)
        .then(response => {
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
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    finalMarsFormSubmit() {
      let self = this;
      self.$q.loading.show({
        delay: 400, // ms
        spinnerColor: "purple-9",
        message: "Validating .."
      });

      self.merchant["leadId"] = self.$route.params.id;
      self.merchant["partnerInformation"] = self.viewBinding.partnersArr;

      /* API call to fetch regions */
      self
        .MARS_DATA_SUBMIT_INTERNAL(self.merchant)
        .then(response => {
          delete self.merchant.leadId;
          self.$q.loading.show({
            delay: 400, // ms
            spinnerColor: "purple-9",
            message: "Saved.. Sending data to mars"
          });
          // self.merchant["merchant"] = self.merchant;
          self
            .MARS_DATA_SUBMIT_EXTERNAL({ merchant: self.merchant })
            .then(response => {
              self.$q.loading.show({
                delay: 400, // ms
                spinnerColor: "purple-9",
                message: "Great.. All set to go"
              });
              // MARS_DATA_EXTERNAL_SUBMIT_RESPONSE(self.merchant).then(response => {
              //   self.$q.loading.hide();
              // });
            });
          self.$q.loading.hide();
        })
        .catch(() => {
          self.$q.loading.hide();
        });
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
