<template>
  <div>
    <q-dialog
      minimized
      v-model="propToggleModal"
      @hide="toggleModal"
      @escape-key="toggleModal"
      no-backdrop-dismiss
      class="customModalOverlay"
      :content-css="{padding:'30px',minWidth: '30vw'}"
    >
      <div class="column group">
        <div class="text-h6 text-weight-regular q-py-md">Edit Merchant Sub Document Type</div>
        <div>
          <q-select
            disable
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
       
          <q-select
            color="grey-9"
            @blur="$v.formData.params.documentType.$touch"
            :error="$v.formData.params.documentType.$error"
            v-model="formData.params.documentType"
            :options="activeDocumentMerchantType"
            float-label="Select merchant document type"
            placeholder="Merchant document type"
          />
        </div>
        <div>
          <q-input
            color="grey-9"
            v-model="formData.params.subDocumentType"
            float-label="Merchant Sub Document Type"
            placeholder="Merchant Sub Document Type"
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
            @keyup.enter="submitMerchantSubDocumentTypeData(formData)"
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
            @click="submitMerchantSubDocumentTypeData(formData)"
            color="purple-9"
          >Save</q-btn>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import {
  integer,
  required,
  maxValue,
  minValue
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  // name: 'ComponentName',
  props: [
    "propToggleMerchantSubdocumentTypes",
    "propActiveMerchantTypes",
    "propActiveDocumentMerchantType",
    "propRowDetails",
    "propCurrentMerchantType"
  ],
  data() {
    return {
      propToggleModal: this.propToggleMerchantSubdocumentTypes,
      activeMerchantType: this.propActiveMerchantTypes,
      activeDocumentMerchantType: this.propActiveDocumentMerchantType,
      formData: {
        url: {
          id: this.propRowDetails.id,
          merchantType: this.propRowDetails.merchantTypeId,
          hasSubDoc: this.propRowDetails.viewType
        },
        params: {
          documentType: this.propRowDetails.parentID,
          subDocumentType:
            this.propRowDetails.subDocumentType ||
            this.propRowDetails.documentType,
          parentId:
            this.propRowDetails.subDocumentType == ""
              ? 0
              : this.propRowDetails.parentID,
          viewType: 0,
          marsDocumentId: this.propRowDetails.marsDocumentId,
          required: true
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
  created() {
    this.activeDocumentMerchantType();
  },
  methods: {
    ...mapActions("merchantDocumentTypes", ["UPDATE_MERCHANT_DOCUMENT_TYPE"]),
    toggleModal() {
      this.$emit("emitfnshowMerchantSubDocumentTypes");
    },
    activeDocumentMerchantType() {
      let assumeArr = [];
      _.map(this.propActiveDocumentMerchantType, item => {});
    },
    submitMerchantSubDocumentTypeData() {
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
            this.$emit("emitfnshowMerchantSubDocumentTypes");
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
