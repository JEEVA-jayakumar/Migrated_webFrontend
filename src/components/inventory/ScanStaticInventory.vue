<template>
  <div>
    <q-dialog
      v-model="toggleModal"
      class="q-mt-lg capitalize"
      @hide="emitToggleRemarks"
      @escape-key="emitToggleRemarks"
      :content-css="{ minWidth: '30vw', padding: '20px' }"
    >
      <div class="row items-center bottom-border q-py-sm">
        <div class="col">Scan QR</div>
        <div class="col-auto">
          <q-btn
            round
            size="sm"
            @click="emitToggleRemarks"
            outline
            color="dark"
            icon="clear"
          />
        </div>
      </div>

      <form>
        <div class="column group">
          <div class="text-h6"></div>
        </div>
        <q-input
          readonly
          v-model="formData.scanQRNumber.scanQRNumber"
          float-label="Scan QR Number"
        />
        <div class="group">
          <q-btn
            @click="fnsubmit(formData)"
            :disabled="!isScanStarted"
            icon="check"
            label="Save"
            style="float:inline-end; color: white; background-color: #61116a;"
          />
          <q-btn
            @click="startScan"
            v-if="scannerToggleOption"
            color="blue"
            outline
            class="q-py-xs "
            label="Start scan"
            style="float: inline-end;"
          />
        </div>
      </form>
    </q-dialog>
  </div>
</template>

<script>

// import VueBarcodeScanner from "vue-barcode-scanner";
// Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";
import { required } from "@vuelidate/validators";

export default {
  name: "phonepePaperRoll",
  props: ["scanInfo", "propToggleScannerPop", "propToggleScan"],
  data() {
    return {
      toggleModal: this.propToggleScannerPop,
      data: this.scanInfo.data,
      scannerToggleOption: true,
      isScanStarted: false,
      barcodeValue: [],
      formData: {
        scanQRNumber: {
          scanQRNumber: null,
        },
      },
    };
  },
  beforeMount() {
    console.log("ScanINFO", JSON.stringify(this.scanInfo.data.id));
  },
  validations: {
    formData: {
      scanQRNumber: {
        scanQRNumber: { required },
      },
    },
  },
  computed: {
    ...mapGetters("phonePeCrm", ["getupdateSacnQRNumber"]),
  },

  methods: {
    ...mapActions("phonePeCrm", ["UPDATE_SCAN_QR_NUMBER"]),
    fnsubmit(formData) {

      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show();
        let param = {
          data1: {
            id: this.scanInfo.data.id,
          },
          formsList: {
            vpa: this.formData.scanQRNumber.scanQRNumber,
          },
        };
        this.UPDATE_SCAN_QR_NUMBER(param)
          .then(() => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Scan QR Updated Successfully",
              icon: "thumb_up",
            });
            // this.emitToggleRemarks();
            this.$emit("closeScannerInfo", this.data);
            this.$q.loading.hide();
            // this.$emit("reloadPhonepePendingDetails", this.formData.action);
          })
          .catch((error) => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body.message == null
                  ? "Please Try Again Later !"
                  : error.body.message,
              icon: "thumb_down"
            });
            this.$q.loading.hide();
          });
      }
    },
    startScan() {
      this.isScanStarted = true;
      this.openScannerComp();
    },
    openScannerComp() {
      this.$q.notify({
        color: "positive",
        position: "bottom",
        message: "Start scanning ",
        icon: "list"
      });
      this.formData.scanQRNumber.scanQRNumber = "";
      this.scannerToggleOption = false;
      if (!this.$barcodeScanner.hasListener()) {
        this.$barcodeScanner.init(this.onBarcodeScanned);
      }
    },
    onBarcodeScanned(barcode) {
      console.log("BARCODE", barcode);
      this.scannerToggleOption = false;
      this.formData.scanQRNumber.scanQRNumber = barcode;
      console.log("FORMDATA", this.formData.scanQRNumber.scanQRNumber);
      this.$barcodeScanner.destroy();
    },
    emitToggleRemarks() {
      this.$barcodeScanner.destroy();
      this.$emit("closeScannerInfo");
    }
  }
};
</script>

<style></style>
