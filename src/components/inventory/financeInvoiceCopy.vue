<template>
  <div>
    <q-dialog
      v-model="toggleModal"
      @hide="emitToggleinventoryBulkUpload(toggleModal)"
      @escape-key="emitToggleinventoryBulkUpload(toggleModal)"
      :content-css="{ padding: '13px', maxWidth: '63vw' }"
    >
      <div class="q-pa-md">
        <div class="row text-center justify-center">
          <div class="col-md-12 q-py-sm">
            <div class="row items-center bottom-border q-py-sm">
              <div class="col">
                <b>PLACEHOLDER INVOICE COPY</b>
              </div>
              <div class="col-auto">
                <q-btn
                  round
                  size="sm"
                  @click="emitToggleinventoryBulkUpload(toggleModal)"
                  outline
                  color="dark"
                  icon="clear"
                />
              </div>
            </div>
          </div>
          <!-- <div class="col-md-8" align="center">
            <a
              href="statics/files/deviceUploadTemplate.xlsx"
              class="hide-underline"
            >
              Click here to download the template
            </a>
          </div> -->
          <div class="col-md-8 q-py-md" align="center">
            <div
              v-if="formData.fileSelected.length === 0"
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
                  multiple
                />
              </label>
            </div>
            <div v-else align="left">
              <q-card dense class="q-pa-xs">
                <q-card-section>
                  Uploaded Files
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <div
                    v-for="(file, index) in formData.fileSelected"
                    :key="index"
                  >
                    <q-item dense>
                      <q-item-section icon="attach_file" />
                      <q-item-section>{{ file.name }}</q-item-section>
                      <q-item-section>
                        <q-btn
                          class="fa fa-close"
                          size="sm"
                          color="negative"
                          @click="removeBulkUploadFile(index)"
                          label="Remove"
                          icon="clear"
                        />
                      </q-item-section>
                    </q-item>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div class="col-md-12 group" align="center">
            <q-btn
              highlight
              push
              icon="attach_file"
              class="common-btn"
              @click="uploadFileForBulkUpload"
              >Upload</q-btn
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
        fileSelected: []
      },
      uploaderHovered: false
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE"
    ]),
    ...mapActions("InventoryBulkUploadDevice", [
      "FEED_SEND_TO_REPAIR_DEVICE_BULK_UPLOAD_DATA",
      "FEED_MOVIE_TO_SCRAP_DEVICE_BULK_UPLOAD_DATA"
    ]),
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
      this.formData.fileSelected = Array.from(e.target.files); // Convert FileList to array
    },
    removeBulkUploadFile(index) {
      this.formData.fileSelected.splice(index, 1); // Remove file at given index
    },
    sendToRepairUpload(formData) {
        this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Validating .."
      });
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
       // Append all selected files to FormData
  for (let i = 0; i < this.formData.fileSelected.length; i++) {
    assumeFormData.append("files[]", this.formData.fileSelected[i]);
  }

  let assumeFormDataValue = {
    files: assumeFormData,
    // Add other values if needed
  };

      this.FEED_SEND_TO_REPAIR_DEVICE_BULK_UPLOAD_DATA(assumeFormDataValue)
        .then(response => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Devices Successfully added!",
            icon: "thumb_up"
          });
          this.emitToggleinventoryBulkUpload();
          this.$emit("emitToggleinventoryBulkUploadOnSuccess");
          this.formData.fileSelected = [];
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: `${error.data.message}`,
            icon: "thumb_down"
          });
        });
    },
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
