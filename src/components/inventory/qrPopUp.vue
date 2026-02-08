<template>
  <div>
    <q-dialog v-model="toggleModal" class="q-mt-lg capitalize" @hide="emitToggleRemarks()" @escape-key="emitToggleRemarks(toggleModal)"
      :content-css="{ minWidth: '30vw', padding: '20px' }">
      <div class="row items-center bottom-border q-py-sm">
        <div class="col"><strong>generate QR </strong> </div>
        <div class="col-auto">
        </div>
      </div>
      <div class="q-ma-sm">
      </div>
      <p><b>{{ this.count }}</b> QR from {{ this.bank }} Bank generated Successfully</p>
      <strong> Batch ID :{{ this.batchId }} </strong>
      <div class="group alignsize" align="right">
        <q-btn @click="emitToggleRemarks()" color="negative" icon="close" label="Dismiss" />
        <q-btn @click="fnsubmit()" color="positive" icon="check" label="Download" />
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'qrPopUp',
  props: ['QrInfo', 'propToggleDataPop'],
  data () {
    return {
      toggleModal: this.propToggleDataPop,
      count: '',
      Bank: ''
    }
  },

  validations: {
  },
  computed: {
  },
  beforeMount () {
    console.log('Date click ----------> Action : ', JSON.stringify(this.propToggleDataPop))
    this.count = JSON.stringify(this.QrInfo.data.data.count)
    this.bank = this.QrInfo.data.data.staticQrBank.name
    this.batchId= this.QrInfo.data.data.batchId
  },

  methods: {
    ...mapActions('staticQrDownloads', ['DOWNLOAD_STATIC_QR_DATA']),
    fnsubmit() {
      this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
      });
      let qrId = {
        id:  this.batchId
      }
      this.DOWNLOAD_STATIC_QR_DATA(qrId.id)
        .then(response => {
         this. emitToggleRemarks()
          this.$q.loading.hide()
          console.log('data information------------------>', response)
          this.$q.notify({
            color: 'positive',
            position: 'bottom',
            message: 'Successfully Downloaded',
            icon: 'thumb_up'
          })
        })
    },
    emitToggleRemarks() {
      this.$emit('closeRemarksInfo')
    }
  }
}
</script>
<style>
.alignsize{
  margin-top: 18px;
}
</style>