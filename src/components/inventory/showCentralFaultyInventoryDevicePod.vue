<template>
  <div>
    <q-modal
      minimized
      v-model="toggleModal"
      no-backdrop-dismiss
      no-esc-dismiss
      :content-css="{padding:'30px',minWidth: '40vw'}"
    >
      <div class="q-pa-md">
        <div class="column">
          <div class="col-md-12 bottom-border">
            <div class="q-title text-weight-regular q-py-sm">POD Number</div>
          </div>
          <div class="col-md-8 q-pt-md" align="left">
            <q-input
              color="grey-9"
              v-model="formData.podNumber"
              float-label="Enter POD Number"
              placeholder="POD Number"
            />
          </div>
          <div class="col-md-12 col-md-6 q-pt-md group" align="right">
            <q-btn icon="block" outline label="Cancel" @click="emitToggleCheque"/>
            <q-btn icon="check" class="common-btn" label="Submit" @click="submitDamagedDevices"/>
          </div>
        </div>
      </div>
    </q-modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowPDOmodal", "propAllScannedItemArr"],

  data() {
    return {
      toggleModal: this.propShowPDOmodal,
      formData: {
        region: this.propAllScannedItemArr.region,
        podNumber: "",
        scannedDevices: this.propAllScannedItemArr.scannedItems
        // scannedDevices: [
        //   {
        //     //TODO
        //     device: {
        //       id: 2,
        //     },
        //     deviceSerialNumbers: [
        //       "SN100006",
        //       "SN100007",
        //       "SN100008",
        //       "SN100009",
        //       "SN100010",
        //       "SN100011",
        //       "SN100012",
        //       "SN100013",
        //       "SN100014",
        //       "SN100015",
        //       "SN100016",
        //       "SN100017",
        //       "SN100018",
        //       "SN100019",
        //       "SN100020",
        //     ],
        //   },
        // ],
      }
    };
  },

  methods: {
    ...mapActions("InventoryCentral", [
      "FEED_CENTRAL_INVENTORY_DAMAGED_DEVICE_SERIAL_NUMBER"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    emitToggleCheque() {
      this.$emit("closeModel");
    },
    submitDamagedDevices() {
      if (this.formData.region == "") {
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: "Region cannot be empty!",
          icon: "warning"
        });
      } else if (this.formData.podNumber == "") {
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: "POD number cannot be empty!",
          icon: "warning"
        });
      } else if (this.formData.scannedDevices.length == 0) {
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: "Scanned devices cannot be empty!",
          icon: "warning"
        });
      } else {
        this.FEED_CENTRAL_INVENTORY_DAMAGED_DEVICE_SERIAL_NUMBER(this.formData)
          .then(() => {
            this.TOGGLE_COMMON_LOADER(false);
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Devices successfully aded to damaged inventory",
              icon: "thumb_up"
            });
            this.$emit("emittedAfterPODsubmission", "closeModal");
            this.$emit("closeModel");
          })
          .catch(error => {
            this.TOGGLE_COMMON_LOADER(false);
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
