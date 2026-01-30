<template>
  <q-page>
    <!-- content -->
    <div>
      <div class="row bottom-border q-px-md q-py-md items-center">
        <div class="col-6 col-md-6 q-title text-weight-regular text-grey-9"></div>
      </div>
      <div class="row bottom-border group q-px-md q-py-md items-center text-weight-regular text-grey-9">
        <!--START: table title   :disable="disableDeviceTypeSelection" -->
        <div class="col-md-4">
          <q-select v-model="formData.leadSource" float-label="Select LeadSource" radio color="grey-9"
            @input="filterByLeadSource(formData)" :options="dropDown.leadSourceOptions" />
        </div>
        <div class="col-md-12" align="right">
          <q-btn no-caps class="text-weight-regular" @click="fnaddprefix()" label="Add New" color="purple-9"
            size="md" />
        </div>

      </div>



      <!--START: table lead validation -->
      <q-table row-key="name" :filter="filter" :data="tableData" class="q-py-none" :columns="columns"
        title="Lead Validation" table-class="customTableClass" :pagination.sync="paginationControl"
        @request="ajaxLoadAllLeadInfo">
        <!--START: table body modification  device-->
        <q-td slot="body-cell-createdAt" slot-scope="props" :props="props">{{
        props.row.createdAt | moment("Do MMM Y")
        }}</q-td>
        <q-td slot="body-cell-updatedAt" slot-scope="props" :props="props">{{
        props.row.updatedAt | moment("Do MMM Y")
        }}</q-td>
        <!-- <q-td slot="body-cell-action" slot-scope="props" :props="props">
          <div class="row no-wrap no-padding">
            <div v-if="props.row.lastBaseMid == null && props.row.lastBaseTid == null">
              <q-btn dense no-caps no-wrap label="active" icon="far fa-plus-square" size="md"
                @click="fnShowEditRegion(props.row)" flat class="text-light-blue">
              </q-btn>
            </div>

          </div>
        </q-td> -->
        <!-- END: table body modification -->
        <template slot="top" class="bottom-border">
          <!--START: table filter,search -->
          <div class="col-md-5">
            <q-search clearable color="grey-9" v-model="filter" placeholder="Type.." float-label="Search Lead Source..."
              class="q-mr-lg q-py-sm" />
          </div>
          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->
      <!--START: Show create prefix -->
      <showCreatePrefix v-if="propShowAddPrefix" :propShowAddPrefix="propShowAddPrefix"
        @emitfnshowaddPrefix="fnaddprefix">
      </showCreatePrefix>
      <!--END: Show create prefix -->
      <!--START: Open showPDOmodal model -->
      <showPDOmodal v-if="showPDOmodal" :propshowPDOmodal="showPDOmodal" :propAllScannedItemArr="formData"
        @closeModel="fnAllocateDeviceToRegion"></showPDOmodal>
      <!--END: Open showPDOmodal model -->

      <!--START: Show edit Region -->
      <inventoryWithRegion v-if="propShowEditRegion" :propShowEditRegion="propShowEditRegion"
        :propRowDetails="propRowDetails" @emitfnshowEditRegion="fnShowEditRegion"></inventoryWithRegion>
      <!--END: Show edit Region -->

    </div>
  </q-page>
</template>

<script>
import Vue from "vue";
import VueBarcodeScanner from "vue-barcode-scanner";
import downloadExcel from "vue-json-excel";
Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";
import showPDOmodal from "../../components/inventory/showFaultymodal.vue";
import inventoryWithRegion from "../../components/inventory/inventoryWithRegion.vue";
import showCreatePrefix from "./AddPrefix.vue";

export default {
  name: "allocateDevice",
  components: {
    showPDOmodal,
    inventoryWithRegion,
    downloadExcel,
    showCreatePrefix

  },
  data() {
    return {
      disableDeviceTypeSelection: true,
      propShowAddPrefix: false,
      json_fields: {
        SerialNumber: "serialNumber",
        PodNumber: "podNumber",
        DeviceType: "device.deviceName",
        Region: "region.regionAreaName"

      },
      disableSubmitButton: true,
      toggleFaultyBulkUpload: false,
      propShowEditRegion: false,
      filter: "",
      showPDOmodal: false,
      regionOptions: [],
      deviceOptions: [],
      regionalItems: [],
      columns: [
        {
          name: "sourceName",
          required: true,
          label: "Lead Source",
          align: "left",
          field: row => {
            return row.leadSource.sourceName
          },
          sortable: false
        },
        {
          name: "prefix",
          required: true,
          label: "Prefix",
          align: "left",
          field: "prefix",
          sortable: false
        },
        {
          name: "baseTidLength",
          required: true,
          label: "Base Tid Length",
          align: 'center',
          field: "baseTidLength",
          sortable: false
        },
        {
          name: "baseMidLength",
          required: true,
          label: "Base Mid Length",
          align: 'center',
          field: "baseMidLength",
          sortable: false
        },
        {
          name: "nextBaseTid",
          required: true,
          label: "Next Base Tid",
          align: 'center',
          field: row => {
            return row.nextBaseTid == null ? "NA" : row.nextBaseTid
          },
          sortable: false
        },
        {
          name: "nextBaseMid",
          required: true,
          label: "Next Base Mid",
          align: 'center',
          field: row => {
            return row.nextBaseMid == null ? "NA" : row.nextBaseMid
          },
          sortable: false
        },
        {
          name: "minBaseTid",
          required: true,
          label: "Min Base Tid",
          align: 'center',
          field: "minBaseTid",
          sortable: false
        },
        {
          name: "maxBaseTid",
          required: true,
          label: "Max Base Tid",
          align: 'center',
          field: "maxBaseTid",
          sortable: false
        },
        {
          name: "minBaseMid",
          required: true,
          label: "Min Base Mid",
          align: 'center',
          field: "minBaseMid",
          sortable: false
        },
        {
          name: "maxBaseMid",
          required: true,
          label: "Max Base Mid",
          align: 'center',
          field: "maxBaseMid",
          sortable: false
        },
        {
          name: "createdAt",
          required: true,
          label: "CreatedAt",
          align: 'center',
          field: "createdAt",
          sortable: false
        },
        {
          name: "updatedAt",
          required: true,
          label: "UpdatedAt",
          align: 'center',
          field: "updatedAt",
          sortable: false
        },
        {
          name: "status",
          required: true,
          label: "Status",
          align: 'center',
          field: "active",
          sortable: false
        },

        // {
        //   name: 'device',
        //   required: true,
        //   label: 'Device Type',
        //   align: 'center',
        //   field: row => {
        //     row.device.deviceName;
        //   },
        //   sortable: false
        // },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false,
        },


      ],
      tableData: [],
      formData: {
        leadSource: "",
        // scannedItems: []
      },
      dropDown: {
        leadSourceOptions: [],
      },
      paginationControl: {
        rowsPerPage: 10
      },
      tableAjaxLoading: false
    };
  },

  computed: {
    // ...mapGetters("InventoryScanAddDevice", ["getAddDeviceScannedItems"]),
    ...mapGetters("InventoryCentral", [
      "getAllInventoryDevicesTypesData",
      "getAllRegionsData",
      "getInvenotryAsFaultyData"
    ]),
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
    ...mapGetters("inventoryWithRegion", ["getinventoryWithRegion"]),
    ...mapGetters("Prefix", ["getAllPrefixDetails"])
    // disabledButton() {
    //   return _.find(this.formData.scannedItems, function(oo) {
    //     return oo.deviceSerialNumbers.length > 0 ? true : false;
    //   }) == undefined
    //     ? true
    //     : false;
    // }
  },
  // mounted() {
  //     this.ajaxloadingData();
  // },
  created() {
    // this.fnAjaxGetAllDevicesTypesData();
    // this.fnAjaxGetAllRegionsData();
    this.ajaxLoadDataForDeviceTypeTable();
    this.ajaxLoadAllLeadInfo();
  },
  destroyed() {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy();
  },

  methods: {
    // ...mapActions("SatDeviceTrackerScanner", ["REACTIVE_SCANNED_DEVICE_DATA"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_REGIONS_DATA",
      "FEED_FAULTY_FINAL_SUBMIT"
    ]),
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("VerifyDevice", [
      "DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID"
    ]),
    ...mapActions("inventoryWithRegion", ["FETCH_INVENTORY_WITH_REGION_DATAS"]),
    ...mapActions("Prefix", ["GET_PREFIX_DETAILS"]),


    ajaxLoadAllLeadInfo() {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.GET_PREFIX_DETAILS()
        .then((res) => {
          console.log("TABLE getAllPrefixDetails----------->", JSON.stringify(this.getAllPrefixDetails))
          this.tableData = this.getAllPrefixDetails;
          console.log("TABLE DATA----------->", JSON.stringify(this.tableData))
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    fnaddprefix(token) {
      this.propShowAddPrefix = !this.propShowAddPrefix;
      if (token == "refresh") {
        this.ajaxLoadAllLeadInfo();
      }
    },

    fnShowEditRegion(rowDetails) {
      this.propShowEditRegion = !this.propShowEditRegion;
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    filterByLeadSource(request) {
      console.log("filterByLeadSource---------------------->" + JSON.stringify(request.leadSource));
      this.tableData = this.getAllPrefixDetails.filter(service => service.leadSource.id == request.leadSource)
      this.$q.loading.hide();

    },

    // filterInventoryByRegion(value) {
    //   // console.log("Table Datas value---------------------->" + JSON.stringify(value));
    //   // let params = {
    //   //   regionId: value.id
    //   // };
    //   this.regionalItems = [];
    //   this.$q.loading.show({
    //     delay: 0, // ms
    //     spinnerColor: "purple-9",
    //     message: "Fetching data .."
    //   });
    //   this.FETCH_INVENTORY_WITH_REGION_DATAS(params)
    //     .then(() => {

    //       this.regionalItems = this.getinventoryWithRegion;
    //       // console.log("Table Datas ---------------------->" + JSON.stringify(this.regionalItems));

    //       this.$q.loading.hide();
    //     })
    //     .catch(() => {
    //       this.$q.loading.hide();
    //     });

    // },
    ajaxLoadDataForDeviceTypeTable() {
      let self = this;
      self
        .LEAD_SOURCE_ACTIVE_LIST()
        .then(() => {
          return _.map(self.getActiveLeadSource, item => {

            self.dropDown.leadSourceOptions.push({
              value: item.id,
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
      // .then(() => {
      //   self.GET_ALL_VAS_DETAILS().then(() => {
      //     return _.map(self.getAllVasDetails, item => {
      //       console.log("GET_ALL_VAS_DETAILS, item: --->",JSON.stringify(item))
      //       self.dropDown.vasOptions.push({
      //         value: item,
      //         label: item.name
      //       });
      //     });
      //   });
      // })
    },


    // fnAjaxGetAllRegionsData() {
    //   this.FETCH_ALL_REGIONS_DATA()
    //     .then(() => {
    //       let assumeArr = [];
    //       this.getAllRegionsData.map(function (value, index) {
    //         assumeArr.push({
    //           label: value.regionAreaName,
    //           value: value
    //         });
    //       });
    //       this.regionOptions = assumeArr;
    //     })
    //     .catch(error => {
    //       this.regionOptions = [];
    //     });
    // },

    // // Function to get all device types
    // fnAjaxGetAllDevicesTypesData() {
    //   this.FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA()
    //     .then(() => {
    //       let assumeArr = [];
    //       this.getAllInventoryDevicesTypesData.map(function (value, index) {
    //         assumeArr.push({
    //           label: value.deviceName,
    //           value: value.id
    //         });
    //       });
    //       this.deviceOptions = assumeArr;
    //     })
    //     .catch(error => {
    //       this.deviceOptions = [];
    //     });
    // },

  }
};
</script>