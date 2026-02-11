<template>
  <div>
    <q-dialog
      @hide="emitToggleRemarks"
      @escape-key="emitToggleRemarks"
      v-model="toggleModal"
      :content-css="{ padding: '10px', minWidth: '50vw', minHeight: '75vh' }"
    >
      <div class="row items-center q-py-sm bottom-border">
        <div class="col">Document Viewer</div>
        <div class="col" align="right">
          <q-btn
            outline
            round
            size="sm"
            color="dark"
            icon="clear"
            @click="emitToggleRemarks"
          />
        </div>
      </div>
      <div class="row q-py-sm">
        <div class="full-width">
          <vuePdfjs
            :url="GLOBAL_FILE_FETCH_URL + '/' + itemDetail"
            :type="0"
            :height="'400px'"
            style="max-width: 100%"
          ></vuePdfjs>
        </div>
      </div>
      <div class="col-md-12 group" align="right">
        <q-btn align="right" @click="Download()" color="purple-9">Download</q-btn>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { url } from '@vuelidate/validators';
import vuePdfjs from "vue-pdfjs";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    vuePdfjs,
  },
  props: ["propToggleshowPDFModal", "propPDFDetails"],
  data() {
    return {
      toggleModal: this.propToggleshowPDFModal,
      itemDetail: this.propPDFDetails,
    };
  },
  beforeMount() {},
  computed: {
    ...mapGetters("globalSearchSerialNumber", ["getdocdownload"]),
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
  },
  methods: {
    ...mapActions("globalSearchSerialNumber", ["DOC_DOWNLOAD"]),

    emitToggleRemarks() {
      this.$emit("togglePDFModal");
    },
    Download() {
      this.$q.loading.show({
        delay: 100,
        spinnerColor: "purple-9",
        message: "Please wait..",
      });
      // console.log("this.propPDFDetails",this.propPDFDetails)
      //  const fileExtension = this.propPDFDetails.split('.');
      // console.log("this.fileExtension",fileExtension)
      // this.propPDFDetails = fileExtension[0]
      // console.log("this.propPDFDetails",this.propPDFDetails)
      this.DOC_DOWNLOAD(this.propPDFDetails)
        .then((response) => {
          var contentType =
            response.headers.map["content-type"] &&
            response.headers.map["content-type"].length > 0
              ? response.headers.map["content-type"][0]
              : null;
          if (!contentType) {
            throw new Error("Content-Type header is missing");
          }

          var blob = new Blob([response.data], { type: contentType });

          var extension = "";

          if (contentType.indexOf("image/jpeg") !== -1) {
            extension = ".jpg";
          } else if (contentType.indexOf("image/png") !== -1) {
            extension = ".png";
          }

          var filename = this.propPDFDetails
            ? this.propPDFDetails
            : "downloaded_image" + extension;

          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();

          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);

          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully Downloaded",
            icon: "thumb_up",
          });
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Download failed",
            icon: "error",
          });
        });
    },
  },
};
</script>
<style>
.no-underline {
  text-decoration: none;
}
</style>
