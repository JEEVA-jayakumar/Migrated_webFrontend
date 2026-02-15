<template>
  <q-page>
    <div>
      <!--STARTv-model: table title -->
      <div class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">
        Bijlipay Implementation Verification Queue
      </div>
      <!--END: table title -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation v-if="propToggleLeadInformation" :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation" @closeLeadInformation="toggleLeadInformation" />
      <!-- content -->
      <!--START: table lead validation -->
      <q-table table-class="customTableClass" :rows="tableData" :columns="columns" :filter="filter"
        :pagination="paginationControl" row-key="name" :loading="toggleAjaxLoadFilter"
        :rows-per-page-options="[5, 10, 15, 20]" @request="ajaxLoadAllLeadInfo">
        <q-td v-slot:body-cell-tid="props" :props="props">
          <span class="label text-primary"># {{ props.row.tid }}</span>
        </q-td>
        <q-td v-slot:body-cell-mid="props" :props="props">
          <span class="label text-primary"># {{ props.row.mid }}</span>
        </q-td>
        <q-td v-slot:body-cell-leadNumber="props" :props="props" class="cursor-pointer"
          @click.native="toggleLeadInformation(props.row.leadInformation)">
          <span class="label text-primary"># {{ props.row.leadInformation.leadNumber }}</span>
        </q-td>
        <q-td v-slot:body-cell-LeadSource="props" :props="props">
          <span :class="{ 'text-red': props.row.leadInformation.leadSource.sourceName === 'LS_TOHANDS' }">
            {{ props.row.leadInformation.leadSource.sourceName }}
          </span>
        </q-td>
        <q-td v-slot:body-cell-mobileNumber="props" :props="props">{{
          props.row.assignedTo == null ? "NA" : props.row.assignedTo.contactNumber
          }}</q-td>
        <q-td v-slot:body-cell-leadAddress="props" :props="props">{{
          props.row.leadInformation == null
          ? "NA"
          : props.row.leadInformation.leadAddress
          }}</q-td>
        <q-td v-slot:body-cell-deviceStatusDate="props" :props="props">
          <span class="label">{{
            props.row.deviceStatusDate | moment("Do MMM Y")
            }}</span>
        </q-td>
        <q-td v-slot:body-cell-viewDocument="props" :props="props">

          <div v-if="
            props.row.implementationFormMimeType == null ||
            props.row.implementationFormMimeType.includes('application/pdf')
          " class="cursor-pointer">
            <div @click="fnPDFViewModal(props.row.implementationForm)">
              <q-icon name="fas fa-file-pdf" color="primary" />
              &nbsp;{{ props.row.implementationForm }}
            </div>

          </div>
          <div v-else-if="
            props.row.implementationFormMimeType == null ||
            props.row.implementationFormMimeType.includes('image/*')
          " class="cursor-pointer">
            <div @click="fnViewMultiAttachedFileImageUploadedBySat()">
              <viewer :img="[
                GLOBAL_FILE_FETCH_URL + '/' + props.row.implementationForm,
              ]">
                <img :src="[
                  GLOBAL_FILE_FETCH_URL + '/' + props.row.implementationForm,
                ]" style="max-width: 15%" />
              </viewer>
            </div>
          </div>
          <div v-else>NA Document</div>


        </q-td>
        <q-td v-slot:body-cell-pictureOfShop="props" :props="props">
          <div v-if="
            props.row.pictureOfShopMimeType == null ||
            props.row.pictureOfShopMimeType.includes('application/pdf')
          " class="cursor-pointer">
            <div @click="fnPDFViewModal(props.row.pictureOfShop)">
              <q-icon name="fas fa-file-pdf" color="primary" />
              &nbsp;{{ props.row.pictureOfShop }}
            </div>
          </div>
          <div v-else-if="
            props.row.pictureOfShopMimeType == null ||
            props.row.pictureOfShopMimeType.includes('image/*')
          " class="cursor-pointer">
            <div @click="
              fnViewMultiAttachedFileImageUploadedByPictureShop(
            
              )
            ">
              <viewer :img="[
                GLOBAL_FILE_FETCH_URL + '/' + props.row.pictureOfShop,
              ]">
                <img :src="[
                  GLOBAL_FILE_FETCH_URL + '/' + props.row.pictureOfShop,
                ]" style="max-width: 15%" />
              </viewer>



            </div>
          </div>
          <div v-else>NA Document</div>
        </q-td>
        <q-td v-slot:body-cell-cpvForm="props" :props="props">
          <div v-if="
            props.row.cpvFormMimeType == null ||
            props.row.cpvFormMimeType.includes('application/pdf')
          " class="cursor-pointer">
            <div @click="fnPDFViewModal(props.row.cpvForm)">
              <q-icon name="fas fa-file-pdf" color="primary" />
              &nbsp;{{ props.row.cpvForm }}
            </div>
          </div>
          <div v-else-if="
            props.row.cpvFormMimeType == null ||
            props.row.cpvFormMimeType.includes('image/*')
          " class="cursor-pointer">
            <div @click="
              fnViewMultiAttachedFileImageUploadedByCpvForm()
            ">
              <viewer :img="[
                GLOBAL_FILE_FETCH_URL + '/' + props.row.cpvForm,
              ]">
                <img :src="[
                  GLOBAL_FILE_FETCH_URL + '/' + props.row.cpvForm,
                ]" style="max-width: 15%" />
              </viewer>

            </div>
          </div>
          <div v-else>NA Document</div>
        </q-td>
        <q-td v-slot:body-cell-status="props" :props="props">
          <span class="label text-positive" v-if="props.row.deviceStatus == 6">Approved</span>
          <span class="label text-negative" v-else-if="props.row.deviceStatus == 7">Pending</span>
          <span class="label text-amber" v-else>NA</span>
        </q-td>
        <q-td v-slot:body-cell-action="props" :props="props">
          <div v-if="props.row.deviceStatus == 6">
            <q-btn disable dense no-caps no-wrap label="Already Approved" icon="block" size="md"
              @click="fnShowConvertToSat(props.row)"></q-btn>

          </div>
          <div v-else>
            <q-btn dense no-caps no-wrap label="Approve" icon="done" size="md" @click="fnShowConvertToSat(props.row)"
              color="green-5"></q-btn>
          </div>
        </q-td>
        <q-td v-slot:body-cell-data="props" :props="props">
          <div v-if="props.row.deviceStatus == 6">
            <q-btn disable dense no-caps no-wrap label="Reject" icon="block" size="md"
              @click="fnShowConvertToSat(props.row)"></q-btn>
          </div>
          <div v-else>
            <q-btn dense no-caps no-wrap label="Reject" icon="close" size="md" @click="fnShowConvertReject(props.row)"
              color="red-5"></q-btn>
          </div>
        </q-td>

        <template slot="top">
          <div class="col-5">
            <q-input clearable v-model="filter" separator color="grey-9" placeholder="Type.."
              float-label="Search by MID, TID, Merchant Name" class="q-mr-lg q-py-sm" />
          </div>
          <div class="col-2">
            <q-input class="q-mr-lg q-py-sm" v-model="formData.fromDate" :min="yesterday" :max="tomorrow"
              float-label="From Date" />
          </div>
          <div class="col-2">
            <q-input class="q-mr-lg q-py-sm" v-model="formData.toDate" :min="yesterday" :max="tomorrow"
              float-label="To Date" />
          </div>
          <div class="col-2">
            <q-btn align="right" color="purple-9" :disabled="
                formData.fromDate == '' ||
                formData.fromDate == null ||
                formData.toDate == '' ||
                formData.toDate == null
              " style="margin-right: 10px" @click="SubmitData(formData)">Submit</q-btn>
            <q-btn color="red" v-if="selectedRow" @click="DeleteData">
              <q-icon name="delete" />
            </q-btn>
          </div>
        </template>
      </q-table>
      <showMerchantTransactionLevelDetails v-if="valueToggleMerchantTransaction"
        :valueToggleMerchantTransaction="valueToggleMerchantTransaction" @revertRowClick="rowClick">
      </showMerchantTransactionLevelDetails>
    </div>
    <showPdfModalComponent v-if="toggleshowPDFModal" :propToggleshowPDFModal="toggleshowPDFModal"
      :propPDFDetails="PDFDetails" @togglePDFModal="fnPDFViewModal"></showPdfModalComponent>
    <viewDocumentApprove v-if="propShowConvertToSat" :propShowConvertToSat="propShowConvertToSat"
      :propRowDetails="propRowDetails" @emitfnshowConvertToSat="fnShowConvertToSat"></viewDocumentApprove>
    <viewDocumentReject v-if="propShowViewReject" :propShowViewReject="propShowViewReject"
      :propRowDetails="propRowDetails" @emitfnshowConvertToSat="fnShowConvertReject"></viewDocumentReject>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

import downloadExcel from "vue-json-excel";
import showMerchantTransactionLevelDetails from "../../components/sat/showMerchantTransactionLevelDetails.vue";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";
import openRejectModelComp from "../../components/finance/openRejectModelComp.vue";
import viewDocumentApprove from "../../components/sat/viewDocumentApprove.vue";
import viewDocumentReject from "../../components/sat/viewRejectDocument.vue";

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
    openRejectModelComp,
    viewDocumentApprove,
    viewDocumentReject,
  },

    data() {
      return {
        propToggleLeadInformation: false,
        addtnLeadInformation: null,
        toggleshowPDFModal: false,
        PDFDetails: "",
        propShowConvertToSat: false,
        propShowViewReject: false,
        // paginationControl: {
        //   rowsPerPage: 10
        // },
        toggleAjaxLoadFilter: false,
        paginationControl: {
          rowsNumber: 10,
          page: 1,
          // sortBy: "tid",
          sortBy: "deviceStatusDate",
          descending: false,
          // descending: desc,
          rowsPerPage: 10,
        },
        tableData: [],
        valueToggleMerchantTransaction: false,
        filter: "",
        tomorrow: addToDate(today, { days: 0 }),
        yesterday: subtractFromDate(today, { days: 720 }),
        formData: {
          fromDate: "",
          toDate: "",
        },
        formData1: {
          fromDate: "",
          toDate: "",
        },
        selectedRow: null,
        //table information
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
            name: "LeadSource",
            required: true,
            label: "Lead Source",
            align: "left",
            field: row => {
              return row.leadInformation.leadSource.sourceName;
            },
            sortable: true,
          },
          // {
          //   name: "leadName",
          //   required: true,
          //   label: "Merchant Name",
          //   align: "left",
          //   field: row => {
          //     row.leadInformation.leadName;
          //   },
          //   sortable: false
          // },
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
          // {
          //   name: "serialNumber",
          //   required: true,
          //   label: "Device Serial No",
          //   align: "left",
          //   field: row => {
          //     return row.serialNumber == null ? "NA" : row.serialNumber;
          //   },

          //   sortable: false
          // },
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
          // {
          //   name: "regionalInventory.serialNumber",
          //   required: true,
          //   label: "Device Serial Number",
          //   align: "left",
          //   field: (row) => {
          //     return row.regionalInventory == null
          //       ? "NA"
          //       : row.regionalInventory.serialNumber;
          //   },
          //   sortable: true,
          // },
          {
            name: "regionalInventory.serialNumber",
            required: true,
            label: "Device Serial Number",
            align: "left",
            field: (row) => {
              if (
                row.leadInformation &&
                row.leadInformation.leadSource &&
                row.leadInformation.leadSource.sourceName === "LS_TOHANDS"
              ) {
                return row.toHandsSerialNumber ? row.toHandsSerialNumber : "NA";
              }

              return row.regionalInventory && row.regionalInventory.serialNumber
                ? row.regionalInventory.serialNumber
                : "NA";
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
              return row.assignedTo == null ? "NA" : row.assignedTo.name + " | " + row.assignedTo.employeeID;
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
            label: "FSE Mobile Number",
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
          {
            name: "action",
            required: true,
            label: "Approve",
            align: "center",
            field: "action",
            sortable: false,
          },
          {
            name: "data",
            required: true,
            label: "Reject",
            align: "center",
            field: "data",
            sortable: false,
          },
        ],
        loading: true,
        filter_values: "",
      };
    },
    computed: {
      ...mapGetters("MasterTracker", ["getMasterTrackerList"]),
      ...mapGetters("DocumentApprove", ["getDocumentApprove"]),
      ...mapGetters("equitasImplementedQueue", ["getEquitasReport"]),
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
    //     filter: this.filter
    //   });
    // },
    methods: {
      ...mapActions("MasterTracker", ["MASTER_TRACKER_LIST"]),
      ...mapActions("DocumentApprove", ["DOCUMENT_APPROVE"]),
      ...mapActions("equitasImplementedQueue", ["EQUITAS_TRACKER_LIST"]),
      //Load all short lead info while page loading
      ajaxLoadAllLeadInfo() {
        this.toggleAjaxLoadFilter = true;
        this.EQUITAS_TRACKER_LIST()
          .then((response) => {
            this.toggleAjaxLoadFilter = false;
          })
          .catch((error) => {
            this.toggleAjaxLoadFilter = false;
          });
      },
      // toTimestamp(strDate) {
      //   var date = strDate.split("T")[0];
      //   var curDate = new Date();
      //   var mnth = curDate.getMonth() + 1;
      //   var chDate =
      //     curDate.getFullYear() +
      //     "-" +
      //     (mnth < 10 ? "0" + mnth : mnth) +
      //     "-" +
      //     curDate.getDate();
      //   var datum = null;
      //   if (chDate == date) datum = Date.now();
      //   else datum = Date.parse(strDate);
      //   return datum;
      // },
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

      SubmitData(request) {
        this.formData1 = {
          fromDate: this.toTimestamp(request.fromDate.toString(), true),
          toDate: this.toTimestamp(request.toDate.toString(), false),
        };
        if (this.formData1.fromDate <= this.formData1.toDate) {
          this.selectedRow = request;
          this.ajaxLoadAllLeadInfo({
            pagination: this.paginationControl,
            filter: this.filter,
            formData: this.formData1,
          });
        }
        else {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "TO Date must be greather than From Date",
            icon: "thumb_down",
          });
        }

        // this.selectedRow = request;
        // this.ajaxLoadAllLeadInfo({
        //   pagination: this.paginationControl,
        //   filter: this.filter,
        //   formData: this.formData1,
        // });
      },

      DeleteData() {
        console.log("deletedata");
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
        this.EQUITAS_TRACKER_LIST({ pagination, filter: this.filter, formData: this.formData1, })
          .then((res) => {
            this.paginationControl = pagination;
            this.paginationControl.rowsNumber = this.getEquitasReport.totalElements;
            this.paginationControl.page = this.getEquitasReport.number + 1;
            this.tableData = this.getEquitasReport.content;
            if (this.getEquitasReport.sort != null) {
              this.paginationControl.sortBy = this.getEquitasReport.sort[0].property;
              this.paginationControl.descending = this.getEquitasReport.sort[0].ascending;
            }
            this.$q.loading.hide();
          })
          .catch((error) => {
            // this.tableData = [];

            //  if (error.status == 400) {
            //   this.$q.notify({
            //     color: "amber",
            //     position: "bottom",
            //     message: "Output file size is high,Select smaller date range",
            //     icon: "thumb_down",
            //   });
            // } else if (error.status == 500) {
            //   this.$q.notify({
            //     color: "amber",
            //     position: "bottom",
            //     message:
            //       "INTERNAL_SERVER_ERROR",
            //     icon: "thumb_down",
            //   });
            // } else if (error.status == 403) {
            //   this.$q.notify({
            //     color: "amber",
            //     position: "bottom",
            //     message: "please choose some another date",
            //     icon: "thumb_down",
            //   });
            // } else if (error.status == 404) {
            //   this.$q.notify({
            //     color: "amber",
            //     position: "bottom",
            //     message: "please choose some another date",
            //     icon: "thumb_down",
            //   });
            // } else {
            //   this.$q.notify({
            //     color: "amber",
            //     position: "bottom",
            //     message: "Please select the field",
            //     icon: "thumb_down",
            //   });
            // }

            // (this.formData.fromDate = ""), (this.formData.toDate = "");
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
      fnPDFViewModal(documentUrl) {

        this.PDFDetails = documentUrl;
        this.toggleshowPDFModal = !this.toggleshowPDFModal;
      },
      fnShowConvertToSat(rowDetails) {
        this.propShowConvertToSat = !this.propShowConvertToSat;
        if (rowDetails != undefined) {
          this.propRowDetails = rowDetails;
        }
      },
      fnShowConvertReject(rowDetails) {
        this.propShowViewReject = !this.propShowViewReject;
        if (rowDetails != undefined) {
          this.propRowDetails = rowDetails;
        }
      },
    },
  };
</script>

<style>

</style>
