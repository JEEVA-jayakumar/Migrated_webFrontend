<template>
  <div>
       <!-- Approve model -->
        <q-modal 
        v-model="toggleModel" 
        @hide="emitToggleRemarks" 
        @escape-key="emitToggleRemarks"  
        :content-css="{minWidth:'30%',maxHeight:'50vh',padding:'20px'}"
        > 

          <!-- START >> Give reason to approve(optional) document -->
          <div class="q-title q-mb-sm">{{document}}</div>
          <q-input
              type="textarea"
              placedholder="Type.." 
              :max-height="100"
              rows="3"
              float-label="Reason"
              color="grey-9"
              align="left"
              v-model="formData.leadDetails.reason"
          />
          <q-btn icon="done" color="positive" class="q-ma-sm float-right" @click="fnApproveLeadDocumentFinal(formData)" align="right" label="Approve" />
          <q-btn icon="block" color="grey-5" @click="emitToggleRemarks" class="q-ma-sm float-right text-dark" align="right" v-close-overlay label="Cancel" />
          <!-- END >> Give reason to approve(optional) document -->
          <!-- <pre>{{formData}}</pre> -->
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
  numeric,
} from "vuelidate/lib/validators";
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propDocumentDetails", "propToggleDocumentApproveModal"],

  data() {
    return {
      toggleModel: this.propToggleDocumentApproveModal,
      document: this.propDocumentDetails.documentType,
      formData: {
        lead: {
          id: this.propDocumentDetails.leadId,
          documentId: this.propDocumentDetails.hasOwnProperty(
            "currentDocumentId"
          )
            ? this.propDocumentDetails.currentDocumentId
            : this.propDocumentDetails.id,
        },
        leadDetails: {
          fieldName: "Document",
          reason: "",
          status: 1,
        },
      },
    };
  },
  methods: {
    ...mapActions("SatLeadValidation", [
      "VERIFY_DOCUMENT_FULL_LEAD",
      "FETCH_SHORT_LEAD_DATA",
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    emitToggleRemarks() {
      this.$emit("toggleDocumentModal");
    },

    // Function to final approval document
    fnApproveLeadDocumentFinal(formData) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Processing .."
      });
      this.VERIFY_DOCUMENT_FULL_LEAD(formData)
        .then(response => {
          this.$q.loading.hide()
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully approved",
            icon: "thumb_up",
          });
          this.$emit("toggleDocumentModal", formData.lead.id);
        })
        .catch(error => {
          this.$q.loading.hide()
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Error in approving document!",
            icon: "thumb_down",
          });
        });
    },
  },
};
</script>
