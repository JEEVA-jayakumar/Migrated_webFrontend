<template>
  <q-page>
    <div>
      <div class="q-pa-md">
        <div class="row text-center justify-center">
          <div class="col-md-12 q-py-sm bottom-border custom-background">
            <div class="q-title text-grey-9">Ticket Assign/Reassign - Bulk Upload</div>
          </div>
          <br />
          <div class="col-md-8 q-py-md" align="center">
            <a href="statics/files/Assign_Ticket.xlsx" class="hide-underline">
              Click here to download the template
            </a>
          </div>
          <div class="col-md-8 q-py-md" align="center">
            <div
              v-if="formData.fileSelected.length == 0"
              :class="[
                uploaderHovered0 ? 'toggleBulkUploadDisable' : 'toggleBulkUploadActive',
              ]"
              class="drop display-inline align-center cursor-pointer"
              @dragover.prevent="dragAndDropCustomAnimate(true, 0)"
              @dragleave.prevent="dragAndDropCustomAnimate(false, 0)"
              @drop="onDrop($event, 0)"
            >
              <label class="btn display-inline cursor-pointer">
                Drag & Drop or click here to open a file
                <input
                  type="file"
                  name="image"
                  @change="onChange($event, 0)"
                  ref="deviceBulkUpload"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </label>
            </div>
            <div v-else align="left">
              <q-card dense class="q-pa-xs">
                <q-card-title> Uploaded File </q-card-title>
                <q-card-separator />
                <q-card-main>
                  <q-item dense>
                    <q-item-side icon="attach_file" />
                    <q-item-main>{{ formData.fileSelected[0].name }}</q-item-main>
                    <q-item-side></q-item-side>
                  </q-item>
                </q-card-main>
                <q-card-separator />
                <q-card-actions align="end">
                  <q-btn
                    outline
                    size="sm"
                    color="negative"
                    @click="removeBulkUploadFile(formData)"
                    label="Remove"
                    icon="clear"
                  />
                </q-card-actions>
              </q-card>
            </div>
          </div>
          <div class="col-md-12 group" align="center">
            <q-btn
              type="button"
              color="purple-9"
              :disabled="formData.fileSelected.length == 0 ? true : false"
              label="Upload"
              @click="uploadlist"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="toggleAjaxLoadFilter || toggleAjaxLoadFilter1"
      class="fullscreen spinner-overlay"
    >
      <q-spinner-bars class="absolute-center" style="color: #61116a" :size="35" />
    </div>
  </q-page>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "serviceticket",
  components: {},
  data() {
    return {
      error: true,
      warning: false,
      formData: {
        fileSelected: [],
      },
      toggleAjaxLoadFilter: false,
      uploaderHovered0: false,
    };
  },

  computed: {},

  mounted() {},
  created() {},
  methods: {
    ...mapActions("SatRegionalInventory", ["TICKET_ASSIGN_BULK_UPLOAD"]),
    removeBulkUploadFile(formData) {
      formData.fileSelected = [];
    },
    dragAndDropCustomAnimate(action, target) {
      target === 0 ? (this.uploaderHovered0 = action) : (this.uploaderHovered1 = action);
    },
    onDrop(event, target) {
      event.stopPropagation();
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (target === 0) {
        this.formData.fileSelected = files;
      } else {
        this.formData1.fileSelected = files;
      }
    },
    uploadlist(formData) {
      this.toggleAjaxLoadFilter = true;
      let assumeFormData = new FormData();
      assumeFormData.append("file", this.formData.fileSelected[0]);
      let assumeFormDataValue = {
        file: assumeFormData,
      };
      this.TICKET_ASSIGN_BULK_UPLOAD(assumeFormDataValue)
        .then((response) => {
          var contentType = response.headers.map["content-type"][0];
          let blob = new Blob([response.data], { type: contentType });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "Assign_Status.xlsx";
          link.click();
          this.toggleAjaxLoadFilter = false;
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully  Assigned!",
            icon: "thumb_up",
          });
          this.formData.fileSelected = [];
        })
        .catch((error) => {
          if (error.status == 500) {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body.message == null ? "Internal Server Error" : error.body.message,
              icon: "thumb_down",
            });
          } else if (error.status == 400) {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Bad Request" : error.body.message,
              icon: "thumb_down",
            });
          } else if (error.status == 404) {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Not Found" : error.body.message,
              icon: "thumb_down",
            });
          } else if (error.status == 406) {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Not Acceptable" : error.body.message,
              icon: "thumb_down",
            });
          } else {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body.message == null
                  ? "Please Try Again Later !"
                  : error.body.message,
              icon: "thumb_down",
            });
          }
          this.formData.fileSelected = [];
          this.toggleAjaxLoadFilter = false;
        });
    },
    onChange(event, target) {
      const files = event.target.files;
      if (target === 0) {
        this.formData.fileSelected = Array.from(files);
      } else {
        this.formData1.fileSelected = Array.from(files);
      }
    },
  },
};
</script>
<style>
.customTabActive {
  background: purple;
  color: #fff;
}
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
