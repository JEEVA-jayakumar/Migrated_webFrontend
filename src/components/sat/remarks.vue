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
          <div class="col-12 text-h6 q-py-md">Save with remarks</div>
          <div class="col-12">
            <q-input
              color="grey-9"
              v-model="formData.remarks"
              @blur="$v.formData.remarks.$touch"
              :error="$v.formData.remarks.$error"
              type="textarea"
              float-label="Remarks"
              :max-height="100"
            />
          </div>
          <div class="col-12 group">
            <q-btn
              icon="save"
              color="amber-9"
              class="q-ma-sm float-right"
              @click="saveRemarks(formData)"
              align="right"
              label="Save"
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
      formData: {
        id: this.propLeadDetails.id,
        remarks: ""
      }
    };
  },

  validations: {
    formData: {
      remarks: {
        required
      }
    }
  },

  computed: {
    ...mapGetters("commonLoader", ["getToggleCommonLoader"])
  },
  methods: {
    ...mapActions("SatLeadValidation", ["SAVE_REMARKS"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    emitToggleRemarks() {
      this.$emit("toggleLeadModal");
    },
    saveRemarks(finalFormData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Saving data .."
        });
        this.SAVE_REMARKS(finalFormData)
          .then(() => {
            this.$emit("refreshContentOnSavingRemarks");
            this.$emit("toggleLeadModal");
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Remarks saved successfully",
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
      }
    }
  }
};
</script>
