<template>
  <q-page>
    <div>
      <!--START: table title -->
      <div
        class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >
      Bijlipay Lost Or Stolen Devices
      </div>
      <!--END: table title -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <!-- content -->
      <!--START: table lead validation -->
      <q-table
        table-class="customTableClass"
        :columns="columns"
        :data="tableData"
        color="grey-9"
        :filter="filterSearch"
        :pagination.sync="paginationControl"
        :rows-per-page-options="[5,10,15,20,25]"
        :loading="toggleAjaxLoadFilter"
        @request="ajaxLoadAllLeadInfo"
      >
       <q-td
          slot="body-cell-updated_at"
          slot-scope="props"
          :props="props"
        >{{ props.row.updatedAt ==null? "NA" : props.row.updatedAt | moment("Do MMM Y") }}</q-td>
        <template slot="top">
          <!--START: table filter,search -->
          <div class="col-md-5">
            <q-search
              clearable
              color="grey-9"
              v-model="filterSearch"
              placeholder="Type.."
              float-label="Search Using Device Serial Number"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <div class="col-md-5">
           
            <q-btn 
            square 
            outline 
            color="purple-9" 
            label="Download as Excel" 
            class="q-mr-lg q-py-sm float-right" 
            size="md" 
            @click="downloadLostOrStolenList()" />
           
          </div>
          <!--END: table filter,search -->
         
        </template>
      </q-table>
       <!--START >>  Download Reports -->
      <DownloadLostOrStolen
         v-if="propLostOrStolenList" 
        :propLostOrStolenList="propLostOrStolenList" 
        @emitfnshowLostOrStolenList="downloadLostOrStolenList"
     ></DownloadLostOrStolen>
      <!--END:  Download Reports-->
      <!--END: table lead validation -->
      <showMerchantTransactionLevelDetails
        v-if="valueToggleMerchantTransaction"
        :valueToggleMerchantTransaction="valueToggleMerchantTransaction"
        @revertRowClick="rowClick"
      ></showMerchantTransactionLevelDetails>
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import DownloadLostOrStolen from "../../components/inventory/DownloadLostOrStolen.vue";
import showMerchantTransactionLevelDetails from "../../components/sat/showMerchantTransactionLevelDetails.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "getinventoryStolenData",

  components: {
    showMerchantTransactionLevelDetails,
    generalLeadInformation,
    DownloadLostOrStolen
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
        sortBy: "serialNumber",
        descending: false,
        rowsPerPage: 5
      },
      tableData: [],
      valueToggleMerchantTransaction: false,
      filterSearch: "",
      json_fields: {
        SerialNumber: "serialNumber",
        DeviceType: "device.deviceName"
      },
      //table information
      columns: [
        {
          name: "serialNumber",
          required: true,
          label: "Device Serial Number",
          align: "left",
          field: "serialNumber",
          // sortable: true
        },
        {
          name: "device",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => {
            return row.device.deviceName;
          },
          // sortable: true
        },
         {
          name: "updated_at",
          required: true,
          label: "Receive Date",
          align: "center",
          field: row => {
            return moment(row.updated_at).format("DD/MM/YYYY");
          }
        },
        // {
        //   name: "lostOrStolenRemarks",
        //   required: true,
        //   label: "Remarks",
        //   align: "left",
        //   field: "lostOrStolenRemarks",
        //   sortable: false
        // }
      ],
      loading: true,
      filter_values: ""
    };
  },
  computed: {
    ...mapGetters("inventoryStolenData", ["getinventoryStolenData"])
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
    //  ...mapActions("InventoryCentral",["REPORT_MASTERTRACKER_MENU"]),
     

     downloadLostOrStolenList(){
       this.propLostOrStolenList =! this.propLostOrStolenList;
     },
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
      this.FETCH_INVENTORY_STOLEN_DATA({ pagination, filter })
        .then(res => {
           this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getinventoryStolenData.totalElements;
          this.paginationControl.page = this.getinventoryStolenData.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getinventoryStolenData.content;
          if (this.getinventoryStolenData.sort != null) {
            this.paginationControl.sortBy = this.getinventoryStolenData.sort[0].property;
            this.paginationControl.descending = this.getinventoryStolenData.sort[0].ascending;
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

<style></style>
