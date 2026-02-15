 <template>
  <q-page>
    <div class="text-grey-9">
      <div class="row bottom-border q-pa-sm items-center">
        <div class="col">
          <q-tabs no-pane-border v-model="QRselected" color="dark" inverted class="shadow-1">
            <q-tab name="HitachiUpload" label="Upload And Download" slot="title" />
            <q-tab-panel name="HitachiUpload">
              <HitachiUpload />
            </q-tab-panel>
          </q-tabs>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { not, or } from '@vuelidate/validators';
import HitachiUpload from "../../components/sat/HitachiUpload.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "QRSticker",

  components: {
    HitachiUpload
  },

  data() {
    return {
      QRselected: "HitachiUpload"
    };
  },

  computed: {},

  created() {},

  methods: {}
};
</script>

<style>
.border-1 {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.border-2 {
  border: 3px solid rgba(48, 48, 48, 0.5);
}
</style>
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 <!-- <template>
  <q-page>
    <div class="q-pa-md bottom-border">
      <div class="row text-center justify-center">
        <div class="col-md-12 q-py-md bottom-border">
          <div class="text-h6 q-px-lg q-py-md text-width-large text-grey-9">
            Upload
          </div>
        </div>

        <div class="col-md-8" align="justify-center">
          <br /><br /><br /><br /><br /><br/>
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
                  <q-item-section>{{ formData.fileSelected[0].name }}</q-item-section>
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
        <div class="col-md-8 group" align="right">
          <q-btn
            class="common-btn"
            label="Upload"
            @click="uploadFileForBulkUpload"
          />
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="row text-center justify-center">
        <div class="col-md-12 q-py-md bottom-border">
          <div class="text-h6 text-grey-9">
            Download
          </div>
        </div>
        
        <div class="col-md-8 group" align="justify-center">
        <br /><br /><br /><br /><br /><br/>
          <q-btn
            class="common-btn"
            label="Download"
            @click="uploadFileForBulkUpload"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { not, or } from '@vuelidate/validators';

import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      selectOption: [],
      formData: {
        fileSelected: []
      },
      uploaderHovered: false
    };
  },
  methods: {
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE"
    ]),
    ...mapActions("InventoryBulkUploadDevice", [
      "FEED_DEVICE_BULK_UPLOAD_DATA"
    ]),

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
      console.log(file);
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

    uploadFileForBulkUpload(formData) {
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

      this.FEED_DEVICE_BULK_UPLOAD_DATA(assumeFormDataValue)
        .then(response => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Devices Successfully added!",
            icon: "thumb_up"
          });
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message:
              error.body.message == null
                ? "Please Try Again Later !"
                : error.body.message,
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
</style> -->



