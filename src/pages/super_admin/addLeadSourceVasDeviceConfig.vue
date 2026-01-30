<template>
  <q-page>
    <div class="row">
      <div class="col-12 q-title q-pa-md text-weight-regular bottom-border">LeadSource And Vas,Device Config</div>
      <!-- START >> Setup MDR details -->
      <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
        <q-card style="width:100%">
          <q-card-main>
            <q-list no-border>

              <q-item>
                <q-item-main>
                  <q-select color="grey-9" v-model="formData.leadSourceDeviceVasMapping.leadSource" :options="dropDown.leadSourceOptions"
                    float-label="Select lead source" placeholder="Lead source" />
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-select color="grey-9" v-model="formData.leadSourceDeviceVasMapping.device" :options="dropDown.deviceOptions"
                    float-label="Select Device" placeholder="Select Device" />
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-select multiple color="grey-9" v-model="formData.vasList" :options="dropDown.vasOptions"
                    float-label="Select VAS" placeholder="Select VAS" />
                </q-item-main>
              </q-item>
            </q-list>
          </q-card-main>
          <q-card-actions vertical align="end">
            <q-btn label="submit" @click="fnsubmit(formData)" color="purple-9" />
            <!-- <q-btn label="submit" @click="fnsubmit(formData)" color="purple-9" /> -->
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
  email
} from "vuelidate/lib/validators";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "MDRdetails",

  data() {
    return {
      formData: {
        leadSourceDeviceVasMapping: {
          leadSource: "",
          device: "",
        },
        vasList: []
      },
      dropDown: {
        leadSourceOptions: [],
        deviceOptions: [],
        vasOptions: [],
      },

    };
  },
  validations: {
    formData: {
      leadSourceDeviceVasMapping: {
        leadSource: { required },
        device: { required },
      },
      vasList: { required }
    }
  },
  error: {
    formData: {
      leadSourceDeviceVasMapping: {
        leadSource: {
          alert: false,
          issue: "",
          value: ""
        },
        device: {
          alert: false,
          issue: "",
          value: ""
        }
      },
      vasList: {
        alert: false,
        issue: "",
        value: ""
      }
    }

  },
  created() {
    /* START: Load user table data filter > DeviceTypes */
    this.ajaxLoadDataForDeviceTypeTable();
  },
  computed: {
    ...mapGetters("SA_Devices", ["getAllDevicesInfo", "getMarsDeviceModel"]),
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
    ...mapGetters("SA_Devices", ["getAllDevicesInfo"]),
    ...mapGetters("vasCreation", ["getAllVasDetails"])
  },

  methods: {
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA", "FETCH_MARS_DEVICE_MODEL"]),

    ...mapActions("AddHierarchy", ["SAVE_HIERARCHY"]),
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("vasCreation", ["GET_ALL_VAS_DETAILS"]),
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA"]),
    ...mapActions("leadSourceVasDeviceConfig", ["CREATE_LS_VAS_DEVICE_CONFIG"]),
    ajaxLoadDataForDeviceTypeTable() {
      let self = this;
      self
        .LEAD_SOURCE_ACTIVE_LIST()
        .then(() => {
          return _.map(self.getActiveLeadSource, item => {

            self.dropDown.leadSourceOptions.push({
              value: item,
              label: item.sourceName
            });
          });
        })
        .then(() => {
          self.FETCH_DEVICES_DATA()
            .then(() => {
              return _.map(self.getAllDevicesInfo, item => {
                self.dropDown.deviceOptions.push({
                  value: item,
                  label: item.deviceName
                });
              });
            })
        })
        .then(() => {
          self.GET_ALL_VAS_DETAILS().then(() => {
            return _.map(self.getAllVasDetails, item => {
              console.log("GET_ALL_VAS_DETAILS, item: --->", JSON.stringify(item))
              self.dropDown.vasOptions.push({
                value: item,
                label: item.name
              });
            });
          });
        })
    },
    fnsubmit(request) {
      console.log(" fnsubmit------------------", JSON.stringify(request))

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
        this.CREATE_LS_VAS_DEVICE_CONFIG(request)
          .then(response => {
           
            // if(response.status)
            this.$q.loading.hide();
            console.log(response);
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Created",
              icon: "thumb_up",
            });
            var self = this;
            Object.keys(this.formData).forEach(function (key, index) {
              self.formData[key] = "";
            });
          })
          .catch((error) => {
            console.log("error--->",JSON.stringify(error))
            if(error.status == 409){
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
            var self = this;
            Object.keys(this.formData).forEach(function (key, index) {
              self.formData[key] = "";
            });
            this.$q.loading.hide();
            
            }
           
          });
      }
    },
  },


};
</script>
  
<style>

</style>
  