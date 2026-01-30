<template>
  <q-page>
    <div>
      <div class="col-md-6 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">Aggregator Inventory with SO/Bill Partner/Sub Region</div>
      <!--END: table title -->
      <!--START: table lead validation -->
      <!-- <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
        <div class="col-md-4">
          <q-select color="grey-9" v-model="aggregator" float-label="Select Aggregator" radio
            :options="aggregatorOptions" @input="getaggregator" />
        </div>
      </div> -->
     
        <q-table table-class="customTableClass" :data="this.getInventoryWithSOAggregatorList" :columns="columns"
          :filter="filter" :pagination.sync="paginationControl" row-key="name">
          <!-- <q-td
          slot="body-cell-createdAt"
          slot-scope="props"
          :props="props"
        >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td>
        <q-td
          slot="body-cell-receivedAt"
          slot-scope="props"
          :props="props"
        >{{ props.row.receivedAt | moment("Do MMM Y") }}</q-td>

        <q-td
          slot="body-cell-receivedAt"
          slot-scope="props"
          :props="props"
        >{{ props.row.receivedAt ==null? "NA" : props.row.receivedAt | moment("Do MMM Y") }}</q-td>
        <q-td
          slot="body-cell-DeviceList"
          slot-scope="props"
          :props="props"
        >{{ props.row.device.createDate | moment("Do MMM Y") }}</q-td>
        <q-td
          slot="body-cell-ModifyDate"
          slot-scope="props"
          :props="props"
        >{{ props.row.device.modifyDate | moment("Do MMM Y") }}</q-td>-->
          <q-td slot="body-cell-created_at" slot-scope="props" :props="props">{{
            props.row.created_at == null ? "NA" :
              props.row.created_at | moment("Do MMM Y")
          }}</q-td>
          <q-td slot="body-cell-updated_at" slot-scope="props" :props="props">{{
            props.row.updated_at == null ? "NA" :
              props.row.updated_at | moment("Do MMM Y")
          }}</q-td>
          <template slot="top" slot-scope="props">
            <div class="col-md-5">
              <q-search clearable v-model="filter" separator color="grey-9" placeholder="Type.."
              float-label="Pod Number, Device Type, Serial Number" class="q-mr-lg q-py-sm" />
            </div>
            <div class="col-md-5">

              <q-btn square outline color="purple-9" label="Download as Excel" class="q-mr-lg q-py-sm float-right"
                size="md" @click="downloadInventoryWithSoList" />

            </div>
            <div class="col-md-5">
              <!-- <q-search
                    clearable
                    color="grey-9"
                    v-model="filterSearch"
                    placeholder="Type.."
                    float-label="Search .."
                    class="q-mr-lg q-py-sm"
            />-->
              <!-- <div class="col-md-5">
              
              <downloadExcel
                :data="getAllAggregatorInventoryWithSo"
                :fields="json_fields"
                name="InventoryWithSO.xls"
              >
                <q-btn outline color="grey-9" label="Download as excel" />
              </downloadExcel>
              @click="downloadReport"
            </div> -->
            </div>

            <!--END: table excel download -->
          </template>
        </q-table>
      </div>
      <!--START >>  Download Reports -->
      <AggregatorDownloadInventorySoList v-if="propInventoryWithSo" :propInventoryWithSo="propInventoryWithSo"
        @emitfnshowInventoryWithSo="downloadInventoryWithSoList">
      </AggregatorDownloadInventorySoList>
      <!--END:  Download Reports-->
      <!--END: table data -->
 
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
import moment from "moment";
import AggregatorDownloadInventorySoList from "../../components/inventory/DownloadAggregatorsInventoryWithSoList.vue";
import axios from "axios";
export default {
  name: "merchantTracker",
  components: {
    AggregatorDownloadInventorySoList
  },
  data() {
    return {
      aggregatorVal: [],
      // aggregatorOptions: [],
      deviceOptions: [],
      // aggregator: "",
      tableData: [],
      // flag: false,
      propInventoryWithSo: false,
      paginationControl: {
        rowsPerPage: 10
      },
      json_fields: {
        SOName: "name",
        PodNumber: "pod_number",
        SerialNumber: "serial_number",
        DeviceType: "device_name",
        createDate: {
          field: "created_at",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        ReceivedDate: {
          field: "updated_at",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        BPRegion: "region_name"
      },
      filter: "",
      filter_values: "",
      columns: [
        {
          name: "name",
          required: true,
          label: "So Name",
          align: "center",
          field: row => {
            return row.name+" | "+row.soEmpId;
          },
          sortable: true
        },
        {
          name: "pod_number",
          label: "podNumber",
          field: "pod_number",
          align: "center",
          sortable: true
        },
        {
          name: "serial_number",
          label: "serialNumber",
          field: "serial_number",
          align: "center",
          sortable: true
        },
        {
          name: "device_name",
          required: true,
          label: "Device Type",
          align: "center",
          field: "device_name",

          sortable: true
        },
        {
          name: "created_at",
          required: true,
          label: "Create Date",
          align: "center",
          field: row => {
            return moment(row.created_at).format("DD/MM/YYYY");
          }
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

        {
          name: "region_name",
          required: true,
          label: "BPRegion",
          align: "center",
          field: "region_name",

          sortable: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters("Aggregatorinventorywithso", ["getAllAggregatorInventoryWithSo"]),
    ...mapGetters("superAdminAggregators", ["getActiveCreatedAggregatorList", "getInventoryWithSOAggregatorList"]),
  },
  // created() {
  //   this.FETCH_AGGREGATOR_INVENTORY_WITH_SO();
  //   // this.fetchData();
  // },
  mounted() {
    // this.fetchAggregatorList();
    this.ajaxLoadAllLeadInfo1();
  },
  methods: {
    ...mapActions("Aggregatorinventorywithso", ["FETCH_AGGREGATOR_INVENTORY_WITH_SO"]),
    ...mapActions("reports", ["AGGREGATOR_INVENTORY_WITH_SO_LIST_DOWNLOAD"]),
    ...mapActions("superAdminAggregators", ["GET_ACTIVE_CREATED_AGGREGATORS_LIST", "FETCH_AGGREGATOR_INVENTORY_WITH_SO_LIST"]),

    // fetchAggregatorList() {
    //   let self = this;
    //   let cookedArr = [];
    //   self.GET_ACTIVE_CREATED_AGGREGATORS_LIST()
    //     .then(() => {
    //       return _.map(self.getActiveCreatedAggregatorList, (item) => {
    //         console.log("ITEM -------->", item)
    //         cookedArr.push({
    //           value: item,
    //           label: item.name
    //         });
    //         console.log("cookedArr -------->", cookedArr)
    //         self.aggregatorOptions = cookedArr;
    //         // this.flag = true;
    //       });

    //     })
    // },
    downloadInventoryWithSoList() {
      this.propInventoryWithSo = !this.propInventoryWithSo;
    },
    downloadReport() {
      this.$q.loading.show({
        delay: 100 // ms
      });
      this.AGGREGATOR_INVENTORY_WITH_SO_LIST_DOWNLOAD(this.formData)
        .then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Success, file has been downloaded",
            icon: "check"
          });
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again",
            icon: "thumb_down"
          });
        });
    },
    // getaggregator(value) {
    //   this.flag = true;
    //   this.aggregatorVal = value
    //   this.ajaxLoadAllLeadInfo1({
    //     // pagination: this.paginationControl,
    //     // filter: this.filter,
    //     aggregator: value
    //   });
    // },
    ajaxLoadAllLeadInfo1() {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });

      this.FETCH_AGGREGATOR_INVENTORY_WITH_SO_LIST()
        .then(res => {
          // console.log("YES",JSON.stringify(this.getInventoryWithSOAggregatorList));
          // this.tableData = this.getInventoryWithSOAggregatorList.content;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    // async fetchData() {
    //   console.log("hellow");
    //   const response = await axios.get(
    //     "http://192.168.4.205:8080/api/allsoinventorydetails"
    //   );

    //   return response;
    // }
  }
};
</script>

<style>

</style>
