<template>
  <div>
    <q-modal v-model="toggleModal" no-backdrop-dismiss no-esc-dismiss
      :content-css="{ padding: '10px', maxWidth: '50vw', minHeight: '' }">
      <!-- Scanned Devices: {{this.propAllScannedItemArr.scannedItems}} -->
      <div class="q-pa-md">
        <div class="column">
          <!-- <pre>{{propAllScannedItemArr}}</pre> -->
          <div class="col-md-12 bottom-border">
            <div class="q-title text-weight-regular q-py-sm">Aggregator POD Number</div>
          </div>
          <div class="col-md-8 q-pt-md" align="left">
            <q-input color="grey-9" v-model="formData.podNumber" float-label="Enter POD Number"
              placeholder="POD Number" />
            <q-input color="grey-9" v-model="formData.totalDevices" float-label="Total Allocated Devices "
              placeholder="Total Allocated Devices " />
            <!-- <q-select 
              color="grey-9" v-model="formData.aggregator" float-label="Select Aggregator" radio
            :options="aggregatorOptions"
              /> -->
          </div>

          <!-- <div class="col-md-12 bottom-border">
              <div class="q-title text-weight-regular q-py-sm">Device Count</div>
            </div>
            <div class="col-md-8 q-pt-md" align="left">
              <q-input
                color="grey-9"
                v-model="formData.scannedDevices"
                float-label="Device Count "
                placeholder="Device Count "
              />
            </div> -->
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
  props: ["propshowPDOmodal", "propAllScannedItemArr"],

  data() {
    return {
      toggleModal: this.propshowPDOmodal,
      aggregatorOptions: [],

      formData: {
        region: this.propAllScannedItemArr.region,
        so: this.propAllScannedItemArr.so,
        //   aggregator:"",
        podNumber: "",
        totalDevices: "",
        scannedDevices: this.propAllScannedItemArr.scannedItems
        // scannedDevices: [
        //   {
        //     //TODO
        //     device: {
        //       id: 2
        //     },
        //     deviceSerialNumbers: ["PWF30010764C", "TWF30010763C"]
        //   }
        // ]
      }
    };
  },
  computed: {
    ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),
  },
  //     created() {
  //     this.fetchAggregatorList();
  //   },
  methods: {
    ...mapActions("InventoryCentral", ["FEED_ALLOCATE_TO_REGION", "FEED_PHONE_PE_ALLOCATE_TO_REGION"]),
    ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    emitToggleCheque(toggleModal) {
      this.$emit("closeModel");
    },
    //   fetchAggregatorList() {
    //   let self = this;
    //   let cookedArr = [];
    //   self.GET_ACTIVE_CREATED_AGGREGATORS_LIST()
    //     .then(() => {
    //       return _.map(self.getActiveCreatedAggregatorList, (item) => {
    //         cookedArr.push({
    //           value: item,
    //           label: item.name
    //         });
    //         self.aggregatorOptions = cookedArr;
    //       });

    //     })
    // },
    fnSubmitAllocateRegion() {
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
      } else if (this.formData.totalDevices == "") {
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: " total device cannot be empty!",
          icon: "warning"
        });
      }

      else if (this.formData.scannedDevices.length == 0) {
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
        // let param = {
        //   scannedDevices: [{
        //     aggregatorDevice: this.formData.scannedItems[0].device,
        //     deviceSerialNumbers: this.formData.scannedItems[0].deviceSerialNumbers
        //   }],
        //   podNumber: this.formData.podNumber,
        //   region: this.formData.region
        // };
        this.FEED_PHONE_PE_ALLOCATE_TO_REGION(this.formData)
          .then(() => {
            this.TOGGLE_COMMON_LOADER(false);
            // this.$emit("closeModel");
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Devices has been successfully allocated to region",
              icon: "thumb_up"
            });
            this.$router.push({ name: "PhonepeInventory" });
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
  
