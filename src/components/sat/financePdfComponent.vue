<template>
  <div>
    <q-dialog
      @hide="emitToggleRemarks"
      @escape-key="emitToggleRemarks"
      v-model="toggleModal"
      :content-css="{ padding: '10px', minWidth: '50vw', minHeight: '75vh' }"
    >
      <!--START >> PDF viewer, third party plugin -->
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
        <!-- <q-list no-border class="no-padding"> -->
        <div class="full-width" v-if="isImage">
          <div class="image-container" >
            <img :src="pictureOfImageSource" alt="Zoomable Image"    @click="showZoom = true"  :height="'400px'"
            style="max-width:100%; justify-content: center;"/>
          </div>
          <q-dialog v-model="showZoom" persistent>
            <div class="q-pa-md bg-white" style="max-width: 90vw; max-height: 90vh;">
              <q-img
                src="pictureOfImageSource"
                alt="Zoomed Image"
                style="max-width: 100%; max-height: 100%;"
              />
            </div>
          </q-dialog>
          <!-- <div >
            <div class="cursor-pointer" v-if="isImage">
              <viewer :images="[pictureOfImageSource]">
                <img
                  :src="pictureOfImageSource"
                  ref="handedOverImageInvoice"
                  style="max-width:100%"
                />
              </viewer>
              <div @click="fnViewInvoiceImage()" class="ellipsis">
                <q-icon name="fas fa-image" color="amber-9"/>
                &nbsp;{{ itemDetail.invoiceName }}
              </div>
            </div>
            <div v-else  class="full-width">
              <vuePdfjs
                :url="GLOBAL_FILE_FETCH_URL + '/' + itemDetail.invoiceName"
                :type="0"
                :height="'400px'"
                style="max-width:100%"
              ></vuePdfjs>
            </div>
          </div> -->
        </div>
        <div v-else class="full-width" >
            <vuePdfjs
              :url="GLOBAL_FILE_FETCH_URL+'/'+itemDetail.invoiceName"
              :type="0"
              :height="'400px'"
              style="max-width:100%"
            ></vuePdfjs>
          </div>
        <!-- </q-list> -->
      </div>

      <!--END >> PDF viewer, third party plugin -->
    </q-dialog>
  </div>
</template>

<script>
import { url } from '@vuelidate/validators';


import vuePdfjs from "vue-pdfjs";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    vuePdfjs
  },
  props: ["propToggleshowPDFModalFinance", "propPDFDetailsFinance"],
  data() {
    return {
      toggleModal: this.propToggleshowPDFModalFinance,
      itemDetail: this.propPDFDetailsFinance,
      url: "",
      showZoom: false,
    };
  },
  beforeMount() {


  
    //   console.log("propPDFDetailsFinance---------->>>>",JSON.stringify(this.propPDFDetailsFinance))
  },
  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    
    isImage(){
      console.log("itemDetail----------{{{{{{}}}}}}>>>>", JSON.stringify(this.itemDetail))
      return (
        this.itemDetail.invoiceMimeType &&
        this.itemDetail.invoiceMimeType.includes("image")
      );
    },
    pictureOfImageSource(){
      return `${this.GLOBAL_FILE_FETCH_URL}/${this.itemDetail.invoiceName}`;
    }
  },
  methods: {
    emitToggleRemarks() {
      this.$emit("togglePDFModal");
    },
 
  
    fnViewInvoiceImage() {
      this.$refs.handedOverImageInvoice.click();
    
    }
    // fnViewHandedOverFileImagePicture() {
    //   this.$refs.handedOverImageViewerPicture.click();
    // }
  }
};
</script>
<style>
.no-underline {
  text-decoration: none;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-height: 90vh; /* Adjust height for the dialog */
}

.image-container img {
  transition: transform 0.3s ease;
  max-width: 100%;
  max-height: 100%;
  cursor: zoom-in;
}

.image-container img:active {
  transform: scale(1.5); /* Adjust zoom level */
  cursor: zoom-out;
}
</style>
