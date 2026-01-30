<template>
  <div>
    <q-modal
      no-refocus
      no-esc-dismiss
      no-backdrop-dismiss
      class="customModalOverlay"
      v-model="propToggleUploadDocumentAndSubmit"
      :content-css="{minWidth:'50%',height:'auto',maxHeight:'50vh',margin:'20px',padding:'20px'}"
    >
      <div class="column">
        <div class="q-py-sm q-title bottom-border">Bank Subvention Letter</div>
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
                ref="bankExceptionFileUpload"
                name="file"
                accept=".jpg, .png, .pdf"
                @change="fnGetUploadFileDetails"
              />
            </label>
            <label class="cursor-pointer bg-light-blue text-white" v-else>
              <span>
                <q-icon name="attach_file" />Modify
              </span>
              <input
                type="file"
                ref="bankExceptionFileUpload"
                name="file"
                accept=".jpg, .png, .pdf"
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
            v-if="!sendForDataEntry"
            color="grey-5"
            class="q-ma-sm float-right text-dark no-pointer-events disabled"
            align="right"
            label="Submit"
          />

          <q-btn
            icon="done"
            v-if="sendForDataEntry"
            color="positive"
            class="q-ma-sm float-right"
            @click="finalFileUploadAndSubmit(itemDetails)"
            align="right"
            label="Submit"
          />

          <q-btn
            v-if="!cancelConfirmation"
            icon="block"
            color="grey-5"
            @click="emitToggleRemarks()"
            class="q-ma-sm float-right text-dark"
            align="right"
            :v-close-overlay="cancelConfirmation? true:false"
            label="Cancel"
          />

          <q-btn
            v-if="cancelConfirmation"
            icon="block"
            color="negative"
            @click="emitToggleRemarks()"
            class="q-ma-sm float-right"
            align="right"
            v-close-overlay
            label="Close"
          />
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propLeadDetails", "propToggleUploadDocumentAndSubmit"],
  data() {
    return {
      cancelConfirmation: false,
      uploadFileName: "",
      sendForDataEntry: false,
      uploadFileBoolean: false,
      attachedFileName: "",
      itemDetails: this.propLeadDetails
    };
  },
  computed: {
    ...mapGetters("commonLoader", ["getToggleCommonLoader"])
  },
  methods: {
    ...mapActions("ExceptionQueue", [
      "FEED_SAT_EQ_BANK_FEEDBACK",
      "UPLOAD_EXCEPTION_FILE"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    // emitToggleRemarks(item) {
    //   if (this.attachedFileName == "") {
    //     this.$emit("toggleDocumentUploadAndFinalSubmit", item);
    //   } else {
    //     this.cancelConfirmation = true;
    //   }
    // },
    emitToggleRemarks(item) {
      this.$emit("toggleDocumentUploadAndFinalSubmit", item);
    },

    // Function to upload file to server with lead details **two apis
    finalFileUploadAndSubmit(itemDetails) {
      let formData = new FormData();
      let uploadFiles = this.$refs.bankExceptionFileUpload;
      formData.append("file", uploadFiles.files[0]);
      formData.append(
        "fileNameOriginal",
        itemDetails.id + "_bankSubventionDocument"
      );
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Processing .."
      });
      this.UPLOAD_EXCEPTION_FILE(formData)
        .then(response => {
          let cookedBankArr = {
            leadInformation: {
              verifiedBanksubventionStatus: 1,
              id: itemDetails.id
            },
            leadVerificationStatus: {
              fieldName: "Bank Subvention",
              reason: "",
              bankAttachedFile: response.fileUri,
              mimeType: response.mimeType
            }
          };
          this.FEED_SAT_EQ_BANK_FEEDBACK(cookedBankArr)
            .then(response => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message:
                  "Lead: #" + itemDetails.id + " is sent for data entry!",
                icon: "thumb_up"
              });
              this.$router.push("/sat/exception/queue");
            })
            .catch(error => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                icon: "thumb_down"
              });
            });
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Error in uploading document!",
            icon: "thumb_down"
          });
        });
    },

    // Function to get uploaded file details
    fnGetUploadFileDetails() {
      let uploadFiles = this.$refs.bankExceptionFileUpload;
      this.attachedFileName = uploadFiles.files[0].name;
      if (uploadFiles.files.length > 0) {
        this.sendForDataEntry = true;
      } else {
        this.sendForDataEntry = false;
      }
    }
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
