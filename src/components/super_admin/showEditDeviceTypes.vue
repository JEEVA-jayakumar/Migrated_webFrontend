<template>
  <div>
    <q-modal
      minimized
      v-model="toggleModel"
      @hide="emitfnshowEditDeviceTypes"
      no-backdrop-dismiss
      class="customModalOverlay"
      :content-css="{padding:'30px',minWidth:'30vw'}"
    >
      <form>
        <div class="q-title text-weight-regular q-py-md bottom-border">
          <q-icon name="border_color" size="25px" color="purple-9"/>Modify Device
        </div>

        <div class="column-inline q-py-md gutter-sm items-center">
          <div>
            <q-input
              v-model="formData.deviceName"
              @blur="$v.formData.deviceName.$touch"
              :error="$v.formData.deviceName.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Device Type"
              placeholder="Device Type"
            />
          </div>
          <div>
            <div class="row">
              <div class="col">
                <q-color
                  clearable
                  v-model="formData.colorCode"
                  @blur="$v.formData.colorCode.$touch"
                  :error="$v.formData.colorCode.$error"
                  popover
                  float-label="Choose a role color"
                  color="grey-9"
                  @input="createDuplicateResult"
                />
              </div>
              <div class="col-auto">
                <q-btn
                  round
                  :style="'background:'+formData.colorCode"
                  @click="undoColorChange(formData.colorCodeDuplicate)"
                />
              </div>
            </div>
          </div>
          <div>
            <q-input
              v-model="formData.serialNumberLength"
              type="number"
              @blur="$v.formData.serialNumberLength.$touch"
              :error="$v.formData.serialNumberLength.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Serial Number Length"
              placeholder="Serial Number Length"
            />
          </div>
          <div class="group" align="right">
            <q-btn
              outline
              align="right"
              icon="block"
              class="text-weight-regular text-grey-8"
              color="grey-6"
              @click="emitfnshowEditDeviceTypes()"
              label="Cancel"
            />
            <q-btn
              align="right"
              icon="check"
              @click="fnfinalsubmitDeviceType(formData)"
              color="purple-9"
              label="save"
            />
          </div>
        </div>
      </form>
    </q-modal>
  </div>
</template>

<script>
import { required, maxValue } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propShowEditDeviceTypes", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowEditDeviceTypes,
      formData: {
        id: this.propRowDetails.id,
        deviceName: this.propRowDetails.deviceName,
        colorCode: this.propRowDetails.colorCode,
        colorCodeDuplicate: this.propRowDetails.colorCode,
        serialNumberLength: this.propRowDetails.serialNumberLength
      }
    };
  },

  validations: {
    formData: {
      deviceName: {
        required
      },
      colorCode: {
        required
      },
      serialNumberLength: {
        required,
        // Restricting device serial number length
        maxValue: maxValue(50)
      }
    }
  },

  methods: {
    ...mapActions("SA_Devices", ["UPDATE_DEVICE_DATA", "FETCH_DEVICES_DATA"]),
    emitfnshowEditDeviceTypes() {
      this.$emit("emitfnshowDeviceTypes");
      this.$emit("emitfnForDeviceTypeTable");
    },
    createDuplicateResult(item) {
      if (item != null) {
        this.formData.colorCodeDuplicate = item;
      }
    },
    undoColorChange(item) {
      this.formData.colorCode = item;
    },
    fnfinalsubmitDeviceType(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show();
        this.UPDATE_DEVICE_DATA(formData)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
              icon: "thumb_up"
            });
            this.FETCH_DEVICES_DATA();
            this.emitfnshowEditDeviceTypes();
            location.reload();
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
