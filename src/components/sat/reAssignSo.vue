<template>
    <div>
      <q-dialog
        v-model="toggleModal"
        no-backdrop-dismiss
        no-esc-dismiss
        :content-css="{padding:'10px',maxWidth:'50vw',minHeight:''}"
      >
        <div class="q-pa-md">
          <div class="column">
            <!-- <pre>{{propAllScannedItemArr}}</pre> -->
            <div class="col-md-12 bottom-border">
              <div class="text-h6 text-weight-regular q-py-sm">POD Number</div>
            </div>
            <div class="col-md-8 q-pt-md" align="left">
              <q-input
                color="grey-9"
                v-model="formData.podNumber"
                float-label="Enter POD Number"
                placeholder="POD Number"
              />
              <br>
              <q-input
              v-model="formData.remarks"
              filled
              clearable
              type="textarea"
              color="red-12"
              float-label="Enter Remarks"
              placeholder="Enter Remarks"
               label="Textarea with shadow text"
            />
            </div>
            <div class="col-md-12 col-md-6 q-pt-md group" align="right">
              <q-btn icon="block" outline label="Cancel" @click="emitToggleCheque" />
              <q-btn icon="check" class="common-btn" :disable="this.formData.remarks == '' || this.formData.podNumber ==''" label="Submit" @click="fnSubmitAllocateRegion" />
            </div>
          </div>
        </div>
      </q-dialog>
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
          deviceSno: this.propAllScannedItemArr.scannedItems[0].deviceSerialNumbers[0],
          assignedUser:this.propAllScannedItemArr.assignedUserId,
          reAssignedUser: this.propAllScannedItemArr.so,
          podNumber: "",
          remarks: ""
        }
      };
    },
  beforeMount(){
    console.log("DATAT",JSON.stringify(this.propAllScannedItemArr));
  },
    methods: {
      ...mapActions("InventoryCentral", [
        "FEED_ALLOCATE_TO_REGION",
        "FEED_ALLOCATE_SO_TO_SO"
      ]),
      ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
  
      emitToggleCheque(toggleModal) {
        this.$emit("closeModel");
      },
      fnSubmitAllocateRegion(request) {
        let params = {};
        if (this.formData.assignedUser == "") {
          this.$q.notify({
            color: "amber-9",
            position: "bottom",
            message: "assignedUser cannot be empty!",
            icon: "warning"
          });
        } else if (this.formData.podNumber == "") { 
          this.$q.notify({
            color: "amber-9",
            position: "bottom",
            message: "POD number cannot be empty!",
            icon: "warning"
          });
        } else if (this.formData.deviceSno.length == 0) {
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
          this.FEED_ALLOCATE_SO_TO_SO(this.formData)
            .then(() => {
              this.TOGGLE_COMMON_LOADER(false);
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Devices has been successfully allocated to region",
                icon: "thumb_up"
              });
              this.emitToggleCheque();
              this.$q.loading.hide();
            })
            .catch(error => {
              this.TOGGLE_COMMON_LOADER(false);
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                icon: "thumb_down"
              });
              this.$q.loading.hide();
            });
        }
      },
    }
  };
  </script>
  