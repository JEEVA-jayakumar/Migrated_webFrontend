<template>
  <div>
    <q-modal
      minimized
      v-model="propToggleModal"
      @hide="toggleModal"
      @escape-key="toggleModal"
      class="customModalOverlay"
      :content-css="{padding:'30px',minWidth: '30vw'}"
    >
      <form>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">Edit Merchant Type</div>
          </div>
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <q-input
              v-model="formData.merchantTypeName"
              @blur="$v.formData.merchantTypeName.$touch"
              :error="$v.formData.merchantTypeName.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Merchant Type"
              placeholder="Merchant Type"
              @keyup.enter="submitMerchantTypeData(formData)"
            />
          </div>
          <div class="col-md-12">
            <q-input
              v-model="formData.marsAgreementId"
              @blur="$v.formData.marsAgreementId.$touch"
              :error="$v.formData.marsAgreementId.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Mars Agreement Id"
              placeholder="Mars Agreement Id"
              @keyup.enter="submitMerchantTypeData(formData)"
            />
          </div>
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12 group" align="right">
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="toggleModal()"
            >Cancel</q-btn>
            <q-btn align="right" @click="submitMerchantTypeData(formData)" color="purple-9">Save</q-btn>
          </div>
        </div>
      </form>
    </q-modal>
  </div>
</template>

<script>
import { integer, required } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  // name: 'ComponentName',
  props: ["propShowEditMerchantTypes", "propRowDetails"],
  data() {
    return {
      propToggleModal: this.propShowEditMerchantTypes,
      formData: {
        id: this.propRowDetails.id,
        marsAgreementId: this.propRowDetails.marsAgreementId || 0,
        merchantTypeName: this.propRowDetails.merchantTypeName
      }
    };
  },
  validations: {
    formData: {
      marsAgreementId: {
        required,
        integer
      },
      merchantTypeName: {
        required
      }
    }
  },

  methods: {
    ...mapActions("merchantTypes", ["UPDATE_MERCHANT_TYPE"]),
    toggleModal() {
      this.$emit("emitfnshowMerchantTypes");
    },
    refreshListOnClose() {
      this.$emit("emitfnForMerchantTypeTableRefresh");
    },
    submitMerchantTypeData() {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });
        this.UPDATE_MERCHANT_TYPE(this.formData)
          .then(() => {
            this.$q.loading.hide();
            this.$emit("emitfnshowMerchantTypes", "refresh");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Merchant type successfully updated!",
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
