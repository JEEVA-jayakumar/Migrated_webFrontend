<template>
    <div>
       <q-dialog
       :model-value="showRejectModel"
       @hide="emitToggleReject(showRejectModel)" 
       @escape-key="emitToggleReject(showRejectModel)"  
       :content-css="{padding:'50px'}"
       >
        <div>
          <q-input
            type="textarea"
            placeholder="Phonepe Remarks"
            @blur="$v.formData.regionalInventory.lostOrStolenRemarks.$touch"      
            :error="$v.formData.regionalInventory.lostOrStolenRemarks.$error" 
            class="q-my-md"
            color="grey-9"
            align="left"
            value=""
            v-model="formData.regionalInventory.lostOrStolenRemarks"
          />
          <q-btn color="negative" class="q-ma-sm float-right" @click="financeRejectSubmit(formData)" align="right" label="Reject" />
          <q-btn align="right" color="grey-9" 
            class="float-right q-ma-sm" @click="emitToggleReject(showRejectModel)">Cancel
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
      //Reject lostOrStolenRemarks checkbox
      formData: {

        regionalInventory: {
          id : this.propShowRejectComponent.regionalInventory.id,
          serialNumber:this.propShowRejectComponent.regionalInventory.serialNumber,
          lostOrStolenRemarks: ""
        },
       
      }
    };
  },

  validations: {
    formData: {
      regionalInventory: {
        id:{
        // required
        },
        serialNumber:{
        // required
        },
        lostOrStolenRemarks: {
          required
          
        }
      }
    }
  },

  methods: {
    ...mapActions("LostFinance", ["REJECT_LOST_STOLEN_EXCEPTION", "REJECT_PHONEPE_LOST_STOLEN_EXCEPTION"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    emitToggleReject(showRejectModel) {
      this.$emit("closeRejectModel", "reloadPaymentTrackerData");
    },
    financeRejectSubmit(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to reject the lead?",
            ok: "Continue",
            cancel: "Cancel"
          })
          .then(() => {
            this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing .."
          });
            this.REJECT_PHONEPE_LOST_STOLEN_EXCEPTION(formData.regionalInventory)
              .then(() => {
                this.$emit("closeRejectModel");
                this.$emit("reloadPaymentTrackerData");
                this.$q.loading.hide()
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: "Rejected lead #" + formData.leadId,
                  icon: "clear"
                });
                self.$q.loading.hide();
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
         }
    }
  }
};
</script>
