<template>
    <div>
      <q-modal
        v-model="showScrapModel"
        @hide="emitToggleScrap(showScrapModel)"
        @escape-key="emitToggleScrap(showScrapModel)"
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
            @click="MovedToScrap(formData.data)"
            align="right"
            label="Submit"
          />
          <q-btn
            align="right"
            color="grey-9"
            class="float-right q-ma-sm"
            @click="emitToggleScrap(showScrapModel)"
            >Cancel
          </q-btn>
        </div>
      </q-modal>
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
  } from "vuelidate/lib/validators";
  import { mapGetters, mapActions } from "vuex";
  export default {
    props: ["showScrapModel", "propShowScrapComponent"],
  
    data() {
      return {
        dataCopy: [],
        remarks: "",
        formData: {
          data: this.propShowScrapComponent
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
      
      this.dataCopy1 = this.propShowScrapComponent;
   
    },
    computed: {
      ...mapGetters("AggregatorSendToRepair", ["getApproveMoveToScrapData"])
    },
  
    methods: {
      ...mapActions("AggregatorSendToRepair", ["PHONEPE_MOVED_TO_SCRAP_DATAS"]),
      emitToggleScrap(showScrapModel) {
        this.$emit("closeScrapModel");
      },
      fnMapRemarks(val) {
        this.formData.data.lostOrStolenRemarks = val;
      },
      MovedToScrap(reqData) {
        //   this.$v.formData.$touch();
        //   if (this.$v.formData.$error) {
        //     this.$q.notify("Please review fields again.");
        //   }
        //   else {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure Move to Scrap ?",
            ok: "Continue",
            cancel: "Cancel"
          })
          .then(() => {
            this.$q.loading.show({
              delay: 0, // ms
              spinnerColor: "purple-9",
              message: "Processing .."
            });
  
            this.PHONEPE_MOVED_TO_SCRAP_DATAS(reqData)
              .then(() => {
                // this.ajaxLoadAllLeadInfo();
                this.$emit("closeScrapModel");
                this.$q.loading.hide();
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "Successfully  Moved!",
                  icon: "thumb_up"
                });
              })
              .catch(error => {
                this.$q.loading.hide();
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: "Please try again later!",
                  icon: "thumb_down"
                });
              });
          });
        //   }
      }
    }
  };
  </script>
  
