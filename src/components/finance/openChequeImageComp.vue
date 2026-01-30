<template>
    <div>
        <q-modal 
        v-model="showChequeImage"  
        @hide="emitToggleCheque(showRejectModel)" 
        @escape-key="emitToggleCheque(showRejectModel)"  
        :content-css="{padding:'5px',maxWidth: '75vw',}"
        >
           <q-card-media overlay-position="full">
                <img :src="chequeImagevalue">
            </q-card-media>
        </q-modal>
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
