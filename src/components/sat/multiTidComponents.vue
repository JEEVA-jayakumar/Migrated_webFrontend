<template>
    <div>
        <q-card dense class="q-pa-xs">
            <!--no-backdrop-dismiss no-esc-dismiss-->
            <q-modal class="customModalOverlay" v-model="toggleModel"
                :content-css="{ padding: '100px', minWidth: '70vw' }">
                <div
                    class=" q-title q-px-lg q-py-md text-center justify-center text-weight-regular bottom-border text-grey-9 ">
                    <div class="col q-title">Base-Tid Configurations</div>
                    <div align="right">
                        <q-btn round @click="goToValidationPage()" outline color="dark" icon="clear" />
                    </div>
                </div>
                <div v-if="this.baseTidFlag == true" error-icon="warning" name="eleven" title="Multi" subtitle="TID">
                    <q-btn color="primary" class="q-ma-xs" icon="check" @click="fnCreateOrGetBaseTid()"
                        label="Create Base TID" />
                </div>
                <div v-if="this.SubTidField == true">
                    <div class="text-weight-regular text-grey-9 ">
                        <div class="col-md-7">
                            <q-card flat class="col-auto">
                                <q-card-subtitle class="text-weight-bold text-grey-9 row q-px-md q-py-md items-center">
                                    <span class="col">Base-Tid Configurations</span>
                                    <q-btn type="button" color="green" @click="getSubTidConfOrCreateSubTids()">Generate
                                        Sub-Tid</q-btn>
                                </q-card-subtitle>
                                <q-card-separator style="width:100%" />
                                <q-collapsible icon="explore" :label="menu.baseTidList.tid" class="col-auto q-ma-xs"
                                    flat v-for="menu in this.baseAndSubTidList" :key="menu.id" :to="menu.to" opened
                                    separator>
                                    <q-card flat>
                                        <table style="width:100%">
                                            <tr style="border-bottom: 1px solid rgb(231 231 231);">
                                                <th>Institution</th>
                                                <th>Lead Source</th>
                                                <th>Host Name</th>
                                                <th>RRID</th>
                                            </tr>
                                            <tr v-for="sub in menu.subTidConfsList">
                                                <td>{{ sub.institution.institutionName }}</td>
                                                <td>{{ sub.leadSource.sourceName }}</td>
                                                <td>{{ sub.masterHost.name }}</td>
                                                <td>{{ sub.institution.institutionRRCode }}|{{ sub.masterHost.hostRRCode
                                                }}|{{ sub.leadSource.sourceCode }}</td>
                                            </tr>
                                        </table>
                                    </q-card>
                                </q-collapsible>
                            </q-card>
                        </div>
                    </div>
                </div>


                <div v-if="this.genSubTidFlag == true" error-icon="warning" name="twelve" title="SUBTID" subtitle="TID">

                    <div class="text-weight-regular text-grey-9" v-if="this.SubTidField == false">
                        <div class="col-md-7">
                            <q-card flat class="col-auto">
                                <q-card-subtitle class="text-weight-bold text-grey-9 row q-px-md q-py-md items-center">
                                    <span class="col">List All Sub TID Details </span>
                                </q-card-subtitle>
                                <q-card-separator style="width:100%" />
                                <q-table  table-class="customTableClass" class="payment_verification_table capitalize"
                                    table-style="word-break: break-all" :data="listAllSubTidDetails" :columns="columns"
                                    row-key="name" :rows-per-page-options="[1, 3, 5, 7, 9, 12, 15]">
                                    <q-tr slot="top-row" slot-scope="props">
                                        <q-th v-for="col in props.columns" :key="col.name" :props="props">{{ col.label
                                        }}
                                        </q-th>
                                    </q-tr>
                                    <q-td slot="body-cell-baseTid" slot-scope="props" :props="props">
                                        <span class="label text-primary">{{ props.row.baseTid == null ? "NA" :
                                                props.row.baseTid
                                        }}</span>
                                    </q-td>
                                    <q-td slot="body-cell-action" slot-scope="props" :props="props">
                                        <!-- v-if="props.row.upiEnabled != true" -->
                                        <q-btn   highlight push class="q-mx-sm" color="positive" size="sm"
                                            @click="finalFormSubmit(props.row)" :disabled="props.row.submittedToMars">
                                            Submit
                                            To Mars </q-btn>
                                            <!-- <div v-if="props.row.upiEnabled == true">
                                            <q-btn class="q-mx-sm" highlight push  color="teal" size="sm" :disabled="props.row.tid == null || props.row.mid == null " 
                                            @click="additionalTid(listAllSubTidDetails)"> Additional Tid
                                            </q-btn>
                                           </div> -->
                                    </q-td>
                                </q-table>
                                <q-btn color="primary" :disabled="fndisable" class="text-center justify-center" @click="finalSubmit()"
                                label="Final Submit" />
                            </q-card>
                        </div>
                    </div>
                </div>
            </q-modal>
        </q-card>
        <multiTidPaymentMode v-if="showRejectPaymentMode" :showRejectPaymentMode="showRejectPaymentMode"
            :propShowRejectComponent="propsRejectAppend"  @closeRejectModel="finalFormSubmit">
        </multiTidPaymentMode>
        <!-- <additionaltidComp v-if="showRejectAdditionalTid" :showRejectAdditionalTid="showRejectAdditionalTid"
        :propToggleadditionalTid="propAdditionalTidDetails" @closeRejectModel="additionalTid"></additionaltidComp> -->
    </div>
</template>
  
<script>
import Vuelidate from "vuelidate";
import { easing } from "quasar";
import { LocalStorage } from "quasar";
import {Vuetify,VApp,VCard} from "vuetify";
import multiTidComponents from "./multiTidComponents.vue";
import multiTidPaymentMode from "./multiTidPaymentMode";
// import additionaltidComp from './additionaltidComp.vue';
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
    from "vuelidate/lib/validators";
Vue.use(Vuelidate);
import { date } from "quasar";
import moment from "moment";
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import { uid, filter } from "quasar";
import Vue from "vue";

import viewLeadDocumentsDataEntryComponent from "./viewLeadDocumentsDataEntryComponent.vue";
// import MarsErrorResponse from "../MarsErrorResponseHandler.vue";

import { helpers } from "vuelidate/lib/validators";
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
    props: ["multiTidComponentDetails", "propTogglemultiTidComponentDetails"],
    components: {
        multiTidPaymentMode,
    //    additionaltidComp,
    },
    data() {
        return {
            toggleModel: this.propTogglemultiTidComponentDetails,
            toggleModel1:[],
            showRejectPaymentMode: false,
            // showRejectAdditionalTid:false,
            propsRejectAppend: [],
            // propAdditionalTidDetails: [],
            baseAndSubTidList: [],
            subTidDuplicateData: [],
            listAllSubTidDetails: [],
            genSubTidFlag: false,
            flag: false,
            disabledListAllSubTidDetails: [],
            subTidArr: [],
            SubTidField: false,
            baseTidFlag: false,
            merchant: this.multiTidComponentDetails.merchant,
            propLeadDeatils: this.multiTidComponentDetails.propLeadDeatils,
            leadId: this.multiTidComponentDetails.leadId,
            formData: this.multiTidComponentDetails.diners,
            columns: [
                {
                    name: 'tid',
                    required: true,
                    label: 'Tid',
                    align: 'left',
                    field: row => {
                        return row.tid == null ? "NA" : row.tid
                    },
                    sortable: true
                },
                {
                    name: 'mid',
                    required: true,
                    label: 'Mid',
                    align: 'left',
                    field: row => {
                        return row.mid == null ? "NA" : row.mid
                    },
                    sortable: true
                },
                {
                    name: 'baseTid',
                    required: true,
                    label: 'BaseTid',
                    align: 'left',
                    field: 'baseTid',
                    sortable: true
                },
                {
                    name: 'institutionCode',
                    required: true,
                    label: 'Institution Code',
                    align: 'left',
                    field: 'institutionCode',
                    sortable: true
                },
                //subTid
                {
                    name: 'subTid',
                    required: true,
                    label: 'SubTid',
                    align: 'left',
                    field: 'subTid',
                    sortable: true
                },
                //tidIdentifier
                {
                    name: 'tidIdentifier',
                    required: true,
                    label: 'Tid Identifier',
                    align: 'left',
                    field: 'tidIdentifier',
                    sortable: true
                },
                {
                    name: 'action',
                    required: true,
                    label: '',
                    align: 'center',
                    field: 'action',
                    sortable: true
                }
            ],
            formdata: {
                fixed: 0.0,
                percentage: 0.0,
                minimum: 0.0
            },
            propsRejectAppend: {
                data:{},
                holdPayment: "",
                merchant: {},
                propLeadDeatils: {},
                leadId: "",
                diners: {}
            },
            /* END >> Modal props */
            /* START >> Rental charges */
            // formData: {
            // },
            error: {
                field: {
                    merchant: {
                        partnerInformation: [
                            {
                                name: {
                                    alert: false,
                                    issue: "",
                                    value: ""
                                },
                                dob: {
                                    alert: false,
                                    issue: "",
                                    value: ""
                                },
                                address: {
                                    alert: false,
                                    issue: "",
                                    value: ""
                                },
                                pan: {
                                    alert: false,
                                    issue: "",
                                    value: ""
                                },
                                pin: {
                                    alert: false,
                                    issue: "",
                                    value: ""
                                },
                                stateRefCode: {
                                    alert: false,
                                    issue: "",
                                    value: ""
                                },
                                cityRefCode: {
                                    alert: false,
                                    issue: "",
                                    value: ""
                                },
                                contactMobile: {
                                    alert: false,
                                    issue: "",
                                    value: ""
                                },
                                contactEmail: {
                                    alert: false,
                                    issue: "",
                                    value: ""
                                }
                            }
                        ],
                    }
                }
            }
        };
    },
    created() {
        this.loadBaseTidList();
    },
    beforeMount() {
        this.merchant = this.multiTidComponentDetails.merchant;
        this.merchant.leadId = this.leadId;
        this.propLeadDeatils = this.multiTidComponentDetails.propLeadDeatils;
        this.holdPayment = this.multiTidComponentDetails.holdPayment;

        this.formData = this.multiTidComponentDetails.diners;
    },
    computed: {
        ...mapGetters("mars_dataSubmit", ["marsSavedDataFromInternal"]),
        fndisable: function(){
            let size = this.listAllSubTidDetails.length;
            for(var i=0; i<size; i++){
                // let data = this.listAllSubTidDetails[i].submittedToMars == true
           
                if(this.listAllSubTidDetails[i].submittedToMars == true && this.listAllSubTidDetails[i+1].submittedToMars == true ){
                    return false
                    
                }else{
                    return true
                }
            }
        }
    },
    methods: {
        ...mapActions("mars_dataSubmit", [
            "MARS_DATA_SUBMIT_INTERNAL",
            "MARS_DATA_SUBMIT_EXTERNAL",
            "MARS_DATA_EXTERNAL_SUBMIT_RESPONSE",
            "SUBMIT_SUB_TID_MERCHANT_REF_CODE_DETAILS",
            "FETCH_SAVED_DATA_FROM_OWN_DB"
        ]),
        ...mapActions("leadInformationVasMapping", ["LEAD_INFORMATION_VAS_MAPPING_DERTAILS", "SAVEING_THE_LEAD_STATUS_DETAILS", "GET_LEAD_INFORMATION_VAS_MAPPING_DERTAILS", "CREATE_BASE_TID", "LOAD_GET_SUB_TID_LIST", "GET_BASE_TID_LIST", "GET_SUB_TID_LIST", "CREATE_SUB_TIDS_LIST"]),
        //Loading base tids if any
        loadBaseTidList() {
            this.GET_BASE_TID_LIST(this.merchant).then(response => {
                if (response.status == 200) {
                    this.$q.notify({
                        color: "positive",
                        position: "bottom",
                        message: response.body.message,
                        icon: "thumb_up"
                    });
                    this.baseAndSubTidList = [];
                    let res = response.body.data;
                    res.baseTids.map(bTids => {
                        this.baseAndSubTidList.push({ baseTidList: bTids, subTidConfsList: res.subTidConfs })
                    })
                    this.baseTidFlag = false;
                    this.SubTidField = true;
                } else {
                    this.$q.notify({
                        color: "negative",
                        position: "bottom",
                        message: "Something went wrong!",
                        icon: "clear"
                    });
                }
            }).catch(error => {
                this.baseTidFlag = true;
                this.SubTidField = false;
                // this.$q.notify({
                //     color: "negative",
                //     position: "bottom",
                //     message: error.body != null ? error.body.message : "Base TID creation failed!",
                //     icon: "clear"
                // });
                this.$q.loading.hide();
            });
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
        getSubTidConfOrCreateSubTids() {
            //load sub tids if created already
            this.GET_SUB_TID_LIST(this.merchant).then(response => {
                if (response.status == 200) {
                    this.$q.notify({
                        color: "positive",
                        position: "bottom",
                        message: response.body.message,
                        icon: "thumb_up"
                    });
                    this.subTidDuplicateData = [];
                    let res = response.body.data;
                    this.listAllSubTidDetails = res;
                    let res1 = response.body.data.submittedToMars;
                    this.disabledListAllSubTidDetails = res1;
                    this.genSubTidFlag = true;
                    this.SubTidField = false;
                    this.baseTidFlag = false;
                } else {
                    this.$q.notify({
                        color: "negative",
                        position: "bottom",
                        message: "Something went wrong!",
                        icon: "clear"
                    });
                }
            }).catch(error => {
                if (error.status == 404) {
                    // create sub tids 
                    this.CREATE_SUB_TIDS_LIST(this.merchant).then(response => {
                        if (response.status == 200) {
                            this.$q.notify({
                                color: "positive",
                                position: "bottom",
                                message: response.body.message,
                                icon: "thumb_up"
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
                                icon: "clear"
                            });
                        }
                    }).catch(error => {
                        this.$q.notify({
                            color: "negative",
                            position: "bottom",
                            message: error.body != null ? error.body.message : "Sub TID creation failed!",
                            icon: "clear"
                        });
                        this.$q.loading.hide();
                    });
                }
                this.genSubTidFlag = false;
                this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: error.body != null ? error.body.message : "Sub TID generation failed!",
                    icon: "clear"
                });
                this.$q.loading.hide();
            });
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
        goToValidationPage() {
            this.$router.push({ name: "leadValidation" })
        },

        fnCreateOrGetBaseTid() {
            this.CREATE_BASE_TID(this.merchant)
                .then(response => {
                    if (response.status == 200) {
                        this.$q.notify({
                            color: "positive",
                            position: "bottom",
                            message: response.message,
                            icon: "thumb_up"
                        });
                        this.baseTidFlag = false
                        this.SubTidField = true;
                        this.loadBaseTidList();

                    } else {
                        this.$q.notify({
                            color: "negative",
                            position: "bottom",
                            message: "Something went wrong!",
                            icon: "clear"
                        });
                    }
                    this.updateLeadStatus({ leadId: this.$route.params.id, status: 103 });
                })
                .catch(error => {
                    this.baseTidFlag = true;
                    this.SubTidField = false;
                    this.$q.notify({
                        color: "negative",
                        position: "bottom",
                        message: error.body != null ? error.body.message : "Base TID creation failed!",
                        icon: "clear"
                    });
                    this.$q.loading.hide();
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
                return moment(selectedDate).format("DD/MM/YYYY");
            }
        },
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
        loadBaseTidList() {
            this.GET_BASE_TID_LIST(this.merchant).then(response => {
                if (response.status == 200) {
                    this.$q.notify({
                        color: "positive",
                        position: "bottom",
                        message: response.body.message,
                        icon: "thumb_up"
                    });
                    this.baseAndSubTidList = [];
                    let res = response.body.data;
                    res.baseTids.map(bTids => {
                        this.baseAndSubTidList.push({ baseTidList: bTids, subTidConfsList: res.subTidConfs })
                    })
                    this.baseTidFlag = false;
                    this.SubTidField = true;
                } else {
                    this.$q.notify({
                        color: "negative",
                        position: "bottom",
                        message: "Something went wrong!",
                        icon: "clear"
                    });
                }
            }).catch(error => {
                this.baseTidFlag = true;
                this.SubTidField = false;
                this.$q.loading.hide();
            });
        },
        finalSubmit() {
            this.updateLeadStatus({ leadId: this.leadId, status: 9 });
            this.$router.push({ name: "leadValidation" })
        },
        finalFormSubmit(request) {
            this.showRejectPaymentMode = !this.showRejectPaymentMode;
            this.propsRejectAppend.holdPayment = this.holdPayment;
      
            this.propsRejectAppend.data= request;
            this.propsRejectAppend.merchant = this.merchant;
            this.propsRejectAppend.propLeadDeatils = this.propLeadDeatils;
            this.propsRejectAppend.leadId = this.$route.params.id;         
             this.loadingSubTid({ leadId: this.propsRejectAppend.leadId });
           this.propsRejectAppend.diners = this.propsRejectAppend.merchant.mdrPlan.diners;
        //    this.propsRejectAppend.diners = this.formdata;
        },
        // additionalTid(request){
        //     this.showRejectAdditionalTid = !this.showRejectAdditionalTid;
        //     this.propAdditionalTidDetails=request;

        // },

        // finalFormSubmit(request) {
        //     this.subTidArr = [];
        //     this.subTidArr.push({ request });
        //     let self = this;
        //     self.$q.loading.show({
        //         delay: 0, // ms
        //         spinnerColor: "purple-9",
        //         message: "Validating .."
        //     });
        //     const finalRequest = { action: 2, merchant: self.merchant };
        //     finalRequest.merchant.leadId = self.$route.params.id;
        //     finalRequest.merchant.holdPayment = finalRequest.holdPayment;
        //     let a = {
        //         ...finalRequest.merchant.mdrPlan
        //     };
        //     finalRequest.merchant.mdrPlan = { ...a, diners: this.formData }
        //     finalRequest.merchant.businessInformation.currentPosName =
        //         finalRequest.merchant.businessInformation.currentPosName == "N"
        //             ? ""
        //             : finalRequest.merchant.businessInformation.currentPosName;
        //     finalRequest.merchant.companyInformation.constitutionName =
        //         finalRequest.merchant.companyInformation.constitutionName == "61"
        //             ? "60"
        //             : finalRequest.merchant.companyInformation.constitutionName;
        //     finalRequest.merchant.paymentDetails.emiStartDate = this.commonDateFormatDOB1(finalRequest.merchant.paymentDetails.emiStartDate),
        //         finalRequest.merchant.revParamAndLeadInfo = { bijlipaySwitch: request.leadInformation.bijlipaySwitch, vasInstanceMapping: request.leadInformation.vasInstanceMapping };
        //     finalRequest.merchant.revParameters.notificationRecipient = finalRequest.merchant.revParameters.notificationRecipient == "N" ? null : finalRequest.merchant.revParameters.notificationRecipient
     
        //     self
        //         .MARS_DATA_SUBMIT_INTERNAL(finalRequest)
        //         .then(response => {
        //             self.$q.loading.show({
        //                 delay: 0, // ms
        //                 spinnerColor: "purple-9",
        //                 message: "Saved.. Sending data to mars"
        //             });
        //             let key = request.institutionCode;

        //             this.$q.localStorage.set("aa_t", key);
        //             delete this.merchant.customIncentiveRates[0].add;
        //             delete this.merchant.customIncentiveRates[1].add;
        //             delete this.merchant.customIncentiveRates[2].add;
        //             delete this.merchant.customIncentiveRates[3].add;
        //             delete this.merchant.customIncentiveRates[4].add;

        //             delete finalRequest.merchant.leadId;
        //             delete finalRequest.action;
        //             delete finalRequest.merchant.revParamAndLeadInfo;
        //             delete finalRequest.merchant.holdPayment;
        //             delete finalRequest.merchant.SharingDiscountFee;
        //             if (this.propLeadDeatils.mAtmOnboardingPlan != null) {
        //                 if (this.propLeadDeatils.mAtmOnboardingPlan.leadSource.sourceName == 'ATM' && this.propLeadDeatils.mAtmOnboardingPlan.planName == 'Kannor ATM Plan') {
        //               
        //                     finalRequest.merchant.mdrPlan.incentive.fixed = finalRequest.merchant.mdrPlan.incentive.fixed;
        //                     finalRequest.merchant.mdrPlan.incentive.percentage = finalRequest.merchant.mdrPlan.incentive.percentage;
        //                     finalRequest.merchant.mdrPlan.incentive.minimum = finalRequest.merchant.mdrPlan.incentive.minimum;
        //                     finalRequest.merchant.mdrPlan.incentive.minimumTxnValue = finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
        //                 } else {
        //                     
        //                     finalRequest.merchant.mdrPlan.incentive.percentage = finalRequest.merchant.mdrPlan.incentive.percentage == 0 ? null : finalRequest.merchant.mdrPlan.incentive.percentage;
        //                     finalRequest.merchant.mdrPlan.incentive.fixed = finalRequest.merchant.mdrPlan.incentive.fixed == 0 ? null : finalRequest.merchant.mdrPlan.incentive.fixed;
        //                     finalRequest.merchant.mdrPlan.incentive.minimum = finalRequest.merchant.mdrPlan.incentive.minimum == 0 ? null : finalRequest.merchant.mdrPlan.incentive.minimum;
        //                     finalRequest.merchant.mdrPlan.incentive.minimumTxnValue = finalRequest.merchant.mdrPlan.incentive.minimumTxnValue == 0 ? null : finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
        //                 }
        //             } else {
        //            
        //                 finalRequest.merchant.mdrPlan.incentive.percentage = finalRequest.merchant.mdrPlan.incentive.percentage == 0 ? null : finalRequest.merchant.mdrPlan.incentive.percentage;
        //                 finalRequest.merchant.mdrPlan.incentive.fixed = finalRequest.merchant.mdrPlan.incentive.fixed == 0 ? null : finalRequest.merchant.mdrPlan.incentive.fixed;
        //                 finalRequest.merchant.mdrPlan.incentive.minimum = finalRequest.merchant.mdrPlan.incentive.minimum == 0 ? null : finalRequest.merchant.mdrPlan.incentive.minimum;
        //                 finalRequest.merchant.mdrPlan.incentive.minimumTxnValue = finalRequest.merchant.mdrPlan.incentive.minimumTxnValue == 0 ? null : finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
        //             }
        //             finalRequest.merchant.paymentDetails.numberOfTerminals = 1;
        //             let size = finalRequest.merchant.partnerInformation.length;
        //             for (var i = 0; i < size; i++) {
        //                 finalRequest.merchant.partnerInformation[i].dob = this.commonDateFormatDOB1(finalRequest.merchant.partnerInformation[i].dob);
        //             }
        //             finalRequest.merchant.salesInformation.institutionCode = request.institutionCode != null ? request.institutionCode : finalRequest.merchant.salesInformation.institutionCode;
        //             finalRequest.merchant.revParameters.isMTIDEnabled = request.subTid == true ? 1 : 0;
        //             finalRequest.merchant.revParameters.bTID = request.baseTid != null ? request.baseTid : "null";
        //             finalRequest.merchant.revParameters.scheme = request.scheme != null ? request.scheme : "null";
        //             finalRequest.merchant.revParameters.rrId = request.rrId != null ? request.rrId : "null";
        //             finalRequest.merchant.revParameters.tidIdentifier = request.tidIdentifier != null ? request.tidIdentifier : "null";
        //             self
        //                 .MARS_DATA_SUBMIT_EXTERNAL({
        //                     params: finalRequest,
        //                     leadStatus: this.propLeadDeatils.leadStatus,
        //                     refNumber: this.propLeadDeatils.merchantRefCode
        //                 })

        //                 .then(response => {
        //                     let feed_paramaters;
        //                     if (response.status == 204) {
        //                         feed_paramaters = {
        //                             applicationNumber: this.propLeadDeatils.applicationNumber,
        //                             merchantRefCode: this.propLeadDeatils.merchantRefCode
        //                         };
        //                     } else {
        //                         feed_paramaters = response.body;
        //                     }
        //                     self.$q.loading.show({
        //                         delay: 0, // ms
        //                         spinnerColor: "purple-9",
        //                         message: "Great.. All set to go"
        //                     });
        //                     if (request.leadInformation.leadSource.multiTidEnabled == true) {
        //                         let param = {
        //                             merchantRefCode: feed_paramaters.merchantRefCode,
        //                             marsDeviceId: request.id
        //                         };
        //                         self.SUBMIT_SUB_TID_MERCHANT_REF_CODE_DETAILS(param).then(response => {
        //                             self.$q.notify({
        //                                 color: "positive",
        //                                 position: "bottom",
        //                                 message: "Successfully submitted to MARS",
        //                                 icon: "thumb_up"
        //                             });
        //                             self.$q.loading.hide();
        //                         });
        //                         self.updateLeadStatus({ leadId: self.$route.params.id, status: 104 })
        //                     }
        //                     self
        //                         .MARS_DATA_EXTERNAL_SUBMIT_RESPONSE({
        //                             request: feed_paramaters,
        //                             leadId: self.$route.params.id
        //                         })
        //                         .then(response => {
        //                             self.$q.notify({
        //                                 color: "positive",
        //                                 position: "bottom",
        //                                 message: "Successfully submitted to MARS",
        //                                 icon: "thumb_up"
        //                             });
        //                             self.$q.loading.hide();
        //                             self.loadingSubTid({ leadId: self.$route.params.id });
        //                         });
        //                 })
        //                 .catch(error => {
        //                     this.merchant.companyInformation.constitutionName = this.propLeadDeatils.merchantType.merchantTypeName;
        //                     this.$set(
        //                         finalRequest.merchant.salesInformation,
        //                         "applicationDate",
        //                         this.commonDateFormatInvalidMARSformat(
        //                             finalRequest.merchant.salesInformation.applicationDate
        //                         )
        //                     );

        //                     this.$set(
        //                         finalRequest.merchant.salesInformation,
        //                         "aggreementDate",
        //                         this.commonDateFormatInvalidMARSformat(
        //                             finalRequest.merchant.salesInformation.aggreementDate
        //                         )
        //                     );

        //                     this.$set(
        //                         finalRequest.merchant.salesInformation,
        //                         "loanDisbursementDate",
        //                         this.commonDateFormatInvalidMARSformat(
        //                             finalRequest.merchant.salesInformation.loanDisbursementDate
        //                         )
        //                     );

        //                     this.$set(
        //                         finalRequest.merchant.salesInformation,
        //                         "tenureStartDate",
        //                         this.commonDateFormatInvalidMARSformat(
        //                             finalRequest.merchant.salesInformation.tenureStartDate
        //                         )
        //                     );

        //                     this.$set(
        //                         finalRequest.merchant.companyInformation,
        //                         "establishYear",
        //                         this.commonDateFormatInvalidMARSformat(
        //                             finalRequest.merchant.companyInformation.establishYear
        //                         )
        //                     );

        //                     this.$set(
        //                         finalRequest.merchant.bankInformation.collectionDetails,
        //                         "chequeDepositedDate",
        //                         this.commonDateFormatInvalidMARSformat(
        //                             finalRequest.merchant.bankInformation.collectionDetails
        //                                 .chequeDepositedDate
        //                         )
        //                     );

        //                     this.$set(
        //                         finalRequest.merchant.bankInformation.collectionDetails,
        //                         "collectedDate",
        //                         this.commonDateFormatInvalidMARSformat(
        //                             finalRequest.merchant.bankInformation.collectionDetails
        //                                 .collectedDate
        //                         )
        //                     );

        //                     this.$set(
        //                         finalRequest.merchant.bankInformation.collectionDetails,
        //                         "chequeDate",
        //                         this.commonDateFormatInvalidMARSformat(
        //                             finalRequest.merchant.bankInformation.collectionDetails
        //                                 .chequeDate
        //                         )
        //                     );


        //                     this.$set(
        //                         finalRequest.merchant.businessInformation,
        //                         "memberSince",
        //                         this.commonDateFormatInvalidMARSformat(
        //                             finalRequest.merchant.businessInformation.memberSince
        //                         )
        //                     );
        //                     this.$set(
        //                         finalRequest.merchant.businessInformation,
        //                         "lastTurnoverYear",
        //                         this.commonDateFormatInvalidMARSformat(
        //                             finalRequest.merchant.businessInformation.lastTurnoverYear
        //                         )
        //                     );

        //                     if (error.data.hasOwnProperty("errorDetails")) {
        //                         let OThis = this;
        //                         _.map(error.data.errorDetails, actual => {
        //                             let splitted = actual.field.split("/");
        //                             if (splitted[1].slice(0, 18) == "partnerInformation") {
        //                                 let findPartnersErrorIndex = actual.field
        //                                     .split("partnerInformation")[1]
        //                                     .slice(1, 2);
        //                                 let computeSplitted = splitted[splitted.length - 1];
        //                                 let fieldErrorFound = eval(`
        //                 OThis.$v.viewBinding.partnersArr.$each.$iter[
        //                   ${findPartnersErrorIndex}
        //                 ].${computeSplitted}`);
        //                                 fieldErrorFound.$model = "";
        //                                 OThis.error.tab.partnerInformation = true;

        //                                 let generateErrorMessage = eval(`
        //                 OThis.error.field.merchant.partnerInformation[
        //                   ${findPartnersErrorIndex}
        //                 ]`);
        //                                 generateErrorMessage.alert = true;
        //                                 generateErrorMessage.issue = actual.issue;
        //                                 generateErrorMessage.value = actual.value;
        //                             } else {
        //                                 let splittingErrorField = `OThis.$v.${splitted.join(
        //                                     "."
        //                                 )}`;
        //                                 let fieldErrorFound = eval(splittingErrorField);
        //                                 fieldErrorFound.$model = "";
        //                                 OThis.$set(OThis.error.tab, splitted[1], true);

        //                                 let generateErrorMessage = eval(
        //                                     `OThis.error.field.${splitted.join(".")}`
        //                                 );
        //                                 generateErrorMessage.alert = true;
        //                                 generateErrorMessage.issue = actual.issue;
        //                                 generateErrorMessage.value = actual.value;
        //                             }
        //                         });
        //                         this.$q.notify({
        //                             color: "negative",
        //                             position: "bottom",
        //                             message: `${error.data.message}`,
        //                             icon: "thumb_down"
        //                         });
        //                     }
        //                     else {
        //                         this.$q.notify({
        //                             color: "negative",
        //                             position: "bottom",
        //                             message: `${error.data.message}`,
        //                             icon: "thumb_down"
        //                         });
        //                     }
        //                     self.$q.loading.hide();
        //                 });

        //         })
        //         .catch(() => {
        //             self.$q.loading.hide();
        //         });

        // },

    }
};
</script>
<style scoped>
label {
    padding: 10px;
    display: table;
}

input[type="file"] {
    display: none;
}
</style>
  
