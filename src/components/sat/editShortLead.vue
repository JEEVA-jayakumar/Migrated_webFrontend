<template>
  <div>
    {{this.propRowDetails.leadName}}
    <q-dialog
      minimized
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitfnshowEditShortLead()"
      @escape-key="emitfnshowEditShortLead()"
      :content-css="{padding:'30px',minWidth: '40vw'}"
    >
      <form>
        <div class="column group">
          <div class="col-md-6">
            <div class="text-h6 text-weight-regular">Edit ShortLead</div>
          </div>
          <div class="col-md-6">
            <q-input
              disable
              @keyup.enter="submitShortLead(formData)"
              v-model="formData.id"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="leadId"
              placeholder="leadId"
            />
          </div>
          <div class="col-md-6">
            <q-input
              disable
              @keyup.enter="submitShortLead(formData)"
              v-model="formData.leadName"
              :error="$v.formData.leadName.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="leadName"
              placeholder="leadName"
            />
          </div>
          <div class="col-md-12">
            <q-input
              disable
              @keyup.enter="submitShortLead(formData)"
              v-model="formData.leadNumber"
              :error="$v.formData.leadNumber.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="leadNumber"
              placeholder="leadNumber"
            />
          </div>
          <div class="col-md-12">
            <q-input
              disable
              @keyup.enter="submitShortLead(formData)"
              v-model="formData.shortleadDate"
              :error="$v.formData.shortleadDate.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="shortleadDate"
              placeholder="shortleadDate"
            />
          </div>
          <div class="col-md-12">
            <q-input
              disable
              @keyup.enter="submitShortLead(formData)"
              v-model="formData.contactNumber"
              :error="$v.formData.contactNumber.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="contactNumber"
              placeholder="contactNumber"
            />
          </div>

          <div class="col-md-12 group" align="right">
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowEditShortLead()"
            >Cancel</q-btn>
            <q-btn align="right" @click="submitShortLead(formData)" color="purple-9">Save</q-btn>
          </div>
        </div>
      </form>
    </q-dialog>
  </div>
</template>

<script>
import { required, maxLength, minLength } from "@vuelidate/validators";

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowEditShortLead", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowEditShortLead,
      formData: {
        id: this.propRowDetails.id,
        leadNumber: this.propRowDetails.leadNumber,
        leadName: this.propRowDetails.leadName,
        shortleadDate: this.propRowDetails.shortleadDate,
        contactNumber: this.propRowDetails.contactNumber
      }
    };
  },
  validations: {
    formData: {
      leadNumber: {
        required
        // maxLength: maxLength(7),
        // minLength: minLength(5)
      },

      leadName: {
        required
      },
      shortleadDate: {
        required
      },
      contactNumber: {
        required
      }
    }
  },

  methods: {
    ...mapActions("pincodes", ["FETCH_ALL_PINCODES", "EDIT_NEW_PINCODE"]),
    ...mapActions("convertToWip", ["CONVERT_TO_WIP"]),

    emitfnshowEditShortLead() {
      this.$emit("emitfnshowEditShortLead");
    },
    //Permission creation final submit
    submitShortLead(request) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        let params = {
          data1: {
            id: request.id,
            leadNumber: request.leadNumber,
            leadName: request.leadName,
            shortleadDate: request.shortleadDate,
            contactNumber: request.contactNumber
          },
          url: {
            id: this.propRowDetails.id
          }
        };
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });

        this.CONVERT_TO_WIP(params)
          .then(response => {
            // this.FETCH_ALL_PINCODES();
            this.$emit("emitfnshowEditShortLead");
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Wip Lead successfully created!",
              icon: "thumb_up"
            });
          })
          .catch(() => {
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
