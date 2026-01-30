<template>
    <div>
      <q-modal
        minimized
        v-model="toggleModal"
        @hide="emitToggleStaticQrFileUpload(toggleModal)"
        @escape-key="emitToggleStaticQrFileUpload(toggleModal)"
        :content-css="{ padding: '30px', minWidth: '30vw' }"
      >
        <div class="q-pa-md">
          <div class="column text-center justify-center">
            <div class="col-md-12 q-py-sm bottom-border">
              <div class="q-title text-grey-9"><b>Static QR Excel File Upload</b></div>
            </div>
            <!-- <div class="col-md-8" align="left">
              <a
                href="statics/files/faultDeviceUploadTemplate.xlsx"
                class="hide-underline"

                >Click here to download the template</a
              >
            </div> -->
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
              <label style="width: auto;" class="btn display-inline cursor-pointer">
                Drag & Drop Or Click Here To Open A File
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
                  <q-card-title>Uploaded File</q-card-title>
                  <q-card-separator />
                  <q-card-main>
                    <q-item dense>
                      <q-item-side icon="attach_file" />
                      <q-item-main>{{
                        formData.fileSelected[0].name || ""
                      }}</q-item-main>
                      <q-item-side></q-item-side>
                    </q-item>
                  </q-card-main>
                  <q-card-separator />
                  <q-card-actions align="end">
                    <q-btn
                      size="sm"
                      color="negative"
                      @click="removeUploadFile"
                      label="Remove"
                      icon="clear"
                    />
                  </q-card-actions>
                </q-card>
              </div>
            </div>
            <div class="col-md-12 group" align="right">
              <q-btn
                color="dark"
                label="Cancel"
                @click="emitToggleStaticQrFileUpload"
              />
              <q-btn
                color="purple-9"
                label="Upload"
                :disabled="formData.fileSelected.length == 0 ? true : false"
                @click="uploadFileForUpload"
              />
            </div>
          </div>
        </div>
      </q-modal>
    </div>
  </template>
  <script>
  import Vue from "vue";
  import { required, requiredIf } from "vuelidate/lib/validators";
  import { mapGetters, mapActions } from "vuex";
  export default {
    props: ["propFileUpload", "propAllExcelFile"],
  
    data() {
      return {
        toggleModal: this.propFileUpload,
        selectOption: [],
        formData: {
          fileSelected: []
        },
        uploaderHovered: false
      };
    },
    validations: {
      formData: {
      }
    },
    methods: {
      ...mapActions("staticQRDownload", ["FEED_STATIC_QR_LEAD_UPLOAD_DATA"]),
      emitToggleStaticQrFileUpload(toggleModal) {
        this.$emit("closeModel");
      },
  
      removeUploadFile() {
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
      uploadFileForUpload(formData) {
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
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
        });
          let assumeFormData = new FormData();
          assumeFormData.append("file", this.formData.fileSelected[0]);
          let assumeFormDataValue = {
            file: assumeFormData
          };
  
          this.FEED_STATIC_QR_LEAD_UPLOAD_DATA(assumeFormDataValue)
            .then(response => {
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully Uploaded!",
                icon: "thumb_up"
              });
              this.$q.loading.hide();
              this.$emit("closeModel");
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                icon: "thumb_down"
              });
              this.$q.loading.hide();
            });
        }
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
  
