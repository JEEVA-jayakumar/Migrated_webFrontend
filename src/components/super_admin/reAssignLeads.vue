<template>
  <q-dialog
    maximized
    no-backdrop-dismiss
    no-esc-dismiss
    v-model="toggleModal"
    :content-css="{padding:'50px 5px'}"
  >
    <!-- <pre>{{propRowDetails}}</pre> -->
    <div>
      <!-- <pre>{{addtnLeadInformation}}</pre> -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :propLeadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <!--START: table title -->
      <div class="row items-center q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">
        <div class="col text-h6">Lead Details</div>
        <div class="col-auto">
          <q-btn size="sm" round @click="emitToggleRemarks" outline color="dark" icon="clear" />
        </div>
      </div>
      <!--END: table title -->
      <!--START: table lead validation -->
      <q-table
        title="Lead Validation"
        table-class="customTableClass"
        class="q-py-none"
        :rows="tableData"
        :columns="columns"
        selection="multiple"
        :selected="formData.deletedSoLeadIds"
        v-model:filter="filter"
        :pagination="paginationControl"
        row-key="id"
      >
        <!--START: table body modification -->
        <q-td
          v-slot:body-cell-createdAt="props"
          :props="props"
        >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td>
        <q-td
          v-slot:body-cell-lead_id="props"
          :props="props"
          class="cursor-pointer"
          @click.native="toggleLeadInformation(props.row)"
        >
          <span
            class="label"
            :class="[props.row.priority?'text-negative text-weight-bolder':'text-primary']"
          ># {{props.row.leadNumber}}</span>
        </q-td>

        <q-td v-slot:body-cell-merchantName="props" :props="props">
          <span class="capitalize">{{props.row.leadName}}</span>
        </q-td>

        <q-td v-slot:body-cell-state="props" :props="props">
          <span class="capitalize">{{props.row.state}}</span>
        </q-td>
        <q-td v-slot:body-cell-finance_approval="props" :props="props">
          <span
            class="label text-positive"
            v-if="props.row.verifiedFinanceStatus== $VERIFIED_FINANCE_STATUS_SUCCESS"
          >Approved</span>
          <span
            class="label text-negative"
            v-else-if="props.row.verifiedFinanceStatus== $VERIFIED_FINANCE_STATUS_PENDING"
          >Pending</span>
          <span
            class="label text-negative"
            v-else-if="props.row.verifiedFinanceStatus== $VERIFIED_FINANCE_STATUS_REJECT"
          >Rejected</span>
          <span class="label" v-else>NA</span>
        </q-td>
        <!-- END: table body modification -->
        <template v-slot:top="props" class="bottom-border">
          <!--START: table filter,search -->
          <div class="col-12 col-lg-6">
            <q-input
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              float-label="Search by SO name, Merchant Name, Lead ID"
              class="q-ma-xs"
            />
          </div>
          <div class="col-12 col-lg-4">
            <q-select
              placeholder="Select .."
              v-model="formData.reassignToNewSo"
              float-label="Choose a user from below"
              :options="dropDown.regionwiseUsers"
              class="q-ma-xs"
            />
          </div>
          <div class="col-12 col-lg-auto" align="right">
            <q-btn icon="check" color="positive" class="q-ma-xs" label="Assign" @click="fnAssign" />
          </div>
          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->
    </div>
  </q-dialog>
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import generalLeadInformation from "../generalLeadInformation.vue";
export default {
  name: "leadValidation",
  props: ["propRowDetails", "propToggleModal"],
  components: {
    generalLeadInformation
  },
  data() {
    return {
      toggleModal: this.propToggleModal,
      propToggleLeadInformation: false,
      addtnLeadInformation: null,
      filter: "",
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsPerPage: 6,
        page: 1
      },
      formData: {
        deletedSoLeadIds: [],
        reassignToNewSo: ""
      },
      dropDown: {
        regionwiseUsers: []
      },
      columns: [
        {
          name: "createdAt",
          required: true,
          label: "Date(C)",
          align: "left",
          field: "createdAt",
          sortable: true
        },
        {
          name: "lead_id",
          required: true,
          label: "Lead ID",
          align: "center",
          field: row => {
            return "# " + row.leadNumber;
          },
          sortable: true
        },
        {
          name: "merchantName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "merchantName",
          sortable: true
        },
        {
          name: "state",
          required: true,
          label: "State",
          align: "left",
          field: "state",
          sortable: true
        },
        {
          name: "salesOfficerName",
          required: true,
          label: "SO Name",
          align: "left",
          field: row => {
            return row.assignedTo.name;
          },
          sortable: true
        },
        {
          name: "finance_approval",
          required: true,
          label: "Finance Approval",
          align: "left",
          field: row => {
            return row.verifiedFinanceStatus ==
              this.$VERIFIED_FINANCE_STATUS_SUCCESS
              ? "Success"
              : row.verifiedFinanceStatus ==
                this.$VERIFIED_FINANCE_STATUS_PENDING
              ? "Pending"
              : row.verifiedFinanceStatus ==
                this.$VERIFIED_FINANCE_STATUS_REJECT
              ? "Rejected"
              : "NA";
          },
          sortable: true
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: true
        }
      ],
      loading: true,
      tableData: this.propRowDetails.leadsList
    };
  },
  computed: {
    ...mapGetters("RegionWiseUsers", ["getRegionWiseList"]),
    ...mapGetters("SuperAdminUsers", ["getAllUsers"])
  },
  created() {
    /* RegionWiseUsers */
    this.getRegionWiseUsers();

    /* RegionWiseUsers */
  },
  methods: {
    ...mapActions("RegionWiseUsers", ["FETCH_REGION_WISE_LIST"]),
    ...mapActions("AssignDeleteLeads", ["DELETE_ASSIGN_USER"]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_USERS_DATA"]),
    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },
    emitToggleRemarks(leadDetails) {
      this.$emit("closeLeadsList");
    },
    getRegionWiseUsers() {
      // self.FETCH_REGION_WISE_LIST({}).then(() => {
      //   return _.map(self.getRegionWiseList, item => {
      //     self.dropDown.regionwiseUsers.push({
      //       value: item.id,
      //       label: item.name
      //     });
      //   });
      // });
      let self = this;
      _.map(this.propRowDetails.regionwiseusers, oo => {
        self.dropDown.regionwiseUsers.push({
          label: oo.name,
          value: oo.id
        });
      });
    },
    // fnAssign(formData) {
    //   this.DELETE_ASSIGN_USER(formData);
    // }
    fnAssign() {
      let self = this;
      if (self.formData.deletedSoLeadIds.length == 0) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select atleast one item to assign",
          icon: "thumb_down"
        });
      } else if (self.formData.reassignToNewSo == "") {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please Choose User value!",
          icon: "thumb_down"
        });
      } else {
        // let marsDeviceIdsCooked = [];
        let reAssigned = [];
        self.formData.deletedSoLeadIds.map(function(value) {
          reAssigned.push(value.id);
        });

        let postValues = {
          deletedSoLeadIds: reAssigned,
          reassignToNewSo: self.formData.reassignToNewSo
        };
        this.DELETE_ASSIGN_USER(postValues)
          .then(() => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully assigned!",
              icon: "thumb_up"
            });
            location.reload();
          })
          .catch(() => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down"
            });
          });
      }
    }

    // Function to unAssignImplementationUser in implementation queue
  }
};
</script>

<style scoped>
</style>
