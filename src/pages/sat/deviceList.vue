<template>
  <q-page>
    <div>
      <!--STARTv-model: table title -->
      <div
        class="col-md-6 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Merchant Tracker - TID</div>
      <!--END: table title -->

      <!--START: table data -->
      <q-table
        table-class="customTableClass"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        row-key="name"
      >
        <q-td v-slot:body-cell-tid="props" :props="props">
          <span class="label text-primary"># {{props.row.tid}}</span>
        </q-td>
        <q-td v-slot:body-cell-mid="props" :props="props">
          <span class="label text-primary"># {{props.row.mid}}</span>
        </q-td>
        <q-td
          v-slot:body-cell-transaction_amount="props"
          :props="props"
        >Rs. {{props.row.transaction_amount}}</q-td>
        <q-td v-slot:body-cell-gst="props" :props="props">Rs. {{props.row.gst}}</q-td>
        <q-td
          v-slot:body-cell-net_amount="props"
          :props="props"
        >Rs. {{props.row.net_amount}}</q-td>
        <q-td v-slot:body-cell-mdr="props" :props="props">Rs. {{props.row.mdr}}</q-td>
        <template v-slot:top="props">
          <!--START: table fullscreen mode -->
          <!-- <div class="col-md-4" align="right">
                  <q-btn
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="props.toggleFullscreen"
                    class="q-mt-lg"
                    color="grey-9"
                    size="sm"
          />-->
          <!-- </div> -->
          <!--END: table fullscreen mode -->

          <!--START: table search -->
          <div class="col-md-5">
            <q-input
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="SO Name,Region,DeviceType"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <!--END: table search -->

          <!--START: table filter dropdown -->
          <div class="col-md-5">
            <q-select
              v-model="filter_values"
              float-label="So Name"
              class="q-mr-lg q-py-sm"
              :options="data"
            />
          </div>
          <!--END: table filter dropdown -->

          <!--START: table excel download -->
          <div class="col-md-4"></div>
          <!--END: table excel download -->
        </template>
      </q-table>
      <!--END: table data -->
    </div>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import downloadExcel from "vue-json-excel";

export default {
  name: "merchantTracker",
  components: {
    downloadExcel
  },
  data() {
    return {
      paginationControl: {
        rowsPerPage: 10
      },
      filter: "",
      filter_values: "",
      data: [
        {
          label: "ramesh",
          value: "ramesh"
        },
        {
          label: "suresh",
          value: "suresh"
        },
        {
          label: "dinesh",
          value: "dinesh"
        }
      ],

      columns: [
        {
          name: "soname",
          required: true,
          label: "SO Name",
          align: "left",
          field: "soname",
          sortable: true
        },
        {
          name: "region",
          required: true,
          label: "Region",
          align: "center",
          field: "region",
          sortable: true
        },
        {
          name: "devicename",
          required: true,
          label: "Device Name",
          align: "left",
          field: "devicename",
          sortable: true
        },
        {
          name: "serialnumber",
          required: true,
          label: "Serial Number",
          align: "left",
          field: "serialnumber",
          sortable: true
        },
        {
          name: "count",
          required: true,
          label: "Number of Device",
          align: "left",
          field: "count",
          sortable: true
        }
      ],
      loading: true,
      tableData: [
        {
          soname: "suresh",
          region: "chennai",
          devicename: "GPRS",
          serialnumber: "123456",
          count: "1"
        },
        {
          soname: "suresh",
          region: "chennai",
          devicename: "GPRS",
          serialnumber: "123456",
          count: "1"
        },
        {
          soname: "suresh",
          region: "chennai",
          devicename: "GPRS",
          serialnumber: "123456",
          count: "1"
        },
        {
          soname: "suresh",
          region: "chennai",
          devicename: "GPRS",
          serialnumber: "123456",
          count: "1"
        },
        {
          soname: "suresh",
          region: "chennai",
          devicename: "GPRS",
          serialnumber: "123456",
          count: "1"
        }
      ],

      json_fields: {
        name: "String",
        city: "String",
        country: "String",
        birthdate: "String",
        amount: "Number"
      },
      json_data: [
        {
          name: "Tony Pena",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          amount: 42
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          amount: 42
        }
      ],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ]
    };
  }
};
</script>

<style>
</style>
