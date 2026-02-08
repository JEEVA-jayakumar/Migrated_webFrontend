<template>
    <div>
      <q-dialog
        minimized
        no-backdrop-dismiss
        no-esc-dismiss
        v-model="toggleModal"
        :content-css="{padding:'30px',minWidth: '40vw'}"
        class="customModalOverlay"
      >
        <form>
          <div class="column group">
            <div class="col-12 text-h6 q-py-md">Reject with remarks</div>
            <div class="col-12">
              <q-input
                color="grey-9"
                v-model="formData.leadInformation.reason"
                @blur="$v.formData.leadInformation.reason.$touch"
                :error="$v.formData.leadInformation.reason.$error"
                type="textarea"
                float-label="Remarks"
                :max-height="100"
              />
            </div>
            <div class="col-12 group">
              <q-btn
                icon="clear"
                color="negative"
                class="q-ma-sm float-right"
                @click="sendRemarks(formData)"
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
            </div>
          </div>
        </form>
      </q-dialog>
    </div>
  </template>
  
  <script>
  import { date } from "quasar";
  import { mapGetters, mapActions } from "vuex";
  import { required } from "@vuelidate/validators";
  
  export default {
    props: ["propToggleLeadModal", "propLeadDetails"],
    data() {
      return {
        toggleModal: this.propToggleLeadModal,
        itemDetails: this.propLeadDetails,
        formData: {
          leadInformation: {
            fieldName: "QR Lead Information",
            reason: ""
          },
          leadId: this.propLeadDetails.id,
        }
      };
    },
  
    validations: {
      formData: {
        leadInformation: {
          reason: {
            required
          }
        }
      }
    },
  
    computed: {
      ...mapGetters("commonLoader", ["getToggleCommonLoader"])
    },
    beforeMount(){
 console.log("TEST");
    },
    methods: {
      ...mapActions("SatLeadValidation", ["VERIFY_QR_LEAD_DATA"]),
      ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
  
      emitToggleRemarks() {
        this.$emit("toggleLeadModal");
      },
      sendRemarks(finalFormData) {
        this.$v.formData.$touch();
        if (this.$v.formData.$error) {
          this.$q.notify("Please review fields again.");
        } else {
          this.VERIFY_QR_LEAD_DATA(finalFormData)
            .then(() => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Rejected Lead : #" + finalFormData.leadId,
                icon: "clear"
              });
              this.$router.push("/sat/staticQrLeads");
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                icon: "thumb_down"
              });
            });
        }
      }
    }
  };
  </script>
  