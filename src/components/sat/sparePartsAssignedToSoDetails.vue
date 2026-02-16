<template>
  <q-page>
    <!-- content -->
    <div class="backgroundimage">
    <!--START: table title -->
    <div class="row bottom-border q-px-md q-py-md items-center">
    <div
          class="
            col-6 col-sm-4 col-md-8
            text-h6
            text-weight-regular text-grey-9
          "
        >
         Assigned To So
        </div>

         
    </div>


      <div
        class="
          row
          bottom-border
          group
          q-px-md q-py-md
          items-center
          text-weight-regular text-grey-9
        "
      >
        <div class="col-md-3">
          <q-select
            filter 
            clearable
            v-model="formData.allocate_so"
            float-label="Select SO"
            radio
            color="grey-9"
            :options="regionBasedSo"
            @request="regionBasedSoLoad"
          />
        </div>
      
        <div class="col-md-7">
          <p class="caption">Spare Parts Typesss*</p>
          <div class="row">
            <div
              class="row items-center"
              v-for="menu in sparePartsTypes"
              :key="menu.value.id"
              :to="menu.to"
            >
              <input
                style="width: 18px; height: 18px"
                type="checkbox"
                :id="menu.value.id + '_CB'"
                :name="menu.value.spare_parts_types"
                @click="getSelectedDetails($event, menu.value)"
              />
              <label>{{ menu.value.spare_parts_types }}</label>
            </div>
          </div>
          <div v-for="menu in sparePartsTypes" :key="menu.id" :to="menu.to">
            <div
              :id="menu.value.id + '_DV'"
              style="display: none"
              @click="finding(menu.value.id)"
            >
              <label>{{ menu.value.spare_parts_types }}</label>
              <input
                :id="menu.value.id + '_IP'"
                type="number"
                min="1"
                max="5000"
                @blur="getAllCounts($event, menu)"
              />
            </div>
          </div>
        </div>
        <div class="col-md-7">
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

        <div class="full-width group" align="center" id="formData">
        
          <q-btn
            size="md"
            type="button"
            color="purple-9"
            @click="fnSubmitBankDetails(formData)"
            >Submit</q-btn
          >
        </div>
        <Form
          model="post"
          class="full-width group"
          action=""
          id="myfrm"
          :disabled="true"
        >
        </Form>
      </div>
    </div>
  </q-page>
</template>

<script>

import {
  required,
  requiredIf,
  alphaNum,
  integer,
  numeric,
  minLength,
  maxLength,
  email,
  maxValue,
  minValue,
  decimal
} from "@vuelidate/validators";
// import VueBarcodeScanner from "vue-barcode-scanner";
// Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";

export default {
  name: "allocateDevice",
  data() {
    return {
      image: "@/assets/capture.png",
      filterSearch: "",
      scannerToggleOption: true,
      regionOptions: [],
      deviceOptions: [],
      regionBasedSo: [],
      resellarOptions: [],
      sparePartsTypes: [],
      spareMapping: [],
      menu: [],
      newwin: [],
      Count: [],
      requestData: [],
      data: [],
      tempTableData: [],
      eventValues: [],
      spareCount: {
        count: 0,
        spareParts: {
          id: 0
        }
      },
      selectedSpareValue: "",
      flag: "",
      count: "",

      formData: {
        allocate_region: "",
        allocate_reseller: null,
        total_count: 0,
        allocate_so: "",
        pod_number: "",
        sparePartsSets: []
      },
    
      flagOptions: [
        {
          label: "Region",
          value: 0
        },
        {
          label: "SO",
          value: 1
        },
        {
          label: "Reseller",
          value: 2
        }
      ],
      tableAjaxLoading: false
    };
  },
    validations:{
        flag:{
          required,
        },
      },

  computed: {
    // ...mapGetters("InventoryScanAddDevice", ["getAddDeviceScannedItems"]),
    ...mapGetters("InventoryCentral", [
      "getAllInventoryDevicesTypesData",
      "getAllRegionsData",
      "getRegionBasedSO",
      "getRegionBasedResellar"
    ]),
    ...mapGetters("sparePartsGetTypes", [
      "getsparePartsGetTypes",
      "getallInventorySparePartsGetTypes"
    ]),
    getUserNAme() {
      return JSON.parse(localStorage.getItem("u_i")).user.name;
    }
  },
  created() {
    this.fnAjaxGetAllDevicesTypesData();
    this.fnAjaxGetAllRegionsData();
    this.fnSparePartsTypes();
    this.FETCH_REGION_BASED_RESELLAR();
    this.regionBasedSoLoad();
    // this.FETCH_REGION_BASED_SO();
  },
  unmounted() {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy();
  },
  
  beforeMount() {
    const name = "SO";
    const d = new Date();
    // console.log("DATE OF POD---------->",d)
    let number = d.getTime();
    // console.log("Number OF POD---------->",JSON.stringify(number))
    let finalValue = name.concat(number);
    // console.log("finalValue OF POD---------->",finalValue)
    this.formData.pod_number = finalValue;
  },

  methods: {
    // ...mapActions("SatDeviceTrackerScanner", ["REACTIVE_SCANNED_DEVICE_DATA"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_REGIONS_DATA",
      "FETCH_REGION_BASED_SO",
      "FETCH_REGION_BASED_RESELLAR"
    ]),
    ...mapActions("VerifyDevice", [
      "DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION"
    ]),
    ...mapActions("sparePartsGetTypes", [
      "FETCH_SPARE_PARTS_GET_TYPES",
      "FETCH_ALL_SPARE_PARTS_INVENTORY_DATAS",
      "SPARE_PARTS_ADD_STOCKS"
    ]),
    ...mapActions("sparePartsInventory", [
      "UPDATE_SPARE_PARTS_INVENTORY_DATAS"
    ]),
    // emitToggleRemarks() {
    //   this.$emit("emitToggleDeleteUsersModal");
    // },
    finding(request) {
      console.log("SELCETED CHECK BOX VALUES------->", JSON.stringify(request));
      // this.formData.count = request;
      //  console.log("SELCETED CHECK BOX count------->",JSON.stringify(this.formData.count))
    },
    getInputValues(request) {
      console.log(
        "SELCETED getInputValues VALUES------->",
        JSON.stringify(request)
      );
    },
    getSelectedDetails(event, request) {
      this.requestData = request;
      this.selectedSpareValue = this.requestData;

      let chFlag = event.target.checked;
      if (chFlag) {
        document.getElementById(request.id + "_DV").style.display = "block";
      } else {
        document.getElementById(request.id + "_DV").style.display = "none";
        if (this.formData.sparePartsSets.length > 0) {
          document.getElementById(request.id + "_DV").value = "";
          let rmSpareCount = this.formData.sparePartsSets.filter(
            spare => spare.id == request.id
          );
          this.formData.sparePartsSets = this.formData.sparePartsSets.filter(
            spare => spare.id != request.id
          );
          this.formData.total_count =
            parseInt(this.formData.total_count) -
            parseInt(rmSpareCount[0].count);
        }
      }
    },
    myPrint(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },
// fnSubmitBankDetails(request){
 
//   this.request.allocate_region = JSON.parse(localStorage.getItem("u_i")).region;
//  console.log("REQUESTED DATA----------->",JSON.stringify(request))
// },
    fnSubmitBankDetails(request) {
            this.formData.allocate_so =JSON.parse(this.formData.allocate_so== ""
          ? null
          : this.formData.allocate_so);
          
      // this.formData.allocate_region =JSON.parse(this.formData.allocate_region == ""
      //     ? null
      //     : this.formData.allocate_region);
      this.formData.allocate_region = JSON.parse(localStorage.getItem("u_i")).region;
          this.formData.allocate_reseller = JSON.parse(this.formData.allocate_reseller =="" ? null : this.formData.allocate_reseller);
       
      console.log(
        "SELCETED fnSubmitBankDetails VALUES------->",
        JSON.stringify(this.formData)
      );
      this.$q.loading.show();
      this.UPDATE_SPARE_PARTS_INVENTORY_DATAS(request)
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
    fnSparePartsTypes() {
      let self = this;
      self.FETCH_SPARE_PARTS_GET_TYPES().then(() => {
        return _.map(self.getsparePartsGetTypes, item => {
          self.sparePartsTypes.push({
            value: item,
            label: item.spare_parts_types
          });
        });
      });
    },
    getAllCounts(event, menu) {
      console.log("GET ALL COUNT EVENTS--------->", event);
      console.log("GET ALL COUNT menu--------->", menu);
      var flag = 0;
      var spCount = 0;
      if (this.formData.sparePartsSets.length > 0) {
        let myArr = this.formData.sparePartsSets;
        for (var j = 0; j < myArr.length; j++) {
          if (myArr[j].id == menu.value.id) {
            this.formData.sparePartsSets[j].count = parseInt(
              event.target.value
            );
            flag = 1;
          }
        }
      }
      if (flag == 0) {
        this.formData.sparePartsSets.push({
          count: parseInt(event.target.value),
          spareParts: {
            id: menu.value.id
          }
        });
      }
      if (this.formData.sparePartsSets.length > 0) {
        this.formData.sparePartsSets.forEach(function(obj) {
          console.log("The objects : ----------------- : ", JSON.stringify(obj));
          spCount = spCount + parseInt(obj.count);
        });
      }

      this.formData.total_count = spCount;
    },

    // Function to get all device types
    fnAjaxGetAllDevicesTypesData() {
      this.FETCH_REGION_BASED_RESELLAR()
        .then(() => {
          let assumeArr = [];
          this.getRegionBasedResellar.map(function(value, index) {
            assumeArr.push({
              label: value.user.name,
              // value: value.user.id
              value: JSON.stringify(value)
            });
          });
          this.resellarOptions = assumeArr;
        })
        .catch(error => {
          this.resellarOptions = [];
        });
    },
    regionBasedSoLoad() {
      let regionArea = JSON.parse(localStorage.getItem("u_i")).region.id;
      console.log("REGION BASED SO DETAILS--------->",regionArea)
      // this.red
      this.FETCH_REGION_BASED_SO(regionArea).then(() => {
        let assumeArr = [];
        this.getRegionBasedSO.map(function(value, index) {
          assumeArr.push({
            label: value.name,
            // value: value.id
            value: JSON.stringify(value)
          });
        });
        this.regionBasedSo = assumeArr;
      });
    },
    // Function to get ll regiosn data
    fnAjaxGetAllRegionsData() {
      this.FETCH_ALL_REGIONS_DATA()
        .then(() => {
          let assumeArr = [];
          this.getAllRegionsData.map(function(value, index) {
            assumeArr.push({
              label: value.regionAreaName,
              // value: value.id
              value: JSON.stringify(value)
            });
          });
          this.regionOptions = assumeArr;
        })
        .catch(error => {
          this.regionOptions = [];
        });
    }
  }
};
</script>
<style scoped>
.activeDeviceTab .q-list-header {
  border-bottom: 1px solid rgb(204, 204, 204);
  background: #61116a;
  color: #fff;
}
</style>
