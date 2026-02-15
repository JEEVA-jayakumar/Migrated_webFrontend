<template>
  <q-page>
    <div>
      <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >
        Bijlipay De-Active List
      </div>
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        v-model:leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <q-table
        table-class="customTableClass"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        row-key="name"
        :loading="toggleAjaxLoadFilter"
        :rows-per-page-options="[5, 10, 15, 20]"
        @request="ajaxLoadAllLeadInfo"
      >
        <q-td v-slot:body-cell-tid="props" :props="props">
          <span class="label text-primary"># {{ props.row.tid }}</span>
        </q-td>
        <q-td v-slot:body-cell-mid="props" :props="props">
          <span class="label text-primary"># {{ props.row.mid }}</span>
        </q-td>
        <q-td
          v-slot:body-cell-leadNumber="props"
          :props="props"
          class="cursor-pointer"
          @click.native="toggleLeadInformation(props.row.leadInformation)"
        >
          <span class="label text-primary"
            ># {{ props.row.leadInformation.leadNumber }}</span
          >
        </q-td>
        <q-td v-slot:body-cell-mobileNumber="props" :props="props">{{
           props.row.assignedTo == null ? "NA" : props.row.assignedTo.contactNumber
        }}</q-td>
        <q-td v-slot:body-cell-leadAddress="props" :props="props">{{
          props.row.leadInformation == null ? "NA" : props.row.leadInformation.leadAddress
        }}</q-td>
        <q-td v-slot:body-cell-deviceStatusDate="props" :props="props">
          <span class="label">{{ props.row.deviceStatusDate | moment("Do MMM Y") }}</span>
        </q-td>
        <q-td v-slot:body-cell-viewDocument="props" :props="props">
          <div
            v-if="
              props.row.implementationFormMimeType == null ||
              props.row.implementationFormMimeType.includes('application/pdf')
            "
            class="cursor-pointer"
          >
            <div @click="fnPDFViewModal(props.row.implementationForm)">
              <q-icon name="fas fa-file-pdf" color="primary" />
              &nbsp;{{ props.row.implementationForm }}
            </div>
          </div>
          <div
            v-else-if="
              props.row.implementationFormMimeType == null ||
              props.row.implementationFormMimeType.includes('image/*')
            "
            class="cursor-pointer"
          >
            <div @click="fnViewMultiAttachedFileImageUploadedBySat()">
              <viewer :img="[GLOBAL_FILE_FETCH_URL + '/' + props.row.implementationForm]">
                <img
                  :src="[GLOBAL_FILE_FETCH_URL + '/' + props.row.implementationForm]"
                  style="max-width: 15%"
                />
              </viewer>
            </div>
          </div>
          <div v-else>NA Document</div>
        </q-td>
        <q-td v-slot:body-cell-pictureOfShop="props" :props="props">
          <div
            v-if="
              props.row.pictureOfShopMimeType == null ||
              props.row.pictureOfShopMimeType.includes('application/pdf')
            "
            class="cursor-pointer"
          >
            <div @click="fnPDFViewModal(props.row.pictureOfShop)">
              <q-icon name="fas fa-file-pdf" color="primary" />
              &nbsp;{{ props.row.pictureOfShop }}
            </div>
          </div>
          <div
            v-else-if="
              props.row.pictureOfShopMimeType == null ||
              props.row.pictureOfShopMimeType.includes('image/*')
            "
            class="cursor-pointer"
          >
            <div @click="fnViewMultiAttachedFileImageUploadedByPictureShop()">
              <viewer :img="[GLOBAL_FILE_FETCH_URL + '/' + props.row.pictureOfShop]">
                <img
                  :src="[GLOBAL_FILE_FETCH_URL + '/' + props.row.pictureOfShop]"
                  style="max-width: 15%"
                />
              </viewer>
            </div>
          </div>
          <div v-else>NA Document</div>
        </q-td>
        <q-td v-slot:body-cell-cpvForm="props" :props="props">
          <div
            v-if="
              props.row.cpvFormMimeType == null ||
              props.row.cpvFormMimeType.includes('application/pdf')
            "
            class="cursor-pointer"
          >
            <div @click="fnPDFViewModal(props.row.cpvForm)">
              <q-icon name="fas fa-file-pdf" color="primary" />
              &nbsp;{{ props.row.cpvForm }}
            </div>
          </div>
          <div
            v-else-if="
              props.row.cpvFormMimeType == null ||
              props.row.cpvFormMimeType.includes('image/*')
            "
            class="cursor-pointer"
          >
            <div @click="fnViewMultiAttachedFileImageUploadedByCpvForm()">
              <viewer :img="[GLOBAL_FILE_FETCH_URL + '/' + props.row.cpvForm]">
                <img
                  :src="[GLOBAL_FILE_FETCH_URL + '/' + props.row.cpvForm]"
                  style="max-width: 15%"
                />
              </viewer>
            </div>
          </div>
          <div v-else>NA Document</div>
        </q-td>
        <q-td v-slot:body-cell-status="props" :props="props">
          <span class="label text-negative" v-if="props.row.deviceStatus == 3"
            >Deactivated</span
          >
        </q-td>

        <template slot="top">
          <div class="col-5">
            <q-input
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Search by MID, TID, Merchant Name"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <div class="col-2">
            <q-input
              class="q-mr-lg q-py-sm"
              v-model="formData.fromDate"
              :min="yesterday"
              :max="tomorrow"
              float-label="From Date"
            />
          </div>
          <div class="col-2">
            <q-input
              class="q-mr-lg q-py-sm"
              v-model="formData.toDate"
              :min="yesterday"
              :max="tomorrow"
              float-label="To Date"
            />
          </div>
          <div class="col-2">
            <q-btn
              align="right"
              color="purple-9"
              :disabled="
                formData.fromDate == '' ||
                formData.fromDate == null ||
                formData.toDate == '' ||
                formData.toDate == null
              "
               style="margin-right: 10px"
              @click="SubmitData(formData)"
              >Submit</q-btn
            >
             <q-btn color="red" v-if="selectedRow" @click="DeleteData">
              <q-icon name="delete" />
            </q-btn>
          </div>
        </template>
      </q-table>
      <showMerchantTransactionLevelDetails
        v-if="valueToggleMerchantTransaction"
        :valueToggleMerchantTransaction="valueToggleMerchantTransaction"
        @revertRowClick="rowClick"
      >
      </showMerchantTransactionLevelDetails>
    </div>
    <showPdfModalComponent
      v-if="toggleshowPDFModal"
      :propToggleshowPDFModal="toggleshowPDFModal"
      :propPDFDetails="PDFDetails"
      @togglePDFModal="fnPDFViewModal"
    ></showPdfModalComponent>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

import downloadExcel from "vue-json-excel";
import showMerchantTransactionLevelDetails from "../../components/sat/showMerchantTransactionLevelDetails.vue";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";
import { date } from "quasar";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
export default {
  name: "merchantTransactionLevel",

  components: {
    showMerchantTransactionLevelDetails,
    generalLeadInformation,
    downloadExcel,
    showPdfModalComponent,
  },

  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,
      toggleshowPDFModal: false,
      PDFDetails: "",
      propShowConvertToSat: false,
      propShowViewReject: false,
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        // sortBy: "tid",
        sortBy: "deviceStatusDate",
        descending: false,
        rowsPerPage: 10,
      },
      tableData: [],
      valueToggleMerchantTransaction: false,
      filter: "",
      tomorrow: addToDate(today, { days: 0 }),
      yesterday: subtractFromDate(today, { days: 7200 }),
      formData: {
        fromDate: "",
        toDate: "",
      },
      formData1: {
        fromDate: "",
        toDate: "",
      },
      selectedRow: null,
      columns: [
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
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
          name: "leadNumber",
          required: true,
          label: "Lead Id",
          align: "left",
          field: (row) => {
            row.leadInformation.leadNumber;
          },
          sortable: false,
        },
        {
          name: "leadInformation",
          required: true,
          label: "ME Name",
          align: "left",
          field: (row) => {
            return row.leadInformation.leadName;
          },
          sortable: false,
        },
        {
          name: "leadAddress",
          required: true,
          label: "Merchant Address",
          align: "center",
          field: (row) => {
            row.leadInformation.leadAddress;
          },
          sortable: false,
        },
        {
          name: "deviceName",
          required: true,
          label: "Device type",
          align: "right",
          field: (row) => {
            return row.leadInformation.device == null
              ? "NA"
              : row.leadInformation.device.deviceName;
          },
          sortable: false,
        },
        {
          // name: "device_serial_number",
          name: "regionalInventory.serialNumber",
          required: true,
          label: "Device Serial Number",
          align: "left",
          field: (row) => {
            return row.regionalInventory == null
              ? "NA"
              : row.regionalInventory.serialNumber;
          },
          sortable: true,
        },
        {
          name: "deviceStatusDate",
          required: true,
          label: "Implementation Date",
          align: "left",
          field: "deviceStatusDate",
          sortable: true,
        },
        {
          name: "assignedTo",
          required: true,
          label: "Implemented by",
          align: "left",
          field: (row) => {
            return row.assignedTo == null
              ? "NA"
              : row.assignedTo.name + " | " + row.assignedTo.employeeID;
          },
          sortable: true,
        },
        {
          name: "deviceAddress",
          required: true,
          label: "Implemented Address",
          align: "left",
          field: (row) => {
            return row.deviceAddress;
          },
          sortable: true,
        },
        {
          name: "pincode",
          required: true,
          label: "Merchants Pincode",
          align: "left",
          field: (row) => {
            return row.leadInformation.pincode == null
              ? "NA"
              : row.leadInformation.pincode;
          },
          sortable: false,
        },
        {
          name: "city",
          required: true,
          label: "Merchants City Town",
          align: "left",
          field: (row) => {
            return row.leadInformation.city == null ? "NA" : row.leadInformation.city;
          },
          sortable: false,
        },
        {
          name: "mobileNumber",
          required: true,
          label: "Mobile Number",
          align: "center",
          field: (row) => {
            // row.leadInformation.contactNumber;
             return row.assignedTo == null ? "NA" : row.assignedTo.contactNumber;
          },
          sortable: false,
        },
        // {
        //   name: "remarks",
        //   required: true,
        //   label: "Remarks",
        //   align: "center",
        //   field: (row) => {
        //     return row.rescheduleRemarks == null
        //       ? "NA"
        //       : JSON.parse(row.rescheduleRemarks).remarks;
        //   },
        //   sortable: false,
        // },
        {
          name: "status",
          required: true,
          label: "Device Status",
          align: "center",
          field: "deviceStatus",
          sortable: false,
        },
        {
          name: "viewDocument",
          required: true,
          label: "Implementation Form",
          align: "center",
          field: "implementationForm",
          sortable: false,
        },
        {
          name: "pictureOfShop",
          required: true,
          label: "PictureOfShop",
          align: "center",
          field: "pictureOfShop",
          sortable: false,
        },
        {
          name: "cpvForm",
          required: true,
          label: "cpvForm",
          align: "center",
          field: "cpvForm",
          sortable: false,
        },
        // {
        //   name: "action",
        //   required: true,
        //   label: "Approve",
        //   align: "center",
        //   field: "action",
        //   sortable: false,
        // },
        // {
        //   name: "data",
        //   required: true,
        //   label: "Reject",
        //   align: "center",
        //   field: "data",
        //   sortable: false,
        // },
      ],
      loading: true,
      filter_values: "",
    };
  },
  computed: {
    ...mapGetters("MasterTracker", ["getMasterTrackerList"]),
    ...mapGetters("DocumentApprove", ["getDocumentApprove"]),
    ...mapGetters("equitasImplementedQueue", ["getbijdeactivelist"]),
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter,
      formData: this.formData,
    });
  },
  // created() {
  //   this.ajaxLoadAllLeadInfo({
  //     pagination: this.paginationControl,
  //     filter: this.filter,
  //     formData: this.formData,
  //   });
  // },
  methods: {
    ...mapActions("MasterTracker", ["MASTER_TRACKER_LIST"]),
    ...mapActions("DocumentApprove", ["DOCUMENT_APPROVE"]),
    ...mapActions("equitasImplementedQueue", ["BIJLIPAY_DEACTIVE_LIST"]),
    ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.BIJLIPAY_DEACTIVE_LIST()
        .then((response) => {
          this.toggleAjaxLoadFilter = false;
        })
        .catch((error) => {
          this.toggleAjaxLoadFilter = false;
        });
    },
    SubmitData(request) {
      this.formData1 = {
        fromDate: this.toTimestamp(request.fromDate.toString(), true),
        toDate: this.toTimestamp(request.toDate.toString(), false),
      };
       if(this.formData1.fromDate <= this.formData1.toDate){
       this.selectedRow = request;
       this.ajaxLoadAllLeadInfo({
        pagination: this.paginationControl,
        filter: this.filter,
        formData: this.formData1,
      });
       }
      else{
        this.$q.notify({
              color: "negative",
              position: "bottom",
              message:"TO Date must be greather than From Date",
              icon: "thumb_down",
            }); 
      }
    },
       DeleteData() {
      (this.formData.fromDate = ""),
        (this.formData.toDate = ""),
        (this.formData1.fromDate = ""),
        (this.formData1.toDate = ""),
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filter,
          formData: this.formData1,
        });
        this.selectedRow = null;
    },
   
    toTimestamp(strDate, isFromDate = true) {
     const date = strDate.split("T")[0];  
      const curDate = new Date();         
      let timeStr = "00:00:00"; 
      if (!isFromDate) {
       timeStr = "23:59:00";  
       }
      const formattedDate = `${date}T${timeStr}Z`;
      const datum = Date.parse(formattedDate);
      return datum;
    },
    financeApproveSubmit() {
      let usersSelectSync = {
        leadInformation: {
          data: this.getMasterTrackerList,
        },
      };

      this.DOCUMENT_APPROVE(usersSelectSync).then(() => {
        this.getMasterTrackerList();
        this.$q.notify("Successfully Approved");
      });
    },
    fnViewMultiAttachedFileImageUploadedBySat(attachedImageIndex) {
      this.$refs.multiAttachedImageViewerUploadedBySAT;
    },
    fnViewMultiAttachedFileImageUploadedByPictureShop(attachedImageIndex) {
      this.$refs.multiAttachedImageViewerUploadedByPictureShop.click();
    },
    fnViewMultiAttachedFileImageUploadedByCpvForm(attachedImageIndex) {
      this.$refs.multiAttachedImageViewerUploadedByCpvForm.click();
    },
    ajaxLoadAllLeadInfo({ pagination, filter, formData }) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.BIJLIPAY_DEACTIVE_LIST({
        pagination,
        filter: this.filter,
        formData: this.formData1,
      })
        .then((res) => {
          this.paginationControl = pagination;
          this.paginationControl.rowsNumber = this.getbijdeactivelist.totalElements;
          this.paginationControl.page = this.getbijdeactivelist.number + 1;
          this.tableData = this.getbijdeactivelist.content;
          if (this.getbijdeactivelist.sort != null) {
            this.paginationControl.sortBy = this.getbijdeactivelist.sort[0].property;
            this.paginationControl.descending = this.getbijdeactivelist.sort[0].ascending;
          }
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },
    fnPDFViewModal(documentUrl) {
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    },
  },
};
</script>

<style></style>
