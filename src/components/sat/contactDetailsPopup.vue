<template>
  <q-page>
    <q-modal
      minimized
      no-backdrop-dismiss
      class="customModalOverlay"
      v-model="toggleModel"
      :content-css="{ padding: '25px', minWidth: '30vw' }"
    >
      <div class="row q-pa-md">
        <div
          class="col-12 q-title text-center text-weight-regular bottom-border text-custom-color"
        >
          <b>CONTACT DETAILS</b>
        </div>
        <q-card class="q-pa-md" style="width: 100%">
          <q-card-section>
            <div class="row q-gutter-md q-justify-between">
              <div class="col">
                <div class="q-mb-md row justify-start items-center">
                  <q-item-label><b>Address:</b></q-item-label>
                  <div class="q-ml-sm">
                    {{ this.propRowDetails.address }}
                  </div>
                </div>
                <div class="q-mb-md row justify-start items-center">
                  <q-item-label><b>City:</b></q-item-label>
                  <div class="q-ml-sm">{{ this.propRowDetails.city }}</div>
                </div>
                <div class="q-mb-md row justify-start items-center">
                  <q-item-label><b>Pincode:</b></q-item-label>
                  <div class="q-ml-sm">{{ this.propRowDetails.pincode }}</div>
                </div>
                <div class="q-mb-md row justify-start items-center">
                  <q-item-label><b>Mobile Number:</b></q-item-label>
                  <div class="q-ml-sm">
                    {{ this.propRowDetails.contactNumber }}
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              highlight
              push
              label="Close"
              style="width: 90px"
              class="q-mx-sm"
              align="center"
              @click="emitfnshowUpdateOpenedExternal()"
              color="negative"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-modal>
  </q-page>
</template>

<script>
/* START >> Modal components Lead source, device, merchant type */
import { request } from "http";
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
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowUpdateContactDetails", "propRowDetails"],
  name: "MDRdetails",
  data() {
    return {
      /* START >> Modal props */
      toggleModel: this.propShowUpdateContactDetails,
      showLeadSourceModal: false,
      showDeviceDetailModal: false,
      showMerchantModal: false,
      assignToOptions: [],
      ReasonListOptions: [],
      formData: {
        so: "",
        Reassign: "",
        reason: null
      }
    };
  },

  created() {},
  beforeMount() {
    console.log("propRowDetails ------->", JSON.stringify(this.propRowDetails));
  },

  methods: {
    emitfnshowUpdateOpenedExternal() {
      this.$emit("emitfnshowUpdateOpenedExternal");
    },
  }
};
</script>

<style>
.text-custom-color {
  color: #530750; /* Replace with your desired color */
}
</style>
