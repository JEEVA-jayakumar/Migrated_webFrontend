<template>
  <q-page>
    <div class="text-grey-9">
      <div class="row bottom-border q-pa-sm items-center">
        <div class="col">
          <q-tabs no-pane-border v-model="QRselected" color="dark" inverted class="shadow-1">
            <q-tab name="createQRSticker" label="Create QR Ref No" slot="title" />
            <!-- <q-tab name="Socount" label="Inventory So Count" slot="title" /> -->
            <q-tab name="downloadQRcodes" label="Download QR Codes" slot="title" />
            <q-tab
              name="implementQRleadsources"
              label="Implement QR for Lead Sources"
              slot="title"
            />
            <q-tab-panel name="createQRSticker">
              <createQRSticker />
            </q-tab-panel>

            <q-tab-panel name="downloadQRcodes">
              <downloadQRcodes />
            </q-tab-panel>

            <q-tab-panel name="implementQRleadsources">
              <implementQRleadsources />
            </q-tab-panel>
          </q-tabs>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import createQRSticker from "../../components/super_admin/createQRSticker.vue";
import downloadQRcodes from "../../components/super_admin/downloadQRcodes.vue";
import implementQRleadsources from "../../components/super_admin/implementQRleadsources.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "QRSticker",

  components: {
    createQRSticker,
    downloadQRcodes,
    implementQRleadsources
  },

  data() {
    return {
      QRselected: "createQRSticker"
    };
  },

  computed: {},

  created() {},

  methods: {}
};
</script>

<style>
.border-1 {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.border-2 {
  border: 3px solid rgba(48, 48, 48, 0.5);
}
</style>