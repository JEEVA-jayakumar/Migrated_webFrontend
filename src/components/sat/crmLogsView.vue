<template>
  <q-page>
    <q-modal
      minimized
      no-backdrop-dismiss
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitCrmLogsMerchantName(toggleModel)"
      @escape-key="emitCrmLogsMerchantName(toggleModel)"
      :content-css="{ padding: '25px', minWidth: '50vw' }"
    >
      <div
        class="row items-center justify-between q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >
        <div class="col-auto q-title">CRM LOGS_Merchant Name</div>
        <q-btn
          flat
          color="red"
          round
          size="md"
          icon="close"
          @click="emitCrmLogsMerchantName(toggleModel)"
        ></q-btn>
      </div>
      <q-table
        table-class="customTableClass"
        class="q-py-none"
        :data="crmLogs"
        :columns="columns"
        row-key="name"
      >
        <q-td slot="body-cell-attemptno" slot-scope="props" :props="props">{{
          props.row.orderId == null ? "NA" : props.row.orderId
        }}</q-td>

        <q-td slot="body-cell-dateandtime" slot-scope="props" :props="props">
          {{ formatDateTime(props.row.inputDate) }}
        </q-td>
      </q-table>
    </q-modal>
  </q-page>
</template>

<script>
/* START >> Modal components Lead source, device, merchant type */
import { request } from "http";
import {
  required,
  requiredIf,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

import moment from "moment";
export default {
  props: ["propShowUpdateCrmLogsView", "propRowDetails"],
  name: "MDRdetails",
  data() {
    return {
      /* START >> Modal props */
      filter: "",
      crmLogs: [],
      formData: {
        subTicketsId: this.propRowDetails.subTicketsList[0].id
      },
      paginationControl: {
        rowsNumber: 5,
        page: 1,
        descending: false,
        rowsPerPage: 5
      },
      tableData: this.propRowDetails.vpaList,
      toggleModel: this.propShowUpdateCrmLogsView,
      columns: [
        {
          name: "attemptno",
          required: true,
          label: "Attempt No",
          align: "left",
          field: row => {
            return row.orderId == null ? "NA" : row.orderId;
          },
          sortable: false
        },
        {
          name: "dateandtime",
          required: true,
          label: "Date & Time",
          align: "left",
          field: "inputDate",
          sortable: false
        },
        {
          name: "crmlogs",
          required: true,
          label: "CRM Logs",
          align: "left",
          field: row => {
            return row.remarks == null ? "NA" : row.remarks;
          },
          sortable: false
        }
      ]
    };
  },
  beforeMount() {
    console.log(
      "propRowDetails_ID_subTicketsList ------->",
      JSON.stringify(this.propRowDetails.subTicketsList[0].id)
    );
    this.crmLogsList();
  },
  computed: {
    ...mapGetters("serviceRequestPhonepeSat", ["getcrmLogsLists"])
  },
  methods: {
    ...mapActions("SuperAdminUsers", [
      "FEED_EXISTING_PERMISSION_DATA",
      "FETCH_ALL_PERMISSIONS_DATA"
    ]),
    ...mapActions("serviceRequestPhonepeSat", ["CRM_LOGS_LISTS"]),

    formatDateTime(inputDate) {
      if (!inputDate) {
        return "NA";
      }
      return moment
        .utc(inputDate)
        .local()
        .format("Do MMM YYYY, h:mm A");
    },

    crmLogsList() {
      this.CRM_LOGS_LISTS(this.formData)
        .then(response => {
          this.getcrmLogsLists.forEach((item, index) => {
            item.orderId = index + 1; // Assign orderId starting from 1
          });
          console.log("TESTING JSON", JSON.stringify(this.getcrmLogsLists));

          this.crmLogs = this.getcrmLogsLists;
          console.log("CRM_LOGS_LISTS ------->", JSON.stringify(this.crmLogs));
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    // Emit functions
    emitCrmLogsMerchantName(toggleModel) {
      this.$emit("emitfnshowUpdateOpenedExternal", toggleModel);
    }
  }
};
</script>
