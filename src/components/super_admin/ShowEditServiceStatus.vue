<template>
    <div>
      <q-modal
        minimized
        v-model="toggleModel"
        @hide="emitfnShowEditNewServiceStatus"
        @escape-key="emitfnShowEditNewServiceStatus"
        class="customModalOverlay"
        :content-css="{ padding: '30px', minWidth: '30vw' }"
      >
        <form>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12">
              <div class="q-title text-weight-regular">
                Modify Service Status Info
              </div>
            </div>
            
          </div>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12">
              <q-input
              v-model="formData.name"
              :error="$v.formData.name.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="Service Status Name"
                placeholder="Service Status Name"
              />
            </div>
          </div>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12 group" align="right">
              <q-btn
                flat
                align="right"
                class="bg-white text-weight-regular text-grey-8"
                @click="emitfnShowEditNewServiceStatus()"
                >Cancel</q-btn
              >
              <q-btn
                align="right"
                @click="fnfinalsubmitEditedServiceStatus(formData)"
                color="purple-9"
                >Save</q-btn
              >
            </div>
          </div>
        </form>
      </q-modal>
       <!--START: Show Sub Task Details-->
     <showServiceSubTaskDetails
        v-if="propShowServiceSubTaskDetails"
        :propShowServiceSubTaskDetails="propShowServiceSubTaskDetails"
        :propRowDetails="propRowDetails"
        @emitfnshowServiceSubTaskDetails="fnShowSubTaskDetails"
      />
       <!-- END: Show Sub Task Details -->
    </div>
  </template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import showServiceSubTaskDetails from '../../components/super_admin/showServiceSubTaskDetails.vue'

export default {
  components: {
    showServiceSubTaskDetails
  },
  props: ['propShowEditServiceStatus', 'propRowDetails5'],
  data () {
    return {
      toggleModel: this.propShowEditServiceStatus,
      propShowServiceStatusDetails: false,
      formData: {

        name: JSON.stringify(this.propRowDetails5.issueReason)
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
  beforeMount () {
    console.log(
      'Getter propShowEditServiceStatus---------------->' +
          JSON.stringify(this.propRowDetails5)
    )
    console.log(
      'Getter propRowDetails5 123456Name---------------->' +
          JSON.stringify(this.propRowDetails5)
    )
    // console.log("Prop details---------------->"+JSON.stringify(this.propShowEditRegions))
    //  console.log("Prop Row details---------------->"+JSON.stringify(this.propRowDetails1))
  },

  computed: {
    ...mapGetters('SuperAdminUsers', ['getAllRegionsData']),
    ...mapGetters('serviceRequest', ['getserviceRequestIssueTypes']),
    ...mapGetters('ServiceRequestStatus', ['getserviceRequestStatusDetails'])
  },

  methods: {
    ...mapActions('SuperAdminUsers', [
      'FETCH_ALL_REGIONS_DATA',
      'FEED_EXISTING_REGION_DATA'
    ]),
    ...mapActions('SuperAdminUsers', ['FETCH_ALL_REGIONS_DATA']),
    ...mapActions('sparePartsGetTypes', ['EDIT_service_req_data']),
    ...mapActions('serviceRequest', ['EDIT_SERVICE_REQUEST_TYPES', 'GET_SERVICE_ISSUE_TYPES']),
    ...mapActions('ServiceRequestStatus', ['EDIT_SERVICE_STATUS_TYPES', 'FETCH_SERVICE_REQUEST_STATUS_DETAILS']),
    emitfnShowEditNewServiceStatus () {
      this.$emit('emitfnShowEditNewServiceStatus')
    },

    fnShowSubTaskDetails (rowDetails) {
      this.propShowServiceStatusDetails = !this.propShowServiceStatusDetails
      this.propRowDetails5 = rowDetails
    },
    fnfinalsubmitEditedServiceStatus (formData) {
      this.$v.formData.$touch()
      if (this.$v.formData.$error) {
        this.$q.notify('Please review fields again.')
      } else {
        this.$q.loading.show()
        let param = {
          id: JSON.stringify(this.propRowDetails5.id),
          request: this.formData
        }
        this.EDIT_SERVICE_STATUS_TYPES(param)
          .then(() => {
            this.$q.loading.hide()
            this.$q.notify({
              color: 'positive',
              position: 'bottom',
              message: 'Successfully updated!',
              icon: 'thumb_up'
            })
            this.emitfnShowEditNewServiceStatus()
          })
          .catch(error => {
            this.$q.loading.hide()
            this.$q.notify({
              color: 'negative',
              position: 'bottom',
              message:
                  error.body.message == null
                    ? 'Please Try Again Later !'
                    : error.body.message,
              icon: 'thumb_down'
            })
          })
      }
    }
  }
}
</script>
