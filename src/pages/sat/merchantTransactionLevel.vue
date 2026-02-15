<template>
  <q-page>
    <div>
      <!--STARTv-model: table title -->
      <div class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">Merchant Tracker - Transaction Level</div>
      <!--END: table title -->

    <!-- content -->
    <!--START: table lead validation -->
    <q-table
      table-class="customTableClass"
      :rows="tableData"
      :columns="columns"
      :filter="filter"
      :pagination="paginationControl"
      row-key="name"
    >
      <q-tr v-slot:body="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer">
        <q-td v-for="col in props.cols" :key="col.name" :props="props" >
           <div v-if="col.field == 'tid'" >
              <span class="label text-primary"># {{ col.value }}</span>
          </div> 
           <div v-else-if="col.field == 'mid'" >
              <span class="label text-primary">#  {{ col.value }}</span>
          </div> 
          <div v-else >
              {{ col.value }}
          </div> 
        </q-td>
      </q-tr>

      <q-td v-slot:body-cell-tid="props" :props="props">
          <span class="label text-primary"># {{props.row.tid}}</span>
      </q-td>

       <template v-slot:top="props">
           
           
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

            <!--START: table filter,search,excel download -->
            <div class="col-5">
              <q-input
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label= "Search by MID, TID, Merchant Name, MCC,UTR Number, Device Type"
              class="q-mr-lg q-py-sm"
              />
            </div>
            <div class="col-3">
              <q-input
              modal
              outline
              type="date"
              v-model="filter_values" 
              placeholder="Select Date"
              class="q-mr-lg q-py-sm "
              float-label= "Filter By"
              color="grey-9" 
              />
            </div>
            <div class="col-md-4">
                <downloadExcel
                :rows="tableData"
                :fields="columns.label"
                name="Merchant Transaction Level.xls">
                  <q-btn 
                    outline  
                    color="grey-9" 
                    label="Download as Excel"
                    class="q-mr-lg q-py-sm float-right"
                    size="md"
                  />
                </downloadExcel>
              </div>
            <!--END: table filter,search -->
      </template>

    </q-table>
    <!--END: table lead validation -->

    <showMerchantTransactionLevelDetails 
      v-if= "valueToggleMerchantTransaction" 
      :valueToggleMerchantTransaction= "valueToggleMerchantTransaction" 
      @revertRowClick= "rowClick"
    >
    </showMerchantTransactionLevelDetails>
    </div>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import showMerchantTransactionLevelDetails from "../../components/sat/showMerchantTransactionLevelDetails.vue";
import downloadExcel from "vue-json-excel";

export default {
  name: "merchantTransactionLevel",

  components: {
    showMerchantTransactionLevelDetails,
    downloadExcel
  },

  data() {
    return {
      paginationControl: {
        rowsPerPage: 10
      },

      valueToggleMerchantTransaction: false,

      filter: "",
      //table information
      columns: [
        {
          name: "date",
          required: true,
          label: "Date",
          align: "left",
          field: "date",
          sortable: true
        },
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "center",
          field: "tid",
          sortable: true
        },
        {
          name: "rrn",
          required: true,
          label: "RRN",
          align: "left",
          field: "rrn",
          sortable: true
        },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: "mid",
          sortable: true
        },
        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "merchant_name",
          sortable: true
        },
        {
          name: "location",
          required: true,
          label: "Location",
          align: "left",
          field: "location",
          sortable: true
        },
        {
          name: "device_type",
          required: true,
          label: "Device Type",
          align: "center",
          field: "device_type",
          sortable: true
        },
        {
          name: "mcc",
          required: true,
          label: "MCC",
          align: "center",
          field: "mcc",
          sortable: true
        },
        {
          name: "transaction_type",
          required: true,
          label: "Transaction Type",
          align: "center",
          field: "transaction_type",
          sortable: true
        },
        {
          name: "transaction_amount",
          required: true,
          label: "Transaction Amount (INR)",
          align: "center",
          field: "transaction_amount",
          sortable: true
        },
        {
          name: "mdr",
          required: true,
          label: "MDR (INR)",
          align: "center",
          field: "mdr",
          sortable: true
        },
        {
          name: "gst",
          required: true,
          label: "GST (INR)",
          align: "center",
          field: "gst",
          sortable: true
        },
        {
          name: "source",
          required: true,
          label: "Source",
          align: "left",
          field: "source",
          sortable: true
        }
      ],
      loading: true,
      tableData: [
        {
          date: "20 Apr, 2018",
          tid: 554845,
          rrn: 4845,
          mid: 554845,
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: 18245,
          transaction_type: "Debit",
          transaction_amount: 500,
          mdr: 5,
          gst: 2,
          source: "Bank"
        },
        {
          date: "20 Apr, 2018",
          tid: 554845,
          rrn: 4845,
          mid: 554845,
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: 18245,
          transaction_type: "Debit",
          transaction_amount: 500,
          mdr: 5,
          gst: 2,
          source: "Bank"
        },
        {
          date: "20 Apr, 2018",
          tid: 554845,
          rrn: 4845,
          mid: 554845,
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: 18245,
          transaction_type: "Debit",
          transaction_amount: 500,
          mdr: 5,
          gst: 2,
          source: "Bank"
        },
        {
          date: "20 Apr, 2018",
          tid: 554845,
          rrn: 4845,
          mid: 554845,
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: 18245,
          transaction_type: "Debit",
          transaction_amount: 500,
          mdr: 5,
          gst: 2,
          source: "Bank"
        },
        {
          date: "20 Apr, 2018",
          tid: 554845,
          rrn: 4845,
          mid: 554845,
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: 18245,
          transaction_type: "Debit",
          transaction_amount: 500,
          mdr: 5,
          gst: 2,
          source: "Bank"
        },
        {
          date: "20 Apr, 2018",
          tid: 554845,
          rrn: 4845,
          mid: 554845,
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: 18245,
          transaction_type: "Debit",
          transaction_amount: 500,
          mdr: 5,
          gst: 2,
          source: "Bank"
        },
        {
          date: "20 Apr, 2018",
          tid: 554845,
          rrn: 4845,
          mid: 554845,
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: 18245,
          transaction_type: "Debit",
          transaction_amount: 500,
          mdr: 5,
          gst: 2,
          source: "Bank"
        },
        {
          date: "20 Apr, 2018",
          tid: 554845,
          rrn: 4845,
          mid: 554845,
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: 18245,
          transaction_type: "Debit",
          transaction_amount: 500,
          mdr: 5,
          gst: 2,
          source: "Bank"
        },
        {
          date: "20 Apr, 2018",
          tid: 554845,
          rrn: 4845,
          mid: 554845,
          merchant_name: "Bombay Fries",
          location: "Tamilnadu",
          device_type: "mPOS",
          mcc: 18245,
          transaction_type: "Debit",
          transaction_amount: 500,
          mdr: 5,
          gst: 2,
          source: "Bank"
        }
      ],
      lazy: [],
      select: "fb",
      multipleSelect: ["goog", "twtr"],
      error: true,
      warning: false,
      filter_values: "",
      options: [
        {
          label: "Google",
          filter_values: "goog"
        },
        {
          label: "Facebook",
          filter_values: "fb"
        },
        {
          label: "Twitter",
          filter_values: "twtr"
        },
        {
          label: "Apple Inc.",
          filter_values: "appl"
        },
        {
          label: "Oracle",
          filter_values: "ora"
        }
      ]
    };
  },
  methods: {
    rowClick(rowValues) {
      this.valueToggleMerchantTransaction = !this
        .valueToggleMerchantTransaction;
    }
  }
};
</script>

<style>
</style>
