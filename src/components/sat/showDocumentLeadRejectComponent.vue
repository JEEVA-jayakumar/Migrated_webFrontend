<template>
  <div>
    <!-- Reject model -->
    <q-modal
      v-model="toggleModel"
      @hide="emitToggleRemarks()"
      @escape-key="emitToggleRemarks()"
      :content-css="{minWidth:'30%',maxHeight:'50vh',padding:'20px'}"
    >
      <!-- START >> Give reason to reject(mandatory) document -->
      <div class="q-title q-mb-sm">{{document}}</div>
      <q-input
        @blur="$v.formData.leadDetails.reason.$touch"
        :error="$v.formData.leadDetails.reason.$error"
        type="textarea"
        placedholder="Type.."
        :max-height="100"
        rows="3"
        float-label="Reason"
        color="grey-9"
        align="left"
        v-model="formData.leadDetails.reason"
      />
      <q-btn
        icon="clear"
        color="negative"
        class="q-ma-sm float-right"
        @click="fnRejectLeadFinal(formData,toggleModel)"
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
      <!-- END >> Give reason to reject(mandatory) document -->
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
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propDocumentDetails", "propToggleDocumentRejectModal"],

  data() {
    return {
      toggleModel: this.propToggleDocumentRejectModal,
      document: this.propDocumentDetails.documentType,
      formData: {
        lead: {
          id: this.propDocumentDetails.leadId,
          documentId: this.propDocumentDetails.hasOwnProperty(
            "currentDocumentId"
          )
            ? this.propDocumentDetails.currentDocumentId
            : this.propDocumentDetails.id
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
    ...mapActions("SatLeadValidation", [
      "VERIFY_DOCUMENT_FULL_LEAD",
      "FETCH_SHORT_LEAD_DATA"
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
            this.$emit("toggleDocumentModal", formData.leadDetails.id);
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Error in rejecting document!",
              icon: "thumb_down"
            });
            this.toggleAjaxLoadFilter = true;
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
