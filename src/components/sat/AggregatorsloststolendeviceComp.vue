<template>
    <div>
      <q-dialog
        :model-value="showLostModel"
        @hide="emitToggleLost(showLostModel)"
        @escape-key="emitToggleLost(showLostModel)"
        :content-css="{ padding: '25px' }"
      >
        <div>
          <div align="center" class="text-weight-light text-grey-8 q-mb-md">
            <h5><b>Remarks</b></h5>
          </div>
          <div align="left" class="text-weight-light text-grey-8 q-mb-md">
            Add your remarks and then submit....
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
            @click="Aggregatorsloststolendevice(formData.data)"
            align="right"
            label="Submit"
          />
          <q-btn
            align="right"
            color="grey-9"
            class="float-right q-ma-sm"
            @click="emitToggleLost(showLostModel)"
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
    props: ["showLostModel", "propShowLostComponent"],
  
    data() {
      return {
        dataCopy: [],
        remarks: "",
        formData: {
          data: this.propShowLostComponent.aggregatorRegionalInventory
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
      // this.dataCopy = this.propShowLostComponent;
    
      // this.dataCopy = this.propShowLostComponent.regionalInventory;
     
      this.dataCopy1 = this.propShowLostComponent;
    
    },
    computed: {
      ...mapGetters("MasterTracker", ["getApproveLostOrStolenData"])
    },
  
    methods: {
      ...mapActions("MasterTracker", ["APPROVE_LOST_STOLEN_DEVICE", "APPROVE_PHONEPE_LOST_STOLEN_DEVICE"]),
      emitToggleLost(showLostModel) {
        this.$emit("closeLostModel");
      },
      fnMapRemarks(val) {
        this.formData.data.lostOrStolenRemarks = val;
      },
      Aggregatorsloststolendevice(reqData) {
        //   this.$v.formData.$touch();
        //   if (this.$v.formData.$error) {
        //     this.$q.notify("Please review fields again.");
        //   }
        //   else {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to Move Lost/Stolen Inventory?",
            ok: "Continue",
            cancel: "Cancel"
          })
          .then(() => {
            this.$q.loading.show({
              delay: 0, // ms
              spinnerColor: "purple-9",
              message: "Processing .."
            });
  
            this.APPROVE_PHONEPE_LOST_STOLEN_DEVICE(reqData)
              .then(() => {
              
  
                this.$emit("closeLostModel");
                this.$q.loading.hide();
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "Successfully Approved!",
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
        //   }
      }
    }
  };
  </script>
  
