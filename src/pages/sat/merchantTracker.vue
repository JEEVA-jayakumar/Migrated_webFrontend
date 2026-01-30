<template>
  <q-page>
    <div>

      <!--START: table title -->
      <div class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">Merchant Tracker - TID</div>
      <!--END: table title -->

        <!--START: table data -->
        <q-table
            table-class="customTableClass"
            :data="tableData"
            :columns="columns"
            :filter="filter"
            :pagination.sync="paginationControl" 
            row-key="name">
            <q-td slot="body-cell-tid" slot-scope="props" :props="props">
                <span class="label text-primary"># {{props.row.tid}}</span>
            </q-td>
            <q-td slot="body-cell-mid" slot-scope="props" :props="props">
                <span class="label text-primary"># {{props.row.mid}}</span>
            </q-td>
            <q-td slot="body-cell-transaction_amount" slot-scope="props" :props="props">
              Rs. {{props.row.transaction_amount}}
            </q-td>
            <q-td slot="body-cell-gst" slot-scope="props" :props="props">
              Rs. {{props.row.gst}}
            </q-td>
            <q-td slot="body-cell-net_amount" slot-scope="props" :props="props">
              Rs. {{props.row.net_amount}}
            </q-td>
            <q-td slot="body-cell-mdr" slot-scope="props" :props="props">
              Rs. {{props.row.mdr}}
            </q-td>
            <template slot="top" slot-scope="props">
                
                <!--START: table fullscreen mode -->
                <!-- <div class="col-md-4" align="right">
                  <q-btn
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="props.toggleFullscreen"
                    class="q-mt-lg"
                    color="grey-9"
                    size="sm"
                  /> -->
                <!-- </div> -->
                <!--END: table fullscreen mode -->

                <!--START: table search -->
                <div class="col-md-5">
                    <q-search
                      clearable
                      v-model="filter"
                      separator
                      color="grey-9"
                      placeholder="Type.."
                      float-label= "Search by MID, TID, Merchant Name, MCC,UTR Number, Device Type"
                      class="q-mr-lg q-py-sm"
                    />
                </div>
                <!--END: table search -->

                <!--START: table filter dropdown -->
                <div class="col-md-3">
                  <q-datetime 
                    v-model="filter_values" 
                    float-label="Date Filter"
                    type="date"
                    class="q-mr-lg q-py-sm"
                    color="grey-9" 
                  />
                </div>
                <!--END: table filter dropdown -->
      
                <!--START: table excel download -->
                <div class="col-md-4">
                  <downloadExcel
                  :data="tableData"
                  :fields="columns.label"
                  name="Merchant Tracker - TID.xls">
                    <q-btn 
                      outline  
                      color="grey-9" 
                      label="Download as Excel"
                      class="q-mr-lg q-py-sm float-right"
                      size="md"
                    />
                  </downloadExcel>
                </div>
              <!--END: table excel download -->   
          </template>
        </q-table>
        <!--END: table data -->

    </div>
  </q-page>
</template>

<script>
import downloadExcel from "vue-json-excel";

export default {
  name: "merchantTracker",
  components: {
    downloadExcel,
  },
  data() {
    return {
      paginationControl: {
        rowsPerPage: 10,
      },
      filter: "",
      filter_values: "",
      columns: [
        {
          name: "on_boarded_date",
          required: true,
          label: "On Boarded Date",
          align: "left",
          field: "on_boarded_date",
          sortable: true,
        },
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "center",
          field: "tid",
          sortable: true,
        },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: "mid",
          sortable: true,
        },
        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "merchant_name",
          sortable: true,
        },
        {
          name: "location",
          required: true,
          label: "Location",
          align: "left",
          field: "location",
          sortable: true,
        },
        {
          name: "device_type",
          required: true,
          label: "Device Type",
          align: "left",
          field: "device_type",
          sortable: true,
        },
        {
          name: "mcc",
          required: true,
          label: "MCC",
          align: "left",
          field: "mcc",
          sortable: true,
        },
        {
          name: "transaction_amount",
          required: true,
          label: "Transaction Amount",
          align: "center",
          field: "transaction_amount",
          sortable: true,
        },
        {
          name: "count",
          required: true,
          label: "Count",
          align: "center",
          field: "count",
          sortable: true,
        },
        {
          name: "mdr",
          required: true,
          label: "MDR (INR)",
          align: "center",
          field: "mdr",
          sortable: true,
        },
        {
          name: "gst",
          required: true,
          label: "GST (INR)",
          align: "center",
          field: "gst",
          sortable: true,
        },
        {
          name: "net_amount",
          required: true,
          label: "Net Amount (INR)",
          align: "center",
          field: "net_amount",
          sortable: true,
        },
        {
          name: "utr",
          required: true,
          label: "UTR",
          align: "center",
          field: "utr",
          sortable: true,
        },
        {
          name: "settlement_date",
          required: true,
          label: "Settlement Date",
          align: "center",
          field: "settlement_date",
          sortable: true,
        },
      ],
      loading: true,
      tableData: [
        {
          on_boarded_date: "20 Apr, 2018",
          tid: 554845,
          mid: "554845",
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: "18245",
          transaction_amount: 500,
          count: 100,
          mdr: 5,
          gst: 2,
          net_amount: 2,
          utr: "6546AF6322",
          settlement_date: "20 Apr, 2018",
          utr: "6546AF6322",
          settlement_date: "20 Apr, 2018",
        },
        {
          on_boarded_date: "20 Apr, 2018",
          tid: 554845,
          mid: "554845",
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: "18245",
          transaction_amount: 500,
          count: 100,
          mdr: 5,
          gst: 2,
          net_amount: 2,
          utr: "6546AF6322",
          settlement_date: "20 Apr, 2018",
        },
        {
          on_boarded_date: "20 Apr, 2018",
          tid: 554845,
          mid: "554845",
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: "18245",
          transaction_amount: 500,
          count: 100,
          mdr: 5,
          gst: 2,
          net_amount: 2,
          utr: "6546AF6322",
          settlement_date: "20 Apr, 2018",
        },
        {
          on_boarded_date: "20 Apr, 2018",
          tid: 554845,
          mid: "554845",
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: "18245",
          transaction_amount: 500,
          count: 100,
          mdr: 5,
          gst: 2,
          net_amount: 2,
          utr: "6546AF6322",
          settlement_date: "20 Apr, 2018",
        },
        {
          on_boarded_date: "20 Apr, 2018",
          tid: 554845,
          mid: "554845",
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: "18245",
          transaction_amount: 500,
          count: 100,
          mdr: 5,
          gst: 2,
          net_amount: 2,
          utr: "6546AF6322",
          settlement_date: "20 Apr, 2018",
        },
        {
          on_boarded_date: "20 Apr, 2018",
          tid: 554845,
          mid: "554845",
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: "18245",
          transaction_amount: 500,
          count: 100,
          mdr: 5,
          gst: 2,
          net_amount: 2,
          utr: "6546AF6322",
          settlement_date: "20 Apr, 2018",
        },
        {
          on_boarded_date: "20 Apr, 2018",
          tid: 554845,
          mid: "554845",
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: "18245",
          transaction_amount: 500,
          count: 100,
          mdr: 5,
          gst: 2,
          net_amount: 2,
          utr: "6546AF6322",
          settlement_date: "20 Apr, 2018",
        },
        {
          on_boarded_date: "20 Apr, 2018",
          tid: 554845,
          mid: "554845",
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: "18245",
          transaction_amount: 500,
          count: 100,
          mdr: 5,
          gst: 2,
          net_amount: 2,
          utr: "6546AF6322",
          settlement_date: "20 Apr, 2018",
        },
      ],

      json_fields: {
        name: "String",
        city: "String",
        country: "String",
        birthdate: "String",
        amount: "Number",
      },
      json_data: [
        {
          name: "Tony Pena",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          amount: 42,
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          amount: 42,
        },
      ],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
};
</script>

<style>
</style>
