<template>
    <div>
      <q-modal
        v-model="opened"
        class="q-mt-lg capitalize"
        @hide="emitToggleRemarks"
        @escape-key="emitToggleRemarks"
        :content-css="{ minWidth: '30vw', padding: '20px' }"
      >
        <div class="row items-center bottom-border q-py-sm">
          <div class="col">Change Region</div>
          <div class="col-auto">
            <q-btn
              round
              size="sm"
              @click="emitToggleRemarks"
              outline
              color="dark"
              icon="clear"
            />
          </div>
        </div>
        &nbsp;
        <div class="row">
          <div class="col-sm-4">
            <strong>Current Region</strong>
          </div>
          &nbsp;
          &nbsp;
          <div class="col-sm-4">
            <div class="current">{{ currentRegion }}</div>
          </div>
        </div>
        &nbsp;
        <div class="row">
          <div class="col-sm-4  region">
            <strong>Select Region</strong>
          </div>
          <div class="col-sm-6">
            <q-select
              class="text-weight-regular text-grey-8"
              color="grey-9"
              v-model="formData.region"
              float-label="Select Region"
              placeholder="Select Region"
              :options="regionOptions"
            />
          </div>
        </div>
        <!-- &nbsp;
        <div class="row">
          <div class="col-sm-4 text">
            <strong>Add Remarks</strong>
          </div>
          <div class="col-sm-6">
            <div class="q-gutter-y-md column" >
              <q-input
                v-model="remarks"
                filled
          clearable
          type="textarea"
          color="red-12"
          label="Textarea with shadow text"
          hint="Press TAB to autocomplete suggested value or ESC to cancel suggestion"
          :shadow-text="textareaShadowText"
          @keydown="processTextareaFill"
          @focus="processTextareaFill"
              />
            </div>
          </div>
        </div>
        <br /> -->
        <div class="row">
          <q-btn 
          :disabled="formData.region=='' " 
          class="glossy" 
          rounded 
          @click="changeRegion()" 
          label="Submit" 
          />
        </div>
      </q-modal>
    </div>
  </template>
  <script>
  import {
    required,
    requiredIf,
    minLength,
    maxLength,
    email
  } from "vuelidate/lib/validators";
  import { mapGetters, mapActions } from "vuex";
  export default {
    props: ["regionInformation", "propToggleRegionInfoPop"],
    data() {
      return {
        currentRegion: null,
        opened: this.propToggleRegionInfoPop,
        formData: {
          region: ""
        },
        // remarks: "",
        regionOptions: []
      };
    },
    validation: {
      formData: {
        region: {
          required
        }
      }
    },
    computed: {
      ...mapGetters("InventoryCentral", ["getAllRegionsData"])
    },
    created() {
      this.fnAjaxGetAllRegionsData();
    },
    beforeMount() {
      this.currentRegion = JSON.parse(
        localStorage.getItem("u_i")
      ).region.regionAreaName;
    },
    methods: {
      ...mapActions("InventoryCentral", ["FETCH_ALL_REGIONS_DATA"]),
      ...mapActions("HitachiIndianBankOnboarding", ["CHANGE_HITACHI_REGION"]),
  
      fnAjaxGetAllRegionsData() {
        this.FETCH_ALL_REGIONS_DATA()
          .then(() => {
            let assumeArr = [];
            this.getAllRegionsData.map(function(value, index) {
              assumeArr.push({
                label: value.regionAreaName,
                value: value
              });
            });
            this.regionOptions = assumeArr;
          })
          .catch(error => {
            this.regionOptions = [];
          });
      },
  
      changeRegion() {
        let ChangeRegionData = {
          marsDetails: this.regionInformation,
          region: this.formData.region
        //   remarks: this.remarks
        };
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.CHANGE_HITACHI_REGION(ChangeRegionData)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Region Changed successfully",
              icon: "thumb_up"
            });
            this.emitToggleRemarks();
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body.message == null
                  ? "Please Try Again Later !"
                  : error.body.message,
              icon: "thumb_down"
            });
          });
      },
      emitToggleRemarks() {
        this.$emit("closeRegionInformation");
      }
    }
  };
  </script>
  <style>
  .region {
    margin-top: 15px;
    margin-left: 10px;
  }
  .current {
    background-color: darksalmon;
  }
  .text {
    margin-top: 43px;
    margin-left: 10px;
  }
  .glossy {
    margin-left: 250px;
    background-color: rgb(151, 47, 151);
  }
  </style>
  