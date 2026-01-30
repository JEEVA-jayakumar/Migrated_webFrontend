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
              <div class="q-title text-weight-regular q-py-sm">Aggregator Send to repair</div>
            </div>
            <div class="col-md-8 q-pt-md" align="left">
              <q-list dense separator>
                <q-item v-for="(item,index) in formData.scannedItems" :key="index">
                  <q-item-main>{{item.device.deviceName}}</q-item-main>
                  <q-item-side>{{item.deviceSerialNumbers.length}} nos</q-item-side>
                </q-item>
              </q-list>
            </div>
            <div class="col-md-12 col-md-6 q-pt-md group" align="right">
              <q-btn icon="block" outline label="Cancel" @click="emitToggleCheque"/>
              <q-btn icon="check" class="common-btn" :disable="this.formData.scannedItems[0].deviceSerialNumbers.length == 0" label="Submit" @click="fnFinalFaultySubmit(1)"/>
            </div>
          </div>
        </div>
      </q-modal>
    </div>
  </template>
  <script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    props: ["showRepairModal", "propAllScannedItemArr"],
  
    data() {
      return {
        toggleModal: this.showRepairModal,
        formData: {
          region: this.propAllScannedItemArr.region,
          podNumber: "",
          scannedItems: this.propAllScannedItemArr.scannedItems
        }
      };
    },
   
  
    methods: {
      ...mapActions("InventoryCentral", ["FEED_FAULTY_FINAL_SUBMIT", "FEED_AGGREGATORS_FAULTY_FINAL_SUBMIT"]),
  
      emitToggleCheque(toggleModal) {
        this.$emit("closeModel");
      },
      fnFinalFaultySubmit(action) {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });

        let assumeArr = {
          data: [{
            aggregatorDevice: this.formData.scannedItems[0].device,
            deviceSerialNumbers: this.formData.scannedItems[0].deviceSerialNumbers
          }],
        // data: this.formData.scannedItems,
          action: action
        };
        this.FEED_AGGREGATORS_FAULTY_FINAL_SUBMIT(assumeArr)
          .then(() => {
            this.scannerToggleOption = false;
            this.formData = {
              device_type: "",
              scannedItems: []
            };
            this.tableData = [];
            this.emitToggleCheque();
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Devices has been updated successfully",
              icon: "thumb_up"
            });
            this.$router.push('/inventory/PhonepeInventory');
          })
          .catch(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down"
            });
          });
      }
    }
  };
  </script>
  
