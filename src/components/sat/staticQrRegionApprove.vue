<template>
    <div>
      <q-dialog  v-model="toggleModal"
          no-backdrop-dismiss
          no-esc-dismiss
          :content-css="{ padding: '10px', maxWidth: '50vw', minHeight: '' }">
    <div class="q-pa-md">
      <div class="column">
        <div class="col-md-12 bottom-border">
          <div class="text-h6 text-weight-regular q-py-sm">Update Received QR Count</div>
          </div>
          <div class="col-md-8 q-pt-md" align="left">
            <q-input type="number" color="grey-9"
             v-model="formData.recievedCount" min="1" oninput="this.value = Math.abs(this.value)" :error="$v.formData.recievedCount.$error"
              float-label="Update Count"
              placeholder="Update Count" />
        </div>
        <div class="col-md-12 col-md-6 q-pt-md group" align="right">
          <q-btn icon="block" outline color="dark" label="Cancel" @click="emitToggleCheque" />
          <q-btn label="Update" color="purple-9" @click="fnSubmitCount()" />
        </div>
      </div>
    </div>
      </q-dialog>
    </div>
    </template>
    <script>
    import { minValue, required,}from "@vuelidate/validators";
    import { mapGetters, mapActions } from 'vuex'
    export default {
      props: ['propsApproveRegion', 'propsApproveRegionModal'],
      data () {
        return {
          toggleModal: this.propsApproveRegionModal,
          updateCount: this.propsApproveRegion,
          value:null,
          formData: {
            recievedCount:''
          }
        }
      },
      beforeMount () {
        console.log('checkss ', JSON.stringify(this.updateCount ))
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
        ...mapActions('generateQR', ['SUBMIT_QR_COUNT']),
    
        fnSubmitCount() {
          this.$v.formData.$touch()
      if(this.$v.formData.$error){
        this.$q.notify('Please review fields again.')
      }else{
            let updatecount = {
           id:this.updateCount.id,
           podStatus:this.updateCount.podStatus,
           requestCount:this.updateCount.requestCount,
           receivedCount:this.formData.recievedCount,
          qrBank:this.updateCount.qrBank,
           createdAt:this.updateCount.createdAt,
           updatedAt:this.updateCount.updatedAt,
           updated:this.updateCount.updated,
           __index:this.updateCount.__index,
          }
          this.$q.loading.show({
        delay: 0,
        spinnerColor: 'purple-9',
        message: 'data uploading ..'
      })
          this.SUBMIT_QR_COUNT(updatecount).then(response => {
            this.$emit('closeModel')
            this.$q.notify({
              color: 'positive',
              position: 'bottom',
              message: 'Successfully Updated!',
              icon: 'thumb_up'
            })
          }).catch(() => {
            this.$emit('closeModel')
            this.$q.notify({
              color: 'negative',
              position: 'bottom',
              message: 'Pod Count Mismatched',
              icon: 'thumb_down'
            })
            this.$q.loading.hide()
          })
        }
        },
        emitToggleCheque (toggleModal) {
          this.$emit('closeModel')
        }
      }
    }
    </script>

    
