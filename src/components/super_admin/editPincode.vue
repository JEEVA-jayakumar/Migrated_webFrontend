<template>
  <div>
    <q-modal
      minimized
      no-backdrop-dismiss
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitfnshowEditPincode()"
      @escape-key="emitfnshowEditPincode()"
      :content-css="{padding:'30px',minWidth: '40vw'}"
    >
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">Edit Pincode</div>
          </div>
          <div class="col-md-12">
            <q-input
              @keyup.enter="submitPincode(formData)"
              v-model="formData.pincode"
              :error="$v.formData.pincode.$error"
              class="text-weight-regular text-grey-8"
              type="number"
              color="grey-9"
              float-label="Pincode"
              placeholder="Pincode"
            />
          </div>
          <div class="col-md-12">
            <q-input
              @keyup.enter="submitPincode(formData)"
              v-model="formData.stateName"
              :error="$v.formData.stateName.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="State name"
              placeholder="State name"
            />
          </div>
          <div class="col-md-12">
            <q-input
              @keyup.enter="submitPincode(formData)"
              v-model="formData.cityName"
              :error="$v.formData.cityName.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="City name"
              placeholder="City name"
            />
          </div>

          <div class="col-md-12 group" align="right">
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowEditPincode()"
            >Cancel</q-btn>
            <q-btn align="right" @click="submitPincode(formData)" color="purple-9">Save</q-btn>
          </div>
        </div>
      </form>
    </q-modal>
  </div>
</template>

<script>
import { required, maxLength, minLength } from "vuelidate/lib/validators";

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowEditPincodes", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowEditPincodes,
      formData: {
        id: this.propRowDetails.id,
        pincode: this.propRowDetails.pincode,
        stateName: this.propRowDetails.stateName,
        cityName: this.propRowDetails.cityName
      }
    };
  },
  validations: {
    formData: {
      pincode: {
        required,
        maxLength: maxLength(7),
        minLength: minLength(5)
      },
      stateName: {
        required
      },
      cityName: {
        required
      }
    }
  },

  methods: {
    ...mapActions("pincodes", ["FETCH_ALL_PINCODES", "EDIT_NEW_PINCODE"]),

    emitfnshowEditPincode() {
      this.$emit("emitfnshowEditPincodes");
    },
    //Permission creation final submit
    submitPincode(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });

        this.EDIT_NEW_PINCODE(formData)
          .then(response => {
            this.FETCH_ALL_PINCODES();
            this.$emit("emitfnshowEditPincodes");
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Pincode successfully created!",
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
