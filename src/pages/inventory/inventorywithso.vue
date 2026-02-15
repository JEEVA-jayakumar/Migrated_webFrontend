<template>
  <q-page>
    <div>
      <div
        class="col-md-6 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Bijlipay Inventory with SO/Bill Partner/Sub Region</div>
      <q-table
        table-class="customTableClass"
        :rows="getAllInventoryWithSo"
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
          v-slot:body-cell-created_at="props"
          :props="props"
        >{{ props.row.created_at ==null? "NA" : props.row.created_at | moment("Do MMM Y") }}</q-td>
        <q-td
          v-slot:body-cell-updated_at="props"
          :props="props"
        >{{ props.row.updated_at ==null? "NA" : props.row.updated_at | moment("Do MMM Y") }}</q-td>
        <template v-slot:top="props">
          <div class="col-md-5">
            <q-input
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Pod Number, Device Type, Serial Number"
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
            @click="downloadInventoryWithSoList()" />
           
          </div>
          <div class="col-md-5">
            <!-- <q-input
                    clearable
                    color="grey-9"
                    v-model="filterSearch"
                    placeholder="Type.."
                    float-label="Search .."
                    class="q-mr-lg q-py-sm"
            />-->
            <!-- <div class="col-md-5">
              
              <downloadExcel
                :rows="getAllInventoryWithSo"
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
       <!--START >>  Download Reports -->
      <DownloadInventorySoList
         v-if="propInventoryWithSo" 
        :propInventoryWithSo="propInventoryWithSo" 
        @emitfnshowInventoryWithSo="downloadInventoryWithSoList"
     ></DownloadInventorySoList>
      <!--END:  Download Reports-->
      <!--END: table data -->
    </div>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
import moment from "moment";
import DownloadInventorySoList from"../../components/inventory/DownloadInventorySoList.vue";
import axios from "axios";

export default {
  name: "merchantTracker",
  components: {
    DownloadInventorySoList
  },

  data() {
    return {
      propInventoryWithSo:false,
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
    ...mapGetters("InventoryWithSo", ["getAllInventoryWithSo"])
  },
  created() {
    this.FETCH_INVENTORY_WITH_SO();
    this.loadData();
    // this.fetchData();
  },
  // beforeMount(){
  //   console.log("getAllInventoryWithSo ------->",JSON.stringify(this.getAllInventoryWithSo))
  // },
  methods: {
    ...mapActions("InventoryWithSo", ["FETCH_INVENTORY_WITH_SO"]),
    ...mapActions("reports", ["INVENTORY_WITH_SO_LIST_DOWNLOAD"]),

    downloadInventoryWithSoList(){
      this.propInventoryWithSo =! this.propInventoryWithSo;
    },
    loadData(){
      console.log("getAllInventoryWithSo ------->",JSON.stringify(this.getAllInventoryWithSo))
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
