<template>
  <div>
    <q-modal v-model="toggleModal" no-backdrop-dismiss no-esc-dismiss
      :content-css="{ padding: '10px', maxWidth: '50vw', minHeight: '' }">
      <div class="q-pa-md">
        <div class="column">
          <!-- <pre>{{propAllScannedItemArr}}</pre> -->
          <div class="col-md-12 bottom-border">
            <div class="q-title text-weight-regular q-py-sm">Aggregator POD Number </div>
          </div>
          <div class="col-md-8 q-pt-md" align="left">
            <q-input color="grey-9" v-model="formData.podNumber" float-label="Enter POD Number"
              placeholder="POD Number" />

          </div>
          <div class="col-md-12 col-md-6 q-pt-md group" align="right">
            <q-btn icon="block" outline label="Cancel" @click="emitToggleCheque" />
            <q-btn icon="check" class="common-btn" label="Submit" @click="fnSubmitAllocateRegion" />
          </div>
        </div>
      </div>
    </q-modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propshowRegionBasedSo", "propAllScannedItemArr"],

  data() {
    return {
      toggleModal: this.propshowRegionBasedSo,
      formData: {
        region: this.propAllScannedItemArr.region,
        so: this.propAllScannedItemArr.so,
        podNumber: "",
        scannedDevices: this.propAllScannedItemArr.scannedItems
      }
    };
  },

  methods: {
    ...mapActions("InventoryCentral", [
      "FEED_ALLOCATE_TO_REGION",
      "FEED_ALLOCATE_TO_REGION_BASED_SO", "FEED_AGGREGATORS_ALLOCATE_TO_REGION_BASED_SO"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    emitToggleCheque(toggleModal) {
      this.$emit("closeModel", "refresh");
    },
    fnSubmitAllocateRegion(request) {
      let params = {};
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
        this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
        });
        // let params = {
        //   region: this.formData.region,
        //   podNumber: this.formData.podNumber,
        //   so: this.formData.so,
        //   scannedDevices:[{
        //     aggregatorDevice:{
        //       deviceName: this.formData.scannedDevices[0].device.deviceName,
        //       id: this.formData.scannedDevices[0].device.id
        //     },
        //     deviceSerialNumbers: this.formData.scannedDevices[0].deviceSerialNumbers

        //    }]
        // };
        this.FEED_AGGREGATORS_ALLOCATE_TO_REGION_BASED_SO(this.formData)
          .then(() => {
            this.emitToggleCheque();
            this.formData = {
              region: "",
              so: "",
              podNumber: "",
              scannedDevices: []
            };
            this.tableData = [];
            this.TOGGLE_COMMON_LOADER(false);
            this.formData = "";
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Devices has been successfully allocated to region",
              icon: "thumb_up"
            });
            this.emitToggleCheque("refresh","closeModal");
            // this.$router.push('/inventory/PhonepeInventory');
           

            // window.location.reload();
          })
          .catch(error => {
            this.$q.loading.hide();
            this.TOGGLE_COMMON_LOADER(false);
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
          });
      }
    },
  }
};
</script>
  
