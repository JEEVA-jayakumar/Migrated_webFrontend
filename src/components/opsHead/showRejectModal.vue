<template>
    <div>
        <q-dialog
        v-model="toggleModal"  
        @hide="emitToggleCheque(toggleModal)" 
        @escape-key="emitToggleCheque(toggleModal)"  
        :content-css="{padding:'10px',maxWidth:'50vw',minHeight:''}"
        >
          <div class="q-pa-md">
              <div class="row text-center">
                  <div class="col-md-12 justify-center">
                      <div class="text-h6 text-weight-regular">Reject Exception</div>
                  </div>
                  <div class="col-md-12 q-pt-md" align="left">
                      <q-input type="textarea" color="grey-9" v-model="formData.leadVerificationStatus.reason" float-label="Enter reason for reject" placeholder="type.." />
                  </div>
                  <div class="col-md-12 col-md-6 q-pt-md group" align="right">
                      <q-btn
                        outline
                        label="Cancel"
                        @click="emitModalToggle"
                      />
                      <q-btn
                        class="common-btn"
                        label="Submit"
                        @click="fnFinalRejectSubmit(formData)"
                      />
                  </div>
              </div>
          </div>
        </q-dialog>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propToggleRejectModal", "propExceptionDetails"],

  data() {
    return {
      reason: "",
      toggleModal: this.propToggleRejectModal,
      formData: {
        leadInformation: {
          verifiedKycStatus: 5
        },
        leadVerificationStatus: {
          fieldName: "KYC",
          reason: "",
          leadInformation: {
            id: this.propExceptionDetails.id
          }
        }
      }
    };
  },

  computed: {
    ...mapGetters("commonLoader", ["getToggleCommonLoader"])
  },

  methods: {
    ...mapActions("OPSHead", [
      "FETCH_ALL_EXCEPTION_KYC_DATA",
      "FEED_EQ_KYC_FEEDBACK"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    emitModalToggle() {
      this.$emit("emitfnToRejectLeadException");
    },

    fnFinalRejectSubmit(formData) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to reject exception?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.TOGGLE_COMMON_LOADER(true);
          this.FEED_EQ_KYC_FEEDBACK(formData)
            .then(response => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message:
                  "Rejected lead #" +
                  formData.leadVerificationStatus.leadInformation.id,
                icon: "clear"
              });
              this.FETCH_ALL_EXCEPTION_KYC_DATA();
              this.emitModalToggle();
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Error in rejecting exception!",
                icon: "thumb_down"
              });
            });
          this.TOGGLE_COMMON_LOADER(false);
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
};
</script>
