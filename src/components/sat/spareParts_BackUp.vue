<template>
  <q-page>
    <!-- <q-pull-to-refresh :handler="PullToRefresh" inline></q-pull-to-refresh> -->
    <!--START: table title -->
    <div>
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <!-- content -->
      <q-card class="group q-pa-md">
        <div class="row items-center gutter-y-sm">
          <div
            class="col-md-3 col-sm-6 col-xs-6 text-grey-7 text-weight-medium"
            align="left"
          >
            <span class="q-display-2">{{
              formData.marsDeviceIdsCooked.length
            }}</span
            >/ selected
          </div>
          <div class="col-md-3 col-sm-6 col-xs-6">
            <q-select
              filter
              clearable
              v-model="formData.assignTo"
              separator
              color="grey-9"
              :options="assignToOptions"
              placeholder="Assign To"
            />
          </div>
          <div class="col-md-3 col-sm-6 col-xs-6" align="right">
            <q-btn
              no-caps
              :disabled="
                formData.marsDeviceIdsCooked.length == 0 ? true : false    
              "
              label="Assign"
              class="common-dark-blue"
              @click="assignImplementationUser"
            />
          </div>
        </div>
      </q-card>
      <!--START: table lead validation  -->
      <q-table
        table-class="customTableClass"
        :data="tableData"
        :columns="columns"
        :filter="filter"
        selection="multiple"
        :selected.sync="formData.marsDeviceIdsCooked"
        :pagination.sync="paginationControl"
        row-key="id"
        :loading="toggleAjaxLoadFilter"
        :rows-per-page-options="[5, 10, 15, 20]"
        color="dark"
        @request="ajaxLoadAllLeadInfo"
      >
        <q-tr slot="top-row" slot-scope="props">
          <q-th v-for="col in props.columns" :key="col.name" :props="props">{{
            col.label
          }}</q-th>
        </q-tr>
        <!--END: table header -->
        <q-td slot="body-cell-mid" slot-scope="props" :props="props">
          <span class="label text-primary"># {{ props.row.mid }}</span>
        </q-td>
        <q-td slot="body-cell-regionAreaName" slot-scope="props" :props="props">{{
          props.row.allocate_region == null
            ? "NA"
            : props.row.allocate_region.regionAreaName
        }}</q-td>
         <q-td slot="body-cell-name" slot-scope="props" :props="props">{{
          props.row.created_by == null
            ? "NA"
            : props.row.created_by.name
        }}</q-td>
        <template slot="top" class="bottom-border">
          <!--START: table filter,search,excel download -->
          <div class="col-5">
            <q-search
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Search Using MID"
              class="q-mr-lg q-py-sm"
            />
          </div>
        </template>
      </q-table>
      <!--END: table lead validation -->
      <showMerchantTransactionLevelDetails
        v-if="valueToggleMerchantTransaction"
        :valueToggleMerchantTransaction="valueToggleMerchantTransaction"
        @revertRowClick="rowClick"
      ></showMerchantTransactionLevelDetails>
      <!--START >>  Show Ajax Spinner -->
      <div
        v-if="toggleAjaxLoadFilter || toggleAjaxLoadFilter1"
        class="fullscreen spinner-overlay"
      >
        <q-spinner-bars
          class="absolute-center"
          style="color:#61116a"
          :size="35"
        />
      </div>
      <!--END >>  Show Ajax Spinner -->
      <!-- </div> -->
    </div>
    <!--END: table title -->
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import downloadExcel from "vue-json-excel";
import showMerchantTransactionLevelDetails from "../../components/sat/showMerchantTransactionLevelDetails.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "getadditionalTid",

  components: {
    showMerchantTransactionLevelDetails,
    generalLeadInformation
  },

  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      // paginationControl: {
      //   rowsPerPage: 10
      // },
       assignToOptions: [],
       formData: {
        marsDeviceIdsCooked: [],
        triggerWelcomeMail: false,
        assignTo: "",
      },
      toggleAjaxLoadFilter: false,
      toggleAjaxLoadFilter1: false,

      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "updated_date",
        descending: false,
        rowsPerPage: 10
      },

      tableData: [],
      valueToggleMerchantTransaction: false,
      filter: "",
      filter1: "",
      //table information
      columns: [
        {
          name: "pod_number",
          required: true,
          label: "Pod Number",
          align: "left",
          field: "pod_number",
          sortable: false
        },
        {
          name: 'regionAreaName',
          required: true,
          label: 'RegionAreaName',
          align: 'left',
          field: row => {
            row.allocate_region.regionAreaName;
          },
          sortable: false
        },
        {
          name: 'name',
          required: true,
          label: 'Created By',
          align: 'left',
          field: row => {
            row.created_by.name;
          },
          sortable: false
        },
         {
          name: "total_count",
          required: true,
          label: "Total Count",
          align: "left",
          field: "total_count",
          sortable: false
        },
         {
          name: "updated_date",
          required: true,
          label: "Updated Date",
          align: "left",
          field: "updated_date",
          sortable: true
        },
      ],
      loading: true,
      filter_values: ""
    };
  },
  computed: {
    ...mapGetters("additionalTid", ["getadditionalTid"]),
        ...mapGetters("ImplementationExecutive", [
      "getImplementationExecutiveList",
    ]),
     ...mapGetters("DeviceReplacement", [
      "getDeviceReplacementQueueAssignedList",
      "getDeviceReplacementQueueUnassignedList",
    ]),
    ...mapGetters("sparePartsRegionalInventoryPodDetails", ["getsparePartsRegionalInventoryDetails"]),
    // ...mapGetters('lostOrStolenDatas', ['getLostOrStolenDatas'])
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  methods: {
    ...mapActions("additionalTid", [
      "FETCH_ADDITIONAL_TID_DATAS",
      "ADDITIONAL_TID_VERIFY_DATA"
    ]),
     ...mapActions("ImplementationExecutive", ["IMPLEMENTATION_EXECUTIVE_LIST"]),
      ...mapActions("DeviceReplacement", [
      "DEVICE_REPLACEMENT_QUEUE_ASSIGNED_LIST",
      "DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST",
      "DEVICE_REPLACEMENT_QUEUE_SUBMIT",
    ]),
    ...mapActions("sparePartsRegionalInventory", ["FETCH_ALL_SPARE_PARTS_REGIONAL_INVENTORY_DATAS"]),
    ...mapActions("sparePartsRegionalInventoryPodDetails", ["FETCH_SPARE_PARTS_REGIONAL_INVENTORY_DETAILS"]),
    // ...mapActions('lostOrStolenDatas', ['FETCH_ALL_LOST_DEVICES_DATAS']),
    //  ...mapActions('InventoryCentral',['DOWNLOAD_lOST_OR_STOLEN_DATAS']),
    //Load all short lead info while page loading
    ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.FETCH_SPARE_PARTS_REGIONAL_INVENTORY_DETAILS()
        .then(response => {
          this.toggleAjaxLoadFilter = false;
        })
        .catch(error => {
          this.toggleAjaxLoadFilter = false;
        });
    },
      // Function to assign implementation manager in implementation queue
    assignImplementationUser(request) {
      let self = this;
      if (self.formData.marsDeviceIdsCooked.length == 0) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select atleast one item to assign",
          icon: "thumb_down",
        });
      } else if (self.formData.assignTo == "") {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Implementation officer cannot be empty!",
          icon: "thumb_down",
        });
      } else {
        let marsDeviceIdsCooked = [];
        self.formData.marsDeviceIdsCooked.map(function (value) {
          marsDeviceIdsCooked.push(value.id);
        });
         delete self.formData.marsDeviceIdsCooked.__index;
        let postValues = {
          // action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
          // marsDeviceIds: marsDeviceIdsCooked,
          

          request: self.formData.marsDeviceIdsCooked,
          // triggerWelcomeMail: self.formData.triggerWelcomeMail,
          regionId:JSON.parse(localStorage.getItem("u_i")).region.id,
          userId: self.formData.assignTo,
        };
        // delete postValues.request.__index;
        self
          .FETCH_ALL_SPARE_PARTS_REGIONAL_INVENTORY_DATAS(postValues)
          .then(() => {
            // this.ajaxLoadAllLeadInfo({
            //   pagination: this.paginationControl,
            //   filter: this.filterSearch,
            // });
            // self.formData.marsDeviceIdsCooked = [];
            // self.formData.assignTo = "";
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully assigned!",
              icon: "thumb_up",
            });
          })
          .catch(() => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down",
            });
          });
      }
    },
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      let param= {
        userId: JSON.parse(localStorage.getItem("u_i")).region.id
      };
      this.FETCH_SPARE_PARTS_REGIONAL_INVENTORY_DETAILS({ pagination, filter, param})
        .then(res => {

           this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
                let assumeArr = [];
                this.getImplementationExecutiveList.map(function(value) {
                  assumeArr.push({ label: value.name, value: value.id });
                });
                this.assignToOptions = assumeArr;
            });
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getsparePartsRegionalInventoryDetails.totalElements;
          this.paginationControl.page = this.getsparePartsRegionalInventoryDetails.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getsparePartsRegionalInventoryDetails.content;
          if (this.getsparePartsRegionalInventoryDetails.sort != null) {
            this.paginationControl.sortBy = this.getsparePartsRegionalInventoryDetails.sort[0].property;
            this.paginationControl.descending = this.getsparePartsRegionalInventoryDetails.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
         
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    }
  }
};
</script>

<style></style>
