<template>
  <q-page>
    <div class="text-grey-9">
      <div class="row bottom-border q-pa-sm items-center">
      
    
        <div class="col">
          <q-tabs
            no-pane-border
            v-model="inventoryOptionSelected"
            color="dark"
            inverted
            class="shadow-1"
          >
          
            <q-tab name="AllocatedDevices" label="Allocated Devices" slot="title" />
            <q-tab name="UnAllocatedDevices" label="UnAllocated Devices" slot="title" /> 
            <q-tab name="FaultyDevices" label="Faulty Devices" slot="title" />
            
              <!-- <div class="col-auto">
            <q-btn
              @click="downloadInventorySummaryInfoMenu()"
              outline
              color="grey-9"
              label="Download as Excel"
              class="q-mr-lg q-py-sm float-right"
              size="md"
            />
          </div> -->

        
           
            
            <q-tab-panel name="AllocatedDevices">
              <AllocatedDevices @emittedForTotalSerialNumbers="this.fnAjaxAllocatedDevice" />
            </q-tab-panel>

            <q-tab-panel name="UnAllocatedDevices">
              <UnAllocatedDevices @emittedForTotalSerialNumbers="fnAjaxFetchAllDeviceDetailsWithCount" />
            </q-tab-panel>

            <q-tab-panel name="FaultyDevices">
              <FaultyDevices
                @fetchDeviceDetailsWithCount="fnAjaxFetchAllDeviceDetailsWithCount"
              />
            </q-tab-panel>
                       </q-tabs>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import AllocatedDevices from "../../pages/inventory/AllocatedDevices.vue";
import UnAllocatedDevices from "../../pages/inventory/UnAllocatedDevices.vue";
import FaultyDevices from "../../pages/inventory/FaultyDevices.vue";

import downloadExcel from "vue-json-excel";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "InventorySummary",

  components: {
   AllocatedDevices,
   UnAllocatedDevices,
   FaultyDevices,
   
   downloadExcel
   
  },

  data() {
    return {
     //enableUploadInventoryBtn: true,
   // toggleScanButton: true,
   // inventoryOptionSelected: "count"
    };
  },




methods: {
   ...mapActions("InventoryCentral",["REPORT_INVENTORY_SUMMARY"]),
   
    
    
    downloadInventorySummaryInfoMenu(){
      this.$q.loading.show({
        delay: 100 // ms
      });
      this.REPORT_INVENTORY_SUMMARY()
        .then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Success, file has been downloaded",
            icon: "check"
          });
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again",
            icon: "thumb_down"
          });
        });
    }
},

};
</script>
