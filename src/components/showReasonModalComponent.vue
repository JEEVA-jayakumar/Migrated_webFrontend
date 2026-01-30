<template>
  <div>
    <q-modal 
        minimized
         @hide="emitToggleRemarks" 
        @escape-key="emitToggleRemarks"  
        v-model="toggleModal"  
        :content-css="{padding:'20px',minWidth: '35vw'}"
        class="customModalOverlay"
    >
        <div class="row group">
            <div class="col-12 q-title q-py-md">
              Remarks
            </div>
            <div class="col-12 q-py-md">
              <span v-if="itemDetails == null">
                <q-alert
                    color="primary"
                    icon="info"
                    appear
                    class="q-mb-sm"
                >
                    No remarks given
                </q-alert>
              </span>
              <span v-else>{{itemDetails}}</span>
            </div>
            <div class="col-12 q-title q-py-md" align="right">
             <q-btn icon="clear" color="grey-5" class="text-dark" @click="emitToggleRemarks" label="Close"/>
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
  props: ["propshowDocumentModal", "propReason"],
  data() {
    return {
      toggleModal: this.propshowDocumentModal,
      itemDetails: this.propReason
    };
  },
  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"])
  },
  methods: {
    emitToggleRemarks() {
      this.$emit("toggleReasonModal");
    }
  }
};
</script>
 