<template>
    <div>
      <q-dialog
        :model-value="showRequestModal"
        @hide="emitToggleLost(showRequestModal)"
        @escape-key="emitToggleLost(showRequestModal)"
        :content-css="{ padding: '25px' }"
      >
        <div>
          <div align="center" class="text-weight-light text-grey-8 q-mb-md">
            <h5><b>Reason</b></h5>
          </div>
          <div align="left" class="text-weight-light text-grey-8 q-mb-md">
            Add your Reason and then submit...
          </div>
  
          <div class="gutter-xs">
            <q-input
              type="textarea"
              placeholder="Type.."
              @blur="$v.remarks.$touch"
              :error="$v.remarks.$error"
              class="q-my-md"
              color="grey-9"
              align="left"
              value=""
              v-model="remarks"
              @input="fnMapRemarks"
            />
          </div>
          <q-btn
            color="positive"
            class="q-ma-sm float-right"
            @click="rejectSelfAssign(formData.data)"
            align="right"
            label="Submit"
          />
          <q-btn
            align="right"
            color="grey-9"
            class="float-right q-ma-sm"
            @click="emitToggleLost(showRequestModal)"
            >Cancel
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
    props: ["showRequestModal", "showRequestComponent"],
  
    data() {
      return {
        dataCopy: [],
        remarks: "",
        formData: {
          data: this.showRequestComponent
        }
      };
    },
  
    validations: {
      remarks: {
        required
      }
    },
    error: {
      remarks: {
        alert: false,
        issue: "",
        value: ""
      }
    },
    beforeMount() {
      // this.dataCopy = this.showRequestComponent;
    
      // this.dataCopy = this.showRequestComponent.regionalInventory;
    
      this.dataCopy1 = this.showRequestComponent;
    
    },
    // computed: {
    //   ...mapGetters("MasterTracker", ["getApproveLostOrStolenData"])
    // },
  
    methods: {
      ...mapActions("VerifyDevice", [
     "REJECT_SELF_ASSIGNMENT"
    ]),
      emitToggleLost(showRequestModal) {
        this.$emit("closeLostModel");
      },
      // fnMapRemarks(val) {
      //   this.formData.data.lostOrStolenRemarks = val;
      // },

      rejectSelfAssign (reqData) {
        console.log("REJ REQ",JSON.stringify(reqData));
        let param = {
          selfAssignmentId:reqData.id,
          remarks:this.remarks
        }
          this.$v.remarks.$touch();
          if (this.$v.remarks.$error) {
            this.$q.notify("Please enter reason.");
          }
          else {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to Reject?",
            ok: "Continue",
            cancel: "Cancel"
          })
     
          .then(() => {
            this.$q.loading.show({
              delay: 0, // ms
              spinnerColor: "purple-9",
              message: "Processing .."
            });
  
            this.REJECT_SELF_ASSIGNMENT(param)
              .then(() => {
                this.$emit("closeLostModel");
                this.$q.loading.hide();
                this.$q.notify({ 
                  color: "positive",
                  position: "bottom",
                  message: "Successfully Rejected!",
                  icon: "thumb_up"
                });
              })
              .catch(error => {
                this.$q.loading.hide();
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                  icon: "thumb_down"
                });
              });
          });
          }
      }
    }
  };
  </script>
  