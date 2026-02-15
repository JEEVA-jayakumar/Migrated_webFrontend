<template>
    <div>
        <q-dialog :model-value="showRejectModel" @hide="emitToggleReject(showRejectModel)"
            @escape-key="emitToggleReject(showRejectModel)" :content-css="{ padding: '50px' }">
            <div>
                <div align="center" class="text-subtitle1 q-mb-md capitalize">
                    {{ propShowRejectComponent.allocate_region.regionAreaName }}</div>
                <div align="center" class="text-light-blue text-h6 q-mb-md">#{{ propShowRejectComponent.pod_number }}
                </div>
                <!-- <div align="left" class="text-weight-light text-grey-8 q-mb-md">Reason</div> -->
                <!-- <div class="gutter-xs">
            <q-radio 
            @blur="$v.formData.leadVerificationStatus.reasonType.$touch"      
            :error="$v.formData.leadVerificationStatus.reasonType.$error" v-model="formData.leadVerificationStatus.reasonType" val="Short Fund" color="grey-9" label="Short Fund" />
            <q-radio @blur="$v.formData.leadVerificationStatus.reasonType.$touch"      
            :error="$v.formData.leadVerificationStatus.reasonType.$error" v-model="formData.leadVerificationStatus.reasonType" val="Excess Fund" color="grey-9" label="Excess Fund" />
            <q-radio @blur="$v.formData.leadVerificationStatus.reasonType.$touch"      
            :error="$v.formData.leadVerificationStatus.reasonType.$error" v-model="formData.leadVerificationStatus.reasonType" val="Cheque Bounce" color="grey-9" label="Cheque Bounce" />
            <q-radio @blur="$v.formData.leadVerificationStatus.reasonType.$touch"      
            :error="$v.formData.leadVerificationStatus.reasonType.$error" v-model="formData.leadVerificationStatus.reasonType" val="No Fund" color="grey-9" label="No Fund" />
            <q-radio @blur="$v.formData.leadVerificationStatus.reasonType.$touch"      
            :error="$v.formData.leadVerificationStatus.reasonType.$error" v-model="formData.leadVerificationStatus.reasonType" val="Others" color="grey-9" label="Others" />
          </div> -->
                <q-input type="textarea" placeholder="Type.." @blur="$v.formData.regionRemarks.$touch"
                    :error="$v.formData.regionRemarks.$error" class="q-my-md" color="grey-9" align="left" value=""
                    v-model="formData.regionRemarks" />
                <q-btn color="negative" class="q-ma-sm float-right" @click="PodRejectDetails(formData)" align="right"
                    label="Reject" />
                <q-btn align="right" color="grey-9" class="float-right q-ma-sm"
                    @click="emitToggleReject(showRejectModel)">Cancel
                </q-btn>
            </div>
        </q-dialog>
    </div>
</template>
<script>
import {
    required,
    requiredIf,
    email,
    minLength,
    maxLength,
    alpha,
    alphaNum,
    numeric
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
    props: ["showRejectModel", "propShowRejectComponent"],

    data() {
        return {
            //Reject reason checkbox
            //   formData: {
            //     leadInformation: {
            //       verifiedFinanceStatus: 3
            //     },
            //     leadVerificationStatus: {
            //       status: 0,
            //       fieldName: "Finance",
            //       reasonType: "",
            //       reason: ""
            //     },
            //     leadId: this.propShowRejectComponent.leadId
            //   }
            formData: {
                regionRemarks: "",
            }
        };
    },



    validations: {
        formData: {
            regionRemarks: {
                required
            },
        }
    },
    created() {
        // this.emitToggleReject();
    },

  
    computed: {
        ...mapGetters("regionalInventoryDetails", ["getsparePartsSetsAndCounts", "getregionalInventoryPodDetails", "getregionalInventoryStocksPodDetails", "getregionalInventoryAllocatedSoPodDetails"]),

    },

    methods: {
        ...mapActions("Finance", ["REJECT_FINANCE_EXCEPTION"]),
        ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
        ...mapActions("singlePodData", ["FETCH_SINGLE_POD_DETAILS"]),
        ...mapActions("regionalInventoryDetails", ["FETCH_SPARE_PARTS_SETS_AND_COUNTS", "FETCHING_INCOMING_POD_LIST_DETAILS", "APPROVE_INCOMING_POD_DETAILS", "REJECT_INCOMING_POD_DETAILS", "FETCHING_INCOMING_STOCKS_POD_LIST_DETAILS", "FETCHING_INCOMING_ALLOCATED_SO_POD_LIST_DETAILS"]),
        emitToggleReject(showRejectModel) {
            this.$emit("closeRejectModel", "reloadPaymentTrackerData");
        },



        PodRejectDetails(reqdata) {
            this.$v.formData.$touch();
            if (this.$v.formData.$error) {
                this.$q.notify("Please review fields again.");
            } else {
                this.$q
                    .dialog({
                        title: "Confirm",
                        message: "Are you sure want to Reject?",
                        ok: "Continue",
                        cancel: "Cancel"
                    })
                    .then(() => {
                        let data = {
                            pod_number: this.propShowRejectComponent.pod_number
                        };
                        this.FETCH_SINGLE_POD_DETAILS(data).then(response => {

                            let param = [];
                            param = response.data.data
                            param.soRemarks = response.data.data.soRemarks == 'null' ? "null" : reqdata.soRemarks
                            param.regionRemarks = response.data.data.regionRemarks == 'null' ? "null" : reqdata.regionRemarks;
                            this.REJECT_INCOMING_POD_DETAILS(param)
                                .then(() => {
                                    this.$q.loading.hide();
                                    this.$q.notify({
                                        color: "positive",
                                        position: "bottom",
                                        message: "Successfully updated!",
                                        icon: "thumb_up"
                                    });
                                    this.$emit("reloadPaymentTrackerData")
                                    this.emitToggleReject()
                                    this.$router.push("/sat/inventory/allocation");
                                })
                                .catch(error => {
                                    this.$q.loading.hide();
                                    this.$q.notify({
                                        color: "negative",
                                        position: "bottom",
                                        message:
                                            error.body.message == null
                                                ? "Please Try Again Later !"
                                                : error.body.message,
                                        icon: "thumb_down"
                                    });
                                });
                            this.$router.push("/sat/inventory/allocation");
                        })
                            .catch(error => {
                                this.$q.loading.hide();
                                this.$q.notify({
                                    color: "negative",
                                    position: "bottom",
                                    message:
                                        error.body.message == null
                                            ? "Please Try Again Later !"
                                            : error.body.message,
                                    icon: "thumb_down"
                                });
                            });


                    })
        }

    },
}
    };
</script>
