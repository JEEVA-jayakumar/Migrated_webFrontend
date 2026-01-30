<template>
  <q-page>
    <div>
      <div class="col-md-6 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">
        <!-- <strong>Select the batch to download QR String</strong> -->
      </div>
      <q-table
        table-class="customTableClass"
        :data="getAllQRList"
        :columns="columns"
        :filter="filter"
        :pagination.sync="paginationControl"
        row-key="name"
        :filter-method="myCustomSearchFilter"
      >
        <!-- selection="single"
        :selected.sync="formData.selectQRDownload"-->
        <q-td
          slot="body-cell-createDate"
          slot-scope="props"
          :props="props"
        >{{ props.row.createDate | moment("Do MMM Y") }}</q-td>
        <q-td slot="body-cell-action" slot-scope="props" :props="props">
          <div class="row no-wrap no-padding">
            <q-btn
              dense
              no-caps
              no-wrap
              icon="far fa-download-square"
              label="Download QR String"
              size="md"
              flat
              @click="fnDownload(props.row.id)"
              class="text-light-blue"
            ></q-btn>
          </div>
        </q-td>

        <template slot="top" slot-scope="props">
          <div class="col-md-6">
            <q-search
              clearable
              v-model.trim="filter"
              separator
              color="grey-9"
              placeholder="Search by Batch no/ QR API source"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <!-- <div class="col-md-5">
            <downloadExcel :data="getAllPodList" :fields="json_fields" name="QRList.xls">
              <q-btn outline color="grey-9" label="Download as excel" />
            </downloadExcel>
          </div>-->
          <div class="col-md-4"></div>
          <!--END: table excel download -->
        </template>
      </q-table>
      <!-- <br />
      <br />
      <div class="row group">
        <div class="col group" align="right">
          <q-btn
            :disabled="formData.selectQRDownload.length == 0"
            color="green"
            class="text-black q-mr-md"
            size="md"
            label="Download QR Strings"
            @click="selectQRCodeBasedDownload(formData.selectQRDownload)"
          />
        </div>
      </div>-->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
import moment from "moment";
import editRegion from "../../components/inventory/editRegion.vue";
import downloadExcel from "vue-json-excel";

export default {
  name: "merchantTracker",
  components: {
    editRegion,
    downloadExcel
  },

  data() {
    return {
      propShowEditRegion: false,
      paginationControl: {
        rowsPerPage: 5
      },
      filter: "",
      filter_values: "",
      formData: {
        selectQRDownload: []
      },
      json_fields: {
        PodNumber: "podNumber",
        DeviceType: "device.deviceName",
        // ReceiveAt: " receivedAt",
        ReceivedDate: {
          field: "receivedAt",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        createdAt: {
          field: "createdAt",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
        },
        // CreateDate: "createdAt",
        BPRegion: "region.regionAreaName"
      },
      columns: [
        {
          name: "id",
          label: "Batch No",
          field: row => {
            return "BatchNo_000" + row.id;
          },
          align: "center"
        },
        {
          name: "createDate",
          required: true,
          label: "Creation Date",
          align: "center",
          field: row => {
            return row.createDate;
          },
          sortable: true
        },
        {
          name: "qrCount",
          required: true,
          label: "No of QR Requested",
          align: "center",
          field: "qrCount"
        },

        // {
        //   name: "ModifyDate",
        //   required: true,
        //   label: "Modify Date",
        //   align: "center",
        //   field: row => {
        //     return row.device.modifyDate;
        //   }
        // },
        {
          name: "sourceName",
          required: true,
          label: "QR Bank Selected",
          align: "center",
          field: row => {
            return row.apiInstance.apiInstanceName;
          }
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters("QRList", ["getAllQRList"])
  },
  created() {
    this.FETCH_QR_LIST();
  },
  methods: {
    ...mapActions("QRList", ["FETCH_QR_LIST"]),
    ...mapActions("reports", ["QR_LIST_DOWNLOAD"]),

    fnDownload(selectQRDownload) {
      this.$q.loading.show({
        delay: 100 // ms
      });
      // let usersSelectSync = [];
      // selectQRDownload.map(function(value, key) {
      //   usersSelectSync.push(value.id);
      // });
      let requestparams = {
        params: {
          items: [selectQRDownload]
        }
      };
      this.QR_LIST_DOWNLOAD(requestparams)
        .then(() => {
          // this.formData.selectQRDownload = [];
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Success, file has been downloaded",
            icon: "check"
          });
        })
        .catch(error => {
          // this.formData.selectQRDownload = [];
          // console.log("select code", usersSelectSync);
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again",
            icon: "thumb_down"
          });
        });
    },
    myCustomSearchFilter(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      return rows.filter(row =>
        cols.some(
          col =>
            (cellValue(col, row) + "").toLowerCase().indexOf(lowerTerms) !== -1
        )
      );
    }
  }
};
</script>

<style>
</style>
