<template>
  <div>
   <q-modal 
        @hide="emitToggleRemarks" 
        @escape-key="emitToggleRemarks"  
        v-model="toggleModal"  
        :content-css="{padding:'10px',minWidth: '50vw',minHeight:'75vh'}"
    >
        <div class="row items-center q-py-sm bottom-border">
          <div class="col">Document Viewer</div>
          <div class="col" align="right">
            <q-btn outline round size="sm" color="dark" icon="clear" @click="emitToggleRemarks"/>
          </div>
        </div>
        <div class="row q-py-sm">
          <div class="full-width">
              <vuePdfjs :url="GLOBAL_FILE_FETCH_URL+'/'+itemDetails" :type="0" :height="'400px'" style="max-width:100%"></vuePdfjs>
          </div>
        </div>
    </q-modal>
  </div>
</template>

<script>
import vuePdfjs from "vue-pdfjs";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    vuePdfjs
  },
  props: ["propToggleshowPDFModal", "propPDFDetails"],
  data() {
    return {
      toggleModal: this.propToggleshowPDFModal,
      itemDetails: this.propPDFDetails
    };
  },
  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"])
  },
  methods: {
    emitToggleRemarks() {
      this.$emit("togglePDFModal");
    }
  }
};
</script>
<style>
.no-underline {
  text-decoration: none;
}
</style>
 