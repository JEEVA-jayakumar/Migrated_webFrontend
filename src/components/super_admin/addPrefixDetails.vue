<template>
    <q-modal
      minimized
      position="right"
      v-model="toggleModal"
      no-backdrop-dismiss
      @escape-key="emitToggleModal"
      class="customModalOverlay"
      :content-css="{padding:'25px',paddingTop:'60px',minWidth:'40vw',minHeight:'100vh'}"
    >
      <div class="row items-center bottom-border q-py-sm fit">
        <div class="col">
          <div class="q-title text-weight-regular">Manage Prefix </div>
        </div>
        <div class="col" align="right">
          <q-btn outline round color="dark" size="sm" icon="clear" @click="emitToggleModal"/>
        </div>
      </div>
      <q-tabs color="grey-9">
        <!-- Tabs - notice slot="title" -->
        <q-tab @select="leadSourceActiveList" default slot="title" label="Active List" name="tab-1"/>
        <q-tab @select="leadSourceDeActiveList" slot="title" label="De-Actived List" name="tab-2"/>
        <q-tab-pane name="tab-1">
          <q-table
            :data="getActiveLeadSource"
            table-class="customSATableClass"
            :columns="activatedColumns"
            :filter="activeFilterSearch"
            row-key="id"
            color="grey-9"
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
                  @click="leadSourceEdit(props.row)"
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
                  @click="leadSourceDisable(props.row.id)"
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
                  label="Add Prefix"
                  class="text-weight-regular"
                  color="purple-9"
                  icon="far fa-plus-square"
                  @click="fnCreatePrefix()"
                />
              </div>
              <!--END: table filter,search -->
            </template>
          </q-table>
        </q-tab-pane>
        <q-tab-pane name="tab-2">
          <q-table
            :data="deActiveLeadSourceList"
            table-class="customSATableClass"
            :columns="deActivatedColumns"
            :filter="deActivatedFilterSearch"
            :pagination.sync="paginationControl"
            row-key="id"
            color="grey-9"
          >
            <q-td slot="body-cell-action" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn
                  dense
                  no-caps
                  no-wrap
                  label="Enable"
                  icon="far fa-check-square"
                  size="md"
                  @click="fnEnableLeadSource(props.row)"
                  flat
                  class="text-positive"
                ></q-btn>
              </div>
            </q-td>
            <template slot="top" slot-scope="props">
              <!--START: table filter,search -->
              <div class="col">
                <q-search
                  clearable
                  color="grey-9"
                  v-model="deActivatedFilterSearch"
                  placeholder="Type.."
                  float-label="Search by name"
                  class="q-mr-lg"
                />
              </div>
              <!--END: table filter,search -->
            </template>
          </q-table>
        </q-tab-pane>
      </q-tabs>
      <!--START: Show create LeadSources -->
      <showCreatePrefix
        v-if="propShowCreatePrefix"
        :propShowCreatePrefix="propShowCreatePrefix"
        @emitfnshowPrefix="fnCreatePrefix"
      ></showCreatePrefix>
      <!--END: Show create LeadSources -->
      <!--START: Show edit LeadSources -->
      <showEditLeadSource
        v-if="propShowEditLeadSource"
        :propShowEditLeadSources="propShowEditLeadSource"
        :propRowDetails="propRowDetails"
        @emitfnshowLeadSources="refreshLeadSourceList"
      ></showEditLeadSource>
      <!--END: Show edit LeadSources -->
    </q-modal>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import { required } from "vuelidate/lib/validators";
  import showCreatePrefix from "./CreatePrefix.vue";
  import showEditLeadSource from "./editLeadSource.vue";
  export default {
    props: ["propToggleModal"],
    // name: 'ComponentName',
    components: {
        showCreatePrefix,
      showEditLeadSource
    },
    data() {
      return {
        toggleModal: this.propToggleModal,
  
        propShowCreatePrefix: false,
        propShowEditLeadSource: false,
        propRowDetails: "",
  
        activeLeadSourceList: [],
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
        /* END >>Table properties */
  
        /* START >>Table data */
        activatedColumns: [
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
    },
    computed: {
      ...mapGetters("leadSource", [
        "getActiveLeadSource",
        "getDeActivatedLeadSource"
      ])
      // ...mapGetters("merchantDocumentType", [
      //   "getActiveLeadSource",
      //   "getDeActivatedLeadSource"
      // ])
    },
    methods: {
      ...mapActions("leadSource", [
        "LEAD_SOURCE_ACTIVE_LIST",
        "LEAD_SOURCE_DEACTIVED_LIST",
        "UPDATE_LEAD_SOURCE_AND_SET_ACTIVE",
        "DELETE_LEAD_SOURCE_AND_SET_ACTIVE"
      ]),
      /* START >> Function to save, update or delete */
      leadSourceActiveList() {
        this.LEAD_SOURCE_ACTIVE_LIST().then(() => {
          this.activeLeadSourceList = this.getActiveLeadSource;
        });
      },
      leadSourceDeActiveList() {
        this.LEAD_SOURCE_DEACTIVED_LIST().then(() => {
          this.deActiveLeadSourceList = this.getDeActivatedLeadSource;
        });
      },
      fnCreatePrefix(token) {
        this.propShowCreatePrefix = !this.propShowCreatePrefix;
        if (token == "refresh") {
          this.leadSourceActiveList();
        }
      },
  
      leadSourceEdit(rowDetails) {
        this.propShowEditLeadSource = !this.propShowEditLeadSource;
        this.propRowDetails = rowDetails;
      },
  
      refreshLeadSourceList() {
        this.propShowEditLeadSource = !this.propShowEditLeadSource;
        this.leadSourceActiveList();
      },
      leadSourceDisable(rowDetails) {
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
            this.DELETE_LEAD_SOURCE_AND_SET_ACTIVE(rowDetails)
              .then(response => {
                this.leadSourceActiveList();
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: "Lead source deactivated",
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
  
      emitToggleModal() {
        this.$emit("emitToggleModal");
      }
    }
  };
  </script>
  
  <style>
  </style>
  