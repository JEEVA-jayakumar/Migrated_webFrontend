<template>
  <q-page>
    <div>
      <q-tabs
        v-model="activeTab"
        class="shadow-1"
        color="grey-1"
        @select="goToCompleteTab"
      >
        <q-tab
          default
          color="dark"
          name="tab-1"
          slot="title"
          label="Pending Tickets"
        />
        <q-tab
          color="dark"
          name="tab-2"
          slot="title"
          label="Completed Tickets"
        />
        <q-tab color="dark" name="tab-3" slot="title" label="RTO Tickets" />
        <q-tab-panel name="tab-1">
          <div class="row items-center">
            <div class="col">
              <strong>
                Open For
              </strong>
            </div>
            <q-select
              class="col"
              v-model.trim="formData.date"
              :options="dateType"
              color="grey"
              @input="dateClick"
            >
            </q-select>

            <div class="col-5"></div>
            <q-input
              class="col-5"
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              float-label="Search By Ticket No, Merchant No..."
            />
          </div>
          <q-table
            table-class="customTableClass"
            class="q-py-none"
            :rows="tableData"
            :columns="columns"
            :filter="filter"
            :rows-per-page-options="[5, 10, 15]"
            :pagination="paginationControl"
            :loading="toggleAjaxLoadFilter"
            @request="ajaxLoadAllLeadInfo"
          >
            <q-td v-slot:body-cell-action1="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn
                  dense
                  no-caps
                  no-wrap
                  label="Scan"
                  icon="mdi-scanner"
                  size="md"
                  @click="toggleScanner(props.row)"
                  flat
                  class="text-green"
                >
                </q-btn>
              </div>
            </q-td>
            <q-td v-slot:body-cell-action="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn
                  dense
                  no-caps
                  no-wrap
                  label="print"
                  icon="print"
                  size="md"
                  @click="generatePdf(props.row)"
                  flat
                  class="text-blue"
                >
                </q-btn>
              </div>
            </q-td>
            <q-td v-slot:body-cell-action2="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn
                  dense
                  no-caps
                  no-wrap
                  label="Submit"
                  size="md"
                  @click="sumbit(props.row)"
                  flat
                  style="background-color: #61116a; color: white;"
                >
                </q-btn>
              </div>
            </q-td>
            <q-td
              v-slot:body-cell-createdDate="props"
              :props="props"
              >{{
                props.row == null
                  ? "NA"
                  : props.row.createdDate | moment("Do MMM Y")
              }}</q-td
            >
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="tab-2">
          <div class="row">
            <q-input
              class="col-4"
              clearable
              color="grey-9"
              v-model="filter1"
              placeholder="Type.."
              float-label="Search By Ticket No, Merchant No..."
            />
          </div>
          <q-table
            table-class="customTableClass"
            class="q-py-none"
            :rows="tableData1"
            :columns="columns2"
            :filter="filter1"
            :rows-per-page-options="[5, 10, 15]"
            :pagination="paginationControl1"
            :loading="toggleAjaxLoadFilter1"
            @request="ajaxLoadAllLeadInfo1"
          >
            <q-td
              v-slot:body-cell-createdDate="props"
              :props="props"
              >{{
                props.row == null
                  ? "NA"
                  : props.row.createdDate | moment("Do MMM Y")
              }}</q-td
            >
            <q-td
              v-slot:body-cell-updatedDate="props"
              :props="props"
              >{{
                props.row == null
                  ? "NA"
                  : props.row.updatedDate | moment("Do MMM Y")
              }}</q-td
            >
            <q-td v-slot:body-cell-action3="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn
                  dense
                  no-caps
                  no-wrap
                  label="Mark RTO"
                  size="md"
                  @click="MarkRto(props.row)"
                  flat
                  style="background-color: #61116a; color: white;"
                >
                </q-btn>
              </div>
            </q-td>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="tab-3">
          <div class="row">
            <q-input
              class="col-4"
              clearable
              color="grey-9"
              v-model="filter2"
              placeholder="Type.."
              float-label="Search By Ticket No, Merchant No..."
            />
          </div>
          <q-table
            table-class="customTableClass"
            class="q-py-none"
            :rows="tableData2"
            :columns="columns3"
            :filter="filter2"
            :rows-per-page-options="[5, 10, 15]"
            :pagination="paginationControl2"
            :loading="toggleAjaxLoadFilter2"
            @request="ajaxLoadAllLeadInfo2"
          >
            <q-td
              v-slot:body-cell-createdDate="props"
              :props="props"
              >{{
                props.row == null
                  ? "NA"
                  : props.row.createdDate | moment("Do MMM Y")
              }}</q-td
            >
            <q-td
              v-slot:body-cell-updatedDate="props"
              :props="props"
              >{{
                props.row == null
                  ? "NA"
                  : props.row.updatedDate | moment("Do MMM Y")
              }}</q-td
            >
            <q-td
              v-slot:body-cell-rtoCreatedDate="props"
              :props="props"
              >{{
                props.row == null
                  ? "NA"
                  : props.row.rtoCreatedDate | moment("Do MMM Y")
              }}</q-td
            >
          </q-table>
        </q-tab-panel>
      </q-tabs>
    </div>
    <phonepePaperRollScan
      v-if="propToggleScan"
      :scanInfo="addBasicInformation"
      :propToggleScannerPop="propToggleScan"
      @reloadPhonepePendingDetails="
        loadingData({
          pagination: paginationControl,
          filter: filter,
          date: formData.date
        })
      "
      @closeScannerInfo="toggleScanner"
    />
    <div
      v-if="
        toggleAjaxLoadFilter || toggleAjaxLoadFilter1 || toggleAjaxLoadFilter2
      "
      class="fullscreen spinner-overlay"
    >
      <q-spinner-bars
        class="absolute-center"
        style="color:#61116a"
        :size="35"
      />
    </div>
  </q-page>
</template>
<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import phonepePaperRollScan from "../../components/inventory/phonepePaperRollScan.vue";

export default {
  name: "phonepePaperRoll",
  components: {
    phonepePaperRollScan
  },
  data() {
    return {
      propToggleScan: false,
      propToggleEscalateToSat: false,
      proptoggleTicketResolve: false,
      propToggleViewRemarks: false,
      escalateToSatInfo: "",
      resolveInfo: "",
      addBasicInformation: {
        data: null,
        action: 0
      },
      scannerInformation: {
        data: null
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
        sortBy: "serviceRequest.createdDate",
        descending: false,
        rowsPerPage: 5
      },
      paginationControl1: {
        rowsNumber: 5,
        page: 1,
        sortBy: "serviceRequest.createdDate",
        descending: false,
        rowsPerPage: 5
      },
      paginationControl2: {
        rowsNumber: 5,
        page: 1,
        sortBy: "serviceRequest.rtoCreatedDate",
        descending: false,
        rowsPerPage: 5
      },
      formData: {
        date: 0
      },
      //table information
      tableAjaxLoading: false,
      dateType: [
        {
          label: "Today",
          value: 0
        },
        {
          label: "T+1",
          value: 1
        },
        {
          label: "T+2",
          value: 2
        },
        {
          label: "All",
          value: 3
        }
      ],

      columns: [
        {
          name: "serviceReqTicketId",
          required: true,
          label: "Ticket No",
          align: "left",
          field: row => {
            return row.serviceReqTicketId;
          }
          // sortable: true
        },
        {
          name: "merchantName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.meName;
          },
          sortable: false
        },
        {
          name: "emailId",
          required: true,
          label: "Merchant Email",
          align: "left",
          field: row => {
            return row.emailId;
          },
          sortable: false
        },
        {
          name: "address",
          required: true,
          label: "Merchant Address",
          align: "left",
          field: row => {
            return row.address;
          },
          sortable: false
        },
        {
          name: "contactNumber",
          required: true,
          label: "Merchant No",
          align: "left",
          field: row => {
            return row.contactNumber;
          },
          sortable: false
        },
        {
          name: "createdDate",
          required: true,
          label: "Created Date",
          align: "left",
          field: "createdDate",
          sortable: true
        },
        {
          name: "count",
          required: true,
          label: "Count",
          align: "left",
          field: row => {
            return row.subTicketsList[0].paperRollCount;
          }
          // sortable: true
        },
        {
          name: "podNumber",
          required: true,
          label: "POD Number",
          align: "left",
          field: row => {
            return row.podNumber;
          }
          // sortable: true
        },
        {
          name: "action",
          required: true,
          label: "Print",
          align: "left",
          field: "action",
          sortable: false
        },
        {
          name: "action1",
          required: true,
          label: "Scan",
          align: "left",
          field: "action1",
          sortable: false
        },
        {
          name: "action2",
          required: true,
          label: "Submit",
          align: "left",
          field: "action2",
          sortable: false
        }
      ],
      columns2: [
        {
          name: "serviceReqTicketId",
          required: true,
          label: "Ticket No",
          align: "left",
          field: row => {
            return row.serviceReqTicketId;
          },
          sortable: false
        },
        {
          name: "merchantName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.meName;
          },
          sortable: false
        },
        {
          name: "emailId",
          required: true,
          label: "Merchant Email",
          align: "left",
          field: row => {
            return row.emailId;
          },
          sortable: false
        },
        {
          name: "contactNumber",
          required: true,
          label: "Merchant Number",
          align: "left",
          field: row => {
            return row.contactNumber;
          },
          sortable: false
        },
        {
          name: "address",
          required: true,
          label: "Merchant Address",
          align: "left",
          field: row => {
            return row.address;
          },
          sortable: false
        },
        {
          name: "count",
          required: true,
          label: "Count",
          align: "left",
          field: row => {
            return row.subTicketsList[0].paperRollCount;
          },
          sortable: false
        },
        {
          name: "podNumber",
          required: true,
          label: "POD Number",
          align: "left",
          field: row => {
            return row.podNumber;
          },
          sortable: false
        },
        {
          name: "createdDate",
          required: true,
          label: "Open Date ",
          align: "left",
          field: "createdDate",
          sortable: true
        },
        {
          name: "updatedDate",
          required: true,
          label: "Closed Date",
          align: "left",
          field: "updatedDate",
          sortable: false
        },
        {
          name: "action3",
          required: true,
          label: "Mark RTO",
          align: "left",
          field: "action3",
          sortable: false
        }
      ],
      columns3: [
        {
          name: "serviceReqTicketId",
          required: true,
          label: "Ticket No",
          align: "left",
          field: row => {
            return row.serviceReqTicketId;
          },
          sortable: false
        },
        {
          name: "merchantName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.meName;
          },
          sortable: false
        },
        {
          name: "emailId",
          required: true,
          label: "Merchant Email",
          align: "left",
          field: row => {
            return row.emailId;
          },
          sortable: false
        },
        {
          name: "contactNumber",
          required: true,
          label: "Merchant Number",
          align: "left",
          field: row => {
            return row.contactNumber;
          },
          sortable: false
        },
        {
          name: "address",
          required: true,
          label: "Merchant Address",
          align: "left",
          field: row => {
            return row.address;
          },
          sortable: false
        },
        {
          name: "count",
          required: true,
          label: "Count",
          align: "left",
          field: row => {
            return row.subTicketsList[0].paperRollCount;
          },
          sortable: false
        },
        {
          name: "podNumber",
          required: true,
          label: "POD Number",
          align: "left",
          field: row => {
            return row.podNumber;
          },
          sortable: false
        },
        {
          name: "createdDate",
          required: true,
          label: "Open Date ",
          align: "left",
          field: "createdDate",
          sortable: false
        },
        {
          name: "updatedDate",
          required: true,
          label: "Closed Date",
          align: "left",
          field: "updatedDate",
          sortable: false
        },
        {
          name: "rtoCreatedDate",
          required: true,
          label: "Date marked as RTO",
          align: "left",
          field: "rtoCreatedDate",
          sortable: true
        }
      ],
      tableData: [],
      tableData1: [],
      tableData2: [],
      loading: true,
      filterRoles: [],
      dataArray: [],
      completedDataArray: [],
      rtoTicketDataArray: [],
      error: true,
      warning: false
    };
  },

  computed: {
    ...mapGetters("phonePeCrm", [
      "getPhonepeMerchantDetails",
      "getphonepeCompletedPaperRoll",
      "getphonepeDate",
      "getphonepePaperRoll",
      "getphonepeCompletedPaperRoll",
      "getphonepeRtoTicket"
    ])
  },

  mounted() {
    console.log("DATA : --- : ", this.getPhonepeMerchantDetails);
    //     this.ajaxLoadAllLeadInfo1({
    //       pagination: this.paginationControl1,
    //       filter: this.filter1
    //     });
  },
  created() {
    this.loadingData({
      pagination: this.paginationControl,
      filter: this.filter,
      date: this.formData.date
    });
  },
  methods: {
    ...mapActions("phonePeCrm", [
      "FETCH_PHONEPE_PAPER_ROLL_COMPLETED_DATA",
      "PHONEPE_PAPER_ROLL_PENDING",
      "FETCH_PHONEPE_PAPER_ROLL_COMPLETED_DATA",
      "FETCH_PHONEPE_RTO_TICKET",
      "PHONEPE_PAPER_ROLL_SUBMIT",
      "MARK_RTO"
    ]),
    ...mapActions("InventoryCentral", ["PHONEPE_PAPER_ROLL_PDF"]),

    // ajaxLoadAllLeadInfo() {
    //   console.log("loading Data with out request---------->",this.paginationControl);
    //   this.loadingData({
    //     pagination: this.paginationControl,
    //     filter: this.filter,
    //     date: this.formData.date
    //   });
    // },

    ajaxLoadAllLeadInfo(request) {
      console.log("loading Data with request ----------->: ", request);
      let req = {
        pagination: request.pagination,
        filter: request.filter,
        date: this.formData.date
      };
      this.loadingData(req);
    },

    loadingData(request) {
      console.log("CRM DATE ------>", JSON.stringify(request));
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.PHONEPE_PAPER_ROLL_PENDING(request)
        .then(response => {
          //   console.log("Req pagination : ---- :", request.pagination);
          this.paginationControl = request.pagination;
          this.paginationControl.rowsNumber = this.getphonepePaperRoll.totalElements;
          this.paginationControl.page = this.getphonepePaperRoll.number + 1;
          const paperRollData = this.getphonepePaperRoll.content;
          // this.tableData = this.getphonepePaperRoll.content;
          paperRollData.forEach(item => {
            if (item != null) {
              console.log("PAPER ROLL DATA", JSON.stringify(item));
              this.dataArray.push(item);
            }
          });
          this.tableData = [];
          this.tableData = this.dataArray;
          this.dataArray = [];
          if (this.getphonepePaperRoll.sort != null) {
            this.paginationControl.sortBy = this.getphonepePaperRoll.sort[0].property;
            this.paginationControl.descending = this.getphonepePaperRoll.sort[0].ascending;
          }
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    dateClick(request) {
      this.addBasicInformation.action = request;
      this.loadingData({
        pagination: this.paginationControl,
        filter: this.filter,
        date: request
      });
    },

    // fnResolve(request) {
    //   this.proptoggleTicketResolve = !this.proptoggleTicketResolve;
    //   this.resolveInfo = request;
    //   if (this.proptoggleTicketResolve == false) {
    //     this.ajaxLoadAllLeadInfo({
    //       pagination: this.paginationControl,
    //       filter: this.filter
    //     });
    //   }
    // this.$q
    //     .dialog({
    //         title: "Confirm",
    //         message: "Are you sure ?",
    //         ok: "Yes",
    //         cancel: "Cancel",
    //     })
    //     .then(() => {
    //         let ticketId = {
    //             ticketId: request.serviceReqTicketId,
    //             pagination: this.paginationControl,
    //             filter: this.filter,
    //         }
    //         this.ASSIGN_TO_COMPLETE(ticketId)
    //             .then(response => {
    //                 this.$q.notify({
    //                     color: "positive",
    //                     position: "bottom",
    //                     message: "Successfully Resolved!",
    //                     icon: "thumb_up",
    //                 });
    //                 this.loadingData({
    //                 pagination: this.paginationControl,
    //                 filter: this.filter,
    //                 date: this.addBasicInformation.action,
    //             });
    //             })

    //     })
    //     .catch(() => {
    //         this.$q.notify({
    //             color: "negative",
    //             position: "bottom",
    //             message: "No changes made!",
    //             icon: "thumb_down",
    //         });
    //     });
    // },

    goToCompleteTab(tab) {
      if (tab == "tab-2") {
        this.ajaxLoadAllLeadInfo1({
          pagination: this.paginationControl1,
          filter: this.filter1
        });
        let request = {
          pagination: this.paginationControl1,
          filter: this.filter1
        };
        this.FETCH_PHONEPE_PAPER_ROLL_COMPLETED_DATA(request)
          .then(response => {
            this.toggleAjaxLoadFilter1 = false;
          })
          .catch(error => {
            this.toggleAjaxLoadFilter1 = false;
          });
      } else if (tab == "tab-3") {
        this.ajaxLoadAllLeadInfo2({
          pagination: this.paginationControl2,
          filter: this.filter2
        });
        let request = {
          pagination: this.paginationControl2,
          filter: this.filter2
        };
        this.FETCH_PHONEPE_RTO_TICKET(request)
          .then(response => {
            this.toggleAjaxLoadFilter2 = false;
          })
          .catch(error => {
            this.toggleAjaxLoadFilter2 = false;
          });
      } else {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filter
        });
      }
    },

    ajaxLoadAllLeadInfo1() {
      this.toggleAjaxLoadFilter1 = true;
      this.FETCH_PHONEPE_PAPER_ROLL_COMPLETED_DATA()
        .then(response => {
          this.toggleAjaxLoadFilter1 = false;
        })
        .catch(error => {
          this.toggleAjaxLoadFilter1 = false;
        });
    },

    ajaxLoadAllLeadInfo1({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_PHONEPE_PAPER_ROLL_COMPLETED_DATA({ pagination, filter })
        .then(res => {
          this.paginationControl1 = pagination;
          this.paginationControl1.rowsNumber = this.getphonepeCompletedPaperRoll.totalElements;
          this.paginationControl1.page =
            this.getphonepeCompletedPaperRoll.number + 1;
          const paperRollCompletedData = this.getphonepeCompletedPaperRoll
            .content;
          // this.tableData = this.getphonepePaperRoll.content;
          paperRollCompletedData.forEach(item => {
            if (item != null) {
              this.completedDataArray.push(item);
            }
          });
          this.tableData = [];
          this.tableData1 = this.completedDataArray;
          this.completedDataArray = [];
          // this.tableData1 = this.getphonepeCompletedPaperRoll.content;
          console.log("COMPLETE RES", JSON.stringify(this.tableData1));
          if (this.getphonepeCompletedPaperRoll.sort != null) {
            this.paginationControl1.sortBy = this.getphonepeCompletedPaperRoll.sort[0].property;
            this.paginationControl1.descending = this.getphonepeCompletedPaperRoll.sort[0].ascending;
          }
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    ajaxLoadAllLeadInfo2() {
      this.toggleAjaxLoadFilter2 = true;
      this.FETCH_PHONEPE_RTO_TICKET()
        .then(response => {
          this.toggleAjaxLoadFilter2 = false;
        })
        .catch(error => {
          this.toggleAjaxLoadFilter2 = false;
        });
    },
    ajaxLoadAllLeadInfo2({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_PHONEPE_RTO_TICKET({ pagination, filter })
        .then(res => {
          this.paginationControl2 = pagination;
          this.paginationControl2.rowsNumber = this.getphonepeRtoTicket.totalElements;
          this.paginationControl2.page = this.getphonepeRtoTicket.number + 1;
          const rtoMovedTicket = this.getphonepeRtoTicket.content;
          // this.tableData = this.getphonepePaperRoll.content;
          rtoMovedTicket.forEach(item => {
            if (item != null) {
              this.rtoTicketDataArray.push(item);
            }
          });
          this.tableData = [];
          this.tableData2 = this.rtoTicketDataArray;
          this.rtoTicketDataArray = [];
          // this.tableData1 = this.getphonepeCompletedPaperRoll.content;
          console.log("COMPLETE RES", JSON.stringify(this.tableData1));
          if (this.getphonepeRtoTicket.sort != null) {
            this.paginationControl2.sortBy = this.getphonepeRtoTicket.sort[0].property;
            this.paginationControl2.descending = this.getphonepeRtoTicket.sort[0].ascending;
          }
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();
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
    },

    toggleScanner(info) {
      this.propToggleScan = !this.propToggleScan;
      if (info != undefined) {
        this.addBasicInformation.data = info;
        this.addBasicInformation.action = this.formData.date;
      }
    },

    generatePdf(request) {
      console.log("CRM DATE ------>", JSON.stringify(request));
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.PHONEPE_PAPER_ROLL_PDF(request.serviceReqTicketId)
        .then(response => {
          console.log("RSPONSE", response);
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    sumbit(request) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure ?",
          ok: "Yes",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 0,
            spinnerColor: "purple-9",
            message: "Fetching data .."
          });
          console.log("REQUEST", request.serviceReqTicketId);
          this.PHONEPE_PAPER_ROLL_SUBMIT(request.serviceReqTicketId).then(
            response => {
              console.log("RSPONSE", response.body.message);
              //
              if (response.body.data != null) {
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: response.body.message,
                  icon: "thumb_up"
                });
              } else {
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: response.body.message,
                  icon: "thumb_down"
                });
              }
              let req = {
                pagination: this.paginationControl,
                filter: this.filter,
                date: this.formData.date
              };
              this.ajaxLoadAllLeadInfo(req);
              this.$q.loading.hide();
            }
          );
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    MarkRto(request) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.MARK_RTO(request.serviceReqTicketId)
        .then(response => {
          let request = {
            pagination: this.paginationControl1,
            filter: this.filter1
          };
          this.ajaxLoadAllLeadInfo1(request);
          this.$q.loading.hide();
        })

        .catch(error => {
          this.$q.loading.hide();
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
</script>
<style>
.customTabActive {
  background: purple;
  color: #fff;
}
</style>
