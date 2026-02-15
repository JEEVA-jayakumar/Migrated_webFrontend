<template>
    <div>
        <q-dialog
        :model-value="showChequeImage"
        @hide="emitToggleCheque(showRejectModel)" 
        @escape-key="emitToggleCheque(showRejectModel)"  
        :content-css="{padding:'5px',maxWidth: '75vw',}"
        >
           <q-img overlay-position="full">
                <img :src="chequeImagevalue">
            </q-img>
        </q-dialog>
    </div>
</template>
<script>
export default {
  props: ["showChequeImage", "chequeImagevalue"],

  data() {
    return {};
  },

  methods: {
    emitToggleCheque(showChequeImage) {
      this.$emit("closeChequeImage");
    }
  }
};
</script>
