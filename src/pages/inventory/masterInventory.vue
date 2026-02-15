<template>
  <q-page>
    <!-- content -->
     <div>
      <!--STARTv-model: table title -->
        <div class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">Master Inventory- Allocated to merchants </div>
      <!--END: table title -->

      <!--START: table lead validation -->
      <q-table
        table-class="customTableClass"
        class="q-py-none"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        row-key="name">
        <template v-slot:top="props" class="bottom-border">
          <!--START: table filter,search -->
          <div class="col">
            <q-input
            clearable
            color="grey-9"
            v-model="filter"
            placeholder="Type.."
            float-label= "Search by serial no, tid, merchant name, device type"
            class="q-mr-lg q-py-sm"
            />
          </div>
          
          <div class="col-4">
            <q-select
            clearable
            @clear="filterMasterTrackerClear()"
            @input="filterMasterTrackerByRegionId"
            v-model="regionFilter"
            color="grey-9"
            :options="regionOptions"
            placeholder="Select"
            float-label= "Filter By"
            />
          </div>
          <div class="col-auto">
            <q-btn 
            @click="downloadMasterInventory()"
            outline  
            color="grey-9" 
            label="Download as Excel"
            class="q-mr-lg q-py-sm float-right"
            size="md"
            />
          </div>

          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->

      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
          <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
      <!--END >>  Show Ajax Spinner -->
    </div>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

export default {
  name: "inventoryMerchant",
  data() {
    return {
      regionFilter: "",
      filter: "",
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsPerPage: 10,
      },
      columns: [
        {
          name: "device_serial_number",
          required: true,
          label: "Device Serial Number",
          align: "left",
          field: row => {
            return row.regionalInventory == null
              ? "NA"
              : row.regionalInventory.serialNumber;
          },
          sortable: true,
        },
        {
          name: "device",
          required: true,
          label: "Device type",
          align: "left",
          field: row => {
            return row.leadInformation.device.deviceName;
          },
          sortable: false,
        },
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: "tid",
          sortable: true,
        },
        {
          name: "mid",
          required: true,
          label: "TID",
          align: "left",
          field: "mid",
          sortable: true,
        },
        {
          name: "leadInformation",
          required: true,
          label: "ME Name",
          align: "left",
          field: row => {
            return row.leadInformation.leadName;
          },
          sortable: false,
        },
        {
          name: "address",
          required: true,
          label: "Address",
          align: "left",
          field: row => {
            return row.leadInformation.leadAddress;
          },
          sortable: false,
        },
      ],
      loading: true,
      tableData: [],
      regionOptions: [],
    };
  },
  computed: {
    ...mapGetters("InventoryCentral", ["getMasterInventoryData"]),
    ...mapGetters("SuperAdminUsers", ["getAllRegionsData"]),
  },

  created() {
    this.getAllInventoryData();
  },

  methods: {
    ...mapActions("InventoryCentral", [
      "FETCH_MASTER_INVENTORY_DATA",
      "REPORT_MASTER_INVENTORY",
    ]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA"]),

    getAllInventoryData() {
      this.FETCH_MASTER_INVENTORY_DATA().then(() => {
        this.tableData = this.getMasterInventoryData;
        this.FETCH_ALL_REGIONS_DATA().then(() => {
          this.regionOptions = this.getAllRegionsData;
        });
      });
    },
    filterMasterTrackerByRegionId() {
      this.FETCH_MASTER_INVENTORY_DATA(this.regionFilter).then(() => {
        this.tableData = this.getMasterInventoryData;
        this.FETCH_ALL_REGIONS_DATA().then(() => {
          this.regionOptions = this.getAllRegionsData;
        });
      });
    },
    filterMasterTrackerClear() {
      this.regionFilter = "";
    },
    downloadMasterInventory() {
      this.$q.loading.show({
        delay: 100, // ms
      });
      this.REPORT_MASTER_INVENTORY(this.regionFilter)
        .then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Success, file has been downloaded",
            icon: "check",
          });
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again",
            icon: "thumb_down",
          });
        });
    },
  },
};
</script>

<style>
</style>
