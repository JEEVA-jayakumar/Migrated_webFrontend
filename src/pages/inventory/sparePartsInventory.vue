<template>
  <q-page>
    <!-- content -->
    <div class="backgroundimage">
      <div class="row bottom-border q-px-md q-py-md items-center">
        <!--START: table title -->
        <div
          class="
            col-6 col-sm-4 col-md-8
            text-h6
            text-weight-regular text-grey-9
          "
        >
        Bijlipay Allocation Type / SO
        </div>

        <div class="col-md-5" align="row">
          <div class="group">
            <q-radio
              v-for="(item, index) in flagOptions"
              :key="index"
              color="grey-9"
              v-model.trim="flag"
              @blur="$v.flag.$touch"
              :error="$v.flag.$error"
              :val="item.value"
              :label="item.label"
            />
            <div class="text-negative q-py-xs group text-caption"
                    v-if="$v.flag.$error"
                    align="right" width="25px"
                  >
                    <div>
                      <q-icon color="negative"  name="warning" />&nbsp;Required Field
                    </div>
                  </div>
          </div>
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
        <!--START: table title -->
        <div v-if="flag == '0' || flag == '1'" class="col-md-4">
          <q-select
            v-model="formData.allocate_region"
            float-label="Select Region"
            radio
            color="grey-9"
            :options="regionOptions"
            @input="regionBasedSoLoad"
          />
        </div>
        <div v-if="flag == '1'" class="col-md-3">
          <q-select
            filter 
            clearable
            v-model="formData.allocate_so"
            float-label="Select SO"
            radio
            color="grey-9"
            :options="regionBasedSo"
          />
        </div>
        <div v-if="flag == '2'" class="col-md-3">
          <q-select
            v-model="formData.allocate_reseller"
            float-label="Select allocate_reseller"
            radio
            color="grey-9"
            :options="resellarOptions"
          />
        </div>
        <div class="col-md-7">
          <p class="caption">Spare Parts Type*</p>
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
          <!--<q-btn
            size="md"
            type="button"
            color="purple-9"
            @click="myPrint('myfrm')"
            >Print</q-btn
          > -->
          <q-btn
          :disable="this.formData.total_count == 0"
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
          <!-- <fieldset disable>
            <legend>Allocation Type / So Count</legend>
            <br />
            Total Count:
            <input
              size="md"
              v-model="formData.total_count"
              :disabled="true"
            /><br />
            <br />
            Battery Count:
            <input v-model="formData.spareCount" :disabled="true" /><br />
            <br />
            Charger Count:
            <input v-model="formData.spareCount" :disabled="true" /><br />
            <br />
            Paper Roll Count:
            <input v-model="formData.spareCount" :disabled="true" /><br />
            <br /><br />
            <legend align="left">
              <p>Sender</p>
              <input v-model="getUserNAme" :disabled="true" align="left" />
              <p>Receiver</p>
              <input
                v-model="formData.so"
                :disabled="true"
                align="right"
              /><br />
            </legend>
          </fieldset> -->
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
        allocate_reseller: "",
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
    // this.FETCH_REGION_BASED_SO();
  },
  unmounted() {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy();
  },
  beforeMount() {
    const name = "SPAPOD";
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    const d = new Date();
    let values = month[d.getMonth()];
    let final = name.concat(values);
    let number = new Date().getTime();
    let finalValue = final.concat(number);
    console.log("FINAL VALUES-------->", finalValue);
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
      "CREATE_SPARE_POD_LIST_INVENTORY"
    ]),
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
     var flag = 0;
     var totalCount = 0;
      var spCount = 0;
      var spCount1 = 0;
      var spCount2 = 0;
      this.requestData = request;
      this.selectedSpareValue = this.requestData;
      let chFlag = event.target.checked
      console.log("CHECK SPARESET ON ACTION - > ", JSON.stringify(this.formData.sparePartsSets));

      if (chFlag) {
        document.getElementById(request.id + "_DV").style.display = "block";
        console.log("event===>>",event);
      } else {
        console.log("event===>>",event);
        console.log("event value===>>", JSON.stringify(event.srcElement.value));
        document.getElementById(request.id + "_DV").style.display = "none";
        if (this.formData.sparePartsSets.length > 0) {
          this.rmSpareCount = this.formData.sparePartsSets.filter(
            spare => spare.spareParts.id == request.id
          );
          var length = this.rmSpareCount.length
          let rmCount = this.rmSpareCount[length-1].spareParts.id 
          var length2 = this.formData.sparePartsSets.length
          if (this.formData.sparePartsSets.length > 0) {
        this.formData.sparePartsSets.forEach(function (obj1) {
          console.log("rm",obj1.spareParts.id);
             if(rmCount == obj1.spareParts.id){
                obj1.count = 0
             }
        });
      if (this.formData.sparePartsSets.length > 0) {
        
        this.formData.sparePartsSets.forEach(function (obj) {
          if (obj.spareParts.id == 8){
            spCount = obj.count
          } else if (obj.spareParts.id == 9) {
            spCount1 = obj.count
          } else if (obj.spareParts.id == 10) {
            spCount2 = obj.count
          } else {
            console.log("NA");
          }
          totalCount = spCount + spCount1 + spCount2
        });
        this.formData.total_count = totalCount;
      }
        this.formData.total_count = totalCount;
      }
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
    fnSubmitBankDetails(request) {
       this.$v.flag.$touch();
      if(this.$v.flag.$error){
     this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill all mandatory fields",
          icon: "info"
        });
      }else{
            this.formData.allocate_so =JSON.parse(this.formData.allocate_so== ""
          ? null
          : this.formData.allocate_so);
      
      this.formData.allocate_region =JSON.parse(this.formData.allocate_region == ""
          ? null
          : this.formData.allocate_region);
          this.formData.allocate_reseller = JSON.parse(this.formData.allocate_reseller =="" ? null : this.formData.allocate_reseller);
       
      console.log(
        "SELCETED fnSubmitBankDetails VALUES------->",
        JSON.stringify(this.formData.sparePartsSets)
      );
      this.$q.loading.show();
      this.CREATE_SPARE_POD_LIST_INVENTORY(request)
        .then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully updated!",
            icon: "thumb_up"
          });
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
      }

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
      var totalCount=0;
       var spCount = 0;
       var spCount1 = 0;
       var spCount2 = 0;
       console.log("CHECK SPARE ARRAY1 - > ",JSON.stringify(this.formData.sparePartsSets))

      if (this.formData.sparePartsSets.length > 0) {
        let myArr = this.formData.sparePartsSets;
        console.log("CHECK SPARE ARRAY2 - > ",JSON.stringify(this.formData.sparePartsSets))
        console.log("CHECK myArr LOOP1 - > ",JSON.stringify(myArr))
          console.log("CHECK menu LOOP1 - > ",JSON.stringify(menu.value))
        for (var j = 0; j < myArr.length; j++) {
         
        if (myArr[j].spareParts.id == menu.value.id) {
            this.formData.sparePartsSets[j].count = parseInt(
              event.target.value
            );
            flag = 1;
          }
        }
      }
      console.log("CHECK SPARE ARRAY3 - > ",JSON.stringify(this.formData.sparePartsSets))

      if (flag == 0) {
        this.formData.sparePartsSets.push({
          count: parseInt(event.target.value),
          spareParts: {
            id: menu.value.id
          }
        });
      }
       if (this.formData.sparePartsSets.length > 0) {
        console.log("CHECK SPARE ARRAY4 - > ",JSON.stringify(this.formData.sparePartsSets))
        this.formData.sparePartsSets.forEach(function(obj) {
          if(obj.spareParts.id ==8){
            spCount= obj.count
           }else if(obj.spareParts.id ==9){
            spCount1= obj.count
           }else if(obj.spareParts.id ==10){
            spCount2= obj.count
           }else{
            console.log("NA");
           }
           console.log("s1",spCount);
              console.log("s3",spCount1);
              console.log("s5",spCount2);
               totalCount= spCount+spCount1+spCount2
              console.log("TOTAL===>",totalCount)
        });
      }

      this.formData.total_count = totalCount;
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
    regionBasedSoLoad(value) {
      let regionArea = JSON.parse(value);
      console.log("REGION BASED SO DETAILS--------->",regionArea)
      // this.red
      this.FETCH_REGION_BASED_SO(regionArea.id).then(() => {
        let assumeArr = [];
        this.getRegionBasedSO.map(function(value, index) {
          assumeArr.push({
            label: value.name + " | " + value.employeeID+ " | " + value.email,
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
