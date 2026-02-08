<template>
<div>
  <q-dialog  v-model="toggleModal"
      no-backdrop-dismiss
      no-esc-dismiss
      :content-css="{ padding: '10px', maxWidth: '50vw', minHeight: '' }">
<div class="q-pa-md">
  <div class="column">
    <div class="col-md-12 bottom-border">
      <div class="text-h6 text-weight-regular q-py-sm">Update QR Count</div>
      </div>
      <div class="col-md-8 q-pt-md" align="left">
        <q-input type="number" color="grey-9"
         v-model="formData.recievedCount"
         oninput="this.value = Math.abs(this.value)" :error="$v.formData.recievedCount.$error"
          float-label="Update Count"
          placeholder="Update Count" />
    </div>
    <div class="col-md-12 col-md-6 q-pt-md group" align="right">
      <q-btn icon="block" color="purple-9" outline label="Cancel" @click="emitToggleCheque" />
      <q-btn :disable="this.formData.recievedCount == ''" label="Update" color="purple-9"  @click="fnSubmitUpdateCount" />
    </div>
  </div>
</div>
  </q-dialog>
</div>
</template>
<script> import { minValue, required,}from "@vuelidate/validators";
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['propseditCountModal', 'propsAllPendingQrItem'],
  data () {
    return {
      toggleModal: this.propseditCountModal,
      updateCount: this.propsAllPendingQrItem,
      value:null,
      formData: {
        recievedCount: ''
      }
    }
  },
  beforeMount(){
    console.log('check ', JSON.stringify(this.updateCount))
  },
  validations:{
 formData:{
  recievedCount:{
    required,
    minLength: minValue(1)
  },

 }
},
  methods: {
    ...mapActions('generateQR', ['UPDATE_QR_COUNT']),
    fnSubmitUpdateCount(){
      this.$v.formData.$touch()
      if(this.$v.formData.$error){
        this.$q.notify('Please review fields again.')
      }else{
      let updatecount = {
        id: this.updateCount.id,
        action:(this.formData.recievedCount > this.updateCount.requestCount ) ? 1 :(this.formData.recievedCount < this.updateCount.requestCount ) ? 2 :'' ,
        request: {
          podNumber: this.updateCount.podNumber,
          requestCount:this.updateCount.requestCount,
         receivedCount:(this.formData.recievedCount > this.updateCount.requestCount) ? this.formData.recievedCount-this.updateCount.requestCount :(this.formData.recievedCount < this.updateCount.requestCount )? this.updateCount.requestCount -this.formData.recievedCount :"",
         region: {
            id: this.updateCount.region.id
          },
          staticQrBank: {
           id: this.updateCount.qrBank.id
          }
        }
      }
      this.$q.loading.show();
      this.UPDATE_QR_COUNT(updatecount).then(response => {
        this.$q.notify({
          color: 'positive',
          position: 'bottom',
          message: 'Successfully Updated!',
          icon: 'thumb_up'
        })
        this.$emit('closeModel')
        this.$q.loading.hide();
      }).catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'No changes made!',
          icon: 'thumb_down'
        })
        this.$q.loading.hide();
      })
    }
    },
    emitToggleCheque (toggleModal) {
      this.$emit('closeModel')
    }
  }
}
</script>
