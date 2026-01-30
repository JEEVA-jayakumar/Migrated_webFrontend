<template>
    <div>
        <q-modal
        minimized
        v-model="toggleModel"
        @hide="emitfnShowAddNewServiceStatus"
        @escape-key="emitfnShowAddNewServiceStatus"
        class="customModalOverlay"
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
            <form>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <div class="q-title text-weight-regular">Add Service Statussss</div>
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                     <div class="col-md-12">
                        <q-input
                          v-model="formData.name"
                          :error="$v.formData.name.$error"
                          class="text-weight-regular text-grey-8"
                          color="grey-9"
                          float-label="Enter Service Status"
                          placeholder="Enter Service Status"
                        />
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnShowAddNewServiceStatus()">Cancel</q-btn>
                        <q-btn align="right" @click="fnfinalsubmitAddServiceStatus(formData)" color="purple-9">Save</q-btn>
                    </div>
                </div>
            </form>
        </q-modal>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['propShowAddServiceStatus', 'propRowDetails3'],
  data () {
    return {
      toggleModel: this.propShowAddServiceStatus,
      serviceReqIssueTypeSetsPro: [],
      serviceRequestStatus: [],
      selectServiceReqType: [],
      reqData: [],
      reqdata: [],
      formData: {
        name: ''
      }
    }
  },
  validations: {
    formData: {

      name: {
        required
      }
    }
  },
  computed: {
    ...mapGetters('SuperAdminUsers', ['getAllRegionsData']),
    ...mapGetters('ServiceRequestStatus', ['getserviceRequestStatusDetails'])
  },
  created () {
    this.fnAddServiceRequestStatus()
  },

  methods: {
    ...mapActions('SuperAdminUsers', [
      'FETCH_ALL_REGIONS_DATA',
      'FEED_EXISTING_REGION_DATA'
    ]),
    ...mapActions('SuperAdminUsers', ['FETCH_ALL_REGIONS_DATA']),
    ...mapActions('sparePartsGetTypes', ['UPDATE_service_req_data']),
    ...mapActions('ServiceRequestStatus', ['FETCH_SERVICE_REQUEST_STATUS_DETAILS', 'POST_SERVICE_STATUS_TYPES']),
    emitfnShowAddNewServiceStatus () {
      this.$emit('emitfnShowAddNewServiceStatus')
    },

    fnAddServiceRequestStatus () {
      this.FETCH_SERVICE_REQUEST_STATUS_DETAILS()
        .then(() => {
          let assumeArr = []
          this.getsubTaskDetails.map(function (value, index) {
            assumeArr.push({
              label: value.issue_req_type.service_req_data,
              value: value.id
            })
          })
          this.selectServiceReqType = assumeArr
        })
        .catch(error => {
          this.selectServiceReqType = []
        })
    },

    fnfinalsubmitAddServiceStatus (formData) {
      console.log('SUBMIT Sub Task RESPONSE', JSON.stringify(formData))
      // this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify('Please review fields again.')
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: 'Please Wait',
          spinnerColor: 'purple-9',
          customClass: 'shadow-none'
        })
        console.log('SUBMIT RESPONSE', JSON.stringify(formData))
        this.POST_SERVICE_STATUS_TYPES(formData)
          .then(() => {
            this.$q.loading.hide()
            this.$emit('emitfnShowAddNewServiceStatus', 'refresh')
            this.$q.notify({
              color: 'positive',
              position: 'bottom',
              message: 'Added Successfully',
              icon: 'thumb_up'
            })
          })
          .catch(error => {
            this.$q.loading.hide()
            this.$q.notify({
              type: 'warning',
              color: 'amber-9',
              position: 'bottom',
              message: error.data.message
            })
          })
      }
    }
  }
}
</script>
