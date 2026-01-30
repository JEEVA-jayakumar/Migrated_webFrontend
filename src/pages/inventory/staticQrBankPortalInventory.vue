<template>
  <q-page>
    <div>
      <q-tabs
        v-model="activeTab"
        class="shadow-1"
        color="grey-1"
        @select="goToCompleteTab"
      >
        <q-tab default color="dark" name="tab-1" slot="title" label="New Requests" />
        <q-tab color="dark" name="tab-2" slot="title" label="Courier" />
        <q-tab color="dark" name="tab-3" slot="title" label="Failure Onboarding" />
        <q-tab-pane name="tab-1">
          <div class="row items-center">
            <q-search
              class="col-5"
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              float-label="Search LeadNo, ContactName, LegalName, MerchantNumber..."
            />
          </div>
          <q-table
            table-class="customTableClass"
            class="q-py-none"
            :data="tableData"
            :columns="columns"
            :filter="filter"
            :rows-per-page-options="[50, 100, 150, 200]"
            :pagination.sync="paginationControl"
            :loading="toggleAjaxLoadFilter"
            @request="ajaxLoadAllLeadInfo"
          >
            <q-td slot="body-cell-actionScanQR" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn
                  :disable="props.row.isScanQrEnabled"
                  dense
                  no-caps
                  no-wrap
                  icon="fa fa-qrcode"
                  label="Scan QR"
                  size="md"
                  @click="toggleScanner(props.row)"
                  flat
                  class="text-green"
                >
                </q-btn>
              </div>
            </q-td>
            <q-td slot="body-cell-actionScanSoundbox" slot-scope="props" :props="props">
              <div v-if="props.row.soundBox == true" class="row no-wrap no-padding">
                <q-btn
                  :disable="props.row.isScanSoundboxEnabled"
                  dense
                  no-caps
                  no-wrap
                  label="Scan Soundbox"
                  size="md"
                  @click="toggleScannerBox(props.row)"
                  flat
                  icon="mdi-scanner"
                  class="text-orange"
                >
                </q-btn>
              </div>
            </q-td>
            <q-td slot="body-cell-actionPrint" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn
                  :disabled="
                    props.row.leadAction == 0 ||
                    props.row.leadAction == 1 ||
                    props.row.leadAction == 2 ||
                    props.row.leadAction == 4
                  "
                  dense
                  no-caps
                  no-wrap
                  label="Print"
                  size="md"
                  icon="print"
                  @click="generatePdf(props.row)"
                  flat
                  class="text-blue"
                >
                </q-btn>
              </div>
            </q-td>
            <q-td slot="body-cell-actionSubmit" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn
                  :disabled="
                    props.row.leadAction == 0 ||
                    props.row.leadAction == 1 ||
                    props.row.leadAction == 2 ||
                    props.row.leadAction == 4
                  "
                  highlight
                  push
                  color="purple"
                  size="sm"
                  @click="newRequestSumbit(props.row)"
                  >Submit</q-btn
                >
              </div>
            </q-td>
          </q-table>
        </q-tab-pane>
        <q-tab-pane name="tab-2">
          <q-table
            table-class="customTableClass"
            class="q-py-none"
            :data="tableData1"
            :columns="columns2"
            :filter="filter1"
            :rows-per-page-options="[5, 10, 15, 20]"
            :pagination.sync="paginationControl1"
            :loading="toggleAjaxLoadFilter1"
            @request="ajaxLoadAllLeadInfo1"
          >
            <q-td slot="body-cell-merchantName" slot-scope="props" :props="props">
              <template v-if="props.row.pod == true">
                {{ props.row.podNumber }}
              </template>
              <template v-else>
                <q-input
                  float-label="Enter POD Number"
                  placeholder="Enter POD Number"
                  v-model="props.row.podNumber"
                  dense
                />
              </template>
            </q-td>
            <q-td slot="body-cell-actionPodNumber" slot-scope="props" :props="props">
              <div v-if="props.row.pod == false" class="row no-wrap no-padding">
                <q-btn
                  highlight
                  :disable="props.row.podNumber == '' || props.row.podNumber == null"
                  push
                  color="purple"
                  size="sm"
                  @click="courierSumbit(props.row)"
                  >Submit</q-btn
                >
              </div>
            </q-td>
          </q-table>
        </q-tab-pane>

        <q-tab-pane name="tab-3">
          <q-table
            table-class="customTableClass"
            class="q-py-none"
            :data="tableData2"
            :columns="columns3"
            :filter="filter2"
            :rows-per-page-options="[5, 10, 15, 20]"
            :pagination.sync="paginationControl2"
            :loading="toggleAjaxLoadFilter2"
            @request="ajaxLoadAllLeadInfo2"
          >
            <q-td slot="body-cell-actionReSubmit" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn
                  highlight
                  push
                  color="purple"
                  size="sm"
                  @click="ReferBackSumbit(props.row)"
                  >RE-Submit</q-btn
                >
              </div>
            </q-td>
          </q-table>
        </q-tab-pane>
      </q-tabs>
    </div>
    <ScanStaticInventory
      v-if="propToggleScan"
      :scanInfo="addBasicInformation"
      :propToggleScannerPop="propToggleScan"
      @reloadPhonepePendingDetails="
        loadingData({
          pagination: paginationControl,
          filter: filter,
          // date: formData.date
        })
      "
      @closeScannerInfo="toggleScanner"
    />
    <soundBoxStaticInventory
      v-if="propToggleSoundbox"
      :scanInfo="addBasicInformation"
      :propToggleScannerSoundPop="propToggleSoundbox"
      @reloadPhonepePendingDetails1="
        loadingData({
          pagination: paginationControl,
          filter: filter,
          // date: formData.date
        })
      "
      @closeScannerSoundInfo="toggleScannerBox"
    />
    <div
      v-if="toggleAjaxLoadFilter || toggleAjaxLoadFilter1 || toggleAjaxLoadFilter2"
      class="fullscreen spinner-overlay"
    >
      <q-spinner-bars class="absolute-center" style="color: #61116a" :size="35" />
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ScanStaticInventory from "../../components/inventory/ScanStaticInventory.vue";
import soundBoxStaticInventory from "../../components/inventory/soundBoxStaticInventory.vue";

export default {
  name: "staticQrBankPortalInventory",
  components: {
    ScanStaticInventory,
    soundBoxStaticInventory,
  },
  data() {
    return {
      propToggleScan: false,
      propToggleSoundbox: false,
      propToggleEscalateToSat: false,
      proptoggleTicketResolve: false,
      propToggleViewRemarks: false,
      escalateToSatInfo: "",
      resolveInfo: "",
      value1: "-1",
      // isInputDisabled: false,
      addBasicInformation: {
        data: null,
        action: 0,
      },
      scannerInformation: {
        data: null,
      },
      toggleAjaxLoadFilter: false,
      toggleAjaxLoadFilter1: false,
      toggleAjaxLoadFilter2: false,
      activeItemId: 0,
      activeTab: "tab-1",
      filter: "",
      filter1: "",
      filter2: "",
      paginationControl: {
        rowsNumber: 5,
        page: 1,
        sortBy: "createdAt",
        descending: false,
        rowsPerPage: 50,
      },
      paginationControl1: {
        rowsNumber: 5,
        page: 1,
        sortBy: "createdAt",
        descending: false,
        rowsPerPage: 5,
      },
      paginationControl2: {
        rowsNumber: 5,
        page: 1,
        sortBy: "createdAt",
        descending: false,
        rowsPerPage: 5,
      },
      tableAjaxLoading: false,
      columns: [
        {
          name: "qrLeadNumber",
          required: true,
          label: "Lead No",
          align: "left",
          field: (row) => {
            return row.qrLeadNumber == null || row.qrLeadNumber === ""
              ? "NA"
              : row.qrLeadNumber;
          },
        },
        {
          name: "merchantName",
          required: true,
          label: "Merchant Contact Name",
          align: "left",
          field: (row) => {
            return row.merchantName == null || row.merchantName === ""
              ? "NA"
              : row.merchantName;
          },
          sortable: false,
        },
        {
          name: "legalName",
          required: true,
          label: "Merchant Legal Name",
          align: "left",
          field: (row) => {
            return row.legalName == null || row.legalName === "" ? "NA" : row.legalName;
          },
          sortable: false,
        },
        {
          name: "contactAddress",
          required: true,
          label: "Merchant Address",
          align: "left",
          field: (row) => {
            return row.contactAddress == null || row.contactAddress === ""
              ? "NA"
              : row.contactAddress;
          },
          sortable: false,
        },
        {
          name: "city",
          required: true,
          label: "City",
          align: "left",
          field: (row) => {
            return row.city == null || row.city === "" ? "NA" : row.city;
          },
        },
        {
          name: "pincode",
          required: true,
          label: "Pincode",
          align: "left",
          field: (row) => {
            return row.pincode == null || row.pincode === "" ? "NA" : row.pincode;
          },
        },
        {
          name: "contactNumber",
          required: true,
          label: "Merchant Phone Number",
          align: "left",
          field: (row) => {
            return row.contactNumber == null || row.contactNumber === ""
              ? "NA"
              : row.contactNumber;
          },
          sortable: false,
        },
        {
          name: "status",
          required: true,
          label: "Merchant Request",
          align: "left",
          field: (row) => {
            if (row.soundBox == false) {
              return "SQR";
            } else if (row.soundBox == true) {
              return "SQR + SOUNDBOX";
            }
          },
          sortable: false,
        },
        {
          name: "actionScanQR",
          required: true,
          label: "",
          align: "left",
          field: "actionScanQR",
          sortable: false,
        },
        {
          name: "actionScanSoundbox",
          required: true,
          label: "",
          align: "left",
          field: "actionScanSoundbox",
          sortable: false,
        },
        {
          name: "actionPrint",
          required: true,
          label: "",
          align: "left",
          field: "actionPrint",
          sortable: false,
        },
        {
          name: "actionSubmit",
          required: true,
          label: "",
          align: "left",
          field: "actionSubmit",
          sortable: false,
        },
      ],
      columns2: [
        {
          name: "legalName",
          required: true,
          label: "Merchant Legal Name",
          align: "left",
          field: (row) => {
            return row.legalName;
          },
          sortable: false,
        },
        {
          name: "merchantName",
          required: true,
          label: "POD Number",
          align: "left",
          field: (row) => row.podNumber,
          sortable: false,
        },
        {
          name: "actionPodNumber",
          required: true,
          label: "",
          align: "left",
          field: "actionPodNumber",
          sortable: false,
        },
      ],
      columns3: [
        {
          name: "qrLeadNumber",
          required: true,
          label: "Lead No",
          align: "left",
          field: (row) => {
            return row.qrLeadNumber == null ? "NA" : row.qrLeadNumber;
          },
        },
        {
          name: "merchantName",
          required: true,
          label: "Merchant Contact Name",
          align: "left",
          field: (row) => {
            return row.merchantName == null ? "NA" : row.merchantName;
          },
          sortable: false,
        },
        {
          name: "legalName",
          required: true,
          label: "Merchant Legal Name",
          align: "left",
          field: (row) => {
            return row.legalName == null ? "NA" : row.legalName;
          },
          sortable: false,
        },
        {
          name: "contactAddress",
          required: true,
          label: "Merchant Address",
          align: "left",
          field: (row) => {
            return row.contactAddress == null ? "NA" : row.contactAddress;
          },
          sortable: false,
        },
        {
          name: "city",
          required: true,
          label: "City",
          align: "left",
          field: (row) => {
            return row.city == null ? "NA" : row.city;
          },
        },
        {
          name: "pincode",
          required: true,
          label: "Pincode",
          align: "left",
          field: (row) => {
            return row.pincode == null ? "NA" : row.pincode;
          },
        },
        {
          name: "contactNumber",
          required: true,
          label: "Merchant Phone Number",
          align: "left",
          field: (row) => {
            return row.contactNumber == null ? "NA" : row.contactNumber;
          },
          sortable: false,
        },
        {
          name: "actionReSubmit",
          required: true,
          label: "",
          align: "left",
          field: "actionReSubmit",
          sortable: false,
        },
      ],
      tableData: [],
      tableData1: [],
      tableData2: [],
      loading: true,
      filterRoles: [],
      newRequestdataArray: [],
      courierDataArray: [],
      referBackDataArray: [],
      error: true,
      warning: false,
    };
  },

  computed: {
    ...mapGetters("phonePeCrm", [
      "getPhonepeMerchantDetails",
      "getphonepeDate",
      "getstaticNewRequestsLead",
      "getstaticReferBackLead",
      "getstaticCourierLead",
      "getphonepeCompletedPaperRoll",
    ]),
  },

  mounted() {},
  created() {
    this.loadingData({
      pagination: this.paginationControl,
      filter: this.filter,
    });
  },
  methods: {
    ...mapActions("phonePeCrm", [
      "FETCH_PHONEPE_PAPER_ROLL_COMPLETED_DATA",
      "FETCH_STATIC_QR_NEW_REQUESTS",
      "FETCH_STATIC_QR_REFER_BACK_REQUESTS",
      "FETCH_STATIC_QR_COURIER_REQUESTS",
      "FETCH_PHONEPE_PAPER_ROLL_COMPLETED_DATA",
      "PHONEPE_PAPER_ROLL_SUBMIT",
      "REFERBACK_RESUMBIT_LEAD",
      "COURIER_POD_NUMBER_LEAD",
      "SUBMIT_STATIC_QR_NEW_REQUESTS",
    ]),
    ...mapActions("InventoryCentral", ["PRINT_MERCHANT_DETAILS"]),

    ajaxLoadAllLeadInfo(request) {
      let req = {
        pagination: request.pagination,
        filter: request.filter,
      };
      this.loadingData(req);
    },

    goToCompleteTab(tab) {
      if (tab == "tab-2") {
        this.ajaxLoadAllLeadInfo1({
          pagination: this.paginationControl1,
          filter: this.filter1,
        });
        // let request = {
        //   pagination: this.paginationControl1,
        //   filter: this.filter1
        // };
        // this.FETCH_PHONEPE_PAPER_ROLL_COMPLETED_DATA(request)
        //   .then(response => {
        //     this.toggleAjaxLoadFilter1 = false;
        //   })
        //   .catch(error => {
        //     this.toggleAjaxLoadFilter1 = false;
        //   });
      } else if (tab == "tab-3") {
        this.ajaxLoadAllLeadInfo2({
          pagination: this.paginationControl2,
          filter: this.filter2,
        });
        // let request = {
        //   pagination: this.paginationControl2,
        //   filter: this.filter2
        // };
        // this.FETCH_STATIC_QR_REFER_BACK_REQUESTS(request)
        //   .then(response => {
        //     this.toggleAjaxLoadFilter2 = false;
        //   })
        //   .catch(error => {
        //     this.toggleAjaxLoadFilter2 = false;
        //   });
      } else {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filter,
        });
      }
    },

    // ajaxLoadAllLeadInfo1() {
    //   this.toggleAjaxLoadFilter1 = true;
    //   this.FETCH_PHONEPE_PAPER_ROLL_COMPLETED_DATA()
    //     .then(response => {
    //       this.toggleAjaxLoadFilter1 = false;
    //     })
    //     .catch(error => {
    //       this.toggleAjaxLoadFilter1 = false;
    //     });
    // },
    ajaxLoadAllLeadInfo1({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.FETCH_STATIC_QR_COURIER_REQUESTS({ pagination, filter })
        .then((res) => {
          this.paginationControl1 = pagination;
          this.paginationControl1.rowsNumber = this.getstaticCourierLead.totalElements;
          this.paginationControl1.page = this.getstaticCourierLead.number + 1;
          this.tableData1 = this.getstaticCourierLead.content;
          //   courierData.forEach(item => {
          //   if (item != null) {
          //     this.courierDataArray.push(item);
          //   }
          // });
          // this.tableData1 = [];
          // this.tableData1 = this.courierDataArray;
          // this.courierDataArray = [];
          // console.log("COMPLETE RES", JSON.stringify(this.tableData1));
          if (this.getstaticCourierLead.sort != null) {
            this.paginationControl1.sortBy = this.getstaticCourierLead.sort[0].property;
            this.paginationControl1.descending = this.getstaticCourierLead.sort[0].ascending;
          }
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    // ajaxLoadAllLeadInfo2() {
    //   this.toggleAjaxLoadFilter2 = true;
    //   this.FETCH_STATIC_QR_REFER_BACK_REQUESTS()
    //     .then(response => {
    //       this.toggleAjaxLoadFilter2 = false;
    //     })
    //     .catch(error => {
    //       this.toggleAjaxLoadFilter2 = false;
    //     });
    // },
    ajaxLoadAllLeadInfo2({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.FETCH_STATIC_QR_REFER_BACK_REQUESTS({ pagination, filter })
        .then((res) => {
          this.paginationControl2 = pagination;
          this.paginationControl2.rowsNumber = this.getstaticReferBackLead.totalElements;
          this.paginationControl2.page = this.getstaticReferBackLead.number + 1;
          this.tableData2 = this.getstaticReferBackLead.content;
          // referBackData.forEach(item => {
          //   if (item != null) {
          //     this.referBackDataArray.push(item);
          //   }
          // });
          // this.tableData2 = [];
          // this.tableData2 = this.referBackDataArray;
          // this.referBackDataArray = [];
          if (this.getstaticReferBackLead.sort != null) {
            this.paginationControl2.sortBy = this.getstaticReferBackLead.sort[0].property;
            this.paginationControl2.descending = this.getstaticReferBackLead.sort[0].ascending;
          }
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    toggleScanner(row) {
      this.propToggleScan = !this.propToggleScan;
      if (row !== undefined && this.propToggleScan == true) {
        this.addBasicInformation.data = row;
        if (row.leadAction === 0) {
          row.leadAction = 1;
        } else if (row.leadAction === 1) {
          row.leadAction = 2;
        } else if (row.leadAction === 2) {
          row.leadAction = 5;
        } else {
          row.leadAction = 0;
        }
        this.tableData = [...this.tableData];

        this.updateButtonStates();
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filter,
        });
      } else if (row !== undefined && this.propToggleScan == false) {
        if (this.addBasicInformation.data.id == row.id) {
          const result = {};
          this.value1 = row.id;
          this.tableData.forEach((row) => {
            if (row.id == this.value1) {
              row.isScanQrEnabled = false;
            } else {
              row.isScanQrEnabled = true;
            }
          });
          this.updateButtonStates();
        }
      }
    },
    updateButtonStates() {
      const isScanning = this.tableData.some((row) => row.leadAction === 1);
      this.soundboxenable({
        pagination: this.paginationControl,
        filter: this.filter,
      });
    },
    soundboxenable(request) {
      let req = {
        pagination: request.pagination,
        filter: request.filter,
      };
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.FETCH_STATIC_QR_NEW_REQUESTS(req)
        .then((response) => {
          this.paginationControl = request.pagination;
          this.paginationControl.rowsNumber = this.getstaticNewRequestsLead.totalElements;
          this.paginationControl.page = this.getstaticNewRequestsLead.number + 1;
          this.tableData = this.getstaticNewRequestsLead.content;
          if (this.getstaticNewRequestsLead.sort != null) {
            this.paginationControl.sortBy = this.getstaticNewRequestsLead.sort[0].property;
            this.paginationControl.descending = this.getstaticNewRequestsLead.sort[0].ascending;
          }

          this.tableData.forEach((row) => {
            if (row.leadAction == 1 && row.id == this.value1) {
              row.isScanQrEnabled = true;
              row.isScanSoundboxEnabled = false;
            } else if (
              (row.leadAction == 0 ||
                row.leadAction == 2 ||
                row.leadAction == 5 ||
                row.leadAction == 4) &&
              row.id != this.value1
            ) {
              row.isScanQrEnabled = true;
              row.isScanSoundboxEnabled = true;
            } else {
              row.isScanQrEnabled = true;
              row.isScanSoundboxEnabled = true;
            }
          });
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    loadingData(request) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.FETCH_STATIC_QR_NEW_REQUESTS(request)
        .then((response) => {
          this.paginationControl = request.pagination;
          this.paginationControl.rowsNumber = this.getstaticNewRequestsLead.totalElements;
          this.paginationControl.page = this.getstaticNewRequestsLead.number + 1;
          this.tableData = this.getstaticNewRequestsLead.content;
          if (this.getstaticNewRequestsLead.sort != null) {
            this.paginationControl.sortBy = this.getstaticNewRequestsLead.sort[0].property;
            this.paginationControl.descending = this.getstaticNewRequestsLead.sort[0].ascending;
          }
          this.tableData.forEach((row) => {
            if (row.leadAction == 1 || row.leadAction == 2 || row.leadAction == 3) {
              row.isScanQrEnabled = true;
            } else {
              row.isScanQrEnabled = false;
              row.isScanSoundboxEnabled = true;
            }
            // console.log("row data------------>", row);
            // console.log(
            //   "row data   row.isScanQrEnabled ------------>",
            //   row.isScanQrEnabled
            // );
            // console.log(
            //   "row data isScanSoundboxEnabled------------>",
            //   row.isScanSoundboxEnabled
            // );
          });
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    toggleScannerBox(row) {
      this.propToggleSoundbox = !this.propToggleSoundbox;
      if (row !== undefined) {
        this.addBasicInformation.data = row;
      }
      this.ajaxLoadAllLeadInfo({
        pagination: this.paginationControl,
        filter: this.filter,
      });
    },

    generatePdf(request) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.PRINT_MERCHANT_DETAILS(request.id)
        .then((response) => {
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    // newRequestSumbit(request) {
    //   this.$q
    //     .dialog({
    //       title: "Confirm",
    //       message: "Are you sure ?",
    //       ok: "Yes",
    //       cancel: "Cancel"
    //     })
    //     .then(() => {
    //       this.$q.loading.show({
    //         delay: 0,
    //         spinnerColor: "purple-9",
    //         message: "Fetching data .."
    //       });
    //       // console.log("REQUEST", request.serviceReqTicketId);
    //       this.PHONEPE_PAPER_ROLL_SUBMIT(request.serviceReqTicketId).then(
    //         response => {
    //           console.log("RSPONSE", response.body.message);
    //           //
    //           if (response.body.data != null) {
    //             this.$q.notify({
    //               color: "positive",
    //               position: "bottom",
    //               message: response.body.message,
    //               icon: "thumb_up"
    //             });
    //           } else {
    //             this.$q.notify({
    //               color: "negative",
    //               position: "bottom",
    //               message: response.body.message,
    //               icon: "thumb_down"
    //             });
    //           }
    //           let req = {
    //             pagination: this.paginationControl,
    //             filter: this.filter
    //           };
    //           this.ajaxLoadAllLeadInfo(req);
    //           this.$q.loading.hide();
    //         }
    //       );
    //     })
    //     .catch(() => {
    //       this.$q.loading.hide();
    //     });
    // },

    newRequestSumbit(request) {
      let param = {
        id: request.id,
      };
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.SUBMIT_STATIC_QR_NEW_REQUESTS(param)
        .then((response) => {
          this.ajaxLoadAllLeadInfo({
            pagination: this.paginationControl,
            filter: this.filter,
          });
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Courier Successfully!",
            icon: "thumb_up",
          });
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Error in Updating Courier!",
            icon: "thumb_down",
          });
          this.$q.loading.hide();
        });
    },

    courierSumbit(request) {
      let param = {
        data1: {
          id: request.id,
        },
        formsList: {
          id: request.id,
          podNumber: request.podNumber,
        },
      };
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.COURIER_POD_NUMBER_LEAD(param)
        .then((response) => {
          this.ajaxLoadAllLeadInfo1({
            pagination: this.paginationControl1,
            filter: this.filter1,
          });
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Courier Successfully!",
            icon: "thumb_up",
          });
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            // message: "Error in Updating Courier!",
            message:
              error.body.message == null
                ? "Please Try Again Later !"
                : error.body.message,
            icon: "thumb_down",
          });
          this.$q.loading.hide();
        });
    },

    ReferBackSumbit(request) {
      let param = {
        id: request.id,
      };
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.REFERBACK_RESUMBIT_LEAD(param)
        .then((response) => {
          this.ajaxLoadAllLeadInfo2({
            pagination: this.paginationControl2,
            filter: this.filter2,
          });
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully Re-Sumbitted!",
            icon: "thumb_up",
          });
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Error in Updating Re-Sumbit!",
            icon: "thumb_down",
          });
          this.$q.loading.hide();
        });
    },
  },
};
</script>
<style>
.customTabActive {
  background: purple;
  color: #fff;
}
</style>
