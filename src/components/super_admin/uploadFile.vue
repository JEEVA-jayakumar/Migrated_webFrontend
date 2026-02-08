<template>
  <div>
    <q-dialog
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitfnshowUploadFile()"
      @escape-key="emitfnshowUploadFile()"
      :content-css="{minWidth:'50%',height:'auto',maxHeight:'50vh',margin:'20px',padding:'20px'}"
    >
      <div class="column">
        <div class="q-py-sm text-h6 bottom-border">Upload Bank List</div>
        <div class="q-py-sm">
          <div v-if="!uploadFileBoolean" class="group">
            <label
              class="cursor-pointer bg-grey-7 text-white"
              v-if="attachedFileName == '' || attachedFileName == null "
            >
              <span>
                <q-icon name="attach_file" />Attach
              </span>
              <input
                type="file"
                ref="file"
                name="file"
                accept=".xlsx"
                @change="fnGetUploadFileDetails"
              />
            </label>
            <label class="cursor-pointer bg-light-blue text-white" v-else>
              <span>
                <q-icon name="attach_file" />Modify
              </span>
              <input
                type="file"
                ref="file"
                name="file"
                accept=".xlsx"
                @change="fnGetUploadFileDetails"
              />
            </label>
            <div class="q-py-md" v-if="attachedFileName !=''">
              <span class="text-faded">Attached File:</span>
              {{attachedFileName}}
            </div>
          </div>
          <div v-else>
            <q-btn
              dense
              outline
              color="grey-7"
              size="sm"
              class="file-return text-faded no-pointer-events"
            >{{uploadFileName}}</q-btn>
          </div>
        </div>
        <div class="q-py-sm">
          <q-btn
            icon="done"
            v-if="sendForDataEntry"
            color="positive"
            class="center"
            @click="finalFileUploadAndSubmit()"
            align="right"
            label="Submit"
          />
          <q-btn
            icon="done"
            v-if="sendForDataEntry"
            color="positive"
            class="center"
            @click="finalFileUploadAndSubmit()"
            align="right"
            label="cancel"
          />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propShowUploadFile"],
  data() {
    return {
      uploadFileName: "",
      sendForDataEntry: false,
      uploadFileBoolean: false,
      attachedFileName: "",
      toggleModel: this.propShowUploadFile,
      cancelConfirmation: false
    };
  },
  computed: {},
  methods: {
    ...mapActions("BankListUploadFile", ["UPLOAD_BANKLIST_FILE"]),
    emitfnshowUploadFile() {
      this.$emit("uploadFile");
    },
    // fncancel(item) {
    //   if (this.attachedFileName == "") {
    //     this.emitfnshowUploadFile();
    //   } else {
    //     this.cancelConfirmation = true;
    //   }
    // },

    // Function to upload file to server with lead details **two apis
    finalFileUploadAndSubmit() {
      let formData = new FormData();
      let uploadFiles = this.$refs.file;
      formData.append("file", uploadFiles.files[0]);
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Processing .."
      });
      this.UPLOAD_BANKLIST_FILE(formData)
        .then(response => {
          this.$q.loading.hide();
          this.$emit("emitfnshowUploadFile");
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully uploaded",
            icon: "thumb_up"
          });
          this.$refs.file = "";
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: error.data.message,
            icon: "thumb_down"
          });
          this.$refs.file = "";
        });
    },

    // Function to get uploaded file details
    fnGetUploadFileDetails() {
      let uploadFiles = this.$refs.file;
      this.attachedFileName = uploadFiles.files[0].name;
      if (uploadFiles.files.length > 0) {
        this.sendForDataEntry = true;
      } else {
        this.sendForDataEntry = false;
      }
    }
    // fnclose() {
    //   this.$router.push("super/admin/manage/mdr/bankSO");
    // }
  }
};
</script>
<style scoped>
label {
  padding: 10px;
  display: table;
}

input[type="file"] {
  display: none;
}
</style>
