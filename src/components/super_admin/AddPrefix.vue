<template>
  <div>
    <q-modal minimized v-model="propToggleModal" @hide="toggleModal" @escape-key="toggleModal"
      class="customModalOverlay" :content-css="{ padding: '30px', minWidth: '30vw' }">
      <form>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">Add Prefix</div>
          </div>
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <q-card style="width:100%">
            <q-card-main>
              <q-list no-border>

                <q-item>
                  <q-item-main>
                    <q-select color="grey-9" v-model="formData.leadSource" :options="dropDown.leadSourceOptions"
                      float-label="Select lead source" placeholder="Lead source" />
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input color="grey-9" v-model="formData.prefix" @blur="$v.formData.prefix.$touch"
                      :error="$v.formData.prefix.$error" float-label="Enter prefix* (3 digits)"
                      placeholder="Enter prefix* (3 digits)" />
                    <div class="text-negative q-py-xs group q-caption" v-if="$v.formData.prefix.$error">
                      <div v-if="
                        $v.formData.prefix.$params
                          .required
                      ">
                        <q-icon color="negative" name="warning" />&nbsp;Required
                      </div>
                      <div v-if="
                        $v.formData.prefix.$params
                          .minLength
                      ">
                        <q-icon color="negative" name="warning" />
                        &nbsp;Length should be between
                        {{
                            $v.formData.prefix.$params
                              .minLength.min
                        }}
                        and
                        {{
                            $v.formData.prefix.$params
                              .maxLength.max
                        }}
                      </div>
                    </div>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-card-main>
          </q-card>

        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12 group" align="right">
            <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="toggleModal()">Cancel
            </q-btn>
            <q-btn align="right" @click="submitCreatePrefix(formData)" color="purple-9">Save</q-btn>
          </div>
        </div>
      </form>
    </q-modal>
  </div>
</template>
  
<script>
import { integer, required, minLength, maxLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  // name: 'ComponentName',
  props: ["propShowAddPrefix"],
  data() {
    return {
      multiTidFlagOptions: [
        {
          label: "Yes",
          value: true
        },
        {
          label: "No",
          value: false
        }
      ],
      propToggleModal: this.propShowAddPrefix,
      dropDown: {
        leadSourceOptions: [],
      },
      formData: {

        leadSource: "",
        prefix: "",
        baseMidLength: 15,
        baseTidLength: 8,
      },
    };
  },
  validations: {
    formData: {
      leadSource: { required },
      prefix: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(3)
      },
    }
  },
  error: {
    formData: {
      leadSource: {
        alert: false,
        issue: "",
        value: ""
      },
      prefix: {
        alert: false,
        issue: "",
        value: ""
      },
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
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("vasCreation", ["GET_ALL_VAS_DETAILS"]),
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA"]),
    ...mapActions("Host", ["ADD_NEW_HOST"]),
    ...mapActions("Prefix", ["ADD_NEW_PREFIX"]),
    toggleModal() {
      this.$emit("emitfnshowaddPrefix");
    },

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
      //   .then(() => {
      //     self.FETCH_DEVICES_DATA()
      // .then(() => {
      //   return _.map(self.getAllDevicesInfo, item => {
      //     self.dropDown.deviceOptions.push({
      //       value: item,
      //       label: item.deviceName
      //     });
      //   });
      // })
      //   })
      //   .then(() => {
      //     self.GET_ALL_VAS_DETAILS().then(() => {
      //       return _.map(self.getAllVasDetails, item => {
      //         console.log("GET_ALL_VAS_DETAILS, item: --->",JSON.stringify(item))
      //         self.dropDown.vasOptions.push({
      //           value: item,
      //           label: item.name
      //         });
      //       });
      //     });
      //   })
    },
    submitCreatePrefix() {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });
        this.ADD_NEW_PREFIX(this.formData)
          .then(() => {
            this.$q.loading.hide();
            this.$emit("emitfnshowaddPrefix", "refresh");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "prefix successfully created!",
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
  
