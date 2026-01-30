<template>
  <q-page>
    <div class="text-grey-9">
      <div class="row bottom-border q-pa-sm items-center">
        <div class="col">
          <q-tabs class="shadow-1" animated swipeable color="tertiary" glossy align="justify" v-model="shortlead">
            <q-tab name="shortlead" label="Additional Terminals" slot="title" />
            <q-tab-pane name="shortlead">
              <div>
                <div class="col-md-6 q-my-md" align="right">
                  <div class="col group"></div>
                </div>
                <form>
                  <div class="q-px-md">
                    <div class="q-pa-md">
                      <div class="row gutter-sm q-py-sm">
                        <div class="col-md-6">
                          <q-input color="grey-9" disable v-model.trim="additionalTerminal.mid" float-label="MID*" />
                        </div>
                        <div class="col-md-6">
                          <q-input color="grey-9" disable v-model.trim="additionalTerminal.tid" float-label="TID*" />
                        </div>
                        <div class="col-md-6">
                          <q-input color="grey-9" disable v-model.trim="additionalTerminal.institutionCode"
                            float-label="Institution code*" />
                        </div>
                        <div class="col-md-6">
                          <q-input color="grey-9" :disable="
                              this.propRowDetails.leadInformation
                                .merchantRefCode
                                ? true
                                : false
                            " v-model.trim="additionalTerminal.merchantRefCode" :error="$v.additionalTerminal.merchantRefCode.$error
                  " float-label="Merchant RefCode*" />
                        </div>
                        <div class="col-md-6">
                          <q-input color="grey-9" disable v-model.trim="additionalTerminal.applicationNumber"
                            float-label="Application Number*" />
                        </div>
                        <div class="col-md-6">
                          <q-input v-model.trim="
                              additionalTerminal.AdditionalTerminalDetails
                                .numberOfTerminals
                            " @blur="
           $v.additionalTerminal.AdditionalTerminalDetails
      .numberOfTerminals.$touch;
         " :error="
           $v.additionalTerminal.AdditionalTerminalDetails
             .numberOfTerminals.$error
         " class="text-weight-regular text-grey-8" color="grey-9" float-label="*Number Of Terminals"
                            placeholder="Number Of Terminals" />
                        </div>
                        <div class="col-md-6">
                          <q-input color="grey-9" disable v-model.trim="
                              additionalTerminal.AdditionalTerminalDetails
                                .address
                            " float-label="Address*" />
                        </div>

                        <div class="col-md-6">
                          <q-input color="grey-9" disable v-model.trim="
                              additionalTerminal.AdditionalTerminalDetails
                                .pinCode
                            " float-label="Pincode*" />
                        </div>

                        <div class="col-md-6">
                          <q-input @blur="fnClrCity" color="grey-9"
                            v-model.trim="additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel"
                            @input="fninputTyping($event, 1)" float-label="City (type min 3 characters)*"
                            placeholder="Start typing ..*">

                            <q-autocomplete separator @search="marsCitySearch" :debounce="10" :min-characters="3"
                              @selected="partnerCitySelected" />
                          </q-input>
                        </div>
                        <div class="col-md-6">
                          <q-input @blur="fnClrState" color="black-9"
                            v-model.trim="additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel"
                            @input="fninputTyping($event, 2)" float-label="state (type min 3 characters)*"
                            placeholder="Start typing ..*">
                            <q-autocomplete separator @search="marsStateSearch" :debounce="10" :min-characters="3"
                              @selected="partnerStateSelected" />
                          </q-input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="full-width group" align="center">
                    <q-btn size="md" type="button" color="purple-9" @click="fnSubmitBankDetails(additionalTerminal)">
                      Submit</q-btn>
                  </div>
                </form>
              </div>
            </q-tab-pane>
          </q-tabs>
        </div>
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
    email,
  } from "vuelidate/lib/validators";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "additionalTidFromMars",
    data() {
      return {
        // propRowDetails: "",
        ifscset: [],
        cityOptions: [],
        stateOptions: [],
        propRowDetails: {},
        shortlead: "shortlead",
        companyRegisteredCitySelected: false,
        companyRegisteredStateSelected: false,
        additionalTerminal: {
          institutionCode: "",
          merchantRefCode: "",
          // terminalRefCode: '',
          applicationNumber: "",
          mid: "",
          tid: "",
          AdditionalTerminalDetails: {
            numberOfTerminals: "",
            citySerNumber: "",
            citySerNumberLabel: "",
            stateSerNumberLabel: "",
            stateSerNumber: "",
            pinCode: "",
            address: "",
          },
        },
        dropDown: {
          deviceOptions: [],
          leadSourceOptions: [],
        },
      };
    },
    error: {
      additionalTerminal: {
        merchantRefCode: {
          alert: false,
          issue: "",
          value: "",
        },

        AdditionalTerminalDetails: {
          numberOfTerminals: {
            alert: false,
            issue: "",
            value: "",
          },
          // citySerNumber: {
          //   alert: false,
          //   issue: "",
          //   value: "",
          // },
          // citySerNumberLabel: {
          //   alert: false,
          //   issue: "",
          //   value: "",
          // },
          // pinCode: {
          //   alert: false,
          //   issue: "",
          //   value: "",
          // },
          // address: {
          //   alert: false,
          //   issue: "",
          //   value: "",
          // },
        },
      },
    },
    validations: {
      additionalTerminal: {
        merchantRefCode: {
          required,
        },

        AdditionalTerminalDetails: {
          numberOfTerminals: {
            required,
          },
          // citySerNumberLabel: {
          //   required,
          // },
          // citySerNumber: {
          //   required,
          // },
        },
      },
    },
    beforeMount() {
      this.propRowDetails = this.$route.params.data;
      this.additionalTerminal.mid = this.propRowDetails.mid;
      this.additionalTerminal.tid = this.propRowDetails.tid;
      this.additionalTerminal.merchantRefCode = this.propRowDetails.leadInformation.merchantRefCode;
      this.additionalTerminal.applicationNumber = this.propRowDetails.applicationNumber;
      this.additionalTerminal.AdditionalTerminalDetails.address = this.propRowDetails.deviceAddress;
      this.additionalTerminal.institutionCode = this.getadditionalTidVerifyData;
      this.additionalTerminal.AdditionalTerminalDetails.pinCode = this.propRowDetails.pincode;
      this.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel = this.propRowDetails.city;
      this.additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel = this.propRowDetails.state;
      this.fetchmarsCity(
        this.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel,
        this.additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel
      );
    },

    computed: {
      ...mapGetters("mars_additional_tid", [
        "additionalTidFromMars",
        "additionalTidFromBackEnd",
      ]),
      ...mapGetters("mars_additional_city", ["marsAdditionalCity"]),
      ...mapGetters("additionalTid", ["getadditionalTidVerifyData"]),
      ...mapGetters("mars_additional_state", ["marsAdditionalState"]),
    },

    methods: {
      ...mapActions("mars_additional_tid", [
        "ADDITIONAL_TID_FROM_MARS",
        "ADDITIONAL_TID_FROM_BACK_END",
      ]),
      ...mapActions("mars_additional_city", ["CITY_FORM_ADDITIONAL_TID"]),
      ...mapActions("additionalTid", ["ADDITIONAL_TID_VERIFY_DATA"]),
      ...mapActions("mars_additional_state", ["STATE_FROM_ADDITIONAL_TID"]),


      fninputTyping(event, type) {
        let flag = event.split("");
        switch (type) {
          case 1:
            this.companyRegisteredCitySelected = false;
          case 2:
            this.companyRegisteredStateSelected = false;
        }
        if (this.cityOptions.length <= 0 || this.stateOptions.length <= 0) {
          // console.log("city Ops: =============== : ", this.cityOptions.length);
          // console.log("city Name: =============== : ", this.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel);
          this.fetchmarsCity(this.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel, this.additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel);
        }
      },

      ///selected City
      fetchmarsCity(citySerNumberLabel, stateSerNumberLabel) {
        let self = this;
        self
          /* API call to fetch city */
          .CITY_FORM_ADDITIONAL_TID(citySerNumberLabel)
          .then(() => {
            self.cityOptions = [];
            self.marsAdditionalCity.items.map((oo) => {
              self.cityOptions.push({ label: oo.name, value: oo.code });
              if (oo.code != "" && oo.code != " ")
                this.additionalTerminal.AdditionalTerminalDetails.citySerNumber = oo.code;
            });
          })
          .then(() => {
            /* API call to fetch state */
            return self.STATE_FROM_ADDITIONAL_TID(stateSerNumberLabel).then((response) => {
              self.stateOptions = [];
              self.marsAdditionalState.items.map((oo) => {
                self.stateOptions.push({ label: oo.name, value: oo.code });
                if (oo.code != "" && oo.code != " ")
                  this.additionalTerminal.AdditionalTerminalDetails.stateSerNumber = oo.code;

              });
              // self.stateOptions = stateArr;
            });
          });
      },

      marsCitySearch(terms, done) {
        console.log("done---------->", JSON.stringify(this.cityOptions))
        done(this.COMMON_FILTER_FUNCTION(this.cityOptions, terms));
      },
      marsStateSearch(terms, done) {
        done(this.COMMON_FILTER_FUNCTION(this.stateOptions, terms));
      },
      partnerCitySelected(item) {
        console.log("before partnerCitySelected ITEM------->", JSON.stringify(item))
        this.companyRegisteredCitySelected = true
        this.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel = item.label;
        this.additionalTerminal.AdditionalTerminalDetails.citySerNumber = item.value;
        console.log("after partnerCitySelected ITEM------->", JSON.stringify(item))
      },

      fnClrCity() {
        if (!this.companyRegisteredCitySelected)
          this.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel = ''
      },
      partnerStateSelected(item) {
        this.companyRegisteredStateSelected = true
        this.additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel = item.label;
        this.additionalTerminal.AdditionalTerminalDetails.stateSerNumber = item.value;
      },
      fnClrState() {
        if (!this.companyRegisteredStateSelected)
          this.additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel = ''
      },

      COMMON_FILTER_FUNCTION(arraySet, terms) {
        return _.filter(arraySet, function (oo) {
          return (
            oo.label.toLowerCase().includes(terms.toLowerCase()) ||
            oo.value.toString().includes(terms.toString())
          );
        });
      },

      fnSubmitBankDetails(request) {
        this.$v.additionalTerminal.$touch();
        if (this.$v.additionalTerminal.$error) {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please fill all mandatory fields",
            icon: "info",
          });
        } else {
          let self = this;
          self.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Validating ..",
          });
          let key = this.additionalTerminal.institutionCode;
          this.$q.localStorage.set("a_t", key);
          const finalFormRequest = {
            additionalTerminal: self.additionalTerminal,
          };
          delete finalFormRequest.additionalTerminal.AdditionalTerminalDetails.citySerNumberLabel;
          delete finalFormRequest.additionalTerminal.AdditionalTerminalDetails.stateSerNumberLabel;
          let params = {
            Id: { leadId: this.$route.params.data.leadInformation.id },
            Count: {
              count:
                this.additionalTerminal.AdditionalTerminalDetails
                  .numberOfTerminals,
            },
            Datas: finalFormRequest,
          };
          this.ADDITIONAL_TID_FROM_MARS(finalFormRequest)
            .then((response) => {
              let paramaters;
              if (response.status == 204) {
                this.$q.loading.hide();
                this.$q.notify({
                  type: "warning",
                  color: "amber-9",
                  position: "bottom",
                  message: error.data.message,
                });
              } else {
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "data",
                  icon: "thumb_up",
                  message: "Merchant Details successfully Updated",
                });

                this.ADDITIONAL_TID_FROM_BACK_END({ params })
                  .then((response) => {
                    this.$q.loading.hide();
                    this.$q.notify({
                      color: "positive",
                      position: "bottom",
                      message: "Saved successfully",
                      icon: "thumb_up",
                    });
                  })
                  .catch(() => {
                    //  this.MARS_DATA_SUBMIT_INTERNAL_CHANGEMANAGEMENT(merchantrequestparams)
                    console.log(error.status);

                    this.$q.notify({
                      color: "negative",
                      position: "bottom",
                      icon: "thumb_down",
                      message: error.data.message,
                    });
                  });
              }
              console.log("MARS RESPONSE--------------->" + JSON.stringify(response));
            });
          // .catch(() => {
          //   this.$q.loading.hide();
          //   this.$q.notify({
          //     type: "warning",
          //     color: "amber-9",
          //     position: "bottom",
          //     message: error.data.message,
          //   });
          // });

          // this .ADDITIONAL_TID_FROM_BACK_END({params})
          //      .then(response => {
          //           self.$q.notify({
          //             color: "positive",
          //             position: "bottom",
          //             message: "Successfully submitted to MARS",
          //             icon: "thumb_up"
          //           });
          //           self.$q.loading.hide();
          //         });
        }
      },
      created: function () {
        if (this.$route.params.data) {
          this.propRowDetails = $route.params.data;
        }
        // this.fetchCustomers();
      },
    },
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
