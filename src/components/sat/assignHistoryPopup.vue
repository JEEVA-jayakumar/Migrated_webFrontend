<template>
  <q-page>
    <q-dialog
      minimized
      no-backdrop-dismiss
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitAssignHistoryList(toggleModel)"
      @escape-key="emitAssignHistoryList(toggleModel)"
      :content-css="{ padding: '25px', minWidth: '50vw' }"
    >
      <div
        class="row items-center justify-between q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >
        <div class="col-auto text-h6">Reassign History</div>
        <q-btn
          flat
          color="red"
          round
          size="md"
          icon="close"
          @click="emitAssignHistoryList(toggleModel)"
        ></q-btn>
      </div>
      <q-table
        table-class="customTableClass"
        class="q-py-none"
        :rows="assignHistoryRemarks"
        :columns="columns"
        row-key="name"
      >
        <q-td v-slot:body-cell-date="props" :props="props">
          {{ props.row.createdAt | moment("Do MMM Y") }}</q-td
        >
        <q-td v-slot:body-cell-agentname="props" :props="props">{{
          props.row.soUser.name == null ? "NA" : props.row.soUser.name
        }}</q-td>
        <!-- <q-td v-slot:body-cell-remarks="props" :props="props">{{
            props.row.reAssignRemark == null ? "NA" : props.row.reAssignRemark
          }}</q-td> -->
      </q-table>
    </q-dialog>
  </q-page>
</template>

<script>
/* START >> Modal components Lead source, device, merchant type */
import {
  required,
  requiredIf,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowUpdateAssignHistoryPopup", "propRowDetails"],
  name: "MDRdetails",
  data() {
    return {
      /* START >> Modal props */
      filter: "",
      assignHistoryRemarks: [],
      formData: {
        Id: this.propRowDetails.id
      },
      paginationControl: {
        rowsNumber: 5,
        page: 1,
        descending: false,
        rowsPerPage: 5
      },
      tableData: this.propRowDetails.vpaList,
      toggleModel: this.propShowUpdateAssignHistoryPopup,
      columns: [
        {
          name: "date",
          required: true,
          label: "Date",
          align: "left",
          field: "createdAt",
          sortable: false
        },
        {
          name: "agentname",
          required: true,
          label: "Agent Name",
          align: "left",
          field: row => {
            return row.soUser.name == null ? "NA" : row.soUser.name;
          },
          sortable: false
        },
        {
          name: "remarks",
          required: true,
          label: "Remarks",
          align: "left",
          field: row => {
            return row.remarks != null
              ? row.remarks
              : "NA";
          },
          sortable: false
        }
      ]
    };
  },
  beforeMount() {
    console.log(
      "propRowDetails_DATA_ID ------->",
      JSON.stringify(this.propRowDetails.id)
    );
    // console.log(
    //   "formData ------->",
    //   JSON.stringify(this.formData.subTicketsId)
    // );
    this.assignHistoryList();
  },
  computed: {
    ...mapGetters("serviceRequestPhonepeSat", ["getassignHistoryLists"])
  },
  methods: {
    ...mapActions("SuperAdminUsers", [
      "FEED_EXISTING_PERMISSION_DATA",
      "FETCH_ALL_PERMISSIONS_DATA"
    ]),
    ...mapActions("serviceRequestPhonepeSat", ["ASSIGN_HISTORY_REMARKS_LIST"]),

    assignHistoryList() {
      this.ASSIGN_HISTORY_REMARKS_LIST(this.formData)
        .then(response => {
          this.assignHistoryRemarks = this.getassignHistoryLists;
          console.log(
            "ASSIGN_HISTORY_REMARKS_LIST ------->",
            JSON.stringify(this.assignHistoryRemarks)
          );
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    // Emit functions
    emitAssignHistoryList(toggleModel) {
      this.$emit("emitfnshowUpdateOpenedExternal", toggleModel);
    }
  }
};
</script>
