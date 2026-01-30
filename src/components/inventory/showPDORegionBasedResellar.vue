<template>
  <div>
    <q-modal
      v-model="toggleModal"
      no-backdrop-dismiss
      no-esc-dismiss
      :content-css="{padding:'10px',maxWidth:'50vw',minHeight:''}"
    >
      <div class="q-pa-md">
        <div class="column">
          <!-- <pre>{{propAllScannedItemArr}}</pre> -->
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
            <q-btn icon="block" outline label="Cancel" @click="emitToggleCheque" />
            <q-btn
              icon="check"
              class="common-btn"
              label="Submit"
              @click="fnSubmitAllocateResellar"
            />
          </div>
        </div>
      </div>
    </q-modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propshowRegionBasedResellar", "propAllScannedItemArr"],

  data() {
    return {
      toggleModal: this.propshowRegionBasedResellar,
      formData: {
        region: this.propAllScannedItemArr.region,
        resellar: this.propAllScannedItemArr.resellar,

        podNumber: "",
        scannedDevices: this.propAllScannedItemArr.scannedItems
        // scannedDevices: [
        //   {
        //     //TODO
        //     device: {
        //       id: 2
        //     },
        //     deviceSerialNumbers: [
        //       //   "SN100007",
        //       //   "SN100008",
        //       //   "SN100009",
        //       //   "SN100010",
        //       //   "SN100011",
        //       //   "SN100012",
        //       //   "SN100013",
        //       //   "SN100014",
        //       //   "SN100015",
        //       //   "SN100016",
        //       //   "SN100017",
        //       //   "SN100018",
        //       //   "SN100019",
        //       //   "SN100020"

        //       "PWF30010765C",
        //       "TWF30010766C"
        //     ]
        //   }
        // ]
      }
    };
  },

  methods: {
    ...mapActions("InventoryCentral", [
      "FEED_ALLOCATE_TO_REGION",
      "FEED_ALLOCATE_TO_REGION_BASED_SO",
      "FEED_ALLOCATE_TO_REGION_BASED_RESELLAR"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    emitToggleCheque(toggleModal) {
      this.$emit("closeModel");
    },
    fnSubmitAllocateResellar(request) {
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
        this.FEED_ALLOCATE_TO_REGION_BASED_RESELLAR(this.formData)
          .then(() => {
            this.TOGGLE_COMMON_LOADER(false);
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Devices has been successfully allocated to region",
              icon: "thumb_up"
            });
            this.$router.push("/inventory/central");
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
    }
  }
};
</script>
