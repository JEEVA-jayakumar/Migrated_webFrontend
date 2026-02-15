<template>
  <q-page>
    <div>
      <!--STARTv-model: table title -->
      <div class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular text-grey-9"></div>
      <!--END: table title -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation v-if="propToggleLeadInformation" :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation" @closeLeadInformation="toggleLeadInformation" />
      <!-- content -->
      <!--START: table lead validation -->
      <q-table table-class="customTableClass" :columns="columns" :rows="tableData" color="grey-9" :filter="filterSearch"
        :pagination="paginationControl" :rows-per-page-options="[5, 10, 15, 20, 25]"
        :loading="toggleAjaxLoadFilter" @request="ajaxLoadAllLeadInfo">
        <q-td v-slot:body-cell-updated_date="props" :props="props">{{
          props.row.updated_date == null
            ? "NA"
            : props.row.updated_date | moment("Do MMM Y")
        }}</q-td>
        <q-td v-slot:body-cell-created_date="props" :props="props">{{
          props.row.created_date == null
            ? "NA"
            : props.row.created_date | moment("Do MMM Y")
        }}</q-td>
        <q-td v-slot:body-cell-regionAreaName="props" :props="props">{{
          props.row.allocate_region == null
            ? "NA"
            : props.row.allocate_region.regionAreaName
        }}</q-td>
        <q-td v-slot:body-cell-name="props" :props="props">{{
          props.row.allocate_so == null ? "NA" : props.row.allocate_so.name+" | "+props.row.allocate_so.employeeID
        }}</q-td>
        <q-td v-slot:body-cell-status="props" :props="props">
          <span class="label text-positive" v-if="props.row.status == 1">Created</span>
          <span class="label text-primary" v-else-if="props.row.status == 2">Assigned to R.I</span>
          <span class="label text-orange" v-else-if="props.row.status == 3">Approved By R.I</span>
          <span class="label text-orange" v-else-if="props.row.status == 4">Assigned To SO</span>
          <span class="label text-orange" v-else-if="props.row.status == 5">
            Approved By So</span>
          <span class="label text-orange" v-else-if="props.row.status == 6">
            Rejected</span>

          <span class="label text-negative" v-else>NA</span>
        </q-td>

        <q-td v-slot:body-cell-action="props" :props="props">
          <q-btn highlight push class="q-mx-sm" color="positive" size="sm"
            :disable="props.row.status == 1 || props.row.status == 3 || props.row.status == 5 || props.row.status == 6 && props.row.owner == 2 || props.row.status == undefined"
            @click="updatePodDetails(props.row)">Update</q-btn>
        </q-td>
        <template slot="top">
          <!--START: table filter,search -->
          <div class="col-md-5">
            <q-input clearable color="grey-9" v-model="filterSearch" placeholder="Type.."
              float-label="Search Using POD Number" class="q-mr-lg q-py-sm" />
          </div>
          <!--<div class="col-md-5">
           
            <q-btn 
            square 
            outline 
            color="purple-9" 
            label="Add New Spare" 
            class="q-mr-lg q-py-sm float-right" 
            size="md" 
            @click="downloadLostOrStolenList()" />
           
          </div> -->
          <div class="col-md-5">
            <q-btn no-caps class="text-weight-regular"
              @click="$router.push('/inventory/master/PhonepesparePartsInventory')" label="Add Spare" color="purple-9"
              size="md" />
          </div>
          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--START >>  Download Reports -->
      <!--<DownloadLostOrStolen
         v-if="propLostOrStolenList" 
        :propLostOrStolenList="propLostOrStolenList" 
        @emitfnshowLostOrStolenList="downloadLostOrStolenList"
     ></DownloadLostOrStolen> -->
      <!--END:  Download Reports-->
      <!--END: table lead validation -->
      <showMerchantTransactionLevelDetails v-if="valueToggleMerchantTransaction"
        :valueToggleMerchantTransaction="valueToggleMerchantTransaction" @revertRowClick="rowClick">
      </showMerchantTransactionLevelDetails>
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

// import DownloadLostOrStolen from "../../components/inventory/DownloadLostOrStolen.vue";
import showMerchantTransactionLevelDetails from "../../components/sat/showMerchantTransactionLevelDetails.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "getinventoryStolenData",

  components: {
    showMerchantTransactionLevelDetails,
    generalLeadInformation
  },

  data() {
    return {
      propToggleLeadInformation: false,
      toggleAjaxLoadFilter: false,
      addtnLeadInformation: null,
      propLostOrStolenList: false,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "updated_date",
        descending: false,
        rowsPerPage: 5
      },
      tableData: [],
      tableData1: [],
      valueToggleMerchantTransaction: false,
      filterSearch: "",
      json_fields: {
        SerialNumber: "serialNumber",
        DeviceType: "device.deviceName"
      },
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
          name: "total_count",
          required: true,
          label: "Total Count",
          align: "left",
          field: "total_count"
          // sortable: true
        },
        {
          name: "status",
          required: true,
          label: "status",
          align: "left",
          field: "status",
          sortable: false,
        },
        // {
        //   name: "statue",
        //   required: true,
        //   label: "Status",
        //   align: "left",
        //   field: row => {
        //     return row.verifiedFinanceStatus ==
        //       1
        //       ? "Created"
        //       : row.verifiedFinanceStatus == 2
        //       ? "Assigned to R.I"
        //       : row.verifiedFinanceStatus == 3
        //       ? "Approved By R.I"
        //       : row.verifiedFinanceStatus == 4
        //       ? "Assigned To SO"
        //       : row.verifiedFinanceStatus == 5
        //       ? "Approved By So"
        //       : row.verifiedFinanceStatus == 6
        //       ? "Reject"
        //       : "NA";
        //   },
        //   // field: "status",
        // },
        {
          name: "regionAreaName",
          required: true,
          label: "Region",
          align: "left",
          field: row => {
            row.allocate_region.regionAreaName;
          }
          // sortable: truename
        },
        {
          name: "name",
          required: true,
          label: "Assigned So",
          align: "left",
          field: row => {
            row.allocate_so.name+" | "+row.allocate_so.employeeID;
          }
          // sortable: truename
        },
        {
          name: "created_date",
          required: true,
          label: "Created Date",
          align: "left",
          field: "created_date",
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
        //  {
        //   name: 'allocate_so',
        //   required: true,
        //   label: 'Allocate So',
        //   align: 'left',
        //   field: row => {
        //     row.allocate_so;
        //   },
        //   sortable: false
        // },
        // {
        //   name: "lostOrStolenRemarks",
        //   required: true,
        //   label: "Remarks",
        //   align: "left",
        //   field: "lostOrStolenRemarks",
        //   sortable: false
        // }
        {
          name: "action",
          required: true,
          label: "",
          align: "center",
          field: "action",
          sortable: true
        }
      ],
      loading: true,
      filter_values: ""
    };
  },
  computed: {
    ...mapGetters("inventoryStolenData", ["getinventoryStolenData"]),
    ...mapGetters("sparePartsPodListInventoryDetails", [
      "getsparePartsPodListDetails", "getPhonepesparePartsPodListDetails"
    ]),
    ...mapGetters("getInventoryUpdatedPodDetails", [
      "getInventoryUpdatedPodDetails","getPhonepeInventoryUpdatedPodDetails"
    ])
  },

  // created() {
  //   this.ajaxLoadAllLeadInfo();
  // },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filterSearch
    });
  },
  methods: {
    ...mapActions("inventoryStolenData", ["FETCH_INVENTORY_STOLEN_DATA"]),
    ...mapActions("sparePartsPodListInventoryDetails", [
      "FETCH_SPARE_PARTS_POD_LIST_INVENTORY_DETAILS", "FETCH_PHONEPE_SPARE_PARTS_POD_LIST_INVENTORY_DETAILS"
    ]),
    ...mapActions("getInventoryUpdatedPodDetails", [
      "FETCH_INVENTORY_UPDATED_POD_DETAILS", "FETCH_PHONEPE_INVENTORY_UPDATED_POD_DETAILS"
    ]),
    // getInventoryUpdatedPodDetails   ...mapActions("InventoryCentral",["REPORT_MASTERTRACKER_MENU"]),

    updatePodDetails(reqData) {
      console.log("the request data " + JSON.stringify(reqData));
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to Update?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing .."
          });
          let param = {
            podNumber: reqData.pod_number
          };
          console.log("the request data " + JSON.stringify(param));
          this.FETCH_PHONEPE_INVENTORY_UPDATED_POD_DETAILS(param).then(() => {
            // this.ajaxLoadAllLeadInfo();
            this.tableData1 = this.getPhonepeInventoryUpdatedPodDetails;
            this.$q.loading.hide();
            this.$router.push({
              name: "PhonepeUpdateSparePartsPodList",
              params: { data: this.tableData1 }
            });
          });
        });
    },
    //  downloadLostOrStolenList(){ D:\Production_Codes\AGGREGATORS\13FEB2023\web_frontend\src\pages\inventory\PhonepeUpdateSparePartsPodList.vue
    //    this.propLostOrStolenList =! this.propLostOrStolenList;
    //  },
    // fndownload() {
    //   const datas = this.tableData;
    //   let output = "";
    //   console.log(datas);
    //   // while (index < datas.length) {
    //   //   console.log(datas[index].stan);
    //   //   output += datas[index].stan;
    //   //   output += '\r\n';
    //   //   index += 1;
    //   // }
    //   datas.forEach(element => {
    //     output += element.serialNumber;
    //     output += "\r\n";
    //   });

    //   const file = new Blob(
    //     [output],

    //     { type: "text/plain;charset=utf-8" }
    //   );
    //   // element.href = URL.createObjectURL(file);
    //   // element.download = "serialNumber.txt";
    //   // document.body.appendChild(element);

    //   // element.click();
    //   let link = document.createElement("a");
    //   link.href = window.URL.createObjectURL(file);
    //   link.download = "serialNumber.txt";

    //   link.click();
    // },
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_PHONEPE_SPARE_PARTS_POD_LIST_INVENTORY_DETAILS({ pagination, filter })
        .then(res => {
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getPhonepesparePartsPodListDetails.totalElements;
          this.paginationControl.page =
            this.getPhonepesparePartsPodListDetails.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getPhonepesparePartsPodListDetails.content;
          if (this.getPhonepesparePartsPodListDetails.sort != null) {
            this.paginationControl.sortBy = this.getPhonepesparePartsPodListDetails.sort[0].property;
            this.paginationControl.descending = this.getPhonepesparePartsPodListDetails.sort[0].ascending;
          }
          // this.tableData = this.getinventoryStolenData.content;
          console.log(
            "Table Data---------------->" + JSON.stringify(this.tableData)
          );
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

    // downloadmastertrackerlist(){
    //   this.$q.loading.show({
    //     delay: 100 // ms
    //   });
    //   this.REPORT_MASTERTRACKER_MENU()
    //     .then(() => {
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         color: "positive",
    //         position: "bottom",
    //         message: "Success, file has been downloaded",
    //         icon: "check"
    //       });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         color: "negative",
    //         position: "bottom",
    //         message: "Please try again",
    //         icon: "thumb_down"
    //       });
    //     });
    // }
  }
};
</script>

<style>

</style>
