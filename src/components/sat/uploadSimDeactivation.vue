<template>
  <div>
    <q-dialog
      minimized no-backdrop-dismiss v-model="toggleModel"
      :content-css="{padding: '10px', maxWidth: '50vw'}"
    > 
     <div class="q-pa-md">
        <div class="row text-center justify-center">
          <div class="col-md-12 q-py-sm bottom-border">
            <div class="text-h6 text-grey-9">
              Sim De-Activation - Bulk Upload
            </div>
          </div>
          <!-- <div class="col-md-8 q-py-md" align="left">
            <q-select color="grey-9" v-model="formData.aggregator" float-label="Select Aggregator" radio
              :options="dropdDown.aggregatorOptions" @input="getaggregator" />
          </div> -->
          <!-- <div class="col-md-8 q-py-md" align="left">
            <q-select color="grey-9" v-model="formData.deviceType" float-label="Select Device Type" radio
              :options="deviceOption" />
          </div> -->
          <div class="col-md-8" align="center">

            <q-select
  class="text-weight-regular text-grey-8"
  color="grey-9"
  v-model="formData.sim"
  float-label="Select Network"
  placeholder="Select Network"
  :options="networkOptions"
/>
</br>
            <a
              href="statics/files/Upload_Sim_data.xlsx"
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
            <q-btn
              outline
              color="dark"
              label="Cancel"
              @click="emitfnshowSimDeActivationList()"
            />
            <q-btn
            :disabled="this.formData.sim == null"
              class="common-btn"
              label="Upload"
       @click="uploadsimDeactivation()"
            />
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>


import {
  required,
  email,
  password,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric,
  sameAs
} from "@vuelidate/validators";

import { date } from "quasar";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propSimDeactivation"],
  data() {
    return {
      toggleModel: this.propSimDeactivation,
        formData: {
        deviceType: "",
              sim:null,
        // aggregator: "",
        fileSelected: []
      },
     networkOptions: [
  { value: 1, label: "Airtel" },
  { value: 2, label: "Vodafone" },
  { value: 3, label: "Jio" }
]
      }
      
    
  },

  computed: {

  },
  methods: {
       ...mapActions("DownloadInventoryResellerReports",["INVENTORY_WITH_RESELLER_LIST_ALL_DATAS"]),
           ...mapActions("SatRegionalInventory", [
      "SIM_DEACTIVE_UPLOAD_REGIONAL_INVENTORY"
    ]),
      emitfnshowSimDeActivationList() {
          this.sim = null
      this.$emit("emitpropSimDeactivation");
     },
      removeBulkUploadFile() {
      this.formData.fileSelected = [];
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


 uploadsimDeactivation(formData) {
      if (this.formData.fileSelected.length == 0) {
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: "Please upload file",
          icon: "warning"
        });
        return false;
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
        });
        let assumeFormData = new FormData();
        assumeFormData.append("file", this.formData.fileSelected[0]);
        let assumeFormDataValue = {
          file: assumeFormData,
          simData:this.formData.sim
        };
        this.SIM_DEACTIVE_UPLOAD_REGIONAL_INVENTORY(
          assumeFormDataValue 
        )
          .then(response => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Added!",
              icon: "thumb_up"
            });
            this.emitfnshowSimDeActivationList()
          // this.ajaxLoadAllLeadInfo1({pagination: this.paginationControl1, filter: this.filterSearch1});
          var contentType = response.headers.map['content-type'][0]
          let blob = new Blob([response.data], { type:  contentType });
          // const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "Sim_upload_Remarks.xlsx";  
          link.click();
            this.formData.fileSelected = [];
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body.message == null
                  ? "Please Try Again Later !"
                  : error.body.message,
              icon: "thumb_down"
            });
            // this.formData.fileSelected = []
          });
      }
    },



    
    COMMON_FILTER_FUNCTION(arraySet, terms) {
      return _.filter(arraySet, function(oo) {
        return oo.label.toString().includes(terms.toLowerCase());
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

