<template>
  <q-page>
    <div>
      <div
        class="col-md-6 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Bijlipay Inventory with Reseller</div>
      <q-table
        table-class="customTableClass"
        :rows="getAllInventoryWithResellar"
        :columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        row-key="name"
      >
        <!-- <q-td
          v-slot:body-cell-createdAt="props"
          :props="props"
        >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td>
        <q-td
          v-slot:body-cell-receivedAt="props"
          :props="props"
        >{{ props.row.receivedAt | moment("Do MMM Y") }}</q-td>

        <q-td
          v-slot:body-cell-receivedAt="props"
          :props="props"
        >{{ props.row.receivedAt ==null? "NA" : props.row.receivedAt | moment("Do MMM Y") }}</q-td>
        <q-td
          v-slot:body-cell-DeviceList="props"
          :props="props"
        >{{ props.row.device.createDate | moment("Do MMM Y") }}</q-td>
        <q-td
          v-slot:body-cell-ModifyDate="props"
          :props="props"
        >{{ props.row.device.modifyDate | moment("Do MMM Y") }}</q-td>-->
        <q-td
          v-slot:body-cell-createDate="props"
          :props="props"
        >{{ props.row.createDate ==null? "NA" : props.row.createDate | moment("Do MMM Y") }}</q-td>
        <q-td
          v-slot:body-cell-modifyDate="props"
          :props="props"
        >{{ props.row.modifyDate ==null? "NA" : props.row.modifyDate | moment("Do MMM Y") }}</q-td>
        <template v-slot:top="props">
          <div class="col-md-5">
            <q-input
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Pod Number, Device Type"
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
            @click="downloadInventoryResellerList()" />
           
            <!-- <downloadExcel
              :rows="getAllInventoryWithResellar"
              :fields="json_fields"
              name="InventoryWithReseller.xls"
            >
              <q-btn outline color="grey-9" label="Download as excel" />
            </downloadExcel> -->
          </div>
          <!--END: table excel download -->
        </template>
      </q-table>
      <!--END: table data -->
       <!--START >>  Download Reports -->
      <DownloadInventoryReseller
         v-if="propInventoryResellerList" 
        :propInventoryResellerList="propInventoryResellerList" 
        @emitfnshowInventoryResellerList="downloadInventoryResellerList"
     ></DownloadInventoryReseller>
      <!--END:  Download Reports-->
    </div>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
import moment from "moment";
import DownloadInventoryReseller from "../../components/inventory/DownloadInventoryReseller.vue";

export default {
  name: "merchantTracker",
  components: {
    DownloadInventoryReseller
  },

  data() {
    return {
      propInventoryResellerList:false,
      paginationControl: {
        rowsPerPage: 10
      },
      filter: "",
      filter_values: "",
      json_fields: {
        SoName: "user.name",
        PodNumber: "podnumber",
        SerialNumber: "serialnumber",
        DeviceName: "device.deviceName",
        createDate: {
          field: "createDate",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        ReceivedDate: {
          field: "modifyDate",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        BPRegion: "region.regionGroup.regionName"
      },

      columns: [
        {
          name: "soname",
          required: true,
          label: "Resellar Name",
          align: "center",
          field: row => {
            return row.user.name;
          },
          sortable: true
        },
        {
          name: "podNumber",
          label: "podNumber",
          field: "podnumber",
          align: "center",
          sortable: true
        },
        {
          name: "serialnumber",
          label: "serialNumber",
          field: "serialnumber",
          align: "center",
          sortable: true
        },
        {
          name: "createDate",
          required: true,
          label: "Create Date",
          align: "center",
          field: row => {
            return moment(row.createDate).format("DD/MM/YYYY");
          }
        },

        {
          name: "modifyDate",
          required: true,
          label: "Received Date",
          align: "center",
          field: row => {
            return moment(row.modifyDate).format("DD/MM/YYYY");
          }
        },

        {
          name: "device",
          required: true,
          label: "Device Type",
          align: "center",
          field: row => {
            return row.device.deviceName;
          },
          sortable: true
        },
        {
          name: "region",
          required: true,
          label: "BPRegion",
          align: "center",
          field: row => {
            return row.region.regionGroup.regionName;
          },
          sortable: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters("InventoryWithResellar", ["getAllInventoryWithResellar"])
  },
  created() {
    this.FETCH_INVENTORY_WITH_RESELLAR();
  },
  methods: {
    ...mapActions("InventoryWithResellar", ["FETCH_INVENTORY_WITH_RESELLAR"]),
    ...mapActions("reports", ["INVENTORY_WITH_RESELLER_LIST_"]),

    downloadInventoryResellerList(){
       this.propInventoryResellerList=!this.propInventoryResellerList;
    },
    // downloadReport() {
    //   this.$q.loading.show({
    //     delay: 100 // ms
    //   });
    //   this.INVENTORY_WITH_RESELLER_LIST_(this.formData)
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
