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
          <div class="q-title text-weight-regular">Manage Mars Instance</div>
        </div>
        <div class="col" align="right">
          <q-btn outline round color="dark" size="sm" icon="clear" @click="emitModalClose"/>
        </div>
      </div>
      <q-tabs color="grey-9">
        <!-- Tabs - notice slot="title" -->
        <q-tab @select="leadSourceActiveList" default slot="title" label="Active List" name="tab-1"/>
        <!-- <q-tab @select="leadSourceDeActiveList" slot="title" label="De-Actived List" name="tab-2"/> -->
        <q-tab-pane name="tab-1">
          <q-table
            :data="activeLeadSourceList"
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
                  @click="InstanceEdit(props.row)"
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
                  @click="InstanceDisable(props.row.id)"
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
                  @click="marsInstanceCreate()"
                />
              </div>
              <!--END: table filter,search -->
            </template>
          </q-table>
        </q-tab-pane>
        <!-- <q-tab-pane name="tab-2">
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
                  @click="fnEnableInstance(props.row)"
                  flat
                  class="text-positive"
                ></q-btn>
              </div>
            </q-td>
            <template slot="top" slot-scope="props">
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
            </template>
          </q-table>
        </q-tab-pane> -->
      </q-tabs>
      <!--START: Show create LeadSources -->
      <showCreatemarsInstance
        v-if="propShowCreatemarsInstance"
        :propShowCreatemarsInstance="propShowCreatemarsInstance"
        @emitfnshowMarsInstance="marsInstanceCreate"
      ></showCreatemarsInstance>
      <!--END: Show create LeadSources -->
      <!--START: Show edit LeadSources -->
      <showEditInstance
        v-if="propShowEditMarsInstance"
        :propShowEditMarsInstance="propShowEditMarsInstance"
        :propRowDetails="propRowDetails"
        @emitfnshowMarsInstance="refreshLeadSourceList"
      ></showEditInstance>
      <!--END: Show edit LeadSources -->
    </q-modal>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import { required } from "vuelidate/lib/validators";
  import showCreatemarsInstance from "./marsInstanceCreate.vue";
  import showEditInstance from "./editMarsInstance.vue";
  export default {
    props: ["propToggleModal"],
    // name: 'ComponentName',
    components: {
      showCreatemarsInstance,
      showEditInstance
    },
    data() {
      return {
        toggleModal: this.propToggleModal,
  
        propShowCreatemarsInstance: false,
        propShowEditMarsInstance: false,
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
            name: "institutionName",
            required: true,
            label: "Institution Name",
            align: "left",
            field: "institutionName",
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
        // deActivatedColumns: [
        //   {
        //     name: "institutionName",
        //     required: true,
        //     label: "Institution Name",
        //     align: "left",
        //     field: "institutionName",
        //     sortable: false
        //   },
        //   {
        //     name: "action",
        //     required: true,
        //     label: "",
        //     align: "left",
        //     field: "action",
        //     sortable: false
        //   }
        // ]
        /* END >>Table data */
      };
    },
  
    created() {
      this.GET_MARS_INSTITUTION_DETAILS();
    },
    computed: {
      ...mapGetters("leadSource", [
        "getActiveLeadSource",
        "getDeActivatedLeadSource"
      ]),
      ...mapGetters("MarsInstance", ["getMarsInstanceDetails"])
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
      ...mapActions("MarsInstance", ["GET_MARS_INSTITUTION_DETAILS", "DELETE_INSTANCE","UPDATE_INSTANCE"]),
      /* START >> Function to save, update or delete */
      leadSourceActiveList() {
        this.GET_MARS_INSTITUTION_DETAILS().then(() => {
          this.activeLeadSourceList = this.getMarsInstanceDetails.filter(service => service.institutionActive == true);
          // this.deActiveTableData = this.getAllHierarchiesData.filter(service => service.active == false);
        });
      },
      leadSourceDeActiveList() {
        this.GET_MARS_INSTITUTION_DETAILS().then(() => {
          this.deActiveLeadSourceList = this.getMarsInstanceDetails.filter(service => service.institutionActive == false)
        });
      },
      marsInstanceCreate(token) {
        this.propShowCreatemarsInstance = !this.propShowCreatemarsInstance;
        if (token == "refresh") {
          this.leadSourceActiveList();
        }
      },
  
      InstanceEdit(rowDetails) {
        this.propShowEditMarsInstance = !this.propShowEditMarsInstance;
        this.propRowDetails = rowDetails;
      },
  
      refreshLeadSourceList() {
        this.propShowEditMarsInstance = !this.propShowEditMarsInstance;
        this.leadSourceActiveList();
      },
      InstanceDisable(rowDetails) {
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
            this.DELETE_INSTANCE(rowDetails)
              .then(response => {
                this.leadSourceActiveList();
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: "Instance deactivated",
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
      fnEnableInstance(rowDetails) {
        console.log("fnEnableInstance ------->",JSON.stringify(rowDetails))
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to Active Instance?",
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
            let param={
              institutionName: rowDetails.institutionName,
              institutionRRCode: rowDetails.institutionRRCode,
              institutionActive:1,

            };
            this.UPDATE_INSTANCE(param)
              .then(response => {
                this.leadSourceActiveList();
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "Mars Instance Activated",
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
  