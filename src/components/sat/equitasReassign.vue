<template>
    <q-page>
        <q-dialog minimized no-backdrop-dismiss class="customModalOverlay" v-model="toggleModel"
            :content-css="{ padding: '50px', minWidth: '30vw' }">
            <!-- <q-dialog
        minimized no-backdrop-dismiss v-model="toggleModel"
        :content-css="{padding:'30px',minWidth: '40vw'}"
      >  -->
            <div class="row">
                <div class="col-12 text-h6 q-pa-md text-weight-regular bottom-border">
                    RE-Assign
                </div>
                <!-- START >> Setup MDR details -->
                <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
                    <q-card style="width:250%">
                        <q-card-section>
                            <q-list no-border>
                                <div class="col-md-12">
                                    <q-select filter clearable color="grey-9" v-model="formData.so" :options="assignToOptions"
                                        float-label="Select SO*" />
                                </div>
                                <div class="col-md-12">
                                    <q-select color="grey-9" v-model="formData.Reassign" :options="ReasonListOptions"
                                        float-label="Select Reason List*" />
                                </div>
                                <!-- {{formData.Reassign}} -->
                                <div v-if="this.formData.Reassign == 'Other reason'">
                                    <q-input type="textarea" placeholder="Reason Type.." class="q-my-md" color="grey-9"
                                        align="left" value="" v-model="formData.reason" />
                                </div>
                            </q-list>
                        </q-card-section>
                        <q-card-actions align="end">
                            <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8"
                                @click="emitfnshowUpdateOpenedExternal()">Cancel</q-btn>
                            <q-btn label="submit" @click="fnEDITREOPEN(formData)" color="purple-9" />
                        </q-card-actions>
                    </q-card>
                </div>
                <!-- END >> Setup MDR details -->
            </div>
        </q-dialog>
    </q-page>
</template>
  
<script>
/* START >> Modal components Lead source, device, merchant type */
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
    props: ["propShowReassign", "propRowDetails"],
    name: "MDRdetails",
    data() {
        return {
            /* START >> Modal props */
            toggleModel: this.propShowReassign,
            showLeadSourceModal: false,
            showDeviceDetailModal: false,
            showMerchantModal: false,
            assignToOptions: [],
            ReasonListOptions: [],
            formData: {
                so: "",
                Reassign: "",
                reason: ""
            },
                   };
    },

    beforeMount() {
        console.log("propRowDetails ------->", JSON.stringify(this.propRowDetails));
        this.implementationExecutiveList();
        this.ReassignReasonList();
    },

    computed: {
        ...mapGetters("ImplementationExecutive", [
            "getImplementationExecutiveList"
        ]),
        ...mapGetters("reassignReasonList", ["getreassignReasonList"])
    },

    methods: {
        ...mapActions("ImplementationExecutive", ["IMPLEMENTATION_EXECUTIVE_LIST"]),
        ...mapActions("reassignReasonList", ["REASSIGN_REASON_LIST",]),
          ...mapActions("DeviceReplacement", [
      "EQUITAS_SOUNDBOX_REASSIGNED_REASON_TYPE_DETAILS"
    ]),
        emitfnshowUpdateOpenedExternal() {
            this.$emit("emitfnshowUpdateOpenedExternal");
        },
        fnEDITREOPEN(request) {
            this.$q
                .dialog({
                    title: "Confirm",
                    message: "Are you sure want to reAssign the lead?",
                    ok: "Continue",
                    cancel: "Cancel"
                })
                .then(() => {
                    this.$q.loading.show({
                        delay: 0, // ms
                        spinnerColor: "purple-9",
                        message: "Processing .."
                    });
                    let marsDeviceIds = []
                    marsDeviceIds.push(this.propRowDetails.id);
                    let param = {
                        userId: request.so,
                       marsDeviceIds:{
                       marsDeviceIds:marsDeviceIds,
                       remarks:this.formData.reason,
                       reason:this.formData.Reassign
                    }, 
                    };
                    this.EQUITAS_SOUNDBOX_REASSIGNED_REASON_TYPE_DETAILS(param)
                        .then(() => {
                            this.$emit("emitfnshowUpdateOpenedExternal");
                            this.$q.loading.hide()
                            this.$q.notify({
                                color: "positive",
                                position: "bottom",
                                message: "Updated Successfully",
                                icon: "thumb_up"
                            });
                        })
                        .catch(error => {
                            this.$q.loading.hide()
                            this.$q.notify({
                                color: "negative",
                                position: "bottom",
                                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                                icon: "thumb_down"
                            });
                        });
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

        implementationExecutiveList() {
            this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
                let assumeArr = [];
                this.getImplementationExecutiveList.map(function (value) {
                    assumeArr.push({ label: value.name+" | "+value.employeeID+" | "+value.email, value: value.id });
                });
                this.assignToOptions = assumeArr;
            });
        },

        ReassignReasonList() {
            this.REASSIGN_REASON_LIST().then(response => {
                console.log("REASSIGN_REASON_LIST ------->", JSON.stringify(response));
                let assume = [];
                this.getreassignReasonList.map(function (value) {
                    assume.push({ label: value.name, value: value.name });
                });
                this.ReasonListOptions = assume;
            });
        }
    }
};
</script>
  
<style>

</style>
  
