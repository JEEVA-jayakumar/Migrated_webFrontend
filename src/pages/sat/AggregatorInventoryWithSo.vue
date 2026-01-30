<template>
  <q-page>
    <div>
      <!-- <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
        <div class="col-md-4">
          <q-select color="grey-9" v-model="aggregator" float-label="Select Aggregator" radio
            :options="aggregatorOptions" @input="getaggregator" />
        </div>
      </div> -->
      <div>
        <q-table table-class="customTableClass" :data="tableData" :columns="columns" :filter="filter"
          :pagination.sync="paginationControl" row-key="name" @request="ajaxLoadAllLeadInfo">
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
                float-label="Pod Number, Device Type" class="q-mr-lg q-py-sm" />
            </div>
            <div class="col-md-5">

              <q-btn square outline color="purple-9" label="Download as Excel" class="q-mr-lg q-py-sm float-right"
                size="md" @click="downloadAggregatorsInventoryWithSoList" />

            </div>

            <!--END: table excel download -->
          </template>
        </q-table>
      </div>

      <!--START >>  Download Reports -->
      <DownloadAggregatorsInventoryWithSoList v-if="propInventoryWithSo"
        :propInventoryWithSo="propInventoryWithSo" @emitfnshowInventoryWithSo="downloadAggregatorsInventoryWithSoList">
      </DownloadAggregatorsInventoryWithSoList>
      <!--END:  Download Reports-->
      <!--END: table data -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
import moment from "moment";
import DownloadAggregatorsInventoryWithSoList from "../../components/inventory/DownloadAggregatorsInventoryWithSoList.vue";
import axios from "axios";

export default {
  name: "merchantTracker",
  components: {
    DownloadAggregatorsInventoryWithSoList
  },

  data() {
    return {
      propInventoryWithSo: false,
      paginationControl: {
        rowsPerPage: 10
      },
      // aggregator: "",
      // flag: false,
      // aggregatorOptions: [],
      tableData: [],
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
          name: "soname",
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
    ...mapGetters("InventoryWithSo", ["getAllInventoryWithSo", "getAllAggregatorsInventoryWithSo"]),
    ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),
  },
  created() {
    // this.fetchAggregatorList();
    //   this.FETCH_INVENTORY_WITH_SO();
    // this.fetchData();
    this.AggregatorsValues();
  },
  methods: {
    ...mapActions("InventoryWithSo", ["FETCH_INVENTORY_WITH_SO", "FETCH_AGGREGATORS_INVENTORY_WITH_SO"]),
    ...mapActions("reports", ["INVENTORY_WITH_SO_LIST_DOWNLOAD"]),
    ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),

    downloadAggregatorsInventoryWithSoList() {
      this.propInventoryWithSo = !this.propInventoryWithSo;
    },
    // fetchAggregatorList() {
    //   let self = this;
    //   let cookedArr = [];
    //   self.GET_ACTIVE_CREATED_AGGREGATORS_LIST()
    //     .then(() => {
    //       return _.map(self.getActiveCreatedAggregatorList, (item) => {
    //         console.log("ITEM -------->", item)
    //         cookedArr.push({
    //           value: item.id,
    //           label: item.name
    //         });
    //         console.log("cookedArr -------->", cookedArr)
    //         self.aggregatorOptions = cookedArr;
    //       });

    //     })
    // },
    ajaxLoadAllLeadInfo() {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_AGGREGATORS_INVENTORY_WITH_SO()
        .then(res => {
          console.log("FETCH_AGGREGATORS_INVENTORY_WITH_SO ----->", JSON.stringify(this.getAllAggregatorsInventoryWithSo))
          this.tableData = this.getAllAggregatorsInventoryWithSo;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    AggregatorsValues() {
      //   this.FETCH_INVENTORY_WITH_SO();
      this.ajaxLoadAllLeadInfo();
    },
    downloadReport() {
      this.$q.loading.show({
        delay: 100 // ms
      });
      this.INVENTORY_WITH_SO_LIST_DOWNLOAD(this.formData)
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
    }
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
