<template>
    <div>
        <q-dialog class="customModalOverlay" v-model="toggleModel" @hide="emitToggleReject(toggleModel)"
            @escape-key="closeRejectModel(toggleModel)" :content-css="{ padding: '50px', minWidth: '50vw' }">
            <div class="row">
                <div class="col-md-12 text-h6 text-center q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">
                    Additional TID
                </div>
                <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
                    <q-card style="width:225%">
                        <q-card-section>
                            <q-list no-border>
                                <!-- <div class="col-md-5">
                                    <q-input color="grey-9" disable type="text" v-model="additionalTerminal.mid"
                                        placeholder="Enter MID" float-label="Enter MID" />
                                </div>
                                <div class="col-md-5">
                                    <q-input color="grey-9" disable type="text" v-model="additionalTerminal.tid"
                                        placeholder="Enter TID" float-label="Enter TID" />
                                </div>
                                <div class="col-md-5">
                                    <q-input color="grey-9" disable type="text" v-model="additionalTerminal.institutionCode"
                                        placeholder="Institution code*" float-label="Institution code*" />
                                </div>
                                <div class="col-md-6">
                                    <q-input color="grey-9" :disable="this.propsAdditionalData.merchantRefCode != null
                                    " v-model.trim="additionalTerminal.merchantRefCode"
                                        float-label="Merchant RefCode*" />
                                </div>
                                <div class="col-md-5">
                                    <q-input color="grey-9" disable v-model.trim="additionalTerminal.applicationNumber"
                                        float-label="Application Number*" />
                                </div>
                                <div class="col-md-5">
                                    <q-input color="grey-9"
                                        v-model.trim="additionalTerminal.AdditionalTerminalDetails.numberOfTerminals"
                                        float-label="Enter Number Of Terminals" />
                                </div>
                                <div class="col-md-5">
                                    <q-input color="grey-9" disable
                                        v-model.trim="additionalTerminal.AdditionalTerminalDetails.address"
                                        float-label="Address*" />
                                </div>
                                <div class="col-md-6">
                                    <q-input color="grey-9" disable v-model.trim="
                                        additionalTerminal.AdditionalTerminalDetails
                                            .pinCode
                                    " float-label="Pincode*" />
                                </div>
                                <div class="col-md-5">
                                    <q-input @blur="fnClrCity" color="grey-9"
                                        v-model.trim="additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel"
                                        @input="fninputTyping($event, 1)" float-label="City (type min 3 characters)*"
                                        placeholder="Start typing ..*">

                                        <q-autocomplete separator @search="marsCitySearch" :debounce="10"
                                            :min-characters="3" @selected="partnerCitySelected" />
                                    </q-input>
                                </div>
                                <div class="col-md-5">
                                    <q-input @blur="fnClrState" color="black-9"
                                        v-model.trim="additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel"
                                        @input="fninputTyping($event, 2)" float-label="state (type min 3 characters)*"
                                        placeholder="Start typing ..*">
                                        <q-autocomplete separator @search="marsStateSearch" :debounce="10"
                                            :min-characters="3" @selected="partnerStateSelected" />
                                    </q-input>
                                </div> -->
                                <div class="col-md-6">
                                    <q-input color="grey-9" disable v-model.trim="additionalTerminal.mid"
                                        float-label="MID*" />
                                </div>
                                <div class="col-md-6">
                                    <q-input color="grey-9" disable v-model.trim="additionalTerminal.tid"
                                        float-label="TID*" />
                                </div>
                                <div class="col-md-6">
                                    <q-input color="grey-9" disable v-model.trim="additionalTerminal.institutionCode"
                                        float-label="Institution code*" />
                                </div>
                                <div class="col-md-6">
                                    <q-input color="grey-9" :disable="
                                        this.propsAdditionalData
                                            .merchantRefCode

                                    " v-model.trim="additionalTerminal.merchantRefCode" :error="$v.additionalTerminal.merchantRefCode.$error
" float-label="Merchant RefCode*" />
                                </div>
                                <div class="col-md-6">
                                    <q-input color="grey-9" disable v-model.trim="additionalTerminal.applicationNumber"
                                        float-label="Application Number*" />
                                </div>
                                <div class="col-md-6">
                                    <q-input v-model.trim="
                                        additionalTerminal.AdditionalTerminalDetails
                                            .numberOfTerminals
                                    " @blur="
    $v.additionalTerminal.AdditionalTerminalDetails
        .numberOfTerminals.$touch;
                   " :error="
                       $v.additionalTerminal.AdditionalTerminalDetails
                           .numberOfTerminals.$error
                   " class="text-weight-regular text-grey-8" color="grey-9" float-label="*Number Of Terminals"
                                        placeholder="Number Of Terminals" />
                                </div>
                                <div class="col-md-6">
                                    <q-input color="grey-9" disable v-model.trim="
                                        additionalTerminal.AdditionalTerminalDetails
                                            .address
                                    " float-label="Address*" />
                                </div>

                                <div class="col-md-6">
                                    <q-input color="grey-9" disable v-model.trim="
                                        additionalTerminal.AdditionalTerminalDetails
                                            .pinCode
                                    " float-label="Pincode*" />
                                </div>

                                <div class="col-md-6">
                                    <q-input @blur="fnClrCity" color="grey-9"
                                        v-model.trim="additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel"
                                        @input="fninputTyping($event, 1)" float-label="City (type min 3 characters)*"
                                        placeholder="Start typing ..*">

                                        <q-autocomplete separator @search="marsCitySearch" :debounce="10"
                                            :min-characters="3" @selected="partnerCitySelected" />
                                    </q-input>
                                </div>
                                <div class="col-md-6">
                                    <q-input @blur="fnClrState" color="black-9"
                                        v-model.trim="additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel"
                                        @input="fninputTyping($event, 2)" float-label="state (type min 3 characters)*"
                                        placeholder="Start typing ..*">
                                        <q-autocomplete separator @search="marsStateSearch" :debounce="10"
                                            :min-characters="3" @selected="partnerStateSelected" />
                                    </q-input>
                                </div>
                            </q-list>
                        </q-card-section>
                        <q-card-actions align="end">
                            <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8"
                                @click="closeRejectModel()">Cancel</q-btn>
                            <q-btn label="submit" @click="fnAdditionalSubmit(additionalTerminal)" color="purple-9" />
                        </q-card-actions>
                    </q-card>
                </div>
            </div>




        </q-dialog>
    </div>
</template>
<script>


import { LocalStorage } from "quasar";
import multiTidComponents from "./multiTidComponents.vue";
import multiTidPaymentMode from "./multiTidPaymentMode";
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
    decimal
}
    from "@vuelidate/validators";

import { date } from "quasar";
import moment from "moment";
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import { uid } from "quasar";


import viewLeadDocumentsDataEntryComponent from "./viewLeadDocumentsDataEntryComponent.vue";
// import MarsErrorResponse from "../MarsErrorResponseHandler.vue";

import { helpers } from "@vuelidate/validators";
const today = new Date()
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

export default {
    props: ["showRejectPaymentMode", "propsAdditionalData"],

    data() {
        return {
            toggleModel: this.propsAdditionalData,
            companyRegisteredCitySelected: false,
            companyRegisteredStateSelected: false,
            cityOptions: [],
            stateOptions: [],
            paymnentModeOptions: [
                {
                    label: "Direct credit",
                    value: "D"
                },
                {
                    label: "NEFT",
                    value: "N"
                }
                // {
                //   label: "IMPS",
                //   value: "I"
                // }
            ],
            additionalTerminal: {
                mid: "",
                tid: "",
                institutionCode: "",
                merchantRefCode: "",
                applicationNumber: "",
                AdditionalTerminalDetails: {
                    numberOfTerminals: "",
                    address: "",
                    pinCode: "",
                    citySerNumber: "",
                    citySerNumberLabel: "",
                    stateSerNumber: "",
                    stateSerNumberLabel: ""
                }

            },
            baseAndSubTidList: [],
            propsAdditionalData: "",
            subTidDuplicateData: [],
            listAllSubTidDetails: [],
            genSubTidFlag: false,
            disabledListAllSubTidDetails: [],
            viewBinding: {},
            subTidArr: [],
            SubTidField: false,
            baseTidFlag: false,
            // data: this.propShowAdditionalComponent.data,
            formdata: {
                paymentMode: ""
            },
        };
    },
    error: {
        additionalTerminal: {
            merchantRefCode: {
                alert: false,
                issue: "",
                value: "",
            },

            AdditionalTerminalDetails: {
                numberOfTerminals: {
                    alert: false,
                    issue: "",
                    value: "",
                },
            },
        },
    },
    validations: {
        additionalTerminal: {
            merchantRefCode: {
                required,
            },

            AdditionalTerminalDetails: {
                numberOfTerminals: {
                    required,
                },
                // citySerNumberLabel: {
                //   required,
                // },
                // citySerNumber: {
                //   required,
                // },
            },
        },
    },
    beforeMount() {
        this.additionalTerminal.mid = this.propsAdditionalData[0].mid != null ? this.propsAdditionalData[0].mid : "null";
        this.additionalTerminal.tid = this.propsAdditionalData[0].tid != null ? this.propsAdditionalData[0].tid : "null";
        this.additionalTerminal.institutionCode = this.propsAdditionalData[0].institutionCode;
        this.additionalTerminal.merchantRefCode = this.propsAdditionalData[0].merchantRefCode != null ? this.propsAdditionalData[0].merchantRefCode : "null";
        this.additionalTerminal.applicationNumber = this.propsAdditionalData[0].applicationNumber != null ? this.propsAdditionalData[0].applicationNumber : "null";
        this.additionalTerminal.AdditionalTerminalDetails.address = this.propsAdditionalData[0].leadInformation.leadAddress;
        this.additionalTerminal.AdditionalTerminalDetails.pinCode = this.propsAdditionalData[0].leadInformation.pincode;
        this.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel = this.propsAdditionalData[0].leadInformation.city;
        this.additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel = this.propsAdditionalData[0].leadInformation.state;
        this.fetchmarsCity(
            this.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel,
            this.additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel
        );
    },
    computed: {
        ...mapGetters("mars_dataSubmit", ["marsSavedDataFromInternal"]),
        ...mapGetters("mars_additional_city", ["marsAdditionalCity"]),
        ...mapGetters("mars_additional_state", ["marsAdditionalState"]),
        ...mapGetters("mars_additional_tid", [
            "additionalTidFromMars",
            "additionalTidFromBackEnd",
        ]),
    },
    methods: {

        ...mapActions("mars_dataSubmit", [
            "MARS_DATA_SUBMIT_INTERNAL",
            "MARS_DATA_SUBMIT_EXTERNAL",
            "MARS_DATA_EXTERNAL_SUBMIT_RESPONSE",
            "SUBMIT_SUB_TID_MERCHANT_REF_CODE_DETAILS",
            "FETCH_SAVED_DATA_FROM_OWN_DB"
        ]),
        ...mapActions("mars_additional_tid", [
            "ADDITIONAL_TID_FROM_MARS",
            "ADDITIONAL_TID_FROM_BACK_END",
        ]),
        ...mapActions("mars_additional_city", ["CITY_FORM_ADDITIONAL_TID"]),
        ...mapActions("mars_additional_state", ["STATE_FROM_ADDITIONAL_TID"]),
        ...mapActions("leadInformationVasMapping", ["LEAD_INFORMATION_VAS_MAPPING_DERTAILS", "SAVEING_THE_LEAD_STATUS_DETAILS", "GET_LEAD_INFORMATION_VAS_MAPPING_DERTAILS", "CREATE_BASE_TID", "LOAD_GET_SUB_TID_LIST", "GET_BASE_TID_LIST", "GET_SUB_TID_LIST", "CREATE_SUB_TIDS_LIST"]),


        fnAdditionalSubmit(request) {
            this.$v.additionalTerminal.$touch();
            if (this.$v.additionalTerminal.$error) {
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
                let key = this.additionalTerminal.institutionCode;
                this.$q.localStorage.set("a_t", key);
                const finalFormRequest = {
                    additionalTerminal: self.additionalTerminal,
                };
                delete finalFormRequest.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel;
                delete finalFormRequest.additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel;
                let params = {
                    Id: { leadId: this.propsAdditionalData[0].leadInformation.id },
                    Count: {
                        count:
                            this.additionalTerminal.AdditionalTerminalDetails
                                .numberOfTerminals,
                    },
                    Datas: finalFormRequest,
                };
                this.ADDITIONAL_TID_FROM_MARS(finalFormRequest)
                    .then((response) => {
                        let paramaters;
                        if (response.status == 204) {
                            this.$q.loading.hide();
                            this.$q.notify({
                                type: "warning",
                                color: "amber-9",
                                position: "bottom",
                                message: error.data.message,
                            });
                        } else {
                            this.$q.notify({
                                color: "positive",
                                position: "bottom",
                                message: "data",
                                icon: "thumb_up",
                                message: "Merchant Details successfully Updated",
                            });

                            this.ADDITIONAL_TID_FROM_BACK_END({ params })
                                .then((response) => {
                                    this.$q.loading.hide();
                                    this.$emit("closeRejectModel");
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
                                        icon: "thumb_down",
                                        message: error.data.message,
                                    });
                                });
                            self.updateLeadStatus({ leadId: this.propsAdditionalData[0].leadInformation.id, status: 9 })
                        }
                    });
            }
        },

        updateLeadStatus(request) {
            this.SAVEING_THE_LEAD_STATUS_DETAILS(request)
                .then(response => {
                    if (response.status == 200) {
                        this.$q.notify({
                            color: "positive",
                            position: "bottom",
                            message: response.message,
                            icon: "thumb_up"
                        });
                        this.$router.push({ name: "leadValidation" })
                    } else {
                        this.$q.notify({
                            color: "negative",
                            position: "bottom",
                            message: "Something went wrong!",
                            icon: "clear"
                        });
                    }
                })
                .catch(error => {
                    this.$q.notify({
                        color: "negative",
                        position: "bottom",
                        message: error.body != null ? error.body.message : "Lead Information status update failed!",
                        icon: "clear"
                    });
                    this.$q.loading.hide();
                });
        },

        closeRejectModel(toggleModel) {
            this.$emit("closeRejectModel");
        },
        partnerStateSelected(item) {
            this.companyRegisteredStateSelected = true
            this.additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel = item.label;
            this.additionalTerminal.AdditionalTerminalDetails.stateSerNumber = item.value;
        },
        fnClrState() {
            if (!this.companyRegisteredStateSelected)
                this.additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel = ''
        },
        marsCitySearch(terms, done) {
            done(this.COMMON_FILTER_FUNCTION(this.cityOptions, terms));
        },
        marsStateSearch(terms, done) {
            done(this.COMMON_FILTER_FUNCTION(this.stateOptions, terms));
        },
        COMMON_FILTER_FUNCTION(arraySet, terms) {
            return _.filter(arraySet, function (oo) {
                return (
                    oo.label.toLowerCase().includes(terms.toLowerCase()) ||
                    oo.value.toString().includes(terms.toString())
                );
            });
        },
        partnerCitySelected(item) {
            this.companyRegisteredCitySelected = true
            this.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel = item.label;
            this.additionalTerminal.AdditionalTerminalDetails.citySerNumber = item.value;
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
                this.fetchmarsCity(this.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel, this.additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel);
            }
        },

        fnClrCity() {
            if (!this.companyRegisteredCitySelected)
                this.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel = ''
        },
        fetchmarsCity(citySerNumberLabel, stateSerNumberLabel) {
            let self = this;
            self
                /* API call to fetch city */
                .CITY_FORM_ADDITIONAL_TID(citySerNumberLabel)
                .then(() => {
                    self.cityOptions = [];
                    self.marsAdditionalCity.items.map((oo) => {
                        self.cityOptions.push({ label: oo.name, value: oo.code });
                        if (oo.code != "" && oo.code != " ")
                            this.additionalTerminal.AdditionalTerminalDetails.citySerNumber = oo.code;
                    });
                })
                .then(() => {
                    /* API call to fetch state */
                    return self.STATE_FROM_ADDITIONAL_TID(stateSerNumberLabel).then((response) => {
                        self.stateOptions = [];
                        self.marsAdditionalState.items.map((oo) => {
                            self.stateOptions.push({ label: oo.name, value: oo.code });
                            if (oo.code != "" && oo.code != " ")
                                this.additionalTerminal.AdditionalTerminalDetails.stateSerNumber = oo.code;

                        });
                        // self.stateOptions = stateArr;
                    });
                });
        },

        commonDateFormatDOB1(selectedDate) {
            if (
                selectedDate == "" ||
                selectedDate == null ||
                selectedDate == "Invalid date"
            ) {
                return null;
            } else {
                if (typeof selectedDate === "number") {
                    return moment(selectedDate).format("DD/MM/YYYY");
                }
                else {
                    return selectedDate;
                }

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
        loadingSubTid(request) {
            // LOAD_GET_SUB_TID_LIST
            this.LOAD_GET_SUB_TID_LIST(request).then(response => {
                this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: response.body.message,
                    icon: "thumb_up"
                });
                let res = response.body.data;
                this.listAllSubTidDetails = res;
            }).catch(error => {
                this.$q.loading.hide();
            });
        },
        // MARS DATA STORING START
        // fetchAllValuesFromMARSapi() {
        //     if (
        //         this.propShowRejectComponent.data.leadInformation.marsFormSubmitAction == 1 ||
        //         this.propShowRejectComponent.data.leadInformation.marsFormSubmitAction == 2
        //     ) {
        //         return this.FETCH_SAVED_DATA_FROM_OWN_DB({
        //             leadId: this.merchant.leadId
        //         })
        //             .then(() => {
        //                 //Date formatting for MARS
        //                 return this.$set(
        //                     this.marsSavedDataFromInternal.salesInformation,
        //                     "applicationDate",
        //                     this.commonDateFormat(
        //                         this.marsSavedDataFromInternal.salesInformation
        //                             .applicationDate
        //                     )
        //                 );
        //             })
        //             .then(() => {
        //                 return this.$set(
        //                     this.marsSavedDataFromInternal.salesInformation,
        //                     "aggreementDate",
        //                     this.commonDateFormat(
        //                         this.marsSavedDataFromInternal.salesInformation
        //                             .aggreementDate
        //                     )
        //                 );
        //             })
        //             .then(() => {
        //                 return this.$set(
        //                     this.marsSavedDataFromInternal.salesInformation,
        //                     "loanDisbursementDate",
        //                     this.commonDateFormat(
        //                         this.marsSavedDataFromInternal.salesInformation
        //                             .loanDisbursementDate
        //                     )
        //                 );
        //             })
        //             .then(() => {
        //                 return this.$set(
        //                     this.marsSavedDataFromInternal.salesInformation,
        //                     "tenureStartDate",
        //                     this.commonDateFormat(
        //                         this.marsSavedDataFromInternal.salesInformation
        //                             .tenureStartDate
        //                     )
        //                 );
        //             })
        //             .then(() => {
        //                 return this.$set(
        //                     this.marsSavedDataFromInternal.companyInformation,
        //                     "establishYear",
        //                     this.commonDateFormat(
        //                         this.marsSavedDataFromInternal.companyInformation
        //                             .establishYear
        //                     )
        //                 );
        //             })
        //             .then(() => {
        //                 return this.$set(
        //                     this.marsSavedDataFromInternal.bankInformation
        //                         .collectionDetails,
        //                     "chequeDepositedDate",
        //                     this.commonDateFormat(
        //                         this.marsSavedDataFromInternal.bankInformation
        //                             .collectionDetails.chequeDepositedDate
        //                     )
        //                 );
        //             })
        //             .then(() => {
        //                 return this.$set(
        //                     this.marsSavedDataFromInternal.bankInformation
        //                         .collectionDetails,
        //                     "collectedDate",
        //                     this.commonDateFormat(
        //                         this.marsSavedDataFromInternal.bankInformation
        //                             .collectionDetails.collectedDate
        //                     )
        //                 );
        //             })
        //             .then(() => {
        //                 return this.$set(
        //                     this.marsSavedDataFromInternal.bankInformation
        //                         .collectionDetails,
        //                     "chequeDate",
        //                     this.commonDateFormat(
        //                         this.marsSavedDataFromInternal.bankInformation
        //                             .collectionDetails.chequeDate
        //                     )
        //                 );
        //             })
        //             .then(() => {
        //                 return this.$set(
        //                     this.marsSavedDataFromInternal.businessInformation,
        //                     "memberSince",
        //                     this.commonDateFormat(
        //                         this.marsSavedDataFromInternal.businessInformation
        //                             .memberSince
        //                     )
        //                 );
        //             })


        //             .then(() => {
        //                 return this.$set(
        //                     this.marsSavedDataFromInternal.businessInformation,
        //                     "lastTurnoverYear",
        //                     this.commonDateFormat(
        //                         this.marsSavedDataFromInternal.businessInformation
        //                             .lastTurnoverYear
        //                     )
        //                 );
        //             })
        //             .then(() => {
        //                 this.merchant.salesInformation = this.marsSavedDataFromInternal.salesInformation;
        //                 this.merchant.companyInformation = this.marsSavedDataFromInternal.companyInformation;
        //                 this.merchant.businessInformation = this.marsSavedDataFromInternal.businessInformation;
        //                 this.viewBinding.partnersArr = this.marsSavedDataFromInternal.partnerInformation;
        //                 let errorThis = this;
        //                 let errorObj = {
        //                     name: {
        //                         alert: false,
        //                         issue: "",
        //                         value: ""
        //                     },
        //                     address: {
        //                         alert: false,
        //                         issue: "",
        //                         value: ""
        //                     },
        //                     pan: {
        //                         alert: false,
        //                         issue: "",
        //                         value: ""
        //                     },
        //                     pin: {
        //                         alert: false,
        //                         issue: "",
        //                         value: ""
        //                     },
        //                     stateRefCode: {
        //                         alert: false,
        //                         issue: "",
        //                         value: ""
        //                     },
        //                     cityRefCode: {
        //                         alert: false,
        //                         issue: "",
        //                         value: ""
        //                     },
        //                     contactMobile: {
        //                         alert: false,
        //                         issue: "",
        //                         value: ""
        //                     },
        //                     contactEmail: {
        //                         alert: false,
        //                         issue: "",
        //                         value: ""
        //                     }
        //                 };
        //                 errorThis.error.field.merchant.partnerInformation = [];
        //                 this.viewBinding.partnersArr.map(() => {
        //                     errorThis.error.field.merchant.partnerInformation.push(
        //                         errorObj
        //                     );
        //                 });
        //                 this.merchant.paymentDetails = this.marsSavedDataFromInternal.paymentDetails;
        //                 this.merchant.bankInformation = this.marsSavedDataFromInternal.bankInformation;
        //                 this.merchant.mdrPlan = this.marsSavedDataFromInternal.mdrPlan;
        //                 if (this.marsSavedDataFromInternal.SharingDiscountFee != null) {
        //                     this.merchant.SharingDiscountFee = this.marsSavedDataFromInternal.sharingDiscountFee;
        //                 }
        //                 this.merchant.companyInformation.constitution = this.propLeadDeatils.merchantType.marsMappingId;
        //             });
        //     } else {
        //         return true;
        //     }

        // },
        // MARS DATA STORING END


        finalFormSubmit(request) {
            this.subTidArr = [];
            this.subTidArr.push({ request });
            let self = this;
            self.$q.loading.show({
                delay: 0, // ms
                spinnerColor: "purple-9",
                message: "Validating .."
            });
            const finalRequest = { action: 2, merchant: self.merchant };
            finalRequest.merchant.leadId = self.$route.params.id;
            finalRequest.merchant.holdPayment = finalRequest.holdPayment;
            let a = {
                ...finalRequest.merchant.mdrPlan
            };
            finalRequest.merchant.mdrPlan = { ...a, diners: this.formData }
            finalRequest.merchant.businessInformation.currentPosName =
                finalRequest.merchant.businessInformation.currentPosName == "N"
                    ? ""
                    : finalRequest.merchant.businessInformation.currentPosName;
            finalRequest.merchant.companyInformation.constitutionName =
                finalRequest.merchant.companyInformation.constitutionName == "61"
                    ? "60"
                    : finalRequest.merchant.companyInformation.constitutionName;
            finalRequest.merchant.paymentDetails.emiStartDate = this.commonDateFormatDOB1(finalRequest.merchant.paymentDetails.emiStartDate),
            finalRequest.merchant.revParamAndLeadInfo = { bijlipaySwitch: this.propLeadDeatils.bijlipaySwitch, vasInstanceMapping: this.propLeadDeatils.vasInstanceMapping };
            finalRequest.merchant.revParameters.notificationRecipient = finalRequest.merchant.revParameters.notificationRecipient == "N" ? null : finalRequest.merchant.revParameters.notificationRecipient

            finalRequest.merchant.bankInformation.bankDetails.paymentMode = request.paymentMode;
            self
                .MARS_DATA_SUBMIT_INTERNAL(finalRequest)
                .then(response => {
                    self.$q.loading.show({
                        delay: 0, // ms
                        spinnerColor: "purple-9",
                        message: "Saved.. Sending data to mars"
                    });
                    let key = this.data;
                    this.$q.localStorage.set("aa_t", key);
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
                        if (this.propLeadDeatils.mAtmOnboardingPlan.leadSource.sourceName == 'ATM' && this.propLeadDeatils.mAtmOnboardingPlan.planName == 'Kannor ATM Plan') {
           
                            finalRequest.merchant.mdrPlan.incentive.fixed = finalRequest.merchant.mdrPlan.incentive.fixed;
                            finalRequest.merchant.mdrPlan.incentive.percentage = finalRequest.merchant.mdrPlan.incentive.percentage;
                            finalRequest.merchant.mdrPlan.incentive.minimum = finalRequest.merchant.mdrPlan.incentive.minimum;
                            finalRequest.merchant.mdrPlan.incentive.minimumTxnValue = finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
                        } else {
                            finalRequest.merchant.mdrPlan.incentive.percentage = finalRequest.merchant.mdrPlan.incentive.percentage == 0 ? null : finalRequest.merchant.mdrPlan.incentive.percentage;
                            finalRequest.merchant.mdrPlan.incentive.fixed = finalRequest.merchant.mdrPlan.incentive.fixed == 0 ? null : finalRequest.merchant.mdrPlan.incentive.fixed;
                            finalRequest.merchant.mdrPlan.incentive.minimum = finalRequest.merchant.mdrPlan.incentive.minimum == 0 ? null : finalRequest.merchant.mdrPlan.incentive.minimum;
                            finalRequest.merchant.mdrPlan.incentive.minimumTxnValue = finalRequest.merchant.mdrPlan.incentive.minimumTxnValue == 0 ? null : finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
                        }
                    } else {
                        finalRequest.merchant.mdrPlan.incentive.percentage = finalRequest.merchant.mdrPlan.incentive.percentage == 0 ? null : finalRequest.merchant.mdrPlan.incentive.percentage;
                        finalRequest.merchant.mdrPlan.incentive.fixed = finalRequest.merchant.mdrPlan.incentive.fixed == 0 ? null : finalRequest.merchant.mdrPlan.incentive.fixed;
                        finalRequest.merchant.mdrPlan.incentive.minimum = finalRequest.merchant.mdrPlan.incentive.minimum == 0 ? null : finalRequest.merchant.mdrPlan.incentive.minimum;
                        finalRequest.merchant.mdrPlan.incentive.minimumTxnValue = finalRequest.merchant.mdrPlan.incentive.minimumTxnValue == 0 ? null : finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
                    }
                    finalRequest.merchant.paymentDetails.numberOfTerminals = 1;
                    let size = finalRequest.merchant.partnerInformation.length;
                    for (var i = 0; i < size; i++) {
                        finalRequest.merchant.partnerInformation[i].dob = this.commonDateFormatDOB1(finalRequest.merchant.partnerInformation[i].dob);
                    

                    }
                    // finalRequest.merchant.salesInformation.institutionCode = this.propLeadDeatils.institutionCode != null ? this.propLeadDeatils.institutionCode : finalRequest.merchant.salesInformation.institutionCode;
                    finalRequest.merchant.revParameters.isMTIDEnabled = this.propShowRejectComponent.data.subTid == true ? 1 : 0;
                    finalRequest.merchant.revParameters.bTID = this.propShowRejectComponent.data.baseTid != null ? this.propShowRejectComponent.data.baseTid : "null";
                    finalRequest.merchant.revParameters.scheme = this.propShowRejectComponent.data.scheme != null ? this.propShowRejectComponent.data.scheme : "null";
                    finalRequest.merchant.revParameters.rrId = this.propShowRejectComponent.data.rrId != null ? this.propShowRejectComponent.data.rrId : "null";
                    finalRequest.merchant.revParameters.tidIdentifier = this.propShowRejectComponent.data.tidIdentifier != null ? this.propShowRejectComponent.data.tidIdentifier : "null";
                    finalRequest.merchant.salesInformation.institutionCode = this.data;
                    finalRequest.merchant.partnerInformation.dob = this.propShowRejectComponent.merchant.partnerInformation.dob
                 
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
                            if (this.propLeadDeatils.leadSource.multiTidEnabled == true) {
                                let param = {
                                    merchantRefCode: feed_paramaters.merchantRefCode,
                                    marsDeviceId: this.propShowRejectComponent.data.id
                                };
                                self.SUBMIT_SUB_TID_MERCHANT_REF_CODE_DETAILS(param).then(response => {
                                    self.$q.notify({
                                        color: "positive",
                                        position: "bottom",
                                        message: "Successfully submitted to MARS",
                                        icon: "thumb_up"
                                    });
                                    self.$q.loading.hide();
                                });
                                self.updateLeadStatus({ leadId: self.$route.params.id, status: 104 })
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
                                    self.loadingSubTid({ leadId: self.$route.params.id });
                                    self.$emit("closeRejectModel");
                                    // self.$router.push('/sat/lead/validation/');
                                });
                        })
                        .catch(error => {
                           
                            this.merchant.companyInformation.constitutionName = this.propLeadDeatils.merchantType.merchantTypeName;
                            this.$set(
                                finalRequest.merchant.salesInformation,
                                "applicationDate",
                                this.commonDateFormatInvalidMARSformat(
                                    finalRequest.merchant.salesInformation.applicationDate
                                )
                            );
                            // this.$set(
                            //     finalRequest.merchant.partnerInformation,
                            //     "dob",
                            //     this.commonDateFormatInvalidMARSformat(
                            //         finalRequest.merchant.partnerInformation.dob
                            //     )
                            // );

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
                            this.$set(
                                finalRequest.merchant.businessInformation,
                                "lastTurnoverYear",
                                this.commonDateFormatInvalidMARSformat(
                                    finalRequest.merchant.businessInformation.lastTurnoverYear
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
                            }
                            else {
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
    }
};
</script>
