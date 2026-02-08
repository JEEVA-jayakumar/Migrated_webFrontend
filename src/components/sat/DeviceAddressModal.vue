<template>
  <q-dialog
  minimized
  no-backdrop-dismiss	
  no-esc-dismiss	
  v-model="toggleModal"  
  :content-css="{padding:'30px',minWidth: '40vw'}"
  class="customModalOverlay"
  >
    <form>
      <div class="column group">
        <div class="text-h6">
          Update Device Address
        </div>
        <!-- <pre>{{stateInformation}}</pre> -->
        <div>
          <q-input @blur="$v.formData.marsDeviceAddress.deviceAddress.$touch"      
          :error="$v.formData.marsDeviceAddress.deviceAddress.$error"  color="grey-9" v-model="formData.marsDeviceAddress.deviceAddress" float-label="Address" placeholder="Address" />
        </div>
        <div>
          <q-input :error="$v.formData.marsDeviceAddress.pincode.$error" 
          color="grey-9" v-model="formData.marsDeviceAddress.pincode" float-label="Pincode" placeholder="Pincode">
            <q-autocomplete
            @search="pincodeSearch"
            :debounce="500"
            :min-characters="1"
            @selected="pincodeSelected"
            />
          </q-input>
        </div>
        <div>
         <q-input color="grey-9" disable v-model="formData.marsDeviceAddress.state" float-label="State" placeholder="State" />
        </div>
        <div>
          <q-input color="grey-9" disable v-model="formData.marsDeviceAddress.city" float-label="City" placeholder="City" />
        </div>
        <div>
          <q-radio color="grey-9" v-if="[0,1].includes(selectedLeadItems.length)" v-model="formData.action" :val="1" label="Change in current occurrence only" />
        </div>
        <div>
          <q-radio color="grey-9" v-if="selectedLeadItems.length > 1" v-model="formData.action" :val="2" label="Change in all selected occurrences" />
        </div>
        <div>
          <q-radio color="grey-9" v-model="formData.action" :val="3" label="Change in all occurrences of this merchant" />
        </div>
        <div class="group" align="right">
          <q-btn @click="closeModal" color="grey-6" icon="block" label="Cancel"/>
          <q-btn @click="UpdateDeviceAddress(formData)" color="positive" icon="check" label="Save"/>
        </div>
      </div>
    </form>
  </q-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "@vuelidate/validators";

export default {
  name: "DeviceAddressModal",
  props: [
    "showDeviceAddressModal",
    "currentDeviceInfo",
    "stateInformation",
    "paginationControl",
    "selectedLeadItems"
  ],
  data() {
    return {
      toggleModal: this.showDeviceAddressModal,
      formData: {
        action: 3,
        id: this.currentDeviceInfo.id,
        marsDeviceAddress: {
          deviceAddress: this.currentDeviceInfo.marsDeviceAddress.deviceAddress,
          latitude: 0,
          longitude: 0,
          pincode: this.currentDeviceInfo.marsDeviceAddress.pincode,
          city: this.currentDeviceInfo.marsDeviceAddress.city,
          state: this.currentDeviceInfo.marsDeviceAddress.state
        }
      },
      pagination: this.paginationControl
    };
  },

  validations: {
    formData: {
      marsDeviceAddress: {
        deviceAddress: { required },
        pincode: { required },
        state: { required },
        city: { required }
      }
    }
  },

  computed: {
    ...mapGetters("ImplementationQueue", [
      "getImplementationQueueAssignedList",
      "getImplementationQueueCourierList",
      "getImplementationQueueUnassignedList"
    ]),
  },
  methods: {
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    ...mapActions("SatLeadValidation", ["UPDATE_DEVICE_ADDRESS"]),
    ...mapActions("ImplementationQueue", [
    "IMPLEMENTATION_QUEUE_ASSIGNED_LIST",
      "IMPLEMENTATION_QUEUE_UNASSIGNED_LIST",
      "IMPLEMENTATION_QUEUE_COURIER_LIST",
      "IMPLEMENTATION_QUEUE_SUBMIT"
    ]),

    COMMON_FILTER_FUNCTION(arraySet, terms) {
      return _.filter(arraySet, function(oo) {
        return oo.label.toLowerCase().includes(terms.toLowerCase());
      });
    },

    /* Pincode search result */
    pincodeSearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.stateInformation, terms));
    },
    pincodeSelected(item) {
      this.formData.marsDeviceAddress.state = item.value.stateName;
      this.formData.marsDeviceAddress.city = item.value.cityName;
      this.formData.marsDeviceAddress.pincode = item.value.pincode;
    },
    /* Pincode search result */

    closeModal() {
      this.$emit("toggleModal", this.pagination);
    },
    UpdateDeviceAddress(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.TOGGLE_COMMON_LOADER(true);
        this.UPDATE_DEVICE_ADDRESS(formData)
          .then(() => {
            this.TOGGLE_COMMON_LOADER(false);
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Address Updated Successfully",
              icon: "thumb_up"
            });
            // this.IMPLEMENTATION_QUEUE_COURIER_LIST();
            this.closeModal();
            // this.IMPLEMENTATION_QUEUE_UNASSIGNED_LIST().then(() => {
              
            // });
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

<style>
</style>
