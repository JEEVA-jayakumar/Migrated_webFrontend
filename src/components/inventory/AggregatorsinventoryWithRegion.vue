<template>
    <div>
        <q-dialog minimized no-backdrop-dismiss class="customModalOverlay" v-model="toggleModel"
            @hide="emitfnshowAggregatorsEditRegion()" @escape-key="emitfnshowAggregatorsEditRegion()"
            :content-css="{ padding: '30px', minWidth: '40vw' }">
            <form>
                <div class="column group">
                    <div class="col-md-12">
                        <div class="text-h6 text-weight-regular">Edit Pod And Region</div>
                    </div>
                    <!-- @click="clickFields($event)"-->
                    <div class="col-md-12">
                        <q-input disable @keyup.enter="submitPincode(formData)" v-model="formData.podNumber"
                            :error="$v.formData.podNumber.$error" class="text-weight-regular text-grey-8" color="grey-9"
                            float-label="Enter PodNumber" placeholder="Enter PodNumber" />
                    </div>
                    <!-- placeholder="Select DeviceName" :options="deviceOptions"-->
                    <div class="col-md-12">
                        <q-select @keyup.enter="submitPincode(formData)"  v-model="formData.device"
                            :error="$v.formData.device.$error" class="text-weight-regular text-grey-8" color="grey-9"
                            float-label="Enter DeviceName" :options="deviceOptions" />
                    </div>
                    <div class="col-md-12">
                        <q-select @keyup.enter="submitPincode(formData)" v-model="formData.region"
                            :error="$v.formData.region.$error" class="text-weight-regular text-grey-8" color="grey-9"
                            float-label="Select Region" placeholder="Select Region " :options="regionOptions" />
                    </div>

                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8"
                            @click="emitfnshowAggregatorsEditRegion()">Cancel</q-btn>
                        <q-btn align="right" @click="submitPodAndRegions(formData)" color="purple-9">Save</q-btn>
                    </div>
                </div>
            </form>
        </q-dialog>
    </div>
</template>

<script>
import { required, maxLength, minLength } from "@vuelidate/validators";

import { mapGetters, mapActions } from "vuex";
export default {
    props: ["propShowEditRegion", "propRowDetails"],
    data() {
        return {
            toggleModel: this.propShowEditRegion,
            deviceOptions: [],
            regionOptions: [],
            propRowDatas: {},
            formData: {
                podNumber: this.propRowDetails.podNumber,
                device: JSON.stringify(this.propRowDetails.aggregatorDevice),
                region: JSON.stringify(this.propRowDetails.region),
            },
        };
    },
    validations: {
        formData: {
            podNumber: {
                required
            },
            device: {
                required
            },
            region: {
                required
            }
        }
    },
    computed: {
        ...mapGetters("InventoryCentral", [
            "getAllInventoryDevicesTypesData",
            "getAllRegionsData",
            "getInvenotryAsFaultyData"
        ]),
        ...mapGetters("superAdminAggregatorsDevice", ["getCreatedActiveDeviceList"]),
        ...mapGetters("inventoryWithRegion", ["getinventoryWithRegion"]),
        // PodDisabled($event){
        // },
        //        PodDisabled: function () {

        // //   return (this.formData.mid != 0 || this.formData.tid !=0 || this.formData.mname !=0 || this.formData.fromDate !=0 || this.formData.toDate !=0) ;
        // },
    },
    created() {
        this.fnAjaxGetAllDevicesTypesData(this.propRowDetails.aggregatorDevice.aggregator.id);
        this.fnAjaxGetAllRegionsData();
        this.formData.device = JSON.stringify(this.propRowDetails.aggregatorDevice);
        this.formData.region = JSON.stringify(this.propRowDetails.region);
    },
    beforeMount(){

        // this.propRowDatas = this.propRowDetails;
    },

    methods: {
        ...mapActions("pincodes", ["FETCH_ALL_PINCODES", "EDIT_NEW_PINCODE"]),
        ...mapActions("inventoryWithRegion", ["EDIT_INVENTORY_WITH_REGION_DETAILS", "EDIT_AGGREGATORS_INVENTORY_WITH_REGION_DETAILS"]),
        ...mapActions("InventoryCentral", ["FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA", "FETCH_ALL_REGIONS_DATA", "FEED_FAULTY_FINAL_SUBMIT"]),
        ...mapActions("inventoryWithRegion", ["FETCH_INVENTORY_WITH_REGION_DATAS", "FETCH_AGGREGATORS_INVENTORY_WITH_REGION_DATAS"]),
        ...mapActions("superAdminAggregatorsDevice", ["GET_ACTIVE_CREATED_DEVICE_LIST"]),

        submitPodAndRegions(request) {
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: "purple-9",
                message: "Fetching data .."
            });
            const finalRequest = { propRowDatas: this.propRowDetails };
            finalRequest.propRowDatas.podNumber = request.podNumber;
            finalRequest.propRowDatas.device = request.deviceName;
            finalRequest.propRowDatas.region = JSON.parse(request.region);

            let params = {
                request: finalRequest.propRowDatas
            };
            
            this.EDIT_AGGREGATORS_INVENTORY_WITH_REGION_DETAILS(params)
                .then((response) => {
                    this.$q.loading.show();
                    this.$q.loading.hide();
                    this.$q.notify({
                        color: "positive",
                        position: "bottom",
                        message: "data",
                        icon: "thumb_up",
                        message: response.data.message,
                    });
                    this.emitfnshowAggregatorsEditRegion();
                    this.FETCH_AGGREGATORS_INVENTORY_WITH_REGION_DATAS();

                })
                .catch((error) => {
                    this.$q.notify({
                        color: "negative",
                        position: "bottom",
                        icon: "thumb_down",
                        message: error.data.message,
                    });
                    this.$q.loading.hide();
                });


        },

        emitfnshowAggregatorsEditRegion() {
            this.$emit("emitfnshowAggregatorsEditRegion");
        },
        clickFields(event) {
            let chFlag = event.target.value;
            //  this.chFlag == null ? disable: none;
            //   if (chFlag) {
            //     document.getElementsByTagName(disabled).style.display = "none"
            //     // .getElementById().style.display = "block";
            //   } else {
            //     document.getElementsByTagName(disabled).style.display = "block"  

            //   }
        },
        fnAjaxGetAllDevicesTypesData(val) {
            let cookedArr1 = [];
            this.GET_ACTIVE_CREATED_DEVICE_LIST(val)
                .then(() => {
                    // return _.map(this.getCreatedActiveDeviceList, (item) => {
                    //     cookedArr1.push({
                    //         value: item.id,
                    //         label: item.deviceName
                    //     });
                    //     this.deviceOptions = cookedArr1;
                    // })
                    this.getCreatedActiveDeviceList.map(function (value, index) {
                        cookedArr1.push({
                            label: value.deviceName,
                            value: JSON.stringify(value)
                        });
                    });
                    this.deviceOptions = cookedArr1;
                })
                .catch(error => {
                    this.deviceOptions = [];
                });
        },
        fnAjaxGetAllRegionsData() {
            this.FETCH_ALL_REGIONS_DATA()
                .then(() => {
                    let assumeArr = [];
                    this.getAllRegionsData.map(function (value, index) {
                        assumeArr.push({
                            label: value.regionAreaName,
                            value: JSON.stringify(value)
                        });
                    });
                    this.regionOptions = assumeArr;
                })
                .catch(error => {
                    this.regionOptions = [];
                });
        },
        //Permission creation final submit

    }
};
</script>
