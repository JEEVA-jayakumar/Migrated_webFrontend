<template>
  <q-page>
    <div class="row">
      <div class="col-12 q-title q-pa-md text-weight-regular bottom-border">Enter Latitude & Longitude</div>
      <!-- START >> Setup MDR details -->
      <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
        <q-card style="width:150%">
          <q-card-main>
            <q-list no-border>

              <q-item>
                <q-item-main>
                  <q-input color="grey-9" v-model="formData.Address" @blur="$v.formData.Address.$touch"
                    :error="$v.formData.Address.$error" float-label="Address" />
                    
                    <div>
                    <q-btn label="Search Address" @click="fnAddress(formData)" color="purple-9" />
                  </div>

                </q-item-main>
              </q-item>

              <q-item>
                <q-item-main>
                  <q-input color="grey-9" type="double" disable v-model="formData.latitude"
                    @blur="$v.formData.latitude.$touch" :error="$v.formData.latitude.$error"
                    float-label="Enter Latitude" placeholder="Add Latitude" />
                </q-item-main>
              </q-item>

              <q-item>
                <q-item-main>
                  <q-input color="grey-9" type="double" disable v-model="formData.longitude"
                    @blur="$v.formData.longitude.$touch" :error="$v.formData.longitude.$error"
                    float-label="Enter Longitude" placeholder="Add Longitude" />
                </q-item-main>
              </q-item>
            </q-list>
          </q-card-main>

          <q-card-actions vertical align="end">
            <q-btn label="submit" @click="fnsubmit(formData)" color="purple-9" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>

import {
  required,
  minLength,
  maxLength,
  integer,
  double,
  email
} from "vuelidate/lib/validators";
/* START >> Modal components Lead source, device, merchant type */
import showLeadSourceModalComponent from "../../components/super_admin/showLeadSourceModalComponents.vue";
import showDeviceDetailModalComponent from "../../components/super_admin/showDeviceDetailModalComponents.vue";
import showMerchantModalComponent from "../../components/super_admin/merchantTypes.vue";
/* END >> Modal components Lead source, device, merchant type */

import { mapGetters, mapActions } from "vuex";
export default {
  name: "MDRdetails",
  components: {
  },
  data() {
    return {
      propRowDetails: {},
      formData: {

        // MID: "",
        // TID: "",
        // MerchantName: "",
        Address: "",
        latitude: "",
        longitude: "",
      },
    };
  },
  validations: {
    formData: {
      // MID: { required},
      // TID: { required },
      // MerchantName: { required},
      Address: { required },
      latitude: { required },
      longitude: { required }
    }
  },
  error: {
    formData: {

      // MID: {
      //   alert: false,
      //   issue: "",
      //   value: ""
      // },
      // TID: {
      //   alert: false,
      //   issue: "",
      //   value: ""
      // },
      // MerchantName: {
      //   alert: false,
      //   issue: "",
      //   value: ""
      // },
      Address: {
        alert: false,
        issue: "",
        value: ""
      },
      latitude: {
        alert: false,
        issue: "",
        value: ""
      },
      longitude: {
        alert: false,
        issue: "",
        value: ""
      }
    }

  },

  computed: {
    ...mapGetters("SA_Devices", ["getAllDevicesInfo", "getMarsDeviceModel"]),
  },
  beforeMount() {
    this.propRowDetails = this.$route.params.data;
    // this.formData.MID = this.propRowDetails.data.data.second[0].Failed.mid
    // this.formData.TID = this.propRowDetails.data.data.second[0].Failed.tid
    // this.formData.MerchantName = this.propRowDetails.data.data.second[0].Failed.leadInformation.leadName
    this.formData.Address = this.propRowDetails.data.data.second[0].Failed.deviceAddress


  },

  // created() {
  //   this.ajaxLoadAllLeadInfo({
  //     pagination: this.paginationControl,
  //     filter: this.filterSearch
  //   });
  // },

  methods: {
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA", "FETCH_MARS_DEVICE_MODEL"]),
    ...mapActions("lat_long", ["Latitude_Longitude"]),
    ...mapActions("lat_long", ["Lat_Long"]),

    fnAddress(request){
      if (request.Address ==null) {
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill Address fields",
          icon: "info"
        });
      } else {
          let self = this;
        self.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Validating..."
        });
        let params = {
          id: this.propRowDetails.data.data.second[0].Failed.tid,
          request:{
            deviceAddress: request.Address,
          }
         
        };
        this.Lat_Long(params)
          .then((response) => {
            this.$q.loading.hide();
            this.formData.latitude = response.data.data.first;
            this.formData.longitude = response.data.data.second;
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Created",
              icon: "thumb_up",
            });
          })
          .catch((error) => {
            this.$q.loading.hide();
            this.$q.notify({
              type: "warning",
              color: "amber-9",
              position: "bottom",
              message:
                error.body.message == null
                  ? "Please Try Again Later !"
                  : error.body.message,
              icon: "thumb_down",
            });
          });
      }
    },

    fnsubmit(request) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill all mandatory fields",
          icon: "info"
        });
      } else {
          let self = this;
        self.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Validating..."
        });
        let params = {
          id: this.propRowDetails.data.data.second[0].Failed.tid,
          deviceAddress: request.Address,
          latitude: request.latitude,
          longitude: request.longitude,
        };
        this.Latitude_Longitude(params)
          .then((response) => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Created",
              icon: "thumb_up",
            });
            this.$router.push({name: "internalimplementationRequest"});
          })
          .catch((error) => {
            this.$q.loading.hide();
            this.$q.notify({
              type: "warning",
              color: "amber-9",
              position: "bottom",
              message:
                error.body.message == null
                  ? "Please Try Again Later !"
                  : error.body.message,
              icon: "thumb_down",
            });
          });
      }
    },
  },
};

</script>

<style>

</style>
