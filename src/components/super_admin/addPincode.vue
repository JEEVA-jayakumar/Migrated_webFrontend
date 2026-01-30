<template>
  <div>
    <q-modal
      minimized
      no-backdrop-dismiss
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitfnshowAddPincode()"
      @escape-key="emitfnshowAddPincode()"
      :content-css="{padding:'30px',minWidth: '40vw'}"
    >
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">Add Pincode</div>
          </div>
          <div class="col-md-12">
            <q-input
              @keyup.enter="submitPincode(formData)"
              v-model="formData.pincode"
              :error="$v.formData.pincode.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Pincode*"
              placeholder="Pincode*"
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
              @click="emitfnshowAddPincode()"
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
  props: ["propShowCreatePincodes"],
  data() {
    return {
      toggleModel: this.propShowCreatePincodes,
      formData: {
        pincode: "",
        stateName: "",
        cityName: ""
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
    ...mapActions("pincodes", ["FETCH_ALL_PINCODES", "ADD_NEW_PINCODE"]),

    emitfnshowAddPincode() {
      this.$emit("emitfnshowAddPincodes");
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

        this.ADD_NEW_PINCODE(formData)
          .then(response => {
            this.FETCH_ALL_PINCODES();
            this.$emit("emitfnshowAddPincodes");
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
