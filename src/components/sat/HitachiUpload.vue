<template>
  <div>
    <div class="q-pa-md">
      <div class="col-md-8 group" align="right">
        <q-btn
          icon="far fa-plus-square"
          class="common-btn"
          label="Download"
          @click="downloadhitachidownload()"
        />
      </div>
      <br /><br /><br />
      <q-card>
        <q-card-main>
          <div class="col-md-8" align="center">
            <a
              href="statics/files/Hitachi_Brand_Emi_Details.xlsx"
              class="hide-underline"
            >
              Click here to download the template</a
            >
          </div>
          <div class="col-md-8 q-py-md" align="center">
            <div
              v-if="formData.fileSelected.length == 0"
              :class="[
                uploaderHovered
                  ? 'toggleBulkUploadDisable'
                  : 'toggleBulkUploadActive'
              ]"
              class="drop display-inline align-center cursor-pointer"
              @dragover.prevent="dragAndDropCustomAnimate(true)"
              @dragleave.prevent="dragAndDropCustomAnimate(false)"
              @drop="onDrop"
            >
              <label class="btn display-inline cursor-pointer">
                Drag & Drop or click here to open a file
                <input
                  type="file"
                  name="image"
                  @change="onChange"
                  ref="deviceBulkUpload"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </label>
            </div>

            <div v-else align="left">
              <q-card dense class="q-pa-xs">
                <q-card-title>
                  Uploaded File
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                  <q-item dense>
                    <q-item-side icon="attach_file" />
                    <q-item-main>{{
                      formData.fileSelected[0].name
                    }}</q-item-main>
                    <q-item-side></q-item-side>
                  </q-item>
                </q-card-main>
                <q-card-separator />
                <q-card-actions align="start">
                  <q-btn
                    outline
                    size="sm"
                    color="negative"
                    @click="removeBulkUploadFile"
                    label="Remove"
                    icon="clear"
                  />
                </q-card-actions>
              </q-card>
            </div>
          </div>

          <div class="col-md-8 group" align="center">
            <q-btn
              class="common-btn"
              label="Upload"
              @click="uploadFileForBulkUpload"
            />
          </div>
        </q-card-main>
      </q-card>
      <HitachiDownload
        v-if="propHitachiDownload"
        :propHitachiDownload="propHitachiDownload"
        @emitfnshowHitachiDownload="downloadhitachidownload"
      ></HitachiDownload>
    </div>
    <div>
      <q-page>
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
          :data="tableData"
          :columns="columns"
          :filter="filter"
          :pagination.sync="paginationControl"
          row-key="name"
          :loading="toggleAjaxLoadFilter"
          :rows-per-page-options="[5, 10, 15, 20]"
          @request="ajaxLoadAllLeadInfo"
        >
          <!--START: table header -->
          <q-tr slot="top-row" slot-scope="props">
            <q-th v-for="col in props.columns" :key="col.name" :props="props">{{
              col.label
            }}</q-th>
          </q-tr>
          <!--END: table header -->
          <q-td slot="body-cell-mid" slot-scope="props" :props="props">
            <span class="capitalize">{{ props.row.mid }}</span>
          </q-td>
          <q-td
            slot="body-cell-leadNumber"
            slot-scope="props"
            :props="props"
            class="cursor-pointer"
            @click.native="toggleLeadInformation(props.row.leadInformation)"
          >
            <span class="label text-primary"
              ># {{ props.row.leadInformation.leadNumber }}</span
            >
          </q-td>
          <q-td
            slot="body-cell-HitachiStatus"
            slot-scope="props"
            :props="props"
          >
            <span class="capitalize">{{
              props.row.hitachiLeadStatus != null
                ? props.row.hitachiLeadStatus
                : "NA"
            }}</span>
          </q-td>
          <q-td slot="body-cell-deviceSer" slot-scope="props" :props="props">
            <span class="capitalize">{{
              props.row.regionalInventory != null
                ? props.row.regionalInventory.serialNumber
                : "NA"
            }}</span>
          </q-td>
          <q-td slot="body-cell-region" slot-scope="props" :props="props">
            <span class="capitalize">{{
              props.row.leadInformation != null
                ? props.row.leadInformation.region.regionAreaName
                : "NA"
            }}</span>
          </q-td>

          <template slot="top" class="bottom-border">
            <!--START: table filter,search,excel download -->
            <div class="col-5">
              <q-search
                clearable
                v-model="filter"
                separator
                color="grey-9"
                placeholder="Type.."
                float-label="Search Using MID"
                class="q-mr-lg q-py-sm"
              />
            </div>
          </template>
        </q-table>
        <!--END: table lead validation -->
        <showMerchantTransactionLevelDetails
          v-if="valueToggleMerchantTransaction"
          :valueToggleMerchantTransaction="valueToggleMerchantTransaction"
          @revertRowClick="rowClick"
        ></showMerchantTransactionLevelDetails>
        <!--START >>  Show Ajax Spinner -->
        <div
          v-if="toggleAjaxLoadFilter || toggleAjaxLoadFilter1"
          class="fullscreen spinner-overlay"
        >
          <q-spinner-bars
            class="absolute-center"
            style="color:#61116a"
            :size="35"
          />
        </div>
        <!--END >>  Show Ajax Spinner -->
        <!-- </div> -->
      </q-page>
    </div>
  </div>
</template>

<script>
import {
  required,
  numeric,
  email,
  maxLength,
  minLength
} from "vuelidate/lib/validators";

import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import HitachiDownload from "../../components/sat/HitachiDownload.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";
export default {
  name: "damagedDevices",
  components: {
    HitachiDownload,
    generalLeadInformation
  },
  data() {
    return {
      propHitachiDownload: false,
      propToggleLeadInformation: false,
      addtnLeadInformation: null,
      selectOption: [],
      formData: {
        fileSelected: []
      },
      uploaderHovered: false,
      toggleAjaxLoadFilter: false,
      toggleAjaxLoadFilter1: false,

      paginationControl: {
        rowsNumber: 5,
        page: 1,
        sortBy: "tid",
        descending: false,
        rowsPerPage: 5
      },
      paginationControl1: {
        rowsNumber: 5,
        page: 1,
        sortBy: "tid",
        descending: false,
        rowsPerPage: 5
      },
      tableData: [],
      valueToggleMerchantTransaction: false,
      filter: "",
      filter1: "",
      //table information
      columns: [
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: "mid",
          sortable: true
        },
         {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: "tid",
          sortable: true
        },
        {
          name: "leadNumber",
          required: true,
          label: "Lead Id",
          align: "left",
          field: row => {
            row.leadInformation.leadNumber;
          },
          sortable: false
        },
          {
          name: "HitachiStatus",
          required: true,
          label: "Hitachi Lead Status",
          align: "center",
          field:"hitachiLeadStatus",
          sortable: false
        },
           {
          name: "deviceSer",
          required: true,
          label: "Serial Number",
          align: "center",
          field: "serialNumber",
          sortable: false
        },
           {
          name: "region",
          required: true,
          label: "Region",
          align: "center",
          field: "regionAreaName",
          sortable: false
        },

        // {
        //   name: "serialNumber",
        //   required: true,
        //   label: "Serial Number",
        //   align: "center",
        //   field: row => {
        //     row.regionalInventory.serialNumber;
        //   },
        //   sortable: false
        // },
        //   {
        //   name: "regionAreaName",
        //   required: true,
        //   label: "Region",
        //   align: "center",
        //   field: row => {
        //     row.regionalInventory.region.regionAreaName;
        //   },
        //   sortable: false
        // },
        //  {
        //   name: "HitachiLeadStatus",
        //   required: true,
        //   label: "Hitachi Lead Status",
        //   align: "center",
        //   field: row => {
        //     row.hitachiLeadStatus;
        //   },
        //   sortable: false
        // },
        //  {
        //   name: "vasInstanceMapping",
        //   required: true,
        //   label: "VAS",
        //   align: "center",
        //   field:  row => {
        //     row.regionalInventory.vasInstanceMapping;
        //   },
        //   sortable: false
        // },

        // {
        //   name: "action",
        //   required: true,
        //   label: "",
        //   align: "center",
        //   field: "action",
        //   sortable: true
        // }
      ],
      loading: true,
      filter_values: ""
    };
  },

  computed: {
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
    ...mapGetters("ACTIVE_DEACTIVE_LEAD_SOURCE", [
      "getActiveandDeactiveLeadSource"
    ]),
    ...mapGetters("additionalTid", ["getadditionalTid"]),
    ...mapGetters("QRList", ["getAllQRList1"]),
    ...mapGetters("hitachi", ["gethitachiEmiData"]),
    submitDisabled: function() {
      return this.formdata.leadSource != "" && this.formdata.count != ""
        ? false
        : true;
    }
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },

  methods: {
    ...mapActions("additionalTid", [
      "FETCH_ADDITIONAL_TID_DATAS",
      "ADDITIONAL_TID_VERIFY_DATA"
    ]),
    ...mapActions("hitachi", ["FETCH_HITACHI_EMI_DATAS"]),
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE"
    ]),
    ...mapActions("InventoryBulkUploadDevice", ["UPLOAD_EMI_DATAS"]),
    ...mapActions("DownloadInventoryReplacementRecoveryReports", [
      "FETCH_HITACHI_DOWNLOAD_DATA"
    ]),

    downloadhitachidownload() {
      this.propHitachiDownload = !this.propHitachiDownload;
    },
    ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.FETCH_HITACHI_EMI_DATAS()
        .then(response => {
          this.toggleAjaxLoadFilter = false;
        })
        .catch(error => {
          this.toggleAjaxLoadFilter = false;
        });
    },
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_HITACHI_EMI_DATAS({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.gethitachiEmiData.totalElements;
          this.paginationControl.page = this.gethitachiEmiData.number + 1;
          console.log(
            "this.gethitachiEmiData---------------------->" +
              JSON.stringify(this.gethitachiEmiData)
          );
          // then we update the rows with the fetched ones
          this.tableData = this.gethitachiEmiData.content;
          console.log(
            "this.tableData this.tableData---------------------->" +
              JSON.stringify(this.tableData)
          );
          if (this.gethitachiEmiData.sort != null) {
            this.paginationControl.sortBy = this.gethitachiEmiData.sort[0].property;
            this.paginationControl.descending = this.gethitachiEmiData.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
          // console.log("Table Datas ---------------------->"+JSON.stringify(this.tableData));
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
    },
    removeBulkUploadFile() {
      this.formData.fileSelected = [];
    },

    dragAndDropCustomAnimate(action) {
      this.uploaderHovered = action;
    },
    onDrop: function(e) {
      e.stopPropagation();
      e.preventDefault();
      this.formData.fileSelected = e.dataTransfer.files;
      this.fileCheckSum(e.dataTransfer.files);
    },

    fileCheckSum(file) {
      console.log(file);
      let re = /(\.csv|\.xlsx|\.xls)$/i;
      if (!re.exec(file[0].name)) {
        this.formData.fileSelected = [];
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "File format not supported",
          icon: "clear"
        });
        return false;
      }
    },

    onChange(e) {
      console.log("UPLOADED FILES -->", e.target.files);
      this.formData.fileSelected = e.target.files;
    },

    uploadFileForBulkUpload(formData) {
      if (this.formData.fileSelected.length == 0) {
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: "Please upload file",
          icon: "warning"
        });
        return false;
      }
      let assumeFormData = new FormData();
      assumeFormData.append("file", this.formData.fileSelected[0]);

      let assumeFormDataValue = {
        file: assumeFormData
      };

      this.UPLOAD_EMI_DATAS(assumeFormDataValue)
        .then(response => {
          this.formData.fileSelected = [];
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully added!",
            icon: "thumb_up"
          });
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message:
              error.body.message == null
                ? "Please Try Again Later !"
                : error.body.message,
            icon: "thumb_down"
          });
        });
    }
  }
};
// };
</script>
<style scoped>
* {
  font-family: "Arial";
  font-size: 12px;
}

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
}

input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.align-center {
  text-align: center;
}

.helper {
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  width: 0;
}

.hidden {
  display: none !important;
}

.hidden.image {
  display: inline-block !important;
}

.display-inline {
  display: inline-block;
  vertical-align: middle;
}

.img {
  border: 1px solid #f6f6f6;
  display: inline-block;
  height: auto;
  max-height: 80%;
  max-width: 80%;
  width: auto;
}

.drop {
  padding: 15px;
  background-color: #f6f6f6;
  border-radius: 2px;
  height: 100%;
  max-height: 400px;
  max-width: 600px;
  width: 100%;
}
.toggleBulkUploadActive {
  border: 4px dashed #ccc;
}
.toggleBulkUploadDisable {
  border: 4px dashed #1f2c3fa6;
}
.hide-underline {
  text-decoration: none;
}
</style>
