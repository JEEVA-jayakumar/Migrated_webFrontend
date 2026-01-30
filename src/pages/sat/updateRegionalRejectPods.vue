<template>
  <div>
    <div
      class="col-md-6 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
    ></div>

    <form>
      <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
        <div class="col-sm-5">
          <q-select
            color="grey-9"
            v-model="formData.allocate_region"
            :options="regionOptions"
            float-label="Select Region"
            @input="regionBasedSoLoad"
          />
        </div>
        <div class="col-md-5">
          <q-select
            v-model="formData.allocate_so"
            float-label="Select SO"
            radio
            filter
            clearable
            color="grey-9"
            :options="regionBasedSo"
          />
        </div>
        <div class="row">
          <div v-for="menu in sparePartsTypes" :key="menu.id" :to="menu.to">
            <!-- <label> {{ menu.spareParts.spare_parts_types }}</label> -->
          </div>
          <div v-for="menu in sparePartsTypes" :key="menu.id" :to="menu.to">
            <div :id="menu.spareParts.id">
              <label>{{ menu.spareParts.spare_parts_types }}</label>

              <input
                :id="menu.spareParts.id"
                :value="menu.count"
                type="number"
                min="1"
                max="5000"
                @click="finding(menu.count)"
                @blur="getAllCounts($event, menu)"
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <q-input
            disable
            v-model="formData.pod_number"
            float-label="Pod Number"
            radio
            color="grey-9"
          />
        </div>
        <div class="col-md-7">
          <q-input
            disable
            v-model="formData.total_count"
            float-label="Total Count"
            radio
            color="grey-9"
          />
        </div>
      </div>

      <div class="full-width group" align="center">
        <!-- <q-btn
          size="md"
          type="button"
          color="red"
          @click="fnSubmitRejectDetails(formData)"
          >Reject</q-btn
        > -->
        <q-btn
          size="md"
          type="button"
          color="purple-9"
          @click="fnSubmitBankDetails(formData)"
          >Update</q-btn
        >
        <!-- <q-btn
          size="md"
          type="button"
          color="green"
          @click="fnSubmitApproveDetails(formData)"
          >Approve</q-btn
        > -->
      </div>
    </form>
  </div>
</template>

<script>
import {
  required,
  email,
  requiredIf,
  branch_code,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      regionOptions: [],
      regionBasedSo: [],
      spareParts: [],
      sparePartsTypes: [],
      spareCount: {
        count: 0,
        spareParts: {
          id: 0
        }
      },
      allocate_region1: "",
      formData: {
        allocate_region: "",
        allocate_so: "",
        allocate_reseller: null,
        pod_number: "",
        total_count: "",
        sparePartsSets: []
      }
      //   dropDown:{
      //        regionOptions: [],
      //   },
    };
  },
  computed: {
    ...mapGetters("TID", ["getAllTids"]),
    ...mapGetters("InventoryCentral", [
      "getAllInventoryDevicesTypesData",
      "getAllRegionsData",
      "getRegionBasedSO",
      "getRegionBasedResellar"
    ]),
    ...mapGetters("getInventoryUpdatedPodDetails", [
      "getInventoryUpdatedPodDetails"
    ])
  },
  beforeMount() {
    this.sparePartsTypes = this.getInventoryUpdatedPodDetails.sparePartsSets;
    this.formData.sparePartsSets = this.getInventoryUpdatedPodDetails.sparePartsSets;
    this.propRowDetails = this.$route.params.data;
    // console.log(
    //   "getInventoryUpdatedPodDetails------------------>",
    //   JSON.stringify(this.getInventoryUpdatedPodDetails)
    // );
    console.log(
      "propRowDetails------------------>",
      JSON.stringify(this.propRowDetails)
    );
  },
  mounted() {
    console.log(
      "CREATED PROP ROW DETAILS--------------->",
      JSON.stringify(this.propRowDetails)
    );
    (this.formData.allocate_region = JSON.stringify(
      this.propRowDetails.allocate_region
    )),
      (this.formData.allocate_so = JSON.stringify(
        this.propRowDetails.allocate_so
      ));
    this.formData.pod_number = this.propRowDetails.pod_number;
    this.formData.total_count = this.propRowDetails.total_count;
    this.spareParts = this.propRowDetails.sparePartsSets;
    console.log("FORMDATA DETAILS---------", JSON.stringify(this.formData));
    this.ajaxLoadDataForDeviceTypeTable();
  },
  //   a(){
  //       console.log("CREATED PROP ROW DETAILS--------------->",JSON.stringify(this.propRowDetails));
  //   },

  methods: {
    ...mapActions("TID", [
      "FETCH_TID",
      "FETCH_TID_SERIAL_NUMBER",
      "UPDATE_SERIAL_NUMBER"
    ]),
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_REGIONS_DATA",
      "FETCH_REGION_BASED_SO",
      "FETCH_REGION_BASED_RESELLAR"
    ]),
    ...mapActions("getInventoryUpdatedPodDetails", [
      "FETCH_INVENTORY_UPDATED_POD_DETAILS"
    ]),
    ...mapActions("sparePodUpdateDetails", [
      "SPARE_PARTS_POD_UPDATE_DETAILS",
      "SPARE_PARTS_POD_APPROVE_DETAILS",
      "SPARE_PARTS_POD_REJECT_DETAILS"
    ]),
    ...mapActions("soPodListDatas", ["UPDATE_SO_REJECTED_POD_DETAILS"]),
    //  fnAjaxGetAllRegionsData() {
    //   this.FETCH_ALL_REGIONS_DATA()
    //     .then(() => {
    //       let assumeArr = [];
    //       this.getAllRegionsData.map(function(value, index) {
    //         assumeArr.push({
    //           label: value.regionAreaName,
    //           value: value.id
    //         });
    //       });
    //       this.regionOptions = assumeArr;
    //     })
    //     .catch(error => {
    //       this.regionOptions = [];
    //     });
    // },

    ajaxLoadDataForDeviceTypeTable() {
      let self = this;
      self.FETCH_ALL_REGIONS_DATA().then(() => {
        return _.map(self.getAllRegionsData, item => {
          self.regionOptions.push({
            label: item.regionAreaName,
            value: JSON.stringify(item)
          });
        });
      });
      self.regionBasedSoLoad(self.formData.allocate_region);
    },
    //  allocate_region: "",
    //     allocate_so:"",
    //     allocate_reseller: null,
    //     pod_number: "",
    //     total_count: "",

    fnSubmitBankDetails(request) {
      console.log("SUBMITTED VALUES------->", JSON.stringify(request));
      let param = {
        allocate_region: JSON.parse(request.allocate_region),
        allocate_so: JSON.parse(request.allocate_so),
        allocate_reseller: request.allocate_reseller,
        pod_number: request.pod_number,
        total_count: request.total_count,
        sparePartsSets: request.sparePartsSets
      };
      param.created_by = this.getInventoryUpdatedPodDetails.created_by;
      param.status = this.getInventoryUpdatedPodDetails.status == '6'?  4 :this.getInventoryUpdatedPodDetails.status ;
      param.owner = this.getInventoryUpdatedPodDetails.owner;
      param.created_date = this.getInventoryUpdatedPodDetails.created_date;


      console.log(
        "getInventoryUpdatedPodDetails PARAM VALUES GETTED----------------->",
        JSON.stringify(this.getInventoryUpdatedPodDetails)
      );
      this.$q.loading.show();
      this.UPDATE_SO_REJECTED_POD_DETAILS(param)
        .then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully updated!",
            icon: "thumb_up"
          });
          this.$router.push("/sat/inventory/allocation");
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
    // fnSubmitApproveDetails(request) {
    //   console.log("SUBMITTED VALUES------->", JSON.stringify(request));
    //   this.$q.loading.show();
    //   this.SPARE_PARTS_POD_APPROVE_DETAILS(request)
    //     .then(() => {
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         color: "positive",
    //         position: "bottom",
    //         message: "Successfully updated!",
    //         icon: "thumb_up"
    //       });
    //     })
    //     .catch(error => {
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         color: "negative",
    //         position: "bottom",
    //         message:
    //           error.body.message == null
    //             ? "Please Try Again Later !"
    //             : error.body.message,
    //         icon: "thumb_down"
    //       });
    //     });
    // },
    // fnSubmitRejectDetails(request) {
    //   console.log("SUBMITTED VALUES------->", JSON.stringify(request));
    //   this.$q.loading.show();
    //   this.SPARE_PARTS_POD_REJECT_DETAILS(request)
    //     .then(() => {
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         color: "positive",
    //         position: "bottom",
    //         message: "Successfully updated!",
    //         icon: "thumb_up"
    //       });
    //     })
    //     .catch(error => {
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         color: "negative",
    //         position: "bottom",
    //         message:
    //           error.body.message == null
    //             ? "Please Try Again Later !"
    //             : error.body.message,
    //         icon: "thumb_down"
    //       });
    //     });
    // },

    finding(request) {
      console.log("SELCETED FINDING VALUES------->", JSON.stringify(request));
      // this.formData.count = request;
      //  console.log("SELCETED CHECK BOX count------->",JSON.stringify(this.formData.count))
    },
    getAllCounts(event, menu) {
      console.log("GET ALL COUNT EVENTS--------->", event.target.id);
      console.log("GET ALL COUNT menu--------->", menu);
      var flag = 0;
      var spCount = 0;

      let myArr = this.formData.sparePartsSets;
      console.log(
        "BEFORE FORMDATA OF SPAREPART SETS---------->",
        JSON.stringify(myArr)
      );
      if (myArr.length > 0) {
        myArr.forEach(ma => {
          if (ma.spareParts.id == event.target.id) {
            ma.count = parseInt(event.target.value);
          }
          spCount = spCount + parseInt(ma.count);
        });
      }
      console.log(
        "AFTER FORMDATA OF SPAREPART SETS---------->",
        JSON.stringify(myArr)
      );
      this.formData.sparePartsSets = myArr;
      this.formData.total_count = spCount;
    },

    // fnAjaxGetAllRegionsData() {
    //   this.FETCH_ALL_REGIONS_DATA()
    //     .then(() => {
    //       let assumeArr = [];
    //       this.getAllRegionsData.map(function(value, index) {
    //         assumeArr.push({
    //           label: value.regionAreaName,
    //           value: value.id
    //         });
    //       });
    //       this.regionOptions = assumeArr;
    //     })
    //     .catch(error => {
    //       this.regionOptions = [];
    //     });
    // },
    ajaxLoadDataForDeviceTypeTable() {
      let self = this;
      self.FETCH_ALL_REGIONS_DATA().then(() => {
        return _.map(self.getAllRegionsData, item => {
          self.regionOptions.push({
            label: item.regionAreaName,
            value: JSON.stringify(item)
          });
        });
      });
      self.regionBasedSoLoad(self.formData.allocate_region);
    },
    regionBasedSoLoad(item) {
      console.log("Region Items", item);
      let data = JSON.parse(item);
      console.log("REGION ID", typeof data);
      this.allocate_region1 = data.id;
      this.formData.allocate_region = item;
      let self = this;
      self.FETCH_REGION_BASED_SO(this.allocate_region1).then(() => {
        return _.map(self.getRegionBasedSO, item => {
          self.regionBasedSo.push({
            label: item.name,
            value: JSON.stringify(item)
          });
        });
      });
    }
  }
};
</script>
