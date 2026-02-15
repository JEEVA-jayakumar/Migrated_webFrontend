<template>
  <q-page>
    <div>
      <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >
        SAT - Service Verification
      </div>
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
        <q-td v-slot:body-cell-createdDate="props" :props="props">
          <span class="label">{{ props.row.createdDate | moment("Do MMM Y") }}</span>
        </q-td>
        <q-td v-slot:body-cell-tid="props" :props="props">
          <span class="label text-primary"># {{ props.row.serviceRequestData.tid }}</span>
        </q-td>
        <q-td v-slot:body-cell-ticketid="props" :props="props">
          <span class="label text-primary"
            ># {{ props.row.serviceRequestData.serviceReqTicketId }}</span
          >
        </q-td>
        <q-td v-slot:body-cell-statusReport="props" :props="props">{{
          props.row.serviceRequestType.name
        }}</q-td>

        <q-td v-slot:body-cell-merchantname="props" :props="props">{{
          props.row.serviceRequestData.meName
        }}</q-td>
        <q-td v-slot:body-cell-merchantaddress="props" :props="props">{{
          props.row.serviceRequestData.address
        }}</q-td>
        <q-td v-slot:body-cell-typeofvisit="props" :props="props">{{
          props.row.resolutionType
        }}</q-td>
        <!-- <q-td v-slot:body-cell-user="props" :props="props">{{
          props.row.id
        }}</q-td> -->
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
        <q-td v-slot:body-cell-closedate="props" :props="props">
          <span class="label">{{ props.row.updatedDate | moment("Do MMM Y") }}</span>
        </q-td>

        <q-td v-slot:body-cell-status="props" :props="props">
          <span
            class="label text-positive"
            v-if="
              props.row.serviceRequestSubTicketStatus.id == 92 ||
              props.row.serviceRequestSubTicketStatus.id == 98 ||
              props.row.serviceRequestSubTicketStatus.id == 88 ||
              props.row.serviceRequestSubTicketStatus.id == 94 ||
              props.row.serviceRequestSubTicketStatus.id == 89
            "
            >Approved</span
          >
          <span
            class="label text-negative"
            v-else-if="
              props.row.serviceRequestSubTicketStatus.id == 87 && props.row.reject == true
            "
            >Rejected</span
          >
          <span class="label text-amber" v-else>Pending</span>
        </q-td>
        <q-td v-slot:body-cell-device="props" :props="props">
          {{ props.row.serviceRequestData.deviceType }}
        </q-td>
        <q-td v-slot:body-cell-action="props" :props="props">
          <q-btn
            :disabled="props.row.serviceRequestSubTicketStatus.id == 102 "
            no-caps
            no-wrap
            label="Approve"
            icon="done"
            size="md"
            @click="fnshowservice(props.row)"
            color="green-7"
          ></q-btn>
        </q-td>
        <q-td v-slot:body-cell-data="props" :props="props">
          <q-btn
            :disabled="props.row.serviceRequestSubTicketStatus.id == 102 "
            no-caps
            no-wrap
            label="Reject"
            icon="close"
            size="md"
            @click="fnShowConvertReject(props.row)"
            color="red-5"
          ></q-btn>
        </q-td>

        <template slot="top">
          <div class="col-5">
            <q-input
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Search by  TID,Ticket ID, Merchant Name"
              class="q-mr-lg q-py-sm"
            />
          </div>
        </template>
      </q-table>
    </div>
    <showPdfModalComponent
      v-if="toggleshowPDFModal"
      :propToggleshowPDFModal="toggleshowPDFModal"
      :propPDFDetails="PDFDetails"
      @togglePDFModal="fnPDFViewModal"
    ></showPdfModalComponent>
    <viewticketApprove
      v-if="propShowTicketApprove"
      :propShowTicketApprove="propShowTicketApprove"
      :propRowDetails="propRowDetails"
      @emitfnshowservice="fnshowservice"
    ></viewticketApprove>
    <viewticketReject
      v-if="propShowTicketReject"
      :propShowTicketReject="propShowTicketReject"
      :propRowDetails="propRowDetails"
      @emitfnshowservice="fnShowConvertReject"
    ></viewticketReject>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";
import viewticketApprove from "src/components/sat/viewticketApprove.vue";
import viewticketReject from "src/components/sat/viewticketReject.vue";

export default {
  name: "merchantTransactionLevel",

  components: {
    showPdfModalComponent,
    viewticketApprove,
    viewticketReject,
  },

  data() {
    return {
      toggleshowPDFModal: false,
      PDFDetails: "",
      propShowTicketApprove: false,
      propShowTicketReject: false,
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "createdDate",
        descending: false,
        rowsPerPage: 10,
      },
      tableData: [],
      filter: "",
      columns: [
        {
          name: "createdDate",
          required: true,
          label: "Created Date",
          align: "left",
          field: "createdDate",
          sortable: true,
        },
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: (row) => {
            return row.serviceRequestData.tid == null ? "NA" : row.serviceRequestData.tid;
          },
          sortable: false,
        },
        {
          name: "ticketid",
          required: true,
          label: "Ticket ID",
          align: "left",
          field: (row) => {
            return row.serviceRequestData.serviceReqTicketId == null
              ? "NA"
              : row.serviceRequestData.serviceReqTicketId;
          },
          sortable: false,
        },
        {
          name: "statusReport",
          required: true,
          label: "Status Reported",
          align: "left",
          field: (row) => {
            return row.serviceRequestType.name == null
              ? "NA"
              : row.serviceRequestType.name;
          },
          sortable: false,
        },
        {
          name: "merchantname",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: (row) => {
            return row.serviceRequestData.meName;
          },
          sortable: false,
        },
         {
          name: "assignedTo",
          required: true,
          label: "Implemented by",
          align: "left",
          field: (row) => {
             return row.serviceRequestData.assignedTo == null
              ? "NA"
              : row.serviceRequestData.assignedTo.name + " | " + row.serviceRequestData.assignedTo.employeeID;
          },
          sortable: false,
        },
         {
          name: "mobileNumber",
          required: true,
          label: "FSE Mobile Number",
          align: "left",
          field: (row) => {
            // return row.serviceRequestData.contactNumber;
            return row.serviceRequestData.assignedTo == null
              ? "NA"
              : row.serviceRequestData.assignedTo.contactNumber;
          },
          sortable: false,
        },
        {
          name: "merchantaddress",
          required: true,
          label: "Merchant Address",
          align: "left",
          field: (row) => {
            return row.serviceRequestData.address;
          },
          sortable: false,
        },

        {
          name: "typeofvisit",
          required: true,
          label: "Type Of Visit",
          align: "left",
          field: (row) => {
            return row.resolutionType;
          },
          sortable: false,
        },
        // {
        //   name: "user",
        //   required: true,
        //   label: "Sat User",
        //   align: "left",
        //   field: "id",
        //   sortable: true,
        // },
        {
          name: "viewDocument",
          required: true,
          label: "Implementation Form",
          align: "left",
          field: (row) => {
            return row.implementationForm == null ? "NA" : row.implementationForm;
          },
          sortable: false,
        },
        {
          name: "pictureOfShop",
          required: true,
          label: "Picture of the Shop",
          align: "left",
          field: (row) => {
            return row.pictureOfShop == null ? "NA" : row.pictureOfShop;
          },
          sortable: false,
        },
        {
          name: "closedate",
          required: true,
          label: "Close Date",
          align: "left",
          field: "updatedDate",
          sortable: false,
        },
        {
          name: "status",
          required: true,
          label: "Status",
          align: "center",
          field: "id",
          sortable: false,
        },
        {
          name: "device",
          required: true,
          label: "Device Type",
          align: "left",
          field: (row) => {
            return row.serviceRequestData.deviceType == null
              ? "NA"
              : row.serviceRequestData.deviceType;
          },
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
    };
  },
  computed: {
    ...mapGetters("equitasImplementedQueue", ["getserviceticketlist"]),
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter,
    });
  },

  methods: {
    ...mapActions("equitasImplementedQueue", ["SERVICE_TICKET_LIST"]),
    ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.SERVICE_TICKET_LIST()
        .then((response) => {
          this.tableData = this.getserviceticketlist;
          this.toggleAjaxLoadFilter = false;
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message:
              error.body.message == null
                ? "Please Try Again Later !"
                : error.body.message,
            icon: "thumb_down",
          });
          this.$q.loading.hide();
          this.toggleAjaxLoadFilter = false;
        });
    },
    fnViewMultiAttachedFileImageUploadedBySat(attachedImageIndex) {
      this.$refs.multiAttachedImageViewerUploadedBySAT;
    },
    fnViewMultiAttachedFileImageUploadedByPictureShop(attachedImageIndex) {
      this.$refs.multiAttachedImageViewerUploadedByPictureShop.click();
    },
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.SERVICE_TICKET_LIST({ pagination, filter })
        .then((res) => {
          this.paginationControl = pagination;
          this.paginationControl.rowsNumber = this.getserviceticketlist.totalElements;
          this.paginationControl.page = this.getserviceticketlist.number + 1;
          this.tableData = this.getserviceticketlist.content;
          if (this.getserviceticketlist.sort != null) {
            this.paginationControl.sortBy = this.getserviceticketlist.sort[0].property;
            this.paginationControl.descending = this.getserviceticketlist.sort[0].ascending;
          }
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message:
              error.body.message == null
                ? "Please Try Again Later !"
                : error.body.message,
            icon: "thumb_down",
          });
          this.$q.loading.hide();
        });
    },

    fnPDFViewModal(documentUrl) {
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    },

    fnshowservice(rowDetails) {
      this.propShowTicketApprove = !this.propShowTicketApprove;
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    fnShowConvertReject(rowDetails) {
      this.propShowTicketReject = !this.propShowTicketReject;
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
  },
};
</script>

<style></style>
