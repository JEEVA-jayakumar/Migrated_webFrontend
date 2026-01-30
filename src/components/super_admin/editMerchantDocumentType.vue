<template>
  <div>
    <q-modal
      minimized
      v-model="propToggleModal"
      @hide="toggleModal"
      @escape-key="toggleModal"
      no-backdrop-dismiss
      class="customModalOverlay"
      :content-css="{padding:'30px',minWidth: '30vw'}"
    >
      <!-- <pre>{{propRowDetails}}</pre> -->
      <div class="column group">
        <div class="q-title text-weight-regular q-py-md">Edit Merchant Document Type</div>
        <div>
          <q-select
            color="grey-9"
            @blur="$v.formData.url.merchantType.$touch"
            :error="$v.formData.url.merchantType.$error"
            v-model="formData.url.merchantType"
            :options="activeMerchantType"
            float-label="Select merchant type"
            placeholder="Merchant type"
          />
        </div>
        <div>
          <q-input
            v-model="formData.params.documentType"
            @blur="$v.formData.params.documentType.$touch"
            :error="$v.formData.params.documentType.$error"
            class="text-weight-regular text-grey-8"
            color="grey-9"
            float-label="Merchant Document Type"
            placeholder="Merchant Document Type"
            @keyup.enter="submitMerchantDcoumentTypeData(formData)"
          />
        </div>
        <div>
          <q-input
            v-model="formData.params.marsDocumentId"
            @blur="$v.formData.params.marsDocumentId.$touch"
            :error="$v.formData.params.marsDocumentId.$error"
            class="text-weight-regular text-grey-8"
            color="grey-9"
            type="number"
            float-label="Mars Agreement Id"
            placeholder="Mars Agreement Id"
            @keyup.enter="submitMerchantDcoumentTypeData(formData)"
          />
        </div>
        <div>
          <p>Does it contain sub documents?</p>
          <q-radio
            @input="getViewTypeValue"
            v-model="formData.params.viewType"
            class="text-weight-regular text-grey-8"
            color="grey-9"
            label="Yes"
            :val="false"
          />
          <q-radio
            @input="getViewTypeValue"
            v-model="formData.params.viewType"
            class="text-weight-regular text-grey-8"
            color="grey-9"
            label="No"
            :val="true"
          />
        </div>
        <div>
          <p>Whether document mandatory during lead generation?</p>
          <q-radio
            v-model="formData.params.required"
            class="text-weight-regular text-grey-8"
            color="grey-9"
            label="Yes"
            :val="true"
          />
          <q-radio
            v-model="formData.params.required"
            class="text-weight-regular text-grey-8"
            color="grey-9"
            label="No"
            :val="false"
          />
        </div>
        <div align="right">
          <q-btn
            flat
            align="right"
            class="bg-white text-weight-regular text-grey-8"
            @click="toggleModal()"
          >Cancel</q-btn>
          <q-btn
            align="right"
            @click="submitMerchantDcoumentTypeData(formData)"
            color="purple-9"
          >Save</q-btn>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import {
  integer,
  required,
  maxValue,
  minValue
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  // name: 'ComponentName',
  props: [
    "propShowEditMerchantDocumentTypes",
    "propActiveMerchantTypes",
    "propRowDetails",
    "propCurrentMerchantType"
  ],
  data() {
    return {
      propToggleModal: this.propShowEditMerchantDocumentTypes,
      activeMerchantType: this.propActiveMerchantTypes,
      formData: {
        url: {
          merchantType: this.propCurrentMerchantType,
          hasSubDoc: this.propRowDetails.viewType ? false : true,
          id: this.propRowDetails.id
        },
        params: {
          documentType: this.propRowDetails.documentType,
          parentId: this.propRowDetails.parentID,
          viewType: this.propRowDetails.viewType,
          marsDocumentId: this.propRowDetails.marsDocumentId,
          required: this.propRowDetails.required
        }
      }
    };
  },
  validations: {
    formData: {
      url: {
        merchantType: {
          required
        }
      },
      params: {
        marsDocumentId: {
          required,
          integer,
          minValue: minValue(0),
          maxValue: maxValue(999)
        },
        documentType: {
          required
        }
      }
    }
  },
  methods: {
    ...mapActions("merchantDocumentTypes", ["UPDATE_MERCHANT_DOCUMENT_TYPE"]),
    toggleModal() {
      this.$emit("emitfnshowMerchantDocumentTypes");
    },
    getViewTypeValue(val) {
      this.formData.url.hasSubDoc = val ? 0 : 1;
    },
    submitMerchantDcoumentTypeData() {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });
        this.UPDATE_MERCHANT_DOCUMENT_TYPE(this.formData)
          .then(() => {
            this.$q.loading.hide();
            this.$emit("emitfnshowMerchantDocumentTypes", "refresh");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Merchant document type successfully updated!",
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

<style>
</style>
