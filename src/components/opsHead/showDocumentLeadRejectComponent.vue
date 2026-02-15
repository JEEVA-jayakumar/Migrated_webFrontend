<template>
  <div>
    <!-- Reject model -->
    <q-dialog
      minimized
      :model-value="propToggleDocumentRejectModal"
      @hide="emitToggleRemarks()"
      @escape-key="emitToggleRemarks()"
      :content-css="{padding:'30px',minWidth: '40vw'}"
    >
      <div class="text-h6 q-mb-sm">{{propDocumentDetails.documentType}}</div>
      <q-input
        @blur="$v.formData.leadDetails.reason.$touch"
        :error="$v.formData.leadDetails.reason.$error"
        placedholder="Type.."
        float-label="Reason"
        color="grey-9"
        align="left"
        v-model="formData.leadDetails.reason"
      />
      <q-btn
        icon="clear"
        color="negative"
        class="q-ma-sm float-right"
        @click="fnRejectLeadFinal(formData,propToggleDocumentRejectModal)"
        align="right"
        label="Reject"
      />
      <q-btn
        icon="block"
        color="grey-5"
        @click="emitToggleRemarks()"
        class="q-ma-sm float-right text-dark"
        align="right"
        v-close-overlay
        label="Cancel"
      />
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
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propDocumentDetails", "propToggleDocumentRejectModal"],

  data() {
    return {
      // formData: {
      //   leadDocuments: {
      //     id: this.propDocumentDetails.id,
      //     documentVerifiedStatus: 3
      //   },
      //   leadVerificationStatus: {
      //     fieldName: "Document",
      //     reason: "",
      //     leadInformation: {
      //       id: this.propDocumentDetails.leadId
      //     },
      //     status: 0
      //   }
      // }
      formData: {
        lead: {
          id: this.propDocumentDetails.leadId,
          documentId: this.propDocumentDetails.id
        },
        leadDetails: {
          fieldName: "Document",
          reason: "",
          status: 0
        }
      }
    };
  },
  validations: {
    formData: {
      leadDetails: {
        reason: {
          required
        }
      }
    }
  },

  methods: {
    ...mapActions("OPSHead", [
      "VERIFY_DOCUMENT_FULL_LEAD",
      "FETCH_ALL_EXCEPTION_KYC_DATA"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    emitToggleRemarks() {
      this.$emit("toggleDocumentModal");
    },

    fnRejectLeadFinal(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Processing .."
        });
        this.VERIFY_DOCUMENT_FULL_LEAD(formData)
          .then(response => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Document rejected",
              icon: "clear"
            });
            this.FETCH_ALL_EXCEPTION_KYC_DATA();
            this.$emit("toggleDocumentModalHotReload");
            this.$emit("toggleDocumentModal");
          })
          .catch(error => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Error in rejecting document!",
              icon: "thumb_down"
            });
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "No changes made!",
              icon: "thumb_down"
            });
          });
      }
    }
  }
};
</script>
