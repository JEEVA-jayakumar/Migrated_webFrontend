<template>
  <div>
     <q-dialog
        minimized
        v-model="toggleAddDeviceModal"  
        @hide="emitfaultyInventoryComponent()" 
        @escape-key="emitfaultyInventoryComponent()"  
        :content-css="{padding:'30px',minWidth: '40vw'}"
        class="customModalOverlay"
    >
      <form> 
        <div class="column group">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12" align="center">
                <div class="text-weight-medium">Add New Damaged Device</div>
              </div>
            </div>
            <div class="row q-py-md">
              <div class="col-md-12">
                <q-select
                @blur="$v.formData.device.$touch"   
                :error="$v.formData.device.$error" 
                float-label="Select a device"
                placeholder="Available devices"
                v-model="formData.device"
                :options="fnDeviceTypes(propDeviceTypes)"
                />
              </div>
            </div>
            <div class="row q-py-md">
              <div class="col">
                <div>Scan a damaged device</div>
              </div>
              <div class="col">
                <q-btn
                v-if="toggleScanButton"
                outline
                size="sm"
                class="q-px-lg"
                label="Scan"
                @click="fnScanDamagedDevice()"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div>OR</div>
              </div>
            </div>
            <div class="row q-py-md">
              <div class="col-md-12">
                <q-input v-model.trim="formData.serialNumber" 
                @blur="$v.formData.serialNumber.$touch"   
                :error="$v.formData.serialNumber.$error" 
                class="text-weight-regular text-grey-8" 
                color="grey-9" 
                float-label="Enter Serial Number Manually" 
                placeholder="Serial Number" 
                />
              </div>
            </div>
            <div class="row" >
              <div class="col-md-12" align="right">
                <q-btn flat class="bg-white text-weight-regular text-grey-8 q-px-lg"  @click="emitfaultyInventoryComponent()">Cancel
                </q-btn>
                <q-btn class="q-px-lg" @click="fnSubmitDamagedDevice(formData)" color="purple-9" style="color: #e3e4e5;background: #1f2c3f !important;">Add
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </form>
    </q-dialog>
  </div>
</template>

<script>
// import { QrcodeReader } from "vue-qrcode-reader";
import { mapGetters, mapActions } from "vuex";
import {
  required,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "@vuelidate/validators";
export default {
  props: ["propfaultyInventoryComponent", "propDeviceTypes"],
  components: {
    // QrcodeReader
  },
  data() {
    return {
      toggleScanButton: true,
      toggleAddDeviceModal: this.propfaultyInventoryComponent,
      formData: {
        device: "",
        serialNumber: ""
      }
    };
  },

  validations: {
    formData: {
      device: {
        required
      },
      serialNumber: {
        required,
        alphaNum,
        maxLength: maxLength(20),
        minLength: minLength(2)
      }
    }
  },

  methods: {
    ...mapActions("InventoryCentral", ["FEED_FAULTY_DEVICES_INVENTORY"]),

    emitfaultyInventoryComponent() {
      this.$emit("emitfaultyInventoryComponent");
    },

    fnDeviceTypes(items) {
      let cookedValue = [];
      this.propDeviceTypes.map(function(value) {
        cookedValue.push({
          label: value.deviceName,
          value: value.id
        });
      });
      return cookedValue;
    },

    // Create callback function to receive barcode when the scanner is already done
    onBarcodeScanned(barcode) {
      this.formData.serialNumber = barcode;
      this.$barcodeScanner.destroy();
      this.toggleScanButton = !this.toggleScanButton;
    },

    fnScanDamagedDevice() {
      this.formData.serialNumber == "";
      this.toggleScanButton = !this.toggleScanButton;
      this.$barcodeScanner.init(this.onBarcodeScanned);
    },

    fnSubmitDamagedDevice(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.FEED_FAULTY_DEVICES_INVENTORY(formData)
          .then(response => {
            if (response.status == 204) {
              this.$q.notify({
                color: "amber-9",
                position: "bottom",
                message: "Device ID, Serial number doesn't match",
                icon: "warning"
              });
            } else {
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully marked as damaged",
                icon: "thumb_up"
              });
            }
            this.$emit("emitfaultyInventoryComponent");
          })
          .catch(error => {
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
