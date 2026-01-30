<template>
  <div>
    <q-modal
      minimized
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitfnshowservice()"
      :content-css="{ padding: '25px', minWidth: '30vw' }"
    >
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">DOC Viewer</div>
          </div>
          <div class="col-md-12">
            <img
              :src="[GLOBAL_FILE_FETCH_URL + '/' + this.propRowDetails]"
              style="max-width: 100%"
              :height="'400px'"
            />
          </div>
          <div class="col-md-1 group" align="right">
            <q-btn align="right" @click="Download()" color="purple-9">Download</q-btn>
          </div>
        </div>
      </form>
    </q-modal>
  </div>
</template>

<script>
import { required, maxLength, minLength } from "vuelidate/lib/validators";

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowPopup", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowPopup,
    };
  },
  beforeMount() {},
  computed: {
    ...mapGetters("globalSearchSerialNumber", ["getdocdownload"]),
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
  },

  methods: {
    ...mapActions("globalSearchSerialNumber", ["DOC_DOWNLOAD"]),

    emitfnshowservice() {
      this.$emit("emitfnshowservice");
    },
    Download() {
      this.$q.loading.show({
        delay: 100,
        spinnerColor: "purple-9",
        message: "Please wait..",
      });

      this.DOC_DOWNLOAD(this.propRowDetails)
        .then((response) => {
          const contentType = response.headers.get("content-type"); 

          if (!contentType) {
            throw new Error("Content-Type header is missing");
          }
          const blob = new Blob([response.body], { type: contentType });

          let extension = "";
          switch (contentType) {
            case "image/jpeg":
              extension = ".jpeg";
              break;
            case "image/png":
              extension = ".png";
              break;
            default:
              extension = ""; 
              break;
          }
          const filename = this.propRowDetails ? `${this.propRowDetails}${extension}` : `downloaded_image${extension}`;
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
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
