<template>
  <div>
       <!-- Approve model -->
        <q-modal 
        minimized
        v-model="propToggleDocumentApproveModal" 
        @hide="emitToggleRemarks()" 
        @escape-key="emitToggleRemarks()"  
        :content-css="{padding:'30px',minWidth: '40vw'}"
        > 
          <div class="q-title q-mb-sm">{{propDocumentDetails.documentType}}</div>
            <q-input
                placedholder="Type.." 
                float-label="Reason"
                color="grey-9"
                align="left"
                v-model="formData.leadDetails.reason"
            />
            <q-btn icon="done" color="positive" class="q-ma-sm float-right" @click="fnApproveLeadFinal(formData)" align="right" label="Approve" />
            <q-btn icon="block" color="grey-5" @click="emitToggleRemarks()" class="q-ma-sm float-right text-dark" align="right" v-close-overlay label="Cancel" />
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
  props: ["propDocumentDetails", "propToggleDocumentApproveModal"],

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
          status: 1
        }
      }
    };
  },
  methods: {
    ...mapActions("OPSHead", [
      "FETCH_ALL_EXCEPTION_KYC_BY_ID_DATA",
      "VERIFY_DOCUMENT_FULL_LEAD"
    ]),

    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    emitToggleRemarks() {
      this.$emit("toggleDocumentModal");
    },

    fnApproveLeadFinal(formData) {
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
            icon: "thumb_up"
          });
          this.$emit("toggleDocumentModalHotReload");
          this.emitToggleRemarks();
        })
        .catch(error => {
          this.$q.loading.hide()
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Error in approving document!",
            icon: "thumb_down"
          });
        });
    }
  }
};
</script>
