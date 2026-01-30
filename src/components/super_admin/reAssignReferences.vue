<template>
  <q-modal
    maximized
    no-backdrop-dismiss
    no-esc-dismiss
    v-model="toggleModal"
    :content-css="{padding:'50px 5px'}"
  >
    <div>
      <!-- <pre>{{addtnLeadInformation}}</pre> -->
      <!--START: table title -->
      <div class="row items-center q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">
        <div class="col q-title">References Details</div>
        <div class="col-auto">
          <q-btn size="sm" round @click="emitToggleRemarks" outline color="dark" icon="clear"/>
        </div>
      </div>
      <!-- <pre>{{propRowDetails.hierarchyList}}</pre> -->
      <!--END: table title -->
      <div class="row">
        <div class="col-3">
          <q-list link>
            <q-list-header>Hierarchy List</q-list-header>
            <q-item
              v-for="(item, index) in propRowDetails.hierarchyList"
              :key="index"
              :class="activeIndex == index?'bg-purple-9 text-white':''"
              @click.native="populateReferencesList(item,index)"
            >{{item.hierarchy.hierarchy}}</q-item>
          </q-list>
        </div>
        <div class="col-9">
          <!--START: table lead validation -->
          <q-table
            table-class="customTableClass"
            class="q-py-none"
            :data="tableData"
            :columns="columns"
            selection="multiple"
            :selected.sync="formData.selectedReferencesToReAssign"
            :filter="filter"
            :pagination.sync="paginationControl"
            row-key="id"
          >
            <template slot="top" slot-scope="props" class="bottom-border">
              <!--START: table filter,search -->
              <div class="col-md-5">
                <q-search
                  clearable
                  color="grey-9"
                  v-model="filter"
                  placeholder="Type.."
                  float-label="Search by SO name, Merchant Name, Lead ID"
                  class="q-ma-xs"
                />
              </div>
              <div class="col-md-4">
                <q-select
                  placeholder="Select .."
                  color="grey-9"
                  v-model="formData.userId"
                  float-label="Choose a user from below"
                  :options="[]"
                  class="q-ma-xs"
                />
              </div>
              <div class="col-md-3" align="middle">
                <q-btn icon="check" color="positive" class="q-ma-xs" label="Assign"/>
              </div>
              <!--END: table filter,search -->
            </template>
          </q-table>
          <!--END: table lead validation -->
        </div>
      </div>
    </div>
  </q-modal>
</template>

<script>
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
        selectedReferencesToReAssign: [],
        userId: null
      },
      columns: [
        {
          name: "employeeID",
          required: true,
          label: "Employee ID",
          align: "left",
          field: "employeeID",
          sortable: true
        },
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "email",
          required: true,
          label: "Email",
          align: "center",
          field: "email",
          sortable: true
        },
        {
          name: "contactNumber",
          required: true,
          label: "Contact number",
          align: "left",
          field: "contactNumber",
          sortable: true
        },
        {
          name: "userAddress",
          required: true,
          label: "Address",
          align: "left",
          field: "userAddress",
          sortable: true
        },
        {
          name: "city",
          required: true,
          label: "City",
          align: "left",
          field: "city",
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
          name: "pincode",
          required: true,
          label: "Pincode",
          align: "left",
          field: "pincode",
          sortable: true
        }
      ],
      loading: true,
      tableData: [],
      activeIndex: null
    };
  },
  methods: {
    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },
    populateReferencesList(details, index) {
      console.log("details", details);
      this.activeIndex = index;
      this.tableData = details.references;
    },
    emitToggleRemarks(leadDetails) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to leave this page?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$emit("closeReferencesList");
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
</style>
