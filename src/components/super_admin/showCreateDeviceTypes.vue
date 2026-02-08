<template>
  <div>
    <q-dialog
      v-model="toggleModal"
      @hide="emitfnshowAddDeviceType"
      no-backdrop-dismiss
      class="customModalOverlay"
      :content-css="{padding:'30px',minWidth:'30vw'}"
    >
      <form>
        <div class="text-h6 text-weight-regular q-py-md bottom-border items-center">
          <q-icon name="add_box" size="25px" color="purple-9"/>Add Device
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
                  v-model="formData.colorCode"
                  @blur="$v.formData.colorCode.$touch"
                  :error="$v.formData.colorCode.$error"
                  popover
                  float-label="Choose a role color"
                  color="grey-9"
                />
              </div>
              <div class="col-auto">
                <q-btn round :style="'background:'+formData.colorCode"/>
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
          <div>
            <q-radio v-for="(item, index) in device.flagOptions" :key="index" color="grey-9" v-model.trim="formData.isDevice"
            @blur="$v.formData.isDevice.$touch"
              :error="$v.formData.isDevice.$error"
          :val="item.value" :label="item.label" />
          </div>
          <div class="group" align="right">
            <q-btn
              outline
              align="right"
              icon="block"
              class="text-weight-regular text-grey-8"
              color="grey-6"
              @click="emitfnshowAddDeviceType()"
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
    </q-dialog>
  </div>
</template>

<script>
import { required, maxValue } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propShowCreateDeviceTypes"],
  data() {
    return {
      toggleModal: this.propShowCreateDeviceTypes,
      formData: {
        deviceName: "",
        colorCode: "",
        isDevice:null
      },
     device:{
      flagOptions: [
          {
            label: 'POS',
            value: 1
          },
          {
            label: 'QR',
            value: 2
          }

        ],
      
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
      },
      isDevice:{
        required,
      }
    },
    
  },

  methods: {
    ...mapActions("SA_Devices", [
      "FEED_DEVICE_TYPE_DATA",
      "FETCH_DEVICES_DATA"
    ]),
    emitfnshowAddDeviceType() {
      this.$emit("emitfnshowDeviceTypes");
      this.$emit("emitfnForDeviceTypeTable");
    },
    fnfinalsubmitDeviceType(requestParams) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show();
        this.FEED_DEVICE_TYPE_DATA(requestParams)
          .then(response => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Device successfully added",
              icon: "thumb_up"
            });
            this.FETCH_DEVICES_DATA();
            this.emitfnshowAddDeviceType("emitfnshowDeviceTypes");
            location.reload();
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.data.message,
              icon: "thumb_down"
            });
          });
      }
    }
  }
};
</script>
