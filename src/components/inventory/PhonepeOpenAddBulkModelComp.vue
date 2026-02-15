<template>
  <div>
    <q-dialog
      v-model="toggleModal"
      @hide="emitToggleinventoryBulkUpload(toggleModal)"
      @escape-key="emitToggleinventoryBulkUpload(toggleModal)"
      :content-css="{ padding: '30px', maxWidth: '40vw' }"
    >
      <div class="q-pa-md">
        <div class="row text-center justify-center">
          <div class="col-md-12 q-py-sm bottom-border">
            <div class="text-h6 text-grey-9">Bulk Upload</div>
          </div>

          <div class="col-md-8" align="left">
            <a
              href="statics/files/deviceUploadTemplate.xlsx"
              class="hide-underline"
            >
              Click here to download the template</a
            >
          </div>
          <div class="col-md-8 q-py-md" align="center">
            <div
              v-if="formData.fileSelected.length == 0"
              :class="[
                uploaderHovered
                  ? 'toggleBulkUploadDisable'
                  : 'toggleBulkUploadActive'
              ]"
              class="drop display-inline align-center cursor-pointer"
              @dragover.prevent="dragAndDropCustomAnimate(true)"
              @dragleave.prevent="dragAndDropCustomAnimate(false)"
              @drop="onDrop"
            >
              <label class="btn display-inline cursor-pointer">
                Drag & Drop or click here to open a file
                <input
                  type="file"
                  name="image"
                  @change="onChange"
                  ref="deviceBulkUpload"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </label>
            </div>
            <div v-else align="left">
              <q-card dense class="q-pa-xs">
                <q-card-section>
                  Uploaded File
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <q-item dense>
                    <q-item-section icon="attach_file" />
                    <q-item-section>{{
                      formData.fileSelected[0].name
                    }}</q-item-section>
                    <q-item-section></q-item-section>
                  </q-item>
                </q-card-section>
                <q-separator />
                <q-card-actions align="end">
                  <q-btn
                    outline
                    size="sm"
                    color="negative"
                    @click="removeBulkUploadFile"
                    label="Remove"
                    icon="clear"
                  />
                </q-card-actions>
              </q-card>
            </div>
          </div>
          <div class="col-md-12 group" align="right">
            <!-- <q-btn
              outline
              color="dark"
              label="Cancel"
              @click="emitToggleinventoryBulkUpload"
            /> -->
            <q-btn
                  highlight
                  push
                  class="common-btn"
                   colour="positive"
                  @click="sendToRepairUpload"
                  
                  >Send To Repair</q-btn
                >
            <!-- <q-btn
              class="common-btn"
              label="Upload"
              @click="uploadFileForBulkUpload"
            /> -->
            <q-btn
                  highlight
                  push
                  class="common-btn"
                   colour="positive"
                  @click="moveToScrapUpload"
                 
                  >Moved To Scrap </q-btn
                >
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>
<script>
import { not, or } from '@vuelidate/validators';

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propOpenBulkModal"],

  data() {
    return {
      toggleModal: this.propOpenBulkModal,
      rawDevicesTypes: this.propAllDevicestypes,
      selectOption: [],
      formData: {
        deviceType: "",
        fileSelected: []
      },
      uploaderHovered: false
    };
  },
  created() {
    this.deviceTypeOptions();
  },
  computed:{
        // ...mapGetters("SendToRepair", ["getSendToRepairDetails"])
  },
  methods: {
    ...mapActions("InventoryCentral", [
      "PHONEPE_FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "PHONEPE_FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE"
    ]),
    // ...mapActions("SendToRepair", [
    //   "FETCH_SEND_TO_REPAIR_DETAILS",
    //   "APPROVE_SEND_TO_REPAIR_UPLOAD",
    //   "MOVED_TO_SCRAP_DATAS"
    // ]),
    ...mapActions("PhonepeInventoryBulkUploadDevice", ["FEED_PHONEPE_SEND_TO_REPAIR_DEVICE_BULK_UPLOAD_DATA","FEED_PHONEPE_MOVIE_TO_SCRAP_DEVICE_BULK_UPLOAD_DATA"
    ]),
    deviceTypeOptions() {
      let cookedArr = [];
      this.propAllDevicestypes.map(function(value, index) {
        cookedArr.push({
          label: value.deviceName,
          value: value.id
        });
      });
      this.formData.deviceType = cookedArr[0].value;
      this.selectOption = cookedArr;
    },

    emitToggleinventoryBulkUpload(toggleModal) {
      this.$emit("closeModel");
    },

    removeBulkUploadFile() {
      this.formData.fileSelected = [];
    },

    dragAndDropCustomAnimate(action) {
      this.uploaderHovered = action;
    },
    onDrop: function(e) {
      e.stopPropagation();
      e.preventDefault();
      this.formData.fileSelected = e.dataTransfer.files;
      this.fileCheckSum(e.dataTransfer.files);
    },

    fileCheckSum(file) {
      let re = /(\.csv|\.xlsx|\.xls)$/i;
      if (!re.exec(file[0].name)) {
        this.formData.fileSelected = [];
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "File format not supported",
          icon: "clear"
        });
        return false;
      }
    },

    onChange(e) {
      this.formData.fileSelected = e.target.files;
    },
    moveToScrapUpload(formData){
      if (this.formData.fileSelected.length == 0) {
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: "Please upload file",
          icon: "warning"
        });
        return false;
      }
      let assumeFormData = new FormData();
      assumeFormData.append("file", this.formData.fileSelected[0]);

      let assumeFormDataValue = {
        file: assumeFormData,
        device_type: this.formData.deviceType
      };

      this.FEED_PHONEPE_MOVIE_TO_SCRAP_DEVICE_BULK_UPLOAD_DATA(assumeFormDataValue)
        .then(response => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Devices Successfully added!",
            icon: "thumb_up"
          });
          this.emitToggleinventoryBulkUpload();
          this.$emit("emitToggleinventoryBulkUploadOnSuccess");
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message:`${error.data.message}`,
            icon: "thumb_down"
          });
        });
    },

    sendToRepairUpload(formData) {
      if (this.formData.fileSelected.length == 0) {
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: "Please upload file",
          icon: "warning"
        });
        return false;
      }
      let assumeFormData = new FormData();
      assumeFormData.append("file", this.formData.fileSelected[0]);

      let assumeFormDataValue = {
        file: assumeFormData,
        device_type: this.formData.deviceType
      };

      this.FEED_PHONEPE_SEND_TO_REPAIR_DEVICE_BULK_UPLOAD_DATA(assumeFormDataValue)
        .then(response => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Devices Successfully added!",
            icon: "thumb_up"
          });
          this.emitToggleinventoryBulkUpload();
          this.$emit("emitToggleinventoryBulkUploadOnSuccess");
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message:`${error.data.message}`,
            icon: "thumb_down"
          });
        });
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Arial";
  font-size: 12px;
}

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
}

input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.align-center {
  text-align: center;
}

.helper {
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  width: 0;
}

.hidden {
  display: none !important;
}

.hidden.image {
  display: inline-block !important;
}

.display-inline {
  display: inline-block;
  vertical-align: middle;
}

.img {
  border: 1px solid #f6f6f6;
  display: inline-block;
  height: auto;
  max-height: 80%;
  max-width: 80%;
  width: auto;
}

.drop {
  padding: 15px;
  background-color: #f6f6f6;
  border-radius: 2px;
  height: 100%;
  max-height: 400px;
  max-width: 600px;
  width: 100%;
}
.toggleBulkUploadActive {
  border: 4px dashed #ccc;
}
.toggleBulkUploadDisable {
  border: 4px dashed #1f2c3fa6;
}
.hide-underline {
  text-decoration: none;
}
</style>
