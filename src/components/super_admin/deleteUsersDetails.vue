<template>
  <q-dialog
    maximized
    no-backdrop-dismiss
    no-esc-dismiss
    v-model="toggleModal"
    :content-css="{padding:'50px 5px'}"
  >
    <!--START: table title -->
    <div class="row items-center q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">
      <div class="col text-h6">Action Sheet</div>
      <div class="col-auto">
        <q-btn size="sm" round @click="emitToggleRemarks" outline color="dark" icon="clear"/>
      </div>
    </div>
    <!--END: table title -->
    <div class="column">
      <q-table
        title="Lead Validation"
        table-class="customTableClass"
        class="q-py-none"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        row-key="nam6"
      >
        <q-td v-slot:body-cell-action="props" class="group" :props="props">
          <q-btn
            v-show="props.row.leadsCount == 0 && props.row.referencesCount == 0"
            no-caps
            color="negative"
            icon="clear"
            label="Disable"
          />
          <q-btn
            v-show="props.row.referencesCount > 0"
            no-caps
            color="positive"
            icon="refresh"
            @click="toggleReAssignReferencesModal(props.row)"
            label="Re-assign refs"
          />
          <q-btn
            v-show="props.row.leadsCount > 0"
            no-caps
            color="positive"
            icon="refresh"
            @click="toggleReAssignLeadsModal(props.row)"
            label="Re-assign leads"
          />
        </q-td>
        <!-- END: table body modification -->
        <template v-slot:top="props" class="bottom-border">
          <!--START: table filter,search -->
          <div class="col-md-5">
            <q-input
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              float-label="Search by user name, email, phone"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <!--END: table filter,search -->
        </template>
      </q-table>
    </div>
    <reAssignLeads
      v-if="reAssignLeadsModal"
      :propRowDetails="rowLeadsDetails"
      :propToggleModal="reAssignLeadsModal"
      @closeLeadsList="toggleReAssignLeadsModal()"
    />
    <reAssignReferences
      v-if="reAssignReferencesModal"
      :propRowDetails="rowReferencesDetails"
      :propToggleModal="reAssignReferencesModal"
      @closeReferencesList="toggleReAssignReferencesModal()"
    />
  </q-dialog>
</template>

<script>
import { required, email } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import reAssignLeads from "./reAssignLeads.vue";
import reAssignReferences from "./reAssignReferences.vue";
export default {
  name: "leadValidation",
  props: ["propDeteledUsers", "propToggleModal"],
  components: {
    reAssignLeads,
    reAssignReferences
  },
  data() {
    return {
      filter: "",
      loading: true,
      rowLeadsDetails: [],
      rowReferencesDetails: [],
      tableData: this.propDeteledUsers,
      toggleModal: this.propToggleModal,
      toggleAjaxLoadFilter: false,
      reAssignLeadsModal: false,
      reAssignReferencesModal: false,
      paginationControl: {
        rowsPerPage: 6,
        page: 1
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => {
            return row.user.name;
          },
          sortable: false
        },
        {
          name: "employeeID",
          required: true,
          label: "Employee ID",
          align: "left",
          field: row => {
            return row.user.employeeID;
          },
          sortable: false
        },
        {
          name: "email",
          required: true,
          label: "Email",
          align: "center",
          field: row => {
            return row.user.email;
          },
          sortable: true
        },
        {
          name: "contactNumber",
          required: true,
          label: "Phone",
          align: "left",
          field: row => {
            return row.user.contactNumber;
          },
          sortable: false
        },
        {
          name: "userAddress",
          required: true,
          label: "Address",
          align: "left",
          field: row => {
            return row.user.userAddress;
          },
          sortable: false
        },
        {
          name: "city",
          required: true,
          label: "City",
          align: "left",
          field: row => {
            return row.user.city;
          },
          sortable: false
        },
        {
          name: "state",
          required: true,
          label: "State",
          align: "left",
          field: row => {
            return row.user.state;
          },
          sortable: false
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
  methods: {
    toggleReAssignLeadsModal(details) {
      this.reAssignLeadsModal = !this.reAssignLeadsModal;
      if (details != undefined) {
        console.log(details);
        this.rowLeadsDetails = details;
      }
    },
    toggleReAssignReferencesModal(details) {
      this.reAssignReferencesModal = !this.reAssignReferencesModal;
      if (details != undefined) {
        this.rowReferencesDetails = details;
      }
    },
    emitToggleRemarks() {
      this.$emit("emitToggleDeleteUsersModal");
    }
  }
};
</script>

<style scoped>
</style>
