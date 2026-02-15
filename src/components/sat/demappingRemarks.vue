<template>
  <q-page>
    <q-dialog
      minimized
      no-backdrop-dismiss
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitfnshowUpdateDemapping()"
      @escape-key="emitfnshowUpdateDemapping()"
      :content-css="{ padding: '30px', minWidth: '20vw' }"
    >

      <div class="row">
        <div class="col-12 text-h6 q-pa-md text-weight-regular bottom-border">
          Serial Number Remarks
        </div>
        <!-- START >> Setup MDR details -->
        <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
          <q-card style="width:250%">
            <q-card-section>
              <q-list no-border>
                <div class="col-md-12">
                  <q-input
                    type="textarea"
                    placeholder="Reason Type.."
                    :error="$v.formData.reason.$error"
                    @blur="$v.formData.reason.$touch"
                    class="q-my-md"
                    color="grey-9"
                    align="left"
                    value=""
                    v-model="formData.reason"
                  />
                </div>
              </q-list>
            </q-card-section>
            <q-card-actions align="end">
              <q-btn
                flat
                align="right"
                class="bg-white text-weight-regular text-grey-8"
                @click="emitfnshowUpdateDemapping()"
                >Cancel</q-btn
              >
              <q-btn
                label="submit"
                @click="fnReasonRemarks(formData)"
                color="purple-9"
              />

            </q-card-actions>
          </q-card>
        </div>
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
  props: ["propShowUpdateDemapping", "propRowDetails"],
  name: "MDRdetails",
  data() {
    return {
      /* START >> Modal props */
      toggleModel: this.propShowUpdateDemapping,
      showLeadSourceModal: false,
      showDeviceDetailModal: false,
      showMerchantModal: false,
      formData: {
        reason: null
      }
    };
  },
  
  validations: {
      formData: {
        reason: { required }
      }
    },
    
  error: {
      formData: {
        reason: {
          alert: false,
          issue: "",
          value: ""
        },
      }
    },

  beforeMount() {
  },

  methods: {
    ...mapActions("deMapping", ["REMARKS_REASON_DETAILS"]),

    emitfnshowUpdateDemapping() {
      this.$emit("emitfnshowUpdateDemapping");
    },

    fnReasonRemarks(request) {
        this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        let param = {
            remarks: this.formData.reason,
            deviceId: this.propRowDetails
          // id: this.propRowDetails
        };
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });

        this.REMARKS_REASON_DETAILS(param)
          .then(response => {
            this.$emit("emitfnshowUpdateDemapping");
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "De-Mapped Successfully",
              icon: "thumb_up"
            });
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
              error.body.message == null ? "Please Try Again Later !": error.body.message,
              icon: "thumb_down"
            });
          });
      }
    }
  }
};
</script>
<style>
</style>
