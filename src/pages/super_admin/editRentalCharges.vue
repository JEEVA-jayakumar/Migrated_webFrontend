<template>
  <q-page>
    <q-modal
      minimized no-backdrop-dismiss
      class="customModalOverlay"
      v-model="toggleModel"
      :content-css="{ padding: '25px', minWidth: '40vw' }"
    >
      <div class="row">
        <div class="col-12 q-title q-pa-md text-weight-regular bottom-border">
          Existing Rental charge
        </div>
        <!-- START >> Setup MDR details -->
        <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
          <q-card style="width:150%">
            <q-card-main>
              <q-list no-border>
                <div class="col-md-12">
                  <q-select
                    color="grey-9"
                    v-model="formData.leadSource"
                    :options="dropDown.leadSourceOptions"
                    float-label="Select lead source"
                    @input="fnleadSource"
                  />
                </div>
                <div class="col-md-12">
                  <q-select
                    color="grey-9"
                    v-model="formData.device"
                    :options="dropDown.deviceOptions"
                    float-label="Select device"
                    @input="fnDevice"
                  />
                </div>
                <div class="col-md-12">
                  <q-select
                    color="grey-9"
                    v-model="formData.marsDeviceModel"
                    :options="dropDown.marsDeviceOptions"
                    float-label="Mars Device Model"
                    @input="fnMarsDeviceModel"
                  />
                </div>
                <div class="col-md-12">
                  <q-select
                    color="grey-9"
                    v-model="formData.plan"
                    :options="dropDown.planOptions"
                    float-label="Select plan"
                    placeholder="Plan"
                    @input="fnCategoryBasedRental"
                  />
                </div>
                <div class="col-md-12">
                  <q-input
                    color="grey-9"
                    type="number"
                    v-model="formData.setupFees"
                    placeholder="Setup fee"
                    float-label="Enter Setup fee"
                  />
                </div>
                <div class="col-md-12">
                  <q-input
                    color="grey-9"
                    type="number"
                    v-model="formData.monthlyFees"
                    placeholder="Recurring fee"
                    float-label="Enter recurring fee"
                  />
                </div>
              </q-list>
            </q-card-main>
            <q-card-actions  align="end">
              <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowEditRental()"
              >Cancel</q-btn>
              <q-btn
                label="submit"
                @click="fnEditRentalPlan(formData)"
                color="purple-9"
              />
            </q-card-actions>
          </q-card>
        </div>
        <!-- END >> Setup MDR details -->
        <!-- START >> Table >> MDR details -->
        <div class="col-md-7 col-sm-8 col-xs-12"></div>
        <!-- END >> Table >> MDR details -->
        <!--START: Show lead source -->
        <showLeadSourceModalComponent
          v-if="showLeadSourceModal"
          :propToggleModal="showLeadSourceModal"
          @emitToggleModal="fnManageLeadSource"
        ></showLeadSourceModalComponent>
        <!--END: Show lead source -->
        <!--START: Show device details -->
        <showDeviceDetailModalComponent
          v-if="showDeviceDetailModal"
          :propToggleModal="showDeviceDetailModal"
          @emitToggleModal="fnManageDevice"
        ></showDeviceDetailModalComponent>
        <!--END: Show device details-->
        <!--START: Show lead source -->
        <showMerchantModalComponent
          v-if="showMerchantModal"
          :propToggleModal="showMerchantModal"
          @emitToggleModal="fnManageMerchantType"
        ></showMerchantModalComponent>
        <!--END: Show lead source -->
      </div>
    </q-modal>
  </q-page>
</template>

<script>
/* START >> Modal components Lead source, device, merchant type */
import showLeadSourceModalComponent from "../../components/super_admin/showLeadSourceModalComponents.vue";
import showDeviceDetailModalComponent from "../../components/super_admin/showDeviceDetailModalComponents.vue";
import showMerchantModalComponent from "../../components/super_admin/merchantTypes.vue";
/* END >> Modal components Lead source, device, merchant type */

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShoweditPlanDetails", "propRowDetails"],
  name: "MDRdetails",
  components: {
    /* START >> Modal components Lead source, device, merchant type */
    showLeadSourceModalComponent,
    showDeviceDetailModalComponent,
    showMerchantModalComponent
    /* END >> Modal components Lead source, device, merchant type */
  },
  data() {
    return {
      /* START >> Modal props */
      toggleModel: this.propShoweditPlanDetails,
      showLeadSourceModal: false,
      showDeviceDetailModal: false,
      showMerchantModal: false,
      /* END >> Modal props */

      /* START >> Rental charges */
      formData: {
        leadSource: JSON.stringify(this.propRowDetails.leadSource),
        device: JSON.stringify(this.propRowDetails.device),
        marsDeviceModel: JSON.stringify(this.propRowDetails.marsDeviceModel),
        plan: JSON.stringify(this.propRowDetails.plan),
        setupFees: this.propRowDetails.setupFees,
        monthlyFees: this.propRowDetails.monthlyFees,
        leadSource1: this.propRowDetails.leadSource.id,
        deviceId: this.propRowDetails.device.id,
        marsId: "",
        plan1: ""
      },
      dropDown: {
        deviceOptions: [],
        leadSourceOptions: [],
        marsDeviceOptions: [],
        planOptions: []
      },
      rentalChargeId: this.propRowDetails.id,

      /* END >> Rental charges */

      /* START >>Table properties */
      filterSearch: "",
      // device1:"",
      paginationControl: {
        rowsPerPage: 5
      }
      /* END >>Table properties */

      /* END >>Table data */
    };
  },

  created() {
    /* START: Load user table data filter > DeviceTypes */
    this.LEAD_BASED_RENTAL(this.formData.leadSource1);
    /* End: Load user table data filter > DeviceTypes */
  },

  beforeMount() {
    console.log("The prop details : ---- : ", this.propRowDetails)
    this.ajaxLoadDataForDeviceTypeTable(
      this.formData.sourceName,
      this.formData.device,
      this.formData.merchantType
    );
    console.log("The prop details Form Data: ---- : ", this.formData)
    //  this.ajaxMarsDeviceModelDatasLoading();
    this.marsDeviceModelDatasLoading();
  },

  computed: {
    ...mapGetters("SA_Devices", ["getAllDevicesInfo", "getMarsDeviceModel"]),
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
    ...mapGetters("categoryBasedRental", ["categoryBasedRental"]),
    ...mapGetters("CategoryBasedMdr", ["categoryBasedMdr"]),
    ...mapGetters("LeadSourceBasedRental", ["getLeadSourceRental"]),
    ...mapGetters("plan", ["getActivePlan"])
  },

  methods: {
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA", "FETCH_MARS_DEVICE_MODEL"]),
    ...mapActions("LeadSourceBasedRental", ["LEAD_BASED_RENTAL"]),
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("MdrPlan", ["MDR_PLAN"]),
    ...mapActions("plan", ["PLAN_ACTIVE_LIST"]),
    ...mapActions("categoryBasedRental", ["CATEGORY_BASED_RENTAL_PLAN", "EDIT_RENTAL_PLAN"]),
    ...mapActions("CategoryBasedMdr", ["CATEGORY_BASED_MDR_PLAN", "EDIT_MDR_PLAN"]),
    emitfnshowEditRental(){
      this.$emit("emitfnshowEditRental");
    },

    marsDeviceModelDatasLoading() {
      let self = this;
      self.FETCH_MARS_DEVICE_MODEL().then(() => {
        return _.map(self.getMarsDeviceModel, item => {
          item.map(oo => {
            self.dropDown.marsDeviceOptions.push({
              label: oo.name,
              value: JSON.stringify(oo)
            });
          });
        });
      });
    },

    /* START >> Fetch table data for MDR charges */
    ajaxLoadDataForDeviceTypeTable(leadSource, device, plan) {
      let self = this;
      self
        .FETCH_DEVICES_DATA(device)
        .then(() => {
          return _.map(self.getAllDevicesInfo, item => {
            self.dropDown.deviceOptions.push({
              label: item.deviceName,
              value: JSON.stringify(item)
            });
          });
        })

        .then(() => {
          self.LEAD_SOURCE_ACTIVE_LIST(leadSource).then(() => {
            return _.map(self.getActiveLeadSource, item => {
              console.log("Drop down values : --- : ", JSON.stringify(item))
              self.dropDown.leadSourceOptions.push({
                label: item.sourceName,
                value: JSON.stringify(item)
              });
            });
          });
        })
        .then(() => {
          self.PLAN_ACTIVE_LIST(plan).then(() => {
            return _.map(self.getActivePlan, item => {
              self.dropDown.planOptions.push({
                value: JSON.stringify(item),
                label: item.planName
              });
            });
          });
        });
    },
    fnCategoryBasedRental(item) {
      this.formData.plan1 = item.id;
      this.formData.plan = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        plan: this.formData.plan1
      };
      let self = this;
      self.CATEGORY_BASED_RENTAL_PLAN(formData).then(response => {
        if (response.status == 200) {
          this.formData.setupFees = self.categoryBasedRental.setupFees;
          this.formData.monthlyFees = self.categoryBasedRental.monthlyFees;
        } else if (response.data == null) {
          this.formData.setupFees = 0;
          this.formData.monthlyFees = 0;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid MDR Plan Code",
            icon: "clear"
          });
          this.formData.setupFees = "";
          this.formData.monthlyFees = "";
        }
      });
    },
    fnleadSource(item) {
      let value = item;
      let data = JSON.parse(value);
      console.log("Lead Source1", data.id);
      this.formData.leadSource1 = data.id;
      this.formData.leadSource = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        plan: this.formData.plan1,
        marsDeviceModel: this.formData.marsId
      };
      this.LEAD_BASED_RENTAL(this.formData.leadSource1);
      let self = this;
      self.CATEGORY_BASED_RENTAL_PLAN(formData).then(response => {
        if (response.status == 200) {
          this.formData.setupFees = self.categoryBasedRental.setupFees;
          this.formData.monthlyFees = self.categoryBasedRental.monthlyFees;
        } else if (response.data == null) {
          this.formData.setupFees = 0;
          this.formData.monthlyFees = 0;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid MDR Plan Code",
            icon: "clear"
          });
          this.formData.setupFees = "";
          this.formData.monthlyFees = "";
        }
      });
    },
    fnMarsDeviceModel(oo) {
      let value = oo;
      let data = JSON.parse(value);
      console.log("Lead Source1", data.id);
      this.formData.marsId = data.id;
      this.formData.marsDeviceModel = oo;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        plan: this.formData.plan1,
        marsDeviceModel: this.formData.marsId
      };
      let self = this;
      self.CATEGORY_BASED_RENTAL_PLAN(formData).then(response => {
        if (response.status == 200) {
          this.formData.setupFees = self.categoryBasedRental.setupFees;
          this.formData.monthlyFees = self.categoryBasedRental.monthlyFees;
        } else if (response.data == null) {
          this.formData.setupFees = 0;
          this.formData.monthlyFees = 0;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid MDR Plan Code",
            icon: "clear"
          });
          this.formData.setupFees = "";
          this.formData.monthlyFees = "";
        }
      });
    },
    fnDevice(item) {
      let value = item;
      let data = JSON.parse(value);
      console.log("Lead Source1", data.id);
      this.formData.deviceId = data.id;
      this.formData.device = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        plan: this.formData.plan1,
        marsDeviceModel: this.formData.marsId
      };
      let self = this;
      self.CATEGORY_BASED_RENTAL_PLAN(formData).then(response => {
        if (response.status == 200) {
          this.formData.setupFees = self.categoryBasedRental.setupFees;
          this.formData.monthlyFees = self.categoryBasedRental.monthlyFees;
        } else if (response.data == null) {
          this.formData.setupFees = 0;
          this.formData.monthlyFees = 0;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid MDR Plan Code",
            icon: "clear"
          });
          this.formData.setupFees = "";
          this.formData.monthlyFees = "";
        }
      });
    },
    fnEditRentalPlan(request) {
      let requestParams = {
        id: this.rentalChargeId,
        marsDeviceModel: JSON.parse(request.marsDeviceModel),
        setupFees: request.setupFees,
        monthlyFees: request.monthlyFees,
        device: JSON.parse(request.device),
        plan: JSON.parse(request.plan),
        leadSource: JSON.parse(request.leadSource),
        active: true 
      };
      console.log("fnEditRentalPlan request ------------>",JSON.stringify(request))
      console.log("fnEditRentalPlan requestParams ------------>",JSON.stringify(requestParams))
      
      this.EDIT_RENTAL_PLAN(requestParams)
        .then(response => {
          this.$emit("emitfnshowEditRental");
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "data",
            icon: "thumb_up",
            message: response.data.message
          });
          this.$router.push("/super/admin/manage/newRentalCharges");
          var self = this;
          Object.keys(this.formData).forEach(function(key, index) {
            self.formData[key] = "";
          });
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({
            color: "positive",
            position: "bottom",
            icon: "thumb_up",
            message: error.data.message
          });
          var self = this;
          Object.keys(this.formData).forEach(function(key, index) {
            self.formData[key] = "";
          });
        });
    },

    /* END >> Fetch table data for MDR charges */

    /* START >> Manage lead source, device, merchant type */
    fnManageLeadSource() {
      this.showLeadSourceModal = !this.showLeadSourceModal;
    },
    fnManageDevice() {
      this.showDeviceDetailModal = !this.showDeviceDetailModal;
    },
    fnManageMerchantType() {
      this.showMerchantModal = !this.showMerchantModal;
    },
    /* END >> Manage lead source, device, merchant type */

    /* START >> Manage MDR charges */
    fnShowEditPermission() {},
    fnDisablePermission() {}
    /* END >> Manage MDR charges */
  }
};
</script>

<style></style>