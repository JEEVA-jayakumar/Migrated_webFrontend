<template>
  <div>
    <q-dialog minimized no-backdrop-dismiss v-model="propToggleModal" @hide="toggleModal" @escape-key="toggleModal"
      class="customModalOverlay" :content-css="{padding:'30px',minWidth: '30vw'}">
      <form>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular">Edit LeadSource And Vas,Device Config</div>
          </div>
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <q-select v-model="formData.leadSourceDeviceVasMapping.leadSource"
              @blur="$v.formData.leadSourceDeviceVasMapping.leadSource.$touch"
              :error="$v.formData.leadSourceDeviceVasMapping.leadSource.$error" :options="dropDown.leadSourceOptions"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="Select Lead Source"
              placeholder="Select Lead Source" />
          </div>
          <div class="col-md-12">
            <q-select v-model="formData.leadSourceDeviceVasMapping.device"
              @blur="$v.formData.leadSourceDeviceVasMapping.device.$touch"
              :error="$v.formData.leadSourceDeviceVasMapping.device.$error" :options="dropDown.deviceOptions"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="Select Device"
              placeholder="Select Device" />
          </div>
          <div class="col-md-12">
            <q-select multiple v-model="formData.vasList" @blur="$v.formData.vasList.$touch"
              :error="$v.formData.vasList.$error" :options="dropDown.vasOptions" class="text-weight-regular text-grey-8"
              color="grey-9" float-label="Select Vas" placeholder="Select Vas" />
          </div>
        </div>
        <q-card-section>
          <q-list no-border>

            <!-- <q-item>
              <q-item-section>
                <q-select color="grey-9" v-model="formData.leadSourceDeviceVasMapping.leadSource"
                  :options="dropDown.leadSourceOptions" float-label="Select lead source" placeholder="Lead source" />
              </q-item-section>
            </q-item> -->
            <!-- <q-item>
              <q-item-section>
                <q-select color="grey-9" v-model="formData.leadSourceDeviceVasMapping.device"
                  :options="dropDown.deviceOptions" float-label="Select Device" placeholder="Select Device" />
              </q-item-section>
            </q-item> -->
            <!-- <q-item>
              <q-item-section>
                <q-select multiple color="grey-9" v-model="formData.vasList" :options="dropDown.vasOptions"
                  float-label="Select VAS" placeholder="Select VAS" />
              </q-item-section>
            </q-item> -->
          </q-list>
        </q-card-section>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12 group" align="right">
            <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="toggleModal()">Cancel
            </q-btn>
            <q-btn align="right" @click="submitModifiedData(formData)" color="purple-9">Save</q-btn>
          </div>
        </div>
      </form>
    </q-dialog>
  </div>
</template>
  
<script>
import { integer, required } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  // name: 'ComponentName',
  props: ["propShowEditLsVasDevice", "propRowDetails"],
  data() {
    return {
      propToggleModal: this.propShowEditLsVasDevice,
      formData: {
        leadSourceDeviceVasMapping: {
          leadSource: JSON.stringify(this.propRowDetails.leadSourceDeviceVasMapping.leadSource),
          device: JSON.stringify(this.propRowDetails.leadSourceDeviceVasMapping.device),
        },
        vasList: [],
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
        leadSource: {
          required
        },
        device: {
          required
        },
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
    this.ajaxLoadDataForDeviceTypeTable1();
  },
  computed: {
    // ...mapGetters("SA_Devices", ["getAllDevicesInfo","getMarsDeviceModel"]),
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
    ...mapGetters("SA_Devices", ["getAllDevicesInfo"]),
    ...mapGetters("vasCreation", ["getAllVasDetails"])
  },

  beforeMount() {
    let assumeArr = [];
    _.map(this.propRowDetails.vasList, function (oo) {
      assumeArr.push(JSON.stringify(oo));
    });
    this.formData.vasList = assumeArr;
  },

  methods: {
    ...mapActions("leadSource", ["UPDATE_LEAD_SOURCE"]),
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("vasCreation", ["GET_ALL_VAS_DETAILS"]),
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA"]),
    ...mapActions("leadSourceVasDeviceConfig", ["UPDATE_LS_VAS_DEVICE_CONFIG_DETAILS"]),

    ajaxLoadDataForDeviceTypeTable() {
      let self = this;
      self
        .LEAD_SOURCE_ACTIVE_LIST()
        .then(() => {
          return _.map(self.getActiveLeadSource, item => {

            self.dropDown.leadSourceOptions.push({
              value: JSON.stringify(item),
              label: item.sourceName
            });
          });
        })
        .then(() => {
          self.FETCH_DEVICES_DATA()
            .then(() => {
              return _.map(self.getAllDevicesInfo, item => {
                self.dropDown.deviceOptions.push({
                  value: JSON.stringify(item),
                  label: item.deviceName
                });
              });
            })
        })
    },
    ajaxLoadDataForDeviceTypeTable1() {
      this.GET_ALL_VAS_DETAILS().then(() => {
        let assumeArr = [];
        _.map(this.getAllVasDetails, function (oo) {
          //value: JSON.stringify(oo)
          assumeArr.push({ label: oo.name, value: JSON.stringify(oo) });
        });
        this.dropDown.vasOptions = assumeArr;
      });
    },
    toggleModal() {
      this.$emit("emitfnshowLsVasDevice");
    },
    refreshListOnClose() {
      this.$emit("emitfnForLeadSourceTableRefresh");
    },
    submitModifiedData(request) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });
        // delete this.formData.lastBaseTid;
        // delete this.formData.lastBaseMid;
        let listOfVas = [];
        _.map(request.vasList, function (oo) {
          listOfVas.push(JSON.parse(oo));
        });
        let params = {
          leadSourceDeviceVasMapping: {
            leadSource: JSON.parse(request.leadSourceDeviceVasMapping.leadSource),
            device: JSON.parse(request.leadSourceDeviceVasMapping.device),
          },
          vasList: listOfVas
        };
        console.log("submitModifiedData, item: --->", params)
        this.$q.loading.hide();
        this.UPDATE_LS_VAS_DEVICE_CONFIG_DETAILS(params)
          .then((response) => {
            this.$q.loading.hide();
            this.$emit("emitfnshowLsVasDevice");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Configuration successfully updated!",
              icon: "thumb_up"
            });
          })
          .catch(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
          });
      }
    }
  }
};
</script>
  
<style>

</style>
  