<template>
  <div>
    <q-modal
      minimized
      no-backdrop-dismiss
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitfnReferBackRemarks"
      @escape-key="emitfnReferBackRemarks"
      :content-css="{
        padding: '30px',
        minWidth: '50vw',
        maxHeight: '90vh',
        overflowY: 'auto'
      }"
    >
      <div class="row items-center bottom-border q-py-sm">
        <div class="col">
          <strong>REFERBACK REMARKS</strong>
        </div>
        <div class="col-auto">
          <q-btn
            round
            size="sm"
            @click="emitfnReferBackRemarks"
            color="red"
            icon="clear"
          />
        </div>
      </div>
      <br />
      <div v-if="this.propRowDetails.qrLeadStatus == 9" class="row d-flex align-items-center">
        <div class="col-sm-4">
          <strong>SAT TO MARS Remark</strong>
        </div>
        <div class="col-sm-8">
          <q-input
            readonly
            v-model="satToSoRemarks"
            type="textarea"
            color="red-12"
            label="Textarea with shadow text"
            hint="Press TAB to autocomplete suggested value or ESC to cancel suggestion"
            :shadow-text="textareaShadowText"
            @keydown="processTextareaFill"
            @focus="processTextareaFill"
          />
        </div>
      </div>
      <br />
      <div v-if="this.propRowDetails.qrLeadStatus == 9" class="row d-flex align-items-center">
        <div class="col-sm-4">
          <strong>MARS Remark</strong>
        </div>
        <div class="col-sm-8">
          <q-input
            readonly
            v-model="marsRemarks"
            type="textarea"
            color="red-12"
            label="Textarea with shadow text"
            hint="Press TAB to autocomplete suggested value or ESC to cancel suggestion"
            :shadow-text="textareaShadowText"
            @keydown="processTextareaFill"
            @focus="processTextareaFill"
          />
        </div>
      </div>
      <br />
      <div v-if="(this.propRowDetails.qrLeadStatus == 4 && this.propRowDetails.referbackStatus == true)" class="row d-flex align-items-center">
        <div class="col-sm-4">
          <strong>SAT TO SO Remark</strong>
        </div>
        <div class="col-sm-8">
          <q-input
            readonly
            v-model="satToSoRemarks"
            type="textarea"
            color="red-12"
            label="Textarea with shadow text"
            hint="Press TAB to autocomplete suggested value or ESC to cancel suggestion"
            :shadow-text="textareaShadowText"
            @keydown="processTextareaFill"
            @focus="processTextareaFill"
          />
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowUpdateOpenedExternal", "propRowDetails"],
  name: "MDRdetails",
  data() {
    return {
      toggleModel: this.propShowUpdateOpenedExternal,
      // marsRemarks: "",
      satToSoRemarks: ""
    };
  },
  beforeMount() {
    console.log("propRowDetails ------->", JSON.stringify(this.propRowDetails.qrLeadStatus));
    this.marsRemarks = this.propRowDetails.marsReason;
    this.satToSoRemarks = this.propRowDetails.satToMarsRemarks;
    console.log(
      "REFERBACK Remarks marsReason ------->",
      JSON.stringify(this.marsRemarks)
    );
    console.log(
      "REFERBACK Remarks satTOMarsRemarks ------->",
      JSON.stringify(this.satToSoRemarks)
    );
  },
  computed: {
    marsRemarks() {
      return this.propRowDetails.marsReason || "NA";
    }
  },
  methods: {
    emitfnReferBackRemarks() {
      this.$emit("emitfnshowUpdateOpenedExternal");
    }
  }
};
</script>

<style>
.cardsizealign1 {
  width: 70%;
  max-height: calc(90vh - 38px); /* Adjust height to prevent overflow */
  overflow-y: auto;
}
.q-modal {
  overflow-y: hidden; /* Prevent scrolling on the modal itself */
}
</style>
