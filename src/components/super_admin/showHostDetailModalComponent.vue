<template>
  <q-modal
    minimized
    position="right"
    v-model="toggleModal"
    no-backdrop-dismiss
    @escape-key="emitModalClose"
    class="customModalOverlay"
    :content-css="{padding:'25px',paddingTop:'60px',minWidth:'40vw',minHeight:'100vh'}"
  >
    <div class="row items-center bottom-border q-py-sm fit">
      <div class="col">
        <div class="q-title text-weight-regular">Manage Host</div>
      </div>
      <div class="col" align="right">
        <q-btn outline round color="dark" size="sm" icon="clear" @click="emitModalClose"/>
      </div>
    </div>
    <q-tabs color="grey-9">
      <!-- Tabs - notice slot="title" -->
      <q-tab @select="leadSourceActiveList" default slot="title" label="Host List" name="tab-1"/>
      <q-tab-pane name="tab-1">
        <q-table
          :data="tableData"
          table-class="customSATableClass"
          :columns="activatedColumns"
          :filter="activeFilterSearch"
          row-key="id"
          color="grey-9"
          @request="ajaxLoadAllLeadInfo"
        >
          <q-td slot="body-cell-action" slot-scope="props" :props="props">
            <div class="row no-wrap no-padding">
              <q-btn
                dense
                no-caps
                no-wrap
                label="Modify"
                icon="far fa-plus-square"
                size="md"
                @click="hostEdit(props.row)"
                flat
                class="text-light-blue"
              ></q-btn>
              <q-btn
                dense
                no-caps
                no-wrap
                label="Disable"
                icon="far fa-minus-square"
                size="md"
                @click="hostDisable(props.row.id)"
                flat
                class="text-negative"
              ></q-btn>
            </div>
          </q-td>
          <template slot="top" slot-scope="props">
            <!--START: table filter,search -->
            <div class="col-8">
              <q-search
                clearable
                color="grey-9"
                v-model="activeFilterSearch"
                placeholder="Type.."
                float-label="Search lead source"
              />
            </div>
            <div class="col-4" align="right">
              <q-btn
                no-caps
                no-wrap
                label="Add New"
                class="text-weight-regular"
                color="purple-9"
                icon="far fa-plus-square"
                @click="hostCreate()"
              />
            </div>
            <!--END: table filter,search -->
          </template>
        </q-table>
      </q-tab-pane>
    </q-tabs>
    <!--START: Show create LeadSources -->
    <showCreateHost
      v-if="propShowCreateHost"
      :propShowCreateHost="propShowCreateHost"
      @emitfnshowHost="hostCreate"
    ></showCreateHost>
    <!--END: Show create LeadSources -->
    <!--START: Show edit LeadSources -->
    <showEditHost
      v-if="propShowEditHost"
      :propShowEditHost="propShowEditHost"
      :propRowDetails="propRowDetails"
      @emitfnshowHost="refreshLeadSourceList"
    ></showEditHost>
    <!--END: Show edit LeadSources -->
  </q-modal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import showEditHost from "./editHost.vue";
import showCreateHost from "./createHost.vue";
import showCreateLeadSource from "./createLeadSource.vue";
import showEditLeadSource from "./editLeadSource.vue";
export default {
  props: ["propToggleModal"],
  // name: 'ComponentName',
  components: {
    showCreateLeadSource,
    showCreateHost,
    showEditHost,
    showEditLeadSource
  },
  data() {
    return {
      toggleModal: this.propToggleModal,

      propShowCreateLeadSource: false,
      propShowCreateHost: false,
      propShowEditHost: false,
      propRowDetails: "",

      activeHost: [],
      deActiveLeadSourceList: [],

      formData: {
        leadSource: ""
      },

      /* START >>Table properties */
      activeFilterSearch: "",
      deActivatedFilterSearch: "",
      paginationControl: {
        rowsPerPage: 5
      },
      tableData: [],
      /* END >>Table properties */

      /* START >>Table data */
      activatedColumns: [
        {
          name: "name",
          required: true,
          label: "name",
          align: "left",
          field: "name",
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
      ],
      deActivatedColumns: [
        {
          name: "sourceName",
          required: true,
          label: "Lead source",
          align: "left",
          field: "sourceName",
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
      /* END >>Table data */
    };
  },

  created() {
    this.LEAD_SOURCE_ACTIVE_LIST();
    this.ajaxLoadAllLeadInfo();
  },
  computed: {
    ...mapGetters("leadSource", [
      "getActiveLeadSource",
      "getDeActivatedLeadSource"
    ]),
    ...mapGetters("Host", ["getAllHostDetails"]),
    // ...mapGetters("merchantDocumentType", [
    //   "getActiveLeadSource",
    //   "getDeActivatedLeadSource"
    // ])
  },
  beforeMount(){
    // console.log("getAllHostDetails ---------->",JSON.stringify(this.getAllHostDetails))
  },
  methods: {
    ...mapActions("leadSource", [
      "LEAD_SOURCE_ACTIVE_LIST",
      "LEAD_SOURCE_DEACTIVED_LIST",
      "UPDATE_LEAD_SOURCE_AND_SET_ACTIVE",
      "DELETE_LEAD_SOURCE_AND_SET_ACTIVE"
    ]),
    ...mapActions("Host", ["GET_HOST_DETAILS", "DELETE_HOST"]),
    /* START >> Function to save, update or delete */


    ajaxLoadAllLeadInfo(){
       // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.GET_HOST_DETAILS()
        .then((res) => {
          console.log("TABLE getAllHostDetails----------->",JSON.stringify(this.getAllHostDetails))
          this.tableData = this.getAllHostDetails;
          console.log("TABLE DATA----------->",JSON.stringify(this.tableData))
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    leadSourceActiveList() {
      this.GET_HOST_DETAILS().then(() => {
        this.tableData = this.getAllHostDetails;
      });
    },
    leadSourceDeActiveList() {
      this.LEAD_SOURCE_DEACTIVED_LIST().then(() => {
        this.deActiveLeadSourceList = this.getDeActivatedLeadSource;
      });
    },
    hostCreate(token) {
      this.propShowCreateHost = !this.propShowCreateHost;
      if (token == "refresh") {
        this.leadSourceActiveList();
      }
    },

    hostEdit(rowDetails) {
      this.propShowEditHost = !this.propShowEditHost;
      this.propRowDetails = rowDetails;
    },

    refreshLeadSourceList() {
      this.propShowEditHost = !this.propShowEditHost;
      this.leadSourceActiveList();
    },
    hostDisable(rowDetails) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to disable Host?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none"
          });
          this.DELETE_HOST(rowDetails)
            .then(response => {
              this.leadSourceActiveList();
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Host deactivated",
                icon: "thumb_up"
              });
            })
            .catch(error => {
              this.$q.notify({
                color: "warning",
                position: "bottom",
                message: "Please try again!",
                icon: "thumb_down"
              });
            });
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down"
          });
        });
    },
    fnEnableLeadSource(rowDetails) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to disable lead source?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none"
          });
          this.UPDATE_LEAD_SOURCE_AND_SET_ACTIVE(rowDetails)
            .then(response => {
              this.leadSourceDeActiveList();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: `Lead source: ${
                  rowDetails.sourceName
                } has been enabled`,
                icon: "thumb_up"
              });
            })
            .catch(error => {
              this.$q.notify({
                color: "warning",
                position: "bottom",
                message: "Please try again!",
                icon: "thumb_down"
              });
            });
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down"
          });
        });
    },
    /* END >> Function to save, update or delete */

    emitModalClose() {
      this.$emit("emitToggleModal");
    }
  }
};
</script>

<style>
</style>
